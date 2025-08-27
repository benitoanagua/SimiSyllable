export interface VowelGroup {
  text: string;
  type: "diphthong" | "triphthong" | "hiatus" | "single";
  syllableCount: number;
}

export interface SyllablePattern {
  regex: RegExp;
  cutPosition: number;
}
