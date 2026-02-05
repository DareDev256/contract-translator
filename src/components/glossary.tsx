"use client";

import { useState } from "react";
import { BookOpen, Search } from "lucide-react";
import type { KeyTerm } from "@/lib/types";

export function Glossary({ terms }: { terms: KeyTerm[] }) {
  const [search, setSearch] = useState("");

  const filtered = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
  );

  if (terms.length === 0) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-zinc-500" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Legal Glossary
          </h3>
          <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
            {terms.length} terms
          </span>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((term, i) => (
          <div key={i} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <dt className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {term.term}
            </dt>
            <dd className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
              {term.definition}
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}
