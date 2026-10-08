import { Component, lazy, Suspense, type ReactNode } from "react";
import { ShareButton } from "./ShareButton";
import { buildShareText } from "../game/share";
import type { EndResult, GameState, Indicators, Sectors } from "../types";

// O relatório (gráfico + timeline + conquistas) só é necessário quando o
// mandato termina, então fica num chunk separado em vez de pesar no
// carregamento inicial do jogo (tela inicial + primeiro evento).
const MandateReport = lazy(() =>
  import("./MandateReport").then((module) => ({ default: module.MandateReport }))
);

// O carregamento do chunk é uma requisição de rede (pode falhar por estar
// offline, por um deploy novo ter invalidado o hash do chunk em cache, etc.).
// Sem esse boundary, uma falha no import() derrubaria a tela inteira em vez
// de só o relatório.
class ReportErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="report-loading">
          Não foi possível carregar o relatório do mandato. Recarregue a página para tentar
          novamente.
        </p>
      );
    }
    return this.props.children;
  }
}

interface Props {
  result: EndResult;
  indicators: Indicators;
  sectors: Sectors;
  history: GameState["history"];
  indicatorSnapshots: Indicators[];
  totalTurns: number;
  dynastyTerm: number;
  earnedAchievementIds: Set<string>;
  newAchievementIds: Set<string>;
  onContinueDynasty: () => void;
  onNewDynasty: () => void;
}

export function EndScreen({
  result,
  indicators,
  sectors,
  history,
  indicatorSnapshots,
  totalTurns,
  dynastyTerm,
  earnedAchievementIds,
  newAchievementIds,
  onContinueDynasty,
  onNewDynasty,
}: Props) {
  return (
    <div className={`screen end-screen ${result.victory ? "victory" : "defeat"}`}>
      <h1>{result.title}</h1>
      <p className="tagline">{result.narrative}</p>
      <p className="turn-reached">
        Mandato encerrado no trimestre {history.length} de {totalTurns}.
      </p>

      <ReportErrorBoundary>
        <Suspense fallback={<p className="report-loading">Carregando relatório do mandato…</p>}>
          <MandateReport
            indicators={indicators}
            sectors={sectors}
            history={history}
            indicatorSnapshots={indicatorSnapshots}
            earnedAchievementIds={earnedAchievementIds}
            newAchievementIds={newAchievementIds}
          />
        </Suspense>
      </ReportErrorBoundary>

      <p className="dynasty-hint">
        Mandato nº {dynastyTerm} da sua dinastia. Ao continuar, seu sucessor herda um pouco da sua popularidade
        final.
      </p>
      <div className="end-screen-actions">
        <button type="button" className="primary-button" onClick={onContinueDynasty}>
          Jogar Novamente
        </button>
        <button type="button" className="secondary-button" onClick={onNewDynasty}>
          Começar nova dinastia
        </button>
        <ShareButton text={buildShareText(result, indicators, history)} />
        <button type="button" className="secondary-button" onClick={() => window.print()}>
          Imprimir relatório
        </button>
      </div>
    </div>
  );
}
