import { problematic } from "./problematic.js";
import {
  EXPRESSION_MONOSYLLABIC_ONE,
  EXPRESSION_MONOSYLLABIC_TWO,
  EXPRESSION_DOUBLE_SYLLABIC_ONE,
  EXPRESSION_DOUBLE_SYLLABIC_TWO,
  EXPRESSION_DOUBLE_SYLLABIC_THREE,
  EXPRESSION_DOUBLE_SYLLABIC_FOUR,
  EXPRESSION_SINGLE,
  EXPRESSION_DOUBLE,
  EXPRESSION_TRIPLE,
} from "./patterns.js";

export function countSyllablesInWord(word: string): number {
  let count = 0;
  const value = word.toLowerCase().replace(/['']/g, "");

  if (value.length === 0) return 0;
  if (value.length < 3) return 1;

  // Verificar palabras problemáticas primero
  if (problematic[value]) {
    return problematic[value];
  }

  const addOne = () => {
    count++;
    return "";
  };
  const subtractOne = () => {
    count--;
    return "";
  };

  // Aplicar reglas de prefijos/sufijos
  let processed = value
    .replace(EXPRESSION_TRIPLE, () => {
      count += 3;
      return "";
    })
    .replace(EXPRESSION_DOUBLE, () => {
      count += 2;
      return "";
    })
    .replace(EXPRESSION_SINGLE, () => {
      count += 1;
      return "";
    });

  // Contar grupos de vocales
  const parts = processed.split(/[^aeiouy]+/);
  for (const part of parts) {
    if (part !== "") count++;
  }

  // Ajustes basados en reglas
  processed
    .replace(EXPRESSION_MONOSYLLABIC_ONE, subtractOne)
    .replace(EXPRESSION_MONOSYLLABIC_TWO, subtractOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_ONE, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_TWO, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_THREE, addOne)
    .replace(EXPRESSION_DOUBLE_SYLLABIC_FOUR, addOne);

  return Math.max(1, count);
}
