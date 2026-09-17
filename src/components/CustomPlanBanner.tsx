import React from 'react';
import { Language, ThemeMode } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';
import { Sparkles, ArrowRight, Wand2 } from 'lucide-react';

interface CustomPlanBannerProps {
  language: Language;
  theme: ThemeMode;
  onOpenGenerator: () => void;
}

export const CustomPlanBanner: React.FC<CustomPlanBannerProps> = ({
  language,
  theme,
  onOpenGenerator
}) => {
  const isLight = theme === 'light';

  return (
    <div 
      onClick={() => {
        sound.playCheck();
        onOpenGenerator();
      }}
      className={`relative overflow-hidden rounded-3xl p-5 border transition-all duration-300 cursor-pointer active:scale-[0.98] select-none group shadow-xl ${
        isLight
          ? 'bg-gradient-to-r from-zinc-900 via-zinc-950 to-black text-white border-zinc-800'
          : 'bg-gradient-to-r from-zinc-900 via-zinc-950 to-black text-white border-zinc-700/80 shadow-black/80 ring-1 ring-white/10'
      }`}
    >
      {/* Background radial gradient accent */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />

      <div className="relative z-10 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-[10px] uppercase font-extrabold tracking-wider text-white">
            <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>{t(language, 'customBannerBadge')}</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:translate-x-1 group-active:scale-95 shadow-md">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
          {t(language, 'customBannerTitle')}
        </h2>

        <p className="text-xs text-zinc-300/90 mt-1.5 leading-relaxed">
          {t(language, 'customBannerSubtitle')}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs font-semibold underline underline-offset-4 text-white decoration-zinc-400">
            {t(language, 'openGeneratorBtn')}
          </span>
        </div>
      </div>
    </div>
  );
};