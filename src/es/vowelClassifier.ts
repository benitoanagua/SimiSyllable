/**
 * Clasificador de vocales y grupos vocálicos para el silabeador español
 */

import { VowelGroup } from "./types.js";

const STRONG_VOWELS = new Set(["a", "e", "o"]);
const WEAK_VOWELS = new Set(["i", "u"]);
const ACCENTED_WEAK = new Set(["í", "ú"]);
const ACCENTED_STRONG = new Set(["á", "é", "ó"]);
const DIERESIS_VOWELS = new Set(["ü"]);

/**
 * Determina si una vocal es fuerte (a, e, o)
 */
export function isStrongVowel(char: string): boolean {
  return STRONG_VOWELS.has(char) || ACCENTED_STRONG.has(char);
}

/**
 * Determina si una vocal es débil (i, u)
 */
export function isWeakVowel(char: string): boolean {
  return (
    WEAK_VOWELS.has(char) ||
    ACCENTED_WEAK.has(char) ||
    DIERESIS_VOWELS.has(char)
  );
}

/**
 * Determina si una vocal débil tiene acento tónico (í, ú)
 */
export function isAccentedWeakVowel(char: string): boolean {
  return ACCENTED_WEAK.has(char);
}

/**
 * Determina si una vocal es cualquier tipo de vocal
 */
export function isVowel(char: string): boolean {
  return isStrongVowel(char) || isWeakVowel(char);
}

/**
 * Analiza un grupo de vocales consecutivas y determina cómo dividirlo
 */
export function analyzeVowelGroup(vowelGroup: string): VowelGroup {
  if (vowelGroup.length === 1) {
    return {
      text: vowelGroup,
      type: "single",
      syllableCount: 1,
    };
  }

  if (vowelGroup.length === 2) {
    return analyzeTwoVowels(vowelGroup);
  }

  if (vowelGroup.length === 3) {
    return analyzeThreeVowels(vowelGroup);
  }

  // Para grupos más largos, dividir recursivamente
  return analyzeComplexVowelGroup(vowelGroup);
}

function analyzeTwoVowels(vowels: string): VowelGroup {
  const [v1, v2] = vowels;

  // Caso 1: Vocal débil acentuada + cualquier otra = hiato
  if (isAccentedWeakVowel(v1) || isAccentedWeakVowel(v2)) {
    return {
      text: vowels,
      type: "hiatus",
      syllableCount: 2,
    };
  }

  // Caso 2: Dos vocales fuertes = hiato
  if (isStrongVowel(v1) && isStrongVowel(v2)) {
    return {
      text: vowels,
      type: "hiatus",
      syllableCount: 2,
    };
  }

  // Caso 3: Fuerte + débil o débil + fuerte = diptongo
  return {
    text: vowels,
    type: "diphthong",
    syllableCount: 1,
  };
}

function analyzeThreeVowels(vowels: string): VowelGroup {
  const [v1, v2, v3] = vowels;

  // Si hay vocal débil acentuada, dividir en esa posición
  if (isAccentedWeakVowel(v1)) {
    return {
      text: vowels,
      type: "hiatus",
      syllableCount: 2, // v1 | v2v3
    };
  }

  if (isAccentedWeakVowel(v2)) {
    return {
      text: vowels,
      type: "hiatus",
      syllableCount: 3, // v1 | v2 | v3
    };
  }

  if (isAccentedWeakVowel(v3)) {
    return {
      text: vowels,
      type: "hiatus",
      syllableCount: 2, // v1v2 | v3
    };
  }

  // Patrón débil + fuerte + débil = triptongo
  if (isWeakVowel(v1) && isStrongVowel(v2) && isWeakVowel(v3)) {
    return {
      text: vowels,
      type: "triphthong",
      syllableCount: 1,
    };
  }

  // Otros casos: dividir por vocales fuertes
  if (isStrongVowel(v1) && isStrongVowel(v2)) {
    return {
      text: vowels,
      type: "hiatus",
      syllableCount: 2, // v1 | v2v3
    };
  }

  if (isStrongVowel(v2) && isStrongVowel(v3)) {
    return {
      text: vowels,
      type: "hiatus",
      syllableCount: 2, // v1v2 | v3
    };
  }

  return {
    text: vowels,
    type: "diphthong",
    syllableCount: 1,
  };
}

function analyzeComplexVowelGroup(vowels: string): VowelGroup {
  // Para grupos complejos, dividir por vocales acentuadas y fuertes
  let syllableCount = 1;

  for (let i = 0; i < vowels.length - 1; i++) {
    const current = vowels[i];
    const next = vowels[i + 1];

    // División por vocal débil acentuada
    if (isAccentedWeakVowel(current) || isAccentedWeakVowel(next)) {
      syllableCount++;
      continue;
    }

    // División por dos vocales fuertes consecutivas
    if (isStrongVowel(current) && isStrongVowel(next)) {
      syllableCount++;
    }
  }

  return {
    text: vowels,
    type: syllableCount === 1 ? "diphthong" : "hiatus",
    syllableCount,
  };
}
