/**
 * Fórmula 7 — Validação de equilíbrio via Monte Carlo.
 *
 * Simula milhares de partidas com duas estratégias artificiais (pior caso e melhor
 * caso) e uma estratégia aleatória, para cada dificuldade, e compara o resultado
 * contra as metas documentadas em references/formulas.md antes de aprovar o conjunto
 * de dados gerado. Rode com: node scripts/validate_balance.ts
 */
import { ACTIONS } from "../src/data/actions";
import {
  applyEffects,
  buildDeck,
  computeAverage,
  DIFFICULTY_MULTIPLIERS,
  mergeEffects,
  scaleEffects,
  TOTAL_TURNS,
} from "../src/game/engine";
import { CRITICAL_INDICATORS, createInitialIndicators } from "../src/data/indicators";
import type { Difficulty, EventChoice, GameEvent, Indicators, MayorAction } from "../src/types";

type Strategy = "worst" | "best" | "random";

function criticalSum(indicators: Indicators): number {
  return CRITICAL_INDICATORS.reduce((sum, key) => sum + indicators[key], 0);
}

function criticalMin(indicators: Indicators): number {
  return Math.min(...CRITICAL_INDICATORS.map((key) => indicators[key]));
}

function availableActions(turn: number): (MayorAction | null)[] {
  return [null, ...ACTIONS.filter((action) => !action.minTurn || turn >= action.minTurn)];
}

function resultingIndicators(
  indicators: Indicators,
  choice: EventChoice,
  action: MayorAction | null,
  multiplier: number
): Indicators {
  const combined = scaleEffects(mergeEffects(choice.effects, action?.effects), multiplier);
  return applyEffects(indicators, combined);
}

function pickChoice(
  event: GameEvent,
  indicators: Indicators,
  turn: number,
  multiplier: number,
  strategy: Strategy
): { choice: EventChoice; action: MayorAction | null; result: Indicators } {
  const options: { choice: EventChoice; action: MayorAction | null; result: Indicators }[] = [];
  for (const choice of event.choices) {
    for (const action of availableActions(turn)) {
      options.push({ choice, action, result: resultingIndicators(indicators, choice, action, multiplier) });
    }
  }

  if (strategy === "random") {
    return options[Math.floor(Math.random() * options.length)];
  }
  if (strategy === "worst") {
    return options.reduce((worst, current) =>
      criticalSum(current.result) < criticalSum(worst.result) ? current : worst
    );
  }
  // maximin: maximiza o valor do indicador crítico mais fraco resultante — nunca a soma
  // (somar permitiria sacrificar um eixo crítico para inflar outro).
  return options.reduce((best, current) =>
    criticalMin(current.result) > criticalMin(best.result) ? current : best
  );
}

interface RunResult {
  failed: boolean;
  failedAtTurn: number | null;
  finalAverage: number;
}

function simulateOnce(difficulty: Difficulty, strategy: Strategy): RunResult {
  const multiplier = DIFFICULTY_MULTIPLIERS[difficulty];
  let indicators = createInitialIndicators();
  const deck = buildDeck();

  for (let turn = 1; turn <= TOTAL_TURNS; turn++) {
    const event = deck[turn - 1];
    if (!event) break;
    const { result } = pickChoice(event, indicators, turn, multiplier, strategy);
    indicators = result;

    for (const key of CRITICAL_INDICATORS) {
      if (indicators[key] <= 0) {
        return { failed: true, failedAtTurn: turn, finalAverage: computeAverage(indicators) };
      }
    }
  }

  return { failed: false, failedAtTurn: null, finalAverage: computeAverage(indicators) };
}

const ITERATIONS = 3000;

function runBatch(difficulty: Difficulty, strategy: Strategy): RunResult[] {
  const results: RunResult[] = [];
  for (let i = 0; i < ITERATIONS; i++) {
    results.push(simulateOnce(difficulty, strategy));
  }
  return results;
}

function average(values: number[]): number {
  if (values.length === 0) return NaN;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function summarize(difficulty: Difficulty, strategy: Strategy, results: RunResult[]) {
  const failures = results.filter((r) => r.failed);
  const failureRate = failures.length / results.length;
  const failTurns = failures.map((r) => r.failedAtTurn!);
  const avgFailTurn = average(failTurns);
  const minFailTurn = failTurns.length > 0 ? Math.min(...failTurns) : NaN;
  const avgFinal = average(results.filter((r) => !r.failed).map((r) => r.finalAverage));
  console.log(
    `  [${difficulty.padEnd(8)}][${strategy.padEnd(6)}] falhas: ${(failureRate * 100).toFixed(1)}% ` +
      `(1ª falha no turno: ${isNaN(minFailTurn) ? "–" : minFailTurn} · média: ${isNaN(avgFailTurn) ? "–" : avgFailTurn.toFixed(1)}) · ` +
      `média final (sobreviventes): ${isNaN(avgFinal) ? "–" : avgFinal.toFixed(1)}`
  );
  return { failureRate, avgFailTurn, minFailTurn, avgFinal };
}

let allOk = true;

for (const difficulty of ["facil", "normal", "dificil"] as Difficulty[]) {
  console.log(`\nDificuldade: ${difficulty}`);

  const worst = summarize(difficulty, "worst", runBatch(difficulty, "worst"));
  const best = summarize(difficulty, "best", runBatch(difficulty, "best"));
  summarize(difficulty, "random", runBatch(difficulty, "random"));

  // Metas da Fórmula 7 (ver references/formulas.md), medidas em "A Presidência" e
  // reaplicadas aqui como faixa-alvo para o novo conjunto de dados: o pior caso nunca
  // deve falhar antes de ~40-50% de T (a falha MAIS PRECOCE entre todas as iterações,
  // não a média — a média pode ficar bem mais alta, como em "A Presidência" 12.1 de 16).
  // A meta de 35-65% é calibrada para o normal; fácil/difícil só precisam de um "grace
  // period" sensato (nenhuma combinação catastrófica zera um crítico já nos turnos 1-2).
  const minFailRatio = worst.minFailTurn / TOTAL_TURNS;
  const floor = difficulty === "normal" ? 0.35 : 0.15;
  const ceiling = difficulty === "normal" ? 0.65 : 0.8;
  if (!(minFailRatio >= floor && minFailRatio <= ceiling)) {
    console.log(
      `  ⚠ pior caso: a falha mais precoce foi no turno ${worst.minFailTurn} de ${TOTAL_TURNS} ` +
        `(${(minFailRatio * 100).toFixed(0)}% — meta: ${(floor * 100).toFixed(0)}–${(ceiling * 100).toFixed(0)}%)`
    );
    allOk = false;
  }

  if (difficulty === "normal" && best.failureRate > 0.03) {
    console.log(`  ⚠ melhor caso falha ${(best.failureRate * 100).toFixed(1)}% das vezes no normal (meta: ≈0%)`);
    allOk = false;
  }

  if (difficulty === "normal" && !(best.avgFinal >= 50 && best.avgFinal <= 70)) {
    console.log(`  ⚠ média final do melhor caso (normal) fora da faixa média-alta esperada (50–70): ${best.avgFinal.toFixed(1)}`);
    allOk = false;
  }
}

console.log(allOk ? "\n✅ Balanceamento dentro da faixa-alvo." : "\n❌ Balanceamento fora da faixa-alvo.");
process.exit(allOk ? 0 : 1);
