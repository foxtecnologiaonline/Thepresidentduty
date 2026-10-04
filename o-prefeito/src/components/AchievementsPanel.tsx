import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "../data/achievements";

interface Props {
  earnedIds: Set<string>;
  newIds: Set<string>;
}

export function AchievementsPanel({ earnedIds, newIds }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openId) return;

    function handleOutside(event: MouseEvent) {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        setOpenId(null);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenId(null);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [openId]);

  return (
    <div className="achievements-grid" ref={gridRef}>
      {ACHIEVEMENTS.map((achievement) => {
        const earned = earnedIds.has(achievement.id);
        const open = openId === achievement.id;
        return (
          <div key={achievement.id} className="achievement-wrap">
            <button
              type="button"
              className={`achievement-badge${earned ? " earned" : " locked"}`}
              title={achievement.description}
              aria-expanded={open}
              onClick={() => setOpenId((current) => (current === achievement.id ? null : achievement.id))}
            >
              <span className="achievement-icon" aria-hidden="true">
                {earned ? "🏅" : "🔒"}
              </span>
              <span className="achievement-label">{achievement.label}</span>
              {earned && newIds.has(achievement.id) && <span className="achievement-new">NOVO</span>}
            </button>
            {open && (
              <div className="info-popover achievement-popover" role="tooltip">
                {achievement.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
