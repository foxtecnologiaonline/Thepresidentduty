import { computeLeanProfile, describeLean } from "../game/leaning";
import { CRITICAL_INDICATORS, CRITICAL_WARNING_THRESHOLD } from "./indicators";
import { FACTION_ORDER } from "./factions";
import { TOTAL_REIGNS, isDynastyFinished } from "../game/engine";
import type { GameState } from "../types";

export interface Achievement {
  id: string;
  label: string;
  description: string;
  check: (state: GameState) => boolean;
}

function wasEverInDanger(state: GameState): boolean {
  return state.indicatorSnapshots.some((snapshot) =>
    CRITICAL_INDICATORS.some((key) => snapshot[key] <= CRITICAL_WARNING_THRESHOLD)
  );
}

/** A crônica só fecha a dinastia inteira quando o 5º reinado é concluído. */
function isDynastyComplete(state: GameState): boolean {
  return isDynastyFinished(state.reignNumber) && state.chronicle.length >= TOTAL_REIGNS;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "era-de-ouro",
    label: "Era de Ouro",
    description: "Concluiu um reinado com o legado máximo.",
    check: (state) => state.endResult?.title === "Era de Ouro",
  },
  {
    id: "sem-decretos",
    label: "Trono Silencioso",
    description: "Completou um reinado sem emitir um único decreto próprio.",
    check: (state) =>
      !!state.endResult?.victory && state.history.length > 0 && state.history.every((h) => h.decree === null),
  },
  {
    id: "decretista",
    label: "Mão de Ferro",
    description: "Emitiu um decreto em pelo menos 9 dos turnos do reinado.",
    check: (state) => state.history.filter((h) => h.decree !== null).length >= 9,
  },
  {
    id: "reinado-tranquilo",
    label: "Reinado Tranquilo",
    description: "Terminou um reinado sem nenhum indicador crítico chegar perto de zerar.",
    check: (state) => !!state.endResult?.victory && !wasEverInDanger(state),
  },
  {
    id: "fenix-dinastica",
    label: "Fênix Dinástica",
    description: "Chegou perto do colapso em algum indicador crítico e ainda assim completou o reinado.",
    check: (state) => !!state.endResult?.victory && wasEverInDanger(state),
  },
  {
    id: "equilibrio-dinastico",
    label: "Equilíbrio Dinástico",
    description: "Encerrou o reinado com o eixo coroa-poder rotulado como Equilíbrio Dinástico.",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      return !!profile && describeLean(profile.average) === "Equilíbrio Dinástico";
    },
  },
  {
    id: "absolutista-ou-federativo",
    label: "Rumo Convicto",
    description: "Manteve um rumo consistentemente extremo (Autocracia Real ou Poder Disperso).",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      if (!profile) return false;
      const label = describeLean(profile.average);
      return label === "Autocracia Real" || label === "Poder Disperso";
    },
  },
  {
    id: "guinada-do-trono",
    label: "Guinada do Trono",
    description: "O rumo do reinado mudou de direção entre a primeira e a segunda metade do reinado.",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      return !!profile && profile.trend !== "estavel";
    },
  },
  {
    id: "reino-unido",
    label: "Reino Unido",
    description: "Encerrou o reinado com o apoio de pelo menos 60 em todas as facções.",
    check: (state) => !!state.endResult?.victory && FACTION_ORDER.every((key) => state.factions[key] >= 60),
  },
  {
    id: "reino-dividido",
    label: "Reino Dividido",
    description: "Terminou o reinado com uma facção em forte rejeição e outra em forte apoio ao mesmo tempo.",
    check: (state) => {
      const values = FACTION_ORDER.map((key) => state.factions[key]);
      return Math.min(...values) <= 20 && Math.max(...values) >= 80;
    },
  },
  {
    id: "legado-vivo",
    label: "Legado Vivo",
    description: "Uma marca deixada por um reinado anterior voltou a influenciar a história deste reinado.",
    check: (state) => state.history.some((h) => !!h.event.requiresLegacyFlag),
  },
  {
    id: "dinastia-lendaria",
    label: "Dinastia Lendária",
    description: "Completou os 5 reinados da dinastia com uma média geral de legado histórico.",
    check: (state) =>
      isDynastyComplete(state) &&
      state.chronicle.reduce((sum, r) => sum + r.average, 0) / state.chronicle.length >= 70,
  },
  {
    id: "dinastia-sobrevivente",
    label: "Sangue que Resiste",
    description: "Completou os 5 reinados da dinastia mesmo com ao menos um reinado encerrado em colapso.",
    check: (state) => isDynastyComplete(state) && state.chronicle.some((r) => !r.victory),
  },
];
