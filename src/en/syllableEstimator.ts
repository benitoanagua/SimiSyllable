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

  // 1. Contar grupos vocálicos
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
  if (!word || word.length <= 3) {
    return [word];
  }

  // Intentar con cada regla de división
  for (const rule of DIVISION_RULES) {
    const match = word.match(rule.pattern);
    if (match && match[1] && match[2]) {
      let firstPart: string;
      let secondPart: string;

      if (rule.position > 0) {
        // División por posición absoluta
        firstPart = word.slice(0, rule.position);
        secondPart = word.slice(rule.position);
      } else {
        // División por posición desde el final
        firstPart = word.slice(0, word.length + rule.position);
        secondPart = word.slice(word.length + rule.position);
      }

      // Verificar que ambas partes tengan al menos una vocal
      if (hasVowel(firstPart) && hasVowel(secondPart)) {
        // Dividir recursivamente si es necesario
        if (firstPart.length > 3) {
          const firstSyllables = divideSyllables(firstPart);
          const secondSyllables = divideSyllables(secondPart);
          return [...firstSyllables, ...secondSyllables];
        }
        return [firstPart, secondPart];
      }
    }
  }

  // Fallback: dividir después de la primera vocal
  for (let i = 1; i < word.length - 1; i++) {
    if ("aeiouy".includes(word[i]) && !"aeiouy".includes(word[i + 1])) {
      const firstPart = word.slice(0, i + 1);
      const secondPart = word.slice(i + 1);
      if (hasVowel(firstPart) && hasVowel(secondPart)) {
        return [firstPart, secondPart];
      }
    }
  }

  // Último recurso: dividir por la mitad
  const mid = Math.floor(word.length / 2);
  return [word.slice(0, mid), word.slice(mid)];
}

/**
 * Verifica si una cadena tiene al menos una vocal
 */
function hasVowel(str: string): boolean {
  return /[aeiouy]/.test(str);
}
