# A Presidência — Seis Setores, Seis Ameaças

Simulador de decisões presidenciais: você assume o cargo e precisa reagir a crises de
economia, segurança, saúde, educação, meio ambiente, relações internacionais e
governabilidade ao longo de um mandato de 4 anos (16 trimestres) — sem deixar nenhum
indicador crítico zerar, nem perder o apoio de nenhum setor da sociedade.

## Como jogar

- A cada trimestre surge um evento com 2-3 escolhas possíveis, com o efeito numérico
  de cada opção visível antes de decidir. Cada escolha afeta os indicadores do governo
  e a relação com os seis setores da sociedade (políticos, militares, população,
  movimentos sociais, empresariado e acadêmicos).
- Além de reagir ao evento do turno, você pode emitir uma diretiva presidencial por
  conta própria (no máximo uma por trimestre) para empurrar algum indicador ou setor
  na direção que quiser — com uma contrapartida real.
- Quatro indicadores são críticos (**economia**, **popularidade**, **segurança** e
  **governabilidade**): zerar qualquer um deles encerra o mandato imediatamente.
- **Seis vias de queda**, uma por setor, sobem e descem gradualmente conforme suas
  decisões: Impeachment (Políticos), Golpe Militar (Militares), Levante Popular
  (População), Greve Geral (Movimentos Sociais), Fuga de Capitais (Empresariado) e
  Cassação Judicial (Acadêmicos). Nenhuma derruba o governo de surpresa — o painel
  "Risco de Queda" mostra o nível de cada uma, e a primeira vez que uma via chega ao
  estágio Crítico dispara um evento de crise dedicado, com chance real de negociar
  antes da queda.
- Chegar ao fim dos 16 trimestres sem nenhum colapso (indicador ou via de queda) é uma
  vitória, com um título final que varia conforme a média geral dos indicadores.
- Escolha a dificuldade (fácil, normal, difícil) antes de começar: ela multiplica o
  quanto cada decisão pesa, sem mudar as regras do jogo.
- Ao final, um relatório mostra a trajetória dos indicadores, comparação com seu
  melhor mandato, perfil ideológico das suas escolhas e as conquistas desbloqueadas —
  com opção de gerar um print (resumido ou completo) para compartilhar.
- **Modo Dinastia**: ao vencer, você pode continuar para um novo mandato herdando parte
  da popularidade conquistada, em vez de recomeçar do zero.

Seu progresso (melhor resultado, histórico dos últimos mandatos, conquistas e tema)
fica salvo localmente no navegador.

## Stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) como build tool, com [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
  para instalação e uso offline
- [Oxlint](https://oxc.rs) para lint
- [@vercel/analytics](https://vercel.com/docs/analytics) para visitas e eventos de jogo

## Desenvolvimento

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run lint       # lint
npm run build      # build de produção (tsc + vite build)
npm run preview    # preview do build de produção
```

## Estrutura

```
src/
  data/       # conteúdo do jogo: eventos, diretivas, indicadores, setores, ameaças, crises
  game/       # motor do jogo (engine), persistência local (storage) e compartilhamento
  components/ # UI
  hooks/      # hooks de tema e viewport
```
