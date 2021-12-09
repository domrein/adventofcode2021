import assert from "node:assert";

import module from "./part2.js";

describe("Day 8 Part 2 module", function() {
  describe("#processData", function () {
    it("should return count of unique digits given raw data", function() {
      const sum = module.processData([
        "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
        "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
        "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
        "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
        "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
        "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
        "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
        "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
        "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
        "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
      ]);

      assert.strictEqual(sum, 61229);
    });
  });

  describe("#processLine", function() {
    it("should find number patterns and return translated output given a raw lines of data 1", function() {
      const lines = [
        {
          text: "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
          output: 8394,
        },
        {
          text: "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
          output: 9781,
        },
        {
          text: "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
          output: 1197,
        },
        {
          text: "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
          output: 9361,
        },
        {
          text: "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
          output: 4873,
        },
        {
          text: "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
          output: 8418,
        },
        {
          text: "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
          output: 4548,
        },
        {
          text: "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
          output: 1625,
        },
        {
          text: "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
          output: 8717,
        },
        {
          text: "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
          output: 4315,
        },
      ];

      for (let line of lines) {
        const output = module.processLine(line.text);
        assert.strictEqual(output, line.output);
      }
    });
  });

  describe("#findNumberPatterns", function() {
    it("should return a map of numbers to character patterns given 10 patterns", function() {
      const patterns = module.findNumberPatterns("acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab");

      assert.deepStrictEqual(patterns, {
        0: "cagedb",
        1: "ab",
        2: "gcdfa",
        3: "fbcad",
        4: "eafb",
        5: "cdfbe",
        6: "cdfgeb",
        7: "dab",
        8: "acedgfb",
        9: "cefabd",
      });
    });
  });
});
