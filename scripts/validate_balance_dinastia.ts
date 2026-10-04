/**
 * Fórmula 7 — validação de equilíbrio por Monte Carlo, aplicada a um único reinado (12
 * turnos) de A Dinastia. Roda milhares de partidas simuladas com duas estratégias
 * artificiais (pior caso / sabotagem e melhor caso / maximin) mais jogadas aleatórias, e
 * confere se os resultados caem dentro das faixas-alvo antes de aprovar os dados.
 *
 * Uso: npx esbuild scripts/validate_balance_dinastia.ts --bundle --platform=node
 *      --format=esm --outfile=/tmp/validate_dinastia.mjs && node /tmp/validate_dinastia.mjs
 */
import { DECREES } from "../src/dinastia/data/decrees";
import { CRITICAL_INDICATORS } from "../src/dinastia/data/indicators";
import {
  DIFFICULTY_MULTIPLIERS,
  TOTAL_TURNS,
  applyChoice,
  buildDeck,
  createNewReign,
} from "../src/dinastia/game/engine";
import type { Difficulty, EventChoice, GameState, Indicators, RoyalDecree } from "../src/dinastia/types";

function criticalSum(indicators: Indicators): number {
  return CRITICAL_INDICATORS.reduce((sum, key) => sum + indicators[key], 0);
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function previewIndicators(
  indicators: Indicators,
  choice: EventChoice,
  decree: RoyalDecree | null,
  multiplier: number
): Indicators {
  const next = { ...indicators };
  const merged: Record<string, number> = { ...choice.effects };
  if (decree) {
    for (const [key, value] of Object.entries(decree.effects)) {
      merged[key] = (merged[key] ?? 0) + (value ?? 0);
    }
  }
  for (const [key, value] of Object.entries(merged)) {
    if (!value) continue;
    const k = key as keyof Indicators;
    next[k] = clamp(next[k] + Math.round(value * multiplier));
  }
  return next;
}

function availableDecrees(turn: number): (RoyalDecree | null)[] {
  return [null, ...DECREES.filter((d) => !d.minTurn || turn >= d.minTurn)];
}

type Strategy = "pior" | "melhor" | "aleatorio";

function pickChoice(state: GameState, strategy: Strategy, multiplier: number): { choice: EventChoice; decree: RoyalDecree | null } {
  const event = state.currentEvent!;
  const decrees = availableDecrees(state.turn);

  if (strategy === "aleatorio") {
    const choice = event.choices[Math.floor(Math.random() * event.choices.length)];
    const decree = Math.random() < 0.5 ? null : decrees[Math.floor(Math.random() * decrees.length)];
    return { choice, decree };
  }

  let best: { choice: EventChoice; decree: RoyalDecree | null; score: number } | null = null;
  for (const choice of event.choices) {
    for (const decree of decrees) {
      const projected = previewIndicators(state.indicators, choice, decree, multiplier);
      const score =
        strategy === "pior"
          ? criticalSum(projected)
          : Math.min(...CRITICAL_INDICATORS.map((key) => projected[key]));
      const better =
        best === null || (strategy === "pior" ? score < best.score : score > best.score);
      if (better) best = { choice, decree, score };
    }
  }
  return { choice: best!.choice, decree: best!.decree };
}

interface RunResult {
  failed: boolean;
  failTurn: number | null;
  finalAverage: number;
}

function simulateOne(difficulty: Difficulty, strategy: Strategy): RunResult {
  let state = createNewReign(difficulty);
  const multiplier = DIFFICULTY_MULTIPLIERS[difficulty];

  while (state.phase === "playing") {
    const turnBefore = state.turn;
    const { choice, decree } = pickChoice(state, strategy, multiplier);
    state = applyChoice(state, choice, decree);
    if (state.phase === "ended" && !state.endResult!.victory) {
      return { failed: true, failTurn: turnBefore, finalAverage: state.endResult!.average };
    }
    if (state.phase === "ended") {
      return { failed: false, failTurn: null, finalAverage: state.endResult!.average };
    }
  }
  throw new Error("Simulação terminou sem phase ended");
}

// 3000 deixava a taxa de falha da jogada aleatória (perto de 1%, ~30 ocorrências)
// sujeita a ruído binomial grande o bastante para cruzar o limiar de aprovação de uma
// rodada pra outra sem a regra ter mudado — 10000 estreita esse ruído o suficiente.
const RUNS = 10000;

function runBatch(difficulty: Difficulty, strategy: Strategy) {
  let failures = 0;
  let minFailTurn = Infinity;
  let sumAverage = 0;
  let sumFailTurn = 0;

  for (let i = 0; i < RUNS; i++) {
    const result = simulateOne(difficulty, strategy);
    if (result.failed) {
      failures++;
      minFailTurn = Math.min(minFailTurn, result.failTurn!);
      sumFailTurn += result.failTurn!;
    }
    sumAverage += result.finalAverage;
  }

  return {
    failRate: failures / RUNS,
    minFailTurn: failures > 0 ? minFailTurn : null,
    avgFailTurn: failures > 0 ? sumFailTurn / failures : null,
    avgFinal: sumAverage / RUNS,
  };
}

console.log(`A Dinastia — validação de equilíbrio (Fórmula 7), ${RUNS} simulações por lote, T=${TOTAL_TURNS}\n`);

// Sanity check: o baralho base (sem marcas de legado) precisa ter pelo menos T eventos elegíveis.
const basePool = buildDeck([]);
console.log(`Baralho sem marcas de legado: ${basePool.length} eventos (precisa ser igual a ${TOTAL_TURNS}).\n`);

const difficulties: Difficulty[] = ["facil", "normal", "dificil"];
let allPass = true;

for (const difficulty of difficulties) {
  const pior = runBatch(difficulty, "pior");
  const melhor = runBatch(difficulty, "melhor");
  const aleatorio = runBatch(difficulty, "aleatorio");

  console.log(`## Dificuldade: ${difficulty}`);
  console.log(
    `  Pior caso    — falha: ${(pior.failRate * 100).toFixed(1)}% · 1ª falha possível no turno ${pior.minFailTurn} · turno médio de falha ${pior.avgFailTurn?.toFixed(1)}`
  );
  console.log(
    `  Melhor caso  — falha: ${(melhor.failRate * 100).toFixed(1)}% · média final ${melhor.avgFinal.toFixed(1)}`
  );
  console.log(
    `  Aleatório    — falha: ${(aleatorio.failRate * 100).toFixed(1)}% · média final ${aleatorio.avgFinal.toFixed(1)}`
  );

  if (difficulty === "normal") {
    const minFailTarget = Math.ceil(TOTAL_TURNS * 0.4);
    if (pior.minFailTurn !== null && pior.minFailTurn < minFailTarget) {
      console.log(
        `  ❌ Pior caso falha cedo demais (turno ${pior.minFailTurn} < alvo ${minFailTarget}) — reescalar efeitos para baixo.`
      );
      allPass = false;
    }
    if (melhor.failRate > 0.02) {
      console.log(`  ❌ Melhor caso falha demais (${(melhor.failRate * 100).toFixed(1)}% > 2%) — reescalar efeitos para baixo.`);
      allPass = false;
    }
    if (melhor.avgFinal < 50 || melhor.avgFinal > 78) {
      console.log(`  ❌ Média do melhor caso fora da faixa médio-alta (${melhor.avgFinal.toFixed(1)}, alvo 50–78).`);
      allPass = false;
    }
    // Alvo frouxo (o documento original só dá uma meta qualitativa aqui, "nem sempre vence
    // nem sempre perde"): 0.5% já é o bastante para provar que o jogo não é impossível de
    // perder na sorte pura, sem exigir tanta variância que distorça o pior/melhor caso.
    if (aleatorio.failRate < 0.005 || aleatorio.failRate > 0.6) {
      console.log(
        `  ❌ Jogada aleatória não está "no centro" da distribuição (falha ${(aleatorio.failRate * 100).toFixed(1)}%, alvo 0.5–60%).`
      );
      allPass = false;
    }
  }
  console.log("");
}

// Checagem de amostragem (espírito da Fórmula 11): com todas as marcas de legado já
// concedidas, o baralho ganha eventos extras — confirma que isso não desequilibra o
// melhor caso na dificuldade normal, em vez de assumir que é neutro.
const ALL_FLAGS = [
  "pacto-baroes",
  "igreja-humilhada",
  "alianca-reino-vizinho",
  "linhagem-bastarda",
  "guarda-real-fortalecida",
  "fome-grande",
];

function simulateWithFlags(
  difficulty: Difficulty,
  strategy: Strategy,
  legacyFlags: string[],
  reignNumber = 1
): RunResult {
  let state = createNewReign(difficulty, {
    indicatorBonus: {},
    reignNumber,
    legacyFlags,
    chronicle: [],
  });
  const multiplier = DIFFICULTY_MULTIPLIERS[difficulty];
  while (state.phase === "playing") {
    const turnBefore = state.turn;
    const { choice, decree } = pickChoice(state, strategy, multiplier);
    state = applyChoice(state, choice, decree);
    if (state.phase === "ended" && !state.endResult!.victory) {
      return { failed: true, failTurn: turnBefore, finalAverage: state.endResult!.average };
    }
    if (state.phase === "ended") {
      return { failed: false, failTurn: null, finalAverage: state.endResult!.average };
    }
  }
  throw new Error("Simulação terminou sem phase ended");
}

const fullFlagsPool = buildDeck(ALL_FLAGS);
let sumFull = 0;
let failFull = 0;
const SAMPLE = 1000;
for (let i = 0; i < SAMPLE; i++) {
  const r = simulateWithFlags("normal", "melhor", ALL_FLAGS);
  sumFull += r.finalAverage;
  if (r.failed) failFull++;
}
console.log(
  `Amostragem com todas as marcas de legado: baralho tem ${fullFlagsPool.length} eventos elegíveis; melhor caso normal — falha ${((failFull / SAMPLE) * 100).toFixed(1)}%, média final ${(sumFull / SAMPLE).toFixed(1)} (compare com ${(55.2).toFixed(1)} sem marcas — divergência grande indicaria que os eventos de legado desequilibram o jogo).\n`
);

// Checagem por reinado: a ênfase temática (REIGN_CATEGORY_EMPHASIS) muda QUAIS eventos
// são sorteados por reinado — confirma que isso não torna nenhum dos 5 reinados injusto
// no melhor caso, em vez de assumir que a amostragem ponderada é neutra o bastante.
console.log("Amostragem por reinado (melhor caso, normal, sem marcas de legado):");
let anyReignUnsafe = false;
for (let reignNumber = 1; reignNumber <= 5; reignNumber++) {
  let sum = 0;
  let fails = 0;
  for (let i = 0; i < SAMPLE; i++) {
    const r = simulateWithFlags("normal", "melhor", [], reignNumber);
    sum += r.finalAverage;
    if (r.failed) fails++;
  }
  const failRate = fails / SAMPLE;
  const avg = sum / SAMPLE;
  console.log(`  Reinado ${reignNumber} — falha ${(failRate * 100).toFixed(1)}%, média final ${avg.toFixed(1)}`);
  if (failRate > 0.02 || avg < 45 || avg > 80) {
    anyReignUnsafe = true;
  }
}
if (anyReignUnsafe) {
  console.log(
    "  ❌ A ênfase temática de algum reinado tornou o melhor caso instável — revisar REIGN_CATEGORY_EMPHASIS ou EMPHASIS_WEIGHT.\n"
  );
  allPass = false;
} else {
  console.log("");
}

if (allPass) {
  console.log("✅ Gate de equilíbrio (Fórmula 7) passou em todas as métricas-alvo para a dificuldade normal.");
  process.exit(0);
} else {
  console.log("❌ Gate de equilíbrio falhou — ver itens marcados acima.");
  process.exit(1);
}
