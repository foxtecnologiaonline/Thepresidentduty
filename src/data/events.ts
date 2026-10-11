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
        label: "Aprovar a reforma",
        consequence:
          "A reforma passa. O caixa público melhora, mas grandes empresários reduzem investimentos e pressionam sua base no Congresso.",
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
      "Policiais estaduais entram em greve por salários melhores. A criminalidade começa a subir enquanto a categoria pede reajuste imediato.",
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
        label: "Não ceder e usar a força para conter a crise",
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
      "Hospitais públicos relatam superlotação e falta de leitos. A imprensa cobra uma resposta imediata do governo.",
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
    title: "Reforma do Ensino Médio",
    category: "educacao",
    description:
      "Especialistas propõem uma reforma curricular ampla. Professores temem precarização; parte da sociedade quer modernização rápida.",
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
      "Ruralistas pedem liberação de novas áreas para agricultura em regiões de proteção ambiental, alegando ganhos econômicos urgentes.",
    choices: [
      {
        id: "liberar",
        label: "Liberar as áreas para exploração",
        consequence:
          "A economia agrícola cresce e o agronegócio apoia seu governo, mas o desmatamento dispara e a comunidade internacional reage mal.",
        effects: { economia: 8, meioAmbiente: -12, relacoesInternacionais: -6 },
        sectorEffects: { empresariado: 10, movimentosSociais: -10, academicos: -6 },
        leaning: 2,
        triggersEventId: "cupula-clima",
      },
      {
        id: "proteger",
        label: "Manter a proteção ambiental",
        consequence:
          "Você preserva o meio ambiente e ganha respeito internacional, mas perde apoio do setor rural.",
        effects: { meioAmbiente: 8, relacoesInternacionais: 5, popularidade: -3 },
        sectorEffects: { movimentosSociais: 9, academicos: 5, empresariado: -7 },
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
        label: "Assinar o acordo",
        consequence:
          "As exportações crescem e sua imagem externa melhora, mas setores industriais locais protestam com demissões.",
        effects: { economia: 6, relacoesInternacionais: 9, popularidade: -4 },
        sectorEffects: { empresariado: 9, populacao: -5, politicos: 3 },
        leaning: 2,
      },
      {
        id: "recusar",
        label: "Recusar para proteger a indústria nacional",
        consequence:
          "Trabalhadores da indústria local agradecem, mas o país perde relevância diplomática.",
        effects: { popularidade: 3, relacoesInternacionais: -7 },
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
      "Um ministro de confiança é flagrado em um esquema de desvio de verbas. A oposição pede sua cabeça; aliados pedem discrição.",
    choices: [
      {
        id: "demitir",
        label: "Demitir o ministro e abrir investigação pública",
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
      "Milhares de pessoas tomam as ruas contra o custo de vida. Parte dos manifestantes pede sua renúncia; a polícia pede autorização para agir com rigor.",
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
          "Os protestos diminuem rapidamente, mas imagens de violência policial chocam o país.",
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
      "Chuvas históricas causam enchentes em várias cidades, deixando milhares desabrigados. O país espera uma resposta rápida do governo federal.",
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
    title: "Pauta Impopular no Congresso",
    category: "institucional",
    description:
      "Para manter sua base aliada, líderes do Congresso pedem que você apoie publicamente uma pauta polêmica e impopular.",
    choices: [
      {
        id: "apoiar",
        label: "Apoiar a pauta para manter a base aliada",
        consequence:
          "O Congresso permanece ao seu lado, mas a população reage negativamente à medida.",
        effects: { governabilidade: 8, popularidade: -6 },
        sectorEffects: { politicos: 9, populacao: -5 },
        leaning: 0,
      },
      {
        id: "recusar",
        label: "Recusar publicamente a pauta",
        consequence:
          "Você agrada a opinião pública, mas perde apoio de aliados importantes no Legislativo.",
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
      "Seu governo pode lançar um grande programa de incentivo a energias renováveis, com custo inicial alto mas retorno ambiental e de imagem no longo prazo.",
    choices: [
      {
        id: "investir",
        label: "Investir no programa",
        consequence:
          "O país se posiciona como líder ambiental, mas o investimento pesa nas contas públicas no curto prazo.",
        effects: { meioAmbiente: 10, relacoesInternacionais: 4, economia: -5 },
        sectorEffects: { movimentosSociais: 8, academicos: 6, empresariado: -4 },
        leaning: -2,
      },
      {
        id: "adiar",
        label: "Adiar o programa para depois do mandato",
        consequence:
          "O orçamento fica intacto, mas o país perde uma oportunidade de destaque internacional.",
        effects: { economia: 2, meioAmbiente: -3 },
        sectorEffects: { empresariado: 4, movimentosSociais: -6, academicos: -3 },
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
          "Sua postura é elogiada internacionalmente, mas parte da população teme sobrecarga dos serviços locais.",
        effects: { relacoesInternacionais: 8, popularidade: -4, saude: -2 },
        sectorEffects: { movimentosSociais: 9, academicos: 4, populacao: -5 },
        leaning: -2,
      },
      {
        id: "fechar",
        label: "Reforçar o controle e restringir a entrada",
        consequence:
          "Parte da população local aprova a medida, mas o país é criticado internacionalmente por direitos humanos.",
        effects: { seguranca: 4, relacoesInternacionais: -8, popularidade: 3 },
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
      "Hackers atacam sistemas de energia e bancos públicos, causando instabilidade e assustando investidores.",
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
    title: "Recessão Econômica Global",
    category: "economia",
    description:
      "Uma crise financeira internacional reduz as exportações e ameaça a economia nacional. O mercado espera sinais claros do governo.",
    choices: [
      {
        id: "estimulo",
        label: "Lançar pacote de estímulo econômico",
        consequence:
          "O impacto da crise é amenizado e empregos são preservados, mas a dívida pública cresce.",
        effects: { economia: 6, popularidade: 3, governabilidade: -3 },
        sectorEffects: { populacao: 7, empresariado: 4, politicos: -3 },
        leaning: -2,
      },
      {
        id: "austeridade",
        label: "Adotar austeridade fiscal",
        consequence:
          "As contas públicas ficam sob controle, mas o desemprego sobe e a população sofre no curto prazo.",
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
      "Uma seca severa reduz os reservatórios do país, forçando decisões impopulares sobre racionamento.",
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
        label: "Importar energia emergencialmente a alto custo",
        consequence:
          "A população não sente o impacto direto, mas o custo é alto para os cofres públicos.",
        effects: { economia: -9, popularidade: 3 },
        sectorEffects: { populacao: 4, empresariado: 3 },
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
          "A transparência fortalece sua imagem pública, mas expõe fragilidades da sua gestão ao Congresso.",
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
      "Um surto de doença infecciosa se espalha em regiões do país, sobrecarregando postos de saúde locais.",
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
    title: "Aumento do Salário Mínimo",
    category: "economia",
    description:
      "Centrais sindicais pressionam por um reajuste real do salário mínimo acima da inflação. Empresários alertam para o impacto nos custos.",
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
    title: "Cúpula Internacional do Clima",
    category: "internacional",
    description:
      "Seu país é convidado a assumir metas ambiciosas de redução de emissões em uma cúpula global de clima, com prazos apertados.",
    choices: [
      {
        id: "assumir-metas",
        label: "Assumir metas ambiciosas de redução de emissões",
        consequence:
          "O país ganha protagonismo internacional, mas setores industriais pressionam contra os novos custos regulatórios.",
        effects: { relacoesInternacionais: 9, meioAmbiente: 6, economia: -4 },
        sectorEffects: { movimentosSociais: 8, academicos: 6, empresariado: -6 },
        leaning: -2,
      },
      {
        id: "metas-moderadas",
        label: "Assumir apenas metas moderadas",
        consequence:
          "Uma posição de meio-termo, sem grandes ganhos nem grandes perdas.",
        effects: { relacoesInternacionais: 2, meioAmbiente: 2 },
        sectorEffects: { empresariado: 3, movimentosSociais: -4 },
        leaning: 0,
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
        id: "aumentar-orcamento",
        label: "Aumentar o orçamento militar para apaziguar",
        consequence:
          "A tensão institucional diminui, mas o gasto público aumenta e outras áreas ficam com menos recursos.",
        effects: { governabilidade: 8, seguranca: 4, economia: -6 },
        sectorEffects: { militares: 10, empresariado: -3 },
        leaning: 1,
      },
      {
        id: "manter-cortes",
        label: "Manter os cortes e reafirmar autoridade civil",
        consequence:
          "Você reforça o controle civil sobre os militares, mas a tensão institucional aumenta perigosamente.",
        effects: { governabilidade: -9, seguranca: -3 },
        sectorEffects: { militares: -10, academicos: 5, movimentosSociais: 4 },
        leaning: -1,
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
        label: "Conceder reajuste salarial para encerrar a greve",
        consequence:
          "As aulas voltam rápido e a categoria se sente valorizada, mas o orçamento da educação fica mais apertado para investimentos futuros.",
        effects: { educacao: 8, popularidade: 3, economia: -5 },
        sectorEffects: { academicos: 8, populacao: 4 },
        leaning: -1,
      },
      {
        id: "resistir-greve",
        label: "Não ceder e aguardar o desgaste da greve",
        consequence:
          "Você preserva o orçamento, mas o ano letivo é perdido em diversas escolas e a categoria fica ressentida.",
        effects: { educacao: -8, popularidade: -4 },
        sectorEffects: { academicos: -9, movimentosSociais: -4 },
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
          "Universidades seguem funcionando plenamente e a comunidade acadêmica agradece, mas o ajuste fiscal fica mais difícil.",
        effects: { educacao: 6, economia: -4 },
        sectorEffects: { academicos: 9, movimentosSociais: 3 },
        leaning: -2,
      },
      {
        id: "cortar-bolsas",
        label: "Aplicar o corte proposto",
        consequence:
          "As contas públicas respiram um pouco, mas a evasão nas universidades federais aumenta e a classe acadêmica se revolta.",
        effects: { educacao: -7, economia: 4 },
        sectorEffects: { academicos: -10, populacao: -2 },
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
          "O ensino público dá um salto de qualidade e ganha repercussão positiva, mas o investimento pesa bastante no orçamento deste ano.",
        effects: { educacao: 10, popularidade: 3, economia: -7 },
        sectorEffects: { academicos: 7, empresariado: 3 },
        leaning: -1,
      },
      {
        id: "piloto-tecnologia",
        label: "Rodar um piloto reduzido em poucas escolas",
        consequence:
          "Custo controlado, mas o impacto na educação é modesto e localizado.",
        effects: { educacao: 3, economia: -1 },
        sectorEffects: { academicos: 2 },
        leaning: 0,
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
        label: "Criar bolsa de permanência escolar para famílias de baixa renda",
        consequence:
          "A evasão cai e famílias pobres recebem um alívio imediato, mas o programa exige um gasto social recorrente.",
        effects: { educacao: 7, popularidade: 5, economia: -4 },
        sectorEffects: { populacao: 8, movimentosSociais: 5 },
        leaning: -2,
      },
      {
        id: "sem-programa",
        label: "Deixar a questão para os governos estaduais resolverem",
        consequence:
          "Você evita o gasto federal, mas a evasão escolar continua subindo e cobra um preço educacional no longo prazo.",
        effects: { educacao: -6, popularidade: -2 },
        sectorEffects: { populacao: -4 },
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
        label: "Lançar programa habitacional e negociar a saída pacífica",
        consequence:
          "As famílias saem das ocupações com destino garantido e o governo ganha apoio popular, mas o programa é caro.",
        effects: { popularidade: 7, economia: -6 },
        sectorEffects: { populacao: 9, movimentosSociais: 7, empresariado: -4 },
        leaning: -2,
      },
      {
        id: "reintegracao-posse",
        label: "Determinar reintegração de posse imediata",
        consequence:
          "A propriedade privada é respeitada e o empresariado aprova, mas as cenas de remoção forçada chocam parte da população.",
        effects: { popularidade: -8, seguranca: 2 },
        sectorEffects: { empresariado: 7, movimentosSociais: -10, populacao: -5 },
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
          "A greve é suspensa e os trabalhadores veem o governo como aliado, mas setores empresariais acusam o governo de recuo.",
        effects: { popularidade: 5, governabilidade: -3 },
        sectorEffects: { movimentosSociais: 9, populacao: 4, empresariado: -6 },
        leaning: -1,
      },
      {
        id: "manter-reforma",
        label: "Manter a reforma e deixar a greve seguir seu curso",
        consequence:
          "O mercado reage bem à firmeza do governo, mas a paralisação prolongada gera perdas econômicas e desgasta sua imagem.",
        effects: { economia: -4, popularidade: -6 },
        sectorEffects: { empresariado: 6, movimentosSociais: -9, populacao: -3 },
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
          "A medida é bem recebida e salva vidas no médio prazo, mas exige investimento contínuo e estruturação rápida.",
        effects: { seguranca: 4, popularidade: 6, economia: -4 },
        sectorEffects: { movimentosSociais: 10, populacao: 5 },
        leaning: -1,
      },
      {
        id: "campanha-sem-estrutura",
        label: "Lançar apenas uma campanha de conscientização, sem nova estrutura",
        consequence:
          "O gesto simbólico custa pouco, mas organizações de defesa das mulheres criticam a falta de ação concreta.",
        effects: { popularidade: -3 },
        sectorEffects: { movimentosSociais: -7 },
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
        label: "Expandir programas de transferência de renda e distribuição de alimentos",
        consequence:
          "A fome recua e o governo ganha apoio popular forte, mas o gasto social pressiona as contas públicas.",
        effects: { popularidade: 9, economia: -7 },
        sectorEffects: { populacao: 10, movimentosSociais: 6 },
        leaning: -2,
      },
      {
        id: "ajuda-pontual",
        label: "Manter apenas ajuda pontual e emergencial",
        consequence:
          "O impacto fiscal é menor, mas a fome continua afetando famílias vulneráveis e a crítica social cresce.",
        effects: { economia: 2, popularidade: -6 },
        sectorEffects: { populacao: -6, movimentosSociais: -5 },
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
        label: "Tornar a vacinação obrigatória por lei",
        consequence:
          "As taxas de imunização sobem rapidamente, mas grupos antivacina organizam protestos contra a medida.",
        effects: { saude: 9, popularidade: -3 },
        sectorEffects: { academicos: 6, movimentosSociais: -3 },
        leaning: -1,
      },
      {
        id: "campanha-voluntaria",
        label: "Manter a vacinação voluntária com campanha de incentivo",
        consequence:
          "Você evita o atrito político, mas a cobertura vacinal melhora pouco e o risco de surtos continua alto.",
        effects: { saude: 2 },
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
        label: "Financiar mutirões cirúrgicos emergenciais",
        consequence:
          "A fila diminui significativamente e pacientes agradecem, mas o custo extra pesa no orçamento da saúde.",
        effects: { saude: 9, popularidade: 4, economia: -5 },
        sectorEffects: { populacao: 6, academicos: 3 },
        leaning: -1,
      },
      {
        id: "triagem-criterios",
        label: "Apenas endurecer os critérios de triagem para conter a demanda",
        consequence:
          "O gasto público é controlado, mas pacientes esperam ainda mais e a insatisfação cresce.",
        effects: { saude: -5, popularidade: -4 },
        sectorEffects: { populacao: -5 },
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
        label: "Impor controle temporário de preços sobre itens básicos",
        consequence:
          "As famílias sentem alívio imediato, mas produtores reduzem a oferta e economistas alertam para desabastecimento futuro.",
        effects: { popularidade: 6, economia: -5 },
        sectorEffects: { populacao: 7, empresariado: -8 },
        leaning: -2,
      },
      {
        id: "livre-mercado",
        label: "Deixar o mercado se ajustar livremente",
        consequence:
          "A oferta se normaliza com o tempo, mas o custo de vida pesado no curto prazo gera forte insatisfação popular.",
        effects: { economia: 3, popularidade: -7 },
        sectorEffects: { empresariado: 5, populacao: -7 },
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
        id: "operacao-militar",
        label: "Lançar operação militar de grande escala",
        consequence:
          "O Estado reage com força e recupera território, mas a operação é cara e aumenta o risco de confrontos violentos.",
        effects: { seguranca: 9, economia: -5, popularidade: -2 },
        sectorEffects: { militares: 8, populacao: -4 },
        leaning: 2,
        triggersEventId: "motim-militar",
      },
      {
        id: "investimento-social-periferia",
        label: "Priorizar investimento social e presença do Estado nas periferias",
        consequence:
          "A estratégia reduz a adesão ao crime no longo prazo, mas não traz resultados imediatos e a crítica por fraqueza aumenta.",
        effects: { seguranca: -3, popularidade: -3, educacao: 3 },
        sectorEffects: { populacao: 6, movimentosSociais: 6, militares: -4 },
        leaning: -2,
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
          "O conflito é contido sem custos militares e o país ganha reputação de maturidade diplomática, mas parte da opinião pública vê como fraqueza.",
        effects: { relacoesInternacionais: 7, popularidade: -3 },
        sectorEffects: { politicos: 3, empresariado: 2 },
        leaning: -1,
      },
      {
        id: "mostrar-forca",
        label: "Reforçar a presença militar na fronteira",
        consequence:
          "A postura firme agrada a opinião pública interna, mas eleva a tensão com o vizinho e preocupa parceiros internacionais.",
        effects: { seguranca: 3, popularidade: 4, relacoesInternacionais: -6 },
        sectorEffects: { militares: 7, politicos: -3 },
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
          "As instituições saem fortalecidas e você ganha respeito como democrata, mas parte da sua base se sente traída.",
        effects: { governabilidade: -4, popularidade: 4 },
        sectorEffects: { academicos: 7, politicos: -5 },
        leaning: -1,
      },
      {
        id: "pressionar-judiciario",
        label: "Articular no Congresso para limitar os poderes da Corte",
        consequence:
          "Sua base aliada se anima com a reação, mas o episódio é lido como ataque à democracia e gera forte repercussão negativa.",
        effects: { governabilidade: 5, popularidade: -9, relacoesInternacionais: -4 },
        sectorEffects: { politicos: 8, academicos: -9, movimentosSociais: -5 },
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
          "A crise imediata é contida sem cortes drásticos, mas o país aceita juros mais altos no longo prazo.",
        effects: { economia: 5, governabilidade: -3 },
        sectorEffects: { empresariado: -4, politicos: -3 },
        leaning: -1,
      },
      {
        id: "ajuste-fiscal",
        label: "Impor um ajuste fiscal duro e imediato",
        consequence:
          "O risco de calote desaparece e o mercado aprova, mas o corte de gastos sociais pesa duramente sobre a população.",
        effects: { economia: 9, popularidade: -8 },
        sectorEffects: { empresariado: 7, populacao: -8 },
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
        label: "Usar reservas internacionais para intervir no câmbio",
        consequence:
          "A moeda se estabiliza rapidamente, mas o país consome uma parte valiosa de suas reservas internacionais.",
        effects: { economia: 4, relacoesInternacionais: 2 },
        sectorEffects: { empresariado: 5 },
        leaning: 0,
      },
      {
        id: "deixar-flutuar",
        label: "Deixar a moeda flutuar livremente",
        consequence:
          "As reservas internacionais ficam intactas, mas a inflação de produtos importados pressiona o bolso da população.",
        effects: { economia: -5, popularidade: -4 },
        sectorEffects: { populacao: -5, empresariado: 3 },
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
        id: "mobilizar-tropas",
        label: "Mobilizar tropas do Exército para reforçar a fronteira",
        consequence:
          "O fluxo ilegal cai rapidamente, mas a operação é cara e gera atrito diplomático com países vizinhos.",
        effects: { seguranca: 9, economia: -5, relacoesInternacionais: -3 },
        sectorEffects: { militares: 8 },
        leaning: 2,
      },
      {
        id: "cooperacao-inteligencia",
        label: "Investir em cooperação de inteligência regional",
        consequence:
          "A solução é mais barata e sustentável, mas os resultados demoram a aparecer.",
        effects: { seguranca: 3, relacoesInternacionais: 4 },
        sectorEffects: { militares: 2 },
        leaning: -1,
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
          "O diplomata é libertado em segurança, mas ceder às exigências fortalece grupos armados no país.",
        effects: { relacoesInternacionais: 5, seguranca: -6 },
        sectorEffects: { militares: -5 },
        leaning: -1,
      },
      {
        id: "operacao-resgate",
        label: "Autorizar uma operação de resgate à força",
        consequence:
          "A operação demonstra firmeza do Estado, mas arrisca a vida do refém e provoca retaliação do grupo.",
        effects: { seguranca: 4, relacoesInternacionais: -4 },
        sectorEffects: { militares: 6 },
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
          "O abastecimento é restabelecido rapidamente, mas a importação emergencial custa caro aos cofres públicos.",
        effects: { saude: 8, economia: -5 },
        sectorEffects: { populacao: 5, empresariado: -2 },
        leaning: -1,
      },
      {
        id: "racionar-estoque",
        label: "Racionar o estoque existente pelos casos mais graves",
        consequence:
          "O orçamento é preservado, mas pacientes com doenças crônicas sofrem com a falta de medicamentos contínuos.",
        effects: { saude: -5, popularidade: -4 },
        sectorEffects: { populacao: -5 },
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
        label: "Expandir a rede de Centros de Atenção Psicossocial",
        consequence:
          "O atendimento melhora de forma perceptível, mas a expansão da rede exige investimento contínuo.",
        effects: { saude: 7, popularidade: 3, economia: -4 },
        sectorEffects: { populacao: 6, academicos: 4 },
        leaning: -1,
      },
      {
        id: "resposta-minima-saude-mental",
        label: "Manter apenas o atendimento básico atual",
        consequence:
          "O orçamento não é afetado, mas a demanda reprimida continua crescendo e sobrecarregando postos de saúde.",
        effects: { saude: -4 },
        sectorEffects: { populacao: -3 },
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
          "A qualificação profissional avança e o mercado de trabalho reage bem, mas o investimento inicial é alto.",
        effects: { educacao: 9, economia: 3, popularidade: 3 },
        sectorEffects: { empresariado: 5, academicos: 4 },
        leaning: -1,
      },
      {
        id: "iniciativa-privada",
        label: "Deixar a expansão a cargo de instituições privadas, com incentivo fiscal",
        consequence:
          "O custo para o Estado é baixo, mas o alcance fica limitado a quem pode pagar ou mora perto das unidades privadas.",
        effects: { educacao: 3, economia: -2 },
        sectorEffects: { empresariado: 6, academicos: -2 },
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
        label: "Determinar o recall imediato e a reimpressão dos livros",
        consequence:
          "O problema é corrigido rapidamente e a confiança das famílias é restaurada, mas o recall custa caro e às pressas.",
        effects: { educacao: 6, popularidade: 4, economia: -4 },
        sectorEffects: { academicos: 6, populacao: 3 },
        leaning: 0,
      },
      {
        id: "correcao-gradual",
        label: "Corrigir o material apenas na próxima licitação",
        consequence:
          "O orçamento é preservado, mas os erros continuam em sala de aula por mais um ano letivo.",
        effects: { educacao: -4, popularidade: -3 },
        sectorEffects: { academicos: -5 },
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
          "A área é retomada e a contaminação é contida, mas a operação é cara e enfrenta resistência armada no local.",
        effects: { meioAmbiente: 9, relacoesInternacionais: 3, economia: -3 },
        sectorEffects: { movimentosSociais: 9, militares: 2, empresariado: -5 },
        leaning: -2,
      },
      {
        id: "tolerar-garimpo",
        label: "Tolerar a atividade, citando sua importância econômica local",
        consequence:
          "Comunidades que dependem do garimpo comemoram, mas a contaminação avança e o país é criticado internacionalmente.",
        effects: { meioAmbiente: -9, relacoesInternacionais: -5, economia: 3 },
        sectorEffects: { empresariado: 5, movimentosSociais: -9 },
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
        label: "Multar pesadamente as empresas e exigir novo tratamento de efluentes",
        consequence:
          "O rio começa a se recuperar e a população se sente protegida, mas as empresas ameaçam cortar postos de trabalho.",
        effects: { meioAmbiente: 7, popularidade: 4, economia: -3 },
        sectorEffects: { empresariado: -7, movimentosSociais: 6, populacao: 4 },
        leaning: -1,
      },
      {
        id: "proteger-empregos",
        label: "Negociar prazo mais longo de adequação para proteger os empregos locais",
        consequence:
          "Os empregos são mantidos no curto prazo, mas a contaminação do rio continua afetando a saúde das comunidades vizinhas.",
        effects: { meioAmbiente: -5, economia: 2 },
        sectorEffects: { empresariado: 5, movimentosSociais: -5 },
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
        label: "Ajustar a política para evitar as sanções",
        consequence:
          "As relações comerciais são preservadas, mas parte da sua base acusa o governo de curvar-se à pressão estrangeira.",
        effects: { relacoesInternacionais: 8, governabilidade: -5 },
        sectorEffects: { empresariado: 4, politicos: -5 },
        leaning: -1,
      },
      {
        id: "resistir-sancoes",
        label: "Resistir e aceitar o risco das sanções em nome da soberania",
        consequence:
          "O discurso de soberania nacional agrada parte da população, mas as sanções atingem duramente a economia.",
        effects: { relacoesInternacionais: -9, economia: -6, popularidade: 4 },
        sectorEffects: { politicos: 5, empresariado: -6 },
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
        label: "Ampliar vagas de acolhimento humanitário e agilizar vistos",
        consequence:
          "O país é elogiado internacionalmente por sua postura humanitária, mas parte da população teme sobrecarga dos serviços locais.",
        effects: { relacoesInternacionais: 7, popularidade: -3 },
        sectorEffects: { movimentosSociais: 8, academicos: 3, populacao: -4 },
        leaning: -2,
      },
      {
        id: "vistos-limitados",
        label: "Limitar fortemente a concessão de novos vistos de refúgio",
        consequence:
          "Parte da população local aprova a medida, mas o país perde prestígio e é criticado por organismos internacionais.",
        effects: { relacoesInternacionais: -6, popularidade: 2 },
        sectorEffects: { movimentosSociais: -7, populacao: 3 },
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
        label: "Apoiar publicamente a reforma, mesmo contra parte da sua base",
        consequence:
          "O sistema político ganha em transparência e você é visto como estadista, mas perde apoio de aliados que temem a mudança.",
        effects: { governabilidade: -6, popularidade: 5 },
        sectorEffects: { politicos: -7, academicos: 5 },
        leaning: -1,
      },
      {
        id: "manter-regras",
        label: "Articular para manter as regras eleitorais atuais",
        consequence:
          "Sua base aliada se fortalece, mas críticos acusam o governo de blindar o próprio sistema contra renovação política.",
        effects: { governabilidade: 6, popularidade: -4 },
        sectorEffects: { politicos: 7, academicos: -4 },
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
        label: "Divulgar publicamente a extensão do vazamento e as medidas corretivas",
        consequence:
          "A transparência é bem recebida pela opinião pública especializada, mas expõe a fragilidade da infraestrutura digital do governo.",
        effects: { popularidade: 3, governabilidade: -4 },
        sectorEffects: { academicos: 5, politicos: -4 },
        leaning: 0,
      },
      {
        id: "minimizar-vazamento",
        label: "Minimizar publicamente o ocorrido e evitar detalhes",
        consequence:
          "O desgaste imediato é menor, mas a fragilidade de segurança não é corrigida e volta a ser explorada.",
        effects: { popularidade: -7, governabilidade: 2 },
        sectorEffects: { academicos: -7 },
        leaning: 0,
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
        label: "Anunciar novas políticas afirmativas e de reparação histórica",
        consequence:
          "Movimentos sociais comemoram um avanço histórico, mas a medida enfrenta forte resistência de parte do Congresso.",
        effects: { popularidade: 5, governabilidade: -3 },
        sectorEffects: { movimentosSociais: 10, populacao: 4, politicos: -4 },
        leaning: -2,
      },
      {
        id: "sem-nova-politica",
        label: "Não anunciar novas políticas, tratando o caso como isolado",
        consequence:
          "Parte do Congresso respira aliviada, mas os protestos se intensificam e o governo é acusado de omissão.",
        effects: { popularidade: -6 },
        sectorEffects: { movimentosSociais: -9, populacao: -3 },
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
          "Os casos de negligência caem e famílias ganham uma alternativa pública confiável, mas o programa exige orçamento contínuo.",
        effects: { saude: 4, popularidade: 6, economia: -4 },
        sectorEffects: { populacao: 7, movimentosSociais: 5 },
        leaning: -1,
      },
      {
        id: "fiscalizacao-minima",
        label: "Deixar a fiscalização a cargo dos governos estaduais, sem novo investimento federal",
        consequence:
          "O orçamento federal não é afetado, mas os casos de negligência continuam se repetindo pelo país.",
        effects: { popularidade: -5 },
        sectorEffects: { populacao: -5 },
        leaning: 1,
      },
    ],
  },
];
