export type IndicatorKey =
  | "tesouro"
  | "exercito"
  | "fe"
  | "nobreza"
  | "colheita"
  | "prestigio"
  | "herdeiros";

export type Indicators = Record<IndicatorKey, number>;

export interface IndicatorMeta {
  key: IndicatorKey;
  label: string;
  icon: string;
  /** Se true, este indicador chegar a 0 encerra o reinado imediatamente. */
  critical: boolean;
  loseMessage: string;
  description: string;
  chartColor: string;
}

/**
 * Facções do reino: camada separada dos indicadores da coroa, acompanhando o apoio de
 * cada grupo de interesse. Não tem limiar crítico nem afeta vitória/derrota — é um
 * retrato à parte de quem a coroa está agradando ou afastando.
 */
export type FactionKey =
  | "baroes"
  | "clero"
  | "camponeses"
  | "mercadores"
  | "reinoVizinho"
  | "guardaReal";

export type Factions = Record<FactionKey, number>;

export interface FactionMeta {
  key: FactionKey;
  label: string;
  icon: string;
  description: string;
}

/**
 * Posição da escolha/decreto no eixo coroa forte ↔ concessão de poder: -2 é a maior
 * concessão possível a barões/clero/povo, +2 é o absolutismo mais fechado da coroa;
 * 0 é uma decisão técnica sem carga no eixo.
 */
export type Leaning = -2 | -1 | 0 | 1 | 2;

export type EventCategory =
  | "fiscal"
  | "militar"
  | "religiao"
  | "nobreza"
  | "colheita"
  | "diplomacia"
  | "corte"
  | "povo";

export interface EventCategoryMeta {
  key: EventCategory;
  label: string;
  icon: string;
  color: string;
}

export interface EventChoice {
  id: string;
  label: string;
  consequence: string;
  effects: Partial<Record<IndicatorKey, number>>;
  factionEffects?: Partial<Record<FactionKey, number>>;
  leaning: Leaning;
  /** Id de um evento que essa escolha convoca para o próximo turno, se ainda estiver no baralho. */
  triggersEventId?: string;
  /**
   * Marca narrativa que esta escolha grava na crônica da dinastia — persiste além deste
   * reinado e pode liberar ou bloquear eventos específicos nos reinados seguintes
   * (ex.: um pacto com os barões que o neto terá de honrar ou romper).
   */
  grantsLegacyFlag?: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  choices: EventChoice[];
  /** Este evento só entra no baralho se a dinastia já tiver esta marca narrativa. */
  requiresLegacyFlag?: string;
  /** Este evento nunca entra no baralho se a dinastia tiver esta marca narrativa. */
  forbidsLegacyFlag?: string;
}

/** Decreto real: no máximo um por turno, além de reagir ao evento sorteado. */
export interface RoyalDecree {
  id: string;
  label: string;
  description: string;
  effects: Partial<Record<IndicatorKey, number>>;
  factionEffects?: Partial<Record<FactionKey, number>>;
  leaning: Leaning;
  /** Turno mínimo do reinado em que o decreto fica disponível; ausente = disponível desde o início. */
  minTurn?: number;
}

export type GamePhase = "start" | "playing" | "ended";

export type Difficulty = "facil" | "normal" | "dificil";

export interface EndResult {
  victory: boolean;
  title: string;
  narrative: string;
  average: number;
}

/** Resumo de um reinado concluído, preservado na crônica da dinastia. */
export interface ReignSummary {
  reignNumber: number;
  title: string;
  average: number;
  victory: boolean;
  turnsReached: number;
  grantedFlags: string[];
}

export interface GameState {
  phase: GamePhase;
  difficulty: Difficulty;
  indicators: Indicators;
  factions: Factions;
  turn: number;
  totalTurns: number;
  deck: GameEvent[];
  currentEvent: GameEvent | null;
  history: { event: GameEvent; choice: EventChoice; decree: RoyalDecree | null }[];
  indicatorSnapshots: Indicators[];
  factionSnapshots: Factions[];
  endResult: EndResult | null;
  /** Número do reinado atual dentro desta dinastia (1 a TOTAL_REIGNS). */
  reignNumber: number;
  /** Marcas narrativas acumuladas por reinados anteriores desta dinastia. */
  legacyFlags: string[];
  /** Crônica dos reinados já concluídos nesta dinastia (mais antigo primeiro). */
  chronicle: ReignSummary[];
}
