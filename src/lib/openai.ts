import OpenAI from "openai";
import {
  CLAUSE_SPLIT_PROMPT,
  CLAUSE_ANALYSIS_PROMPT,
  SUMMARY_PROMPT,
} from "./prompts";
import type {
  AnalyzedClause,
  ContractAnalysis,
  ContractSummary,
  KeyTerm,
} from "./types";

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

async function callGPT(prompt: string): Promise<string> {
  const response = await getClient().chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
    response_format: { type: "json_object" },
  });
  return response.choices[0].message.content ?? "{}";
}

export async function splitIntoClauses(text: string): Promise<string[]> {
  const prompt = CLAUSE_SPLIT_PROMPT.replace("{text}", text);
  const result = await callGPT(prompt);
  const parsed = JSON.parse(result);
  return Array.isArray(parsed) ? parsed : parsed.clauses ?? [];
}

export async function analyzeClause(
  clause: string,
  id: number
): Promise<AnalyzedClause> {
  const prompt = CLAUSE_ANALYSIS_PROMPT.replace("{clause}", clause);
  const result = await callGPT(prompt);
  const parsed = JSON.parse(result);
  return {
    id,
    originalText: clause,
    plainEnglish: parsed.plainEnglish ?? "",
    riskLevel: parsed.riskLevel ?? "low",
    riskExplanation: parsed.riskExplanation ?? "",
    keyTerms: parsed.keyTerms ?? [],
  };
}

export async function summarizeContract(
  text: string
): Promise<ContractSummary> {
  const prompt = SUMMARY_PROMPT.replace("{text}", text);
  const result = await callGPT(prompt);
  return JSON.parse(result);
}

export async function analyzeContract(
  text: string
): Promise<ContractAnalysis> {
  const [clauses, summary] = await Promise.all([
    splitIntoClauses(text),
    summarizeContract(text),
  ]);

  // Analyze all clauses in parallel
  const analyzedClauses = await Promise.all(
    clauses.map((clause, i) => analyzeClause(clause, i + 1))
  );

  // Build deduplicated glossary
  const glossaryMap = new Map<string, string>();
  for (const clause of analyzedClauses) {
    for (const term of clause.keyTerms) {
      if (!glossaryMap.has(term.term.toLowerCase())) {
        glossaryMap.set(term.term.toLowerCase(), term.definition);
      }
    }
  }
  const glossary: KeyTerm[] = Array.from(glossaryMap.entries())
    .map(([term, definition]) => ({ term, definition }))
    .sort((a, b) => a.term.localeCompare(b.term));

  return { summary, clauses: analyzedClauses, glossary };
}
