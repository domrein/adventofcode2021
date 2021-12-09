import utils from "../utils.js";

export default {
  async run() {
    const contents = await utils.readFile("day8", "data.txt");
    const count = this.processData(contents);

    console.log(`Unique digit count: ${count}`);
  },

  processData(lines, numDays) {
    const outputs = lines.map(l => this.processLine(l));

    return utils.sum(outputs);
  },

  processLine(line) {
    // split line
    let [patterns, output] = line.split(/\s*\|\s*/);

    // find patterns
    const numberPatterns = this.findNumberPatterns(patterns);
    // sort patterns
    Object.keys(numberPatterns).forEach(k => {
      numberPatterns[k] = [...numberPatterns[k]].sort().join("");
    })
    output = output.trim().split(/\s+/).map(o => [...o].sort().join(""));

    // translate output into number
    const outputCount = output.map(o => {
      const [key] = Object.entries(numberPatterns).find(([k, v]) => {
        return o === v;
      });
      return key;
    });

    return Number.parseInt(outputCount.join(""));
  },

  findNumberPatterns(patterns) {
    patterns = patterns.trim().split(/\s+/);

    const numberPatterns = {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: "",
    }

    // identify 1 by 2 digit count
    numberPatterns[1] = patterns.find(p => p.length === 2);

    // identify 4 by 4 digit count
    numberPatterns[4] = patterns.find(p => p.length === 4);

    // identify 7 by 3 digit count
    numberPatterns[7] = patterns.find(p => p.length === 3);

    // identify 8 by 7 digit count
    numberPatterns[8] = patterns.find(p => p.length === 7);

    // identify 0 by 6 digit count, contains "1", does not contain "4"
    numberPatterns[0] = patterns.find(p => {
      return p.length === 6
        && [...numberPatterns[1]].every(c => p.includes(c))
        && ![...numberPatterns[4]].every(c => p.includes(c));
    });

    // identify 3 by 5 digit count, contains "1"
    numberPatterns[3] = patterns.find(p => {
      return p.length === 5
        && [...numberPatterns[1]].every(c => p.includes(c));
    });

    // identify 6 by 6 digit count, does not contain "1" or "4"
    numberPatterns[6] = patterns.find(p => {
      return p.length === 6
        && ![...numberPatterns[1]].every(c => p.includes(c))
        && ![...numberPatterns[4]].every(c => p.includes(c));
    });

    // identify 9 by 6 digit count, contains "4" and "1"
    numberPatterns[9] = patterns.find(p => {
      return p.length === 6
        && [...numberPatterns[1]].every(c => p.includes(c))
        && [...numberPatterns[4]].every(c => p.includes(c));
    });

    // identify 2 by 5 digit count, contains all but one letter of 6, does not contain "1"
    numberPatterns[2] = patterns.find(p => {
      return p.length === 5
        && ![...numberPatterns[1]].every(c => p.includes(c))
        && [...numberPatterns[6]].filter(c => p.includes(c)).length === 4;
    });

    // identify 5 by 5 digit count, contains all but one letter of 6, does not contain "1"
    numberPatterns[5] = patterns.find(p => {
      return p.length === 5
        && ![...numberPatterns[1]].every(c => p.includes(c))
        && [...numberPatterns[6]].filter(c => p.includes(c)).length === 5;
    });

    return numberPatterns;
  },
};
