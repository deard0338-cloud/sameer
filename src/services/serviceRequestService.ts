/**
 * Service Request Management & Tracking Service — Sameer Xerox
 * 
 * HYBRID ENTERPRISE ARCHITECTURE:
 * 1. Cloud Backend Mode: When Supabase credentials (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
 *    are configured, executes live PostgreSQL inserts, private Storage bucket uploads,
 *    and RLS protected queries.
 * 2. Session Standby Mode: When cloud credentials are empty, stores in session memory
 *    without claiming to be a live cloud database (Step 5 & 36 compliant).
 * 3. EmailJS Notification: Fires on successful request creation to alert the shop.
 *    Non-blocking: Request is preserved even if email fails.
 */

import { getSupabaseClient, isBackendConfigured } from '../lib/supabase';
import { sendNewRequestEmail, type EmailResult } from '../lib/emailjs';

export type RequestStatus = 
  | 'Pending' 
  | 'Under Review' 
  | 'Documents Required' 
  | 'Processing' 
  | 'Completed' 
  | 'Rejected'
  | 'Cancelled';

export interface UploadedDocumentMeta {
  id: string;
  requirementId: string;
  documentName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storagePath?: string;
  uploadedAt: string;
}

export interface ServiceRequestRecord {
  id: string; // e.g. "SX-2026-881245"
  dbId?: string; // UUID from PostgreSQL
  serviceId: string;
  serviceSlug: string;
  serviceName: string;
  category: string;
  customerName: string;
  mobile: string;
  email?: string;
  customFields?: Record<string, string>;
  additionalNotes?: string;
  status: RequestStatus;
  backendMode: 'cloud' | 'session';
  createdAt: string;
  updatedAt: string;
  documents: UploadedDocumentMeta[];
  emailDispatched?: boolean;
  emailError?: string;
}

export interface SubmitRequestInput {
  serviceId: string;
  serviceSlug: string;
  serviceName: string;
  category: string;
  customerName: string;
  mobile: string;
  email?: string;
  customFields?: Record<string, string>;
  additionalNotes?: string;
  files: {
    requirementId: string;
    documentName: string;
    file: File;
  }[];
}

export interface SubmitRequestResult {
  record: ServiceRequestRecord;
  emailResult: EmailResult;
  backendMode: 'cloud' | 'session';
}

// In-memory registry for uploaded file objects during current browser session
const sessionFilesRegistry = new Map<string, { file: File; docName: string; requestId: string }>();

// Initial mock baseline requests for Sameer Xerox tracking & dashboard demo
const initialRequests: ServiceRequestRecord[] = [
  {
    id: "SX-2026-8812",
    serviceId: "pan-card",
    serviceSlug: "pan-card",
    serviceName: "PAN Card Application",
    category: "Identity & Documents",
    customerName: "Rahul Sharma",
    mobile: "98234 56789",
    email: "rahul.sharma@example.com",
    status: "Processing",
    backendMode: "session",
    createdAt: "2026-09-03T11:20:00Z",
    updatedAt: "2026-09-05T14:30:00Z",
    additionalNotes: "Minor correction in father's name as per 10th marksheet.",
    documents: [
      {
        id: "doc-meta-1",
        requirementId: "aadhaar-proof",
        documentName: "Proof of Identity (Aadhaar Card)",
        fileName: "aadhaar_card_masked.pdf",
        fileSize: 420000,
        mimeType: "application/pdf",
        uploadedAt: "2026-09-03T11:20:00Z"
      },
      {
        id: "doc-meta-2",
        requirementId: "dob-proof",
        documentName: "Proof of Date of Birth (Marksheet)",
        fileName: "marksheet_10th.jpg",
        fileSize: 1150000,
        mimeType: "image/jpeg",
        uploadedAt: "2026-09-03T11:20:00Z"
      }
    ]
  },
  {
    id: "SX-2026-1044",
    serviceId: "shop-act-license",
    serviceSlug: "shop-act-license",
    serviceName: "Shop Act (Gumasta) License",
    category: "Business & Trade",
    customerName: "Anil Patil",
    mobile: "94210 98765",
    email: "patil.general@example.com",
    status: "Completed",
    backendMode: "session",
    createdAt: "2026-09-01T10:00:00Z",
    updatedAt: "2026-09-01T16:30:00Z",
    customFields: {
      businessName: "Patil General Stores"
    },
    documents: [
      {
        id: "doc-meta-3",
        requirementId: "shop-photo",
        documentName: "Shop Front Photo with Marathi Signboard",
        fileName: "shop_front_photo.jpg",
        fileSize: 1840000,
        mimeType: "image/jpeg",
        uploadedAt: "2026-09-01T10:00:00Z"
      }
    ]
  },
  {
    id: "SX-2026-0419",
    serviceId: "food-license-fssai-basic",
    serviceSlug: "food-license-fssai-basic",
    serviceName: "Food License (FSSAI) – Basic",
    category: "Business & Trade",
    customerName: "Sunita Deshmukh",
    mobile: "98221 44332",
    status: "Completed",
    backendMode: "session",
    createdAt: "2026-08-18T09:15:00Z",
    updatedAt: "2026-08-20T17:00:00Z",
    documents: [
      {
        id: "doc-meta-4",
        requirementId: "premises-proof",
        documentName: "Electricity Bill of Premises",
        fileName: "electricity_bill.pdf",
        fileSize: 310000,
        mimeType: "application/pdf",
        uploadedAt: "2026-08-18T09:15:00Z"
      }
    ]
  }
];

const STORAGE_KEY = 'sameer_xerox_requests_v2';

// Load stored metadata safely from sessionStorage for standby mode
const loadStoredRequests = (): ServiceRequestRecord[] => {
  if (typeof window === 'undefined') return initialRequests;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initialRequests));
      return initialRequests;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialRequests;
  } catch {
    return initialRequests;
  }
};

// Save metadata safely to sessionStorage
const saveRequests = (requests: ServiceRequestRecord[]): void => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch {
    // Non-fatal error handler
  }
};

/**
 * Generates unique formatted Request ID (e.g. SX-2026-582914)
 * Format: SX-YYYY-XXXXXX
 */
export const generateRequestId = (): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `SX-${year}-${randomNum}`;
};

/**
 * Normalizes Indian mobile number to clean 10 digits
 */
export const normalizeIndianMobile = (raw: string): string => {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  return digits;
};

/**
 * Validates Indian 10-digit mobile number
 */
export const isValidIndianMobile = (raw: string): boolean => {
  const normalized = normalizeIndianMobile(raw);
  return /^[6-9]\d{9}$/.test(normalized);
};

/**
 * Validates email format if provided
 */
export const isValidEmail = (email: string): boolean => {
  if (!email.trim()) return true; // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

/**
 * Map status strings cleanly
 */
const mapStatusToUi = (dbStatus: string): RequestStatus => {
  switch (dbStatus.toLowerCase()) {
    case 'under_review':
      return 'Under Review';
    case 'documents_required':
      return 'Documents Required';
    case 'processing':
      return 'Processing';
    case 'completed':
      return 'Completed';
    case 'rejected':
      return 'Rejected';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Pending';
  }
};

const mapUiStatusToDb = (uiStatus: RequestStatus): string => {
  return uiStatus.toLowerCase().replace(/\s+/g, '_');
};

/**
 * Submits a new customer service request with backend persistence & EmailJS alert
 */
export const submitServiceRequest = async (input: SubmitRequestInput): Promise<SubmitRequestResult> => {
  const requestId = generateRequestId();
  const timestamp = new Date().toISOString();
  const normalizedMobile = normalizeIndianMobile(input.mobile);
  const supabase = getSupabaseClient();
  const hasCloudBackend = isBackendConfigured() && supabase !== null;

  let createdRecord: ServiceRequestRecord;
  let backendMode: 'cloud' | 'session' = hasCloudBackend ? 'cloud' : 'session';

  if (hasCloudBackend) {
    try {
      // 1. Upload files to private Supabase Storage bucket 'service-documents'
      const docMetadataList: UploadedDocumentMeta[] = [];

      for (let i = 0; i < input.files.length; i++) {
        const item = input.files[i];
        const ext = item.file.name.split('.').pop() || 'bin';
        const safeDocId = item.requirementId.replace(/[^a-z0-9_-]/gi, '');
        const storagePath = `${requestId}/${safeDocId}_${Date.now()}.${ext}`;

        // Upload to private bucket
        const { error: uploadError } = await supabase.storage
          .from('service-documents')
          .upload(storagePath, item.file, {
            contentType: item.file.type || 'application/octet-stream',
            upsert: false
          });

        if (uploadError) {
          throw new Error(`Failed to upload document: ${item.documentName}`);
        }

        docMetadataList.push({
          id: `doc-${requestId}-${i}`,
          requirementId: item.requirementId,
          documentName: item.documentName,
          fileName: item.file.name,
          fileSize: item.file.size,
          mimeType: item.file.type || 'application/octet-stream',
          storagePath,
          uploadedAt: timestamp
        });
      }

      // 2. Insert record into service_requests table
      const { data: requestRow, error: requestError } = await supabase
        .from('service_requests')
        .insert({
          request_number: requestId,
          service_id: input.serviceId,
          service_slug: input.serviceSlug,
          service_name: input.serviceName,
          customer_name: input.customerName.trim(),
          mobile: normalizedMobile,
          email: input.email ? input.email.trim() : null,
          additional_details: input.additionalNotes ? input.additionalNotes.trim() : null,
          status: 'pending'
        })
        .select()
        .single();

      if (requestError || !requestRow) {
        throw new Error(requestError?.message || 'Database insert failed');
      }

      // 3. Insert document metadata records into service_request_documents table
      if (docMetadataList.length > 0) {
        const docRows = docMetadataList.map(doc => ({
          request_id: requestRow.id,
          document_id: doc.requirementId,
          document_name: doc.documentName,
          original_file_name: doc.fileName,
          storage_path: doc.storagePath,
          file_size: doc.fileSize,
          mime_type: doc.mimeType
        }));

        await supabase.from('service_request_documents').insert(docRows);
      }

      createdRecord = {
        id: requestId,
        dbId: requestRow.id,
        serviceId: input.serviceId,
        serviceSlug: input.serviceSlug,
        serviceName: input.serviceName,
        category: input.category,
        customerName: input.customerName.trim(),
        mobile: normalizedMobile,
        email: input.email ? input.email.trim() : undefined,
        customFields: input.customFields,
        additionalNotes: input.additionalNotes ? input.additionalNotes.trim() : undefined,
        status: 'Pending',
        backendMode: 'cloud',
        createdAt: timestamp,
        updatedAt: timestamp,
        documents: docMetadataList
      };
    } catch {
      // Fall back to session mode if cloud communication fails
      backendMode = 'session';
      createdRecord = createSessionRecord(requestId, timestamp, normalizedMobile, input);
    }
  } else {
    // Session Standby Mode (Cloud backend credentials not yet supplied)
    createdRecord = createSessionRecord(requestId, timestamp, normalizedMobile, input);
  }

  // Save to session cache so user can track immediately in current browser
  const existing = loadStoredRequests();
  saveRequests([createdRecord, ...existing]);

  // STEP 4 & 23: Send EmailJS notification email (non-blocking)
  const submittedAtFormatted = new Date(timestamp).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata'
  });

  const emailResult = await sendNewRequestEmail({
    requestId: createdRecord.id,
    serviceName: createdRecord.serviceName,
    customerName: createdRecord.customerName,
    customerMobile: createdRecord.mobile,
    customerEmail: createdRecord.email,
    requestStatus: createdRecord.status,
    submittedAt: submittedAtFormatted,
    documentsCount: createdRecord.documents.length,
    additionalNotes: createdRecord.additionalNotes
  });

  createdRecord.emailDispatched = emailResult.success;
  createdRecord.emailError = emailResult.error;

  return {
    record: createdRecord,
    emailResult,
    backendMode
  };
};

/**
 * Creates standby session record when cloud credentials are not yet configured
 */
const createSessionRecord = (
  requestId: string,
  timestamp: string,
  normalizedMobile: string,
  input: SubmitRequestInput
): ServiceRequestRecord => {
  const docMetadataList: UploadedDocumentMeta[] = input.files.map((item, idx) => {
    const docMetaId = `doc-${requestId}-${idx}`;
    sessionFilesRegistry.set(docMetaId, {
      file: item.file,
      docName: item.documentName,
      requestId
    });
    return {
      id: docMetaId,
      requirementId: item.requirementId,
      documentName: item.documentName,
      fileName: item.file.name,
      fileSize: item.file.size,
      mimeType: item.file.type || 'application/octet-stream',
      uploadedAt: timestamp
    };
  });

  return {
    id: requestId,
    serviceId: input.serviceId,
    serviceSlug: input.serviceSlug,
    serviceName: input.serviceName,
    category: input.category,
    customerName: input.customerName.trim(),
    mobile: normalizedMobile,
    email: input.email ? input.email.trim() : undefined,
    customFields: input.customFields,
    additionalNotes: input.additionalNotes ? input.additionalNotes.trim() : undefined,
    status: 'Pending',
    backendMode: 'session',
    createdAt: timestamp,
    updatedAt: timestamp,
    documents: docMetadataList
  };
};

/**
 * Get request by unique Request ID (checks live Supabase first if available, then session cache)
 */
export const getRequestById = async (id: string): Promise<ServiceRequestRecord | undefined> => {
  const cleanId = id.trim().toUpperCase();
  const supabase = getSupabaseClient();

  if (isBackendConfigured() && supabase !== null) {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          id,
          request_number,
          service_id,
          service_slug,
          service_name,
          customer_name,
          mobile,
          email,
          additional_details,
          status,
          created_at,
          updated_at,
          service_request_documents (
            id,
            document_id,
            document_name,
            original_file_name,
            storage_path,
            file_size,
            mime_type,
            created_at
          )
        `)
        .eq('request_number', cleanId)
        .maybeSingle();

      if (!error && data) {
        const docs = (data.service_request_documents || []).map((d: any) => ({
          id: d.id,
          requirementId: d.document_id,
          documentName: d.document_name,
          fileName: d.original_file_name,
          fileSize: d.file_size,
          mimeType: d.mime_type,
          storagePath: d.storage_path,
          uploadedAt: d.created_at
        }));

        return {
          id: data.request_number,
          dbId: data.id,
          serviceId: data.service_id,
          serviceSlug: data.service_slug,
          serviceName: data.service_name,
          category: 'Digital Service',
          customerName: data.customer_name,
          mobile: data.mobile,
          email: data.email || undefined,
          additionalNotes: data.additional_details || undefined,
          status: mapStatusToUi(data.status),
          backendMode: 'cloud',
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          documents: docs
        };
      }
    } catch {
      // Fallback to local session
    }
  }

  // Session fallback
  const all = loadStoredRequests();
  return all.find(r => r.id.toUpperCase() === cleanId);
};

/**
 * Synchronous version of getRequestById for instant UI search fallback
 */
export const getRequestByIdSync = (id: string): ServiceRequestRecord | undefined => {
  const all = loadStoredRequests();
  const cleanId = id.trim().toUpperCase();
  return all.find(r => r.id.toUpperCase() === cleanId);
};

/**
 * Get all requests for tracking & admin desk
 */
export const getAllRequests = async (): Promise<ServiceRequestRecord[]> => {
  const supabase = getSupabaseClient();

  if (isBackendConfigured() && supabase !== null) {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          id,
          request_number,
          service_id,
          service_slug,
          service_name,
          customer_name,
          mobile,
          email,
          additional_details,
          status,
          created_at,
          updated_at,
          service_request_documents (
            id,
            document_id,
            document_name,
            original_file_name,
            storage_path,
            file_size,
            mime_type,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map((item: any) => ({
          id: item.request_number,
          dbId: item.id,
          serviceId: item.service_id,
          serviceSlug: item.service_slug,
          serviceName: item.service_name,
          category: 'Digital Service',
          customerName: item.customer_name,
          mobile: item.mobile,
          email: item.email || undefined,
          additionalNotes: item.additional_details || undefined,
          status: mapStatusToUi(item.status),
          backendMode: 'cloud',
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          documents: (item.service_request_documents || []).map((d: any) => ({
            id: d.id,
            requirementId: d.document_id,
            documentName: d.document_name,
            fileName: d.original_file_name,
            fileSize: d.file_size,
            mimeType: d.mime_type,
            storagePath: d.storage_path,
            uploadedAt: d.created_at
          }))
        }));
      }
    } catch {
      // Fallback
    }
  }

  return loadStoredRequests();
};

export const getAllRequestsSync = (): ServiceRequestRecord[] => {
  return loadStoredRequests();
};

/**
 * Update request status (for Admin/Operator desk)
 */
export const updateRequestStatus = async (id: string, newStatus: RequestStatus): Promise<boolean> => {
  const supabase = getSupabaseClient();

  if (isBackendConfigured() && supabase !== null) {
    try {
      const dbStatus = mapUiStatusToDb(newStatus);
      await supabase
        .from('service_requests')
        .update({ status: dbStatus, updated_at: new Date().toISOString() })
        .eq('request_number', id);
    } catch {
      // Non-fatal
    }
  }

  const all = loadStoredRequests();
  const index = all.findIndex(r => r.id === id);
  if (index !== -1) {
    all[index].status = newStatus;
    all[index].updatedAt = new Date().toISOString();
    saveRequests([...all]);
  }

  return true;
};

/**
 * Access in-memory file safely for operator review in current session
 */
export const getSessionFile = (docId: string): File | undefined => {
  return sessionFilesRegistry.get(docId)?.file;
};
