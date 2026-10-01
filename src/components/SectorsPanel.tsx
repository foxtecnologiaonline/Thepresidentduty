import { SECTOR_META, SECTOR_ORDER } from "../data/sectors";
import { useCountUp } from "../hooks/useCountUp";
import type { SectorKey, SectorMeta, Sectors } from "../types";

interface Props {
  sectors: Sectors;
  lastDeltas?: Partial<Record<SectorKey, number>>;
}

function statusClass(value: number): string {
  if (value <= 20) return "danger";
  if (value <= 45) return "warning";
  return "ok";
}

function SectorBar({ meta, value, delta }: { meta: SectorMeta; value: number; delta?: number }) {
  const displayedValue = useCountUp(Math.round(value));

  return (
    <div className={`indicator ${statusClass(value)}`} title={meta.description}>
      <div className="indicator-label">
        <span className="indicator-icon" aria-hidden="true">
          {meta.icon}
        </span>
        <span>{meta.label}</span>
        <span className="indicator-value">
          {displayedValue}
          {typeof delta === "number" && delta !== 0 && (
            <span className={`indicator-delta ${delta > 0 ? "positive" : "negative"}`}>
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
        </span>
      </div>
      <div className="indicator-track">
        <div className="indicator-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function SectorsPanel({ sectors, lastDeltas }: Props) {
  return (
    <section className="sectors-panel">
      <span className="panel-heading">Setores da Sociedade</span>
      <div className="dashboard">
        {SECTOR_ORDER.map((key) => (
          <SectorBar key={key} meta={SECTOR_META[key]} value={sectors[key]} delta={lastDeltas?.[key]} />
        ))}
      </div>
    </section>
  );
}
