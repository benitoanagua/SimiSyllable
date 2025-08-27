import {
  ENGLISH_SYLLABLE_PATTERNS,
  SYLLABLE_EXCEPTIONS,
  SILENT_LETTER_PATTERNS,
} from "./patterns.js";
import { analyzeVowelGroup, isVowel } from "./vowelClassifier.js";
import { normalizeEnglishWord, isEmpty } from "./normalizer.js";
import { applyPhoneticAdjustments } from "./phoneticPatterns.js";

/**
 * Divide una palabra inglesa en sílabas usando aproximación fonética
 */
export function divideIntoSyllablesEn(word: string): string[] {
  const cleanWord = normalizeEnglishWord(word);

  if (isEmpty(cleanWord)) {
    return [];
  }

  // Verificar excepciones primero
  const exception = SYLLABLE_EXCEPTIONS.get(cleanWord);
  if (exception !== undefined) {
    return [cleanWord]; // Devolver como monosílabo
  }

  // Eliminar letras silenciosas
  const phoneticWord = removeSilentLetters(cleanWord);

  // Aplicar patrones de división
  const syllables = applySyllablePatterns(phoneticWord);

  // Ajustar basado en análisis de grupos vocálicos
  return adjustSyllablesByVowelAnalysis(syllables);
}

/**
 * Elimina letras silenciosas de la palabra
 */
function removeSilentLetters(word: string): string {
  let result = word;

  for (const pattern of SILENT_LETTER_PATTERNS) {
    if (pattern.pattern.test(result)) {
      for (const letter of pattern.letters) {
        result = result.replace(new RegExp(letter, "g"), "");
      }
    }
  }

  return result || word; // Si queda vacío, usar la original
}

/**
 * Aplica patrones de división silábica
 */
function applySyllablePatterns(word: string): string[] {
  const syllables: string[] = [];
  let remaining = word;

  // Ordenar patrones por prioridad (mayor primero)
  const sortedPatterns = [...ENGLISH_SYLLABLE_PATTERNS].sort(
    (a, b) => b.priority - a.priority
  );

  while (remaining.length > 0) {
    if (remaining.length <= 3) {
      syllables.push(remaining);
      break;
    }

    let patternMatched = false;

    for (const pattern of sortedPatterns) {
      const match = remaining.match(pattern.regex);
      if (match) {
        patternMatched = true;
        const matchedText = match[0];

        if (pattern.cutPosition === -1) {
          // Patrón especial (como palabras compuestas)
          const parts = matchedText.split("-");
          syllables.push(...parts.filter((p) => p));
          remaining = remaining.slice(matchedText.length);
        } else {
          const cutPos =
            pattern.cutPosition > 0
              ? pattern.cutPosition
              : matchedText.length + pattern.cutPosition;

          const firstPart = matchedText.slice(0, cutPos);
          const secondPart = matchedText.slice(cutPos);

          if (firstPart) syllables.push(firstPart);
          remaining = secondPart + remaining.slice(matchedText.length);
        }
        break;
      }
    }

    if (!patternMatched) {
      // Si no coincide ningún patrón, dividir usando enfoque heurístico
      const divisionPoint = findHeuristicDivisionPoint(remaining);
      syllables.push(remaining.slice(0, divisionPoint));
      remaining = remaining.slice(divisionPoint);
    }
  }

  return syllables.filter((s) => s.length > 0);
}

/**
 * Encuentra un punto de división heurístico
 */
function findHeuristicDivisionPoint(word: string): number {
  // Preferir dividir después de una vocal
  for (let i = Math.min(3, word.length - 1); i > 0; i--) {
    if (isVowel(word[i]) && !isVowel(word[i + 1])) {
      return i + 1;
    }
  }

  // Dividir por la mitad como fallback
  return Math.floor(word.length / 2);
}

/**
 * Ajusta las sílabas basado en análisis de grupos vocálicos
 */
function adjustSyllablesByVowelAnalysis(syllables: string[]): string[] {
  const result: string[] = [];

  for (const syllable of syllables) {
    // Encontrar secuencias de vocales en la sílaba
    const vowelSequences: Array<{ start: number; end: number; text: string }> =
      [];
    let inVowelSequence = false;
    let sequenceStart = 0;

    for (let i = 0; i < syllable.length; i++) {
      const char = syllable[i];
      const isCurrentVowel = isVowel(char);

      if (isCurrentVowel && !inVowelSequence) {
        inVowelSequence = true;
        sequenceStart = i;
      } else if (!isCurrentVowel && inVowelSequence) {
        vowelSequences.push({
          start: sequenceStart,
          end: i - 1,
          text: syllable.slice(sequenceStart, i),
        });
        inVowelSequence = false;
      }
    }

    if (inVowelSequence) {
      vowelSequences.push({
        start: sequenceStart,
        end: syllable.length - 1,
        text: syllable.slice(sequenceStart),
      });
    }

    // Si no hay grupos vocálicos complejos, mantener la sílaba intacta
    if (vowelSequences.length === 0) {
      result.push(syllable);
      continue;
    }

    // Analizar cada grupo vocálico
    let currentPos = 0;
    for (const sequence of vowelSequences) {
      // Añadir consonantes antes del grupo vocálico
      if (sequence.start > currentPos) {
        result.push(syllable.slice(currentPos, sequence.start));
      }

      // Analizar el grupo vocálico
      const analysis = analyzeVowelGroup(sequence.text);

      if (analysis.syllableCount === 1) {
        // Grupo vocálico forma una sílaba
        result.push(sequence.text);
      } else {
        // Dividir el grupo vocálico en sílabas separadas
        for (let i = 0; i < sequence.text.length; i++) {
          result.push(sequence.text[i]);
        }
      }

      currentPos = sequence.end + 1;
    }

    // Añadir consonantes finales después del último grupo vocálico
    if (currentPos < syllable.length) {
      result.push(syllable.slice(currentPos));
    }
  }

  return result;
}
