import React from "react";
import SquareRow from "./SquareRow";

const Board = ({ winMoves, squares, onClick }) => {
  const gameSize = Math.sqrt(squares.length);
  return (
    <div id="board" className="text-center shadow-lg overflow-auto">
      {[...Array(gameSize)].map((n, i) => (
        <SquareRow key={i} winMoves={winMoves} squares={squares} rowIdx={i} nums={gameSize} onItemClick={onClick} />
      ))}
    </div>
  );
};

export default Board;
