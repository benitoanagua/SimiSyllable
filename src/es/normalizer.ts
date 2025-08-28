/**
 * Normalizador de texto para el silabeador español
 */

/**
 * Normaliza una palabra preservando las mayúsculas iniciales cuando corresponde
 */
export function normalizeSpanishWord(word: string): string {
  const trimmed = word.trim();
  if (!trimmed) return "";

  // Limpiar caracteres no válidos pero preservar estructura
  const cleaned = trimmed.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/g, "");

  if (!cleaned) return "";

  // Determinar si la primera letra original era mayúscula
  const firstOriginalChar = trimmed[0];
  const shouldPreserveCase = /[A-ZÁÉÍÓÚÜÑ]/.test(firstOriginalChar);

  if (shouldPreserveCase) {
    // Preservar la primera letra en mayúscula, el resto en minúsculas
    return cleaned[0].toUpperCase() + cleaned.slice(1).toLowerCase();
  } else {
    // Todo en minúsculas
    return cleaned.toLowerCase();
  }
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
