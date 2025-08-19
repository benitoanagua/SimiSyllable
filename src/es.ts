import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Cargar diccionario español procesado
let esExpandedDict: Record<string, number> = {};
try {
  const esData = readFileSync(
    join(__dirname, "..", "data", "es-dict-expanded.json"),
    "utf-8"
  );
  esExpandedDict = JSON.parse(esData);
} catch (error) {
  console.warn(
    "Expanded Spanish dictionary not found, using fallback algorithm"
  );
}

// Diccionario personalizado de respaldo
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
const DIPHTHONGS = /ai|au|ei|eu|oi|ou|ui|ay|ey|oy|uy|ia|ie|io|iu|ua|ue|uo/gi;
const TRIPHTHONGS = /iai|iei|ieu|uai|uei|uau|uay|uey|iai|ioi|iei/gi;
const ACCENTED_VOWELS = /[áéíóú]/gi;

export default function countEs(word: string): number {
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

  // 3. Algoritmo mejorado para español
  let count = 0;

  const vowels = lowerWord.match(/[aeiouáéíóúü]/gi);
  if (!vowels) return 1;

  count = vowels.length;

  const diphthongs = lowerWord.match(DIPHTHONGS);
  if (diphthongs) count -= diphthongs.length;

  const triphthongs = lowerWord.match(TRIPHTHONGS);
  if (triphthongs) count -= triphthongs.length;

  const accentedVowels = lowerWord.match(ACCENTED_VOWELS);
  if (accentedVowels) count += accentedVowels.length;

  if (count > 1) {
    for (let i = 1; i < lowerWord.length - 1; i++) {
      if (
        lowerWord[i] === "h" &&
        "aeiouáéíóúü".includes(lowerWord[i - 1]) &&
        "aeiouáéíóúü".includes(lowerWord[i + 1])
      ) {
        count--;
      }
    }
  }

  return Math.max(1, count);
}
