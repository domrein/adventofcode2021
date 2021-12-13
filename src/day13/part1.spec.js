import assert from "node:assert";

import module from "./part1.js";

describe("Day 13 Part 1 module", function() {
  describe("#processData", function () {
    it("should return dot count given raw data", function() {
      const dotCount = module.processData([
        "6,10",
        "0,14",
        "9,10",
        "0,3",
        "10,4",
        "4,11",
        "6,0",
        "6,12",
        "4,1",
        "0,13",
        "10,12",
        "3,4",
        "3,0",
        "8,4",
        "1,10",
        "2,14",
        "8,10",
        "9,0",
        "fold along y=7",
        "fold along x=5",
      ]);

      assert.strictEqual(dotCount, 17);
    });

    it("should return dot count given raw data", function() {
      const dotCount = module.processData([
        "6,10",
        "0,14",
        "9,10",
        "0,3",
        "10,4",
        "4,11",
        "6,0",
        "6,12",
        "4,1",
        "0,13",
        "10,12",
        "3,4",
        "3,0",
        "8,4",
        "1,10",
        "2,14",
        "8,10",
        "9,0",
        "fold along y=7",
      ]);

      assert.strictEqual(dotCount, 17);
    });
  });
});
