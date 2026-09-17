import React from 'react';
import { Check } from 'lucide-react';
import { sound } from '../services/soundService';

interface SetCheckboxProps {
  completed: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export const SetCheckbox: React.FC<SetCheckboxProps> = ({
  completed,
  onToggle,
  disabled = false
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;

    if (!completed) {
      sound.playCheck();
    } else {
      sound.playUncheck();
    }
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-80 select-none ${
        completed
          ? 'bg-white text-black shadow-md scale-100 ring-2 ring-white/60 animate-check-bounce'
          : 'bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-transparent'
      }`}
    >
      <Check
        className={`w-4 h-4 stroke-[3] transition-all duration-200 ${
          completed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      />
    </button>
  );
};