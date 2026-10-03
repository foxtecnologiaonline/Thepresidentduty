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
    id: "estadista-historico",
    label: "Estadista Histórico",
    description: "Concluiu o mandato com o legado máximo.",
    check: (state) => state.endResult?.title === "Estadista Histórico",
  },
  {
    id: "sem-diretivas",
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
    id: "mandato-tranquilo",
    label: "Mandato Tranquilo",
    description: "Terminou o mandato sem nenhum indicador crítico chegar perto de zerar.",
    check: (state) => !!state.endResult?.victory && !wasEverInDanger(state),
  },
  {
    id: "fenix-politica",
    label: "Fênix Política",
    description: "Chegou perto do colapso em algum indicador crítico e ainda assim completou o mandato.",
    check: (state) => !!state.endResult?.victory && wasEverInDanger(state),
  },
  {
    id: "centrista-convicto",
    label: "Centrista Convicto",
    description: "Encerrou o mandato com o perfil ideológico rotulado como Centro.",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      return !!profile && describeLean(profile.average) === "Centro";
    },
  },
  {
    id: "ideologicamente-firme",
    label: "Ideologicamente Firme",
    description: "Manteve um perfil ideológico consistentemente extremo (Esquerda ou Direita).",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      if (!profile) return false;
      const label = describeLean(profile.average);
      return label === "Esquerda" || label === "Direita";
    },
  },
  {
    id: "guinada-historica",
    label: "Guinada Histórica",
    description: "Sua linha ideológica mudou de direção entre a primeira e a segunda metade do mandato.",
    check: (state) => {
      const profile = computeLeanProfile(state.history);
      return !!profile && profile.trend !== "estavel";
    },
  },
  {
    id: "unidade-estadual",
    label: "Unidade Estadual",
    description: "Encerrou o mandato com apoio de pelo menos 60 em todos os setores da sociedade.",
    check: (state) => !!state.endResult?.victory && SECTOR_ORDER.every((key) => state.sectors[key] >= 60),
  },
  {
    id: "estado-dividido",
    label: "Estado Dividido",
    description: "Terminou o mandato com um setor em forte rejeição e outro em forte apoio ao mesmo tempo.",
    check: (state) => {
      const values = SECTOR_ORDER.map((key) => state.sectors[key]);
      return Math.min(...values) <= 20 && Math.max(...values) >= 80;
    },
  },
];
