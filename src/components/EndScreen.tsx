import { Component, lazy, Suspense, type ReactNode } from "react";
import { ShareButton } from "./ShareButton";
import { buildShareText } from "../game/share";
import { CONSECUTIVE_REELECTION_LIMIT } from "../game/engine";
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
  consecutiveTerms: number;
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
  consecutiveTerms,
  earnedAchievementIds,
  newAchievementIds,
  onContinueDynasty,
  onNewDynasty,
}: Props) {
  // Art. 14 §5º da CF: só é permitida uma reeleição consecutiva. Usa consecutiveTerms (quantos
  // mandatos seguidos o titular ATUAL já tem), não dynastyTerm — senão a sucessão, uma vez
  // disparada, nunca desligaria e nenhum sucessor teria direito à própria reeleição.
  const isSuccession = consecutiveTerms >= CONSECUTIVE_REELECTION_LIMIT;

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
        {isSuccession
          ? `Mandato nº ${dynastyTerm} da sua dinastia. Você já cumpriu uma reeleição seguida e, pela \
Constituição, não pode concorrer a mais um mandato direto — ao continuar, um(a) aliado(a) de confiança \
assume a candidatura. Ele(a) herda uma fração menor do seu legado e começa com menos força na Assembleia \
por não ser o titular.`
          : `Mandato nº ${dynastyTerm} da sua dinastia. Ao continuar, você concorre à reeleição e herda um \
pouco da sua popularidade final.`}
      </p>
      <div className="end-screen-actions">
        <button type="button" className="primary-button" onClick={onContinueDynasty}>
          {isSuccession ? "Eleger Sucessor(a) e Continuar" : "Concorrer à Reeleição"}
        </button>
        <button type="button" className="secondary-button" onClick={onNewDynasty}>
          Começar nova dinastia
        </button>
        <ShareButton text={buildShareText(result, indicators, history)} />
      </div>
    </div>
  );
}
