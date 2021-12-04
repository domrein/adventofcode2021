import assert from "node:assert";

import module from "./part2.js";

describe("Day 3 Part 2 module", function() {
  describe("#filterByCommonBit", function () {
    it("should filter by most common bit for digit place 0 given \"binary\" input", function() {
      const binary = module.filterByCommonBit([
        "00100",
        "11110",
        "10110",
        "10111",
        "10101",
        "01111",
        "00111",
        "11100",
        "10000",
        "11001",
        "00010",
        "01010",
      ], "most", 0);

      assert.deepStrictEqual(binary, [
        "11110",
        "10110",
        "10111",
        "10101",
        "11100",
        "10000",
        "11001",
      ]);
    });

    it("should filter by most common bit for digit place 1 given \"binary\" input", function() {
      const binary = module.filterByCommonBit([
        "11110",
        "10110",
        "10111",
        "10101",
        "11100",
        "10000",
        "11001",
      ], "most", 1);

      assert.deepStrictEqual(binary, [
        "10110",
        "10111",
        "10101",
        "10000",
      ]);
    });

    it("should filter by most common bit for digit place 2 given \"binary\" input", function() {
      const binary = module.filterByCommonBit([
        "10110",
        "10111",
        "10101",
        "10000",
      ], "most", 2);

      assert.deepStrictEqual(binary, [
        "10110",
        "10111",
        "10101",
      ]);
    });

    it("should filter by most common bit for digit place 3 given \"binary\" input", function() {
      const binary = module.filterByCommonBit([
        "10110",
        "10111",
        "10101",
      ], "most", 3);

      assert.deepStrictEqual(binary, [
        "10110",
        "10111",
      ]);
    });

    it("should filter by most common bit for digit place 4 given \"binary\" input", function() {
      const binary = module.filterByCommonBit([
        "10110",
        "10111",
      ], "most", 4);

      assert.deepStrictEqual(binary, [
        "10111",
      ]);
    });

    it("should filter by least common bit for digit place 0 given \"binary\" input", function() {
      const binary = module.filterByCommonBit([
        "00100",
        "11110",
        "10110",
        "10111",
        "10101",
        "01111",
        "00111",
        "11100",
        "10000",
        "11001",
        "00010",
        "01010",
      ], "least", 0);

      assert.deepStrictEqual(binary, [
        "00100",
        "01111",
        "00111",
        "00010",
        "01010",
      ]);
    });

    it("should filter by least common bit for digit place 1 given \"binary\" input", function() {
      const binary = module.filterByCommonBit([
        "00100",
        "01111",
        "00111",
        "00010",
        "01010",
      ], "least", 1);

      assert.deepStrictEqual(binary, [
        "01111",
        "01010",
      ]);
    });

    it("should filter by least common bit for digit place 2 given \"binary\" input", function() {
      const binary = module.filterByCommonBit([
        "01111",
        "01010",
      ], "least", 2);

      assert.deepStrictEqual(binary, [
        "01010",
      ]);
    });
  });

  describe("#calcComponentRating", function () {
    it("should calculate oxygen generator component rating given \"binary\" input", function() {
      const oxygenGeneratorRating = module.calcComponentRating([
        "00100",
        "11110",
        "10110",
        "10111",
        "10101",
        "01111",
        "00111",
        "11100",
        "10000",
        "11001",
        "00010",
        "01010",
      ], "oxygen");

      assert.strictEqual(oxygenGeneratorRating, 23);
    });

    it("should calculate CO2 scrubber component rating given \"binary\" input", function() {
      const oxygenGeneratorRating = module.calcComponentRating([
        "00100",
        "11110",
        "10110",
        "10111",
        "10101",
        "01111",
        "00111",
        "11100",
        "10000",
        "11001",
        "00010",
        "01010",
      ], "CO2");

      assert.strictEqual(oxygenGeneratorRating, 10);
    });
  });

  describe("#calcLifeSupportRating", function() {
    it("should calculate life support rating given oxygen and scrubber ratings", function() {
      const lifeSupportRating = module.calcLifeSupportRating(23, 10);

      assert.strictEqual(lifeSupportRating, 230);
    });
  })
});
