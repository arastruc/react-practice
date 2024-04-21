const GameBoard = ({ board, handleSelectCard }) => {
  return (
    <ol id="game-board">
      {board.map((row, colIndex) => (
        <li key={colIndex}>
          <ol>
            {row.map((playerSymbol, rowIndex) => (
              <li key={`${colIndex}-${rowIndex}`}>
                <button
                  disabled={playerSymbol !== null}
                  onClick={() => handleSelectCard(colIndex, rowIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
