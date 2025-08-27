import { PhoneticPattern } from "./types.js";

/**
 * Patrones fonéticos que afectan el conteo silábico
 * Basados en pronunciación en lugar de ortografía
 */
export const PHONETIC_PATTERNS: PhoneticPattern[] = [
  // Diptongos que forman una sílaba
  {
    pattern: /[aeiou](?:ou|oi|oy|au|aw|ew|ow|oo)/,
    syllableChange: -1,
    context: "middle",
  },
  {
    pattern: /[aeio](?:ai|ay|ea|ee|ei|ey|ie|oa|oe)/,
    syllableChange: -1,
    context: "middle",
  },

  // Grupos de consonantes que no dividen sílabas
  {
    pattern: /ch|sh|th|ph|gh|wh|ck|ng|nk|sc/,
    syllableChange: 0,
    context: "middle",
  },

  // La 'y' como vocal al final de palabra
  { pattern: /[bcdfghjklmnpqrstvwxyz]y$/, syllableChange: 1, context: "end" },

  // La 'e' silenciosa al final (reduce sílabas)
  { pattern: /[bcdfghjklmnpqrstvwxyz]e$/, syllableChange: -1, context: "end" },

  // La 'le' después de consonante añade sílaba
  { pattern: /[bcdfghjklmnpqrstvwxyz]le$/, syllableChange: 1, context: "end" },

  // 'ia', 'io', 'iu' como sílabas separadas
  { pattern: /i[aeiou]/, syllableChange: 1, context: "middle" },
];

/**
 * Reglas de ajuste basadas en posición en la palabra
 */
export const POSITIONAL_RULES = [
  { context: "start", pattern: /^[aeiou]/, adjustment: 1 },
  { context: "end", pattern: /[aeiouy]$/, adjustment: 1 },
  { context: "end", pattern: /[bcdfghjklmnpqrstvwxyz]$/, adjustment: 0 },
];

/**
 * Aplica ajustes fonéticos al conteo silábico
 */
export function applyPhoneticAdjustments(
  word: string,
  currentCount: number
): number {
  let count = currentCount;

  for (const pattern of PHONETIC_PATTERNS) {
    const matches = word.match(pattern.pattern);
    if (matches) {
      // Verificar contexto si está especificado
      if (
        !pattern.context ||
        (pattern.context === "start" && word.startsWith(matches[0])) ||
        (pattern.context === "end" && word.endsWith(matches[0])) ||
        (pattern.context === "middle" &&
          !word.startsWith(matches[0]) &&
          !word.endsWith(matches[0]))
      ) {
        count += pattern.syllableChange;
      }
    }
  }

  return Math.max(1, count);
}
