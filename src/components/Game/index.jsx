import React, { useState, useContext, useEffect } from "react";
import Notification from "./Notification";
import Board from "./Board";
import History from "./History";
import { calculateWinner } from "./services";
import { ThemeContext } from "../../App";

const Game = () => {
  const socket = useContext(ThemeContext);

  const gameSize = 10;
  const winSteps = 5;
  const [history, setHistory] = useState([
    {
      squares: Array(400).fill(null),
      winner: null,
      winMoves: [],
      move: null,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setPlayer] = useState(true);
  const [isAsc, setSort] = useState(false);

  useEffect(() => {
    socket.on('matchInfo', info => {
      console.log("info =", info);
      setHistory(info.data.history);
      setStepNumber(info.data.stepNumber);
      setPlayer(info.data.xIsNext);
    });

  }, [socket]);

  const sendMatch = (match) => {
    console.log("postData =", match);

    socket.emit('sendMatchInfo', match, () => {
      setHistory(match.history);
      setStepNumber(match.stepNumber);
      setPlayer(match.xIsNext);
    });
  };

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
    // socket.emit("playerMove", i);
    console.log("handleCellClick");

    // const current = history.slice(0, stepNumber + 1).reverse()[0];
    // const player = xIsNext ? "x" : "o";

    const droppedHistory = history.slice(0, stepNumber + 1);
    // const newSquares = [...current.squares];
    // if (current.winner || newSquares[i]) {
    //   return;
    // }
    // newSquares[i] = player;
    // const move = { x: i % gameSize, y: Math.floor(i / gameSize) };
    // const winMoves = calculateWinner(newSquares, winSteps, i, player);
    // const winner = winMoves.length !== 0 ? player : null;

    const match = {
      history: [
        ...droppedHistory,
        {
          squares: newSquares,
          winner,
          winMoves,
          move,
        },
      ],
      stepNumber: droppedHistory.length,
      xIsNext: !xIsNext,
    }

    sendMatch(match);
    // const droppedHistory = history.slice(0, stepNumber + 1);
    // setHistory([
    //   ...droppedHistory,
    //   {
    //     squares: newSquares,
    //     winner,
    //     winMoves,
    //     move,
    //   },
    // ]);
    // setStepNumber(droppedHistory.length);
    // setPlayer(!xIsNext);
  };

  // useEffect(() => {
  //   socket.on("playerMove", (i) => {
  //     const current = history.slice(0, stepNumber + 1).reverse()[0];
  //     const player = xIsNext ? "x" : "o";
  // 
  //     const newSquares = [...current.squares];
  //     if (current.winner || newSquares[i]) {
  //       return;
  //     }
  //     newSquares[i] = player;
  //     const move = { x: i % gameSize, y: Math.floor(i / gameSize) };
  //     const winMoves = calculateWinner(newSquares, winSteps, i, player);
  //     const winner = winMoves.length !== 0 ? player : null;
  // 
  //     const droppedHistory = history.slice(0, stepNumber + 1);
  //     setHistory([
  //       ...droppedHistory,
  //       {
  //         squares: newSquares,
  //         winner,
  //         winMoves,
  //         move,
  //       },
  //     ]);
  //     setStepNumber(droppedHistory.length);
  //     setPlayer(!xIsNext);
  //   });
  //   return () => {
  //     socket.off("playerMove");
  //   };
  // }, [socket, stepNumber, history, xIsNext]);

  const jumpTo = (step) => {
    if (step !== stepNumber) {
      setStepNumber(step);
      setPlayer(step % 2 === 0);
    }
  };

  const reverseSort = () => {
    setSort(!isAsc);
  };

  const current = { ...history[stepNumber] };
  const squares = [...current.squares];
  const checkedCells = squares.reduce(
    (count, square) => count + (square !== null ? 1 : 0),
    0
  );
  const status = current.winner
    ? "Winner: "
    : checkedCells < gameSize * gameSize
      ? "Next player: "
      : "No winner!";
  const player = current.winner
    ? current.winner
    : checkedCells < gameSize * gameSize
      ? xIsNext
        ? "x"
        : "o"
      : "";
  return (
    <React.Fragment>
      <section id="main-content">
        <div className="text-center">
          <Notification
            status={status}
            player={
              player !== "" && (
                <img
                  className="align-middle"
                  height="30px"
                  src={`./${player}.svg`}
                  alt={player}
                />
              )
            }
          />
          {/* style={{pointerEvents: 'none', opacity: '0.55'}} id="game-wrapper" */}
          <div>
            <Board
              winMoves={current.winMoves}
              squares={squares}
              onClick={handleCellClick}
            />
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
