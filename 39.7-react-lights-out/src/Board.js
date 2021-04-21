import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      const row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn ? true : false);
      }
      initialBoard.push(row);
    }

    // Here is the code make board solvable, 
    // make the winning board and randomly click some cells
    // Haven written test for it
    // for (let y = 0; y < nrows; y++) {
    //   const row = [];
    //   for (let x = 0; x < ncols; x++) {
    //     row.push(false);
    //   }
    //   initialBoard.push(row);
    // }

    // const flipCell = (y, x, board) => {
    //   // if this coord is actually on board, flip it
    //   if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
    //     board[y][x] = !board[y][x];
    //   }
    // };

    // const flipCellsAroundMe = (y, x, board) => {
    //   for (let i = y - 1; i <= y + 1; i++) {
    //     for (let j = x - 1; j <= x + 1; j++) {
    //       flipCell(i , j , board);
    //     }
    //   }
    // }

    // let count = 0;
    // while (count < 10) {
    //   let y = Math.floor(Math.random() * nrows);
    //   let x = Math.floor(Math.random() * ncols);

    //   flipCellsAroundMe(y, x, initialBoard);

    //   count++
    // }

    return initialBoard;
  }

  function hasWon() {
    //  check the board in state to determine whether the player has won.
    return !board.some(row => row.some(cell => cell === true));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // in the copy, flip this cell and the cells around it
      for (let i = y - 1; i <= y + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
          flipCell(i, j, boardCopy);
        }
      }

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (<div className="Board-won">You Won</div>)
  }

  // make table board
  return (<table className="Board" data-testid="Board">
    <tbody>
      {
        board.map((row, y) => {
          return (
            <tr key={y}>
              {
                row.map((isLit, x) => {
                  return <Cell cellId={`${y}-${x}`} key={`${y}-${x}`} flipCellsAroundMe={flipCellsAround} isLit={isLit} />

                })
              }
            </tr>
          )
        })
      }</tbody>
  </table>)
}

Board.defaultProps = {
  nrows: 5,
  ncols: 5,
  chanceLightStartsOn: 0.5
}

export default Board;
