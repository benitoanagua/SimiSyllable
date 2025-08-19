import dict from "./data/en-dict.json";

const VOWELS = /[aeiouy]+/gi;

export function countEn(word: string): number {
  const w = word.toLowerCase();
  if (dict[w as keyof typeof dict]) return dict[w as keyof typeof dict];

  const matches = w.match(VOWELS);
  return matches ? matches.length : 1;
}
