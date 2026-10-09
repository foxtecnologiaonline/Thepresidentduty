import type { SectorKey, SectorMeta, Sectors } from "../types";

export const SECTOR_META: Record<SectorKey, SectorMeta> = {
  politicos: {
    key: "politicos",
    label: "Políticos",
    icon: "🗳️",
    description: "Apoio de partidos e lideranças políticas aliadas no Congresso. Zerar aprova um impeachment.",
    collapseTitle: "Impeachment",
    loseMessage:
      "A cúpula política, antes aliada, rompeu de forma irreversível com seu governo. Partidos e lideranças se uniram contra você, e o impeachment foi aprovado no Congresso em tempo recorde.",
  },
  militares: {
    key: "militares",
    label: "Militares",
    icon: "🎖️",
    description: "Relação com as Forças Armadas e as forças de segurança. Zerar provoca uma revolta armada.",
    collapseTitle: "Revolta Armada",
    loseMessage:
      "Os militares romperam de forma definitiva com seu governo. Oficiais insatisfeitos tomaram o poder pela força, numa revolta armada que não encontrou resistência organizada.",
  },
  populacao: {
    key: "populacao",
    label: "População",
    icon: "👥",
    description: "Sentimento das classes populares e dos cidadãos comuns no dia a dia. Zerar provoca manifestações e desordem.",
    collapseTitle: "Manifestação e Desordem",
    loseMessage:
      "A população perdeu toda confiança em seu governo. Protestos espontâneos tomaram as ruas de norte a sul, e a desordem generalizada tornou seu governo insustentável.",
  },
  academicos: {
    key: "academicos",
    label: "Acadêmicos",
    icon: "📚",
    description: "Apoio de universidades, pesquisadores e da comunidade científica. Zerar provoca um boicote acadêmico.",
    collapseTitle: "Boicote Acadêmico",
    loseMessage:
      "Universidades, centros de pesquisa e a comunidade científica declararam seu governo ilegítimo. O boicote se espalhou internacionalmente, isolando o país e minando por completo a credibilidade de qualquer política pública.",
  },
  movimentosSociais: {
    key: "movimentosSociais",
    label: "Movimentos Sociais",
    icon: "✊",
    description: "Relação com sindicatos, ONGs e organizações da sociedade civil. Zerar provoca manifestações e desordem.",
    collapseTitle: "Manifestação e Desordem",
    loseMessage:
      "Sindicatos, ONGs e movimentos sociais se uniram numa onda de protestos e paralisações que tomou o país. Sem apoio popular organizado, seu governo não resistiu à desordem generalizada.",
  },
  empresariado: {
    key: "empresariado",
    label: "Empresariado",
    icon: "🏢",
    description: "Confiança de empresários e investidores no ambiente de negócios. Zerar provoca fuga de capitais.",
    collapseTitle: "Fuga de Capitais",
    loseMessage:
      "Empresários e investidores perderam toda confiança na condução econômica do seu governo. Uma fuga de capitais em massa e um lockout generalizado paralisaram a economia, tornando seu governo insustentável.",
  },
};

/** Abaixo deste valor, um setor entra em alerta visual (perto de provocar o colapso do mandato). */
export const SECTOR_WARNING_THRESHOLD = 15;

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
