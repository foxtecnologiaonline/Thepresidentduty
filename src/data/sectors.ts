import type { SectorKey, SectorMeta, Sectors } from "../types";

export const SECTOR_META: Record<SectorKey, SectorMeta> = {
  politicos: {
    key: "politicos",
    label: "Políticos",
    icon: "🗳️",
    description: "Apoio de partidos e lideranças políticas aliadas na Assembleia Legislativa.",
  },
  militares: {
    key: "militares",
    label: "Polícia Militar",
    icon: "🎖️",
    description: "Relação com a Polícia Militar e a Polícia Civil do estado.",
  },
  populacao: {
    key: "populacao",
    label: "População",
    icon: "👥",
    description: "Sentimento das classes populares e dos cidadãos comuns do estado no dia a dia.",
  },
  academicos: {
    key: "academicos",
    label: "Acadêmicos",
    icon: "📚",
    description: "Apoio de universidades estaduais, pesquisadores e da comunidade científica.",
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
    description: "Confiança de empresários e investidores no ambiente de negócios do estado.",
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
