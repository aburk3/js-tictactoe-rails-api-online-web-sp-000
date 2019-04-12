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

function updateState(square) {
  var token = player();
  $(square).text(token);
}

function doTurn(square) {
  updateState(square);
  turn++;
}

function setMessage(string) {
    $('#message').text(string);
}
