import { SECTOR_META, SECTOR_ORDER } from "../data/sectors";
import type { SectorKey, SectorMeta, Sectors } from "../types";
import { StatBar } from "./StatBar";

interface Props {
  sectors: Sectors;
  lastDeltas?: Partial<Record<SectorKey, number>>;
  /** Classe extra no elemento raiz — usada pelo StatsTabs para esconder a aba inativa na tela
      mas ainda assim incluí-la quando a página é impressa (ver .stats-tab-inactive). */
  className?: string;
}

function SectorBar({ meta, value, delta }: { meta: SectorMeta; value: number; delta?: number }) {
  return <StatBar icon={meta.icon} label={meta.label} description={meta.description} value={value} delta={delta} />;
}

export function SectorsPanel({ sectors, lastDeltas, className }: Props) {
  return (
    <section className={`sectors-panel${className ? ` ${className}` : ""}`}>
      <span className="panel-heading">Setores da Sociedade</span>
      <div className="dashboard">
        {SECTOR_ORDER.map((key) => (
          <SectorBar key={key} meta={SECTOR_META[key]} value={sectors[key]} delta={lastDeltas?.[key]} />
        ))}
      </div>
    </section>
  );
}
