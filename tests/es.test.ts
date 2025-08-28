import { expect, test, describe } from "vitest";
import { countEs, syllabifyEs } from "../src/index.js";

describe("Spanish Syllable Counter", () => {
  describe("Basic functionality", () => {
    test("empty and invalid words", () => {
      expect(countEs("")).toBe(0);
      expect(countEs("   ")).toBe(0);
      expect(countEs("123")).toBe(0);
      expect(countEs("!@#")).toBe(0);
      expect(syllabifyEs("")).toEqual([]);
    });

    test("monosyllabic words", () => {
      const monosyllabic = ["yo", "sí", "no", "sol"];
      monosyllabic.forEach((word) => expect(countEs(word)).toBe(1));
    });

    test("words with mixed characters", () => {
      expect(countEs("hola123")).toBe(2);
      expect(countEs("¡España!")).toBe(3);
      expect(countEs("niño-niña")).toBe(4);
      expect(syllabifyEs("¡Español!")).toEqual(["es", "pa", "ñol"]);
    });
  });

  describe("Hiatus with tonic weak vowels", () => {
    test("strong vowel + tonic weak vowel (í, ú)", () => {
      const words = ["país", "baúl", "raíz", "maíz", "saúco", "laúd"];
      words.forEach((word) => expect(countEs(word)).toBeGreaterThanOrEqual(2));

      expect(syllabifyEs("país")).toEqual(["pa", "ís"]);
      expect(syllabifyEs("baúl")).toEqual(["ba", "úl"]);
    });

    test("tonic weak vowel + strong vowel", () => {
      const words = ["oír", "reír", "freír", "huír", "fluír"];
      words.forEach((word) => expect(countEs(word)).toBe(2));

      expect(syllabifyEs("oír")).toEqual(["o", "ír"]);
      expect(syllabifyEs("reír")).toEqual(["re", "ír"]);
    });

    test("complex sequences with accents", () => {
      const words = ["oído", "caída", "huída", "construí", "destruí", "incluí"];
      words.forEach((word) => expect(countEs(word)).toBe(3));

      expect(syllabifyEs("oído")).toEqual(["o", "í", "do"]);
      expect(syllabifyEs("caída")).toEqual(["ca", "í", "da"]);
    });
  });

  describe("Diphthongs vs hiatus", () => {
    test("normal diphthongs (no accent on weak vowel)", () => {
      const diphthongs = ["aire", "auto", "reino", "causa"];
      diphthongs.forEach((word) => expect(countEs(word)).toBe(2));

      expect(syllabifyEs("aire")).toEqual(["ai", "re"]);
      expect(syllabifyEs("auto")).toEqual(["au", "to"]);
    });

    test("hiatus due to accent on weak vowel", () => {
      expect(countEs("aíre")).toBe(3);
      expect(countEs("reíno")).toBe(3);

      expect(syllabifyEs("aíre")).toEqual(["a", "í", "re"]);
      expect(syllabifyEs("reíno")).toEqual(["re", "í", "no"]);
    });
  });

  describe("Cases with ü (diaeresis)", () => {
    test("ü forms diphthong with following vowel", () => {
      const words = ["pingüino", "cigüeña", "vergüenza", "bilingüe"];
      words.forEach((word) => expect(countEs(word)).toBe(3));

      expect(syllabifyEs("pingüino")).toEqual(["pin", "güi", "no"]);
      expect(syllabifyEs("cigüeña")).toEqual(["ci", "güe", "ña"]);
    });

    test("special cases where ü forms hiatus", () => {
      expect(countEs("argüir")).toBe(3);
    });
  });

  describe("Additional validation cases", () => {
    test("hiatus of strong vowels", () => {
      expect(countEs("poeta")).toBe(3);
      expect(countEs("teatro")).toBe(3);
      expect(countEs("caer")).toBe(2);
      expect(countEs("leer")).toBe(2);

      expect(syllabifyEs("poeta")).toEqual(["po", "e", "ta"]);
      expect(syllabifyEs("teatro")).toEqual(["te", "a", "tro"]);
    });

    test("common diphthongs", () => {
      const diphthongs = ["bueno", "tierra", "cuento", "ciudad"];
      diphthongs.forEach((word) => expect(countEs(word)).toBe(2));

      expect(syllabifyEs("bueno")).toEqual(["bue", "no"]);
      expect(syllabifyEs("tierra")).toEqual(["tie", "rra"]);
    });

    test("triphthongs", () => {
      expect(countEs("Paraguay")).toBe(3);
      expect(countEs("buey")).toBe(1);

      expect(syllabifyEs("buey")).toEqual(["buey"]);
    });
  });

  describe("Experimental functionality", () => {
    test("auto-accent mode placeholder", () => {
      expect(() => countEs("palabra", true)).not.toThrow();
      expect(() => syllabifyEs("palabra", true)).not.toThrow();
    });
  });
});
