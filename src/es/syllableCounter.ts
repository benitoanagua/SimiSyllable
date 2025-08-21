import { problematic } from "./problematic.js";
import {
  SPANISH_EXCEPTIONS,
  INDIVISIBLE_ONSETS,
  INDIVISIBLE_CODAS,
} from "./patterns.js";

export function countSyllablesInWord(word: string): number {
  let processedWord = word.toLowerCase();

  // Verificar palabras problemáticas primero
  const normalizedForProblematic = processedWord
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");

  if (problematic[normalizedForProblematic]) {
    return problematic[normalizedForProblematic];
  }

  // Aplicar excepciones del español
  processedWord = applySpanishExceptions(processedWord);

  // Contar núcleos vocálicos (aproximación mejorada)
  return countVocalicNuclei(processedWord);
}

function applySpanishExceptions(word: string): string {
  let result = word;
  for (const [pattern, replacement] of SPANISH_EXCEPTIONS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function countVocalicNuclei(word: string): number {
  const vowels = /[aeiouáéíóúü]/gi;
  const strongVowels = /[aeoáéó]/gi;
  const weakVowels = /[iuíúü]/gi;

  let syllableCount = 0;
  let i = 0;

  while (i < word.length) {
    if (vowels.test(word[i])) {
      syllableCount++;
      let vocalGroup = word[i];
      i++;

      // Recoger grupo vocálico completo
      while (i < word.length && vowels.test(word[i])) {
        vocalGroup += word[i];
        i++;
      }

      // Ajustar para diptongos y triptongos
      syllableCount += countAdditionalSyllablesInGroup(vocalGroup) - 1;
    } else {
      i++;
    }
  }

  return Math.max(1, syllableCount);
}

function countAdditionalSyllablesInGroup(group: string): number {
  if (group.length <= 1) return 1;

  const strongVowels = /[aeoáéó]/gi;
  const weakVowels = /[iuíúü]/gi;

  let strongCount = (group.match(strongVowels) || []).length;
  let weakCount = (group.match(weakVowels) || []).length;

  // Reglas simplificadas:
  // - Una vocal fuerte = 1 sílaba
  // - Dos vocales fuertes = 2 sílabas (hiato)
  // - Vocal fuerte + débil = 1 sílaba (diptongo)
  // - Dos débiles = 1 sílaba (diptongo)
  // - Tres vocales con una fuerte en medio = 1 sílaba (triptongo)

  if (strongCount >= 2) {
    return strongCount; // Hiatos múltiples
  } else if (strongCount === 1) {
    return 1; // Diptongo o triptongo
  } else if (weakCount >= 2) {
    return 1; // Diptongo de débiles
  }

  return 1;
}
