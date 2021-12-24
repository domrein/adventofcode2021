import assert from "node:assert";

import module from "./part1.js";

describe("Day 15 Part 1 module", function() {
  describe("#processData", function () {
    it("should return risk for lowest risk path given raw data", function() {
      this.timeout(300000);
      const lowestRisk = module.processData([
        "1163751742",
        "1381373672",
        "2136511328",
        "3694931569",
        "7463417111",
        "1319128137",
        "1359912421",
        "3125421639",
        "1293138521",
        "2311944581",
      ]);

      assert.strictEqual(lowestRisk, 40);
    });
  });
});
