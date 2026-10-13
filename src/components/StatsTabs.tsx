import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { SectorsPanel } from "./SectorsPanel";
import { ThreatsPanel } from "./ThreatsPanel";
import type { Indicators, Sectors, Threats } from "../types";

interface Props {
  sectors: Sectors;
  indicators: Indicators;
  threats: Threats;
}

type Tab = "sectors" | "indicators" | "threats";

/** Em telas muito estreitas, alterna entre os três painéis por abas em vez de empilhar
    os três sempre — juntos já ocupam a tela inteira nesses aparelhos. */
export function StatsTabs({ sectors, indicators, threats }: Props) {
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
        <button
          type="button"
          role="tab"
          aria-selected={tab === "threats"}
          className={tab === "threats" ? "active" : ""}
          onClick={() => setTab("threats")}
        >
          Risco
        </button>
      </div>
      {tab === "sectors" ? (
        <SectorsPanel sectors={sectors} />
      ) : tab === "indicators" ? (
        <div className="indicators-panel">
          <span className="panel-heading">Indicadores</span>
          <Dashboard indicators={indicators} />
        </div>
      ) : (
        <ThreatsPanel threats={threats} />
      )}
    </div>
  );
}
