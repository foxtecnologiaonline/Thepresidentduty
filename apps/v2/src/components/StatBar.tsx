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
  /** Marca visualmente um indicador ou setor perto do colapso que encerraria o mandato. */
  critical?: boolean;
}

/** Barra de progresso genérica usada tanto pelos indicadores de governo quanto pelos setores da sociedade. */
export function StatBar({ icon, label, description, value, critical }: Props) {
  const displayedValue = useCountUp(Math.round(value));

  return (
    <div className={`indicator ${statusClass(value)}${critical ? " critical-warning" : ""}`} title={description}>
      <div className="indicator-label">
        <span className="indicator-icon" aria-hidden="true">
          {icon}
        </span>
        <span>{label}</span>
        <span className="indicator-value">{displayedValue}</span>
      </div>
      <div className="indicator-track">
        <div className="indicator-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
