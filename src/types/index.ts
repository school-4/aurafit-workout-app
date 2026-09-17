export type Language = 'ru' | 'en' | 'zh';
export type ThemeMode = 'black' | 'dark' | 'light';

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  weight: number; // in kg
  age: number;    // in years
  height: number; // in cm
  language: Language;
  theme: ThemeMode;
  currentRankTier: number; // 1 to 8
  xp: number;
  streakDays: number;
  lastWorkoutDate: string | null;
  createdAt: string;
}

export type DifficultyLevel = 1 | 2 | 3;

export interface Exercise {
  id: string;
  name: {
    ru: string;
    en: string;
    zh: string;
  };
  muscleGroup: {
    ru: string;
    en: string;
    zh: string;
  };
  sets: number;
  defaultReps: number;
  defaultWeightKg: number;
  restSeconds: number;
  description: {
    ru: string;
    en: string;
    zh: string;
  };
}

export interface WorkoutDay {
  dayNumber: number;
  dayTitle: {
    ru: string;
    en: string;
    zh: string;
  };
  focus: {
    ru: string;
    en: string;
    zh: string;
  };
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  title: {
    ru: string;
    en: string;
    zh: string;
  };
  description: {
    ru: string;
    en: string;
    zh: string;
  };
  goal: {
    ru: string;
    en: string;
    zh: string;
  };
  difficulty: DifficultyLevel; // 1: Beginner, 2: Intermediate, 3: Pro
  frequencyPerWeek: number;    // e.g. 3, 4, 5
  estimatedMinutesPerSession: number;
  tag: string;
  isCustom?: boolean;
  days: WorkoutDay[];
}

export interface AdjustedSetData {
  actualReps: number;
  actualWeightKg: number;
  originalReps: number;
  originalWeightKg: number;
  recalibratedAdvice: {
    ru: string;
    en: string;
    zh: string;
  };
  newNextSetWeightKg: number;
}

export interface ActiveWorkoutState {
  planId: string;
  planTitle: string;
  dayNumber: number;
  dayTitle: string;
  startedAt: number;
  completedSets: Record<string, boolean>; // key: `${exerciseId}_${setIndex}`
  adjustedSets: Record<string, AdjustedSetData>; // key: `${exerciseId}_${setIndex}`
}

export type WorkoutDifficultyRating = 1 | 2 | 3 | 4; 

export interface WorkoutLog {
  id: string;
  userId: string;
  date: string;
  planId: string;
  planTitle: string;
  dayTitle: string;
  difficultyRating: WorkoutDifficultyRating;
  completedSetsCount: number;
  totalSetsCount: number;
  totalTonnageKg: number;
  xpEarned: number;
  durationSeconds: number;
  adjustmentsCount: number;
}