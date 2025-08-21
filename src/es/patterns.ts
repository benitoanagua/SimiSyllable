// Excepciones específicas del español para casos de diptongos/hiatos problemáticos
export const SPANISH_EXCEPTIONS: Array<[RegExp, string]> = [
  // Secuencias UI que normalmente forman hiato en ciertos contextos
  [/([^fqgck]|\b)ui([ɾr])\b/g, "$1u_i$2"], // huir, fluir, etc.
  [/([^fqgck]|\b)uid([oa]s?)\b/g, "$1u_id$2"], // huida, fluida, etc.
  [/([^fqg]|\b)ui(mos|s)\b/g, "$1u_i$2"], // huimos, huis, etc.
  [/([^fqg]|\b)u(i|iste|isteis)\b/g, "$1u_$2"], // hui, huiste, etc.
  [/([^qg]|\b)ui([rɾ])(é|ás|á|emos|éis|an)\b/g, "$1u_i$2$3"], // huiré, huirás, etc.
  [/([^qg]|\b)ui([rɾ])í(a|as|amos|ais|an)\b/g, "$1u_i$2í$3"], // huiría, etc.

  // Secuencias UA que forman hiato en ciertos contextos
  [/([^gk])ua([ɾr])\b/g, "$1u_a$2"], // actuar, graduar, etc.
  [/([^gkc])uad([oa]s?)\b/g, "$1u_ad$2"], // graduado, actuado, etc.
  [/([^gkc]{2,})uand([oa]s?)\b/g, "$1u_and$2"], // graduando, actuando, etc.
  [/([^gkc]{2,})uant([ea]s?)\b/g, "$1u_ant$2"], // graduante, actuante, etc.
  [/([^gkc])uamos\b/g, "$1u_amos"], // graduamos, actuamos, etc.
  [/([^gkc])uáis\b/g, "$1u_áis"], // graduáis, actuáis, etc.
  [/([^gkc])uab(a|as|ais|an)\b/g, "$1u_ab$2"], // graduaba, actuaba, etc.
  [/([^gkc])uábamos\b/g, "$1u_ábamos"], // graduábamos, etc.
  [/([^gkc])u(é|aste|ó|asteis|aron|aɾon)\b/g, "$1u_$2"], // gradué, actuaste, etc.
  [/([^gkc])ua([rɾ])(é|ás|á|emos|éis|an)\b/g, "$1u_a$2$3"], // graduaré, etc.
  [/([^gkc])ua([rɾ])í(a|as|amos|ais|an)\b/g, "$1u_a$2í$3"], // graduaría, etc.
];

// Onsets (ataques silábicos) indivisibles en español - grupos consonánticos que van juntos
export const INDIVISIBLE_ONSETS = [
  // Oclusiva + líquida
  "pl",
  "bl",
  "fl",
  "cl",
  "gl", // pla-to, blan-co, flan, cla-ro, glo-bo
  "pr",
  "br",
  "fr",
  "cr",
  "gr", // pra-do, bra-zo, fran-co, cru-do, gru-po
  "dr",
  "tr", // dra-ma, tre-nes

  // Otros grupos reconocidos
  "ch", // cha-co (aunque ch es un solo fonema)
  "ll",
  "rr", // lla-ve, rro-jo (dígrafos)

  // Grupos menos comunes pero válidos
  "kl",
  "kr", // en palabras extranjeras: kla-xon
];

// Codas (terminaciones silábicas) indivisibles en español
export const INDIVISIBLE_CODAS = [
  // Consonante + s (plural, 2ª persona, etc.)
  "ns",
  "ls",
  "rs",
  "ps",
  "ts",
  "ks",
  "xs", // ins-to, pul-so, par-te, etc.

  // Grupos consonánticos en final de sílaba
  "nt",
  "nd",
  "mp",
  "mb",
  "nk",
  "ng", // can-to, man-do, cam-po, etc.
  "st",
  "sp",
  "sk",
  "sc", // cos-ta, res-peto, etc.
  "rt",
  "rd",
  "rp",
  "rb",
  "rk",
  "rg", // par-te, tar-de, etc.
  "lt",
  "ld",
  "lp",
  "lb",
  "lk",
  "lg", // sal-to, cal-do, etc.

  // Dobles consonantes
  "ll",
  "rr",
  "cc",
  "nn",
  "mm", // ca-lle, ca-rro, ac-ción, etc.
];

// Patrones de diptongos comunes en español
export const SPANISH_DIPHTHONGS = new RegExp(
  [
    // Vocal fuerte + débil átona
    "ai",
    "au",
    "ei",
    "eu",
    "oi",
    "ou",

    // Vocal débil átona + fuerte
    "ia",
    "ie",
    "io",
    "ua",
    "ue",
    "uo",

    // Dos débiles átonas
    "iu",
    "ui",
  ].join("|"),
  "gi"
);

// Patrones de triptongos en español
export const SPANISH_TRIPHTHONGS = new RegExp(
  [
    // Débil + fuerte + débil (todas átonas)
    "iai",
    "iei",
    "uai",
    "uei",
    "uau",
    "iau",
  ].join("|"),
  "gi"
);

// Patrones de hiatos forzados (vocal débil tónica + fuerte o viceversa)
export const SPANISH_FORCED_HIATUS = new RegExp(
  [
    // Vocal débil tónica + fuerte
    "í[aeo]",
    "ú[aeo]",

    // Vocal fuerte + débil tónica
    "[aeo]í",
    "[aeo]ú",

    // Dos vocales fuertes
    "aa",
    "ae",
    "ao",
    "ea",
    "ee",
    "eo",
    "oa",
    "oe",
    "oo",
  ].join("|"),
  "gi"
);

// Prefijos comunes en español que agregan sílabas
export const SPANISH_PREFIX_SYLLABLES: Record<string, number> = {
  a: 1, // a-normal, a-típico
  ante: 2, // ante-rior
  anti: 2, // anti-natural
  auto: 2, // auto-móvil
  bi: 1, // bi-color
  co: 1, // co-operar
  contra: 2, // contra-rio
  de: 1, // de-formar
  des: 1, // des-hacer
  dis: 1, // dis-traer
  en: 1, // en-cerrar
  entre: 2, // entre-tener
  ex: 1, // ex-traer
  extra: 2, // extra-ordinario
  hiper: 2, // hiper-mercado
  in: 1, // in-útil
  inter: 2, // inter-nacional
  multi: 2, // multi-color
  para: 2, // para-caídas
  post: 1, // post-guerra
  pre: 1, // pre-ver
  pro: 1, // pro-poner
  re: 1, // re-hacer
  semi: 2, // semi-círculo
  sobre: 2, // sobre-natural
  sub: 1, // sub-marino
  super: 2, // super-mercado
  trans: 1, // trans-formar
  ultra: 2, // ultra-sonido
  vice: 2, // vice-presidente
};

// Sufijos comunes en español que agregan sílabas específicas
export const SPANISH_SUFFIX_SYLLABLES: Record<string, number> = {
  mente: 2, // clara-mente
  ísimo: 3, // gua-pí-si-mo
  ísima: 3, // gua-pí-si-ma
  ción: 2, // na-ción
  sión: 2, // mi-sión
  dad: 1, // ver-dad
  tad: 1, // li-ber-tad
  able: 2, // ama-ble
  ible: 2, // po-si-ble
  oso: 2, // her-mo-so
  osa: 2, // her-mo-sa
  ero: 2, // car-pin-te-ro
  era: 2, // car-pin-te-ra
  ito: 2, // pe-rri-to
  ita: 2, // pe-rri-ta
  illo: 2, // pe-rri-llo
  illa: 2, // pe-rri-lla
  ando: 2, // can-tan-do
  endo: 2, // co-rrien-do
  iendo: 3, // co-rrien-do
  ado: 2, // can-ta-do
  ido: 2, // co-rri-do
  ar: 1, // can-tar
  er: 1, // co-rrer
  ir: 1, // vi-vir
};

// Patrones que típicamente reducen el conteo de sílabas
export const SPANISH_REDUCING_PATTERNS = new RegExp(
  [
    // Contracciones y elisiones
    "'s$",
    "'t$",
    "'n$",

    // Sinalefas comunes en poesía (aunque no aplicaría a palabras individuales)
    "y_[aeiou]",
    "e_[aeiou]",
    "o_[aeiou]",
  ].join("|"),
  "i"
);

// Patrones que típicamente aumentan el conteo de sílabas
export const SPANISH_INCREASING_PATTERNS = new RegExp(
  [
    // Palabras técnicas/científicas con muchas sílabas
    "logía$",
    "grafía$",
    "metría$",
    "scopía$",

    // Superlativos complejos
    "bilísimo$",
    "císimo$",
    "quísimo$",

    // Palabras compuestas obvias
    "(?:por|para|sobre|entre).*[aeiou]{2,}",

    // Secuencias vocálicas largas que suelen ser hiatos
    "[aeiou]{3,}",
  ].join("|"),
  "i"
);

// Casos especiales de acentuación que afectan la división silábica
export const SPANISH_ACCENT_PATTERNS = new RegExp(
  [
    // Palabras agudas (acento en última sílaba)
    "[aeiouáéíóú][bcdfghjklmnpqrstvwxyz]*[aeiouáéíóú]$",

    // Palabras llanas con acento escrito (indican irregularidad)
    ".*[áéíóú].*[aeiou]$",

    // Palabras esdrújulas (acento en antepenúltima)
    ".*[áéíóú].*[aeiou].*[aeiou]$",
  ].join("|"),
  "i"
);

// Patrones de palabras que históricamente causan problemas
export const SPANISH_PROBLEMATIC_PATTERNS = new RegExp(
  [
    // Palabras con 'h' intercalada
    "[aeiou]h[aeiou]",

    // Secuencias complejas de vocales
    "[aeiou]{4,}",

    // Palabras muy largas con terminaciones complejas
    ".{10,}(ción|sión|mente|ísimo)$",
  ].join("|"),
  "i"
);
