import { useEffect, useState } from "react";

/** Observa um breakpoint via matchMedia em vez de medir onResize — mais barato e já debounced pelo navegador. */
export function useNarrowViewport(maxWidthPx: number): boolean {
  const query = `(max-width: ${maxWidthPx}px)`;
  const [isNarrow, setIsNarrow] = useState(() => window.matchMedia?.(query).matches ?? false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => setIsNarrow(event.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return isNarrow;
}
