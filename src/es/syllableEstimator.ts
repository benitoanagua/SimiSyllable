import { SYLLABLE_EXCEPTIONS, CONSONANT_CLUSTERS } from "./patterns.js";
import { analyzeVowelGroup, isVowel } from "./vowelClassifier.js";

/**
 * Estimación principal de sílabas para español
 */
export function estimateSyllables(word: string): number {
  if (!word || word.length === 0) return 0;

  // Verificar excepciones primero
  if (SYLLABLE_EXCEPTIONS.has(word)) {
    return SYLLABLE_EXCEPTIONS.get(word)!;
  }

  let syllableCount = 0;
  let i = 0;

  while (i < word.length) {
    if (isVowel(word[i])) {
      // Encontrar todo el grupo vocálico
      let vowelGroup = "";
      while (i < word.length && isVowel(word[i])) {
        vowelGroup += word[i];
        i++;
      }

      // Analizar el grupo vocálico
      const analysis = analyzeVowelGroup(vowelGroup);
      syllableCount += analysis.syllableCount;
    } else {
      i++;
    }
  }

  return Math.max(1, syllableCount);
}

/**
 * Divide consonantes entre sílabas según las reglas del español
 */
function divideConsonants(consonants: string): {
  withCurrent: string;
  withNext: string;
} {
  if (consonants.length === 0) {
    return { withCurrent: "", withNext: "" };
  }

  if (consonants.length === 1) {
    // Una consonante va con la siguiente sílaba
    return { withCurrent: "", withNext: consonants };
  }

  if (consonants.length === 2) {
    // Verificar si es un grupo consonántico inseparable
    if (CONSONANT_CLUSTERS.includes(consonants)) {
      return { withCurrent: "", withNext: consonants };
    } else {
      // Separar consonantes
      return { withCurrent: consonants[0], withNext: consonants[1] };
    }
  }

  // Tres o más consonantes
  const lastTwo = consonants.slice(-2);
  if (CONSONANT_CLUSTERS.includes(lastTwo)) {
    // Las dos últimas forman grupo inseparable
    return {
      withCurrent: consonants.slice(0, -2),
      withNext: lastTwo,
    };
  } else {
    // Dejar una consonante con la siguiente sílaba
    return {
      withCurrent: consonants.slice(0, -1),
      withNext: consonants.slice(-1),
    };
  }
}

/**
 * División silábica principal para español
 */
export function divideSyllables(word: string): string[] {
  if (!word || word.length <= 1) {
    return [word];
  }

  const syllables: string[] = [];
  let currentSyllable = "";
  let i = 0;

  while (i < word.length) {
    const char = word[i];

    if (!isVowel(char)) {
      // Es consonante
      currentSyllable += char;
      i++;
    } else {
      // Es vocal - recoger todo el grupo vocálico
      let vowelGroup = "";
      let vowelStart = i;

      while (i < word.length && isVowel(word[i])) {
        vowelGroup += word[i];
        i++;
      }

      const analysis = analyzeVowelGroup(vowelGroup);

      if (analysis.type === "hiatus") {
        // Separar cada vocal del hiato
        const vowelArray = vowelGroup.split("");

        // Primera vocal con consonantes acumuladas
        currentSyllable += vowelArray[0];
        syllables.push(currentSyllable);

        // Vocales intermedias como sílabas independientes
        for (let j = 1; j < vowelArray.length - 1; j++) {
          syllables.push(vowelArray[j]);
        }

        // Última vocal inicia nueva sílaba
        if (vowelArray.length > 1) {
          currentSyllable = vowelArray[vowelArray.length - 1];
        } else {
          currentSyllable = "";
        }
      } else {
        // Diptongo, triptongo o vocal simple - mantener junto
        currentSyllable += vowelGroup;
      }

      // Manejar consonantes que siguen
      if (i < word.length) {
        let consonants = "";
        let consonantStart = i;

        // Recoger todas las consonantes hasta la siguiente vocal o final
        while (i < word.length && !isVowel(word[i])) {
          consonants += word[i];
          i++;
        }

        if (i >= word.length) {
          // Final de palabra - todas las consonantes van con la sílaba actual
          currentSyllable += consonants;
        } else {
          // Hay más vocales - dividir consonantes
          const division = divideConsonants(consonants);
          currentSyllable += division.withCurrent;

          // Solo agregar sílaba si tiene contenido
          if (currentSyllable.trim().length > 0) {
            syllables.push(currentSyllable);
          }

          currentSyllable = division.withNext;
        }
      }
    }
  }

  // Agregar última sílaba si queda algo
  if (currentSyllable.trim().length > 0) {
    syllables.push(currentSyllable);
  }

  return syllables.length > 0 ? syllables : [word];
}
