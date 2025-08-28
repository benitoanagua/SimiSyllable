import { expect, test, describe } from "vitest";
import { countEn, syllabifyEn } from "../src/en/index.js";

describe("English Syllable Counter", () => {
  describe("Basic functionality", () => {
    test("empty and invalid words", () => {
      expect(countEn("")).toBe(0);
      expect(countEn("   ")).toBe(0);
      expect(countEn("123")).toBe(0);
      expect(syllabifyEn("")).toEqual([]);
    });

    test("monosyllabic words", () => {
      const monosyllabic = [
        "the",
        "a",
        "eye",
        "you",
        "sky",
        "knight",
        "write",
        "lamb",
        "boat",
        "cloud",
        "coin",
        "house",
      ];
      monosyllabic.forEach((word) => expect(countEn(word)).toBe(1));
    });
  });

  describe("Special endings and patterns", () => {
    test("words with special endings", () => {
      expect(countEn("action")).toBe(2);
      expect(countEn("nature")).toBe(2);
      expect(countEn("table")).toBe(2);
      expect(countEn("possible")).toBe(3);
    });

    test("compound words", () => {
      expect(countEn("baseball")).toBe(2);
      expect(countEn("sunset")).toBe(2);
      expect(countEn("notebook")).toBe(2);
    });

    test("words with silent letters", () => {
      expect(countEn("psychology")).toBe(4);
    });
  });

  describe("Multisyllabic words", () => {
    test("common multisyllabic words", () => {
      expect(countEn("beautiful")).toBe(3);
      expect(countEn("university")).toBe(5);
      expect(countEn("opportunity")).toBe(5);
      expect(countEn("character")).toBe(3);
    });
  });

  describe("Syllable division", () => {
    test("syllable division returns valid parts", () => {
      const testWords = ["hello", "water", "family"];

      testWords.forEach((word) => {
        const syllables = syllabifyEn(word);
        expect(syllables.join("")).toBe(word);
        expect(syllables.length).toBeGreaterThanOrEqual(1);
        syllables.forEach((syllable) => {
          expect(syllable).toMatch(/[aeiouy]/i); // Each syllable should contain a vowel
        });
      });
    });
  });
});
