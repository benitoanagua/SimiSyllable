import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function loadEsDict(): Record<string, number> {
  try {
    const dictPath = join(__dirname, "../../data/es-dict-expanded.json");
    return JSON.parse(readFileSync(dictPath, "utf-8"));
  } catch {
    return {};
  }
}

export const esDict = loadEsDict();
