import {
  applyEffects,
  avoidConsecutiveCategories,
  mergeEffects,
  orderByEscalatingIntensity,
  scaleEffects,
  shuffle,
} from "../../game/engine";
import { EVENTS } from "../data/events";
import {
  CRITICAL_INDICATORS,
  FRAGILE_SUCCESSION_THRESHOLD,
  INDICATOR_META,
  INDICATOR_ORDER,
  createInitialIndicators,
} from "../data/indicators";
import { createInitialFactions } from "../data/factions";
import type {
  Difficulty,
  EndResult,
  EventCategory,
  EventChoice,
  GameEvent,
  GameState,
  Indicators,
  ReignSummary,
  RoyalDecree,
} from "../types";

/**
 * Legado que um reinado concluído transmite ao próximo da mesma dinastia: um bônus
 * numérico modesto (Nova Partida+, Fórmula 12) somado a marcas narrativas que persistem
 * além do número — eventos que só existem nos reinados seguintes porque um ancestral
 * específico fez uma escolha específica.
 */
export interface DynastyLegacy {
  indicatorBonus: Partial<Record<keyof Indicators, number>>;
  reignNumber: number;
  legacyFlags: string[];
  chronicle: ReignSummary[];
}

export const TOTAL_TURNS = 12;
export const TOTAL_REIGNS = 5;

/** Multiplica a magnitude de todos os efeitos (escolha + decreto); a dificuldade nunca muda as regras, só o quanto cada decisão pesa. */
export const DIFFICULTY_MULTIPLIERS: Record<Difficulty, number> = {
  facil: 0.7,
  normal: 1,
  dificil: 1.35,
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  facil: "Fácil",
  normal: "Normal",
  dificil: "Difícil",
};

/** Só entram no baralho os eventos cujas marcas narrativas de ancestrais batem com esta dinastia. */
function eligibleEvents(legacyFlags: string[]): GameEvent[] {
  return EVENTS.filter((event) => {
    if (event.requiresLegacyFlag && !legacyFlags.includes(event.requiresLegacyFlag)) return false;
    if (event.forbidsLegacyFlag && legacyFlags.includes(event.forbidsLegacyFlag)) return false;
    return true;
  });
}

/**
 * Categorias que cada reinado da dinastia puxa com mais força — dá a cada um dos 5 um
 * "clima" temático sutil (o reinado de instalação não é o mesmo da crise sucessória
 * final) sem mexer em nenhuma magnitude de efeito: só em QUAIS eventos têm mais chance
 * de ser sorteados. Reinados fora de 1–5 (não deveria acontecer, mas por segurança)
 * caem no sorteio neutro de `buildDeck`.
 */
export const REIGN_CATEGORY_EMPHASIS: Partial<Record<number, EventCategory[]>> = {
  1: ["corte", "colheita"],
  2: ["fiscal", "diplomacia"],
  3: ["nobreza", "militar"],
  4: ["religiao", "povo"],
  5: ["nobreza", "corte"],
};

/** Peso do sorteio A-ES (Efraimidis–Spirakis): eventos emphasized saem ~2x mais fácil,
    mas nenhum evento fica inacessível — ainda é possível puxar qualquer outra categoria. */
const EMPHASIS_WEIGHT = 2;

/**
 * Amostragem aleatória sem reposição e ponderada por peso (algoritmo A-ES): cada item
 * recebe uma chave `random() ** (1/peso)` e os `k` maiores vencem. Pesos maiores
 * puxam o item pra frente com mais frequência sem nunca excluir os demais — é uma
 * versão com viés do mesmo `shuffle(...).slice(0, k)` que o motor já usava.
 */
function weightedSampleWithoutReplacement<T>(items: T[], weightOf: (item: T) => number, k: number): T[] {
  return items
    .map((item) => ({ item, key: Math.random() ** (1 / weightOf(item)) }))
    .sort((a, b) => b.key - a.key)
    .slice(0, k)
    .map((entry) => entry.item);
}

export function buildDeck(legacyFlags: string[] = [], reignNumber = 1): GameEvent[] {
  const pool = eligibleEvents(legacyFlags);
  const emphasis = REIGN_CATEGORY_EMPHASIS[reignNumber];
  const drawn = emphasis
    ? weightedSampleWithoutReplacement(pool, (event) => (emphasis.includes(event.category) ? EMPHASIS_WEIGHT : 1), TOTAL_TURNS)
    : shuffle(pool).slice(0, TOTAL_TURNS);
  return avoidConsecutiveCategories(orderByEscalatingIntensity(drawn));
}

/** Uma linha de clima narrativo mostrada ao jogador no primeiro ano de cada reinado. */
export const REIGN_INTRO_NARRATIVE: Partial<Record<number, string>> = {
  1: "Um novo reinado começa. A corte observa como o herdeiro vai lidar com as rotinas do trono.",
  2: "O reino já conhece este governante. Comércio e diplomacia cobram atenção.",
  3: "Barões e generais testam os limites da autoridade real neste reinado.",
  4: "Fé e povo pressionam a coroa de formas que o ouro sozinho não resolve.",
  5: "O último reinado desta linhagem começa — tudo o que os antepassados construíram converge aqui.",
};

export function createStartState(): GameState {
  const initialIndicators = createInitialIndicators();
  const initialFactions = createInitialFactions();
  return {
    phase: "start",
    difficulty: "normal",
    indicators: initialIndicators,
    factions: initialFactions,
    turn: 0,
    totalTurns: TOTAL_TURNS,
    deck: [],
    currentEvent: null,
    history: [],
    indicatorSnapshots: [initialIndicators],
    factionSnapshots: [initialFactions],
    endResult: null,
    reignNumber: 1,
    legacyFlags: [],
    chronicle: [],
  };
}

export function createNewReign(difficulty: Difficulty = "normal", legacy?: DynastyLegacy): GameState {
  const legacyFlags = legacy?.legacyFlags ?? [];
  const reignNumber = legacy?.reignNumber ?? 1;
  const deck = buildDeck(legacyFlags, reignNumber);
  const baseIndicators = createInitialIndicators();
  const initialIndicators = legacy ? applyEffects(baseIndicators, legacy.indicatorBonus) : baseIndicators;
  const initialFactions = createInitialFactions();
  return {
    phase: "playing",
    difficulty,
    indicators: initialIndicators,
    factions: initialFactions,
    turn: 1,
    totalTurns: TOTAL_TURNS,
    deck: deck.slice(1),
    currentEvent: deck[0] ?? null,
    history: [],
    indicatorSnapshots: [initialIndicators],
    factionSnapshots: [initialFactions],
    endResult: null,
    reignNumber,
    legacyFlags,
    chronicle: legacy?.chronicle ?? [],
  };
}

export function computeAverage(indicators: Indicators): number {
  return INDICATOR_ORDER.reduce((sum, key) => sum + indicators[key], 0) / INDICATOR_ORDER.length;
}

function successionFootnote(indicators: Indicators): string {
  return indicators.herdeiros <= FRAGILE_SUCCESSION_THRESHOLD
    ? " Para piorar, a linhagem real está perigosamente fragilizada: os barões vão testar o próximo herdeiro assim que ele assumir o trono."
    : "";
}

function checkCriticalFailure(indicators: Indicators): EndResult | null {
  for (const key of CRITICAL_INDICATORS) {
    if (indicators[key] <= 0) {
      return {
        victory: false,
        title: "Reinado Encerrado",
        narrative: INDICATOR_META[key].loseMessage + successionFootnote(indicators),
        average: computeAverage(indicators),
      };
    }
  }
  return null;
}

function computeTierResult(indicators: Indicators): EndResult {
  const average = computeAverage(indicators);
  const footnote = successionFootnote(indicators);

  if (average >= 75) {
    return {
      victory: true,
      title: "Era de Ouro",
      narrative:
        "O reinado entra para a história como uma era de prosperidade e poder. Bardos e cronistas vão cantar este nome por gerações." +
        footnote,
      average,
    };
  }
  if (average >= 60) {
    return {
      victory: true,
      title: "Reinado Próspero",
      narrative:
        "O reinado foi bem-sucedido. Nem tudo saiu perfeito, mas o reino termina em situação melhor do que começou." +
        footnote,
      average,
    };
  }
  if (average >= 45) {
    return {
      victory: true,
      title: "Reinado Turbulento",
      narrative:
        "O trono resistiu até o fim, mas sem grandes marcas. O reino segue enfrentando desafios semelhantes aos do início deste reinado." +
        footnote,
      average,
    };
  }
  return {
    victory: true,
    title: "Reinado Sombrio",
    narrative:
      "O trono sobreviveu até o fim, mas deixa o reino frágil, com sérios desafios para o próximo herdeiro." + footnote,
    average,
  };
}

export function applyChoice(
  state: GameState,
  choice: EventChoice,
  decree: RoyalDecree | null = null
): GameState {
  if (!state.currentEvent || state.phase !== "playing") {
    return state;
  }

  const multiplier = DIFFICULTY_MULTIPLIERS[state.difficulty];
  const combinedEffects = scaleEffects(mergeEffects(choice.effects, decree?.effects), multiplier);
  const indicators = applyEffects(state.indicators, combinedEffects);
  const history = [...state.history, { event: state.currentEvent, choice, decree }];
  const indicatorSnapshots = [...state.indicatorSnapshots, indicators];

  const combinedFactionEffects = scaleEffects(
    mergeEffects(choice.factionEffects ?? {}, decree?.factionEffects),
    multiplier
  );
  const factions = applyEffects(state.factions, combinedFactionEffects);
  const factionSnapshots = [...state.factionSnapshots, factions];

  const failure = checkCriticalFailure(indicators);
  if (failure) {
    return {
      ...state,
      indicators,
      factions,
      history,
      indicatorSnapshots,
      factionSnapshots,
      phase: "ended",
      currentEvent: null,
      endResult: failure,
    };
  }

  if (state.turn >= state.totalTurns) {
    return {
      ...state,
      indicators,
      factions,
      history,
      indicatorSnapshots,
      factionSnapshots,
      phase: "ended",
      currentEvent: null,
      endResult: computeTierResult(indicators),
    };
  }

  const [nextEvent, ...restDeck] = applyEventTrigger(state.deck, choice.triggersEventId);
  return {
    ...state,
    indicators,
    factions,
    history,
    indicatorSnapshots,
    factionSnapshots,
    turn: state.turn + 1,
    deck: restDeck,
    currentEvent: nextEvent ?? null,
  };
}

function applyEventTrigger(deck: GameEvent[], triggersEventId: string | undefined): GameEvent[] {
  if (!triggersEventId) return deck;
  const index = deck.findIndex((event) => event.id === triggersEventId);
  if (index <= 0) return deck;
  const reordered = [...deck];
  const [triggered] = reordered.splice(index, 1);
  reordered.unshift(triggered);
  return reordered;
}

/** Marcas narrativas concedidas pelas escolhas deste reinado, na ordem em que foram ganhas, sem repetição. */
export function grantedFlagsThisReign(state: Pick<GameState, "history">): string[] {
  const flags: string[] = [];
  for (const entry of state.history) {
    const flag = entry.choice.grantsLegacyFlag;
    if (flag && !flags.includes(flag)) flags.push(flag);
  }
  return flags;
}

export function buildReignSummary(state: GameState): ReignSummary {
  if (!state.endResult) {
    throw new Error("Não é possível resumir um reinado que ainda não terminou.");
  }
  return {
    reignNumber: state.reignNumber,
    title: state.endResult.title,
    average: state.endResult.average,
    victory: state.endResult.victory,
    turnsReached: state.history.length,
    grantedFlags: grantedFlagsThisReign(state),
  };
}

/** Fração do prestígio final que o sucessor herda ao continuar a dinastia — modesta de
    propósito (Fórmula 12), para dar peso à continuidade sem deixar um reinado ruim travar os seguintes. */
const DYNASTY_CARRYOVER = 0.2;
const INITIAL_PRESTIGIO = createInitialIndicators().prestigio;

// Faixa "pequena" da Fórmula 2: a penalidade precisa ser sentida, mas nunca travar
// sozinha o reinado seguinte. Dá peso real ao aviso de sucessão fragilizada (Fórmula 8 —
// nunca deixar o jogador surpreso) em vez de ser só uma frase de efeito sem consequência.
const FRAGILE_SUCCESSION_PENALTY = -5;

export function buildNextLegacy(state: GameState): DynastyLegacy {
  const summary = buildReignSummary(state);
  const mergedFlags = [...new Set([...state.legacyFlags, ...summary.grantedFlags])];
  const wasFragileSuccession = state.indicators.herdeiros <= FRAGILE_SUCCESSION_THRESHOLD;
  return {
    indicatorBonus: {
      prestigio: Math.round((state.indicators.prestigio - INITIAL_PRESTIGIO) * DYNASTY_CARRYOVER),
      ...(wasFragileSuccession ? { nobreza: FRAGILE_SUCCESSION_PENALTY } : {}),
    },
    reignNumber: state.reignNumber + 1,
    legacyFlags: mergedFlags,
    chronicle: [...state.chronicle, summary],
  };
}

/** O 5º (e último) reinado já foi alcançado — ponto único usado pela tela de fim de
    reinado e pelas conquistas de dinastia inteira, para as duas nunca divergirem. */
export function isDynastyFinished(reignNumber: number): boolean {
  return reignNumber >= TOTAL_REIGNS;
}

export interface DynastyTierResult {
  title: string;
  narrative: string;
  overallAverage: number;
}

/** Avalia a linhagem inteira ao fim do 5º reinado — a média dos 5 reinados, não só do último. */
export function computeDynastyTier(chronicle: ReignSummary[]): DynastyTierResult {
  const overallAverage = chronicle.reduce((sum, r) => sum + r.average, 0) / chronicle.length;
  const collapses = chronicle.filter((r) => !r.victory).length;

  if (overallAverage >= 70) {
    return {
      title: "Dinastia Lendária",
      narrative:
        "Cinco gerações depois, o nome desta família ainda é cantado nos salões do reino. Uma linhagem que os cronistas vão estudar por séculos.",
      overallAverage,
    };
  }
  if (overallAverage >= 55) {
    return {
      title: "Dinastia Consolidada",
      narrative:
        "A linhagem atravessou cinco reinados com o trono sempre firme. Nem todos foram memoráveis, mas a coroa nunca vacilou de verdade.",
      overallAverage,
    };
  }
  if (overallAverage >= 40) {
    return {
      title: "Dinastia Esquecida",
      narrative:
        "Cinco reinados se passaram sem glória nem desastre total. A história vai lembrar desta família com uma nota de rodapé, não um capítulo.",
      overallAverage,
    };
  }
  return {
    title: collapses >= 3 ? "Dinastia Extinta" : "Dinastia Decadente",
    narrative:
      collapses >= 3
        ? "O trono mudou de mãos tantas vezes em crise que a linhagem original se perdeu na confusão. Pouco resta do nome com que esta dinastia começou."
        : "A linhagem sobreviveu aos cinco reinados, mas deixa o reino mais frágil do que o encontrou. Os próximos a reivindicar o trono terão um longo trabalho pela frente.",
    overallAverage,
  };
}

export function formatTurnLabel(turn: number): string {
  return `Ano ${turn} do Reinado`;
}
