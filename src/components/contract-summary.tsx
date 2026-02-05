import { FileText, Users, AlertTriangle, MessageSquare } from "lucide-react";
import { RiskBadge } from "./risk-badge";
import type { ContractSummary as SummaryType } from "@/lib/types";

export function ContractSummary({ summary }: { summary: SummaryType }) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {summary.title}
          </h2>
          <div className="flex items-center gap-2 mt-1 text-sm text-zinc-500">
            <FileText className="w-4 h-4" />
            {summary.contractType}
          </div>
        </div>
        <RiskBadge level={summary.overallRisk} size="lg" />
      </div>

      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <Users className="w-4 h-4" />
        <span className="font-medium">Parties:</span>
        {summary.parties.join(" & ")}
      </div>

      {summary.keyConcerns.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            Key Concerns
          </div>
          <ul className="space-y-1.5 ml-6">
            {summary.keyConcerns.map((concern, i) => (
              <li
                key={i}
                className="text-sm text-zinc-600 dark:text-zinc-400 list-disc"
              >
                {concern}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
        <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
          <MessageSquare className="w-4 h-4" />
          Recommendation
        </div>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          {summary.recommendation}
        </p>
      </div>
    </div>
  );
}
