/**
 * Patrones y excepciones para el silabeador inglés
 */

// Excepciones comunes con conteo silábico predefinido
export const SYLLABLE_EXCEPTIONS = new Map([
  ["the", 1],
  ["a", 1],
  ["i", 1],
  ["eye", 1],
  ["are", 1],
  ["you", 1],
  ["be", 1],
  ["he", 1],
  ["she", 1],
  ["we", 1],
  ["me", 1],
  ["my", 1],
  ["by", 1],
  ["fly", 1],
  ["cry", 1],
  ["try", 1],
  ["why", 1],
  ["sky", 1],
  ["one", 1],
  ["once", 1],
  ["whose", 1],
  ["whole", 1],
  ["hour", 2],
  ["hello", 2],
  ["water", 2],
  ["family", 3],
  ["beautiful", 3],
  ["university", 5],
  ["opportunity", 5],
  ["character", 3],
  ["action", 2],
  ["nature", 2],
  ["table", 2],
  ["possible", 3],
  ["baseball", 2],
  ["sunset", 2],
  ["notebook", 2],
  ["psychology", 4],
  ["boat", 1],
  ["cloud", 1],
  ["coin", 1],
  ["house", 1],
]);

// Patrones de sufijos que afectan el conteo silábico
export const SUFFIX_PATTERNS = [
  { pattern: /(tion|sion|cian)$/, adjustment: -1 },
  { pattern: /(ture|sure)$/, adjustment: -1 },
  { pattern: /(able|ible|ance|ence|ancy|ency)$/, adjustment: 1 },
  { pattern: /(ism|ship|hood|ment|ness|less)$/, adjustment: 1 },
  { pattern: /(ing|est|ful|ive|ous|ial|ian|ity|ety)$/, adjustment: 0 },
  { pattern: /(ed|es|er|ly)$/, adjustment: 0 },
];

// Diptongos comunes (cuentan como 1 sílaba)
export const DIPHTHONGS = [
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

// Patrones de división silábica mejorados
export const DIVISION_RULES = [
  // Regla 1: Dividir después de vocal antes de consonante (VC-CV)
  { pattern: /([aeiouy])([^aeiouy][aeiouy])/, position: 1 },

  // Regla 2: Dividir entre consonantes dobles
  { pattern: /([^aeiouy])([^aeiouy])/, position: 1 },

  // Regla 3: Dividir antes de sufijos comunes
  { pattern: /(.*)(tion|sion|cian|ture|sure)$/, position: -3 },
  { pattern: /(.*)(able|ible|ance|ence|ment|ness)$/, position: -4 },
  { pattern: /(.*)(ing|est|ful|ive|ous|ial|ian)$/, position: -3 },

  // Regla 4: Dividir después de prefijos comunes
  { pattern: /^(re|pre|de|un|dis|mis)(.*)$/, position: 2 },
  { pattern: /^(trans|inter|over|under)(.*)$/, position: 5 },

  // Regla 5: Consonante + le al final
  { pattern: /(.*)([^aeiouy]le)$/, position: -2 },
];
