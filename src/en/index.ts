import { cmuDict } from "./dict.js";
import { countSyllablesInWord } from "./syllableCounter.js";
import { problematic } from "./problematic.js";

export function countEn(word: string, useDict: boolean = true): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;

  // 1. Primero verificar palabras problemáticas (mayor prioridad)
  if (problematic[w]) {
    return problematic[w];
  }

  // 2. Luego usar diccionario CMU si está disponible y habilitado
  if (useDict && cmuDict[w]) {
    return cmuDict[w];
  }

  // 3. Finalmente usar algoritmo de respaldo
  return countSyllablesInWord(w);
}
