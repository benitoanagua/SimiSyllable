import { problematic } from "./problematic.js";
import {
  SPANISH_EXCEPTIONS,
  INDIVISIBLE_ONSETS,
  INDIVISIBLE_CODAS,
} from "./patterns.js";

export function countSyllablesInWord(word: string): number {
  const processedWord = applySpanishExceptions(word.toLowerCase());
  const syllables = splitIntoSyllables(processedWord);
  return syllables.length;
}

function applySpanishExceptions(word: string): string {
  let result = word;
  for (const [pattern, replacement] of SPANISH_EXCEPTIONS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function splitIntoSyllables(word: string): string[] {
  const vowels = "aeiouáéíóú";
  const syllables: string[] = [];
  let currentSyllable = "";
  let i = 0;

  while (i < word.length) {
    const char = word[i];
    const isVowel = vowels.includes(char);

    if (isVowel) {
      if (currentSyllable) {
        syllables.push(currentSyllable);
        currentSyllable = "";
      }

      currentSyllable += char;
      i++;

      // Agregar vocales consecutivas (diptongos/triptongos)
      while (i < word.length && vowels.includes(word[i])) {
        currentSyllable += word[i];
        i++;
      }

      syllables.push(currentSyllable);
      currentSyllable = "";
    } else {
      currentSyllable += char;
      i++;
    }
  }

  if (currentSyllable) {
    syllables.push(currentSyllable);
  }

  return joinSyllables(syllables);
}

function joinSyllables(syllables: string[]): string[] {
  const result: string[] = [];
  let currentOnset = "";

  for (const syllable of syllables) {
    const hasVowel = syllable
      .split("")
      .some((char) => "aeiouáéíóú".includes(char));

    if (hasVowel) {
      if (currentOnset) {
        let onsetToAdd = currentOnset;

        for (const onset of INDIVISIBLE_ONSETS) {
          if (currentOnset.endsWith(onset)) {
            const remaining = currentOnset.slice(0, -onset.length);
            if (remaining && result.length > 0) {
              result[result.length - 1] += remaining;
            }
            onsetToAdd = onset;
            break;
          }
        }

        result.push(onsetToAdd + syllable);
        currentOnset = "";
      } else {
        result.push(syllable);
      }
    } else {
      currentOnset += syllable;
    }
  }

  if (currentOnset && result.length > 0) {
    result[result.length - 1] += currentOnset;
  }

  return result.filter((syl) => syl.length > 0);
}
