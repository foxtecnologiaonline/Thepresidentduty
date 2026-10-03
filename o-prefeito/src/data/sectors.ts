import type { SectorKey, SectorMeta, Sectors } from "../types";

export const SECTOR_META: Record<SectorKey, SectorMeta> = {
  vereadores: {
    key: "vereadores",
    label: "Vereadores",
    icon: "🗳️",
    description: "Apoio de vereadores e líderes partidários aliados na Câmara Municipal.",
  },
  guardaMunicipal: {
    key: "guardaMunicipal",
    label: "Guarda Municipal",
    icon: "🎖️",
    description: "Relação com a Guarda Municipal e as forças de segurança que atuam na cidade.",
  },
  populacao: {
    key: "populacao",
    label: "População",
    icon: "👥",
    description: "Sentimento dos moradores e do dia a dia nos bairros da cidade.",
  },
  servidoresPublicos: {
    key: "servidoresPublicos",
    label: "Servidores Públicos",
    icon: "📋",
    description: "Apoio de professores, agentes de saúde e demais servidores do quadro municipal.",
  },
  associacoesBairro: {
    key: "associacoesBairro",
    label: "Associações de Bairro",
    icon: "✊",
    description: "Relação com associações de moradores, ONGs e movimentos sociais locais.",
  },
  empresariadoLocal: {
    key: "empresariadoLocal",
    label: "Empresariado Local",
    icon: "🏢",
    description: "Confiança do comércio, indústria e investidores locais na gestão municipal.",
  },
};

export const SECTOR_ORDER: SectorKey[] = [
  "vereadores",
  "guardaMunicipal",
  "populacao",
  "servidoresPublicos",
  "associacoesBairro",
  "empresariadoLocal",
];

export function createInitialSectors(): Sectors {
  return {
    vereadores: 50,
    guardaMunicipal: 50,
    populacao: 55,
    servidoresPublicos: 55,
    associacoesBairro: 45,
    empresariadoLocal: 55,
  };
}
