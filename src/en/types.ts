export interface SyllablePattern {
  regex: RegExp;
  cutPosition: number;
  priority: number;
  description: string;
}

export interface VowelGroup {
  text: string;
  type: "diphthong" | "vowel_cluster" | "single";
  syllableCount: number;
}

export interface PhoneticPattern {
  pattern: RegExp;
  syllableChange: number;
  context?: "start" | "middle" | "end";
}
