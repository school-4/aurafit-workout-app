import React from 'react';
import { RANKS } from '../services/rankService';
import { Language } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';
import { X, CheckCircle2, Lock } from 'lucide-react';

interface AllRanksModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentXp: number;
  language: Language;
}

export const AllRanksModal: React.FC<AllRanksModalProps> = ({
  isOpen,
  onClose,
  currentXp,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl text-white max-h-[88vh] overflow-y-auto animate-slide-up">
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {t(language, 'allRanksView')}
            </h2>
            <p className="text-xs text-zinc-400">
              {t(language, 'rankSectionTitle')} (8 Тьеров)
            </p>
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

        <div className="space-y-3 my-2">
          {RANKS.map((r) => {
            const isUnlocked = currentXp >= r.minXp;
            const isCurrent = currentXp >= r.minXp && (currentXp < r.maxXp || r.tier === 8);

            return (
              <div
                key={r.tier}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-zinc-900 border-white/70 shadow-lg ring-1 ring-white/50'
                    : isUnlocked
                      ? 'bg-zinc-900/60 border-zinc-800'
                      : 'bg-zinc-950/40 border-zinc-900 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-xl">
                      {r.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-white">
                          {r.name[language] || r.name.ru}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono">
                          {r.titleBadge}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400">
                        {r.minXp.toLocaleString()} - {r.maxXp >= 100000 ? '∞' : r.maxXp.toLocaleString()} XP
                      </span>
                    </div>
                  </div>

                  <div>
                    {isCurrent ? (
                      <span className="text-[10px] bg-white text-black font-extrabold px-2 py-0.5 rounded-full">
                        CURRENT
                      </span>
                    ) : isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-zinc-600" />
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 italic mt-2 border-t border-zinc-800/50 pt-1.5">
                  "{r.quote[language] || r.quote.ru}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};