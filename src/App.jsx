import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from  "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS =
{ X: "Player 1",
  O: "Player 2",
 };

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";

  }
  return currentPlayer;
}

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveGameBoard(gameTurns) {
   let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
   for (const turn of gameTurns) {
     const { square, player } = turn;
     const { row, col } = square;
     gameBoard[row][col] = player;
    }
    return gameBoard;
  }

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      // setHasWinner(true);
      // alert(`Player ${firstSquareSymbol} has won!`);
      winner = players[firstSquareSymbol];
      console.log("Winner is", winner);
    }
  }
  return winner;
}
function App() {
  const [players,setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw =  gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
   // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      // add new turn to the beginning of the array
      // this way the most recent turn is always at the top of the log
      // and we don't need to reverse the array when rendering
      // also avoids mutating the existing array with unshift
      // which is important because we want to treat state as immutable
      // and always create a new version of it instead of changing the existing one
      // this helps React detect changes and update the UI correctly

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName
    }));
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName = {handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName = {handlePlayerNameChange}
          />
        </ol>
        {/* if we have a winner or a draw, show the GameOver component */}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
