// import { esDict } from "./dict.js";
import { countSyllablesInWord } from "./syllableCounter.js";
import {
  isProblematicWord,
  getProblematicSyllableCount,
} from "./problematic.js";
import { cleanSpanishWordWithAccents, isEmptyWord } from "./utils.js";

/**
 * Cuenta las sílabas de una palabra en español usando múltiples estrategias:
 * 1. Casos problemáticos conocidos (prioridad máxima)
 * 2. Diccionario pre-calculado
 * 3. Algoritmo de división silábica (fallback)
 */
export function countEs(word: string): number {
  // Limpiar palabra manteniendo tildes para casos especiales
  const cleanWord = cleanSpanishWordWithAccents(word);

  if (isEmptyWord(cleanWord)) {
    return 0;
  }

  // 1. Verificar casos problemáticos conocidos (máxima prioridad)
  if (isProblematicWord(cleanWord)) {
    const problematicCount = getProblematicSyllableCount(cleanWord);
    if (problematicCount !== null) {
      return problematicCount;
    }
  }

  // 2. Consultar diccionario pre-calculado
  // if (esDict[cleanWord]) {
  //   return esDict[cleanWord];
  // }

  // 3. Usar algoritmo de división silábica como fallback
  return countSyllablesInWord(cleanWord);
}
