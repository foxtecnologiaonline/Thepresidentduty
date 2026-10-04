import { Component, lazy, Suspense, type ReactNode } from "react";
import { ShareButton } from "../../components/ShareButton";
import { TOTAL_REIGNS, grantedFlagsThisReign, isDynastyFinished } from "../game/engine";
import { buildShareText } from "../game/share";
import type { EndResult, Factions, GameState, Indicators, ReignSummary } from "../types";
import { DynastyTree } from "./DynastyTree";

// O relatório (gráfico + timeline + conquistas) só é necessário quando o reinado termina,
// então fica num chunk separado em vez de pesar no carregamento inicial do jogo.
const ReignReport = lazy(() => import("./ReignReport").then((module) => ({ default: module.ReignReport })));

class ReportErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="report-loading">
          Não foi possível carregar o relatório do reinado. Recarregue a página para tentar novamente.
        </p>
      );
    }
    return this.props.children;
  }
}

interface Props {
  result: EndResult;
  indicators: Indicators;
  factions: Factions;
  history: GameState["history"];
  indicatorSnapshots: Indicators[];
  totalTurns: number;
  reignNumber: number;
  /** Reinados anteriores já concluídos desta dinastia (sem contar o que acabou agora). */
  chronicle: ReignSummary[];
  earnedAchievementIds: Set<string>;
  newAchievementIds: Set<string>;
  onContinueDynasty: () => void;
  onViewChronicle: () => void;
  onNewDynasty: () => void;
}

export function EndScreen({
  result,
  indicators,
  factions,
  history,
  indicatorSnapshots,
  totalTurns,
  reignNumber,
  chronicle,
  earnedAchievementIds,
  newAchievementIds,
  onContinueDynasty,
  onViewChronicle,
  onNewDynasty,
}: Props) {
  const isLastReign = isDynastyFinished(reignNumber);
  const grantedFlags = grantedFlagsThisReign({ history });
  const thisReignSummary: ReignSummary = {
    reignNumber,
    title: result.title,
    average: result.average,
    victory: result.victory,
    turnsReached: history.length,
    grantedFlags,
  };

  return (
    <div className={`screen end-screen ${result.victory ? "victory" : "defeat"}`}>
      <h1>{result.title}</h1>
      <p className="tagline">{result.narrative}</p>
      <p className="turn-reached">
        Reinado {reignNumber} de {TOTAL_REIGNS} encerrado no ano {history.length} de {totalTurns}.
      </p>

      <DynastyTree completedReigns={[...chronicle, thisReignSummary]} totalReigns={TOTAL_REIGNS} />

      {grantedFlags.length > 0 && (
        <p className="dynasty-hint">
          📜 Este reinado deixou {grantedFlags.length === 1 ? "uma marca" : `${grantedFlags.length} marcas`} na
          crônica da dinastia — seus descendentes vão sentir o efeito disso.
        </p>
      )}

      <ReportErrorBoundary>
        <Suspense fallback={<p className="report-loading">Carregando relatório do reinado…</p>}>
          <ReignReport
            indicators={indicators}
            factions={factions}
            history={history}
            indicatorSnapshots={indicatorSnapshots}
            earnedAchievementIds={earnedAchievementIds}
            newAchievementIds={newAchievementIds}
          />
        </Suspense>
      </ReportErrorBoundary>

      {!isLastReign ? (
        <>
          <p className="dynasty-hint">
            Reinado nº {reignNumber} de {TOTAL_REIGNS} desta dinastia. O próximo herdeiro assume o trono
            herdando um pouco do seu prestígio — e qualquer marca deixada acima.
          </p>
          <div className="end-screen-actions">
            <button type="button" className="primary-button" onClick={onContinueDynasty}>
              Próximo Reinado
            </button>
            <button type="button" className="secondary-button" onClick={onNewDynasty}>
              Começar nova dinastia
            </button>
            <ShareButton text={buildShareText(result, indicators, history, reignNumber)} shareTitle="A Dinastia" />
          </div>
        </>
      ) : (
        <>
          <p className="dynasty-hint">Este foi o último reinado desta linhagem. A crônica completa da dinastia está pronta.</p>
          <div className="end-screen-actions">
            <button type="button" className="primary-button" onClick={onViewChronicle}>
              Ver Crônica da Dinastia
            </button>
            <ShareButton text={buildShareText(result, indicators, history, reignNumber)} shareTitle="A Dinastia" />
          </div>
        </>
      )}
    </div>
  );
}
