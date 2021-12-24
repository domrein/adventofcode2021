export default class Grid {
  /**
   * @template <T>
   * @param {number} width
   * @param {number} height
   * @param {Array<T>} values
   */
  constructor(width, height, values) {
    this.width = width;
    this.height = height;
    this.values = values;

    if (this.values.length !== this.width * this.height) {
      throw new Error(`Invalid grid parameters. width: ${this.width}, height: ${this.height}, values.length: ${this.values.length}`);
    }
  }

  /**
   * @param {number} index
   * @returns {number}
   */
  calcX(index) {
    return index % this.width;
  }

  /**
   * @param {number} index
   * @returns {number}
   */
  calcY(index) {
    return Math.floor(index / this.width);
    let foo = this.findAdjacents();
  }

  /**
   * @param {number} index
   * @param {boolean} [includeDiagonal]
   * @returns {Array<{value: <T>, index: number}>}
   */
  findAdjacents(index, includeDiagonal = true) {
    const x = this.calcX(index);
    const y = this.calcY(index);

    const targetIndexes = [];
    // left
    if (x) {
      targetIndexes.push(index - 1);
    }
    // right
    if (x < this.width - 1) {
      targetIndexes.push(index + 1);
    }
    // up
    if (y) {
      targetIndexes.push(index - this.width);
    }
    // down
    if (y < this.height - 1) {
      targetIndexes.push(index + this.width);
    }
    if (includeDiagonal) {
      // upper left
      if (x && y) {
        targetIndexes.push(index - 1 - this.width);
      }
      // upper right
      if (x < this.width - 1 && y) {
        targetIndexes.push(index + 1 - this.width);
      }
      // lower left
      if (x && y < this.height - 1) {
        targetIndexes.push(index - 1 + this.width)
      }
      // lower right
      if (x < this.width - 1 && y < this.height - 1) {
        targetIndexes.push(index + 1 + this.width);
      }
    }

    const adjacents = targetIndexes.map(i => ({value: this.values[i], index: i}));
    return adjacents;
  }

  findByValue(value) {
    const results = [];
    for (let i = 0; i < this.values.length; i++) {
      const v = this.values[i];
      if (v === value) {
        results.push({value: v, index: i});
      }
    }

    return results;
  }

  findByIndex(index) {
    return {value: this.values[index], index};
  }

  findAll(predicate) {
    const results = [];
    for (let i = 0; i < this.values.length; i++) {
      const v = this.values[i];
      if (predicate(v, i)) {
        results.push({value: v, index: i});
      }
    }

    return results;
  }

  getRow(index) {
    const results = [];
    for (let i = 0; i < this.width; i++) {
      const rowIndex = i + index * this.width;
      results.push({value: this.values[rowIndex], index: rowIndex});
    }

    return results;
  }
}
