import assert from "node:assert";

import module from "./part1.js";

describe("Day 1 Part 1 module", function() {
  describe("calcIncreases", function () {
    it("should calculate increases based on depth values", function() {
      const increases = module.calcIncreases([
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

      assert.strictEqual(increases, 7);
    });
  });
});
