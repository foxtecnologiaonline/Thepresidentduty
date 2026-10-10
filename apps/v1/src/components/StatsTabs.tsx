import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { SectorsPanel } from "./SectorsPanel";
import type { IndicatorKey, Indicators, SectorKey, Sectors } from "../types";

interface Props {
  sectors: Sectors;
  sectorDeltas?: Partial<Record<SectorKey, number>>;
  indicators: Indicators;
  indicatorDeltas?: Partial<Record<IndicatorKey, number>>;
}

type Tab = "sectors" | "indicators";

/** Em telas muito estreitas, alterna entre os dois painéis por abas em vez de empilhar
    os dois sempre — as duas grades juntas já ocupam a tela inteira nesses aparelhos. */
export function StatsTabs({ sectors, sectorDeltas, indicators, indicatorDeltas }: Props) {
  const [tab, setTab] = useState<Tab>("sectors");

  return (
    <div className="stats-tabs">
      <div className="stats-tab-buttons" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "sectors"}
          className={tab === "sectors" ? "active" : ""}
          onClick={() => setTab("sectors")}
        >
          Setores
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
      {tab === "sectors" ? (
        <SectorsPanel sectors={sectors} lastDeltas={sectorDeltas} />
      ) : (
        <div className="indicators-panel">
          <span className="panel-heading">Indicadores</span>
          <Dashboard indicators={indicators} lastDeltas={indicatorDeltas} />
        </div>
      )}
    </div>
  );
}
