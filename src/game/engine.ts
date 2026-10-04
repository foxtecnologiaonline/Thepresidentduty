import { EVENTS } from "../data/events";
import { CRITICAL_INDICATORS, INDICATOR_META, INDICATOR_ORDER, createInitialIndicators } from "../data/indicators";
import { createInitialSectors } from "../data/sectors";
import type { Difficulty, EndResult, EventChoice, ExecutiveAction, GameEvent, GameState, Indicators } from "../types";

/** Legado que uma gestão concluída transmite à próxima do mesmo ciclo de CEO (Nova Gestão+). */
export interface TenureLegacy {
  /** Delta aplicado aos indicadores iniciais da nova gestão (já pronto para somar, sem precisar reclampar antes). */
  indicatorBonus: Partial<Record<keyof Indicators, number>>;
  tenureTerm: number;
}

export const TOTAL_TURNS = 16;
/** Duração alternativa para uma sessão mais curta ("Sprint"), ~metade do tempo de jogo. */
export const SPRINT_TOTAL_TURNS = 8;

export type SessionLength = "padrao" | "sprint";

export const SESSION_LENGTH_TURNS: Record<SessionLength, number> = {
  padrao: TOTAL_TURNS,
  sprint: SPRINT_TOTAL_TURNS,
};

export const SESSION_LENGTH_LABELS: Record<SessionLength, string> = {
  padrao: "Padrão · 16 trimestres",
  sprint: "Sprint · 8 trimestres",
};

const QUARTER_LABELS = ["T1", "T2", "T3", "T4"];

/** Multiplica a magnitude de todos os efeitos (escolha + diretiva); dificuldade não muda as regras, só o quanto cada decisão pesa. */
export const DIFFICULTY_MULTIPLIERS: Record<Difficulty, number> = {
  facil: 0.7,
  normal: 1,
  dificil: 1.35,
};

/**
 * Fator extra aplicado só na duração Sprint, por cima do multiplicador de dificuldade.
 * Sem isso, a mesma magnitude por turno calibrada para 16 turnos simplesmente não tem
 * tempo de se acumular em 8 — validado por Monte Carlo: ×1 deixava o pior caso (sabotagem)
 * falhar raramente (~6% a dificuldade normal, vs. ~99% nos 16 turnos), e ×1.7 reproduz de
 * perto a mesma proporção de risco (taxa de falha do acaso e do pior caso, turno mínimo de
 * falha como fração de T) que o modo padrão.
 */
const SPRINT_INTENSITY = 1.7;

/** Multiplicador efetivo de uma partida: dificuldade, e o reforço de ritmo quando é Sprint. */
export function effectiveMultiplier(difficulty: Difficulty, totalTurns: number): number {
  const base = DIFFICULTY_MULTIPLIERS[difficulty];
  return totalTurns === TOTAL_TURNS ? base : base * SPRINT_INTENSITY;
}

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

/** Soma das magnitudes de efeito de um evento — proxy simples de "o quanto essa crise pesa". */
function eventIntensity(event: GameEvent): number {
  const total = event.choices.reduce(
    (sum, choice) => sum + Object.values(choice.effects).reduce((s, v) => s + Math.abs(v ?? 0), 0),
    0
  );
  return total / event.choices.length;
}

// Jitter grande o bastante para não virar uma ordenação estritamente crescente (o que
// tornaria a gestão previsível e mudaria a curva de dificuldade já validada), mas que
// ainda inclina o baralho para crises mais pesadas acontecerem mais perto do fim —
// a sequência resultante aplica exatamente os mesmos efeitos totais, só muda a ordem.
const INTENSITY_JITTER = 7;

function orderByEscalatingIntensity(events: GameEvent[]): GameEvent[] {
  return events
    .map((event) => ({ event, sortKey: eventIntensity(event) + Math.random() * INTENSITY_JITTER }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map((entry) => entry.event);
}

/** Evita (sem garantir) duas crises seguidas da mesma categoria temática, trocando a
    segunda ocorrência de lugar com o primeiro evento mais à frente que já resolva o choque. */
function avoidConsecutiveCategories(events: GameEvent[]): GameEvent[] {
  const result = [...events];
  for (let i = 1; i < result.length; i++) {
    if (result[i].category !== result[i - 1].category) continue;
    for (let j = i + 1; j < result.length; j++) {
      const nextCategory = result[i + 1]?.category;
      if (result[j].category !== result[i - 1].category && result[j].category !== nextCategory) {
        [result[i], result[j]] = [result[j], result[i]];
        break;
      }
    }
  }
  return result;
}

export function buildDeck(totalTurns: number): GameEvent[] {
  const drawn = shuffle(EVENTS).slice(0, totalTurns);
  return avoidConsecutiveCategories(orderByEscalatingIntensity(drawn));
}

export function createStartState(): GameState {
  const initialIndicators = createInitialIndicators();
  const initialSectors = createInitialSectors();
  return {
    phase: "start",
    difficulty: "normal",
    indicators: initialIndicators,
    sectors: initialSectors,
    turn: 0,
    totalTurns: TOTAL_TURNS,
    deck: [],
    currentEvent: null,
    history: [],
    indicatorSnapshots: [initialIndicators],
    sectorSnapshots: [initialSectors],
    endResult: null,
    tenureTerm: 1,
  };
}

export function createNewGame(
  difficulty: Difficulty = "normal",
  legacy?: TenureLegacy,
  totalTurns: number = TOTAL_TURNS
): GameState {
  const deck = buildDeck(totalTurns);
  const baseIndicators = createInitialIndicators();
  const initialIndicators = legacy ? applyEffects(baseIndicators, legacy.indicatorBonus) : baseIndicators;
  const initialSectors = createInitialSectors();
  return {
    phase: "playing",
    difficulty,
    indicators: initialIndicators,
    sectors: initialSectors,
    turn: 1,
    totalTurns,
    deck: deck.slice(1),
    currentEvent: deck[0] ?? null,
    history: [],
    indicatorSnapshots: [initialIndicators],
    sectorSnapshots: [initialSectors],
    endResult: null,
    tenureTerm: legacy?.tenureTerm ?? 1,
  };
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/** Aplica um conjunto de efeitos (indicadores OU partes interessadas — qualquer registro 0-100) a um estado atual. */
export function applyEffects<K extends string>(
  current: Record<K, number>,
  effects: Partial<Record<K, number>>
): Record<K, number> {
  const next = { ...current };
  for (const key of Object.keys(effects) as K[]) {
    const delta = effects[key];
    if (delta) {
      next[key] = clamp(next[key] + delta);
    }
  }
  return next;
}

export function mergeEffects<K extends string>(
  a: Partial<Record<K, number>>,
  b: Partial<Record<K, number>> | undefined
): Partial<Record<K, number>> {
  if (!b) return a;
  const merged: Partial<Record<K, number>> = { ...a };
  for (const key of Object.keys(b) as K[]) {
    const delta = b[key];
    if (delta) {
      merged[key] = (merged[key] ?? 0) + delta;
    }
  }
  return merged;
}

export function scaleEffects<K extends string>(
  effects: Partial<Record<K, number>>,
  multiplier: number
): Partial<Record<K, number>> {
  if (multiplier === 1) return effects;
  const scaled: Partial<Record<K, number>> = {};
  for (const key of Object.keys(effects) as K[]) {
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
        title: "Gestão Encerrada",
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
      title: "CEO Lendário",
      narrative:
        "Você encerra a gestão deixando um legado admirado por todo o mercado. Seu nome entra para a história da Orange como referência de liderança excepcional.",
      average,
    };
  }
  if (average >= 60) {
    return {
      victory: true,
      title: "Boa Gestão",
      narrative:
        "Sua gestão foi bem-sucedida. Nem tudo saiu perfeito, mas a Orange termina seu mandato em situação melhor do que começou.",
      average,
    };
  }
  if (average >= 45) {
    return {
      victory: true,
      title: "Gestão Mediana",
      narrative:
        "Você concluiu a gestão, mas sem grandes marcas. A Orange segue enfrentando desafios semelhantes aos do início do seu mandato.",
      average,
    };
  }
  return {
    victory: true,
    title: "Gestão Fraca",
    narrative:
      "Você sobreviveu até o fim do mandato, mas deixa a Orange em situação frágil, com sérios desafios para o próximo CEO.",
    average,
  };
}

export function applyChoice(
  state: GameState,
  choice: EventChoice,
  action: ExecutiveAction | null = null
): GameState {
  if (!state.currentEvent || state.phase !== "playing") {
    return state;
  }

  const multiplier = effectiveMultiplier(state.difficulty, state.totalTurns);
  const combinedEffects = scaleEffects(mergeEffects(choice.effects, action?.effects), multiplier);
  const indicators = applyEffects(state.indicators, combinedEffects);
  const history = [...state.history, { event: state.currentEvent, choice, action }];
  const indicatorSnapshots = [...state.indicatorSnapshots, indicators];

  const combinedSectorEffects = scaleEffects(
    mergeEffects(choice.sectorEffects ?? {}, action?.sectorEffects),
    multiplier
  );
  const sectors = applyEffects(state.sectors, combinedSectorEffects);
  const sectorSnapshots = [...state.sectorSnapshots, sectors];

  const failure = checkCriticalFailure(indicators);
  if (failure) {
    return {
      ...state,
      indicators,
      sectors,
      history,
      indicatorSnapshots,
      sectorSnapshots,
      phase: "ended",
      currentEvent: null,
      endResult: failure,
    };
  }

  if (state.turn >= state.totalTurns) {
    return {
      ...state,
      indicators,
      sectors,
      history,
      indicatorSnapshots,
      sectorSnapshots,
      phase: "ended",
      currentEvent: null,
      endResult: computeLegado(indicators),
    };
  }

  const [nextEvent, ...restDeck] = applyEventTrigger(state.deck, choice.triggersEventId);
  return {
    ...state,
    indicators,
    sectors,
    history,
    indicatorSnapshots,
    sectorSnapshots,
    turn: state.turn + 1,
    deck: restDeck,
    currentEvent: nextEvent ?? null,
  };
}

/**
 * Traz um evento "convocado" para o topo do baralho, se ele ainda estiver por vir —
 * dá à escolha uma consequência narrativa concreta no próximo trimestre. Sem garantia:
 * se o evento alvo não estiver mais no baralho (não foi sorteado para esta partida, ou
 * já foi jogado), a função é um no-op.
 */
function applyEventTrigger(deck: GameEvent[], triggersEventId: string | undefined): GameEvent[] {
  if (!triggersEventId) return deck;
  const index = deck.findIndex((event) => event.id === triggersEventId);
  if (index <= 0) return deck;
  const reordered = [...deck];
  const [triggered] = reordered.splice(index, 1);
  reordered.unshift(triggered);
  return reordered;
}

/**
 * Turno mínimo de uma diretiva, escalado proporcionalmente à duração da sessão. O
 * `minTurn` de cada diretiva (data/actions.ts) é calibrado para a gestão padrão de 16
 * turnos; numa sessão mais curta (Sprint), a mesma fração do jogo precisa se passar
 * antes do desbloqueio, em vez do turno absoluto — senão a diretiva ficaria trancada
 * por mais da metade de uma sessão de 8 turnos.
 */
export function scaledMinTurn(action: ExecutiveAction, totalTurns: number): number | undefined {
  if (!action.minTurn) return undefined;
  if (totalTurns === TOTAL_TURNS) return action.minTurn;
  return Math.max(2, Math.round((action.minTurn / TOTAL_TURNS) * totalTurns));
}

export function formatTurnLabel(turn: number): string {
  const year = Math.ceil(turn / 4);
  const quarter = ((turn - 1) % 4) + 1;
  return `${QUARTER_LABELS[quarter - 1]} · Ano Fiscal ${year}`;
}
