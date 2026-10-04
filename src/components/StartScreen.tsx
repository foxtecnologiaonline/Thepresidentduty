import { useState } from "react";
import { MandateHistoryList } from "./MandateHistoryList";
import { DIFFICULTY_LABELS, SESSION_LENGTH_LABELS, SESSION_LENGTH_TURNS, type SessionLength } from "../game/engine";
import type { BestResult, MandateHistoryEntry } from "../game/storage";
import type { Difficulty } from "../types";

interface Props {
  onStart: (difficulty: Difficulty, sessionLength: SessionLength) => void;
  bestResult: BestResult | null;
  mandateHistory: MandateHistoryEntry[];
}

const DIFFICULTIES: Difficulty[] = ["facil", "normal", "dificil"];

const DIFFICULTY_HINTS: Record<Difficulty, string> = {
  facil: "Decisões pesam menos nos indicadores.",
  normal: "Equilíbrio padrão do jogo.",
  dificil: "Decisões pesam mais — cada escolha tem consequências fortes.",
};

const SESSION_LENGTHS: SessionLength[] = ["padrao", "sprint"];

const SESSION_LENGTH_HINTS: Record<SessionLength, string> = {
  padrao: "A gestão completa, ~15 minutos de jogo.",
  sprint: "Uma sessão rápida, ~7 minutos de jogo.",
};

export function StartScreen({ onStart, bestResult, mandateHistory }: Props) {
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [sessionLength, setSessionLength] = useState<SessionLength>("padrao");
  const totalTurns = SESSION_LENGTH_TURNS[sessionLength];

  return (
    <div className="screen start-screen">
      <h1>🍊 O CEO: Orange</h1>
      <p className="tagline">
        Você acaba de assumir como CEO da Orange. Uma gestão está em suas mãos: cada decisão
        molda o Financeiro, a Reputação da Marca, o Conselho e mais cinco frentes da empresa.
      </p>
      <p className="tagline">
        Sobreviva aos {totalTurns} trimestres da gestão sem perder o controle da situação — e
        deixe um legado à altura dos maiores nomes da tecnologia.
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

      <div className="difficulty-picker">
        <span className="difficulty-picker-label">Duração</span>
        <div className="difficulty-options">
          {SESSION_LENGTHS.map((length) => (
            <button
              key={length}
              type="button"
              className={`difficulty-chip${sessionLength === length ? " selected" : ""}`}
              onClick={() => setSessionLength(length)}
            >
              {SESSION_LENGTH_LABELS[length]}
            </button>
          ))}
        </div>
        <p className="difficulty-hint">{SESSION_LENGTH_HINTS[sessionLength]}</p>
      </div>

      {bestResult && (
        <p className="best-result">
          Sua melhor gestão até agora: <strong>{bestResult.title}</strong> (média{" "}
          {Math.round(bestResult.average)}, {bestResult.turnReached} trimestres)
        </p>
      )}
      <MandateHistoryList entries={mandateHistory} />
      <button type="button" className="primary-button" onClick={() => onStart(difficulty, sessionLength)}>
        Assumir como CEO
      </button>
    </div>
  );
}
