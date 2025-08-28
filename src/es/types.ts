export interface SyllablePattern {
  regex: RegExp;
  cutPosition: number;
  priority?: number;
  description?: string;
}

export interface VowelGroup {
  text: string;
  type: "diphthong" | "triphthong" | "hiatus" | "single";
  syllableCount: number;
}
