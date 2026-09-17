import React, { useState } from 'react';
import { UserProfile, Language, ThemeMode } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';
import { Dumbbell, Globe, Check, AlertCircle } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: UserProfile) => void;
  defaultTheme?: ThemeMode;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  defaultTheme = 'black'
}) => {
  const [lang, setLang] = useState<Language>('ru');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('75');
  const [age, setAge] = useState('24');
  const [height, setHeight] = useState('178');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const languages: { key: Language; label: string; flag: string }[] = [
    { key: 'ru', label: 'Русский', flag: '🇷🇺' },
    { key: 'en', label: 'English', flag: '🇬🇧' },
    { key: 'zh', label: '中文', flag: '🇨🇳' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const a = parseInt(age, 10);
    const h = parseFloat(height);

    if (!name.trim() || isNaN(w) || w < 30 || w > 250 || isNaN(a) || a < 12 || a > 100 || isNaN(h) || h < 100 || h > 240) {
      setError(t(lang, 'validationError'));
      return;
    }

    sound.playRecalibrate();

    const newProfile: UserProfile = {
      id: `user_${Date.now()}`,
      username: name.trim(),
      avatar: '🦾',
      weight: w,
      age: a,
      height: h,
      language: lang,
      theme: defaultTheme,
      currentRankTier: 1,
      xp: 0,
      streakDays: 0,
      lastWorkoutDate: null,
      createdAt: new Date().toISOString()
    };

    onComplete(newProfile);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-gradient-to-b from-zinc-900 to-black border-t sm:border border-zinc-800 sm:rounded-3xl rounded-t-3xl p-6 shadow-2xl text-white max-h-[92vh] overflow-y-auto overscroll-contain animate-slide-up">
        
        {/* Top Notch indicator for sheet feel */}
        <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-5 sm:hidden" />

        {/* Logo / Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-zinc-800 to-zinc-600 border border-zinc-500/30 flex items-center justify-center mb-3 shadow-lg shadow-black/60">
            <Dumbbell className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {t(lang, 'welcomeTitle')}
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs leading-relaxed">
            {t(lang, 'welcomeSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Language Selection */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              {t(lang, 'chooseLanguage')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setLang(item.key);
                    sound.playCheck();
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 ${
                    lang === item.key
                      ? 'bg-zinc-100 text-black border-white shadow-md font-semibold'
                      : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span>{item.flag}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name Field */}
          <div>
            <label className="text-xs font-semibold text-zinc-300 mb-1.5 block">
              {t(lang, 'usernameLabel')}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="e.g. Alex"
              className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-zinc-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-all"
            />
          </div>

          {/* Metrics: Weight, Age, Height (NO GOAL ASKED!) */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 mb-1 block truncate">
                {t(lang, 'weightLabel')}
              </label>
              <input
                type="number"
                required
                min="30"
                max="250"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-zinc-400 rounded-xl px-3 py-2 text-sm text-center text-white font-medium outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 mb-1 block truncate">
                {t(lang, 'ageLabel')}
              </label>
              <input
                type="number"
                required
                min="12"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-zinc-400 rounded-xl px-3 py-2 text-sm text-center text-white font-medium outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-zinc-400 mb-1 block truncate">
                {t(lang, 'heightLabel')}
              </label>
              <input
                type="number"
                required
                min="100"
                max="240"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-zinc-400 rounded-xl px-3 py-2 text-sm text-center text-white font-medium outline-none transition-all"
              />
            </div>
          </div>

          {/* Error notice */}
          {error && (
            <div className="flex items-center gap-2 p-2.5 bg-red-950/40 border border-red-900/60 rounded-xl text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-zinc-100 via-white to-zinc-200 hover:from-white hover:to-zinc-300 text-black font-semibold rounded-2xl py-3 text-sm shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>{t(lang, 'createAccountBtn')}</span>
            <Check className="w-4 h-4 text-black stroke-[3]" />
          </button>
        </form>
      </div>
    </div>
  );
};