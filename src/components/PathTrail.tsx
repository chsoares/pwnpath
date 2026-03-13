import type { PathChallenge } from "@/lib/types";
import ChallengeStep from "./ChallengeStep";

export default function PathTrail({
  challenges,
  categoryId,
}: {
  challenges: PathChallenge[];
  categoryId: string;
}) {
  return (
    <div className="mx-auto max-w-2xl">
      {challenges.map((challenge, i) => (
        <ChallengeStep
          key={challenge.challengeId}
          challenge={challenge}
          categoryId={categoryId}
          isLast={i === challenges.length - 1}
        />
      ))}
    </div>
  );
}
