import { useState } from "react";
import type { FactionKey, Factions, IndicatorKey, Indicators } from "../types";
import { Dashboard } from "./Dashboard";
import { FactionsPanel } from "./FactionsPanel";

interface Props {
  factions: Factions;
  factionDeltas?: Partial<Record<FactionKey, number>>;
  indicators: Indicators;
  indicatorDeltas?: Partial<Record<IndicatorKey, number>>;
}

type Tab = "factions" | "indicators";

/** Em telas muito estreitas, alterna entre os dois painéis por abas em vez de empilhar
    os dois sempre — as duas grades juntas já ocupam a tela inteira nesses aparelhos. */
export function StatsTabs({ factions, factionDeltas, indicators, indicatorDeltas }: Props) {
  const [tab, setTab] = useState<Tab>("factions");

  return (
    <div className="stats-tabs">
      <div className="stats-tab-buttons" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "factions"}
          className={tab === "factions" ? "active" : ""}
          onClick={() => setTab("factions")}
        >
          Facções
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "indicators"}
          className={tab === "indicators" ? "active" : ""}
          onClick={() => setTab("indicators")}
        >
          Indicadores
        </button>
      </div>
      {tab === "factions" ? (
        <FactionsPanel factions={factions} lastDeltas={factionDeltas} />
      ) : (
        <div className="indicators-panel">
          <span className="panel-heading">Indicadores</span>
          <Dashboard indicators={indicators} lastDeltas={indicatorDeltas} />
        </div>
      )}
    </div>
  );
}
