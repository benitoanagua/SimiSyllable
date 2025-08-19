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
  console.log("Spanish dictionary loaded successfully from dist/data/");
} catch (error) {
  try {
    const esData = readFileSync(
      join(__dirname, "..", "..", "data", "es-dict-expanded.json"),
      "utf-8"
    );
    esExpandedDict = JSON.parse(esData);
    console.log("Spanish dictionary loaded successfully from data/");
  } catch (error) {
    console.warn("Spanish dictionary not found, using improved algorithm");
  }
}

export function countEs(word: string): number {
  const normalizedWord = word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zü]/g, "");

  if (!normalizedWord) return 0;

  // Usar diccionario español si existe
  if (
    Object.keys(esExpandedDict).length > 0 &&
    esExpandedDict[normalizedWord]
  ) {
    return esExpandedDict[normalizedWord];
  }

  const w = word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zü]/g, "");

  if (!w) return 0;

  let count = 0;
  const vowels = "aeiouü";
  const strong = "aeoáéó";
  const weak = "iuüíú";

  let i = 0;
  while (i < w.length) {
    const currentChar = w[i];

    if (vowels.includes(currentChar)) {
      // Detectar triptongo (débil + fuerte + débil)
      if (
        i + 2 < w.length &&
        weak.includes(w[i]) &&
        strong.includes(w[i + 1]) &&
        weak.includes(w[i + 2])
      ) {
        count++;
        i += 3;
        continue;
      }

      // Detectar diptongo
      if (i + 1 < w.length && vowels.includes(w[i + 1])) {
        // Excluir hiato fuerte+fuerte
        if (!(strong.includes(w[i]) && strong.includes(w[i + 1]))) {
          count++;
          i += 2;
          continue;
        }
      }

      // Vocal sola o hiato
      count++;
      i++;
    } else {
      i++;
    }
  }

  // Ajuste para palabras con acentos que forman hiatos
  const originalWord = word.toLowerCase();
  if (/í|ú/.test(originalWord)) {
    const accentCount = (originalWord.match(/í|ú/g) || []).length;
    count += accentCount;
  }

  return Math.max(1, count);
}
