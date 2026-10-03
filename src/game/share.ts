import { INDICATOR_META, INDICATOR_ORDER, createInitialIndicators } from "../data/indicators";
import { computeLeanProfile, describeLean } from "./leaning";
import type { EndResult, GameState, Indicators } from "../types";

export function buildShareText(
  result: EndResult,
  indicators: Indicators,
  history: GameState["history"]
): string {
  const initial = createInitialIndicators();
  const lines: string[] = [
    `🏛️ O Governador — ${result.title} (média ${Math.round(result.average)})`,
  ];

  const profile = computeLeanProfile(history);
  if (profile) {
    lines.push(`Perfil ideológico: ${describeLean(profile.average)}`);
  }

  lines.push("");
  for (const key of INDICATOR_ORDER) {
    const start = Math.round(initial[key]);
    const end = Math.round(indicators[key]);
    lines.push(`${INDICATOR_META[key].icon} ${INDICATOR_META[key].label}: ${start} → ${end}`);
  }

  return lines.join("\n");
}
