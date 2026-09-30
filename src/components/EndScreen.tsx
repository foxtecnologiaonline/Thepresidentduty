import { lazy, Suspense } from "react";
import { ShareButton } from "./ShareButton";
import { buildShareText } from "../game/share";
import type { EndResult, GameState, Indicators } from "../types";

// O relatório (gráfico + timeline + conquistas) só é necessário quando o
// mandato termina, então fica num chunk separado em vez de pesar no
// carregamento inicial do jogo (tela inicial + primeiro evento).
const MandateReport = lazy(() =>
  import("./MandateReport").then((module) => ({ default: module.MandateReport }))
);

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

      <Suspense fallback={<p className="report-loading">Carregando relatório do mandato…</p>}>
        <MandateReport
          indicators={indicators}
          history={history}
          indicatorSnapshots={indicatorSnapshots}
          earnedAchievementIds={earnedAchievementIds}
          newAchievementIds={newAchievementIds}
        />
      </Suspense>

      <div className="end-screen-actions">
        <button type="button" className="primary-button" onClick={onRestart}>
          Jogar Novamente
        </button>
        <ShareButton text={buildShareText(result, indicators, history)} />
      </div>
    </div>
  );
}
