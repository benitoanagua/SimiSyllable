/**
 * Normalizador de texto para el silabeador inglés
 */

/**
 * Normaliza una palabra inglesa (minúsculas, sin caracteres especiales)
 */
export function normalizeEnglishWord(word: string): string {
  return word
    .toLowerCase()
    .trim()
    .replace(/[^a-z]/g, ""); // Solo letras básicas
}

/**
 * Verifica si una palabra está vacía después de normalización
 */
export function isEmpty(word: string): boolean {
  return !word || word.length === 0;
}
