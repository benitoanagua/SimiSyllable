// Expresiones regulares para reglas silábicas en inglés
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
  "g"
);

export const EXPRESSION_MONOSYLLABIC_TWO = new RegExp(
  "[aeiouy](?:[bcdfgklmnprstvyz]|ch|dg|g[hn]|l[lv]|mm|n[cgns]|r[cnsv]|squ|s[cklst]|th)e$",
  "g"
);

export const EXPRESSION_DOUBLE_SYLLABIC_ONE = new RegExp(
  "(?:([^aeiouy])\\1l|[^aeiouy]ie(?:r|s?t)|[aeiouym]bl|eo|ism|asm|thm|dnt|snt|uity|dea|gean|oa|ua|react?|orbed|shred|eings?|[aeiouy]sh?e[rs])$",
  "g"
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
  "g"
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
  "g"
);

export const EXPRESSION_DOUBLE_SYLLABIC_FOUR = /[^s]ia/;

export const EXPRESSION_SINGLE = new RegExp(
  [
    "^(?:un|fore|ware|none?|out|post|sub|pre|pro|dis|side|some)",
    "(?:ly|less|some|ful|ers?|ness|cians?|ments?|ettes?|villes?|ships?|sides?|ports?|shires?|[gnst]ion(?:ed|s)?)$",
  ].join("|"),
  "g"
);

export const EXPRESSION_DOUBLE = new RegExp(
  [
    "^(?:above|anti|ante|counter|hyper|afore|agri|infra|intra|inter|over|semi|ultra|under|extra|dia|micro|mega|kilo|pico|nano|macro|somer)",
    "(?:fully|berry|woman|women|edly|union|((?:[bcdfghjklmnpqrstvwxz])|[aeiou])ye?ing)$",
  ].join("|"),
  "g"
);

export const EXPRESSION_TRIPLE = /(creations?|ology|ologist|onomy|onomist)$/g;
