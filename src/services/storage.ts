import { UserProfile, ActiveWorkoutState, WorkoutLog, WorkoutPlan, Language, ThemeMode } from '../types';

const STORAGE_KEYS = {
  USERS: 'aurafit_users_v1',
  ACTIVE_USER_ID: 'aurafit_active_user_id_v1',
  ACTIVE_WORKOUT: 'aurafit_active_workout_v1',
  WORKOUT_LOGS: 'aurafit_workout_logs_v1',
  CUSTOM_PLANS: 'aurafit_custom_plans_v1',
  SOUND_MUTED: 'aurafit_sound_muted_v1',
  FRAME_PREVIEW: 'aurafit_frame_preview_v1'
};

export const StorageService = {
  getUsers(): UserProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveUsers(users: UserProfile[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users', e);
    }
  },

  getActiveUserId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID);
    } catch {
      return null;
    }
  },

  setActiveUserId(id: string | null): void {
    try {
      if (id) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID);
      }
    } catch (e) {
      console.error('Failed to set active user id', e);
    }
  },

  getCurrentUser(): UserProfile | null {
    const activeId = this.getActiveUserId();
    if (!activeId) return null;
    const users = this.getUsers();
    return users.find(u => u.id === activeId) || null;
  },

  saveCurrentUser(profile: UserProfile): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === profile.id);
    if (index >= 0) {
      users[index] = profile;
    } else {
      users.push(profile);
    }
    this.saveUsers(users);
    this.setActiveUserId(profile.id);
  },

  updateUserMetrics(userId: string, weight: number, age: number, height: number): UserProfile | null {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return null;
    user.weight = weight;
    user.age = age;
    user.height = height;
    this.saveUsers(users);
    return user;
  },

  updateUserLanguage(userId: string, lang: Language): void {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.language = lang;
      this.saveUsers(users);
    }
  },

  updateUserTheme(userId: string, theme: ThemeMode): void {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.theme = theme;
      this.saveUsers(users);
    }
  },

  addXpToUser(userId: string, xpEarned: number): UserProfile | null {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return null;

    user.xp += xpEarned;
    
    // Check streak
    const today = new Date().toISOString().slice(0, 10);
    if (user.lastWorkoutDate) {
      const lastDate = new Date(user.lastWorkoutDate);
      const diffDays = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        user.streakDays += 1;
      } else if (diffDays > 1) {
        user.streakDays = 1;
      }
    } else {
      user.streakDays = 1;
    }
    user.lastWorkoutDate = today;

    this.saveUsers(users);
    return user;
  },

  // Active workout
  getActiveWorkout(): ActiveWorkoutState | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_WORKOUT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveActiveWorkout(state: ActiveWorkoutState | null): void {
    try {
      if (state) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_WORKOUT, JSON.stringify(state));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
      }
    } catch (e) {
      console.error('Failed to save active workout', e);
    }
  },

  // Workout History
  getWorkoutLogs(userId?: string): WorkoutLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WORKOUT_LOGS);
      const logs: WorkoutLog[] = data ? JSON.parse(data) : [];
      if (userId) {
        return logs.filter(l => l.userId === userId);
      }
      return logs;
    } catch {
      return [];
    }
  },

  saveWorkoutLog(log: WorkoutLog): void {
    try {
      const logs = this.getWorkoutLogs();
      logs.unshift(log); // newer first
      localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(logs.slice(0, 100)));
    } catch (e) {
      console.error('Failed to save workout log', e);
    }
  },

  // Custom Plans
  getCustomPlans(userId?: string): WorkoutPlan[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_PLANS);
      const plans: WorkoutPlan[] = data ? JSON.parse(data) : [];
      if (userId) {
        return plans.filter(p => p.tag === userId || p.tag === 'all');
      }
      return plans;
    } catch {
      return [];
    }
  },

  saveCustomPlan(plan: WorkoutPlan): void {
    try {
      const plans = this.getCustomPlans();
      plans.unshift(plan);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_PLANS, JSON.stringify(plans));
    } catch (e) {
      console.error('Failed to save custom plan', e);
    }
  },

  // Sound preference
  getSoundMuted(): boolean {
    return localStorage.getItem(STORAGE_KEYS.SOUND_MUTED) === 'true';
  },

  setSoundMuted(muted: boolean): void {
    localStorage.setItem(STORAGE_KEYS.SOUND_MUTED, muted ? 'true' : 'false');
  },

  // iPhone device frame preview toggle
  getFramePreview(): boolean {
    const val = localStorage.getItem(STORAGE_KEYS.FRAME_PREVIEW);
    return val === null ? true : val === 'true';
  },

  setFramePreview(enabled: boolean): void {
    localStorage.setItem(STORAGE_KEYS.FRAME_PREVIEW, enabled ? 'true' : 'false');
  },

  // Clear all data
  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  }
};