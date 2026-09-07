import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, PhoneCall, ArrowRight, ShieldCheck, FileCheck, Landmark } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HeroCarousel: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      id: 1,
      tag: "SAMEER XEROX • DIGITAL SERVICES & CSC CENTER",
      headline: "All Your Digital Services, In One Place",
      subtext: "Get digital, document and CSC-related services with convenient assistance from Sameer Xerox.",
      primaryCta: t.exploreServices,
      primaryLink: "/services",
      secondaryCta: "Call +91 86258 20706",
      secondaryHref: "tel:+918625820706",
      badge: "Verified Citizen Facilitation",
      icon: ShieldCheck,
      gradient: "from-[#005B96] via-[#0066A6] to-[#004A7C]",
      pattern: "radial-gradient(circle at 80% 50%, rgba(234, 244, 251, 0.15) 0%, transparent 60%)"
    },
    {
      id: 2,
      tag: "SPEEDY DOCUMENTATION & VERIFICATION",
      headline: "Fast & Convenient CSC Document Services",
      subtext: "PAN Card, Caste Validity, Ration Card, Shop Act & MSME Registrations handled with dedicated expert guidance.",
      primaryCta: "Explore Documents",
      primaryLink: "/services",
      secondaryCta: "WhatsApp Us",
      secondaryHref: "https://wa.me/918625820706?text=Hello%20Sameer%20Xerox,%20I%20need%20help%20with%20digital%20services",
      badge: "Fast Track Processing",
      icon: FileCheck,
      gradient: "from-[#004D80] via-[#005B96] to-[#003C66]",
      pattern: "radial-gradient(circle at 20% 40%, rgba(255, 153, 51, 0.12) 0%, transparent 50%)"
    },
    {
      id: 3,
      tag: "FINANCIAL ACCESS & CITIZEN PROTECTION",
      headline: "Banking, AEPS & Insurance Support",
      subtext: "Aadhaar cash withdrawal, new account opening assistance, Health & Motor vehicle insurance policies at your doorstep.",
      primaryCta: "Banking & Insurance",
      primaryLink: "/services",
      secondaryCta: "Call +91 86258 20706",
      secondaryHref: "tel:+918625820706",
      badge: "Biometric Secure AEPS",
      icon: Landmark,
      gradient: "from-[#005B96] via-[#0275B8] to-[#004F85]",
      pattern: "radial-gradient(circle at 75% 70%, rgba(19, 136, 8, 0.12) 0%, transparent 50%)"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  return (
    <div
      className="relative w-full overflow-hidden bg-gov-dark select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Homepage Banners Carousel"
    >
      {/* Slide Container */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => {
          const IconComponent = slide.icon;
          return (
            <div
              key={slide.id}
              className={`w-full shrink-0 relative bg-gradient-to-r ${slide.gradient} text-white min-h-[340px] sm:min-h-[400px] md:min-h-[440px] flex items-center`}
              style={{ backgroundImage: slide.pattern }}
            >
              <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 py-12 w-full flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Text Content */}
                <div className="max-w-2xl text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-blue-100 text-xs font-semibold tracking-wider">
                    <IconComponent className="w-3.5 h-3.5 text-amber-300" />
                    <span>{slide.tag}</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    {slide.headline}
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed font-normal">
                    {slide.subtext}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <Link
                      to={slide.primaryLink}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gov-primary hover:bg-blue-50 font-bold text-sm shadow-md hover:shadow-lg transition-all"
                    >
                      <span>{slide.primaryCta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {slide.secondaryHref.startsWith('tel:') ? (
                      <a
                        href={slide.secondaryHref}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/15 hover:bg-white/25 text-white font-semibold text-sm border border-white/30 backdrop-blur-sm transition-all"
                      >
                        <PhoneCall className="w-4 h-4 text-amber-300" />
                        <span>{slide.secondaryCta}</span>
                      </a>
                    ) : (
                      <a
                        href={slide.secondaryHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm shadow-md transition-all"
                      >
                        <span>{slide.secondaryCta}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Decorative Digital Badge / Card */}
                <div className="hidden md:flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-xs text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 shadow-inner">
                    <IconComponent className="w-9 h-9 text-amber-300" />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-blue-200 font-semibold mb-1">
                    SAMEER XEROX
                  </div>
                  <div className="text-lg font-bold text-white mb-2">
                    {slide.badge}
                  </div>
                  <div className="text-xs text-blue-100 leading-relaxed">
                    Assisting citizens with online government forms, certifications &amp; instant biometric verification.
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Left & Right Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx
                ? 'w-7 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
