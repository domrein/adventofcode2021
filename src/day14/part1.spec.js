import assert from "node:assert";

import module from "./part1.js";

describe("Day 14 Part 1 module", function() {
  describe("#processData", function () {
    it("should return difference between count of most and least common element after 10 insertion steps given raw data", function() {
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

      assert.strictEqual(difference, 1588);
    });
  });

  describe("#performInsertion", function () {
    it("should return updated polymer template given NNCB", function() {
      const polymerTemplate = module.performInsertion("NNCB", [
        {pair: "CH", insert: "B"},
        {pair: "HH", insert: "N"},
        {pair: "CB", insert: "H"},
        {pair: "NH", insert: "C"},
        {pair: "HB", insert: "C"},
        {pair: "HC", insert: "B"},
        {pair: "HN", insert: "C"},
        {pair: "NN", insert: "C"},
        {pair: "BH", insert: "H"},
        {pair: "NC", insert: "B"},
        {pair: "NB", insert: "B"},
        {pair: "BN", insert: "B"},
        {pair: "BB", insert: "N"},
        {pair: "BC", insert: "B"},
        {pair: "CC", insert: "N"},
        {pair: "CN", insert: "C"},
      ]);

      assert.strictEqual(polymerTemplate, "NCNBCHB");
    });

    it("should return updated polymer template given NCNBCHB", function() {
      const polymerTemplate = module.performInsertion("NCNBCHB", [
        {pair: "CH", insert: "B"},
        {pair: "HH", insert: "N"},
        {pair: "CB", insert: "H"},
        {pair: "NH", insert: "C"},
        {pair: "HB", insert: "C"},
        {pair: "HC", insert: "B"},
        {pair: "HN", insert: "C"},
        {pair: "NN", insert: "C"},
        {pair: "BH", insert: "H"},
        {pair: "NC", insert: "B"},
        {pair: "NB", insert: "B"},
        {pair: "BN", insert: "B"},
        {pair: "BB", insert: "N"},
        {pair: "BC", insert: "B"},
        {pair: "CC", insert: "N"},
        {pair: "CN", insert: "C"},
      ]);

      assert.strictEqual(polymerTemplate, "NBCCNBBBCBHCB");
    });

    it("should return updated polymer template given NBCCNBBBCBHCB", function() {
      const polymerTemplate = module.performInsertion("NBCCNBBBCBHCB", [
        {pair: "CH", insert: "B"},
        {pair: "HH", insert: "N"},
        {pair: "CB", insert: "H"},
        {pair: "NH", insert: "C"},
        {pair: "HB", insert: "C"},
        {pair: "HC", insert: "B"},
        {pair: "HN", insert: "C"},
        {pair: "NN", insert: "C"},
        {pair: "BH", insert: "H"},
        {pair: "NC", insert: "B"},
        {pair: "NB", insert: "B"},
        {pair: "BN", insert: "B"},
        {pair: "BB", insert: "N"},
        {pair: "BC", insert: "B"},
        {pair: "CC", insert: "N"},
        {pair: "CN", insert: "C"},
      ]);

      assert.strictEqual(polymerTemplate, "NBBBCNCCNBBNBNBBCHBHHBCHB");
    });

    it("should return updated polymer template given NBBBCNCCNBBNBNBBCHBHHBCHB", function() {
      const polymerTemplate = module.performInsertion("NBBBCNCCNBBNBNBBCHBHHBCHB", [
        {pair: "CH", insert: "B"},
        {pair: "HH", insert: "N"},
        {pair: "CB", insert: "H"},
        {pair: "NH", insert: "C"},
        {pair: "HB", insert: "C"},
        {pair: "HC", insert: "B"},
        {pair: "HN", insert: "C"},
        {pair: "NN", insert: "C"},
        {pair: "BH", insert: "H"},
        {pair: "NC", insert: "B"},
        {pair: "NB", insert: "B"},
        {pair: "BN", insert: "B"},
        {pair: "BB", insert: "N"},
        {pair: "BC", insert: "B"},
        {pair: "CC", insert: "N"},
        {pair: "CN", insert: "C"},
      ]);

      assert.strictEqual(polymerTemplate, "NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB");
    });
  });
});
