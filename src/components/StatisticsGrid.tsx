import React, { useEffect, useState, useRef } from 'react';
import { Users, Layers, FileText, Calendar } from 'lucide-react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/**
 * =========================================================================
 * SAMEER XEROX — BUSINESS STATISTICS CONFIGURATION
 * =========================================================================
 * Modify the values below anytime to adjust the shop's real statistics.
 * Numbers format automatically with standard Indian commas (e.g., 10,000, 1,00,000).
 * Suffix '+' is preserved and animated alongside the number.
 */
export interface StatItemConfig {
  id: 'customers' | 'services' | 'documents' | 'experience';
  labelKey: 'happyCustomers' | 'servicesAvailable' | 'docsProcessed' | 'yearsExperience';
  subLabelKey: 'happyCustomersSub' | 'servicesAvailableSub' | 'docsProcessedSub' | 'yearsExperienceSub';
  defaultLabel: string;
  defaultSub: string;
  value: number; // <-- EDIT HERE: Verified shop statistics
  suffix: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const businessStats: StatItemConfig[] = [
  {
    id: 'customers',
    labelKey: 'happyCustomers',
    subLabelKey: 'happyCustomersSub',
    defaultLabel: 'Happy Customers',
    defaultSub: 'Citizens & local businesses served',
    value: 10000, // Replace with actual verified customer count
    suffix: '+',
    icon: Users
  },
  {
    id: 'services',
    labelKey: 'servicesAvailable',
    subLabelKey: 'servicesAvailableSub',
    defaultLabel: 'Services Available',
    defaultSub: 'Government, CSC & digital services',
    value: 54, // Aligned with the 54 active digital services catalog
    suffix: '+',
    icon: Layers
  },
  {
    id: 'documents',
    labelKey: 'docsProcessed',
    subLabelKey: 'docsProcessedSub',
    defaultLabel: 'Documents & Applications',
    defaultSub: 'Certificates & online forms handled',
    value: 25000, // Replace with actual verified applications processed
    suffix: '+',
    icon: FileText
  },
  {
    id: 'experience',
    labelKey: 'yearsExperience',
    subLabelKey: 'yearsExperienceSub',
    defaultLabel: 'Years of Service',
    defaultSub: 'Serving Ashti & surrounding region',
    value: 10, // Replace with actual verified years in operation
    suffix: '+',
    icon: Calendar
  }
];

/**
 * Formats numbers into the Indian numbering format (e.g. 1,000, 10,000, 1,00,000).
 */
export const formatIndianNumber = (num: number): string => {
  return num.toLocaleString('en-IN');
};

/**
 * Single Stat Card with smooth count-up animation upon viewport entry.
 */
interface StatCardProps {
  item: StatItemConfig;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ item, index }) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? item.value : 0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (isInView) {
      const controls = animate(0, item.value, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1], // Gentle easeOut
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, item.value, prefersReducedMotion]);

  const IconComponent = item.icon;
  const label = t[item.labelKey] || item.defaultLabel;
  const subLabel = t[item.subLabelKey] || item.defaultSub;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-gov-borderCard shadow-gov-card hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top accent glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gov-primary via-blue-400 to-gov-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Header: Icon & Category Indicator */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-gov-light text-gov-primary flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:bg-gov-primary group-hover:text-white transition-all duration-300">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-gov-primary/80 bg-gov-veryLight px-2.5 py-1 rounded-full border border-blue-50">
            Sameer Xerox
          </span>
        </div>

        {/* Counter Number */}
        <div className="mb-2">
          <div className="text-3xl sm:text-4xl font-extrabold text-gov-textPrimary tracking-tight tabular-nums flex items-baseline gap-0.5">
            <span>{formatIndianNumber(displayValue)}</span>
            <span className="text-gov-primary font-bold">{item.suffix}</span>
          </div>
        </div>

        {/* Primary Stat Label */}
        <h3 className="text-base sm:text-lg font-bold text-gov-textPrimary leading-snug">
          {label}
        </h3>
      </div>

      {/* Subtitle / Description */}
      <p className="text-xs text-gov-textSecondary mt-2 pt-3 border-t border-gray-100 leading-relaxed">
        {subLabel}
      </p>
    </motion.div>
  );
};

export const StatisticsGrid: React.FC = () => {
  return (
    <section
      aria-label="Sameer Xerox Business Highlights"
      className="w-full bg-slate-50/70 border-b border-gov-borderCard py-10 sm:py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Heading */}
        <div className="mb-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gov-light text-gov-primary text-xs font-bold uppercase tracking-wider mb-2">
            Center Track Record &amp; Trust
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-textPrimary tracking-tight">
            Trusted Digital &amp; Citizen Facilitation
          </h2>
          <p className="text-xs sm:text-sm text-gov-textSecondary mt-1 max-w-2xl">
            Providing reliable online applications, government documentation, xerox, and financial services to our community.
          </p>
        </div>

        {/* 4-Column Responsive Grid: 4 cols on desktop (lg), 2 cols on tablet (sm/md), 1-2 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {businessStats.map((item, index) => (
            <StatCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
