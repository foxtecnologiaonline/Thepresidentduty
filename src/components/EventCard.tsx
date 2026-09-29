import { INDICATOR_META } from "../data/indicators";
import type { EventChoice, GameEvent, PresidentialAction } from "../types";

interface Props {
  event: GameEvent;
  turnLabel: string;
  turn: number;
  actions: PresidentialAction[];
  selectedAction: PresidentialAction | null;
  onSelectAction: (action: PresidentialAction) => void;
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

export function EventCard({
  event,
  turnLabel,
  turn,
  actions,
  selectedAction,
  onSelectAction,
  onChoose,
}: Props) {
  return (
    <div className="event-card-wrap">
      <div className="actions-panel">
        <div className="actions-heading">
          <span>Diretiva do trimestre</span>
          <span className="actions-hint">opcional · no máximo uma</span>
        </div>
        <div className="actions-list">
          {actions.map((action) => {
            const isLocked = !!action.minTurn && turn < action.minTurn;
            return (
              <button
                key={action.id}
                type="button"
                disabled={isLocked}
                className={`action-chip${selectedAction?.id === action.id ? " selected" : ""}${isLocked ? " locked" : ""}`}
                onClick={() => onSelectAction(action)}
                title={isLocked ? `Disponível a partir do Ano ${Math.ceil((action.minTurn ?? 1) / 4)}` : action.description}
              >
                <span className="choice-label">
                  {isLocked && "🔒 "}
                  {action.label}
                </span>
                {isLocked ? (
                  <span className="actions-hint">
                    Disponível a partir do Ano {Math.ceil((action.minTurn ?? 1) / 4)}
                  </span>
                ) : (
                  <EffectsPreview effects={action.effects} />
                )}
              </button>
            );
          })}
        </div>
      </div>

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
    </div>
  );
}
