import { useCountUp } from "../hooks/useCountUp";

/** Faixa de status compartilhada por indicadores e setores: mesmos limiares, mesma leitura visual. */
function statusClass(value: number): string {
  if (value <= 20) return "danger";
  if (value <= 45) return "warning";
  return "ok";
}

/**
 * Símbolo que acompanha os dois estados que pedem atenção, para quem não distingue bem
 * vermelho de amarelo/verde não depender só da cor da barra para notar o problema
 * (WCAG 1.4.1 — não usar cor como único meio de transmitir informação). "ok" fica sem
 * símbolo de propósito: é o estado padrão, sinalizá-lo também só adicionaria ruído.
 */
const STATUS_GLYPH: Record<string, string> = {
  ok: "",
  warning: "▲",
  danger: "✖",
};

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
  const status = statusClass(value);
  const glyph = STATUS_GLYPH[status];

  return (
    <div className={`indicator ${status}${critical ? " critical-warning" : ""}`} title={description}>
      <div className="indicator-label">
        <span className="indicator-icon" aria-hidden="true">
          {icon}
        </span>
        <span>{label}</span>
        <span className="indicator-value">
          {glyph && (
            <span className={`status-glyph ${status}`} aria-hidden="true">
              {glyph}
            </span>
          )}
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
