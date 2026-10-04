import type { Difficulty, GameState, ReignSummary } from "../types";

export interface BestReignResult {
  title: string;
  average: number;
  turnReached: number;
  victory: boolean;
}

const BEST_RESULT_KEY = "dinastia:best-result";

function isBestReignResult(value: unknown): value is BestReignResult {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.title === "string" &&
    typeof candidate.average === "number" &&
    typeof candidate.turnReached === "number" &&
    typeof candidate.victory === "boolean"
  );
}

export function loadBestReignResult(): BestReignResult | null {
  try {
    const raw = localStorage.getItem(BEST_RESULT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isBestReignResult(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveBestReignResultIfBetter(result: BestReignResult): BestReignResult {
  const current = loadBestReignResult();
  const isNewBetter =
    !current ||
    (result.victory && !current.victory) ||
    (result.victory === current.victory && result.average > current.average);

  if (!isNewBetter) {
    return current;
  }

  try {
    localStorage.setItem(BEST_RESULT_KEY, JSON.stringify(result));
  } catch {
    // Armazenamento indisponível — segue sem persistir.
  }
  return result;
}

const ACHIEVEMENTS_KEY = "dinastia:achievements";

export function loadUnlockedAchievements(): Set<string> {
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed.filter((id) => typeof id === "string")) : new Set();
  } catch {
    return new Set();
  }
}

export function unlockAchievements(ids: string[]): Set<string> {
  const current = loadUnlockedAchievements();
  ids.forEach((id) => current.add(id));
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify([...current]));
  } catch {
    // Armazenamento indisponível — segue sem persistir.
  }
  return current;
}

const ONBOARDING_KEY = "dinastia:onboarding-seen";

export function hasSeenOnboarding(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_KEY) === "1";
  } catch {
    return false;
  }
}

export function markOnboardingSeen(): void {
  try {
    localStorage.setItem(ONBOARDING_KEY, "1");
  } catch {
    // Armazenamento indisponível — segue sem persistir.
  }
}

export interface ReignHistoryEntry {
  title: string;
  average: number;
  turnReached: number;
  victory: boolean;
  difficulty: Difficulty;
  reignNumber: number;
  playedAt: number;
}

const REIGN_HISTORY_KEY = "dinastia:reign-history";
const REIGN_HISTORY_LIMIT = 5;

function isReignHistoryEntry(value: unknown): value is ReignHistoryEntry {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.title === "string" &&
    typeof candidate.average === "number" &&
    typeof candidate.turnReached === "number" &&
    typeof candidate.victory === "boolean" &&
    typeof candidate.difficulty === "string" &&
    typeof candidate.reignNumber === "number" &&
    typeof candidate.playedAt === "number"
  );
}

export function loadReignHistory(): ReignHistoryEntry[] {
  try {
    const raw = localStorage.getItem(REIGN_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isReignHistoryEntry) : [];
  } catch {
    return [];
  }
}

/** Adiciona um reinado ao topo do histórico (mais recente primeiro), mantendo só os últimos 5. */
export function addReignHistoryEntry(entry: ReignHistoryEntry): ReignHistoryEntry[] {
  const next = [entry, ...loadReignHistory()].slice(0, REIGN_HISTORY_LIMIT);
  try {
    localStorage.setItem(REIGN_HISTORY_KEY, JSON.stringify(next));
  } catch {
    // Armazenamento indisponível — segue sem persistir.
  }
  return next;
}

export interface DynastyChronicleEntry {
  reigns: ReignSummary[];
  tierLabel: string;
  overallAverage: number;
  difficulty: Difficulty;
  completedAt: number;
}

const CHRONICLE_HISTORY_KEY = "dinastia:chronicle-history";
const CHRONICLE_HISTORY_LIMIT = 10;

function isDynastyChronicleEntry(value: unknown): value is DynastyChronicleEntry {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    Array.isArray(candidate.reigns) &&
    typeof candidate.tierLabel === "string" &&
    typeof candidate.overallAverage === "number" &&
    typeof candidate.difficulty === "string" &&
    typeof candidate.completedAt === "number"
  );
}

/** Crônicas de dinastias inteiras (5 reinados) já concluídas — o "livro de linhagens" do jogador. */
export function loadChronicleHistory(): DynastyChronicleEntry[] {
  try {
    const raw = localStorage.getItem(CHRONICLE_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isDynastyChronicleEntry) : [];
  } catch {
    return [];
  }
}

export function addChronicleHistoryEntry(entry: DynastyChronicleEntry): DynastyChronicleEntry[] {
  const next = [entry, ...loadChronicleHistory()].slice(0, CHRONICLE_HISTORY_LIMIT);
  try {
    localStorage.setItem(CHRONICLE_HISTORY_KEY, JSON.stringify(next));
  } catch {
    // Armazenamento indisponível — segue sem persistir.
  }
  return next;
}

const IN_PROGRESS_KEY = "dinastia:in-progress";

/**
 * Checagem leve de forma, não exaustiva: o bastante para recusar um save de uma versão
 * incompatível do jogo em vez de travar tentando retomar um GameState que não bate com
 * o código atual.
 */
function isLikelyGameState(value: unknown): value is GameState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    (candidate.phase === "playing" || candidate.phase === "ended") &&
    typeof candidate.indicators === "object" &&
    candidate.indicators !== null &&
    typeof candidate.factions === "object" &&
    candidate.factions !== null &&
    typeof candidate.reignNumber === "number" &&
    Array.isArray(candidate.legacyFlags) &&
    Array.isArray(candidate.chronicle) &&
    Array.isArray(candidate.deck) &&
    Array.isArray(candidate.history)
  );
}

export function loadInProgressGame(): GameState | null {
  try {
    const raw = localStorage.getItem(IN_PROGRESS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isLikelyGameState(parsed) && parsed.phase === "playing" ? parsed : null;
  } catch {
    return null;
  }
}

export function saveInProgressGame(state: GameState): void {
  try {
    localStorage.setItem(IN_PROGRESS_KEY, JSON.stringify(state));
  } catch {
    // Armazenamento indisponível — segue sem persistir.
  }
}

export function clearInProgressGame(): void {
  try {
    localStorage.removeItem(IN_PROGRESS_KEY);
  } catch {
    // Armazenamento indisponível — nada a limpar.
  }
}
