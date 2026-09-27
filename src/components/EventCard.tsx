import { INDICATOR_META } from "../data/indicators";
import type { EventChoice, GameEvent } from "../types";

interface Props {
  event: GameEvent;
  turnLabel: string;
  onChoose: (choice: EventChoice) => void;
}

function EffectsPreview({ effects }: { effects: EventChoice["effects"] }) {
  const entries = Object.entries(effects) as [keyof typeof INDICATOR_META, number][];
  if (entries.length === 0) return null;
  return (
    <div className="effects-preview">
      {entries.map(([key, value]) => (
        <span key={key} className={value > 0 ? "positive" : "negative"}>
          {INDICATOR_META[key].icon} {value > 0 ? `+${value}` : value}
        </span>
      ))}
    </div>
  );
}

export function EventCard({ event, turnLabel, onChoose }: Props) {
  return (
    <div className="event-card">
      <div className="event-turn">{turnLabel}</div>
      <h2>{event.title}</h2>
      <p className="event-description">{event.description}</p>
      <div className="choices">
        {event.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className="choice-button"
            onClick={() => onChoose(choice)}
          >
            <span className="choice-label">{choice.label}</span>
            <EffectsPreview effects={choice.effects} />
          </button>
        ))}
      </div>
    </div>
  );
}
