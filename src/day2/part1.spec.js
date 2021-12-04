import assert from "node:assert";

import module from "./part1.js";

describe("Day 2 Part 1 module", function() {
  describe("calcMultiple", function () {
    it("should calculate multiple of horizontal and vertical position after movement", function() {
      const multiple = module.calcMultiple([
        "forward 5",
        "down 5",
        "forward 8",
        "up 3",
        "down 8",
        "forward 2",
      ]);

      assert.strictEqual(multiple, 150);
    });
  });
});
