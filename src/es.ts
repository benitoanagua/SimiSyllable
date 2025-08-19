import dict from "./data/es-dict.json";

const VOWELS = /[aeiouáéíóúü]/i;

export function countEs(word: string): number {
  const w = word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (dict[w as keyof typeof dict]) return dict[w as keyof typeof dict];

  let count = 0;
  for (let i = 0; i < w.length; i++) {
    if (VOWELS.test(w[i])) {
      if (i === 0 || !VOWELS.test(w[i - 1])) count++;
    }
  }
  return Math.max(1, count);
}
