import fs from "fs";
import path from "path";
import type {
  CategoriesIndex,
  CategorySummary,
  CategoryDetail,
  PathData,
  ChallengeLesson,
  Cheatsheet,
} from "./types";

const contentDir = path.join(process.cwd(), "content");

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function getCategories(): CategorySummary[] {
  const data = readJson<CategoriesIndex>(
    path.join(contentDir, "categories.json")
  );
  return data.categories;
}

export function getCategoryDetail(categoryId: string): CategoryDetail {
  return readJson<CategoryDetail>(
    path.join(contentDir, categoryId, "category.json")
  );
}

export function getCategoryPath(categoryId: string): PathData {
  return readJson<PathData>(path.join(contentDir, categoryId, "path.json"));
}

export function getChallenge(
  categoryId: string,
  challengeId: string
): ChallengeLesson {
  return readJson<ChallengeLesson>(
    path.join(contentDir, categoryId, "challenges", `${challengeId}.json`)
  );
}

export function getCheatsheet(categoryId: string): Cheatsheet {
  return readJson<Cheatsheet>(
    path.join(contentDir, categoryId, "cheatsheet.json")
  );
}

export function getAvailableCategories(): CategorySummary[] {
  return getCategories().filter((c) => c.status === "available");
}

export function getAvailableCategoryIds(): string[] {
  return getAvailableCategories().map((c) => c.id);
}

export function getChallengeIds(categoryId: string): string[] {
  const pathData = getCategoryPath(categoryId);
  return pathData.challenges.map((c) => c.challengeId);
}
