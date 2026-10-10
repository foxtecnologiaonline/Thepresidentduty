import type { GameState } from "../types";

export interface LeanHighlight {
  eventTitle: string;
  choiceLabel: string;
  actionLabel: string | null;
  value: number;
}

export interface LeanProfile {
  average: number;
  firstHalfAverage: number;
  secondHalfAverage: number;
  trend: "direita" | "esquerda" | "estavel";
  mostLeft: LeanHighlight;
  mostRight: LeanHighlight;
}

type HistoryEntry = GameState["history"][number];

function entryLean(entry: HistoryEntry): number {
  return entry.choice.leaning + (entry.action?.leaning ?? 0);
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** Diferença mínima entre as metades do mandato para considerar que houve uma guinada real. */
const TREND_THRESHOLD = 0.4;

export function computeLeanProfile(history: HistoryEntry[]): LeanProfile | null {
  if (history.length === 0) return null;

  const values = history.map(entryLean);
  const mid = Math.ceil(history.length / 2);
  const firstHalfAverage = average(values.slice(0, mid));
  const secondHalfAverage = average(values.slice(mid));
  const diff = secondHalfAverage - firstHalfAverage;

  let trend: LeanProfile["trend"] = "estavel";
  if (diff > TREND_THRESHOLD) trend = "direita";
  else if (diff < -TREND_THRESHOLD) trend = "esquerda";

  let mostLeftIndex = 0;
  let mostRightIndex = 0;
  values.forEach((value, index) => {
    if (value < values[mostLeftIndex]) mostLeftIndex = index;
    if (value > values[mostRightIndex]) mostRightIndex = index;
  });

  const toHighlight = (index: number): LeanHighlight => {
    const entry = history[index];
    return {
      eventTitle: entry.event.title,
      choiceLabel: entry.choice.label,
      actionLabel: entry.action?.label ?? null,
      value: values[index],
    };
  };

  return {
    average: average(values),
    firstHalfAverage,
    secondHalfAverage,
    trend,
    mostLeft: toHighlight(mostLeftIndex),
    mostRight: toHighlight(mostRightIndex),
  };
}

// Uma escolha isolada varia de -2 a +2; sem usar diretivas, a MÉDIA de um mandato inteiro
// nunca sai desse intervalo. Os limiares ficam dentro de -2..2 (não de -4..4) para que
// "Esquerda" e "Direita" sejam alcançáveis por quem consistentemente escolhe os extremos,
// e não faixas que só uma combinação perfeita de escolha+diretiva extremas atingiria.
const LEAN_BUCKETS: { max: number; label: string }[] = [
  { max: -1.5, label: "Esquerda" },
  { max: -0.5, label: "Centro-esquerda" },
  { max: 0.5, label: "Centro" },
  { max: 1.5, label: "Centro-direita" },
  { max: Infinity, label: "Direita" },
];

export function describeLean(score: number): string {
  return LEAN_BUCKETS.find((bucket) => score <= bucket.max)!.label;
}

// Combinar o lean da escolha (-2..2) com o da diretiva (-2..2) pode chegar a ±4 num único
// turno, mas a MÉDIA ao longo de 16 turnos raramente se aproxima disso — ±3 já é uma
// linha quase ininterrupta de decisões extremas, então é um domínio de exibição generoso.
export const LEAN_MIN = -3;
export const LEAN_MAX = 3;

export function leanToPercent(score: number): number {
  const clamped = Math.max(LEAN_MIN, Math.min(LEAN_MAX, score));
  return ((clamped - LEAN_MIN) / (LEAN_MAX - LEAN_MIN)) * 100;
}
