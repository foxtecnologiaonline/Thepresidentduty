import { INDICATOR_META, INDICATOR_ORDER, createInitialIndicators } from "../data/indicators";
import { FACTION_META, FACTION_ORDER, createInitialFactions } from "../data/factions";
import { computeLeanProfile, describeLean, leanToPercent } from "../game/leaning";
import type { FactionKey, Factions, GameState, IndicatorKey, Indicators } from "../types";
import { AchievementsPanel } from "./AchievementsPanel";
import { ReignTimeline } from "./ReignTimeline";
import { TrajectoryChart } from "./TrajectoryChart";

interface Props {
  indicators: Indicators;
  factions: Factions;
  history: GameState["history"];
  indicatorSnapshots: Indicators[];
  earnedAchievementIds: Set<string>;
  newAchievementIds: Set<string>;
}

function trendMessage(trend: "centralizacao" | "descentralizacao" | "estavel"): string {
  if (trend === "centralizacao") {
    return "Ao longo do reinado, a coroa avançou rumo à centralização e recuou da concessão de poder.";
  }
  if (trend === "descentralizacao") {
    return "Ao longo do reinado, a coroa avançou rumo à concessão de poder e recuou do absolutismo.";
  }
  return "O rumo da coroa se manteve estável do início ao fim do reinado.";
}

interface ComparisonListProps<K extends string> {
  order: K[];
  meta: Record<K, { label: string; icon: string }>;
  initial: Record<K, number>;
  current: Record<K, number>;
}

function ComparisonList<K extends string>({ order, meta, initial, current }: ComparisonListProps<K>) {
  return (
    <div className="comparison-list">
      {order.map((key) => {
        const start = Math.round(initial[key]);
        const end = Math.round(current[key]);
        const delta = end - start;
        const trendClass = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
        return (
          <div key={key} className="comparison-row">
            <span className="indicator-icon" aria-hidden="true">
              {meta[key].icon}
            </span>
            <span className="comparison-label">{meta[key].label}</span>
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
  );
}

export function ReignReport({
  indicators,
  factions,
  history,
  indicatorSnapshots,
  earnedAchievementIds,
  newAchievementIds,
}: Props) {
  const initialIndicators = createInitialIndicators();
  const initialFactions = createInitialFactions();
  const profile = computeLeanProfile(history);

  return (
    <div className="mandate-report">
      <section className="report-section">
        <h3>Trajetória do reinado</h3>
        <TrajectoryChart snapshots={indicatorSnapshots} />
      </section>

      <section className="report-section">
        <h3>Como o reino mudou</h3>
        <ComparisonList<IndicatorKey>
          order={INDICATOR_ORDER}
          meta={INDICATOR_META}
          initial={initialIndicators}
          current={indicators}
        />
        <ReignTimeline history={history} />
      </section>

      <section className="report-section">
        <h3>Como as facções reagiram</h3>
        <ComparisonList<FactionKey> order={FACTION_ORDER} meta={FACTION_META} initial={initialFactions} current={factions} />
      </section>

      {profile && (
        <section className="report-section">
          <h3>Rumo da coroa neste reinado</h3>
          <div className="lean-spectrum">
            <div className="lean-track">
              <div className="lean-marker" style={{ left: `${leanToPercent(profile.average)}%` }} />
            </div>
            <div className="lean-labels">
              <span>Poder Disperso</span>
              <span>Equilíbrio</span>
              <span>Autocracia</span>
            </div>
          </div>
          <p className="lean-summary">
            No geral, este reinado pendeu para <strong>{describeLean(profile.average)}</strong>.
          </p>
          <p className="lean-trend">{trendMessage(profile.trend)}</p>
          <div className="lean-highlights">
            <div className="lean-highlight">
              <span className="lean-highlight-tag left">Decisão mais descentralizadora</span>
              <p>
                {profile.mostDescentralizador.choiceLabel}
                {profile.mostDescentralizador.decreeLabel ? ` + ${profile.mostDescentralizador.decreeLabel}` : ""}
              </p>
            </div>
            <div className="lean-highlight">
              <span className="lean-highlight-tag right">Decisão mais centralizadora</span>
              <p>
                {profile.mostCentralizador.choiceLabel}
                {profile.mostCentralizador.decreeLabel ? ` + ${profile.mostCentralizador.decreeLabel}` : ""}
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
