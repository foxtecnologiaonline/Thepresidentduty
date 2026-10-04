import { INDICATOR_META, INDICATOR_ORDER, createInitialIndicators } from "../data/indicators";
import { SECTOR_META, SECTOR_ORDER, createInitialSectors } from "../data/sectors";
import { computeLeanProfile, describeLean, leanToPercent } from "../game/leaning";
import type { GameState, IndicatorKey, Indicators, SectorKey, Sectors } from "../types";
import { AchievementsPanel } from "./AchievementsPanel";
import { MandateTimeline } from "./MandateTimeline";
import { TrajectoryChart } from "./TrajectoryChart";

interface Props {
  indicators: Indicators;
  sectors: Sectors;
  history: GameState["history"];
  indicatorSnapshots: Indicators[];
  earnedAchievementIds: Set<string>;
  newAchievementIds: Set<string>;
}

function trendMessage(trend: "operador" | "visionario" | "estavel"): string {
  if (trend === "operador") {
    return "Ao longo da gestão, suas decisões avançaram para o estilo Operador e recuaram do Visionário.";
  }
  if (trend === "visionario") {
    return "Ao longo da gestão, suas decisões avançaram para o estilo Visionário e recuaram do Operador.";
  }
  return "Seu estilo de liderança se manteve estável do início ao fim da gestão.";
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

export function MandateReport({
  indicators,
  sectors,
  history,
  indicatorSnapshots,
  earnedAchievementIds,
  newAchievementIds,
}: Props) {
  const initialIndicators = createInitialIndicators();
  const initialSectors = createInitialSectors();
  const profile = computeLeanProfile(history);

  return (
    <div className="mandate-report">
      <section className="report-section">
        <h3>Trajetória do mandato</h3>
        <TrajectoryChart snapshots={indicatorSnapshots} />
      </section>

      <section className="report-section">
        <h3>Como a Orange mudou</h3>
        <ComparisonList<IndicatorKey>
          order={INDICATOR_ORDER}
          meta={INDICATOR_META}
          initial={initialIndicators}
          current={indicators}
        />
        <MandateTimeline history={history} />
      </section>

      <section className="report-section">
        <h3>Como os stakeholders reagiram</h3>
        <ComparisonList<SectorKey> order={SECTOR_ORDER} meta={SECTOR_META} initial={initialSectors} current={sectors} />
      </section>

      {profile && (
        <section className="report-section">
          <h3>Perfil de liderança da gestão</h3>
          <div className="lean-spectrum">
            <div className="lean-track">
              <div className="lean-marker" style={{ left: `${leanToPercent(profile.average)}%` }} />
            </div>
            <div className="lean-labels">
              <span>Visionário</span>
              <span>Equilibrado</span>
              <span>Operador</span>
            </div>
          </div>
          <p className="lean-summary">
            No geral, sua gestão pendeu para <strong>{describeLean(profile.average)}</strong>.
          </p>
          <p className="lean-trend">{trendMessage(profile.trend)}</p>
          <div className="lean-highlights">
            <div className="lean-highlight">
              <span className="lean-highlight-tag left">Decisão mais Visionária</span>
              <p>
                {profile.mostVisionario.choiceLabel}
                {profile.mostVisionario.actionLabel ? ` + ${profile.mostVisionario.actionLabel}` : ""}
              </p>
            </div>
            <div className="lean-highlight">
              <span className="lean-highlight-tag right">Decisão mais Operadora</span>
              <p>
                {profile.mostOperador.choiceLabel}
                {profile.mostOperador.actionLabel ? ` + ${profile.mostOperador.actionLabel}` : ""}
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
