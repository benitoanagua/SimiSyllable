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
  console.log("CMU dictionary loaded successfully from dist/data/");
} catch (error) {
  try {
    const cmuData = readFileSync(
      join(__dirname, "..", "..", "data", "cmudict-processed.json"),
      "utf-8"
    );
    cmuDict = JSON.parse(cmuData);
    console.log("CMU dictionary loaded successfully from data/");
  } catch (error) {
    console.warn("CMU dictionary not found, using improved algorithm");
  }
}

export function countEn(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;

  // Usar CMU si existe
  if (Object.keys(cmuDict).length > 0 && cmuDict[w]) {
    return cmuDict[w];
  }

  let count = 0;
  const vowels = "aeiouy";
  let prevIsVowel = false;

  // Contar sílabas basado en transiciones vocal-consonante
  for (let i = 0; i < w.length; i++) {
    const char = w[i];
    const isVowel = vowels.includes(char);

    if (isVowel && !prevIsVowel) {
      count++;
    }
    prevIsVowel = isVowel;
  }

  // 🔹 Reglas especiales para inglés
  // E muda final (excepto después de consonante + le)
  if (w.endsWith("e") && !w.endsWith("le") && count > 1) {
    count--; // e muda
  }

  // le después de consonante agrega sílaba
  if (w.endsWith("le") && w.length > 2 && !vowels.includes(w[w.length - 3])) {
    count++; // table, little
  }

  // Hiatos comunes que deben contar como sílabas separadas
  if (/ia|io|eo/.test(w)) {
    count++; // media, lion, video
  }

  // ism agrega sílaba
  if (w.endsWith("ism")) {
    count++; // realism, organism
  }

  // ed muda (no se pronuncia como sílaba extra)
  if (w.endsWith("ed") && !/[td]ed$/.test(w)) {
    count--; // walked, baked
  }

  // es plural agrega sílaba en algunos casos
  if (w.endsWith("es") && count === 1) {
    count++; // wishes, roses
  }

  // qu no cuenta como dos vocales
  if (w.includes("qu")) {
    const quCount = (w.match(/qu/g) || []).length;
    count -= quCount;
  }

  return Math.max(1, count);
}
