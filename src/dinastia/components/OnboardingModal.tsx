interface Props {
  onDismiss: () => void;
}

export function OnboardingModal({ onDismiss }: Props) {
  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-label="Como jogar">
      <div className="onboarding-modal">
        <h2>Antes de assumir o trono</h2>
        <ul className="onboarding-list">
          <li>
            <strong>Indicadores</strong> — Tesouro, Fé e Nobreza são críticos: se qualquer um deles
            zerar, o reinado acaba ali. Exército, Colheita, Prestígio e Herdeiros moldam seu legado,
            mas não derrubam o trono sozinhos.
          </li>
          <li>
            <strong>Facções do Reino</strong> — Barões, Clero, Camponeses, Mercadores, Reino Vizinho e
            Guarda Real reagem às suas decisões à parte dos indicadores. Não têm limiar crítico, mas
            moldam a crônica final e algumas conquistas.
          </li>
          <li>
            <strong>Decretos</strong> — a cada ano você também pode emitir um decreto próprio
            (opcional, no máximo um), além de responder ao evento sorteado.
          </li>
          <li>
            <strong>A Dinastia</strong> — cada reinado dura 12 anos. Ao fim, seu sucessor herda um
            pouco do seu prestígio — e algumas de suas decisões vão ecoar nos reinados dos seus
            descendentes, até o 5º e último reinado desta linhagem.
          </li>
        </ul>
        <button type="button" className="primary-button" onClick={onDismiss}>
          Entendi, começar!
        </button>
      </div>
    </div>
  );
}
