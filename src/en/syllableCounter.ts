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
  const value = word.toLowerCase().replace(/['']/g, "");

  if (value.length === 0) return 0;
  if (value.length < 3) return 1;

  // Verificar palabras problemáticas primero
  if (problematic[value]) {
    return problematic[value];
  }

  let count = 0;

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

  // Contar grupos de vocales en lo que queda
  const remainingVowelGroups = processed.match(/[aeiouy]+/g) || [];
  count += remainingVowelGroups.length;

  // Ajustes basados en reglas fonológicas
  let tempWord = value;

  // Aplicar reglas de reducción (monosílabas)
  if (EXPRESSION_MONOSYLLABIC_ONE.test(tempWord)) {
    count = Math.max(1, count - 1);
  }
  if (EXPRESSION_MONOSYLLABIC_TWO.test(tempWord)) {
    count = Math.max(1, count - 1);
  }

  // Aplicar reglas de aumento (bisílabas)
  if (EXPRESSION_DOUBLE_SYLLABIC_ONE.test(tempWord)) {
    count++;
  }
  if (EXPRESSION_DOUBLE_SYLLABIC_TWO.test(tempWord)) {
    count++;
  }
  if (EXPRESSION_DOUBLE_SYLLABIC_THREE.test(tempWord)) {
    count++;
  }
  if (EXPRESSION_DOUBLE_SYLLABIC_FOUR.test(tempWord)) {
    count++;
  }

  return Math.max(1, count);
}
