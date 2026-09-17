import React from 'react';
import { UserProfile, Language } from '../types';
import { t } from '../i18n/translations';
import { getRankByXp } from '../services/rankService';
import { sound } from '../services/soundService';
import { UserPlus, Check, X, Shield } from 'lucide-react';

interface AccountSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: UserProfile[];
  activeUserId: string | null;
  onSelectUser: (user: UserProfile) => void;
  onAddNewUser: () => void;
  language: Language;
}

export const AccountSwitcherModal: React.FC<AccountSwitcherModalProps> = ({
  isOpen,
  onClose,
  users,
  activeUserId,
  onSelectUser,
  onAddNewUser,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl text-white max-h-[85vh] overflow-y-auto animate-slide-up">
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {t(language, 'loginTitle')}
            </h2>
            <p className="text-xs text-zinc-400">
              {t(language, 'loginSubtitle')}
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

        <div className="space-y-2.5 my-4">
          {users.map((u) => {
            const isActive = u.id === activeUserId;
            const rank = getRankByXp(u.xp);
            return (
              <button
                key={u.id}
                onClick={() => {
                  sound.playCheck();
                  onSelectUser(u);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all active:scale-98 ${
                  isActive
                    ? 'bg-zinc-900 border-zinc-500 shadow-md ring-1 ring-zinc-500'
                    : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-lg">
                    {u.avatar || '🦾'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white">
                        {u.username}
                      </span>
                      {isActive && (
                        <span className="text-[10px] bg-white text-black px-1.5 py-0.5 rounded font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-zinc-400" />
                        {rank.name[language] || rank.name.ru}
                      </span>
                      <span>•</span>
                      <span>{u.xp} XP</span>
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            sound.playCheck();
            onClose();
            onAddNewUser();
          }}
          className="w-full mt-3 py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t(language, 'addNewUser')}</span>
        </button>
      </div>
    </div>
  );
};