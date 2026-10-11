interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExitConfirmModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-label="Sair do mandato">
      <div className="onboarding-modal confirm-modal">
        <h2>Sair do mandato?</h2>
        <p className="confirm-text">
          O mandato em andamento não foi concluído e esse progresso será perdido. Você volta para a tela inicial.
        </p>
        <div className="confirm-actions">
          <button type="button" className="primary-button" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="secondary-button" onClick={onConfirm}>
            Sair sem salvar
          </button>
        </div>
      </div>
    </div>
  );
}
