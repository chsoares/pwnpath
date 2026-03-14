import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAvailableCategoryIds,
  getChallengeIds,
  getChallenge,
  getCategoryPath,
} from "@/lib/content";
import DifficultyBadge from "@/components/DifficultyBadge";
import LessonSection from "@/components/LessonSection";
import Spoiler from "@/components/Spoiler";
import NavigationLinks from "@/components/NavigationLinks";
import CompletionToggle from "@/components/CompletionToggle";

export function generateStaticParams() {
  const params: { category: string; challenge: string }[] = [];
  for (const catId of getAvailableCategoryIds()) {
    for (const chalId of getChallengeIds(catId)) {
      params.push({ category: catId, challenge: chalId });
    }
  }
  return params;
}

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ category: string; challenge: string }>;
}) {
  const { category, challenge } = await params;

  const availableIds = getAvailableCategoryIds();
  if (!availableIds.includes(category)) notFound();

  const challengeIds = getChallengeIds(category);
  if (!challengeIds.includes(challenge)) notFound();

  const lesson = getChallenge(category, challenge);
  const pathData = getCategoryPath(category);

  const prevName = lesson.navigation.previousChallengeId
    ? pathData.challenges.find(
        (c) => c.challengeId === lesson.navigation.previousChallengeId
      )?.name
    : undefined;
  const nextName = lesson.navigation.nextChallengeId
    ? pathData.challenges.find(
        (c) => c.challengeId === lesson.navigation.nextChallengeId
      )?.name
    : undefined;

  return (
    <div>
      <Link
        href={`/${category}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-drac-muted transition-colors hover:text-drac-pink"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        cd ..
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm text-drac-muted">
          <span className="text-drac-green">root@pwnpath</span>
          <span>:~/trails/{category}$</span>
          <span className="text-drac-fg">./{challenge}</span>
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-drac-fg">{lesson.name}</h1>
          <DifficultyBadge difficulty={lesson.difficulty} />
        </div>
        <p className="mb-4 text-sm text-drac-muted">{lesson.keyTakeaway}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-drac-muted">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">schedule</span>
            {lesson.estimatedTime}
          </span>
          <span className="flex items-center gap-1 capitalize">
            <span className="material-symbols-outlined text-sm">inventory_2</span>
            {lesson.source}
          </span>
          <a
            href={lesson.htbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-drac-pink transition-colors hover:text-drac-pink"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            HTB
          </a>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {lesson.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-drac-border bg-drac-surface/50 px-2 py-0.5 text-xs text-drac-orange"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Fundamentals */}
      <section className="mb-8">
        <LessonSection content={lesson.fundamentals.content} />
        {lesson.fundamentals.toolReferences.length > 0 && (
          <div className="mt-6 rounded-lg border border-drac-border bg-drac-bg p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-drac-pink">
              <span className="material-symbols-outlined text-base">build</span>
              Key Tool Commands
            </h3>
            {lesson.fundamentals.toolReferences.map((ref) => (
              <div key={ref.tool} className="mb-3 last:mb-0">
                <h4 className="mb-1 text-sm font-medium text-drac-purple">
                  {ref.tool}
                </h4>
                <ul className="space-y-1">
                  {ref.commands.map((cmd, i) => (
                    <li key={i}>
                      <code className="text-xs text-drac-green">$ {cmd}</code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Hints */}
      <section className="mb-6">
        <Spoiler title="Hints (click to reveal)" icon="lightbulb">
          <ol className="space-y-3">
            {lesson.hints.hints.map((hint, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-drac-fg/80"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-drac-surface text-xs font-medium text-drac-yellow">
                  {i + 1}
                </span>
                {hint}
              </li>
            ))}
          </ol>
        </Spoiler>
      </section>

      {/* Solution */}
      <section className="mb-10">
        <Spoiler title="Solution Walkthrough (click to reveal)" icon="lock_open">
          <LessonSection content={lesson.solution.content} />
          {lesson.solution.steps.length > 0 && (
            <div className="mt-6 space-y-4">
              {lesson.solution.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="rounded-lg border border-drac-border bg-drac-bg2 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-drac-green/20 text-xs font-bold text-drac-green">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-sm font-medium text-drac-fg">
                      {step.description}
                    </h4>
                  </div>
                  <code className="mb-2 block rounded border border-drac-border bg-drac-bg px-3 py-2 text-sm text-drac-green">
                    $ {step.command}
                  </code>
                  <p className="text-sm text-drac-muted">{step.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </Spoiler>
      </section>

      {/* Completion + Navigation */}
      <div className="mb-8 flex justify-center">
        <CompletionToggle categoryId={category} challengeId={challenge} />
      </div>
      <NavigationLinks
        navigation={lesson.navigation}
        categoryId={category}
        prevName={prevName}
        nextName={nextName}
      />
    </div>
  );
}
