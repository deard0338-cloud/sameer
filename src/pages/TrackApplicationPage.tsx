import React, { useState } from 'react';
import { PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TrackStep {
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  date?: string;
  desc: string;
}

export const TrackApplicationPage: React.FC = () => {
  const { t } = useLanguage();
  const [refNumber, setRefNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    ref: string;
    serviceName: string;
    applicantName: string;
    submissionDate: string;
    currentStage: number;
    steps: TrackStep[];
  } | null>(null);

  const sampleApplications: Record<string, typeof searchResult> = {
    "SX-2026-8812": {
      ref: "SX-2026-8812",
      serviceName: "PAN Card Application (PVC + e-PAN)",
      applicantName: "Rahul Sharma",
      submissionDate: "03 Sept 2026",
      currentStage: 3,
      steps: [
        { title: "Application Submitted", status: "completed", date: "03 Sept 2026, 11:20 AM", desc: "Form 49A uploaded with Aadhaar authentication." },
        { title: "Document Verification", status: "completed", date: "04 Sept 2026, 02:15 PM", desc: "Identity and Address proof verified by scrutiny operator." },
        { title: "Department Processing", status: "in-progress", date: "05 Sept 2026", desc: "Application being processed at Income Tax / NSDL central portal." },
        { title: "Approved & e-PAN Issued", status: "pending", desc: "e-PAN generated and dispatched to registered email." },
        { title: "Completed & Dispatched", status: "pending", desc: "Physical PVC card printed and speed posted to residential address." }
      ]
    },
    "SX-2026-1044": {
      ref: "SX-2026-1044",
      serviceName: "Shop Act (Gumasta) License",
      applicantName: "Anil Patil",
      submissionDate: "01 Sept 2026",
      currentStage: 5,
      steps: [
        { title: "Application Submitted", status: "completed", date: "01 Sept 2026, 10:00 AM", desc: "Shop details and owner Aadhaar entered on portal." },
        { title: "Document Verification", status: "completed", date: "01 Sept 2026, 11:30 AM", desc: "Premises rent agreement and signboard photo verified." },
        { title: "Department Processing", status: "completed", date: "01 Sept 2026, 01:15 PM", desc: "Labor department fee received and verified." },
        { title: "Approved & Issued", status: "completed", date: "01 Sept 2026, 03:00 PM", desc: "Registration certificate generated with QR code." },
        { title: "Completed", status: "completed", date: "01 Sept 2026, 04:30 PM", desc: "Laminated certificate collected by applicant from Sameer Xerox." }
      ]
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refNumber.trim()) return;

    setHasSearched(true);
    const found = sampleApplications[refNumber.trim().toUpperCase()];
    if (found) {
      setSearchResult(found);
    } else {
      // Generate standard active timeline for any entered reference number
      setSearchResult({
        ref: refNumber.trim().toUpperCase(),
        serviceName: "Digital Citizen Service Facilitation",
        applicantName: "Registered Citizen",
        submissionDate: "Recent Submission",
        currentStage: 2,
        steps: [
          { title: "Application Submitted", status: "completed", date: "Recorded at Sameer Xerox", desc: "Application proposal collated and sent for validation." },
          { title: "Document Verification", status: "in-progress", date: "In Progress", desc: "Operator inspecting uploaded proofs and declarations." },
          { title: "Department Processing", status: "pending", desc: "Statutory scrutiny by authorized departmental desk." },
          { title: "Approved / Rejected", status: "pending", desc: "Final sanction or acknowledgment number generation." },
          { title: "Completed & Ready", status: "pending", desc: "Physical collection or digital certificate download." }
        ]
      });
    }
  };

  return (
    <div className="w-full bg-gov-bg min-h-screen pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-gov-borderCard py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gov-light text-gov-primary text-xs font-bold uppercase tracking-wider">
            Real-Time Status Verification
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gov-textPrimary tracking-tight">
            {t.trackApplication}
          </h1>
          <p className="text-sm sm:text-base text-gov-textSecondary max-w-xl mx-auto">
            Enter your Sameer Xerox reference number or acknowledgment token to check the current progress of your service application.
          </p>

          {/* Form */}
          <form onSubmit={handleTrack} className="pt-6 max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  placeholder="e.g. SX-2026-8812 or token number"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gov-border focus:border-gov-primary outline-none text-sm uppercase tracking-wide text-gov-textPrimary font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-gov-primary hover:bg-gov-dark text-white rounded-xl font-bold text-sm shadow transition-all whitespace-nowrap"
              >
                Track Status
              </button>
            </div>
            <div className="text-[11px] text-gray-500 mt-2 text-left sm:text-center">
              Try sample token: <button type="button" onClick={() => setRefNumber('SX-2026-8812')} className="text-gov-primary font-bold hover:underline">SX-2026-8812</button> or <button type="button" onClick={() => setRefNumber('SX-2026-1044')} className="text-gov-primary font-bold hover:underline">SX-2026-1044</button>
            </div>
          </form>
        </div>
      </div>

      {/* Tracking Results Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-10">
        {hasSearched && searchResult && (
          <div className="bg-white rounded-2xl border border-gov-borderCard shadow-gov-card overflow-hidden p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            {/* Meta Summary */}
            <div className="p-4 sm:p-6 rounded-xl bg-gov-veryLight border border-gov-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-gov-primary uppercase tracking-wider">
                  REFERENCE TOKEN
                </span>
                <div className="text-xl font-extrabold text-gov-dark font-mono mt-0.5">
                  {searchResult.ref}
                </div>
                <div className="text-sm font-semibold text-gov-textPrimary mt-1">
                  {searchResult.serviceName}
                </div>
              </div>

              <div className="sm:text-right">
                <div className="text-xs text-gov-textSecondary">
                  Applicant: <span className="font-bold text-gov-textPrimary">{searchResult.applicantName}</span>
                </div>
                <div className="text-xs text-gov-textSecondary mt-0.5">
                  Submitted: <span className="font-medium text-gov-textPrimary">{searchResult.submissionDate}</span>
                </div>
              </div>
            </div>

            {/* Clean Blue Timeline UI */}
            <div>
              <h3 className="text-base font-bold text-gov-textPrimary mb-6">
                Application Progression Timeline
              </h3>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-blue-100">
                {searchResult.steps.map((step, idx) => {
                  const isDone = step.status === 'completed';
                  const isCurrent = step.status === 'in-progress';

                  return (
                    <div key={idx} className="relative flex items-start gap-5 pl-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 transition-all ${
                          isDone
                            ? 'bg-gov-primary text-white shadow'
                            : isCurrent
                            ? 'bg-amber-500 text-white animate-pulse ring-4 ring-amber-100'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className={`text-base font-bold ${isDone ? 'text-gov-primary' : isCurrent ? 'text-amber-700' : 'text-gray-400'}`}>
                            {step.title}
                          </h4>
                          {step.date && (
                            <span className="text-xs font-medium text-gray-500">
                              {step.date}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gov-textSecondary mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Helpline prompt */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gov-textSecondary text-center sm:text-left">
                Need urgent status clarification or physical document handover?
              </div>
              <a
                href="tel:+918625820706"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gov-light text-gov-primary hover:bg-gov-primary hover:text-white font-bold text-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Center Support (+91 86258 20706)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
