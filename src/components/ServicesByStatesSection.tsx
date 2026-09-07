import React from 'react';
import { Link } from 'react-router-dom';
import { featuredStates } from '../data/states';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, MapPin } from 'lucide-react';

export const ServicesByStatesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-gov-veryLight border-b border-gov-borderCard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Side: Staggered State Monument Cards (Matching Reference Page 4) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto lg:max-w-none">
              {featuredStates.map((state, idx) => (
                <Link
                  key={state.code}
                  to={`/states?state=${state.code}`}
                  className={`group bg-white rounded-2xl p-6 sm:p-8 border border-gov-borderCard shadow-gov-card hover:shadow-gov-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center ${
                    idx % 2 === 1 ? 'lg:translate-y-6' : ''
                  }`}
                >
                  {/* Monument SVG Container */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={state.monumentSvg}
                      alt={`${state.name} Heritage Monument`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* State Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-gov-textPrimary group-hover:text-gov-primary transition-colors">
                    {state.name}
                  </h3>

                  {/* Service Count */}
                  <div className="flex items-center gap-1 mt-1 text-xs text-gov-textSecondary">
                    <MapPin className="w-3 h-3 text-gov-primary" />
                    <span>{state.servicesCount} Services</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side: Heading, Description & Explore CTA */}
          <div className="lg:col-span-5 text-left space-y-5 lg:pl-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gov-light text-gov-primary text-xs font-bold tracking-wide uppercase">
              Pan-India Digital Access
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gov-textPrimary tracking-tight">
              {t.servicesByStates}
            </h2>

            <p className="text-base sm:text-lg text-gov-textSecondary leading-relaxed">
              {t.servicesByStatesSub}
            </p>

            <div className="pt-2">
              <Link
                to="/states"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-gov-primary hover:bg-gov-dark text-white font-bold text-base shadow-md hover:shadow-lg transition-all"
              >
                <span>{t.exploreStatesBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
