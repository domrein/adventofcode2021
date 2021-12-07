import assert from "node:assert";

import module from "./utils.js";

describe("utils", function() {
  describe("#sum", function () {
    it("should return sum given an array of numbers", function() {
      const sum = module.sum([1, 2, 3]);

      assert.strictEqual(sum, 6);
    });

    it("should return min given an array of numbers", function() {
      const min = module.min([1, 2, 3]);

      assert.strictEqual(min, 1);
    });

    it("should return max given an array of numbers", function() {
      const max = module.max([1, 2, 3]);

      assert.strictEqual(max, 3);
    });
  });
});
