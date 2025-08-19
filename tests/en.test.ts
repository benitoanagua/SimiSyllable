import { expect, test } from "vitest";
import { countEn } from "../src/en";

test("basic english", () => {
  expect(countEn("spring")).toBe(1);
  expect(countEn("beautiful")).toBe(3);
  expect(countEn("king")).toBe(1);
});
