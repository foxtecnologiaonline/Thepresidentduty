import { useState } from "react";
import { CATEGORY_META } from "../data/categories";
import { INDICATOR_META } from "../data/indicators";
import { mergeEffects, scaleEffects } from "../../game/engine";
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

interface DecreePanelProps {
  turn: number;
  decrees: RoyalDecree[];
  selectedDecree: RoyalDecree | null;
  multiplier: number;
  onSelectDecree: (decree: RoyalDecree) => void;
}

/**
 * Recolhido por padrão — a grade inteira de decretos só aparece quando o jogador pede,
 * pra não empurrar o evento do ano pra baixo da dobra no celular. O pai remonta este
 * componente (via `key`) a cada novo ano ou troca de decreto, o que já reseta
 * `expanded` de volta a `false` de graça — sem precisar de um efeito só pra isso.
 */
function DecreePanel({ turn, decrees, selectedDecree, multiplier, onSelectDecree }: DecreePanelProps) {
  const [expanded, setExpanded] = useState(false);

  if (!expanded && selectedDecree) {
    return (
      <button type="button" className="decree-selected-chip" onClick={() => setExpanded(true)}>
        <span className="decree-selected-label">📜 {selectedDecree.label}</span>
        <EffectsPreview effects={scaleEffects(selectedDecree.effects, multiplier)} />
        <span className="decree-change-hint">Trocar</span>
      </button>
    );
  }

  if (!expanded) {
    return (
      <button type="button" className="decree-toggle" onClick={() => setExpanded(true)}>
        📜 Decreto do ano <span className="actions-hint">opcional · escolher</span>
      </button>
    );
  }

  return (
    <>
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
    </>
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
        <DecreePanel
          key={`${event.id}:${selectedDecree?.id ?? "none"}`}
          turn={turn}
          decrees={decrees}
          selectedDecree={selectedDecree}
          multiplier={multiplier}
          onSelectDecree={onSelectDecree}
        />
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
              {/* Mescla com o decreto selecionado antes de arredondar, igual ao que applyChoice
                  de fato aplica — senão a prévia pode divergir em ±1 do efeito real exibido
                  depois no ResolutionPanel. */}
              <EffectsPreview
                effects={scaleEffects(mergeEffects(choice.effects, selectedDecree?.effects), multiplier)}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
