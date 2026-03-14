"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PathChallenge } from "@/lib/types";
import DifficultyBadge from "./DifficultyBadge";
import { isCompleted } from "@/lib/progress";

export default function ChallengeStep({
  challenge,
  categoryId,
  isLast,
}: {
  challenge: PathChallenge;
  categoryId: string;
  isLast: boolean;
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(isCompleted(categoryId, challenge.challengeId));
  }, [categoryId, challenge.challengeId]);

  return (
    <div className="relative flex gap-4">
      {/* Timeline line + node */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border-2 text-sm font-bold ${
            done
              ? "border-drac-green bg-drac-green/20 text-drac-green"
              : "border-drac-surface bg-drac-bg text-drac-muted"
          }`}
        >
          {done ? (
            <span className="material-symbols-outlined text-base">check</span>
          ) : (
            challenge.position
          )}
        </div>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 ${done ? "bg-drac-green/40" : "bg-drac-border"}`}
          />
        )}
      </div>

      {/* Content */}
      <Link
        href={`/${categoryId}/${challenge.challengeId}`}
        className="group mb-8 flex-1 rounded-lg border border-drac-border bg-drac-bg p-4 transition-all hover:border-drac-purple/50 hover:bg-drac-hover"
      >
        <div className="mb-1 flex items-center gap-3">
          <h3 className="text-sm font-semibold text-drac-fg group-hover:text-drac-pink">
            {challenge.name}
          </h3>
          <DifficultyBadge difficulty={challenge.difficulty} />
        </div>
        <p className="mb-2 text-sm text-drac-muted">{challenge.keyTakeaway}</p>
        <span className="flex items-center gap-1 text-xs text-drac-muted/70">
          <span className="material-symbols-outlined text-sm">schedule</span>
          {challenge.estimatedTime}
        </span>
      </Link>
    </div>
  );
}
