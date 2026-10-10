import { INDICATOR_META, INDICATOR_ORDER } from "../data/indicators";
import type { IndicatorKey, Indicators } from "../types";
import { IndicatorBar } from "./IndicatorBar";

interface Props {
  indicators: Indicators;
  lastDeltas?: Partial<Record<IndicatorKey, number>>;
}

export function Dashboard({ indicators, lastDeltas }: Props) {
  return (
    <div className="dashboard">
      {INDICATOR_ORDER.map((key) => (
        <IndicatorBar
          key={key}
          meta={INDICATOR_META[key]}
          value={indicators[key]}
          delta={lastDeltas?.[key]}
        />
      ))}
    </div>
  );
}
