import { SECTOR_META, SECTOR_ORDER, SECTOR_WARNING_THRESHOLD } from "../data/sectors";
import type { SectorMeta, Sectors } from "../types";
import { StatBar } from "./StatBar";

interface Props {
  sectors: Sectors;
}

function SectorBar({ meta, value }: { meta: SectorMeta; value: number }) {
  const isCriticalWarning = value <= SECTOR_WARNING_THRESHOLD;
  return (
    <StatBar
      icon={meta.icon}
      label={meta.label}
      description={meta.description}
      value={value}
      critical={isCriticalWarning}
    />
  );
}

export function SectorsPanel({ sectors }: Props) {
  return (
    <section className="sectors-panel">
      <span className="panel-heading">Setores da Sociedade</span>
      <div className="dashboard">
        {SECTOR_ORDER.map((key) => (
          <SectorBar key={key} meta={SECTOR_META[key]} value={sectors[key]} />
        ))}
      </div>
    </section>
  );
}
