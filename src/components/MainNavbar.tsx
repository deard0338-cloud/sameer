import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, PhoneCall, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MainNavbarProps {
  onOpenSearch: () => void;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({ onOpenSearch }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.services, path: '/services' },
    { name: 'States', path: '/states' },
    { name: 'Categories', path: '/categories' },
    { name: t.trackApplication, path: '/track-application' },
    { name: t.dashboard, path: '/dashboard' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gov-border shadow-gov-header transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Identity / Logo */}
        <Link to="/" className="flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-gov-primary rounded-lg py-1">
          <div className="h-9 sm:h-11 md:h-12 flex items-center">
            <img
              src="/assets/sameer-logo.svg"
              alt="Sameer Xerox - Digital Services & CSC Center"
              className="h-7 sm:h-10 md:h-12 w-auto max-w-[160px] sm:max-w-none object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-gov-primary font-bold bg-gov-light/60'
                    : 'text-gov-textPrimary hover:text-gov-primary hover:bg-gov-veryLight'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gov-textPrimary hover:text-gov-primary hover:bg-gov-light transition-colors focus:outline-none focus:ring-2 focus:ring-gov-primary"
            title="Search services and schemes"
            aria-label="Open search dialog"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Quick Call Button (Desktop) */}
          <a
            href="tel:+918625820706"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gov-primary hover:bg-gov-dark text-white text-sm font-semibold shadow-sm transition-all hover:shadow"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.callNow}</span>
          </a>

          {/* Hamburger Menu Icon (Mobile & Tablet) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-gov-textPrimary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gov-primary"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gov-border bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in duration-200">
          <div className="p-3 bg-gov-light/50 rounded-lg mb-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-gov-primary">SAMEER XEROX CSC CENTER</div>
              <div className="text-[11px] text-gov-textSecondary">Call: +91 86258 20706</div>
            </div>
            <a
              href="tel:+918625820706"
              className="px-3 py-1 bg-gov-primary text-white text-xs font-semibold rounded"
            >
              Call
            </a>
          </div>

          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-gov-primary font-bold bg-gov-light'
                    : 'text-gov-textPrimary hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-gov-border">
            <Link
              to="/track-application"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gov-primary font-semibold"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Track Application Status</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
