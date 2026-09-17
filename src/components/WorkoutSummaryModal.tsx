import React, { useState } from 'react';
import { WorkoutDifficultyRating, Language } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';
import { Trophy, Zap, Check, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WorkoutSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedSetsCount: number;
  totalSetsCount: number;
  durationSeconds: number;
  language: Language;
  onSaveWorkout: (rating: WorkoutDifficultyRating, xpEarned: number) => void;
}

export const WorkoutSummaryModal: React.FC<WorkoutSummaryModalProps> = ({
  isOpen,
  onClose,
  completedSetsCount,
  totalSetsCount,
  durationSeconds,
  language,
  onSaveWorkout
}) => {
  const [rating, setRating] = useState<WorkoutDifficultyRating>(2);

  if (!isOpen) return null;

  const minutes = Math.max(1, Math.round(durationSeconds / 60));

  // Compute XP based on performance and rating
  const baseRateXp = rating === 4 ? 340 : rating === 3 ? 290 : rating === 2 ? 260 : 210;
  const setsBonus = completedSetsCount * 18;
  const totalXp = baseRateXp + setsBonus;

  const handleSave = () => {
    sound.playFinishWorkout();
    try {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ffffff', '#e4e4e7', '#a1a1aa', '#71717a']
      });
    } catch {}

    onSaveWorkout(rating, totalXp);
  };

  const ratings: {
    level: WorkoutDifficultyRating;
    title: string;
    desc: string;
    icon: string;
  }[] = [
    {
      level: 1,
      title: t(language, 'diffRating1Title'),
      desc: t(language, 'diffRating1Desc'),
      icon: '🌱'
    },
    {
      level: 2,
      title: t(language, 'diffRating2Title'),
      desc: t(language, 'diffRating2Desc'),
      icon: '⚡'
    },
    {
      level: 3,
      title: t(language, 'diffRating3Title'),
      desc: t(language, 'diffRating3Desc'),
      icon: '🔥'
    },
    {
      level: 4,
      title: t(language, 'diffRating4Title'),
      desc: t(language, 'diffRating4Desc'),
      icon: '💀'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-gradient-to-b from-zinc-900 to-black border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl text-white max-h-[92vh] overflow-y-auto animate-slide-up">
        
        {/* Trophy Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-zinc-800 to-zinc-600 border border-white/20 flex items-center justify-center mb-3 shadow-xl">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            {t(language, 'finishModalTitle')}
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs leading-relaxed">
            {t(language, 'finishModalSubtitle')}
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center mb-5">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Подходы</span>
            <span className="text-sm font-bold text-white font-mono">{completedSetsCount} / {totalSetsCount}</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Время</span>
            <span className="text-sm font-bold text-white font-mono">{minutes} мин</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Награда</span>
            <span className="text-sm font-bold text-amber-400 font-mono">+{totalXp} XP</span>
          </div>
        </div>

        {/* Subjective Difficulty Rating (1 to 4) */}
        <div className="space-y-2.5 mb-6">
          <label className="text-xs font-semibold text-zinc-300 block mb-1">
            Оценка сложности (RPE адаптация):
          </label>
          
          {ratings.map((item) => (
            <button
              key={item.level}
              type="button"
              onClick={() => {
                sound.playCheck();
                setRating(item.level);
              }}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-[0.98] ${
                rating === item.level
                  ? 'bg-zinc-800/90 border-white text-white shadow-md ring-1 ring-white/40'
                  : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-3 pr-2">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-zinc-400 leading-snug mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>

              {rating === item.level && (
                <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Submit Save */}
        <button
          onClick={handleSave}
          className="w-full bg-white hover:bg-zinc-200 text-black font-bold rounded-2xl py-3.5 text-xs shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4 fill-black text-black" />
          <span>{t(language, 'saveRatingAndAwardXp')} (+{totalXp} XP)</span>
        </button>
      </div>
    </div>
  );
};