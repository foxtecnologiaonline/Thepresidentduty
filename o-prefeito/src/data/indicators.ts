import type { IndicatorKey, IndicatorMeta, Indicators } from "../types";

export const INDICATOR_META: Record<IndicatorKey, IndicatorMeta> = {
  caixaMunicipal: {
    key: "caixaMunicipal",
    label: "Caixa Municipal",
    icon: "💰",
    critical: false,
    description: "Saúde das contas da prefeitura: receita, folha de pagamento e dívida.",
    chartColor: "#3987e5",
    loseMessage: "",
  },
  aprovacao: {
    key: "aprovacao",
    label: "Aprovação",
    icon: "😊",
    critical: false,
    description: "Aprovação da sua gestão pelos moradores da cidade.",
    chartColor: "#d95926",
    loseMessage: "",
  },
  mobilidade: {
    key: "mobilidade",
    label: "Mobilidade",
    icon: "🚧",
    critical: false,
    description: "Trânsito, transporte público e deslocamento pela cidade.",
    chartColor: "#9085e9",
    loseMessage: "",
  },
  saneamento: {
    key: "saneamento",
    label: "Saneamento",
    icon: "🚰",
    critical: false,
    description: "Água, esgoto, drenagem e coleta de lixo da cidade.",
    chartColor: "#199e70",
    loseMessage: "",
  },
  zeladoria: {
    key: "zeladoria",
    label: "Zeladoria",
    icon: "🧹",
    critical: false,
    description: "Manutenção urbana: iluminação, pavimentação, praças e limpeza das ruas.",
    chartColor: "#c98500",
    loseMessage: "",
  },
  cultura: {
    key: "cultura",
    label: "Cultura",
    icon: "🎭",
    critical: false,
    description: "Programação cultural, patrimônio histórico e lazer público na cidade.",
    chartColor: "#d55181",
    loseMessage: "",
  },
  camara: {
    key: "camara",
    label: "Câmara",
    icon: "🏛️",
    critical: true,
    description: "Sua base de apoio na Câmara de Vereadores. Zerar aprova um processo de impeachment.",
    chartColor: "#e66767",
    loseMessage:
      "Você perdeu toda a base aliada na Câmara de Vereadores. Isolado e sem apoio do Legislativo municipal, seu processo de impeachment foi aprovado por ampla maioria.",
  },
  ministerioPublico: {
    key: "ministerioPublico",
    label: "Ministério Público",
    icon: "⚖️",
    critical: true,
    description: "Sua relação com o Ministério Público e os órgãos de controle. Zerar leva à cassação do mandato.",
    chartColor: "#9085e9",
    loseMessage:
      "O Ministério Público reuniu provas suficientes de irregularidades na sua gestão. A Justiça Eleitoral decretou a cassação do seu mandato com inelegibilidade.",
  },
};

export const INDICATOR_ORDER: IndicatorKey[] = [
  "caixaMunicipal",
  "aprovacao",
  "mobilidade",
  "saneamento",
  "zeladoria",
  "cultura",
  "camara",
  "ministerioPublico",
];

export const CRITICAL_INDICATORS: IndicatorKey[] = INDICATOR_ORDER.filter(
  (key) => INDICATOR_META[key].critical
);

/** Abaixo deste valor, um indicador crítico entra em alerta visual (perto de derrubar o mandato). */
export const CRITICAL_WARNING_THRESHOLD = 15;

export function createInitialIndicators(): Indicators {
  return {
    caixaMunicipal: 55,
    aprovacao: 60,
    mobilidade: 50,
    saneamento: 50,
    zeladoria: 50,
    cultura: 45,
    camara: 40,
    ministerioPublico: 44,
  };
}
