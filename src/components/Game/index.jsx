import React, { useState, useContext, useEffect } from "react";
import Notification from "./Notification";
import Board from "./Board";
import History from "./History";
import { calculateWinner } from "./services";
import { ThemeContext } from "../../App";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/auth/authContext";

const useStyles = makeStyles({
  disabled: {
    pointerEvents: 'none',
    opacity: '0.55'
  }
});

const Game = ({ history, controller, onChangeHistory }) => {
  const classes = useStyles();
  const socket = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [name] = useState(user?.username ?? '');

  const gameSize = 10;
  const winSteps = 5;

  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setPlayer] = useState(false);
  const [isAsc, setSort] = useState(false);

  useEffect(() => {
    socket.on('matchInfo', info => {
      console.log("info =", info);
      onChangeHistory(info.data.history);
      setStepNumber(info.data.stepNumber);
      setPlayer(info.data.xIsNext);
    });

  }, [socket]);

  const sendMatch = (match) => {
    console.log("postData =", match);

    socket.emit('sendMatchInfo', match, (error) => {
      if (error) {
        console.log(error);
      } else {
        onChangeHistory(match.history);
        setStepNumber(match.stepNumber);
        setPlayer(match.xIsNext);
      }
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
    const droppedHistory = history.slice(0, stepNumber + 1);

    const match = {
      controller,
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

  // console.log("..history =", history);


  const current = { ...history[stepNumber] };
  // console.log("..stepNumber =", stepNumber);
  // console.log("..current =", current);
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
          <div id="game-wrapper" className={(controller && controller.name !== name) ? classes.disabled : null} >
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
