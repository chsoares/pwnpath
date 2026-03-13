import Link from "next/link";
import { getCategories } from "@/lib/content";

export default function CheatsheetsIndex() {
  const categories = getCategories();
  const available = categories.filter((c) => c.status === "available");

  return (
    <div>
      <h1 className="mb-3 text-3xl font-bold tracking-tight">
        <span className="text-emerald-400">Cheatsheets</span>
      </h1>
      <p className="mb-8 text-zinc-400">
        Quick command references for each forensics discipline.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {available.map((cat) => (
          <Link
            key={cat.id}
            href={`/cheatsheets/${cat.id}`}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
          >
            <h2 className="mb-1 font-semibold text-zinc-100">{cat.name}</h2>
            <p className="text-sm text-zinc-400">
              Command references for {cat.focus.join(", ")}
            </p>
          </Link>
        ))}
      </div>
      {available.length === 0 && (
        <p className="text-zinc-500">No cheatsheets available yet.</p>
      )}
    </div>
  );
}
