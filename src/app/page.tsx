import { getCategories } from "@/lib/content";
import CategoryCard from "@/components/CategoryCard";

export default function Home() {
  const categories = getCategories();

  return (
    <div>
      <div className="mb-10">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Learning <span className="text-emerald-400">Trails</span>
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Progressive learning paths through HackTheBox challenges and
          Sherlocks. Each trail builds skills from fundamentals to advanced
          topics, with structured lessons, hints, and walkthroughs.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}
