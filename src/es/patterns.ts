import { SyllablePattern } from "./types.js";

/**
 * Patrones para la división silábica inicial basada en consonantes
 */
export const CONSONANT_PATTERNS: SyllablePattern[] = [
  // Monosílabo vocal (escape rápido)
  { regex: /^[aeiouáéíóúüñ]+$/, cutPosition: -1 },

  // Vocal + consonante/final
  { regex: /^[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/, cutPosition: 0 },

  // Consonante + vocal + consonante/final
  {
    regex: /^[^aeiouáéíóúüñ][aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/,
    cutPosition: 0,
  },

  // Dos consonantes + vocal
  {
    regex: /^[^aeiouáéíóúüñ]{2}[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/,
    cutPosition: 1,
  },

  // Tres consonantes + vocal
  {
    regex: /^[^aeiouáéíóúüñ]{3}[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/,
    cutPosition: 2,
  },

  // Cuatro consonantes + vocal
  {
    regex: /^[^aeiouáéíóúüñ]{4}[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/,
    cutPosition: 3,
  },

  // Solo consonantes (final)
  { regex: /^[^aeiouáéíóúüñ]+$/, cutPosition: -1 },
];

/**
 * Consonantes que forman grupos inseparables con la siguiente consonante
 */
export const LIQUID_CONSONANTS = new Set(["r", "l"]);
export const SPECIAL_CONSONANTS = new Set(["h"]);
