import type { PresidentialAction } from "../types";

/**
 * Diretivas que o presidente pode emitir por iniciativa própria a cada trimestre,
 * independente do evento sorteado. No máximo uma por turno — os efeitos são
 * deliberadamente menores que os de um evento (o grosso do jogo continua sendo
 * reagir às crises), mas cada uma tem uma contrapartida real, então usar sempre
 * a mesma diretiva tem um custo cumulativo.
 */
export const ACTIONS: PresidentialAction[] = [
  {
    id: "campanha-comunicacao",
    label: "Campanha de Comunicação",
    description: "Investe em publicidade institucional para melhorar a imagem do governo.",
    effects: { popularidade: 5, economia: -3 },
    sectorEffects: { populacao: 4 },
    leaning: 0,
  },
  {
    id: "reforco-policiamento",
    label: "Reforço do Policiamento",
    description: "Destina verba extra para reforçar o policiamento nas ruas.",
    effects: { seguranca: 5, economia: -3 },
    sectorEffects: { militares: 4, movimentosSociais: -4 },
    leaning: 2,
  },
  {
    id: "corte-gastos",
    label: "Corte de Gastos Públicos",
    description: "Reduz despesas do governo para equilibrar as contas.",
    effects: { economia: 5, popularidade: -3 },
    sectorEffects: { empresariado: 5, populacao: -4 },
    leaning: 2,
  },
  {
    id: "investimento-social",
    label: "Investimento Social",
    description: "Amplia recursos para a rede pública de saúde e educação.",
    effects: { saude: 3, educacao: 3, economia: -4 },
    sectorEffects: { populacao: 5, movimentosSociais: 3 },
    leaning: -2,
  },
  {
    id: "diplomacia-presidencial",
    label: "Diplomacia Presidencial",
    description:
      "Dedica a agenda do trimestre a viagens e negociações internacionais. Exige um governo já consolidado.",
    effects: { relacoesInternacionais: 5, governabilidade: -3 },
    sectorEffects: { empresariado: 3, politicos: -3 },
    leaning: 0,
    minTurn: 5,
  },
  {
    id: "articulacao-politica",
    label: "Articulação Política",
    description:
      "Negocia nos bastidores com líderes do Congresso para ampliar sua base aliada. Exige capital político acumulado.",
    effects: { governabilidade: 5, popularidade: -3 },
    sectorEffects: { politicos: 6 },
    leaning: 0,
    minTurn: 5,
  },
  {
    id: "agenda-ambiental",
    label: "Agenda Ambiental",
    description: "Lança medidas de proteção ambiental e fiscalização do desmatamento.",
    effects: { meioAmbiente: 5, economia: -3 },
    sectorEffects: { movimentosSociais: 5, empresariado: -4 },
    leaning: -1,
  },
];
