import type { Indicators, Sectors, ThreatKey, ThreatMeta, Threats } from "../types";

/**
 * Cada setor da sociedade tem exatamente um instrumento para tirar o presidente do poder,
 * coerente com sua posição: o Congresso vota impeachment, as Forças Armadas dão golpe, a
 * população sai às ruas, movimentos sociais paralisam o país em greve geral, o empresariado
 * promove fuga de capitais e a comunidade acadêmica sustenta uma cassação pelo STF. O ícone
 * de cada via é o mesmo do setor que a empunha, para deixar a ligação visível no painel.
 */
export const THREAT_META: Record<ThreatKey, ThreatMeta> = {
  impeachment: {
    key: "impeachment",
    label: "Impeachment",
    icon: "🗳️",
    description:
      "Instrumento do setor Políticos. Sobe quando você perde base no Congresso (setor Políticos) e governabilidade. No limite, o processo é aberto e aprovado.",
    fallTitle: "Impeachment Aprovado",
    fallNarrative:
      "Isolado no Congresso, sem a base política que um dia o apoiou, seu impeachment foi aberto e aprovado por ampla maioria. Seu mandato termina aqui.",
  },
  golpe: {
    key: "golpe",
    label: "Golpe Militar",
    icon: "🎖️",
    description:
      "Instrumento do setor Militares. Sobe quando a segurança pública se deteriora e as Forças Armadas (setor Militares) perdem confiança no seu governo. No limite, os militares tomam o poder.",
    fallTitle: "Golpe Militar",
    fallNarrative:
      "Com o país em crise de segurança e o Alto-Comando já sem confiança no governo, as Forças Armadas tomaram o poder à força. Seu mandato termina aqui.",
  },
  levante: {
    key: "levante",
    label: "Levante Popular",
    icon: "👥",
    description:
      "Instrumento do setor População. Sobe quando a população (setor População) e a popularidade do governo despencam. No limite, a pressão das ruas força sua renúncia.",
    fallTitle: "Renúncia Forçada",
    fallNarrative:
      "Manifestações populares tomaram as ruas de todo o país. Sem apoio popular para sustentar o governo, você foi forçado a renunciar.",
  },
  greveGeral: {
    key: "greveGeral",
    label: "Greve Geral",
    icon: "✊",
    description:
      "Instrumento do setor Movimentos Sociais. Sobe quando sindicatos e movimentos sociais (setor Movimentos Sociais) se organizam contra o governo em meio à deterioração da ordem pública. No limite, uma greve geral paralisa o país e força sua renúncia.",
    fallTitle: "Greve Geral Derruba o Governo",
    fallNarrative:
      "Sindicatos e movimentos sociais decretaram greve geral e pararam o país. Incapaz de governar uma nação paralisada e sem nenhuma base social organizada ao seu lado, você foi forçado a renunciar.",
  },
  fugaCapitais: {
    key: "fugaCapitais",
    label: "Fuga de Capitais",
    icon: "🏢",
    description:
      "Instrumento do setor Empresariado. Sobe quando o empresariado perde confiança no governo e a economia se deteriora. No limite, uma fuga de capitais em massa força sua renúncia.",
    fallTitle: "Boicote Empresarial",
    fallNarrative:
      "Empresários e investidores retiraram em massa seu capital do país, provocando uma fuga de capitais sem precedentes. Sem o apoio do empresariado e sem fôlego para sustentar a economia, você foi forçado a renunciar.",
  },
  cassacaoJudicial: {
    key: "cassacaoJudicial",
    label: "Cassação Judicial",
    icon: "📚",
    description:
      "Instrumento do setor Acadêmicos. Sobe quando a comunidade acadêmica (setor Acadêmicos) se afasta do governo em meio à erosão da governabilidade. No limite, o STF cassa seu mandato por inconstitucionalidade.",
    fallTitle: "Mandato Cassado",
    fallNarrative:
      "Pressionado por um parecer assinado por juristas e por toda a comunidade acadêmica, o Supremo Tribunal Federal declarou seu mandato inconstitucional e determinou sua cassação imediata.",
  },
};

export const THREAT_ORDER: ThreatKey[] = [
  "impeachment",
  "golpe",
  "levante",
  "greveGeral",
  "fugaCapitais",
  "cassacaoJudicial",
];

/** Risco (0-100) a partir do qual uma via de queda encerra o mandato imediatamente. */
export const DOWNFALL_THRESHOLD = 90;

export type ThreatStage = "estavel" | "alerta" | "critico" | "iminente";

export const THREAT_STAGE_LABELS: Record<ThreatStage, string> = {
  estavel: "Estável",
  alerta: "Alerta",
  critico: "Crítico",
  iminente: "Iminente",
};

/** Risco (0-100) a partir do qual uma via entra em estágio Crítico — e, pela primeira vez
    que isso acontece num mandato, força o evento de crise daquela via no baralho. */
export const CRITICO_THRESHOLD = 65;

export function getThreatStage(value: number): ThreatStage {
  if (value >= DOWNFALL_THRESHOLD) return "iminente";
  if (value >= CRITICO_THRESHOLD) return "critico";
  if (value >= 40) return "alerta";
  return "estavel";
}

/** Peso do setor "dono" do instrumento em relação ao indicador que o acompanha — o setor
    pesa mais porque é ele quem empunha o instrumento; o indicador só agrava ou alivia. */
const SECTOR_WEIGHT = 0.65;
const INDICATOR_WEIGHT = 1 - SECTOR_WEIGHT;

function riskFrom(sectorValue: number, indicatorValue: number): number {
  return SECTOR_WEIGHT * (100 - sectorValue) + INDICATOR_WEIGHT * (100 - indicatorValue);
}

/**
 * Recalcula o risco de cada via de queda a partir do estado atual de indicadores e
 * setores — sem memória própria: é o retrato do risco "agora", não um medidor que
 * acumula sozinho. Isso faz o risco subir e também recuar conforme o jogador reage,
 * em vez de travar numa trajetória só de ida.
 */
export function computeThreats(indicators: Indicators, sectors: Sectors): Threats {
  return {
    impeachment: Math.round(riskFrom(sectors.politicos, indicators.governabilidade)),
    golpe: Math.round(riskFrom(sectors.militares, indicators.seguranca)),
    levante: Math.round(riskFrom(sectors.populacao, indicators.popularidade)),
    greveGeral: Math.round(riskFrom(sectors.movimentosSociais, indicators.seguranca)),
    fugaCapitais: Math.round(riskFrom(sectors.empresariado, indicators.economia)),
    cassacaoJudicial: Math.round(riskFrom(sectors.academicos, indicators.governabilidade)),
  };
}

/** Diferença real entre dois retratos de risco — ao contrário dos deltas de indicadores e
    setores (que mostram o efeito bruto da escolha), o risco não está nos efeitos da escolha:
    é recalculado do estado atual, então seu delta precisa comparar dois retratos de fato. */
export function computeThreatDeltas(current: Threats, previous: Threats): Partial<Record<ThreatKey, number>> {
  const deltas: Partial<Record<ThreatKey, number>> = {};
  for (const key of THREAT_ORDER) {
    const delta = current[key] - previous[key];
    if (delta !== 0) deltas[key] = delta;
  }
  return deltas;
}
