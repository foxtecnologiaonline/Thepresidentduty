import { useCountUp } from "../hooks/useCountUp";

/** Faixa de status compartilhada por indicadores e setores: mesmos limiares, mesma leitura visual. */
function statusClass(value: number): string {
  if (value <= 20) return "danger";
  if (value <= 45) return "warning";
  return "ok";
}

/**
 * "Governabilidade" é o único rótulo longo o bastante para não caber numa linha só nas
 * grades de 3-4 colunas sem ser uma palavra composta com espaço (como "Relações
 * Institucionais", que quebra naturalmente entre as duas palavras). Sem um ponto de quebra
 * sugerido, o navegador corta no meio da palavra sem hífen ("Governabilidad" + "e"); um
 * hífen suave (U+00AD) na sílaba certa garante uma quebra legível quando ela precisar
 * acontecer, sem aparecer em nada (tooltip, compartilhamento) quando a palavra cabe inteira.
 */
const SOFT_HYPHENATED_LABELS: Record<string, string> = {
  Governabilidade: "Governabili­dade",
};

function displayLabel(label: string): string {
  return SOFT_HYPHENATED_LABELS[label] ?? label;
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
        <span>{displayLabel(label)}</span>
        <span className="indicator-value">
          {critical && (
            <span className="critical-alert-icon" role="img" aria-label="Indicador crítico perto de zerar">
              ⚠️
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
