import type { IndicatorKey, IndicatorMeta, Indicators } from "../types";

export const INDICATOR_META: Record<IndicatorKey, IndicatorMeta> = {
  financeiro: {
    key: "financeiro",
    label: "Financeiro",
    icon: "💰",
    critical: true,
    description: "Caixa, receita e saúde das contas da Orange. Zerar decreta recuperação judicial.",
    chartColor: "#3987e5",
    loseMessage:
      "O caixa da Orange secou. Sem conseguir honrar a folha de pagamento nem os fornecedores, a empresa entra em recuperação judicial e o Conselho destitui você imediatamente.",
  },
  reputacao: {
    key: "reputacao",
    label: "Reputação da Marca",
    icon: "🍊",
    critical: true,
    description: "Confiança do público e da imprensa na marca Orange. Zerar provoca boicote generalizado.",
    chartColor: "#d95926",
    loseMessage:
      "A marca Orange foi destruída. Consumidores boicotam em massa, a imprensa não larga o escândalo, e o Conselho decide que só uma troca de CEO pode salvar o que resta da confiança do público.",
  },
  conselho: {
    key: "conselho",
    label: "Confiança do Conselho",
    icon: "🧑‍💼",
    critical: true,
    description: "Apoio do Conselho de Administração à sua gestão. Zerar aprova sua destituição imediata.",
    chartColor: "#199e70",
    loseMessage:
      "Você perdeu toda a confiança do Conselho de Administração. Numa reunião de emergência, os membros votam, por unanimidade, sua destituição imediata do cargo de CEO.",
  },
  moralFuncionarios: {
    key: "moralFuncionarios",
    label: "Moral dos Funcionários",
    icon: "👨‍💻",
    critical: true,
    description: "Clima interno e engajamento do time. Zerar provoca êxodo em massa e colapso operacional.",
    chartColor: "#e66767",
    loseMessage:
      "A cultura interna da Orange implodiu. Um êxodo em massa de engenheiros-chave e uma greve geral paralisam o desenvolvimento de produtos — o Conselho não vê outra saída além de trocar o comando.",
  },
  inovacao: {
    key: "inovacao",
    label: "Inovação",
    icon: "💡",
    critical: false,
    description: "Força do pipeline de produtos e da pesquisa de longo prazo.",
    chartColor: "#c98500",
    loseMessage: "",
  },
  satisfacaoCliente: {
    key: "satisfacaoCliente",
    label: "Satisfação do Cliente",
    icon: "😊",
    critical: false,
    description: "Como clientes e fãs avaliam a experiência com os produtos Orange.",
    chartColor: "#d55181",
    loseMessage: "",
  },
  sustentabilidade: {
    key: "sustentabilidade",
    label: "Sustentabilidade",
    icon: "🌱",
    critical: false,
    description: "Impacto ambiental da cadeia produtiva e compromissos de ESG da empresa.",
    chartColor: "#008300",
    loseMessage: "",
  },
  relacoesRegulatorias: {
    key: "relacoesRegulatorias",
    label: "Relações Regulatórias",
    icon: "🏛️",
    critical: false,
    description: "Relação com reguladores, governos e cortes antitruste ao redor do mundo.",
    chartColor: "#9085e9",
    loseMessage: "",
  },
};

export const INDICATOR_ORDER: IndicatorKey[] = [
  "financeiro",
  "reputacao",
  "conselho",
  "moralFuncionarios",
  "inovacao",
  "satisfacaoCliente",
  "sustentabilidade",
  "relacoesRegulatorias",
];

export const CRITICAL_INDICATORS: IndicatorKey[] = INDICATOR_ORDER.filter(
  (key) => INDICATOR_META[key].critical
);

/** Abaixo deste valor, um indicador crítico entra em alerta visual (perto de derrubar a gestão). */
export const CRITICAL_WARNING_THRESHOLD = 15;

export function createInitialIndicators(): Indicators {
  return {
    financeiro: 55,
    reputacao: 60,
    conselho: 55,
    moralFuncionarios: 55,
    inovacao: 50,
    satisfacaoCliente: 50,
    sustentabilidade: 50,
    relacoesRegulatorias: 55,
  };
}
