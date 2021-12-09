import utils from "../utils.js";

export default {
  async run() {
    const contents = await utils.readFile("day8", "data.txt");
    const count = this.processData(contents);

    console.log(`Unique digit count: ${count}`);
  },

  processData(lines, numDays) {
    const outputs = [];
    lines.forEach(l => {
      if (!l.includes("|")) {
        console.error(`Invalid line format: ${l}`);
        process.exit(1);
      }
      outputs.push(...l.split("|")[1].trim().split(/\s+/));
    });

    const digitCounts = [
      6, // 0
      2, // 1_
      5, // 2
      5, // 3
      4, // 4_
      5, // 5
      6, // 6
      3, // 7_
      7, // 8_
    ];

    const count = outputs.reduce((a, c) => {
      switch (c.length) {
        case 2:
        case 4:
        case 3:
        case 7:
          return a + 1;
      }

      return a;
    }, 0);

    return count;
  },
};
