import { beforeEach, describe, expect, it } from "vitest";
import {
  addMandateHistoryEntry,
  hasSeenOnboarding,
  loadBestResult,
  loadMandateHistory,
  markOnboardingSeen,
  saveBestResultIfBetter,
  type BestResult,
} from "./storage";

beforeEach(() => {
  localStorage.clear();
});

function result(overrides: Partial<BestResult> = {}): BestResult {
  return { title: "Bom Governo", average: 60, turnReached: 16, victory: true, ...overrides };
}

describe("loadBestResult", () => {
  it("retorna null quando nada foi salvo", () => {
    expect(loadBestResult()).toBeNull();
  });

  it("retorna null para um valor salvo com formato inválido", () => {
    localStorage.setItem("presidencia:best-result", JSON.stringify({ title: "x" }));
    expect(loadBestResult()).toBeNull();
  });
});

describe("saveBestResultIfBetter", () => {
  it("salva o primeiro resultado mesmo sem recorde anterior", () => {
    const saved = saveBestResultIfBetter(result({ average: 40, victory: false }));
    expect(saved.average).toBe(40);
    expect(loadBestResult()).toEqual(saved);
  });

  it("substitui o recorde quando a nova média de uma vitória é maior", () => {
    saveBestResultIfBetter(result({ average: 50 }));
    const saved = saveBestResultIfBetter(result({ average: 70 }));
    expect(saved.average).toBe(70);
  });

  it("mantém o recorde quando o novo resultado é pior", () => {
    saveBestResultIfBetter(result({ average: 70 }));
    const saved = saveBestResultIfBetter(result({ average: 50 }));
    expect(saved.average).toBe(70);
  });

  it("uma vitória sempre supera uma derrota, mesmo com média menor", () => {
    saveBestResultIfBetter(result({ average: 90, victory: false }));
    const saved = saveBestResultIfBetter(result({ average: 20, victory: true }));
    expect(saved.victory).toBe(true);
    expect(saved.average).toBe(20);
  });
});

describe("addMandateHistoryEntry", () => {
  const entry = {
    title: "Bom Governo",
    average: 60,
    turnReached: 16,
    victory: true,
    difficulty: "normal" as const,
  };

  it("adiciona a entrada mais recente no topo da lista", () => {
    addMandateHistoryEntry({ ...entry, playedAt: 1 });
    const history = addMandateHistoryEntry({ ...entry, playedAt: 2 });
    expect(history[0].playedAt).toBe(2);
    expect(history[1].playedAt).toBe(1);
  });

  it("mantém apenas os 5 mandatos mais recentes", () => {
    for (let i = 0; i < 7; i++) {
      addMandateHistoryEntry({ ...entry, playedAt: i });
    }
    const history = loadMandateHistory();
    expect(history).toHaveLength(5);
    expect(history[0].playedAt).toBe(6);
  });
});

describe("onboarding", () => {
  it("não foi visto por padrão e passa a ser visto após marcado", () => {
    expect(hasSeenOnboarding()).toBe(false);
    markOnboardingSeen();
    expect(hasSeenOnboarding()).toBe(true);
  });
});
