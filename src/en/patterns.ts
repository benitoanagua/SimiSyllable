// Silent E patterns - more comprehensive
export const SILENT_E_PATTERNS = new RegExp(
  [
    // Standard silent E after consonants
    "[bcdfghjklmnpqrstvwxyz]e$",
    // But not after vowels (like "toe", "due")
    "(?![aeiou]e$)",
    // Exceptions: -le after consonant makes a syllable
    "(?![bcdfghjklmnpqrstvwxyz]le$)",
  ].join(""),
  "i"
);

// Syllabic L patterns (like "table", "simple", "puzzle")
export const SYLLABIC_L_PATTERNS = new RegExp(
  ["[bcdfghjkmnpqrstvwxyz]le$"].join("|"),
  "i"
);

// Complex vowel combinations that form single syllables (diphthongs)
export const DIPHTHONG_PATTERNS = new RegExp(
  [
    "ai",
    "au",
    "ay",
    "ea",
    "ee",
    "ei",
    "eu",
    "ey",
    "ie",
    "oa",
    "oe",
    "oi",
    "oo",
    "ou",
    "oy",
    "ue",
    "ui",
    "uo",
    "uy",
    "aw",
    "ew",
    "ow",
  ].join("|"),
  "gi"
);

// Vowel combinations that typically form separate syllables (hiatus)
export const HIATUS_PATTERNS = new RegExp(
  ["ae", "ao", "eo", "ia", "io", "ua", "uu", "ii", "aa", "uu"].join("|"),
  "gi"
);

// Prefixes that add specific syllable counts
export const PREFIX_SYLLABLES: Record<string, number> = {
  un: 1,
  re: 1,
  pre: 1,
  dis: 1,
  mis: 1,
  over: 2,
  under: 2,
  out: 1,
  up: 1,
  anti: 2,
  auto: 2,
  co: 1,
  de: 1,
  ex: 1,
  fore: 1,
  inter: 2,
  multi: 2,
  non: 1,
  post: 1,
  pro: 1,
  semi: 2,
  sub: 1,
  super: 2,
  trans: 1,
  ultra: 2,
};

// Suffix patterns with their syllable contributions
export const SUFFIX_SYLLABLES: Record<string, number> = {
  ing: 1,
  ed: 0, // Usually silent, except after t/d
  er: 1,
  est: 1,
  ly: 1,
  tion: 2,
  sion: 2,
  ness: 1,
  ment: 1,
  able: 2,
  ible: 2,
  ful: 1,
  less: 1,
  ward: 1,
  wise: 1,
  like: 1,
  ism: 1,
  ist: 1,
  ize: 1,
  ise: 1,
  ous: 1,
  eous: 2,
  ious: 2,
  ology: 3,
  ography: 3,
  ometry: 3,
};

// Patterns where -ed is pronounced (adds a syllable)
export const PRONOUNCED_ED_PATTERNS = new RegExp(["[td]ed$"].join("|"), "i");

// Complex consonant clusters that might contain syllabic consonants
export const SYLLABIC_CONSONANT_PATTERNS = new RegExp(
  [
    // Syllabic L: bottle, simple, table
    "[bcdfghjkmnpqrstvwxyz]l$",
    // Syllabic N: button, cotton, mountain
    "[bcdfghjkmpqrstvwxyz]n$",
    // Syllabic M: rhythm, prism
    "[bcdfghjklnpqrstvwxyz]m$",
  ].join("|"),
  "i"
);

// Words ending patterns that typically reduce syllable count
export const SYLLABLE_REDUCING_PATTERNS = new RegExp(
  [
    // Silent E exceptions
    "lle$",
    "tte$",
    "sse$",
    "nne$",
    "mme$",
    // Contracted forms
    "'s$",
    "'t$",
    "'re$",
    "'ve$",
    "'ll$",
    "'d$",
  ].join("|"),
  "i"
);

// Patterns that typically increase syllable count
export const SYLLABLE_INCREASING_PATTERNS = new RegExp(
  [
    // Scientific/technical suffixes
    "ology$",
    "ography$",
    "ometry$",
    "ological$",
    // Complex endings
    "eous$",
    "ious$",
    "uous$",
    "aneous$",
    // Compound word indicators
    "(?:some|every|any)thing$",
    "(?:some|every|any)where$",
    "(?:some|every|any)body$",
  ].join("|"),
  "i"
);

// Legacy patterns (keeping for compatibility but with improvements)
export const EXPRESSION_MONOSYLLABIC_ONE = new RegExp(
  [
    "awe($|d|so)",
    "cia(?:l|$)",
    "tia",
    "cius",
    "cious",
    "[^aeiou]giu",
    "[aeiouy][^aeiouy]ion",
    "iou",
    "sia$",
    "eous$",
    "[oa]gue$",
    ".[^aeiuoycgltdb]{2,}ed$",
    ".ely$",
    "^jua",
    "uai",
    "eau",
    "^busi$",
    "(?:[aeiouy](?:[bcfgklmnprsvwxyz]|ch|dg|g[hn]|lch|l[lv]|mm|nch|n[cgn]|r[bcnsv]|squ|s[chkls]|th)ed$)",
    "(?:[aeiouy](?:[bdfklmnprstvy]|ch|g[hn]|lch|l[lv]|mm|nch|nn|r[nsv]|squ|s[cklst]|th)es$)",
  ].join("|"),
  "i"
);

export const EXPRESSION_MONOSYLLABIC_TWO = new RegExp(
  "[aeiouy](?:[bcdfgklmnprstvyz]|ch|dg|g[hn]|l[lv]|mm|n[cgns]|r[cnsv]|squ|s[cklst]|th)e$",
  "i"
);

export const EXPRESSION_DOUBLE_SYLLABIC_ONE = new RegExp(
  "(?:([^aeiouy])\\1l|[^aeiouy]ie(?:r|s?t)|[aeiouym]bl|eo|ism|asm|thm|dnt|snt|uity|dea|gean|oa|ua|react?|orbed|shred|eings?|[aeiouy]sh?e[rs])$",
  "i"
);

export const EXPRESSION_DOUBLE_SYLLABIC_TWO = new RegExp(
  [
    "creat(?!u)",
    "[^gq]ua[^auieo]",
    "[aeiou]{3}",
    "^(?:ia|mc|coa[dglx].)",
    "^re(app|es|im|us)",
    "(th|d)eist",
  ].join("|"),
  "i"
);

export const EXPRESSION_DOUBLE_SYLLABIC_THREE = new RegExp(
  [
    "[^aeiou]y[ae]",
    "[^l]lien",
    "riet",
    "dien",
    "iu",
    "io",
    "ii",
    "uen",
    "[aeilotu]real",
    "real[aeilotu]",
    "iell",
    "eo[^aeiou]",
    "[aeiou]y[aeiou]",
  ].join("|"),
  "i"
);

export const EXPRESSION_DOUBLE_SYLLABIC_FOUR = /[^s]ia/i;

export const EXPRESSION_SINGLE = new RegExp(
  [
    "^(?:un|fore|ware|none?|out|post|sub|pre|pro|dis|side|some)",
    "(?:ly|less|some|ful|ers?|ness|cians?|ments?|ettes?|villes?|ships?|sides?|ports?|shires?|[gnst]ion(?:ed|s)?)$",
  ].join("|"),
  "i"
);

export const EXPRESSION_DOUBLE = new RegExp(
  [
    "^(?:above|anti|ante|counter|hyper|afore|agri|infra|intra|inter|over|semi|ultra|under|extra|dia|micro|mega|kilo|pico|nano|macro|somer)",
    "(?:fully|berry|woman|women|edly|union|((?:[bcdfghjklmnpqrstvwxz])|[aeiou])ye?ing)$",
  ].join("|"),
  "i"
);

export const EXPRESSION_TRIPLE = /(creations?|ology|ologist|onomy|onomist)$/gi;
