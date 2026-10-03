export type IndicatorKey =
  | "caixaMunicipal"
  | "aprovacao"
  | "mobilidade"
  | "saneamento"
  | "zeladoria"
  | "cultura"
  | "camara"
  | "ministerioPublico";

export type Indicators = Record<IndicatorKey, number>;

export interface IndicatorMeta {
  key: IndicatorKey;
  label: string;
  icon: string;
  /** Se true, este indicador chegar a 0 encerra o mandato imediatamente. */
  critical: boolean;
  loseMessage: string;
  /** Explicação curta do que o indicador representa, usada em tooltip. */
  description: string;
  /** Cor categórica fixa do indicador (paleta validada para uso em gráficos). */
  chartColor: string;
}

/**
 * Facções da cidade: camada separada dos indicadores de governo, acompanhando a
 * aprovação de grupos específicos. Não tem limiar crítico nem afeta vitória/derrota
 * (que continua baseada só nos indicadores) — é um retrato à parte de quem a prefeitura
 * está agradando ou afastando, visível no dashboard e no relatório final.
 */
export type SectorKey =
  | "vereadores"
  | "servidores"
  | "comerciantes"
  | "moradoresPeriferia"
  | "imprensaLocal"
  | "igrejas";

export type Sectors = Record<SectorKey, number>;

export interface SectorMeta {
  key: SectorKey;
  label: string;
  icon: string;
  /** Explicação curta do que a facção representa, usada em tooltip. */
  description: string;
}

/**
 * Posição da escolha/diretiva no eixo urbanístico, numa escala de -2 (preservação de
 * bairro) a +2 (expansão urbana); 0 é uma decisão de sobrevivência política sem carga
 * urbanística marcada.
 */
export type Leaning = -2 | -1 | 0 | 1 | 2;

/** Tema predominante do evento — usado na tag visual do card e para variar o baralho. */
export type EventCategory =
  | "orcamento"
  | "mobilidade"
  | "saneamento"
  | "urbanismo"
  | "cultura"
  | "institucional"
  | "judicial"
  | "social";

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
  /** Como essa escolha repercute entre as facções da cidade; ausente = nenhum efeito notável. */
  sectorEffects?: Partial<Record<SectorKey, number>>;
  leaning: Leaning;
  /**
   * Id de um evento que essa escolha "convoca" para o trimestre seguinte, se ele ainda
   * estiver no baralho e não tiver sido jogado — uma consequência narrativa concreta além
   * dos números. Sem garantia: se o evento alvo não foi sorteado para esta partida, não
   * tem efeito.
   */
  triggersEventId?: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  choices: EventChoice[];
}

/**
 * Ação de gestão que o prefeito pode emitir por conta própria a cada trimestre,
 * independente do evento sorteado — no máximo uma por turno.
 */
export interface MayorAction {
  id: string;
  label: string;
  description: string;
  effects: Partial<Record<IndicatorKey, number>>;
  /** Como essa diretiva repercute entre as facções da cidade; ausente = nenhum efeito notável. */
  sectorEffects?: Partial<Record<SectorKey, number>>;
  leaning: Leaning;
  /** Turno mínimo em que a diretiva fica disponível; ausente = disponível desde o início. */
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

export interface GameState {
  phase: GamePhase;
  difficulty: Difficulty;
  indicators: Indicators;
  sectors: Sectors;
  turn: number;
  totalTurns: number;
  deck: GameEvent[];
  currentEvent: GameEvent | null;
  history: { event: GameEvent; choice: EventChoice; action: MayorAction | null }[];
  /** Retrato dos indicadores ao final de cada turno (índice 0 = estado inicial). */
  indicatorSnapshots: Indicators[];
  /** Retrato das facções ao final de cada turno (índice 0 = estado inicial). */
  sectorSnapshots: Sectors[];
  endResult: EndResult | null;
  /** Quantos mandatos consecutivos dessa dinastia política já foram jogados (1 = o primeiro). */
  dynastyTerm: number;
}
