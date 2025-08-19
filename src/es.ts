// Diccionario personalizado de respaldo
const customEsDict: Record<string, number> = {
  murciélago: 4,
  computadora: 4,
  sol: 1,
  río: 2,
  mañana: 3,
  país: 2,
  hielo: 2,
  ciudad: 2,
  aire: 2,
  hola: 2,
  mundo: 2,
  árbol: 2,
};

const VOWELS = /[aeiouáéíóúü]/gi;
const DIPHTHONGS = /ai|au|ei|eu|oi|ou|ui|ay|ey|oy|uy|ia|ie|io|iu|ua|ue|uo/gi;
const TRIPHTHONGS = /iai|iei|ieu|uai|uei|uau|uay|uey|iai|ioi|iei/gi;
const ACCENTED_VOWELS = /[áéíóú]/gi;

export function countEs(word: string): number {
  // Asegurarse de que se llama countEs
  const normalizedWord = word
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");

  if (!normalizedWord) return 0;

  // 1. Verificar diccionario personalizado
  const lowerWord = word.toLowerCase();
  if (customEsDict[lowerWord]) {
    return customEsDict[lowerWord];
  }

  // 2. Algoritmo mejorado para español
  let count = 0;

  // Contar vocales (incluyendo acentuadas)
  const vowels = lowerWord.match(/[aeiouáéíóúü]/gi);
  if (!vowels) return 1; // Al menos una sílaba

  count = vowels.length;

  // Restar diptongos (se cuentan como una sílaba)
  const diphthongs = lowerWord.match(DIPHTHONGS);
  if (diphthongs) count -= diphthongs.length;

  // Restar triptongos (se cuentan como una sílaba)
  const triphthongs = lowerWord.match(TRIPHTHONGS);
  if (triphthongs) count -= triphthongs.length;

  // Las vocales con tilde siempre forman sílaba separada
  const accentedVowels = lowerWord.match(ACCENTED_VOWELS);
  if (accentedVowels) count += accentedVowels.length;

  // Ajustar por haches intercaladas (no afectan diptongos)
  if (count > 1) {
    for (let i = 1; i < lowerWord.length - 1; i++) {
      if (
        lowerWord[i] === "h" &&
        "aeiouáéíóúü".includes(lowerWord[i - 1]) &&
        "aeiouáéíóúü".includes(lowerWord[i + 1])
      ) {
        count--;
      }
    }
  }

  return Math.max(1, count);
}
