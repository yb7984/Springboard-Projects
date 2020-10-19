describe("#check the intial function", function () {
  beforeEach(function () {
    // initialization logic
  });

  it("after makeBoard,lenght of board is HEIGHT", function () {
    expect(board.length).toEqual(HEIGHT);
  });
  it("after makeBoard,every lenght in the board is WIDTH", function () {
    for (let i = 0; i < WIDTH; i++) {
      expect(board[0].length).toEqual(WIDTH);
    }
  });

  it("after makeHtmlBoard,rows in table is HEIGHT + 1", function () {
    const htmlBoard = document.getElementById("board");
    expect(htmlBoard.querySelectorAll("tr").length).toEqual(HEIGHT + 1);
  });
  it("after makeHtmlBoard,cells in table is WIDTH * (HEIGHT + 1)", function () {
    const htmlBoard = document.getElementById("board");
    expect(htmlBoard.querySelectorAll("td").length).toEqual(
      WIDTH * (HEIGHT + 1)
    );
  });

  afterEach(function () {});
});

describe("#check the checking function", function () {
  beforeEach(function () {
    // initialization logic
  });

  it("#isEntireBoardFilled", function () {
    //initial is false
    expect(isEntireBoardFilled()).toEqual(false);

    //filled the board and make it true
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        board[y][x] = 1;
      }
    }
    expect(isEntireBoardFilled()).toEqual(true);

    //clear the board
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        board[y][x] = null;
      }
    }
  });

  it("#findSpotForCol", function () {
    //initially the bottom one
    expect(findSpotForCol(0)).toEqual(HEIGHT - 1);

    //fill the bottom 2 and return the third bottom one
    board[HEIGHT - 1][0] = 1;
    board[HEIGHT - 2][0] = 2;
    expect(findSpotForCol(0)).toEqual(HEIGHT - 3);
  });

  it("#checkForWin", function () {
    //initially nobody wins
    expect(checkForWin()).toEqual(false);

    //make a winner
    board[HEIGHT - 1][0] = 1;
    board[HEIGHT - 2][0] = 1;
    board[HEIGHT - 3][0] = 1;
    board[HEIGHT - 4][0] = 1;
    expect(checkForWin()).toEqual(true);

    //reset values
    board[HEIGHT - 1][0] = null;
    board[HEIGHT - 2][0] = null;
    board[HEIGHT - 3][0] = null;
    board[HEIGHT - 4][0] = null;
  });

  afterEach(function () {});
});

describe("#check DOM control functions", function () {
  beforeEach(function () {
    // initialization logic
  });

  it("#placeInTable", function () {
    //place a cell
    placeInTable(HEIGHT - 1, 0);
    const htmlBoard = document.getElementById("board");
    const cell = document.getElementById(HEIGHT - 1 + "-0");

    expect(cell.querySelectorAll("div").length).toEqual(1);

    //clear the cell
    cell.innerHTML = "";
  });

  it("#handleClick", function () {
    const htmlBoard = document.getElementById("board");
    const cellClick = document.getElementById("0");
    const cell = document.getElementById(HEIGHT - 1 + "-0");
    //make a click event
    cellClick.click();

    //has the piece
    expect(cell.querySelectorAll("div").length).toEqual(1);
    //board is updated
    expect(board[HEIGHT - 1][0]).toEqual(1);
    //currPlayer switch to 2
    expect(currPlayer).toEqual(2);

    //clear the cell
    cell.innerHTML = "";
    board[HEIGHT - 1][0] = null;
    currPlayer = 1;
  });

  afterEach(function () {});
});
