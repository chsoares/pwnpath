import type { Difficulty } from "@/lib/types";

const colors: Record<Difficulty, string> = {
  very_easy: "bg-drac-cyan/15 text-drac-cyan border-drac-cyan/30",
  easy: "bg-drac-green/15 text-drac-green border-drac-green/30",
  medium: "bg-drac-orange/15 text-drac-orange border-drac-orange/30",
  hard: "bg-drac-red/15 text-drac-red border-drac-red/30",
  insane: "bg-drac-purple/15 text-drac-purple border-drac-purple/30",
};

export default function DifficultyBadge({
  difficulty,
}: {
  difficulty: Difficulty;
}) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium capitalize ${colors[difficulty]}`}
    >
      {difficulty.replace("_", " ")}
    </span>
  );
}
