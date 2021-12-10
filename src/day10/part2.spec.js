import assert from "node:assert";

import module from "./part2.js";

describe("Day 10 Part 1 module", function() {
  describe("#processData", function () {
    it("should return completion score given raw data", function() {
      const completionScore = module.processData([
        "[({(<(())[]>[[{[]{<()<>>",
        "[(()[<>])]({[<{<<[]>>(",
        "{([(<{}[<>[]}>{[]{[(<()>",
        "(((({<>}<{<{<>}{[]{[]{}",
        "[[<[([]))<([[{}[[()]]]",
        "[{[{({}]{}}([{[{{{}}([]",
        "{<[[]]>}<{[{[{[]{()[[[]",
        "[<(<(<(<{}))><([]([]()",
        "<{([([[(<>()){}]>(<<{{",
        "<{([{{}}[<[[[<>{}]]]>[]]",
      ]);

      assert.strictEqual(completionScore, 288957);
    });
  });
});
