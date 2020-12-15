import React from "react";
const Square = ({ isWinMove, value, onClick }) => {
  let imgTag = "";
  if (value != null) {
    imgTag = <img className={isWinMove ? "win-move" : ""} src={`/${value}.svg`} alt={value} />;
  }
  return (
    <div className="board-item" onClick={onClick}>
      {imgTag}
    </div>
  );
};

export default Square;
