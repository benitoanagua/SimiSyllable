import countEn from "./en.js";
import countEs from "./es.js";

export { countEn, countEs };

export function count(word: string, lang: "en" | "es" = "en"): number {
  return lang === "es" ? countEs(word) : countEn(word);
}
