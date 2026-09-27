import { INDICATOR_META, INDICATOR_ORDER } from "../data/indicators";
import type { EndResult, Indicators } from "../types";

interface Props {
  result: EndResult;
  indicators: Indicators;
  turnReached: number;
  totalTurns: number;
  onRestart: () => void;
}

export function EndScreen({ result, indicators, turnReached, totalTurns, onRestart }: Props) {
  return (
    <div className={`screen end-screen ${result.victory ? "victory" : "defeat"}`}>
      <h1>{result.title}</h1>
      <p className="tagline">{result.narrative}</p>
      <p className="turn-reached">
        Mandato encerrado no trimestre {turnReached} de {totalTurns}.
      </p>
      <div className="final-dashboard">
        {INDICATOR_ORDER.map((key) => (
          <div key={key} className="final-indicator">
            <span className="indicator-icon" aria-hidden="true">
              {INDICATOR_META[key].icon}
            </span>
            <span>{INDICATOR_META[key].label}</span>
            <strong>{Math.round(indicators[key])}</strong>
          </div>
        ))}
      </div>
      <button type="button" className="primary-button" onClick={onRestart}>
        Jogar Novamente
      </button>
    </div>
  );
}
