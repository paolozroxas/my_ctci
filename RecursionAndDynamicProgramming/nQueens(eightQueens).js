const _ = require('lodash');
const BOARD_SIZE = 8;

const nQueens = (n) => {
  // init board
  const board = _.times(BOARD_SIZE, () => {
    return _.times(BOARD_SIZE, () => 0);
  });

  return nQueensHelper(board, n, [0, -1]);
}

const nQueensHelper = (board, piecesLeft, prevCoords) => {
  if (
    prevCoords[1] !== -1 && // don't check if we're just starting
    !validateBoard(board, prevCoords)
  ) { // piece placement was invalid
    return 0;
  }

  if (piecesLeft === 0) { // successful placement of all pieces
    return 1;
  }

  let count = 0;

  for (let i = prevCoords[0]; i < BOARD_SIZE; i++) {
    let j = i === prevCoords[0] ? prevCoords[1] + 1 : 0;
    for (; j < BOARD_SIZE; j++) {
      // place piece
      board[i][j] = 1;

      count += nQueensHelper(board, piecesLeft - 1, [i, j]);

      // unplace piece
      board[i][j] = 0;
    }
  }

  return count;
}

const validateBoard = (board, coords) => {
  return validateStraight(board, coords) &&
    validateDiagonal(board, coords);
}

const validateStraight = (board, coords) => {
  // validate row
  for (let j = 0; j < BOARD_SIZE; j++) {
    if (
      board[coords[0]][j] !== 0 &&
      j !== coords[1]
    ) {
      return false;
    }
  }

  // validate column
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (
      board[i][coords[1]] !== 0 &&
      i !== coords[0]
    ) {
      return false;
    }
  }

  return true;
}

const validateDiagonal = (board, coords) => {
  return validateDiagonalHelper(board, coords, true, true) &&
  validateDiagonalHelper(board, coords, true, false) &&
  validateDiagonalHelper(board, coords, false, true) &&
  validateDiagonalHelper(board, coords, false, false);
}

const validateDiagonalHelper = (board, coords, isIPos, isJPos) => {
  let i = coords[0];
  let j = coords[1];

  while (
    i < BOARD_SIZE &&
    j < BOARD_SIZE &&
    i >= 0 &&
    j >= 0
  ) {
    if (
      board[i][j] !== 0 &&
      i !== coords[0] &&
      j !== coords[1]
    ) {
      return false;
    }

    isIPos ? i++ : i--;
    isJPos ? j++ : j--;
  }

  return true;
}

const answer = nQueens(8);
console.log(answer);