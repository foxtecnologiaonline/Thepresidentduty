import type { IndicatorKey, IndicatorMeta, Indicators } from "../types";

export const INDICATOR_META: Record<IndicatorKey, IndicatorMeta> = {
  economia: {
    key: "economia",
    label: "Economia",
    icon: "💰",
    critical: true,
    loseMessage:
      "A economia entrou em colapso total. Sem controle sobre inflação e desemprego, seu governo perdeu qualquer sustentação e você foi forçado a renunciar.",
  },
  popularidade: {
    key: "popularidade",
    label: "Popularidade",
    icon: "😊",
    critical: true,
    loseMessage:
      "Sua popularidade despencou a zero. Sob pressão de manifestações massivas em todo o país, o Congresso abriu e aprovou seu impeachment.",
  },
  seguranca: {
    key: "seguranca",
    label: "Segurança",
    icon: "🛡️",
    critical: true,
    loseMessage:
      "O país mergulhou no caos total. Sem controle sobre a ordem pública, as Forças Armadas tomaram o poder à força.",
  },
  saude: {
    key: "saude",
    label: "Saúde",
    icon: "🏥",
    critical: false,
    loseMessage: "",
  },
  educacao: {
    key: "educacao",
    label: "Educação",
    icon: "🎓",
    critical: false,
    loseMessage: "",
  },
  meioAmbiente: {
    key: "meioAmbiente",
    label: "Meio Ambiente",
    icon: "🌱",
    critical: false,
    loseMessage: "",
  },
  relacoesInternacionais: {
    key: "relacoesInternacionais",
    label: "Relações Internacionais",
    icon: "🌐",
    critical: false,
    loseMessage: "",
  },
  governabilidade: {
    key: "governabilidade",
    label: "Governabilidade",
    icon: "🏛️",
    critical: true,
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
