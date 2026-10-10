import type { Theme } from "../game/storage";

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const isLight = theme === "light";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isLight ? "Mudar para tema escuro" : "Mudar para tema claro"}
      title={isLight ? "Mudar para tema escuro" : "Mudar para tema claro"}
    >
      {isLight ? "🌙" : "☀️"}
    </button>
  );
}
