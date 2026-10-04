import { computeDynastyTier, TOTAL_REIGNS } from "../game/engine";
import type { ReignSummary } from "../types";
import { DynastyTree } from "./DynastyTree";

interface Props {
  chronicle: ReignSummary[];
  onNewDynasty: () => void;
}

const FLAG_LABELS: Record<string, string> = {
  "pacto-baroes": "Pacto com os Barões",
  "igreja-humilhada": "A Igreja Humilhada",
  "alianca-reino-vizinho": "Aliança com o Reino Vizinho",
  "linhagem-bastarda": "Sangue Bastardo na Linhagem",
  "guarda-real-fortalecida": "A Guarda Real Fortalecida",
  "fome-grande": "A Grande Fome",
};

export function ChronicleScreen({ chronicle, onNewDynasty }: Props) {
  const tier = computeDynastyTier(chronicle);
  const allFlags = [...new Set(chronicle.flatMap((r) => r.grantedFlags))];

  return (
    <div className="screen end-screen victory">
      <h1>{tier.title}</h1>
      <p className="tagline">{tier.narrative}</p>
      <p className="turn-reached">Média geral da linhagem: {Math.round(tier.overallAverage)}</p>

      <DynastyTree completedReigns={chronicle} totalReigns={TOTAL_REIGNS} />

      <section className="report-section">
        <h3>Os 5 reinados desta dinastia</h3>
        <ol className="timeline-list chronicle-reign-list">
          {chronicle.map((reign) => (
            <li key={reign.reignNumber} className="timeline-item">
              <span className="timeline-turn">Reinado {reign.reignNumber}</span>
              <span className="timeline-event">
                {reign.title} {reign.victory ? "" : "(colapso)"}
              </span>
              <span className="timeline-choice">média {Math.round(reign.average)}</span>
              {reign.grantedFlags.length > 0 && (
                <span className="timeline-action">
                  📜 {reign.grantedFlags.map((f) => FLAG_LABELS[f] ?? f).join(", ")}
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {allFlags.length > 0 && (
        <section className="report-section">
          <h3>Marcas que esta linhagem deixou na história</h3>
          <div className="achievements-grid">
            {allFlags.map((flag) => (
              <div key={flag} className="achievement-badge earned" title={flag}>
                <span className="achievement-icon" aria-hidden="true">
                  📜
                </span>
                <span className="achievement-label">{FLAG_LABELS[flag] ?? flag}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <p className="dynasty-hint">A crônica desta dinastia foi guardada. Uma nova linhagem começa do zero.</p>
      <div className="end-screen-actions">
        <button type="button" className="primary-button" onClick={onNewDynasty}>
          Começar Nova Dinastia
        </button>
      </div>
    </div>
  );
}
