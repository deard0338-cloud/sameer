import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, Plane, HeartPulse, ShieldAlert, ShoppingBag, Truck, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MotionLink = motion.create(Link);

export const CategoriesSection: React.FC = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    {
      title: "Travel",
      slug: "travel",
      description: "Convenient assistance for bus ticketing, train bookings, passport applications, and domestic transit permits.",
      icon: Plane
    },
    {
      title: "Health & Wellness",
      slug: "health-wellness",
      description: "Health insurance schemes, Ayushman Bharat card assistance, and hospital cashless claims documentation.",
      icon: HeartPulse
    },
    {
      title: "Police and Legal",
      slug: "police-legal",
      description: "Police Clearance Certificates (PCC), tenant verifications, notary rent agreements, and affidavit documentation.",
      icon: ShieldAlert
    },
    {
      title: "Ration & Citizen Services",
      slug: "ration-citizen",
      description: "National Food Security ration card services, member additions, modifications, and citizen welfare schemes.",
      icon: ShoppingBag
    },
    {
      title: "Transport",
      slug: "transport",
      description: "Motor insurance renewals, driving license appointment bookings, and vehicle registration paperwork.",
      icon: Truck
    },
    {
      title: "Education, Skills & Employment",
      slug: "education-employment",
      description: "Caste validity filings, scholarships, exam forms, Udyam MSME, and apprentice skill program applications.",
      icon: GraduationCap
    }
  ];

  // Coordinated Variants for Staggered Scroll Reveal
  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  }), [shouldReduceMotion]);

  // Card Variants: Scroll Reveal, Subtle Scale, Desktop Hover Lift & Tactile Tap
  const cardVariants: Variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 22,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.48,
        ease: [0.22, 1, 0.36, 1], // Smooth cubic bezier
      },
    },
    hover: {
      y: shouldReduceMotion ? 0 : -5,
      scale: shouldReduceMotion ? 1 : 1.015,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    tap: {
      scale: shouldReduceMotion ? 1 : 0.985,
      transition: { duration: 0.1 },
    },
  }), [shouldReduceMotion]);

  // Icon Container Subtle Shift/Scale
  const iconContainerVariants: Variants = useMemo(() => ({
    hidden: { scale: 1, y: 0 },
    visible: { scale: 1, y: 0 },
    hover: {
      scale: shouldReduceMotion ? 1 : 1.06,
      y: shouldReduceMotion ? 0 : -1,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  }), [shouldReduceMotion]);

  // Icon Subtle Rotation
  const iconVariants: Variants = useMemo(() => ({
    hidden: { rotate: 0 },
    visible: { rotate: 0 },
    hover: {
      rotate: shouldReduceMotion ? 0 : -5,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  }), [shouldReduceMotion]);

  // Arrow Circle Subtle Scale
  const arrowCircleVariants: Variants = useMemo(() => ({
    hidden: { scale: 1 },
    visible: { scale: 1 },
    hover: {
      scale: shouldReduceMotion ? 1 : 1.08,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  }), [shouldReduceMotion]);

  // Arrow Smooth Right Translate
  const arrowIconVariants: Variants = useMemo(() => ({
    hidden: { x: 0 },
    visible: { x: 0 },
    hover: {
      x: shouldReduceMotion ? 0 : 4,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  }), [shouldReduceMotion]);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gov-borderCard overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gov-textPrimary tracking-tight">
              {t.categoriesTitle}
            </h2>
            <p className="text-base text-gov-textSecondary mt-2 leading-relaxed">
              {t.categoriesSub}
            </p>
          </div>

          <div>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-gov-primary text-gov-primary hover:bg-gov-light font-bold text-sm transition-colors whitespace-nowrap"
            >
              <span>{t.exploreMoreCategories}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 6 Category Cards Grid with Staggered Scroll Reveal & Coordinated Hover Animations */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 'some' }}
        >
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <MotionLink
                key={idx}
                to={`/services?category=${encodeURIComponent(cat.title)}`}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                style={{ willChange: 'transform, opacity' }}
                className="group relative bg-gov-primary hover:bg-gov-dark rounded-2xl p-6 sm:p-7 text-white shadow-md hover:shadow-xl transition-colors duration-300 flex flex-col justify-between min-h-[190px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gov-primary"
              >
                <div>
                  {/* Top Arrow & Icon Row */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Animated Icon Container */}
                    <motion.div
                      variants={iconContainerVariants}
                      className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white"
                    >
                      <motion.div variants={iconVariants}>
                        <IconComponent className="w-5 h-5" />
                      </motion.div>
                    </motion.div>

                    {/* Animated Arrow Circle Button */}
                    <motion.div
                      variants={arrowCircleVariants}
                      className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white group-hover:text-gov-primary text-white flex items-center justify-center transition-colors duration-200"
                    >
                      <motion.div variants={arrowIconVariants}>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </MotionLink>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
