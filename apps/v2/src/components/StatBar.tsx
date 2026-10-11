import { useCountUp } from "../hooks/useCountUp";

/** Faixa de status compartilhada por indicadores e setores: mesmos limiares, mesma leitura visual.
    `invert` troca a leitura para grandezas em que alto é ruim (risco de queda): o valor é
    espelhado antes de cair nas mesmas faixas, em vez de duplicar os limiares ao contrário. */
function statusClass(value: number, invert: boolean): string {
  const read = invert ? 100 - value : value;
  if (read <= 20) return "danger";
  if (read <= 45) return "warning";
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
  /** Para grandezas em que subir é ruim (risco de queda): inverte cor da barra e do delta. */
  invert?: boolean;
}

/** Barra de progresso genérica usada pelos indicadores de governo, setores da sociedade e risco de queda. */
export function StatBar({ icon, label, description, value, delta, critical, invert = false }: Props) {
  const displayedValue = useCountUp(Math.round(value));
  const deltaIsGood = typeof delta === "number" && (invert ? delta < 0 : delta > 0);

  return (
    <div
      className={`indicator ${statusClass(value, invert)}${critical ? " critical-warning" : ""}`}
      title={description}
    >
      <div className="indicator-label">
        <span className="indicator-icon" aria-hidden="true">
          {icon}
        </span>
        <span>{label}</span>
        <span className="indicator-value">
          {displayedValue}
          {typeof delta === "number" && delta !== 0 && (
            <span className={`indicator-delta ${deltaIsGood ? "positive" : "negative"}`}>
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
