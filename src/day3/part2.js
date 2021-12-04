import utils from "../utils.js";

export default {
  async run() {
    const binary = await utils.readFile("day3", "data.txt");

    const oxygenRating = this.calcComponentRating(binary, "oxygen");
    const scrubberRating = this.calcComponentRating(binary, "CO2");
    const lifeSupportRating = this.calcLifeSupportRating(oxygenRating, scrubberRating);

    console.log(`Life Support Rating: ${lifeSupportRating}`);
  },

  filterByCommonBit(binary, common, digit) {
    if (!["most", "least"].includes(common)) {
      console.error(`Invalid value for common: ${common}`);
    }

    let oneCount = 0;
    binary.forEach(b => {
      if (b.length - 1 < digit) {
        console.error(`Invalid binary value and digit: ${b}, ${digit}`);
        process.exit(1);
      }

      const d = b[digit];
      if (!["0", "1"].includes(d)) {
        console.error(`Invalid digit: ${d}`);
        process.exit(1);
      }

      d === "1" && oneCount++;
    });

    const commonValue = oneCount >= binary.length / 2 ? "1" : "0";
    const leastCommonValue = commonValue === "1" ? "0" : "1";

    const filterValue = common === "most" ? commonValue : leastCommonValue;

    return binary.filter(b => b[digit] === filterValue);
  },

  calcComponentRating(binary, componentType) {
    if (!["oxygen", "CO2"].includes(componentType)) {
      console.error(`Invalid component componentType: ${componentType}`);
    }
    let digit = 0;

    // Add a hard limit of 100 digits to iterate over to prevent infinite loop
    while (binary.length > 1 && digit < 100) {
      binary = this.filterByCommonBit(binary, componentType === "oxygen" ? "most" : "least", digit);
      digit++;
    }

    if (!binary.length) {
      console.error(`Invalid binary length: ${binary.length}`);
      process.exit(1);
    }

    return Number.parseInt(binary[0], 2);
  },

  calcLifeSupportRating(oxygenRating, scrubberRating) {
    return oxygenRating * scrubberRating;
  },
};
