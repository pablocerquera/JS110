const rl = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 5, 9], [3, 5, 7],
  [1, 4, 7], [2, 5, 8], [3, 6, 9]
];
let board = initializeBoard();


prompt('How many players will be playing');
let howManyPlayers = Number(rl.question().trim());

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function joinOr(arr, seperation = ', ', conj = 'or') {
  if (arr.length < 2) {
    return arr.join();
  } else if ( arr.length === 2) {
    return arr.join(` ${conj} `);
  } else {
    let last = arr.slice(arr.length - 1);
    last.unshift(conj);
    arr.pop();
    return arr.join(seperation) + seperation + last.join(' ');
  }
}

function displayBoard(board, scoreObj) {
  console.clear();
  if (howManyPlayers === 2) {
    console.log(`Player 1 is ${HUMAN_MARKER} Player 2 is ${COMPUTER_MARKER}`);
  } else { console.log(`Player 1 is ${HUMAN_MARKER} Computer is ${COMPUTER_MARKER}`) }

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
  prompt(displayScore(scoreObj));

}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {
  if (howManyPlayers === 1) {
    for (let line = 0; line < WINNING_LINES.length; line++) {
      let [sq1, sq2, sq3] = WINNING_LINES[line];

      if (
        board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER
      ) {
        return 'Human person';
      } else if (
        board[sq1] === COMPUTER_MARKER &&
        board[sq2] === COMPUTER_MARKER &&
        board[sq3] === COMPUTER_MARKER
      ) {
        return 'Computer';
      }
    }
    return null;
  } else if (howManyPlayers === 2) {
    for (let line = 0; line < WINNING_LINES.length; line++) {
      let [sq1, sq2, sq3] = WINNING_LINES[line];

      if (
        board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER
      ) {
        return 'Player 1';
      } else if (
        board[sq1] === COMPUTER_MARKER &&
        board[sq2] === COMPUTER_MARKER &&
        board[sq3] === COMPUTER_MARKER
      ) {
        return 'Player 2';
      }
    }
    return null;
  }
}

function playerOneChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Player 1 choose a square ${joinOr(emptySquares(board))}: `);
    square = rl.question().trim();
    if (emptySquares(board).includes(square)) break;

    prompt("That is not a valid choice.");
  }
  board[square] = HUMAN_MARKER;
}

function playerTwoChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Player 2 choose a square ${joinOr(emptySquares(board))}: `);
    square = rl.question().trim();
    if (emptySquares(board).includes(square)) break;

    prompt("That is not a valid choice.");
  }
  board[square] = COMPUTER_MARKER;
}

function findVulnerableSquare(line, board, marker) {
  let marksInLine = line.map(square => board[square]);

  if (marksInLine.filter(val => val === marker).length === 2) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }
  return null;
}

function computerChoosesSquare(board) {
  let square;

  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    square = findVulnerableSquare(line, board, COMPUTER_MARKER);
    if (square) break;
  }

  if (!square) {
    for (let index = 0; index < WINNING_LINES.length; index++) {
      let line = WINNING_LINES[index];
      square = findVulnerableSquare(line, board, HUMAN_MARKER);
      if (square) break;
    }
  }
  if (!square && board['5'] === INITIAL_MARKER) {
    square = 5;
  }

  if (!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }
  board[square] = COMPUTER_MARKER;
}

function incrementScore(player, scoreObj) {
  if (player === 'Human person' || player === 'Player 1') {
    scoreObj.x += 1;
  } else if (player === 'Computer' || player === 'Player 2') {
    scoreObj.o += 1;
  }
}

function displayScore(scoreObj) {
  return `X's score is ${scoreObj.x} \n   O's score is ${scoreObj.o}`;
}

function playAgain() {
  let response = true;
  prompt('Would you like to play again? (y/n)');
  while (true) {
    let answer = rl.question().toLowerCase();
    if (answer === 'yes' || answer[0] === 'y') {
      response = true;
      break;
    }
    if (answer === 'no' || answer[0] === 'n') {
      response = false;
      break;
    }
    if (answer !== 'yes' || answer !== 'no') {
      prompt("Please answer 'yes' or 'no'.");
    }
  }
  return response;
}

function chooseSquare(board, currentPlayer) {
  let player;

  //debugger;

  if (currentPlayer === 0) {
    player = playerOneChoosesSquare(board);
  } else if (currentPlayer === 1) {
    if (howManyPlayers === 1) {
      player = computerChoosesSquare(board);
    } else if (howManyPlayers === 2) {
      player = playerTwoChoosesSquare(board);
    }
  }
  return player;
}
function alternatePlayer(currentPlayer) {
  if (currentPlayer === 0) {
    currentPlayer += 1;
    return currentPlayer;
  } else {
    currentPlayer -= 1;
    return currentPlayer;
  }
}

if (howManyPlayers === 1) {
  //program starts
  while (true) {
    const scoreObj = { x: 0, o: 0 };
    let currentPlayer = Math.floor(Math.random() * 1);

    while (true) {
      board = initializeBoard();
      while (true) {
        displayBoard(board, scoreObj);
        chooseSquare(board, currentPlayer);
        currentPlayer = alternatePlayer(currentPlayer);
        if (someoneWon(board) || boardFull(board)) break;
      }
      incrementScore(detectWinner(board), scoreObj);

      displayBoard(board, scoreObj);
      if (someoneWon(board)) {
        prompt(`${detectWinner(board)} wins!`);
      } else {
        prompt("It's a TIE!!!");
      }
      if (scoreObj.x === 3 || scoreObj.o === 3) break;
    }
    prompt('Would you like to play again? (y/n)');
    let answer = rl.question().toLowerCase();
    if (answer === 'yes' || answer[0] === 'y') {
      continue;
    } else if (answer === 'no' || answer[0] === 'n') {
      break;
    } else {
      prompt("Please answer 'yes' or 'no'.");
      continue;
    }
  }
  prompt('Thank you for playing my game.');
  //program ends

}

if (howManyPlayers === 2) {
  // program starts
  while (true) {
    const scoreObj = { x: 0, o: 0 };
    let currentPlayer = Math.floor(Math.random() * 1);


    while (true) {
      board = initializeBoard();
      while (true) {
        displayBoard(board, scoreObj);
        chooseSquare(board, currentPlayer);
        currentPlayer = alternatePlayer(currentPlayer);
        if (someoneWon(board) || boardFull(board)) break;
      }

      incrementScore(detectWinner(board), scoreObj);


      displayBoard(board, scoreObj);
      if (someoneWon(board)) {
        prompt(`${detectWinner(board)} wins!`);
      } else {
        prompt("It's a TIE!!!");
      }
      if (scoreObj.x === 3 || scoreObj.o === 3) break;
    }
    let response = playAgain();
    if (response === false) break;
  }
  //loop ends
  prompt('Thank you for playing my game.');
}