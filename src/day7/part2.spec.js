import assert from "node:assert";

import module from "./part2.js";

describe("Day 7 Part 2 module", function() {
  describe("#processData", function () {
    it("should return lowest fuel count given raw data", function() {
      const {fuelCost} = module.processData([
        "16,1,2,0,4,2,7,1,2,14"
      ]);

      assert.strictEqual(fuelCost, 168);
    });

    it("should return position given raw data", function() {
      const {position} = module.processData([
        "16,1,2,0,4,2,7,1,2,14"
      ]);

      assert.strictEqual(position, 5);
    });
  });
});
