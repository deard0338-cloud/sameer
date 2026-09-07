import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, ArrowLeft, PhoneCall } from 'lucide-react';

export const PolicyPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let title = "Information & Guidelines";
  let content = "Welcome to the Sameer Xerox Digital Services & CSC Center information portal.";

  if (path.includes('privacy')) {
    title = "Privacy Policy";
    content = "Sameer Xerox respects your personal and document privacy. Customer identification details, Aadhaar credentials, and application documents submitted at our center are used strictly for authorized service processing and verification with relevant department portals. We never sell or distribute your personal documents to unauthorized third parties.";
  } else if (path.includes('terms')) {
    title = "Terms of Service";
    content = "Sameer Xerox provides independent digital facilitation and citizen assistance. While we make every effort to ensure timely and error-free submissions, government approvals, scrutinies, and issuance timelines are governed by respective authorities. Customers are advised to furnish authentic documents and accurate information.";
  } else if (path.includes('refund') || path.includes('cancellation')) {
    title = "Cancellation & Refund Policy";
    content = "Once an application has been processed and government statutory challan/fees have been submitted on authorized portals, government fee amounts are non-refundable as per departmental regulations. For services canceled prior to portal submission, consultation fees may be adjusted or refunded upon evaluation.";
  } else if (path.includes('faq')) {
    title = "Frequently Asked Questions (FAQ)";
    content = "Find answers to commonly asked questions regarding PAN Card processing, Caste Validity scrutiny, Rent Agreements, Food Safety licenses, and AEPS cash withdrawal at Sameer Xerox.";
  } else if (path.includes('grievance')) {
    title = "Customer Grievance Redressal";
    content = "If you have any feedback, delay query, or grievance regarding services rendered at Sameer Xerox, please contact our proprietor directly at +91 86258 20706 or visit our center during working hours (10:00 AM to 6:00 PM).";
  } else if (path.includes('accessibility')) {
    title = "Accessibility Statement";
    content = "Sameer Xerox is committed to digital inclusion. Our portal incorporates text resizing tools, high-contrast modes, night themes, keyboard navigation, and multilingual support (English, Hindi, Marathi) to ensure seamless access for all citizens.";
  }

  return (
    <div className="w-full bg-gov-bg min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gov-borderCard shadow-sm p-8 sm:p-12 space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gov-primary hover:underline mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gov-light text-gov-primary flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-textPrimary">
            {title}
          </h1>
        </div>

        <div className="prose prose-blue max-w-none text-sm sm:text-base text-gov-textSecondary leading-relaxed pt-2 border-t border-gray-100">
          <p>{content}</p>
          <p className="mt-4">
            For specific inquiries, please contact Sameer Xerox Digital Services &amp; CSC Center at <a href="tel:+918625820706" className="text-gov-primary font-bold hover:underline">+91 86258 20706</a>.
          </p>
        </div>

        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">Sameer Xerox • Facilitating Citizen Documentation</span>
          <a
            href="tel:+918625820706"
            className="inline-flex items-center gap-1 text-xs font-bold text-gov-primary"
          >
            <PhoneCall className="w-3.5 h-3.5" /> +91 86258 20706
          </a>
        </div>
      </div>
    </div>
  );
};
