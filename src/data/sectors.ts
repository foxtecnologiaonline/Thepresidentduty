import type { SectorKey, SectorMeta, Sectors } from "../types";

export const SECTOR_META: Record<SectorKey, SectorMeta> = {
  politicos: {
    key: "politicos",
    label: "Políticos",
    icon: "🗳️",
    description: "Apoio de partidos e lideranças políticas aliadas no Congresso.",
  },
  militares: {
    key: "militares",
    label: "Militares",
    icon: "🎖️",
    description: "Relação com as Forças Armadas e as forças de segurança.",
  },
  populacao: {
    key: "populacao",
    label: "População",
    icon: "👥",
    description: "Sentimento das classes populares e dos cidadãos comuns no dia a dia.",
  },
  academicos: {
    key: "academicos",
    label: "Acadêmicos",
    icon: "📚",
    description: "Apoio de universidades, pesquisadores e da comunidade científica.",
  },
  movimentosSociais: {
    key: "movimentosSociais",
    label: "Movimentos Sociais",
    icon: "✊",
    description: "Relação com sindicatos, ONGs e organizações da sociedade civil.",
  },
  empresariado: {
    key: "empresariado",
    label: "Empresariado",
    icon: "🏢",
    description: "Confiança de empresários e investidores no ambiente de negócios.",
  },
};

export const SECTOR_ORDER: SectorKey[] = [
  "politicos",
  "militares",
  "populacao",
  "academicos",
  "movimentosSociais",
  "empresariado",
];

export function createInitialSectors(): Sectors {
  return {
    politicos: 50,
    militares: 50,
    populacao: 55,
    academicos: 55,
    movimentosSociais: 45,
    empresariado: 55,
  };
}
