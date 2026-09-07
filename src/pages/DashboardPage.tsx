import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Bookmark,
  Bell,
  User,
  Download,
  PhoneCall,
  FolderLock
} from 'lucide-react';
import { servicesData } from '../data/services';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'services' | 'documents' | 'notifications' | 'profile'>('applications');

  const citizenProfile = {
    name: "Sameer Citizen",
    phone: "+91 98234 56789",
    email: "citizen@sameerxerox.local",
    city: "CSC Jurisdiction",
    memberSince: "July 2026"
  };

  const applicationsList = [
    {
      id: "SX-2026-8812",
      service: "PAN Card Application",
      date: "03 Sept 2026",
      status: "In Processing",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
      id: "SX-2026-1044",
      service: "Shop Act (Gumasta) License",
      date: "01 Sept 2026",
      status: "Approved & Completed",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "SX-2026-0419",
      service: "Food License (FSSAI) – Basic",
      date: "18 Aug 2026",
      status: "Completed",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200"
    }
  ];

  const savedServices = [
    servicesData[0], // PAN Card
    servicesData[5], // Bank Account Opening
    servicesData[7], // Rent Agreement
    servicesData[14] // Food License Basic
  ];

  const citizenDocuments = [
    { name: "PAN Card e-Copy.pdf", type: "Identity", size: "340 KB", date: "04 Sept 2026" },
    { name: "Shop Act License Cert.pdf", type: "Business", size: "520 KB", date: "01 Sept 2026" },
    { name: "FSSAI Registration Cert.pdf", type: "Food License", size: "480 KB", date: "18 Aug 2026" }
  ];

  const notifications = [
    { title: "PAN Card Application Update", desc: "Your Form 49A has cleared verification and is under NSDL processing.", time: "1 day ago" },
    { title: "Gumasta Certificate Ready", desc: "Your Shop Act license is ready for physical collection at Sameer Xerox.", time: "4 days ago" },
    { title: "Jeevan Pramaan Annual Reminder", desc: "Life certificates renewal period starts next month. Plan early.", time: "2 weeks ago" }
  ];

  return (
    <div className="w-full bg-gov-bg min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-white border-b border-gov-borderCard py-8 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-gov-primary uppercase tracking-wider">
              Citizen Digital Hub
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-textPrimary mt-1">
              Welcome, {citizenProfile.name}
            </h1>
            <p className="text-xs sm:text-sm text-gov-textSecondary mt-0.5">
              Track your service requests, download certificates &amp; manage your applications at Sameer Xerox.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+918625820706"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gov-light text-gov-primary hover:bg-gov-primary hover:text-white text-xs font-bold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contact Operator</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Navigation Sidebar (Sameer Xerox Portal Style) */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl border border-gov-borderCard p-3 shadow-sm space-y-1">
              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'applications'
                    ? 'bg-gov-primary text-white shadow-sm'
                    : 'text-gov-textPrimary hover:bg-gov-light hover:text-gov-primary'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" /> My Applications
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 text-current">
                  {applicationsList.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'services'
                    ? 'bg-gov-primary text-white shadow-sm'
                    : 'text-gov-textPrimary hover:bg-gov-light hover:text-gov-primary'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Bookmark className="w-4 h-4" /> Saved Services
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 text-current">
                  {savedServices.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('documents')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'documents'
                    ? 'bg-gov-primary text-white shadow-sm'
                    : 'text-gov-textPrimary hover:bg-gov-light hover:text-gov-primary'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <FolderLock className="w-4 h-4" /> Stored Certificates
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 text-current">
                  {citizenDocuments.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-gov-primary text-white shadow-sm'
                    : 'text-gov-textPrimary hover:bg-gov-light hover:text-gov-primary'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4" /> Notifications
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 text-current">
                  {notifications.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-gov-primary text-white shadow-sm'
                    : 'text-gov-textPrimary hover:bg-gov-light hover:text-gov-primary'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <User className="w-4 h-4" /> Citizen Profile
                </span>
              </button>
            </div>

            {/* Quick Center Card */}
            <div className="p-4 rounded-2xl bg-gov-light border border-blue-100 text-xs text-gov-textPrimary space-y-2">
              <div className="font-bold text-gov-primary">SAMEER XEROX FACILITATION</div>
              <p className="text-gov-textSecondary text-[11px]">
                Need additional document photocopies, color printing or lamination? Visit our branch counter directly.
              </p>
              <div className="font-semibold text-gov-dark pt-1">
                Open Daily: 10:00 AM - 6:00 PM
              </div>
            </div>
          </div>

          {/* Right Main Panel */}
          <div className="lg:col-span-9 space-y-6">
            {/* TAB 1: MY APPLICATIONS */}
            {activeTab === 'applications' && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gov-textPrimary">
                    Active &amp; Past Applications ({applicationsList.length})
                  </h2>
                  <Link
                    to="/services"
                    className="text-xs font-bold text-gov-primary hover:underline"
                  >
                    + New Service Request
                  </Link>
                </div>

                <div className="divide-y divide-gray-100">
                  {applicationsList.map((app) => (
                    <div key={app.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gov-primary">
                            {app.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${app.badgeClass}`}>
                            {app.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-gov-textPrimary mt-1">
                          {app.service}
                        </h4>
                        <div className="text-xs text-gov-textSecondary mt-0.5">
                          Submitted on {app.date}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/track-application`}
                          className="px-3 py-1.5 rounded-lg border border-gov-border hover:bg-gov-veryLight text-gov-primary text-xs font-semibold"
                        >
                          View Progress
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: SAVED SERVICES */}
            {activeTab === 'services' && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-6 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-gov-textPrimary">
                  Bookmarked Digital Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedServices.map((svc) => (
                    <div
                      key={svc.id}
                      className="p-4 rounded-xl border border-gov-border flex items-center justify-between gap-3 hover:border-gov-primary transition-colors"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-gov-textPrimary">{svc.name}</h4>
                        <div className="text-xs text-gov-primary mt-0.5">{svc.category}</div>
                      </div>
                      <Link
                        to={`/services/${svc.slug}`}
                        className="px-3 py-1.5 bg-gov-light text-gov-primary hover:bg-gov-primary hover:text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Apply
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: DOCUMENTS */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gov-textPrimary">
                    Issued Certificates &amp; Digital Copies
                  </h2>
                </div>

                <div className="space-y-3">
                  {citizenDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-gov-veryLight border border-gov-border flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gov-light text-gov-primary flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-gov-textPrimary">{doc.name}</div>
                          <div className="text-[11px] text-gov-textSecondary">
                            {doc.type} • {doc.size} • Issued {doc.date}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`Downloading ${doc.name}`)}
                        className="p-2 rounded-lg bg-white border border-gov-border hover:text-gov-primary hover:border-gov-primary transition-colors text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-gov-textPrimary">
                  Official Alerts &amp; Updates
                </h2>
                <div className="space-y-3">
                  {notifications.map((n, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gov-border hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs sm:text-sm font-bold text-gov-textPrimary">{n.title}</h4>
                        <span className="text-[10px] text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-gov-textSecondary">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-6 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-gov-textPrimary">
                  Citizen Facilitation Profile
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-gray-500 text-[11px] block">Full Name</span>
                    <span className="font-bold text-gov-textPrimary">{citizenProfile.name}</span>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-gray-500 text-[11px] block">Mobile Number</span>
                    <span className="font-bold text-gov-textPrimary">{citizenProfile.phone}</span>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-gray-500 text-[11px] block">Email Address</span>
                    <span className="font-bold text-gov-textPrimary">{citizenProfile.email}</span>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-gray-500 text-[11px] block">Registration Date</span>
                    <span className="font-bold text-gov-textPrimary">{citizenProfile.memberSince}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
