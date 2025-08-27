import { divideIntoSyllables } from "./syllableDivider.js";
import {
  normalizeSpanishWord,
  isEmpty,
  addMissingAccents,
} from "./normalizer.js";

/**
 * Cuenta las sílabas de una palabra en español
 *
 * @param word - Palabra a analizar
 * @param autoAccent - Si debe intentar añadir acentos automáticamente (experimental)
 */
export function countEs(word: string, autoAccent: boolean = false): number {
  let processedWord = normalizeSpanishWord(word);

  if (isEmpty(processedWord)) {
    return 0;
  }

  // Experimental: añadir acentos automáticamente
  if (autoAccent) {
    processedWord = addMissingAccents(processedWord);
  }

  try {
    const syllables = divideIntoSyllables(processedWord);
    return syllables.length;
  } catch (error) {
    console.warn(`Error processing word "${word}":`, error);
    return 1; // Fallback seguro
  }
}

/**
 * Divide una palabra española en sílabas y las devuelve como array
 */
export function syllabifyEs(
  word: string,
  autoAccent: boolean = false
): string[] {
  let processedWord = normalizeSpanishWord(word);

  if (isEmpty(processedWord)) {
    return [];
  }

  if (autoAccent) {
    processedWord = addMissingAccents(processedWord);
  }

  try {
    return divideIntoSyllables(processedWord);
  } catch (error) {
    console.warn(`Error processing word "${word}":`, error);
    return [processedWord]; // Fallback seguro
  }
}
