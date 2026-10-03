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
    effects: { aprovacao: 5, caixaMunicipal: -3 },
    sectorEffects: { moradoresPeriferia: 3, imprensaLocal: 2 },
    leaning: 0,
  },
  {
    id: "mutirao-de-zeladoria",
    label: "Mutirão de Zeladoria",
    description: "Reforça na hora o tapa-buracos, a iluminação e a limpeza nos bairros mais reclamados.",
    effects: { zeladoria: 5, caixaMunicipal: -3 },
    sectorEffects: { moradoresPeriferia: 4 },
    leaning: 0,
  },
  {
    id: "ajuste-fiscal",
    label: "Ajuste Fiscal Técnico",
    description: "Contingencia despesas e reorganiza contratos para equilibrar as contas da prefeitura.",
    effects: { caixaMunicipal: 5, aprovacao: -3 },
    sectorEffects: { comerciantes: 4, servidores: -4 },
    leaning: 0,
  },
  {
    id: "articulacao-camara",
    label: "Articulação com a Câmara",
    description:
      "Negocia cargos e emendas nos bastidores com vereadores para ampliar sua base aliada. Exige capital político acumulado.",
    effects: { camara: 5, aprovacao: -3 },
    sectorEffects: { vereadores: 6 },
    leaning: 0,
    minTurn: 5,
  },
  {
    id: "programa-de-integridade",
    label: "Programa de Integridade e Transparência",
    description:
      "Cria canais de compliance e auditoria interna para blindar a gestão contra irregularidades. Exige uma gestão já consolidada.",
    effects: { ministerioPublico: 5, caixaMunicipal: -3 },
    sectorEffects: { imprensaLocal: 3, vereadores: -2 },
    leaning: 0,
    minTurn: 5,
  },
  {
    id: "fast-track-de-licencas",
    label: "Fast-Track de Licenças para Grandes Empreendimentos",
    description: "Agiliza o licenciamento de novos empreendimentos imobiliários e comerciais na cidade.",
    effects: { mobilidade: 3, caixaMunicipal: 3, zeladoria: -2 },
    sectorEffects: { comerciantes: 5, moradoresPeriferia: -4 },
    leaning: 2,
  },
  {
    id: "programa-de-preservacao-de-bairros",
    label: "Programa de Preservação de Bairros Históricos",
    description: "Lança incentivos para preservar o patrimônio e o comércio tradicional dos bairros antigos.",
    effects: { cultura: 5, caixaMunicipal: -3 },
    sectorEffects: { igrejas: 3, moradoresPeriferia: 4, comerciantes: -3 },
    leaning: -2,
  },
];
