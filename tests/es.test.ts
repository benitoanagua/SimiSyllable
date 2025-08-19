import { expect, test } from "vitest";
import { countEs } from "../src/es";

test("basic spanish", () => {
  expect(countEs("sol")).toBe(1);
  expect(countEs("murciélago")).toBe(4);
  expect(countEs("mañana")).toBe(3);
});

test("spanish fallback algorithm", () => {
  expect(countEs("hola")).toBe(2);
  expect(countEs("mundo")).toBe(2);
  expect(countEs("computadora")).toBe(4);
  expect(countEs("árbol")).toBe(2);
  expect(countEs("país")).toBe(2);
});

test("edge cases", () => {
  expect(countEs("")).toBe(0);
  expect(countEs("hielo")).toBe(2);
  expect(countEs("ciudad")).toBe(2);
  expect(countEs("aire")).toBe(2);
});
