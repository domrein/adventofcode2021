import utils from "../utils.js";
/*
Looks like a problem we can solve with a stack
Push open characters onto stack
When a close is encountered, pop off of stack and see if it matches
  if not, the line is corrupt
To get the completion string, we can just walk what's still on the stack and add the matching charcter
*/
export default {
  async run() {
    const contents = await utils.readFile("day10", "data.txt");
    const completionScore = this.processData(contents);

    console.log(`Completion Score: ${completionScore}`);
  },

  processData(lines) {
    if (!lines.length) {
      console.error("No lines to process");
      process.exit(1);
    }

    const completionScores = [];
    lines.forEach(l => {
      if (/[^\(\){}\[\]<>]/.test(l)) {
        console.error(`Invalid characters in line: ${l}`);
        process.exit(1);
      }
      const stack = [];

      let isCorrupt = false;
      const characters = [...l];
      for (let c of characters) {
        if (["(", "[", "{", "<"].includes(c)) {
          stack.push(c);
        }
        else {
          const matchingCharacter = stack.pop();
          if (!["()", "[]", "{}", "<>"].includes(matchingCharacter + c)) {
            isCorrupt = true;
            break;
          }
        }
      }

      // we can generate a completion if the line isn't corrupt and we have some left on the stack
      if (!isCorrupt && stack.length) {
        let completionString = "";
        while (stack.length) {
          const c = stack.pop();
          completionString += {
            "(": ")",
            "[": "]",
            "{": "}",
            "<": ">",
          }[c];
        }

        // calculate completion score
        let completionScore = [...completionString].reduce((a, c) => {
          a *= 5;
          a += {
            ")": 1,
            "]": 2,
            "}": 3,
            ">": 4,
          }[c];

          return a;
        }, 0);

        completionScores.push(completionScore);
      }
    });

    completionScores.sort((a, b) => b - a);
    const completionScore = completionScores[~~(completionScores.length / 2)];

    return completionScore;
  },
};
