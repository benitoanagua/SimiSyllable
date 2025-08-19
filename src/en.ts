import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cargar diccionario CMU procesado
let cmuDict: Record<string, number> = {};
try {
  const cmuData = readFileSync(
    join(__dirname, "..", "data", "cmudict-processed.json"),
    "utf-8"
  );
  cmuDict = JSON.parse(cmuData);
} catch (error) {
  console.warn("CMU dictionary not found, using fallback algorithm");
}

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

export default function countEn(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;

  // 1. Verificar diccionario personalizado
  if (customEnDict[w]) {
    return customEnDict[w];
  }

  // 2. Verificar diccionario CMU
  if (cmuDict[w]) {
    return cmuDict[w];
  }

  // 3. Algoritmo mejorado para palabras no encontradas
  let count = 0;

  // Contar vocales
  const vowels = w.match(VOWELS);
  if (!vowels) return 1;

  count = vowels.length;

  // Restar diptongos y triptongos
  const diphthongs = w.match(DIPHTHONGS);
  if (diphthongs) count -= diphthongs.length;

  const triphthongs = w.match(TRIPHTHONGS);
  if (triphthongs) count -= triphthongs.length;

  // Ajustar sílabas silenciosas
  if (SILENT_E.test(w) && count > 1) {
    count--;
  }

  // Ajustar para palabras que terminan en "le"
  if (LE_ENDING.test(w) && count > 1) {
    count++;
  }

  // Palabras que terminan en "sm"
  if (w.endsWith("sm") && count === 1) {
    count = 2;
  }

  return Math.max(1, count);
}
