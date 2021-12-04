import utils from "../utils.js";
import part1 from "./part1.js";
const Board = part1.Board;

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
    let losingBoard = null;
    for (let move of moves) {
      boards.forEach(b => b.markSquare(move));
      const winningBoardCount = boards.filter(b => b.checkWin()).length;
      if (winningBoardCount === boards.length - 1) {
        // everyone has won except one board
        losingBoard = boards.find(b => !b.checkWin());
        console.log(boards.filter(b => !b.checkWin()));
      }
      if (winningBoardCount === 100) {
        break;
      }
    }

    if (!losingBoard) {
      console.error(`Invalid move list. No losingBoard.`);
      process.exit(1);
    }

    console.log(`Losing Score: ${losingBoard.calcScore()}`);
  },
};
