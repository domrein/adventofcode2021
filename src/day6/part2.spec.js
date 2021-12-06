import assert from "node:assert";

import module from "./part2.js";

describe("Day 6 Part 1 module", function() {
  describe("#processData", function () {
    it("should return count of lantern fish after 18 days given raw data", function() {
      const fishCount = module.processData([
        "3,4,3,1,2",
      ], 1);

      assert.strictEqual(fishCount, 5n);
    });

    it("should return count of lantern fish after 18 days given raw data", function() {
      const fishCount = module.processData([
        "3,4,3,1,2",
      ], 18);

      assert.strictEqual(fishCount, 26n);
    });

    it("should return count of lantern fish after 80 days given raw data", function() {
      const fishCount = module.processData([
        "3,4,3,1,2",
      ], 80);

      assert.strictEqual(fishCount, 5934n);
    });

    it("should return count of lantern fish after 256 days given raw data", function() {
      const fishCount = module.processData([
        "3,4,3,1,2",
      ], 256);

      assert.strictEqual(fishCount, 26984457539n);
    });
  });
});
