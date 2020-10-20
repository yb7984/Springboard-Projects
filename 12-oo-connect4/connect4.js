/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

/**
 * Connect 4 game class
 */
class Game {
  /**
   * Constructor for Game
   * @param {Number} height Height of the game default value is 6
   * @param {Number} width Width of the game default value is 7
   */
  constructor(height = 6, width = 7) {
    this.HEIGHT = height;
    this.WIDTH = width;
    this.board = []; // array of rows, each row is array of cells  (board[y][x])
    this.players = [];
    this.currPlayer = null;
    this.isOver = false; //show if the game is over
    this.container = null; //outside container
    this.htmlBoard = null; //gaming htmlBoard
    this.titleDiv = null; //for showing current palyer
  }

  /**
   * Start the game
   */
  start() {
    // this.container.innerHTML  = "";

    //start the game
    this.makeBoard();
    this.makeHtmlBoard();
  }

  /**
   * Add a player to the game
   * @param {Player} player
   */
  addPlayer(player) {
    //check the player data type
    if (!(player instanceof Player)) {
      return false;
    }
    //check for the same playerId
    if (this.players.some((item) => item.playerId === player.playerId)) {
      return false;
    }
    //add to the player list
    this.players.push(player);

    if (this.players.length === 1) {
      //set the current player
      this.currPlayer = player;
    }
    return true;
  }

  /** makeBoard: create in-JS board structure:
   *   board = array of rows, each row is array of cells  (board[y][x])
   */
  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    //make a div to container the game
    const div = document.createElement("div");
    div.setAttribute("class" , "game-container");


    this.titleDiv = document.createElement("div");
    this.titleDiv.setAttribute("class" , "game-title")
    div.append(this.titleDiv);

    this.showCurrentPlayer();

    this.htmlBoard = document.createElement("table");

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement("tr");
    top.setAttribute("class", "column-top");
    top.addEventListener("click", (evt) => {
      this.handleClick(evt);
    });

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("class", x);
      top.append(headCell);
    }

    this.htmlBoard.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("class", `cell${y}-${x}`);
        row.append(cell);
      }

      this.htmlBoard.append(row);
    }

    div.append(this.htmlBoard);
    this.container.append(div);
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */
  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    // piece.classList.add(`p${this.currPlayer.playerId}`);
    //change the background to the player's color
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);

    const spot = this.htmlBoard.querySelector(`.cell${y}-${x}`);
    spot.append(piece);

    //add animation to make it drop
    let top = -50;
    const dropInterval = setInterval(function () {
      piece.style.top = `${top}px`;
      top += 2;

      if (top >= 0) {
        clearInterval(dropInterval);
      }
    }, 10); //every 10ms drop 1px
  }

  /** endGame: announce game end */
  endGame(msg) {
    alert(msg);
    //set the game is over
    this.isOver = true;
  }

  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    //if the game is over, return
    if (this.isOver) {
      return false;
    }

    // get x from ID of clicked cell
    const x = +evt.target.getAttribute("class");
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer.playerId;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.playerId} won!`);
    }

    // check for tie
    if (this.board.every((row) => row.every((cell) => cell))) {
      return this.endGame("Tie!");
    }

    // switch players
    // this.currPlayer = this.currPlayer === 1 ? 2 : 1;
    //go to next player
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i] === this.currPlayer) {
        this.currPlayer =
          i < this.players.length - 1 ? this.players[i + 1] : this.players[0];

          this.showCurrentPlayer();
        break;
      }
    }
  }

  /**
   * Show the current player on top
   */
  showCurrentPlayer(){
    this.titleDiv.innerText =  `Current Player: Player ${this.currPlayer.playerId}`;
    this.titleDiv.style.color = this.currPlayer.color;
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    const _win = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match  this.currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer.playerId
      );
    };

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

/**
 * class for player
 */
class Player {
  /**
   * Construction for player class
   * @param {Number} playerId ID number for player
   * @param {String} color Showing color for player
   */
  constructor(playerId = 1, color = "red") {
    this.playerId = playerId;
    this.color = color;
  }
}

//start button
const form = document.getElementById("frm_game");
frm_game.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const game = new Game();
  game.container = document.getElementById("game");

  const colors = form.querySelectorAll("input");
  //add players to the game
  Array.from(colors).forEach((item, index) => {
    game.addPlayer(new Player(index + 1, item.value));
  });

  //start the game
  game.start();
});
