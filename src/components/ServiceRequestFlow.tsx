import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  UploadCloud,
  FileCheck,
  CheckCircle2,
  Trash2,
  RefreshCw,
  AlertCircle,
  Copy,
  Check,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Info,
  Clock
} from 'lucide-react';
import type { ServiceItem } from '../data/services';
import { getServiceRequestConfig } from '../data/serviceRequestsConfig';
import type { DocumentRequirement, ServiceRequestConfig } from '../data/serviceRequestsConfig';
import {
  submitServiceRequest,
  isValidIndianMobile,
  isValidEmail
} from '../services/serviceRequestService';
import type { ServiceRequestRecord } from '../services/serviceRequestService';

interface ServiceRequestFlowProps {
  service: ServiceItem;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const ServiceRequestFlow: React.FC<ServiceRequestFlowProps> = ({ service }) => {
  const config: ServiceRequestConfig = getServiceRequestConfig(service.slug) || {
    serviceId: service.id,
    serviceName: service.name,
    slug: service.slug,
    category: service.category,
    department: service.department,
    requiredDocuments: (service.requiredDocuments || []).map((d, i) => ({
      id: `doc-${i}`,
      name: d,
      required: true,
      allowedTypes: ['pdf', 'jpg', 'jpeg', 'png'],
      maxSizeMB: 5
    })),
    optionalDocuments: [],
    customerFields: [
      { id: 'fullName', label: 'Full Name', type: 'text', required: true },
      { id: 'mobile', label: 'Mobile Number', type: 'tel', required: true }
    ]
  };

  // Uploaded files state: docRequirementId -> File
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const [dragOverDocId, setDragOverDocId] = useState<string | null>(null);

  // Customer form state
  const [customerData, setCustomerData] = useState<Record<string, string>>({
    fullName: '',
    mobile: '',
    email: '',
    additionalNotes: ''
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Workflow state
  const [step, setStep] = useState<'form' | 'summary' | 'submitting' | 'success'>('form');
  const [submittedRecord, setSubmittedRecord] = useState<ServiceRequestRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailNotice, setEmailNotice] = useState<{ sent: boolean; message: string } | null>(null);

  // Hidden file input refs
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Validate single file selection
  const handleFileSelect = (doc: DocumentRequirement, file: File | null) => {
    if (!file) return;

    // Check size (default 5 MB)
    const maxSizeBytes = doc.maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setFileErrors(prev => ({
        ...prev,
        [doc.id]: `File is too large (${formatFileSize(file.size)}). Maximum allowed size is ${doc.maxSizeMB} MB.`
      }));
      return;
    }

    // Check extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExts = doc.allowedTypes.map(t => t.toLowerCase());
    if (!ext || !validExts.includes(ext as any)) {
      setFileErrors(prev => ({
        ...prev,
        [doc.id]: `Invalid file format (.${ext || 'unknown'}). Only PDF, JPG, JPEG, and PNG files are allowed.`
      }));
      return;
    }

    // Valid file!
    setFileErrors(prev => {
      const copy = { ...prev };
      delete copy[doc.id];
      return copy;
    });

    setUploadedFiles(prev => ({
      ...prev,
      [doc.id]: file
    }));
  };

  const handleRemoveFile = (docId: string) => {
    setUploadedFiles(prev => {
      const copy = { ...prev };
      delete copy[docId];
      return copy;
    });
    setFileErrors(prev => {
      const copy = { ...prev };
      delete copy[docId];
      return copy;
    });
    if (fileInputRefs.current[docId]) {
      fileInputRefs.current[docId]!.value = '';
    }
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [fieldId]: value }));
    if (fieldErrors[fieldId]) {
      setFieldErrors(prev => {
        const copy = { ...prev };
        delete copy[fieldId];
        return copy;
      });
    }
  };

  // Step 1 validation: ensure required documents and mandatory fields are filled
  const handleProceedToSummary = (e: React.FormEvent) => {
    e.preventDefault();
    const newFieldErrors: Record<string, string> = {};
    const newFileErrors: Record<string, string> = {};

    // 1. Check required customer fields
    for (const field of config.customerFields) {
      const val = (customerData[field.id] || '').trim();
      if (field.required && !val) {
        newFieldErrors[field.id] = `${field.label} is required.`;
      }
    }

    // 2. Validate mobile
    if (customerData.mobile && !isValidIndianMobile(customerData.mobile)) {
      newFieldErrors.mobile = 'Please enter a valid 10-digit Indian mobile number (e.g. 9823456789).';
    }

    // 3. Validate email if entered
    if (customerData.email && !isValidEmail(customerData.email)) {
      newFieldErrors.email = 'Please enter a valid email address.';
    }

    // 4. Check required documents
    for (const doc of config.requiredDocuments) {
      if (!uploadedFiles[doc.id]) {
        newFileErrors[doc.id] = `Please upload ${doc.name} to continue.`;
      }
    }

    if (Object.keys(newFieldErrors).length > 0 || Object.keys(newFileErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setFileErrors(newFileErrors);
      // Scroll smoothly to first error if needed
      return;
    }

    setStep('summary');
  };

  // Final submit handler
  const handleConfirmSubmit = async () => {
    if (step === 'submitting') return; // Prevent duplicate submission

    setStep('submitting');
    setSubmitError(null);

    try {
      // Gather files
      const allDocs = [...config.requiredDocuments, ...config.optionalDocuments];
      const filesPayload = Object.entries(uploadedFiles).map(([docId, file]) => {
        const req = allDocs.find(d => d.id === docId);
        return {
          requirementId: docId,
          documentName: req ? req.name : file.name,
          file
        };
      });

      // Extract custom fields (non-default fields)
      const standardKeys = ['fullName', 'mobile', 'email', 'additionalNotes'];
      const customFields: Record<string, string> = {};
      Object.entries(customerData).forEach(([k, v]) => {
        if (!standardKeys.includes(k) && v.trim()) {
          customFields[k] = v.trim();
        }
      });

      const result = await submitServiceRequest({
        serviceId: config.serviceId,
        serviceSlug: config.slug,
        serviceName: config.serviceName,
        category: config.category,
        customerName: customerData.fullName,
        mobile: customerData.mobile,
        email: customerData.email || undefined,
        customFields: Object.keys(customFields).length > 0 ? customFields : undefined,
        additionalNotes: customerData.additionalNotes || undefined,
        files: filesPayload
      });

      setSubmittedRecord(result.record);

      if (result.emailResult.success) {
        setEmailNotice({
          sent: true,
          message: 'Notification email dispatched to Sameer Xerox Gmail desk.'
        });
      } else {
        setEmailNotice({
          sent: false,
          message: `Request saved successfully.${result.emailResult.error ? ` (Email alert: ${result.emailResult.error})` : ' Email notification could not be dispatched.'}`
        });
      }

      setStep('success');
    } catch {
      setSubmitError('Something went wrong while submitting your request. Please try again.');
      setStep('summary');
    }
  };

  const handleCopyId = () => {
    if (!submittedRecord) return;
    navigator.clipboard.writeText(submittedRecord.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Render Success Screen
  if (step === 'success' && submittedRecord) {
    const whatsappMessage = encodeURIComponent(
      `Hello Sameer Xerox, I have submitted a new service request online.\n\n` +
      `Request ID: ${submittedRecord.id}\n` +
      `Service: ${submittedRecord.serviceName}\n` +
      `Customer Name: ${submittedRecord.customerName}\n` +
      `Mobile: ${submittedRecord.mobile}\n` +
      `Status: Pending Review`
    );

    return (
      <div className="bg-white rounded-2xl border border-emerald-200 shadow-lg p-6 sm:p-10 text-center relative overflow-hidden">
        {/* Top green decorative bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 to-teal-400" />

        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
          Submission Successful
        </span>

        <h3 className="text-2xl sm:text-3xl font-black text-gov-textPrimary tracking-tight">
          Request Submitted Successfully!
        </h3>

        <p className="text-xs sm:text-sm text-gov-textSecondary max-w-lg mx-auto mt-2 leading-relaxed">
          We have received your request. Our team will review the submitted information and documents.
        </p>

        {/* Backend & Email Notification Status Banner */}
        {emailNotice && (
          <div className="max-w-md mx-auto my-3">
            {emailNotice.sent ? (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Shop Alert Dispatched via EmailJS</span>
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-center gap-1.5 font-medium text-left">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{emailNotice.message}</span>
              </div>
            )}
          </div>
        )}

        {/* Unique Request ID Card */}
        <div className="max-w-md mx-auto my-5 p-5 rounded-2xl bg-slate-50 border border-gov-border shadow-xs text-left">
          <div className="flex items-center justify-between text-xs text-gov-textSecondary uppercase tracking-wider font-semibold mb-1">
            <span>Official Tracking Token</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
              Status: {submittedRecord.status}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-200 mt-2">
            <span className="text-xl sm:text-2xl font-black text-gov-primary tracking-wider tabular-nums">
              {submittedRecord.id}
            </span>
            <button
              onClick={handleCopyId}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gov-light hover:bg-gov-primary hover:text-white text-gov-primary text-xs font-bold transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-3.5 space-y-1.5 text-xs text-gov-textSecondary pt-3 border-t border-gray-100">
            <div className="flex justify-between">
              <span>Service:</span>
              <strong className="text-gov-textPrimary">{submittedRecord.serviceName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Applicant:</span>
              <strong className="text-gov-textPrimary">{submittedRecord.customerName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Mobile:</span>
              <strong className="text-gov-textPrimary">+91 {submittedRecord.mobile}</strong>
            </div>
            <div className="flex justify-between">
              <span>Attached Documents:</span>
              <strong className="text-gov-textPrimary">{submittedRecord.documents.length} File(s)</strong>
            </div>
          </div>
        </div>

        {/* Next steps notice */}
        <div className="max-w-md mx-auto p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-left text-xs text-blue-900 flex items-start gap-3 mb-6">
          <Clock className="w-4 h-4 text-gov-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Next Steps:</p>
            <p className="mt-0.5 text-blue-800 leading-relaxed">
              Our operator will inspect your uploaded documents. If any clarification or physical verification is required, we will call you on <strong>+91 {submittedRecord.mobile}</strong>.
            </p>
          </div>
        </div>

        {/* Action Buttons: [Copy Request ID], [Track Request], [Back to Services], [WhatsApp] */}
        <div className="max-w-md mx-auto flex flex-col gap-2.5">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <Link
              to={`/track-application?ref=${submittedRecord.id}`}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gov-primary hover:bg-gov-dark text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <span>Track Request</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/services"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs sm:text-sm font-bold transition-all"
            >
              <span>Back to Services</span>
            </Link>
          </div>

          <a
            href={`https://wa.me/918625820706?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Request Details on WhatsApp</span>
          </a>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => {
              setUploadedFiles({});
              setFileErrors({});
              setFieldErrors({});
              setCustomerData({ fullName: '', mobile: '', email: '', additionalNotes: '' });
              setSubmittedRecord(null);
              setStep('form');
            }}
            className="text-xs text-gov-textSecondary hover:text-gov-primary underline transition-colors"
          >
            Submit another request for this service
          </button>
        </div>
      </div>
    );
  }

  // Render Summary Review Modal / View
  if (step === 'summary' || step === 'submitting') {
    return (
      <div className="bg-white rounded-2xl border border-gov-borderCard shadow-md p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div>
            <span className="text-[11px] font-bold text-gov-primary uppercase tracking-wider">
              Step 2 of 2
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gov-textPrimary">
              Review Request Summary
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gov-light text-gov-primary">
            {config.category}
          </span>
        </div>

        {submitError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <div className="space-y-6 text-sm">
          {/* Service Info Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-gray-200">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Selected Service
            </div>
            <div className="text-lg font-bold text-gov-textPrimary">
              {config.serviceName}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              Department: {config.department}
            </div>
          </div>

          {/* Customer Details Box */}
          <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-100 pb-1">
              Applicant Details
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-gray-500">Applicant Name:</span>
                <p className="font-bold text-gov-textPrimary mt-0.5">{customerData.fullName}</p>
              </div>
              <div>
                <span className="text-gray-500">Mobile Number:</span>
                <p className="font-bold text-gov-textPrimary mt-0.5">+91 {customerData.mobile}</p>
              </div>
              {customerData.email && (
                <div>
                  <span className="text-gray-500">Email Address:</span>
                  <p className="font-bold text-gov-textPrimary mt-0.5">{customerData.email}</p>
                </div>
              )}
              {Object.entries(customerData).map(([key, val]) => {
                if (['fullName', 'mobile', 'email', 'additionalNotes'].includes(key) || !val) return null;
                const fieldDef = config.customerFields.find(f => f.id === key);
                return (
                  <div key={key}>
                    <span className="text-gray-500">{fieldDef ? fieldDef.label : key}:</span>
                    <p className="font-bold text-gov-textPrimary mt-0.5">{val}</p>
                  </div>
                );
              })}
            </div>
            {customerData.additionalNotes && (
              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 text-xs">Special Instructions:</span>
                <p className="font-medium text-gray-700 text-xs mt-0.5 bg-gray-50 p-2.5 rounded-lg">
                  {customerData.additionalNotes}
                </p>
              </div>
            )}
          </div>

          {/* Attached Documents List */}
          <div className="p-4 rounded-xl bg-white border border-gray-200">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 border-b border-gray-100 pb-1 flex items-center justify-between">
              <span>Attached Documents ({Object.keys(uploadedFiles).length})</span>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>

            <div className="space-y-2">
              {Object.entries(uploadedFiles).map(([docId, file]) => {
                const allDocs = [...config.requiredDocuments, ...config.optionalDocuments];
                const req = allDocs.find(d => d.id === docId);
                return (
                  <div
                    key={docId}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-emerald-950 block truncate">
                          {req ? req.name : file.name}
                        </span>
                        <span className="text-[11px] text-emerald-700">
                          {file.name} • {formatFileSize(file.size)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security & Privacy Notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-gov-primary shrink-0 mt-0.5" />
            <p>
              <strong>Confidentiality Assured:</strong> Your documents are shared exclusively with Sameer Xerox authorized operators for government processing. No documents are publicly stored or indexed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              disabled={step === 'submitting'}
              onClick={() => setStep('form')}
              className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs sm:text-sm font-bold transition-all disabled:opacity-50"
            >
              ← Edit Details
            </button>

            <button
              type="button"
              disabled={step === 'submitting'}
              onClick={handleConfirmSubmit}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gov-primary hover:bg-gov-dark text-white text-xs sm:text-sm font-bold shadow-md transition-all disabled:opacity-60"
            >
              {step === 'submitting' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Submitting Request...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm &amp; Submit Request</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default Step: Document Upload & Information Entry
  return (
    <div id="service-request-section" className="bg-white rounded-2xl border border-gov-borderCard shadow-sm p-6 sm:p-8">
      {/* Header */}
      <div className="border-b border-gray-100 pb-5 mb-8">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-gov-light text-gov-primary">
            Online Submission Portal
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Encrypted &amp; Secure
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-gov-textPrimary tracking-tight">
          Apply &amp; Submit Documents for {config.serviceName}
        </h2>
        <p className="text-xs sm:text-sm text-gov-textSecondary mt-1 leading-relaxed">
          Upload required documentation for Sameer Xerox center verification. Once verified, our operator will process your application promptly.
        </p>
      </div>

      <form onSubmit={handleProceedToSummary} className="space-y-8">
        {/* SECTION 1: REQUIRED DOCUMENTS */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gov-textPrimary flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-gov-primary" />
              <span>Required Documents</span>
              <span className="text-red-500 font-bold text-xs">*</span>
            </h3>
            <span className="text-[11px] text-gray-500">
              PDF, JPG, PNG • Max 5 MB each
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.requiredDocuments.map((doc) => {
              const file = uploadedFiles[doc.id];
              const error = fileErrors[doc.id];
              const isDragOver = dragOverDocId === doc.id;

              return (
                <div
                  key={doc.id}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between ${
                    file
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : error
                      ? 'border-red-300 bg-red-50/30'
                      : isDragOver
                      ? 'border-gov-primary bg-blue-50/50'
                      : 'border-dashed border-gray-300 bg-slate-50/60 hover:border-gray-400 hover:bg-slate-50'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverDocId(doc.id);
                  }}
                  onDragLeave={() => setDragOverDocId(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverDocId(null);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileSelect(doc, e.dataTransfer.files[0]);
                    }
                  }}
                >
                  <div>
                    {/* Header with Document Name & Status */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gov-textPrimary leading-snug">
                          {doc.name}
                        </h4>
                        <span className="text-[10.5px] text-gray-500">
                          {doc.required ? 'Mandatory document' : 'Optional document'}
                        </span>
                      </div>
                      {file ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Selected
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 shrink-0">
                          Required *
                        </span>
                      )}
                    </div>

                    {/* Active File State */}
                    {file ? (
                      <div className="my-2 p-2.5 bg-white rounded-lg border border-emerald-200 flex items-center justify-between gap-2">
                        <div className="truncate text-xs">
                          <p className="font-semibold text-gray-800 truncate">{file.name}</p>
                          <p className="text-[11px] text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[doc.id]?.click()}
                            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gov-primary transition-colors"
                            title="Replace File"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(doc.id)}
                            className="p-1.5 rounded-md hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                            title="Remove File"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Dropzone prompt */
                      <div
                        onClick={() => fileInputRefs.current[doc.id]?.click()}
                        className="my-2 py-5 px-3 text-center cursor-pointer rounded-lg border border-transparent hover:bg-white/80 transition-all"
                      >
                        <UploadCloud className="w-7 h-7 text-gov-primary/70 mx-auto mb-1.5" />
                        <span className="text-xs font-bold text-gov-primary block">
                          Click to browse or drop file here
                        </span>
                        <span className="text-[10px] text-gray-400 mt-0.5 block">
                          PDF, JPG, PNG (up to {doc.maxSizeMB} MB)
                        </span>
                      </div>
                    )}

                    {/* Hidden input */}
                    <input
                      ref={el => { fileInputRefs.current[doc.id] = el; }}
                      type="file"
                      id={`file-${doc.id}`}
                      accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileSelect(doc, e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </div>

                  {/* Error display */}
                  {error && (
                    <div className="mt-2 text-[11px] text-red-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: OPTIONAL DOCUMENTS (IF ANY) */}
        {config.optionalDocuments.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gov-textPrimary flex items-center gap-2">
                <span>Optional Supporting Documents</span>
                <span className="text-gray-400 text-xs font-normal">(Optional)</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.optionalDocuments.map((doc) => {
                const file = uploadedFiles[doc.id];
                const error = fileErrors[doc.id];

                return (
                  <div
                    key={doc.id}
                    className={`p-4 rounded-xl border transition-all ${
                      file ? 'border-emerald-300 bg-emerald-50/40' : 'border-gray-200 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gov-textPrimary">
                        {doc.name}
                      </span>
                      <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                        Optional
                      </span>
                    </div>

                    {file ? (
                      <div className="p-2 bg-white rounded border border-gray-200 flex items-center justify-between text-xs">
                        <span className="truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(doc.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRefs.current[doc.id]?.click()}
                        className="py-3 text-center cursor-pointer rounded border border-dashed border-gray-300 hover:bg-white text-xs text-gray-500 font-medium"
                      >
                        + Add Optional Document
                      </div>
                    )}

                    <input
                      ref={el => { fileInputRefs.current[doc.id] = el; }}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileSelect(doc, e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                    {error && (
                      <div className="mt-1 text-[11px] text-red-600">{error}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 3: APPLICANT INFORMATION */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-base font-bold text-gov-textPrimary mb-4 flex items-center gap-2">
            <span>Applicant Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.customerFields.map((field) => {
              const error = fieldErrors[field.id];
              const isTextarea = field.type === 'textarea';

              return (
                <div key={field.id} className={isTextarea ? 'sm:col-span-2' : ''}>
                  <label
                    htmlFor={field.id}
                    className="block text-xs font-bold text-gov-textPrimary mb-1"
                  >
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {isTextarea ? (
                    <textarea
                      id={field.id}
                      rows={3}
                      value={customerData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full rounded-xl p-3 text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-gov-primary ${
                        error ? 'border-red-400 bg-red-50/20' : 'border-gray-200 bg-white'
                      }`}
                    />
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      value={customerData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-gov-primary ${
                        error ? 'border-red-400 bg-red-50/20' : 'border-gray-200 bg-white'
                      }`}
                    />
                  )}

                  {error ? (
                    <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{error}</span>
                    </p>
                  ) : field.helperText ? (
                    <p className="text-[10.5px] text-gray-400 mt-1">{field.helperText}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Action Bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <Info className="w-4 h-4 text-gov-primary shrink-0" />
            <span>You will be able to review all details in the summary before final dispatch.</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gov-primary hover:bg-gov-dark text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
          >
            <span>Review Request Summary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
