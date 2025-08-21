import { expect, test } from "vitest";
import { countEn, countEs } from "../src/index.js";
import { cmuDict } from "../src/en/dict.js";
import { esDict } from "../src/es/dict.js";
import { problematic as enProblematic } from "../src/en/problematic.js";
import { problematic as esProblematic } from "../src/es/problematic.js";

test("detailed debug analysis", () => {
  console.log("\n=== DETAILED DEBUG ANALYSIS ===");

  // Verificar carga de diccionarios
  console.log(
    `\nCMU Dictionary loaded: ${Object.keys(cmuDict).length} entries`
  );
  console.log(
    `Spanish Dictionary loaded: ${Object.keys(esDict).length} entries`
  );

  // Palabras problemáticas específicas
  const testWords = {
    en: ["spring", "fire", "realism", "audio", "poem", "hour"],
    es: ["murciélago", "mundo", "paisaje", "uruguay", "computadora"],
  };

  console.log("\n--- ENGLISH WORDS ---");
  for (const word of testWords.en) {
    const count = countEn(word);
    const inCmu = cmuDict[word] || "not found";
    const inProblematic = enProblematic[word] || "not found";

    console.log(`${word}: ${count}`);
    console.log(`  - CMU Dict: ${inCmu}`);
    console.log(`  - Problematic: ${inProblematic}`);

    // Test manual del algoritmo
    const algorithmic = countEn(word, false); // Sin diccionario
    console.log(`  - Algorithm only: ${algorithmic}`);
  }

  console.log("\n--- SPANISH WORDS ---");
  for (const word of testWords.es) {
    const count = countEs(word);
    const inEsDict = esDict[word.toLowerCase()] || "not found";
    const inProblematic = esProblematic[word.toLowerCase()] || "not found";

    console.log(`${word}: ${count}`);
    console.log(`  - ES Dict: ${inEsDict}`);
    console.log(`  - Problematic: ${inProblematic}`);

    // Test manual del algoritmo
    const algorithmic = countEs(word, false); // Sin diccionario
    console.log(`  - Algorithm only: ${algorithmic}`);
  }
});
