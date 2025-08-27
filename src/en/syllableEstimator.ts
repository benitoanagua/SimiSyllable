/**
 * Estimador de sílabas para inglés basado en patrones fonéticos
 */

import {
  SYLLABLE_EXCEPTIONS,
  SUFFIX_PATTERNS,
  DIPHTHONGS,
  DIVISION_PATTERNS,
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

  // Verificar si es un diptongo conocido
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
    // Pero no si termina en "le" después de consonante (adds syllable)
    if (word.endsWith("le") && !"aeiouy".includes(word[word.length - 3])) {
      count += 1; // table -> ta-ble (2 sílabas)
    } else {
      count -= 1; // like -> lik (1 sílaba)
    }
  }

  // Regla de consonantes dobles
  if (/([bcdfghjklmnpqrstvwxyz])\1/.test(word)) {
    count -= 1;
  }

  return Math.max(1, count);
}

/**
 * División silábica aproximada para inglés
 */
export function divideSyllables(word: string): string[] {
  if (!word || word.length <= 3) {
    return [word];
  }

  // Usar patrones de división
  for (const pattern of DIVISION_PATTERNS) {
    const match = word.match(pattern);
    if (match && match[1] && match[2]) {
      return [match[1], match[2]];
    }
  }

  // Dividir por la mitad como fallback
  const mid = Math.floor(word.length / 2);
  return [word.slice(0, mid), word.slice(mid)];
}
