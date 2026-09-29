import { INDICATOR_META, INDICATOR_ORDER, createInitialIndicators } from "../data/indicators";
import { computeLeanProfile, describeLean, leanToPercent } from "../game/leaning";
import type { GameState, Indicators } from "../types";
import { AchievementsPanel } from "./AchievementsPanel";
import { MandateTimeline } from "./MandateTimeline";
import { TrajectoryChart } from "./TrajectoryChart";

interface Props {
  indicators: Indicators;
  history: GameState["history"];
  indicatorSnapshots: Indicators[];
  earnedAchievementIds: Set<string>;
  newAchievementIds: Set<string>;
}

function trendMessage(trend: "direita" | "esquerda" | "estavel"): string {
  if (trend === "direita") {
    return "Ao longo do mandato, suas decisões avançaram para a direita e recuaram da esquerda.";
  }
  if (trend === "esquerda") {
    return "Ao longo do mandato, suas decisões avançaram para a esquerda e recuaram da direita.";
  }
  return "Sua linha ideológica se manteve estável do início ao fim do mandato.";
}

export function MandateReport({
  indicators,
  history,
  indicatorSnapshots,
  earnedAchievementIds,
  newAchievementIds,
}: Props) {
  const initial = createInitialIndicators();
  const profile = computeLeanProfile(history);

  return (
    <div className="mandate-report">
      <section className="report-section">
        <h3>Trajetória do mandato</h3>
        <TrajectoryChart snapshots={indicatorSnapshots} />
      </section>

      <section className="report-section">
        <h3>Como o país mudou</h3>
        <div className="comparison-list">
          {INDICATOR_ORDER.map((key) => {
            const start = Math.round(initial[key]);
            const end = Math.round(indicators[key]);
            const delta = end - start;
            const trendClass = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
            return (
              <div key={key} className="comparison-row">
                <span className="indicator-icon" aria-hidden="true">
                  {INDICATOR_META[key].icon}
                </span>
                <span className="comparison-label">{INDICATOR_META[key].label}</span>
                <span className="comparison-values">
                  {start} → {end}
                </span>
                <span className={`comparison-delta ${trendClass}`}>
                  {trendClass === "up" && `▲ avançou +${delta}`}
                  {trendClass === "down" && `▼ recuou ${delta}`}
                  {trendClass === "flat" && "• estável"}
                </span>
              </div>
            );
          })}
        </div>
        <MandateTimeline history={history} />
      </section>

      {profile && (
        <section className="report-section">
          <h3>Perfil ideológico do mandato</h3>
          <div className="lean-spectrum">
            <div className="lean-track">
              <div className="lean-marker" style={{ left: `${leanToPercent(profile.average)}%` }} />
            </div>
            <div className="lean-labels">
              <span>Esquerda</span>
              <span>Centro</span>
              <span>Direita</span>
            </div>
          </div>
          <p className="lean-summary">
            No geral, seu governo pendeu para <strong>{describeLean(profile.average)}</strong>.
          </p>
          <p className="lean-trend">{trendMessage(profile.trend)}</p>
          <div className="lean-highlights">
            <div className="lean-highlight">
              <span className="lean-highlight-tag left">Decisão mais à esquerda</span>
              <p>
                {profile.mostLeft.choiceLabel}
                {profile.mostLeft.actionLabel ? ` + ${profile.mostLeft.actionLabel}` : ""}
              </p>
            </div>
            <div className="lean-highlight">
              <span className="lean-highlight-tag right">Decisão mais à direita</span>
              <p>
                {profile.mostRight.choiceLabel}
                {profile.mostRight.actionLabel ? ` + ${profile.mostRight.actionLabel}` : ""}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="report-section">
        <h3>Conquistas</h3>
        <AchievementsPanel earnedIds={earnedAchievementIds} newIds={newAchievementIds} />
      </section>
    </div>
  );
}
