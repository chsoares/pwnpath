"use client";

import { useState } from "react";

export default function Spoiler({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-drac-border bg-drac-bg">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-drac-fg transition-colors hover:text-drac-pink"
      >
        <span className="flex items-center gap-2">
          {icon && (
            <span className="material-symbols-outlined text-base text-drac-purple">
              {icon}
            </span>
          )}
          {title}
        </span>
        <span
          className={`material-symbols-outlined text-base text-drac-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>
      {open && (
        <div className="border-t border-drac-border px-5 py-4">{children}</div>
      )}
    </div>
  );
}
