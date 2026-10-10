# A Presidência

Simulador de decisões presidenciais: você assume o cargo e precisa reagir a crises de
economia, segurança, saúde, educação, meio ambiente, relações internacionais e
governabilidade ao longo de um mandato de 4 anos (16 trimestres), sem deixar nenhum
indicador crítico zerar.

## Como jogar

- A cada trimestre surge um evento com 2-3 escolhas possíveis. Cada escolha tem efeitos
  diferentes sobre os indicadores do governo e sobre a aprovação de setores da
  sociedade (políticos, militares, população, acadêmicos, movimentos sociais e
  empresariado).
- Além de reagir ao evento do turno, você pode emitir uma diretiva presidencial por
  conta própria (no máximo uma por trimestre) para empurrar algum indicador na direção
  que quiser — com uma contrapartida real.
- Três indicadores são críticos (**economia**, **popularidade** e **governabilidade**):
  zerar qualquer um deles encerra o mandato imediatamente. Chegar ao fim dos 16
  trimestres sem isso acontecer é uma vitória, com um título final que varia conforme a
  média geral dos indicadores.
- Escolha a dificuldade (fácil, normal, difícil) antes de começar: ela multiplica o
  quanto cada decisão pesa, sem mudar as regras do jogo.
- Ao final, um relatório mostra a trajetória dos indicadores, comparação com seu
  melhor mandato, perfil ideológico das suas escolhas e as conquistas desbloqueadas —
  com opção de gerar um print para compartilhar.
- **Modo Dinastia**: ao vencer, você pode continuar para um novo mandato herdando parte
  da popularidade conquistada, em vez de recomeçar do zero.

Seu progresso (melhor resultado, histórico dos últimos mandatos, conquistas e tema)
fica salvo localmente no navegador.

## Stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) como build tool, com [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
  para instalação e uso offline
- [Oxlint](https://oxc.rs) para lint
- [Vitest](https://vitest.dev) para testes do motor do jogo (`src/game`)

## Desenvolvimento

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run lint       # lint
npm test           # testes
npm run build      # build de produção (tsc + vite build)
npm run preview    # preview do build de produção
```

## Estrutura

```
src/
  data/       # conteúdo do jogo: eventos, diretivas, indicadores, setores, conquistas
  game/       # motor do jogo (engine), persistência local (storage) e compartilhamento
  components/ # UI
  hooks/      # hooks de tema e viewport
```
