import type { ExecutiveAction } from "../types";

/**
 * Diretivas que o CEO pode emitir por iniciativa própria a cada trimestre,
 * independente do evento sorteado. No máximo uma por turno — os efeitos são
 * deliberadamente menores que os de um evento (o grosso do jogo continua sendo
 * reagir às crises), mas cada uma tem uma contrapartida real, então usar sempre
 * a mesma diretiva tem um custo cumulativo.
 */
export const ACTIONS: ExecutiveAction[] = [
  {
    id: "campanha-marketing",
    label: "Campanha de Marketing Institucional",
    description: "Investe em publicidade para reforçar a imagem da marca Orange.",
    effects: { reputacao: 5, financeiro: -3 },
    sectorEffects: { clientes: 4 },
    leaning: 0,
  },
  {
    id: "reforco-ciberseguranca",
    label: "Reforço de Cibersegurança",
    description: "Destina verba extra para blindar sistemas e dados de clientes contra ataques.",
    effects: { relacoesRegulatorias: 4, financeiro: -3 },
    sectorEffects: { clientes: 3, reguladores: 3 },
    leaning: 0,
  },
  {
    id: "corte-custos",
    label: "Corte de Custos Operacionais",
    description: "Reduz despesas para equilibrar o caixa da empresa.",
    effects: { financeiro: 5, moralFuncionarios: -3 },
    sectorEffects: { investidores: 5, funcionarios: -4 },
    leaning: 2,
  },
  {
    id: "investimento-pd",
    label: "Investimento em P&D e Talentos",
    description: "Amplia recursos para pesquisa de produtos e retenção de engenheiros-chave.",
    effects: { inovacao: 3, moralFuncionarios: 3, financeiro: -3 },
    sectorEffects: { funcionarios: 5, desenvolvedores: 3 },
    leaning: -2,
  },
  {
    id: "turne-lancamento",
    label: "Turnê Global de Lançamento",
    description:
      "Dedica a agenda do trimestre a apresentações e negociações internacionais. Exige uma gestão já consolidada.",
    effects: { relacoesRegulatorias: 5, conselho: -3 },
    sectorEffects: { investidores: 3, reguladores: -3 },
    leaning: 0,
    minTurn: 5,
  },
  {
    id: "negociacao-conselho",
    label: "Negociação Direta com o Conselho",
    description:
      "Negocia nos bastidores com membros do Conselho para ampliar seu apoio interno. Exige capital de liderança acumulado.",
    effects: { conselho: 5, reputacao: -3 },
    sectorEffects: { investidores: 6 },
    leaning: 0,
    minTurn: 5,
  },
  {
    id: "agenda-sustentabilidade",
    label: "Agenda de Sustentabilidade Corporativa",
    description: "Lança metas públicas de redução de impacto ambiental na cadeia produtiva.",
    effects: { sustentabilidade: 5, financeiro: -3 },
    sectorEffects: { clientes: 5, investidores: -4 },
    leaning: -1,
  },
];
