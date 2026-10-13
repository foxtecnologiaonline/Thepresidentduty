import type { GameEvent } from "../types";

export const EVENTS: GameEvent[] = [
  {
    id: "reforma-tributaria",
    title: "Reforma Tributária",
    category: "economia",
    description:
      "Seu ministério da Fazenda propõe uma reforma tributária que simplifica impostos, mas taxa mais os mais ricos. Empresários pressionam contra; a população pobre apoia.",
    choices: [
      {
        id: "aprovar",
        label: "Aprovar a reforma integral",
        consequence:
          "A reforma passa inteira. O caixa público dispara, mas grandes empresários fecham o cofre de investimentos e blindam sua base no Congresso.",
        effects: { economia: 13, popularidade: 7, governabilidade: -10 },
        sectorEffects: { empresariado: -13, movimentosSociais: 10, politicos: -7 },
        leaning: -2,
      },
      {
        id: "recuar",
        label: "Negociar uma versão intermediária",
        consequence:
          "Uma versão mais branda passa sem grande ruído, mas também sem resolver o problema de fundo.",
        effects: { economia: 6, governabilidade: -3, popularidade: 2 },
        sectorEffects: { empresariado: -3, movimentosSociais: 3, politicos: -2 },
        leaning: 0,
      },
      {
        id: "manter-sistema",
        label: "Recuar por completo e manter o sistema atual",
        consequence:
          "Grandes fortunas respiram aliviadas e os investimentos seguem firmes, mas a população vê um recuo humilhante diante das elites.",
        effects: { governabilidade: 7, popularidade: -9 },
        sectorEffects: { empresariado: 9, movimentosSociais: -11 },
        leaning: 2,
      },
    ],
  },
  {
    id: "greve-policial",
    title: "Greve da Polícia",
    category: "seguranca",
    description:
      "Policiais estaduais entram em greve por salários melhores. A criminalidade começa a subir enquanto a categoria pede reajuste imediato.",
    choices: [
      {
        id: "atender",
        label: "Atender a reivindicação salarial integralmente",
        consequence:
          "A greve termina rápido e a segurança se estabiliza, mas o rombo no orçamento é severo.",
        effects: { seguranca: 16, economia: -13 },
        sectorEffects: { militares: 10, empresariado: -5 },
        leaning: -1,
      },
      {
        id: "negociar-parcelado",
        label: "Negociar reajuste parcelado",
        consequence:
          "Solução intermediária: a greve arrefece aos poucos e o impacto fiscal é menor.",
        effects: { seguranca: 6, economia: -5, popularidade: -3 },
        sectorEffects: { militares: 5 },
        leaning: 0,
      },
      {
        id: "linha-dura",
        label: "Não ceder e usar a força para conter a crise",
        consequence:
          "Você mantém o orçamento intacto, mas a insegurança dispara e sua imagem desmorona.",
        effects: { seguranca: -16, popularidade: -10 },
        sectorEffects: { militares: -13, movimentosSociais: -8, populacao: -6 },
        leaning: 2,
        triggersEventId: "ataque-cibernetico",
      },
    ],
  },
  {
    id: "crise-hospitalar",
    title: "Colapso na Rede Hospitalar",
    category: "saude",
    description:
      "Hospitais públicos relatam superlotação e falta de leitos. A imprensa cobra uma resposta imediata do governo.",
    choices: [
      {
        id: "investir",
        label: "Investir pesado em saúde emergencial",
        consequence:
          "Novos leitos e equipamentos resolvem a crise de vez, mas o rombo no orçamento é grande.",
        effects: { saude: 19, popularidade: 8, economia: -10 },
        sectorEffects: { populacao: 13, academicos: 6, empresariado: -5 },
        leaning: -2,
      },
      {
        id: "forca-tarefa",
        label: "Montar força-tarefa emergencial com recursos já existentes",
        consequence:
          "Realoca equipes e leitos de outras áreas: alívio real, mas parcial e com atrito interno.",
        effects: { saude: 9, governabilidade: -2 },
        sectorEffects: { populacao: 5, academicos: 2 },
        leaning: 0,
      },
      {
        id: "parceria-privada",
        label: "Firmar parcerias com hospitais privados",
        consequence:
          "Solução rápida e mais barata, mas o país acusa privatização disfarçada da saúde pública.",
        effects: { saude: 10, economia: -2, popularidade: -4 },
        sectorEffects: { empresariado: 11, movimentosSociais: -10, academicos: -5 },
        leaning: 2,
      },
    ],
  },
  {
    id: "reforma-educacional",
    title: "Reforma do Ensino Médio",
    category: "educacao",
    description:
      "Especialistas propõem uma reforma curricular ampla. Professores temem precarização; parte da sociedade quer modernização rápida.",
    choices: [
      {
        id: "implementar",
        label: "Implementar a reforma integralmente",
        consequence:
          "A educação dá um salto, mas o processo é turbulento e o desgaste com sindicatos é profundo.",
        effects: { educacao: 16, popularidade: -5, governabilidade: -4 },
        sectorEffects: { academicos: 13, politicos: -6, movimentosSociais: 5 },
        leaning: -1,
      },
      {
        id: "piloto",
        label: "Testar em projeto-piloto antes de expandir",
        consequence:
          "Abordagem cautelosa: ganho real, porém modesto, e sem grandes atritos.",
        effects: { educacao: 7, governabilidade: 3 },
        sectorEffects: { academicos: 3, politicos: 5 },
        leaning: 0,
      },
      {
        id: "manter-curriculo",
        label: "Manter o currículo atual, sem reforma",
        consequence:
          "Você evita qualquer desgaste político imediato, mas o atraso educacional se acumula e vira um problema maior adiante.",
        effects: { educacao: -8, governabilidade: 5 },
        sectorEffects: { politicos: 7, academicos: -8 },
        leaning: 2,
      },
    ],
  },
  {
    id: "desmatamento",
    title: "Pressão do Agronegócio",
    category: "ambiental",
    description:
      "Ruralistas pedem liberação de novas áreas para agricultura em regiões de proteção ambiental, alegando ganhos econômicos urgentes.",
    choices: [
      {
        id: "liberar",
        label: "Liberar as áreas para exploração",
        consequence:
          "A economia agrícola dispara e o agronegócio vira aliado fiel, mas o desmatamento explode e a comunidade internacional reage com dureza.",
        effects: { economia: 13, meioAmbiente: -19, relacoesInternacionais: -10 },
        sectorEffects: { empresariado: 16, movimentosSociais: -16, academicos: -10 },
        leaning: 2,
        triggersEventId: "cupula-clima",
      },
      {
        id: "liberar-parcial",
        label: "Liberar apenas áreas já degradadas, com monitoramento",
        consequence:
          "Um meio-termo tecnicamente defensável: ganho econômico moderado, impacto ambiental contido.",
        effects: { economia: 6, meioAmbiente: -5 },
        sectorEffects: { empresariado: 6, movimentosSociais: -3 },
        leaning: 0,
      },
      {
        id: "proteger",
        label: "Manter a proteção ambiental integral",
        consequence:
          "Você preserva o meio ambiente e vira referência internacional, mas perde de vez o apoio do setor rural.",
        effects: { meioAmbiente: 13, relacoesInternacionais: 8, popularidade: -5 },
        sectorEffects: { movimentosSociais: 14, academicos: 8, empresariado: -11 },
        leaning: -2,
      },
    ],
  },
  {
    id: "acordo-comercial",
    title: "Acordo Comercial Internacional",
    category: "internacional",
    description:
      "Um grande bloco econômico oferece um acordo de livre comércio. Ele abre mercados, mas ameaça indústrias nacionais menos competitivas.",
    choices: [
      {
        id: "assinar",
        label: "Assinar o acordo integralmente",
        consequence:
          "As exportações disparam e sua imagem externa melhora muito, mas indústrias locais fecham postos com demissões em massa.",
        effects: { economia: 10, relacoesInternacionais: 15, popularidade: -7 },
        sectorEffects: { empresariado: 14, populacao: -8, politicos: 5 },
        leaning: 2,
      },
      {
        id: "assinar-com-ressalvas",
        label: "Assinar com cláusulas de proteção a setores sensíveis",
        consequence:
          "Ganhos comerciais reais, com parte da indústria local protegida por um período de transição.",
        effects: { economia: 5, relacoesInternacionais: 7 },
        sectorEffects: { empresariado: 6, populacao: -2 },
        leaning: 0,
      },
      {
        id: "recusar",
        label: "Recusar para proteger a indústria nacional",
        consequence:
          "Trabalhadores da indústria local comemoram, mas o país perde relevância diplomática por anos.",
        effects: { popularidade: 5, relacoesInternacionais: -12 },
        sectorEffects: { populacao: 7, empresariado: -10 },
        leaning: -1,
      },
    ],
  },
  {
    id: "escandalo-corrupcao",
    title: "Escândalo de Corrupção",
    category: "institucional",
    description:
      "Um ministro de confiança é flagrado em um esquema de desvio de verbas. A oposição pede sua cabeça; aliados pedem discrição.",
    choices: [
      {
        id: "demitir",
        label: "Demitir o ministro e abrir investigação pública",
        consequence:
          "A transparência choca a opinião pública a seu favor, mas fragiliza duramente sua base política interna.",
        effects: { popularidade: 10, governabilidade: -12 },
        sectorEffects: { academicos: 8, movimentosSociais: 9, politicos: -13 },
        leaning: -1,
      },
      {
        id: "afastamento-cautelar",
        label: "Afastar o ministro cautelarmente até auditoria interna",
        consequence:
          "Gesto intermediário: evita o pior sem resolver de fato a desconfiança pública.",
        effects: { popularidade: 3, governabilidade: -3 },
        sectorEffects: { politicos: -3, academicos: 2 },
        leaning: 0,
      },
      {
        id: "proteger",
        label: "Proteger o aliado e abafar o caso",
        consequence:
          "Você mantém a base de apoio intacta, mas o escândalo vaza para a imprensa e sua credibilidade desaba.",
        effects: { governabilidade: 7, popularidade: -16 },
        sectorEffects: { politicos: 10, movimentosSociais: -13, academicos: -10 },
        leaning: 1,
        triggersEventId: "cpi-investigacao",
      },
    ],
  },
  {
    id: "protesto-popular",
    title: "Protesto Popular Massivo",
    category: "social",
    description:
      "Milhares de pessoas tomam as ruas contra o custo de vida. Parte dos manifestantes pede sua renúncia; a polícia pede autorização para agir com rigor.",
    choices: [
      {
        id: "dialogo",
        label: "Abrir diálogo com os manifestantes",
        consequence:
          "O gesto acalma os ânimos e melhora muito sua imagem, embora nada seja resolvido de imediato.",
        effects: { popularidade: 10, seguranca: 2 },
        sectorEffects: { movimentosSociais: 16, populacao: 8 },
        leaning: -1,
      },
      {
        id: "policiamento-contido",
        label: "Reforçar o policiamento sem autorizar repressão",
        consequence:
          "Os protestos continuam, mas sem escalada de violência de nenhum dos lados.",
        effects: { seguranca: 4, popularidade: -2 },
        sectorEffects: { movimentosSociais: -2 },
        leaning: 0,
      },
      {
        id: "reprimir",
        label: "Autorizar repressão policial forte",
        consequence:
          "Os protestos somem rapidamente, mas imagens de violência policial chocam o país inteiro.",
        effects: { seguranca: 8, popularidade: -19 },
        sectorEffects: { militares: 8, movimentosSociais: -19, populacao: -11 },
        leaning: 2,
        triggersEventId: "cpi-investigacao",
      },
    ],
  },
  {
    id: "enchente",
    title: "Enchentes Devastadoras",
    category: "ambiental",
    description:
      "Chuvas históricas causam enchentes em várias cidades, deixando milhares desabrigados. O país espera uma resposta rápida do governo federal.",
    choices: [
      {
        id: "resposta-rapida",
        label: "Mobilizar resposta emergencial imediata e ampla",
        consequence:
          "A ajuda rápida salva vidas e é celebrada, mas consome recursos pesados do orçamento.",
        effects: { popularidade: 13, meioAmbiente: 3, economia: -8 },
        sectorEffects: { populacao: 14, academicos: 3 },
        leaning: -1,
      },
      {
        id: "resposta-focada",
        label: "Concentrar a ajuda nas áreas mais críticas",
        consequence:
          "Custo controlado, mas cidades fora do foco se sentem abandonadas.",
        effects: { economia: -3, popularidade: 3 },
        sectorEffects: { populacao: 4 },
        leaning: 0,
      },
      {
        id: "resposta-lenta",
        label: "Seguir o protocolo padrão sem ações extraordinárias",
        consequence:
          "Você preserva o orçamento, mas a lentidão da resposta gera revolta popular generalizada.",
        effects: { economia: 3, popularidade: -14 },
        sectorEffects: { populacao: -14, movimentosSociais: -6 },
        leaning: 1,
      },
    ],
  },
  {
    id: "pauta-impopular",
    title: "Pauta Impopular no Congresso",
    category: "institucional",
    description:
      "Para manter sua base aliada, líderes do Congresso pedem que você apoie publicamente uma pauta polêmica e impopular.",
    choices: [
      {
        id: "recusar",
        label: "Recusar publicamente a pauta",
        consequence:
          "Você agrada muito a opinião pública, mas perde apoio de aliados importantes no Legislativo.",
        effects: { popularidade: 8, governabilidade: -13 },
        sectorEffects: { populacao: 8, politicos: -14 },
        leaning: -1,
      },
      {
        id: "emenda-suavizadora",
        label: "Negociar uma emenda que suaviza a pauta",
        consequence:
          "Nem o Congresso nem a população ficam plenamente satisfeitos, mas ninguém sai humilhado.",
        effects: { governabilidade: 2, popularidade: -1 },
        sectorEffects: { politicos: 2, populacao: -1 },
        leaning: 0,
      },
      {
        id: "apoiar",
        label: "Apoiar a pauta para manter a base aliada",
        consequence:
          "O Congresso permanece fielmente ao seu lado, mas a população reage com indignação à medida.",
        effects: { governabilidade: 13, popularidade: -10 },
        sectorEffects: { politicos: 14, populacao: -8 },
        leaning: 1,
      },
    ],
  },
  {
    id: "energia-limpa",
    title: "Programa de Energia Limpa",
    category: "ambiental",
    description:
      "Seu governo pode lançar um grande programa de incentivo a energias renováveis, com custo inicial alto mas retorno ambiental e de imagem no longo prazo.",
    choices: [
      {
        id: "investir",
        label: "Investir no programa em escala nacional",
        consequence:
          "O país se posiciona como líder ambiental global, mas o investimento pesa duramente nas contas públicas de curto prazo.",
        effects: { meioAmbiente: 16, relacoesInternacionais: 7, economia: -8 },
        sectorEffects: { movimentosSociais: 13, academicos: 9, empresariado: -6 },
        leaning: -2,
      },
      {
        id: "programa-piloto",
        label: "Lançar um programa reduzido em regiões-piloto",
        consequence:
          "Avanço real e visível, mas limitado a poucas regiões por enquanto.",
        effects: { meioAmbiente: 6, economia: -2 },
        sectorEffects: { movimentosSociais: 4, academicos: 3 },
        leaning: 0,
      },
      {
        id: "adiar",
        label: "Adiar o programa para depois do mandato",
        consequence:
          "O orçamento fica intacto, mas o país perde de vez uma janela de destaque internacional.",
        effects: { economia: 3, meioAmbiente: -5 },
        sectorEffects: { empresariado: 6, movimentosSociais: -9, academicos: -5 },
        leaning: 1,
      },
    ],
  },
  {
    id: "crise-migratoria",
    title: "Crise Migratória na Fronteira",
    category: "internacional",
    description:
      "Um fluxo migratório intenso vindo de um país vizinho em crise pressiona cidades fronteiriças e divide a opinião pública.",
    choices: [
      {
        id: "acolher",
        label: "Abrir a fronteira e estruturar acolhimento humanitário",
        consequence:
          "Sua postura é elogiada internacionalmente, mas parte da população teme o colapso dos serviços locais.",
        effects: { relacoesInternacionais: 13, popularidade: -7, saude: -3 },
        sectorEffects: { movimentosSociais: 14, academicos: 6, populacao: -8 },
        leaning: -2,
      },
      {
        id: "acolhimento-regulado",
        label: "Acolher sob cotas, com triagem e estrutura reforçada",
        consequence:
          "Fluxo controlado reduz o atrito local sem fechar totalmente as portas.",
        effects: { relacoesInternacionais: 4, saude: -1 },
        sectorEffects: { movimentosSociais: 3, populacao: -2 },
        leaning: 0,
      },
      {
        id: "fechar",
        label: "Reforçar o controle e restringir a entrada",
        consequence:
          "Parte da população local aprova com força a medida, mas o país é duramente criticado por direitos humanos.",
        effects: { seguranca: 6, relacoesInternacionais: -13, popularidade: 5 },
        sectorEffects: { militares: 8, movimentosSociais: -14, populacao: 6 },
        leaning: 2,
      },
    ],
  },
  {
    id: "ataque-cibernetico",
    title: "Ataque Cibernético a Infraestrutura",
    category: "seguranca",
    description:
      "Hackers atacam sistemas de energia e bancos públicos, causando instabilidade e assustando investidores.",
    choices: [
      {
        id: "investir-ciberseguranca",
        label: "Investir emergencialmente em ciberdefesa estatal",
        consequence:
          "O ataque é contido e a confiança é restaurada, mas o gasto extra pesa duramente no orçamento.",
        effects: { seguranca: 13, economia: -7 },
        sectorEffects: { militares: 9, empresariado: 4 },
        leaning: -1,
      },
      {
        id: "parceria-ciberseguranca",
        label: "Firmar parceria público-privada de ciberdefesa",
        consequence:
          "Custo dividido com empresas de tecnologia, resultado sólido mas mais lento para implementar.",
        effects: { seguranca: 6, economia: -2 },
        sectorEffects: { empresariado: 5 },
        leaning: 0,
      },
      {
        id: "resposta-minima",
        label: "Resposta mínima, aguardar a situação se resolver",
        consequence:
          "Você economiza recursos, mas o episódio expõe fragilidades graves e abala a confiança dos mercados.",
        effects: { economia: -10, seguranca: -8 },
        sectorEffects: { militares: -8, empresariado: -10 },
        leaning: 1,
      },
    ],
  },
  {
    id: "recessao-global",
    title: "Recessão Econômica Global",
    category: "economia",
    description:
      "Uma crise financeira internacional reduz as exportações e ameaça a economia nacional. O mercado espera sinais claros do governo.",
    choices: [
      {
        id: "estimulo",
        label: "Lançar pacote amplo de estímulo econômico",
        consequence:
          "O impacto da crise é amenizado e empregos são preservados em massa, mas a dívida pública dispara.",
        effects: { economia: 10, popularidade: 5, governabilidade: -5 },
        sectorEffects: { populacao: 11, empresariado: 6, politicos: -5 },
        leaning: -2,
      },
      {
        id: "estimulo-seletivo",
        label: "Lançar estímulo seletivo para setores mais atingidos",
        consequence:
          "Ajuda real e focada, com impacto fiscal moderado.",
        effects: { economia: 5, popularidade: 2 },
        sectorEffects: { populacao: 4, empresariado: 3 },
        leaning: 0,
      },
      {
        id: "austeridade",
        label: "Adotar austeridade fiscal rígida",
        consequence:
          "As contas públicas ficam sob controle total, mas o desemprego dispara e a população sofre duramente.",
        effects: { economia: 5, popularidade: -12 },
        sectorEffects: { empresariado: 10, populacao: -13 },
        leaning: 2,
      },
    ],
  },
  {
    id: "racionamento",
    title: "Racionamento de Água e Energia",
    category: "ambiental",
    description:
      "Uma seca severa reduz os reservatórios do país, forçando decisões impopulares sobre racionamento.",
    choices: [
      {
        id: "racionar",
        label: "Implementar racionamento rígido",
        consequence:
          "Os recursos naturais são preservados com segurança, mas a população sofre duramente com a rotina de restrições.",
        effects: { meioAmbiente: 10, popularidade: -13 },
        sectorEffects: { movimentosSociais: 6, populacao: -13, empresariado: -8 },
        leaning: -1,
      },
      {
        id: "racionamento-escalonado",
        label: "Escalonar o racionamento por região e horário",
        consequence:
          "Menos drama no dia a dia, embora o resultado ambiental seja mais modesto.",
        effects: { meioAmbiente: 4, popularidade: -4 },
        sectorEffects: { populacao: -4 },
        leaning: 0,
      },
      {
        id: "importar",
        label: "Importar energia emergencialmente a alto custo",
        consequence:
          "A população não sente o impacto direto, mas o custo é altíssimo para os cofres públicos.",
        effects: { economia: -15, popularidade: 5 },
        sectorEffects: { populacao: 6, empresariado: 5 },
        leaning: 1,
      },
    ],
  },
  {
    id: "cpi-investigacao",
    title: "CPI no Congresso",
    category: "institucional",
    description:
      "Parlamentares da oposição instauram uma Comissão Parlamentar de Inquérito para investigar supostas irregularidades no seu governo.",
    choices: [
      {
        id: "colaborar",
        label: "Colaborar totalmente com a investigação",
        consequence:
          "A transparência fortalece muito sua imagem pública, mas expõe fragilidades da sua gestão ao Congresso.",
        effects: { popularidade: 8, governabilidade: -8 },
        sectorEffects: { academicos: 8, politicos: -11 },
        leaning: -1,
      },
      {
        id: "colaboracao-parcial",
        label: "Colaborar apenas com documentos não sigilosos",
        consequence:
          "Postura calculada: nem total exposição, nem acusação clara de obstrução.",
        effects: { popularidade: 1, governabilidade: -2 },
        sectorEffects: { politicos: -2 },
        leaning: 0,
      },
      {
        id: "resistir",
        label: "Resistir e dificultar o acesso a documentos",
        consequence:
          "Você protege informações sensíveis, mas a resistência é lida abertamente como sinal de culpa.",
        effects: { governabilidade: 3, popularidade: -13 },
        sectorEffects: { politicos: 6, academicos: -11, movimentosSociais: -9 },
        leaning: 1,
      },
    ],
  },
  {
    id: "epidemia-regional",
    title: "Epidemia Regional",
    category: "saude",
    description:
      "Um surto de doença infecciosa se espalha em regiões do país, sobrecarregando postos de saúde locais.",
    choices: [
      {
        id: "lockdown",
        label: "Decretar quarentena e isolar as regiões afetadas",
        consequence:
          "O surto é contido rapidamente, mas a atividade econômica local é fortemente destruída.",
        effects: { saude: 16, economia: -11, popularidade: -5 },
        sectorEffects: { academicos: 11, empresariado: -13, populacao: -5 },
        leaning: -1,
      },
      {
        id: "restricoes-parciais",
        label: "Restrições parciais com testagem em massa",
        consequence:
          "Contenção razoável sem parar a economia por completo.",
        effects: { saude: 6, economia: -3 },
        sectorEffects: { academicos: 3, empresariado: -3 },
        leaning: 0,
      },
      {
        id: "monitoramento",
        label: "Apenas reforçar o monitoramento sem restrições",
        consequence:
          "A economia segue normalmente, mas o surto se espalha descontroladamente, sobrecarregando o sistema de saúde.",
        effects: { saude: -10, economia: 3 },
        sectorEffects: { empresariado: 6, academicos: -11, populacao: -5 },
        leaning: 1,
      },
    ],
  },
  {
    id: "salario-minimo",
    title: "Aumento do Salário Mínimo",
    category: "economia",
    description:
      "Centrais sindicais pressionam por um reajuste real do salário mínimo acima da inflação. Empresários alertam para o impacto nos custos.",
    choices: [
      {
        id: "aumentar",
        label: "Conceder aumento real acima da inflação",
        consequence:
          "Trabalhadores comemoram um ganho histórico de poder de compra, mas pequenas empresas cortam contratações em massa.",
        effects: { popularidade: 13, economia: -8 },
        sectorEffects: { populacao: 14, empresariado: -14 },
        leaning: -2,
      },
      {
        id: "aumento-moderado",
        label: "Conceder reajuste real, mas moderado, com desoneração a pequenas empresas",
        consequence:
          "Ganho real menor, mas o impacto sobre o emprego é bem mais contido.",
        effects: { popularidade: 4, economia: -2 },
        sectorEffects: { populacao: 4, empresariado: -2 },
        leaning: 0,
      },
      {
        id: "reajuste-minimo",
        label: "Conceder apenas reposição da inflação",
        consequence:
          "Solução que evita grandes impactos econômicos, mas frustra duramente as expectativas dos trabalhadores.",
        effects: { economia: 2, popularidade: -4 },
        sectorEffects: { populacao: -7, empresariado: 5 },
        leaning: 1,
      },
    ],
  },
  {
    id: "cupula-clima",
    title: "Cúpula Internacional do Clima",
    category: "internacional",
    description:
      "Seu país é convidado a assumir metas ambiciosas de redução de emissões em uma cúpula global de clima, com prazos apertados.",
    choices: [
      {
        id: "assumir-metas",
        label: "Assumir metas ambiciosas de redução de emissões",
        consequence:
          "O país ganha enorme protagonismo internacional, mas setores industriais pressionam duramente contra os novos custos regulatórios.",
        effects: { relacoesInternacionais: 14, meioAmbiente: 10, economia: -7 },
        sectorEffects: { movimentosSociais: 13, academicos: 9, empresariado: -10 },
        leaning: -2,
      },
      {
        id: "metas-moderadas",
        label: "Assumir apenas metas moderadas",
        consequence:
          "Uma posição de meio-termo, sem grandes ganhos nem grandes perdas.",
        effects: { relacoesInternacionais: 4, meioAmbiente: 4 },
        sectorEffects: { empresariado: 4, movimentosSociais: -6 },
        leaning: 0,
      },
      {
        id: "recusar-metas",
        label: "Recusar metas e priorizar o crescimento imediato",
        consequence:
          "A indústria nacional respira aliviada, mas o país vira alvo de críticas internacionais e perde espaço diplomático.",
        effects: { relacoesInternacionais: -11, economia: 5, meioAmbiente: -6 },
        sectorEffects: { empresariado: 9, movimentosSociais: -10 },
        leaning: 2,
      },
    ],
  },
  {
    id: "motim-militar",
    title: "Tensão nas Forças Armadas",
    category: "seguranca",
    description:
      "Setores das Forças Armadas expressam publicamente insatisfação com cortes no orçamento militar, gerando um clima de tensão institucional.",
    choices: [
      {
        id: "manter-cortes",
        label: "Manter os cortes e reafirmar autoridade civil",
        consequence:
          "Você reforça o controle civil sobre os militares, mas a tensão institucional sobe a um nível perigoso.",
        effects: { governabilidade: -14, seguranca: -5 },
        sectorEffects: { militares: -15, academicos: 7, movimentosSociais: 6 },
        leaning: -1,
      },
      {
        id: "dialogo-institucional",
        label: "Abrir canal de negociação permanente, sem mudar o orçamento",
        consequence:
          "A tensão não escala, mas o problema de fundo permanece sem solução definitiva.",
        effects: { governabilidade: 2, seguranca: 1 },
        sectorEffects: { militares: 2 },
        leaning: 0,
      },
      {
        id: "aumentar-orcamento",
        label: "Aumentar o orçamento militar para apaziguar",
        consequence:
          "A tensão institucional desaparece, mas o gasto público aumenta e outras áreas ficam asfixiadas.",
        effects: { governabilidade: 13, seguranca: 6, economia: -10 },
        sectorEffects: { militares: 16, empresariado: -5 },
        leaning: 1,
      },
    ],
  },
  {
    id: "greve-professores",
    title: "Greve de Professores",
    category: "educacao",
    description:
      "Professores da rede pública entram em greve por salários defasados e falta de estrutura nas escolas. O ano letivo de milhões de alunos está em risco.",
    choices: [
      {
        id: "reajustar",
        label: "Conceder reajuste salarial integral para encerrar a greve",
        consequence:
          "As aulas voltam rápido e a categoria se sente plenamente valorizada, mas o orçamento da educação fica sufocado para o resto do ano.",
        effects: { educacao: 13, popularidade: 5, economia: -8 },
        sectorEffects: { academicos: 13, populacao: 6 },
        leaning: -1,
      },
      {
        id: "reajuste-parcial",
        label: "Conceder reajuste parcial imediato, com o restante parcelado",
        consequence:
          "A greve arrefece mais devagar, mas o rombo orçamentário é bem menor.",
        effects: { educacao: 5, economia: -2 },
        sectorEffects: { academicos: 4 },
        leaning: 0,
      },
      {
        id: "resistir-greve",
        label: "Não ceder e aguardar o desgaste da greve",
        consequence:
          "Você preserva o orçamento, mas o ano letivo é perdido em diversas escolas e a categoria fica profundamente ressentida.",
        effects: { educacao: -13, popularidade: -7 },
        sectorEffects: { academicos: -14, movimentosSociais: -6 },
        leaning: 2,
      },
    ],
  },
  {
    id: "universidades-publicas",
    title: "Corte de Bolsas em Universidades Públicas",
    category: "educacao",
    description:
      "A equipe econômica propõe cortar bolsas de pesquisa e assistência estudantil para equilibrar o orçamento. Reitores e estudantes alertam para o risco de evasão.",
    choices: [
      {
        id: "manter-bolsas",
        label: "Manter o financiamento integral das bolsas",
        consequence:
          "Universidades seguem funcionando plenamente e a comunidade acadêmica celebra, mas o ajuste fiscal fica bem mais difícil.",
        effects: { educacao: 10, economia: -7 },
        sectorEffects: { academicos: 14, movimentosSociais: 5 },
        leaning: -2,
      },
      {
        id: "corte-parcial-bolsas",
        label: "Cortar apenas o auxílio não essencial, mantendo bolsas de pesquisa",
        consequence:
          "Equilíbrio possível: economia real, sem atingir o núcleo da pesquisa científica.",
        effects: { educacao: -2, economia: 3 },
        sectorEffects: { academicos: -3 },
        leaning: 0,
      },
      {
        id: "cortar-bolsas",
        label: "Aplicar o corte proposto integralmente",
        consequence:
          "As contas públicas respiram, mas a evasão nas universidades federais dispara e a classe acadêmica se revolta.",
        effects: { educacao: -11, economia: 7 },
        sectorEffects: { academicos: -16, populacao: -3 },
        leaning: 2,
      },
    ],
  },
  {
    id: "tecnologia-escolas",
    title: "Programa de Tecnologia nas Escolas",
    category: "educacao",
    description:
      "Um projeto propõe levar tablets e internet de alta velocidade a escolas públicas de todo o país, com custo alto mas potencial de modernizar o ensino.",
    choices: [
      {
        id: "investir-tecnologia",
        label: "Lançar o programa em escala nacional",
        consequence:
          "O ensino público dá um salto de qualidade histórico, mas o investimento pesa muito no orçamento deste ano.",
        effects: { educacao: 16, popularidade: 5, economia: -11 },
        sectorEffects: { academicos: 11, empresariado: 5 },
        leaning: -1,
      },
      {
        id: "piloto-tecnologia",
        label: "Rodar um piloto reduzido em poucas escolas",
        consequence:
          "Custo controlado, mas o impacto na educação fica modesto e localizado.",
        effects: { educacao: 5, economia: -2 },
        sectorEffects: { academicos: 3 },
        leaning: 0,
      },
      {
        id: "parceria-tech",
        label: "Deixar a modernização a cargo de grandes empresas de tecnologia",
        consequence:
          "O Estado não gasta quase nada, mas o alcance e o ritmo do programa ficam reféns do interesse comercial das empresas.",
        effects: { educacao: 3, economia: 2 },
        sectorEffects: { empresariado: 9, academicos: -4 },
        leaning: 2,
      },
    ],
  },
  {
    id: "evasao-escolar",
    title: "Crise de Evasão Escolar",
    category: "educacao",
    description:
      "Dados mostram que milhares de adolescentes abandonaram a escola para trabalhar e ajudar no sustento da família durante a crise econômica.",
    choices: [
      {
        id: "bolsa-permanencia",
        label: "Criar bolsa de permanência escolar nacional para famílias de baixa renda",
        consequence:
          "A evasão despenca e famílias pobres recebem um alívio imediato, mas o programa exige um gasto social recorrente e alto.",
        effects: { educacao: 11, popularidade: 8, economia: -7 },
        sectorEffects: { populacao: 13, movimentosSociais: 8 },
        leaning: -2,
      },
      {
        id: "bolsa-piloto",
        label: "Lançar o programa como piloto em regiões prioritárias",
        consequence:
          "Resultado real nas regiões mais críticas, sem o custo total de um programa nacional.",
        effects: { educacao: 4, popularidade: 2, economia: -2 },
        sectorEffects: { populacao: 4 },
        leaning: 0,
      },
      {
        id: "sem-programa",
        label: "Deixar a questão para os governos estaduais resolverem",
        consequence:
          "Você evita o gasto federal, mas a evasão escolar continua subindo e cobra um preço educacional alto no longo prazo.",
        effects: { educacao: -10, popularidade: -4 },
        sectorEffects: { populacao: -7 },
        leaning: 1,
      },
    ],
  },
  {
    id: "moradia-popular",
    title: "Ocupações por Moradia",
    category: "social",
    description:
      "Famílias sem-teto ocupam terrenos ociosos em grandes cidades, reivindicando um programa habitacional. Proprietários pedem reintegração de posse imediata.",
    choices: [
      {
        id: "programa-habitacional",
        label: "Lançar programa habitacional amplo e negociar a saída pacífica",
        consequence:
          "As famílias saem das ocupações com destino garantido e o governo ganha forte apoio popular, mas o programa é muito caro.",
        effects: { popularidade: 11, economia: -10 },
        sectorEffects: { populacao: 14, movimentosSociais: 11, empresariado: -6 },
        leaning: -2,
      },
      {
        id: "programa-reduzido",
        label: "Programa reduzido, priorizando famílias com crianças",
        consequence:
          "Parte das ocupações se resolve com dignidade; as demais famílias são removidas sob protesto.",
        effects: { popularidade: -2, economia: -3 },
        sectorEffects: { populacao: 2, movimentosSociais: -3 },
        leaning: 0,
      },
      {
        id: "reintegracao-posse",
        label: "Determinar reintegração de posse imediata",
        consequence:
          "A propriedade privada é respeitada e o empresariado aprova com força, mas as cenas de remoção forçada chocam o país.",
        effects: { popularidade: -13, seguranca: 3 },
        sectorEffects: { empresariado: 11, movimentosSociais: -16, populacao: -8 },
        leaning: 2,
      },
    ],
  },
  {
    id: "greve-geral",
    title: "Greve Geral dos Trabalhadores",
    category: "social",
    description:
      "Centrais sindicais convocam uma greve geral contra uma proposta de reforma trabalhista que tramita no Congresso, paralisando transporte e indústrias.",
    choices: [
      {
        id: "negociar-reforma",
        label: "Suspender a tramitação e abrir negociação com os sindicatos",
        consequence:
          "A greve é suspensa e os trabalhadores passam a ver o governo como aliado, mas setores empresariais acusam o governo de recuo covarde.",
        effects: { popularidade: 8, governabilidade: -5 },
        sectorEffects: { movimentosSociais: 14, populacao: 6, empresariado: -10 },
        leaning: -1,
      },
      {
        id: "reforma-com-emendas",
        label: "Aprovar a reforma com emendas que suavizam os pontos mais criticados",
        consequence:
          "Nenhum lado fica plenamente satisfeito, mas a tensão social baixa consideravelmente.",
        effects: { economia: -1, popularidade: -2 },
        sectorEffects: { empresariado: -2, movimentosSociais: -2 },
        leaning: 0,
      },
      {
        id: "manter-reforma",
        label: "Manter a reforma e deixar a greve seguir seu curso",
        consequence:
          "O mercado reage muito bem à firmeza do governo, mas a paralisação prolongada gera grandes perdas econômicas e desgasta sua imagem.",
        effects: { economia: -7, popularidade: -10 },
        sectorEffects: { empresariado: 10, movimentosSociais: -14, populacao: -5 },
        leaning: 2,
        triggersEventId: "protesto-popular",
      },
    ],
  },
  {
    id: "violencia-domestica",
    title: "Crise de Violência contra a Mulher",
    category: "social",
    description:
      "Dados mostram aumento alarmante de casos de violência doméstica. Organizações de defesa dos direitos das mulheres pedem ação federal urgente.",
    choices: [
      {
        id: "rede-protecao",
        label: "Criar rede nacional de proteção e delegacias especializadas",
        consequence:
          "A medida salva vidas no médio prazo e é muito bem recebida, mas exige investimento contínuo e estruturação rápida.",
        effects: { seguranca: 7, popularidade: 10, economia: -7 },
        sectorEffects: { movimentosSociais: 16, populacao: 8 },
        leaning: -1,
      },
      {
        id: "ampliar-existente",
        label: "Ampliar apenas as delegacias especializadas já existentes",
        consequence:
          "Avanço real, mas sem a cobertura nacional de uma rede inteiramente nova.",
        effects: { seguranca: 3, economia: -2 },
        sectorEffects: { movimentosSociais: 5 },
        leaning: 0,
      },
      {
        id: "campanha-sem-estrutura",
        label: "Lançar apenas uma campanha de conscientização, sem nova estrutura",
        consequence:
          "O gesto simbólico custa pouco, mas organizações de defesa das mulheres denunciam a falta de ação concreta.",
        effects: { popularidade: -5 },
        sectorEffects: { movimentosSociais: -11 },
        leaning: 1,
      },
    ],
  },
  {
    id: "fome-crise",
    title: "Aumento da Fome e Insegurança Alimentar",
    category: "social",
    description:
      "Levantamentos apontam que milhões de famílias voltaram a enfrentar insegurança alimentar. Movimentos sociais pedem a retomada de programas de distribuição de renda e alimentos.",
    choices: [
      {
        id: "expandir-programas",
        label: "Expandir amplamente programas de transferência de renda e distribuição de alimentos",
        consequence:
          "A fome recua com força e o governo ganha um apoio popular enorme, mas o gasto social pressiona duramente as contas públicas.",
        effects: { popularidade: 14, economia: -11 },
        sectorEffects: { populacao: 16, movimentosSociais: 9 },
        leaning: -2,
      },
      {
        id: "expansao-focalizada",
        label: "Expandir os programas apenas nas regiões mais críticas",
        consequence:
          "Alívio real onde dói mais, com impacto fiscal bem mais controlado.",
        effects: { popularidade: 5, economia: -4 },
        sectorEffects: { populacao: 6 },
        leaning: 0,
      },
      {
        id: "ajuda-pontual",
        label: "Manter apenas ajuda pontual e emergencial",
        consequence:
          "O impacto fiscal é pequeno, mas a fome continua corroendo famílias vulneráveis e a crítica social cresce.",
        effects: { economia: 3, popularidade: -10 },
        sectorEffects: { populacao: -10, movimentosSociais: -8 },
        leaning: 1,
      },
    ],
  },
  {
    id: "vacina-obrigatoria",
    title: "Campanha de Vacinação Obrigatória",
    category: "saude",
    description:
      "Diante da queda nas taxas de imunização infantil, o Ministério da Saúde propõe tornar um conjunto de vacinas obrigatório, o que enfrenta resistência de grupos antivacina.",
    choices: [
      {
        id: "tornar-obrigatoria",
        label: "Tornar a vacinação obrigatória por lei em todo o país",
        consequence:
          "As taxas de imunização sobem rapidamente, mas grupos antivacina organizam protestos intensos contra a medida.",
        effects: { saude: 14, popularidade: -5 },
        sectorEffects: { academicos: 9, movimentosSociais: -5 },
        leaning: -1,
      },
      {
        id: "obrigatoria-escolas",
        label: "Tornar obrigatória apenas para matrícula em escolas públicas",
        consequence:
          "Cobertura melhora de forma relevante, com resistência política bem menor.",
        effects: { saude: 6, popularidade: -1 },
        sectorEffects: { academicos: 3 },
        leaning: 0,
      },
      {
        id: "campanha-voluntaria",
        label: "Manter a vacinação voluntária com campanha de incentivo",
        consequence:
          "Você evita o atrito político, mas a cobertura vacinal melhora muito pouco e o risco de surtos segue alto.",
        effects: { saude: 3 },
        sectorEffects: { academicos: 1 },
        leaning: 1,
      },
    ],
  },
  {
    id: "fila-cirurgias",
    title: "Fila de Cirurgias Eletivas",
    category: "saude",
    description:
      "A fila por cirurgias eletivas no sistema público ultrapassa um milhão de pacientes. Pacientes e associações médicas pressionam por uma solução rápida.",
    choices: [
      {
        id: "mutirao-cirurgico",
        label: "Financiar mutirões cirúrgicos emergenciais em toda a rede pública",
        consequence:
          "A fila diminui com força e pacientes agradecem, mas o custo extra pesa bastante no orçamento da saúde.",
        effects: { saude: 14, popularidade: 6, economia: -8 },
        sectorEffects: { populacao: 9, academicos: 4 },
        leaning: -1,
      },
      {
        id: "mutirao-parceria",
        label: "Financiar mutirões por parceria com hospitais privados",
        consequence:
          "Redução real da fila com custo dividido, embora alimente críticas sobre terceirização da saúde pública.",
        effects: { saude: 7, economia: -2 },
        sectorEffects: { empresariado: 5, populacao: 3 },
        leaning: 0,
      },
      {
        id: "triagem-criterios",
        label: "Apenas endurecer os critérios de triagem para conter a demanda",
        consequence:
          "O gasto público é controlado, mas pacientes esperam ainda mais e a insatisfação cresce muito.",
        effects: { saude: -9, popularidade: -7 },
        sectorEffects: { populacao: -9 },
        leaning: 1,
      },
    ],
  },
  {
    id: "inflacao-alimentos",
    title: "Disparada do Preço dos Alimentos",
    category: "economia",
    description:
      "Uma quebra de safra combinada à alta do dólar faz o preço dos alimentos básicos subir de forma acelerada, pressionando o orçamento das famílias.",
    choices: [
      {
        id: "controle-precos",
        label: "Impor controle amplo de preços sobre itens básicos",
        consequence:
          "As famílias sentem alívio imediato forte, mas produtores reduzem a oferta e economistas alertam para desabastecimento futuro.",
        effects: { popularidade: 10, economia: -8 },
        sectorEffects: { populacao: 11, empresariado: -13 },
        leaning: -2,
      },
      {
        id: "subsidio-cesta-basica",
        label: "Subsidiar temporariamente a cesta básica, sem controle geral de preços",
        consequence:
          "Alívio real e focado, sem distorcer todo o mercado de alimentos.",
        effects: { popularidade: 5, economia: -4 },
        sectorEffects: { populacao: 5 },
        leaning: 0,
      },
      {
        id: "livre-mercado",
        label: "Deixar o mercado se ajustar livremente",
        consequence:
          "A oferta se normaliza com o tempo, mas o custo de vida pesadíssimo no curto prazo gera forte insatisfação popular.",
        effects: { economia: 5, popularidade: -11 },
        sectorEffects: { empresariado: 8, populacao: -11 },
        leaning: 2,
      },
    ],
  },
  {
    id: "crime-organizado",
    title: "Avanço do Crime Organizado",
    category: "seguranca",
    description:
      "Facções criminosas ampliam o controle territorial em periferias e estradas, desafiando abertamente a autoridade do Estado em diversas regiões.",
    choices: [
      {
        id: "investimento-social-periferia",
        label: "Priorizar investimento social e presença do Estado nas periferias",
        consequence:
          "A estratégia reduz a adesão ao crime no longo prazo, mas não traz resultados imediatos e a crítica por fraqueza cresce.",
        effects: { seguranca: -5, popularidade: -5, educacao: 5 },
        sectorEffects: { populacao: 10, movimentosSociais: 10, militares: -6 },
        leaning: -2,
      },
      {
        id: "reforco-pontual",
        label: "Reforçar o policiamento em áreas críticas, sem operação de grande escala",
        consequence:
          "Ganho de segurança localizado, sem o custo e o risco de uma operação ampla.",
        effects: { seguranca: 4, economia: -2 },
        sectorEffects: { militares: 3 },
        leaning: 0,
      },
      {
        id: "operacao-militar",
        label: "Lançar operação militar de grande escala",
        consequence:
          "O Estado reage com força total e recupera território, mas a operação é cara e eleva muito o risco de confrontos violentos.",
        effects: { seguranca: 14, economia: -8, popularidade: -3 },
        sectorEffects: { militares: 13, populacao: -7 },
        leaning: 2,
        triggersEventId: "motim-militar",
      },
    ],
  },
  {
    id: "disputa-territorial",
    title: "Disputa Territorial com País Vizinho",
    category: "internacional",
    description:
      "Um país vizinho reivindica uma faixa de fronteira rica em recursos naturais, aumentando a tensão diplomática e pressão por uma resposta firme.",
    choices: [
      {
        id: "via-diplomatica",
        label: "Buscar mediação internacional e resolver pela via diplomática",
        consequence:
          "O conflito é contido sem custos militares e o país ganha reputação de maturidade diplomática, mas parte da opinião pública vê isso como fraqueza.",
        effects: { relacoesInternacionais: 11, popularidade: -5 },
        sectorEffects: { politicos: 4, empresariado: 3 },
        leaning: -1,
      },
      {
        id: "diplomacia-com-presenca",
        label: "Reforçar a diplomacia com presença militar discreta na fronteira",
        consequence:
          "Postura equilibrada: negociação segue aberta, mas sem parecer fraqueza.",
        effects: { relacoesInternacionais: 3, seguranca: 2 },
        sectorEffects: { militares: 3 },
        leaning: 0,
      },
      {
        id: "mostrar-forca",
        label: "Reforçar amplamente a presença militar na fronteira",
        consequence:
          "A postura firme agrada fortemente a opinião pública interna, mas eleva muito a tensão com o vizinho e preocupa parceiros internacionais.",
        effects: { seguranca: 5, popularidade: 7, relacoesInternacionais: -10 },
        sectorEffects: { militares: 11, politicos: -5 },
        leaning: 2,
      },
    ],
  },
  {
    id: "confronto-poderes",
    title: "Confronto entre Poderes",
    category: "institucional",
    description:
      "Uma decisão do Supremo Tribunal contraria uma política central do seu governo. Aliados pressionam por uma reação dura contra o Judiciário.",
    choices: [
      {
        id: "respeitar-decisao",
        label: "Respeitar publicamente a decisão da Corte",
        consequence:
          "As instituições saem fortalecidas e você ganha respeito como democrata, mas parte da sua base se sente profundamente traída.",
        effects: { governabilidade: -7, popularidade: 7 },
        sectorEffects: { academicos: 11, politicos: -8 },
        leaning: -1,
      },
      {
        id: "reforma-institucional",
        label: "Respeitar a decisão, mas propor reforma institucional futura por via legal",
        consequence:
          "Você mantém a legalidade intacta e sinaliza mudança, sem confronto aberto com a Corte.",
        effects: { governabilidade: 1, popularidade: 2 },
        sectorEffects: { politicos: 1 },
        leaning: 0,
      },
      {
        id: "pressionar-judiciario",
        label: "Articular no Congresso para limitar os poderes da Corte",
        consequence:
          "Sua base aliada se anima muito com a reação, mas o episódio é lido como ataque à democracia e gera forte repercussão negativa.",
        effects: { governabilidade: 8, popularidade: -14, relacoesInternacionais: -7 },
        sectorEffects: { politicos: 13, academicos: -14, movimentosSociais: -8 },
        leaning: 2,
        triggersEventId: "cpi-investigacao",
      },
    ],
  },
  {
    id: "divida-publica",
    title: "Explosão da Dívida Pública",
    category: "economia",
    description:
      "Os juros da dívida pública disparam e agências de risco ameaçam rebaixar a nota de crédito do país, pressionando por uma resposta imediata.",
    choices: [
      {
        id: "renegociar",
        label: "Renegociar prazos com os credores",
        consequence:
          "A crise imediata é contida sem cortes drásticos, mas o país aceita juros bem mais altos no longo prazo.",
        effects: { economia: 7, governabilidade: -5 },
        sectorEffects: { empresariado: -7, politicos: -5 },
        leaning: -1,
      },
      {
        id: "ajuste-gradual",
        label: "Combinar ajuste fiscal gradual com renegociação parcial da dívida",
        consequence:
          "Caminho mais lento, mas evita tanto o choque social quanto o calote de reputação.",
        effects: { economia: 6, popularidade: -3 },
        sectorEffects: { empresariado: 2, populacao: -2 },
        leaning: 0,
      },
      {
        id: "ajuste-fiscal",
        label: "Impor um ajuste fiscal duro e imediato",
        consequence:
          "O risco de calote desaparece e o mercado aprova com força, mas o corte de gastos sociais pesa duramente sobre a população.",
        effects: { economia: 14, popularidade: -13 },
        sectorEffects: { empresariado: 11, populacao: -13 },
        leaning: 2,
      },
    ],
  },
  {
    id: "especulacao-cambial",
    title: "Especulação Cambial",
    category: "economia",
    description:
      "Uma onda especulativa derruba o valor da moeda nacional, ameaçando disparar a inflação de produtos e insumos importados.",
    choices: [
      {
        id: "intervir-cambio",
        label: "Usar as reservas internacionais para intervir pesadamente no câmbio",
        consequence:
          "A moeda se estabiliza rapidamente, mas o país consome uma parte valiosa e irrecuperável de suas reservas.",
        effects: { economia: 7, relacoesInternacionais: 3 },
        sectorEffects: { empresariado: 8 },
        leaning: -1,
      },
      {
        id: "intervencao-limitada",
        label: "Intervir de forma limitada e temporária no câmbio",
        consequence:
          "Amortece o pior do choque sem esvaziar as reservas internacionais do país.",
        effects: { economia: 3 },
        sectorEffects: { empresariado: 3 },
        leaning: 0,
      },
      {
        id: "deixar-flutuar",
        label: "Deixar a moeda flutuar totalmente livre",
        consequence:
          "As reservas internacionais ficam intactas, mas a inflação de produtos importados pressiona duramente o bolso da população.",
        effects: { economia: -8, popularidade: -7 },
        sectorEffects: { populacao: -8, empresariado: 5 },
        leaning: 1,
      },
    ],
  },
  {
    id: "trafico-fronteira",
    title: "Tráfico na Fronteira",
    category: "seguranca",
    description:
      "Relatórios de inteligência apontam forte aumento do tráfico de armas e drogas pelas fronteiras terrestres do país, abastecendo o crime organizado urbano.",
    choices: [
      {
        id: "cooperacao-inteligencia",
        label: "Investir em cooperação de inteligência regional",
        consequence:
          "A solução é bem mais barata e sustentável, mas os resultados demoram a aparecer.",
        effects: { seguranca: 5, relacoesInternacionais: 7 },
        sectorEffects: { militares: 3 },
        leaning: -1,
      },
      {
        id: "reforco-misto",
        label: "Combinar policiamento federal reforçado com cooperação regional",
        consequence:
          "Resultado mais equilibrado, com custo moderado e ganhos visíveis já no curto prazo.",
        effects: { seguranca: 7, economia: -2, relacoesInternacionais: 2 },
        sectorEffects: { militares: 5 },
        leaning: 0,
      },
      {
        id: "mobilizar-tropas",
        label: "Mobilizar tropas do Exército para reforçar a fronteira",
        consequence:
          "O fluxo ilegal cai com força e rapidez, mas a operação é cara e gera forte atrito diplomático com países vizinhos.",
        effects: { seguranca: 14, economia: -8, relacoesInternacionais: -5 },
        sectorEffects: { militares: 13 },
        leaning: 2,
      },
    ],
  },
  {
    id: "sequestro-politico",
    title: "Sequestro de um Diplomata",
    category: "seguranca",
    description:
      "Um grupo armado sequestra um embaixador estrangeiro em solo nacional, exigindo resgate e a libertação de presos políticos.",
    choices: [
      {
        id: "negociar-refem",
        label: "Abrir negociação para garantir a libertação do refém",
        consequence:
          "O diplomata é libertado em segurança, mas ceder às exigências fortalece perigosamente grupos armados no país.",
        effects: { relacoesInternacionais: 8, seguranca: -10 },
        sectorEffects: { militares: -8 },
        leaning: -1,
      },
      {
        id: "negociacao-tatica",
        label: "Negociar sob pressão, com forças especiais de prontidão",
        consequence:
          "Caminho mais cauteloso: aumenta a chance de um desfecho seguro sem ceder tanto quanto uma negociação aberta.",
        effects: { relacoesInternacionais: 3, seguranca: -2 },
        sectorEffects: { militares: 2 },
        leaning: 0,
      },
      {
        id: "operacao-resgate",
        label: "Autorizar uma operação de resgate à força",
        consequence:
          "A operação demonstra firmeza total do Estado, mas arrisca a vida do refém e provoca retaliação do grupo.",
        effects: { seguranca: 7, relacoesInternacionais: -7 },
        sectorEffects: { militares: 9 },
        leaning: 2,
        triggersEventId: "ataque-cibernetico",
      },
    ],
  },
  {
    id: "escassez-medicamentos",
    title: "Escassez de Medicamentos Essenciais",
    category: "saude",
    description:
      "Uma crise na cadeia de suprimentos global provoca desabastecimento de medicamentos essenciais nas farmácias da rede pública.",
    choices: [
      {
        id: "importar-genericos",
        label: "Importar emergencialmente genéricos de outros fornecedores",
        consequence:
          "O abastecimento é restabelecido rapidamente, mas a importação emergencial custa muito caro aos cofres públicos.",
        effects: { saude: 13, economia: -8 },
        sectorEffects: { populacao: 8, empresariado: -3 },
        leaning: -1,
      },
      {
        id: "importacao-parcial",
        label: "Importar de forma focada só os medicamentos mais críticos",
        consequence:
          "Cobre o essencial com custo bem mais controlado, deixando lacunas em itens secundários.",
        effects: { saude: 6, economia: -3 },
        sectorEffects: { populacao: 3 },
        leaning: 0,
      },
      {
        id: "racionar-estoque",
        label: "Racionar o estoque existente pelos casos mais graves",
        consequence:
          "O orçamento é preservado, mas pacientes com doenças crônicas sofrem duramente com a falta de medicamentos contínuos.",
        effects: { saude: -8, popularidade: -7 },
        sectorEffects: { populacao: -8 },
        leaning: 1,
      },
    ],
  },
  {
    id: "saude-mental",
    title: "Crise de Saúde Mental",
    category: "saude",
    description:
      "Levantamentos mostram disparada nos casos de ansiedade e depressão na população, sobrecarregando um sistema de saúde mental já escasso.",
    choices: [
      {
        id: "expandir-caps",
        label: "Expandir amplamente a rede de Centros de Atenção Psicossocial",
        consequence:
          "O atendimento melhora de forma marcante em todo o país, mas a expansão da rede exige investimento contínuo e alto.",
        effects: { saude: 11, popularidade: 5, economia: -7 },
        sectorEffects: { populacao: 9, academicos: 6 },
        leaning: -1,
      },
      {
        id: "expansao-urbana",
        label: "Expandir a rede priorizando grandes centros urbanos",
        consequence:
          "Cobertura real onde a demanda é maior, mas regiões afastadas continuam desassistidas.",
        effects: { saude: 5, economia: -3 },
        sectorEffects: { populacao: 4 },
        leaning: 0,
      },
      {
        id: "resposta-minima-saude-mental",
        label: "Manter apenas o atendimento básico atual",
        consequence:
          "O orçamento não é afetado, mas a demanda reprimida continua crescendo e sobrecarregando postos de saúde.",
        effects: { saude: -7 },
        sectorEffects: { populacao: -5 },
        leaning: 1,
      },
    ],
  },
  {
    id: "ensino-tecnico",
    title: "Expansão do Ensino Técnico",
    category: "educacao",
    description:
      "Especialistas defendem investir pesado em escolas técnicas para qualificar mão de obra e reduzir o desemprego entre os jovens.",
    choices: [
      {
        id: "investir-tecnico",
        label: "Lançar um grande programa nacional de ensino técnico",
        consequence:
          "A qualificação profissional avança com força e o mercado de trabalho reage muito bem, mas o investimento inicial é alto.",
        effects: { educacao: 14, economia: 5, popularidade: 5 },
        sectorEffects: { empresariado: 8, academicos: 6 },
        leaning: -1,
      },
      {
        id: "modelo-misto",
        label: "Combinar bolsas públicas com incentivo fiscal a escolas privadas",
        consequence:
          "Expansão real, dividindo o custo entre o Estado e o setor privado.",
        effects: { educacao: 6, economia: 1 },
        sectorEffects: { empresariado: 4, academicos: 2 },
        leaning: 0,
      },
      {
        id: "iniciativa-privada",
        label: "Deixar a expansão a cargo de instituições privadas, com incentivo fiscal",
        consequence:
          "O custo para o Estado é baixo, mas o alcance fica limitado a quem pode pagar ou mora perto das unidades privadas.",
        effects: { educacao: 4, economia: -3 },
        sectorEffects: { empresariado: 9, academicos: -3 },
        leaning: 2,
      },
    ],
  },
  {
    id: "livro-didatico",
    title: "Escândalo nos Livros Didáticos",
    category: "educacao",
    description:
      "Uma distribuidora é flagrada fornecendo livros didáticos com erros grosseiros de conteúdo para escolas públicas, gerando revolta de pais e professores.",
    choices: [
      {
        id: "recall-livros",
        label: "Determinar o recall imediato e a reimpressão de todos os livros",
        consequence:
          "O problema é corrigido por completo e a confiança das famílias é plenamente restaurada, mas o recall custa muito caro e às pressas.",
        effects: { educacao: 9, popularidade: 6, economia: -7 },
        sectorEffects: { academicos: 9, populacao: 4 },
        leaning: -1,
      },
      {
        id: "recall-parcial",
        label: "Fazer o recall apenas dos capítulos com erros mais graves",
        consequence:
          "Resolve o pior do estrago com um custo bem menor que a reimpressão total.",
        effects: { educacao: 3, economia: -2 },
        sectorEffects: { academicos: 2 },
        leaning: 0,
      },
      {
        id: "correcao-gradual",
        label: "Corrigir o material apenas na próxima licitação",
        consequence:
          "O orçamento é preservado, mas os erros continuam em sala de aula por mais um ano letivo inteiro.",
        effects: { educacao: -7, popularidade: -5 },
        sectorEffects: { academicos: -8 },
        leaning: 1,
      },
    ],
  },
  {
    id: "mineracao-ilegal",
    title: "Garimpo Ilegal em Terras Indígenas",
    category: "ambiental",
    description:
      "Imagens de satélite revelam avanço do garimpo ilegal em terras indígenas protegidas, contaminando rios da região com mercúrio.",
    choices: [
      {
        id: "operacao-desintrusao",
        label: "Lançar uma operação de desintrusão e fiscalização ambiental",
        consequence:
          "A área é retomada e a contaminação é contida por completo, mas a operação é cara e enfrenta resistência armada no local.",
        effects: { meioAmbiente: 14, relacoesInternacionais: 5, economia: -5 },
        sectorEffects: { movimentosSociais: 14, militares: 3, empresariado: -8 },
        leaning: -2,
      },
      {
        id: "fiscalizacao-com-prazo",
        label: "Fiscalizar ostensivamente, com prazo de regularização para quem sair",
        consequence:
          "Reduz a contaminação de forma gradual, evitando um confronto armado imediato.",
        effects: { meioAmbiente: 5, economia: -2 },
        sectorEffects: { empresariado: -3, movimentosSociais: 4 },
        leaning: 0,
      },
      {
        id: "tolerar-garimpo",
        label: "Tolerar a atividade, citando sua importância econômica local",
        consequence:
          "Comunidades que dependem do garimpo comemoram, mas a contaminação avança forte e o país é duramente criticado internacionalmente.",
        effects: { meioAmbiente: -14, relacoesInternacionais: -8, economia: 5 },
        sectorEffects: { empresariado: 8, movimentosSociais: -14 },
        leaning: 2,
      },
    ],
  },
  {
    id: "poluicao-industrial",
    title: "Poluição Industrial em Rio",
    category: "ambiental",
    description:
      "Um grande polo industrial é flagrado despejando resíduos tóxicos em um rio que abastece várias cidades da região.",
    choices: [
      {
        id: "multar-regular",
        label: "Multar pesadamente as empresas e exigir novo tratamento de efluentes já",
        consequence:
          "O rio começa a se recuperar rápido e a população se sente protegida, mas as empresas ameaçam cortar postos de trabalho em massa.",
        effects: { meioAmbiente: 11, popularidade: 6, economia: -5 },
        sectorEffects: { empresariado: -11, movimentosSociais: 9, populacao: 6 },
        leaning: -1,
      },
      {
        id: "prazo-intermediario",
        label: "Multar com prazo intermediário de adequação",
        consequence:
          "Equilíbrio entre punição e tempo de ajuste, sem o risco de fechamento imediato das fábricas.",
        effects: { meioAmbiente: 4, economia: -1 },
        sectorEffects: { empresariado: -3 },
        leaning: 0,
      },
      {
        id: "proteger-empregos",
        label: "Negociar prazo bem mais longo de adequação para proteger os empregos locais",
        consequence:
          "Os empregos são mantidos no curto prazo, mas a contaminação do rio continua afetando duramente a saúde das comunidades vizinhas.",
        effects: { meioAmbiente: -8, economia: 3 },
        sectorEffects: { empresariado: 8, movimentosSociais: -8 },
        leaning: 2,
      },
    ],
  },
  {
    id: "sancao-economica",
    title: "Sanções Internacionais",
    category: "internacional",
    description:
      "Uma potência econômica ameaça impor sanções comerciais caso o país não revise uma política interna considerada controversa no exterior.",
    choices: [
      {
        id: "ceder-pressao",
        label: "Ajustar integralmente a política para evitar as sanções",
        consequence:
          "As relações comerciais são preservadas por completo, mas parte da sua base acusa o governo de curvar-se à pressão estrangeira.",
        effects: { relacoesInternacionais: 13, governabilidade: -8 },
        sectorEffects: { empresariado: 6, politicos: -8 },
        leaning: -1,
      },
      {
        id: "ajuste-parcial-sancoes",
        label: "Ajustar parcialmente a política, sem ceder integralmente",
        consequence:
          "Reduz o risco de sanções sem parecer uma rendição completa à pressão externa.",
        effects: { relacoesInternacionais: 4, governabilidade: -2 },
        sectorEffects: { empresariado: 2 },
        leaning: 0,
      },
      {
        id: "resistir-sancoes",
        label: "Resistir e aceitar o risco das sanções em nome da soberania",
        consequence:
          "O discurso de soberania nacional agrada fortemente parte da população, mas as sanções atingem com dureza a economia.",
        effects: { relacoesInternacionais: -14, economia: -10, popularidade: 7 },
        sectorEffects: { politicos: 8, empresariado: -10 },
        leaning: 2,
      },
    ],
  },
  {
    id: "refugiados-guerra",
    title: "Chegada de Refugiados de Guerra",
    category: "internacional",
    description:
      "Um conflito armado em outro continente gera uma onda de pedidos de refúgio no país, dividindo fortemente a opinião pública.",
    choices: [
      {
        id: "acolhimento-amplo",
        label: "Ampliar amplamente vagas de acolhimento humanitário e agilizar vistos",
        consequence:
          "O país é elogiado internacionalmente por sua postura humanitária, mas parte da população teme o colapso dos serviços locais.",
        effects: { relacoesInternacionais: 11, popularidade: -5 },
        sectorEffects: { movimentosSociais: 13, academicos: 5, populacao: -6 },
        leaning: -2,
      },
      {
        id: "acolhimento-cotas",
        label: "Acolher por cotas, com triagem mais rigorosa",
        consequence:
          "Equilíbrio entre acolhimento humanitário e controle do fluxo, sem agradar plenamente nenhum lado.",
        effects: { relacoesInternacionais: 4 },
        sectorEffects: { movimentosSociais: 2, populacao: -1 },
        leaning: 0,
      },
      {
        id: "vistos-limitados",
        label: "Limitar fortemente a concessão de novos vistos de refúgio",
        consequence:
          "Parte da população local aprova a medida com força, mas o país perde muito prestígio e é criticado por organismos internacionais.",
        effects: { relacoesInternacionais: -10, popularidade: 4 },
        sectorEffects: { movimentosSociais: -11, populacao: 5 },
        leaning: 2,
      },
    ],
  },
  {
    id: "reforma-eleitoral",
    title: "Reforma do Sistema Eleitoral",
    category: "institucional",
    description:
      "Parlamentares debatem uma reforma eleitoral ampla, que mudaria regras de financiamento de campanha e a cláusula de barreira para partidos pequenos.",
    choices: [
      {
        id: "apoiar-reforma",
        label: "Apoiar publicamente a reforma inteira, mesmo contra parte da sua base",
        consequence:
          "O sistema político ganha muito em transparência e você é visto como estadista, mas perde apoio de aliados que temem a mudança.",
        effects: { governabilidade: -10, popularidade: 8 },
        sectorEffects: { politicos: -11, academicos: 8 },
        leaning: -1,
      },
      {
        id: "apoiar-pontual",
        label: "Apoiar apenas pontos específicos da reforma",
        consequence:
          "Avanço parcial, sem comprar integralmente a briga nem rejeitar a mudança por completo.",
        effects: { governabilidade: -2, popularidade: 2 },
        sectorEffects: { politicos: -2 },
        leaning: 0,
      },
      {
        id: "manter-regras",
        label: "Articular para manter as regras eleitorais atuais",
        consequence:
          "Sua base aliada se fortalece bastante, mas críticos acusam o governo de blindar o próprio sistema contra renovação política.",
        effects: { governabilidade: 10, popularidade: -7 },
        sectorEffects: { politicos: 11, academicos: -7 },
        leaning: 1,
      },
    ],
  },
  {
    id: "vazamento-dados",
    title: "Vazamento de Dados do Governo",
    category: "institucional",
    description:
      "Hackers vazam dados sigilosos de milhões de cidadãos armazenados em sistemas federais, expondo falhas graves de segurança digital no governo.",
    choices: [
      {
        id: "transparencia-total",
        label: "Divulgar publicamente toda a extensão do vazamento e as medidas corretivas",
        consequence:
          "A transparência total é bem recebida pela opinião pública especializada, mas expõe duramente a fragilidade da infraestrutura digital do governo.",
        effects: { popularidade: 5, governabilidade: -7 },
        sectorEffects: { academicos: 8, politicos: -7 },
        leaning: -1,
      },
      {
        id: "divulgacao-tecnica",
        label: "Divulgar um relatório técnico restrito a especialistas, sem exposição pública ampla",
        consequence:
          "Mantém algum controle de narrativa, embora corra o risco de parecer insuficientemente transparente.",
        effects: { popularidade: -2, governabilidade: -1 },
        sectorEffects: { academicos: 2 },
        leaning: 0,
      },
      {
        id: "minimizar-vazamento",
        label: "Minimizar publicamente o ocorrido e evitar detalhes",
        consequence:
          "O desgaste imediato é menor, mas a fragilidade de segurança não é corrigida e volta a ser explorada.",
        effects: { popularidade: -11, governabilidade: 3 },
        sectorEffects: { academicos: -11 },
        leaning: 1,
        triggersEventId: "ataque-cibernetico",
      },
    ],
  },
  {
    id: "racismo-estrutural",
    title: "Crise por Racismo Estrutural",
    category: "social",
    description:
      "Um caso de violência policial com forte recorte racial viraliza nas redes e gera protestos nacionais por políticas de reparação histórica.",
    choices: [
      {
        id: "cotas-reparacao",
        label: "Anunciar amplas políticas afirmativas e de reparação histórica",
        consequence:
          "Movimentos sociais comemoram um avanço histórico, mas a medida enfrenta forte resistência de parte do Congresso.",
        effects: { popularidade: 8, governabilidade: -5 },
        sectorEffects: { movimentosSociais: 16, populacao: 6, politicos: -6 },
        leaning: -2,
      },
      {
        id: "comissao-dialogo",
        label: "Criar comissão de estudos e diálogo, sem anunciar políticas imediatas",
        consequence:
          "Gesto institucional reconhecido, mas insuficiente para quem pedia ação imediata.",
        effects: { popularidade: -1 },
        sectorEffects: { movimentosSociais: -2, academicos: 3 },
        leaning: 0,
      },
      {
        id: "sem-nova-politica",
        label: "Não anunciar novas políticas, tratando o caso como isolado",
        consequence:
          "Parte do Congresso respira aliviada, mas os protestos se intensificam com força e o governo é acusado de omissão.",
        effects: { popularidade: -10 },
        sectorEffects: { movimentosSociais: -14, populacao: -5 },
        leaning: 2,
      },
    ],
  },
  {
    id: "idosos-abandono",
    title: "Crise nos Asilos",
    category: "social",
    description:
      "Uma investigação jornalística revela negligência grave em instituições de longa permanência para idosos, incluindo subnutrição e maus-tratos.",
    choices: [
      {
        id: "fiscalizacao-rigorosa",
        label: "Criar um programa nacional de fiscalização e investir em casas de acolhimento públicas",
        consequence:
          "Os casos de negligência despencam e famílias ganham uma alternativa pública confiável, mas o programa exige orçamento contínuo e alto.",
        effects: { saude: 6, popularidade: 9, economia: -7 },
        sectorEffects: { populacao: 11, movimentosSociais: 8 },
        leaning: -1,
      },
      {
        id: "fiscalizacao-repasse",
        label: "Fiscalização federal mínima combinada com repasse financeiro aos estados",
        consequence:
          "Melhora parcial, dependendo de como cada estado usa o repasse.",
        effects: { saude: 2, popularidade: 2, economia: -2 },
        sectorEffects: { populacao: 3 },
        leaning: 0,
      },
      {
        id: "fiscalizacao-minima",
        label: "Deixar a fiscalização a cargo dos governos estaduais, sem novo investimento federal",
        consequence:
          "O orçamento federal não é afetado, mas os casos de negligência continuam se repetindo por todo o país.",
        effects: { popularidade: -8 },
        sectorEffects: { populacao: -8 },
        leaning: 1,
      },
    ],
  },
  {
    id: "reforma-previdenciaria",
    title: "Reforma da Previdência",
    category: "economia",
    description:
      "O déficit previdenciário ameaça consumir todo o orçamento em uma década. Uma reforma ampla divide o país entre urgência fiscal e direitos adquiridos.",
    choices: [
      {
        id: "reforma-ampla",
        label: "Aprovar uma reforma ampla, elevando idade mínima e tempo de contribuição",
        consequence:
          "O rombo futuro é praticamente eliminado, mas trabalhadores mais velhos se sentem traídos às vésperas da aposentadoria.",
        effects: { economia: 16, governabilidade: -8, popularidade: -11 },
        sectorEffects: { empresariado: 9, populacao: -13, movimentosSociais: -8 },
        leaning: 2,
      },
      {
        id: "reforma-escalonada",
        label: "Aprovar uma transição escalonada, com regras de transição mais longas",
        consequence:
          "O ajuste fiscal é mais lento, mas quem está perto de se aposentar sofre bem menos impacto.",
        effects: { economia: 7, governabilidade: -2, popularidade: -3 },
        sectorEffects: { populacao: -3 },
        leaning: 0,
      },
      {
        id: "recusar-reforma",
        label: "Recusar a reforma e buscar outras fontes de receita",
        consequence:
          "Trabalhadores e sindicatos comemoram, mas o rombo previdenciário continua crescendo e assombra o futuro das contas públicas.",
        effects: { economia: -11, popularidade: 8 },
        sectorEffects: { populacao: 11, movimentosSociais: 9, empresariado: -8 },
        leaning: -2,
      },
    ],
  },
  {
    id: "quebra-monopolio",
    title: "Concentração de Mercado",
    category: "economia",
    description:
      "Um estudo revela que poucas empresas controlam setores essenciais da economia, elevando preços para o consumidor. O órgão antitruste pede ação do governo.",
    choices: [
      {
        id: "quebrar-monopolio",
        label: "Determinar a quebra forçada dos monopólios identificados",
        consequence:
          "A concorrência se abre e os preços caem para o consumidor, mas as grandes empresas atingidas reagem com uma onda de demissões e processos.",
        effects: { economia: 5, popularidade: 9 },
        sectorEffects: { empresariado: -16, populacao: 9 },
        leaning: -2,
      },
      {
        id: "regulacao-precos",
        label: "Impor regulação de preços e metas de concorrência, sem forçar a quebra",
        consequence:
          "Alívio real para o consumidor, com menor risco de judicialização prolongada.",
        effects: { economia: 3, popularidade: 4 },
        sectorEffects: { empresariado: -5, populacao: 4 },
        leaning: 0,
      },
      {
        id: "nao-intervir",
        label: "Não intervir, confiando na autorregulação do mercado",
        consequence:
          "As grandes empresas investem com tranquilidade, mas os preços para o consumidor seguem altos e a crítica pública cresce.",
        effects: { economia: 4, popularidade: -7 },
        sectorEffects: { empresariado: 11, populacao: -7 },
        leaning: 2,
      },
    ],
  },
  {
    id: "rebeliao-presidios",
    title: "Rebelião em Presídios",
    category: "seguranca",
    description:
      "Uma rebelião simultânea em presídios superlotados faz reféns entre os agentes penitenciários e expõe o colapso do sistema carcerário.",
    choices: [
      {
        id: "negociacao-reforma",
        label: "Negociar a rendição e anunciar um plano de despenitenciarização",
        consequence:
          "Os reféns são libertados sem derramamento de sangue, mas a oposição acusa o governo de ser condescendente com criminosos.",
        effects: { seguranca: -3, popularidade: -3 },
        sectorEffects: { movimentosSociais: 8, militares: -3 },
        leaning: -2,
      },
      {
        id: "negociacao-com-reforco",
        label: "Negociar a rendição com reforço policial no perímetro",
        consequence:
          "Os reféns são libertados em segurança e a ordem é restabelecida sem uma invasão armada.",
        effects: { seguranca: 5, economia: -2 },
        sectorEffects: { militares: 4 },
        leaning: 0,
      },
      {
        id: "invasao-armada",
        label: "Autorizar invasão armada imediata para retomar o controle",
        consequence:
          "A rebelião é esmagada rapidamente, mas o número de mortos chocam o país e organismos de direitos humanos reagem com dureza.",
        effects: { seguranca: 9, popularidade: -11, relacoesInternacionais: -5 },
        sectorEffects: { militares: 11, movimentosSociais: -13 },
        leaning: 2,
      },
    ],
  },
  {
    id: "violencia-estadios",
    title: "Violência em Estádios de Futebol",
    category: "seguranca",
    description:
      "Confrontos entre torcidas organizadas deixam mortos em um grande estádio, reacendendo o debate sobre segurança em eventos esportivos.",
    choices: [
      {
        id: "proibir-organizadas",
        label: "Proibir nacionalmente torcidas organizadas em estádios",
        consequence:
          "A violência nos jogos despenca, mas torcedores organizados protestam duramente contra a medida considerada excessiva.",
        effects: { seguranca: 9, popularidade: -5 },
        sectorEffects: { movimentosSociais: -6, populacao: -3 },
        leaning: 2,
      },
      {
        id: "cadastro-biometrico",
        label: "Criar cadastro biométrico obrigatório para torcedores organizados",
        consequence:
          "Reduz a violência sem banir completamente a torcida organizada, mas exige um sistema caro e complexo.",
        effects: { seguranca: 6, economia: -3 },
        sectorEffects: { populacao: 2 },
        leaning: 0,
      },
      {
        id: "investir-mediacao",
        label: "Investir em mediação social com as torcidas organizadas",
        consequence:
          "Abordagem de longo prazo que reduz a rivalidade violenta aos poucos, sem resultado imediato visível.",
        effects: { seguranca: -2, educacao: 3 },
        sectorEffects: { movimentosSociais: 6, populacao: 3 },
        leaning: -1,
      },
    ],
  },
  {
    id: "fila-transplantes",
    title: "Fila do SUS por Transplantes",
    category: "saude",
    description:
      "A fila por transplantes de órgãos no sistema público bate recorde histórico, e famílias denunciam a demora como sentença de morte.",
    choices: [
      {
        id: "expandir-captacao",
        label: "Criar programa nacional de expansão da captação de órgãos",
        consequence:
          "O número de transplantes sobe de forma significativa, mas o programa exige investimento alto em logística e equipes especializadas.",
        effects: { saude: 14, popularidade: 7, economia: -8 },
        sectorEffects: { populacao: 9, academicos: 5 },
        leaning: -1,
      },
      {
        id: "campanha-doacao",
        label: "Lançar campanha nacional de conscientização para doação de órgãos",
        consequence:
          "Aumenta gradualmente o número de doadores, com custo bem mais baixo que uma reestruturação completa.",
        effects: { saude: 5, economia: -1 },
        sectorEffects: { populacao: 3 },
        leaning: 0,
      },
      {
        id: "sem-investimento",
        label: "Manter a estrutura atual, sem novo investimento",
        consequence:
          "O orçamento não é afetado, mas a fila continua crescendo e famílias cobram o governo publicamente.",
        effects: { saude: -8, popularidade: -7 },
        sectorEffects: { populacao: -7 },
        leaning: 1,
      },
    ],
  },
  {
    id: "saude-indigena",
    title: "Crise na Saúde Indígena",
    category: "saude",
    description:
      "Uma epidemia de desnutrição e doenças respiratórias atinge comunidades indígenas isoladas, expondo o abandono histórico do atendimento de saúde na região.",
    choices: [
      {
        id: "forca-tarefa-indigena",
        label: "Criar força-tarefa de saúde com equipes e suprimentos enviados por via aérea",
        consequence:
          "A crise imediata é contida e vidas são salvas, mas a operação logística em áreas remotas é extremamente cara.",
        effects: { saude: 13, popularidade: 7, economia: -8 },
        sectorEffects: { movimentosSociais: 13, academicos: 6 },
        leaning: -2,
      },
      {
        id: "parceria-ongs-saude",
        label: "Firmar parceria com ONGs e universidades para o atendimento",
        consequence:
          "Resposta mais barata e sustentável, embora dependa da capacidade de parceiros externos.",
        effects: { saude: 6, economia: -2 },
        sectorEffects: { movimentosSociais: 5, academicos: 3 },
        leaning: 0,
      },
      {
        id: "sem-forca-tarefa",
        label: "Encaminhar o problema aos governos estaduais da região",
        consequence:
          "Você evita o gasto federal direto, mas a crise de saúde indígena se agrava e vira um escândalo internacional de direitos humanos.",
        effects: { saude: -8, relacoesInternacionais: -5, popularidade: -5 },
        sectorEffects: { movimentosSociais: -11 },
        leaning: 2,
      },
    ],
  },
  {
    id: "fraude-vestibular",
    title: "Fraude em Exame Nacional",
    category: "educacao",
    description:
      "Uma fraude em larga escala no principal exame de acesso ao ensino superior é descoberta, com gabaritos vazados para milhares de candidatos.",
    choices: [
      {
        id: "anular-prova",
        label: "Anular a prova inteira e remarcar para todos os candidatos",
        consequence:
          "A lisura do processo seletivo é restaurada por completo, mas milhões de estudantes têm sua rotina e planos adiados.",
        effects: { educacao: 9, popularidade: -5, governabilidade: -2 },
        sectorEffects: { academicos: 9, populacao: -5 },
        leaning: -1,
      },
      {
        id: "anular-questoes",
        label: "Anular apenas as questões vazadas, mantendo o restante da prova",
        consequence:
          "Resolve o essencial do problema sem o transtorno de uma remarcação completa.",
        effects: { educacao: 4, popularidade: 1 },
        sectorEffects: { academicos: 3 },
        leaning: 0,
      },
      {
        id: "manter-resultado",
        label: "Manter o resultado original e investigar os responsáveis depois",
        consequence:
          "Evita o transtorno imediato aos candidatos, mas a desconfiança sobre a lisura do exame nacional se instala por anos.",
        effects: { educacao: -7, popularidade: -8 },
        sectorEffects: { academicos: -9 },
        leaning: 1,
      },
    ],
  },
  {
    id: "merenda-contaminada",
    title: "Merenda Escolar Contaminada",
    category: "educacao",
    description:
      "Um lote contaminado de merenda escolar deixa centenas de crianças intoxicadas, expondo falhas graves de fiscalização na cadeia de fornecimento.",
    choices: [
      {
        id: "fiscalizacao-federal-merenda",
        label: "Federalizar a fiscalização de merenda escolar em todo o país",
        consequence:
          "O risco de novos incidentes cai de forma permanente, mas o governo assume um custo logístico e político enorme.",
        effects: { saude: 9, educacao: 6, economia: -7 },
        sectorEffects: { populacao: 9, academicos: 5 },
        leaning: -1,
      },
      {
        id: "auditoria-fornecedores",
        label: "Auditar os fornecedores atuais e suspender os irregulares",
        consequence:
          "Resolve o foco do problema identificado, sem assumir toda a fiscalização nacional.",
        effects: { saude: 5, economia: -2 },
        sectorEffects: { populacao: 4 },
        leaning: 0,
      },
      {
        id: "responsabilizar-estados",
        label: "Responsabilizar os governos estaduais pela fiscalização local",
        consequence:
          "O governo federal se isenta do custo direto, mas é acusado de omissão diante de crianças intoxicadas.",
        effects: { saude: -6, popularidade: -9 },
        sectorEffects: { populacao: -9 },
        leaning: 1,
      },
    ],
  },
  {
    id: "incendios-recordes",
    title: "Incêndios Florestais Recordes",
    category: "ambiental",
    description:
      "Uma onda de incêndios florestais sem precedentes consome milhões de hectares, lançando fumaça sobre grandes cidades e alarmando o mundo todo.",
    choices: [
      {
        id: "mobilizacao-nacional-incendio",
        label: "Mobilizar nacionalmente brigadistas, aeronaves e recursos militares de combate",
        consequence:
          "Os incêndios são contidos com uma resposta histórica, mas o custo da operação é altíssimo.",
        effects: { meioAmbiente: 16, relacoesInternacionais: 7, economia: -10 },
        sectorEffects: { movimentosSociais: 11, militares: 5 },
        leaning: -1,
      },
      {
        id: "reforco-regional-incendio",
        label: "Reforçar brigadas já existentes nas regiões mais críticas",
        consequence:
          "Contenção parcial real, com custo bem mais baixo que uma mobilização nacional total.",
        effects: { meioAmbiente: 6, economia: -3 },
        sectorEffects: { movimentosSociais: 3 },
        leaning: 0,
      },
      {
        id: "resposta-minima-incendio",
        label: "Deixar a resposta a cargo dos governos estaduais, sem mobilização federal",
        consequence:
          "O orçamento federal é preservado, mas os incêndios continuam avançando sem controle e o país vira manchete internacional negativa.",
        effects: { meioAmbiente: -11, relacoesInternacionais: -8, popularidade: -5 },
        sectorEffects: { movimentosSociais: -9 },
        leaning: 2,
      },
    ],
  },
  {
    id: "proibicao-agrotoxicos",
    title: "Debate sobre Agrotóxicos",
    category: "ambiental",
    description:
      "Um estudo liga o uso intensivo de agrotóxicos a índices alarmantes de contaminação da água e do solo, pressionando por uma resposta regulatória.",
    choices: [
      {
        id: "proibir-agrotoxicos",
        label: "Proibir as substâncias mais tóxicas identificadas no estudo",
        consequence:
          "A contaminação ambiental recua de forma significativa, mas o agronegócio alerta para perdas de produtividade e preços mais altos.",
        effects: { meioAmbiente: 13, saude: 5, economia: -7 },
        sectorEffects: { empresariado: -11, movimentosSociais: 9, academicos: 5 },
        leaning: -2,
      },
      {
        id: "regular-uso",
        label: "Regular o uso com limites mais rígidos, sem proibição total",
        consequence:
          "Reduz o risco ambiental de forma gradual, sem o choque imediato de uma proibição completa.",
        effects: { meioAmbiente: 5, economia: -2 },
        sectorEffects: { empresariado: -3 },
        leaning: 0,
      },
      {
        id: "manter-regras-agrotoxicos",
        label: "Manter as regras atuais, priorizando a produtividade agrícola",
        consequence:
          "O agronegócio segue competitivo e os preços dos alimentos ficam estáveis, mas a contaminação ambiental e os riscos à saúde continuam se acumulando.",
        effects: { economia: 5, meioAmbiente: -9, saude: -4 },
        sectorEffects: { empresariado: 9, movimentosSociais: -9 },
        leaning: 2,
      },
    ],
  },
  {
    id: "golpe-pais-vizinho",
    title: "Golpe de Estado em País Vizinho",
    category: "internacional",
    description:
      "Militares depõem o governo eleito de um país vizinho, instaurando um regime de exceção. A comunidade internacional espera uma posição clara do seu país.",
    choices: [
      {
        id: "condenar-golpe",
        label: "Condenar publicamente o golpe e suspender relações diplomáticas",
        consequence:
          "O país se firma como defensor da democracia na região, mas perde acesso a um parceiro comercial importante.",
        effects: { relacoesInternacionais: 11, economia: -5 },
        sectorEffects: { academicos: 8, movimentosSociais: 6, empresariado: -5 },
        leaning: -1,
      },
      {
        id: "pressao-diplomatica",
        label: "Manter relações, mas pressionar por eleições rápidas através de blocos regionais",
        consequence:
          "Posição equilibrada que não rompe laços, mas também não parece conivente com o regime.",
        effects: { relacoesInternacionais: 4 },
        sectorEffects: { politicos: 2 },
        leaning: 0,
      },
      {
        id: "manter-relacoes",
        label: "Manter relações comerciais normais com o novo governo",
        consequence:
          "Os negócios com o país vizinho seguem sem interrupção, mas o país é acusado de pragmatismo cínico diante de uma ruptura democrática.",
        effects: { economia: 5, relacoesInternacionais: -9 },
        sectorEffects: { empresariado: 8, movimentosSociais: -8, academicos: -5 },
        leaning: 2,
      },
    ],
  },
  {
    id: "disputa-patente-vacina",
    title: "Disputa por Patente de Vacina",
    category: "internacional",
    description:
      "Uma farmacêutica multinacional se recusa a licenciar a patente de uma vacina essencial para produção local, mesmo em meio a uma crise sanitária regional.",
    choices: [
      {
        id: "quebrar-patente",
        label: "Decretar quebra de patente por interesse público e iniciar produção nacional",
        consequence:
          "O acesso à vacina se populariza e o país ganha popularidade imediata, mas enfrenta retaliação comercial e processos internacionais.",
        effects: { saude: 13, popularidade: 9, relacoesInternacionais: -9 },
        sectorEffects: { populacao: 11, empresariado: -8 },
        leaning: -2,
      },
      {
        id: "negociar-licenca",
        label: "Negociar uma licença compulsória temporária com compensação financeira",
        consequence:
          "Garante acesso à vacina de forma mais lenta, mas evita o confronto direto com a farmacêutica e seus países de origem.",
        effects: { saude: 6, economia: -3 },
        sectorEffects: { populacao: 4 },
        leaning: 0,
      },
      {
        id: "respeitar-patente",
        label: "Respeitar a patente e seguir comprando doses pelo preço de mercado",
        consequence:
          "As relações comerciais internacionais seguem intactas, mas o custo alto limita o acesso da população à vacina.",
        effects: { relacoesInternacionais: 5, saude: -7, popularidade: -7 },
        sectorEffects: { empresariado: 5, populacao: -7 },
        leaning: 2,
      },
    ],
  },
  {
    id: "censura-imprensa",
    title: "Confronto com a Imprensa",
    category: "institucional",
    description:
      "Após reportagens críticas ao governo, aliados pressionam por medidas que restrinjam a cobertura de veículos considerados hostis.",
    choices: [
      {
        id: "garantir-liberdade",
        label: "Garantir publicamente a liberdade de imprensa, mesmo sob críticas duras",
        consequence:
          "Instituições democráticas saem fortalecidas e o país ganha respeito internacional, mas as críticas ao governo se intensificam sem filtro.",
        effects: { governabilidade: -5, relacoesInternacionais: 7, popularidade: -3 },
        sectorEffects: { academicos: 11, politicos: -5 },
        leaning: -2,
      },
      {
        id: "resposta-institucional",
        label: "Responder às críticas por canais institucionais, sem restringir a cobertura",
        consequence:
          "Mantém a liberdade de imprensa intacta, disputando a narrativa sem recorrer a medidas restritivas.",
        effects: { popularidade: 1 },
        sectorEffects: { academicos: 3 },
        leaning: 0,
      },
      {
        id: "restringir-cobertura",
        label: "Aprovar regras que restringem a cobertura de veículos considerados hostis",
        consequence:
          "As críticas mais duras diminuem no curto prazo, mas o episódio é lido como censura e provoca forte repúdio nacional e internacional.",
        effects: { governabilidade: 7, relacoesInternacionais: -13, popularidade: -9 },
        sectorEffects: { politicos: 9, academicos: -16, movimentosSociais: -8 },
        leaning: 2,
      },
    ],
  },
  {
    id: "nepotismo-governo",
    title: "Escândalo de Nepotismo",
    category: "institucional",
    description:
      "Uma investigação revela que diversos cargos de confiança no governo foram preenchidos por parentes de ministros e parlamentares aliados.",
    choices: [
      {
        id: "exonerar-nepotismo",
        label: "Exonerar todos os nomeados e criar regras rígidas contra nepotismo",
        consequence:
          "A medida é aplaudida como um gesto forte de ética pública, mas gera um racha profundo com aliados diretamente atingidos.",
        effects: { popularidade: 9, governabilidade: -11 },
        sectorEffects: { academicos: 8, politicos: -13 },
        leaning: -1,
      },
      {
        id: "revisao-criterios",
        label: "Revisar os critérios de nomeação, mantendo quem comprovar qualificação técnica",
        consequence:
          "Resposta tecnicamente defensável, embora deixe margem para acusações de que pouco mudou na prática.",
        effects: { popularidade: 1, governabilidade: -2 },
        sectorEffects: { politicos: -2 },
        leaning: 0,
      },
      {
        id: "manter-nomeados",
        label: "Manter os nomeados, alegando que todos atendem aos requisitos do cargo",
        consequence:
          "Sua base aliada permanece intacta, mas a opinião pública reage com forte indignação ao escândalo.",
        effects: { governabilidade: 5, popularidade: -13 },
        sectorEffects: { politicos: 8, movimentosSociais: -9, academicos: -8 },
        leaning: 2,
      },
    ],
  },
  {
    id: "tarifa-transporte",
    title: "Crise nas Tarifas de Transporte Público",
    category: "social",
    description:
      "Prefeituras de grandes cidades anunciam reajuste pesado nas tarifas de ônibus e metrô, pressionando o governo federal por um subsídio emergencial.",
    choices: [
      {
        id: "subsidio-federal-tarifa",
        label: "Criar subsídio federal para conter o reajuste das tarifas",
        consequence:
          "Trabalhadores que dependem do transporte público sentem alívio imediato, mas o governo assume um custo recorrente alto.",
        effects: { popularidade: 11, economia: -8 },
        sectorEffects: { populacao: 13, movimentosSociais: 6 },
        leaning: -2,
      },
      {
        id: "subsidio-parcial-tarifa",
        label: "Subsidiar parcialmente o reajuste, dividindo o custo com municípios",
        consequence:
          "Alívio real, porém incompleto, com custo federal bem mais controlado.",
        effects: { popularidade: 4, economia: -3 },
        sectorEffects: { populacao: 5 },
        leaning: 0,
      },
      {
        id: "sem-subsidio-tarifa",
        label: "Não intervir, deixando o reajuste a cargo dos municípios",
        consequence:
          "O orçamento federal fica intacto, mas o aumento do custo de vida gera forte revolta nas grandes cidades.",
        effects: { popularidade: -11 },
        sectorEffects: { populacao: -11, movimentosSociais: -5 },
        leaning: 2,
        triggersEventId: "protesto-popular",
      },
    ],
  },
  {
    id: "marco-temporal-terras",
    title: "Disputa pelo Marco Temporal de Terras Indígenas",
    category: "social",
    description:
      "Uma tese jurídica que limita a demarcação de terras indígenas a áreas já ocupadas em uma data específica divide ruralistas e movimentos indígenas.",
    choices: [
      {
        id: "rejeitar-marco-temporal",
        label: "Rejeitar o marco temporal e acelerar novas demarcações",
        consequence:
          "Povos indígenas comemoram uma vitória histórica, mas produtores rurais reagem com protestos e ameaças de judicialização.",
        effects: { relacoesInternacionais: 6, meioAmbiente: 7, economia: -5 },
        sectorEffects: { movimentosSociais: 16, empresariado: -13 },
        leaning: -2,
      },
      {
        id: "demarcacao-caso-a-caso",
        label: "Avaliar as demarcações pendentes caso a caso, sem uma regra geral",
        consequence:
          "Evita uma definição explosiva de um lado ou do outro, mas prolonga a insegurança jurídica para ambos os grupos.",
        effects: { governabilidade: -2 },
        sectorEffects: { movimentosSociais: 2, empresariado: -2 },
        leaning: 0,
      },
      {
        id: "apoiar-marco-temporal",
        label: "Apoiar o marco temporal e travar novas demarcações",
        consequence:
          "Produtores rurais comemoram segurança jurídica, mas povos indígenas e organismos internacionais de direitos humanos reagem com forte indignação.",
        effects: { economia: 5, relacoesInternacionais: -8 },
        sectorEffects: { empresariado: 11, movimentosSociais: -16 },
        leaning: 2,
      },
    ],
  },
];
