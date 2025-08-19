import { expect, test } from "vitest";
import { countEs } from "../src/es";

test("basic spanish", () => {
  expect(countEs("sol")).toBe(1);
  expect(countEs("murciélago")).toBe(4);
  expect(countEs("mañana")).toBe(3);
});
