import { useEffect, useRef, useState, type RefObject } from "react";

interface Props {
  text: string;
  /** Nó que contém toda a tela de resultado a capturar — não só o que está visível sem rolar. */
  targetRef: RefObject<HTMLElement | null>;
}

type Status = "idle" | "working" | "shared" | "downloaded" | "error";

const STATUS_LABEL: Record<Status, string> = {
  idle: "Compartilhar resultado",
  working: "Gerando imagem…",
  shared: "Compartilhado!",
  downloaded: "Imagem salva!",
  error: "Não foi possível gerar a imagem",
};

/** `<details>` fechados e listas com rolagem interna (como a linha do tempo de decisões)
    recortam o próprio conteúdo na tela — e a captura herda esse recorte se não for desfeito
    antes de rodar. Expande/libera tudo, roda o callback, e sempre restaura o estado original. */
async function withFullyExpanded<T>(root: HTMLElement, run: () => Promise<T>): Promise<T> {
  const closedDetails = Array.from(root.querySelectorAll("details")).filter((d) => !d.open);
  closedDetails.forEach((d) => {
    d.open = true;
  });

  const scrollLists = Array.from(root.querySelectorAll<HTMLElement>(".timeline-list"));
  const previousStyles = scrollLists.map((el) => ({
    el,
    maxHeight: el.style.maxHeight,
    overflowY: el.style.overflowY,
  }));
  scrollLists.forEach((el) => {
    el.style.maxHeight = "none";
    el.style.overflowY = "visible";
  });

  try {
    return await run();
  } finally {
    previousStyles.forEach(({ el, maxHeight, overflowY }) => {
      el.style.maxHeight = maxHeight;
      el.style.overflowY = overflowY;
    });
    closedDetails.forEach((d) => {
      d.open = false;
    });
  }
}

export function ShareButton({ text, targetRef }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function scheduleReset() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus("idle"), 2500);
  }

  async function handleClick() {
    const node = targetRef.current;
    if (!node || status === "working") return;
    setStatus("working");

    try {
      // Só carrega a biblioteca de captura (~200KB) quando o jogador de fato clica aqui —
      // ela não pesa no carregamento inicial do jogo (tela inicial + primeiro evento).
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await withFullyExpanded(node, () =>
        html2canvas(node, {
          backgroundColor: getComputedStyle(document.body).backgroundColor || "#0b1220",
          useCORS: true,
          scale: Math.min(2, window.devicePixelRatio || 1),
        })
      );
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("toBlob failed");

      const file = new File([blob], "a-presidencia-resultado.png", { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "A Presidência", text });
          setStatus("shared");
          scheduleReset();
          return;
        } catch {
          // Usuário cancelou o share nativo — cai para o download abaixo.
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "a-presidencia-resultado.png";
      link.click();
      URL.revokeObjectURL(url);
      setStatus("downloaded");
    } catch {
      setStatus("error");
    }
    scheduleReset();
  }

  return (
    <button type="button" className="secondary-button" onClick={handleClick} disabled={status === "working"}>
      {STATUS_LABEL[status]}
    </button>
  );
}
