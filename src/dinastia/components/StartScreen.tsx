import { useState } from "react";
import { DIFFICULTY_LABELS } from "../game/engine";
import type { BestReignResult, DynastyChronicleEntry, ReignHistoryEntry } from "../game/storage";
import type { Difficulty } from "../types";
import { ChronicleHistoryList } from "./ChronicleHistoryList";
import { ReignHistoryList } from "./ReignHistoryList";

interface Props {
  onStart: (difficulty: Difficulty) => void;
  bestResult: BestReignResult | null;
  reignHistory: ReignHistoryEntry[];
  chronicleHistory: DynastyChronicleEntry[];
}

const DIFFICULTIES: Difficulty[] = ["facil", "normal", "dificil"];

const DIFFICULTY_HINTS: Record<Difficulty, string> = {
  facil: "Decisões pesam menos nos indicadores.",
  normal: "Equilíbrio padrão do jogo.",
  dificil: "Decisões pesam mais — cada escolha tem consequências fortes.",
};

export function StartScreen({ onStart, bestResult, reignHistory, chronicleHistory }: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");

  return (
    <div className="screen start-screen">
      <h1>A Dinastia</h1>
      <p className="tagline">
        Você acaba de assumir o trono. Um reinado de 12 anos está em suas mãos: cada decisão
        molda o Tesouro, a Fé, a Nobreza e mais quatro frentes do seu reino.
      </p>
      <p className="tagline">
        Sobreviva aos 12 anos sem perder o controle da coroa — e deixe um legado que os próximos
        4 reinados da sua linhagem vão herdar, para o bem ou para o mal.
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
          Seu melhor reinado até agora: <strong>{bestResult.title}</strong> (média{" "}
          {Math.round(bestResult.average)}, {bestResult.turnReached} anos)
        </p>
      )}
      <ReignHistoryList entries={reignHistory} />
      <ChronicleHistoryList entries={chronicleHistory} />
      <button type="button" className="primary-button" onClick={() => onStart(difficulty)}>
        Assumir o Trono
      </button>
    </div>
  );
}
