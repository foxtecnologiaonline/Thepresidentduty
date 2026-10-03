import type { MayorAction } from "../types";

/**
 * Diretivas que o prefeito pode emitir por iniciativa própria a cada trimestre,
 * independente do evento sorteado. No máximo uma por turno — os efeitos são
 * deliberadamente menores que os de um evento (o grosso do jogo continua sendo
 * reagir às crises), mas cada uma tem uma contrapartida real, então usar sempre
 * a mesma diretiva tem um custo cumulativo.
 */
export const ACTIONS: MayorAction[] = [
  {
    id: "campanha-marketing",
    label: "Campanha de Marketing da Prefeitura",
    description: "Investe em publicidade institucional para melhorar a imagem da gestão.",
    effects: { popularidade: 5, orcamento: -3 },
    sectorEffects: { populacao: 4 },
    leaning: -1,
  },
  {
    id: "choque-de-ordem",
    label: "Choque de Ordem",
    description: "Reforça imediatamente o efetivo da Guarda Municipal nas ruas, com forte presença visível.",
    effects: { seguranca: 5, orcamento: -3 },
    sectorEffects: { guardaMunicipal: 4, associacoesBairro: -4 },
    leaning: -1,
  },
  {
    id: "ajuste-fiscal",
    label: "Ajuste Fiscal Técnico",
    description: "Contingencia despesas e reorganiza contratos para equilibrar as contas da prefeitura.",
    effects: { orcamento: 5, popularidade: -3 },
    sectorEffects: { empresariadoLocal: 5, populacao: -4 },
    leaning: 2,
  },
  {
    id: "programa-social-emergencial",
    label: "Programa Social Emergencial",
    description: "Amplia na hora cestas básicas, auxílio-aluguel e atendimento nas UBS dos bairros mais pobres.",
    effects: { saude: 3, educacao: 3, orcamento: -4 },
    sectorEffects: { populacao: 5, associacoesBairro: 3 },
    leaning: -2,
  },
  {
    id: "articulacao-estado-uniao",
    label: "Articulação com Estado e União",
    description:
      "Dedica a agenda do trimestre a viagens e negociações por convênios e repasses extras. Exige uma gestão já consolidada.",
    effects: { orcamento: 5, governabilidade: -3 },
    sectorEffects: { empresariadoLocal: 3, vereadores: -3 },
    leaning: 0,
    minTurn: 5,
  },
  {
    id: "articulacao-camara",
    label: "Articulação com a Câmara",
    description:
      "Negocia cargos e emendas nos bastidores com vereadores para ampliar sua base aliada. Exige capital político acumulado.",
    effects: { governabilidade: 5, popularidade: -3 },
    sectorEffects: { vereadores: 6 },
    leaning: -1,
    minTurn: 5,
  },
  {
    id: "plano-diretor-sustentavel",
    label: "Plano Diretor Sustentável",
    description: "Lança um plano técnico de longo prazo para saneamento, áreas verdes e prevenção de enchentes.",
    effects: { meioAmbiente: 5, orcamento: -3 },
    sectorEffects: { associacoesBairro: 5, empresariadoLocal: -4 },
    leaning: 2,
  },
];
