import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Bookmark,
  Bell,
  User,
  Download,
  PhoneCall,
  FolderLock,
  Search,
  ShieldCheck,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { servicesData } from '../data/services';
import {
  getAllRequests,
  updateRequestStatus
} from '../services/serviceRequestService';
import type {
  RequestStatus,
  ServiceRequestRecord
} from '../services/serviceRequestService';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'operatorDesk' | 'services' | 'documents' | 'notifications' | 'profile'>('applications');
  
  // Real requests state from serviceRequestService
  const [requests, setRequests] = useState<ServiceRequestRecord[]>(() => getAllRequests());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const citizenProfile = {
    name: "Sameer Citizen",
    phone: "+91 86258 20706",
    email: "desk@sameerxerox.in",
    city: "Ashti, Beed District",
    memberSince: "July 2026"
  };

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

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Processing':
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Documents Required':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    updateRequestStatus(id, newStatus);
    setRequests(getAllRequests());
  };

  // Filtered requests for Operator Desk
  const filteredRequests = requests.filter(r => {
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    if (!matchesStatus) return false;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;

    return (
      r.id.toLowerCase().includes(q) ||
      r.serviceName.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.mobile.includes(q)
    );
  });

  return (
    <div className="w-full bg-gov-bg min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-white border-b border-gov-borderCard py-8 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-gov-primary uppercase tracking-wider">
              Citizen Digital Hub &amp; Operator Desk
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-textPrimary mt-1">
              Welcome, {citizenProfile.name}
            </h1>
            <p className="text-xs sm:text-sm text-gov-textSecondary mt-0.5">
              Track your service requests, download certificates &amp; manage online applications at Sameer Xerox.
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
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-3">
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
                  {requests.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('operatorDesk')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  activeTab === 'operatorDesk'
                    ? 'bg-gov-primary text-white shadow-sm'
                    : 'text-gov-textPrimary hover:bg-gov-light hover:text-gov-primary'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4" /> Operator Desk
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold">
                  Admin
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
              <div className="font-bold text-gov-primary flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>SAMEER XEROX FACILITATION</span>
              </div>
              <p className="text-gov-textSecondary text-[11.5px] leading-relaxed">
                Ashti Center Desk: Online forms, color xerox, lamination, and Aadhaar-linked digital services.
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
                    Active &amp; Past Applications ({requests.length})
                  </h2>
                  <Link
                    to="/services"
                    className="text-xs font-bold text-gov-primary hover:underline"
                  >
                    + New Service Request
                  </Link>
                </div>

                <div className="divide-y divide-gray-100">
                  {requests.map((app) => (
                    <div key={app.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-gov-primary">
                            {app.id}
                          </span>
                          <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(app.status)}`}>
                            {app.status}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {app.documents.length} doc(s)
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-gov-textPrimary mt-1">
                          {app.serviceName}
                        </h4>
                        <div className="text-xs text-gov-textSecondary mt-0.5">
                          Applicant: <strong>{app.customerName}</strong> • Mobile: +91 {app.mobile} • {new Date(app.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/track-application?ref=${app.id}`}
                          className="px-3.5 py-1.5 rounded-lg border border-gov-border hover:bg-gov-veryLight text-gov-primary text-xs font-bold inline-flex items-center gap-1.5 transition-all"
                        >
                          <span>Track Status</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: OPERATOR DESK / ADMIN VIEW */}
            {activeTab === 'operatorDesk' && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-6 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                        Sameer Xerox Internal Operator Desk
                      </span>
                      <h2 className="text-xl font-extrabold text-gov-textPrimary mt-1">
                        Service Request Management
                      </h2>
                    </div>
                    <span className="text-xs text-gray-500">
                      Total Requests: <strong>{requests.length}</strong>
                    </span>
                  </div>
                  <p className="text-xs text-gov-textSecondary mt-1">
                    Manage incoming citizen requests, review documents, and update status workflow in real-time.
                  </p>
                </div>

                {/* Search & Status Filter Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                  <div className="sm:col-span-8 relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by Request ID, Customer Name, Mobile, Service..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gov-primary bg-slate-50 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gov-primary bg-slate-50 font-semibold text-gray-700"
                    >
                      <option value="All">All Statuses ({requests.length})</option>
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Requests Table / Cards */}
                <div className="space-y-3 pt-2">
                  {filteredRequests.length === 0 ? (
                    <div className="text-center py-12 text-xs text-gray-500 bg-slate-50 rounded-xl border border-dashed border-gray-200">
                      No service requests match the current filters.
                    </div>
                  ) : (
                    filteredRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-4 rounded-xl border border-gov-borderCard bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-gov-primary">
                              {req.id}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(req.status)}`}>
                              {req.status}
                            </span>
                            <span className="text-[11px] text-gray-500">
                              {new Date(req.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="text-sm font-bold text-gov-textPrimary">
                            {req.serviceName}
                          </div>

                          <div className="text-xs text-gray-600 flex items-center gap-3 flex-wrap">
                            <span>Applicant: <strong>{req.customerName}</strong></span>
                            <span>Mobile: <strong>+91 {req.mobile}</strong></span>
                            {req.email && <span>Email: {req.email}</span>}
                          </div>

                          {/* Documents attached */}
                          <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] text-gray-500 font-semibold">Docs:</span>
                            {req.documents.map((d, idx) => (
                              <span
                                key={idx}
                                className="inline-block text-[10.5px] px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-700"
                              >
                                📄 {d.documentName}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Status Update Control */}
                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={req.status}
                            onChange={(e) => handleStatusChange(req.id, e.target.value as RequestStatus)}
                            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 bg-white text-gray-800 shadow-xs focus:ring-1 focus:ring-gov-primary outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Rejected">Rejected</option>
                          </select>

                          <Link
                            to={`/track-application?ref=${req.id}`}
                            className="p-1.5 rounded-lg border border-gray-200 hover:bg-white text-gov-primary"
                            title="View Public Timeline"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: SAVED SERVICES */}
            {activeTab === 'services' && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-6 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-gov-textPrimary">
                  Frequently Used &amp; Saved Services
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedServices.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 rounded-xl border border-gov-borderCard flex items-start justify-between gap-3"
                    >
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gov-light text-gov-primary">
                          {service.category}
                        </span>
                        <h4 className="text-sm font-bold text-gov-textPrimary mt-1.5">
                          {service.name}
                        </h4>
                        <p className="text-xs text-gov-textSecondary mt-0.5 line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                      <Link
                        to={`/services/${service.slug}`}
                        className="p-2 rounded-lg bg-gov-light text-gov-primary hover:bg-gov-primary hover:text-white transition-colors shrink-0 mt-2"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: STORED DOCUMENTS & CERTIFICATES */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-6 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-gov-textPrimary">
                  Official Issued Certificates &amp; Scans
                </h2>
                <div className="divide-y divide-gray-100">
                  {citizenDocuments.map((doc, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-gov-textPrimary">
                          {doc.name}
                        </h4>
                        <div className="text-xs text-gov-textSecondary mt-0.5">
                          {doc.type} • {doc.size} • Verified on {doc.date}
                        </div>
                      </div>
                      <a
                        href={`tel:+918625820706`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gov-light text-gov-primary hover:bg-gov-primary hover:text-white text-xs font-bold transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Request e-Copy</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-gov-textPrimary">
                  Center Alerts &amp; Application Reminders
                </h2>
                <div className="space-y-3">
                  {notifications.map((n, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-gray-100">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-gov-textPrimary">
                          {n.title}
                        </h4>
                        <span className="text-[11px] text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-gov-textSecondary mt-1">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: CITIZEN PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-gov-borderCard p-6 shadow-sm space-y-6">
                <h2 className="text-lg font-bold text-gov-textPrimary">
                  Citizen Profile &amp; Jurisdiction Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-100">
                    <span className="text-gray-400 block text-xs">Citizen Name</span>
                    <span className="font-bold text-gov-textPrimary text-sm mt-0.5 block">{citizenProfile.name}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-100">
                    <span className="text-gray-400 block text-xs">Primary Contact</span>
                    <span className="font-bold text-gov-textPrimary text-sm mt-0.5 block">{citizenProfile.phone}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-100">
                    <span className="text-gray-400 block text-xs">Registered Email</span>
                    <span className="font-bold text-gov-textPrimary text-sm mt-0.5 block">{citizenProfile.email}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-gray-100">
                    <span className="text-gray-400 block text-xs">Center Location</span>
                    <span className="font-bold text-gov-textPrimary text-sm mt-0.5 block">{citizenProfile.city}</span>
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
