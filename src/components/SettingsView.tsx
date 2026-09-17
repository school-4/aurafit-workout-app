import React from 'react';
import { Language, ThemeMode, UserProfile } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';
import { Moon, Sun, Globe, Volume2, VolumeX, Smartphone, Users, Trash2, Shield } from 'lucide-react';

interface SettingsViewProps {
  user: UserProfile;
  language: Language;
  theme: ThemeMode;
  soundEnabled: boolean;
  framePreview: boolean;
  onChangeLanguage: (lang: Language) => void;
  onChangeTheme: (theme: ThemeMode) => void;
  onToggleSound: (enabled: boolean) => void;
  onToggleFramePreview: (enabled: boolean) => void;
  onSwitchAccount: () => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  language,
  theme,
  soundEnabled,
  framePreview,
  onChangeLanguage,
  onChangeTheme,
  onToggleSound,
  onToggleFramePreview,
  onSwitchAccount,
  onResetData
}) => {
  const isLight = theme === 'light';

  return (
    <div className="space-y-4 pb-12 select-none animate-fade-in text-white">
      
      <div className="pt-1">
        <h2 className="text-lg font-bold text-white tracking-tight">
          {t(language, 'tabSettings')}
        </h2>
        <p className="text-xs text-zinc-400">
          Конфигурация темы, языка и устройства
        </p>
      </div>

      {/* 1. Theme Switcher */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-4 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Moon className="w-4 h-4 text-zinc-400" />
          <span>{t(language, 'settingsTheme')}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'black' as ThemeMode, label: 'Pure Black', icon: '🌑' },
            { id: 'dark' as ThemeMode, label: 'Obsidian', icon: '🌘' },
            { id: 'light' as ThemeMode, label: 'Titanium', icon: '☀️' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playCheck();
                onChangeTheme(item.id);
              }}
              className={`py-2.5 px-2 rounded-2xl border text-center transition-all active:scale-95 ${
                theme === item.id
                  ? 'bg-white text-black border-white font-bold shadow-md'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="text-base mb-0.5">{item.icon}</div>
              <div className="text-[11px] truncate font-medium">{item.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Language Switcher (RU, EN, ZH) */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-4 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <Globe className="w-4 h-4 text-zinc-400" />
          <span>{t(language, 'settingsLanguage')}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'ru' as Language, label: 'Русский', flag: '🇷🇺' },
            { id: 'en' as Language, label: 'English', flag: '🇬🇧' },
            { id: 'zh' as Language, label: '中文', flag: '🇨🇳' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.playCheck();
                onChangeLanguage(item.id);
              }}
              className={`py-2.5 px-2 rounded-2xl border text-center transition-all active:scale-95 ${
                language === item.id
                  ? 'bg-white text-black border-white font-bold shadow-md'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="text-base mb-0.5">{item.flag}</div>
              <div className="text-[11px] truncate font-medium">{item.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Audio / Haptic and Frame Settings */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-2 shadow-md divide-y divide-zinc-850">
        
        {/* Sound Toggle */}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {t(language, 'settingsSound')}
              </span>
              <span className="text-[10px] text-zinc-500">Тактильные щелчки подходов</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onToggleSound(!soundEnabled);
              if (!soundEnabled) sound.playCheck();
            }}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${
              soundEnabled ? 'bg-white' : 'bg-zinc-800'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-black shadow-md transform transition-transform duration-200 ${
              soundEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* iPhone Frame Mockup Toggle */}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {t(language, 'frameToggle')}
              </span>
              <span className="text-[10px] text-zinc-500">Рамка iPhone на компьютере</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playCheck();
              onToggleFramePreview(!framePreview);
            }}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${
              framePreview ? 'bg-white' : 'bg-zinc-800'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-black shadow-md transform transition-transform duration-200 ${
              framePreview ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* Account Switcher Button */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => {
            sound.playCheck();
            onSwitchAccount();
          }}
          className="w-full py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Users className="w-4 h-4 text-zinc-400" />
          <span>{t(language, 'switchProfile')} ({user.username})</span>
        </button>

        <button
          onClick={() => {
            if (window.confirm(t(language, 'confirmReset'))) {
              sound.playUncheck();
              onResetData();
            }
          }}
          className="w-full py-3 px-4 rounded-2xl bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 text-red-400 font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          <span>{t(language, 'resetDataBtn')}</span>
        </button>
      </div>
    </div>
  );
};