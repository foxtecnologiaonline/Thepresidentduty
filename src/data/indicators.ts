import type { IndicatorKey, IndicatorMeta, Indicators } from "../types";

export const INDICATOR_META: Record<IndicatorKey, IndicatorMeta> = {
  economia: {
    key: "economia",
    label: "Economia",
    icon: "💰",
    critical: true,
    description: "Saúde das contas públicas, emprego e inflação. Zerar decreta colapso econômico.",
    chartColor: "#3987e5",
    loseMessage:
      "A economia entrou em colapso total. Sem controle sobre inflação e desemprego, seu governo perdeu qualquer sustentação e você foi forçado a renunciar.",
  },
  popularidade: {
    key: "popularidade",
    label: "Popularidade",
    icon: "😊",
    critical: true,
    description: "Aprovação do seu governo pela população. Zerar leva a manifestações e impeachment.",
    chartColor: "#d95926",
    loseMessage:
      "Sua popularidade despencou a zero. Sob pressão de manifestações massivas em todo o país, o Congresso abriu e aprovou seu impeachment.",
  },
  seguranca: {
    key: "seguranca",
    label: "Segurança",
    icon: "🛡️",
    critical: true,
    description: "Ordem pública e controle da criminalidade. Zerar mergulha o país no caos.",
    chartColor: "#199e70",
    loseMessage:
      "O país mergulhou no caos total. Sem controle sobre a ordem pública, as Forças Armadas tomaram o poder à força.",
  },
  saude: {
    key: "saude",
    label: "Saúde",
    icon: "🏥",
    critical: false,
    description: "Qualidade e capacidade da rede pública de saúde.",
    chartColor: "#c98500",
    loseMessage: "",
  },
  educacao: {
    key: "educacao",
    label: "Educação",
    icon: "🎓",
    critical: false,
    description: "Qualidade do ensino público e formação da população.",
    chartColor: "#d55181",
    loseMessage: "",
  },
  meioAmbiente: {
    key: "meioAmbiente",
    label: "Meio Ambiente",
    icon: "🌱",
    critical: false,
    description: "Preservação ambiental e sustentabilidade das políticas do governo.",
    chartColor: "#008300",
    loseMessage: "",
  },
  relacoesInternacionais: {
    key: "relacoesInternacionais",
    label: "Relações Internacionais",
    icon: "🌐",
    critical: false,
    description: "Prestígio e alianças do país no cenário internacional.",
    chartColor: "#9085e9",
    loseMessage: "",
  },
  governabilidade: {
    key: "governabilidade",
    label: "Governabilidade",
    icon: "🏛️",
    critical: true,
    description: "Sua base de apoio no Congresso. Zerar aprova um impeachment por falta de aliados.",
    chartColor: "#e66767",
    loseMessage:
      "Você perdeu toda a base aliada no Congresso. Isolado e sem apoio parlamentar, seu impeachment foi aprovado por ampla maioria.",
  },
};

export const INDICATOR_ORDER: IndicatorKey[] = [
  "economia",
  "popularidade",
  "seguranca",
  "saude",
  "educacao",
  "meioAmbiente",
  "relacoesInternacionais",
  "governabilidade",
];

export const CRITICAL_INDICATORS: IndicatorKey[] = INDICATOR_ORDER.filter(
  (key) => INDICATOR_META[key].critical
);

/** Abaixo deste valor, um indicador crítico entra em alerta visual (perto de derrubar o mandato). */
export const CRITICAL_WARNING_THRESHOLD = 15;

export function createInitialIndicators(): Indicators {
  return {
    economia: 55,
    popularidade: 60,
    seguranca: 55,
    saude: 50,
    educacao: 50,
    meioAmbiente: 50,
    relacoesInternacionais: 55,
    governabilidade: 55,
  };
}
