import React from 'react';
import { Smartphone, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AppContactSection: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { name: "Facebook", href: "#", bg: "bg-[#1877F2]", icon: "f" },
    { name: "LinkedIn", href: "#", bg: "bg-[#0A66C2]", icon: "in" },
    { name: "YouTube", href: "#", bg: "bg-[#FF0000]", icon: "▶" },
    { name: "Instagram", href: "#", bg: "bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#405DE6]", icon: "📸" },
    { name: "X", href: "#", bg: "bg-black", icon: "𝕏" }
  ];

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-gov-borderCard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left: QR Code Card (Matching Reference Page 8) */}
          <div className="flex items-center gap-6 p-6 rounded-2xl bg-gov-veryLight border border-gov-border max-w-md w-full shadow-sm">
            <div className="w-28 h-28 bg-white p-2 rounded-xl border border-gov-border shadow-inner shrink-0 flex items-center justify-center">
              <img
                src="/assets/qr-code.svg"
                alt="Scan QR Code"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            <div>
              <div className="text-xs font-bold text-gov-primary uppercase tracking-wider mb-1 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" /> Mobile Portal
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gov-textPrimary leading-snug mb-1">
                {t.scanQrTitle}
              </h3>
              <p className="text-xs text-gov-textSecondary">
                Save Sameer Xerox digital business card &amp; connect on mobile instantly.
              </p>
            </div>
          </div>

          {/* Right: Badges & WhatsApp & Social Icons */}
          <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
            {/* Download Badges & WhatsApp Row */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Google Play style button */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 bg-black text-white rounded-xl border border-gray-800 shadow-sm cursor-pointer hover:bg-gray-900 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186c-.347-.216-.61-.63-.61-1.186V3c0-.557.263-.97.61-1.186zM15.207 13.414l2.122 2.122-11.83 6.829 9.708-8.951zm0-2.828L5.5 1.635l11.829 6.829-2.122 2.122zm1.414 1.414l3.18-1.836c1.066-.615 1.066-1.623 0-2.238l-3.18-1.836-1.414 1.414 1.414 4.496z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-gray-300">GET IT ON</div>
                  <div className="text-xs font-bold tracking-tight">Google Play</div>
                </div>
              </div>

              {/* Apple App Store style button */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 bg-black text-white rounded-xl border border-gray-800 shadow-sm cursor-pointer hover:bg-gray-900 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.93.04-2.02.63-2.66 1.39-.57.66-.99 1.75-.86 2.8 1.04.08 2.05-.53 2.58-1.26z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wider text-gray-300">Download on the</div>
                  <div className="text-xs font-bold tracking-tight">App Store</div>
                </div>
              </div>

              {/* WhatsApp Contact Badge (Matching Page 8) */}
              <a
                href="https://wa.me/918625820706"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-300 transition-colors shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] uppercase font-bold text-emerald-700">WhatsApp Help</div>
                  <div className="text-xs font-bold text-gray-900">+91 86258 20706</div>
                </div>
              </a>
            </div>

            {/* Follow Us Social Media Icons */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gov-textPrimary tracking-wide">
                Follow Us:
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={`Follow Sameer Xerox on ${social.name}`}
                    className={`w-8 h-8 rounded-full ${social.bg} text-white flex items-center justify-center text-xs font-bold shadow hover:opacity-90 hover:scale-105 transition-all`}
                  >
                    <span>{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
