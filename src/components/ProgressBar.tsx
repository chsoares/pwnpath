"use client";

import { useEffect, useState } from "react";
import { getCategoryProgress } from "@/lib/progress";

export default function ProgressBar({
  categoryId,
  total,
}: {
  categoryId: string;
  total: number;
}) {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setCompleted(getCategoryProgress(categoryId));
  }, [categoryId]);

  if (total === 0) return null;

  const pct = Math.round((completed / total) * 100);

  return (
    <div className="mt-4">
      <div className="mb-1 flex items-center justify-between text-xs text-drac-muted">
        <span>
          {completed}/{total} pwned
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-drac-surface">
        <div
          className="h-1.5 rounded-full bg-drac-green transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
