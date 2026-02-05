export type RiskLevel = "low" | "medium" | "high";

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface AnalyzedClause {
  id: number;
  originalText: string;
  plainEnglish: string;
  riskLevel: RiskLevel;
  riskExplanation: string;
  keyTerms: KeyTerm[];
}

export interface ContractSummary {
  title: string;
  contractType: string;
  parties: string[];
  overallRisk: RiskLevel;
  keyConcerns: string[];
  recommendation: string;
}

export interface ContractAnalysis {
  summary: ContractSummary;
  clauses: AnalyzedClause[];
  glossary: KeyTerm[];
}

export interface UploadState {
  status: "idle" | "uploading" | "parsing" | "analyzing" | "complete" | "error";
  progress: number;
  fileName?: string;
  error?: string;
}
