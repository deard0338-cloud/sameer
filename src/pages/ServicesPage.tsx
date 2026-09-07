import React, { useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { servicesData, priorityServiceSlugs } from '../data/services';
import { categoryChipsList } from '../data/categories';
import { ServiceCard } from '../components/ServiceCard';
import { useLanguage } from '../context/LanguageContext';

export const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const chipsContainerRef = useRef<HTMLDivElement>(null);

  const scrollChips = (direction: 'left' | 'right') => {
    if (!chipsContainerRef.current) return;
    const offset = direction === 'left' ? -250 : 250;
    chipsContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveCategory('All');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  // Priority/Popular Services
  const priorityServices = useMemo(() => {
    return servicesData.filter(s => priorityServiceSlugs.includes(s.slug) || s.featured);
  }, []);

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
      const cleanQuery = searchQuery.toLowerCase().trim();

      if (!cleanQuery) return matchesCategory;

      const matchesName = service.name.toLowerCase().includes(cleanQuery);
      const matchesDesc = service.description.toLowerCase().includes(cleanQuery);
      const matchesCat = service.category.toLowerCase().includes(cleanQuery);
      const matchesKeywords = service.keywords.some((kw) => kw.toLowerCase().includes(cleanQuery));

      return matchesCategory && (matchesName || matchesDesc || matchesCat || matchesKeywords);
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full bg-gov-bg min-h-screen pb-20">
      {/* Top Header / Breadcrumb Area */}
      <div className="bg-white border-b border-gov-borderCard py-10 sm:py-14 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gov-light text-gov-primary text-xs font-bold uppercase tracking-wider">
            Sameer Xerox Citizen Facilitation
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gov-textPrimary tracking-tight px-2">
            {t.servicesDirectoryTitle}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gov-textSecondary max-w-2xl mx-auto leading-relaxed">
            {t.servicesDirectorySub}
          </p>

          {/* Large Search Bar (Section 4) */}
          <div className="pt-6 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl border-2 border-gov-primary/20 hover:border-gov-primary focus-within:border-gov-primary shadow-sm hover:shadow transition-all px-4 py-1">
              <Search className="w-6 h-6 text-gov-primary shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full py-3 text-base sm:text-lg outline-none text-gov-textPrimary placeholder:text-gray-400 bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Clear search input"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8">
        {/* Category Filter Chips (Section 5) */}
        <div className="relative flex items-center mb-8 w-full min-w-0">
          <button
            onClick={() => scrollChips('left')}
            className="hidden sm:flex shrink-0 w-8 h-8 rounded-full border border-gov-border bg-white text-gray-600 hover:text-gov-primary hover:border-gov-primary items-center justify-center mr-2 shadow-sm z-10 transition-colors"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={chipsContainerRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 scroll-smooth w-full min-w-0"
          >
            {categoryChipsList.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                  activeCategory === category
                    ? 'bg-gov-primary text-white border-gov-primary shadow-sm'
                    : 'bg-white text-gov-textSecondary border-gov-border hover:border-gov-primary hover:text-gov-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollChips('right')}
            className="hidden sm:flex shrink-0 w-8 h-8 rounded-full border border-gov-border bg-white text-gray-600 hover:text-gov-primary hover:border-gov-primary items-center justify-center ml-2 shadow-sm z-10 transition-colors"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Informational Service Count Bar (Section 14) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-gov-border gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gov-textPrimary">
              {filteredServices.length} {t.availableServicesCount}
            </span>
            {activeCategory !== 'All' && (
              <span className="text-xs text-gov-primary bg-gov-light px-2.5 py-0.5 rounded-full font-semibold">
                Category: {activeCategory}
              </span>
            )}
            {searchQuery && (
              <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full font-semibold border border-amber-200">
                Search: "{searchQuery}"
              </span>
            )}
          </div>

          {(activeCategory !== 'All' || searchQuery) && (
            <button
              onClick={handleClearSearch}
              className="text-xs font-semibold text-gov-primary hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t.clearSearch}</span>
            </button>
          )}
        </div>

        {/* Optional Featured / Popular Services Spotlight (When 'All' selected and no search) */}
        {activeCategory === 'All' && !searchQuery && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-base font-bold text-gov-textPrimary uppercase tracking-wider">
                Popular Services
              </h2>
            </div>
            {/* 5 Priority Services Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
              {priorityServices.map((service) => (
                <ServiceCard key={`priority-${service.id}`} service={service} showPriorityBadge={true} />
              ))}
            </div>
          </div>
        )}

        {/* 6-COLUMN SERVICE CARD GRID (Section 6 & 17) */}
        {filteredServices.length > 0 ? (
          <div>
            {activeCategory === 'All' && !searchQuery && (
              <h2 className="text-base font-bold text-gov-textPrimary uppercase tracking-wider mb-4">
                All Available Services
              </h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State (Section 13) */
          <div className="py-20 text-center bg-white rounded-2xl border border-gov-borderCard shadow-sm max-w-lg mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-gov-light flex items-center justify-center mx-auto mb-4 text-gov-primary">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gov-textPrimary mb-2">
              {t.noServicesFound}
            </h3>
            <p className="text-sm text-gov-textSecondary mb-6">
              Try searching with a different service name or category, or view all services.
            </p>
            <button
              onClick={handleClearSearch}
              className="px-6 py-2.5 bg-gov-primary hover:bg-gov-dark text-white rounded-lg font-bold text-sm transition-all shadow-sm"
            >
              {t.clearSearch}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
