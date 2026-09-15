/**
 * Service Request Management & Tracking Service — Sameer Xerox
 * 
 * SECURITY COMPLIANCE (Requirement 18 & 33):
 * - Uploaded customer binary documents are kept in secure in-memory sessions only.
 * - Private files are NEVER stored in localStorage or public/ assets.
 * - Zero sensitive logging of personal data or document content.
 * - Request metadata is securely stored for session tracking and dashboard view.
 */

export type RequestStatus = 
  | 'Pending' 
  | 'Under Review' 
  | 'Documents Required' 
  | 'Processing' 
  | 'Completed' 
  | 'Rejected';

export interface UploadedDocumentMeta {
  id: string;
  requirementId: string;
  documentName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface ServiceRequestRecord {
  id: string; // e.g. "SX-2026-881245"
  serviceId: string;
  serviceName: string;
  category: string;
  customerName: string;
  mobile: string;
  email?: string;
  customFields?: Record<string, string>;
  additionalNotes?: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  documents: UploadedDocumentMeta[];
}

export interface SubmitRequestInput {
  serviceId: string;
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

// In-memory registry for uploaded file objects during current browser session
const sessionFilesRegistry = new Map<string, { file: File; docName: string; requestId: string }>();

// Initial mock baseline requests for Sameer Xerox tracking & dashboard demo
const initialRequests: ServiceRequestRecord[] = [
  {
    id: "SX-2026-8812",
    serviceId: "pan-card",
    serviceName: "PAN Card Application",
    category: "Identity & Documents",
    customerName: "Rahul Sharma",
    mobile: "98234 56789",
    email: "rahul.sharma@example.com",
    status: "Processing",
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
    serviceName: "Shop Act (Gumasta) License",
    category: "Business & Trade",
    customerName: "Anil Patil",
    mobile: "94210 98765",
    email: "patil.general@example.com",
    status: "Completed",
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
    serviceName: "Food License (FSSAI) – Basic",
    category: "Business & Trade",
    customerName: "Sunita Deshmukh",
    mobile: "98221 44332",
    status: "Completed",
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

const STORAGE_KEY = 'sameer_xerox_requests_v1';

// Load stored metadata safely from sessionStorage
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
 */
export const generateRequestId = (): string => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `SX-2026-${randomNum}`;
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
 * Submits a new customer service request
 */
export const submitServiceRequest = async (input: SubmitRequestInput): Promise<ServiceRequestRecord> => {
  // Simulate standard network dispatch
  await new Promise(res => setTimeout(res, 800));

  const requestId = generateRequestId();
  const timestamp = new Date().toISOString();

  // Create document metadata and hold file reference safely in memory
  const docMetadataList: UploadedDocumentMeta[] = input.files.map((item, idx) => {
    const docMetaId = `doc-${requestId}-${idx}`;
    
    // Store in-memory file for operator inspection during session
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

  const newRecord: ServiceRequestRecord = {
    id: requestId,
    serviceId: input.serviceId,
    serviceName: input.serviceName,
    category: input.category,
    customerName: input.customerName.trim(),
    mobile: normalizeIndianMobile(input.mobile),
    email: input.email ? input.email.trim() : undefined,
    customFields: input.customFields,
    additionalNotes: input.additionalNotes ? input.additionalNotes.trim() : undefined,
    status: 'Pending',
    createdAt: timestamp,
    updatedAt: timestamp,
    documents: docMetadataList
  };

  const existing = loadStoredRequests();
  const updated = [newRecord, ...existing];
  saveRequests(updated);

  return newRecord;
};

/**
 * Get request by unique ID
 */
export const getRequestById = (id: string): ServiceRequestRecord | undefined => {
  const all = loadStoredRequests();
  const cleanId = id.trim().toUpperCase();
  return all.find(r => r.id.toUpperCase() === cleanId);
};

/**
 * Get all requests for tracking & admin desk
 */
export const getAllRequests = (): ServiceRequestRecord[] => {
  return loadStoredRequests();
};

/**
 * Update request status (for Admin/Operator desk)
 */
export const updateRequestStatus = (id: string, newStatus: RequestStatus): boolean => {
  const all = loadStoredRequests();
  const index = all.findIndex(r => r.id === id);
  if (index === -1) return false;

  all[index].status = newStatus;
  all[index].updatedAt = new Date().toISOString();
  saveRequests([...all]);
  return true;
};

/**
 * Search & filter requests
 */
export const searchRequests = (query: string, statusFilter: string = 'All'): ServiceRequestRecord[] => {
  const all = loadStoredRequests();
  const cleanQuery = query.toLowerCase().trim();

  return all.filter(item => {
    const matchesStatus = statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();
    if (!matchesStatus) return false;

    if (!cleanQuery) return true;

    return (
      item.id.toLowerCase().includes(cleanQuery) ||
      item.customerName.toLowerCase().includes(cleanQuery) ||
      item.mobile.includes(cleanQuery) ||
      item.serviceName.toLowerCase().includes(cleanQuery)
    );
  });
};

/**
 * Access in-memory file safely for operator review in current session
 */
export const getSessionFile = (docId: string): File | undefined => {
  return sessionFilesRegistry.get(docId)?.file;
};
