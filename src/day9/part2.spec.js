import assert from "node:assert";

import module from "./part2.js";

describe("Day 9 Part 2 module", function() {
  describe("#processData", function () {
    it("should return size of three largest basins multiplied together given raw data", function() {
      const riskLevel = module.processData([
        "2199943210",
        "3987894921",
        "9856789892",
        "8767896789",
        "9899965678",
      ]);

      assert.strictEqual(riskLevel, 1134);
    });
  });

  describe("#calcX", function() {
    it("should calculate x value given index of 0 and gridWidth of 3", function() {
      const x = module.calcX(0, 3);

      assert.strictEqual(x, 0);
    });

    it("should calculate x value given index of 3 and gridWidth of 3", function() {
      const x = module.calcX(3, 3);

      assert.strictEqual(x, 0);
    });

    it("should calculate x value given index of 4 and gridWidth of 3", function() {
      const x = module.calcX(4, 3);

      assert.strictEqual(x, 1);
    });
  });

  describe("#calcY", function() {
    it("should calculate y value given index of 0 and gridHeight of 3", function() {
      const y = module.calcY(0, 3);

      assert.strictEqual(y, 0);
    });

    it("should calculate x value given index of 3 and gridHeight of 3", function() {
      const y = module.calcY(3, 3);

      assert.strictEqual(y, 1);
    });

    it("should calculate x value given index of 4 and gridHeight of 3", function() {
      const y = module.calcY(4, 3);

      assert.strictEqual(y, 1);
    });
  });

  describe("#calcRiskLevel", function() {
    it("should calculate riskLevel given heights", function() {
      const riskLevel = module.calcRiskLevel([1, 0, 5, 5]);

      assert.strictEqual(riskLevel, 15);
    });
  });

  describe("#findAdjacent", function() {
    it("should find adjacent height values for upper left corner index given index, heights, gridWidth and gridHeight", function() {
      const adjacentHeights = module.findAdjacent(0,
        [
          2,1,9,9,9,4,3,2,1,0,
          3,9,8,7,8,9,4,9,2,1,
          9,8,5,6,7,8,9,8,9,2,
          8,7,6,7,8,9,6,7,8,9,
          9,8,9,9,9,6,5,6,7,8,
        ], 10, 5);

      assert.deepStrictEqual(adjacentHeights, [
        {h: 1, i: 1},
        {h: 3, i: 10},
      ]);
    });

    it("should find adjacent height values for upper right corner index given index, heights, gridWidth and gridHeight", function() {
      const adjacentHeights = module.findAdjacent(9,
        [
          2,1,9,9,9,4,3,2,1,0,
          3,9,8,7,8,9,4,9,2,1,
          9,8,5,6,7,8,9,8,9,2,
          8,7,6,7,8,9,6,7,8,9,
          9,8,9,9,9,6,5,6,7,8,
        ], 10, 5);

      assert.deepStrictEqual(adjacentHeights, [
        {h: 1, i: 8},
        {h: 1, i: 19},
      ]);
    });

    it("should find adjacent height values for lower right corner index given index, heights, gridWidth and gridHeight", function() {
      const adjacentHeights = module.findAdjacent(49,
        [
          2,1,9,9,9,4,3,2,1,0,
          3,9,8,7,8,9,4,9,2,1,
          9,8,5,6,7,8,9,8,9,2,
          8,7,6,7,8,9,6,7,8,9,
          9,8,9,9,9,6,5,6,7,8,
        ], 10, 5);

      assert.deepStrictEqual(adjacentHeights, [
        {h: 7, i: 48},
        {h: 9, i: 39},
      ]);
    });

    it("should find adjacent height values for center index given index, heights, gridWidth and gridHeight", function() {
      const adjacentHeights = module.findAdjacent(12,
        [
          2,1,9,9,9,4,3,2,1,0,
          3,9,8,7,8,9,4,9,2,1,
          9,8,5,6,7,8,9,8,9,2,
          8,7,6,7,8,9,6,7,8,9,
          9,8,9,9,9,6,5,6,7,8,
        ], 10, 5);

      assert.deepStrictEqual(adjacentHeights, [
        {h: 9, i: 11},
        {h: 7, i: 13},
        {h: 9, i: 2},
        {h: 5, i: 22},
      ]);
    });
  });

  describe("#isLowPoint", function() {
    it("should return false given index that is not low point", function() {
      const isLowPoint = module.isLowPoint(0,
        [
          2,1,9,9,9,4,3,2,1,0,
          3,9,8,7,8,9,4,9,2,1,
          9,8,5,6,7,8,9,8,9,2,
          8,7,6,7,8,9,6,7,8,9,
          9,8,9,9,9,6,5,6,7,8,
        ], 10, 5);

      assert.deepStrictEqual(isLowPoint, false);
    });

    it("should return true given index that is low point", function() {
      const isLowPoint = module.isLowPoint(1,
        [
          2,1,9,9,9,4,3,2,1,0,
          3,9,8,7,8,9,4,9,2,1,
          9,8,5,6,7,8,9,8,9,2,
          8,7,6,7,8,9,6,7,8,9,
          9,8,9,9,9,6,5,6,7,8,
        ], 10, 5);

      assert.deepStrictEqual(isLowPoint, true);
    });
  });

  describe("#buildBasins", function() {
    it("should build basins given heights, gridWidth and gridHeight", function() {
      const basins = module.buildBasins([
        2,1,9,9,9,4,3,2,1,0,
        3,9,8,7,8,9,4,9,2,1,
        9,8,5,6,7,8,9,8,9,2,
        8,7,6,7,8,9,6,7,8,9,
        9,8,9,9,9,6,5,6,7,8,
      ], 10, 5);

      assert.deepStrictEqual(basins, [
        [12, 13, 14, 21, 22, 23, 24, 25, 30, 31, 32, 33, 34, 41],
        [27, 36, 37, 38, 45, 46, 47, 48, 49],
        [5, 6, 7, 8, 9, 16, 18, 19, 29],
        [0, 1, 10],
      ]);
    });
  });

  describe("#calcBasinSizeMultiple", function() {
    it("should calculate basin size multiple given basins", function() {
      const basinSizeMultiple = module.calcBasinSizeMultiple([
        [1, 2, 3, 4],
        [1, 2, 3],
        [1, 2],
        [1, 2,]
      ]);

      assert.strictEqual(basinSizeMultiple, 24);
    });
  });
});
