import type { GameEvent } from "../types";

export const EVENTS: GameEvent[] = [
  {
    id: "reforma-tributaria",
    title: "Reforma Tributária",
    description:
      "Seu ministério da Fazenda propõe uma reforma tributária que simplifica impostos, mas taxa mais os mais ricos. Empresários pressionam contra; a população pobre apoia.",
    choices: [
      {
        id: "aprovar",
        label: "Aprovar a reforma",
        consequence:
          "A reforma passa. O caixa público melhora, mas grandes empresários reduzem investimentos e pressionam sua base no Congresso.",
        effects: { economia: 8, popularidade: 4, governabilidade: -6 },
        leaning: -2,
      },
      {
        id: "recuar",
        label: "Recuar e negociar uma versão mais branda",
        consequence:
          "Você evita o embate, mas a população vê como recuo diante das elites.",
        effects: { governabilidade: 4, popularidade: -5 },
        leaning: 1,
      },
    ],
  },
  {
    id: "greve-policial",
    title: "Greve da Polícia",
    description:
      "Policiais estaduais entram em greve por salários melhores. A criminalidade começa a subir enquanto a categoria pede reajuste imediato.",
    choices: [
      {
        id: "atender",
        label: "Atender a reivindicação salarial",
        consequence:
          "A greve termina rápido e a segurança se estabiliza, mas o orçamento sofre um rombo.",
        effects: { seguranca: 10, economia: -8 },
        leaning: 1,
      },
      {
        id: "negociar-parcelado",
        label: "Negociar reajuste parcelado",
        consequence:
          "Solução intermediária: a greve arrefece aos poucos e o impacto fiscal é menor.",
        effects: { seguranca: 4, economia: -3, popularidade: -2 },
        leaning: 0,
      },
      {
        id: "linha-dura",
        label: "Não ceder e usar a força para conter a crise",
        consequence:
          "Você mantém o orçamento, mas a insegurança aumenta e sua imagem é desgastada.",
        effects: { seguranca: -10, popularidade: -6 },
        leaning: 2,
      },
    ],
  },
  {
    id: "crise-hospitalar",
    title: "Colapso na Rede Hospitalar",
    description:
      "Hospitais públicos relatam superlotação e falta de leitos. A imprensa cobra uma resposta imediata do governo.",
    choices: [
      {
        id: "investir",
        label: "Investir pesado em saúde emergencial",
        consequence:
          "Novos leitos e equipamentos aliviam a crise, mas o gasto extra pesa no orçamento.",
        effects: { saude: 12, popularidade: 5, economia: -6 },
        leaning: -2,
      },
      {
        id: "parceria-privada",
        label: "Firmar parcerias com hospitais privados",
        consequence:
          "Solução rápida e mais barata, mas gera críticas de privatização disfarçada da saúde pública.",
        effects: { saude: 6, economia: -1, popularidade: -2 },
        leaning: 2,
      },
    ],
  },
  {
    id: "reforma-educacional",
    title: "Reforma do Ensino Médio",
    description:
      "Especialistas propõem uma reforma curricular ampla. Professores temem precarização; parte da sociedade quer modernização rápida.",
    choices: [
      {
        id: "implementar",
        label: "Implementar a reforma integralmente",
        consequence:
          "A educação avança no médio prazo, mas o processo é turbulento e gera desgaste com sindicatos.",
        effects: { educacao: 10, popularidade: -3, governabilidade: -2 },
        leaning: -1,
      },
      {
        id: "piloto",
        label: "Testar em projeto-piloto antes de expandir",
        consequence:
          "Abordagem cautelosa: ganho menor, porém sem grandes atritos.",
        effects: { educacao: 4, governabilidade: 2 },
        leaning: 0,
      },
    ],
  },
  {
    id: "desmatamento",
    title: "Pressão do Agronegócio",
    description:
      "Ruralistas pedem liberação de novas áreas para agricultura em regiões de proteção ambiental, alegando ganhos econômicos urgentes.",
    choices: [
      {
        id: "liberar",
        label: "Liberar as áreas para exploração",
        consequence:
          "A economia agrícola cresce e o agronegócio apoia seu governo, mas o desmatamento dispara e a comunidade internacional reage mal.",
        effects: { economia: 8, meioAmbiente: -12, relacoesInternacionais: -6 },
        leaning: 2,
      },
      {
        id: "proteger",
        label: "Manter a proteção ambiental",
        consequence:
          "Você preserva o meio ambiente e ganha respeito internacional, mas perde apoio do setor rural.",
        effects: { meioAmbiente: 8, relacoesInternacionais: 5, popularidade: -3 },
        leaning: -2,
      },
    ],
  },
  {
    id: "acordo-comercial",
    title: "Acordo Comercial Internacional",
    description:
      "Um grande bloco econômico oferece um acordo de livre comércio. Ele abre mercados, mas ameaça indústrias nacionais menos competitivas.",
    choices: [
      {
        id: "assinar",
        label: "Assinar o acordo",
        consequence:
          "As exportações crescem e sua imagem externa melhora, mas setores industriais locais protestam com demissões.",
        effects: { economia: 6, relacoesInternacionais: 9, popularidade: -4 },
        leaning: 2,
      },
      {
        id: "recusar",
        label: "Recusar para proteger a indústria nacional",
        consequence:
          "Trabalhadores da indústria local agradecem, mas o país perde relevância diplomática.",
        effects: { popularidade: 3, relacoesInternacionais: -7 },
        leaning: -1,
      },
    ],
  },
  {
    id: "escandalo-corrupcao",
    title: "Escândalo de Corrupção",
    description:
      "Um ministro de confiança é flagrado em um esquema de desvio de verbas. A oposição pede sua cabeça; aliados pedem discrição.",
    choices: [
      {
        id: "demitir",
        label: "Demitir o ministro e abrir investigação pública",
        consequence:
          "Transparência acalma a opinião pública, mas fragiliza sua base política interna.",
        effects: { popularidade: 6, governabilidade: -7 },
        leaning: 0,
      },
      {
        id: "proteger",
        label: "Proteger o aliado e abafar o caso",
        consequence:
          "Você mantém a base de apoio, mas o escândalo vaza para a imprensa e sua credibilidade cai.",
        effects: { governabilidade: 4, popularidade: -10 },
        leaning: 0,
      },
    ],
  },
  {
    id: "protesto-popular",
    title: "Protesto Popular Massivo",
    description:
      "Milhares de pessoas tomam as ruas contra o custo de vida. Parte dos manifestantes pede sua renúncia; a polícia pede autorização para agir com rigor.",
    choices: [
      {
        id: "dialogo",
        label: "Abrir diálogo com os manifestantes",
        consequence:
          "O gesto acalma os ânimos e melhora sua imagem, embora nada seja resolvido de imediato.",
        effects: { popularidade: 6, seguranca: 1 },
        leaning: -1,
      },
      {
        id: "reprimir",
        label: "Autorizar repressão policial forte",
        consequence:
          "Os protestos diminuem rapidamente, mas imagens de violência policial chocam o país.",
        effects: { seguranca: 5, popularidade: -12 },
        leaning: 2,
      },
    ],
  },
  {
    id: "enchente",
    title: "Enchentes Devastadoras",
    description:
      "Chuvas históricas causam enchentes em várias cidades, deixando milhares desabrigados. O país espera uma resposta rápida do governo federal.",
    choices: [
      {
        id: "resposta-rapida",
        label: "Mobilizar resposta emergencial imediata",
        consequence:
          "A ajuda rápida salva vidas e é bem recebida, mas consome recursos significativos do orçamento.",
        effects: { popularidade: 8, meioAmbiente: 2, economia: -5 },
        leaning: -1,
      },
      {
        id: "resposta-lenta",
        label: "Seguir o protocolo padrão sem ações extraordinárias",
        consequence:
          "Você preserva o orçamento, mas a lentidão da resposta gera revolta popular.",
        effects: { economia: 2, popularidade: -9 },
        leaning: 1,
      },
    ],
  },
  {
    id: "pauta-impopular",
    title: "Pauta Impopular no Congresso",
    description:
      "Para manter sua base aliada, líderes do Congresso pedem que você apoie publicamente uma pauta polêmica e impopular.",
    choices: [
      {
        id: "apoiar",
        label: "Apoiar a pauta para manter a base aliada",
        consequence:
          "O Congresso permanece ao seu lado, mas a população reage negativamente à medida.",
        effects: { governabilidade: 8, popularidade: -6 },
        leaning: 0,
      },
      {
        id: "recusar",
        label: "Recusar publicamente a pauta",
        consequence:
          "Você agrada a opinião pública, mas perde apoio de aliados importantes no Legislativo.",
        effects: { popularidade: 5, governabilidade: -8 },
        leaning: 0,
      },
    ],
  },
  {
    id: "energia-limpa",
    title: "Programa de Energia Limpa",
    description:
      "Seu governo pode lançar um grande programa de incentivo a energias renováveis, com custo inicial alto mas retorno ambiental e de imagem no longo prazo.",
    choices: [
      {
        id: "investir",
        label: "Investir no programa",
        consequence:
          "O país se posiciona como líder ambiental, mas o investimento pesa nas contas públicas no curto prazo.",
        effects: { meioAmbiente: 10, relacoesInternacionais: 4, economia: -5 },
        leaning: -2,
      },
      {
        id: "adiar",
        label: "Adiar o programa para depois do mandato",
        consequence:
          "O orçamento fica intacto, mas o país perde uma oportunidade de destaque internacional.",
        effects: { economia: 2, meioAmbiente: -3 },
        leaning: 1,
      },
    ],
  },
  {
    id: "crise-migratoria",
    title: "Crise Migratória na Fronteira",
    description:
      "Um fluxo migratório intenso vindo de um país vizinho em crise pressiona cidades fronteiriças e divide a opinião pública.",
    choices: [
      {
        id: "acolher",
        label: "Abrir a fronteira e estruturar acolhimento humanitário",
        consequence:
          "Sua postura é elogiada internacionalmente, mas parte da população teme sobrecarga dos serviços locais.",
        effects: { relacoesInternacionais: 8, popularidade: -4, saude: -2 },
        leaning: -2,
      },
      {
        id: "fechar",
        label: "Reforçar o controle e restringir a entrada",
        consequence:
          "Parte da população local aprova a medida, mas o país é criticado internacionalmente por direitos humanos.",
        effects: { seguranca: 4, relacoesInternacionais: -8, popularidade: 3 },
        leaning: 2,
      },
    ],
  },
  {
    id: "ataque-cibernetico",
    title: "Ataque Cibernético a Infraestrutura",
    description:
      "Hackers atacam sistemas de energia e bancos públicos, causando instabilidade e assustando investidores.",
    choices: [
      {
        id: "investir-ciberseguranca",
        label: "Investir emergencialmente em ciberdefesa",
        consequence:
          "O ataque é contido e a confiança é restaurada, mas o gasto extra pesa no orçamento.",
        effects: { seguranca: 8, economia: -4 },
        leaning: 0,
      },
      {
        id: "resposta-minima",
        label: "Resposta mínima, aguardar situação se resolver",
        consequence:
          "Você economiza recursos, mas o episódio expõe fragilidades e abala a confiança dos mercados.",
        effects: { economia: -6, seguranca: -5 },
        leaning: 0,
      },
    ],
  },
  {
    id: "recessao-global",
    title: "Recessão Econômica Global",
    description:
      "Uma crise financeira internacional reduz as exportações e ameaça a economia nacional. O mercado espera sinais claros do governo.",
    choices: [
      {
        id: "estimulo",
        label: "Lançar pacote de estímulo econômico",
        consequence:
          "O impacto da crise é amenizado e empregos são preservados, mas a dívida pública cresce.",
        effects: { economia: 6, popularidade: 3, governabilidade: -3 },
        leaning: -2,
      },
      {
        id: "austeridade",
        label: "Adotar austeridade fiscal",
        consequence:
          "As contas públicas ficam sob controle, mas o desemprego sobe e a população sofre no curto prazo.",
        effects: { economia: 3, popularidade: -7 },
        leaning: 2,
      },
    ],
  },
  {
    id: "racionamento",
    title: "Racionamento de Água e Energia",
    description:
      "Uma seca severa reduz os reservatórios do país, forçando decisões impopulares sobre racionamento.",
    choices: [
      {
        id: "racionar",
        label: "Implementar racionamento rígido",
        consequence:
          "Os recursos naturais são preservados, mas a população sofre com a rotina de restrições.",
        effects: { meioAmbiente: 6, popularidade: -8 },
        leaning: -1,
      },
      {
        id: "importar",
        label: "Importar energia emergencialmente a alto custo",
        consequence:
          "A população não sente o impacto direto, mas o custo é alto para os cofres públicos.",
        effects: { economia: -9, popularidade: 3 },
        leaning: 1,
      },
    ],
  },
  {
    id: "cpi-investigacao",
    title: "CPI no Congresso",
    description:
      "Parlamentares da oposição instauram uma Comissão Parlamentar de Inquérito para investigar supostas irregularidades no seu governo.",
    choices: [
      {
        id: "colaborar",
        label: "Colaborar totalmente com a investigação",
        consequence:
          "A transparência fortalece sua imagem pública, mas expõe fragilidades da sua gestão ao Congresso.",
        effects: { popularidade: 5, governabilidade: -5 },
        leaning: 0,
      },
      {
        id: "resistir",
        label: "Resistir e dificultar o acesso a documentos",
        consequence:
          "Você protege informações sensíveis, mas a resistência é vista como sinal de culpa.",
        effects: { governabilidade: 2, popularidade: -8 },
        leaning: 0,
      },
    ],
  },
  {
    id: "epidemia-regional",
    title: "Epidemia Regional",
    description:
      "Um surto de doença infecciosa se espalha em regiões do país, sobrecarregando postos de saúde locais.",
    choices: [
      {
        id: "lockdown",
        label: "Decretar quarentena e isolar as regiões afetadas",
        consequence:
          "O surto é contido rapidamente, mas a atividade econômica local é fortemente impactada.",
        effects: { saude: 10, economia: -7, popularidade: -3 },
        leaning: -1,
      },
      {
        id: "monitoramento",
        label: "Apenas reforçar o monitoramento sem restrições",
        consequence:
          "A economia segue normalmente, mas o surto se espalha mais rápido, sobrecarregando o sistema de saúde.",
        effects: { saude: -6, economia: 2 },
        leaning: 1,
      },
    ],
  },
  {
    id: "salario-minimo",
    title: "Aumento do Salário Mínimo",
    description:
      "Centrais sindicais pressionam por um reajuste real do salário mínimo acima da inflação. Empresários alertam para o impacto nos custos.",
    choices: [
      {
        id: "aumentar",
        label: "Conceder aumento real acima da inflação",
        consequence:
          "Trabalhadores comemoram o ganho de poder de compra, mas pequenas empresas reduzem contratações.",
        effects: { popularidade: 8, economia: -5 },
        leaning: -2,
      },
      {
        id: "reajuste-minimo",
        label: "Conceder apenas reposição da inflação",
        consequence:
          "Solução neutra que evita grandes impactos econômicos, mas frustra expectativas dos trabalhadores.",
        effects: { economia: 1, popularidade: -2 },
        leaning: 1,
      },
    ],
  },
  {
    id: "cupula-clima",
    title: "Cúpula Internacional do Clima",
    description:
      "Seu país é convidado a assumir metas ambiciosas de redução de emissões em uma cúpula global de clima, com prazos apertados.",
    choices: [
      {
        id: "assumir-metas",
        label: "Assumir metas ambiciosas de redução de emissões",
        consequence:
          "O país ganha protagonismo internacional, mas setores industriais pressionam contra os novos custos regulatórios.",
        effects: { relacoesInternacionais: 9, meioAmbiente: 6, economia: -4 },
        leaning: -2,
      },
      {
        id: "metas-moderadas",
        label: "Assumir apenas metas moderadas",
        consequence:
          "Uma posição de meio-termo, sem grandes ganhos nem grandes perdas.",
        effects: { relacoesInternacionais: 2, meioAmbiente: 2 },
        leaning: 0,
      },
    ],
  },
  {
    id: "motim-militar",
    title: "Tensão nas Forças Armadas",
    description:
      "Setores das Forças Armadas expressam publicamente insatisfação com cortes no orçamento militar, gerando um clima de tensão institucional.",
    choices: [
      {
        id: "aumentar-orcamento",
        label: "Aumentar o orçamento militar para apaziguar",
        consequence:
          "A tensão institucional diminui, mas o gasto público aumenta e outras áreas ficam com menos recursos.",
        effects: { governabilidade: 8, seguranca: 4, economia: -6 },
        leaning: 1,
      },
      {
        id: "manter-cortes",
        label: "Manter os cortes e reafirmar autoridade civil",
        consequence:
          "Você reforça o controle civil sobre os militares, mas a tensão institucional aumenta perigosamente.",
        effects: { governabilidade: -9, seguranca: -3 },
        leaning: -1,
      },
    ],
  },
];
