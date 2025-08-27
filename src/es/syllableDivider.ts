import {
  CONSONANT_PATTERNS,
  LIQUID_CONSONANTS,
  SPECIAL_CONSONANTS,
} from "./patterns.js";
import { analyzeVowelGroup, isVowel } from "./vowelClassifier.js";
import { normalizeSpanishWord, isEmpty } from "./normalizer.js";
import { isStrongVowel } from "./vowelClassifier.js";

/**
 * Divide una palabra española en sílabas usando análisis avanzado de vocales
 */
export function divideIntoSyllables(word: string): string[] {
  const cleanWord = normalizeSpanishWord(word);

  if (isEmpty(cleanWord)) {
    return [];
  }

  // Paso 1: División inicial por consonantes
  const initialSyllables = divideByConsonants(cleanWord);

  // Paso 2: Análisis y división de grupos vocálicos
  const finalSyllables: string[] = [];

  for (const syllable of initialSyllables) {
    if (!syllable) continue;

    const vowelDivision = analyzeAndDivideVowels(syllable);
    finalSyllables.push(...vowelDivision);
  }

  return finalSyllables.filter(Boolean);
}

function divideByConsonants(word: string): string[] {
  const syllables: string[] = [];
  let head = "";
  let remainingWord = word;
  let securityBreak = 0;

  while (remainingWord.length > 0) {
    if (++securityBreak > 50) {
      throw new Error(`Infinite loop detected on word: ${word}`);
    }

    let patternMatched = false;

    for (const pattern of CONSONANT_PATTERNS) {
      const match = remainingWord.match(pattern.regex);
      if (match) {
        patternMatched = true;
        const matchedText = match[0];
        let cutPosition = pattern.cutPosition;

        if (cutPosition < 0) {
          // Última sílaba
          syllables.push(head + matchedText);
          remainingWord = "";
          break;
        }

        // Ajustar corte para consonantes especiales
        cutPosition = adjustCutPosition(matchedText, cutPosition);

        // Dividir y continuar
        syllables.push(head + matchedText.slice(0, cutPosition));
        head = matchedText.slice(cutPosition, -1);
        remainingWord = remainingWord.slice(matchedText.length - 1);
        break;
      }
    }

    if (!patternMatched) {
      syllables.push(head + remainingWord);
      break;
    }
  }

  return syllables;
}

function adjustCutPosition(text: string, position: number): number {
  if (position >= text.length) return position;

  const cutChar = text[position];

  // Ajustar para consonantes líquidas y h
  if (LIQUID_CONSONANTS.has(cutChar) || SPECIAL_CONSONANTS.has(cutChar)) {
    position--;
  }

  return Math.max(0, position);
}

function analyzeAndDivideVowels(syllable: string): string[] {
  // Encontrar secuencias de vocales en la sílaba
  const vowelSequences: Array<{ start: number; end: number; text: string }> =
    [];
  let inVowelSequence = false;
  let sequenceStart = 0;

  for (let i = 0; i < syllable.length; i++) {
    const char = syllable[i];
    const isCurrentVowel = isVowel(char);

    if (isCurrentVowel && !inVowelSequence) {
      // Inicio de secuencia de vocales
      inVowelSequence = true;
      sequenceStart = i;
    } else if (!isCurrentVowel && inVowelSequence) {
      // Fin de secuencia de vocales
      vowelSequences.push({
        start: sequenceStart,
        end: i - 1,
        text: syllable.slice(sequenceStart, i),
      });
      inVowelSequence = false;
    }
  }

  // Si la palabra termina en vocal
  if (inVowelSequence) {
    vowelSequences.push({
      start: sequenceStart,
      end: syllable.length - 1,
      text: syllable.slice(sequenceStart),
    });
  }

  // Si no hay vocales o solo una secuencia simple, devolver como está
  if (vowelSequences.length <= 1) {
    const sequence = vowelSequences[0];
    if (!sequence || sequence.text.length <= 1) {
      return [syllable];
    }

    const analysis = analyzeVowelGroup(sequence.text);
    if (analysis.syllableCount === 1) {
      return [syllable];
    }
  }

  // Dividir según el análisis de vocales
  return divideSyllableByVowelAnalysis(syllable, vowelSequences);
}

function divideSyllableByVowelAnalysis(
  syllable: string,
  vowelSequences: Array<{ start: number; end: number; text: string }>
): string[] {
  const result: string[] = [];

  for (const sequence of vowelSequences) {
    const analysis = analyzeVowelGroup(sequence.text);

    if (analysis.syllableCount === 1) {
      // No dividir esta secuencia
      continue;
    }

    // Dividir la sílaba en la posición de la vocal acentuada o fuerte
    const splitPositions = findSplitPositions(sequence.text);

    if (splitPositions.length > 0) {
      let currentPos = 0;
      const beforeSequence = syllable.slice(0, sequence.start);
      const afterSequence = syllable.slice(sequence.end + 1);

      for (let i = 0; i < splitPositions.length; i++) {
        const splitPos = splitPositions[i];
        const part = sequence.text.slice(currentPos, splitPos);

        if (i === 0) {
          result.push(beforeSequence + part);
        } else {
          result.push(part);
        }

        currentPos = splitPos;
      }

      // Última parte
      const lastPart = sequence.text.slice(currentPos);
      if (afterSequence) {
        result.push(lastPart + afterSequence);
      } else {
        result.push(lastPart);
      }

      return result;
    }
  }

  return [syllable];
}

function findSplitPositions(vowelGroup: string): number[] {
  const positions: number[] = [];

  for (let i = 0; i < vowelGroup.length - 1; i++) {
    const current = vowelGroup[i];
    const next = vowelGroup[i + 1];

    // Dividir después de vocal acentuada débil
    if (current === "í" || current === "ú") {
      positions.push(i + 1);
    }
    // Dividir antes de vocal acentuada débil
    else if (next === "í" || next === "ú") {
      positions.push(i + 1);
    }
    // Dividir entre dos vocales fuertes
    else if (isStrongVowel(current) && isStrongVowel(next)) {
      positions.push(i + 1);
    }
  }

  return positions;
}
