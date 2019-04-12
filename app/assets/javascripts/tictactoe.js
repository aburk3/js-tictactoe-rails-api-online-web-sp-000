// Constant of Winning move combinations
const WINNING_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [6,4,2],
  [0,4,8]
]

// Turn count to keep track throughout the game
let turn = 0;

// If turn is even, X's turn
var player = () => turn % 2 ? 'X' : 'O';

// Attaches event listeners when the page finishes loading
$(document).ready(function() {
  attachEventListeners();
});

function attachEventListeners() {
  $('td').on('click', function() {
    if (!$.text(this)) {
      doTurn(this);
    }
  });
}

// Update the square with the token of the current player 'X' or 'O'
function updateState(square) {
  var token = player();
  $(square).text(token);
}

// Executes a turn
function doTurn(square) {
  updateState(square);
  turn++;
  if (checkWinner()) {
    resetBoard();
    saveGame();
  }
}

// Check state of board, compare board to various WINNING_COMBOS
function checkWinner() {
  let board = {};
  let winner = false;

  $('td').text((index, square) => board[index] = square);

  WINNING_COMBOS.some(function(combo) {
    if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
      setMessage(`Player ${board[combo[0]]} Won!`);
      return winner = true;
    }
  });
  return winner;
}

// Sets a message for if a Winner or Tie occurs
function setMessage(string) {
    $('#message').text(string);
}

function saveGame() {

}

function resetBoard() {
  $('td').empty();
}
