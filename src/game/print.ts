/**
 * Abre o diálogo de impressão do navegador sobre o relatório final — "Salvar como PDF"
 * nesse diálogo é, na prática, o jeito de gerar um PDF do resultado sem depender de
 * nenhuma biblioteca extra. O `@media print` em index.css/App.css cuida do layout.
 *
 * As seções de detalhe (ex.: "Ver todas as decisões do mandato") usam <details> e ficam
 * fechadas por padrão — sem isso, elas sairiam de fora do relatório impresso. Abrimos
 * todas antes de imprimir e devolvemos ao estado anterior depois, para não alterar a
 * tela que o jogador estava vendo.
 */
export function printReport(): void {
  const detailsElements = Array.from(document.querySelectorAll("details"));
  const closedBeforePrint = detailsElements.filter((details) => !details.open);
  closedBeforePrint.forEach((details) => {
    details.open = true;
  });

  function restore() {
    closedBeforePrint.forEach((details) => {
      details.open = false;
    });
    window.removeEventListener("afterprint", restore);
  }
  window.addEventListener("afterprint", restore);

  window.print();
}
