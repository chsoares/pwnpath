import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAvailableCategoryIds,
  getCategoryDetail,
  getCategoryPath,
} from "@/lib/content";
import PathTrail from "@/components/PathTrail";
import LessonSection from "@/components/LessonSection";

export function generateStaticParams() {
  return getAvailableCategoryIds().map((id) => ({ category: id }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const availableIds = getAvailableCategoryIds();
  if (!availableIds.includes(category)) notFound();

  const detail = getCategoryDetail(category);
  const pathData = getCategoryPath(category);

  return (
    <div>
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-drac-muted transition-colors hover:text-drac-cyan"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        cd ..
      </Link>

      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2 text-sm text-drac-muted">
          <span className="text-drac-green">root@pwnpath</span>
          <span>:~/trails$</span>
          <span className="text-drac-fg">cat {category}.md</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-drac-fg">
          {detail.name}
        </h1>
        <LessonSection content={detail.overview} />
      </div>

      {detail.prerequisites.length > 0 && (
        <div className="mb-10 rounded-lg border border-drac-border bg-drac-bg p-6">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-drac-orange">
            <span className="material-symbols-outlined text-base">checklist</span>
            Prerequisites
          </h2>
          <ul className="space-y-2">
            {detail.prerequisites.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-drac-fg/80">
                <span className="mt-0.5 text-drac-green">$</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {detail.entryRecommendation && (
        <div className="mb-10 rounded-lg border border-drac-purple/20 bg-drac-purple/5 px-5 py-4 text-sm text-drac-fg/80">
          <LessonSection content={detail.entryRecommendation} />
        </div>
      )}

      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-drac-fg">
        <span className="material-symbols-outlined text-xl text-drac-cyan">account_tree</span>
        Learning Path
      </h2>
      <PathTrail challenges={pathData.challenges} categoryId={category} />
    </div>
  );
}
