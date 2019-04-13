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
var turn = 0;
// Used to determine if the game being saved is new or not
var currentGame = 0;

// If turn is even, X's turn
var player = () => turn % 2 ? 'O' : 'X';

// Attaches event listeners when the page finishes loading
$(document).ready(function() {
  attachListeners();
});

function attachListeners() {
  $('td').on('click', function() {
    if (!$.text(this) && !checkWinner()) {
      doTurn(this);
    }
  });

  $('#previous').on('click', () => showPreviousGames());
  $('#save').on('click', () => saveGame());
  $('#clear').on('click', () => resetBoard());
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
    saveGame();
    resetBoard();
  } else if (turn === 9) {
    setMessage("Tie game.");
    saveGame();
    resetBoard();
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

// Clears the board and resets the turn count
function resetBoard() {
  $('td').empty();
  turn = 0;
  currentGame = 0;
}

// Saves a game
function saveGame() {
  var state = [];
  var gameData = { state: state };

  $('td').text((index, square) => {
    state.push(square);
  });


  debugger
  if (currentGame) {
    $.ajax({
      type: 'PATCH',
      url: `/games/${currentGame}`,
      data: gameData
    });
  } else {
    $.post('/games', gameData, function(game) {
      currentGame = game.data.id;
      $('#games').append(`<button id="gameid-${game.data.id}">${game.data.id}</button><br>`);
      $("#gameid-" + game.data.id).on('click', () => reloadGame(game.data.id));
    });
  }
}

// Triggered by the 'Show Previous Games' button
function showPreviousGames() {
  $('#games').empty();
  $.get('/games', (savedGames) => {
    if (savedGames.data.length) {
      savedGames.data.forEach(buttonizePreviousGame);
    }
  });
}

function buttonizePreviousGame(game) {
  $('#games').append(`<button id="gameid-${game.id}">${game.id}</button><br>`);
  $(`#gameid-${game.id}`).on('click', () => reloadGame(game.id));
}

function reloadGame(gameID) {
  $('#message').empty();

  $.get("/games/" + gameID + ".json", function(data){

    const state = data.data.attributes.state
    const id = data.id

    let index = 0;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        $(`[data-x="${x}"][data-y="${y}"]`).text(state[index]);
        index++;
      }
    }
    turn = state.join('').length;
  });


}
