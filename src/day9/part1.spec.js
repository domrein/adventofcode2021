import assert from "node:assert";

import module from "./part1.js";

describe("Day 9 Part 1 module", function() {
  describe("#processData", function () {
    it("should return risk level given raw data", function() {
      const riskLevel = module.processData([
        "2199943210",
        "3987894921",
        "9856789892",
        "8767896789",
        "9899965678",
      ]);

      assert.strictEqual(riskLevel, 15);
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

      assert.deepStrictEqual(adjacentHeights, [1, 3]);
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

      assert.deepStrictEqual(adjacentHeights, [1, 1]);
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

      assert.deepStrictEqual(adjacentHeights, [7, 9]);
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

      assert.deepStrictEqual(adjacentHeights, [9, 7, 9, 5]);
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
});
