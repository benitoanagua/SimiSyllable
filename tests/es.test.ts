import { expect, test, describe } from "vitest";
import { countEs, syllabifyEs } from "../src/index.js";

describe("Hiatos acentuales - vocal débil tónica", () => {
  test("vocal fuerte + débil tónica (í, ú)", () => {
    expect(countEs("país")).toBe(2); // pa-ís
    expect(countEs("baúl")).toBe(2); // ba-úl
    expect(countEs("raíz")).toBe(2); // ra-íz
    expect(countEs("maíz")).toBe(2); // ma-íz
    expect(countEs("saúco")).toBe(3); // sa-ú-co
    expect(countEs("laúd")).toBe(2); // la-úd

    // Verificar división silábica
    expect(syllabifyEs("país")).toEqual(["pa", "ís"]);
    expect(syllabifyEs("baúl")).toEqual(["ba", "úl"]);
  });

  test("vocal débil tónica + fuerte", () => {
    expect(countEs("oír")).toBe(2); // o-ír
    expect(countEs("reír")).toBe(2); // re-ír
    expect(countEs("freír")).toBe(2); // fre-ír
    expect(countEs("huír")).toBe(2); // hu-ír
    expect(countEs("fluír")).toBe(2); // flu-ír

    // Verificar división silábica
    expect(syllabifyEs("oír")).toEqual(["o", "ír"]);
    expect(syllabifyEs("reír")).toEqual(["re", "ír"]);
  });
});

describe("Hiatos acentuales - casos complejos", () => {
  test("secuencias con múltiples vocales y acentos", () => {
    expect(countEs("oído")).toBe(3); // o-í-do
    expect(countEs("caída")).toBe(3); // ca-í-da
    expect(countEs("huída")).toBe(3); // hu-í-da
    expect(countEs("construí")).toBe(3); // cons-tru-í
    expect(countEs("destruí")).toBe(3); // des-tru-í
    expect(countEs("incluí")).toBe(3); // in-clu-í

    // Verificar división silábica
    expect(syllabifyEs("oído")).toEqual(["o", "í", "do"]);
    expect(syllabifyEs("caída")).toEqual(["ca", "í", "da"]);
  });
});

describe("Contraste diptongos vs hiatos", () => {
  test("diptongos normales (sin acento en vocal débil)", () => {
    expect(countEs("aire")).toBe(2); // ai-re (diptongo)
    expect(countEs("auto")).toBe(2); // au-to (diptongo)
    expect(countEs("reino")).toBe(2); // rei-no (diptongo)
    expect(countEs("causa")).toBe(2); // cau-sa (diptongo)

    // Verificar que se mantienen como diptongos
    expect(syllabifyEs("aire")).toEqual(["ai", "re"]);
    expect(syllabifyEs("auto")).toEqual(["au", "to"]);
  });

  test("hiatos por acento en vocal débil", () => {
    expect(countEs("aíre")).toBe(3); // a-í-re (hiato por acento)
    expect(countEs("reíno")).toBe(3); // re-í-no (hiato por acento)

    // Verificar división silábica correcta
    expect(syllabifyEs("aíre")).toEqual(["a", "í", "re"]);
    expect(syllabifyEs("reíno")).toEqual(["re", "í", "no"]);
  });
});

describe("Casos con ü (diéresis)", () => {
  test("diéresis forma diptongo con vocal siguiente", () => {
    expect(countEs("pingüino")).toBe(3); // pin-güi-no (güi es diptongo)
    expect(countEs("cigüeña")).toBe(3); // ci-güe-ña (güe es diptongo)
    expect(countEs("argüir")).toBe(3); // ar-gü-ir

    // Casos adicionales con diéresis
    expect(countEs("vergüenza")).toBe(3); // ver-güen-za
    expect(countEs("bilingüe")).toBe(3); // bi-lin-güe

    // Verificar división silábica
    expect(syllabifyEs("pingüino")).toEqual(["pin", "güi", "no"]);
    expect(syllabifyEs("cigüeña")).toEqual(["ci", "güe", "ña"]);
  });
});

describe("Casos adicionales para validar el algoritmo", () => {
  test("hiatos de vocales fuertes", () => {
    expect(countEs("poeta")).toBe(3); // po-e-ta
    expect(countEs("teatro")).toBe(3); // te-a-tro
    expect(countEs("caer")).toBe(2); // ca-er
    expect(countEs("leer")).toBe(2); // le-er

    // Verificar división
    expect(syllabifyEs("poeta")).toEqual(["po", "e", "ta"]);
    expect(syllabifyEs("teatro")).toEqual(["te", "a", "tro"]);
  });

  test("diptongos comunes", () => {
    expect(countEs("bueno")).toBe(2); // bue-no
    expect(countEs("tierra")).toBe(2); // tie-rra
    expect(countEs("cuento")).toBe(2); // cuen-to
    expect(countEs("ciudad")).toBe(2); // ciu-dad

    // Verificar que se mantienen unidos
    expect(syllabifyEs("bueno")).toEqual(["bue", "no"]);
    expect(syllabifyEs("tierra")).toEqual(["tie", "rra"]);
  });

  test("triptongos", () => {
    expect(countEs("Paraguay")).toBe(3); // Pa-ra-guay (guay es triptongo)
    expect(countEs("buey")).toBe(1); // buey (triptongo en una sílaba)

    // Verificar división
    // expect(syllabifyEs("Paraguay")).toEqual(["Pa", "ra", "guay"]);
    expect(syllabifyEs("buey")).toEqual(["buey"]);
  });
});

describe("Casos edge y manejo de errores", () => {
  test("palabras vacías o inválidas", () => {
    expect(countEs("")).toBe(0);
    expect(countEs("   ")).toBe(0);
    expect(countEs("123")).toBe(0);
    expect(countEs("!@#")).toBe(0);

    expect(syllabifyEs("")).toEqual([]);
    expect(syllabifyEs("   ")).toEqual([]);
  });

  test("palabras con caracteres mixtos", () => {
    expect(countEs("hola123")).toBe(2); // se limpia a "hola"
    expect(countEs("¡España!")).toBe(3); // se limpia a "españa"
    expect(countEs("niño-niña")).toBe(4); // se limpia a "niñoniña"

    expect(syllabifyEs("¡Español!")).toEqual(["es", "pa", "ñol"]);
  });

  test("monosílabos", () => {
    expect(countEs("yo")).toBe(1);
    expect(countEs("sí")).toBe(1);
    expect(countEs("no")).toBe(1);
    expect(countEs("sol")).toBe(1);

    expect(syllabifyEs("yo")).toEqual(["yo"]);
    expect(syllabifyEs("sí")).toEqual(["sí"]);
  });
});

describe("Funcionalidad experimental", () => {
  test("modo con acentos automáticos (placeholder)", () => {
    // Esta funcionalidad está marcada como TODO en el código
    // Por ahora solo verificamos que no rompe nada
    expect(() => countEs("palabra", true)).not.toThrow();
    expect(() => syllabifyEs("palabra", true)).not.toThrow();
  });
});
