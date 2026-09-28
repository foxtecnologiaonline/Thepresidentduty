import { MandateReport } from "./MandateReport";
import type { EndResult, GameState, Indicators } from "../types";

interface Props {
  result: EndResult;
  indicators: Indicators;
  history: GameState["history"];
  totalTurns: number;
  onRestart: () => void;
}

export function EndScreen({ result, indicators, history, totalTurns, onRestart }: Props) {
  return (
    <div className={`screen end-screen ${result.victory ? "victory" : "defeat"}`}>
      <h1>{result.title}</h1>
      <p className="tagline">{result.narrative}</p>
      <p className="turn-reached">
        Mandato encerrado no trimestre {history.length} de {totalTurns}.
      </p>

      <MandateReport indicators={indicators} history={history} />

      <button type="button" className="primary-button" onClick={onRestart}>
        Jogar Novamente
      </button>
    </div>
  );
}
