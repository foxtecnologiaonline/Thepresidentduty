import { StatBar } from "../../components/StatBar";
import { CRITICAL_WARNING_THRESHOLD } from "../data/indicators";
import type { IndicatorMeta } from "../types";

interface Props {
  meta: IndicatorMeta;
  value: number;
  delta?: number;
}

export function IndicatorBar({ meta, value, delta }: Props) {
  const isCriticalWarning = meta.critical && value <= CRITICAL_WARNING_THRESHOLD;

  return (
    <StatBar
      icon={meta.icon}
      label={meta.label}
      description={meta.description}
      value={value}
      delta={delta}
      critical={isCriticalWarning}
    />
  );
}
