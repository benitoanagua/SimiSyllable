import { expect, test } from "vitest";
import { countEn } from "../src/en";

test("basic english", () => {
  expect(countEn("spring")).toBe(1);
  expect(countEn("beautiful")).toBe(3);
  expect(countEn("king")).toBe(1);
});

test("english fallback algorithm", () => {
  expect(countEn("hello")).toBe(2);
  expect(countEn("world")).toBe(1);
  expect(countEn("syllable")).toBe(3);
  expect(countEn("water")).toBe(2);
  expect(countEn("computer")).toBe(3);
});

test("edge cases", () => {
  expect(countEn("")).toBe(0);
  expect(countEn("rhythm")).toBe(2);
  expect(countEn("eye")).toBe(1);
  expect(countEn("the")).toBe(1);
});
