import { CRITICAL_WARNING_THRESHOLD } from "../data/indicators";
import { useCountUp } from "../hooks/useCountUp";
import type { IndicatorMeta } from "../types";

interface Props {
  meta: IndicatorMeta;
  value: number;
  delta?: number;
}

function statusClass(value: number): string {
  if (value <= 20) return "danger";
  if (value <= 45) return "warning";
  return "ok";
}

export function IndicatorBar({ meta, value, delta }: Props) {
  const displayedValue = useCountUp(Math.round(value));
  const isCriticalWarning = meta.critical && value <= CRITICAL_WARNING_THRESHOLD;

  return (
    <div
      className={`indicator ${statusClass(value)}${isCriticalWarning ? " critical-warning" : ""}`}
      title={meta.description}
    >
      <div className="indicator-label">
        <span className="indicator-icon" aria-hidden="true">
          {meta.icon}
        </span>
        <span>{meta.label}</span>
        <span className="indicator-value">
          {displayedValue}
          {typeof delta === "number" && delta !== 0 && (
            <span className={`indicator-delta ${delta > 0 ? "positive" : "negative"}`}>
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
        </span>
      </div>
      <div className="indicator-track">
        <div className="indicator-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
