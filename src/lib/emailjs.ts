import emailjs from '@emailjs/browser';

/**
 * ==============================================================================
 * EMAILJS CLIENT CONFIGURATION — SAMEER XEROX NOTIFICATIONS
 * ==============================================================================
 * Reads public client credentials securely through Vite environment variables.
 */
const EMAILJS_PUBLIC_KEY = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'vhp5FHSbaeYK6KsHK').trim();
const EMAILJS_SERVICE_ID = (import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_0y3v3wc').trim();
const EMAILJS_TEMPLATE_ID = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_yrkmvaz').trim();

// Safely initialize EmailJS with client public key if available
if (EMAILJS_PUBLIC_KEY) {
  try {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY
    });
  } catch {
    // Non-fatal init fallback
  }
}

export interface EmailNotificationPayload {
  requestId: string;
  serviceName: string;
  customerName: string;
  customerMobile: string;
  customerEmail?: string;
  requestStatus?: string;
  submittedAt: string;
  documentsCount?: number;
  additionalNotes?: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

/**
 * Checks whether EmailJS environment variables or defaults are configured.
 */
export const isEmailJsConfigured = (): boolean => {
  return Boolean(EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID);
};

/**
 * Dispatches a new service request notification email to the Sameer Xerox shop desk.
 * 
 * SECURITY COMPLIANCE:
 * - Uploaded private identity documents are NEVER sent as email attachments.
 * - Private storage paths/URLs are NEVER exposed in the email.
 * - EmailJS failure is non-fatal: the backend request remains intact.
 */
export const sendNewRequestEmail = async (payload: EmailNotificationPayload): Promise<EmailResult> => {
  if (!isEmailJsConfigured()) {
    return {
      success: false,
      error: 'EmailJS credentials are not configured in environment variables or defaults.'
    };
  }

  // Format a clean, human-readable summary for templates using {{message}}
  const fullSummary = 
`NEW APPLICATION RECEIVED — SAMEER XEROX
========================================
Token / Request ID : ${payload.requestId}
Service Applied    : ${payload.serviceName}
Customer Name      : ${payload.customerName}
Mobile Number      : +91 ${payload.customerMobile}
Email Address      : ${payload.customerEmail || 'Not provided'}
Date & Time        : ${payload.submittedAt}
Documents Attached : ${payload.documentsCount || 0} file(s)
Additional Notes   : ${payload.additionalNotes || 'None'}
========================================
Review this application on the Operator Desk at Sameer Xerox.`;

  // Map all standard and alias parameters to match any EmailJS template configuration
  const validEmail = payload.customerEmail && payload.customerEmail.includes('@') 
    ? payload.customerEmail.trim() 
    : '';

  const templateParams: Record<string, string> = {
    // 1. Direct IDs & Service
    request_id: payload.requestId,
    token: payload.requestId,
    id: payload.requestId,
    service_name: payload.serviceName,
    service: payload.serviceName,

    // 2. Customer Information (compatible with standard & custom EmailJS templates)
    customer_name: payload.customerName,
    name: payload.customerName,
    from_name: payload.customerName,
    to_name: 'Sameer Xerox Admin',

    // 3. Contact Details
    customer_mobile: payload.customerMobile,
    mobile: payload.customerMobile,
    phone: payload.customerMobile,
    customer_email: validEmail,
    email: validEmail,
    from_email: validEmail,
    reply_to: validEmail,

    // 4. Status, Time & Counts
    request_status: payload.requestStatus || 'Pending',
    status: payload.requestStatus || 'Pending',
    submitted_at: payload.submittedAt,
    date: payload.submittedAt,
    time: payload.submittedAt,
    documents_count: String(payload.documentsCount || 0),
    files_count: String(payload.documentsCount || 0),
    additional_notes: payload.additionalNotes || 'None',
    notes: payload.additionalNotes || 'None',
    details: payload.additionalNotes || 'None',

    // 5. Subject & Formatted Message body (critical for default EmailJS templates)
    subject: `New Service Request: ${payload.serviceName} (${payload.requestId}) - ${payload.customerName}`,
    message: fullSummary
  };

  try {
    console.log('[EmailJS] Dispatching email notification for:', payload.requestId);

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('[EmailJS] Dispatch successful:', response.status, response.text);

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: `EmailJS responded with status ${response.status}` };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown email dispatch error';
    console.error('[EmailJS] Dispatch failed:', message, err);
    return { success: false, error: message };
  }
};
