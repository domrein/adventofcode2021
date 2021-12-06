import utils from "../utils.js";

export default {
  async run() {
    const contents = await utils.readFile("day6", "data.txt");
    const numDays = 80;
    const fishCount = this.processData(contents, 256);

    console.log(`Lantern Fish Count after ${numDays}: ${fishCount}`);
  },

  processData(lines, numDays) {
    const fishAges = lines[0].split(/,/).map(d => Number.parseInt(d));
    if (fishAges.some(a => Number.isNaN(a))) {
      console.error(`Invalid age in list: ${fishAges}`);
      process.exit(1);
    }

    let fish = {
      0: 0n,
      1: 0n,
      2: 0n,
      3: 0n,
      4: 0n,
      5: 0n,
      6: 0n,
      7: 0n,
      8: 0n,
    };
    fishAges.forEach(a => fish[a]++);

    // run day
    while (numDays) {
      let newFish = {
        0: 0n,
        1: 0n,
        2: 0n,
        3: 0n,
        4: 0n,
        5: 0n,
        6: 0n,
        7: 0n,
        8: 0n,
      };

      let babbyCount = 0n;
      Object.entries(fish).forEach(([age, count]) => {
        age = BigInt(age);
        if (age === 0n) {
          newFish[6] += count;
          babbyCount += count;
        }
        else {
          newFish[age - 1n] += count;
        }
      });

      newFish[8] = babbyCount;

      fish = newFish;
      numDays--;
    }


    let count = BigInt(0);
    Object.values(fish).forEach(c => count += c);
    return count;
  },
};
