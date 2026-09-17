import React, { useState } from 'react';
import { Exercise, Language, AdjustedSetData } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';
import { Scale, X, Check, HelpCircle, ArrowDownCircle } from 'lucide-react';

interface WeightAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise;
  currentSetIndex: number;
  currentWeightKg: number;
  currentReps: number;
  language: Language;
  onConfirmAdjustment: (adj: AdjustedSetData) => void;
}

export const WeightAdjustmentModal: React.FC<WeightAdjustmentModalProps> = ({
  isOpen,
  onClose,
  exercise,
  currentSetIndex,
  currentWeightKg,
  currentReps,
  language,
  onConfirmAdjustment
}) => {
  const [actualReps, setActualReps] = useState(Math.max(1, currentReps - 3).toString());
  const [actualWeight, setActualWeight] = useState(currentWeightKg.toString());

  if (!isOpen) return null;

  const handleRecalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const reps = parseInt(actualReps, 10);
    const weight = parseFloat(actualWeight);

    if (isNaN(reps) || isNaN(weight) || reps <= 0 || weight < 0) return;

    sound.playRecalibrate();

    // Recalibration formula:
    // If completed reps < target reps, reduce remaining sets weight by 10-20%
    const repDeficitRatio = Math.max(0.08, (currentReps - reps) / currentReps);
    const reductionPercent = Math.min(0.25, Math.max(0.10, repDeficitRatio * 0.4 + 0.10));
    
    let newWeight = weight * (1 - reductionPercent);
    // Round to nearest 2.5 kg or 1 kg
    newWeight = newWeight > 20 
      ? Math.max(2.5, Math.round(newWeight / 2.5) * 2.5) 
      : Math.max(1, Math.round(newWeight));

    const percentDrop = Math.round(reductionPercent * 100);

    const adjData: AdjustedSetData = {
      actualReps: reps,
      actualWeightKg: weight,
      originalReps: currentReps,
      originalWeightKg: currentWeightKg,
      newNextSetWeightKg: newWeight,
      recalibratedAdvice: {
        ru: `Снизили вес на ${percentDrop}%. Новая нагрузка: ${newWeight} кг на ${reps + 2} повт. Главное — чистота техники!`,
        en: `Reduced weight by ${percentDrop}%. Next sets adjusted to ${newWeight} kg for ${reps + 2} reps. Focus on strict form!`,
        zh: `重量调降 ${percentDrop}%。后续建议：${newWeight} kg × ${reps + 2} 次。专注标准动作泵感！`
      }
    };

    onConfirmAdjustment(adjData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {t(language, 'adjModalTitle')}
              </h2>
              <p className="text-xs text-zinc-400">
                {exercise.name[language] || exercise.name.ru} • Подход {currentSetIndex + 1}
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

        {/* Subtitle / Coach Explanation */}
        <p className="text-xs text-zinc-400 leading-relaxed my-3 bg-zinc-900/60 p-3 rounded-2xl border border-zinc-850">
          {t(language, 'adjModalSubtitle')}
        </p>

        {/* Target Info */}
        <div className="text-xs font-mono text-zinc-400 mb-4 bg-black/40 p-2.5 rounded-xl border border-zinc-800">
          {t(language, 'originalTarget', { reps: currentReps, weight: currentWeightKg })}
        </div>

        <form onSubmit={handleRecalculate} className="space-y-4">
          
          {/* Actual Reps */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">
              {t(language, 'actualRepsInput')}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="50"
                required
                value={actualReps}
                onChange={(e) => setActualReps(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-white rounded-xl px-4 py-2.5 text-base font-bold text-white outline-none text-center font-mono"
              />
              <span className="text-xs text-zinc-400 font-semibold w-12">повт.</span>
            </div>
          </div>

          {/* Actual Weight */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">
              {t(language, 'actualWeightInput')}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="400"
                step="0.5"
                required
                value={actualWeight}
                onChange={(e) => setActualWeight(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-white rounded-xl px-4 py-2.5 text-base font-bold text-white outline-none text-center font-mono"
              />
              <span className="text-xs text-zinc-400 font-semibold w-12">кг</span>
            </div>
          </div>

          {/* Recalculate Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-2xl py-3 text-xs shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <ArrowDownCircle className="w-4 h-4" />
            <span>{t(language, 'recalculateBtn')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};