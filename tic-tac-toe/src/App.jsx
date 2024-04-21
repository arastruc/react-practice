import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import {
  INITIAL_GAMEBOARD,
  INITIAL_PLAYER,
  WIN_CONDITIONS,
} from "./data/gameboard";
import GameOver from "./components/GameOver";

function getActivePlayerFromGameTurns(gameTurns) {
  if (gameTurns.length > 0) {
    return gameTurns[0].player === "X" ? "O" : "X";
  }
  return "X";
}

function getWinner(gameTurns) {
  if (gameTurns.length > 0) {
    let allPosition = gameTurns
      .filter(({ player }) => player === gameTurns[0].player)
      .map(({ square: { row, col } }) => `${col}-${row}`);

    const success = WIN_CONDITIONS.find((successConditions) =>
      successConditions.every((position) => allPosition.includes(position))
    );

    if (success) {
      return gameTurns[0].player;
    }
  }

  return undefined;
}

function getBoard(gameTurns) {
  //Deep Copy pour éviter la réécriture de INITIAL_GAMEBOARD en mémoire
  let board = [...INITIAL_GAMEBOARD.map((array) => [...array])];
  gameTurns.forEach(
    ({ square: { row: row, col: col }, player }) => (board[col][row] = player)
  );

  return board;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(INITIAL_PLAYER);

  const board = getBoard(gameTurns);
  const activePlayer = getActivePlayerFromGameTurns(gameTurns);
  const winner = getWinner(gameTurns);
  const hasDraw = gameTurns.length === 9;

  function handleSelectCard(col, row) {
    setGameTurns((prev) => {
      let currentPlayer = getActivePlayerFromGameTurns(prev);
      return [
        { square: { row: row, col: col }, player: currentPlayer },
        ...prev,
      ];
    });
  }

  function updatePlayerNames(currentSymbol, currentName) {
    console.log(currentSymbol, currentName);
    setPlayerName((prev) => ({ ...prev, [currentSymbol]: currentName }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            key="X"
            symbol="X"
            isActive={activePlayer == "X"}
            initialName={INITIAL_PLAYER.X}
            updatePlayerNames={updatePlayerNames}
          />
          <Player
            key="O"
            symbol="O"
            isActive={activePlayer == "O"}
            initialName={INITIAL_PLAYER.O}
            updatePlayerNames={updatePlayerNames}
          />
        </ol>

        <GameBoard
          turns={gameTurns}
          handleSelectCard={handleSelectCard}
          board={board}
        />
        {(winner || hasDraw) && (
          <GameOver
            winner={playerName[winner]}
            rematch={() => {
              setGameTurns([]);
            }}
          />
        )}
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
