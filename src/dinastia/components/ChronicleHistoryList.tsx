import { DIFFICULTY_LABELS } from "../game/engine";
import type { DynastyChronicleEntry } from "../game/storage";

interface Props {
  entries: DynastyChronicleEntry[];
}

/** Dinastias completas (5 reinados) já encerradas — o "livro de linhagens" do jogador,
    guardado entre sessões e sem outro lugar na UI para ser lido de volta. */
export function ChronicleHistoryList({ entries }: Props) {
  if (entries.length === 0) return null;

  return (
    <details className="history-details">
      <summary>{entries.length === 1 ? "Última dinastia completa" : `Últimas ${entries.length} dinastias completas`}</summary>
      <ol className="history-list">
        {entries.map((entry, index) => (
          <li
            key={`${entry.completedAt}-${index}`}
            className={`history-item ${entry.overallAverage >= 45 ? "victory" : "defeat"}`}
          >
            <span className="history-title">{entry.tierLabel}</span>
            <span className="history-meta">
              média {Math.round(entry.overallAverage)} · {entry.reigns.length} reinados ·{" "}
              {DIFFICULTY_LABELS[entry.difficulty]}
            </span>
          </li>
        ))}
      </ol>
    </details>
  );
}
