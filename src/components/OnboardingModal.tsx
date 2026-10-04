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
            <strong>Indicadores</strong> — Financeiro, Reputação da Marca, Confiança do Conselho e Moral dos
            Funcionários são críticos: se qualquer um deles zerar, a gestão acaba ali. Inovação, Satisfação
            do Cliente, Sustentabilidade e Relações Regulatórias moldam seu legado, mas não derrubam a
            empresa sozinhos.
          </li>
          <li>
            <strong>Stakeholders</strong> — Investidores, Imprensa, Funcionários, Clientes, Reguladores e a
            Comunidade de Desenvolvedores reagem às suas decisões à parte dos indicadores. Não têm limiar
            crítico, mas moldam o relatório final e algumas conquistas.
          </li>
          <li>
            <strong>Diretivas Executivas</strong> — a cada trimestre você também pode emitir uma diretiva
            própria (opcional, no máximo uma), além de responder ao evento sorteado.
          </li>
          <li>
            <strong>Estilo de Liderança</strong> — cada escolha também pende para Visionário (controle,
            sigilo, obsessão por produto) ou Operador (dados, mercado, delegação). A média de todas as suas
            decisões define seu perfil no relatório final — isso não afeta vitória ou derrota, só como sua
            gestão é lembrada.
          </li>
        </ul>
        <button type="button" className="primary-button" onClick={onDismiss}>
          Entendi, começar!
        </button>
      </div>
    </div>
  );
}
