import {
  SPANISH_EXCEPTIONS,
  INDIVISIBLE_ONSETS,
  INDIVISIBLE_CODAS,
  SPANISH_DIPHTHONGS,
  SPANISH_TRIPHTHONGS,
  SPANISH_FORCED_HIATUS,
  SPANISH_PREFIX_SYLLABLES,
  SPANISH_SUFFIX_SYLLABLES,
  SPANISH_REDUCING_PATTERNS,
  SPANISH_INCREASING_PATTERNS,
  SPANISH_ACCENT_PATTERNS,
  SPANISH_PROBLEMATIC_PATTERNS,
} from "./patterns.js";

export function countSyllablesInWord(word: string): number {
  let processedWord = word.toLowerCase();

  if (processedWord.length === 0) return 0;
  if (processedWord.length === 1) return 1;

  let syllableCount = 0;

  // Paso 1: Detectar y contar prefijos usando patterns
  const prefixMatch = processedWord.match(
    /^(ante|anti|auto|contra|entre|extra|hiper|inter|multi|para|post|semi|sobre|super|trans|ultra|vice|des|dis|pre|pro|sub|co|de|en|ex|in|re|bi|a)/
  );
  if (prefixMatch) {
    const prefix = prefixMatch[0];
    syllableCount +=
      SPANISH_PREFIX_SYLLABLES[prefix] || countSpanishVowelGroups(prefix);
    processedWord = processedWord.slice(prefix.length);
  }

  // Paso 2: Detectar y contar sufijos usando patterns
  const suffixMatch = processedWord.match(
    /(mente|ísimo|ísima|ción|sión|ando|endo|iendo|able|ible|oso|osa|ero|era|ito|ita|illo|illa|ado|ido|dad|tad|ar|er|ir)$/
  );
  if (suffixMatch) {
    const suffix = suffixMatch[0];
    syllableCount +=
      SPANISH_SUFFIX_SYLLABLES[suffix] || countSpanishVowelGroups(suffix);
    processedWord = processedWord.slice(0, -suffix.length);
  }

  // Paso 3: Aplicar excepciones específicas del español usando patterns
  processedWord = applySpanishExceptions(processedWord);

  // Paso 4: Contar sílabas en la raíz restante
  if (processedWord.length > 0) {
    syllableCount += countSpanishRootSyllables(processedWord);
  }

  // Paso 5: Aplicar ajustes finales usando patterns
  syllableCount = applySpanishPatternAdjustments(word, syllableCount);

  return Math.max(1, syllableCount);
}

function applySpanishExceptions(word: string): string {
  let result = word;

  // Aplicar patterns de excepciones del español
  for (const [pattern, replacement] of SPANISH_EXCEPTIONS) {
    result = result.replace(pattern, replacement);
  }

  return result;
}

function countSpanishVowelGroups(word: string): number {
  // Contar grupos vocálicos básico para prefijos/sufijos
  const vowelGroups = word.match(/[aeiouáéíóúü]+/gi) || [];
  return vowelGroups.length;
}

function countSpanishRootSyllables(word: string): number {
  if (word.length === 0) return 0;

  // Identificar secuencias vocálicas y aplicar reglas de silabeado
  const vocalicSequences = identifyVocalicSequences(word);

  // Procesar usando reglas completas de silabeado español
  let syllableCount = 0;
  for (const sequence of vocalicSequences) {
    syllableCount += analyzeSpanishVocalicSequence(sequence, word);
  }

  return Math.max(1, syllableCount);
}

function analyzeSpanishVocalicSequence(
  sequence: VocalicSequence,
  fullWord: string
): number {
  const sequenceText = sequence.text.toLowerCase();

  // Verificar hiatos forzados usando patterns
  if (SPANISH_FORCED_HIATUS.test(sequenceText)) {
    return sequenceText.length; // Cada vocal es una sílaba separada
  }

  // Verificar triptongos usando patterns
  if (SPANISH_TRIPHTHONGS.test(sequenceText)) {
    return 1; // Todo el triptongo es una sílaba
  }

  // Verificar diptongos usando patterns
  if (SPANISH_DIPHTHONGS.test(sequenceText)) {
    return 1; // Todo el diptongo es una sílaba
  }

  // Aplicar reglas tradicionales para casos no cubiertos por patterns
  return analyzeTraditionalSpanishRules(sequenceText);
}

function analyzeTraditionalSpanishRules(sequence: string): number {
  if (sequence.length === 1) return 1;

  // Clasificar vocales
  const strongVowels = ["a", "e", "o", "á", "é", "ó"];
  const weakVowels = ["i", "u", "í", "ú", "ü"];

  const vowels = sequence.split("");
  const strongCount = vowels.filter((v) => strongVowels.includes(v)).length;
  const weakCount = vowels.filter((v) => weakVowels.includes(v)).length;
  const accentedWeakCount = vowels.filter((v) =>
    ["í", "ú", "ü"].includes(v)
  ).length;

  // Vocal débil acentuada rompe diptongo (hiato)
  if (accentedWeakCount > 0) {
    return vowels.length; // Cada vocal es una sílaba separada
  }

  // Dos vocales fuertes forman hiato
  if (strongCount >= 2) {
    return strongCount;
  }

  // Una fuerte + débiles = diptongo/triptongo (1 sílaba)
  if (strongCount === 1) {
    return 1;
  }

  // Solo vocales débiles: normalmente diptongo
  if (strongCount === 0 && weakCount > 0) {
    if (weakCount === 2) {
      // Casos especiales que forman hiato
      if (sequence === "ii" || sequence === "uu") {
        return 2;
      }
      return 1; // Diptongo normal
    }
    return Math.min(2, weakCount);
  }

  return 1;
}

function applySpanishPatternAdjustments(word: string, count: number): number {
  let adjustedCount = count;

  // Aplicar patterns de reducción
  if (SPANISH_REDUCING_PATTERNS.test(word)) {
    adjustedCount = Math.max(1, adjustedCount - 0.5);
  }

  // Aplicar patterns de aumento
  if (SPANISH_INCREASING_PATTERNS.test(word)) {
    adjustedCount += 1;
  }

  // Verificar patrones problemáticos que requieren análisis especial
  if (SPANISH_PROBLEMATIC_PATTERNS.test(word)) {
    // Análisis conservador para palabras problemáticas
    if (word.length > 10 && adjustedCount < 3) {
      adjustedCount = Math.max(adjustedCount, Math.ceil(word.length / 3.5));
    }
  }

  // Aplicar ajustes usando reglas de consonantes
  adjustedCount = applyConsonantClusterRules(word, adjustedCount);

  // Aplicar ajustes finales para casos especiales
  adjustedCount = applyFinalAdjustments(word, adjustedCount);

  return Math.round(Math.max(1, adjustedCount));
}

function identifyVocalicSequences(word: string): VocalicSequence[] {
  const sequences: VocalicSequence[] = [];
  const vowelPattern = /[aeiouáéíóúü]/gi;
  let match;

  while ((match = vowelPattern.exec(word)) !== null) {
    const startIndex = match.index;
    let endIndex = startIndex;

    // Extender la secuencia para incluir todas las vocales consecutivas
    while (
      endIndex + 1 < word.length &&
      /[aeiouáéíóúü]/i.test(word[endIndex + 1])
    ) {
      endIndex++;
    }

    const sequence = word.slice(startIndex, endIndex + 1);
    sequences.push({
      text: sequence,
      startIndex,
      endIndex,
      syllableCount: analyzeSyllableCount(sequence),
    });

    // Ajustar el índice para continuar después de esta secuencia
    vowelPattern.lastIndex = endIndex + 1;
  }

  return sequences;
}

interface VocalicSequence {
  text: string;
  startIndex: number;
  endIndex: number;
  syllableCount: number;
}

function analyzeSyllableCount(sequence: string): number {
  if (sequence.length === 1) return 1;

  // Clasificar vocales
  const strongVowels = ["a", "e", "o", "á", "é", "ó"];
  const weakVowels = ["i", "u", "í", "ú", "ü"];

  const vowels = sequence.toLowerCase().split("");
  const strongCount = vowels.filter((v) => strongVowels.includes(v)).length;
  const weakCount = vowels.filter((v) => weakVowels.includes(v)).length;
  const accentedWeakCount = vowels.filter((v) =>
    ["í", "ú", "ü"].includes(v)
  ).length;

  // Reglas de silabeado español

  // Regla 1: Vocal débil acentuada rompe diptongo (hiato)
  if (accentedWeakCount > 0) {
    return vowels.length; // Cada vocal es una sílaba separada
  }

  // Regla 2: Dos vocales fuertes forman hiato
  if (strongCount >= 2) {
    return strongCount;
  }

  // Regla 3: Una fuerte + débiles = diptongo/triptongo (1 sílaba)
  if (strongCount === 1) {
    return 1;
  }

  // Regla 4: Solo vocales débiles
  if (strongCount === 0 && weakCount > 0) {
    // Dos vocales débiles normalmente forman diptongo
    if (weakCount === 2) {
      // Casos especiales que forman hiato
      const sequence_lower = sequence.toLowerCase();
      if (sequence_lower === "ii" || sequence_lower === "uu") {
        return 2; // Hiato excepcional
      }
      return 1; // Diptongo normal
    }
    return Math.min(2, weakCount); // Máximo 2 sílabas para secuencias de débiles
  }

  return 1; // Fallback
}

function applyConsonantClusterRules(
  word: string,
  syllableCount: number
): number {
  let adjustedCount = syllableCount;

  // Verificar si hay clusters consonánticos que afecten la división silábica
  // usando patterns de onsets y codas indivisibles

  const consonantClusters = word.match(/[bcdfghjklmnpqrstvwxyz]{2,}/gi) || [];

  for (const cluster of consonantClusters) {
    const lowerCluster = cluster.toLowerCase();

    // Si el cluster contiene onsets indivisibles, no afecta el conteo
    let hasIndivisibleOnset = false;
    for (const onset of INDIVISIBLE_ONSETS) {
      if (lowerCluster.includes(onset)) {
        hasIndivisibleOnset = true;
        break;
      }
    }

    // Si el cluster contiene codas indivisibles, no afecta el conteo
    let hasIndivisibleCoda = false;
    for (const coda of INDIVISIBLE_CODAS) {
      if (lowerCluster.includes(coda)) {
        hasIndivisibleCoda = true;
        break;
      }
    }

    // Si hay clusters complejos sin onsets/codas reconocidos,
    // podría indicar división silábica adicional
    if (
      !hasIndivisibleOnset &&
      !hasIndivisibleCoda &&
      lowerCluster.length > 2
    ) {
      // Aplicar reglas conservadoras de división consonántica
      if (lowerCluster.length >= 4) {
        adjustedCount += 0.5; // Ajuste conservador
      }
    }
  }

  return Math.max(1, Math.round(adjustedCount));
}

function applyFinalAdjustments(word: string, syllables: number): number {
  let adjustedSyllables = syllables;

  // Ajustes para palabras específicas sin usar lista problemática

  // Palabras muy cortas
  if (word.length <= 2) {
    return 1;
  }

  // Palabras con patrones conocidos

  // Terminaciones que suelen agregar sílabas
  if (word.endsWith("mente")) {
    // Adverbios en -mente: contar la raíz + mente
    const root = word.slice(0, -5);
    const rootSyllables = countSyllablesInWord(root); // Recursive call
    return rootSyllables + 2; // 'men-te' = 2 sílabas
  }

  // Superlativos en -ísimo
  if (word.endsWith("ísimo") || word.endsWith("ísima")) {
    const root = word.slice(0, -6);
    const rootSyllables = countSyllablesInWord(root); // Recursive call
    return rootSyllables + 3; // 'í-si-mo' = 3 sílabas
  }

  // Verificación de coherencia: palabras muy largas
  if (word.length > 8 && adjustedSyllables < 3) {
    // Es poco probable que una palabra larga tenga tan pocas sílabas
    adjustedSyllables = Math.max(adjustedSyllables, Math.ceil(word.length / 3));
  }

  // Verificación mínima: toda palabra tiene al menos una sílaba
  if (adjustedSyllables === 0) {
    adjustedSyllables = 1;
  }

  return adjustedSyllables;
}

// Función auxiliar para debugging (opcional)
export function debugSyllableCount(word: string): {
  syllables: number;
  sequences: VocalicSequence[];
  analysis: string;
} {
  const sequences = identifyVocalicSequences(word);
  const syllables = countSyllablesInWord(word);

  const analysis = sequences
    .map((seq) => `${seq.text}(${seq.syllableCount})`)
    .join(" + ");

  return {
    syllables,
    sequences,
    analysis,
  };
}
