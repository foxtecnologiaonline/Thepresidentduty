import { getThreatStage, THREAT_META, THREAT_ORDER, THREAT_STAGE_LABELS } from "../data/threats";
import type { ThreatMeta, Threats } from "../types";
import { StatBar } from "./StatBar";

interface Props {
  threats: Threats;
}

function ThreatBar({ meta, value }: { meta: ThreatMeta; value: number }) {
  const stage = getThreatStage(value);
  const description = `${meta.description} Estágio atual: ${THREAT_STAGE_LABELS[stage]}.`;
  return <StatBar icon={meta.icon} label={meta.label} description={description} value={value} invert />;
}

export function ThreatsPanel({ threats }: Props) {
  return (
    <section className="threats-panel">
      <span className="panel-heading">Risco de Queda</span>
      <div className="dashboard">
        {THREAT_ORDER.map((key) => (
          <ThreatBar key={key} meta={THREAT_META[key]} value={threats[key]} />
        ))}
      </div>
    </section>
  );
}
