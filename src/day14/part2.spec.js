import assert from "node:assert";

import module from "./part2.js";

describe("Day 14 Part 2 module", function() {
  describe("#processData", function () {
    it("should return difference between count of most and least common element after 40 insertion steps given raw data", function() {
      const difference = module.processData([
        "NNCB",
        "CH -> B",
        "HH -> N",
        "CB -> H",
        "NH -> C",
        "HB -> C",
        "HC -> B",
        "HN -> C",
        "NN -> C",
        "BH -> H",
        "NC -> B",
        "NB -> B",
        "BN -> B",
        "BB -> N",
        "BC -> B",
        "CC -> N",
        "CN -> C",
      ]);

      assert.strictEqual(difference, 2188189693529n);
    });
  });

  describe("#buildElementPairs", function () {
    it("should return element pairs given polymer template NNCB", function() {
      const elementPairs = module.buildElementPairs("NNCB");

      assert.deepStrictEqual(elementPairs, {
        NN: 1n,
        NC: 1n,
        CB: 1n,
      });
    });

    it("should return element pairs given polymer template NCNBCHB", function() {
      const elementPairs = module.buildElementPairs("NCNBCHB");

      assert.deepStrictEqual(elementPairs, {
        NC: 1n,
        CN: 1n,
        NB: 1n,
        BC: 1n,
        CH: 1n,
        HB: 1n,
      });
    });

    it("should return element pairs given polymer template NBCCNBBBCBHCB", function() {
      const elementPairs = module.buildElementPairs("NBCCNBBBCBHCB");

      assert.deepStrictEqual(elementPairs, {
        NB: 2n,
        BC: 2n,
        CC: 1n,
        CN: 1n,
        BB: 2n,
        CB: 2n,
        BH: 1n,
        HC: 1n,
      });
    });
  });

  describe("#buildRule", function() {
    it("should return rule given pair and result", function() {
      const rule = module.buildRule("CH", "B");

      assert.deepStrictEqual(rule, {
        pair: "CH",
        result: ["CB", "BH"],
      });
    });
  });

  describe("#performInsertions", function() {
    const insertionRules = Object.freeze({
      CH: ["CB", "BH"],
      HH: ["HN", "NH"],
      CB: ["CH", "HB"],
      NH: ["NC", "CH"],
      HB: ["HC", "CB"],
      HC: ["HB", "BC"],
      HN: ["HC", "CN"],
      NN: ["NC", "CN"],
      BH: ["BH", "HH"],
      NC: ["NB", "BC"],
      NB: ["NB", "BB"],
      BN: ["BB", "BN"],
      BB: ["BN", "NB"],
      BC: ["BB", "BC"],
      CC: ["CN", "NC"],
      CN: ["CC", "CN"],
    });

    it("should return updated element pairs for 1 step given element pairs and insertionRules", function() {
      const elementPairs = module.performInsertions({
        NN: 1n,
        NC: 1n,
        CB: 1n,
      }, insertionRules);

      assert.deepStrictEqual(elementPairs, {
        NC: 1n,
        CN: 1n,
        NB: 1n,
        BC: 1n,
        CH: 1n,
        HB: 1n,
      });
    });

    it("should return updated element pairs for 2 steps given element pairs and insertionRules", function() {
      let elementPairs = {
        NN: 1n,
        NC: 1n,
        CB: 1n,
      };
      for (let i = 0; i < 2; i++) {
        elementPairs = module.performInsertions(elementPairs, insertionRules);
      }

      assert.deepStrictEqual(elementPairs, {
        NB: 2n,
        BC: 2n,
        CC: 1n,
        CN: 1n,
        BB: 2n,
        CB: 2n,
        BH: 1n,
        HC: 1n,
      });
    });

    it("should return updated element pairs for 3 steps given element pairs and insertionRules", function() {
      let elementPairs = {
        NN: 1n,
        NC: 1n,
        CB: 1n,
      };
      for (let i = 0; i < 3; i++) {
        elementPairs = module.performInsertions(elementPairs, insertionRules);
      }

      assert.deepStrictEqual(elementPairs, {
        NB: 4n,
        BB: 4n,
        BC: 3n,
        CN: 2n,
        NC: 1n,
        CC: 1n,
        BN: 2n,
        CH: 2n,
        HB: 3n,
        BH: 1n,
        HH: 1n,
      });
    });
  });

  describe("#calcElementCounts", function() {
    it("should return element counts given element pairs", function() {
      const elementCounts = module.calcElementCounts({
        NB: 4n,
        BB: 4n,
        BC: 3n,
        CN: 2n,
        NC: 1n,
        CC: 1n,
        BN: 2n,
        CH: 2n,
        HB: 3n,
        BH: 1n,
        HH: 1n,
      });

      assert.deepStrictEqual(elementCounts, {
        N: 5n,
        B: 11n,
        C: 5n,
        H: 4n,
      });
    });
  });

  describe("#calcCountDifference", function() {
    it("should return element counts difference given element counts", function() {
      const difference = module.calcCountDifference({
        N: 5n,
        B: 11n,
        C: 5n,
        H: 4n,
      });

      assert.strictEqual(difference, 7n);
    });
  });
});
