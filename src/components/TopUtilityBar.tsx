import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { Moon, Sun, ChevronDown, MessageSquare, Eye, PhoneCall } from 'lucide-react';
import type { Language } from '../data/translations';

interface TopUtilityBarProps {
  onOpenAssistant: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({ onOpenAssistant }) => {
  const { language, setLanguage } = useLanguage();
  const { fontSize, setFontSize, darkMode, toggleDarkMode, highContrast, toggleHighContrast } = useAccessibility();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [a11yDropdownOpen, setA11yDropdownOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const a11yRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (a11yRef.current && !a11yRef.current.contains(event.target as Node)) {
        setA11yDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageLabels: Record<Language, string> = {
    en: 'English',
    hi: 'हिंदी',
    mr: 'मराठी'
  };

  return (
    <div className="w-full bg-gov-dark text-white text-xs py-1 px-3 sm:px-6 md:px-8 border-b border-gov-darker relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
        {/* Left: Organization Identity */}
        <div className="flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start w-full sm:w-auto">
          <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center p-0.5 shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white">
              <path d="M4 4h10l6 6v10H4V4z" fill="currentColor" opacity="0.3"/>
              <path d="M4 4h10l6 6v10H4V4z" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 4v6h6" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <span className="font-semibold tracking-wide text-blue-50 text-[10px] sm:text-xs truncate">
            SAMEER XEROX <span className="text-white/60">•</span> DIGITAL SERVICES &amp; CSC
          </span>
          <div className="hidden md:inline-flex items-center gap-1.5 ml-2 text-[11px] font-semibold">
            <a
              href="tel:+918625820706"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors text-amber-200"
            >
              <PhoneCall className="w-3 h-3" />
              +91 86258 20706
            </a>
            <a
              href="tel:+918668637878"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors text-white/90"
            >
              86686 37878
            </a>
          </div>
        </div>

        {/* Right: Controls (Accessibility, Theme, Support, Language) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Accessibility Dropdown */}
          <div className="relative" ref={a11yRef}>
            <button
              onClick={() => setA11yDropdownOpen(!a11yDropdownOpen)}
              className="p-1 rounded hover:bg-white/10 flex items-center gap-1 text-blue-100 hover:text-white transition-colors"
              title="Accessibility Controls"
              aria-label="Accessibility options"
            >
              <div className="w-5 h-5 rounded border border-white/40 flex items-center justify-center font-bold text-[10px]">
                A
              </div>
            </button>

            {a11yDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gov-textPrimary rounded-lg shadow-xl border border-gov-border py-2 px-3 z-50 text-xs">
                <div className="font-semibold text-gov-primary mb-2">Text Size</div>
                <div className="flex items-center justify-between gap-1 mb-3 bg-gray-100 p-1 rounded">
                  <button
                    onClick={() => setFontSize('sm')}
                    className={`flex-1 py-1 rounded text-center font-bold ${fontSize === 'sm' ? 'bg-gov-primary text-white' : 'hover:bg-gray-200'}`}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSize('base')}
                    className={`flex-1 py-1 rounded text-center font-bold ${fontSize === 'base' ? 'bg-gov-primary text-white' : 'hover:bg-gray-200'}`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('lg')}
                    className={`flex-1 py-1 rounded text-center font-bold ${fontSize === 'lg' ? 'bg-gov-primary text-white' : 'hover:bg-gray-200'}`}
                  >
                    A+
                  </button>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <button
                    onClick={toggleHighContrast}
                    className="w-full flex items-center justify-between py-1 px-1 rounded hover:bg-gray-100"
                  >
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> High Contrast
                    </span>
                    <span className="text-[10px] text-gray-500">{highContrast ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme / Dark Mode Button */}
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded hover:bg-white/10 text-blue-100 hover:text-white transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Night Mode"}
            aria-label="Toggle Night Mode"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Assistant / Help Desk Trigger */}
          <button
            onClick={onOpenAssistant}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/15 hover:bg-white/25 transition-colors text-white font-medium text-[11px]"
            title="Open Help Desk"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Quick Help</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded border border-white/30 hover:border-white text-white font-medium transition-colors"
              aria-haspopup="listbox"
              aria-expanded={langDropdownOpen}
            >
              <span>{languageLabels[language]}</span>
              <ChevronDown className="w-3 h-3 text-white/80" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-32 bg-white text-gov-textPrimary rounded-md shadow-xl border border-gov-border py-1 z-50">
                {(Object.keys(languageLabels) as Language[]).map((langKey) => (
                  <button
                    key={langKey}
                    onClick={() => {
                      setLanguage(langKey);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gov-light transition-colors ${
                      language === langKey ? 'text-gov-primary font-bold bg-gov-light/50' : 'text-gov-textPrimary'
                    }`}
                  >
                    {languageLabels[langKey]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
