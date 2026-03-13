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
    <div className="flex items-center justify-between border-t border-drac-border pt-8">
      {navigation.previousChallengeId ? (
        <Link
          href={`/${categoryId}/${navigation.previousChallengeId}`}
          className="group flex items-center gap-2 text-sm text-drac-muted transition-colors hover:text-drac-cyan"
        >
          <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-0.5">
            arrow_back
          </span>
          <span>{prevName ?? "Previous"}</span>
        </Link>
      ) : (
        <div />
      )}
      {navigation.nextChallengeId ? (
        <Link
          href={`/${categoryId}/${navigation.nextChallengeId}`}
          className="group flex items-center gap-2 text-sm text-drac-muted transition-colors hover:text-drac-cyan"
        >
          <span>{nextName ?? "Next"}</span>
          <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
