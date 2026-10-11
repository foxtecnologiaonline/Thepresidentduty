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
            <strong>Indicadores</strong> — Economia, Popularidade, Segurança e Governabilidade são críticos:
            zerar qualquer um encerra o mandato na hora. Saúde, Educação, Meio Ambiente e Relações
            Internacionais moldam seu legado, mas não derrubam o governo sozinhos.
          </li>
          <li>
            <strong>Setores da Sociedade</strong> — Políticos, Militares, População, Acadêmicos, Movimentos
            Sociais e Empresariado reagem às suas decisões à parte dos indicadores. Não têm limiar crítico,
            mas moldam o relatório final, algumas conquistas e o risco de queda.
          </li>
          <li>
            <strong>Risco de Queda</strong> — cada setor da sociedade tem seu próprio instrumento para
            tirá-lo do poder: Políticos articulam Impeachment, Militares dão Golpe, População faz Levante,
            Movimentos Sociais decretam Greve Geral, Empresariado promove Fuga de Capitais e Acadêmicos
            sustentam uma Cassação Judicial. Os seis sobem e descem com suas decisões; se algum chegar ao
            limite, seu mandato acaba por aquela via — mesmo sem nenhum indicador ter zerado.
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
