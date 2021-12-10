import assert from "node:assert";

import module from "./part1.js";

describe("Day 10 Part 1 module", function() {
  describe("#processData", function () {
    it("should return syntax error score given raw data", function() {
      const errorScore = module.processData([
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

      assert.strictEqual(errorScore, 26397);
    });
  });
});
