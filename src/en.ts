// Diccionario personalizado de respaldo
const customEnDict: Record<string, number> = {
  beautiful: 3,
  certain: 2,
  king: 1,
  garden: 2,
  spring: 1,
  melody: 3,
  rivulets: 3,
  sun: 1,
  rhythm: 2,
  eye: 1,
  the: 1,
  hello: 2,
  world: 1,
  syllable: 3,
  water: 2,
  computer: 3,
};

const VOWELS = /[aeiouy]/gi;
const DIPHTHONGS = /ai|au|ei|eu|oi|ou|ui|ay|ey|oy|uy/gi;
const TRIPHTHONGS = /iai|ieu|iei|uai|uei|uau|iai|uay|uey/gi;
const SILENT_E = /[^aeiouy][aeiouy][^aeiouy]e$/i;
const LE_ENDING = /[^aeiouy]le$/i;

export function countEn(word: string): number {
  // Cambiado de countEs a countEn
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;

  // 1. Verificar diccionario personalizado
  if (customEnDict[w]) {
    return customEnDict[w];
  }

  // 2. Algoritmo mejorado para palabras no encontradas
  let count = 0;

  // Contar vocales
  const vowels = w.match(VOWELS);
  if (!vowels) return 1; // Al menos una sílaba

  count = vowels.length;

  // Restar diptongos (se cuentan como una sílaba)
  const diphthongs = w.match(DIPHTHONGS);
  if (diphthongs) count -= diphthongs.length;

  // Restar triptongos (se cuentan como una sílaba)
  const triphthongs = w.match(TRIPHTHONGS);
  if (triphthongs) count -= triphthongs.length;

  // Ajustar sílabas silenciosas (final 'e' mudo)
  if (SILENT_E.test(w) && count > 1) {
    count--;
  }

  // Ajustar para palabras que terminan en "le" precedida por consonante
  if (LE_ENDING.test(w) && count > 1) {
    count++;
  }

  // Palabras que terminan en "sm" tienen al menos 2 sílabas
  if (w.endsWith("sm") && count === 1) {
    count = 2;
  }

  return Math.max(1, count);
}
