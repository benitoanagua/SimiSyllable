import { estimateSyllables, divideSyllables } from "./syllableEstimator.js";
import {
  normalizeSpanishWord,
  isEmpty,
  addMissingAccents,
} from "./normalizer.js";

/**
 * Cuenta las sílabas de una palabra en español
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
    return estimateSyllables(processedWord);
  } catch (error) {
    console.warn(`Error procesando palabra "${word}":`, error);
    return fallbackEstimate(processedWord);
  }
}

/**
 * Divide una palabra española en sílabas
 * @param word - Palabra a dividir
 * @param autoAccent - Si debe intentar añadir acentos automáticamente (experimental)
 */
export function syllabifyEs(
  word: string,
  autoAccent: boolean = false
): string[] {
  let processedWord = normalizeSpanishWord(word);

  if (isEmpty(processedWord)) {
    return [];
  }

  // Experimental: añadir acentos automáticamente
  if (autoAccent) {
    processedWord = addMissingAccents(processedWord);
  }

  try {
    return divideSyllables(processedWord);
  } catch (error) {
    console.warn(`Error dividiendo palabra "${word}":`, error);
    return [processedWord];
  }
}

/**
 * Estimación de fallback simple
 */
function fallbackEstimate(word: string): number {
  const vowels = "aeiouáéíóúü";
  let count = 0;
  let prevCharIsVowel = false;

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const isVowel = vowels.includes(char);

    if (isVowel && !prevCharIsVowel) {
      count++;
    }

    prevCharIsVowel = isVowel;
  }

  return Math.max(1, count);
}
