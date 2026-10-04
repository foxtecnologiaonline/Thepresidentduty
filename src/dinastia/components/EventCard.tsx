import { CATEGORY_META } from "../data/categories";
import { INDICATOR_META } from "../data/indicators";
import { scaleEffects } from "../../game/engine";
import type { EventChoice, GameEvent, RoyalDecree } from "../types";

interface Props {
  event: GameEvent;
  turnLabel: string;
  turn: number;
  decrees: RoyalDecree[];
  selectedDecree: RoyalDecree | null;
  /** Multiplicador da dificuldade atual — a prévia precisa refletir o que será de fato aplicado. */
  multiplier: number;
  onSelectDecree: (decree: RoyalDecree) => void;
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
  decrees,
  selectedDecree,
  multiplier,
  onSelectDecree,
  onChoose,
}: Props) {
  return (
    <div className="event-card-wrap">
      <div className="actions-panel">
        <div className="actions-heading">
          <span>Decreto do ano</span>
          <span className="actions-hint">opcional · no máximo um</span>
        </div>
        <div className="actions-list">
          {decrees.map((decree) => {
            const isLocked = !!decree.minTurn && turn < decree.minTurn;
            return (
              <button
                key={decree.id}
                type="button"
                disabled={isLocked}
                className={`action-chip${selectedDecree?.id === decree.id ? " selected" : ""}${isLocked ? " locked" : ""}`}
                onClick={() => onSelectDecree(decree)}
                title={isLocked ? `Disponível a partir do Ano ${decree.minTurn}` : decree.description}
              >
                <span className="choice-label">
                  {isLocked && "🔒 "}
                  {decree.label}
                </span>
                {isLocked ? (
                  <span className="actions-hint">Disponível a partir do Ano {decree.minTurn}</span>
                ) : (
                  <EffectsPreview effects={scaleEffects(decree.effects, multiplier)} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="event-card" style={{ borderTopColor: CATEGORY_META[event.category].color }}>
        <div className="event-card-header">
          <span className="event-turn">{turnLabel}</span>
          <span className="event-category-tag" style={{ color: CATEGORY_META[event.category].color }}>
            {CATEGORY_META[event.category].icon} {CATEGORY_META[event.category].label}
          </span>
        </div>
        <h2>{event.title}</h2>
        <p className="event-description">{event.description}</p>
        <div className="choices">
          {event.choices.map((choice) => (
            <button key={choice.id} type="button" className="choice-button" onClick={() => onChoose(choice)}>
              <span className="choice-label">{choice.label}</span>
              <EffectsPreview effects={scaleEffects(choice.effects, multiplier)} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
