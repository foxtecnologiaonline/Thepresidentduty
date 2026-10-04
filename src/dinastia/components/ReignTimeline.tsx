import { formatTurnLabel } from "../game/engine";
import type { GameState } from "../types";

interface Props {
  history: GameState["history"];
}

export function ReignTimeline({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <details className="timeline-details">
      <summary>Ver todas as {history.length} decisões do reinado</summary>
      <ol className="timeline-list">
        {history.map((entry, index) => (
          <li key={`${entry.event.id}-${index}`} className="timeline-item">
            <span className="timeline-turn">{formatTurnLabel(index + 1)}</span>
            <span className="timeline-event">{entry.event.title}</span>
            <span className="timeline-choice">→ {entry.choice.label}</span>
            {entry.decree && <span className="timeline-action">+ {entry.decree.label}</span>}
            {entry.choice.grantsLegacyFlag && <span className="timeline-action">📜 marca na crônica</span>}
          </li>
        ))}
      </ol>
    </details>
  );
}
