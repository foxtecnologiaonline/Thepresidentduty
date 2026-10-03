import type { IndicatorKey, IndicatorMeta, Indicators } from "../types";

export const INDICATOR_META: Record<IndicatorKey, IndicatorMeta> = {
  orcamento: {
    key: "orcamento",
    label: "Orçamento Municipal",
    icon: "💰",
    critical: true,
    description: "Saúde das contas da prefeitura: receita, folha de pagamento e dívida. Zerar decreta calamidade financeira.",
    chartColor: "#3987e5",
    loseMessage:
      "O orçamento municipal entrou em colapso total. Sem caixa para pagar folha e fornecedores, a prefeitura decreta calamidade financeira e o Tribunal de Contas assume a gestão.",
  },
  popularidade: {
    key: "popularidade",
    label: "Popularidade",
    icon: "😊",
    critical: true,
    description: "Aprovação da sua gestão pelos moradores da cidade. Zerar leva a protestos e pedido de cassação.",
    chartColor: "#d95926",
    loseMessage:
      "Sua popularidade despencou a zero. Sob pressão de protestos massivos em frente à Prefeitura, a Câmara de Vereadores abriu e aprovou seu processo de cassação.",
  },
  seguranca: {
    key: "seguranca",
    label: "Segurança",
    icon: "🛡️",
    critical: true,
    description: "Ordem pública e sensação de segurança nas ruas e bairros. Zerar mergulha a cidade no caos.",
    chartColor: "#199e70",
    loseMessage:
      "A cidade mergulhou no caos total. Sem controle sobre a ordem pública, o Governo do Estado decretou intervenção na segurança municipal.",
  },
  saude: {
    key: "saude",
    label: "Saúde",
    icon: "🏥",
    critical: false,
    description: "Qualidade e capacidade da rede municipal de saúde: UBS, prontos-socorros e programas de atenção básica.",
    chartColor: "#c98500",
    loseMessage: "",
  },
  educacao: {
    key: "educacao",
    label: "Educação",
    icon: "🎓",
    critical: false,
    description: "Qualidade da rede municipal de ensino: creches, escolas e merenda escolar.",
    chartColor: "#d55181",
    loseMessage: "",
  },
  mobilidade: {
    key: "mobilidade",
    label: "Mobilidade e Infraestrutura",
    icon: "🚧",
    critical: false,
    description: "Trânsito, transporte público, pavimentação e obras da cidade.",
    chartColor: "#9085e9",
    loseMessage: "",
  },
  meioAmbiente: {
    key: "meioAmbiente",
    label: "Meio Ambiente",
    icon: "🌱",
    critical: false,
    description: "Saneamento, coleta de lixo, áreas verdes e prevenção de enchentes na cidade.",
    chartColor: "#008300",
    loseMessage: "",
  },
  governabilidade: {
    key: "governabilidade",
    label: "Governabilidade",
    icon: "🏛️",
    critical: true,
    description: "Sua base de apoio na Câmara de Vereadores. Zerar aprova uma cassação por falta de aliados.",
    chartColor: "#e66767",
    loseMessage:
      "Você perdeu toda a base aliada na Câmara de Vereadores. Isolado e sem apoio do Legislativo municipal, seu processo de cassação foi aprovado por ampla maioria.",
  },
};

export const INDICATOR_ORDER: IndicatorKey[] = [
  "orcamento",
  "popularidade",
  "seguranca",
  "saude",
  "educacao",
  "mobilidade",
  "meioAmbiente",
  "governabilidade",
];

export const CRITICAL_INDICATORS: IndicatorKey[] = INDICATOR_ORDER.filter(
  (key) => INDICATOR_META[key].critical
);

/** Abaixo deste valor, um indicador crítico entra em alerta visual (perto de derrubar o mandato). */
export const CRITICAL_WARNING_THRESHOLD = 15;

export function createInitialIndicators(): Indicators {
  return {
    orcamento: 55,
    popularidade: 60,
    seguranca: 55,
    saude: 50,
    educacao: 50,
    mobilidade: 50,
    meioAmbiente: 50,
    governabilidade: 55,
  };
}
