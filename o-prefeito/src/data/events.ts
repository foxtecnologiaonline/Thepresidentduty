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
          "A reforma passa. O caixa da prefeitura melhora, mas grandes proprietários pressionam sua base na Câmara.",
        effects: { caixaMunicipal: 8, aprovacao: 3, camara: -9 },
        sectorEffects: { comerciantes: -8, moradoresPeriferia: 6, vereadores: -4 },
        leaning: 0,
      },
      {
        id: "recuar",
        label: "Recuar e negociar uma versão mais branda",
        consequence: "Você evita o embate na Câmara, mas a população vê como recuo diante dos grandes proprietários.",
        effects: { camara: 4, aprovacao: -4 },
        sectorEffects: { comerciantes: 5, moradoresPeriferia: -5 },
        leaning: 0,
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
        consequence: "O impacto da crise é amenizado e empregos são preservados, mas a dívida da prefeitura cresce e vereadores fiscalistas cobram explicações.",
        effects: { caixaMunicipal: -6, aprovacao: 5, camara: -2 },
        sectorEffects: { comerciantes: 6, moradoresPeriferia: 4 },
        leaning: 0,
      },
      {
        id: "austeridade",
        label: "Adotar austeridade fiscal",
        consequence: "As contas da prefeitura ficam sob controle, mas o desemprego local sobe e a população sofre no curto prazo.",
        effects: { caixaMunicipal: 5, aprovacao: -7 },
        sectorEffects: { comerciantes: 4, moradoresPeriferia: -6 },
        leaning: 0,
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
        effects: { aprovacao: 4, caixaMunicipal: -7 },
        sectorEffects: { servidores: 9, comerciantes: -3 },
        leaning: 0,
      },
      {
        id: "reajuste-minimo",
        label: "Conceder apenas reposição da inflação",
        consequence: "Solução neutra que evita grandes impactos no orçamento, mas frustra expectativas dos servidores.",
        effects: { caixaMunicipal: 2, aprovacao: -3 },
        sectorEffects: { servidores: -6 },
        leaning: 0,
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
        consequence: "A mobilidade melhora com recursos externos, mas vereadores reclamam da interferência estadual e da perda de controle sobre o projeto.",
        effects: { mobilidade: 9, caixaMunicipal: -4, camara: -5 },
        sectorEffects: { comerciantes: 5, vereadores: -3 },
        leaning: 2,
      },
      {
        id: "recusar",
        label: "Recusar para manter autonomia sobre o projeto",
        consequence: "Você preserva o controle municipal e agrada a Câmara, mas a cidade perde uma grande oportunidade viária.",
        effects: { camara: 3, mobilidade: -4 },
        sectorEffects: { vereadores: 3, comerciantes: -4 },
        leaning: -1,
      },
    ],
  },
  {
    id: "reajuste-da-tarifa-de-onibus",
    title: "Reajuste da Tarifa de Ônibus",
    category: "mobilidade",
    description:
      "As empresas de transporte público pedem reajuste na tarifa de ônibus para cobrir custos. Qualquer aumento é extremamente impopular entre os moradores que dependem do transporte coletivo.",
    choices: [
      {
        id: "reajustar",
        label: "Autorizar o reajuste da tarifa",
        consequence: "As empresas mantêm a operação sem rombo no sistema, mas moradores da periferia — que dependem mais do ônibus — reagem com protestos.",
        effects: { mobilidade: 4, caixaMunicipal: 2, aprovacao: -9 },
        sectorEffects: { comerciantes: 5, moradoresPeriferia: -10 },
        leaning: 0,
        triggersEventId: "protesto-popular-no-centro",
      },
      {
        id: "subsidiar",
        label: "Subsidiar a tarifa com recursos da prefeitura",
        consequence: "A população agradece a tarifa congelada, mas o orçamento municipal absorve um custo recorrente alto.",
        effects: { aprovacao: 6, caixaMunicipal: -8 },
        sectorEffects: { moradoresPeriferia: 8, comerciantes: -3 },
        leaning: 0,
      },
    ],
  },
  {
    id: "expansao-do-corredor-de-brt",
    title: "Expansão do Corredor de BRT para a Periferia",
    category: "mobilidade",
    description:
      "Um novo corredor de BRT ligaria a periferia ao centro, mas o traçado mais rápido passa por um bairro histórico consolidado — desapropriando famílias no caminho.",
    choices: [
      {
        id: "construir",
        label: "Avançar com a obra, desapropriando imóveis no trajeto",
        consequence: "A mobilidade melhora para quem mora na periferia, mas famílias do bairro afetado perdem suas casas e as igrejas locais protestam.",
        effects: { mobilidade: 10, caixaMunicipal: -6, aprovacao: -3, camara: -3 },
        sectorEffects: { moradoresPeriferia: 6, igrejas: -4, vereadores: -2 },
        leaning: 2,
      },
      {
        id: "replanejar",
        label: "Replanejar a rota para preservar o bairro histórico",
        consequence: "O bairro é preservado, mas a obra fica mais cara, mais lenta e menos eficiente para quem vem de longe.",
        effects: { mobilidade: 3, caixaMunicipal: -8 },
        sectorEffects: { igrejas: 5, moradoresPeriferia: -3 },
        leaning: -2,
      },
    ],
  },
  {
    id: "enchente-na-cidade",
    title: "Enchente na Cidade",
    category: "saneamento",
    description:
      "Chuvas históricas causam enchentes em vários bairros, deixando famílias desabrigadas por falhas antigas na drenagem. A cidade espera uma resposta rápida da prefeitura.",
    choices: [
      {
        id: "resposta-rapida",
        label: "Mobilizar resposta emergencial imediata",
        consequence: "A ajuda rápida salva vidas e é bem recebida, mas consome recursos significativos do orçamento.",
        effects: { aprovacao: 8, saneamento: 3, caixaMunicipal: -6 },
        sectorEffects: { moradoresPeriferia: 9 },
        leaning: 0,
      },
      {
        id: "resposta-lenta",
        label: "Seguir o protocolo padrão sem ações extraordinárias",
        consequence: "Você preserva o orçamento, mas a lentidão da resposta gera revolta popular e a Câmara abre sessão para cobrar explicações.",
        effects: { caixaMunicipal: 2, aprovacao: -9, camara: -3 },
        sectorEffects: { moradoresPeriferia: -9, igrejas: -3 },
        leaning: 0,
      },
    ],
  },
  {
    id: "colapso-na-coleta-de-lixo",
    title: "Colapso na Coleta de Lixo",
    category: "saneamento",
    description:
      "Uma falha operacional na coleta deixa lixo acumulado em vários bairros por dias. A imprensa local cobra uma solução rápida.",
    choices: [
      {
        id: "terceirizar-emergencial",
        label: "Contratar emergencialmente uma empresa terceirizada",
        consequence: "A coleta é normalizada rapidamente, mas a contratação sem licitação regular chama a atenção do Ministério Público.",
        effects: { saneamento: 9, caixaMunicipal: -6, ministerioPublico: -3 },
        sectorEffects: { comerciantes: 3, servidores: -5 },
        leaning: 0,
      },
      {
        id: "mutirao-proprio",
        label: "Reforçar com mutirão da própria equipe municipal",
        consequence: "A solução é mais barata e valoriza o quadro próprio, mas a normalização é mais lenta.",
        effects: { saneamento: 5, caixaMunicipal: -2 },
        sectorEffects: { servidores: 5, comerciantes: -2 },
        leaning: 0,
      },
    ],
  },
  {
    id: "vazamento-de-esgoto-em-via-principal",
    title: "Vazamento de Esgoto em Via Principal",
    category: "saneamento",
    description:
      "Um rompimento na rede de esgoto contamina uma via importante da cidade, provocando mau cheiro e risco à saúde pública.",
    choices: [
      {
        id: "reparo-emergencial",
        label: "Acionar reparo emergencial 24 horas",
        consequence: "O problema é resolvido rápido e a população elogia a agilidade, mas a operação em regime extra custa caro.",
        effects: { saneamento: 8, aprovacao: 4, caixaMunicipal: -6 },
        sectorEffects: { moradoresPeriferia: 5 },
        leaning: 0,
      },
      {
        id: "fila-normal",
        label: "Colocar na fila normal de manutenção",
        consequence: "O orçamento é poupado, mas o vazamento persiste por semanas e irrita os moradores da região.",
        effects: { saneamento: -5, caixaMunicipal: 2, aprovacao: -5 },
        sectorEffects: { moradoresPeriferia: -6 },
        leaning: 0,
      },
    ],
  },
  {
    id: "plano-de-combate-a-enchentes",
    title: "Plano de Combate a Enchentes",
    category: "saneamento",
    description:
      "Técnicos da prefeitura propõem um plano plurianual de drenagem para reduzir enchentes recorrentes, mas o projeto depende de um crédito extra aprovado pela Câmara.",
    choices: [
      {
        id: "aprovar-credito",
        label: "Levar o crédito extra para aprovação na Câmara",
        consequence: "Aprovado, o plano começa a reduzir o risco de enchentes, mas consome capital político junto a vereadores que queriam a verba em outras emendas.",
        effects: { saneamento: 7, caixaMunicipal: -5, camara: -4 },
        sectorEffects: { moradoresPeriferia: 5 },
        leaning: 0,
      },
      {
        id: "adiar-plano",
        label: "Adiar o plano e usar paliativos pontuais",
        consequence: "Você preserva seu capital político na Câmara, mas a cidade seguirá vulnerável às próximas chuvas fortes.",
        effects: { caixaMunicipal: 2, saneamento: -3 },
        sectorEffects: { moradoresPeriferia: -4 },
        leaning: 0,
      },
    ],
  },
  {
    id: "pressao-da-construcao-civil",
    title: "Pressão da Construção Civil",
    category: "urbanismo",
    description:
      "Construtoras pedem flexibilização do zoneamento em áreas protegidas da cidade, alegando ganhos econômicos urgentes com novos empreendimentos.",
    choices: [
      {
        id: "liberar",
        label: "Flexibilizar o zoneamento nas áreas protegidas",
        consequence: "A construção civil cresce e gera empregos, mas a liberação sem estudo técnico adequado chama a atenção do Ministério Público e incomoda vereadores da oposição.",
        effects: { caixaMunicipal: 8, zeladoria: -4, mobilidade: -3, ministerioPublico: -4, camara: -2 },
        sectorEffects: { comerciantes: 10, moradoresPeriferia: -8, igrejas: -4 },
        leaning: 2,
      },
      {
        id: "proteger",
        label: "Manter a proteção urbanística das áreas",
        consequence: "Você preserva o caráter dos bairros e ganha o respeito das comunidades locais e de vereadores ambientalistas, mas perde apoio do setor da construção.",
        effects: { zeladoria: 3, aprovacao: -3, camara: 2 },
        sectorEffects: { moradoresPeriferia: 8, igrejas: 5, comerciantes: -7 },
        leaning: -2,
      },
    ],
  },
  {
    id: "gentrificacao-no-centro-historico",
    title: "Gentrificação no Centro Histórico",
    category: "urbanismo",
    description:
      "Um projeto de revitalização do centro histórico promete atrair investimentos, mas o aumento do custo de vida na região ameaça expulsar moradores tradicionais.",
    choices: [
      {
        id: "revitalizar",
        label: "Autorizar o projeto de revitalização",
        consequence: "O centro se moderniza e atrai investimentos, mas moradores tradicionais são pressionados a deixar a região e o contrato com a construtora é questionado pelo Ministério Público.",
        effects: { caixaMunicipal: 6, cultura: -4, ministerioPublico: -3 },
        sectorEffects: { comerciantes: 8, moradoresPeriferia: -9, igrejas: -3 },
        leaning: 2,
        triggersEventId: "conflito-entre-ambulantes-e-comerciantes",
      },
      {
        id: "tombamento",
        label: "Tombar o centro histórico e limitar novas reformas",
        consequence: "O patrimônio é preservado e comunidades tradicionais seguem no bairro, mas investidores desistem da região e vereadores ligados à construção reclamam.",
        effects: { cultura: 6, caixaMunicipal: -3, camara: -2 },
        sectorEffects: { igrejas: 6, moradoresPeriferia: 3, comerciantes: -7 },
        leaning: -2,
      },
    ],
  },
  {
    id: "ocupacao-irregular-em-area-de-risco",
    title: "Ocupação Irregular em Área de Risco",
    category: "urbanismo",
    description:
      "Uma ocupação informal cresceu numa área de risco de deslizamento. Técnicos da prefeitura recomendam ação, mas a comunidade já vive ali há anos.",
    choices: [
      {
        id: "remover",
        label: "Remover a ocupação e reassentar as famílias",
        consequence: "A área de risco é esvaziada, mas a remoção sem processo adequado é questionada pelo Ministério Público e gera forte reação das famílias e das igrejas da região.",
        effects: { zeladoria: 5, caixaMunicipal: -6, ministerioPublico: -3 },
        sectorEffects: { moradoresPeriferia: -10, igrejas: -6 },
        leaning: 1,
        triggersEventId: "protesto-popular-no-centro",
      },
      {
        id: "regularizar",
        label: "Regularizar a ocupação e levar infraestrutura básica",
        consequence: "As famílias ganham segurança jurídica e apoiam a gestão, mas manter uma área de risco ocupada é questionado pelo Ministério Público.",
        effects: { saneamento: -4, aprovacao: 5, ministerioPublico: -4 },
        sectorEffects: { moradoresPeriferia: 9, igrejas: 4 },
        leaning: -2,
      },
    ],
  },
  {
    id: "festival-municipal-de-cultura-popular",
    title: "Festival Municipal de Cultura Popular",
    category: "cultura",
    description:
      "A Secretaria de Cultura propõe um grande festival gratuito para valorizar artistas e tradições locais, com custo relevante para os cofres da prefeitura.",
    choices: [
      {
        id: "investir",
        label: "Investir no festival em grande escala",
        consequence: "O evento anima a cidade e movimenta o comércio local, mas o orçamento sente o impacto.",
        effects: { cultura: 10, caixaMunicipal: -5 },
        sectorEffects: { moradoresPeriferia: 6, comerciantes: 3, igrejas: 2 },
        leaning: 0,
      },
      {
        id: "cancelar",
        label: "Cancelar o festival por causa da crise fiscal",
        consequence: "O orçamento é preservado, mas a cidade perde um momento importante de lazer e identidade cultural.",
        effects: { caixaMunicipal: 3, cultura: -6 },
        sectorEffects: { comerciantes: -3, moradoresPeriferia: -4 },
        leaning: 0,
      },
    ],
  },
  {
    id: "restauracao-de-templo-historico",
    title: "Restauração de um Templo Histórico",
    category: "cultura",
    description:
      "Um templo centenário, importante para as comunidades religiosas da cidade, corre risco de desabamento. A restauração é cara, mas simbolicamente relevante.",
    choices: [
      {
        id: "financiar",
        label: "Financiar a restauração com recursos da prefeitura",
        consequence: "As comunidades de fé agradecem o gesto, mas o custo pesa no orçamento cultural.",
        effects: { cultura: 5, caixaMunicipal: -4 },
        sectorEffects: { igrejas: 9 },
        leaning: -1,
      },
      {
        id: "recusar",
        label: "Recusar e priorizar outras demandas",
        consequence: "O orçamento é preservado, mas as lideranças religiosas se sentem desprezadas pela gestão.",
        effects: { caixaMunicipal: 2, cultura: -2 },
        sectorEffects: { igrejas: -7 },
        leaning: 1,
      },
    ],
  },
  {
    id: "show-gratuito-de-virada-de-ano",
    title: "Show Gratuito de Virada de Ano",
    category: "cultura",
    description:
      "A Secretaria de Cultura propõe um grande show gratuito de Réveillon na praça central, atração capaz de lotar a cidade de turistas.",
    choices: [
      {
        id: "show-grande",
        label: "Contratar uma atração de grande porte",
        consequence: "O evento vira case de sucesso, atrai turistas e aquece o comércio, mas o cachê e o esquema de segurança custam caro.",
        effects: { cultura: 9, caixaMunicipal: -7, aprovacao: 4 },
        sectorEffects: { comerciantes: 6 },
        leaning: 0,
      },
      {
        id: "programacao-local",
        label: "Priorizar artistas e bandas locais",
        consequence: "O evento sai muito mais barato e valoriza a cena local, mas atrai bem menos público e repercussão do que uma atração grande.",
        effects: { cultura: 3, caixaMunicipal: -1 },
        sectorEffects: { comerciantes: -2 },
        leaning: 0,
      },
    ],
  },
  {
    id: "patrocinio-privado-para-o-museu",
    title: "Patrocínio Privado para o Museu Municipal",
    category: "cultura",
    description:
      "Uma grande rede de comércio local oferece patrocínio milionário para reformar o museu municipal, em troca de estampar sua marca no nome do espaço.",
    choices: [
      {
        id: "aceitar-patrocinio",
        label: "Aceitar o patrocínio e renomear o museu",
        consequence: "O museu é reformado sem custo à prefeitura, mas a decisão é vista como favorecimento ao patrocinador e levanta questionamento do Ministério Público sobre o processo de escolha.",
        effects: { cultura: 8, caixaMunicipal: 2, ministerioPublico: -4 },
        sectorEffects: { comerciantes: 7 },
        leaning: 0,
      },
      {
        id: "recusar-patrocinio",
        label: "Recusar e buscar verba pública para a reforma",
        consequence: "A decisão é tecnicamente mais segura e evita qualquer suspeita, mas a reforma do museu fica mais lenta e cara para os cofres públicos.",
        effects: { cultura: 3, caixaMunicipal: -5 },
        sectorEffects: { comerciantes: -3 },
        leaning: 0,
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
        effects: { camara: 10, aprovacao: -6 },
        sectorEffects: { vereadores: 9, moradoresPeriferia: -5 },
        leaning: 0,
      },
      {
        id: "recusar",
        label: "Recusar publicamente a pauta",
        consequence: "Você agrada a opinião pública, mas perde apoio de aliados importantes na Câmara.",
        effects: { aprovacao: 5, camara: -10 },
        sectorEffects: { moradoresPeriferia: 5, vereadores: -9 },
        leaning: 0,
      },
    ],
  },
  {
    id: "loteamento-de-secretarias",
    title: "Loteamento de Secretarias",
    category: "institucional",
    description:
      "Vereadores da base pressionam por cargos em secretarias importantes em troca de votos garantidos na Câmara.",
    choices: [
      {
        id: "ceder",
        label: "Ceder os cargos pedidos",
        consequence: "Sua base na Câmara se fortalece, mas o quadro técnico da prefeitura perde espaço para indicações políticas.",
        effects: { camara: 9, aprovacao: -4 },
        sectorEffects: { vereadores: 8, servidores: -4 },
        leaning: 0,
      },
      {
        id: "recusar",
        label: "Recusar e manter o critério técnico",
        consequence: "O quadro técnico se fortalece, mas você perde apoio importante na Câmara.",
        effects: { aprovacao: 3, camara: -9 },
        sectorEffects: { vereadores: -8, servidores: 3 },
        leaning: 0,
      },
    ],
  },
  {
    id: "reforma-administrativa",
    title: "Reforma Administrativa",
    category: "institucional",
    description:
      "Para reduzir custos, você pode fundir secretarias e cortar cargos comissionados. Vereadores que indicaram boa parte desses cargos reagem mal.",
    choices: [
      {
        id: "enxugar",
        label: "Enxugar a máquina e fundir secretarias",
        consequence: "O orçamento melhora e a imprensa elogia a gestão enxuta, mas vereadores que perderam indicações se afastam da base aliada.",
        effects: { caixaMunicipal: 6, camara: -6 },
        sectorEffects: { servidores: -4, imprensaLocal: 4 },
        leaning: 0,
      },
      {
        id: "manter-estrutura",
        label: "Manter a estrutura para preservar acordos políticos",
        consequence: "A base aliada na Câmara permanece estável, mas o inchaço da máquina pesa no orçamento.",
        effects: { camara: 6, caixaMunicipal: -6 },
        sectorEffects: { servidores: 4, imprensaLocal: -4 },
        leaning: 0,
      },
    ],
  },
  {
    id: "voto-de-confianca-na-camara",
    title: "Voto de Confiança na Câmara",
    category: "institucional",
    description:
      "Após meses de desgaste, um vereador aliado propõe uma sessão simbólica de voto de confiança ao prefeito — um teste público de força política.",
    choices: [
      {
        id: "aceitar",
        label: "Aceitar o teste e levar a votação ao plenário",
        consequence: "A vitória na votação fortalece sua imagem de comando, mas expõe publicamente quem votou contra você, irritando parte da opinião pública.",
        effects: { camara: 9, aprovacao: -3 },
        sectorEffects: { vereadores: 5 },
        leaning: 0,
      },
      {
        id: "recusar",
        label: "Recusar o teste para não arriscar um desgaste público",
        consequence: "Você evita o risco de uma derrota pública, mas parece fraco perante a Câmara.",
        effects: { camara: -5, aprovacao: 2 },
        sectorEffects: { vereadores: -4 },
        leaning: 0,
      },
    ],
  },
  {
    id: "protesto-popular-no-centro",
    title: "Protesto Popular no Centro",
    category: "social",
    description:
      "Milhares de moradores tomam as ruas do centro contra decisões recentes da prefeitura. Vereadores da oposição usam o momento para articular um pedido de impeachment.",
    choices: [
      {
        id: "dialogo",
        label: "Abrir diálogo com os manifestantes",
        consequence: "O gesto acalma os ânimos e melhora sua imagem, embora nada seja resolvido de imediato.",
        effects: { aprovacao: 6 },
        sectorEffects: { moradoresPeriferia: 10, imprensaLocal: 4 },
        leaning: 0,
      },
      {
        id: "reprimir",
        label: "Autorizar repressão policial forte ao protesto",
        consequence: "Os protestos diminuem rapidamente, mas imagens de violência chocam a cidade, alimentam o pedido de impeachment na Câmara e chamam a atenção do Ministério Público.",
        effects: { camara: -8, aprovacao: -10, ministerioPublico: -2 },
        sectorEffects: { imprensaLocal: -8, moradoresPeriferia: -10 },
        leaning: 1,
        triggersEventId: "investigacao-do-ministerio-publico",
      },
    ],
  },
  {
    id: "denuncia-de-irregularidade-em-licitacao",
    title: "Denúncia de Irregularidade em Licitação",
    category: "judicial",
    description:
      "Uma denúncia anônima aponta sobrepreço numa licitação de obras da prefeitura. O caso chega ao conhecimento do Ministério Público.",
    choices: [
      {
        id: "colaborar",
        label: "Colaborar e abrir os documentos da licitação",
        consequence: "A transparência fortalece sua relação com o Ministério Público, mas expõe fragilidades da sua gestão aos vereadores da oposição.",
        effects: { ministerioPublico: 7, aprovacao: 3 },
        sectorEffects: { imprensaLocal: 5, vereadores: -4 },
        leaning: 0,
      },
      {
        id: "obstruir",
        label: "Dificultar o acesso aos documentos",
        consequence: "Aliados protegem sua base política por ora, mas o Ministério Público passa a tratar o caso com mais rigor.",
        effects: { ministerioPublico: -11, camara: 3 },
        sectorEffects: { vereadores: 5, imprensaLocal: -7 },
        leaning: 0,
        triggersEventId: "investigacao-do-ministerio-publico",
      },
    ],
  },
  {
    id: "investigacao-do-ministerio-publico",
    title: "Investigação do Ministério Público",
    category: "judicial",
    description:
      "O Ministério Público formaliza uma investigação sobre a sua gestão, pedindo documentos e explicações em prazo curto.",
    choices: [
      {
        id: "transparencia-total",
        label: "Adotar transparência total com a investigação",
        consequence: "O Ministério Público reconhece a cooperação, mas o processo expõe publicamente decisões internas da gestão.",
        effects: { ministerioPublico: 8, aprovacao: -2 },
        sectorEffects: { imprensaLocal: 6 },
        leaning: 0,
      },
      {
        id: "resistir",
        label: "Resistir e questionar a investigação publicamente",
        consequence: "Parte da sua base vê força política no gesto, mas o Ministério Público endurece o caso.",
        effects: { ministerioPublico: -10, aprovacao: 2 },
        sectorEffects: { imprensaLocal: -6, vereadores: 3 },
        leaning: 0,
      },
    ],
  },
  {
    id: "crime-ambiental-em-area-de-preservacao",
    title: "Crime Ambiental em Área de Preservação",
    category: "judicial",
    description:
      "Fiscais flagram uma obra irregular avançando sobre uma área de preservação da cidade. O caso já chegou ao Ministério Público.",
    choices: [
      {
        id: "autuar-e-embargar",
        label: "Autuar a obra irregular e embargar o empreendimento",
        consequence: "O Ministério Público reconhece a ação firme, mas o setor da construção civil reage mal à perda do empreendimento.",
        effects: { ministerioPublico: 7, caixaMunicipal: -2 },
        sectorEffects: { comerciantes: -7, igrejas: 3 },
        leaning: -2,
      },
      {
        id: "fazer-vista-grossa",
        label: "Fazer vista grossa para não perder o apoio do setor",
        consequence: "Você mantém o apoio de construtoras influentes, mas o Ministério Público abre investigação sobre a omissão da prefeitura.",
        effects: { ministerioPublico: -11, caixaMunicipal: 3 },
        sectorEffects: { comerciantes: 6 },
        leaning: 2,
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
        label: "Estruturar acolhimento humanitário com apoio das igrejas",
        consequence: "Comunidades religiosas e entidades elogiam a postura, mas parte da população da periferia teme sobrecarga dos serviços locais.",
        effects: { aprovacao: -3 },
        sectorEffects: { moradoresPeriferia: -4, igrejas: 8, imprensaLocal: 3 },
        leaning: -1,
      },
      {
        id: "restringir",
        label: "Restringir o acesso a serviços municipais",
        consequence: "Parte da população local aprova a medida, mas a cidade é criticada por entidades religiosas e pela imprensa.",
        effects: { aprovacao: 3 },
        sectorEffects: { moradoresPeriferia: 4, igrejas: -6, imprensaLocal: -5 },
        leaning: 1,
      },
    ],
  },
  {
    id: "conflito-entre-ambulantes-e-comerciantes",
    title: "Conflito entre Ambulantes e Comerciantes Formais",
    category: "social",
    description:
      "O aumento de vendedores ambulantes no centro gera conflito com comerciantes formais, que pedem fiscalização mais dura.",
    choices: [
      {
        id: "apoiar-ambulantes",
        label: "Reconhecer e organizar o comércio ambulante",
        consequence: "Moradores da periferia que vivem do comércio informal comemoram, mas comerciantes formais se sentem lesados e vereadores ligados ao setor reclamam.",
        effects: { aprovacao: 5, camara: -3 },
        sectorEffects: { moradoresPeriferia: 7, comerciantes: -8 },
        leaning: -1,
      },
      {
        id: "apoiar-formais",
        label: "Fiscalizar e retirar os ambulantes do centro",
        consequence: "O comércio formal respira aliviado e a arrecadação melhora, mas famílias que dependiam do comércio informal perdem a renda.",
        effects: { caixaMunicipal: 2 },
        sectorEffects: { comerciantes: 8, moradoresPeriferia: -7 },
        leaning: 1,
      },
    ],
  },
  {
    id: "liderancas-religiosas-criticam-a-prefeitura",
    title: "Lideranças Religiosas Criticam a Prefeitura",
    category: "social",
    description:
      "Pastores e padres de peso na cidade criticam publicamente decisões recentes da prefeitura em cultos e missas, mobilizando suas comunidades.",
    choices: [
      {
        id: "dialogo-com-liderancas",
        label: "Abrir diálogo direto com as lideranças religiosas",
        consequence: "As críticas perdem força e a relação se normaliza, mas o gesto consome parte da agenda do trimestre.",
        effects: { aprovacao: 4 },
        sectorEffects: { igrejas: 9, imprensaLocal: 2 },
        leaning: 0,
      },
      {
        id: "ignorar-criticas",
        label: "Ignorar as críticas e seguir a agenda normalmente",
        consequence: "Você preserva o foco da gestão, mas as críticas ganham força e mobilizam ainda mais as comunidades de fé contra a prefeitura.",
        effects: { caixaMunicipal: 2 },
        sectorEffects: { igrejas: -9, moradoresPeriferia: -3 },
        leaning: 0,
      },
    ],
  },
];
