import { countEn } from "./en/index.js";
import { countEs, syllabifyEs } from "./es/index.js";

// Exportar funciones principales
export { countEn, countEs, syllabifyEs };

/**
 * Función principal que cuenta sílabas según el idioma especificado
 *
 * @param word - Palabra a analizar
 * @param lang - Idioma ("en" para inglés, "es" para español)
 * @param options - Opciones adicionales (solo para español por ahora)
 */
export function count(
  word: string,
  lang: "en" | "es" = "en",
  options?: { autoAccent?: boolean }
): number {
  if (lang === "es") {
    return countEs(word, options?.autoAccent);
  }
  return countEn(word);
}

/**
 * Función que divide una palabra en sílabas según el idioma
 *
 * @param word - Palabra a dividir
 * @param lang - Idioma ("en" para inglés, "es" para español)
 * @param options - Opciones adicionales
 */
export function syllabify(
  word: string,
  lang: "en" | "es" = "en",
  options?: { autoAccent?: boolean }
): string[] {
  if (lang === "es") {
    return syllabifyEs(word, options?.autoAccent);
  }
  // Para inglés, devolver la palabra completa si no hay implementación
  // TODO: Implementar syllabifyEn si es necesario
  return [word];
}
