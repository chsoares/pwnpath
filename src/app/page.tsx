import { getCategories } from "@/lib/content";
import CategoryCard from "@/components/CategoryCard";

export default function Home() {
  const categories = getCategories();

  return (
    <div>
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-2 text-sm text-drac-muted">
          <span className="text-drac-green">root@pwnpath</span>
          <span>:~$</span>
          <span className="text-drac-fg">ls ./trails/</span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-drac-fg">
          Learning <span className="text-drac-purple">Trails</span>
        </h1>
        <p className="max-w-2xl text-sm text-drac-muted">
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
