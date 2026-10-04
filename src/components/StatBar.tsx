import { useCountUp } from "../hooks/useCountUp";

/** Faixa de status compartilhada por indicadores e setores: mesmos limiares, mesma leitura visual. */
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
  /** Marca visualmente um indicador crítico em risco; setores nunca usam isso. */
  critical?: boolean;
}

/** Barra de progresso genérica usada tanto pelos indicadores de governo quanto pelos setores da sociedade. */
export function StatBar({ icon, label, description, value, delta, critical }: Props) {
  const displayedValue = useCountUp(Math.round(value));

  return (
    <div className={`indicator ${statusClass(value)}${critical ? " critical-warning" : ""}`} title={description}>
      <div className="indicator-label">
        <span className="indicator-icon" aria-hidden="true">
          {icon}
        </span>
        <span>{label}</span>
        {critical && (
          <span className="critical-warning-badge" aria-hidden="true">
            ⚠
          </span>
        )}
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
