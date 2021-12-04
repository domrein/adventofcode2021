import utils from "../utils.js";

class Board {
  static SIZE = 5;

  constructor() {
    this.squares = [];
    this.lastMarkedSquare = null;

    for (let row = 0; row < Board.SIZE; row++) {
      for (let column = 0; column < Board.SIZE; column++) {
        this.squares.push({
          number: 0,
          row,
          column,
          marked: false,
        });
      }
    }
  }

  populate(lines) {
    if (lines.length !== Board.SIZE) {
      console.error(`Invalid board height: ${lines.length}`);
      process.exit(1);
    }

    lines.forEach((l, row) => {
      if (l.trim().split(/\s+/).length !== Board.SIZE) {
        console.error(`Invalid line width: ${l}`);
        process.exit(1);
      }

      l.trim().split(/\s+/).forEach((d, column) => {
        const square = this.findSquare(row, column);
        square.number = Number.parseInt(d);
        if (Number.isNaN(square.number)) {
          console.error(`Invalid square number: ${d}`);
          process.exit(1);
        }
        square.marked = false;
      });
    });
    this.lastMarkedSquare = null;
  }

  findSquare(row, column) {
    const square = this.squares.find(s => s.row === row && s.column === column);
    if (!square) {
      console.error(`Unable to find square: ${row}, ${column}`);
      process.exit(1);
    }

    return square;
  }

  markSquare(number) {
    const square = this.squares.find(s => s.number === number);
    if (square) {
      square.marked = true;
      this.lastMarkedSquare = square;
    }

    return square;
  }

  checkWin() {
    let winner = false;
    this.squares
      .filter(s => s.marked)
      .forEach((ms, i, markedSquares) => {
        if (markedSquares.filter(s => s.row === ms.row).length === Board.SIZE) {
          winner = true;
        }
        if (markedSquares.filter(s => s.column === ms.column).length === Board.SIZE) {
          winner = true;
        }
      });

    return winner;
  }

  calcScore() {
    const unmarkedSum = utils.sum(
      this.squares.filter(s => !s.marked)
      .map(s => s.number)
    );

    return unmarkedSum * this.lastMarkedSquare.number;
  }
}

export default {
  async run() {
    const contents = await utils.readFile("day4", "data.txt");

    // save off moves
    const moves = contents[0].split(/,/).map(m => Number.parseInt(m));
    if (moves.filter(m => Number.isNaN(m)).length) {
      console.error(`Invalid board moves: ${moves.filter(m => Number.isNaN(m))}`);
      process.exit(1);
    }

    // build boards
    const boardLines = contents.slice(1);

    const boards = [];
    let lines = [];
    boardLines.forEach(bl => {
      lines.push(bl);
      if (lines.length === Board.SIZE) {
        const board = new Board();
        board.populate(lines);
        boards.push(board);
        lines = [];
      }
    });
    if (lines.length) {
      console.error(`Invalid number of board lines. Some lines remaining: ${lines}`);
      process.exit(1);
    }

    // run through moves until we have a winner
    let winningBoard = null;
    for (let move of moves) {
      boards.forEach(b => b.markSquare(move));
      winningBoard = boards.find(b => b.checkWin());
      if (winningBoard) {
        break;
      }
    }

    if (!winningBoard) {
      console.error(`Invalid move list. No winningBoard.`);
      process.exit(1);
    }

    console.log(`Winning Score: ${winningBoard.calcScore()}`);
  },

  Board,
};
