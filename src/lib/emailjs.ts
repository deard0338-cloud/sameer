import emailjs from '@emailjs/browser';

/**
 * ==============================================================================
 * EMAILJS CLIENT CONFIGURATION — SAMEER XEROX NOTIFICATIONS
 * ==============================================================================
 * Reads public client credentials securely through Vite environment variables.
 */
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() || '';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() || '';

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
 * Checks whether EmailJS environment variables are configured.
 */
export const isEmailJsConfigured = (): boolean => {
  return Boolean(EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID);
};

/**
 * Dispatches a new service request notification email to the Sameer Xerox shop desk.
 * 
 * SECURITY COMPLIANCE (Step 4):
 * - Uploaded private identity documents are NEVER sent as email attachments.
 * - Private storage paths/URLs are NEVER exposed in the email.
 * - EmailJS failure is non-fatal: the backend request remains intact.
 */
export const sendNewRequestEmail = async (payload: EmailNotificationPayload): Promise<EmailResult> => {
  if (!isEmailJsConfigured()) {
    return {
      success: false,
      error: 'EmailJS credentials are not configured in environment variables.'
    };
  }

  // Map parameters to match EmailJS template configuration
  const templateParams: Record<string, string> = {
    request_id: payload.requestId,
    service_name: payload.serviceName,
    customer_name: payload.customerName,
    customer_mobile: payload.customerMobile,
    customer_email: payload.customerEmail || 'Not provided',
    request_status: payload.requestStatus || 'Pending',
    submitted_at: payload.submittedAt,
    documents_count: String(payload.documentsCount || 0),
    additional_notes: payload.additionalNotes || 'None'
  };

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: `EmailJS responded with status ${response.status}` };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown email dispatch error';
    return { success: false, error: message };
  }
};
