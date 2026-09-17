import React, { useState } from 'react';
import { UserProfile, Language, ThemeMode } from '../types';
import { getRankProgress, RANKS } from '../services/rankService';
import { t } from '../i18n/translations';
import { Award, ChevronRight, Zap } from 'lucide-react';
import { AllRanksModal } from './AllRanksModal';

interface RankBadgeProps {
  user: UserProfile;
  language: Language;
  theme: ThemeMode;
}

export const RankBadge: React.FC<RankBadgeProps> = ({ user, language, theme }) => {
  const [showAllRanks, setShowAllRanks] = useState(false);
  const { currentRank, nextRank, progressPercent, xpToNext } = getRankProgress(user.xp);
  const isLight = theme === 'light';

  return (
    <>
      <div 
        onClick={() => setShowAllRanks(true)}
        className={`relative overflow-hidden rounded-3xl p-4 border transition-all duration-300 cursor-pointer active:scale-[0.98] select-none ${
          isLight 
            ? 'bg-gradient-to-br from-zinc-50 via-white to-zinc-100 border-zinc-200 text-zinc-900 shadow-sm'
            : theme === 'black'
              ? 'bg-gradient-to-br from-zinc-900/80 via-black to-zinc-950 border-zinc-800 text-white shadow-xl shadow-black/40'
              : 'bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border-zinc-800 text-white shadow-lg'
        }`}
      >
        {/* Glow ambient background */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Tier Icon Badge */}
            <div className={`w-13 h-13 rounded-2xl flex items-center justify-center text-2xl shadow-inner border ${
              isLight ? 'bg-zinc-100 border-zinc-300' : 'bg-zinc-800/90 border-zinc-700/80'
            }`}>
              <span>{currentRank.icon}</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] tracking-wider uppercase font-extrabold px-2 py-0.5 rounded-full border ${
                  isLight 
                    ? 'bg-zinc-200 text-zinc-800 border-zinc-300' 
                    : 'bg-white/10 text-zinc-300 border-white/15'
                }`}>
                  {currentRank.titleBadge}
                </span>
                <span className="text-[11px] text-zinc-500 font-medium flex items-center gap-0.5">
                  <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {user.xp} XP
                </span>
              </div>
              <h3 className="font-bold text-base mt-0.5 tracking-tight">
                {currentRank.name[language] || currentRank.name.ru}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 text-zinc-400 text-xs">
            <span className="text-[11px] hidden sm:inline">{t(language, 'allRanksView')}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-3.5 pt-2 border-t border-zinc-800/40">
          <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
            <span className="text-zinc-400">
              {nextRank ? (
                t(language, 'nextRankIn', { 
                  nextRank: nextRank.name[language] || nextRank.name.ru, 
                  xp: xpToNext 
                })
              ) : (
                t(language, 'maxRankAchieved')
              )}
            </span>
            <span className={isLight ? 'text-zinc-700' : 'text-zinc-300 font-bold'}>
              {progressPercent}%
            </span>
          </div>

          {/* Bar */}
          <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-zinc-400 via-white to-zinc-200 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.max(4, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      <AllRanksModal
        isOpen={showAllRanks}
        onClose={() => setShowAllRanks(false)}
        currentXp={user.xp}
        language={language}
      />
    </>
  );
};