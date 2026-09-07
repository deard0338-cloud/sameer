import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { categoriesCatalog } from '../data/categories';
import { servicesData } from '../data/services';
import {
  FileText,
  Award,
  ShieldCheck,
  Landmark,
  ShieldAlert,
  Building2,
  UtensilsCrossed,
  Briefcase,
  FileCheck2,
  MonitorSmartphone,
  ArrowRight,
  Globe,
  Fingerprint,
  CheckSquare,
  CreditCard,
  Users,
  Printer,
  GraduationCap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CategoriesPage: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    FileText,
    Award,
    ShieldCheck,
    Landmark,
    ShieldAlert,
    Building2,
    UtensilsCrossed,
    Briefcase,
    FileCheck2,
    MonitorSmartphone,
    Globe,
    Fingerprint,
    CheckSquare,
    CreditCard,
    Users,
    Printer,
    GraduationCap
  };

  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  }), [shouldReduceMotion]);

  const cardVariants: Variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      y: shouldReduceMotion ? 0 : -5,
      scale: shouldReduceMotion ? 1 : 1.015,
      transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
    },
  }), [shouldReduceMotion]);

  return (
    <div className="w-full bg-gov-bg min-h-screen pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-gov-borderCard py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gov-light text-gov-primary text-xs font-bold uppercase tracking-wider">
            Structured Service Groups
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gov-textPrimary tracking-tight">
            Explore All Categories
          </h1>
          <p className="text-sm sm:text-base text-gov-textSecondary max-w-xl mx-auto">
            {t.categoriesSub}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 'some' }}
        >
          {categoriesCatalog.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || FileText;
            const count = servicesData.filter(s => s.category === cat.name).length;

            return (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                whileHover="hover"
                style={{ willChange: 'transform, opacity' }}
                className="bg-white rounded-2xl p-6 border border-gov-borderCard shadow-gov-card hover:shadow-gov-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gov-light text-gov-primary flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gov-veryLight text-gov-primary border border-blue-100">
                      {count > 0 ? `${count} Center Services` : 'Facilitated'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gov-textPrimary mb-2">
                    {cat.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gov-textSecondary leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    to={`/services?category=${encodeURIComponent(cat.name)}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-gov-primary hover:text-gov-dark transition-colors"
                  >
                    <span>Explore Services in this Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
