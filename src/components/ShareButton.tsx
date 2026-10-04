import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
}

type Status = "idle" | "copied" | "shared" | "error";

const STATUS_LABEL: Record<Status, string> = {
  idle: "Compartilhar resultado",
  copied: "Copiado para a área de transferência!",
  shared: "Compartilhado!",
  error: "Não foi possível copiar",
};

export function ShareButton({ text }: Props) {
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

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ text, title: "O CEO: Orange" });
        setStatus("shared");
        scheduleReset();
        return;
      } catch {
        // Usuário cancelou o share nativo ou ele falhou — tenta copiar como alternativa.
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    scheduleReset();
  }

  return (
    <button type="button" className="secondary-button" onClick={handleShare}>
      {STATUS_LABEL[status]}
    </button>
  );
}
