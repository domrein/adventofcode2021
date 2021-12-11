import utils from "../utils.js";
import Grid from "../Grid.js";

export default {
  async run() {
    const contents = await utils.readFile("day11", "data.txt");
    const flashStep = this.processData(contents);

    console.log(`First Synchronized Flash Step: ${flashStep}`);
  },

  processData(lines) {
    if (!lines.length) {
      console.error("No lines to process");
      process.exit(1);
    }

    const gridWidth = lines[0].length;
    const gridHeight = lines.length;
    const gridValues = [];
    lines.forEach(l => {
      if (l.length !== gridWidth) {
        console.error(`Invalid line width: ${l}`);
        process.exit(1);
      }

      gridValues.push(...[...l].map(o => Number.parseInt(o)));
    });
    if (gridValues.some(o => Number.isNaN(o))) {
      console.error(`Invalid octopus value: ${o}`);
      process.exit(1);
    }
    const octopi = new Grid(gridWidth, gridHeight, gridValues);

    let flashCount = 0;
    let stepCount = 0;
    while (flashCount !== 100) {
      flashCount = this.step(octopi);
      stepCount++;
    }

    return stepCount;
  },

  /**
   * @param {Grid} octopi
   */
  step(octopi) {
    octopi.values = octopi.values.map(v => ++v);

    const flashedOctopi = new Set();
    let flashCount = 0;

    let flashes = octopi.findAll((v, i) => v >= 10 && !flashedOctopi.has(i));

    const updateFlashes = () => flashes = octopi.findAll((v, i) => v >= 10 && !flashedOctopi.has(i));
    updateFlashes();

    while (flashes.length) {
      // update all adjacents for each flash
      flashes.forEach(f => {
        const adjacents = octopi.findAdjacents(f.index, true);
        adjacents.forEach(a => octopi.values[a.index]++);
        flashedOctopi.add(f.index);
      });

      flashCount += flashes.length;
      updateFlashes();
    }

    // reset octopus counters
    octopi.findAll(v => v >= 10).forEach(v => octopi.values[v.index] = 0);

    return flashCount;
  },
};
