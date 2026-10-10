interface ComparisonListProps<K extends string> {
  order: K[];
  meta: Record<K, { label: string; icon: string }>;
  initial: Record<K, number>;
  current: Record<K, number>;
}

/** Linha "início → fim" por indicador/setor, com seta de tendência — usada tanto no
    relatório completo (MandateReport) quanto no resumo de 1 página (MandateSummary). */
export function ComparisonList<K extends string>({ order, meta, initial, current }: ComparisonListProps<K>) {
  return (
    <div className="comparison-list">
      {order.map((key) => {
        const start = Math.round(initial[key]);
        const end = Math.round(current[key]);
        const delta = end - start;
        const trendClass = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
        return (
          <div key={key} className="comparison-row">
            <span className="indicator-icon" aria-hidden="true">
              {meta[key].icon}
            </span>
            <span className="comparison-label">{meta[key].label}</span>
            <span className="comparison-values">
              {start} → {end}
            </span>
            <span className={`comparison-delta ${trendClass}`}>
              {trendClass === "up" && `▲ avançou +${delta}`}
              {trendClass === "down" && `▼ recuou ${delta}`}
              {trendClass === "flat" && "• estável"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
