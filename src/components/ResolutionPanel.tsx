import { INDICATOR_META } from "../data/indicators";
import type { EventChoice, GameEvent } from "../types";

interface Props {
  event: GameEvent;
  choice: EventChoice;
  onContinue: () => void;
}

export function ResolutionPanel({ event, choice, onContinue }: Props) {
  const entries = Object.entries(choice.effects) as [keyof typeof INDICATOR_META, number][];

  return (
    <div className="event-card resolution">
      <div className="event-turn">{event.title}</div>
      <h2>{choice.label}</h2>
      <p className="event-description">{choice.consequence}</p>
      {entries.length > 0 && (
        <div className="effects-preview large">
          {entries.map(([key, value]) => (
            <span key={key} className={value > 0 ? "positive" : "negative"}>
              {INDICATOR_META[key].icon} {INDICATOR_META[key].label} {value > 0 ? `+${value}` : value}
            </span>
          ))}
        </div>
      )}
      <button type="button" className="primary-button" onClick={onContinue}>
        Continuar
      </button>
    </div>
  );
}
