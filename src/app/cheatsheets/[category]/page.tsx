import { notFound } from "next/navigation";
import Link from "next/link";
import { getAvailableCategoryIds, getCheatsheet } from "@/lib/content";
import CheatsheetBlock from "@/components/CheatsheetBlock";

export function generateStaticParams() {
  return getAvailableCategoryIds().map((id) => ({ category: id }));
}

export default async function CheatsheetPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const availableIds = getAvailableCategoryIds();
  if (!availableIds.includes(category)) notFound();

  const cheatsheet = getCheatsheet(category);

  return (
    <div>
      <Link
        href="/cheatsheets"
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
        All Cheatsheets
      </Link>

      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        {cheatsheet.title}
      </h1>

      <div className="space-y-6">
        {cheatsheet.sections.map((section, i) => (
          <CheatsheetBlock key={i} section={section} />
        ))}
      </div>
    </div>
  );
}
