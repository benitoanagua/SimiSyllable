import { countEn } from "./en/index.js";
import { countEs } from "./es/index.js";

export { countEn, countEs };

export function count(word: string, lang: "en" | "es" = "en"): number {
  const useDict = process.env.USE_DICT !== "false";
  return lang === "es" ? countEs(word, useDict) : countEn(word, useDict);
}
