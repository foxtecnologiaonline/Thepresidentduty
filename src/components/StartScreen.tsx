import { useState } from "react";
import { DIFFICULTY_LABELS } from "../game/engine";
import type { BestResult } from "../game/storage";
import type { Difficulty } from "../types";

interface Props {
  onStart: (difficulty: Difficulty) => void;
  bestResult: BestResult | null;
}

const DIFFICULTIES: Difficulty[] = ["facil", "normal", "dificil"];

const DIFFICULTY_HINTS: Record<Difficulty, string> = {
  facil: "Decisões pesam menos nos indicadores.",
  normal: "Equilíbrio padrão do jogo.",
  dificil: "Decisões pesam mais — cada escolha tem consequências fortes.",
};

export function StartScreen({ onStart, bestResult }: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");

  return (
    <div className="screen start-screen">
      <h1>A Presidência</h1>
      <p className="tagline">
        Você acaba de ser eleito. Um mandato de 4 anos está em suas mãos: cada decisão
        molda a Economia, a Popularidade, a Segurança e mais cinco frentes do seu governo.
      </p>
      <p className="tagline">
        Sobreviva aos 16 trimestres do mandato sem perder o controle da situação — e
        deixe um legado à altura da história.
      </p>

      <div className="difficulty-picker">
        <span className="difficulty-picker-label">Dificuldade</span>
        <div className="difficulty-options">
          {DIFFICULTIES.map((level) => (
            <button
              key={level}
              type="button"
              className={`difficulty-chip${difficulty === level ? " selected" : ""}`}
              onClick={() => setDifficulty(level)}
            >
              {DIFFICULTY_LABELS[level]}
            </button>
          ))}
        </div>
        <p className="difficulty-hint">{DIFFICULTY_HINTS[difficulty]}</p>
      </div>

      {bestResult && (
        <p className="best-result">
          Seu melhor mandato até agora: <strong>{bestResult.title}</strong> (média{" "}
          {Math.round(bestResult.average)}, {bestResult.turnReached} trimestres)
        </p>
      )}
      <button type="button" className="primary-button" onClick={() => onStart(difficulty)}>
        Assumir a Presidência
      </button>
    </div>
  );
}
