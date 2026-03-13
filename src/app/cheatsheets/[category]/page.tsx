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
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-drac-muted transition-colors hover:text-drac-cyan"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        cd ..
      </Link>

      <div className="mb-3 flex items-center gap-2 text-sm text-drac-muted">
        <span className="text-drac-green">root@pwnpath</span>
        <span>:~$</span>
        <span className="text-drac-fg">man {category}</span>
      </div>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-drac-fg">
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
