export interface BestResult {
  title: string;
  average: number;
  turnReached: number;
  victory: boolean;
}

const STORAGE_KEY = "presidencia:best-result";

function isBestResult(value: unknown): value is BestResult {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.title === "string" &&
    typeof candidate.average === "number" &&
    typeof candidate.turnReached === "number" &&
    typeof candidate.victory === "boolean"
  );
}

export function loadBestResult(): BestResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isBestResult(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveBestResultIfBetter(result: BestResult): BestResult {
  const current = loadBestResult();
  const isNewBetter =
    !current ||
    (result.victory && !current.victory) ||
    (result.victory === current.victory && result.average > current.average);

  if (!isNewBetter) {
    return current;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // Armazenamento indisponível (modo privado, quota excedida, etc.) — segue sem persistir.
  }
  return result;
}

const ACHIEVEMENTS_KEY = "presidencia:achievements";

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

/** Mescla os ids conquistados nesta partida com os já salvos e persiste a união. */
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
