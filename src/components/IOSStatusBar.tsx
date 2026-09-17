import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, SignalHigh, Dumbbell } from 'lucide-react';
import { ThemeMode } from '../types';

interface IOSStatusBarProps {
  theme?: ThemeMode;
  hasActiveSession?: boolean;
}

export const IOSStatusBar: React.FC<IOSStatusBarProps> = ({
  theme = 'black',
  hasActiveSession = false
}) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const isLight = theme === 'light';

  return (
    <div className={`w-full pt-3 pb-2 px-6 flex items-center justify-between select-none z-50 text-xs font-semibold ${
      isLight ? 'text-zinc-900' : 'text-zinc-200'
    }`}>
      {/* Time */}
      <div className="w-16 tracking-tight font-medium text-[13px]">
        {time || '09:41'}
      </div>

      {/* Dynamic Island pill with Live Activity */}
      <div className={`h-4.5 rounded-full border border-zinc-800/80 shadow-inner flex items-center justify-between px-2.5 transition-all duration-300 ${
        hasActiveSession ? 'w-32 bg-black ring-1 ring-emerald-500/30' : 'w-24 bg-black'
      }`}>
        <div className="flex items-center gap-1.5">
          {hasActiveSession ? (
            <>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Dumbbell className="w-2.5 h-2.5 text-zinc-300" />
            </>
          ) : (
            <div className="w-2 h-2 rounded-full bg-zinc-800" />
          )}
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-zinc-900 border border-zinc-800" />
          <div className="w-2 h-2 rounded-full bg-blue-950/40 border border-blue-500/30" />
        </div>
      </div>

      {/* Status Icons */}
      <div className="w-16 flex items-center justify-end gap-1.5 opacity-90">
        <SignalHigh className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <BatteryMedium className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};