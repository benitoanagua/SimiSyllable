import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cargar diccionario español procesado - rutas corregidas
let esExpandedDict: Record<string, number> = {};
try {
  // Intentar cargar desde dist/data/ (para producción)
  const esData = readFileSync(
    join(__dirname, "..", "data", "es-dict-expanded.json"),
    "utf-8"
  );
  esExpandedDict = JSON.parse(esData);
  console.log("Spanish dictionary loaded successfully from dist/data/");
} catch (error) {
  try {
    // Intentar cargar desde data/ (para desarrollo)
    const esData = readFileSync(
      join(__dirname, "..", "..", "data", "es-dict-expanded.json"),
      "utf-8"
    );
    esExpandedDict = JSON.parse(esData);
    console.log("Spanish dictionary loaded successfully from data/");
  } catch (error) {
    console.warn(
      "Expanded Spanish dictionary not found, using fallback algorithm"
    );
  }
}

// Diccionario personalizado de respaldo - valores corregidos
const customEsDict: Record<string, number> = {
  murciélago: 4,
  computadora: 4,
  sol: 1,
  río: 2,
  mañana: 3,
  país: 2,
  hielo: 2,
  ciudad: 2,
  aire: 2,
  hola: 2,
  mundo: 2,
  árbol: 2,
};

const VOWELS = /[aeiouáéíóúü]/gi;

export function countEs(word: string): number {
  const normalizedWord = word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");

  if (!normalizedWord) return 0;

  // 1. Verificar diccionario personalizado
  const lowerWord = word.toLowerCase();
  if (customEsDict[lowerWord]) {
    return customEsDict[lowerWord];
  }

  // 2. Verificar diccionario expandido
  if (esExpandedDict[normalizedWord]) {
    return esExpandedDict[normalizedWord];
  }

  // 3. Algoritmo simplificado pero más preciso para español
  const cleanWord = word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  let count = 0;
  let prevIsVowel = false;

  for (let i = 0; i < cleanWord.length; i++) {
    const char = cleanWord[i];
    const isVowel = /[aeiou]/.test(char);

    if (isVowel && !prevIsVowel) {
      count++;
    }
    prevIsVowel = isVowel;
  }

  return Math.max(1, count);
}
