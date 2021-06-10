/** Boggle word check.

Given a 5x5 boggle board, see if you can find a given word in it.

In Boggle, you can start with any letter, then move in any NEWS direction.
You can continue to change directions, but you cannot use the exact same
tile twice.

So, for example::

    N C A N E
    O U I O P
    Z Q Z O N
    F A D P L
    E D E A Z

In this grid, you could find `NOON* (start at the `N` in the top
row, head south, and turn east in the third row). You cannot find
the word `CANON` --- while you can find `CANO` by starting at the
top-left `C`, you can 't re-use the exact same `N` tile on the
front row, and there's no other `N` you can reach.

*/

function makeBoard(boardString) {
  /** Make a board from a string.

    For example::

        board = makeBoard(`N C A N E
                           O U I O P
                           Z Q Z O N
                           F A D P L
                           E D E A Z`);

        board.length   // 5
        board[0]       // ['N', 'C', 'A', 'N', 'E']
    */

  const letters = boardString.split(/\s+/);

  const board = [
    letters.slice(0, 5),
    letters.slice(5, 10),
    letters.slice(10, 15),
    letters.slice(15, 20),
    letters.slice(20, 25),
  ];

  return board;
}

function find(board, word) {
  /** Can word be found in board? */
  return _find(board, Array.from(word));

  function _find(board, word, fromIndex = null, excludedIndexes = []) {

    if (word.length === 0) {
      return true;
    }

    const letter = word.shift();

    if (fromIndex === null) {
      //first letter, search the board for it
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          if (board[x][y] === letter) {
            //found it, if found the rest, return true
            if (_find(board, word, [x, y], [`${x}_${y}`])) {
              return true;
            }
          }
        }
      }

      // not found
      return false;
    } else {
      const [x, y] = fromIndex;
      //not first letter, setup the indexes to search from
      let searchIndexes = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1]
      ];

      for (let i = 0; i < searchIndexes.length; i++) {
        const [newX, newY] = searchIndexes[i];
        if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5) {
          // make sure indexes not exceeding limit

          if (board[newX][newY] === letter &&
            !excludedIndexes.includes(`${newX}_${newY}`)) {
            //found ths match letter, and haven't used it
            if (_find(
              board,
              word,
              [newX, newY],
              [...excludedIndexes, `${newX}_${newY}`]
            )) {
              // if found the rest, return true
              return true;
            }
          }
        }
      }

      // not found
      return false;
    }
  }
}

// EXAMPLE TEST

// For example::

const board = makeBoard(`N C A N E
                         O U I O P
                         Z Q Z O N
                         F A D P L
                         E D E A Z`);

// `NOON` should be found (0, 3) -> (1, 3) -> (2, 3) -> (2, 4)::

console.log(find(board, "NOON"), true);

// `NOPE` should be found (0, 3) -> (1, 3) -> (1, 4) -> (0, 4)::

console.log(find(board, "NOPE"), true);

// `CANON` can't be found (`CANO` starts at (0, 1) but can't find
// the last `N` and can't re-use the N)::

console.log(find(board, "CANON"), false);

// You cannot travel diagonally in one move, which would be required
// to find `QUINE`::

console.log(find(board, "QUINE"), false);

// We can recover if we start going down a false path (start 3, 0)::

console.log(find(board, "FADED"), true);

// An extra tricky case --- it needs to find the `N` toward the top right,
// and then go down, left, up, up, right to find all four `O`s and the `S`::

const board2 = makeBoard(`E D O S Z
                          N S O N R
                          O U O O P
                          Z Q Z O R
                          F A D P L`);

console.log(find(board2, "NOOOOS"), true);
