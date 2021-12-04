import utils from "../utils.js";

export default {
  async run() {
    const binary = await utils.readFile("day3", "data.txt");

    const gammaRate = this.calcRate(binary, "gamma");
    const epsilonRate = this.calcRate(binary, "epsilon");
    const powerConsumption = this.calcPowerConsumption(gammaRate, epsilonRate);

    console.log(powerConsumption);
  },

  calcRate(binary, rateType) {
    if (!["gamma", "epsilon"].includes(rateType)) {
      console.error(`Invalid rateType: ${rateType}`);
      process.exit(1);
    }

    const oneCounts = [];
    binary.forEach(b => {
      [...b].forEach((d, i) => {
        if (!["0", "1"].includes(d)) {
          console.error(`Invalid digit: ${d}`);
          process.exit(1);
        }

        while(oneCounts.length - 1 < i) {
          oneCounts.push(0);
        }

        d === "1" && oneCounts[i]++;
      });
    });

    let rate = "";
    oneCounts.forEach(c => {
      if (c >= binary.length / 2) {
        rate += rateType === "gamma" ? "1" : "0";
      }
      else {
        rate += rateType === "gamma" ? "0" : "1";
      }
    });

    return parseInt(rate, 2);
  },

  calcPowerConsumption(gammaRate, epsilonRate) {
    return gammaRate * epsilonRate;
  }
};
