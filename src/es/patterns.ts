import { SyllablePattern } from "./types.js";

/**
 * Vocales del español
 */
export const VOWELS = "aeiouáéíóúü";
export const STRONG_VOWELS = "aeoáéó";
export const WEAK_VOWELS = "iuíúü";
export const ACCENTED_WEAK_VOWELS = "íú";

/**
 * Grupos consonánticos que no se separan
 */
export const CONSONANT_CLUSTERS = [
  "bl",
  "br",
  "cl",
  "cr",
  "dr",
  "fl",
  "fr",
  "gl",
  "gr",
  "pl",
  "pr",
  "tl",
  "tr",
  "ch",
  "ll",
  "rr",
];

/**
 * Consonantes que forman grupos inseparables con la siguiente consonante
 */
export const LIQUID_CONSONANTS = new Set(["r", "l"]);
export const SPECIAL_CONSONANTS = new Set(["h"]);

/**
 * Excepciones poco comunes
 */
export const SYLLABLE_EXCEPTIONS = new Map([
  ["y", 1],
  ["oh", 1],
  ["ah", 1],
]);

/**
 * Patrones para la división silábica inicial basada en consonantes
 */
export const CONSONANT_PATTERNS: SyllablePattern[] = [
  // Monosílabo vocal (escape rápido)
  { regex: /^[aeiouáéíóúüñ]+$/i, cutPosition: -1, description: "Solo vocales" },

  // Vocal + consonante/final
  {
    regex: /^[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/i,
    cutPosition: 0,
    description: "Vocal + consonante",
  },

  // Consonante + vocal + consonante/final
  {
    regex: /^[^aeiouáéíóúüñ][aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/i,
    cutPosition: 0,
    description: "Consonante + vocal + consonante",
  },

  // Dos consonantes + vocal
  {
    regex: /^[^aeiouáéíóúüñ]{2}[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/i,
    cutPosition: 1,
    description: "Dos consonantes + vocal",
  },

  // Tres consonantes + vocal
  {
    regex: /^[^aeiouáéíóúüñ]{3}[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/i,
    cutPosition: 2,
    description: "Tres consonantes + vocal",
  },

  // Cuatro consonantes + vocal
  {
    regex: /^[^aeiouáéíóúüñ]{4}[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/i,
    cutPosition: 3,
    description: "Cuatro consonantes + vocal",
  },

  // Solo consonantes (final)
  {
    regex: /^[^aeiouáéíóúüñ]+$/i,
    cutPosition: -1,
    description: "Solo consonantes",
  },
];
