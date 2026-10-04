import { useEffect, useRef, useState } from "react";

interface Props {
  label: string;
  description: string;
}

/**
 * Botão "i" que revela uma descrição ao tocar/clicar, além do `title` nativo (hover) já
 * presente no elemento pai. Existe porque tooltip só-hover é invisível em touch — a
 * forma como a maioria das pessoas provavelmente joga isso num celular.
 */
export function InfoToggle({ label, description }: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <span className="info-toggle" ref={wrapperRef}>
      <button
        type="button"
        className="info-toggle-button"
        aria-expanded={open}
        aria-label={`Sobre ${label}`}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((current) => !current);
        }}
      >
        i
      </button>
      {open && (
        <div className="info-popover" role="tooltip">
          {description}
        </div>
      )}
    </span>
  );
}
