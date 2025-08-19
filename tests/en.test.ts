import { expect, test } from "vitest";
import { countEn } from "../src/index.js";

test("basic english", () => {
  expect(countEn("spring")).toBe(1);
  expect(countEn("beautiful")).toBe(3);
  expect(countEn("king")).toBe(1);
});

test("english algorithm", () => {
  expect(countEn("hello")).toBe(2);
  expect(countEn("world")).toBe(1);
  expect(countEn("syllable")).toBe(3);
  expect(countEn("water")).toBe(2);
  expect(countEn("computer")).toBe(3);
  expect(countEn("rhythm")).toBe(2);
  expect(countEn("eye")).toBe(1);
  expect(countEn("the")).toBe(1);
});

test("edge cases", () => {
  expect(countEn("")).toBe(0);
  expect(countEn("a")).toBe(1);
  expect(countEn("I")).toBe(1);
});

test("diphthongs and special cases", () => {
  expect(countEn("audio")).toBe(3);
  expect(countEn("poem")).toBe(2);
  expect(countEn("fire")).toBe(2);
  expect(countEn("hour")).toBe(2);
  expect(countEn("people")).toBe(2);
});

test("advanced english cases", () => {
  // Casos más complejos
  expect(countEn("queue")).toBe(1); // queue = 1 sílaba
  expect(countEn("science")).toBe(2); // sci-ence = 2 sílabas
  expect(countEn("realism")).toBe(3); // re-al-ism = 3 sílabas
  expect(countEn("walked")).toBe(1); // walk-ed (ed mudo) = 1 sílaba
  expect(countEn("wished")).toBe(2); // wish-ed = 2 sílabas
  expect(countEn("media")).toBe(3); // me-di-a = 3 sílabas (hiato)
  expect(countEn("video")).toBe(3); // vi-de-o = 3 sílabas (hiato)
});
