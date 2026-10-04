import { StatBar } from "../../components/StatBar";
import { FACTION_META, FACTION_ORDER } from "../data/factions";
import type { FactionKey, FactionMeta, Factions } from "../types";

interface Props {
  factions: Factions;
  lastDeltas?: Partial<Record<FactionKey, number>>;
}

function FactionBar({ meta, value, delta }: { meta: FactionMeta; value: number; delta?: number }) {
  return <StatBar icon={meta.icon} label={meta.label} description={meta.description} value={value} delta={delta} />;
}

export function FactionsPanel({ factions, lastDeltas }: Props) {
  return (
    <section className="sectors-panel">
      <span className="panel-heading">Facções do Reino</span>
      <div className="dashboard">
        {FACTION_ORDER.map((key) => (
          <FactionBar key={key} meta={FACTION_META[key]} value={factions[key]} delta={lastDeltas?.[key]} />
        ))}
      </div>
    </section>
  );
}
