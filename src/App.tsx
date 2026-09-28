import { useRef, useState } from "react";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { EndScreen } from "./components/EndScreen";
import { EventCard } from "./components/EventCard";
import { ResolutionPanel } from "./components/ResolutionPanel";
import { StartScreen } from "./components/StartScreen";
import { applyChoice, createNewGame, createStartState, formatTurnLabel } from "./game/engine";
import { loadBestResult, saveBestResultIfBetter, type BestResult } from "./game/storage";
import type { EventChoice, GameEvent, GameState } from "./types";

interface Resolution {
  event: GameEvent;
  choice: EventChoice;
}

function App() {
  const [game, setGame] = useState<GameState>(() => createStartState());
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const [bestResult, setBestResult] = useState<BestResult | null>(() => loadBestResult());
  // Trava síncrona contra duplo clique/duplo disparo do evento antes do próximo render:
  // estado do React só reflete a mudança após o commit, então um clique duplicado no
  // mesmo instante ainda veria o mesmo `game`/`resolution` "antigos". Um ref é mutado
  // na hora e é compartilhado entre as chamadas, então bloqueia de fato a segunda.
  const isProcessingChoice = useRef(false);

  function handleStart() {
    setGame(createNewGame());
    setResolution(null);
    isProcessingChoice.current = false;
  }

  function handleChoose(choice: EventChoice) {
    if (!game.currentEvent || isProcessingChoice.current) return;
    isProcessingChoice.current = true;

    const next = applyChoice(game, choice);
    setResolution({ event: game.currentEvent, choice });
    setGame(next);

    if (next.phase === "ended" && next.endResult) {
      setBestResult(
        saveBestResultIfBetter({
          title: next.endResult.title,
          average: next.endResult.average,
          turnReached: next.history.length,
          victory: next.endResult.victory,
        })
      );
    }
  }

  function handleContinue() {
    setResolution(null);
    isProcessingChoice.current = false;
  }

  return (
    <div className="app-shell">
      {game.phase === "start" && <StartScreen onStart={handleStart} bestResult={bestResult} />}

      {game.phase !== "start" && (
        <>
          <header className="app-header">
            <h1>A Presidência</h1>
            {game.phase === "playing" && (
              <span className="turn-counter">
                Trimestre {game.turn} de {game.totalTurns}
              </span>
            )}
          </header>

          <Dashboard indicators={game.indicators} lastDeltas={resolution?.choice.effects} />

          <main className="game-main">
            {resolution ? (
              <ResolutionPanel
                event={resolution.event}
                choice={resolution.choice}
                onContinue={handleContinue}
              />
            ) : game.phase === "playing" && game.currentEvent ? (
              <EventCard
                event={game.currentEvent}
                turnLabel={formatTurnLabel(game.turn)}
                onChoose={handleChoose}
              />
            ) : game.phase === "ended" && game.endResult ? (
              <EndScreen
                result={game.endResult}
                indicators={game.indicators}
                turnReached={game.history.length}
                totalTurns={game.totalTurns}
                onRestart={handleStart}
              />
            ) : null}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
