import React, { useState, useEffect } from 'react';
import { UserProfile, Language, ThemeMode, WorkoutPlan, ActiveWorkoutState, WorkoutLog, WorkoutDifficultyRating } from './types';
import { StorageService } from './services/storage';
import { DEFAULT_WORKOUT_PLANS } from './services/workoutPlans';
import { sound } from './services/soundService';
import { IOSStatusBar } from './components/IOSStatusBar';
import { IOSTabBar, TabKey } from './components/IOSTabBar';
import { IOSFrameWrapper } from './components/IOSFrameWrapper';
import { OnboardingModal } from './components/OnboardingModal';
import { AccountSwitcherModal } from './components/AccountSwitcherModal';
import { CustomGeneratorModal } from './components/CustomGeneratorModal';
import { WorkoutCatalogView } from './components/WorkoutCatalogView';
import { WorkoutPlayerView } from './components/WorkoutPlayerView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';

export default function App() {
  // Persistence state
  const [users, setUsers] = useState<UserProfile[]>(() => StorageService.getUsers());
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => StorageService.getCurrentUser());
  const [activeTab, setActiveTab] = useState<TabKey>('catalog');
  const [activeSession, setActiveSession] = useState<ActiveWorkoutState | null>(() => StorageService.getActiveWorkout());
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(() => StorageService.getWorkoutLogs(currentUser?.id));
  const [customPlans, setCustomPlans] = useState<WorkoutPlan[]>(() => StorageService.getCustomPlans(currentUser?.id));
  
  // App preferences
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => !StorageService.getSoundMuted());
  const [framePreview, setFramePreview] = useState<boolean>(() => StorageService.getFramePreview());

  // Modals
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => users.length === 0 || !currentUser);
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const [showCustomGenerator, setShowCustomGenerator] = useState(false);

  // Sync sound service
  useEffect(() => {
    sound.setSoundEnabled(soundEnabled);
    StorageService.setSoundMuted(!soundEnabled);
  }, [soundEnabled]);

  // Sync frame preview
  useEffect(() => {
    StorageService.setFramePreview(framePreview);
  }, [framePreview]);

  // Sync theme to root html element
  const currentTheme = currentUser?.theme || 'black';
  const currentLang = currentUser?.language || 'ru';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'black');
    if (currentTheme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.add('dark');
    }
  }, [currentTheme]);

  // Combine default plans + custom generated plans
  const allPlans: WorkoutPlan[] = [...customPlans, ...DEFAULT_WORKOUT_PLANS];

  // Current active plan object
  const currentActivePlan = activeSession
    ? allPlans.find(p => p.id === activeSession.planId) || null
    : null;

  // Handlers
  const handleCompleteOnboarding = (profile: UserProfile) => {
    StorageService.saveCurrentUser(profile);
    const updatedUsers = StorageService.getUsers();
    setUsers(updatedUsers);
    setCurrentUser(profile);
    setShowOnboarding(false);
    setActiveTab('catalog');
  };

  const handleSelectUser = (user: UserProfile) => {
    StorageService.setActiveUserId(user.id);
    setCurrentUser(user);
    setWorkoutLogs(StorageService.getWorkoutLogs(user.id));
    setCustomPlans(StorageService.getCustomPlans(user.id));
  };

  const handleUpdateMetrics = (weight: number, age: number, height: number) => {
    if (!currentUser) return;
    const updated = StorageService.updateUserMetrics(currentUser.id, weight, age, height);
    if (updated) {
      setCurrentUser({ ...updated });
    }
  };

  const handleChangeLanguage = (lang: Language) => {
    if (!currentUser) return;
    StorageService.updateUserLanguage(currentUser.id, lang);
    setCurrentUser(prev => prev ? { ...prev, language: lang } : null);
  };

  const handleChangeTheme = (theme: ThemeMode) => {
    if (!currentUser) return;
    StorageService.updateUserTheme(currentUser.id, theme);
    setCurrentUser(prev => prev ? { ...prev, theme } : null);
  };

  const handleStartWorkout = (plan: WorkoutPlan, dayNumber: number = 1) => {
    const day = plan.days.find(d => d.dayNumber === dayNumber) || plan.days[0];
    const newSession: ActiveWorkoutState = {
      planId: plan.id,
      planTitle: plan.title[currentLang] || plan.title.ru,
      dayNumber: day.dayNumber,
      dayTitle: day.dayTitle[currentLang] || day.dayTitle.ru,
      startedAt: Date.now(),
      completedSets: {},
      adjustedSets: {}
    };

    StorageService.saveActiveWorkout(newSession);
    setActiveSession(newSession);
    setActiveTab('active');
  };

  const handleUpdateActiveSession = (state: ActiveWorkoutState | null) => {
    StorageService.saveActiveWorkout(state);
    setActiveSession(state);
  };

  const handleCancelWorkout = () => {
    StorageService.saveActiveWorkout(null);
    setActiveSession(null);
    setActiveTab('catalog');
  };

  const handleFinishWorkout = (rating: WorkoutDifficultyRating, xpEarned: number, durationSeconds: number, totalTonnage: number = 0) => {
    if (!currentUser || !activeSession) return;

    const completedSetsCount = Object.values(activeSession.completedSets).filter(Boolean).length;
    const totalSetsCount = currentActivePlan 
      ? (currentActivePlan.days.find(d => d.dayNumber === activeSession.dayNumber)?.exercises.reduce((acc, ex) => acc + ex.sets, 0) || completedSetsCount)
      : completedSetsCount;

    const newLog: WorkoutLog = {
      id: `log_${Date.now()}`,
      userId: currentUser.id,
      date: new Date().toISOString(),
      planId: activeSession.planId,
      planTitle: activeSession.planTitle,
      dayTitle: activeSession.dayTitle,
      difficultyRating: rating,
      completedSetsCount,
      totalSetsCount,
      totalTonnageKg: totalTonnage,
      xpEarned,
      durationSeconds,
      adjustmentsCount: Object.keys(activeSession.adjustedSets).length
    };

    StorageService.saveWorkoutLog(newLog);
    setWorkoutLogs(prev => [newLog, ...prev]);

    // Update user XP & Streak
    const updatedUser = StorageService.addXpToUser(currentUser.id, xpEarned);
    if (updatedUser) {
      setCurrentUser({ ...updatedUser });
    }

    // Clear active session
    StorageService.saveActiveWorkout(null);
    setActiveSession(null);
    setActiveTab('profile');
  };

  const handleCustomPlanCreated = (plan: WorkoutPlan) => {
    StorageService.saveCustomPlan(plan);
    setCustomPlans(prev => [plan, ...prev]);
    setActiveTab('catalog');
  };

  const handleResetData = () => {
    StorageService.clearAll();
    setUsers([]);
    setCurrentUser(null);
    setActiveSession(null);
    setWorkoutLogs([]);
    setCustomPlans([]);
    setShowOnboarding(true);
  };

  const handleTabChange = (tab: TabKey) => {
    if (tab === 'custom') {
      setShowCustomGenerator(true);
      return;
    }
    setActiveTab(tab);
  };

  return (
    <IOSFrameWrapper framePreview={framePreview} theme={currentTheme}>
      {/* iOS Status Bar */}
      <IOSStatusBar theme={currentTheme} hasActiveSession={!!activeSession} />

      {/* Main View Area */}
      <main className="flex-1 overflow-y-auto px-4 pt-2 pb-6 overscroll-contain scrollbar-none">
        {currentUser && (
          <>
            {activeTab === 'catalog' && (
              <WorkoutCatalogView
                plans={allPlans}
                user={currentUser}
                language={currentLang}
                theme={currentTheme}
                onStartWorkout={handleStartWorkout}
                onOpenGenerator={() => setShowCustomGenerator(true)}
              />
            )}

            {activeTab === 'active' && (
              <WorkoutPlayerView
                plan={currentActivePlan}
                activeSession={activeSession}
                language={currentLang}
                theme={currentTheme}
                onUpdateActiveSession={handleUpdateActiveSession}
                onFinishWorkout={handleFinishWorkout}
                onCancelWorkout={handleCancelWorkout}
                onGoToCatalog={() => setActiveTab('catalog')}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView
                user={currentUser}
                workoutLogs={workoutLogs}
                language={currentLang}
                theme={currentTheme}
                onUpdateMetrics={handleUpdateMetrics}
                onSwitchAccount={() => setShowAccountSwitcher(true)}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                user={currentUser}
                language={currentLang}
                theme={currentTheme}
                soundEnabled={soundEnabled}
                framePreview={framePreview}
                onChangeLanguage={handleChangeLanguage}
                onChangeTheme={handleChangeTheme}
                onToggleSound={setSoundEnabled}
                onToggleFramePreview={setFramePreview}
                onSwitchAccount={() => setShowAccountSwitcher(true)}
                onResetData={handleResetData}
              />
            )}
          </>
        )}
      </main>

      {/* iOS Bottom Floating Tab Bar */}
      <IOSTabBar
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        hasActiveSession={!!activeSession}
        language={currentLang}
        theme={currentTheme}
      />

      {/* Onboarding / Register Profile Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleCompleteOnboarding}
        defaultTheme={currentTheme}
      />

      {/* Account Switcher Modal */}
      <AccountSwitcherModal
        isOpen={showAccountSwitcher}
        onClose={() => setShowAccountSwitcher(false)}
        users={users}
        activeUserId={currentUser?.id || null}
        onSelectUser={handleSelectUser}
        onAddNewUser={() => {
          setShowAccountSwitcher(false);
          setShowOnboarding(true);
        }}
        language={currentLang}
      />

      {/* Custom Plan Generator Modal */}
      {currentUser && (
        <CustomGeneratorModal
          isOpen={showCustomGenerator}
          onClose={() => setShowCustomGenerator(false)}
          user={currentUser}
          language={currentLang}
          onPlanCreated={handleCustomPlanCreated}
        />
      )}
    </IOSFrameWrapper>
  );
}