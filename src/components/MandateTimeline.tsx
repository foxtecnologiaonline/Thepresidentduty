import { formatTurnLabel } from "../game/engine";
import type { GameState } from "../types";

interface Props {
  history: GameState["history"];
}

export function MandateTimeline({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <details className="timeline-details">
      <summary>Ver todas as {history.length} decisões do mandato</summary>
      <ol className="timeline-list">
        {history.map((entry, index) => (
          <li key={`${entry.event.id}-${index}`} className="timeline-item">
            <span className="timeline-turn">{formatTurnLabel(index + 1)}</span>
            <span className="timeline-event">{entry.event.title}</span>
            <span className="timeline-choice">→ {entry.choice.label}</span>
            {entry.action && <span className="timeline-action">+ {entry.action.label}</span>}
          </li>
        ))}
      </ol>
    </details>
  );
}
