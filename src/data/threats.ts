import type { Indicators, Sectors, ThreatKey, ThreatMeta, Threats } from "../types";

export const THREAT_META: Record<ThreatKey, ThreatMeta> = {
  impeachment: {
    key: "impeachment",
    label: "Impeachment",
    icon: "⚖️",
    description:
      "Sobe quando você perde base no Congresso (Governabilidade, setor Políticos) e popularidade. No limite, o processo é aberto e aprovado.",
    fallTitle: "Impeachment Aprovado",
    fallNarrative:
      "Isolado no Congresso e sem popularidade para conter a pressão nas ruas, seu impeachment foi aberto e aprovado por ampla maioria. Seu mandato termina aqui.",
  },
  golpe: {
    key: "golpe",
    label: "Golpe Militar",
    icon: "🎖️",
    description:
      "Sobe quando a segurança pública se deteriora e as Forças Armadas perdem confiança no seu governo. No limite, os militares tomam o poder.",
    fallTitle: "Golpe Militar",
    fallNarrative:
      "Com o país em crise de segurança e o Alto-Comando já sem confiança no governo, as Forças Armadas tomaram o poder à força. Seu mandato termina aqui.",
  },
  levante: {
    key: "levante",
    label: "Levante Popular",
    icon: "🔥",
    description:
      "Sobe quando a população e os movimentos sociais se afastam do governo. No limite, a pressão das ruas força sua renúncia.",
    fallTitle: "Renúncia Forçada",
    fallNarrative:
      "Manifestações tomaram as ruas de todo o país e nenhuma base social sobrou para sustentar seu governo. Sob pressão popular insustentável, você foi forçado a renunciar.",
  },
};

export const THREAT_ORDER: ThreatKey[] = ["impeachment", "golpe", "levante"];

/** Risco (0-100) a partir do qual uma via de queda encerra o mandato imediatamente. */
export const DOWNFALL_THRESHOLD = 90;

export type ThreatStage = "estavel" | "alerta" | "critico" | "iminente";

export const THREAT_STAGE_LABELS: Record<ThreatStage, string> = {
  estavel: "Estável",
  alerta: "Alerta",
  critico: "Crítico",
  iminente: "Iminente",
};

export function getThreatStage(value: number): ThreatStage {
  if (value >= DOWNFALL_THRESHOLD) return "iminente";
  if (value >= 65) return "critico";
  if (value >= 40) return "alerta";
  return "estavel";
}

/**
 * Recalcula o risco de cada via de queda a partir do estado atual de indicadores e
 * setores — sem memória própria: é o retrato do risco "agora", não um medidor que
 * acumula sozinho. Isso faz o risco subir e também recuar conforme o jogador reage,
 * em vez de travar numa trajetória só de ida.
 */
export function computeThreats(indicators: Indicators, sectors: Sectors): Threats {
  const impeachment =
    0.5 * (100 - indicators.governabilidade) +
    0.3 * (100 - sectors.politicos) +
    0.2 * (100 - indicators.popularidade);

  const golpe = 0.55 * (100 - indicators.seguranca) + 0.45 * (100 - sectors.militares);

  const levante =
    0.45 * (100 - indicators.popularidade) +
    0.3 * (100 - sectors.movimentosSociais) +
    0.25 * (100 - sectors.populacao);

  return {
    impeachment: Math.round(impeachment),
    golpe: Math.round(golpe),
    levante: Math.round(levante),
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
