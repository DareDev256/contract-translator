export const CLAUSE_SPLIT_PROMPT = `You are a legal document parser. Split this contract into individual clauses or sections. Return a JSON object with a "clauses" key containing an array of strings, where each string is one clause/section. Keep section headers with their content. Do not modify the text.

Contract text:
{text}

Return ONLY valid JSON. No explanation.`;

export const CLAUSE_ANALYSIS_PROMPT = `You are a legal translator making contracts understandable for non-lawyers.

Analyze this contract clause and return a JSON object with:
- "plainEnglish": A clear, friendly plain-English translation. Use "you" and "they" instead of legal party names where possible. Be specific about what this means practically.
- "riskLevel": "low", "medium", or "high" based on how much this clause could negatively affect someone signing this contract.
- "riskExplanation": One sentence explaining why this risk level was assigned. Only include if medium or high.
- "keyTerms": Array of {"term": "...", "definition": "..."} for any legal jargon in this clause. Only include terms that a non-lawyer might not understand.

Clause:
{clause}

Return ONLY valid JSON. No explanation.`;

export const SUMMARY_PROMPT = `You are a legal contract analyst. Provide a high-level summary of this entire contract.

Return a JSON object with:
- "title": A descriptive name for this contract (e.g., "Residential Lease Agreement", "Software License Terms")
- "contractType": The category (e.g., "Lease", "Employment", "NDA", "Terms of Service", "License")
- "parties": Array of party names/roles involved
- "overallRisk": "low", "medium", or "high" — overall risk assessment for the person reviewing this
- "keyConcerns": Array of 2-5 strings describing the most important things to watch out for
- "recommendation": One paragraph of practical advice about this contract

Full contract text:
{text}

Return ONLY valid JSON. No explanation.`;
