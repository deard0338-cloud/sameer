import React from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { StatisticsGrid } from '../components/StatisticsGrid';
import { ServiceCarouselSection } from '../components/ServiceCarouselSection';
import { ServicesByStatesSection } from '../components/ServicesByStatesSection';
import { BlueFeatureSection } from '../components/BlueFeatureSection';
import { CategoriesSection } from '../components/CategoriesSection';
import { SupportSection } from '../components/SupportSection';
import { AppContactSection } from '../components/AppContactSection';
import { servicesData, priorityServiceSlugs } from '../data/services';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();

  // What's New items (e.g. recent service initiatives)
  const whatsNewServices = servicesData.slice(10, 18);

  // Popular Services (Bank Account Opening, Rent Agreement, Motor Insurance, Health Insurance, Food License, etc.)
  const popularServices = servicesData.filter(s => s.popular || priorityServiceSlugs.includes(s.slug));

  // Trending services (top accessed)
  const trendingServices = [
    servicesData[5], // Bank Account Opening
    servicesData[7], // Rent Agreement
    servicesData[13], // Motor Insurance
    servicesData[12], // Health Insurance
    servicesData[14], // Food License Basic
    servicesData[0],  // PAN Card
    servicesData[3],  // Ration Card
    servicesData[4]   // AEPS
  ].filter(Boolean);

  return (
    <div className="w-full bg-gov-bg">
      {/* 2. Hero Banner Carousel */}
      <HeroCarousel />

      {/* 3. Statistics / Platform Service Overview (Central 80/State 162, Central 880/State 1705, Registrations, Transactions) */}
      <StatisticsGrid />

      {/* 4. What's New ? Section */}
      <ServiceCarouselSection
        id="whats-new"
        title={t.whatsNew}
        subtitle={t.whatsNewSub}
        services={whatsNewServices}
      />

      {/* 5. Popular Service Section */}
      <ServiceCarouselSection
        id="popular-services"
        title={t.popularServices}
        subtitle={t.popularServicesSub}
        services={popularServices}
      />

      {/* 6. Trending Section */}
      <ServiceCarouselSection
        id="trending-services"
        title={t.trending}
        subtitle={t.trendingSub}
        services={trendingServices}
      />

      {/* 7. Services by States (Delhi, Gujarat, Haryana, Maharashtra monument line art) */}
      <ServicesByStatesSection />

      {/* 8. Blue Information Section (All Services, All Documents, All Engagements, All Transactions) */}
      <BlueFeatureSection />

      {/* 9. Categories Section */}
      <CategoriesSection />

      {/* 10. Help / Support Section */}
      <SupportSection />

      {/* 11. Download / QR Code / App & Social Contact Area */}
      <AppContactSection />
    </div>
  );
};
