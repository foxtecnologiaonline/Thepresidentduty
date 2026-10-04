import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { useNarrowViewport } from "../hooks/useNarrowViewport";
import { useTheme } from "../hooks/useTheme";
import { ACHIEVEMENTS } from "./data/achievements";
import { DECREES } from "./data/decrees";
import { ChronicleScreen } from "./components/ChronicleScreen";
import { EndScreen } from "./components/EndScreen";
import { EventCard } from "./components/EventCard";
import { FactionsPanel } from "./components/FactionsPanel";
import { Dashboard } from "./components/Dashboard";
import { OnboardingModal } from "./components/OnboardingModal";
import { ResolutionPanel } from "./components/ResolutionPanel";
import { StartScreen } from "./components/StartScreen";
import { StatsTabs } from "./components/StatsTabs";
import {
  DIFFICULTY_MULTIPLIERS,
  TOTAL_REIGNS,
  applyChoice,
  buildNextLegacy,
  buildReignSummary,
  computeDynastyTier,
  createNewReign,
  createStartState,
  formatTurnLabel,
  type DynastyLegacy,
} from "./game/engine";
import { mergeEffects, scaleEffects } from "../game/engine";
import {
  addChronicleHistoryEntry,
  addReignHistoryEntry,
  clearInProgressGame,
  hasSeenOnboarding,
  loadBestReignResult,
  loadChronicleHistory,
  loadInProgressGame,
  loadReignHistory,
  loadUnlockedAchievements,
  markOnboardingSeen,
  saveBestReignResultIfBetter,
  saveInProgressGame,
  unlockAchievements,
  type BestReignResult,
  type DynastyChronicleEntry,
  type ReignHistoryEntry,
} from "./game/storage";
import type { Difficulty, EventChoice, GameEvent, GameState, ReignSummary, RoyalDecree } from "./types";

interface Resolution {
  event: GameEvent;
  choice: EventChoice;
  decree: RoyalDecree | null;
}

const NARROW_TABS_BREAKPOINT = 380;

interface Props {
  onExitToMenu?: () => void;
}

function DinastiaApp({ onExitToMenu }: Props) {
  const [game, setGame] = useState<GameState>(() => loadInProgressGame() ?? createStartState());
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const [selectedDecree, setSelectedDecree] = useState<RoyalDecree | null>(null);
  const [bestResult, setBestResult] = useState<BestReignResult | null>(() => loadBestReignResult());
  const [reignHistory, setReignHistory] = useState<ReignHistoryEntry[]>(() => loadReignHistory());
  const [chronicleHistory, setChronicleHistory] = useState<DynastyChronicleEntry[]>(() => loadChronicleHistory());
  const [earnedAchievementIds, setEarnedAchievementIds] = useState<Set<string>>(new Set());
  const [newAchievementIds, setNewAchievementIds] = useState<Set<string>>(new Set());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [chronicleToShow, setChronicleToShow] = useState<ReignSummary[] | null>(null);
  const [theme, toggleTheme] = useTheme();
  const isNarrowViewport = useNarrowViewport(NARROW_TABS_BREAKPOINT);
  // Trava síncrona contra duplo clique/duplo disparo do evento antes do próximo render.
  const isProcessingChoice = useRef(false);

  useEffect(() => {
    if (game.phase === "playing") {
      saveInProgressGame(game);
    } else {
      clearInProgressGame();
    }
  }, [game]);

  function resetTransientState() {
    setResolution(null);
    setSelectedDecree(null);
    setEarnedAchievementIds(new Set());
    setNewAchievementIds(new Set());
    isProcessingChoice.current = false;
  }

  function startFresh(difficulty: Difficulty) {
    setGame(createNewReign(difficulty));
    resetTransientState();
    if (!hasSeenOnboarding()) {
      setShowOnboarding(true);
    }
  }

  function handleDismissOnboarding() {
    markOnboardingSeen();
    setShowOnboarding(false);
  }

  function continueToNextReign(legacy: DynastyLegacy) {
    setGame(createNewReign(game.difficulty, legacy));
    resetTransientState();
  }

  function handleViewChronicle() {
    if (chronicleToShow) return;
    setChronicleToShow(buildNextLegacy(game).chronicle);
  }

  function handleNewDynasty() {
    setGame(createStartState());
    setChronicleToShow(null);
    setResolution(null);
    setSelectedDecree(null);
  }

  function handleSelectDecree(decree: RoyalDecree) {
    setSelectedDecree((current) => (current?.id === decree.id ? null : decree));
  }

  function handleChoose(choice: EventChoice) {
    if (!game.currentEvent || isProcessingChoice.current) return;
    isProcessingChoice.current = true;

    const next = applyChoice(game, choice, selectedDecree);
    setResolution({ event: game.currentEvent, choice, decree: selectedDecree });
    setGame(next);

    if (next.phase === "ended" && next.endResult) {
      const summary = buildReignSummary(next);
      const chronicleSoFar = [...next.chronicle, summary];

      setBestResult(
        saveBestReignResultIfBetter({
          title: next.endResult.title,
          average: next.endResult.average,
          turnReached: next.history.length,
          victory: next.endResult.victory,
        })
      );

      setReignHistory(
        addReignHistoryEntry({
          title: next.endResult.title,
          average: next.endResult.average,
          turnReached: next.history.length,
          victory: next.endResult.victory,
          difficulty: next.difficulty,
          reignNumber: next.reignNumber,
          playedAt: Date.now(),
        })
      );

      // Conquistas de dinastia inteira (Fórmula 6) só podem ser avaliadas com a crônica já
      // incluindo este reinado — o campo `chronicle` do estado só traz os reinados ANTERIORES.
      const stateForAchievements: GameState = { ...next, chronicle: chronicleSoFar };
      const earnedNow = ACHIEVEMENTS.filter((a) => a.check(stateForAchievements)).map((a) => a.id);
      const previouslyUnlocked = loadUnlockedAchievements();
      unlockAchievements(earnedNow);
      const isNew = new Set(earnedNow.filter((id) => !previouslyUnlocked.has(id)));
      setEarnedAchievementIds(new Set(earnedNow));
      setNewAchievementIds(isNew);

      if (next.reignNumber >= TOTAL_REIGNS) {
        const tier = computeDynastyTier(chronicleSoFar);
        setChronicleHistory(
          addChronicleHistoryEntry({
            reigns: chronicleSoFar,
            tierLabel: tier.title,
            overallAverage: tier.overallAverage,
            difficulty: next.difficulty,
            completedAt: Date.now(),
          })
        );
      }
    }
  }

  function handleContinue() {
    setResolution(null);
    setSelectedDecree(null);
    isProcessingChoice.current = false;
  }

  const multiplier = DIFFICULTY_MULTIPLIERS[game.difficulty];

  const dashboardDeltas = resolution
    ? scaleEffects(mergeEffects(resolution.choice.effects, resolution.decree?.effects), multiplier)
    : undefined;

  const factionDeltas = resolution
    ? scaleEffects(mergeEffects(resolution.choice.factionEffects ?? {}, resolution.decree?.factionEffects), multiplier)
    : undefined;

  if (chronicleToShow) {
    return (
      <div className="app-shell">
        <div className="top-bar">
          {onExitToMenu && (
            <button type="button" className="secondary-button" onClick={onExitToMenu}>
              ← Outros jogos
            </button>
          )}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <ChronicleScreen chronicle={chronicleToShow} onNewDynasty={handleNewDynasty} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="top-bar">
        {onExitToMenu && (
          <button type="button" className="secondary-button" onClick={onExitToMenu}>
            ← Outros jogos
          </button>
        )}
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      {showOnboarding && <OnboardingModal onDismiss={handleDismissOnboarding} />}

      {game.phase === "start" && (
        <StartScreen
          onStart={startFresh}
          bestResult={bestResult}
          reignHistory={reignHistory}
          chronicleHistory={chronicleHistory}
        />
      )}

      {game.phase !== "start" && (
        <>
          <header className="app-header">
            <h1>A Dinastia</h1>
            {game.phase === "playing" && (
              <span className="turn-counter">
                Reinado {game.reignNumber}/{TOTAL_REIGNS} · Ano {game.turn} de {game.totalTurns}
              </span>
            )}
          </header>

          {isNarrowViewport ? (
            <StatsTabs
              factions={game.factions}
              factionDeltas={factionDeltas}
              indicators={game.indicators}
              indicatorDeltas={dashboardDeltas}
            />
          ) : (
            <>
              <FactionsPanel factions={game.factions} lastDeltas={factionDeltas} />
              <div className="indicators-panel">
                <span className="panel-heading">Indicadores</span>
                <Dashboard indicators={game.indicators} lastDeltas={dashboardDeltas} />
              </div>
            </>
          )}

          <main className="game-main">
            {resolution ? (
              <ResolutionPanel
                event={resolution.event}
                choice={resolution.choice}
                decree={resolution.decree}
                multiplier={multiplier}
                onContinue={handleContinue}
              />
            ) : game.phase === "playing" && game.currentEvent ? (
              <EventCard
                event={game.currentEvent}
                turnLabel={formatTurnLabel(game.turn)}
                turn={game.turn}
                decrees={DECREES}
                selectedDecree={selectedDecree}
                multiplier={multiplier}
                onSelectDecree={handleSelectDecree}
                onChoose={handleChoose}
              />
            ) : game.phase === "ended" && game.endResult ? (
              <EndScreen
                result={game.endResult}
                indicators={game.indicators}
                factions={game.factions}
                history={game.history}
                indicatorSnapshots={game.indicatorSnapshots}
                totalTurns={game.totalTurns}
                reignNumber={game.reignNumber}
                earnedAchievementIds={earnedAchievementIds}
                newAchievementIds={newAchievementIds}
                onContinueDynasty={() => continueToNextReign(buildNextLegacy(game))}
                onViewChronicle={handleViewChronicle}
                onNewDynasty={handleNewDynasty}
              />
            ) : null}
          </main>
        </>
      )}
    </div>
  );
}

export default DinastiaApp;
