import { ACHIEVEMENTS } from "../data/achievements";

interface Props {
  earnedIds: Set<string>;
  newIds: Set<string>;
}

export function AchievementsPanel({ earnedIds, newIds }: Props) {
  return (
    <div className="achievements-grid">
      {ACHIEVEMENTS.map((achievement) => {
        const earned = earnedIds.has(achievement.id);
        return (
          <div
            key={achievement.id}
            className={`achievement-badge${earned ? " earned" : " locked"}`}
            title={achievement.description}
          >
            <span className="achievement-icon" aria-hidden="true">
              {earned ? "🏅" : "🔒"}
            </span>
            <span className="achievement-label">{achievement.label}</span>
            {earned && newIds.has(achievement.id) && <span className="achievement-new">NOVO</span>}
          </div>
        );
      })}
    </div>
  );
}
