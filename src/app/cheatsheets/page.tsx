import Link from "next/link";
import { getCategories } from "@/lib/content";

export default function CheatsheetsIndex() {
  const categories = getCategories();
  const available = categories.filter((c) => c.status === "available");

  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm text-drac-muted">
        <span className="text-drac-green">root@pwnpath</span>
        <span>:~$</span>
        <span className="text-drac-fg">man --list</span>
      </div>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-drac-fg">
        <span className="text-drac-purple">Cheatsheets</span>
      </h1>
      <p className="mb-8 text-sm text-drac-muted">
        Quick command references for each discipline. RTFM.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {available.map((cat) => (
          <Link
            key={cat.id}
            href={`/cheatsheets/${cat.id}`}
            className="rounded-lg border border-drac-border bg-drac-bg p-6 transition-all hover:border-drac-purple/50 hover:bg-drac-hover"
          >
            <h2 className="mb-1 flex items-center gap-2 font-semibold text-drac-fg">
              <span className="material-symbols-outlined text-base text-drac-pink">terminal</span>
              {cat.name}
            </h2>
            <p className="text-sm text-drac-muted">
              $ man {cat.focus.join(" ")}
            </p>
          </Link>
        ))}
      </div>
      {available.length === 0 && (
        <p className="text-drac-muted">// no cheatsheets available yet</p>
      )}
    </div>
  );
}
