import { sanitizeSpanishWord, isEmptyWord } from "./utils.js";

/**
 * Silabeador español – jsESsyllable adaptado a ES modules
 * Basado en https://github.com/cubiwan/jsESlanguage
 */

/* ----------  Paso 1: Patrones de división inicial ---------- */
const regexStep1: RegExp[] = [];
const cutPositionsStep1: number[] = [];

regexStep1.push(/^[aeiouáéíóúüñ]+$/); // monosílabo vocal (escape rápido)
cutPositionsStep1.push(-1);

regexStep1.push(/^[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/);
cutPositionsStep1.push(0);

regexStep1.push(/^[^aeiouáéíóúüñ][aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/);
cutPositionsStep1.push(0);

regexStep1.push(/^[^aeiouáéíóúüñ]{2}[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/);
cutPositionsStep1.push(1);

regexStep1.push(/^[^aeiouáéíóúüñ]{3}[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/);
cutPositionsStep1.push(2);

regexStep1.push(/^[^aeiouáéíóúüñ]{4}[aeiouáéíóúüñ]+([^aeiouáéíóúüñ]|$)/);
cutPositionsStep1.push(3);

regexStep1.push(/^[^aeiouáéíóúüñ]+$/);
cutPositionsStep1.push(-1);

/* ----------  Paso 2: Patrones de división de vocales ---------- */
const regexStep2: RegExp[] = [];
const cutPositionsStep2: number[] = [];

regexStep2.push(/[aeoáéó][aeoáéó]/); // Dos vocales fuertes = hiato
cutPositionsStep2.push(1);

regexStep2.push(/[íú][aeo]/); // Vocal débil tónica + fuerte = hiato
cutPositionsStep2.push(1);

regexStep2.push(/[aeo][íú]/); // Vocal fuerte + débil tónica = hiato
cutPositionsStep2.push(1);

regexStep2.push(/[iuüíú][aeoáéó][aeoáéó]/); // Débil + fuerte + fuerte
cutPositionsStep2.push(2);

regexStep2.push(/[aeoáéó][aeoáéó][iuüíú]/); // Fuerte + fuerte + débil
cutPositionsStep2.push(1);

regexStep2.push(/.*/); // Caso por defecto: no dividir
cutPositionsStep2.push(-1);

/**
 * Divide una palabra en sílabas usando el algoritmo español
 */
export function divideIntoSyllables(word: string): string[] {
  const cleanWord = sanitizeSpanishWord(word.trim());

  if (isEmptyWord(cleanWord)) {
    return [];
  }

  const syllables: string[] = [];
  const finalSyllables: string[] = [];
  let head = "";
  let remainingWord = cleanWord;
  let securityBreak = 0;
  let isComplete = false;

  // Paso 1: División inicial basada en patrones consonánticos
  while (!isComplete) {
    ++securityBreak;
    if (securityBreak > 50) {
      throw new Error(`Infinite loop detected on word: ${word}`);
    }

    let patternMatched = false;

    for (let i = 0; i < regexStep1.length; i++) {
      const match = remainingWord.match(regexStep1[i]);
      if (match) {
        patternMatched = true;
        const matchedText = match[0];
        let cutPosition = cutPositionsStep1[i];

        if (cutPosition < 0) {
          // Agregar última sílaba y terminar
          syllables.push(head + matchedText);
          isComplete = true;
        } else {
          // Ajustar posición de corte para consonantes líquidas y h
          const cutChar = matchedText[cutPosition];
          if (cutChar === "r" || cutChar === "l" || cutChar === "h") {
            --cutPosition;
          }
          if (cutPosition < 0) cutPosition = 0;

          // Dividir y continuar
          syllables.push(head + matchedText.slice(0, cutPosition));
          head = matchedText.slice(cutPosition, -1);
        }

        remainingWord = remainingWord.slice(matchedText.length - 1);
        break;
      }
    }

    if (!patternMatched) {
      // Caso extremo: agregar lo que quede
      syllables.push(head + remainingWord);
      break;
    }
  }

  // Paso 2: División de secuencias vocálicas (diptongos, hiatos)
  for (const syllable of syllables) {
    if (!syllable) continue;

    for (let i = 0; i < regexStep2.length; i++) {
      const match = syllable.match(regexStep2[i]);
      if (match) {
        const cutPosition = cutPositionsStep2[i];
        if (cutPosition < 0) {
          // No dividir esta sílaba
          finalSyllables.push(syllable);
        } else {
          // Dividir en la posición indicada
          const splitPosition = (match.index ?? 0) + cutPosition;
          finalSyllables.push(
            syllable.slice(0, splitPosition),
            syllable.slice(splitPosition)
          );
        }
        break;
      }
    }
  }

  return finalSyllables.filter(Boolean);
}

/**
 * Cuenta el número de sílabas en una palabra española
 */
export function countSyllablesInWord(word: string): number {
  return divideIntoSyllables(word).length;
}
