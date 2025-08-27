/**
 * Normalizador de texto para el silabeador español
 */

/**
 * Normaliza una palabra manteniendo todos los acentos y diéresis
 */
export function normalizeSpanishWord(word: string): string {
  return word
    .toLowerCase()
    .trim()
    .replace(/[^a-záéíóúüñ]/g, ""); // Solo letras españolas con acentos
}

/**
 * Añade acentos automáticamente según reglas básicas del español
 * (para casos donde el usuario no los escribió)
 */
export function addMissingAccents(word: string): string {
  // Esta función es compleja y requeriría un diccionario completo
  // Por ahora, devolvemos la palabra tal como está
  // TODO: Implementar reglas de acentuación automática
  return word;
}

/**
 * Verifica si una palabra está vacía después de normalización
 */
export function isEmpty(word: string): boolean {
  return !word || word.length === 0;
}
