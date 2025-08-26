/**
 * Diccionario de palabras problemáticas que requieren valores específicos
 * de sílabas debido a irregularidades en la división silábica automática
 */
export const problematic: Record<string, number> = {
  // Palabras con hiatos complejos
  país: 2, // pa-ís (hiato: a-í)

  // Añadir más palabras problemáticas aquí según se identifiquen
  // raíz: 2,    // ra-íz
  // baúl: 2,    // ba-úl
  // oír: 2,     // o-ír
  // reír: 2,    // re-ír
};

/**
 * Verifica si una palabra está en el diccionario de casos problemáticos
 */
export function isProblematicWord(word: string): boolean {
  return word in problematic;
}

/**
 * Obtiene el número de sílabas para una palabra problemática
 */
export function getProblematicSyllableCount(word: string): number | null {
  return problematic[word] || null;
}
