import { Component, lazy, Suspense, type ReactNode } from "react";
import { ShareButton } from "./ShareButton";
import { buildShareText } from "../game/share";
import { DIFFICULTY_LABELS } from "../game/engine";
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
  dynastyTerm: number;
  difficulty: Difficulty;
  earnedAchievementIds: Set<string>;
  newAchievementIds: Set<string>;
  onContinueDynasty: () => void;
  onNewDynasty: () => void;
}

// Só existe pro cabeçalho do relatório impresso (ver .print-only no CSS) — não aparece
// na tela, então não precisa reatividade: a data de quando o jogador decidiu imprimir
// já é a informação certa num relatório gerado sob demanda.
function formatPrintTimestamp(): string {
  return new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * O navegador recolhe o conteúdo de um <details> fechado por um mecanismo interno que
 * CSS (nem `display: block !important`) derruba — então a linha do tempo de decisões só
 * aparece no relatório impresso se o elemento estiver genuinamente aberto. Abrimos todo
 * <details> da tela antes de imprimir e devolvemos ao estado anterior depois (via
 * `afterprint`, que dispara tanto ao confirmar quanto ao cancelar o diálogo).
 */
function handlePrint() {
  const detailsElements = document.querySelectorAll<HTMLDetailsElement>("details");
  const previouslyOpen = new Map<HTMLDetailsElement, boolean>();
  detailsElements.forEach((element) => {
    previouslyOpen.set(element, element.open);
    element.open = true;
  });

  function restore() {
    previouslyOpen.forEach((wasOpen, element) => {
      element.open = wasOpen;
    });
    window.removeEventListener("afterprint", restore);
  }
  window.addEventListener("afterprint", restore);

  window.print();
}

export function EndScreen({
  result,
  indicators,
  sectors,
  history,
  indicatorSnapshots,
  totalTurns,
  dynastyTerm,
  difficulty,
  earnedAchievementIds,
  newAchievementIds,
  onContinueDynasty,
  onNewDynasty,
}: Props) {
  return (
    <div className={`screen end-screen ${result.victory ? "victory" : "defeat"}`}>
      <p className="print-only print-report-meta">
        Relatório de Mandato — O Prefeito · Dificuldade: {DIFFICULTY_LABELS[difficulty]} · Gerado em{" "}
        {formatPrintTimestamp()}
      </p>
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

      <p className="dynasty-hint no-print">
        Mandato nº {dynastyTerm} da sua dinastia. Ao continuar, seu sucessor herda um pouco do seu apoio final
        na Câmara.
      </p>
      <div className="end-screen-actions no-print">
        <button type="button" className="primary-button" onClick={onContinueDynasty}>
          Jogar Novamente
        </button>
        <button type="button" className="secondary-button" onClick={onNewDynasty}>
          Começar nova dinastia
        </button>
        <ShareButton text={buildShareText(result, indicators, history)} />
        <button type="button" className="secondary-button" onClick={handlePrint}>
          Imprimir Relatório
        </button>
      </div>
    </div>
  );
}
