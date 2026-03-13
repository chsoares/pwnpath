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

  // Resolve prev/next names
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
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <svg
          className="h-4 w-4"
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
        Back to Trail
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{lesson.name}</h1>
          <DifficultyBadge difficulty={lesson.difficulty} />
        </div>
        <p className="mb-4 text-zinc-400">{lesson.keyTakeaway}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
          <span>⏱ {lesson.estimatedTime}</span>
          <span className="capitalize">📦 {lesson.source}</span>
          <a
            href={lesson.htbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 transition-colors hover:text-emerald-300"
          >
            Open on HTB →
          </a>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {lesson.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
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
          <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Key Tool Commands
            </h3>
            {lesson.fundamentals.toolReferences.map((ref) => (
              <div key={ref.tool} className="mb-3 last:mb-0">
                <h4 className="mb-1 text-sm font-medium text-zinc-200">
                  {ref.tool}
                </h4>
                <ul className="space-y-1">
                  {ref.commands.map((cmd, i) => (
                    <li key={i}>
                      <code className="text-xs text-emerald-400">{cmd}</code>
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
        <Spoiler title="💡 Hints (click to reveal)">
          <ol className="space-y-3">
            {lesson.hints.hints.map((hint, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-zinc-300"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-xs font-medium text-zinc-300">
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
        <Spoiler title="🔓 Solution Walkthrough (click to reveal)">
          <LessonSection content={lesson.solution.content} />
          {lesson.solution.steps.length > 0 && (
            <div className="mt-6 space-y-4">
              {lesson.solution.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-sm font-medium text-zinc-200">
                      {step.description}
                    </h4>
                  </div>
                  <code className="mb-2 block rounded bg-zinc-900 px-3 py-2 text-sm text-emerald-300">
                    {step.command}
                  </code>
                  <p className="text-sm text-zinc-400">{step.explanation}</p>
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
