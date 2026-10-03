import type { GameEvent } from "../types";

export const EVENTS: GameEvent[] = [
  {
    id: "reforma-do-iptu",
    title: "Reforma do IPTU",
    category: "orcamento",
    description:
      "Sua Secretaria de Fazenda propõe uma reforma do IPTU que simplifica a cobrança e taxa mais os imóveis de maior valor. Grandes proprietários pressionam contra; moradores de bairros populares apoiam.",
    choices: [
      {
        id: "aprovar",
        label: "Aprovar a reforma progressiva do IPTU",
        consequence:
          "A reforma passa. O caixa da prefeitura melhora, mas grandes proprietários reduzem investimentos e pressionam sua base na Câmara.",
        effects: { orcamento: 8, popularidade: 4, governabilidade: -6 },
        sectorEffects: { empresariadoLocal: -8, associacoesBairro: 6, vereadores: -4 },
        leaning: 1,
      },
      {
        id: "recuar",
        label: "Recuar e negociar uma versão mais branda",
        consequence: "Você evita o embate, mas a população vê como recuo diante dos grandes proprietários.",
        effects: { governabilidade: 4, popularidade: -5 },
        sectorEffects: { empresariadoLocal: 5, associacoesBairro: -6 },
        leaning: -1,
      },
    ],
  },
  {
    id: "greve-da-guarda-municipal",
    title: "Greve da Guarda Municipal",
    category: "seguranca",
    description:
      "Guardas municipais entram em greve por salários melhores. A sensação de insegurança sobe nos bairros enquanto a categoria pede reajuste imediato.",
    choices: [
      {
        id: "atender",
        label: "Atender a reivindicação salarial",
        consequence: "A greve termina rápido e a segurança se estabiliza, mas o orçamento sofre um rombo.",
        effects: { seguranca: 10, orcamento: -8 },
        sectorEffects: { guardaMunicipal: 6, empresariadoLocal: -3 },
        leaning: -1,
      },
      {
        id: "negociar-parcelado",
        label: "Negociar reajuste parcelado",
        consequence: "Solução intermediária: a greve arrefece aos poucos e o impacto fiscal é menor.",
        effects: { seguranca: 4, orcamento: -3, popularidade: -2 },
        sectorEffects: { guardaMunicipal: 3 },
        leaning: 1,
      },
      {
        id: "linha-dura",
        label: "Não ceder e usar efetivo reduzido para conter a crise",
        consequence: "Você mantém o orçamento, mas a insegurança aumenta e sua imagem é desgastada.",
        effects: { seguranca: -10, popularidade: -6 },
        sectorEffects: { guardaMunicipal: -8, associacoesBairro: -5, populacao: -4 },
        leaning: 2,
        triggersEventId: "ataque-cibernetico-aos-sistemas-da-prefeitura",
      },
    ],
  },
  {
    id: "colapso-na-rede-de-ubs",
    title: "Colapso na Rede de UBS",
    category: "saude",
    description:
      "Unidades Básicas de Saúde relatam superlotação e falta de médicos. A imprensa local cobra uma resposta imediata da prefeitura.",
    choices: [
      {
        id: "investir",
        label: "Investir pesado em saúde emergencial",
        consequence: "Novas equipes e equipamentos aliviam a crise, mas o gasto extra pesa no orçamento.",
        effects: { saude: 12, popularidade: 5, orcamento: -6 },
        sectorEffects: { populacao: 8, servidoresPublicos: 4, empresariadoLocal: -3 },
        leaning: -1,
      },
      {
        id: "parceria-privada",
        label: "Firmar parcerias com clínicas privadas",
        consequence:
          "Solução rápida e mais barata, mas gera críticas de privatização disfarçada da saúde pública.",
        effects: { saude: 6, orcamento: -1, popularidade: -2 },
        sectorEffects: { empresariadoLocal: 7, associacoesBairro: -6, servidoresPublicos: -3 },
        leaning: 2,
      },
    ],
  },
  {
    id: "reforma-do-ensino-fundamental",
    title: "Reforma do Ensino Fundamental",
    category: "educacao",
    description:
      "Especialistas propõem uma reforma curricular ampla na rede municipal. Professores temem precarização; parte da sociedade quer modernização rápida.",
    choices: [
      {
        id: "implementar",
        label: "Implementar a reforma integralmente",
        consequence:
          "A educação avança no médio prazo, mas o processo é turbulento e gera desgaste com o sindicato dos professores.",
        effects: { educacao: 10, popularidade: -3, governabilidade: -2 },
        sectorEffects: { servidoresPublicos: -4, vereadores: -4, associacoesBairro: 3 },
        leaning: 1,
      },
      {
        id: "piloto",
        label: "Testar em projeto-piloto antes de expandir",
        consequence: "Abordagem cautelosa: ganho menor, porém sem grandes atritos.",
        effects: { educacao: 4, governabilidade: 2 },
        sectorEffects: { servidoresPublicos: 2, vereadores: 3 },
        leaning: 0,
      },
    ],
  },
  {
    id: "greve-de-professores",
    title: "Greve de Professores da Rede Municipal",
    category: "educacao",
    description:
      "Professores da rede municipal cruzam os braços exigindo reajuste salarial e melhores condições nas escolas. Pais reclamam das aulas suspensas.",
    choices: [
      {
        id: "reajuste",
        label: "Conceder reajuste salarial integral",
        consequence:
          "As aulas voltam rapidamente e os professores comemoram, mas o orçamento sofre um impacto duradouro.",
        effects: { educacao: 6, orcamento: -7, popularidade: 3 },
        sectorEffects: { servidoresPublicos: 9, populacao: 3 },
        leaning: -2,
      },
      {
        id: "resistir",
        label: "Resistir e propor reajuste mínimo",
        consequence: "O orçamento fica protegido, mas a greve se arrasta e o ano escolar é afetado.",
        effects: { educacao: -6, orcamento: 3, popularidade: -4 },
        sectorEffects: { servidoresPublicos: -9, populacao: -3 },
        leaning: 2,
      },
    ],
  },
  {
    id: "convenio-de-infraestrutura-com-o-estado",
    title: "Convênio de Infraestrutura com o Estado",
    category: "mobilidade",
    description:
      "O Governo do Estado oferece um convênio para financiar um corredor de BRT na cidade. O acordo exige contrapartida municipal e abre mão de parte da autonomia sobre o projeto.",
    choices: [
      {
        id: "assinar",
        label: "Assinar o convênio",
        consequence:
          "A mobilidade melhora com recursos externos, mas setores locais reclamam da interferência estadual no projeto.",
        effects: { mobilidade: 9, orcamento: -4, governabilidade: -3 },
        sectorEffects: { empresariadoLocal: 6, vereadores: -3 },
        leaning: 2,
      },
      {
        id: "recusar",
        label: "Recusar para manter autonomia sobre o projeto",
        consequence: "Você preserva o controle municipal, mas a cidade perde uma grande oportunidade viária.",
        effects: { governabilidade: 3, mobilidade: -4 },
        sectorEffects: { vereadores: 3, empresariadoLocal: -4 },
        leaning: -1,
      },
    ],
  },
  {
    id: "reajuste-da-tarifa-de-onibus",
    title: "Reajuste da Tarifa de Ônibus",
    category: "mobilidade",
    description:
      "As empresas de transporte público pedem reajuste na tarifa de ônibus para cobrir custos. Qualquer aumento é extremamente impopular entre os moradores.",
    choices: [
      {
        id: "reajustar",
        label: "Autorizar o reajuste da tarifa",
        consequence:
          "As empresas mantêm a operação sem rombo no sistema, mas a população reage com fortes protestos nas ruas.",
        effects: { mobilidade: 5, orcamento: 2, popularidade: -9 },
        sectorEffects: { empresariadoLocal: 6, populacao: -9 },
        leaning: 2,
        triggersEventId: "protesto-popular-no-centro",
      },
      {
        id: "subsidiar",
        label: "Subsidiar a tarifa com recursos da prefeitura",
        consequence:
          "A população agradece a tarifa congelada, mas o orçamento municipal absorve um custo recorrente alto.",
        effects: { popularidade: 7, orcamento: -8 },
        sectorEffects: { populacao: 8, empresariadoLocal: -3 },
        leaning: -2,
      },
    ],
  },
  {
    id: "pressao-da-construcao-civil",
    title: "Pressão da Construção Civil",
    category: "ambiental",
    description:
      "Construtoras pedem flexibilização do zoneamento em áreas de preservação da cidade, alegando ganhos econômicos urgentes com novos empreendimentos.",
    choices: [
      {
        id: "liberar",
        label: "Flexibilizar o zoneamento nas áreas protegidas",
        consequence:
          "A construção civil cresce e gera empregos, mas o desmatamento urbano dispara e o trânsito piora com as novas obras.",
        effects: { orcamento: 8, meioAmbiente: -12, mobilidade: -6 },
        sectorEffects: { empresariadoLocal: 10, associacoesBairro: -10, servidoresPublicos: -6 },
        leaning: 2,
        triggersEventId: "cupula-climatica-de-prefeitos",
      },
      {
        id: "proteger",
        label: "Manter a proteção ambiental",
        consequence:
          "Você preserva as áreas verdes e ganha o respeito das associações de bairro, mas perde apoio do setor da construção.",
        effects: { meioAmbiente: 8, orcamento: 3, popularidade: -3 },
        sectorEffects: { associacoesBairro: 9, servidoresPublicos: 5, empresariadoLocal: -7 },
        leaning: -2,
      },
    ],
  },
  {
    id: "escandalo-de-corrupcao-na-secretaria",
    title: "Escândalo de Corrupção numa Secretaria",
    category: "institucional",
    description:
      "Um secretário de confiança é flagrado em esquema de desvio de verbas em licitações. A oposição na Câmara pede sua cabeça; aliados pedem discrição.",
    choices: [
      {
        id: "demitir",
        label: "Demitir o secretário e abrir investigação pública",
        consequence: "Transparência acalma a opinião pública, mas fragiliza sua base política interna.",
        effects: { popularidade: 6, governabilidade: -7 },
        sectorEffects: { servidoresPublicos: 5, associacoesBairro: 5, vereadores: -8 },
        leaning: 1,
      },
      {
        id: "proteger",
        label: "Proteger o aliado e abafar o caso",
        consequence: "Você mantém a base de apoio, mas o escândalo vaza para a imprensa local e sua credibilidade cai.",
        effects: { governabilidade: 4, popularidade: -10 },
        sectorEffects: { vereadores: 6, associacoesBairro: -8, servidoresPublicos: -6 },
        leaning: -1,
        triggersEventId: "cpi-na-camara-municipal",
      },
    ],
  },
  {
    id: "protesto-popular-no-centro",
    title: "Protesto Popular no Centro",
    category: "social",
    description:
      "Milhares de moradores tomam as ruas do centro contra o custo de vida na cidade. Parte pede sua cassação; a Guarda Municipal pede autorização para agir com rigor.",
    choices: [
      {
        id: "dialogo",
        label: "Abrir diálogo com os manifestantes",
        consequence: "O gesto acalma os ânimos e melhora sua imagem, embora nada seja resolvido de imediato.",
        effects: { popularidade: 6, seguranca: 1 },
        sectorEffects: { associacoesBairro: 10, populacao: 5 },
        leaning: -1,
      },
      {
        id: "reprimir",
        label: "Autorizar repressão com a Guarda Municipal",
        consequence: "Os protestos diminuem rapidamente, mas imagens de violência chocam a cidade.",
        effects: { seguranca: 5, popularidade: -12 },
        sectorEffects: { guardaMunicipal: 5, associacoesBairro: -12, populacao: -7 },
        leaning: 2,
        triggersEventId: "cpi-na-camara-municipal",
      },
    ],
  },
  {
    id: "enchente-na-cidade",
    title: "Enchente na Cidade",
    category: "ambiental",
    description:
      "Chuvas históricas causam enchentes em vários bairros, deixando famílias desabrigadas. A cidade espera uma resposta rápida da prefeitura.",
    choices: [
      {
        id: "resposta-rapida",
        label: "Mobilizar resposta emergencial imediata",
        consequence: "A ajuda rápida salva vidas e é bem recebida, mas consome recursos significativos do orçamento.",
        effects: { popularidade: 8, meioAmbiente: 2, orcamento: -5 },
        sectorEffects: { populacao: 9, servidoresPublicos: 2 },
        leaning: -1,
      },
      {
        id: "resposta-lenta",
        label: "Seguir o protocolo padrão sem ações extraordinárias",
        consequence: "Você preserva o orçamento, mas a lentidão da resposta gera revolta popular.",
        effects: { orcamento: 2, popularidade: -9 },
        sectorEffects: { populacao: -9, associacoesBairro: -4 },
        leaning: 1,
      },
    ],
  },
  {
    id: "pauta-impopular-na-camara",
    title: "Pauta Impopular na Câmara",
    category: "institucional",
    description:
      "Para manter sua base aliada, líderes da Câmara pedem que você apoie publicamente uma pauta polêmica e impopular.",
    choices: [
      {
        id: "apoiar",
        label: "Apoiar a pauta para manter a base aliada",
        consequence: "A Câmara permanece ao seu lado, mas a população reage negativamente à medida.",
        effects: { governabilidade: 8, popularidade: -6 },
        sectorEffects: { vereadores: 9, populacao: -5 },
        leaning: 0,
      },
      {
        id: "recusar",
        label: "Recusar publicamente a pauta",
        consequence: "Você agrada a opinião pública, mas perde apoio de aliados importantes na Câmara.",
        effects: { popularidade: 5, governabilidade: -8 },
        sectorEffects: { populacao: 5, vereadores: -9 },
        leaning: 0,
      },
    ],
  },
  {
    id: "programa-de-energia-solar-publica",
    title: "Programa de Energia Solar em Prédios Públicos",
    category: "ambiental",
    description:
      "A prefeitura pode lançar um programa de painéis solares em escolas e postos de saúde, com custo inicial alto mas economia e imagem ambiental no longo prazo.",
    choices: [
      {
        id: "investir",
        label: "Investir no programa",
        consequence: "A cidade se destaca como referência em sustentabilidade, mas o investimento pesa nas contas no curto prazo.",
        effects: { meioAmbiente: 10, orcamento: -5, popularidade: 3 },
        sectorEffects: { associacoesBairro: 8, servidoresPublicos: 4, empresariadoLocal: -2 },
        leaning: 2,
      },
      {
        id: "adiar",
        label: "Adiar o programa para depois do mandato",
        consequence: "O orçamento fica intacto, mas a cidade perde uma oportunidade de destaque e economia futura.",
        effects: { orcamento: 2, meioAmbiente: -3 },
        sectorEffects: { empresariadoLocal: 2, associacoesBairro: -6 },
        leaning: -1,
      },
    ],
  },
  {
    id: "chegada-de-migrantes-a-cidade",
    title: "Chegada de Migrantes à Cidade",
    category: "social",
    description:
      "Um fluxo migratório intenso de outras regiões em crise chega à cidade, pressionando os serviços públicos e dividindo a opinião dos moradores.",
    choices: [
      {
        id: "acolher",
        label: "Estruturar acolhimento humanitário",
        consequence:
          "Sua postura é elogiada por entidades e pela imprensa, mas parte da população teme sobrecarga dos serviços locais.",
        effects: { popularidade: -4, saude: -2 },
        sectorEffects: { associacoesBairro: 9, servidoresPublicos: 4, populacao: -5 },
        leaning: -2,
      },
      {
        id: "restringir",
        label: "Restringir o acesso a serviços municipais",
        consequence: "Parte da população local aprova a medida, mas a cidade é criticada por entidades de direitos humanos.",
        effects: { seguranca: 2, popularidade: 3 },
        sectorEffects: { guardaMunicipal: 3, associacoesBairro: -9, populacao: 4 },
        leaning: 2,
      },
    ],
  },
  {
    id: "ataque-cibernetico-aos-sistemas-da-prefeitura",
    title: "Ataque Cibernético aos Sistemas da Prefeitura",
    category: "seguranca",
    description:
      "Hackers atacam os sistemas de arrecadação e de saúde da prefeitura, causando instabilidade e expondo dados de moradores.",
    choices: [
      {
        id: "investir-ciberseguranca",
        label: "Investir emergencialmente em ciberdefesa",
        consequence: "O ataque é contido e a confiança é restaurada, mas o gasto extra pesa no orçamento.",
        effects: { seguranca: 8, orcamento: -4 },
        sectorEffects: { servidoresPublicos: 6, empresariadoLocal: 3 },
        leaning: 2,
      },
      {
        id: "resposta-minima",
        label: "Resposta mínima, aguardar a situação se resolver",
        consequence: "Você economiza recursos, mas o episódio expõe fragilidades e abala a confiança da população.",
        effects: { orcamento: -6, seguranca: -5 },
        sectorEffects: { servidoresPublicos: -5, empresariadoLocal: -6 },
        leaning: -1,
      },
    ],
  },
  {
    id: "recessao-economica-regional",
    title: "Recessão Econômica Regional",
    category: "orcamento",
    description:
      "Uma crise financeira regional reduz a atividade econômica e a arrecadação de impostos da cidade. O comércio local espera sinais claros da prefeitura.",
    choices: [
      {
        id: "estimulo",
        label: "Lançar pacote de estímulo ao comércio local",
        consequence: "O impacto da crise é amenizado e empregos são preservados, mas a dívida da prefeitura cresce.",
        effects: { orcamento: 6, popularidade: 3, governabilidade: -3 },
        sectorEffects: { populacao: 7, empresariadoLocal: 4, vereadores: -3 },
        leaning: -2,
      },
      {
        id: "austeridade",
        label: "Adotar austeridade fiscal",
        consequence: "As contas da prefeitura ficam sob controle, mas o desemprego local sobe e a população sofre no curto prazo.",
        effects: { orcamento: 3, popularidade: -7 },
        sectorEffects: { empresariadoLocal: 6, populacao: -8 },
        leaning: 2,
      },
    ],
  },
  {
    id: "racionamento-de-agua",
    title: "Racionamento de Água",
    category: "ambiental",
    description:
      "Uma seca severa reduz os reservatórios que abastecem a cidade, forçando decisões impopulares sobre racionamento.",
    choices: [
      {
        id: "racionar",
        label: "Implementar racionamento rígido",
        consequence: "Os recursos hídricos são preservados, mas a população sofre com a rotina de restrições.",
        effects: { meioAmbiente: 6, popularidade: -8 },
        sectorEffects: { associacoesBairro: 4, populacao: -8, empresariadoLocal: -5 },
        leaning: 2,
      },
      {
        id: "carros-pipa",
        label: "Contratar carros-pipa emergencialmente a alto custo",
        consequence: "A população não sente o impacto direto, mas o custo é alto para os cofres municipais.",
        effects: { orcamento: -9, popularidade: 3 },
        sectorEffects: { populacao: 4, empresariadoLocal: 3 },
        leaning: -2,
      },
    ],
  },
  {
    id: "cpi-na-camara-municipal",
    title: "CPI na Câmara Municipal",
    category: "institucional",
    description:
      "Vereadores da oposição instauram uma Comissão Parlamentar de Inquérito para investigar supostas irregularidades na sua gestão.",
    choices: [
      {
        id: "colaborar",
        label: "Colaborar totalmente com a investigação",
        consequence: "A transparência fortalece sua imagem pública, mas expõe fragilidades da sua gestão à Câmara.",
        effects: { popularidade: 5, governabilidade: -5 },
        sectorEffects: { servidoresPublicos: 5, vereadores: -7 },
        leaning: 1,
      },
      {
        id: "resistir",
        label: "Resistir e dificultar o acesso a documentos",
        consequence: "Você protege informações sensíveis, mas a resistência é vista como sinal de culpa.",
        effects: { governabilidade: 2, popularidade: -8 },
        sectorEffects: { vereadores: 4, servidoresPublicos: -7, associacoesBairro: -6 },
        leaning: -1,
      },
    ],
  },
  {
    id: "surto-de-dengue",
    title: "Surto de Dengue",
    category: "saude",
    description:
      "Um surto de dengue se espalha por bairros da cidade após as chuvas, sobrecarregando postos de saúde locais.",
    choices: [
      {
        id: "mutirao",
        label: "Decretar mutirão de combate ao mosquito e isolar focos",
        consequence: "O surto é contido rapidamente, mas a operação exige deslocar equipes de outras áreas.",
        effects: { saude: 10, orcamento: -7 },
        sectorEffects: { servidoresPublicos: 7, empresariadoLocal: -3 },
        leaning: -1,
      },
      {
        id: "monitoramento",
        label: "Apenas reforçar o monitoramento sem mutirão",
        consequence: "O orçamento é preservado, mas o surto se espalha mais rápido, sobrecarregando o sistema de saúde.",
        effects: { saude: -6, orcamento: 2 },
        sectorEffects: { empresariadoLocal: 3, servidoresPublicos: -6, populacao: -3 },
        leaning: 1,
      },
    ],
  },
  {
    id: "piso-salarial-dos-servidores",
    title: "Reajuste do Piso Salarial dos Servidores",
    category: "orcamento",
    description:
      "O sindicato dos servidores municipais pressiona por um reajuste real acima da inflação. A equipe econômica da prefeitura alerta para o impacto na folha.",
    choices: [
      {
        id: "aumentar",
        label: "Conceder aumento real acima da inflação",
        consequence: "Servidores comemoram o ganho de poder de compra, mas a folha de pagamento pesa mais no orçamento.",
        effects: { popularidade: 6, orcamento: -7 },
        sectorEffects: { servidoresPublicos: 9, empresariadoLocal: -3 },
        leaning: -2,
      },
      {
        id: "reajuste-minimo",
        label: "Conceder apenas reposição da inflação",
        consequence: "Solução neutra que evita grandes impactos no orçamento, mas frustra expectativas dos servidores.",
        effects: { orcamento: 1, popularidade: -2 },
        sectorEffects: { servidoresPublicos: -4, empresariadoLocal: 2 },
        leaning: 1,
      },
    ],
  },
  {
    id: "cupula-climatica-de-prefeitos",
    title: "Cúpula Climática de Prefeitos",
    category: "ambiental",
    description:
      "Sua cidade é convidada a assumir metas ambiciosas de redução de emissões numa cúpula de prefeitos de grandes cidades, com prazos apertados.",
    choices: [
      {
        id: "assumir-metas",
        label: "Assumir metas ambiciosas de redução de emissões",
        consequence: "A cidade ganha destaque nacional, mas setores da indústria local pressionam contra os novos custos regulatórios.",
        effects: { meioAmbiente: 6, popularidade: 3, orcamento: -4 },
        sectorEffects: { associacoesBairro: 8, empresariadoLocal: -6 },
        leaning: 2,
      },
      {
        id: "metas-moderadas",
        label: "Assumir apenas metas moderadas",
        consequence: "Uma posição de meio-termo, sem grandes ganhos nem grandes perdas.",
        effects: { meioAmbiente: 2, popularidade: 1 },
        sectorEffects: { empresariadoLocal: 3, associacoesBairro: -4 },
        leaning: 0,
      },
    ],
  },
  {
    id: "tensao-na-guarda-municipal",
    title: "Tensão na Guarda Municipal",
    category: "seguranca",
    description:
      "Setores da Guarda Municipal expressam publicamente insatisfação com cortes no orçamento de segurança, gerando um clima de tensão institucional.",
    choices: [
      {
        id: "aumentar-orcamento",
        label: "Aumentar o orçamento da Guarda para apaziguar",
        consequence: "A tensão institucional diminui, mas o gasto público aumenta e outras áreas ficam com menos recursos.",
        effects: { governabilidade: 6, seguranca: 4, orcamento: -6 },
        sectorEffects: { guardaMunicipal: 10, empresariadoLocal: -3 },
        leaning: -1,
      },
      {
        id: "manter-cortes",
        label: "Manter os cortes e reafirmar o controle civil",
        consequence: "Você reforça o controle civil sobre a Guarda, mas a tensão institucional aumenta perigosamente.",
        effects: { governabilidade: -9, seguranca: -3 },
        sectorEffects: { guardaMunicipal: -10, servidoresPublicos: 5, associacoesBairro: 4 },
        leaning: 1,
      },
    ],
  },
];
