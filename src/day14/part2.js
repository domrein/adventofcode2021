import utils from "../utils.js";

/*
  don't think about characters, think about pairs, we know what pairs produce
  number of pairs is constant
  n = (n - 1) * 2 - 1
  if I have these pairs, they will become these pairs
    so I can turn them into counters at this point?

    NNCB - 4 characters, 3 pairs, produces 6 pairs
    NN -> NC, CN
    NC -> NB, BC
    CB -> CH, HB
    NCNBCHB - 7 characters, 6 pairs, produces 12 pairs
    NC -> NB, BC
    CN -> CC, CN
    NB -> NB, BB
    BC -> BB, BC
    CH -> CB, BH
    HB -> HC, CB
    NBCCNBBBCBHCB - 13 characters, 12 pairs, produces 24 pairs

    character counts are / 2, if there's an odd number, round up because it's beginning/end character
*/

export default {
  async run() {
    const contents = await utils.readFile("day14", "data.txt");
    const difference = this.processData(contents);

    console.log(`Difference between most and least common element count: ${difference}`);
  },

  processData(lines) {
    let polymerTemplate = "";
    const insertionRules = {};
    lines.forEach(l => {
      if (/\s*->\s*/.test(l)) {
        const [pair, insert] = l.split(/\s*->\s*/);
        if (!/[A-Z]{2}/.test(pair)) {
          console.error(`Invalid pair: ${pair}`);
          throw new Error("Invalid Pair");
        }
        if (!/[A-Z]/.test(insert)) {
          console.error(`Invalid insert: ${insert}`);
          throw new Error("Invalid Insert");
        }
        const rule = this.buildRule(pair, insert);
        if (insertionRules[rule.pair]) {
          throw new Error(`Duplicate insertion rule: ${rule.pair}`);
        }
        insertionRules[rule.pair] = rule.result;
      }
      else {
        if (polymerTemplate) {
          console.error(`Encountered more than one polymer template: ${l}`);
          throw new Error("Invalid Data");
        }
        polymerTemplate = l;
      }
    });

    let elementPairs = this.buildElementPairs(polymerTemplate);

    const numSteps = 40;
    for (let i = 0; i < numSteps; i++) {
      elementPairs = this.performInsertions(elementPairs, insertionRules);
    }
    const elementCounts = this.calcElementCounts(elementPairs);
    return this.calcCountDifference(elementCounts);
  },

  buildElementPairs(polymerTemplate) {
    const pairs = {};
    polymerTemplate = [...polymerTemplate];
    for (let i = 0; i < polymerTemplate.length - 1; i ++) {
      const pair = polymerTemplate[i] + polymerTemplate[i + 1];
      pairs[pair] ? pairs[pair]++ : pairs[pair] = 1n;
    }

    return pairs;
  },

  buildRule(pair, result) {
    const rule = {
      pair,
      result: [pair[0] + result, result + pair[1]],
    };

    return rule;
  },

  performInsertions(elementPairs, insertionRules) {
    const updatedPairs = {};

    Object.entries(elementPairs).forEach(([key, val]) => {
      insertionRules[key].forEach(pair => {
        if (!updatedPairs[pair]) {
          updatedPairs[pair] = 0n;
        }
        updatedPairs[pair] += val;
      });
    });

    return updatedPairs;
  },

  calcElementCounts(elementPairs) {
    const counts = {};
    Object.entries(elementPairs).forEach(([key, val]) => {
      [...key].forEach(c => counts[c] ? counts[c] += val : counts[c] = val);
    });
    Object.entries(counts).forEach(([key, val]) => {
      counts[key] = val / 2n;
      // round up for beginning and end character
      if (val % 2n) {
        counts[key]++;
      }
    });

    return counts;
  },

  calcCountDifference(elementCounts) {
    const sortedCounts = Object.entries(elementCounts).sort((a, b) => {
      if (b[1] > a[1]) {
        return 1;
      }
      else if (a[1] > b[1]) {
        return -1;
      }
      return 0;
    });
    if (!sortedCounts.length) {
      throw new Error("Empty element counts");
    }

    return sortedCounts[0][1] - sortedCounts[sortedCounts.length - 1][1];
  },
};
