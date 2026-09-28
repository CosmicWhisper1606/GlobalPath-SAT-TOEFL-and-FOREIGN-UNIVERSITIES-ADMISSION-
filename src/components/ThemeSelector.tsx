import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Layers, Sparkles } from 'lucide-react';
import { useTheme, THEME_OPTIONS, BackgroundPattern } from '../utils/ThemeContext';

interface ThemeSelectorProps {
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ compact = false }) => {
  const { pattern, setPattern, currentThemeOption } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const patternOptions: { id: BackgroundPattern; label: string; iconName: string }[] = [
    { id: 'dots', label: 'Academic Dots', iconName: '· · ·' },
    { id: 'grid', label: 'Architect Grid', iconName: '⊞' },
    { id: 'diagonal', label: 'Linen Grain', iconName: '///' },
    { id: 'none', label: 'Pure Flat', iconName: '—' },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Theme Status & Pattern Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors border cursor-pointer ${
          isOpen
            ? 'bg-stone-800 text-white border-yellow-400/80 shadow-[0_0_12px_rgba(250,204,21,0.2)]'
            : 'bg-stone-900/90 text-stone-200 hover:text-white hover:bg-stone-800 border-stone-700/80'
        }`}
        aria-label="Theme: Black, White & Yellow"
        aria-expanded={isOpen}
        title="Active Theme: Original Black, White & Yellow"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 ring-2 ring-yellow-400/30 animate-pulse" />
          <Palette className="w-3.5 h-3.5 text-yellow-400" />
        </div>
        {!compact && (
          <span className="hidden sm:inline font-sans text-xs">
            <span className="text-stone-400">Theme: </span>
            <span className="text-yellow-400 font-semibold">Black, White & Yellow</span>
          </span>
        )}
      </button>

      {/* Popover Menu with Theme Details and Background Pattern Controls */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-88 rounded-xl bg-stone-900 border border-stone-700 shadow-2xl p-4 z-50 text-stone-100 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-200">
                Active Theme System
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-yellow-400/15 text-yellow-300 border border-yellow-400/30">
              Exclusive
            </span>
          </div>

          {/* Locked Active Theme Display */}
          <div className="mt-3 p-3 rounded-lg border border-yellow-400/40 bg-stone-950/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/50" />
                <span className="text-xs font-bold text-white font-serif-display">
                  {currentThemeOption.name}
                </span>
              </div>
              <Check className="w-4 h-4 text-yellow-400" />
            </div>

            <p className="text-[11px] text-stone-300 leading-relaxed">
              Signature obsidian canvas with high-contrast white typography and radiant yellow accents.
            </p>

            <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] font-mono">
              <div className="bg-stone-900 px-2 py-1 rounded border border-stone-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-[#0c0a09] border border-stone-700"></span>
                <span className="text-stone-300">#0c0a09</span>
              </div>
              <div className="bg-stone-900 px-2 py-1 rounded border border-stone-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-[#ffffff]"></span>
                <span className="text-stone-300">#ffffff</span>
              </div>
              <div className="bg-stone-900 px-2 py-1 rounded border border-stone-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded bg-[#facc15]"></span>
                <span className="text-yellow-400">#facc15</span>
              </div>
            </div>
          </div>

          {/* Background Ambient Texture Selector */}
          <div className="mt-4 pt-3 border-t border-stone-800">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-yellow-400" />
                <span>Ambient Canvas Texture</span>
              </span>
              <span className="text-[11px] text-yellow-400 font-mono capitalize">
                {pattern}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {patternOptions.map((p) => {
                const isSelected = pattern === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPattern(p.id)}
                    className={`py-1.5 px-2 rounded-md text-center text-xs font-medium border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-yellow-400 text-stone-950 border-yellow-300 font-bold shadow-sm'
                        : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-700 hover:text-white'
                    }`}
                  >
                    <div className="text-[11px] font-mono leading-none mb-1 opacity-70">
                      {p.iconName}
                    </div>
                    <div className="text-[10px] truncate">{p.label.split(' ')[0]}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notice footer */}
          <div className="mt-3 pt-2 text-[10px] text-stone-400 text-center border-t border-stone-800/60 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>Applied uniformly with zero horizontal overflow gaps</span>
          </div>
        </div>
      )}
    </div>
  );
};
