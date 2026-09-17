import React, { useState } from 'react';
import { WorkoutPlan, UserProfile, Language, ThemeMode, DifficultyLevel } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';
import { CustomPlanBanner } from './CustomPlanBanner';
import { WorkoutCard } from './WorkoutCard';
import { Search, SlidersHorizontal, PlusCircle } from 'lucide-react';

interface WorkoutCatalogViewProps {
  plans: WorkoutPlan[];
  user: UserProfile;
  language: Language;
  theme: ThemeMode;
  onStartWorkout: (plan: WorkoutPlan, dayNumber?: number) => void;
  onOpenGenerator: () => void;
}

export const WorkoutCatalogView: React.FC<WorkoutCatalogViewProps> = ({
  plans,
  user,
  language,
  theme,
  onStartWorkout,
  onOpenGenerator
}) => {
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');

  const filteredPlans = plans.filter((plan) => {
    const title = (plan.title[language] || plan.title.ru).toLowerCase();
    const goal = (plan.goal[language] || plan.goal.ru).toLowerCase();
    const q = search.toLowerCase();

    const matchesSearch = title.includes(q) || goal.includes(q);
    const matchesDiff = selectedDifficulty === 'all' || plan.difficulty === selectedDifficulty;

    return matchesSearch && matchesDiff;
  });

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      
      {/* Top Banner: Custom Plan Generator strictly separate and prominent */}
      <CustomPlanBanner
        language={language}
        theme={theme}
        onOpenGenerator={onOpenGenerator}
      />

      {/* Header & Filter Controls */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {t(language, 'catalogTitle')}
            </h2>
            <p className="text-xs text-zinc-400">
              {t(language, 'catalogSubtitle')}
            </p>
          </div>

          <span className="text-xs font-mono text-zinc-500 font-semibold">
            {filteredPlans.length} планов
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t(language, 'searchPlaceholder')}
            className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Difficulty Filter Chips (1 to 3 stars) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => {
              sound.playCheck();
              setSelectedDifficulty('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border whitespace-nowrap transition-all active:scale-95 ${
              selectedDifficulty === 'all'
                ? 'bg-white text-black border-white font-bold shadow-sm'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            {t(language, 'allDifficulties')}
          </button>

          {[
            { id: 1 as DifficultyLevel, label: t(language, 'difficulty1') },
            { id: 2 as DifficultyLevel, label: t(language, 'difficulty2') },
            { id: 3 as DifficultyLevel, label: t(language, 'difficulty3') }
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => {
                sound.playCheck();
                setSelectedDifficulty(lvl.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border whitespace-nowrap transition-all active:scale-95 ${
                selectedDifficulty === lvl.id
                  ? 'bg-white text-black border-white font-bold shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              {'★'.repeat(lvl.id)} {lvl.id}/3
            </button>
          ))}
        </div>
      </div>

      {/* Plans List */}
      <div className="space-y-4">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => (
            <WorkoutCard
              key={plan.id}
              plan={plan}
              language={language}
              theme={theme}
              onStartWorkout={onStartWorkout}
            />
          ))
        ) : (
          <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-zinc-800">
            <p className="text-sm text-zinc-400 font-medium">
              По вашему запросу ничего не найдено
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedDifficulty('all');
              }}
              className="mt-2 text-xs text-white underline font-semibold"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
};