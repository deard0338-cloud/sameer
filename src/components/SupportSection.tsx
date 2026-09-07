import React from 'react';
import { PhoneCall, Clock, MessageSquare, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SupportSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 bg-gov-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-white rounded-3xl border border-gov-borderCard shadow-gov-card overflow-hidden p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Information & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Working Hours Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.availableHours} • {t.supportTiming}</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gov-textPrimary tracking-tight">
                {t.needHelpTitle}
              </h2>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gov-textSecondary leading-relaxed">
                {t.needHelpSub}
              </p>

              {/* Center Details Box */}
              <div className="p-4 rounded-xl bg-gov-light/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gov-primary mb-1">
                    CUSTOMER ASSISTANCE DESK
                  </div>
                  <div className="text-2xl font-extrabold text-gov-dark">
                    +91 86258 20706
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="tel:+918625820706"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gov-primary hover:bg-gov-dark text-white font-bold text-sm shadow-md transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{t.callNow}</span>
                  </a>

                  <a
                    href="https://wa.me/918625820706?text=Hello%20Sameer%20Xerox,%20I%20need%20assistance%20with%20a%20service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.whatsappUs}</span>
                  </a>
                </div>
              </div>

              {/* Physical Visit Prompt */}
              <div className="flex items-center gap-2 text-xs text-gov-textSecondary pt-1">
                <MapPin className="w-4 h-4 text-gov-primary shrink-0" />
                <span>Walk-ins welcome during business hours for fast documentation and print services.</span>
              </div>
            </div>

            {/* Right Column: Support Representative Illustration (Matching Page 7) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-sm sm:max-w-md">
                <img
                  src="/assets/support-desk.svg"
                  alt="Customer Support Desk Illustration"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
