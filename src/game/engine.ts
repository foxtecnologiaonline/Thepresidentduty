import { EVENTS } from "../data/events";
import { CRITICAL_INDICATORS, INDICATOR_META, INDICATOR_ORDER, createInitialIndicators } from "../data/indicators";
import type { Difficulty, EndResult, EventChoice, GameEvent, GameState, Indicators, PresidentialAction } from "../types";

export const TOTAL_TURNS = 16;

const QUARTER_MONTHS = ["Jan–Mar", "Abr–Jun", "Jul–Set", "Out–Dez"];

/** Multiplica a magnitude de todos os efeitos (escolha + diretiva); dificuldade não muda as regras, só o quanto cada decisão pesa. */
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

function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function buildDeck(): GameEvent[] {
  return shuffle(EVENTS).slice(0, TOTAL_TURNS);
}

export function createStartState(): GameState {
  return {
    phase: "start",
    difficulty: "normal",
    indicators: createInitialIndicators(),
    turn: 0,
    totalTurns: TOTAL_TURNS,
    deck: [],
    currentEvent: null,
    history: [],
    indicatorSnapshots: [createInitialIndicators()],
    endResult: null,
  };
}

export function createNewGame(difficulty: Difficulty = "normal"): GameState {
  const deck = buildDeck();
  const initial = createInitialIndicators();
  return {
    phase: "playing",
    difficulty,
    indicators: initial,
    turn: 1,
    totalTurns: TOTAL_TURNS,
    deck: deck.slice(1),
    currentEvent: deck[0] ?? null,
    history: [],
    indicatorSnapshots: [initial],
    endResult: null,
  };
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function applyEffects(indicators: Indicators, effects: EventChoice["effects"]): Indicators {
  const next = { ...indicators };
  for (const key of INDICATOR_ORDER) {
    const delta = effects[key];
    if (delta) {
      next[key] = clamp(next[key] + delta);
    }
  }
  return next;
}

export function mergeEffects(
  a: EventChoice["effects"],
  b: EventChoice["effects"] | undefined
): EventChoice["effects"] {
  if (!b) return a;
  const merged: EventChoice["effects"] = { ...a };
  for (const key of INDICATOR_ORDER) {
    const delta = b[key];
    if (delta) {
      merged[key] = (merged[key] ?? 0) + delta;
    }
  }
  return merged;
}

export function scaleEffects(effects: EventChoice["effects"], multiplier: number): EventChoice["effects"] {
  if (multiplier === 1) return effects;
  const scaled: EventChoice["effects"] = {};
  for (const key of INDICATOR_ORDER) {
    const delta = effects[key];
    if (delta) {
      scaled[key] = Math.round(delta * multiplier);
    }
  }
  return scaled;
}

export function computeAverage(indicators: Indicators): number {
  return INDICATOR_ORDER.reduce((sum, key) => sum + indicators[key], 0) / INDICATOR_ORDER.length;
}

function checkCriticalFailure(indicators: Indicators): EndResult | null {
  for (const key of CRITICAL_INDICATORS) {
    if (indicators[key] <= 0) {
      return {
        victory: false,
        title: "Mandato Encerrado",
        narrative: INDICATOR_META[key].loseMessage,
        average: computeAverage(indicators),
      };
    }
  }
  return null;
}

function computeLegado(indicators: Indicators): EndResult {
  const average = computeAverage(indicators);

  if (average >= 75) {
    return {
      victory: true,
      title: "Estadista Histórico",
      narrative:
        "Você concluiu o mandato deixando um legado admirado por todo o país. Seu nome entra para a história como referência de bom governo.",
      average,
    };
  }
  if (average >= 60) {
    return {
      victory: true,
      title: "Bom Governo",
      narrative:
        "Seu mandato foi bem-sucedido. Nem tudo saiu perfeito, mas o país termina seu governo em situação melhor do que começou.",
      average,
    };
  }
  if (average >= 45) {
    return {
      victory: true,
      title: "Mandato Mediano",
      narrative:
        "Você concluiu o mandato, mas sem grandes marcas. O país segue enfrentando desafios semelhantes aos do início do seu governo.",
      average,
    };
  }
  return {
    victory: true,
    title: "Governo Fraco",
    narrative:
      "Você sobreviveu até o fim do mandato, mas deixa o país em situação frágil, com sérios desafios para o próximo governo.",
    average,
  };
}

export function applyChoice(
  state: GameState,
  choice: EventChoice,
  action: PresidentialAction | null = null
): GameState {
  if (!state.currentEvent || state.phase !== "playing") {
    return state;
  }

  const multiplier = DIFFICULTY_MULTIPLIERS[state.difficulty];
  const combinedEffects = scaleEffects(mergeEffects(choice.effects, action?.effects), multiplier);
  const indicators = applyEffects(state.indicators, combinedEffects);
  const history = [...state.history, { event: state.currentEvent, choice, action }];
  const indicatorSnapshots = [...state.indicatorSnapshots, indicators];

  const failure = checkCriticalFailure(indicators);
  if (failure) {
    return {
      ...state,
      indicators,
      history,
      indicatorSnapshots,
      phase: "ended",
      currentEvent: null,
      endResult: failure,
    };
  }

  if (state.turn >= state.totalTurns) {
    return {
      ...state,
      indicators,
      history,
      indicatorSnapshots,
      phase: "ended",
      currentEvent: null,
      endResult: computeLegado(indicators),
    };
  }

  const [nextEvent, ...restDeck] = state.deck;
  return {
    ...state,
    indicators,
    history,
    indicatorSnapshots,
    turn: state.turn + 1,
    deck: restDeck,
    currentEvent: nextEvent ?? null,
  };
}

export function formatTurnLabel(turn: number): string {
  const year = Math.ceil(turn / 4);
  const quarter = ((turn - 1) % 4) + 1;
  return `${QUARTER_MONTHS[quarter - 1]} · Ano ${year}`;
}
