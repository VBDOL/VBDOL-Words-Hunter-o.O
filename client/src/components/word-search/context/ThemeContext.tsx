import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    const saved = localStorage.getItem('wordSearchTheme');
    return (saved as Theme) || 'system';
  });

  const [actualTheme, setActualTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    localStorage.setItem('wordSearchTheme', theme);

    const root = document.documentElement;

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        const isDark = e.matches;
        setActualTheme(isDark ? 'dark' : 'light');
        root.classList.toggle('dark', isDark);
      };

      updateTheme(mediaQuery);
      mediaQuery.addEventListener('change', updateTheme);

      return () => mediaQuery.removeEventListener('change', updateTheme);
    } else {
      const isDark = theme === 'dark';
      setActualTheme(isDark ? 'dark' : 'light');
      root.classList.toggle('dark', isDark);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
    actualTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
