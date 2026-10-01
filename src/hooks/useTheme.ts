import { useEffect, useState } from "react";
import { loadTheme, saveTheme, type Theme } from "../game/storage";

/** Aplica o tema no <html> via atributo (lido pelo CSS em index.css) e persiste a escolha. */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => loadTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return [theme, toggleTheme];
}
