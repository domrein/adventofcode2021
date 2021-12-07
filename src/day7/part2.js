import utils from "../utils.js";

export default {
  async run() {
    const contents = await utils.readFile("day7", "data.txt");
    const {fuelCost} = this.processData(contents);

    console.log(`Fuel cost: ${fuelCost}`);
  },

  processData(lines, numDays) {
    const crabSubs = lines[0].split(/,/).map(d => Number.parseInt(d));
    if (crabSubs.some(a => Number.isNaN(a))) {
      console.error(`Invalid horizontal position list for crab subs: ${crabSubs}`);
      process.exit(1);
    }

    // putting half on top, half on bottom should give us cheapest relocation position?
    // could iterate through each position and see cost of locating other positions to it
    const min = utils.min(crabSubs)
    const max = utils.max(crabSubs);
    const locations = Array(max + 1).fill(0);
    crabSubs.forEach(c => locations[c]++);

    let minFuelCost = Number.MAX_SAFE_INTEGER;
    let position = 0;
    for (let i = 0; i < locations.length; i++) {
      let fuelCost = 0;

      for (let j = 0; j < locations.length; j++) {
        const distance = Math.abs(i - j);
        for (let k = 0; k <= distance; k++) {
          fuelCost += locations[j] * k;
        }
      }

      if (fuelCost < minFuelCost) {
        minFuelCost = fuelCost;
        position = i;
      }
    }

    return {fuelCost: minFuelCost, position};
  },
};
