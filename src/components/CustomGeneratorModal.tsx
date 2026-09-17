import React, { useState } from 'react';
import { UserProfile, Language, DifficultyLevel, WorkoutPlan } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';
import { generateCustomWorkoutPlan } from '../services/aiGenerator';
import { Sparkles, X, Check, Dumbbell, Flame, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  language: Language;
  onPlanCreated: (plan: WorkoutPlan) => void;
}

export const CustomGeneratorModal: React.FC<CustomGeneratorModalProps> = ({
  isOpen,
  onClose,
  user,
  language,
  onPlanCreated
}) => {
  const [frequency, setFrequency] = useState<number>(3);
  const [equipment, setEquipment] = useState<'gym' | 'dumbbells' | 'bodyweight'>('gym');
  const [focus, setFocus] = useState<'full' | 'upper' | 'lower' | 'ppl'>('ppl');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(2);

  if (!isOpen) return null;

  const handleGenerate = () => {
    sound.playRecalibrate();
    
    const plan = generateCustomWorkoutPlan(user, {
      frequency,
      equipment,
      focus,
      difficulty
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#a1a1aa', '#52525b']
      });
    } catch {}

    onPlanCreated(plan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-gradient-to-b from-zinc-900 to-black border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {t(language, 'generatorModalTitle')}
              </h2>
              <p className="text-xs text-zinc-400">
                {user.weight} кг • {user.height} см • {user.age} лет
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playUncheck();
              onClose();
            }}
            className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 my-3 text-xs">
          {/* 1. Frequency */}
          <div>
            <label className="font-semibold text-zinc-300 mb-2 block">
              {t(language, 'selectFrequency')}
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {[2, 3, 4, 5, 6].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => {
                    setFrequency(days);
                    sound.playCheck();
                  }}
                  className={`py-2 rounded-xl text-center font-bold border transition-all ${
                    frequency === days
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {days}x
                </button>
              ))}
            </div>
          </div>

          {/* 2. Difficulty (1 to 3) */}
          <div>
            <label className="font-semibold text-zinc-300 mb-2 block">
              {t(language, 'difficultyLabel')} (1 - 3)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { lvl: 1 as DifficultyLevel, label: t(language, 'difficulty1') },
                { lvl: 2 as DifficultyLevel, label: t(language, 'difficulty2') },
                { lvl: 3 as DifficultyLevel, label: t(language, 'difficulty3') }
              ].map((item) => (
                <button
                  key={item.lvl}
                  type="button"
                  onClick={() => {
                    setDifficulty(item.lvl);
                    sound.playCheck();
                  }}
                  className={`py-2 px-1 text-center font-medium rounded-xl border transition-all truncate text-[11px] ${
                    difficulty === item.lvl
                      ? 'bg-white text-black border-white font-bold shadow-md'
                      : 'bg-zinc-900/90 text-zinc-400 border-zinc-800'
                  }`}
                >
                  {'★'.repeat(item.lvl)} {item.lvl}/3
                </button>
              ))}
            </div>
          </div>

          {/* 3. Equipment */}
          <div>
            <label className="font-semibold text-zinc-300 mb-2 block">
              {t(language, 'selectEquipment')}
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'gym', label: t(language, 'equipGym'), icon: '🏋️‍♂️' },
                { id: 'dumbbells', label: t(language, 'equipDumbbells'), icon: '🔩' },
                { id: 'bodyweight', label: t(language, 'equipBodyweight'), icon: '🤸' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setEquipment(item.id as any);
                    sound.playCheck();
                  }}
                  className={`w-full p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                    equipment === item.id
                      ? 'bg-zinc-900 border-zinc-300 text-white shadow-sm ring-1 ring-zinc-400'
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="text-[11px] font-medium leading-tight flex-1">{item.label}</span>
                  {equipment === item.id && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Focus Area */}
          <div>
            <label className="font-semibold text-zinc-300 mb-2 block">
              {t(language, 'selectFocus')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ppl', label: t(language, 'focusPPL') },
                { id: 'full', label: t(language, 'focusFull') },
                { id: 'upper', label: t(language, 'focusUpper') },
                { id: 'lower', label: t(language, 'focusLower') }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setFocus(item.id as any);
                    sound.playCheck();
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    focus === item.id
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400'
                  }`}
                >
                  <span className="text-[11px] leading-tight block">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Action Button */}
        <button
          onClick={handleGenerate}
          className="w-full mt-4 bg-gradient-to-r from-zinc-100 via-white to-zinc-200 hover:from-white hover:to-zinc-300 text-black font-bold rounded-2xl py-3 text-xs shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-black fill-black" />
          <span>{t(language, 'generateNowBtn')}</span>
        </button>
      </div>
    </div>
  );
};