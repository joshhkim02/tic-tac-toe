const gameBoard = (function Gameboard() {
  const row = 3;
  const column = 3;
  const board = [];
  // Create 2D Array / Board
  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(Cell());  // Pushing a cell here so we can get the value
    }
  }

  const getBoard = () => board;

  const markBoard = (row, column, player) => {
    board[row][column].addMark(player);
  };

  const printRow = () => {
    const rowWithCellValues = board[0].map((cell) => cell.getValue());
    console.log(rowWithCellValues);
  }

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, markBoard, printBoard, printRow };
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

  const printNewRound = () => {
    gameBoard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const checkHorizontal = () => {
    for (let i = 0; i < 3; i++) {
      let currentRow = gameBoard.getBoard()[i].map((cell) => cell.getValue()); // iterate through current row and return every value inside that row
      let p1Winner = currentRow => currentRow.every( v => v === 1);
      let p2Winner = currentRow => currentRow.every( v => v === 2);
      if (p1Winner(currentRow) === true) {
        console.log('Player 1 wins!');
      } else if (p2Winner(currentRow) === true) {
        console.log('Player 2 wins!');
      }
    }
  }

  const checkVertical = () => {
    for (let i = 0; i < 3; i++) {
      let currentColumn = gameBoard.getBoard().map((value) => value[i].getValue()); // iterate through current column and return every value inside that column
      let p1Winner = currentColumn => currentColumn.every( v => v === 1);
      let p2Winner = currentColumn => currentColumn.every( v => v === 2);
      if (p1Winner(currentColumn) === true) {
        console.log('Player 1 wins!');
      } else if (p2Winner(currentColumn) === true) {
        console.log('Player 2 wins!');
      }
    }
  }

  const playRound = () => {
    // IMPLEMENT GAME LOGIC HERE
    let rowChoice = Number(prompt('row choice:')); 
    let columnChoice = Number(prompt('column choice:'));
    if (!(gameBoard.getBoard()[rowChoice][columnChoice].getValue() === 0)) {
      console.log('That spot is occupied already.');
      playRound();
    } else {
      gameBoard.markBoard(rowChoice, columnChoice, getActivePlayer().mark);
      switchPlayerTurn();
      printNewRound();
      checkHorizontal();
      checkVertical();
    }
  };

  // Initial play game message
  printNewRound();
  
  return { playRound, getActivePlayer };
})();

game.playRound(); // 0, 0
game.playRound(); // 1, 0
game.playRound(); // 0, 1
game.playRound(); // 1, 1
game.playRound(); // 0, 2
game.playRound();






