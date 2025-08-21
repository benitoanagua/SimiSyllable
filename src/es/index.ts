import { esDict } from "./dict.js";
import { countSyllablesInWord } from "./syllableCounter.js";
import { problematic } from "./problematic.js";

export function countEs(word: string, useDict: boolean = true): number {
  const normalizedWord = word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");

  if (!normalizedWord) return 0;

  // 1. Primero verificar palabras problemáticas (mayor prioridad)
  if (problematic[normalizedWord]) {
    return problematic[normalizedWord];
  }

  // 2. Luego usar diccionario español si está disponible y habilitado
  if (useDict && esDict[normalizedWord]) {
    return esDict[normalizedWord];
  }

  // 3. Finalmente usar algoritmo de respaldo
  return countSyllablesInWord(word);
}
