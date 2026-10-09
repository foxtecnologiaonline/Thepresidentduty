import type { EventChoice, GameEvent, PresidentialAction } from "../types";

interface Props {
  event: GameEvent;
  choice: EventChoice;
  action: PresidentialAction | null;
  onContinue: () => void;
}

export function ResolutionPanel({ event, choice, action, onContinue }: Props) {
  return (
    <div className="event-card resolution">
      <div className="event-turn">{event.title}</div>
      <h2>{choice.label}</h2>
      <p className="event-description">{choice.consequence}</p>

      {action && (
        <div className="action-summary">
          <div className="event-turn">Diretiva emitida</div>
          <p className="choice-label">{action.label}</p>
          <p className="event-description">{action.description}</p>
        </div>
      )}

      {choice.triggersEventId && (
        <p className="chain-hint">⚡ Essa decisão pode gerar consequências num trimestre futuro.</p>
      )}

      <button type="button" className="primary-button" onClick={onContinue}>
        Continuar
      </button>
    </div>
  );
}
