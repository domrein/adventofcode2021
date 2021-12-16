import utils from "../utils.js";

/*
I think I can do the scan one by one, just need to mark the inserts somehow.
  Maybe inserts are lower case, then we capitalize it all at the end of the step
*/

export default {
  async run() {
    const contents = await utils.readFile("day14", "data.txt");
    const difference = this.processData(contents);

    console.log(`Difference between most and least common element count: ${difference}`);
  },

  processData(lines) {
    let polymerTemplate = "";
    const insertionRules = [];
    lines.forEach(l => {
      if (/\s*->\s*/.test(l)) {
        const [pair, insert] = l.split(/\s*->\s*/);
        const rule = {pair, insert};
        if (!/[A-Z]{2}/.test(pair)) {
          console.error(`Invalid pair: ${pair}`);
          throw new Error("Invalid Pair");
        }
        if (!/[A-Z]/.test(insert)) {
          console.error(`Invalid insert: ${insert}`);
          throw new Error("Invalid Insert");
        }
        insertionRules.push(rule);
      }
      else {
        if (polymerTemplate) {
          console.error(`Encountered more than one polymer template: ${l}`);
          throw new Error("Invalid Data");
        }
        polymerTemplate = l;
      }
    });

    const numSteps = 10;
    for (let i = 0; i < numSteps; i++) {
      polymerTemplate = this.performInsertion(polymerTemplate, insertionRules);
    }

    const counts = {};
    [...polymerTemplate].forEach(e => counts[e] ? counts[e]++ : counts[e] = 1);
    const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    return sortedCounts[0][1] - sortedCounts[sortedCounts.length - 1][1];
  },

  performInsertion(polymerTemplate, insertionRules) {
    insertionRules.forEach(r => {
      while (polymerTemplate.includes(r.pair)) {
        polymerTemplate = polymerTemplate.replace(
          r.pair,
          `${r.pair.charAt(0)}${r.insert.toLowerCase()}${r.pair.charAt(1)}`,
        );
      }
    });

    return polymerTemplate.toUpperCase();
  }
};
