import { INDICATOR_META } from "../data/indicators";
import type { EventChoice, GameEvent, PresidentialAction } from "../types";

interface Props {
  event: GameEvent;
  choice: EventChoice;
  action: PresidentialAction | null;
  onContinue: () => void;
}

function EffectsList({ effects }: { effects: EventChoice["effects"] }) {
  const entries = Object.entries(effects) as [keyof typeof INDICATOR_META, number][];
  if (entries.length === 0) return null;
  return (
    <div className="effects-preview large">
      {entries.map(([key, value]) => (
        <span key={key} className={value > 0 ? "positive" : "negative"}>
          {INDICATOR_META[key].icon} {INDICATOR_META[key].label} {value > 0 ? `+${value}` : value}
        </span>
      ))}
    </div>
  );
}

export function ResolutionPanel({ event, choice, action, onContinue }: Props) {
  return (
    <div className="event-card resolution">
      <div className="event-turn">{event.title}</div>
      <h2>{choice.label}</h2>
      <p className="event-description">{choice.consequence}</p>
      <EffectsList effects={choice.effects} />

      {action && (
        <div className="action-summary">
          <div className="event-turn">Diretiva emitida</div>
          <p className="choice-label">{action.label}</p>
          <p className="event-description">{action.description}</p>
          <EffectsList effects={action.effects} />
        </div>
      )}

      <button type="button" className="primary-button" onClick={onContinue}>
        Continuar
      </button>
    </div>
  );
}
