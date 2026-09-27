export interface BestResult {
  title: string;
  average: number;
  turnReached: number;
  victory: boolean;
}

const STORAGE_KEY = "presidencia:best-result";

export function loadBestResult(): BestResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BestResult;
  } catch {
    return null;
  }
}

export function saveBestResultIfBetter(result: BestResult): BestResult {
  const current = loadBestResult();
  if (current && current.average >= result.average) {
    return current;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // Armazenamento indisponível (modo privado, quota excedida, etc.) — segue sem persistir.
  }
  return result;
}
