const gameBoard = (function Gameboard() {
  const row = 3;
  const column = 3;
  const board = [];
  // Create 2D Array / Board
  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(Cell()); // Pushing a cell here so we can get the value
    }
  }

  const getBoard = () => board;

  const markBoard = (row, column, player) => {
    board[row][column].addMark(player);
  };

  const resetBoard = () => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        board[i][j].addMark(0);
      }
    }
  };

  return { getBoard, markBoard, resetBoard };
})();

function Cell() {
  let value = 0;

  const addMark = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addMark, getValue };
}

const game = (function GameController(
  playerOneName = 'Player One',
  playerTwoName = 'Player Two'
) {
  const players = [
    {
      name: playerOneName,
      mark: 1,
    },
    {
      name: playerTwoName,
      mark: 2,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    // Shorthand: if activePlayer is player 1, switch to player 2; else if activePlayer is player 2, switch to player 1
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const checkHorizontal = () => {
    for (let i = 0; i < 3; i++) {
      let currentRow = gameBoard.getBoard()[i].map((cell) => cell.getValue());
      if (currentRow.every((v) => v === 1)) return 1;
      if (currentRow.every((v) => v === 2)) return 2;
    }
    return 0;
  };

  const checkVertical = () => {
    for (let i = 0; i < 3; i++) {
      let currentColumn = gameBoard
        .getBoard()
        .map((value) => value[i].getValue());
        if (currentColumn.every((v) => v === 1)) return 1;
        if (currentColumn.every((v) => v === 2)) return 2;
    }
    return 0;
  };

  const checkFirstDiagonal = () => {
    const board = gameBoard.getBoard();
    const diagonal = [board[0][0].getValue(), board[1][1].getValue(), board[2][2].getValue()];
    if (diagonal.every((v) => v === 1)) return 1;
    if (diagonal.every((v) => v === 2)) return 2;
    return 0;
  };

  const checkSecondDiagonal = () => {
    const board = gameBoard.getBoard();
    const diagonal = [board[0][2].getValue(), board[1][1].getValue(), board[2][0].getValue()];
    if (diagonal.every((v) => v === 1)) return 1;
    if (diagonal.every((v) => v === 2)) return 2;
    return 0;
  };

  const checkFull = () => {
    return gameBoard
      .getBoard()
      .every((row) => row.every((cell) => cell.getValue() !== 0));
  };

  const checkWinner = () => {
    return ( checkHorizontal() || checkVertical() || checkFirstDiagonal() || checkSecondDiagonal() );
  };

  const playGame = (rowChoice, columnChoice) => {
    let checkWin = checkWinner();
    gameBoard.markBoard(rowChoice, columnChoice, getActivePlayer().mark);
    checkWin = checkWinner();
    // Once a winner is decided, it will keep returning the player that won
    if (checkWin !== 0) {
      return 1;
    } else if (checkFull()) {
      return 2;
    } else {
      switchPlayerTurn();
    }
  };

  const resetGame = () => {
    const board = gameBoard.getBoard();
    board.forEach(row => row.forEach(cell => cell.addMark(0)));

    activePlayer = players[0];
  }

  return { playGame, getActivePlayer, resetGame};
})();

const controller = (function screenController() {
  const currentPlayerText = document.querySelector('.game-status');
  const entireBoard = document.querySelectorAll('.grid-item');
  const restartBtn = document.querySelector('.restart-btn');

  const updateScreen = () => {
    const board = gameBoard.getBoard();
    const activePlayer = game.getActivePlayer();
    let i = 0;
    let currentBoard = board.flat().map((cell) => cell.getValue());

    currentPlayerText.textContent = `${activePlayer.name}'s turn:`;

    entireBoard.forEach((item) => {
      if (currentBoard[i] === 1) {
        item.textContent = 'X';
      } else if (currentBoard[i] === 2) {
        item.textContent = 'O';
      } else {
        item.textContent = '';
      }
      i++;
    });
  };

  const clickBoard = (e) => {
    const activePlayer = game.getActivePlayer();
    const grid = e.target;
    const row = grid.dataset.row;
    const column = grid.dataset.column;
    let result = game.playGame(row, column);
    if (result === 1) {
      updateScreen();
      currentPlayerText.textContent = `${activePlayer.name} wins!`;
      entireBoard.forEach((item) => item.removeEventListener('click', clickBoard));
      return;
    } else if (result === 2) {
      updateScreen();
      currentPlayerText.textContent = 'The game is a tie!';
      entireBoard.forEach((item) => item.removeEventListener('click', clickBoard));
      return;
    }
    else { updateScreen(); }
  };
  
  restartBtn.addEventListener('click', () => {
    game.resetGame();
    updateScreen();
    entireBoard.forEach((item) => item.addEventListener('click', clickBoard));
  });  

  entireBoard.forEach((item) => item.addEventListener('click', clickBoard));

  // Initial render
  updateScreen();
})();
