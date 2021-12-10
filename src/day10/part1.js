import utils from "../utils.js";
/*
Looks like a problem we can solve with a stack
Push open characters onto stack
When a close is encountered, pop off of stack and see if it matches
  if not, the line is corrupt
*/
export default {
  async run() {
    const contents = await utils.readFile("day10", "data.txt");
    const errorScore = this.processData(contents);

    console.log(`Syntax Error Score: ${errorScore}`);
  },

  processData(lines) {
    if (!lines.length) {
      console.error("No lines to process");
      process.exit(1);
    }

    const errors = [];

    lines.forEach(l => {
      if (/[^\(\){}\[\]<>]/.test(l)) {
        console.error(`Invalid characters in line: ${l}`);
        process.exit(1);
      }
      const stack = [];

      const characters = [...l];
      for (let c of characters) {
        if (["(", "[", "{", "<"].includes(c)) {
          stack.push(c);
        }
        else {
          const matchingCharacter = stack.pop();
          if (!["()", "[]", "{}", "<>"].includes(matchingCharacter + c)) {
            errors.push(c);
            break;
          }
        }
      }
    });

    let errorScore = errors.reduce((a, c) => {
      switch (c) {
        case ")":
          return a + 3;
        case "]":
          return a + 57;
        case "}":
          return a + 1197;
        case ">":
          return a + 25137;
      }
    }, 0);

    return errorScore;
  },
};
