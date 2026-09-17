import React, { useState } from 'react';
import { WorkoutPlan, Language, ThemeMode } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';
import { Play, Calendar, Target, ChevronDown, ChevronUp, Clock, Dumbbell } from 'lucide-react';

interface WorkoutCardProps {
  plan: WorkoutPlan;
  language: Language;
  theme: ThemeMode;
  onStartWorkout: (plan: WorkoutPlan, dayNumber?: number) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  plan,
  language,
  theme,
  onStartWorkout
}) => {
  const [expanded, setExpanded] = useState(false);
  const isLight = theme === 'light';

  // Difficulty badge
  const difficultyStars = '★'.repeat(plan.difficulty) + '☆'.repeat(3 - plan.difficulty);
  const difficultyText = 
    plan.difficulty === 1 ? t(language, 'difficulty1') :
    plan.difficulty === 2 ? t(language, 'difficulty2') :
    t(language, 'difficulty3');

  const totalExercises = plan.days.reduce((acc, d) => acc + d.exercises.length, 0);

  return (
    <div className={`rounded-3xl border transition-all duration-200 select-none overflow-hidden ${
      isLight
        ? 'bg-white border-zinc-200 shadow-sm text-zinc-900'
        : theme === 'black'
          ? 'bg-zinc-950 border-zinc-850 shadow-md text-white'
          : 'bg-[#141416] border-zinc-800/80 shadow-md text-white'
    }`}>
      <div className="p-4 sm:p-5">
        
        {/* Badges row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            {/* Difficulty Badge */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight border ${
              plan.difficulty === 1
                ? 'bg-zinc-800 text-zinc-300 border-zinc-700'
                : plan.difficulty === 2
                  ? 'bg-zinc-800 text-zinc-100 border-zinc-600'
                  : 'bg-white text-black border-white'
            }`}>
              <span>{difficultyStars}</span>
              <span>{difficultyText}</span>
            </span>

            {plan.isCustom && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-amber-300 border border-amber-400/30 font-bold">
                CUSTOM
              </span>
            )}
          </div>

          {/* Frequency (times per week) */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {plan.frequencyPerWeek >= 5 
                ? t(language, 'frequencyValue5', { count: plan.frequencyPerWeek })
                : t(language, 'frequencyValue', { count: plan.frequencyPerWeek })}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold tracking-tight leading-snug">
          {plan.title[language] || plan.title.ru}
        </h3>

        {/* Goal */}
        <div className="flex items-start gap-1.5 text-xs text-zinc-400 mt-1.5">
          <Target className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-zinc-300" />
          <span className="font-medium text-zinc-300 leading-snug">
            {plan.goal[language] || plan.goal.ru}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-500 mt-2 leading-relaxed line-clamp-2">
          {plan.description[language] || plan.description.ru}
        </p>

        {/* Stats strip */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-zinc-800/40 text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-zinc-500" />
            {plan.estimatedMinutesPerSession} мин / трен.
          </span>
          <span className="flex items-center gap-1">
            <Dumbbell className="w-3 h-3 text-zinc-500" />
            {t(language, 'exercisesCount', { count: totalExercises })}
          </span>
          <span className="text-zinc-500">
            {plan.days.length} дня(ей) в сплите
          </span>
        </div>

        {/* Actions Button Row */}
        <div className="flex items-center gap-2.5 mt-4">
          <button
            onClick={() => {
              sound.playCheck();
              onStartWorkout(plan, 1);
            }}
            className="flex-1 py-2.5 px-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>{t(language, 'startWorkoutBtn')}</span>
          </button>

          <button
            onClick={() => {
              sound.playCheck();
              setExpanded(!expanded);
            }}
            className={`py-2.5 px-3 rounded-2xl border text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 ${
              isLight
                ? 'border-zinc-300 text-zinc-700 bg-zinc-100 hover:bg-zinc-200'
                : 'border-zinc-800 text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800'
            }`}
          >
            <span>{expanded ? t(language, 'hideWorkoutDetails') : t(language, 'viewWorkoutDetails')}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Split Accordion */}
      {expanded && (
        <div className={`p-4 pt-0 border-t ${
          isLight ? 'bg-zinc-50/70 border-zinc-200' : 'bg-zinc-900/40 border-zinc-850'
        }`}>
          <div className="space-y-3 mt-3">
            {plan.days.map((day) => (
              <div key={day.dayNumber} className="rounded-2xl p-3 border border-zinc-800/80 bg-zinc-900/80">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-white">
                    {day.dayTitle[language] || day.dayTitle.ru}
                  </h4>
                  <button
                    onClick={() => {
                      sound.playCheck();
                      onStartWorkout(plan, day.dayNumber);
                    }}
                    className="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-2 py-0.5 rounded-lg border border-zinc-700 active:scale-95 transition-all"
                  >
                    Старт дня {day.dayNumber}
                  </button>
                </div>
                <div className="space-y-1.5">
                  {day.exercises.map((ex, idx) => (
                    <div key={ex.id || idx} className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span className="truncate pr-2">• {ex.name[language] || ex.name.ru}</span>
                      <span className="font-mono text-zinc-300 flex-shrink-0">
                        {ex.sets} × {ex.defaultReps} {ex.defaultWeightKg > 0 ? `(${ex.defaultWeightKg}кг)` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};