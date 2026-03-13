import Link from "next/link";
import type { CategorySummary } from "@/lib/types";
import ComingSoon from "./ComingSoon";
import ProgressBar from "./ProgressBar";

const iconMap: Record<string, string> = {
  network: "🌐",
  memory: "🧠",
  disk: "💾",
  logs: "📋",
  malware: "🦠",
  reverse: "🔬",
  exploit: "💥",
};

export default function CategoryCard({
  category,
}: {
  category: CategorySummary;
}) {
  const isAvailable = category.status === "available";
  const icon = iconMap[category.icon] ?? "📁";

  const card = (
    <div className="group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-800/50">
      {!isAvailable && <ComingSoon />}
      <div className="mb-3 text-3xl">{icon}</div>
      <h2 className="mb-2 text-lg font-semibold text-zinc-100">
        {category.name}
      </h2>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400">
        {category.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {category.focus.map((f) => (
          <span
            key={f}
            className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
          >
            {f}
          </span>
        ))}
      </div>
      {isAvailable && (
        <ProgressBar
          categoryId={category.id}
          total={category.challengeCount}
        />
      )}
    </div>
  );

  if (!isAvailable) return card;

  return (
    <Link href={`/${category.id}`} className="block">
      {card}
    </Link>
  );
}
