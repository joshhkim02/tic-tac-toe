function Gameboard() {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i][j] = 0;
    }
  }

  const getBoard = () => board;

  const markBoard = () => {};

  const printBoard = () => {
    console.log(board);
  };

  return { getBoard, markBoard, printBoard };
}
