"use client";

const STORAGE_KEY = "pwnpath-progress";

interface ProgressData {
  completed: Record<string, string[]>; // categoryId -> challengeId[]
}

function getProgress(): ProgressData {
  if (typeof window === "undefined") return { completed: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completed: {} };
    return JSON.parse(raw) as ProgressData;
  } catch {
    return { completed: {} };
  }
}

function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function isCompleted(
  categoryId: string,
  challengeId: string
): boolean {
  const progress = getProgress();
  return progress.completed[categoryId]?.includes(challengeId) ?? false;
}

export function toggleCompleted(
  categoryId: string,
  challengeId: string
): boolean {
  const progress = getProgress();
  if (!progress.completed[categoryId]) {
    progress.completed[categoryId] = [];
  }
  const idx = progress.completed[categoryId].indexOf(challengeId);
  if (idx >= 0) {
    progress.completed[categoryId].splice(idx, 1);
    saveProgress(progress);
    return false;
  } else {
    progress.completed[categoryId].push(challengeId);
    saveProgress(progress);
    return true;
  }
}

export function getCategoryProgress(categoryId: string): number {
  const progress = getProgress();
  return progress.completed[categoryId]?.length ?? 0;
}

export function getCompletedChallenges(categoryId: string): string[] {
  const progress = getProgress();
  return progress.completed[categoryId] ?? [];
}
