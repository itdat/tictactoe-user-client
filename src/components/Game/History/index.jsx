import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  disabled: {
    pointerEvents: 'none',
    opacity: '0.55'
  }
});

const History = ({ isAsc, stepNumber, history, switchSortOption, jumpTo }) => {
  const classes = useStyles();
  const historyCopy = isAsc ? [...history] : [...history].reverse();

  const moves = historyCopy.map((record, i) => {
    const desc =
      (isAsc && i === 0) || (!isAsc && i === historyCopy.length - 1)
        ? "Go to game start"
        : `Go to move (${record.move.x}, ${record.move.y})`;
    const isCurrentMove = (isAsc && i === stepNumber) || (!isAsc && i === historyCopy.length - stepNumber - 1);
    const targetMove = isAsc ? i : historyCopy.length - i - 1;
    return (
      <button
        key={targetMove}
        className={`btn btn-block btn-outline-secondary ${isCurrentMove && "font-weight-bold"}`}
        onClick={() => jumpTo(targetMove)}
      >
        {desc}
      </button>
    );
  });

  return (
    <div id="info" className={classes.disabled}>
      <button className="btn sort-toggle btn-primary" onClick={switchSortOption}>
        {isAsc ? "Ascending" : "Descending"}
      </button>
      <div id="moves">{moves}</div>
    </div>
  );
};

export default History;
