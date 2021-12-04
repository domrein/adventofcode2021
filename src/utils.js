import fs from "node:fs/promises";
import path from "node:path";

export default {
  async readFile(...filePath) {
    const file = await fs.open(path.join(process.cwd(), "src", ...filePath));
    const contents = (await file.readFile()).toString();
    await file.close();

    return contents.split(/\n/).filter(l => l.trim() !== "");
  },

  sum(arr) {
    return arr.reduce((p, c) => p + c, 0);
  },
}
