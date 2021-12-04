import assert from "node:assert";

import module from "./part1.js";

describe("Day 3 Part 1 module", function() {
  describe("calcRate", function () {
    it("should calculate gamma rate given \"binary\" input", function() {
      const gammaRate = module.calcRate([
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
      ], "gamma");

      assert.strictEqual(gammaRate, 22);
    });

    it("should calculate epsilon rate given \"binary\" input", function() {
      const epsilonRate = module.calcRate([
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
      ], "epsilon");

      assert.strictEqual(epsilonRate, 9);
    });
  });

  describe("calcPowerConsumption", function () {
    it("should calculate power consumption based on gamma and epsilon rate", function() {
      const powerConsumption = module.calcPowerConsumption(22, 9);

      assert.strictEqual(powerConsumption, 198);
    });
  });
});
