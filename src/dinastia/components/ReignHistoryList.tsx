import { DIFFICULTY_LABELS } from "../game/engine";
import type { ReignHistoryEntry } from "../game/storage";

interface Props {
  entries: ReignHistoryEntry[];
}

export function ReignHistoryList({ entries }: Props) {
  if (entries.length === 0) return null;

  return (
    <details className="history-details">
      <summary>{entries.length === 1 ? "Último reinado" : `Últimos ${entries.length} reinados`}</summary>
      <ol className="history-list">
        {entries.map((entry, index) => (
          <li key={`${entry.playedAt}-${index}`} className={`history-item ${entry.victory ? "victory" : "defeat"}`}>
            <span className="history-title">
              Reinado {entry.reignNumber} — {entry.title}
            </span>
            <span className="history-meta">
              média {Math.round(entry.average)} · {entry.turnReached} anos · {DIFFICULTY_LABELS[entry.difficulty]}
            </span>
          </li>
        ))}
      </ol>
    </details>
  );
}
