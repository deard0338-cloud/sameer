import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const getToKnowLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Cancellation & Refund Policy", href: "/cancellation-refund" },
    { name: "FAQ", href: "/faq" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Case Study & Success Stories", href: "/case-study" }
  ];

  const grievanceLinks = [
    { name: "Customer Grievance Desk", href: "/grievance" },
    { name: "Consumer Helpline Guidance", href: "/consumer-helpline" }
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Citizen Dashboard", href: "/dashboard" },
    { name: "Government Schemes Info", href: "/services" },
    { name: "Our CSC Partners", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Video Guide & Tutorials", href: "/video-guide" },
    { name: "Document eBook", href: "/ebook" },
    { name: "User Manual", href: "/manual" },
    { name: "Accessibility Statement", href: "/accessibility" },
    { name: "Careers / Operator Jobs", href: "/careers" }
  ];

  const usefulLinks = [
    { name: "DigiLocker Information", href: "https://www.digilocker.gov.in", external: true },
    { name: "National Portal Guidance", href: "https://www.india.gov.in", external: true },
    { name: "MyGov Citizen Engagement", href: "https://www.mygov.in", external: true },
    { name: "UIDAI Aadhaar Portal", href: "https://uidai.gov.in", external: true },
    { name: "Income Tax e-Filing", href: "https://www.incometax.gov.in", external: true }
  ];

  return (
    <footer className="bg-gov-light text-gov-textPrimary border-t border-gov-border pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Brand Bar in Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-10 mb-10 border-b border-blue-200/60 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-extrabold text-gov-dark">Sameer Xerox</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gov-primary text-white">CSC</span>
            </div>
            <p className="text-xs text-gov-textSecondary font-medium">
              Digital Services &amp; CSC Center • Facilitating Citizen Documentation &amp; Online Services
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-gov-textSecondary font-semibold">Support:</span>
            <a
              href="tel:+918625820706"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-gov-dark hover:text-gov-primary transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-gov-primary" />
              <span>+91 86258 20706</span>
            </a>
            <span className="text-gray-300">•</span>
            <a
              href="tel:+918668637878"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-gov-primary hover:text-gov-dark transition-colors"
            >
              <span>+91 86686 37878</span>
            </a>
          </div>
        </div>

        {/* 3 Columns (Matching Reference Page 8) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12">
          {/* Column 1: Get to Know & Grievance */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-gov-dark uppercase tracking-wider mb-4">
                {t.footerGetToKnow}
              </h4>
              <ul className="space-y-2.5 text-xs text-gov-textSecondary">
                {getToKnowLinks.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="hover:text-gov-primary hover:underline transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-bold text-gov-dark uppercase tracking-wider mb-3">
                Grievance &amp; Support
              </h4>
              <ul className="space-y-2.5 text-xs text-gov-textSecondary">
                {grievanceLinks.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="hover:text-gov-primary hover:underline transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gov-dark uppercase tracking-wider mb-4">
              {t.footerQuickLinks}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-gov-textSecondary">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-gov-primary hover:underline transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links & Visitor Count */}
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-bold text-gov-dark uppercase tracking-wider mb-4">
                {t.footerUsefulLinks}
              </h4>
              <ul className="space-y-2.5 text-xs text-gov-textSecondary">
                {usefulLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-gov-primary hover:underline transition-colors"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visitor Counter Area (Matching Page 8) */}
            <div className="p-4 rounded-xl bg-white border border-blue-200/80 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold text-gov-textSecondary uppercase tracking-wider">
                  {t.visitors}
                </div>
                <div className="text-xl font-extrabold text-gov-dark font-mono mt-0.5">
                  193,388,806
                </div>
              </div>
              <div className="w-9 h-9 rounded-lg bg-gov-light flex items-center justify-center text-gov-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-blue-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gov-textSecondary gap-4">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-gov-textPrimary">Sameer Xerox</span>. All rights reserved.
          </p>

          <p className="text-[11px] text-gray-500 text-center sm:text-right max-w-xl">
            Disclaimer: Sameer Xerox is an independent Digital Services &amp; CSC Facilitation Center. We provide consultation and application assistance. Not an official government portal.
          </p>
        </div>
      </div>
    </footer>
  );
};
