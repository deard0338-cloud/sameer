import { servicesData, getServiceBySlug } from './services';

export interface DocumentRequirement {
  id: string;
  name: string;
  required: boolean;
  allowedTypes: ('pdf' | 'jpg' | 'jpeg' | 'png')[];
  maxSizeMB: number;
  description?: string;
}

export interface CustomerField {
  id: string;
  label: string;
  type: 'text' | 'tel' | 'email' | 'textarea' | 'date';
  required: boolean;
  placeholder?: string;
  helperText?: string;
}

export interface ServiceRequestConfig {
  serviceId: string;
  serviceName: string;
  slug: string;
  category: string;
  department: string;
  requiredDocuments: DocumentRequirement[];
  optionalDocuments: DocumentRequirement[];
  customerFields: CustomerField[];
  importantNotice?: string;
}

/**
 * Standard customer fields for all citizen services.
 */
const defaultCustomerFields: CustomerField[] = [
  {
    id: 'fullName',
    label: 'Full Name (as per documents)',
    type: 'text',
    required: true,
    placeholder: 'e.g. Rahul Patil',
    helperText: 'Enter complete name matching your Aadhaar or official ID'
  },
  {
    id: 'mobile',
    label: 'Active Mobile Number',
    type: 'tel',
    required: true,
    placeholder: '10-digit Indian Mobile (e.g. 9823456789)',
    helperText: 'We will send status updates & coordinate via this number'
  },
  {
    id: 'email',
    label: 'Email Address (Optional)',
    type: 'email',
    required: false,
    placeholder: 'e.g. yourname@example.com',
    helperText: 'For receiving digital acknowledgment and e-copies'
  },
  {
    id: 'additionalNotes',
    label: 'Special Instructions / Requirements',
    type: 'textarea',
    required: false,
    placeholder: 'Mention any specific requirements, spelling preferences, urgency, or notes...',
    helperText: 'Optional notes for Sameer Xerox processing desk'
  }
];

/**
 * Service-specific extra fields (e.g. Business name for licenses, DOB for PAN).
 */
const serviceCustomFieldsMap: Record<string, CustomerField[]> = {
  'pan-card': [
    {
      id: 'panDob',
      label: 'Date of Birth (as per 10th marksheet / Aadhaar)',
      type: 'date',
      required: true,
      helperText: 'Required for Form 49A Income Tax portal entry'
    },
    {
      id: 'panFatherName',
      label: "Father's Full Name",
      type: 'text',
      required: true,
      placeholder: "e.g. Suresh Patil",
      helperText: "Printed on physical PAN card"
    }
  ],
  'shop-act-license': [
    {
      id: 'businessName',
      label: 'Shop / Establishment Name',
      type: 'text',
      required: true,
      placeholder: 'e.g. Patil General Stores',
      helperText: 'Exact business name for Gumasta registration'
    }
  ],
  'food-license-fssai-basic': [
    {
      id: 'foodBusinessName',
      label: 'Food Stall / Eatery / Business Name',
      type: 'text',
      required: true,
      placeholder: 'e.g. Om Sai Dairy & Sweets',
      helperText: 'Exact name for FSSAI registration certificate'
    }
  ],
  'udyam-msme-registration': [
    {
      id: 'enterpriseName',
      label: 'Enterprise / Business Trade Name',
      type: 'text',
      required: true,
      placeholder: 'e.g. Shree Ganesh Enterprises',
      helperText: 'Name of the unit / enterprise'
    }
  ],
  'rent-agreement': [
    {
      id: 'rentalAddress',
      label: 'Rental Property Address & City',
      type: 'text',
      required: true,
      placeholder: 'Flat/Shop No., Building, Area, Ashti',
      helperText: 'Full address of the leased property'
    }
  ]
};

/**
 * Helper to sanitize string into a clean document ID
 */
const sanitizeDocId = (text: string, index: number): string => {
  const clean = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 30);
  return clean ? `${clean}-${index}` : `doc-${index}`;
};

/**
 * Resolves request configuration dynamically for ANY of the 54 services.
 */
export const getServiceRequestConfig = (slugOrId: string): ServiceRequestConfig | null => {
  const service = getServiceBySlug(slugOrId) || servicesData.find(s => s.id === slugOrId);
  if (!service) return null;

  // Build required documents array from service.requiredDocuments
  const requiredDocuments: DocumentRequirement[] = (service.requiredDocuments || []).map((docStr, idx) => ({
    id: sanitizeDocId(docStr, idx),
    name: docStr,
    required: true,
    allowedTypes: ['pdf', 'jpg', 'jpeg', 'png'],
    maxSizeMB: 5,
    description: `Upload clear scan or photo (${docStr}). PDF or JPG, max 5 MB.`
  }));

  // Standard optional supporting document slot
  const optionalDocuments: DocumentRequirement[] = [
    {
      id: 'additional-proof',
      name: 'Additional Supporting Document / Previous Certificate (Optional)',
      required: false,
      allowedTypes: ['pdf', 'jpg', 'jpeg', 'png'],
      maxSizeMB: 5,
      description: 'Optional: Old certificate copy, affidavit, or additional ID proof if applicable.'
    }
  ];

  // Merge customer fields: default fields + any custom fields for this service
  const extraFields = serviceCustomFieldsMap[service.slug] || [];
  const customerFields: CustomerField[] = [
    defaultCustomerFields[0], // Full Name
    ...extraFields,           // Specific fields (DOB, Business Name, etc.)
    defaultCustomerFields[1], // Mobile
    defaultCustomerFields[2], // Email
    defaultCustomerFields[3]  // Additional Notes
  ];

  return {
    serviceId: service.id,
    serviceName: service.name,
    slug: service.slug,
    category: service.category,
    department: service.department,
    requiredDocuments,
    optionalDocuments,
    customerFields,
    importantNotice: service.importantInfo
  };
};

/**
 * Returns list of all available service configurations
 */
export const getAllServiceConfigs = (): ServiceRequestConfig[] => {
  return servicesData
    .map(s => getServiceRequestConfig(s.slug))
    .filter((c): c is ServiceRequestConfig => c !== null);
};
