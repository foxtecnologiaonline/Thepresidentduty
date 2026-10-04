import { useState } from "react";
import App from "./App";
import DinastiaApp from "./dinastia/DinastiaApp";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";

type ActiveGame = "menu" | "presidencia" | "dinastia";

function GameMenu({ onSelect }: { onSelect: (game: ActiveGame) => void }) {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="app-shell">
      <div className="top-bar">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <div className="screen start-screen">
        <h1>Jogos por Turnos</h1>
        <p className="tagline">Escolha qual cargo você quer assumir desta vez.</p>

        <div className="game-menu-grid">
          <button type="button" className="game-menu-card" onClick={() => onSelect("presidencia")}>
            <span className="game-menu-icon" aria-hidden="true">
              🏛️
            </span>
            <span className="game-menu-title">A Presidência</span>
            <span className="game-menu-description">
              Governe um país por 16 trimestres, equilibrando economia, popularidade, segurança e mais.
            </span>
          </button>
          <button type="button" className="game-menu-card" onClick={() => onSelect("dinastia")}>
            <span className="game-menu-icon" aria-hidden="true">
              🏰
            </span>
            <span className="game-menu-title">A Dinastia</span>
            <span className="game-menu-description">
              Governe um reino medieval por 5 reinados encadeados de 12 anos cada, onde as escolhas de um
              avô ecoam nos reinados dos seus descendentes.
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Root() {
  const [activeGame, setActiveGame] = useState<ActiveGame>("menu");

  if (activeGame === "presidencia") {
    return <App onExitToMenu={() => setActiveGame("menu")} />;
  }
  if (activeGame === "dinastia") {
    return <DinastiaApp onExitToMenu={() => setActiveGame("menu")} />;
  }
  return <GameMenu onSelect={setActiveGame} />;
}
