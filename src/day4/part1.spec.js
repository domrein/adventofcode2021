import assert from "node:assert";

import module from "./part1.js";

describe("Day 4 Part 1 module", function() {
  describe("Board", function () {
    describe("#constructor", function () {
      it("should create and intialize instance of Board", function() {
        const board = new module.Board();

        assert.strictEqual(board.squares.length, 25);
      });
    });

    describe("#populate", function () {
      it("should reset and populate board squares based on lines", function() {
        const board = new module.Board();
        board.populate([
          "22 13 17 11  0",
          " 8  2 23  4 24",
          "21  9 14 16  7",
          " 6 10  3 18  5",
          " 1 12 20 15 19",
        ]);

        assert.strictEqual(board.squares.length, 25);
        assert.deepStrictEqual(board.squares[0], {
          number: 22,
          row: 0,
          column: 0,
          marked: false,
        });
        assert.deepStrictEqual(board.squares[12], {
          number: 14,
          row: 2,
          column: 2,
          marked: false,
        });
        assert.deepStrictEqual(board.squares[19], {
          number: 5,
          row: 3,
          column: 4,
          marked: false,
        });
        assert.deepStrictEqual(board.squares[24], {
          number: 19,
          row: 4,
          column: 4,
          marked: false,
        });
        assert.strictEqual(board.lastMarkedSquare, null);
      });
    });

    describe("#findSquare", function () {
      it("should find square by row and column", function() {
        const board = new module.Board();
        board.populate([
          " 3 15  0  2 22",
          " 9 18 13 17  5",
          "19  8  7 25 23",
          "20 11 10 24  4",
          "14 21 16 12  6",
        ]);
        const square = board.findSquare(3, 1);

        assert.deepStrictEqual(square, {
          number: 11,
          row: 3,
          column: 1,
          marked: false,
        });
      });
    });

    describe("#markSquare", function () {
      it("should mark square by number", function() {
        const board = new module.Board();
        board.populate([
          " 3 15  0  2 22",
          " 9 18 13 17  5",
          "19  8  7 25 23",
          "20 11 10 24  4",
          "14 21 16 12  6",
        ]);
        const square = board.markSquare(23);

        assert.deepStrictEqual(square, {
          number: 23,
          row: 2,
          column: 4,
          marked: true,
        });
      });
    });

    describe("#checkWin", function () {
      it("should return true if win by row", function() {
        const board = new module.Board();
        board.populate([
          " 3 15  0  2 22",
          " 9 18 13 17  5",
          "19  8  7 25 23",
          "20 11 10 24  4",
          "14 21 16 12  6",
        ]);
        board.markSquare(19);
        board.markSquare(8);
        board.markSquare(7);
        board.markSquare(25);
        board.markSquare(23);

        const winner = board.checkWin();

        assert.deepStrictEqual(winner, true);
      });

      it("should return true if win by column", function() {
        const board = new module.Board();
        board.populate([
          " 3 15  0  2 22",
          " 9 18 13 17  5",
          "19  8  7 25 23",
          "20 11 10 24  4",
          "14 21 16 12  6",
        ]);
        board.markSquare(3);
        board.markSquare(9);
        board.markSquare(19);
        board.markSquare(20);
        board.markSquare(14);

        const winner = board.checkWin();

        assert.deepStrictEqual(winner, true);
      });

      it("should return false if no complete row or column", function() {
        const board = new module.Board();
        board.populate([
          " 3 15  0  2 22",
          " 9 18 13 17  5",
          "19  8  7 25 23",
          "20 11 10 24  4",
          "14 21 16 12  6",
        ]);
        board.markSquare(3);
        board.markSquare(18);
        board.markSquare(19);
        board.markSquare(20);
        board.markSquare(14);
        board.markSquare(25);
        board.markSquare(6);
        board.markSquare(4);

        const winner = board.checkWin();

        assert.deepStrictEqual(winner, false);
      });
    });

    describe("#calcScore", function () {
      it("should calculate score for board", function() {
        const board = new module.Board();
        board.populate([
          "14 21 17 24  4",
          "10 16 15  9 19",
          "18  8 23 26 20",
          "22 11 13  6  5",
          " 2  0 12  3  7",
        ]);
        board.markSquare(7);
        board.markSquare(4);
        board.markSquare(9);
        board.markSquare(5);
        board.markSquare(11);
        board.markSquare(17);
        board.markSquare(23);
        board.markSquare(2);
        board.markSquare(0);
        board.markSquare(14);
        board.markSquare(21);
        board.markSquare(24);

        const winner = board.checkWin();
        const score = board.calcScore();

        assert.strictEqual(winner, true);
        assert.strictEqual(score, 4512);
      });
    });
  });
});
