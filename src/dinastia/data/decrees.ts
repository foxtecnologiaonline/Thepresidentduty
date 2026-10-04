import type { RoyalDecree } from "../types";

/**
 * Decretos que a coroa pode emitir por iniciativa própria a cada turno, independente do
 * evento sorteado. No máximo um por turno — os efeitos são deliberadamente menores que os
 * de um evento (a faixa "pequena" da Fórmula 2), mas cada um tem uma contrapartida real.
 */
export const DECREES: RoyalDecree[] = [
  {
    id: "taxar-mercadores",
    label: "Taxar os Mercadores",
    description: "Impõe novos tributos sobre as guildas e caravanas que cruzam o reino.",
    effects: { tesouro: 5, prestigio: -3 },
    factionEffects: { mercadores: -4 },
    leaning: 1,
  },
  {
    id: "arregimentar-milicias",
    label: "Arregimentar Milícias",
    description: "Convoca camponeses e artesãos para reforçar as fileiras do exército.",
    effects: { exercito: 5, colheita: -3 },
    factionEffects: { camponeses: -3, guardaReal: 3 },
    leaning: 1,
  },
  {
    id: "patrocinio-igreja",
    label: "Patrocínio à Igreja",
    description: "Financia catedrais, relicários e peregrinações com o ouro da coroa.",
    effects: { fe: 5, tesouro: -3 },
    factionEffects: { clero: 4 },
    leaning: 0,
  },
  {
    id: "obras-de-irrigacao",
    label: "Obras de Irrigação",
    description: "Investe em canais e celeiros reais para proteger as próximas colheitas.",
    effects: { colheita: 4, tesouro: -3 },
    factionEffects: { camponeses: 4 },
    leaning: -1,
  },
  {
    id: "conselho-dos-baroes",
    label: "Convocar o Conselho dos Barões",
    description: "Reúne os grandes senhores e compra sua lealdade com terras e privilégios.",
    effects: { nobreza: 5, tesouro: -4 },
    factionEffects: { baroes: 4 },
    leaning: -2,
  },
  {
    id: "casamento-dinastico",
    label: "Casamento Dinástico",
    description:
      "Negocia o casamento de um herdeiro com a corte vizinha para selar uma aliança. Exige um herdeiro em idade de casar.",
    effects: { prestigio: 5, herdeiros: -3 },
    factionEffects: { reinoVizinho: 5, baroes: -2 },
    leaning: 0,
    minTurn: 4,
  },
  {
    id: "proclamacao-real",
    label: "Proclamação da Autoridade Real",
    description:
      "Reafirma publicamente que todo poder no reino emana da coroa, sem intermediários. Exige um trono já consolidado.",
    effects: { nobreza: -3, exercito: 3 },
    factionEffects: { baroes: -4, guardaReal: 4 },
    leaning: 2,
    minTurn: 4,
  },
];
