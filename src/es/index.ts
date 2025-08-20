import { esDict } from "./dict.js";
import { countSyllablesInWord } from "./syllableCounter.js";

export function countEs(word: string, useDict: boolean = true): number {
  const normalizedWord = word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");

  if (!normalizedWord) return 0;

  // Usar diccionario español si está disponible
  if (useDict && esDict[normalizedWord]) {
    return esDict[normalizedWord];
  }

  return countSyllablesInWord(word);
}
