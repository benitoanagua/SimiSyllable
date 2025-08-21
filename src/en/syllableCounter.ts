import {
  SILENT_E_PATTERNS,
  SYLLABIC_L_PATTERNS,
  DIPHTHONG_PATTERNS,
  HIATUS_PATTERNS,
  PREFIX_SYLLABLES,
  SUFFIX_SYLLABLES,
  PRONOUNCED_ED_PATTERNS,
  SYLLABIC_CONSONANT_PATTERNS,
  SYLLABLE_REDUCING_PATTERNS,
  SYLLABLE_INCREASING_PATTERNS,
  // Legacy patterns for fallback
  EXPRESSION_MONOSYLLABIC_ONE,
  EXPRESSION_MONOSYLLABIC_TWO,
  EXPRESSION_DOUBLE_SYLLABIC_ONE,
  EXPRESSION_DOUBLE_SYLLABIC_TWO,
  EXPRESSION_DOUBLE_SYLLABIC_THREE,
  EXPRESSION_DOUBLE_SYLLABIC_FOUR,
} from "./patterns.js";

export function countSyllablesInWord(word: string): number {
  const cleanWord = word.toLowerCase().replace(/['']/g, "");

  if (cleanWord.length === 0) return 0;
  if (cleanWord.length <= 2) return 1;

  let syllableCount = 0;
  let processedWord = cleanWord;

  // 1. Detectar y contar prefijos usando patterns
  const prefixMatch = processedWord.match(
    /^(un|re|pre|dis|mis|over|out|up|under|anti|auto|co|de|ex|fore|inter|multi|non|post|pro|semi|sub|super|trans|ultra)/
  );
  if (prefixMatch) {
    const prefix = prefixMatch[0];
    syllableCount += PREFIX_SYLLABLES[prefix] || countBasicVowelGroups(prefix);
    processedWord = processedWord.slice(prefix.length);
  }

  // 2. Detectar y contar sufijos usando patterns
  const suffixMatch = processedWord.match(
    /(ology|ography|ometry|tion|sion|able|ible|eous|ious|ness|ment|ing|ed|er|est|ly|ful|less|ward|wise|like|ism|ist|ize|ise|ous)$/
  );
  if (suffixMatch) {
    const suffix = suffixMatch[0];
    const suffixSyllables = getSuffixSyllableCount(suffix, processedWord);
    syllableCount += suffixSyllables;
    processedWord = processedWord.slice(0, -suffix.length);
  }

  // 3. Contar sílabas en la raíz restante
  if (processedWord.length > 0) {
    syllableCount += countRootSyllables(processedWord);
  }

  // 4. Aplicar ajustes basados en patrones específicos del word completo
  syllableCount = applyPatternAdjustments(cleanWord, syllableCount);

  return Math.max(1, syllableCount);
}

function countBasicVowelGroups(word: string): number {
  // Contar grupos de vocales básico para prefijos/sufijos
  const vowelGroups = word.match(/[aeiouy]+/gi) || [];
  return vowelGroups.length;
}

function getSuffixSyllableCount(suffix: string, remainingWord: string): number {
  // Usar patterns para determinar syllable count de sufijos
  if (SUFFIX_SYLLABLES[suffix]) {
    let count = SUFFIX_SYLLABLES[suffix];

    // Casos especiales usando patterns
    if (suffix === "ed") {
      // 'ed' es silábico después de 't' o 'd' usando pattern
      return PRONOUNCED_ED_PATTERNS.test(remainingWord + suffix) ? 1 : 0;
    }

    return count;
  }

  // Fallback a conteo básico
  return countBasicVowelGroups(suffix);
}

function countRootSyllables(word: string): number {
  if (word.length === 0) return 0;

  let count = 0;
  let i = 0;

  // Análisis usando patterns mejorados
  while (i < word.length) {
    const char = word[i];

    if (/[aeiouy]/.test(char)) {
      count++;

      // Manejar secuencias vocálicas usando patterns
      if (i < word.length - 1) {
        const nextChar = word[i + 1];
        if (/[aeiouy]/.test(nextChar)) {
          const vowelPair = char + nextChar;

          // Verificar si es diptongo usando pattern
          if (DIPHTHONG_PATTERNS.test(vowelPair)) {
            i++; // Skip next vowel, es un diptongo (1 sílaba)
          }
          // Verificar si es hiato usando pattern
          else if (HIATUS_PATTERNS.test(vowelPair)) {
            // No skip, será contado como sílaba separada
          } else {
            // Análisis contextual para casos ambiguos
            const context = word.slice(Math.max(0, i - 1), i + 3);
            if (isLikelyHiatus(context, i)) {
              // No skip, hiato
            } else {
              i++; // Skip, probable diptongo
            }
          }
        }
      }
    }
    i++;
  }

  // Aplicar ajustes usando patterns
  count = applyRootPatternAdjustments(word, count);

  return Math.max(1, count);
}

function isLikelyHiatus(context: string, position: number): boolean {
  // Análisis contextual para determinar hiatos en inglés
  // En inglés, los hiatos son menos comunes que en español
  const strongVowels = ["a", "e", "o"];
  const weakVowels = ["i", "u"];

  if (position < context.length - 1) {
    const current = context[position];
    const next = context[position + 1];

    // Casos específicos del inglés donde suele haber hiato
    const vowelPair = current + next;

    // Patrones como "ia" en "media", "io" en "radio"
    if (["ia", "io", "ua", "uo"].includes(vowelPair)) {
      // Verificar contexto: si está al final o seguido de consonante, probable hiato
      const nextIndex = position + 1;
      if (
        nextIndex === context.length - 1 ||
        (nextIndex < context.length - 1 &&
          /[bcdfghjklmnpqrstvwxyz]/.test(context[nextIndex + 1]))
      ) {
        return true;
      }
    }

    // Dos vocales fuertes generalmente forman hiato
    if (strongVowels.includes(current) && strongVowels.includes(next)) {
      return true;
    }
  }

  return false;
}

function applyRootPatternAdjustments(word: string, count: number): number {
  let adjustedCount = count;

  // Silent E usando pattern
  if (SILENT_E_PATTERNS.test(word) && adjustedCount > 0) {
    adjustedCount = Math.max(1, adjustedCount - 1);
  }

  // Syllabic L usando pattern
  if (SYLLABIC_L_PATTERNS.test(word)) {
    adjustedCount++;
  }

  // Syllabic consonants usando pattern
  if (SYLLABIC_CONSONANT_PATTERNS.test(word)) {
    adjustedCount += 0.5; // Ajuste conservador
  }

  return Math.round(adjustedCount);
}

function applyPatternAdjustments(word: string, count: number): number {
  let adjustedCount = count;

  // Aplicar patterns de reducción
  if (SYLLABLE_REDUCING_PATTERNS.test(word)) {
    adjustedCount = Math.max(1, adjustedCount - 0.5);
  }

  // Aplicar patterns de aumento
  if (SYLLABLE_INCREASING_PATTERNS.test(word)) {
    adjustedCount += 1;
  }

  // Aplicar patterns legacy como fallback para casos no cubiertos
  let legacyAdjustment = 0;

  if (
    EXPRESSION_MONOSYLLABIC_ONE.test(word) ||
    EXPRESSION_MONOSYLLABIC_TWO.test(word)
  ) {
    legacyAdjustment = Math.max(1, adjustedCount - 1) - adjustedCount;
  }

  if (
    EXPRESSION_DOUBLE_SYLLABIC_ONE.test(word) ||
    EXPRESSION_DOUBLE_SYLLABIC_TWO.test(word) ||
    EXPRESSION_DOUBLE_SYLLABIC_THREE.test(word) ||
    EXPRESSION_DOUBLE_SYLLABIC_FOUR.test(word)
  ) {
    legacyAdjustment = Math.max(legacyAdjustment, 1);
  }

  adjustedCount += legacyAdjustment;

  // Verificación final de coherencia
  if (word.length > 8 && adjustedCount < 2) {
    adjustedCount = Math.max(adjustedCount, Math.ceil(word.length / 4));
  }

  // Casos especiales para palabras inglesas comunes
  adjustedCount = applyEnglishSpecialCases(word, adjustedCount);

  return Math.round(Math.max(1, adjustedCount));
}

function applyEnglishSpecialCases(word: string, count: number): number {
  let adjustedCount = count;

  // Casos especiales de palabras inglesas problemáticas

  // Palabras con 'y' como vocal
  if (word.includes("y") && /[bcdfghjklmnpqrstvwxz]y/.test(word)) {
    // 'y' después de consonante suele ser vocal
    const yMatches = word.match(/[bcdfghjklmnpqrstvwxz]y/g) || [];
    for (const match of yMatches) {
      if (word.endsWith(match)) {
        // 'y' al final después de consonante es generalmente una sílaba
        // Ya debería estar contada, pero verificar
      }
    }
  }

  // Palabras terminadas en -le después de consonante
  if (/[bcdfghjklmnpqrstvwxyz]le$/.test(word)) {
    // Estas forman sílaba silábica, ya manejado en SYLLABIC_L_PATTERNS
    // pero verificar coherencia
    if (word.length > 4 && adjustedCount < 2) {
      adjustedCount = Math.max(2, adjustedCount);
    }
  }

  // Palabras con secuencias vocálicas complejas
  if (/[aeiou]{3,}/.test(word)) {
    // Secuencias largas de vocales pueden indicar múltiples sílabas
    const longVowelSequences = word.match(/[aeiou]{3,}/g) || [];
    for (const sequence of longVowelSequences) {
      if (sequence.length >= 3) {
        // Análisis conservador: al menos 2 sílabas para secuencias de 3+ vocales
        adjustedCount = Math.max(adjustedCount, 2);
      }
    }
  }

  // Prefijos y sufijos complejos no capturados
  if (
    word.startsWith("anti") ||
    word.startsWith("auto") ||
    word.startsWith("inter") ||
    word.startsWith("super")
  ) {
    if (adjustedCount < 3 && word.length > 8) {
      adjustedCount = Math.max(3, adjustedCount);
    }
  }

  // Terminaciones científicas/técnicas
  if (
    word.endsWith("ology") ||
    word.endsWith("ography") ||
    word.endsWith("ometry")
  ) {
    const root = word.slice(
      0,
      word.lastIndexOf("ology") ||
        word.lastIndexOf("ography") ||
        word.lastIndexOf("ometry")
    );
    const rootSyllables = countBasicVowelGroups(root);
    const suffixSyllables = 3; // -ology, -ography, -ometry = 3 sílabas
    adjustedCount = rootSyllables + suffixSyllables;
  }

  // Contracciones comunes
  if (word.includes("'")) {
    // Las contracciones generalmente no cambian el conteo base
    // pero verificar casos especiales
    if (
      word.endsWith("'t") ||
      word.endsWith("'s") ||
      word.endsWith("'re") ||
      word.endsWith("'ve")
    ) {
      // Estas contracciones no suelen agregar sílabas
    }
  }

  // Palabras compuestas obvias
  const compoundIndicators = ["every", "some", "any"];
  for (const indicator of compoundIndicators) {
    if (word.startsWith(indicator)) {
      const indicatorSyllables = countBasicVowelGroups(indicator);
      const remainder = word.slice(indicator.length);
      const remainderSyllables = countBasicVowelGroups(remainder);
      adjustedCount = Math.max(
        adjustedCount,
        indicatorSyllables + remainderSyllables
      );
    }
  }

  return adjustedCount;
}

// Función auxiliar para debugging (opcional)
export function debugEnglishSyllableCount(word: string): {
  syllables: number;
  breakdown: {
    prefix?: { text: string; syllables: number };
    root: { text: string; syllables: number };
    suffix?: { text: string; syllables: number };
  };
  patterns: {
    silentE: boolean;
    syllabicL: boolean;
    diphthongs: string[];
    hiatus: string[];
  };
  adjustments: string[];
} {
  const cleanWord = word.toLowerCase().replace(/['']/g, "");
  const syllables = countSyllablesInWord(word);

  // Análisis detallado
  const breakdown: any = { root: { text: cleanWord, syllables: 0 } };
  const patterns: any = {
    silentE: SILENT_E_PATTERNS.test(cleanWord),
    syllabicL: SYLLABIC_L_PATTERNS.test(cleanWord),
    diphthongs: [],
    hiatus: [],
  };
  const adjustments: string[] = [];

  // Detectar prefijos
  const prefixMatch = cleanWord.match(
    /^(un|re|pre|dis|mis|over|out|up|under|anti|auto|co|de|ex|fore|inter|multi|non|post|pro|semi|sub|super|trans|ultra)/
  );
  if (prefixMatch) {
    const prefix = prefixMatch[0];
    breakdown.prefix = {
      text: prefix,
      syllables: PREFIX_SYLLABLES[prefix] || countBasicVowelGroups(prefix),
    };
  }

  // Detectar sufijos
  const suffixMatch = cleanWord.match(
    /(ology|ography|ometry|tion|sion|able|ible|eous|ious|ness|ment|ing|ed|er|est|ly|ful|less|ward|wise|like|ism|ist|ize|ise|ous)$/
  );
  if (suffixMatch) {
    const suffix = suffixMatch[0];
    breakdown.suffix = {
      text: suffix,
      syllables: getSuffixSyllableCount(
        suffix,
        cleanWord.slice(0, -suffix.length)
      ),
    };
  }

  // Detectar patrones vocálicos
  const vowelPairs = cleanWord.match(/[aeiouy]{2,}/gi) || [];
  for (const pair of vowelPairs) {
    if (DIPHTHONG_PATTERNS.test(pair)) {
      patterns.diphthongs.push(pair);
    }
    if (HIATUS_PATTERNS.test(pair)) {
      patterns.hiatus.push(pair);
    }
  }

  // Detectar ajustes aplicados
  if (SYLLABLE_REDUCING_PATTERNS.test(cleanWord)) {
    adjustments.push("reducing pattern");
  }
  if (SYLLABLE_INCREASING_PATTERNS.test(cleanWord)) {
    adjustments.push("increasing pattern");
  }
  if (patterns.silentE) {
    adjustments.push("silent E");
  }
  if (patterns.syllabicL) {
    adjustments.push("syllabic L");
  }

  return {
    syllables,
    breakdown,
    patterns,
    adjustments,
  };
}
