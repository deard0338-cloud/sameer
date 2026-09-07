import React from 'react';
import { Settings, FileText, MessageSquareQuote, WalletCards } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BlueFeatureSection: React.FC = () => {
  const { t } = useLanguage();

  const featureCards = [
    {
      icon: Settings,
      heading: t.allServicesSchemes,
      tags: ["Central Government", "Utility Bills", "State Government", "Schemes"]
    },
    {
      icon: FileText,
      heading: t.allDocuments,
      tags: ["Aadhaar", "Driving License", "PAN", "Vehicle RC", "and many more from DigiLocker"]
    },
    {
      icon: MessageSquareQuote,
      heading: t.allEngagements,
      tags: ["Feedback & Rating", "Notifications", "Customer Support", "Live Chat", "AI Bot", "Chatbot", "Voicebot"]
    },
    {
      icon: WalletCards,
      heading: t.allTransactions,
      tags: ["Status", "Bills", "Applications", "and many more"]
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gov-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Banner Intro Text */}
        <div className="max-w-3xl mb-12 text-left">
          <p className="text-lg sm:text-2xl text-blue-50 font-medium leading-relaxed">
            {t.oneStopSub}
          </p>
        </div>

        {/* 2x2 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {featureCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className="bg-white text-gov-textPrimary rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-gov-light flex items-center justify-center text-gov-primary mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gov-primary mb-6">
                    {card.heading}
                  </h3>
                </div>

                {/* Pill-shaped Tags */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {card.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-gray-50 border border-gov-border text-gov-textSecondary hover:border-gov-primary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
