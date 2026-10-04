import type { GameEvent } from "../types";

export const EVENTS: GameEvent[] = [
  {
    id: "vazamento-prototipo",
    title: "Vazamento do Protótipo Secreto",
    category: "produtos",
    description:
      "Fotos do próximo produto ultrassecreto da Orange, ainda em desenvolvimento, aparecem numa rede social horas antes da reunião trimestral do Conselho. A imprensa já fala em 'o maior vazamento da história da empresa'.",
    choices: [
      {
        id: "processar-vazadores",
        label: "Processar os vazadores e isolar o projeto",
        consequence:
          "A investigação interna acha os responsáveis e o sigilo é reforçado, mas o clima de vigilância pesa sobre o time de produto.",
        effects: { conselho: 4, moralFuncionarios: -8 },
        sectorEffects: { funcionarios: -7, imprensa: -3 },
        leaning: -2,
      },
      {
        id: "hype-marketing",
        label: "Transformar o vazamento em hype de lançamento",
        consequence:
          "O marketing abraça as fotos vazadas e usa a repercussão a seu favor, mas parte da equipe de engenharia vê a reação como amadora.",
        effects: { reputacao: 6, inovacao: -2 },
        sectorEffects: { clientes: 5, imprensa: 4 },
        leaning: 2,
      },
    ],
  },
  {
    id: "recall-bateria",
    title: "Recall Global de Bateria",
    category: "produtos",
    description:
      "Um defeito na bateria do carro-chefe da Orange é relatado em três continentes, com alguns casos de superaquecimento. A imprensa pergunta: recall total ou resposta pontual?",
    choices: [
      {
        id: "recall-total",
        label: "Recall total e transparente",
        consequence:
          "Você assume o problema publicamente e troca todas as unidades afetadas. Os clientes elogiam a postura, mas o custo é alto.",
        effects: { reputacao: 5, financeiro: -10 },
        sectorEffects: { clientes: 6, investidores: -5 },
        leaning: 1,
      },
      {
        id: "recall-silencioso",
        label: "Resolver silenciosamente só os casos reportados",
        consequence:
          "Você economiza trocando só as unidades que geraram reclamação, mas a notícia vaza e a imprensa acusa a Orange de esconder o problema.",
        effects: { financeiro: 2, reputacao: -9 },
        sectorEffects: { imprensa: -6, clientes: -5 },
        leaning: -1,
        triggersEventId: "investigacao-senado",
      },
    ],
  },
  {
    id: "processo-antitruste",
    title: "Processo Antitruste da Loja de Apps",
    category: "institucional",
    description:
      "Reguladores de dois continentes abrem processo contra as taxas que a Orange cobra na sua loja de aplicativos, acusando a empresa de abuso de posição dominante.",
    choices: [
      {
        id: "reduzir-taxas",
        label: "Reduzir taxas e abrir a loja a concorrentes",
        consequence:
          "Você antecipa a derrota judicial e cede terreno. Reguladores elogiam o gesto, mas parte da receita de serviços desaparece.",
        effects: { relacoesRegulatorias: 8, financeiro: -7 },
        sectorEffects: { desenvolvedores: 9, investidores: -5 },
        leaning: 2,
      },
      {
        id: "lutar-justica",
        label: "Lutar na justiça e manter o modelo fechado",
        consequence:
          "Você protege a receita de curto prazo, mas o litígio se arrasta e a relação com reguladores ao redor do mundo se deteriora.",
        effects: { relacoesRegulatorias: -9, financeiro: 3 },
        sectorEffects: { desenvolvedores: -8, reguladores: -6 },
        leaning: -2,
      },
    ],
  },
  {
    id: "ataque-hacker",
    title: "Ataque Hacker aos Servidores de Nuvem",
    category: "seguranca",
    description:
      "Um grupo hacker invade os servidores de nuvem da Orange e afirma ter roubado dados de milhões de usuários. A notícia já circula nas redes antes de qualquer posicionamento oficial.",
    choices: [
      {
        id: "investir-emergencial",
        label: "Investir emergencialmente em segurança e notificar todos os usuários",
        consequence:
          "Você reforça a infraestrutura e é transparente com toda a base de usuários. Caro, mas restaura parte da confiança.",
        effects: { relacoesRegulatorias: 3, financeiro: -6 },
        sectorEffects: { clientes: 4, reguladores: 4 },
        leaning: 0,
      },
      {
        id: "notificacao-parcial",
        label: "Notificar só os usuários diretamente afetados",
        consequence:
          "Resposta proporcional ao incidente, mas a falta de clareza total deixa reguladores e clientes desconfiados.",
        effects: { relacoesRegulatorias: 1, financeiro: -3, reputacao: -2 },
        sectorEffects: { reguladores: 1, clientes: -2 },
        leaning: 0,
      },
      {
        id: "minimizar-incidente",
        label: "Minimizar o incidente publicamente",
        consequence:
          "Você evita o alarde e poupa recursos, mas o episódio vaza em detalhes e a credibilidade da Orange em segurança despenca.",
        effects: { financeiro: 2, reputacao: -8 },
        sectorEffects: { imprensa: -7, clientes: -5 },
        leaning: 0,
      },
    ],
  },
  {
    id: "greve-fabrica-parceira",
    title: "Greve na Fábrica Parceira",
    category: "pessoas",
    description:
      "Uma investigação jornalística expõe condições de trabalho precárias numa fábrica parceira que monta os produtos da Orange na Ásia. Trabalhadores entram em greve.",
    choices: [
      {
        id: "auditar-fornecedores",
        label: "Auditar fornecedores e exigir melhores condições",
        consequence:
          "Você impõe um código de conduta mais rígido aos parceiros. A reputação melhora, mas o custo de produção sobe.",
        effects: { reputacao: 6, financeiro: -5 },
        sectorEffects: { funcionarios: 5, investidores: -3 },
        leaning: -1,
      },
      {
        id: "manter-fornecedor",
        label: "Manter o fornecedor atual sem mudanças",
        consequence:
          "Você evita o custo extra, mas a reportagem ganha repercussão internacional e a marca é associada ao escândalo.",
        effects: { financeiro: 3, reputacao: -8 },
        sectorEffects: { imprensa: -6 },
        leaning: 1,
      },
    ],
  },
  {
    id: "oferta-aquisicao-hostil",
    title: "Oferta de Aquisição Hostil",
    category: "financeiro",
    description:
      "Um fundo ativista compra uma posição relevante nas ações da Orange e propõe uma reestruturação agressiva, ameaçando articular sua saída do cargo.",
    choices: [
      {
        id: "poison-pill",
        label: "Resistir com apoio do Conselho (poison pill)",
        consequence:
          "O Conselho fecha fileiras ao seu redor e a ameaça perde força, mas defender a posição custa caro em assessoria e blindagem jurídica.",
        effects: { conselho: 6, financeiro: -4 },
        sectorEffects: { investidores: -5 },
        leaning: -1,
      },
      {
        id: "negociar-ativistas",
        label: "Negociar e aceitar parte das exigências dos ativistas",
        consequence:
          "O fundo reduz a pressão e o mercado reage bem, mas parte do Conselho vê a concessão como fraqueza sua.",
        effects: { financeiro: 5, conselho: -6 },
        sectorEffects: { investidores: 8, funcionarios: -4 },
        leaning: 1,
        triggersEventId: "disputa-sucessoria",
      },
    ],
  },
  {
    id: "lancamento-antecipado",
    title: "Pressão para Lançamento Antecipado",
    category: "produtos",
    description:
      "O time de produto pede mais três meses para polir o próximo lançamento. O Conselho quer a data mantida para coincidir com a temporada de vendas.",
    choices: [
      {
        id: "atrasar-qualidade",
        label: "Atrasar o lançamento para garantir qualidade",
        consequence:
          "O produto sai mais maduro e bem recebido, mas a receita do trimestre sofre com a perda da janela sazonal.",
        effects: { inovacao: 4, satisfacaoCliente: 3, financeiro: -5 },
        sectorEffects: { clientes: 3, investidores: -4 },
        leaning: -2,
      },
      {
        id: "lancar-na-data",
        label: "Lançar na data prevista mesmo incompleto",
        consequence:
          "A receita do trimestre é garantida, mas o produto chega com arestas visíveis e o Conselho questiona o processo de decisão.",
        effects: { financeiro: 6, conselho: -4 },
        sectorEffects: { investidores: 5, clientes: -5 },
        leaning: 2,
      },
    ],
  },
  {
    id: "ativistas-ambientais",
    title: "Protesto de Ativistas Ambientais",
    category: "sustentabilidade",
    description:
      "Ativistas acampam na porta da sede da Orange cobrando ação concreta sobre o descarte de eletrônicos e a pegada de carbono da cadeia produtiva.",
    choices: [
      {
        id: "programa-sustentabilidade",
        label: "Lançar programa agressivo de sustentabilidade",
        consequence:
          "Você anuncia metas ambiciosas de reciclagem e energia renovável. O gesto é bem recebido, mas pesa no orçamento do ano.",
        effects: { sustentabilidade: 10, financeiro: -5 },
        sectorEffects: { clientes: 4, investidores: -3 },
        leaning: -2,
      },
      {
        id: "ignorar-protestos",
        label: "Ignorar os protestos e manter o foco no produto",
        consequence:
          "Você preserva o caixa no curto prazo, mas a crítica ganha força na imprensa especializada.",
        effects: { financeiro: 2, sustentabilidade: -6 },
        sectorEffects: { imprensa: -5, clientes: -3 },
        leaning: 2,
      },
    ],
  },
  {
    id: "concorrente-revolucionario",
    title: "Concorrente Lança Produto Revolucionário",
    category: "mercado",
    description:
      "Uma rival anuncia um produto que redefine a categoria em que a Orange é líder. Analistas já perguntam se a empresa perdeu o passo da inovação.",
    choices: [
      {
        id: "acelerar-pd",
        label: "Acelerar o roadmap com investimento pesado em P&D",
        consequence:
          "Você reage com um salto de investimento em pesquisa, recuperando terreno técnico ao custo de margem.",
        effects: { inovacao: 9, financeiro: -6 },
        sectorEffects: { desenvolvedores: 5, investidores: -3 },
        leaning: -1,
      },
      {
        id: "focar-marketing",
        label: "Focar em marketing para reforçar a lealdade à marca",
        consequence:
          "Uma campanha forte reforça o vínculo emocional dos fãs com a marca, mas não resolve o atraso técnico de fundo.",
        effects: { reputacao: 5, inovacao: -2 },
        sectorEffects: { clientes: 4 },
        leaning: 1,
      },
    ],
  },
  {
    id: "investigacao-senado",
    title: "Investigação no Senado",
    category: "institucional",
    description:
      "Parlamentares abrem uma investigação formal sobre práticas recentes da Orange, convocando você a depor publicamente.",
    choices: [
      {
        id: "colaborar-investigacao",
        label: "Colaborar totalmente e apresentar dados internos",
        consequence:
          "A transparência melhora sua imagem junto a reguladores, mas expõe fragilidades da gestão ao Conselho.",
        effects: { relacoesRegulatorias: 5, conselho: -5 },
        sectorEffects: { reguladores: 5 },
        leaning: 0,
      },
      {
        id: "resistir-sigilo",
        label: "Resistir e invocar sigilo comercial",
        consequence:
          "Você protege informações sensíveis, mas a resistência é lida como sinal de que há algo a esconder.",
        effects: { conselho: 2, relacoesRegulatorias: -8 },
        sectorEffects: { reguladores: -7 },
        leaning: 0,
      },
    ],
  },
  {
    id: "boicote-redes-sociais",
    title: "Boicote nas Redes Sociais",
    category: "social",
    description:
      "Uma declaração mal recebida de um executivo da Orange vira tendência nas redes. Usuários pedem boicote aos produtos da empresa.",
    choices: [
      {
        id: "desculpas-publicas",
        label: "Pedido público de desculpas e revisão da política",
        consequence:
          "O gesto acalma boa parte da base de clientes, embora alguns vejam como recuo tardio.",
        effects: { reputacao: 6, conselho: -3 },
        sectorEffects: { clientes: 6, imprensa: 3 },
        leaning: -1,
      },
      {
        id: "manter-posicao",
        label: "Manter a posição e não recuar",
        consequence:
          "Você evita parecer refém das redes sociais, mas o boicote ganha força e a reputação da marca sofre.",
        effects: { conselho: 3, reputacao: -9 },
        sectorEffects: { clientes: -7, imprensa: -5 },
        leaning: 2,
      },
    ],
  },
  {
    id: "enchente-fabrica",
    title: "Enchente Atinge Fábrica Principal",
    category: "financeiro",
    description:
      "Chuvas históricas inundam a maior fábrica parceira da Orange, interrompendo a produção dias antes do pico de vendas do trimestre.",
    choices: [
      {
        id: "resposta-emergencial",
        label: "Resposta emergencial: realocar produção e pagar hora extra",
        consequence:
          "A produção é parcialmente recuperada a tempo, mas o custo extra pesa no trimestre.",
        effects: { satisfacaoCliente: 3, financeiro: -7 },
        sectorEffects: { funcionarios: 4, clientes: 3 },
        leaning: -1,
      },
      {
        id: "protocolo-padrao",
        label: "Aguardar a normalização seguindo o protocolo padrão",
        consequence:
          "Você preserva o orçamento, mas a demora na resposta gera críticas sobre a falta de plano de contingência da empresa.",
        effects: { financeiro: 2, reputacao: -6 },
        sectorEffects: { clientes: -4, imprensa: -4 },
        leaning: 1,
      },
    ],
  },
  {
    id: "remuneracao-polemica",
    title: "Pacote de Remuneração Polêmico",
    category: "pessoas",
    description:
      "Engenheiros-chave ameaçam pedir demissão para ir à concorrência, citando salários defasados. O Conselho questiona se vale a pena reter todos.",
    choices: [
      {
        id: "reajuste-generoso",
        label: "Aprovar reajuste salarial generoso para talentos-chave",
        consequence:
          "A retenção melhora e a moral do time sobe, mas o impacto no custo de pessoal preocupa investidores.",
        effects: { moralFuncionarios: 8, financeiro: -6 },
        sectorEffects: { funcionarios: 9, investidores: -5 },
        leaning: -2,
      },
      {
        id: "reajuste-minimo",
        label: "Conceder apenas reajuste mínimo",
        consequence:
          "O orçamento fica sob controle, mas parte dos talentos mais cotados aceita propostas da concorrência.",
        effects: { financeiro: 2, moralFuncionarios: -5 },
        sectorEffects: { funcionarios: -6, investidores: 3 },
        leaning: 2,
      },
    ],
  },
  {
    id: "expansao-mercado-global",
    title: "Expansão Agressiva para Novo Mercado",
    category: "mercado",
    description:
      "Um mercado emergente de alto crescimento exige concessões sobre dados de usuários e moderação de conteúdo como condição de entrada.",
    choices: [
      {
        id: "seguir-leis-privacidade",
        label: "Expandir seguindo rigorosamente as leis locais de privacidade",
        consequence:
          "O crescimento é mais lento, mas a Orange entra no mercado sem abrir mão dos seus próprios padrões.",
        effects: { relacoesRegulatorias: 6, financeiro: -3 },
        sectorEffects: { reguladores: 5, investidores: -2 },
        leaning: -1,
      },
      {
        id: "aceitar-exigencias-locais",
        label: "Expandir rápido aceitando as exigências locais",
        consequence:
          "A receita cresce rapidamente, mas a concessão sobre dados de usuários vira notícia internacional.",
        effects: { financeiro: 8, relacoesRegulatorias: -7 },
        sectorEffects: { investidores: 6, imprensa: -6 },
        leaning: 2,
        triggersEventId: "boicote-redes-sociais",
      },
    ],
  },
  {
    id: "crise-fornecimento-chips",
    title: "Crise Global de Fornecimento de Chips",
    category: "financeiro",
    description:
      "A escassez mundial de semicondutores ameaça travar a produção dos principais produtos da Orange bem no início do trimestre mais importante do ano.",
    choices: [
      {
        id: "pagar-premium",
        label: "Pagar preço premium para garantir estoque",
        consequence:
          "A produção segue normalmente e os clientes não sentem o atraso, mas o custo por unidade dispara.",
        effects: { financeiro: -7, satisfacaoCliente: 4 },
        sectorEffects: { clientes: 4, investidores: -4 },
        leaning: 1,
      },
      {
        id: "reduzir-producao",
        label: "Reduzir produção e atrasar entregas",
        consequence:
          "O orçamento fica protegido, mas filas de espera frustram clientes e abrem espaço para a concorrência.",
        effects: { financeiro: 3, satisfacaoCliente: -8 },
        sectorEffects: { clientes: -8 },
        leaning: -1,
      },
    ],
  },
  {
    id: "denuncia-discriminacao",
    title: "Denúncia Interna de Discriminação",
    category: "pessoas",
    description:
      "Um canal de denúncias anônimo recebe múltiplos relatos de discriminação em uma divisão da Orange. O caso corre o risco de vazar para a imprensa.",
    choices: [
      {
        id: "investigacao-independente",
        label: "Abrir investigação independente e divulgar resultados",
        consequence:
          "A transparência fortalece a confiança interna, mas expõe falhas de gestão ao Conselho.",
        effects: { moralFuncionarios: 5, conselho: -4 },
        sectorEffects: { funcionarios: 6, imprensa: 4 },
        leaning: 0,
      },
      {
        id: "resolver-interno",
        label: "Resolver internamente sem divulgação pública",
        consequence:
          "Você evita o desgaste público imediato, mas funcionários veem a discrição como proteção aos responsáveis.",
        effects: { conselho: 3, moralFuncionarios: -7 },
        sectorEffects: { funcionarios: -8, imprensa: -5 },
        leaning: 0,
        triggersEventId: "investigacao-senado",
      },
    ],
  },
  {
    id: "fusao-rival",
    title: "Proposta de Fusão com Rival",
    category: "financeiro",
    description:
      "Uma concorrente de porte semelhante propõe uma fusão que criaria a maior empresa de tecnologia do setor, mas com perda de autonomia para a sua gestão.",
    choices: [
      {
        id: "negociar-fusao",
        label: "Negociar a fusão para ganhar escala",
        consequence:
          "A fusão abre uma nova escala de mercado e agrada o mercado financeiro, mas o Conselho teme perder influência na empresa combinada.",
        effects: { financeiro: 9, conselho: -5 },
        sectorEffects: { investidores: 7, funcionarios: -6 },
        leaning: 1,
      },
      {
        id: "recusar-fusao",
        label: "Recusar e manter a independência da empresa",
        consequence:
          "O Conselho elogia a decisão de manter o controle sobre os rumos da Orange, mas o mercado reage com cautela à oportunidade perdida.",
        effects: { conselho: 5, financeiro: -3 },
        sectorEffects: { funcionarios: 4, investidores: -5 },
        leaning: -1,
      },
    ],
  },
  {
    id: "falha-atualizacao-software",
    title: "Falha Crítica em Atualização de Software",
    category: "produtos",
    description:
      "Uma atualização de software lançada às pressas trava milhões de dispositivos ao redor do mundo. As redes sociais já tratam o caso como crise.",
    choices: [
      {
        id: "reverter-compensar",
        label: "Reverter imediatamente e compensar os clientes",
        consequence:
          "A reversão rápida e a compensação amenizam a crise, mas o custo do programa de compensação é alto.",
        effects: { satisfacaoCliente: 4, financeiro: -8 },
        sectorEffects: { clientes: 5 },
        leaning: 0,
      },
      {
        id: "correcao-sem-compensar",
        label: "Lançar correção em dias, sem compensação",
        consequence:
          "Você evita o custo da compensação, mas a demora na correção alimenta críticas sobre o processo de testes da empresa.",
        effects: { financeiro: 3, reputacao: -7 },
        sectorEffects: { clientes: -5, imprensa: -4 },
        leaning: 0,
      },
    ],
  },
  {
    id: "cupula-etica-ia",
    title: "Cúpula Global de Ética em IA",
    category: "institucional",
    description:
      "A Orange é convidada a ajudar a definir padrões globais de ética em inteligência artificial, numa cúpula que vai pautar a regulação do setor por anos.",
    choices: [
      {
        id: "compromissos-ambiciosos",
        label: "Assumir compromissos públicos ambiciosos de IA responsável",
        consequence:
          "A Orange ganha protagonismo regulatório e reputacional, mas os novos compromissos custam investimento em conformidade.",
        effects: { relacoesRegulatorias: 8, reputacao: 3, financeiro: -4 },
        sectorEffects: { reguladores: 6, desenvolvedores: 3 },
        leaning: -2,
      },
      {
        id: "participar-formalmente",
        label: "Participar apenas formalmente, sem compromissos concretos",
        consequence:
          "Você evita custos imediatos, mas perde a chance de moldar as regras que vão afetar a empresa no futuro.",
        effects: { relacoesRegulatorias: 1, financeiro: 2 },
        sectorEffects: { reguladores: -3 },
        leaning: 1,
      },
    ],
  },
  {
    id: "disputa-sucessoria",
    title: "Disputa Sucessória no Conselho",
    category: "institucional",
    description:
      "Uma facção do Conselho articula instalar um sucessor de confiança como co-CEO, alegando necessidade de 'equilíbrio de poder' na liderança da Orange.",
    choices: [
      {
        id: "ceder-poder",
        label: "Negociar e ceder mais poder ao Conselho",
        consequence:
          "A tensão se dissolve e o Conselho recupera confiança na governança, mas parte do time sente que sua autoridade foi esvaziada.",
        effects: { conselho: 9, moralFuncionarios: -4 },
        sectorEffects: { investidores: 4 },
        leaning: 1,
      },
      {
        id: "resistir-controle",
        label: "Resistir e reforçar seu controle único sobre a empresa",
        consequence:
          "Você mantém a autoridade plena sobre as decisões, mas a facção do Conselho sai fortalecida na oposição interna.",
        effects: { conselho: -8, moralFuncionarios: 3 },
        sectorEffects: { funcionarios: 3, investidores: -5 },
        leaning: -2,
      },
    ],
  },
];
