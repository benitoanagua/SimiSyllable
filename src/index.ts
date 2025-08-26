import { countEn } from "./en/index.js";
import { countEs } from "./es/index.js";

export { countEn, countEs };

export function count(word: string, lang: "en" | "es" = "en"): number {
  return lang === "es" ? countEs(word) : countEn(word);
}
