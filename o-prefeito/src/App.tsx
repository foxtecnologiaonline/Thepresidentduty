import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { EndScreen } from "./components/EndScreen";
import { EventCard } from "./components/EventCard";
import { OnboardingModal } from "./components/OnboardingModal";
import { ResolutionPanel } from "./components/ResolutionPanel";
import { SectorsPanel } from "./components/SectorsPanel";
import { StartScreen } from "./components/StartScreen";
import { StatsTabs } from "./components/StatsTabs";
import { ThemeToggle } from "./components/ThemeToggle";
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
  type DynastyLegacy,
} from "./game/engine";
import {
  addMandateHistoryEntry,
  clearInProgressGame,
  hasSeenOnboarding,
  loadBestResult,
  loadInProgressGame,
  loadMandateHistory,
  loadUnlockedAchievements,
  markOnboardingSeen,
  saveBestResultIfBetter,
  saveInProgressGame,
  unlockAchievements,
  type BestResult,
  type MandateHistoryEntry,
} from "./game/storage";
import { useNarrowViewport } from "./hooks/useNarrowViewport";
import { useTheme } from "./hooks/useTheme";
import { createInitialIndicators } from "./data/indicators";
import type { Difficulty, EventChoice, GameEvent, MayorAction, GameState } from "./types";

interface Resolution {
  event: GameEvent;
  choice: EventChoice;
  action: MayorAction | null;
}

/** Fração do apoio na Câmara final que o sucessor herda ao continuar a dinastia — modesta
    de propósito, para dar peso à continuidade sem deixar um mandato ruim travar os
    seguintes. Usa Câmara (não Aprovação) porque é um dos dois indicadores que de fato
    decidem sobrevivência — herdar um indicador não-crítico não mudaria a dificuldade real
    do próximo mandato. */
const DYNASTY_CARRYOVER = 0.2;
// Derivado do estado inicial em vez de hardcoded, para não dessincronizar se o valor
// inicial de Câmara em data/indicators.ts mudar.
const INITIAL_CAMARA = createInitialIndicators().camara;

const NARROW_TABS_BREAKPOINT = 380;

function App() {
  const [game, setGame] = useState<GameState>(() => loadInProgressGame() ?? createStartState());
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const [selectedAction, setSelectedAction] = useState<MayorAction | null>(null);
  const [bestResult, setBestResult] = useState<BestResult | null>(() => loadBestResult());
  const [mandateHistory, setMandateHistory] = useState<MandateHistoryEntry[]>(() => loadMandateHistory());
  const [earnedAchievementIds, setEarnedAchievementIds] = useState<Set<string>>(new Set());
  const [newAchievementIds, setNewAchievementIds] = useState<Set<string>>(new Set());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const isNarrowViewport = useNarrowViewport(NARROW_TABS_BREAKPOINT);
  // Trava síncrona contra duplo clique/duplo disparo do evento antes do próximo render:
  // estado do React só reflete a mudança após o commit, então um clique duplicado no
  // mesmo instante ainda veria o mesmo `game`/`resolution` "antigos". Um ref é mutado
  // na hora e é compartilhado entre as chamadas, então bloqueia de fato a segunda.
  const isProcessingChoice = useRef(false);

  // Salva o mandato em andamento a cada mudança para sobreviver a um reload acidental;
  // some assim que o mandato termina (nada para retomar) ou volta à tela inicial.
  useEffect(() => {
    if (game.phase === "playing") {
      saveInProgressGame(game);
    } else {
      clearInProgressGame();
    }
  }, [game]);

  function startFresh(difficulty: Difficulty) {
    setGame(createNewGame(difficulty));
    setResolution(null);
    setSelectedAction(null);
    setEarnedAchievementIds(new Set());
    setNewAchievementIds(new Set());
    isProcessingChoice.current = false;
    if (!hasSeenOnboarding()) {
      setShowOnboarding(true);
    }
  }

  function handleDismissOnboarding() {
    markOnboardingSeen();
    setShowOnboarding(false);
  }

  function handleContinueDynasty() {
    const legacy: DynastyLegacy = {
      indicatorBonus: {
        camara: Math.round((game.indicators.camara - INITIAL_CAMARA) * DYNASTY_CARRYOVER),
      },
      dynastyTerm: game.dynastyTerm + 1,
    };
    setGame(createNewGame(game.difficulty, legacy));
    setResolution(null);
    setSelectedAction(null);
    setEarnedAchievementIds(new Set());
    setNewAchievementIds(new Set());
    isProcessingChoice.current = false;
  }

  function handleNewDynasty() {
    setGame(createStartState());
    setResolution(null);
    setSelectedAction(null);
  }

  function handleSelectAction(action: MayorAction) {
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

      setMandateHistory(
        addMandateHistoryEntry({
          title: next.endResult.title,
          average: next.endResult.average,
          turnReached: next.history.length,
          victory: next.endResult.victory,
          difficulty: next.difficulty,
          playedAt: Date.now(),
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

  const sectorDeltas = resolution
    ? scaleEffects(mergeEffects(resolution.choice.sectorEffects ?? {}, resolution.action?.sectorEffects), multiplier)
    : undefined;

  return (
    <div className="app-shell">
      <div className="top-bar">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      {showOnboarding && <OnboardingModal onDismiss={handleDismissOnboarding} />}

      {game.phase === "start" && (
        <StartScreen onStart={startFresh} bestResult={bestResult} mandateHistory={mandateHistory} />
      )}

      {game.phase !== "start" && (
        <>
          <header className="app-header">
            <h1>O Prefeito</h1>
            {game.phase === "playing" && (
              <span className="turn-counter">
                Trimestre {game.turn} de {game.totalTurns}
              </span>
            )}
          </header>

          {isNarrowViewport ? (
            <StatsTabs
              sectors={game.sectors}
              sectorDeltas={sectorDeltas}
              indicators={game.indicators}
              indicatorDeltas={dashboardDeltas}
            />
          ) : (
            <>
              <SectorsPanel sectors={game.sectors} lastDeltas={sectorDeltas} />
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
                sectors={game.sectors}
                history={game.history}
                indicatorSnapshots={game.indicatorSnapshots}
                totalTurns={game.totalTurns}
                dynastyTerm={game.dynastyTerm}
                difficulty={game.difficulty}
                earnedAchievementIds={earnedAchievementIds}
                newAchievementIds={newAchievementIds}
                onContinueDynasty={handleContinueDynasty}
                onNewDynasty={handleNewDynasty}
              />
            ) : null}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
