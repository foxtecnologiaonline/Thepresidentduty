import { MandateReport } from "./MandateReport";
import { ShareButton } from "./ShareButton";
import { buildShareText } from "../game/share";
import type { EndResult, GameState, Indicators } from "../types";

interface Props {
  result: EndResult;
  indicators: Indicators;
  history: GameState["history"];
  indicatorSnapshots: Indicators[];
  totalTurns: number;
  earnedAchievementIds: Set<string>;
  newAchievementIds: Set<string>;
  onRestart: () => void;
}

export function EndScreen({
  result,
  indicators,
  history,
  indicatorSnapshots,
  totalTurns,
  earnedAchievementIds,
  newAchievementIds,
  onRestart,
}: Props) {
  return (
    <div className={`screen end-screen ${result.victory ? "victory" : "defeat"}`}>
      <h1>{result.title}</h1>
      <p className="tagline">{result.narrative}</p>
      <p className="turn-reached">
        Mandato encerrado no trimestre {history.length} de {totalTurns}.
      </p>

      <MandateReport
        indicators={indicators}
        history={history}
        indicatorSnapshots={indicatorSnapshots}
        earnedAchievementIds={earnedAchievementIds}
        newAchievementIds={newAchievementIds}
      />

      <div className="end-screen-actions">
        <button type="button" className="primary-button" onClick={onRestart}>
          Jogar Novamente
        </button>
        <ShareButton text={buildShareText(result, indicators, history)} />
      </div>
    </div>
  );
}
