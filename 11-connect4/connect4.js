/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let gameEnded = false;
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  const arr = [];
  for (let i = 0; i < WIDTH; i++) {
    arr.push(null);
  }
  for (let i = 0; i < HEIGHT; i++) {
    board[i] = [...arr];
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  //create the top row
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  //add the click event
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    //create the top row of cells
    const headCell = document.createElement("td");
    //set the id to show the column
    headCell.setAttribute("id", x);
    //append to the top row
    top.append(headCell);
  }
  //append the top row to the board
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    //create the gaming row
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      //create the gaming cells
      const cell = document.createElement("td");
      //set the item to show the position
      cell.setAttribute("id", `${y}-${x}`);

      //append to the row
      row.append(cell);
    }
    //append to the board
    htmlBoard.append(row);
  }
}

/**
 * check is the entire board filled
 */
function isEntireBoardFilled() {
  return board.every((y) => {
    return y.every((x) => {
      return x !== null;
    });
  });
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (board[y][x] === null) {
      return y;
    }
  }
  return null;
}

/**
 * placeInTable: update DOM to place piece into HTML table of board
 * */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const cell = document.getElementById(`${y}-${x}`);
  //create the piece for the cell
  const piece = document.createElement("div");
  //add the class for styling
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);

  //append to the cell
  cell.append(piece);

  //add animation to make it drop
  let top = -20;
  const dropInterval = setInterval(function () {
    piece.style.top = `${top}px`;
    top++;

    if (top >= 0) {
      clearInterval(dropInterval);
    }
  }, 10); //every 10ms drop 1px
}

/**
 * endGame: announce game end
 * */
function endGame(msg) {
  gameEnded = true;
  alert(msg);
}

/**
 * handleClick: handle click of column top to play piece
 * */
function handleClick(evt) {
  //if the game is ended, no more action
  if (gameEnded === true) {
    return false;
  }
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return false;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);

  //update the board
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (isEntireBoardFilled()) {
    return endGame(`Game tie!`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/**
 * checkForWin: check board cell-by-cell for "does a win start here?"
 * */
function checkForWin() {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  };

  // TODO: read and understand this code. Add comments to help you.
  //iterate throught the board
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //to win horizontally, all y's are the same
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      //to win vertically, all x's are the same
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];

      //to win diag to the right, x's and y's are all plus 1 every step
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      //to win diag to the left, x's subtract 1 every step and y's plus 1 every step
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      //one way winning is a win
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
