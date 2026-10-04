import type { SectorKey, SectorMeta, Sectors } from "../types";

export const SECTOR_META: Record<SectorKey, SectorMeta> = {
  investidores: {
    key: "investidores",
    label: "Investidores",
    icon: "📈",
    description: "Confiança de acionistas e analistas de Wall Street no futuro da Orange.",
  },
  imprensa: {
    key: "imprensa",
    label: "Imprensa & Mídia Tech",
    icon: "📰",
    description: "Cobertura da imprensa especializada e de negócios sobre sua gestão.",
  },
  funcionarios: {
    key: "funcionarios",
    label: "Funcionários",
    icon: "👥",
    description: "Sentimento do time no dia a dia, além da moral medida nos indicadores internos.",
  },
  clientes: {
    key: "clientes",
    label: "Clientes & Fãs",
    icon: "🛍️",
    description: "Lealdade da base de consumidores e da comunidade de fãs da marca.",
  },
  reguladores: {
    key: "reguladores",
    label: "Reguladores",
    icon: "⚖️",
    description: "Relação com órgãos antitruste, agências de proteção de dados e governos.",
  },
  desenvolvedores: {
    key: "desenvolvedores",
    label: "Comunidade de Desenvolvedores",
    icon: "👩‍💻",
    description: "Confiança dos desenvolvedores que constroem sobre a plataforma e a loja de apps da Orange.",
  },
};

export const SECTOR_ORDER: SectorKey[] = [
  "investidores",
  "imprensa",
  "funcionarios",
  "clientes",
  "reguladores",
  "desenvolvedores",
];

export function createInitialSectors(): Sectors {
  return {
    investidores: 50,
    imprensa: 50,
    funcionarios: 55,
    clientes: 55,
    reguladores: 45,
    desenvolvedores: 55,
  };
}
