import { divideIntoSyllablesEn } from "./syllableDivider.js";
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
    const syllables = divideIntoSyllablesEn(processedWord);
    return syllables.length;
  } catch (error) {
    console.warn(`Error processing word "${word}":`, error);
    return estimateSyllables(processedWord); // Fallback heurístico
  }
}

/**
 * Divide una palabra inglesa en sílabas usando aproximación fonética
 */
export function syllabifyEn(word: string): string[] {
  const processedWord = normalizeEnglishWord(word);

  if (isEmpty(processedWord)) {
    return [];
  }

  try {
    return divideIntoSyllablesEn(processedWord);
  } catch (error) {
    console.warn(`Error processing word "${word}":`, error);
    return [processedWord]; // Fallback seguro
  }
}

/**
 * Estimación heurística de sílabas basada en patrones vocálicos
 */
function estimateSyllables(word: string): number {
  // Algoritmo simplificado similar a la librería "syllable"
  let count = 0;
  const vowels = "aeiouy";
  let prevCharIsVowel = false;

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const isVowel = vowels.includes(char);

    if (isVowel && !prevCharIsVowel) {
      count++;
    }

    prevCharIsVowel = isVowel;
  }

  // Ajustes para casos especiales
  if (word.endsWith("e") && count > 1) count--; // silent e
  if (word.endsWith("le") && !vowels.includes(word[word.length - 3])) count++; // consonant+le
  if (word.includes("ia")) count++; // ia usually adds a syllable

  return Math.max(1, count);
}
