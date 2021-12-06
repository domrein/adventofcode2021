import utils from "../utils.js";

export default {
  async run() {
    const contents = await utils.readFile("day6", "data.txt");
    const numDays = 80;
    const fishCount = this.processData(contents, 80);

    console.log(`Lantern Fish Count after ${numDays}: ${fishCount}`);
  },

  processData(lines, numDays) {
    const fish = lines[0].split(/,/).map(d => Number.parseInt(d));
    if (fish.some(a => Number.isNaN(a))) {
      console.error(`Invalid age in list: ${fish}`);
      process.exit(1);
    }

    // run day
    while (numDays) {
      let babbyCount = 0;
      fish.forEach((f, i) => {
        if (f === 0) {
          fish[i] = 6;
          babbyCount++;
        }
        else {
          fish[i]--;
        }
      });

      for (let i = 0; i < babbyCount; i++) {
        fish.push(8);
      }

      numDays--;
    }

    return fish.length;
  },
};
