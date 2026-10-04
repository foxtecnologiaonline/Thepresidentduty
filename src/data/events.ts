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

  // --- Segunda leva: dobra o baralho e garante pelo menos 4 eventos por categoria,
  // para que nenhuma frente de governo fique de fora de boa parte das partidas. ---

  {
    id: "greve-professores",
    title: "Greve dos Professores da Rede Estadual",
    category: "educacao",
    description:
      "O sindicato dos professores da rede estadual entra em greve por salários melhores, suspendendo as aulas em milhares de escolas.",
    choices: [
      {
        id: "negociar-reajuste",
        label: "Conceder reajuste salarial aos professores",
        consequence:
          "A greve termina e a categoria volta às salas de aula, mas o orçamento sofre um impacto relevante.",
        effects: { educacao: 8, economia: -6 },
        sectorEffects: { movimentosSociais: 6, academicos: 5 },
        leaning: -1,
      },
      {
        id: "substitutos",
        label: "Contratar professores temporários para não parar as aulas",
        consequence:
          "As aulas continuam, mas a categoria se sente desrespeitada e a qualidade do ensino cai.",
        effects: { educacao: -5, popularidade: -4 },
        sectorEffects: { academicos: -8, movimentosSociais: -6 },
        leaning: 2,
      },
    ],
  },
  {
    id: "merenda-escolar",
    title: "Crise na Merenda Escolar",
    category: "educacao",
    description:
      "Um relatório aponta irregularidades na compra de merenda da rede estadual, bem no momento em que o orçamento do programa está no limite.",
    choices: [
      {
        id: "reforcar-fiscalizacao",
        label: "Reforçar a fiscalização e reforçar a verba do programa",
        consequence:
          "A merenda melhora e o episódio vira um ponto positivo de transparência, mas custa caro aos cofres do estado.",
        effects: { educacao: 6, economia: -4, popularidade: 3 },
        sectorEffects: { populacao: 5, academicos: 3 },
        leaning: -1,
      },
      {
        id: "terceirizar",
        label: "Terceirizar o fornecimento para uma grande empresa",
        consequence:
          "A solução é barata e rápida, mas gera desconfiança sobre a qualidade da comida servida aos alunos.",
        effects: { economia: 3, educacao: -4 },
        sectorEffects: { empresariado: 6, movimentosSociais: -5 },
        leaning: 2,
      },
    ],
  },
  {
    id: "escolas-civico-militares",
    title: "Expansão de Escolas Cívico-Militares",
    category: "educacao",
    description:
      "Um projeto propõe converter escolas estaduais em modelo cívico-militar, com participação da Polícia Militar na gestão disciplinar. As famílias se dividem.",
    choices: [
      {
        id: "expandir",
        label: "Expandir o modelo para toda a rede estadual",
        consequence:
          "A disciplina melhora em parte da rede, mas educadores veem o modelo como militarização do ensino.",
        effects: { educacao: 4, seguranca: 3, popularidade: -2 },
        sectorEffects: { militares: 7, academicos: -6, movimentosSociais: -5 },
        leaning: 2,
      },
      {
        id: "manter-modelo-tradicional",
        label: "Manter o modelo tradicional de gestão escolar",
        consequence:
          "A comunidade escolar aprova a continuidade, ainda que sem grandes mudanças visíveis.",
        effects: { educacao: 2, popularidade: 2 },
        sectorEffects: { academicos: 4, militares: -3 },
        leaning: -1,
      },
    ],
  },
  {
    id: "ocupacao-urbana",
    title: "Ocupação Urbana em Área de Risco",
    category: "social",
    description:
      "Milhares de famílias sem moradia ocupam um terreno público em área de risco geológico na capital. A Justiça determina reintegração de posse.",
    choices: [
      {
        id: "reintegrar",
        label: "Cumprir a reintegração de posse com apoio policial",
        consequence:
          "A ordem judicial é cumprida, mas as imagens da remoção forçada chocam parte da opinião pública.",
        effects: { seguranca: 3, popularidade: -9 },
        sectorEffects: { militares: 4, movimentosSociais: -10, populacao: -5 },
        leaning: 2,
      },
      {
        id: "negociar-moradia",
        label: "Suspender a reintegração e negociar um programa habitacional",
        consequence:
          "As famílias são atendidas e sua imagem social melhora, mas o episódio custa caro ao orçamento.",
        effects: { popularidade: 7, economia: -5 },
        sectorEffects: { movimentosSociais: 9, populacao: 6, empresariado: -4 },
        leaning: -2,
      },
    ],
  },
  {
    id: "crise-fome",
    title: "Crise de Segurança Alimentar",
    category: "social",
    description:
      "Filas por doações de alimentos se multiplicam nas grandes cidades do estado, expondo o agravamento da fome e pressionando o governo por uma resposta.",
    choices: [
      {
        id: "programa-emergencial",
        label: "Criar um programa emergencial de distribuição de alimentos",
        consequence:
          "Milhares de famílias são atendidas e sua popularidade sobe, mas o programa pesa no orçamento.",
        effects: { popularidade: 7, economia: -5 },
        sectorEffects: { populacao: 8, movimentosSociais: 5 },
        leaning: -2,
      },
      {
        id: "repassar-municipios",
        label: "Repassar a responsabilidade aos municípios",
        consequence:
          "O estado preserva seu caixa, mas a fome segue crescendo e a população cobra uma resposta sua.",
        effects: { economia: 1, popularidade: -6 },
        sectorEffects: { populacao: -6, politicos: -3 },
        leaning: 1,
      },
    ],
  },
  {
    id: "violencia-policial-caso",
    title: "Caso de Violência Policial Repercute no País",
    category: "social",
    description:
      "Um vídeo de abordagem policial violenta contra um morador viraliza e gera indignação nacional, reacendendo o debate sobre segurança pública no estado.",
    choices: [
      {
        id: "investigar-afastar",
        label: "Afastar os policiais envolvidos e abrir investigação rigorosa",
        consequence:
          "A resposta firme é bem recebida pela sociedade civil, mas gera ressentimento dentro da corporação.",
        effects: { popularidade: 5, seguranca: -3 },
        sectorEffects: { movimentosSociais: 9, militares: -8, academicos: 4 },
        leaning: -1,
      },
      {
        id: "apoiar-corporacao",
        label: "Defender publicamente a atuação da corporação",
        consequence:
          "A Polícia Militar se sente respaldada, mas a repercussão negativa do caso atinge sua imagem.",
        effects: { seguranca: 2, popularidade: -8 },
        sectorEffects: { militares: 7, movimentosSociais: -10, populacao: -4 },
        leaning: 2,
      },
    ],
  },
  {
    id: "falta-medicamentos",
    title: "Desabastecimento de Medicamentos",
    category: "saude",
    description:
      "Hospitais e postos de saúde da rede estadual relatam falta de medicamentos básicos após atraso num processo de compra.",
    choices: [
      {
        id: "compra-emergencial",
        label: "Fazer uma compra emergencial a preço mais alto",
        consequence:
          "O desabastecimento é resolvido rapidamente, mas a compra sem licitação plena custa caro ao estado.",
        effects: { saude: 8, economia: -6 },
        sectorEffects: { populacao: 6, empresariado: 2 },
        leaning: -1,
      },
      {
        id: "racionar-estoque",
        label: "Racionar o estoque disponível entre as unidades",
        consequence:
          "O orçamento é preservado, mas pacientes de várias regiões ficam sem acesso a remédios essenciais.",
        effects: { saude: -5, economia: 1 },
        sectorEffects: { populacao: -6, academicos: -3 },
        leaning: 1,
      },
    ],
  },
  {
    id: "surto-dengue",
    title: "Surto de Dengue",
    category: "saude",
    description:
      "A chegada do verão combinada com chuvas intensas dispara os casos de dengue no estado, lotando as emergências da rede estadual.",
    choices: [
      {
        id: "mutirao-combate",
        label: "Lançar um mutirão estadual de combate ao mosquito e ampliar leitos",
        consequence:
          "Os casos recuam e a resposta rápida é bem avaliada, mas o mutirão emergencial tem custo alto.",
        effects: { saude: 9, economia: -5, popularidade: 4 },
        sectorEffects: { populacao: 6, academicos: 3 },
        leaning: -1,
      },
      {
        id: "campanha-basica",
        label: "Fazer apenas uma campanha informativa básica",
        consequence:
          "O gasto é mínimo, mas os casos continuam subindo e a rede de saúde fica sobrecarregada.",
        effects: { saude: -5, economia: 1 },
        sectorEffects: { populacao: -5 },
        leaning: 1,
      },
    ],
  },
  {
    id: "divida-uniao",
    title: "Renegociação da Dívida com a União",
    category: "economia",
    description:
      "O estado pode renegociar sua dívida com o Governo Federal, aceitando contrapartidas de ajuste fiscal em troca de alívio imediato no caixa.",
    choices: [
      {
        id: "aceitar-ajuste",
        label: "Aceitar as contrapartidas e aliviar o caixa agora",
        consequence:
          "As contas do estado respiram, mas as contrapartidas exigidas pela União incomodam sua base aliada.",
        effects: { economia: 9, relacoesInstitucionais: 4, popularidade: -4 },
        sectorEffects: { empresariado: 5, politicos: -3 },
        leaning: 1,
      },
      {
        id: "recusar-contrapartidas",
        label: "Recusar e manter autonomia sobre o orçamento",
        consequence:
          "Você preserva a autonomia do estado, mas o caixa segue apertado e a relação com Brasília esfria.",
        effects: { economia: -4, relacoesInstitucionais: -5, popularidade: 3 },
        sectorEffects: { politicos: 4, movimentosSociais: 3 },
        leaning: -1,
      },
    ],
  },
  {
    id: "crise-turismo",
    title: "Crise no Setor de Turismo",
    category: "economia",
    description:
      "Uma crise reduz drasticamente o turismo no estado, afetando hotéis, restaurantes e o comércio das cidades turísticas.",
    choices: [
      {
        id: "desonerar-setor",
        label: "Conceder desoneração fiscal temporária ao setor de turismo",
        consequence:
          "O setor se recupera mais rápido e empregos são preservados, mas o estado abre mão de receita.",
        effects: { economia: -3, popularidade: 5 },
        sectorEffects: { empresariado: 8, populacao: 4 },
        leaning: 1,
      },
      {
        id: "sem-intervencao",
        label: "Deixar o mercado se ajustar sozinho",
        consequence:
          "O caixa do estado não é afetado, mas comerciantes e trabalhadores do setor se sentem abandonados.",
        effects: { economia: 3, popularidade: -5 },
        sectorEffects: { empresariado: -7, populacao: -3 },
        leaning: 0,
      },
    ],
  },
  {
    id: "faccoes-criminosas",
    title: "Avanço de Facções Criminosas",
    category: "seguranca",
    description:
      "Facções criminosas disputam o controle de bairros periféricos, elevando os índices de violência e o medo da população.",
    choices: [
      {
        id: "operacao-grande-escala",
        label: "Lançar uma grande operação policial nas áreas dominadas pelo crime",
        consequence:
          "A ofensiva reduz a presença das facções, mas o confronto tem custo alto e gera baixas entre moradores.",
        effects: { seguranca: 9, economia: -5, popularidade: -3 },
        sectorEffects: { militares: 6, movimentosSociais: -7, populacao: -3 },
        leaning: 2,
      },
      {
        id: "programas-sociais",
        label: "Investir em programas sociais nas comunidades afetadas",
        consequence:
          "A estratégia reduz o apelo do crime a médio prazo e melhora sua imagem, mas os resultados demoram a aparecer.",
        effects: { seguranca: 3, economia: -4, popularidade: 5 },
        sectorEffects: { movimentosSociais: 8, populacao: 6 },
        leaning: -2,
      },
    ],
  },
  {
    id: "crise-carceraria",
    title: "Crise no Sistema Penitenciário Estadual",
    category: "seguranca",
    description:
      "A superlotação nos presídios estaduais provoca uma rebelião com reféns, expondo o colapso do sistema prisional.",
    choices: [
      {
        id: "negociar-rendicao",
        label: "Negociar a rendição pacífica dos detentos",
        consequence:
          "A crise termina sem mortes e sua postura é elogiada, mas os problemas estruturais do sistema continuam.",
        effects: { seguranca: 2, popularidade: 4 },
        sectorEffects: { movimentosSociais: 4, militares: -2 },
        leaning: -1,
      },
      {
        id: "intervencao-tatica",
        label: "Autorizar uma intervenção tática imediata",
        consequence:
          "A rebelião é controlada rapidamente, mas o uso da força gera críticas de órgãos de direitos humanos.",
        effects: { seguranca: 5, popularidade: -7 },
        sectorEffects: { militares: 6, movimentosSociais: -8 },
        leaning: 2,
      },
    ],
  },
  {
    id: "rompimento-barragem",
    title: "Risco de Rompimento de Barragem de Mineração",
    category: "ambiental",
    description:
      "Uma barragem de rejeitos de mineração apresenta rachaduras críticas, ameaçando comunidades inteiras rio abaixo.",
    choices: [
      {
        id: "evacuar-suspender",
        label: "Evacuar a área e suspender as atividades da mineradora",
        consequence:
          "Vidas são preservadas e sua postura preventiva é elogiada, mas a suspensão custa empregos e arrecadação.",
        effects: { meioAmbiente: 8, economia: -7, popularidade: 6 },
        sectorEffects: { movimentosSociais: 9, empresariado: -9, populacao: 5 },
        leaning: -2,
      },
      {
        id: "monitorar-manter",
        label: "Apenas intensificar o monitoramento e manter a operação",
        consequence:
          "A economia local é preservada por ora, mas o risco permanece e sua gestão é vista como negligente.",
        effects: { economia: 3, meioAmbiente: -6, popularidade: -5 },
        sectorEffects: { empresariado: 6, movimentosSociais: -9 },
        leaning: 2,
      },
    ],
  },
  {
    id: "guerra-fiscal",
    title: "Guerra Fiscal com Estado Vizinho",
    category: "federativa",
    description:
      "Um estado vizinho oferece incentivos fiscais agressivos para atrair empresas hoje instaladas no seu estado, ameaçando empregos locais.",
    choices: [
      {
        id: "igualar-incentivos",
        label: "Igualar os incentivos fiscais para reter as empresas",
        consequence:
          "As empresas permanecem e os empregos são mantidos, mas o estado abre mão de receita e irrita vizinhos.",
        effects: { economia: -4, relacoesInstitucionais: -5 },
        sectorEffects: { empresariado: 7, politicos: -3 },
        leaning: 1,
      },
      {
        id: "acionar-confaz",
        label: "Acionar o CONFAZ para contestar os incentivos",
        consequence:
          "Você evita entrar numa disputa de renúncia fiscal, mas o desfecho jurídico é incerto e lento.",
        effects: { relacoesInstitucionais: 3, economia: -1 },
        sectorEffects: { politicos: 3 },
        leaning: -1,
      },
    ],
  },
  {
    id: "royalties-mineracao",
    title: "Disputa por Royalties de Mineração",
    category: "federativa",
    description:
      "Estados vizinhos disputam na Justiça uma redistribuição mais ampla dos royalties de mineração e petróleo, hoje concentrados no seu estado.",
    choices: [
      {
        id: "defender-concentracao",
        label: "Defender judicialmente a manutenção dos recursos no seu estado",
        consequence:
          "O caixa do estado é preservado, mas a disputa desgasta a relação com os estados vizinhos.",
        effects: { economia: 5, relacoesInstitucionais: -6 },
        sectorEffects: { empresariado: 4, politicos: 3 },
        leaning: 1,
      },
      {
        id: "aceitar-partilha",
        label: "Aceitar uma partilha mais ampla com os estados vizinhos",
        consequence:
          "Você ganha prestígio federativo e evita um embate longo, mas abre mão de parte da receita.",
        effects: { economia: -5, relacoesInstitucionais: 7 },
        sectorEffects: { politicos: -2 },
        leaning: -1,
      },
    ],
  },
  {
    id: "fake-news-crise",
    title: "Crise de Desinformação",
    category: "institucional",
    description:
      "Uma onda de notícias falsas sobre uma ação do seu governo viraliza nas redes sociais, gerando confusão e desgaste de imagem.",
    choices: [
      {
        id: "campanha-esclarecimento",
        label: "Lançar uma campanha oficial de esclarecimento",
        consequence:
          "Parte da confusão é desfeita, mas a campanha tem um custo e nem todos são convencidos.",
        effects: { popularidade: 4, economia: -2 },
        sectorEffects: { academicos: 3, populacao: 3 },
        leaning: 0,
      },
      {
        id: "ignorar",
        label: "Ignorar e deixar o episódio perder força sozinho",
        consequence: "Você não gasta recursos, mas a desinformação circula livremente e corrói sua imagem.",
        effects: { popularidade: -6 },
        sectorEffects: { movimentosSociais: -3 },
        leaning: 0,
      },
    ],
  },
  {
    id: "atrito-judiciario",
    title: "Atrito com o Tribunal de Justiça",
    category: "institucional",
    description:
      "O Tribunal de Justiça do estado suspende um decreto do seu governo por considerá-lo inconstitucional, gerando um embate entre os poderes.",
    choices: [
      {
        id: "acatar-decisao",
        label: "Acatar a decisão e recuar publicamente",
        consequence:
          "Você evita uma crise institucional maior, mas o recuo é lido como um sinal de fraqueza política.",
        effects: { governabilidade: -3, popularidade: 3 },
        sectorEffects: { academicos: 4, politicos: -2 },
        leaning: 0,
      },
      {
        id: "contestar-decisao",
        label: "Contestar a decisão em instâncias superiores",
        consequence:
          "Sua base aliada vê firmeza no gesto, mas o embate com o Judiciário desgasta sua imagem institucional.",
        effects: { governabilidade: 3, popularidade: -4 },
        sectorEffects: { politicos: 4, academicos: -5 },
        leaning: 0,
      },
    ],
  },
];
