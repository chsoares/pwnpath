import Link from "next/link";
import type { CategorySummary } from "@/lib/types";
import ComingSoon from "./ComingSoon";
import ProgressBar from "./ProgressBar";

const iconMap: Record<string, string> = {
  network: "lan",
  memory: "memory",
  disk: "storage",
  logs: "query_stats",
  malware: "bug_report",
  reverse: "build",
  exploit: "bolt",
};

export default function CategoryCard({
  category,
}: {
  category: CategorySummary;
}) {
  const isAvailable = category.status === "available";
  const icon = iconMap[category.icon] ?? "folder";

  const card = (
    <div className="group relative flex h-64 flex-col rounded-lg border border-drac-border bg-drac-bg p-5 transition-all hover:border-drac-purple/50 hover:bg-drac-hover">
      {!isAvailable && <ComingSoon />}
      <div className="mb-3 flex items-center gap-3">
        <span className="material-symbols-outlined text-2xl text-drac-pink">
          {icon}
        </span>
        <h2 className="text-base font-semibold text-drac-fg">
          {category.name}
        </h2>
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-drac-muted">
        {category.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {category.focus.map((f) => (
          <span
            key={f}
            className="rounded border border-drac-border bg-drac-surface/50 px-2 py-0.5 text-xs text-drac-orange"
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
