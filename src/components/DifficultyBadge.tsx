import type { Difficulty } from "@/lib/types";

const colors: Record<Difficulty, string> = {
  easy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  hard: "bg-red-500/15 text-red-400 border-red-500/30",
  insane: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: Difficulty;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${colors[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
