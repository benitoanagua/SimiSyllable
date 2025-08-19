import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cargar diccionario CMU procesado - rutas corregidas
let cmuDict: Record<string, number> = {};
try {
  // Intentar cargar desde dist/data/ (para producción)
  const cmuData = readFileSync(
    join(__dirname, "..", "data", "cmudict-processed.json"),
    "utf-8"
  );
  cmuDict = JSON.parse(cmuData);
  console.log("CMU dictionary loaded successfully from dist/data/");
} catch (error) {
  try {
    // Intentar cargar desde data/ (para desarrollo)
    const cmuData = readFileSync(
      join(__dirname, "..", "..", "data", "cmudict-processed.json"),
      "utf-8"
    );
    cmuDict = JSON.parse(cmuData);
    console.log("CMU dictionary loaded successfully from data/");
  } catch (error) {
    console.warn("CMU dictionary not found, using fallback algorithm");
  }
}

// Diccionario personalizado de respaldo - valores corregidos
const customEnDict: Record<string, number> = {
  beautiful: 3,
  certain: 2,
  king: 1,
  garden: 2,
  spring: 1,
  melody: 3,
  rivulets: 3,
  sun: 1,
  rhythm: 2, // Corregido: "rhythm" no "rhythm"
  eye: 1,
  the: 1,
  hello: 2,
  world: 1,
  syllable: 3,
  water: 2,
  computer: 3,
};

const VOWELS = /[aeiouy]/gi;

export function countEn(word: string): number {
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

  // 3. Algoritmo simplificado pero más preciso
  let count = 0;
  let prevIsVowel = false;

  for (let i = 0; i < w.length; i++) {
    const char = w[i];
    const isVowel = /[aeiouy]/.test(char);

    if (isVowel && !prevIsVowel) {
      count++;
    }
    prevIsVowel = isVowel;
  }

  // Ajustes especiales
  if (w.endsWith("e") && count > 1) {
    count--;
  }

  if (w.endsWith("le") && !/[aeiouy]/.test(w[w.length - 3])) {
    count++;
  }

  return Math.max(1, count);
}
