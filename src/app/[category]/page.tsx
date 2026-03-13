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
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        All Trails
      </Link>

      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          {detail.name}
        </h1>
        <LessonSection content={detail.overview} />
      </div>

      {detail.prerequisites.length > 0 && (
        <div className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Prerequisites
          </h2>
          <ul className="space-y-2">
            {detail.prerequisites.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="mt-1 text-emerald-400">•</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {detail.entryRecommendation && (
        <div className="mb-10 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-5 py-4 text-sm text-zinc-300">
          <LessonSection content={detail.entryRecommendation} />
        </div>
      )}

      <h2 className="mb-6 text-xl font-semibold">Learning Path</h2>
      <PathTrail challenges={pathData.challenges} categoryId={category} />
    </div>
  );
}
