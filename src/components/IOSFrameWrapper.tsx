import React from 'react';
import { ThemeMode } from '../types';

interface IOSFrameWrapperProps {
  children: React.ReactNode;
  framePreview: boolean;
  theme: ThemeMode;
}

export const IOSFrameWrapper: React.FC<IOSFrameWrapperProps> = ({
  children,
  framePreview,
  theme
}) => {
  const isLight = theme === 'light';

  if (!framePreview) {
    return (
      <div className={`min-h-screen w-full flex justify-center transition-colors duration-200 ${
        isLight ? 'bg-zinc-100 text-zinc-900' : theme === 'black' ? 'bg-black text-white' : 'bg-[#09090b] text-white'
      }`}>
        <div className={`w-full max-w-md min-h-screen flex flex-col relative ${
          isLight ? 'bg-white' : theme === 'black' ? 'bg-black' : 'bg-[#0e0e11]'
        }`}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#050507] flex items-center justify-center p-0 sm:p-6 overflow-x-hidden selection:bg-zinc-750">
      {/* iPhone Titanium Body Container */}
      <div className={`w-full sm:max-w-[412px] h-screen sm:h-[860px] sm:rounded-[52px] sm:border-[10px] sm:border-[#27272a] sm:shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden relative transition-colors duration-200 ${
        isLight 
          ? 'bg-white' 
          : theme === 'black' 
            ? 'bg-black' 
            : 'bg-[#0c0c0e]'
      }`}>
        {children}
      </div>
    </div>
  );
};