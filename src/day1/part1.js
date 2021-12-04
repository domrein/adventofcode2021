import utils from "../utils.js";

export default {
  async run() {
    const depths = await utils.readFile("day1", "data.txt");

    const increases = this.calcIncreases(depths);

    console.log(increases);
  },

  calcIncreases(depths) {
    let lastDepth = null;
    let increases = 0;

    depths.forEach(line => {
      let curDepth = Number.parseInt(line);

      lastDepth !== null && curDepth > lastDepth && increases++;

      lastDepth = curDepth;
    });

    return increases;
  },
};
