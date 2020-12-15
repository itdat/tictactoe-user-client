const calculateWinner = (squares, winSteps, index, player) => {
  const x = index % Math.sqrt(squares.length),
    y = Math.floor(index / Math.sqrt(squares.length)),
    size = Math.sqrt(squares.length);

  let winMoves = [];

  // Check col
  let j = y;
  while (j >= 0 && squares[j * size + x] === player) {
    winMoves.push(j * size + x);
    --j;
  }
  j = y + 1;
  while (j < size && squares[j * size + x] === player) {
    winMoves.push(j * size + x);
    ++j;
  }
  if (winMoves.length >= winSteps) return winMoves;

  // Check row
  winMoves = [];
  let i = x;
  while (i >= 0 && squares[y * size + i] === player) {
    winMoves.push(y * size + i);
    --i;
  }
  i = x + 1;
  while (i < size && squares[y * size + i] === player) {
    winMoves.push(y * size + i);
    ++i;
  }
  if (winMoves.length >= winSteps) return winMoves;

  // Check diag
  winMoves = [];
  i = x;
  j = y;
  while (i >= 0 && j >= 0 && squares[j * size + i] === player) {
    winMoves.push(j * size + i);
    --i;
    --j;
  }
  i = x + 1;
  j = y + 1;
  while (i < size && j < size && squares[j * size + i] === player) {
    winMoves.push(j * size + i);
    ++i;
    ++j;
  }
  if (winMoves.length >= winSteps) return winMoves;

  // Check anti-diag
  winMoves = [];
  i = x;
  j = y;
  while (i >= 0 && j < size && squares[j * size + i] === player) {
    winMoves.push(j * size + i);
    --i;
    ++j;
  }
  i = x + 1;
  j = y - 1;
  while (i < size && j >= 0 && squares[j * size + i] === player) {
    winMoves.push(j * size + i);
    ++i;
    --j;
  }
  if (winMoves.length >= winSteps) return winMoves;

  return [];
};

export { calculateWinner };
