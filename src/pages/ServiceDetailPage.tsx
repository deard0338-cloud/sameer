import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug, priorityServiceSlugs, servicesData } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import {
  ChevronRight,
  PhoneCall,
  MessageSquare,
  FileCheck,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Building,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gov-textPrimary mb-3">Service Not Found</h2>
        <p className="text-sm text-gov-textSecondary mb-6">
          The requested service page does not exist or has moved.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gov-primary text-white rounded-lg font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services Directory
        </Link>
      </div>
    );
  }

  const isPriority = priorityServiceSlugs.includes(service.slug) || service.featured;

  // Find related services by slugs or category
  const relatedServices = servicesData
    .filter(s => s.id !== service.id && (service.relatedSlugs.includes(s.slug) || s.category === service.category))
    .slice(0, 4);

  return (
    <div className="w-full bg-gov-bg min-h-screen pb-20">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-gov-borderCard py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gov-textSecondary mb-4">
            <Link to="/" className="hover:text-gov-primary transition-colors">
              {t.home}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/services" className="hover:text-gov-primary transition-colors">
              {t.services}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gov-textPrimary font-semibold truncate">
              {service.name}
            </span>
          </nav>

          {/* Service Title & Key Meta */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Normalized Service Logo Container */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gov-veryLight border border-gov-border p-2 shrink-0 flex items-center justify-center shadow-sm overflow-hidden">
                <img
                  src={imageError ? "/assets/service-placeholder.svg" : service.image}
                  alt={`${service.name} - Sameer Xerox`}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gov-light text-gov-primary">
                    {service.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700">
                    {service.level}
                  </span>
                  {isPriority && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <Sparkles className="w-3 h-3" /> Priority Service
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gov-textPrimary tracking-tight">
                  {service.name}
                </h1>

                <div className="flex items-center gap-1.5 text-xs text-gov-textSecondary mt-1">
                  <Building className="w-3.5 h-3.5 text-gov-primary shrink-0" />
                  <span>{service.department}</span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href="tel:+918625820706"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gov-primary hover:bg-gov-dark text-white font-bold text-sm shadow-md transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Now (+91 86258 20706)</span>
              </a>

              <a
                href={`https://wa.me/918625820706?text=Hello%20Sameer%20Xerox,%20I%20need%20assistance%20with%20${encodeURIComponent(service.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Details (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* About This Service */}
            <div className="bg-white rounded-2xl border border-gov-borderCard p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gov-primary mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-gov-primary" />
                About This Service
              </h2>
              <p className="text-sm sm:text-base text-gov-textPrimary leading-relaxed">
                {service.about}
              </p>
            </div>

            {/* Who Can Apply / Who It Is For */}
            <div className="bg-white rounded-2xl border border-gov-borderCard p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gov-primary mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gov-primary" />
                Who Can Apply / Eligible Persons
              </h2>
              <ul className="space-y-3">
                {service.whoCanApply.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gov-textPrimary">
                    <span className="w-5 h-5 rounded-full bg-gov-light text-gov-primary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents (Checklist) */}
            <div className="bg-white rounded-2xl border border-gov-borderCard p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gov-primary mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-gov-primary" />
                Required Documents Checklist
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.requiredDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-gov-veryLight border border-gov-border flex items-start gap-2.5 text-xs sm:text-sm font-medium text-gov-textPrimary"
                  >
                    <span className="text-gov-primary font-bold shrink-0">📄</span>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Process Steps */}
            <div className="bg-white rounded-2xl border border-gov-borderCard p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gov-primary mb-6 pb-2 border-b border-gray-100">
                Step-by-Step Facilitation Process
              </h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-blue-100">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-2">
                    <div className="w-7 h-7 rounded-full bg-gov-primary text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gov-textPrimary">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gov-textSecondary mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Information Notice Box */}
            <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider mb-1">
                  Important Service Notice
                </h4>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  {service.importantInfo}
                </p>
                <p className="text-xs text-amber-700 mt-2 italic">
                  Note: Please contact Sameer Xerox directly for current government requirements, fee breakdowns, and turnaround times.
                </p>
              </div>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-gov-primary mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-gov-primary" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <h4 className="text-sm font-bold text-gov-textPrimary mb-1.5">
                        Q: {faq.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-gov-textSecondary leading-relaxed">
                        A: {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Center Contact Box & Related Services (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Official Service Poster Banner (if real banner exists) */}
            {service.image.startsWith('/services/') && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-4 shadow-gov-card overflow-hidden">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-3">
                  <h3 className="text-xs font-bold text-gov-textPrimary uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gov-primary" />
                    अधिकृत केंद्र माहिती पत्रक
                  </h3>
                  <span className="text-[10px] font-bold text-gov-primary bg-gov-light px-2 py-0.5 rounded-full">
                    Sameer Xerox
                  </span>
                </div>
                <div className="w-full rounded-xl overflow-hidden bg-slate-50 border border-gray-100 flex items-center justify-center p-2">
                  <img
                    src={service.image}
                    alt={`${service.name} official service poster banner - Sameer Xerox`}
                    className="w-full max-h-[460px] object-contain rounded-lg shadow-xs"
                    loading="lazy"
                  />
                </div>
                <div className="text-center text-[11px] text-gov-textSecondary pt-2">
                  📍 ट्रेझरी ऑफिस समोर, छत्रपती शिवाजी महाराज चौक, आष्टी
                </div>
              </div>
            )}

            {/* Sameer Xerox Support Box */}
            <div className="bg-white rounded-2xl border border-gov-borderCard p-6 shadow-gov-card text-left space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                Center Open Today (10 AM - 6 PM)
              </div>

              <h3 className="text-lg font-bold text-gov-textPrimary">
                Need Help with {service.name}?
              </h3>

              <p className="text-xs text-gov-textSecondary leading-relaxed">
                Visit Sameer Xerox or connect with our service desk to verify your documents and ensure smooth processing.
              </p>

              <div className="p-3.5 rounded-xl bg-gov-light border border-blue-100">
                <div className="text-[11px] font-semibold text-gov-primary uppercase tracking-wide">
                  Direct Helplines
                </div>
                <div className="text-lg font-extrabold text-gov-dark mt-0.5">
                  +91 86258 20706
                </div>
                <div className="text-sm font-bold text-gov-primary">
                  +91 86686 37878
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href="tel:+918625820706"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gov-primary hover:bg-gov-dark text-white text-sm font-bold shadow transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Sameer Xerox</span>
                </a>

                <a
                  href={`https://wa.me/918625820706?text=Hello%20Sameer%20Xerox,%20I%20am%20inquiring%20about%20${encodeURIComponent(service.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold shadow transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <Link
                  to="/track-application"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gov-border hover:bg-gov-veryLight text-gov-primary text-xs font-semibold transition-all"
                >
                  Track Existing Application
                </Link>
              </div>
            </div>

            {/* Related Services Cards */}
            {relatedServices.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-gov-textPrimary uppercase tracking-wider mb-4">
                  Related Services
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {relatedServices.map((rel) => (
                    <ServiceCard key={rel.id} service={rel} showPriorityBadge={false} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
