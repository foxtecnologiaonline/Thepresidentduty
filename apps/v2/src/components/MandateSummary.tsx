import { INDICATOR_META, INDICATOR_ORDER, createInitialIndicators } from "../data/indicators";
import { computeLeanProfile, describeLean } from "../game/leaning";
import type { EndResult, GameState, Indicators } from "../types";
import { ComparisonList } from "./ComparisonList";

interface Props {
  result: EndResult;
  indicators: Indicators;
  history: GameState["history"];
  totalTurns: number;
}

/**
 * Versão compacta do relatório final — só o essencial (indicadores início→fim e o
 * perfil ideológico resumido em 1 linha), sem gráfico, linha do tempo, setores ou
 * conquistas, para caber confortavelmente numa única imagem/página ao capturar.
 */
export function MandateSummary({ result, indicators, history, totalTurns }: Props) {
  const initialIndicators = createInitialIndicators();
  const profile = computeLeanProfile(history);

  return (
    <>
      <h1>{result.title}</h1>
      <p className="tagline">{result.narrative}</p>
      <p className="turn-reached">
        Mandato encerrado no trimestre {history.length} de {totalTurns}.
      </p>

      <section className="report-section">
        <h3>Como o país mudou</h3>
        <ComparisonList order={INDICATOR_ORDER} meta={INDICATOR_META} initial={initialIndicators} current={indicators} />
      </section>

      {profile && (
        <p className="lean-summary">
          Perfil ideológico do mandato: <strong>{describeLean(profile.average)}</strong>.
        </p>
      )}
    </>
  );
}
