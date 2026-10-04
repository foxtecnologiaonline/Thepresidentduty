import type { FactionKey, FactionMeta, Factions } from "../types";

export const FACTION_META: Record<FactionKey, FactionMeta> = {
  baroes: {
    key: "baroes",
    label: "Barões",
    icon: "🏰",
    description: "Os grandes senhores de terra do reino, donos de exércitos e castelos próprios.",
  },
  clero: {
    key: "clero",
    label: "Clero",
    icon: "⛪",
    description: "Bispos e abades, guardiões da fé e de boa parte da riqueza do reino.",
  },
  camponeses: {
    key: "camponeses",
    label: "Camponeses",
    icon: "🌾",
    description: "Quem planta, colhe e sustenta o reino com o próprio trabalho.",
  },
  mercadores: {
    key: "mercadores",
    label: "Mercadores",
    icon: "⚖️",
    description: "Guildas e comerciantes das cidades, donos do comércio e de boa parte do crédito da coroa.",
  },
  reinoVizinho: {
    key: "reinoVizinho",
    label: "Reino Vizinho",
    icon: "🏳️",
    description: "A corte estrangeira com fronteira comum — ora aliada, ora rival.",
  },
  guardaReal: {
    key: "guardaReal",
    label: "Guarda Real",
    icon: "🗡️",
    description: "Os soldados leais diretamente à coroa, independentes dos exércitos dos barões.",
  },
};

export const FACTION_ORDER: FactionKey[] = [
  "baroes",
  "clero",
  "camponeses",
  "mercadores",
  "reinoVizinho",
  "guardaReal",
];

export function createInitialFactions(): Factions {
  return {
    baroes: 50,
    clero: 55,
    camponeses: 50,
    mercadores: 50,
    reinoVizinho: 45,
    guardaReal: 55,
  };
}
