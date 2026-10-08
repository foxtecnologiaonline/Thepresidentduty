/**
 * Abre o diálogo de impressão do navegador já focado no relatório final (ver a regra
 * `@media print` em App.css, que esconde toda a interface e só deixa `.end-screen`
 * visível). O usuário escolhe "Salvar como PDF" no próprio diálogo — não precisa de
 * nenhuma biblioteca extra nem de gerar a imagem no cliente.
 */
function expandCollapsedDetails() {
  document.querySelectorAll("details").forEach((details) => {
    details.open = true;
  });
}

export function PrintReportButton() {
  function handlePrint() {
    expandCollapsedDetails();
    window.print();
  }

  return (
    <button type="button" className="secondary-button" onClick={handlePrint}>
      🖨️ Gerar Print
    </button>
  );
}
