export { countEn } from "./en";
export { countEs } from "./es";

export function count(word: string, lang: "en" | "es" = "en"): number {
  return lang === "es" ? countEs(word) : countEn(word);
}
