export type IndicatorKey =
  | "economia"
  | "popularidade"
  | "seguranca"
  | "saude"
  | "educacao"
  | "meioAmbiente"
  | "relacoesInternacionais"
  | "governabilidade";

export type Indicators = Record<IndicatorKey, number>;

export interface IndicatorMeta {
  key: IndicatorKey;
  label: string;
  icon: string;
  /** Se true, este indicador chegar a 0 encerra o mandato imediatamente. */
  critical: boolean;
  loseMessage: string;
}

export interface EventChoice {
  id: string;
  label: string;
  consequence: string;
  effects: Partial<Record<IndicatorKey, number>>;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  choices: EventChoice[];
}

export type GamePhase = "start" | "playing" | "ended";

export interface EndResult {
  victory: boolean;
  title: string;
  narrative: string;
}

export interface GameState {
  phase: GamePhase;
  indicators: Indicators;
  turn: number;
  totalTurns: number;
  deck: GameEvent[];
  currentEvent: GameEvent | null;
  history: { event: GameEvent; choice: EventChoice }[];
  endResult: EndResult | null;
}
