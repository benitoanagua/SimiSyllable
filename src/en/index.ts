import { estimateSyllables, divideSyllables } from "./syllableEstimator.js";
import { normalizeEnglishWord, isEmpty } from "./normalizer.js";

/**
 * Cuenta las sílabas de una palabra en inglés usando aproximación fonética
 */
export function countEn(word: string): number {
  const processedWord = normalizeEnglishWord(word);

  if (isEmpty(processedWord)) {
    return 0;
  }

  try {
    return estimateSyllables(processedWord);
  } catch (error) {
    console.warn(`Error processing word "${word}":`, error);
    return fallbackEstimate(processedWord);
  }
}

/**
 * Divide una palabra inglesa en sílabas
 */
export function syllabifyEn(word: string): string[] {
  const processedWord = normalizeEnglishWord(word);

  if (isEmpty(processedWord)) {
    return [];
  }

  try {
    return divideSyllables(processedWord);
  } catch (error) {
    console.warn(`Error dividing word "${word}":`, error);
    return [processedWord];
  }
}

/**
 * Estimación de fallback simple
 */
function fallbackEstimate(word: string): number {
  // Algoritmo básico de conteo de vocales
  const vowels = "aeiouy";
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
