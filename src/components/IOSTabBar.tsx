import React from 'react';
import { Dumbbell, Play, Sparkles, User, Settings } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { t } from '../i18n/translations';
import { sound } from '../services/soundService';

export type TabKey = 'catalog' | 'active' | 'custom' | 'profile' | 'settings';

interface IOSTabBarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  hasActiveSession: boolean;
  language: Language;
  theme: ThemeMode;
}

export const IOSTabBar: React.FC<IOSTabBarProps> = ({
  activeTab,
  onSelectTab,
  hasActiveSession,
  language,
  theme
}) => {
  const isLight = theme === 'light';

  const tabs: { key: TabKey; label: string; icon: React.ReactNode; badge?: boolean }[] = [
    {
      key: 'catalog',
      label: t(language, 'tabCatalog'),
      icon: <Dumbbell className="w-5 h-5 transition-transform group-active:scale-90" />
    },
    {
      key: 'active',
      label: t(language, 'tabActive'),
      icon: <Play className="w-5 h-5 transition-transform group-active:scale-90 fill-current" />,
      badge: hasActiveSession
    },
    {
      key: 'custom',
      label: t(language, 'tabCustom'),
      icon: <Sparkles className="w-5 h-5 transition-transform group-active:scale-90" />
    },
    {
      key: 'profile',
      label: t(language, 'tabProfile'),
      icon: <User className="w-5 h-5 transition-transform group-active:scale-90" />
    },
    {
      key: 'settings',
      label: t(language, 'tabSettings'),
      icon: <Settings className="w-5 h-5 transition-transform group-active:scale-90" />
    }
  ];

  const handleTabClick = (key: TabKey) => {
    sound.playCheck();
    onSelectTab(key);
  };

  return (
    <div className={`w-full border-t backdrop-blur-xl select-none transition-colors duration-200 z-40 ${
      isLight 
        ? 'bg-white/85 border-zinc-200 text-zinc-600' 
        : theme === 'black'
          ? 'bg-black/90 border-zinc-900 text-zinc-400'
          : 'bg-[#121214]/90 border-zinc-800/80 text-zinc-400'
    }`}>
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-1 pb-safe">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`group flex-1 flex flex-col items-center justify-center py-1 relative transition-all duration-150 active:scale-95 ${
                isActive
                  ? isLight
                    ? 'text-black font-semibold'
                    : 'text-white font-semibold'
                  : 'text-zinc-500 hover:text-zinc-400'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-black animate-pulse" />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight truncate max-w-[64px]">
                {tab.label}
              </span>
              {isActive && (
                <span className={`w-1 h-1 rounded-full mt-0.5 ${isLight ? 'bg-black' : 'bg-white'}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};