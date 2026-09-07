import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, FileText, ChevronRight } from 'lucide-react';
import { servicesData } from '../data/services';
import { categoryChipsList } from '../data/categories';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredServices = servicesData.filter((service) => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return matchesCategory;

    const matchesName = service.name.toLowerCase().includes(cleanQuery);
    const matchesDesc = service.description.toLowerCase().includes(cleanQuery);
    const matchesCat = service.category.toLowerCase().includes(cleanQuery);
    const matchesKeywords = service.keywords.some((kw) => kw.toLowerCase().includes(cleanQuery));

    return matchesCategory && (matchesName || matchesDesc || matchesCat || matchesKeywords);
  });

  const handleSelectService = (slug: string) => {
    onClose();
    navigate(`/services/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-gov-border overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Header */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-gov-border gap-3">
          <Search className="w-6 h-6 text-gov-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for services, documents, schemes, licenses..."
            className="flex-1 text-base sm:text-lg outline-none text-gov-textPrimary placeholder:text-gray-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              aria-label="Clear query"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 text-xs font-semibold"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 overflow-x-auto no-scrollbar bg-gov-veryLight border-b border-gov-border">
          {categoryChipsList.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-gov-primary text-white'
                  : 'bg-white text-gov-textSecondary border border-gov-border hover:bg-gov-light hover:text-gov-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
          {filteredServices.length > 0 ? (
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-2 px-2 flex items-center justify-between">
                <span>Services ({filteredServices.length})</span>
                <span className="text-[11px] text-gray-400">Click to view details</span>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleSelectService(service.slug)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gov-light/60 flex items-center justify-between gap-3 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gov-light flex items-center justify-center p-1.5 shrink-0 border border-blue-100">
                        <FileText className="w-5 h-5 text-gov-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gov-textPrimary group-hover:text-gov-primary transition-colors">
                          {service.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gov-textSecondary">
                          <span className="font-medium text-gov-primary">{service.category}</span>
                          <span>•</span>
                          <span className="truncate max-w-[280px] sm:max-w-md">{service.description}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gov-primary transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gov-textPrimary">No services found</p>
              <p className="text-xs text-gray-500 mt-1">
                Try searching with a different term like "PAN", "Account", "Insurance", or "Rent"
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gov-border flex items-center justify-between text-xs text-gray-500">
          <span>Need custom assistance?</span>
          <a
            href="tel:+918625820706"
            className="text-gov-primary font-bold hover:underline flex items-center gap-1"
          >
            Call Sameer Xerox +91 86258 20706 <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
