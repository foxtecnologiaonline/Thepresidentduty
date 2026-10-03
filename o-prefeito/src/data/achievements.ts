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
    description: "Terminou o mandato sem a Câmara ou o Ministério Público chegarem perto de derrubá-lo.",
    check: (state) => !!state.endResult?.victory && !wasEverInDanger(state),
  },
  {
    id: "fenix-municipal",
    label: "Fênix Municipal",
    description: "Chegou perto do impeachment ou da cassação e ainda assim completou o mandato.",
    check: (state) => !!state.endResult?.victory && wasEverInDanger(state),
  },
  {
    id: "equilibrista",
    label: "Equilibrista",
    description: "Encerrou o mandato com o perfil urbanístico rotulado como Equilibrado.",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      return !!profile && describeLean(profile.average) === "Equilibrado";
    },
  },
  {
    id: "estilo-convicto",
    label: "Estilo Convicto",
    description: "Manteve um perfil urbanístico consistentemente extremo (Preservacionista ou Expansionista).",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      if (!profile) return false;
      const label = describeLean(profile.average);
      return label === "Preservacionista" || label === "Expansionista";
    },
  },
  {
    id: "virada-de-mandato",
    label: "Virada de Mandato",
    description: "Seu perfil urbanístico mudou de direção entre a primeira e a segunda metade do mandato.",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      return !!profile && profile.trend !== "estavel";
    },
  },
  {
    id: "cidade-unida",
    label: "Cidade Unida",
    description: "Encerrou o mandato com apoio de pelo menos 60 em todas as facções da cidade.",
    check: (state) => !!state.endResult?.victory && SECTOR_ORDER.every((key) => state.sectors[key] >= 60),
  },
  {
    id: "cidade-dividida",
    label: "Cidade Dividida",
    description: "Terminou o mandato com uma facção em forte rejeição e outra em forte apoio ao mesmo tempo.",
    check: (state) => {
      const values = SECTOR_ORDER.map((key) => state.sectors[key]);
      return Math.min(...values) <= 20 && Math.max(...values) >= 80;
    },
  },
];
