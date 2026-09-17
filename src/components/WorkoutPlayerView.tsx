import React, { useState, useEffect } from 'react';
import { WorkoutPlan, ActiveWorkoutState, Language, ThemeMode, AdjustedSetData, Exercise, WorkoutDifficultyRating } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';
import { SetCheckbox } from './SetCheckbox';
import { WeightAdjustmentModal } from './WeightAdjustmentModal';
import { WorkoutSummaryModal } from './WorkoutSummaryModal';
import { Play, CheckCircle2, Scale, Clock, X, Sparkles, Timer, Plus, SkipForward, ChevronDown, ChevronUp, Dumbbell, Zap } from 'lucide-react';

interface WorkoutPlayerViewProps {
  plan: WorkoutPlan | null;
  dayNumber?: number;
  activeSession: ActiveWorkoutState | null;
  language: Language;
  theme: ThemeMode;
  onUpdateActiveSession: (state: ActiveWorkoutState | null) => void;
  onFinishWorkout: (rating: WorkoutDifficultyRating, xpEarned: number, durationSeconds: number, totalTonnage: number) => void;
  onCancelWorkout: () => void;
  onGoToCatalog: () => void;
}

export const WorkoutPlayerView: React.FC<WorkoutPlayerViewProps> = ({
  plan,
  activeSession,
  language,
  theme,
  onUpdateActiveSession,
  onFinishWorkout,
  onCancelWorkout,
  onGoToCatalog
}) => {
  const [adjustmentTarget, setAdjustmentTarget] = useState<{
    exercise: Exercise;
    setIndex: number;
    currentWeight: number;
    currentReps: number;
  } | null>(null);

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [expandedTips, setExpandedTips] = useState<Record<string, boolean>>({});

  // Rest Timer State
  const [restSecondsRemaining, setRestSecondsRemaining] = useState<number | null>(null);
  const [restTimerTotal, setRestTimerTotal] = useState<number>(60);
  const [isRestTimerRunning, setIsRestTimerRunning] = useState<boolean>(false);

  // Overall workout elapsed timer
  useEffect(() => {
    if (!activeSession) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setElapsedSeconds(Math.floor((now - activeSession.startedAt) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSession]);

  // Rest timer countdown
  useEffect(() => {
    if (!isRestTimerRunning || restSecondsRemaining === null) return;
    if (restSecondsRemaining <= 0) {
      sound.playRestFinished();
      setIsRestTimerRunning(false);
      setRestSecondsRemaining(null);
      return;
    }

    const timer = setInterval(() => {
      setRestSecondsRemaining(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRestTimerRunning, restSecondsRemaining]);

  if (!plan || !activeSession) {
    return (
      <div className="py-16 px-4 text-center select-none animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500 shadow-xl">
          <Play className="w-8 h-8 fill-zinc-700" />
        </div>
        <h3 className="text-base font-bold text-white mb-2">
          {t(language, 'noActiveSession')}
        </h3>
        <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-6">
          Выберите тренировочный сплит или сгенерируйте индивидуальную программу для старта.
        </p>
        <button
          onClick={() => {
            sound.playCheck();
            onGoToCatalog();
          }}
          className="py-3 px-6 rounded-2xl bg-white text-black font-bold text-xs shadow-lg active:scale-95 transition-all"
        >
          {t(language, 'goToCatalog')}
        </button>
      </div>
    );
  }

  const currentDay = plan.days.find(d => d.dayNumber === activeSession.dayNumber) || plan.days[0];

  const totalSets = currentDay.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const completedSetsCount = Object.values(activeSession.completedSets).filter(Boolean).length;
  const progressPercent = Math.min(100, Math.round((completedSetsCount / Math.max(1, totalSets)) * 100));

  // Compute Total Tonnage (Volume lifted in kg)
  let totalTonnageKg = 0;
  currentDay.exercises.forEach((ex) => {
    for (let s = 0; s < ex.sets; s++) {
      const key = `${ex.id}_${s}`;
      if (activeSession.completedSets[key]) {
        const adj = activeSession.adjustedSets[key];
        const w = adj ? adj.actualWeightKg : ex.defaultWeightKg;
        const r = adj ? adj.actualReps : ex.defaultReps;
        totalTonnageKg += (w * r);
      }
    }
  });

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleSet = (exerciseId: string, setIndex: number, restSeconds: number) => {
    const key = `${exerciseId}_${setIndex}`;
    const willBeCompleted = !activeSession.completedSets[key];

    const nextCompleted = {
      ...activeSession.completedSets,
      [key]: willBeCompleted
    };

    onUpdateActiveSession({
      ...activeSession,
      completedSets: nextCompleted
    });

    // If set just marked completed, start rest timer automatically!
    if (willBeCompleted) {
      const rest = restSeconds > 0 ? restSeconds : 60;
      setRestTimerTotal(rest);
      setRestSecondsRemaining(rest);
      setIsRestTimerRunning(true);
    }
  };

  const handleAdjustSet = (exercise: Exercise, setIndex: number) => {
    const key = `${exercise.id}_${setIndex}`;
    const existingAdj = activeSession.adjustedSets[key];

    const currentWeight = existingAdj ? existingAdj.actualWeightKg : exercise.defaultWeightKg;
    const currentReps = existingAdj ? existingAdj.actualReps : exercise.defaultReps;

    setAdjustmentTarget({
      exercise,
      setIndex,
      currentWeight,
      currentReps
    });
  };

  const handleConfirmAdjustment = (adjData: AdjustedSetData) => {
    if (!adjustmentTarget) return;
    const key = `${adjustmentTarget.exercise.id}_${adjustmentTarget.setIndex}`;
    
    const nextCompleted = {
      ...activeSession.completedSets,
      [key]: true
    };

    const nextAdjusted = {
      ...activeSession.adjustedSets,
      [key]: adjData
    };

    // Propagate new lighter weight to remaining sets of this exercise
    for (let s = adjustmentTarget.setIndex + 1; s < adjustmentTarget.exercise.sets; s++) {
      const remainingKey = `${adjustmentTarget.exercise.id}_${s}`;
      if (!nextAdjusted[remainingKey]) {
        nextAdjusted[remainingKey] = {
          ...adjData,
          actualWeightKg: adjData.newNextSetWeightKg,
          actualReps: adjData.originalReps
        };
      }
    }

    onUpdateActiveSession({
      ...activeSession,
      completedSets: nextCompleted,
      adjustedSets: nextAdjusted
    });

    // Start rest timer
    setRestTimerTotal(adjustmentTarget.exercise.restSeconds || 60);
    setRestSecondsRemaining(adjustmentTarget.exercise.restSeconds || 60);
    setIsRestTimerRunning(true);
  };

  const toggleTips = (id: string) => {
    sound.playCheck();
    setExpandedTips(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4 pb-16 select-none animate-fade-in">
      
      {/* Session Header Card */}
      <div className="rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 p-4 shadow-xl text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              {t(language, 'activeWorkoutHeader')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 font-mono text-xs text-zinc-300 bg-black/60 px-2.5 py-1 rounded-xl border border-zinc-800">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{formatTimer(elapsedSeconds)}</span>
            </div>

            <button
              onClick={() => {
                if (window.confirm(t(language, 'confirmCancelWorkout'))) {
                  sound.playUncheck();
                  onCancelWorkout();
                }
              }}
              className="p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 active:scale-95 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h2 className="text-base font-extrabold tracking-tight">
          {currentDay.dayTitle[language] || currentDay.dayTitle.ru}
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          {plan.title[language] || plan.title.ru} • {currentDay.focus[language] || currentDay.focus.ru}
        </p>

        {/* Stats Strip */}
        <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-zinc-850 text-xs">
          <div className="flex-1">
            <div className="flex items-center justify-between text-[11px] font-medium text-zinc-400 mb-1">
              <span>{t(language, 'completedSetsCount', { done: completedSetsCount, total: totalSets })}</span>
              <span className="font-bold text-white font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-zinc-300 to-white transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {totalTonnageKg > 0 && (
            <div className="border-l border-zinc-800 pl-3 text-right">
              <span className="text-[10px] text-zinc-500 block uppercase font-bold">Тоннаж</span>
              <span className="text-xs font-mono font-bold text-amber-300">{totalTonnageKg.toLocaleString()} кг</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Interactive Rest Timer Bar */}
      {restSecondsRemaining !== null && (
        <div className="sticky top-2 z-30 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/20 p-3 shadow-2xl flex items-center justify-between animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white font-mono font-extrabold text-sm">
              {restSecondsRemaining}s
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {t(language, 'restTimerTitle')}
              </span>
              <span className="text-[10px] text-zinc-400">
                Дышите глубоко, восстанавливайте пульс
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                sound.playCheck();
                setRestSecondsRemaining(prev => (prev || 0) + 30);
              }}
              className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 text-[10px] font-bold active:scale-95 transition-all"
            >
              +30с
            </button>
            <button
              onClick={() => {
                sound.playUncheck();
                setIsRestTimerRunning(false);
                setRestSecondsRemaining(null);
              }}
              className="px-2.5 py-1 rounded-lg bg-white text-black text-[10px] font-bold active:scale-95 transition-all"
            >
              {t(language, 'skipRestBtn')}
            </button>
          </div>
        </div>
      )}

      {/* Exercises List */}
      <div className="space-y-3.5">
        {currentDay.exercises.map((exercise, exIndex) => {
          const isTipsOpen = !!expandedTips[exercise.id];

          return (
            <div
              key={exercise.id || exIndex}
              className="rounded-3xl bg-zinc-950 border border-zinc-800 p-4 shadow-md text-white transition-all"
            >
              {/* Exercise Header */}
              <div className="mb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold tracking-tight text-white">
                    {exercise.name[language] || exercise.name.ru}
                  </h3>
                  <span className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-md border border-zinc-800 font-medium">
                    {exercise.muscleGroup[language] || exercise.muscleGroup.ru}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-zinc-500">
                    Отдых: {exercise.restSeconds}с
                  </span>

                  <button
                    onClick={() => toggleTips(exercise.id)}
                    className="text-[10px] text-zinc-400 hover:text-zinc-200 flex items-center gap-0.5 underline underline-offset-2"
                  >
                    <span>{isTipsOpen ? 'Скрыть технику' : 'Техника'}</span>
                    {isTipsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>

                {isTipsOpen && (
                  <div className="mt-2 p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 text-[11px] text-zinc-300 leading-relaxed animate-fade-in">
                    {exercise.description[language] || exercise.description.ru}
                  </div>
                )}
              </div>

              {/* Sets Table */}
              <div className="space-y-2">
                {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                  const setKey = `${exercise.id}_${setIdx}`;
                  const isDone = !!activeSession.completedSets[setKey];
                  const adj = activeSession.adjustedSets[setKey];

                  const targetWeight = adj ? adj.actualWeightKg : exercise.defaultWeightKg;
                  const targetReps = adj ? adj.actualReps : exercise.defaultReps;

                  return (
                    <div
                      key={setIdx}
                      className={`p-2.5 rounded-2xl border flex items-center justify-between transition-all ${
                        isDone
                          ? 'bg-zinc-900/90 border-zinc-700 ring-1 ring-white/10'
                          : 'bg-zinc-900/40 border-zinc-850'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 text-center text-xs font-mono font-bold text-zinc-500">
                          #{setIdx + 1}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white font-mono">
                            {targetReps} {t(language, 'repsLabel', { reps: '' }).trim()}
                          </span>
                          <span className="text-zinc-600">×</span>
                          <span className="text-xs font-bold text-zinc-300 font-mono">
                            {targetWeight > 0 ? `${targetWeight} кг` : 'Свой вес'}
                          </span>

                          {adj && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/80 text-amber-300 font-bold">
                              СКОРРЕКТИРОВАНО
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* "Не справился с весом" button */}
                        <button
                          type="button"
                          onClick={() => handleAdjustSet(exercise, setIdx)}
                          className="py-1 px-2.5 rounded-xl bg-zinc-850 hover:bg-zinc-800 text-[10px] font-semibold text-zinc-300 hover:text-white border border-zinc-700/60 flex items-center gap-1 active:scale-95 transition-all shadow-sm"
                          title="Скорректировать вес и нагрузку"
                        >
                          <Scale className="w-3 h-3 text-zinc-400" />
                          <span>{t(language, 'failedWeightShort')}</span>
                        </button>

                        {/* Animated Checkbox */}
                        <SetCheckbox
                          completed={isDone}
                          onToggle={() => handleToggleSet(exercise.id, setIdx, exercise.restSeconds)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coach note if any set was adjusted */}
              {Array.from({ length: exercise.sets }).some((_, i) => !!activeSession.adjustedSets[`${exercise.id}_${i}`]) && (
                <div className="mt-3 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Нагрузка на это упражнение адаптирована под текущий уровень сил. Продолжайте в чистой технике!
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Finish Workout CTA */}
      <div className="pt-3">
        <button
          onClick={() => {
            sound.playCheck();
            setShowSummaryModal(true);
          }}
          className="w-full py-4 px-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-2xl active:scale-[0.98] transition-all"
        >
          <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5]" />
          <span>{t(language, 'finishWorkoutBtn')}</span>
        </button>
      </div>

      {/* Weight Adjustment Modal */}
      {adjustmentTarget && (
        <WeightAdjustmentModal
          isOpen={true}
          onClose={() => setAdjustmentTarget(null)}
          exercise={adjustmentTarget.exercise}
          currentSetIndex={adjustmentTarget.setIndex}
          currentWeightKg={adjustmentTarget.currentWeight}
          currentReps={adjustmentTarget.currentReps}
          language={language}
          onConfirmAdjustment={handleConfirmAdjustment}
        />
      )}

      {/* Summary / Difficulty Rating Modal */}
      <WorkoutSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        completedSetsCount={completedSetsCount}
        totalSetsCount={totalSets}
        durationSeconds={elapsedSeconds}
        language={language}
        onSaveWorkout={(rating, xpEarned) => {
          setShowSummaryModal(false);
          onFinishWorkout(rating, xpEarned, elapsedSeconds, totalTonnageKg);
        }}
      />
    </div>
  );
};