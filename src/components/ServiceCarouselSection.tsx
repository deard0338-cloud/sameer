import React, { useState, useRef } from 'react';
import type { ServiceItem } from '../data/services';
import { ServiceCard } from './ServiceCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceCarouselSectionProps {
  title: string;
  subtitle: string;
  services: ServiceItem[];
  id?: string;
}

export const ServiceCarouselSection: React.FC<ServiceCarouselSectionProps> = ({
  title,
  subtitle,
  services,
  id
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  const totalPages = Math.ceil(services.length / 4) || 1;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const pageFraction = scrollLeft / (scrollWidth - clientWidth || 1);
    const newPage = Math.min(Math.round(pageFraction * (totalPages - 1)), totalPages - 1);
    setActivePage(Math.max(0, newPage));
  };

  const scrollToPage = (pageIndex: number) => {
    if (!scrollContainerRef.current) return;
    const { scrollWidth, clientWidth } = scrollContainerRef.current;
    const targetScroll = (scrollWidth - clientWidth) * (pageIndex / (totalPages - 1 || 1));
    scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setActivePage(pageIndex);
  };

  return (
    <section id={id} className="py-12 sm:py-16 bg-white border-b border-gov-borderCard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-textPrimary tracking-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-gov-textSecondary mt-1.5">
              {subtitle}
            </p>
          </div>

          {/* Navigation Arrows for desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full border border-gov-border hover:border-gov-primary hover:bg-gov-light text-gov-textPrimary flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gov-primary"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full border border-gov-border hover:border-gov-primary hover:bg-gov-light text-gov-textPrimary flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gov-primary"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="shrink-0 w-[240px] sm:w-[260px] md:w-[270px]"
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: Math.min(totalPages + 3, 7) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToPage(idx % totalPages)}
              className={`transition-all duration-200 rounded-full ${
                (activePage % 7) === idx
                  ? 'w-6 h-2.5 bg-gov-primary'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Carousel page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
