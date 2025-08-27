/**
 * Estimador de sílabas para inglés basado en patrones fonéticos
 */

import {
  SYLLABLE_EXCEPTIONS,
  SUFFIX_PATTERNS,
  DIPHTHONGS,
  DIVISION_RULES,
} from "./patterns.js";

/**
 * Estimación principal de sílabas
 */
export function estimateSyllables(word: string): number {
  if (!word || word.length === 0) return 0;

  // Verificar excepciones primero
  if (SYLLABLE_EXCEPTIONS.has(word)) {
    return SYLLABLE_EXCEPTIONS.get(word)!;
  }

  let count = 0;
  const vowels = "aeiouy";

  // 1. Contar grupos vocálicos (enfoque mejorado)
  let inVowelGroup = false;
  let vowelGroup = "";

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const isVowel = vowels.includes(char);

    if (isVowel) {
      vowelGroup += char;
      if (!inVowelGroup) {
        count++;
        inVowelGroup = true;
      }
    } else {
      // Procesar grupo vocálico acumulado
      if (vowelGroup.length > 0) {
        count = adjustForDiphthongs(vowelGroup, count);
        vowelGroup = "";
      }
      inVowelGroup = false;
    }
  }

  // Procesar último grupo vocálico
  if (vowelGroup.length > 0) {
    count = adjustForDiphthongs(vowelGroup, count);
  }

  // 2. Aplicar reglas de sufijos
  count = applySuffixRules(word, count);

  // 3. Reglas especiales
  count = applySpecialRules(word, count);

  return Math.max(1, count);
}

/**
 * Ajustar por diptongos en grupos vocálicos
 */
function adjustForDiphthongs(vowelGroup: string, currentCount: number): number {
  if (vowelGroup.length <= 1) return currentCount;

  for (const diphthong of DIPHTHONGS) {
    if (vowelGroup.includes(diphthong)) {
      return currentCount - (vowelGroup.length - 1);
    }
  }

  return currentCount;
}

/**
 * Aplicar reglas de sufijos
 */
function applySuffixRules(word: string, currentCount: number): number {
  for (const { pattern, adjustment } of SUFFIX_PATTERNS) {
    if (pattern.test(word)) {
      return currentCount + adjustment;
    }
  }
  return currentCount;
}

/**
 * Aplicar reglas especiales
 */
function applySpecialRules(word: string, currentCount: number): number {
  let count = currentCount;

  // Regla de la 'e' silenciosa al final
  if (word.endsWith("e") && count > 1 && word.length > 2) {
    if (word.endsWith("le") && !"aeiouy".includes(word[word.length - 3])) {
      count += 1;
    } else {
      count -= 1;
    }
  }

  return Math.max(1, count);
}

/**
 * División silábica mejorada para inglés
 */
export function divideSyllables(word: string): string[] {
  if (!word || word.length <= 2) {
    return [word];
  }

  // Primero obtener el número estimado de sílabas
  const syllableCount = estimateSyllables(word);

  // Si es monosílabo, devolver completo
  if (syllableCount === 1) {
    return [word];
  }

  // Para palabras con múltiples sílabas, usar división recursiva
  return divideWordRecursively(word, syllableCount);
}

/**
 * División recursiva de palabras
 */
function divideWordRecursively(
  word: string,
  targetSyllables: number
): string[] {
  if (word.length <= 2 || targetSyllables <= 1) {
    return [word];
  }

  // Intentar encontrar el mejor punto de división
  const divisionPoint = findBestDivisionPoint(word);

  if (divisionPoint === -1) {
    return [word];
  }

  const firstPart = word.slice(0, divisionPoint);
  const secondPart = word.slice(divisionPoint);

  // Calcular cuántas sílabas debería tener cada parte
  const firstSyllables = estimateSyllables(firstPart);
  const secondSyllables = estimateSyllables(secondPart);

  // Si la división es razonable, proceder recursivamente
  if (firstSyllables >= 1 && secondSyllables >= 1) {
    const firstDivision = divideWordRecursively(firstPart, firstSyllables);
    const secondDivision = divideWordRecursively(secondPart, secondSyllables);

    return [...firstDivision, ...secondDivision];
  }

  return [word];
}

/**
 * Encuentra el mejor punto de división para una palabra
 */
function findBestDivisionPoint(word: string): number {
  const vowels = "aeiouy";

  // Prioridad 1: Dividir después de vocal antes de consonante+vocal (VC-CV)
  for (let i = 1; i < word.length - 2; i++) {
    if (
      vowels.includes(word[i]) &&
      !vowels.includes(word[i + 1]) &&
      vowels.includes(word[i + 2])
    ) {
      return i + 1;
    }
  }

  // Prioridad 2: Dividir entre consonantes dobles
  for (let i = 1; i < word.length - 1; i++) {
    if (word[i] === word[i + 1] && !vowels.includes(word[i])) {
      return i + 1;
    }
  }

  // Prioridad 3: Dividir antes de sufijos comunes
  const suffixPatterns = [
    /(tion|sion|cian)$/,
    /(ture|sure)$/,
    /(able|ible|ance|ence|ment|ness)$/,
    /(ing|est|ful|ive|ous|ial|ian)$/,
    /(ed|es|er|ly)$/,
  ];

  for (const pattern of suffixPatterns) {
    const match = word.match(pattern);
    if (match) {
      return word.length - match[1].length;
    }
  }

  // Prioridad 4: Dividir después de prefijos comunes
  const prefixPatterns = [
    /^(re|pre|de|un|dis|mis)/,
    /^(trans|inter|over|under)/,
  ];

  for (const pattern of prefixPatterns) {
    const match = word.match(pattern);
    if (match) {
      return match[1].length;
    }
  }

  // Prioridad 5: Dividir después de la primera vocal
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i]) && i < word.length - 1) {
      return i + 1;
    }
  }

  return -1; // No se encontró punto de división adecuado
}

/**
 * Verifica si una cadena tiene al menos una vocal
 */
function hasVowel(str: string): boolean {
  return /[aeiouy]/.test(str);
}
