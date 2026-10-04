import { INDICATOR_META } from "../data/indicators";
import { FACTION_META } from "../data/factions";
import { mergeEffects, scaleEffects } from "../../game/engine";
import type { EventChoice, FactionKey, GameEvent, RoyalDecree } from "../types";

interface Props {
  event: GameEvent;
  choice: EventChoice;
  decree: RoyalDecree | null;
  /** Multiplicador da dificuldade atual — o relato precisa refletir o que de fato foi aplicado. */
  multiplier: number;
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

function FactionEffectsList({ effects }: { effects: Partial<Record<FactionKey, number>> }) {
  const entries = Object.entries(effects) as [FactionKey, number][];
  if (entries.length === 0) return null;
  return (
    <div className="sector-repercussion">
      <span className="event-turn">Repercussão nas facções</span>
      <div className="effects-preview large">
        {entries.map(([key, value]) => (
          <span key={key} className={value > 0 ? "positive" : "negative"}>
            {FACTION_META[key].icon} {FACTION_META[key].label} {value > 0 ? `+${value}` : value}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ResolutionPanel({ event, choice, decree, multiplier, onContinue }: Props) {
  const factionEffects = scaleEffects(mergeEffects(choice.factionEffects ?? {}, decree?.factionEffects), multiplier);

  return (
    <div className="event-card resolution">
      <div className="event-turn">{event.title}</div>
      <h2>{choice.label}</h2>
      <p className="event-description">{choice.consequence}</p>
      <EffectsList effects={scaleEffects(choice.effects, multiplier)} />

      {decree && (
        <div className="action-summary">
          <div className="event-turn">Decreto emitido</div>
          <p className="choice-label">{decree.label}</p>
          <p className="event-description">{decree.description}</p>
          <EffectsList effects={scaleEffects(decree.effects, multiplier)} />
        </div>
      )}

      <FactionEffectsList effects={factionEffects} />

      {choice.triggersEventId && (
        <p className="chain-hint">⚡ Essa decisão pode gerar consequências num ano futuro.</p>
      )}
      {choice.grantsLegacyFlag && (
        <p className="chain-hint">📜 Essa decisão vai ser lembrada pelos seus descendentes.</p>
      )}

      <button type="button" className="primary-button" onClick={onContinue}>
        Continuar
      </button>
    </div>
  );
}
