import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'black-yellow';
export type BackgroundPattern = 'grid' | 'dots' | 'diagonal' | 'none';

export interface ThemeOption {
  id: ThemeMode;
  name: string;
  tagline: string;
  type: 'dark';
  accentColor: string;
  badge: string;
  sampleBg: string;
  sampleCard: string;
  sampleText: string;
}

// Single exclusive theme: Original Black, White & Yellow
export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'black-yellow',
    name: 'Original Black, White & Yellow',
    tagline: 'Signature obsidian canvas (#0c0a09) with crisp white typography and radiant yellow (#facc15) accents',
    type: 'dark',
    accentColor: '#facc15',
    badge: 'Original Signature',
    sampleBg: '#0c0a09',
    sampleCard: '#171717',
    sampleText: '#ffffff',
  },
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  pattern: BackgroundPattern;
  setPattern: (pattern: BackgroundPattern) => void;
  isDark: boolean;
  toggleDarkLight: () => void;
  currentThemeOption: ThemeOption;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'globalpath_bg_theme';
const PATTERN_STORAGE_KEY = 'globalpath_bg_pattern';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always lock theme to 'black-yellow'
  const [theme, setThemeState] = useState<ThemeMode>('black-yellow');

  const [pattern, setPatternState] = useState<BackgroundPattern>(() => {
    try {
      const stored = localStorage.getItem(PATTERN_STORAGE_KEY);
      if (stored && ['grid', 'dots', 'diagonal', 'none'].includes(stored)) {
        return stored as BackgroundPattern;
      }
    } catch {
      // fallback
    }
    return 'dots';
  });

  const currentThemeOption = THEME_OPTIONS[0];
  const isDark = true; // Always dark / obsidian background

  const setTheme = (_newTheme: ThemeMode) => {
    // Only black-yellow is supported
    setThemeState('black-yellow');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, 'black-yellow');
    } catch {
      // ignore
    }
  };

  const setPattern = (newPattern: BackgroundPattern) => {
    setPatternState(newPattern);
    try {
      localStorage.setItem(PATTERN_STORAGE_KEY, newPattern);
    } catch {
      // ignore
    }
  };

  const toggleDarkLight = () => {
    // Locked to original Black, White and Yellow theme
    setTheme('black-yellow');
  };

  useEffect(() => {
    // Clean up any stale stored theme from localStorage that might have been saved in earlier sessions
    try {
      localStorage.setItem(THEME_STORAGE_KEY, 'black-yellow');
    } catch {
      // ignore
    }

    const root = document.documentElement;
    root.setAttribute('data-theme', 'black-yellow');
    root.setAttribute('data-pattern', pattern);
    root.classList.add('dark');
  }, [pattern]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        pattern,
        setPattern,
        isDark,
        toggleDarkLight,
        currentThemeOption,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
