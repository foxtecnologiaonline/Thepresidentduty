interface Props {
  onDismiss: () => void;
}

export function OnboardingModal({ onDismiss }: Props) {
  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-label="Como jogar">
      <div className="onboarding-modal">
        <h2>Antes de assumir o cargo</h2>
        <ul className="onboarding-list">
          <li>
            <strong>Indicadores</strong> — Orçamento, Popularidade, Segurança e Governabilidade são críticos: se
            qualquer um deles zerar, o mandato acaba ali. Saúde, Educação, Mobilidade e Meio Ambiente moldam
            seu legado, mas não derrubam a gestão sozinhos.
          </li>
          <li>
            <strong>Setores da Cidade</strong> — Vereadores, Guarda Municipal, População, Servidores Públicos,
            Associações de Bairro e Empresariado Local reagem às suas decisões à parte dos indicadores. Não têm
            limiar crítico, mas moldam o relatório final e algumas conquistas.
          </li>
          <li>
            <strong>Diretivas</strong> — a cada trimestre você também pode emitir uma diretiva própria
            (opcional, no máximo uma), além de responder ao evento sorteado.
          </li>
        </ul>
        <button type="button" className="primary-button" onClick={onDismiss}>
          Entendi, começar!
        </button>
      </div>
    </div>
  );
}
