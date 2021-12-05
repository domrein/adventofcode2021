import assert from "node:assert";

import module from "./part2.js";
const Point = module.Point;

describe("Day 5 Part 2 module", function() {
  describe("Point", function () {
    describe("#constructor", function () {
      it("should instantiate point and set values", function() {
        const point = new Point(1, 2);

        assert.strictEqual(point.x, 1);
        assert.strictEqual(point.y, 2);
      });
    });
  });

  describe("#parseLine", function () {
    it("should return start and end point given a horizontal text line", function() {
      const [start, end] = module.parseLine("0,9 -> 5,9");

      assert.strictEqual(start.x, 0);
      assert.strictEqual(start.y, 9);
      assert.strictEqual(end.x, 5);
      assert.strictEqual(end.y, 9);
    });

    it("should return start and end point given a vertical text line", function() {
      const [start, end] = module.parseLine("7,0 -> 7,4");

      assert.strictEqual(start.x, 7);
      assert.strictEqual(start.y, 0);
      assert.strictEqual(end.x, 7);
      assert.strictEqual(end.y, 4);
    });

    it("should return start and end point given a diagonal text line", function() {
      const [start, end] = module.parseLine("6,4 -> 2,0");

      assert.strictEqual(start.x, 6);
      assert.strictEqual(start.y, 4);
      assert.strictEqual(end.x, 2);
      assert.strictEqual(end.y, 0);
    });
  });

  describe("#isStraight", function () {
    it("should return true if line is horizontal", function() {
      const isStraight = module.isStraight(new Point(1, 0), new Point(5, 0));

      assert.strictEqual(isStraight, true);
    });

    it("should return true if line is vertical", function() {
      const isStraight = module.isStraight(new Point(1, 9), new Point(1, 4));

      assert.strictEqual(isStraight, true);
    });

    it("should return false if line is diagonal", function() {
      const isStraight = module.isStraight(new Point(3, 3), new Point(1, 1));

      assert.strictEqual(isStraight, false);
    });
  });

  describe("#buildLinePoints", function () {
    it("should return points for horizontal start/end", function() {
      const points = module.buildLinePoints(new Point(1, 0), new Point(5, 0));

      assert.strictEqual(points.length, 5);
      assert.deepStrictEqual(points, [
        new Point(1, 0),
        new Point(2, 0),
        new Point(3, 0),
        new Point(4, 0),
        new Point(5, 0),
      ]);
    });

    it("should return points for vertical start/end", function() {
      const points = module.buildLinePoints(new Point(1, 0), new Point(1, 5));

      assert.strictEqual(points.length, 6);
      assert.deepStrictEqual(points, [
        new Point(1, 0),
        new Point(1, 1),
        new Point(1, 2),
        new Point(1, 3),
        new Point(1, 4),
        new Point(1, 5),
      ]);
    });

    it("should return points for diagonal start/end", function() {
      const points = module.buildLinePoints(new Point(1, 1), new Point(3, 3));

      assert.strictEqual(points.length, 3);
      assert.deepStrictEqual(points, [
        new Point(1, 1),
        new Point(2, 2),
        new Point(3, 3),
      ]);
    });

    it("should return points for backwards horizontal start/end", function() {
      const points = module.buildLinePoints(new Point(3, 0), new Point(1, 0));

      assert.strictEqual(points.length, 3);
      assert.deepStrictEqual(points, [
        new Point(3, 0),
        new Point(2, 0),
        new Point(1, 0),
      ]);
    });

    it("should return points for backwards vertical start/end", function() {
      const points = module.buildLinePoints(new Point(1, 3), new Point(1, 0));

      assert.strictEqual(points.length, 4);
      assert.deepStrictEqual(points, [
        new Point(1, 3),
        new Point(1, 2),
        new Point(1, 1),
        new Point(1, 0),
      ]);
    });

    it("should return points for backwards diagonal start/end", function() {
      const points = module.buildLinePoints(new Point(3, 3), new Point(1, 5));

      assert.strictEqual(points.length, 3);
      assert.deepStrictEqual(points, [
        new Point(3, 3),
        new Point(2, 4),
        new Point(1, 5),
      ]);
    });
  });

  describe("#calcOverlaps", function () {
    it("should return count of overlapping points", function() {
      const overlapCount = module.calcOverlaps([
        new Point(1, 3),
        new Point(1, 0),
        new Point(1, 3),
        new Point(9, 9),
        new Point(9, 4),
        new Point(9, 1),
        new Point(9, 9),
      ]);

      assert.strictEqual(overlapCount, 2);
    });
  });

  describe("#processData", function () {
    it("should return count of overlapping points given raw data", function() {
      const overlapCount = module.processData([
        "0,9 -> 5,9",
        "8,0 -> 0,8",
        "9,4 -> 3,4",
        "2,2 -> 2,1",
        "7,0 -> 7,4",
        "6,4 -> 2,0",
        "0,9 -> 2,9",
        "3,4 -> 1,4",
        "0,0 -> 8,8",
        "5,5 -> 8,2",
      ]);

      assert.strictEqual(overlapCount, 12);
    });
  });
});
