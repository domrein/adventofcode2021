import assert from "node:assert";

import Grid from "./Grid.js";

describe("Grid", function() {
  describe("#constructor", function () {
    it("should return new Grid instance with instance variables set", function() {
      const values = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 0, 1,
      ];
      const grid = new Grid(3, 4, values);

      assert.strictEqual(grid.width, 3);
      assert.strictEqual(grid.height, 4);
      assert.deepStrictEqual(grid.values, values);
    });
  });

  describe("#calcX", function() {
    it("should calculate x value given index of 0 and grid width of 2 and height of 3", function() {
      const grid = new Grid(2, 3, [
        0, 1,
        2, 3,
        4, 5,
      ]);
      const x = grid.calcX(0);

      assert.strictEqual(x, 0);
    });

    it("should calculate x value given index of 2 and grid width of 2 and height of 3", function() {
      const grid = new Grid(2, 3, [
        0, 1,
        2, 3,
        4, 5,
      ]);
      const x = grid.calcX(2);

      assert.strictEqual(x, 0);
    });

    it("should calculate x value given index of 3 and grid width of 2 and height of 3", function() {
      const grid = new Grid(2, 3, [
        0, 1,
        2, 3,
        4, 5,
      ]);
      const x = grid.calcX(3);

      assert.strictEqual(x, 1);
    });
  });

  describe("#calcY", function() {
    it("should calculate y value given index of 0 and grid width of 2 and height of 3", function() {
      const grid = new Grid(2, 3, [
        0, 1,
        2, 3,
        4, 5,
      ]);
      const y = grid.calcY(0);

      assert.strictEqual(y, 0);
    });

    it("should calculate y value given index of 2 and grid width of 2 and height of 3", function() {
      const grid = new Grid(2, 3, [
        0, 1,
        2, 3,
        4, 5,
      ]);
      const y = grid.calcY(2);

      assert.strictEqual(y, 1);
    });

    it("should calculate y value given index of 3 and grid width of 2 and height of 3", function() {
      const grid = new Grid(2, 3, [
        0, 1,
        2, 3,
        4, 5,
      ]);
      const y = grid.calcY(3);

      assert.strictEqual(y, 1);
    });
  });

  describe("#findAdjacents", function() {
    it("should find adjacents for upper left corner given index (with no diagonals)", function() {
      const grid = new Grid(10, 5, [
        2,1,9,9,9,4,3,2,1,0,
        3,9,8,7,8,9,4,9,2,1,
        9,8,5,6,7,8,9,8,9,2,
        8,7,6,7,8,9,6,7,8,9,
        9,8,9,9,9,6,5,6,7,8,
      ]);
      const adjacents = grid.findAdjacents(0, false);

      assert.deepStrictEqual(adjacents, [
        {value: 1, index: 1},
        {value: 3, index: 10},
      ]);
    });

    it("should find adjacents for upper left corner given index (with diagonals)", function() {
      const grid = new Grid(10, 5, [
        2,1,9,9,9,4,3,2,1,0,
        3,9,8,7,8,9,4,9,2,1,
        9,8,5,6,7,8,9,8,9,2,
        8,7,6,7,8,9,6,7,8,9,
        9,8,9,9,9,6,5,6,7,8,
      ]);
      const adjacents = grid.findAdjacents(0, true);

      assert.deepStrictEqual(adjacents, [
        {value: 1, index: 1},
        {value: 3, index: 10},
        {value: 9, index: 11},
      ]);
    });

    it("should find adjacents for upper right corner given index given index (with no diagonals)", function() {
      const grid = new Grid(10, 5, [
        2,1,9,9,9,4,3,2,1,0,
        3,9,8,7,8,9,4,9,2,1,
        9,8,5,6,7,8,9,8,9,2,
        8,7,6,7,8,9,6,7,8,9,
        9,8,9,9,9,6,5,6,7,8,
      ]);
      const adjacents = grid.findAdjacents(9, false);

      assert.deepStrictEqual(adjacents, [
        {value: 1, index: 8},
        {value: 1, index: 19},
      ]);
    });

    it("should find adjacents for upper right corner given index given index (with diagonals)", function() {
      const grid = new Grid(10, 5, [
        2,1,9,9,9,4,3,2,1,0,
        3,9,8,7,8,9,4,9,2,1,
        9,8,5,6,7,8,9,8,9,2,
        8,7,6,7,8,9,6,7,8,9,
        9,8,9,9,9,6,5,6,7,8,
      ]);
      const adjacents = grid.findAdjacents(9, true);

      assert.deepStrictEqual(adjacents, [
        {value: 1, index: 8},
        {value: 1, index: 19},
        {value: 2, index: 18},
      ]);
    });

    it("should find adjacents for lower right corner given index (with no diagonals)", function() {
      const grid = new Grid(10, 5, [
        2,1,9,9,9,4,3,2,1,0,
        3,9,8,7,8,9,4,9,2,1,
        9,8,5,6,7,8,9,8,9,2,
        8,7,6,7,8,9,6,7,8,9,
        9,8,9,9,9,6,5,6,7,8,
      ]);
      const adjacents = grid.findAdjacents(49, false);

      assert.deepStrictEqual(adjacents, [
        {value: 7, index: 48},
        {value: 9, index: 39},
      ]);
    });

    it("should find adjacents for lower right corner given index (with diagonals)", function() {
      const grid = new Grid(10, 5, [
        2,1,9,9,9,4,3,2,1,0,
        3,9,8,7,8,9,4,9,2,1,
        9,8,5,6,7,8,9,8,9,2,
        8,7,6,7,8,9,6,7,8,9,
        9,8,9,9,9,6,5,6,7,8,
      ]);
      const adjacents = grid.findAdjacents(49, true);

      assert.deepStrictEqual(adjacents, [
        {value: 7, index: 48},
        {value: 9, index: 39},
        {value: 8, index: 38},
      ]);
    });

    it("should find adjacents for center given index (with no diagonals)", function() {
      const grid = new Grid(10, 5, [
        2,1,9,9,9,4,3,2,1,0,
        3,9,8,7,8,9,4,9,2,1,
        9,8,5,6,7,8,9,8,9,2,
        8,7,6,7,8,9,6,7,8,9,
        9,8,9,9,9,6,5,6,7,8,
      ]);
      const adjacents = grid.findAdjacents(12, false);

      assert.deepStrictEqual(adjacents, [
        {value: 9, index: 11},
        {value: 7, index: 13},
        {value: 9, index: 2},
        {value: 5, index: 22},
      ]);
    });

    it("should find adjacents for center given index (with diagonals)", function() {
      const grid = new Grid(10, 5, [
        2,1,9,9,9,4,3,2,1,0,
        3,9,8,7,8,9,4,9,2,1,
        9,8,5,6,7,8,9,8,9,2,
        8,7,6,7,8,9,6,7,8,9,
        9,8,9,9,9,6,5,6,7,8,
      ]);
      const adjacents = grid.findAdjacents(12, true);

      assert.deepStrictEqual(adjacents, [
        {value: 9, index: 11},
        {value: 7, index: 13},
        {value: 9, index: 2},
        {value: 5, index: 22},
        {value: 1, index: 1},
        {value: 9, index: 3},
        {value: 8, index: 21},
        {value: 6, index: 23},
      ]);
    });
  });

  describe("#findByValue", function() {
    it("should find matching values given value", function() {
      const grid = new Grid(2, 3, [
        0, 1,
        2, 3,
        0, 2,
      ]);

      const values = grid.findByValue(0);
      assert.deepStrictEqual(values, [
        {value: 0, index: 0},
        {value: 0, index: 4},
      ]);
    });
  });

  describe("#findByIndex", function() {
    it("should find value by index", function() {
      const grid = new Grid(2, 3, [
        0, 1,
        2, 3,
        0, 2,
      ]);

      const value = grid.findByIndex(4);
      assert.deepStrictEqual(value, {
        value: 0, index: 4,
      });
    });
  });

  describe("#findAll", function() {
    it("should find values by predicate", function() {
      const grid = new Grid(2, 3, [
        0, 1,
        2, 3,
        0, 2,
      ]);

      const values = grid.findAll(v => v >= 2);
      assert.deepStrictEqual(values, [
        {value: 2, index: 2},
        {value: 3, index: 3},
        {value: 2, index: 5},
      ]);
    });
  });
  describe("#getRow", function() {
    it("should return all values in row for index 0", function() {
      const grid = new Grid(2, 3, [
        0, 1,
        2, 3,
        0, 2,
      ]);

      const row = grid.getRow(0);
      assert.deepStrictEqual(row, [
        {value: 0, index: 0},
        {value: 1, index: 1},
      ]);
    });

    it("should return all values in row for index 1", function() {
      const grid = new Grid(2, 3, [
        0, 1,
        2, 3,
        0, 2,
      ]);

      const row = grid.getRow(1);
      assert.deepStrictEqual(row, [
        {value: 2, index: 2},
        {value: 3, index: 3},
      ]);
    });
  });
});
