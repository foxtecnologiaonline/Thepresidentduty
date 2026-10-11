import { describe, expect, it } from "vitest";
import { EVENTS } from "../data/events";
import { createInitialIndicators } from "../data/indicators";
import type { EventChoice } from "../types";
import {
  applyChoice,
  applyEffects,
  buildDeck,
  computeAverage,
  createNewGame,
  createStartState,
  DIFFICULTY_MULTIPLIERS,
  formatTurnLabel,
  mergeEffects,
  scaleEffects,
  TOTAL_TURNS,
} from "./engine";

describe("applyEffects", () => {
  it("adiciona o delta e preserva as demais chaves", () => {
    const next = applyEffects({ economia: 50, popularidade: 50 }, { economia: 10 });
    expect(next).toEqual({ economia: 60, popularidade: 50 });
  });

  it("satura em 100 (teto) e 0 (piso)", () => {
    expect(applyEffects({ economia: 95 }, { economia: 20 })).toEqual({ economia: 100 });
    expect(applyEffects({ economia: 5 }, { economia: -20 })).toEqual({ economia: 0 });
  });

  it("ignora deltas zero/ausentes sem mutar o objeto original", () => {
    const current = { economia: 50 };
    const next = applyEffects(current, { economia: 0 });
    expect(next).toEqual({ economia: 50 });
    expect(next).not.toBe(current);
  });
});

describe("mergeEffects", () => {
  it("soma deltas de duas fontes para a mesma chave", () => {
    expect(mergeEffects({ economia: 5 }, { economia: 3, popularidade: 2 })).toEqual({
      economia: 8,
      popularidade: 2,
    });
  });

  it("retorna a própria referência quando a segunda fonte é ausente", () => {
    const base = { economia: 5 };
    expect(mergeEffects(base, undefined)).toBe(base);
  });
});

describe("scaleEffects", () => {
  it("retorna a mesma referência quando o multiplicador é 1", () => {
    const effects = { economia: 10 };
    expect(scaleEffects(effects, 1)).toBe(effects);
  });

  it("escala e arredonda os deltas para outros multiplicadores", () => {
    expect(scaleEffects({ economia: 10, popularidade: -5 }, 0.7)).toEqual({
      economia: 7,
      popularidade: -3,
    });
  });
});

describe("computeAverage", () => {
  it("calcula a média simples dos 8 indicadores", () => {
    const indicators = createInitialIndicators();
    const expected =
      Object.values(indicators).reduce((sum, v) => sum + v, 0) / Object.values(indicators).length;
    expect(computeAverage(indicators)).toBeCloseTo(expected);
  });
});

describe("formatTurnLabel", () => {
  it("mapeia o turno 1 para o primeiro trimestre do ano 1", () => {
    expect(formatTurnLabel(1)).toBe("Jan–Mar · Ano 1");
  });

  it("mapeia o turno 5 para o primeiro trimestre do ano 2", () => {
    expect(formatTurnLabel(5)).toBe("Jan–Mar · Ano 2");
  });

  it("mapeia o último turno do jogo para o último trimestre do último ano", () => {
    expect(formatTurnLabel(TOTAL_TURNS)).toBe(`Out–Dez · Ano ${TOTAL_TURNS / 4}`);
  });
});

describe("buildDeck", () => {
  it("monta um baralho com exatamente TOTAL_TURNS eventos sem repetição", () => {
    const deck = buildDeck();
    expect(deck).toHaveLength(TOTAL_TURNS);
    expect(new Set(deck.map((e) => e.id)).size).toBe(TOTAL_TURNS);
  });

  it("só sorteia eventos que existem no catálogo", () => {
    const ids = new Set(EVENTS.map((e) => e.id));
    const deck = buildDeck();
    expect(deck.every((event) => ids.has(event.id))).toBe(true);
  });
});

describe("createStartState / createNewGame", () => {
  it("createStartState começa na tela inicial sem baralho", () => {
    const state = createStartState();
    expect(state.phase).toBe("start");
    expect(state.deck).toHaveLength(0);
    expect(state.currentEvent).toBeNull();
    expect(state.dynastyTerm).toBe(1);
  });

  it("createNewGame inicia o turno 1 com um evento pronto e o resto do baralho reservado", () => {
    const game = createNewGame("normal");
    expect(game.phase).toBe("playing");
    expect(game.turn).toBe(1);
    expect(game.currentEvent).not.toBeNull();
    expect(game.deck).toHaveLength(TOTAL_TURNS - 1);
  });

  it("aplica o bônus de legado de dinastia aos indicadores iniciais", () => {
    const base = createInitialIndicators();
    const game = createNewGame("normal", {
      indicatorBonus: { popularidade: 10 },
      dynastyTerm: 2,
    });
    expect(game.indicators.popularidade).toBe(base.popularidade + 10);
    expect(game.dynastyTerm).toBe(2);
  });
});

describe("applyChoice", () => {
  const dummyChoice: EventChoice = {
    id: "escolha",
    label: "Escolha",
    consequence: "Consequência",
    effects: { economia: 5 },
    leaning: 0,
  };

  it("avança para o próximo turno e acumula a escolha no histórico", () => {
    const game = createNewGame("normal");
    const startingEconomia = game.indicators.economia;
    const next = applyChoice(game, dummyChoice);

    expect(next.turn).toBe(game.turn + 1);
    expect(next.phase).toBe("playing");
    expect(next.history).toHaveLength(1);
    expect(next.indicators.economia).toBe(startingEconomia + 5);
  });

  it("escala os efeitos pelo multiplicador de dificuldade", () => {
    const game = createNewGame("dificil");
    const startingEconomia = game.indicators.economia;
    const next = applyChoice(game, dummyChoice);

    expect(next.indicators.economia).toBe(startingEconomia + Math.round(5 * DIFFICULTY_MULTIPLIERS.dificil));
  });

  it("encerra o mandato em derrota quando um indicador crítico zera", () => {
    let game = createNewGame("normal");
    game = { ...game, indicators: { ...game.indicators, popularidade: 3 } };

    const next = applyChoice(game, { ...dummyChoice, effects: { popularidade: -10 } });

    expect(next.phase).toBe("ended");
    expect(next.endResult?.victory).toBe(false);
    expect(next.indicators.popularidade).toBe(0);
  });

  it("encerra o mandato em vitória ao completar o último turno sem falha crítica", () => {
    let game = createNewGame("normal");
    game = { ...game, turn: TOTAL_TURNS };

    const next = applyChoice(game, dummyChoice);

    expect(next.phase).toBe("ended");
    expect(next.endResult?.victory).toBe(true);
    expect(next.currentEvent).toBeNull();
  });

  it("é no-op fora da fase 'playing'", () => {
    const state = createStartState();
    expect(applyChoice(state, dummyChoice)).toBe(state);
  });

  it("traz o evento convocado por triggersEventId para o próximo turno, se ainda estiver no baralho", () => {
    const game = createNewGame("normal");
    const triggeredId = game.deck[game.deck.length - 1]?.id;
    expect(triggeredId).toBeDefined();

    const next = applyChoice(game, { ...dummyChoice, triggersEventId: triggeredId });
    expect(next.currentEvent?.id).toBe(triggeredId);
  });
});
