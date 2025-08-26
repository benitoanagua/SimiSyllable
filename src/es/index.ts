import { countSyllablesInWord } from "./syllableCounter.js";
import { esDict } from "./dict.js";
import { problematic } from "./problematic.js";

export function countEs(
  word: string,
  useDict: boolean = false, // << false por defecto
  useProblematic: boolean = false // << false por defecto
): number {
  const normalized = word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");

  if (!normalized) return 0;

  // 1. Lista problemática (solo si se pide)
  if (useProblematic && problematic[normalized] !== undefined) {
    return problematic[normalized];
  }

  // 2. Diccionario (solo si se pide)
  if (useDict && esDict[normalized] !== undefined) {
    return esDict[normalized];
  }

  // 3. Algoritmo jsESsyllable (siempre disponible)
  return countSyllablesInWord(word);
}
