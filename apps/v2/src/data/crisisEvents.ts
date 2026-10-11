import type { GameEvent, ThreatKey } from "../types";

/**
 * Um evento de crise por via de queda, forçado no baralho assim que aquela via entra em
 * estágio Crítico pela primeira vez num mandato (ver engine.ts) — a chance concreta do
 * jogador reagir antes que o risco vire queda de fato. Efeitos mais fortes que um evento
 * comum, de propósito: é o momento de maior tensão daquela via.
 */
export const CRISIS_EVENTS: Record<ThreatKey, GameEvent> = {
  impeachment: {
    id: "pedido-impeachment",
    title: "Pedido de Impeachment Protocolado",
    category: "institucional",
    crisisFor: "impeachment",
    description:
      "Um pedido de impeachment contra você reúne assinaturas suficientes para ser pautado na Câmara. Líderes partidários sinalizam que a votação ainda pode ser evitada — a um preço.",
    choices: [
      {
        id: "negociar-base",
        label: "Negociar cargos e emendas com o Centrão",
        consequence:
          "Você garante fôlego no Congresso, mas o custo em cargos e verba de emenda é alto — e a imagem de fisiologismo pesa na opinião pública.",
        effects: { governabilidade: 10, popularidade: -8 },
        sectorEffects: { politicos: 14 },
        leaning: 1,
      },
      {
        id: "apelar-populacao",
        label: "Romper com o Congresso e apelar direto à população",
        consequence:
          "Seu discurso contra \"a velha política\" energiza sua base popular, mas azeda de vez a relação com o Legislativo.",
        effects: { popularidade: 9, governabilidade: -6 },
        sectorEffects: { politicos: -10, populacao: 6 },
        leaning: -1,
      },
      {
        id: "aguardar-votacao",
        label: "Não negociar e deixar o plenário decidir",
        consequence:
          "Você preserva a coerência, mas entra na votação sem rede de proteção — o resultado fica nas mãos do Congresso.",
        effects: {},
        sectorEffects: { politicos: -4 },
        leaning: 0,
      },
    ],
  },
  golpe: {
    id: "tropas-alerta-maximo",
    title: "Tropas em Alerta Máximo",
    category: "seguranca",
    crisisFor: "golpe",
    description:
      "Guarnições em capitais estratégicas elevam o nível de prontidão \"por precaução\". Analistas de defesa classificam o movimento como sinal claro de ruptura institucional.",
    choices: [
      {
        id: "ceder-pauta-seguranca",
        label: "Reunião de emergência com o Alto-Comando e ceder pautas da área",
        consequence:
          "O Alto-Comando recua da escalada, mas agora negocia como um poder paralelo dentro do seu próprio governo.",
        effects: { seguranca: 8 },
        sectorEffects: { militares: 14, movimentosSociais: -6 },
        leaning: 2,
      },
      {
        id: "denunciar-movimentacao",
        label: "Denunciar publicamente a movimentação como tentativa de golpe",
        consequence:
          "A denúncia mobiliza apoio civil em sua defesa, mas é vista pelos militares como provocação — a tensão nos quartéis piora.",
        effects: { popularidade: 7, seguranca: -5 },
        sectorEffects: { militares: -10 },
        leaning: -1,
      },
      {
        id: "determinar-recolhimento",
        label: "Determinar o recolhimento imediato às bases",
        consequence:
          "Você reafirma a autoridade civil pela via formal, mas sem oferecer nada em troca — o comando obedece, sem entusiasmo.",
        effects: { governabilidade: 3 },
        sectorEffects: { militares: -3 },
        leaning: 0,
      },
    ],
  },
  levante: {
    id: "panelaco-nacional",
    title: "Panelaços e Manifestações em Todo o País",
    category: "social",
    crisisFor: "levante",
    description:
      "Protestos espontâneos tomam as principais capitais. Parte da população pede sua renúncia imediata; outra parte teme o caos e pede ordem.",
    choices: [
      {
        id: "pacote-emergencial",
        label: "Anunciar pacote emergencial de medidas populares",
        consequence:
          "O anúncio esvazia parte dos protestos, mas o gasto extra, feito às pressas, pesa nas contas públicas.",
        effects: { popularidade: 10, economia: -8 },
        sectorEffects: { populacao: 12 },
        leaning: -1,
      },
      {
        id: "dispersar-manifestacoes",
        label: "Determinar a dispersão das manifestações pela polícia",
        consequence:
          "As ruas ficam vazias mais rápido, mas imagens de confronto circulam o país inteiro e pioram sua imagem.",
        effects: { seguranca: 4, popularidade: -6 },
        sectorEffects: { populacao: -10, movimentosSociais: -8 },
        leaning: 2,
      },
      {
        id: "pronunciamento-nacional",
        label: "Pronunciamento em rede nacional pedindo calma e diálogo",
        consequence:
          "O gesto institucional acalma parte da opinião pública, mas sem medidas concretas o efeito é limitado.",
        effects: { popularidade: 3, governabilidade: 2 },
        sectorEffects: { populacao: 4 },
        leaning: 0,
      },
    ],
  },
  greveGeral: {
    id: "greve-geral-decretada",
    title: "Centrais Sindicais Decretam Greve Geral",
    category: "social",
    crisisFor: "greveGeral",
    description:
      "Sindicatos e movimentos sociais decretam greve geral por tempo indeterminado, parando transporte público, portos e serviços essenciais.",
    choices: [
      {
        id: "negociar-pauta-sindical",
        label: "Negociar a pauta de reivindicações com as centrais sindicais",
        consequence:
          "O acordo põe fim à greve, mas as concessões feitas sob pressão custam caro ao orçamento.",
        effects: { economia: -7 },
        sectorEffects: { movimentosSociais: 14, populacao: 5 },
        leaning: -2,
      },
      {
        id: "decretar-greve-ilegal",
        label: "Decretar a greve ilegal e acionar a Justiça para forçar o retorno ao trabalho",
        consequence:
          "O serviço é retomado à força da lei, mas o confronto radicaliza ainda mais os movimentos sociais contra o governo.",
        effects: { seguranca: -3 },
        sectorEffects: { movimentosSociais: -12, empresariado: 6 },
        leaning: 2,
      },
      {
        id: "aguardar-desgaste",
        label: "Aguardar o desgaste natural do movimento, sem negociar nem reprimir",
        consequence:
          "Você evita o desgaste político de qualquer lado, mas a paralisação se arrasta e o país sente o impacto.",
        effects: { economia: -4 },
        sectorEffects: { movimentosSociais: -3 },
        leaning: 0,
      },
    ],
  },
  fugaCapitais: {
    id: "fuga-capitais-mercado",
    title: "Bolsa Despenca e Dólar Dispara",
    category: "economia",
    crisisFor: "fugaCapitais",
    description:
      "Uma onda de vendas no mercado financeiro derruba a bolsa e dispara o dólar. Empresários cobram sinais imediatos de compromisso fiscal.",
    choices: [
      {
        id: "pacote-ajuste-fiscal",
        label: "Anunciar pacote de ajuste fiscal e reformas pró-mercado",
        consequence:
          "O mercado reage bem e a fuga de capitais estanca, mas o ajuste reduz programas sociais e irrita sua base popular.",
        effects: { economia: 7, popularidade: -7 },
        sectorEffects: { empresariado: 14 },
        leaning: 2,
      },
      {
        id: "controle-capitais",
        label: "Decretar controle de capitais para conter a fuga",
        consequence:
          "A sangria para no curto prazo, mas investidores internacionais veem a medida como sinal de instabilidade duradoura.",
        effects: { economia: 2, relacoesInternacionais: -7 },
        sectorEffects: { empresariado: -10 },
        leaning: -1,
      },
      {
        id: "discurso-confianca",
        label: "Fazer um discurso de confiança, sem mudanças concretas de política",
        consequence:
          "As palavras soam bem na TV, mas o mercado já ouviu promessas demais — a desconfiança praticamente não se altera.",
        effects: { economia: -3 },
        sectorEffects: { empresariado: -3 },
        leaning: 0,
      },
    ],
  },
  cassacaoJudicial: {
    id: "parecer-inconstitucionalidade",
    title: "Juristas Divulgam Parecer Pela Inconstitucionalidade",
    category: "institucional",
    crisisFor: "cassacaoJudicial",
    description:
      "Um grupo de juristas e universidades divulga parecer técnico apontando inconstitucionalidades graves em atos do seu governo, pressionando o STF a agir.",
    choices: [
      {
        id: "dialogo-universidades",
        label: "Abrir diálogo institucional com universidades e ampliar o financiamento à pesquisa",
        consequence:
          "O gesto reaproxima o governo da comunidade acadêmica e esvazia parte da pressão sobre o STF, mas tem custo orçamentário.",
        effects: { educacao: 4, economia: -3, governabilidade: 3 },
        sectorEffects: { academicos: 14 },
        leaning: -1,
      },
      {
        id: "criticar-ativismo",
        label: "Criticar publicamente o parecer como \"ativismo acadêmico\"",
        consequence:
          "O discurso agrada sua base mais fiel, mas aprofunda o racha com a academia e dá ainda mais força ao parecer nos tribunais.",
        effects: { popularidade: 4, governabilidade: -5 },
        sectorEffects: { academicos: -10 },
        leaning: 2,
      },
      {
        id: "parecer-tecnico-proprio",
        label: "Encomendar um parecer técnico próprio para rebater",
        consequence: "A resposta formal ganha tempo, mas convence pouca gente fora do seu próprio governo.",
        effects: { governabilidade: 2 },
        sectorEffects: { academicos: -3 },
        leaning: 0,
      },
    ],
  },
};
