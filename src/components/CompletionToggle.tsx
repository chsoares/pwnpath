"use client";

import { useEffect, useState } from "react";
import { isCompleted, toggleCompleted } from "@/lib/progress";

export default function CompletionToggle({
  categoryId,
  challengeId,
}: {
  categoryId: string;
  challengeId: string;
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(isCompleted(categoryId, challengeId));
  }, [categoryId, challengeId]);

  return (
    <button
      onClick={() => setDone(toggleCompleted(categoryId, challengeId))}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
        done
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
          : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700"
      }`}
    >
      {done ? (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Completed
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
          </svg>
          Mark as Complete
        </>
      )}
    </button>
  );
}
