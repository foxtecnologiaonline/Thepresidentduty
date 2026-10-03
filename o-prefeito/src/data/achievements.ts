import { computeLeanProfile, describeLean } from "../game/leaning";
import { CRITICAL_INDICATORS, CRITICAL_WARNING_THRESHOLD } from "./indicators";
import { SECTOR_ORDER } from "./sectors";
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

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "prefeito-lendario",
    label: "Prefeito Lendário",
    description: "Concluiu o mandato com o legado máximo.",
    check: (state) => state.endResult?.title === "Prefeito Lendário",
  },
  {
    id: "maos-limpas",
    label: "Mãos Limpas",
    description: "Completou o mandato sem emitir uma única diretiva própria.",
    check: (state) =>
      !!state.endResult?.victory && state.history.length > 0 && state.history.every((h) => h.action === null),
  },
  {
    id: "onipresente",
    label: "Onipresente",
    description: "Emitiu uma diretiva em pelo menos 12 dos trimestres do mandato.",
    check: (state) => state.history.filter((h) => h.action !== null).length >= 12,
  },
  {
    id: "gestao-tranquila",
    label: "Gestão Tranquila",
    description: "Terminou o mandato sem nenhum indicador crítico chegar perto de zerar.",
    check: (state) => !!state.endResult?.victory && !wasEverInDanger(state),
  },
  {
    id: "fenix-municipal",
    label: "Fênix Municipal",
    description: "Chegou perto do colapso em algum indicador crítico e ainda assim completou o mandato.",
    check: (state) => !!state.endResult?.victory && wasEverInDanger(state),
  },
  {
    id: "equilibrista",
    label: "Equilibrista",
    description: "Encerrou o mandato com o estilo de gestão rotulado como Equilibrado.",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      return !!profile && describeLean(profile.average) === "Equilibrado";
    },
  },
  {
    id: "estilo-convicto",
    label: "Estilo Convicto",
    description: "Manteve um estilo de gestão consistentemente extremo (Populista ou Tecnocrata).",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      if (!profile) return false;
      const label = describeLean(profile.average);
      return label === "Populista" || label === "Tecnocrata";
    },
  },
  {
    id: "virada-de-mandato",
    label: "Virada de Mandato",
    description: "Seu estilo de gestão mudou de direção entre a primeira e a segunda metade do mandato.",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      return !!profile && profile.trend !== "estavel";
    },
  },
  {
    id: "cidade-unida",
    label: "Cidade Unida",
    description: "Encerrou o mandato com apoio de pelo menos 60 em todos os setores da cidade.",
    check: (state) => !!state.endResult?.victory && SECTOR_ORDER.every((key) => state.sectors[key] >= 60),
  },
  {
    id: "cidade-dividida",
    label: "Cidade Dividida",
    description: "Terminou o mandato com um setor em forte rejeição e outro em forte apoio ao mesmo tempo.",
    check: (state) => {
      const values = SECTOR_ORDER.map((key) => state.sectors[key]);
      return Math.min(...values) <= 20 && Math.max(...values) >= 80;
    },
  },
];
