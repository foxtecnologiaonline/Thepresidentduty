import type { GameEvent } from "../types";

export const EVENTS: GameEvent[] = [
  {
    id: "reforma-tributaria",
    title: "Reforma Tributária Estadual",
    category: "economia",
    description:
      "Sua Secretaria da Fazenda propõe uma reforma no ICMS que simplifica impostos, mas taxa mais os setores mais ricos. Empresários pressionam contra; a população pobre apoia.",
    choices: [
      {
        id: "aprovar",
        label: "Aprovar a reforma",
        consequence:
          "A reforma passa. O caixa do estado melhora, mas grandes empresários reduzem investimentos e pressionam sua base na Assembleia Legislativa.",
        effects: { economia: 8, popularidade: 4, governabilidade: -6 },
        sectorEffects: { empresariado: -8, movimentosSociais: 6, politicos: -4 },
        leaning: -2,
      },
      {
        id: "recuar",
        label: "Recuar e negociar uma versão mais branda",
        consequence:
          "Você evita o embate, mas a população vê como recuo diante das elites.",
        effects: { governabilidade: 4, popularidade: -5 },
        sectorEffects: { empresariado: 5, movimentosSociais: -6 },
        leaning: 1,
      },
    ],
  },
  {
    id: "greve-policial",
    title: "Greve da Polícia",
    category: "seguranca",
    description:
      "Policiais militares e civis do estado entram em greve por salários melhores. A criminalidade começa a subir enquanto a categoria pede reajuste imediato.",
    choices: [
      {
        id: "atender",
        label: "Atender a reivindicação salarial",
        consequence:
          "A greve termina rápido e a segurança se estabiliza, mas o orçamento sofre um rombo.",
        effects: { seguranca: 10, economia: -8 },
        sectorEffects: { militares: 6, empresariado: -3 },
        leaning: 1,
      },
      {
        id: "negociar-parcelado",
        label: "Negociar reajuste parcelado",
        consequence:
          "Solução intermediária: a greve arrefece aos poucos e o impacto fiscal é menor.",
        effects: { seguranca: 4, economia: -3, popularidade: -2 },
        sectorEffects: { militares: 3 },
        leaning: 0,
      },
      {
        id: "linha-dura",
        label: "Não ceder e usar a tropa de choque para conter a crise",
        consequence:
          "Você mantém o orçamento, mas a insegurança aumenta e sua imagem é desgastada.",
        effects: { seguranca: -10, popularidade: -6 },
        sectorEffects: { militares: -8, movimentosSociais: -5, populacao: -4 },
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
      "Hospitais da rede estadual relatam superlotação e falta de leitos. A imprensa cobra uma resposta imediata do governo.",
    choices: [
      {
        id: "investir",
        label: "Investir pesado em saúde emergencial",
        consequence:
          "Novos leitos e equipamentos aliviam a crise, mas o gasto extra pesa no orçamento.",
        effects: { saude: 12, popularidade: 5, economia: -6 },
        sectorEffects: { populacao: 8, academicos: 4, empresariado: -3 },
        leaning: -2,
      },
      {
        id: "parceria-privada",
        label: "Firmar parcerias com hospitais privados",
        consequence:
          "Solução rápida e mais barata, mas gera críticas de privatização disfarçada da saúde pública.",
        effects: { saude: 6, economia: -1, popularidade: -2 },
        sectorEffects: { empresariado: 7, movimentosSociais: -6, academicos: -3 },
        leaning: 2,
      },
    ],
  },
  {
    id: "reforma-educacional",
    title: "Reforma do Ensino Médio Estadual",
    category: "educacao",
    description:
      "Sua Secretaria de Educação propõe implementar uma reforma curricular ampla na rede estadual. Professores temem precarização; parte da sociedade quer modernização rápida.",
    choices: [
      {
        id: "implementar",
        label: "Implementar a reforma integralmente",
        consequence:
          "A educação avança no médio prazo, mas o processo é turbulento e gera desgaste com sindicatos.",
        effects: { educacao: 10, popularidade: -3, governabilidade: -2 },
        sectorEffects: { academicos: 8, politicos: -4, movimentosSociais: 3 },
        leaning: -1,
      },
      {
        id: "piloto",
        label: "Testar em projeto-piloto antes de expandir",
        consequence:
          "Abordagem cautelosa: ganho menor, porém sem grandes atritos.",
        effects: { educacao: 4, governabilidade: 2 },
        sectorEffects: { academicos: 2, politicos: 3 },
        leaning: 0,
      },
    ],
  },
  {
    id: "desmatamento",
    title: "Pressão do Agronegócio",
    category: "ambiental",
    description:
      "Ruralistas pedem liberação de novas áreas para agricultura em regiões de proteção ambiental do estado, alegando ganhos econômicos urgentes.",
    choices: [
      {
        id: "liberar",
        label: "Liberar as áreas para exploração",
        consequence:
          "A economia agrícola cresce e o agronegócio apoia seu governo, mas o desmatamento dispara e o Governo Federal reage mal.",
        effects: { economia: 8, meioAmbiente: -12, relacoesInstitucionais: -6 },
        sectorEffects: { empresariado: 10, movimentosSociais: -10, academicos: -6 },
        leaning: 2,
        triggersEventId: "cupula-clima",
      },
      {
        id: "proteger",
        label: "Manter a proteção ambiental",
        consequence:
          "Você preserva o meio ambiente e ganha respeito de investidores e do governo federal, mas perde apoio do setor rural.",
        effects: { meioAmbiente: 8, relacoesInstitucionais: 5, popularidade: -3 },
        sectorEffects: { movimentosSociais: 9, academicos: 5, empresariado: -7 },
        leaning: -2,
      },
    ],
  },
  {
    id: "acordo-comercial",
    title: "Investimento Estrangeiro na Indústria Local",
    category: "federativa",
    description:
      "Uma multinacional oferece instalar uma grande fábrica no estado em troca de incentivos fiscais. O negócio gera empregos, mas ameaça indústrias locais menos competitivas.",
    choices: [
      {
        id: "assinar",
        label: "Assinar o acordo e conceder os incentivos",
        consequence:
          "O investimento chega e sua imagem externa melhora, mas setores industriais locais protestam com demissões e perda de mercado.",
        effects: { economia: 6, relacoesInstitucionais: 9, popularidade: -4 },
        sectorEffects: { empresariado: 9, populacao: -5, politicos: 3 },
        leaning: 2,
      },
      {
        id: "recusar",
        label: "Recusar para proteger a indústria local",
        consequence:
          "Trabalhadores da indústria local agradecem, mas o estado perde relevância para atrair novos investimentos.",
        effects: { popularidade: 3, relacoesInstitucionais: -7 },
        sectorEffects: { populacao: 4, empresariado: -6 },
        leaning: -1,
      },
    ],
  },
  {
    id: "escandalo-corrupcao",
    title: "Escândalo de Corrupção",
    category: "institucional",
    description:
      "Um secretário de estado de confiança é flagrado em um esquema de desvio de verbas. A oposição pede sua cabeça; aliados pedem discrição.",
    choices: [
      {
        id: "demitir",
        label: "Demitir o secretário e abrir investigação pública",
        consequence:
          "Transparência acalma a opinião pública, mas fragiliza sua base política interna.",
        effects: { popularidade: 6, governabilidade: -7 },
        sectorEffects: { academicos: 5, movimentosSociais: 5, politicos: -8 },
        leaning: 0,
      },
      {
        id: "proteger",
        label: "Proteger o aliado e abafar o caso",
        consequence:
          "Você mantém a base de apoio, mas o escândalo vaza para a imprensa e sua credibilidade cai.",
        effects: { governabilidade: 4, popularidade: -10 },
        sectorEffects: { politicos: 6, movimentosSociais: -8, academicos: -6 },
        leaning: 0,
        triggersEventId: "cpi-investigacao",
      },
    ],
  },
  {
    id: "protesto-popular",
    title: "Protesto Popular Massivo",
    category: "social",
    description:
      "Milhares de pessoas tomam as ruas contra o custo de vida. Parte dos manifestantes pede sua renúncia; a Polícia Militar pede autorização para agir com rigor.",
    choices: [
      {
        id: "dialogo",
        label: "Abrir diálogo com os manifestantes",
        consequence:
          "O gesto acalma os ânimos e melhora sua imagem, embora nada seja resolvido de imediato.",
        effects: { popularidade: 6, seguranca: 1 },
        sectorEffects: { movimentosSociais: 10, populacao: 5 },
        leaning: -1,
      },
      {
        id: "reprimir",
        label: "Autorizar repressão policial forte",
        consequence:
          "Os protestos diminuem rapidamente, mas imagens de violência policial chocam o estado.",
        effects: { seguranca: 5, popularidade: -12 },
        sectorEffects: { militares: 5, movimentosSociais: -12, populacao: -7 },
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
      "Chuvas históricas causam enchentes em várias cidades do estado, deixando milhares desabrigados. A população espera uma resposta rápida do seu governo.",
    choices: [
      {
        id: "resposta-rapida",
        label: "Mobilizar resposta emergencial imediata",
        consequence:
          "A ajuda rápida salva vidas e é bem recebida, mas consome recursos significativos do orçamento.",
        effects: { popularidade: 8, meioAmbiente: 2, economia: -5 },
        sectorEffects: { populacao: 9, academicos: 2 },
        leaning: -1,
      },
      {
        id: "resposta-lenta",
        label: "Seguir o protocolo padrão sem ações extraordinárias",
        consequence:
          "Você preserva o orçamento, mas a lentidão da resposta gera revolta popular.",
        effects: { economia: 2, popularidade: -9 },
        sectorEffects: { populacao: -9, movimentosSociais: -4 },
        leaning: 1,
      },
    ],
  },
  {
    id: "pauta-impopular",
    title: "Pauta Impopular na Assembleia",
    category: "institucional",
    description:
      "Para manter sua base aliada, líderes da Assembleia Legislativa pedem que você apoie publicamente uma pauta polêmica e impopular.",
    choices: [
      {
        id: "apoiar",
        label: "Apoiar a pauta para manter a base aliada",
        consequence:
          "A Assembleia permanece ao seu lado, mas a população reage negativamente à medida.",
        effects: { governabilidade: 8, popularidade: -6 },
        sectorEffects: { politicos: 9, populacao: -5 },
        leaning: 0,
      },
      {
        id: "recusar",
        label: "Recusar publicamente a pauta",
        consequence:
          "Você agrada a opinião pública, mas perde apoio de aliados importantes no Legislativo estadual.",
        effects: { popularidade: 5, governabilidade: -8 },
        sectorEffects: { populacao: 5, politicos: -9 },
        leaning: 0,
      },
    ],
  },
  {
    id: "energia-limpa",
    title: "Programa de Energia Limpa",
    category: "ambiental",
    description:
      "Seu governo pode lançar um grande programa de incentivo a energias renováveis no estado, com custo inicial alto mas retorno ambiental e de imagem no longo prazo.",
    choices: [
      {
        id: "investir",
        label: "Investir no programa",
        consequence:
          "O estado se posiciona como líder ambiental, mas o investimento pesa nas contas públicas no curto prazo.",
        effects: { meioAmbiente: 10, relacoesInstitucionais: 4, economia: -5 },
        sectorEffects: { movimentosSociais: 8, academicos: 6, empresariado: -4 },
        leaning: -2,
      },
      {
        id: "adiar",
        label: "Adiar o programa para depois do mandato",
        consequence:
          "O orçamento fica intacto, mas o estado perde uma oportunidade de destaque e de atrair investimento.",
        effects: { economia: 2, meioAmbiente: -3 },
        sectorEffects: { empresariado: 4, movimentosSociais: -6, academicos: -3 },
        leaning: 1,
      },
    ],
  },
  {
    id: "crise-migratoria",
    title: "Crise Migratória na Divisa do Estado",
    category: "federativa",
    description:
      "Um fluxo migratório intenso vindo de uma região vizinha em crise pressiona cidades na divisa do estado e divide a opinião pública.",
    choices: [
      {
        id: "acolher",
        label: "Abrir as portas e estruturar acolhimento humanitário",
        consequence:
          "Sua postura é elogiada pelo Governo Federal e organismos internacionais, mas parte da população teme sobrecarga dos serviços locais.",
        effects: { relacoesInstitucionais: 8, popularidade: -4, saude: -2 },
        sectorEffects: { movimentosSociais: 9, academicos: 4, populacao: -5 },
        leaning: -2,
      },
      {
        id: "fechar",
        label: "Reforçar o controle e restringir a entrada",
        consequence:
          "Parte da população local aprova a medida, mas o estado é criticado por direitos humanos e atritos com Brasília.",
        effects: { seguranca: 4, relacoesInstitucionais: -8, popularidade: 3 },
        sectorEffects: { militares: 5, movimentosSociais: -9, populacao: 4 },
        leaning: 2,
      },
    ],
  },
  {
    id: "ataque-cibernetico",
    title: "Ataque Cibernético a Infraestrutura",
    category: "seguranca",
    description:
      "Hackers atacam sistemas de energia e bancos estaduais, causando instabilidade e assustando investidores.",
    choices: [
      {
        id: "investir-ciberseguranca",
        label: "Investir emergencialmente em ciberdefesa",
        consequence:
          "O ataque é contido e a confiança é restaurada, mas o gasto extra pesa no orçamento.",
        effects: { seguranca: 8, economia: -4 },
        sectorEffects: { militares: 6, empresariado: 3 },
        leaning: 0,
      },
      {
        id: "resposta-minima",
        label: "Resposta mínima, aguardar situação se resolver",
        consequence:
          "Você economiza recursos, mas o episódio expõe fragilidades e abala a confiança dos mercados.",
        effects: { economia: -6, seguranca: -5 },
        sectorEffects: { militares: -5, empresariado: -6 },
        leaning: 0,
      },
    ],
  },
  {
    id: "recessao-global",
    title: "Queda na Arrecadação Estadual",
    category: "economia",
    description:
      "Uma recessão econômica nacional reduz a atividade industrial e derruba a arrecadação de ICMS do estado. O mercado espera sinais claros do governo.",
    choices: [
      {
        id: "estimulo",
        label: "Lançar pacote de estímulo econômico estadual",
        consequence:
          "O impacto da crise é amenizado e empregos são preservados, mas a dívida do estado cresce.",
        effects: { economia: 6, popularidade: 3, governabilidade: -3 },
        sectorEffects: { populacao: 7, empresariado: 4, politicos: -3 },
        leaning: -2,
      },
      {
        id: "austeridade",
        label: "Adotar austeridade fiscal",
        consequence:
          "As contas do estado ficam sob controle, mas o desemprego sobe e a população sofre no curto prazo.",
        effects: { economia: 3, popularidade: -7 },
        sectorEffects: { empresariado: 6, populacao: -8 },
        leaning: 2,
      },
    ],
  },
  {
    id: "racionamento",
    title: "Racionamento de Água e Energia",
    category: "ambiental",
    description:
      "Uma seca severa reduz os reservatórios do estado, forçando decisões impopulares sobre racionamento.",
    choices: [
      {
        id: "racionar",
        label: "Implementar racionamento rígido",
        consequence:
          "Os recursos naturais são preservados, mas a população sofre com a rotina de restrições.",
        effects: { meioAmbiente: 6, popularidade: -8 },
        sectorEffects: { movimentosSociais: 4, populacao: -8, empresariado: -5 },
        leaning: -1,
      },
      {
        id: "importar",
        label: "Contratar fornecimento emergencial a alto custo",
        consequence:
          "A população não sente o impacto direto, mas o custo é alto para os cofres do estado.",
        effects: { economia: -9, popularidade: 3 },
        sectorEffects: { populacao: 4, empresariado: 3 },
        leaning: 1,
      },
    ],
  },
  {
    id: "cpi-investigacao",
    title: "CPI na Assembleia Legislativa",
    category: "institucional",
    description:
      "Deputados estaduais da oposição instauram uma Comissão Parlamentar de Inquérito para investigar supostas irregularidades no seu governo.",
    choices: [
      {
        id: "colaborar",
        label: "Colaborar totalmente com a investigação",
        consequence:
          "A transparência fortalece sua imagem pública, mas expõe fragilidades da sua gestão à Assembleia.",
        effects: { popularidade: 5, governabilidade: -5 },
        sectorEffects: { academicos: 5, politicos: -7 },
        leaning: 0,
      },
      {
        id: "resistir",
        label: "Resistir e dificultar o acesso a documentos",
        consequence:
          "Você protege informações sensíveis, mas a resistência é vista como sinal de culpa.",
        effects: { governabilidade: 2, popularidade: -8 },
        sectorEffects: { politicos: 4, academicos: -7, movimentosSociais: -6 },
        leaning: 0,
      },
    ],
  },
  {
    id: "epidemia-regional",
    title: "Epidemia Regional",
    category: "saude",
    description:
      "Um surto de doença infecciosa se espalha em regiões do estado, sobrecarregando postos de saúde locais.",
    choices: [
      {
        id: "lockdown",
        label: "Decretar quarentena e isolar as regiões afetadas",
        consequence:
          "O surto é contido rapidamente, mas a atividade econômica local é fortemente impactada.",
        effects: { saude: 10, economia: -7, popularidade: -3 },
        sectorEffects: { academicos: 7, empresariado: -8, populacao: -3 },
        leaning: -1,
      },
      {
        id: "monitoramento",
        label: "Apenas reforçar o monitoramento sem restrições",
        consequence:
          "A economia segue normalmente, mas o surto se espalha mais rápido, sobrecarregando o sistema de saúde.",
        effects: { saude: -6, economia: 2 },
        sectorEffects: { empresariado: 4, academicos: -7, populacao: -3 },
        leaning: 1,
      },
    ],
  },
  {
    id: "salario-minimo",
    title: "Reajuste do Piso Salarial Estadual",
    category: "economia",
    description:
      "Centrais sindicais pressionam por um reajuste real do piso salarial regional acima da inflação. Empresários alertam para o impacto nos custos.",
    choices: [
      {
        id: "aumentar",
        label: "Conceder aumento real acima da inflação",
        consequence:
          "Trabalhadores comemoram o ganho de poder de compra, mas pequenas empresas reduzem contratações.",
        effects: { popularidade: 8, economia: -5 },
        sectorEffects: { populacao: 9, empresariado: -9 },
        leaning: -2,
      },
      {
        id: "reajuste-minimo",
        label: "Conceder apenas reposição da inflação",
        consequence:
          "Solução neutra que evita grandes impactos econômicos, mas frustra expectativas dos trabalhadores.",
        effects: { economia: 1, popularidade: -2 },
        sectorEffects: { populacao: -4, empresariado: 3 },
        leaning: 1,
      },
    ],
  },
  {
    id: "cupula-clima",
    title: "Fórum Nacional de Governadores pelo Clima",
    category: "federativa",
    description:
      "Seu estado é cobrado a assumir metas ambiciosas de redução de emissões e desmatamento num fórum nacional de governadores, com prazos apertados.",
    choices: [
      {
        id: "assumir-metas",
        label: "Assumir metas ambiciosas de redução de emissões",
        consequence:
          "O estado ganha protagonismo nacional e atrai investidores internacionais, mas setores industriais pressionam contra os novos custos regulatórios.",
        effects: { relacoesInstitucionais: 9, meioAmbiente: 6, economia: -4 },
        sectorEffects: { movimentosSociais: 8, academicos: 6, empresariado: -6 },
        leaning: -2,
      },
      {
        id: "metas-moderadas",
        label: "Assumir apenas metas moderadas",
        consequence:
          "Uma posição de meio-termo, sem grandes ganhos nem grandes perdas.",
        effects: { relacoesInstitucionais: 2, meioAmbiente: 2 },
        sectorEffects: { empresariado: 3, movimentosSociais: -4 },
        leaning: 0,
      },
    ],
  },
  {
    id: "motim-militar",
    title: "Tensão na Polícia Militar",
    category: "seguranca",
    description:
      "Setores da Polícia Militar expressam publicamente insatisfação com cortes no orçamento da segurança pública, gerando um clima de tensão institucional.",
    choices: [
      {
        id: "aumentar-orcamento",
        label: "Aumentar o orçamento da PM para apaziguar",
        consequence:
          "A tensão institucional diminui, mas o gasto público aumenta e outras áreas ficam com menos recursos.",
        effects: { governabilidade: 8, seguranca: 4, economia: -6 },
        sectorEffects: { militares: 10, empresariado: -3 },
        leaning: 1,
      },
      {
        id: "manter-cortes",
        label: "Manter os cortes e reafirmar autoridade civil sobre a corporação",
        consequence:
          "Você reforça o controle civil sobre a Polícia Militar, mas a tensão institucional aumenta perigosamente.",
        effects: { governabilidade: -9, seguranca: -3 },
        sectorEffects: { militares: -10, academicos: 5, movimentosSociais: 4 },
        leaning: -1,
      },
    ],
  },
];
