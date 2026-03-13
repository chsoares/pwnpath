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
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
            done
              ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
              : "border-zinc-600 bg-zinc-800 text-zinc-400"
          }`}
        >
          {done ? "✓" : challenge.position}
        </div>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 ${done ? "bg-emerald-500/40" : "bg-zinc-700"}`}
          />
        )}
      </div>

      {/* Content */}
      <Link
        href={`/${categoryId}/${challenge.challengeId}`}
        className="group mb-8 flex-1 rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
      >
        <div className="mb-1 flex items-center gap-3">
          <h3 className="font-semibold text-zinc-100 group-hover:text-white">
            {challenge.name}
          </h3>
          <DifficultyBadge difficulty={challenge.difficulty} />
        </div>
        <p className="mb-2 text-sm text-zinc-400">{challenge.keyTakeaway}</p>
        <span className="text-xs text-zinc-500">
          ⏱ {challenge.estimatedTime}
        </span>
      </Link>
    </div>
  );
}
