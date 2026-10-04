import type { IndicatorKey, IndicatorMeta, Indicators } from "../types";

export const INDICATOR_META: Record<IndicatorKey, IndicatorMeta> = {
  tesouro: {
    key: "tesouro",
    label: "Tesouro",
    icon: "💰",
    critical: true,
    description: "Os cofres da coroa. Zerar decreta bancarrota e o fim deste reinado.",
    chartColor: "#c98500",
    loseMessage:
      "Os cofres reais secaram por completo. Sem ouro para pagar a guarda, os credores e a corte, a coroa declara bancarrota e este reinado chega ao fim.",
  },
  exercito: {
    key: "exercito",
    label: "Exército",
    icon: "⚔️",
    critical: false,
    description: "Força e lealdade das tropas reais. Molda o legado, mas não derruba o trono por si só.",
    chartColor: "#8a8f98",
    loseMessage: "",
  },
  fe: {
    key: "fe",
    label: "Fé",
    icon: "✝️",
    critical: true,
    description: "Bênção da Igreja sobre a coroa. Zerar leva à excomunhão e a uma guerra santa contra o trono.",
    chartColor: "#9085e9",
    loseMessage:
      "O Sumo Pontífice excomunga a coroa diante de todo o reino. Sem a bênção da Igreja, os fiéis se voltam contra o trono e este reinado termina em cisma.",
  },
  nobreza: {
    key: "nobreza",
    label: "Nobreza",
    icon: "🛡️",
    critical: true,
    description: "Lealdade dos grandes senhores e barões. Zerar provoca uma revolta nobre que depõe o rei.",
    chartColor: "#e66767",
    loseMessage:
      "Os grandes barões se armam e marcham sobre o castelo. Sem um único senhor leal para defendê-lo, o rei é deposto por sua própria nobreza.",
  },
  colheita: {
    key: "colheita",
    label: "Colheita",
    icon: "🌾",
    critical: false,
    description: "Abundância dos campos e granarios do reino.",
    chartColor: "#199e70",
    loseMessage: "",
  },
  prestigio: {
    key: "prestigio",
    label: "Prestígio",
    icon: "👑",
    critical: false,
    description: "Fama e respeito da coroa entre os reinos vizinhos e a própria corte.",
    chartColor: "#d95926",
    loseMessage: "",
  },
  herdeiros: {
    key: "herdeiros",
    label: "Herdeiros",
    icon: "🤴",
    critical: false,
    description: "Segurança e número de herdeiros vivos da linhagem. Molda a sucessão, não derruba o trono por si só.",
    chartColor: "#d55181",
    loseMessage: "",
  },
};

export const INDICATOR_ORDER: IndicatorKey[] = [
  "tesouro",
  "exercito",
  "fe",
  "nobreza",
  "colheita",
  "prestigio",
  "herdeiros",
];

export const CRITICAL_INDICATORS: IndicatorKey[] = INDICATOR_ORDER.filter(
  (key) => INDICATOR_META[key].critical
);

/** Abaixo deste valor, um indicador crítico entra em alerta visual (perto de derrubar o trono). */
export const CRITICAL_WARNING_THRESHOLD = 15;

/** Abaixo deste valor ao fim de um reinado, a sucessão é considerada fragilizada — gera eco narrativo no próximo reinado, mas nunca encerra o jogo por si só. */
export const FRAGILE_SUCCESSION_THRESHOLD = 25;

export function createInitialIndicators(): Indicators {
  return {
    tesouro: 46,
    exercito: 55,
    fe: 50,
    nobreza: 46,
    colheita: 55,
    prestigio: 50,
    herdeiros: 50,
  };
}
