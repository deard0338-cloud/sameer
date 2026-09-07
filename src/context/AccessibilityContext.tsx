import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'sm' | 'base' | 'lg';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>('base');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'sm') {
      root.style.setProperty('--font-scale', '90%');
    } else if (fontSize === 'lg') {
      root.style.setProperty('--font-scale', '115%');
    } else {
      root.style.setProperty('--font-scale', '100%');
    }
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const increaseFont = () => {
    if (fontSize === 'sm') setFontSizeState('base');
    else if (fontSize === 'base') setFontSizeState('lg');
  };

  const decreaseFont = () => {
    if (fontSize === 'lg') setFontSizeState('base');
    else if (fontSize === 'base') setFontSizeState('sm');
  };

  const resetFont = () => setFontSizeState('base');
  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize: setFontSizeState,
        increaseFont,
        decreaseFont,
        resetFont,
        highContrast,
        toggleHighContrast,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
