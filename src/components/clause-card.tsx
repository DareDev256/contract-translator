"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { RiskBadge } from "./risk-badge";
import type { AnalyzedClause } from "@/lib/types";

export function ClauseCard({ clause }: { clause: AnalyzedClause }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-start justify-between gap-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
              Clause {clause.id}
            </span>
            <RiskBadge level={clause.riskLevel} />
          </div>
          <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
            {clause.plainEnglish}
          </p>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-zinc-400 shrink-0 mt-1" />
        ) : (
          <ChevronDown className="w-5 h-5 text-zinc-400 shrink-0 mt-1" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <div>
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Original Text
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl">
              {clause.originalText}
            </p>
          </div>

          {clause.riskExplanation && (
            <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-semibold">Risk note:</span>{" "}
                {clause.riskExplanation}
              </p>
            </div>
          )}

          {clause.keyTerms.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Key Terms
              </h4>
              <div className="space-y-1.5">
                {clause.keyTerms.map((term, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {term.term}:
                    </span>{" "}
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {term.definition}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
