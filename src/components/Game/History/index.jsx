import React from "react";

const History = ({ isAsc, stepNumber, history, switchSortOption, jumpTo }) => {
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
    <div id="info">
      <button className="btn sort-toggle btn-primary" onClick={switchSortOption}>
        {isAsc ? "Ascending" : "Descending"}
      </button>
      <div id="moves">{moves}</div>
    </div>
  );
};

export default History;
