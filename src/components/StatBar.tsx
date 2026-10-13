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
  /** Marca visualmente um indicador crítico em risco; setores nunca usam isso. */
  critical?: boolean;
  /** Para grandezas em que subir é ruim (risco de queda): inverte a leitura de cor. */
  invert?: boolean;
}

/** Barra de progresso genérica usada pelos indicadores de governo, setores da sociedade e risco de queda.
    Mostra só o valor atual — a v2.0 não expõe o efeito numérico de uma decisão, antes ou depois dela,
    só o estado corrente; a leitura é pela narrativa, não pelos números. */
export function StatBar({ icon, label, description, value, critical, invert = false }: Props) {
  const displayedValue = useCountUp(Math.round(value));

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
        <span className="indicator-value">{displayedValue}</span>
      </div>
      <div className="indicator-track">
        <div className="indicator-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
