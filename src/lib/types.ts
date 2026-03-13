export type CategoryStatus = "available" | "coming_soon";
export type Difficulty = "very_easy" | "easy" | "medium" | "hard" | "insane";
export type ChallengeSource = "sherlock" | "challenge" | "prolabs";

export interface CategorySummary {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: CategoryStatus;
  challengeCount: number;
  focus: string[];
}

export interface CategoriesIndex {
  categories: CategorySummary[];
}

export interface ToolInstallCommands {
  linux: string;
  macos: string;
  windows: string;
}

export interface CoreTool {
  name: string;
  description: string;
  installCommands: ToolInstallCommands;
}

export interface CategoryDetail {
  id: string;
  name: string;
  overview: string;
  prerequisites: string[];
  coreTools: CoreTool[];
  entryRecommendation: string;
}

export interface PathChallenge {
  position: number;
  challengeId: string;
  name: string;
  difficulty: Difficulty;
  estimatedTime: string;
  keyTakeaway: string;
}

export interface PathData {
  categoryId: string;
  challenges: PathChallenge[];
}

export interface ToolReference {
  tool: string;
  commands: string[];
}

export interface Fundamentals {
  content: string;
  toolReferences: ToolReference[];
}

export interface Hints {
  hints: string[];
}

export interface SolutionStep {
  stepNumber: number;
  description: string;
  command: string;
  explanation: string;
}

export interface Solution {
  content: string;
  steps: SolutionStep[];
}

export interface Navigation {
  previousChallengeId: string | null;
  nextChallengeId: string | null;
}

export interface ChallengeLesson {
  challengeId: string;
  name: string;
  source: ChallengeSource;
  htbUrl: string;
  difficulty: Difficulty;
  estimatedTime: string;
  keyTakeaway: string;
  tags: string[];
  fundamentals: Fundamentals;
  hints: Hints;
  solution: Solution;
  navigation: Navigation;
}

export interface CheatsheetCommand {
  command: string;
  description: string;
}

export interface CheatsheetSection {
  title: string;
  commands: CheatsheetCommand[];
}

export interface Cheatsheet {
  categoryId: string;
  title: string;
  sections: CheatsheetSection[];
}
