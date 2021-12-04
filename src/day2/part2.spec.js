import assert from "node:assert";

import module from "./part2.js";

describe("Day 2 Part 2 module", function() {
  describe("calcMultiple", function () {
    it("should calculate multiple of horizontal and vertical position after movement with aim", function() {
      const multiple = module.calcMultiple([
        "forward 5",
        "down 5",
        "forward 8",
        "up 3",
        "down 8",
        "forward 2",
      ]);

      assert.strictEqual(multiple, 900);
    });
  });
});
