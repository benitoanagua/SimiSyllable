import { expect, test, describe } from "vitest";
import { countEn, syllabifyEn } from "../src/en/index.js";

describe("Silabeador inglés - aproximación fonética", () => {
  test("Monosílabos comunes", () => {
    expect(countEn("the")).toBe(1);
    expect(countEn("a")).toBe(1);
    expect(countEn("eye")).toBe(1);
    expect(countEn("you")).toBe(1);
    expect(countEn("sky")).toBe(1);
  });

  test("Palabras con terminaciones especiales", () => {
    expect(countEn("action")).toBe(2);
    expect(countEn("nature")).toBe(2);
    expect(countEn("table")).toBe(2);
    expect(countEn("possible")).toBe(3);
  });

  test("Palabras compuestas", () => {
    expect(countEn("baseball")).toBe(2);
    expect(countEn("sunset")).toBe(2);
    expect(countEn("notebook")).toBe(2);
  });

  test("Palabras con letras silenciosas", () => {
    expect(countEn("knight")).toBe(1);
    expect(countEn("psychology")).toBe(4);
    expect(countEn("write")).toBe(1);
    expect(countEn("lamb")).toBe(1);
  });

  test("Palabras con diptongos", () => {
    expect(countEn("boat")).toBe(1);
    expect(countEn("cloud")).toBe(1);
    expect(countEn("coin")).toBe(1);
    expect(countEn("house")).toBe(1);
  });

  test("Palabras con múltiples sílabas", () => {
    expect(countEn("beautiful")).toBe(3);
    expect(countEn("university")).toBe(5);
    expect(countEn("opportunity")).toBe(5);
    expect(countEn("character")).toBe(3);
  });

  test("División silábica aproximada", () => {
    // Para inglés, la división exacta es muy difícil sin diccionario fonético
    // Verificamos que se divide en partes válidas (con vocales)
    const helloSyllables = syllabifyEn("hello");
    expect(helloSyllables.length).toBe(2);
    expect(helloSyllables.join("")).toBe("hello");
    helloSyllables.forEach((syllable) => {
      expect(syllable).toMatch(/[aeiouy]/); // Debe contener vocal
    });

    const waterSyllables = syllabifyEn("water");
    expect(waterSyllables.length).toBe(2);
    expect(waterSyllables.join("")).toBe("water");
    waterSyllables.forEach((syllable) => {
      expect(syllable).toMatch(/[aeiouy]/);
    });

    // Para "family", esperamos al menos 2 sílabas (puede ser 2 o 3 dependiendo del dialecto)
    const familySyllables = syllabifyEn("family");
    expect(familySyllables.length).toBeGreaterThanOrEqual(2);
    expect(familySyllables.join("")).toBe("family");
    familySyllables.forEach((syllable) => {
      expect(syllable).toMatch(/[aeiouy]/);
    });
  });

  test("Casos edge", () => {
    expect(countEn("")).toBe(0);
    expect(countEn("   ")).toBe(0);
    expect(countEn("123")).toBe(0);
    expect(syllabifyEn("")).toEqual([]);
  });
});
