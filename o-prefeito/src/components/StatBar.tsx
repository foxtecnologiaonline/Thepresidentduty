import { useCountUp } from "../hooks/useCountUp";
import { InfoToggle } from "./InfoToggle";

/** Faixa de status compartilhada por indicadores e facções: mesmos limiares, mesma leitura visual. */
function statusClass(value: number): string {
  if (value <= 20) return "danger";
  if (value <= 45) return "warning";
  return "ok";
}

interface Props {
  icon: string;
  label: string;
  description: string;
  value: number;
  delta?: number;
  /** Marca visualmente um indicador crítico em risco iminente (pulso vermelho); facções nunca usam isso. */
  critical?: boolean;
  /** Alerta mais cedo que `critical`, sem pulso: o indicador crítico já merece atenção. */
  attention?: boolean;
}

/** Barra de progresso genérica usada tanto pelos indicadores de governo quanto pelas facções da cidade. */
export function StatBar({ icon, label, description, value, delta, critical, attention }: Props) {
  const displayedValue = useCountUp(Math.round(value));
  const stateClass = critical ? " critical-warning" : attention ? " critical-attention" : "";

  return (
    <div className={`indicator ${statusClass(value)}${stateClass}`} title={description}>
      <div className="indicator-label">
        <span className="indicator-icon" aria-hidden="true">
          {icon}
        </span>
        <span>{label}</span>
        <InfoToggle label={label} description={description} />
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
