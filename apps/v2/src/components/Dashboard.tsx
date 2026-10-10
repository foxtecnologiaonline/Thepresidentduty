import { INDICATOR_META, INDICATOR_ORDER } from "../data/indicators";
import type { Indicators } from "../types";
import { IndicatorBar } from "./IndicatorBar";

interface Props {
  indicators: Indicators;
}

export function Dashboard({ indicators }: Props) {
  return (
    <div className="dashboard">
      {INDICATOR_ORDER.map((key) => (
        <IndicatorBar key={key} meta={INDICATOR_META[key]} value={indicators[key]} />
      ))}
    </div>
  );
}
