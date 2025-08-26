/**
 * Sanitiza una palabra española eliminando caracteres no válidos
 * y normalizando el formato para procesamiento consistente
 */
export function sanitizeSpanishWord(word: string): string {
  return word
    .toLowerCase()
    .normalize("NFD") // Normaliza caracteres Unicode (separa tildes)
    .replace(/[\u0300-\u036f]/g, "") // Quita marcas diacríticas (tildes)
    .replace(/[^a-zñü]/g, ""); // Conserva solo letras españolas básicas
}

/**
 * Limpia una palabra manteniendo tildes para casos especiales
 * donde la acentuación es importante para el conteo de sílabas
 */
export function cleanSpanishWordWithAccents(word: string): string {
  return word.toLowerCase().replace(/[^a-záéíóúüñ]/g, ""); // Conserva tildes para análisis silábico
}

/**
 * Verifica si una palabra está vacía después de sanitización
 */
export function isEmptyWord(word: string): boolean {
  return !word || word.length === 0;
}
