import React, { useState } from 'react';
import { UserProfile, Language, ThemeMode, WorkoutLog } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';
import { RankBadge } from './RankBadge';
import { Flame, Dumbbell, Activity, Edit3, Shield, Weight } from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  workoutLogs: WorkoutLog[];
  language: Language;
  theme: ThemeMode;
  onUpdateMetrics: (weight: number, age: number, height: number) => void;
  onSwitchAccount: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  workoutLogs,
  language,
  theme,
  onUpdateMetrics,
  onSwitchAccount
}) => {
  const [isEditingMetrics, setIsEditingMetrics] = useState(false);
  const [weight, setWeight] = useState(user.weight.toString());
  const [age, setAge] = useState(user.age.toString());
  const [height, setHeight] = useState(user.height.toString());

  // Cumulative Tonnage
  const cumulativeTonnageKg = workoutLogs.reduce((acc, log) => acc + (log.totalTonnageKg || 0), 0);
  const tonnageText = cumulativeTonnageKg >= 1000 
    ? `${(cumulativeTonnageKg / 1000).toFixed(1)} т` 
    : `${cumulativeTonnageKg} кг`;

  // BMI Calculation
  const heightM = user.height / 100;
  const bmi = heightM > 0 ? (user.weight / (heightM * heightM)).toFixed(1) : '22.0';
  const bmiNum = parseFloat(bmi);
  const bmiCategory = 
    bmiNum < 18.5 ? t(language, 'bmiUnderweight') :
    bmiNum <= 24.9 ? t(language, 'bmiNormal') :
    t(language, 'bmiOverweight');

  const handleSaveMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const a = parseInt(age, 10);
    const h = parseFloat(height);
    if (!isNaN(w) && !isNaN(a) && !isNaN(h) && w > 0 && a > 0 && h > 0) {
      sound.playCheck();
      onUpdateMetrics(w, a, h);
      setIsEditingMetrics(false);
    }
  };

  const isLight = theme === 'light';

  return (
    <div className="space-y-4 pb-16 select-none animate-fade-in">
      
      {/* Profile Header Card */}
      <div className={`rounded-3xl p-5 border shadow-xl relative overflow-hidden ${
        isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-gradient-to-b from-zinc-900/90 to-zinc-950 border-zinc-800 text-white'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-3xl shadow-inner">
              {user.avatar || '🦾'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-white">
                  {user.username}
                </h2>
                <button
                  onClick={() => {
                    sound.playCheck();
                    onSwitchAccount();
                  }}
                  className="text-[10px] bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white px-2 py-0.5 rounded-lg border border-zinc-800 transition-all active:scale-95"
                >
                  {t(language, 'switchProfile')}
                </button>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {user.weight} кг • {user.height} см • {user.age} лет
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playCheck();
              setIsEditingMetrics(!isEditingMetrics);
            }}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 active:scale-95 transition-all"
            title="Редактировать параметры тела"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Edit Metrics Sheet */}
        {isEditingMetrics && (
          <form onSubmit={handleSaveMetrics} className="mt-4 pt-4 border-t border-zinc-800/80 space-y-3 animate-slide-up">
            <h4 className="text-xs font-bold text-zinc-300">
              {t(language, 'bodyStatsTitle')}
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-zinc-500 font-semibold block mb-1">
                  {t(language, 'weightLabel')}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-center text-white outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 font-semibold block mb-1">
                  {t(language, 'ageLabel')}
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-center text-white outline-none font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 font-semibold block mb-1">
                  {t(language, 'heightLabel')}
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-center text-white outline-none font-mono"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-white text-black font-bold text-xs active:scale-95 transition-all"
              >
                {t(language, 'saveMetricsBtn')}
              </button>
              <button
                type="button"
                onClick={() => setIsEditingMetrics(false)}
                className="py-2 px-3 rounded-xl bg-zinc-900 text-zinc-400 text-xs border border-zinc-800"
              >
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Cool Rank Badge with XP bar */}
      <RankBadge user={user} language={language} theme={theme} />

      {/* 4 Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="rounded-2xl p-3 bg-zinc-950 border border-zinc-800 text-center shadow-md">
          <div className="flex items-center justify-center text-amber-400 mb-1">
            <Flame className="w-5 h-5 fill-amber-500/30" />
          </div>
          <span className="text-[10px] text-zinc-500 uppercase font-bold block truncate">
            {t(language, 'streakTitle')}
          </span>
          <span className="text-sm font-extrabold text-white font-mono mt-0.5 block">
            {user.streakDays} дн.
          </span>
        </div>

        <div className="rounded-2xl p-3 bg-zinc-950 border border-zinc-800 text-center shadow-md">
          <div className="flex items-center justify-center text-white mb-1">
            <Dumbbell className="w-5 h-5" />
          </div>
          <span className="text-[10px] text-zinc-500 uppercase font-bold block truncate">
            {t(language, 'totalWorkoutsTitle')}
          </span>
          <span className="text-sm font-extrabold text-white font-mono mt-0.5 block">
            {workoutLogs.length}
          </span>
        </div>

        <div className="rounded-2xl p-3 bg-zinc-950 border border-zinc-800 text-center shadow-md">
          <div className="flex items-center justify-center text-emerald-400 mb-1">
            <Weight className="w-5 h-5" />
          </div>
          <span className="text-[10px] text-zinc-500 uppercase font-bold block truncate">
            Общий тоннаж
          </span>
          <span className="text-sm font-extrabold text-white font-mono mt-0.5 block">
            {tonnageText}
          </span>
        </div>

        <div className="rounded-2xl p-3 bg-zinc-950 border border-zinc-800 text-center shadow-md">
          <div className="flex items-center justify-center text-blue-400 mb-1">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-[10px] text-zinc-500 uppercase font-bold block truncate">
            {t(language, 'bmiLabel')}
          </span>
          <span className="text-sm font-extrabold text-white font-mono mt-0.5 block">
            {bmi} ({bmiCategory})
          </span>
        </div>
      </div>

      {/* Workout History */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center justify-between">
          <span>{t(language, 'recentWorkoutsHistory')}</span>
          <span className="text-xs font-normal text-zinc-500 font-mono">
            {workoutLogs.length} записей
          </span>
        </h3>

        {workoutLogs.length > 0 ? (
          <div className="space-y-2.5">
            {workoutLogs.map((log) => {
              const ratingLabels = ['', t(language, 'diffRating1Title'), t(language, 'diffRating2Title'), t(language, 'diffRating3Title'), t(language, 'diffRating4Title')];
              const dateStr = new Date(log.date).toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={log.id}
                  className="rounded-2xl bg-zinc-950 border border-zinc-850 p-3.5 flex items-center justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">
                        {log.dayTitle}
                      </h4>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {ratingLabels[log.difficultyRating]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                      <span>{dateStr}</span>
                      <span>•</span>
                      <span>{log.completedSetsCount} подходов</span>
                      {log.totalTonnageKg > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-zinc-400">{log.totalTonnageKg} кг</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold font-mono text-amber-400">
                      +{log.xpEarned} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 px-4 rounded-3xl border border-dashed border-zinc-800">
            <p className="text-xs text-zinc-500">
              {t(language, 'noHistoryYet')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};