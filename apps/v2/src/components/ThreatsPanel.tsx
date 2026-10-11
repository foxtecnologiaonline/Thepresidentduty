import { getThreatStage, THREAT_META, THREAT_ORDER, THREAT_STAGE_LABELS } from "../data/threats";
import type { ThreatKey, ThreatMeta, Threats } from "../types";
import { StatBar } from "./StatBar";

interface Props {
  threats: Threats;
  lastDeltas?: Partial<Record<ThreatKey, number>>;
}

function ThreatBar({ meta, value, delta }: { meta: ThreatMeta; value: number; delta?: number }) {
  const stage = getThreatStage(value);
  const description = `${meta.description} Estágio atual: ${THREAT_STAGE_LABELS[stage]}.`;
  return (
    <StatBar icon={meta.icon} label={meta.label} description={description} value={value} delta={delta} invert />
  );
}

export function ThreatsPanel({ threats, lastDeltas }: Props) {
  return (
    <section className="threats-panel">
      <span className="panel-heading">Risco de Queda</span>
      <div className="dashboard">
        {THREAT_ORDER.map((key) => (
          <ThreatBar key={key} meta={THREAT_META[key]} value={threats[key]} delta={lastDeltas?.[key]} />
        ))}
      </div>
    </section>
  );
}
