import Link from "next/link";
import type { Navigation } from "@/lib/types";

export default function NavigationLinks({
  navigation,
  categoryId,
  prevName,
  nextName,
}: {
  navigation: Navigation;
  categoryId: string;
  prevName?: string;
  nextName?: string;
}) {
  return (
    <div className="flex items-center justify-between border-t border-zinc-800 pt-8">
      {navigation.previousChallengeId ? (
        <Link
          href={`/${categoryId}/${navigation.previousChallengeId}`}
          className="group flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
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
          <span>{prevName ?? "Previous"}</span>
        </Link>
      ) : (
        <div />
      )}
      {navigation.nextChallengeId ? (
        <Link
          href={`/${categoryId}/${navigation.nextChallengeId}`}
          className="group flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <span>{nextName ?? "Next"}</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
