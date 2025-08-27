import { VowelGroup } from "./types.js";

/**
 * Clasificador de grupos vocálicos para inglés
 */

const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

/**
 * Determina si un carácter es una vocal (incluyendo 'y')
 */
export function isVowel(char: string): boolean {
  return VOWELS.has(char);
}

/**
 * Analiza un grupo de vocales consecutivas en inglés
 */
export function analyzeVowelGroup(vowelGroup: string): VowelGroup {
  if (vowelGroup.length === 1) {
    return {
      text: vowelGroup,
      type: "single",
      syllableCount: 1,
    };
  }

  // Diptongos comunes en inglés (una sílaba)
  const diphthongs = [
    "ai",
    "ay",
    "au",
    "aw",
    "ea",
    "ee",
    "ei",
    "ey",
    "ie",
    "oa",
    "oe",
    "oi",
    "oy",
    "oo",
    "ou",
    "ow",
    "ue",
    "ui",
  ];

  if (diphthongs.includes(vowelGroup)) {
    return {
      text: vowelGroup,
      type: "diphthong",
      syllableCount: 1,
    };
  }

  // Triptongos menos comunes
  const triphthongs = ["eau", "ieu", "iew", "iou", "ueu"];
  if (triphthongs.includes(vowelGroup)) {
    return {
      text: vowelGroup,
      type: "diphthong",
      syllableCount: 1,
    };
  }

  // En inglés, la mayoría de los grupos de vocales forman sílabas separadas
  return {
    text: vowelGroup,
    type: "vowel_cluster",
    syllableCount: vowelGroup.length,
  };
}
