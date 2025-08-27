import { SyllablePattern } from "./types.js";

/**
 * Patrones de división silábica para inglés (basados en aproximación fonética)
 * Ordenados por prioridad (mayor prioridad = más específico)
 */
export const ENGLISH_SYLLABLE_PATTERNS: SyllablePattern[] = [
  // Palabras compuestas (highest priority)
  {
    regex: /^([a-z]+)-([a-z]+)$/,
    cutPosition: -1,
    priority: 100,
    description: "Compound words",
  },

  // Sufijos comunes que forman sílabas separadas
  {
    regex: /(tion|sion|cian|tious|cious|gious)$/,
    cutPosition: -3,
    priority: 95,
    description: "-tion, -sion suffixes",
  },
  {
    regex: /(ture|sure|zure)$/,
    cutPosition: -3,
    priority: 95,
    description: "-ture, -sure suffixes",
  },
  {
    regex: /(able|ible|ance|ence|ancy|ency)$/,
    cutPosition: -4,
    priority: 90,
    description: "-able, -ance suffixes",
  },
  {
    regex: /(ism|ship|hood|ment|ness|less)$/,
    cutPosition: -3,
    priority: 90,
    description: "-ism, -ship suffixes",
  },
  {
    regex: /(ing|est|ful|ive|ous|ial|ian|ity|ety)$/,
    cutPosition: -2,
    priority: 85,
    description: "-ing, -est suffixes",
  },
  {
    regex: /(ed|es|er|ly)$/,
    cutPosition: -1,
    priority: 80,
    description: "-ed, -es suffixes",
  },

  // Prefijos comunes
  {
    regex: /^(re|pre|de|un|dis|mis)([bcdfghjklmnpqrstvwxyz][a-z]+)$/,
    cutPosition: 2,
    priority: 85,
    description: "Common prefixes",
  },
  {
    regex: /^(trans|inter|over|under|super)([a-z]+)$/,
    cutPosition: 5,
    priority: 85,
    description: "Multi-letter prefixes",
  },

  // Consonante + le al final (table, little)
  {
    regex: /([bcdfghjklmnpqrstvwxyz]le)$/,
    cutPosition: -2,
    priority: 80,
    description: "Consonant + le ending",
  },

  // Vocales consecutivas (generalmente se separan)
  {
    regex: /([aeiouy])([aeiouy])/,
    cutPosition: 1,
    priority: 75,
    description: "Consecutive vowels",
  },

  // Patrón VCV (vowel-consonant-vowel) - dividir después de la consonante
  {
    regex: /([aeiouy])([bcdfghjklmnpqrstvwxyz])([aeiouy])/,
    cutPosition: 2,
    priority: 70,
    description: "Vowel-Consonant-Vowel pattern",
  },

  // Consonantes dobles (letter, summer)
  {
    regex: /([bcdfghjklmnpqrstvwxyz])\1([aeiouy])/,
    cutPosition: 1,
    priority: 65,
    description: "Double consonants",
  },

  // Consonantes líquidas y especiales
  {
    regex: /([lr])([bcdfghjklmnpqrstvwxyz])([aeiouy])/,
    cutPosition: 1,
    priority: 60,
    description: "Liquid consonants",
  },

  // Patrón básico: vocal + consonante final
  {
    regex: /([aeiouy])([bcdfghjklmnpqrstvwxyz]|$)/,
    cutPosition: 1,
    priority: 50,
    description: "Vowel + consonant ending",
  },

  // Consonante + vocal
  {
    regex: /([bcdfghjklmnpqrstvwxyz])([aeiouy])/,
    cutPosition: 1,
    priority: 40,
    description: "Consonant + vowel",
  },
];

/**
 * Excepciones comunes con conteo silábico predefinido
 */
export const SYLLABLE_EXCEPTIONS = new Map([
  // Monosílabos irregulares
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
  ["hour", 1],

  // Palabras comunes con conteo específico
  ["hello", 2],
  ["world", 1],
  ["people", 2],
  ["water", 2],
  ["family", 3],
  ["different", 3],
  ["every", 3],
  ["beautiful", 3],
  ["interesting", 4],
  ["university", 5],
  ["opportunity", 5],
  ["character", 3],
  ["business", 2],
  ["choir", 1],
  ["question", 2],
  ["lion", 2],
  ["diamond", 2],
  ["idea", 3],
  ["ocean", 2],
  ["usually", 4],
  ["actual", 3],
  ["video", 3],
  ["area", 3],
]);

/**
 * Letras que suelen ser silenciosas en ciertos contextos
 */
export const SILENT_LETTER_PATTERNS = [
  { pattern: /^kn/, letters: "k" }, // knee, know
  { pattern: /^gn/, letters: "g" }, // gnome, gnat
  { pattern: /^pn/, letters: "p" }, // pneumonia
  { pattern: /^ps/, letters: "p" }, // psychology
  { pattern: /^wr/, letters: "w" }, // write, wrong
  { pattern: /^wh/, letters: "h" }, // who, whole
  { pattern: /mb$/, letters: "b" }, // comb, lamb
  { pattern: /gn$/, letters: "g" }, // sign, design
  { pattern: /[bcdfghjklmnpqrstvwxyz]e$/, letters: "e" }, // silent e
];
