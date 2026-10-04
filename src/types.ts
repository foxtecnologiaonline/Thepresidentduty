export type IndicatorKey =
  | "financeiro"
  | "reputacao"
  | "conselho"
  | "moralFuncionarios"
  | "inovacao"
  | "satisfacaoCliente"
  | "sustentabilidade"
  | "relacoesRegulatorias";

export type Indicators = Record<IndicatorKey, number>;

export interface IndicatorMeta {
  key: IndicatorKey;
  label: string;
  icon: string;
  /** Se true, este indicador chegar a 0 encerra a gestão imediatamente. */
  critical: boolean;
  loseMessage: string;
  /** Explicação curta do que o indicador representa, usada em tooltip. */
  description: string;
  /** Cor categórica fixa do indicador (paleta validada para uso em gráficos). */
  chartColor: string;
}

/**
 * Partes interessadas da Orange: camada separada dos indicadores internos da empresa,
 * acompanhando a aprovação de grupos específicos. Não tem limiar crítico nem afeta
 * vitória/derrota (que continua baseada só nos indicadores) — é um retrato à parte de
 * quem a sua gestão está agradando ou afastando, visível no dashboard e no relatório final.
 */
export type SectorKey =
  | "investidores"
  | "imprensa"
  | "funcionarios"
  | "clientes"
  | "reguladores"
  | "desenvolvedores";

export type Sectors = Record<SectorKey, number>;

export interface SectorMeta {
  key: SectorKey;
  label: string;
  icon: string;
  /** Explicação curta do que a parte interessada representa, usada em tooltip. */
  description: string;
}

/**
 * Posição da escolha/diretiva no eixo de estilo de liderança, numa escala de -2
 * (Visionário: controle, sigilo, obsessão por produto) a +2 (Operador: dados, mercado,
 * delegação); 0 é uma decisão técnica/de sobrevivência corporativa sem carga de estilo.
 */
export type Leaning = -2 | -1 | 0 | 1 | 2;

/** Tema predominante do evento — usado na tag visual do card e para variar o baralho. */
export type EventCategory =
  | "financeiro"
  | "seguranca"
  | "produtos"
  | "pessoas"
  | "sustentabilidade"
  | "mercado"
  | "institucional"
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
  /** Como essa escolha repercute entre as partes interessadas; ausente = nenhum efeito notável. */
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
 * Diretiva executiva que o CEO pode emitir por conta própria a cada trimestre,
 * independente do evento sorteado — no máximo uma por turno.
 */
export interface ExecutiveAction {
  id: string;
  label: string;
  description: string;
  effects: Partial<Record<IndicatorKey, number>>;
  /** Como essa diretiva repercute entre as partes interessadas; ausente = nenhum efeito notável. */
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
  history: { event: GameEvent; choice: EventChoice; action: ExecutiveAction | null }[];
  /** Retrato dos indicadores ao final de cada turno (índice 0 = estado inicial). */
  indicatorSnapshots: Indicators[];
  /** Retrato das partes interessadas ao final de cada turno (índice 0 = estado inicial). */
  sectorSnapshots: Sectors[];
  endResult: EndResult | null;
  /** Quantas gestões consecutivas desse ciclo como CEO já foram jogadas (1 = a primeira). */
  tenureTerm: number;
}
