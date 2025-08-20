import { cmuDict } from "./dict.js";
import { countSyllablesInWord } from "./syllableCounter.js";

export function countEn(word: string, useDict: boolean = true): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;

  // Usar diccionario CMU si está disponible
  if (useDict && cmuDict[w]) {
    return cmuDict[w];
  }

  return countSyllablesInWord(w);
}
