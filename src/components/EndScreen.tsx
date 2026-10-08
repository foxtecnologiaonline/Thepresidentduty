import { Component, lazy, Suspense, type ReactNode } from "react";
import { ShareButton } from "./ShareButton";
import { buildShareText } from "../game/share";
import { DIFFICULTY_LABELS } from "../game/engine";
import { printReport } from "../game/print";
import type { Difficulty, EndResult, GameState, Indicators, Sectors } from "../types";

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
  tenureTerm: number;
  difficulty: Difficulty;
  earnedAchievementIds: Set<string>;
  newAchievementIds: Set<string>;
  onContinueTenure: () => void;
  onNewTenure: () => void;
}

/** Só aparece no papel/PDF (ver @media print) — dá contexto ao relatório fora do app. */
function PrintHeader({
  result,
  totalTurns,
  turnsPlayed,
  difficulty,
}: {
  result: EndResult;
  totalTurns: number;
  turnsPlayed: number;
  difficulty: Difficulty;
}) {
  const generatedAt = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div className="print-header">
      <span className="print-header-brand">🍊 O CEO: Orange — Relatório de Gestão</span>
      <span>
        {result.title} · média {Math.round(result.average)} · {turnsPlayed} de {totalTurns} trimestres ·
        dificuldade {DIFFICULTY_LABELS[difficulty]}
      </span>
      <span className="print-header-date">Gerado em {generatedAt}</span>
    </div>
  );
}

export function EndScreen({
  result,
  indicators,
  sectors,
  history,
  indicatorSnapshots,
  totalTurns,
  tenureTerm,
  difficulty,
  earnedAchievementIds,
  newAchievementIds,
  onContinueTenure,
  onNewTenure,
}: Props) {
  return (
    <div className={`screen end-screen ${result.victory ? "victory" : "defeat"}`}>
      <PrintHeader result={result} totalTurns={totalTurns} turnsPlayed={history.length} difficulty={difficulty} />
      <h1>{result.title}</h1>
      <p className="tagline">{result.narrative}</p>
      <p className="turn-reached">
        Gestão encerrada no trimestre {history.length} de {totalTurns}.
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

      <p className="tenure-hint">
        Gestão nº {tenureTerm} no comando da Orange. Ao continuar, seu sucessor herda um pouco da sua
        reputação final.
      </p>
      <div className="end-screen-actions">
        <button type="button" className="primary-button" onClick={onContinueTenure}>
          Jogar Novamente
        </button>
        <button type="button" className="secondary-button" onClick={onNewTenure}>
          Começar um novo ciclo
        </button>
        <ShareButton text={buildShareText(result, indicators, history)} />
        <button type="button" className="secondary-button" onClick={printReport}>
          Gerar relatório (imprimir / PDF)
        </button>
      </div>
    </div>
  );
}
