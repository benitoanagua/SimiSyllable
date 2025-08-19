import { expect, test } from "vitest";
import { countEs } from "../src/index.js";

test("basic spanish", () => {
  expect(countEs("sol")).toBe(1);
  expect(countEs("murciélago")).toBe(4);
  expect(countEs("mañana")).toBe(3);
});

test("spanish algorithm", () => {
  expect(countEs("hola")).toBe(2);
  expect(countEs("mundo")).toBe(2);
  expect(countEs("computadora")).toBe(4);
  expect(countEs("árbol")).toBe(2);
  expect(countEs("país")).toBe(2);
  expect(countEs("hielo")).toBe(2);
  expect(countEs("ciudad")).toBe(2);
  expect(countEs("aire")).toBe(2);
});

test("edge cases", () => {
  expect(countEs("")).toBe(0);
  expect(countEs("a")).toBe(1);
  expect(countEs("y")).toBe(1);
});

test("diphthongs and special cases", () => {
  expect(countEs("paisaje")).toBe(3);
  expect(countEs("veinte")).toBe(2);
  expect(countEs("cuatro")).toBe(2);
  expect(countEs("huerto")).toBe(2);
  expect(countEs("leyenda")).toBe(3);
});

test("advanced spanish cases", () => {
  // Casos más complejos con diptongos, triptongos e hiatos
  expect(countEs("Uruguay")).toBe(3); // U-ru-guay (triptongo)
  expect(countEs("estudiáis")).toBe(3); // es-tu-diáis (triptongo)
  expect(countEs("poesía")).toBe(3); // po-e-sí-a (hiato)
  expect(countEs("día")).toBe(2); // dí-a (hiato)
  expect(countEs("río")).toBe(2); // rí-o (hiato)
  expect(countEs("viuda")).toBe(2); // viu-da (diptongo débil+débil)
  expect(countEs("causa")).toBe(2); // cau-sa (diptongo fuerte+débil)
});
