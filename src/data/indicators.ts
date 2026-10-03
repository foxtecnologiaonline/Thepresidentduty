import type { IndicatorKey, IndicatorMeta, Indicators } from "../types";

export const INDICATOR_META: Record<IndicatorKey, IndicatorMeta> = {
  economia: {
    key: "economia",
    label: "Economia",
    icon: "💰",
    critical: true,
    description:
      "Saúde das contas do estado, arrecadação de ICMS e atividade econômica regional. Zerar decreta colapso fiscal.",
    chartColor: "#3987e5",
    loseMessage:
      "As contas do estado entraram em colapso total. Sem conseguir pagar salários e fornecedores, seu governo perdeu qualquer sustentação e você foi forçado a renunciar.",
  },
  popularidade: {
    key: "popularidade",
    label: "Popularidade",
    icon: "😊",
    critical: true,
    description: "Aprovação do seu governo pela população do estado. Zerar leva a manifestações e impeachment.",
    chartColor: "#d95926",
    loseMessage:
      "Sua popularidade despencou a zero. Sob pressão de manifestações massivas em todo o estado, a Assembleia Legislativa abriu e aprovou seu impeachment.",
  },
  seguranca: {
    key: "seguranca",
    label: "Segurança Pública",
    icon: "🛡️",
    critical: true,
    description:
      "Ordem pública e controle da criminalidade, sob comando da Polícia Militar e Civil do estado. Zerar mergulha o estado no caos.",
    chartColor: "#199e70",
    loseMessage:
      "O estado mergulhou no caos total. Sem controle sobre a ordem pública, o Governo Federal decretou intervenção federal na segurança e você perdeu o comando da Polícia Militar.",
  },
  saude: {
    key: "saude",
    label: "Saúde",
    icon: "🏥",
    critical: false,
    description: "Qualidade e capacidade da rede pública estadual de saúde — hospitais e UPAs geridos pelo estado.",
    chartColor: "#c98500",
    loseMessage: "",
  },
  educacao: {
    key: "educacao",
    label: "Educação",
    icon: "🎓",
    critical: false,
    description: "Qualidade do ensino da rede pública estadual e a formação dos alunos das escolas do estado.",
    chartColor: "#d55181",
    loseMessage: "",
  },
  meioAmbiente: {
    key: "meioAmbiente",
    label: "Meio Ambiente",
    icon: "🌱",
    critical: false,
    description: "Preservação ambiental, fiscalização e sustentabilidade das políticas do estado.",
    chartColor: "#008300",
    loseMessage: "",
  },
  relacoesInstitucionais: {
    key: "relacoesInstitucionais",
    label: "Relações Institucionais",
    icon: "🤝",
    critical: false,
    description:
      "Alinhamento com o Governo Federal, prefeitos e estados vizinhos — essencial para verbas, convênios e obras.",
    chartColor: "#9085e9",
    loseMessage: "",
  },
  governabilidade: {
    key: "governabilidade",
    label: "Governabilidade",
    icon: "🏛️",
    critical: true,
    description: "Sua base de apoio na Assembleia Legislativa. Zerar aprova um impeachment por falta de aliados.",
    chartColor: "#e66767",
    loseMessage:
      "Você perdeu toda a base aliada na Assembleia Legislativa. Isolado e sem apoio parlamentar, seu impeachment foi aprovado por ampla maioria.",
  },
};

export const INDICATOR_ORDER: IndicatorKey[] = [
  "economia",
  "popularidade",
  "seguranca",
  "saude",
  "educacao",
  "meioAmbiente",
  "relacoesInstitucionais",
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
    relacoesInstitucionais: 55,
    governabilidade: 55,
  };
}
