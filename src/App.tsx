import { useRef, useState } from "react";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { EndScreen } from "./components/EndScreen";
import { EventCard } from "./components/EventCard";
import { ResolutionPanel } from "./components/ResolutionPanel";
import { StartScreen } from "./components/StartScreen";
import { ACHIEVEMENTS } from "./data/achievements";
import { ACTIONS } from "./data/actions";
import {
  applyChoice,
  createNewGame,
  createStartState,
  DIFFICULTY_MULTIPLIERS,
  formatTurnLabel,
  mergeEffects,
  scaleEffects,
} from "./game/engine";
import {
  loadBestResult,
  loadUnlockedAchievements,
  saveBestResultIfBetter,
  unlockAchievements,
  type BestResult,
} from "./game/storage";
import type { Difficulty, EventChoice, GameEvent, PresidentialAction, GameState } from "./types";

interface Resolution {
  event: GameEvent;
  choice: EventChoice;
  action: PresidentialAction | null;
}

function App() {
  const [game, setGame] = useState<GameState>(() => createStartState());
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const [selectedAction, setSelectedAction] = useState<PresidentialAction | null>(null);
  const [bestResult, setBestResult] = useState<BestResult | null>(() => loadBestResult());
  const [earnedAchievementIds, setEarnedAchievementIds] = useState<Set<string>>(new Set());
  const [newAchievementIds, setNewAchievementIds] = useState<Set<string>>(new Set());
  // Trava síncrona contra duplo clique/duplo disparo do evento antes do próximo render:
  // estado do React só reflete a mudança após o commit, então um clique duplicado no
  // mesmo instante ainda veria o mesmo `game`/`resolution` "antigos". Um ref é mutado
  // na hora e é compartilhado entre as chamadas, então bloqueia de fato a segunda.
  const isProcessingChoice = useRef(false);

  function handleStart(difficulty: Difficulty) {
    setGame(createNewGame(difficulty));
    setResolution(null);
    setSelectedAction(null);
    setEarnedAchievementIds(new Set());
    setNewAchievementIds(new Set());
    isProcessingChoice.current = false;
  }

  function handleSelectAction(action: PresidentialAction) {
    setSelectedAction((current) => (current?.id === action.id ? null : action));
  }

  function handleChoose(choice: EventChoice) {
    if (!game.currentEvent || isProcessingChoice.current) return;
    isProcessingChoice.current = true;

    const next = applyChoice(game, choice, selectedAction);
    setResolution({ event: game.currentEvent, choice, action: selectedAction });
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

      const earnedNow = ACHIEVEMENTS.filter((a) => a.check(next)).map((a) => a.id);
      const previouslyUnlocked = loadUnlockedAchievements();
      unlockAchievements(earnedNow);
      const isNew = new Set(earnedNow.filter((id) => !previouslyUnlocked.has(id)));
      setEarnedAchievementIds(new Set(earnedNow));
      setNewAchievementIds(isNew);
    }
  }

  function handleContinue() {
    setResolution(null);
    setSelectedAction(null);
    isProcessingChoice.current = false;
  }

  const multiplier = DIFFICULTY_MULTIPLIERS[game.difficulty];

  const dashboardDeltas = resolution
    ? scaleEffects(mergeEffects(resolution.choice.effects, resolution.action?.effects), multiplier)
    : undefined;

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

          <Dashboard indicators={game.indicators} lastDeltas={dashboardDeltas} />

          <main className="game-main">
            {resolution ? (
              <ResolutionPanel
                event={resolution.event}
                choice={resolution.choice}
                action={resolution.action}
                multiplier={multiplier}
                onContinue={handleContinue}
              />
            ) : game.phase === "playing" && game.currentEvent ? (
              <EventCard
                event={game.currentEvent}
                turnLabel={formatTurnLabel(game.turn)}
                turn={game.turn}
                actions={ACTIONS}
                selectedAction={selectedAction}
                multiplier={multiplier}
                onSelectAction={handleSelectAction}
                onChoose={handleChoose}
              />
            ) : game.phase === "ended" && game.endResult ? (
              <EndScreen
                result={game.endResult}
                indicators={game.indicators}
                history={game.history}
                indicatorSnapshots={game.indicatorSnapshots}
                totalTurns={game.totalTurns}
                earnedAchievementIds={earnedAchievementIds}
                newAchievementIds={newAchievementIds}
                onRestart={() => handleStart(game.difficulty)}
              />
            ) : null}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
