"use client";

import { useState } from "react";
import { Scale, RotateCcw } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { ContractSummary } from "@/components/contract-summary";
import { ClauseCard } from "@/components/clause-card";
import { Glossary } from "@/components/glossary";
import type { ContractAnalysis, UploadState } from "@/lib/types";

export default function Home() {
  const [state, setState] = useState<UploadState>({ status: "idle", progress: 0 });
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);

  const handleAnalyze = async (formData: FormData) => {
    setState({ status: "uploading", progress: 10 });

    try {
      setState((s) => ({ ...s, status: "analyzing", progress: 40 }));
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Analysis failed");

      setAnalysis(data);
      setState({ status: "complete", progress: 100 });
    } catch (err) {
      setState({
        status: "error",
        progress: 0,
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setState({ status: "idle", progress: 0 });
  };

  const riskCounts = analysis
    ? {
        high: analysis.clauses.filter((c) => c.riskLevel === "high").length,
        medium: analysis.clauses.filter((c) => c.riskLevel === "medium").length,
        low: analysis.clauses.filter((c) => c.riskLevel === "low").length,
      }
    : null;

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Scale className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Contract Translator
            </h1>
          </div>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            Upload any legal contract and get a plain-English breakdown with risk assessment.
          </p>
        </div>

        {/* Upload or Results */}
        {!analysis ? (
          <UploadZone onAnalyze={handleAnalyze} state={state} />
        ) : (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Analyze another contract
              </button>

              {riskCounts && (
                <div className="flex items-center gap-3 text-sm">
                  {riskCounts.high > 0 && (
                    <span className="text-red-600 font-semibold">{riskCounts.high} high risk</span>
                  )}
                  {riskCounts.medium > 0 && (
                    <span className="text-yellow-600 font-semibold">{riskCounts.medium} medium</span>
                  )}
                  <span className="text-green-600 font-semibold">{riskCounts.low} low</span>
                  <span className="text-zinc-400">/ {analysis.clauses.length} clauses</span>
                </div>
              )}
            </div>

            {/* Summary */}
            <ContractSummary summary={analysis.summary} />

            {/* Clauses */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Clause-by-Clause Breakdown
              </h3>
              {analysis.clauses.map((clause) => (
                <ClauseCard key={clause.id} clause={clause} />
              ))}
            </div>

            {/* Glossary */}
            <Glossary terms={analysis.glossary} />
          </div>
        )}
      </div>
    </main>
  );
}
