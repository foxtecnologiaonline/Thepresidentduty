import { EVENTS } from "../data/events";
import { CRITICAL_INDICATORS, INDICATOR_META, INDICATOR_ORDER, createInitialIndicators } from "../data/indicators";
import type { EndResult, EventChoice, GameEvent, GameState, Indicators } from "../types";

export const TOTAL_TURNS = 16;

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
    indicators: createInitialIndicators(),
    turn: 0,
    totalTurns: TOTAL_TURNS,
    deck: [],
    currentEvent: null,
    history: [],
    endResult: null,
  };
}

export function createNewGame(): GameState {
  const deck = buildDeck();
  return {
    phase: "playing",
    indicators: createInitialIndicators(),
    turn: 1,
    totalTurns: TOTAL_TURNS,
    deck: deck.slice(1),
    currentEvent: deck[0] ?? null,
    history: [],
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

function checkCriticalFailure(indicators: Indicators): EndResult | null {
  for (const key of CRITICAL_INDICATORS) {
    if (indicators[key] <= 0) {
      return {
        victory: false,
        title: "Mandato Encerrado",
        narrative: INDICATOR_META[key].loseMessage,
      };
    }
  }
  return null;
}

function computeLegado(indicators: Indicators): EndResult {
  const average =
    INDICATOR_ORDER.reduce((sum, key) => sum + indicators[key], 0) / INDICATOR_ORDER.length;

  if (average >= 75) {
    return {
      victory: true,
      title: "Estadista Histórico",
      narrative:
        "Você concluiu o mandato deixando um legado admirado por todo o país. Seu nome entra para a história como referência de bom governo.",
    };
  }
  if (average >= 60) {
    return {
      victory: true,
      title: "Bom Governo",
      narrative:
        "Seu mandato foi bem-sucedido. Nem tudo saiu perfeito, mas o país termina seu governo em situação melhor do que começou.",
    };
  }
  if (average >= 45) {
    return {
      victory: true,
      title: "Mandato Mediano",
      narrative:
        "Você concluiu o mandato, mas sem grandes marcas. O país segue enfrentando desafios semelhantes aos do início do seu governo.",
    };
  }
  return {
    victory: true,
    title: "Governo Fraco",
    narrative:
      "Você sobreviveu até o fim do mandato, mas deixa o país em situação frágil, com sérios desafios para o próximo governo.",
  };
}

export function applyChoice(state: GameState, choice: EventChoice): GameState {
  if (!state.currentEvent || state.phase !== "playing") {
    return state;
  }

  const indicators = applyEffects(state.indicators, choice.effects);
  const history = [...state.history, { event: state.currentEvent, choice }];

  const failure = checkCriticalFailure(indicators);
  if (failure) {
    return {
      ...state,
      indicators,
      history,
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
    turn: state.turn + 1,
    deck: restDeck,
    currentEvent: nextEvent ?? null,
  };
}

export function formatTurnLabel(turn: number): string {
  const year = Math.ceil(turn / 4);
  const quarter = ((turn - 1) % 4) + 1;
  return `Ano ${year} · ${quarter}º trimestre`;
}
