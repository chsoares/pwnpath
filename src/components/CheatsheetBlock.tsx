import type { CheatsheetSection } from "@/lib/types";

export default function CheatsheetBlock({
  section,
}: {
  section: CheatsheetSection;
}) {
  return (
    <div className="rounded-lg border border-drac-border bg-drac-bg p-6">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-drac-purple">
        <span className="material-symbols-outlined text-lg">terminal</span>
        {section.title}
      </h3>
      <div className="space-y-2">
        {section.commands.map((cmd, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 rounded border border-drac-border/50 bg-drac-bg2 px-4 py-3 sm:flex-row sm:items-start sm:gap-4"
          >
            <code className="shrink-0 text-sm text-drac-green">
              $ {cmd.command}
            </code>
            <span className="text-sm text-drac-muted">{cmd.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
