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
        return 1;
      } else if (p2Winner(currentRow) === true) {
        return 2;
      }
    }
  }

  const checkVertical = () => {
    for (let i = 0; i < 3; i++) {
      let currentColumn = gameBoard.getBoard().map((value) => value[i].getValue()); // iterate through current column and return every value inside that column
      let p1Winner = currentColumn => currentColumn.every( v => v === 1);
      let p2Winner = currentColumn => currentColumn.every( v => v === 2);
      if (p1Winner(currentColumn) === true) {
        return 1;
      } else if (p2Winner(currentColumn) === true) {
        return 2;
      } 
    }
  }

  const checkFirstDiagonal = () => {
    let diagonal1 = gameBoard.getBoard()[0][0].getValue();
    let diagonal2 = gameBoard.getBoard()[1][1].getValue();
    let diagonal3 = gameBoard.getBoard()[2][2].getValue();

    if (diagonal1 === 1 && diagonal2 === 1 && diagonal3 === 1) {
      return 1;
    } else if (diagonal1 === 2 && diagonal2 === 2 && diagonal3 === 2) {
      return 2;
    } 
  }

  const checkSecondDiagonal = () => {
    let diagonal1 = gameBoard.getBoard()[0][2].getValue();
    let diagonal2 = gameBoard.getBoard()[1][1].getValue();
    let diagonal3 = gameBoard.getBoard()[2][0].getValue();

    if (diagonal1 && diagonal2 && diagonal3 === 1) {
      return 1;
    } else if (diagonal1 && diagonal2 && diagonal3 === 2) {
      return 2
    } 
  }

  const checkFull = () => {
    return gameBoard.getBoard().every(row => row.every(cell => cell.getValue() !== 0));
  }

  const checkWinner = () => {
    let horizontal = checkHorizontal();
    let vertical = checkVertical();
    let firstDiagonal = checkFirstDiagonal();
    let secondDiagonal = checkSecondDiagonal();

    if (horizontal === 1 || vertical === 1 || firstDiagonal === 1 || secondDiagonal === 1) {
      return 1;
    } else if (horizontal === 2 || vertical === 2 || firstDiagonal === 2 || secondDiagonal === 2) {
      return 2;
    } else { return 0; }
  }

  const playGame = () => {
    let checkWin = checkWinner();

    while (checkWin === 0 && !checkFull()) {
      let rowChoice = Number(prompt('Row choice:'));
      let columnChoice = Number(prompt('Column choice:'));

      if (!(gameBoard.getBoard()[rowChoice][columnChoice].getValue() === 0)) {
        console.log('That spot is occupied already.');
        continue; // Asks for input again
      } else {
        gameBoard.markBoard(rowChoice, columnChoice, getActivePlayer().mark);
        checkWin = checkWinner();

        if (checkWin !== 0) {
          gameBoard.printBoard();
          console.log(`${getActivePlayer().name} wins!`);
          break;
        } else if (checkFull()) {
          console.log('The game is a draw!');
          break;
        }

        switchPlayerTurn();
        printNewRound();
      }
    }
  };

  // Initial play game message
  printNewRound();
  
  return { playGame, getActivePlayer };
})();





