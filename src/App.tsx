import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { TopUtilityBar } from './components/TopUtilityBar';
import { MainNavbar } from './components/MainNavbar';
import { Footer } from './components/Footer';
import { FloatingAssistant } from './components/FloatingAssistant';
import { SearchModal } from './components/SearchModal';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { StatesPage } from './pages/StatesPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { TrackApplicationPage } from './pages/TrackApplicationPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPages';

// Scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gov-bg text-gov-textPrimary font-sans">
      <ScrollToTop />

      {/* Global Two-Row Header */}
      <TopUtilityBar onOpenAssistant={() => setIsAssistantOpen(true)} />
      <MainNavbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Assistant (Bottom Right) */}
      <FloatingAssistant
        isOpen={isAssistantOpen}
        onToggle={() => setIsAssistantOpen(!isAssistantOpen)}
        onClose={() => setIsAssistantOpen(false)}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/states" element={<StatesPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/track-application" element={<TrackApplicationPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Policy & Guidance Pages */}
              <Route path="/privacy-policy" element={<PolicyPage />} />
              <Route path="/terms" element={<PolicyPage />} />
              <Route path="/cancellation-refund" element={<PolicyPage />} />
              <Route path="/faq" element={<PolicyPage />} />
              <Route path="/accessibility" element={<PolicyPage />} />
              <Route path="/grievance" element={<PolicyPage />} />
              <Route path="/consumer-helpline" element={<PolicyPage />} />
              <Route path="/case-study" element={<PolicyPage />} />
              <Route path="/video-guide" element={<PolicyPage />} />
              <Route path="/ebook" element={<PolicyPage />} />
              <Route path="/manual" element={<PolicyPage />} />
              <Route path="/careers" element={<PolicyPage />} />

              {/* Fallback route */}
              <Route path="*" element={<ServicesPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AccessibilityProvider>
    </LanguageProvider>
  );
};

export default App;
