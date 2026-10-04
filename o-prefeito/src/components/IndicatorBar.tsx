import { CRITICAL_ATTENTION_THRESHOLD, CRITICAL_WARNING_THRESHOLD } from "../data/indicators";
import type { IndicatorMeta } from "../types";
import { StatBar } from "./StatBar";

interface Props {
  meta: IndicatorMeta;
  value: number;
  delta?: number;
}

export function IndicatorBar({ meta, value, delta }: Props) {
  const isCriticalWarning = meta.critical && value <= CRITICAL_WARNING_THRESHOLD;
  const isCriticalAttention = meta.critical && !isCriticalWarning && value <= CRITICAL_ATTENTION_THRESHOLD;

  return (
    <StatBar
      icon={meta.icon}
      label={meta.label}
      description={meta.description}
      value={value}
      delta={delta}
      critical={isCriticalWarning}
      attention={isCriticalAttention}
    />
  );
}
