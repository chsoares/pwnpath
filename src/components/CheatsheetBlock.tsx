import type { CheatsheetSection } from "@/lib/types";

export default function CheatsheetBlock({
  section,
}: {
  section: CheatsheetSection;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="mb-4 text-lg font-semibold text-zinc-100">
        {section.title}
      </h3>
      <div className="space-y-2">
        {section.commands.map((cmd, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 rounded-lg bg-zinc-800/50 px-4 py-3 sm:flex-row sm:items-start sm:gap-4"
          >
            <code className="shrink-0 text-sm text-emerald-400">
              {cmd.command}
            </code>
            <span className="text-sm text-zinc-400">{cmd.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
