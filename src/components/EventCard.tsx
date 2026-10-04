import { CATEGORY_META } from "../data/categories";
import { INDICATOR_META } from "../data/indicators";
import { scaleEffects, scaledMinTurn } from "../game/engine";
import type { EventChoice, GameEvent, ExecutiveAction } from "../types";

interface Props {
  event: GameEvent;
  turnLabel: string;
  turn: number;
  totalTurns: number;
  actions: ExecutiveAction[];
  selectedAction: ExecutiveAction | null;
  /** Multiplicador da dificuldade atual — a prévia precisa refletir o que será de fato aplicado. */
  multiplier: number;
  onSelectAction: (action: ExecutiveAction) => void;
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

/** Diretivas ainda bloqueadas, agrupadas pelo turno em que destravam — evita que
    cada uma vire um card cheio sem nenhuma ação possível, só poluindo a grade. */
function LockedActionsHint({
  actions,
  turn,
  totalTurns,
}: {
  actions: ExecutiveAction[];
  turn: number;
  totalTurns: number;
}) {
  const byUnlockTurn = new Map<number, ExecutiveAction[]>();
  for (const action of actions) {
    const unlockTurn = scaledMinTurn(action, totalTurns);
    if (!unlockTurn || turn >= unlockTurn) continue;
    const group = byUnlockTurn.get(unlockTurn) ?? [];
    group.push(action);
    byUnlockTurn.set(unlockTurn, group);
  }
  const groups = [...byUnlockTurn.entries()].sort(([a], [b]) => a - b);
  if (groups.length === 0) return null;

  return (
    <div className="actions-locked-hint">
      {groups.map(([minTurn, group]) => (
        <span key={minTurn} title={group.map((a) => a.label).join(" · ")}>
          🔒 {group.length} diretiva{group.length > 1 ? "s" : ""} disponíve
          {group.length > 1 ? "is" : "l"} a partir do Ano {Math.ceil(minTurn / 4)}
        </span>
      ))}
    </div>
  );
}

export function EventCard({
  event,
  turnLabel,
  turn,
  totalTurns,
  actions,
  selectedAction,
  multiplier,
  onSelectAction,
  onChoose,
}: Props) {
  const availableActions = actions.filter((action) => {
    const unlockTurn = scaledMinTurn(action, totalTurns);
    return !unlockTurn || turn >= unlockTurn;
  });
  return (
    <div className="event-card-wrap">
      <div className="actions-panel">
        <div className="actions-heading">
          <span>Diretiva executiva do trimestre</span>
          <span className="actions-hint">opcional · no máximo uma</span>
        </div>
        <div className="actions-list">
          {availableActions.map((action) => (
            <button
              key={action.id}
              type="button"
              className={`action-chip${selectedAction?.id === action.id ? " selected" : ""}`}
              onClick={() => onSelectAction(action)}
              title={action.description}
            >
              <span className="choice-label">{action.label}</span>
              <EffectsPreview effects={scaleEffects(action.effects, multiplier)} />
            </button>
          ))}
        </div>
        <LockedActionsHint actions={actions} turn={turn} totalTurns={totalTurns} />
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
            <button
              key={choice.id}
              type="button"
              className="choice-button"
              onClick={() => onChoose(choice)}
            >
              <span className="choice-label">{choice.label}</span>
              <EffectsPreview effects={scaleEffects(choice.effects, multiplier)} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
