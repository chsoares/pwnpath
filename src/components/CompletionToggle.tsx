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
      className={`inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-medium transition-all ${
        done
          ? "border-drac-green/30 bg-drac-green/10 text-drac-green hover:bg-drac-green/20"
          : "border-drac-border bg-drac-surface/50 text-drac-fg hover:border-drac-purple/50 hover:bg-drac-hover"
      }`}
    >
      <span className="material-symbols-outlined text-base">
        {done ? "check_circle" : "radio_button_unchecked"}
      </span>
      {done ? "pwned" : "mark as pwned"}
    </button>
  );
}
