interface Props {
  onStart: () => void;
}

export function StartScreen({ onStart }: Props) {
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
      <button type="button" className="primary-button" onClick={onStart}>
        Assumir a Presidência
      </button>
    </div>
  );
}
