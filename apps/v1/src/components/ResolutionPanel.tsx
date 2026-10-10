import { INDICATOR_META } from "../data/indicators";
import { SECTOR_META } from "../data/sectors";
import { mergeEffects, scaleEffects } from "../game/engine";
import type { EventChoice, GameEvent, PresidentialAction, SectorKey } from "../types";

interface Props {
  event: GameEvent;
  choice: EventChoice;
  action: PresidentialAction | null;
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

function SectorEffectsList({ effects }: { effects: Partial<Record<SectorKey, number>> }) {
  const entries = Object.entries(effects) as [SectorKey, number][];
  if (entries.length === 0) return null;
  return (
    <div className="sector-repercussion">
      <span className="event-turn">Repercussão nos setores</span>
      <div className="effects-preview large">
        {entries.map(([key, value]) => (
          <span key={key} className={value > 0 ? "positive" : "negative"}>
            {SECTOR_META[key].icon} {SECTOR_META[key].label} {value > 0 ? `+${value}` : value}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ResolutionPanel({ event, choice, action, multiplier, onContinue }: Props) {
  const sectorEffects = scaleEffects(mergeEffects(choice.sectorEffects ?? {}, action?.sectorEffects), multiplier);

  return (
    <div className="event-card resolution">
      <div className="event-turn">{event.title}</div>
      <h2>{choice.label}</h2>
      <p className="event-description">{choice.consequence}</p>
      <EffectsList effects={scaleEffects(choice.effects, multiplier)} />

      {action && (
        <div className="action-summary">
          <div className="event-turn">Diretiva emitida</div>
          <p className="choice-label">{action.label}</p>
          <p className="event-description">{action.description}</p>
          <EffectsList effects={scaleEffects(action.effects, multiplier)} />
        </div>
      )}

      <SectorEffectsList effects={sectorEffects} />

      {choice.triggersEventId && (
        <p className="chain-hint">⚡ Essa decisão pode gerar consequências num trimestre futuro.</p>
      )}

      <button type="button" className="primary-button" onClick={onContinue}>
        Continuar
      </button>
    </div>
  );
}
