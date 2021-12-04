import assert from "node:assert";

import module from "./part2.js";

describe("Day 1 Part 2 module", function() {
  describe("calcWindowIncreases", function () {
    it("should calculate increases based on sliding window depth values", function() {
      const increases = module.calcWindowIncreases([
        199,
        200,
        208,
        210,
        200,
        207,
        240,
        269,
        260,
        263,
      ]);

      assert.strictEqual(increases, 5);
    });
  });
});
