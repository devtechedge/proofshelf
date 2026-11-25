export type Verdict = "supported" | "mixed" | "preliminary" | "unsupported";

export type CardCategory =
  | "Vitamins"
  | "Minerals"
  | "Marine oils and fats"
  | "Protein and performance"
  | "Cognition"
  | "Botanicals"
  | "Medicinal mushrooms"
  | "Gut and metabolic"
  | "Specialties";

export type EvidenceCard = {
  id: string;
  slug: string;
  ingredient: string;
  aliases: string[];
  category: CardCategory;
  form: string;
  route: "oral" | "topical" | "intranasal" | "mixed";
  claim: string;
  verdict: Verdict;
  explanation: string;
  labelClue: string;
  safetyNote: string;
  sourceIds: string[];
  tags: string[];
};

export type EvidenceSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  kind: "fact-sheet" | "review" | "trial" | "regulatory" | "safety" | "market-discovery";
  note: string;
};

export type RoundAnswer = {
  cardId: string;
  selectedVerdict: Verdict;
  confidence: 1 | 2 | 3;
};

export type RoundResult = {
  score: number;
  total: number;
  correct: number;
  calibrationFlags: number;
  answers: Array<{
    cardId: string;
    selectedVerdict: Verdict;
    confidence: 1 | 2 | 3;
    correct: boolean;
    actualVerdict: Verdict;
    explanation: string;
    sourceIds: string[];
  }>;
};
