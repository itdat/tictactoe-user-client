import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Notification from "./Notification";
import Board from "./Board";
import History from "./History";
import { calculateWinner } from "./services";

const Game = () => {
  const [gameSize, setGameSize] = useState(3);
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      winner: null,
      winMoves: [],
      move: null,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setPlayer] = useState(true);
  const [winSteps, setWinSteps] = useState(3);
  const [isAsc, setSort] = useState(false);

  const handleCellClick = (i) => {
    const current = history.slice(0, stepNumber + 1).reverse()[0];
    const player = xIsNext ? "x" : "o";

    const newSquares = [...current.squares];
    if (current.winner || newSquares[i]) {
      return;
    }
    newSquares[i] = player;
    const move = { x: i % gameSize, y: Math.floor(i / gameSize) };
    const winMoves = calculateWinner(newSquares, winSteps, i, player);
    const winner = winMoves.length !== 0 ? player : null;

    const droppedHistory = history.slice(0, stepNumber + 1);

    setHistory([
      ...droppedHistory,
      {
        squares: newSquares,
        winner,
        winMoves,
        move,
      },
    ]);
    setStepNumber(droppedHistory.length);
    setPlayer(!xIsNext);
  };

  const jumpTo = (step) => {
    if (step !== stepNumber) {
      setStepNumber(step);
      setPlayer(step % 2 === 0);
    }
  };

  const reverseSort = () => {
    setSort(!isAsc);
  };

  const handleChangeGameSize = (e) => {
    const newSize = parseInt(e.target.value);
    setGameSize(newSize);
    setHistory([
      {
        squares: Array(newSize * newSize).fill(null),
        winner: null,
        winMoves: [],
        move: null,
      },
    ]);
    setStepNumber(0);
    setPlayer(true);
    setWinSteps(newSize < 5 ? newSize : 5);
    setSort(false);
  };

  const current = { ...history[stepNumber] };
  const squares = [...current.squares];
  const checkedCells = squares.reduce((count, square) => count + (square !== null ? 1 : 0), 0);
  const status = current.winner ? "Winner: " : checkedCells < gameSize * gameSize ? "Next player: " : "No winner!";
  const player = current.winner ? current.winner : checkedCells < gameSize * gameSize ? (xIsNext ? "x" : "o") : "";
  return (
    <React.Fragment>
      <Navbar onChangeGameSize={handleChangeGameSize} />
      <section id="main-content">
        <div className="text-center">
          <Notification
            status={status}
            player={
              player !== "" && <img className="align-middle" height="30px" src={`./${player}.svg`} alt={player} />
            }
          />
          <div id="game-wrapper">
            <Board winMoves={current.winMoves} squares={squares} onClick={handleCellClick} />
            <History
              isAsc={isAsc}
              stepNumber={stepNumber}
              history={history}
              switchSortOption={reverseSort}
              jumpTo={jumpTo}
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Game;
