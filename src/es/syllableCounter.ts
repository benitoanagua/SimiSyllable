/**
 * Silabeador español – jsESsyllable adaptado a ES modules
 * Basado en https://github.com/cubiwan/jsESlanguag
 */

const vocales = "aeiouáéíóúüñ";

/** Limpia la palabra */
function sanitize(word: string): string {
  return word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .replace(/[^a-zñü]/g, ""); // conserva ñ y ü
}

/* ----------  Paso 1 ---------- */
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

/* ----------  Paso 2 ---------- */
const regexStep2: RegExp[] = [];
const cutPositionsStep2: number[] = [];

regexStep2.push(/[aeoáéó][aeoáéó]/);
cutPositionsStep2.push(1);

regexStep2.push(/[íú][aeo]/);
cutPositionsStep2.push(1);

regexStep2.push(/[aeo][íú]/);
cutPositionsStep2.push(1);

regexStep2.push(/[iuüíú][aeoáéó][aeoáéó]/);
cutPositionsStep2.push(2);

regexStep2.push(/[aeoáéó][aeoáéó][iuüíú]/);
cutPositionsStep2.push(1);

regexStep2.push(/.*/);
cutPositionsStep2.push(-1);

/* ----------  divide ---------- */
export function divide(word: string): string[] {
  word = sanitize(word.trim());
  if (!word) return [];

  const syllables: string[] = [];
  const finalSyllables: string[] = [];
  let head = "";
  let securityBreak = 0;
  let end = false;

  while (!end) {
    ++securityBreak;
    if (securityBreak > 50) {
      throw new Error(`Infinite loop on word: ${word}`);
    }

    let matched = false;
    for (let i = 0; i < regexStep1.length; i++) {
      const match = word.match(regexStep1[i]);
      if (match) {
        matched = true;
        const m = match[0];
        let cut = cutPositionsStep1[i]; // <-- cambiado de const a let
        if (cut < 0) {
          syllables.push(head + m);
          end = true;
        } else {
          let cutChar = m[cut];
          if (cutChar === "r" || cutChar === "l" || cutChar === "h") --cut;
          if (cut < 0) cut = 0;
          syllables.push(head + m.slice(0, cut));
          head = m.slice(cut, -1);
        }

        word = word.slice(m.length - 1);
        break;
      }
    }
    if (!matched) {
      // Caso extremo: devolver la palabra entera
      syllables.push(head + word);
      break;
    }
  }

  /* Paso 2 */
  for (const syl of syllables) {
    if (!syl) continue;
    for (let i = 0; i < regexStep2.length; i++) {
      const match = syl.match(regexStep2[i]);
      if (match) {
        const cut = cutPositionsStep2[i];
        if (cut < 0) {
          finalSyllables.push(syl);
        } else {
          const pos = (match.index ?? 0) + cut;
          finalSyllables.push(syl.slice(0, pos), syl.slice(pos));
        }
        break;
      }
    }
  }

  return finalSyllables.filter(Boolean);
}

/* ----------  contador de sílabas ---------- */
export function countSyllablesInWord(word: string): number {
  return divide(word).length;
}
