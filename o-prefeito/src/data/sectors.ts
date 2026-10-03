import type { SectorKey, SectorMeta, Sectors } from "../types";

export const SECTOR_META: Record<SectorKey, SectorMeta> = {
  vereadores: {
    key: "vereadores",
    label: "Vereadores",
    icon: "🗳️",
    description: "Apoio de vereadores e líderes partidários aliados na Câmara Municipal.",
  },
  servidores: {
    key: "servidores",
    label: "Servidores",
    icon: "📋",
    description: "Apoio dos servidores do quadro municipal: professores, agentes de saúde e corpo técnico.",
  },
  comerciantes: {
    key: "comerciantes",
    label: "Comerciantes",
    icon: "🏢",
    description: "Confiança do comércio, indústria e investidores locais na gestão municipal.",
  },
  moradoresPeriferia: {
    key: "moradoresPeriferia",
    label: "Moradores da Periferia",
    icon: "🏘️",
    description: "Sentimento dos moradores dos bairros periféricos e mais distantes do centro.",
  },
  imprensaLocal: {
    key: "imprensaLocal",
    label: "Imprensa Local",
    icon: "📰",
    description: "Relação com jornais, rádios e veículos de imprensa que cobrem a cidade.",
  },
  igrejas: {
    key: "igrejas",
    label: "Igrejas",
    icon: "⛪",
    description: "Relação com lideranças religiosas e comunidades de fé com influência na cidade.",
  },
};

export const SECTOR_ORDER: SectorKey[] = [
  "vereadores",
  "servidores",
  "comerciantes",
  "moradoresPeriferia",
  "imprensaLocal",
  "igrejas",
];

export function createInitialSectors(): Sectors {
  return {
    vereadores: 50,
    servidores: 50,
    comerciantes: 55,
    moradoresPeriferia: 45,
    imprensaLocal: 50,
    igrejas: 55,
  };
}
