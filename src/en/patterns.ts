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
  { pattern: /(tion|sion|cian)$/, adjustment: -1 }, // -1 sílaba
  { pattern: /(ture|sure)$/, adjustment: -1 }, // -1 sílaba
  { pattern: /(able|ible|ance|ence|ancy|ency)$/, adjustment: 1 }, // +1 sílaba
  { pattern: /(ism|ship|hood|ment|ness|less)$/, adjustment: 1 }, // +1 sílaba
  { pattern: /(ing|est|ful|ive|ous|ial|ian|ity|ety)$/, adjustment: 0 }, // neutral
  { pattern: /(ed|es|er|ly)$/, adjustment: 0 }, // neutral
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

// Patrones de división silábica
export const DIVISION_PATTERNS = [
  // Dividir después de vocal antes de consonante+vocal (VC-V)
  /([aeiouy])([bcdfghjklmnpqrstvwxyz][aeiouy])/,
  // Dividir entre consonantes dobles
  /([bcdfghjklmnpqrstvwxyz])([bcdfghjklmnpqrstvwxyz])/,
  // Dividir antes de sufijos comunes
  /(.*)(tion|sion|cian|ture|sure|able|ible|ance|ence|ment|ness|ing|est)$/,
];
