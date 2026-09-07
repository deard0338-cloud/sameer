import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, Clock, Award, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {

  return (
    <div className="w-full bg-gov-bg min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-white border-b border-gov-borderCard py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gov-light text-gov-primary text-xs font-bold uppercase tracking-wider">
            About Our Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gov-textPrimary tracking-tight">
            Sameer Xerox — Digital Services &amp; CSC Center
          </h1>
          <p className="text-sm sm:text-base text-gov-textSecondary max-w-2xl mx-auto leading-relaxed">
            Your trusted local destination for online government applications, official certificates, banking, insurance, and professional xerox &amp; document solutions.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 space-y-10">
        {/* Core Mission */}
        <div className="bg-white rounded-3xl border border-gov-borderCard p-8 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-gov-primary">
            Bridging Citizens with Digital Public Services
          </h2>
          <p className="text-sm sm:text-base text-gov-textSecondary leading-relaxed">
            Sameer Xerox was founded with a clear objective: to make digital government documentation and essential citizen services accessible, transparent, and completely hassle-free. In today's digital era, applying for PAN cards, caste validities, ration card modifications, or trade licenses requires technical expertise, exact document specifications, and timely follow-ups.
          </p>
          <p className="text-sm sm:text-base text-gov-textSecondary leading-relaxed">
            We provide hands-on operator assistance so citizens, students, farmers, shop owners, and senior citizens can get their official paperwork completed accurately without unnecessary trips to distant offices.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gov-borderCard shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gov-light text-gov-primary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gov-textPrimary">Accuracy &amp; Compliance</h3>
            <p className="text-xs sm:text-sm text-gov-textSecondary leading-relaxed">
              Every application is audited for proper format, required gazette proofs, and validity before submission to minimize government query delays.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gov-borderCard shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gov-light text-gov-primary flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gov-textPrimary">Prompt Service (7 Days)</h3>
            <p className="text-xs sm:text-sm text-gov-textSecondary leading-relaxed">
              Open 7 days a week from 10:00 AM to 6:00 PM with fast turnaround for urgent prints, legal agreements, and time-sensitive exam forms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gov-borderCard shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gov-light text-gov-primary flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gov-textPrimary">Modern Hardware &amp; Security</h3>
            <p className="text-xs sm:text-sm text-gov-textSecondary leading-relaxed">
              Equipped with high-speed digital xerox machines, optical scanners, and certified biometric RD scanners for AEPS banking and life certificates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gov-borderCard shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gov-light text-gov-primary flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gov-textPrimary">Customer First Approach</h3>
            <p className="text-xs sm:text-sm text-gov-textSecondary leading-relaxed">
              Warm, respectful, and transparent guidance with upfront fee clarity for all online filings and document processing.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gov-dark text-white rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Visit Sameer Xerox Today</h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto">
            Have a question about which documents are required for your application? Give us a call or stop by our center.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="tel:+918625820706"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gov-primary hover:bg-blue-50 font-bold text-sm shadow transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 86258 20706</span>
            </a>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm border border-white/30 transition-all"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
