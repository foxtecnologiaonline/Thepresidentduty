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
            <strong>Indicadores</strong> — Economia, Popularidade, Segurança e Governabilidade são críticos: se
            qualquer um deles zerar, o mandato acaba ali. Saúde, Educação, Meio Ambiente e Relações
            Internacionais moldam seu legado, mas não derrubam o governo sozinhos.
          </li>
          <li>
            <strong>Setores da Sociedade</strong> — Políticos, Militares, População, Acadêmicos, Movimentos
            Sociais e Empresariado reagem às suas decisões à parte dos indicadores. Não têm limiar crítico,
            mas moldam o relatório final e algumas conquistas.
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
