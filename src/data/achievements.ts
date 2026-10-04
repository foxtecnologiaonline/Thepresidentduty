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
    id: "ceo-lendario",
    label: "CEO Lendário",
    description: "Concluiu a gestão com o legado máximo.",
    check: (state) => state.endResult?.title === "CEO Lendário",
  },
  {
    id: "maos-limpas",
    label: "Mãos Limpas",
    description: "Completou a gestão sem emitir uma única diretiva executiva própria.",
    check: (state) =>
      !!state.endResult?.victory && state.history.length > 0 && state.history.every((h) => h.action === null),
  },
  {
    id: "onipresente",
    label: "Onipresente",
    description: "Emitiu uma diretiva em pelo menos 3 a cada 4 trimestres da gestão.",
    // Proporcional a totalTurns (3/4 = 12 de 16, calibrado para a gestão padrão) em vez de um
    // número fixo — numa sessão Sprint de 8 turnos, exigir 12 tornaria a conquista inalcançável.
    check: (state) =>
      state.history.filter((h) => h.action !== null).length >= Math.ceil(state.totalTurns * 0.75),
  },
  {
    id: "gestao-tranquila",
    label: "Gestão Tranquila",
    description: "Terminou a gestão sem nenhum indicador crítico chegar perto de zerar.",
    check: (state) => !!state.endResult?.victory && !wasEverInDanger(state),
  },
  {
    id: "fenix-corporativa",
    label: "Fênix Corporativa",
    description: "Chegou perto do colapso em algum indicador crítico e ainda assim completou a gestão.",
    check: (state) => !!state.endResult?.victory && wasEverInDanger(state),
  },
  {
    id: "equilibrado-convicto",
    label: "Equilibrado Convicto",
    description: "Encerrou a gestão com o estilo de liderança rotulado como Equilibrado.",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      return !!profile && describeLean(profile.average) === "Equilibrado";
    },
  },
  {
    id: "visao-inabalavel",
    label: "Visão Inabalável",
    description: "Manteve um estilo de liderança consistentemente extremo (Visionário ou Operador).",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      if (!profile) return false;
      const label = describeLean(profile.average);
      return label === "Visionário" || label === "Operador";
    },
  },
  {
    id: "reviravolta-estrategica",
    label: "Reviravolta Estratégica",
    description: "Seu estilo de liderança mudou de direção entre a primeira e a segunda metade da gestão.",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      return !!profile && profile.trend !== "estavel";
    },
  },
  {
    id: "confianca-total",
    label: "Confiança Total",
    description: "Encerrou a gestão com apoio de pelo menos 60 em todas as partes interessadas.",
    check: (state) => !!state.endResult?.victory && SECTOR_ORDER.every((key) => state.sectors[key] >= 60),
  },
  {
    id: "orange-dividida",
    label: "Orange Dividida",
    description: "Terminou a gestão com uma parte interessada em forte rejeição e outra em forte apoio ao mesmo tempo.",
    check: (state) => {
      const values = SECTOR_ORDER.map((key) => state.sectors[key]);
      return Math.min(...values) <= 20 && Math.max(...values) >= 80;
    },
  },
];
