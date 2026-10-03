import { DIFFICULTY_LABELS } from "../game/engine";
import type { MandateHistoryEntry } from "../game/storage";

interface Props {
  entries: MandateHistoryEntry[];
}

export function MandateHistoryList({ entries }: Props) {
  if (entries.length === 0) return null;

  return (
    <details className="history-details">
      <summary>{entries.length === 1 ? "Último mandato" : `Últimos ${entries.length} mandatos`}</summary>
      <ol className="history-list">
        {entries.map((entry, index) => (
          <li key={`${entry.playedAt}-${index}`} className={`history-item ${entry.victory ? "victory" : "defeat"}`}>
            <span className="history-title">{entry.title}</span>
            <span className="history-meta">
              média {Math.round(entry.average)} · {entry.turnReached} trimestres · {DIFFICULTY_LABELS[entry.difficulty]}
            </span>
          </li>
        ))}
      </ol>
    </details>
  );
}
