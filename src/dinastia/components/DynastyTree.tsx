import { Fragment } from "react";
import type { ReignSummary } from "../types";

interface Props {
  /** Reinados já concluídos desta dinastia, nesta ordem (1º ao mais recente). */
  completedReigns: ReignSummary[];
  totalReigns: number;
}

type NodeState = "victory" | "collapse" | "pending";

function nodeIcon(state: NodeState): string {
  if (state === "victory") return "👑";
  if (state === "collapse") return "💀";
  return "·";
}

/**
 * Rótulo de texto por baixo do ícone — além de ajudar quem não enxerga bem o emoji
 * (ou a cor do contorno do nó), é a rede de segurança para a impressão/PDF: alguns
 * motores de impressão não embutem a fonte colorida de emoji e o 👑/💀 saem como um
 * contorno vazio, mas o texto "Vitória"/"Colapso" continua legível de qualquer jeito.
 */
function nodeOutcomeLabel(state: NodeState): string | null {
  if (state === "victory") return "Vitória";
  if (state === "collapse") return "Colapso";
  return null;
}

/** Linha de nós — um por reinado da dinastia — com coroa/caveira para reinados já
    jogados e um marcador tracejado para os que ainda não chegaram. Usado tanto no fim
    de um reinado (mostra o progresso até aqui) quanto na crônica final (os 5 completos). */
export function DynastyTree({ completedReigns, totalReigns }: Props) {
  const byNumber = new Map(completedReigns.map((reign) => [reign.reignNumber, reign]));
  const reignNumbers = Array.from({ length: totalReigns }, (_, i) => i + 1);

  return (
    <div className="dynasty-tree" role="list" aria-label="Linha do tempo da dinastia">
      {reignNumbers.map((reignNumber, index) => {
        const summary = byNumber.get(reignNumber);
        const state: NodeState = summary ? (summary.victory ? "victory" : "collapse") : "pending";
        const title = summary
          ? `Reinado ${reignNumber}: ${summary.title} (média ${Math.round(summary.average)})${summary.victory ? "" : " — colapso"}`
          : `Reinado ${reignNumber}: ainda não jogado`;

        return (
          <Fragment key={reignNumber}>
            <div className="dynasty-node-block" role="listitem" title={title}>
              <div className={`dynasty-node ${state}`}>
                <span aria-hidden="true">{nodeIcon(state)}</span>
              </div>
              <span className="dynasty-node-label">Reinado {reignNumber}</span>
              {nodeOutcomeLabel(state) && <span className="dynasty-node-outcome">{nodeOutcomeLabel(state)}</span>}
              {summary && summary.grantedFlags.length > 0 && (
                <span className="dynasty-node-flags" aria-hidden="true">
                  {"📜".repeat(Math.min(summary.grantedFlags.length, 3))}
                </span>
              )}
            </div>
            {index < reignNumbers.length - 1 && (
              <span className={`dynasty-connector${summary ? " done" : ""}`} aria-hidden="true" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
