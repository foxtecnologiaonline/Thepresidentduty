import { SECTOR_META, SECTOR_ORDER } from "../data/sectors";
import type { SectorKey, SectorMeta, Sectors } from "../types";
import { StatBar } from "./StatBar";

interface Props {
  sectors: Sectors;
  lastDeltas?: Partial<Record<SectorKey, number>>;
}

function SectorBar({ meta, value, delta }: { meta: SectorMeta; value: number; delta?: number }) {
  return <StatBar icon={meta.icon} label={meta.label} description={meta.description} value={value} delta={delta} />;
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
