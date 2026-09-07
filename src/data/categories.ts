export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  count?: number;
}

export const categoryChipsList = [
  "All",
  "Identity & Documents",
  "Passport & Identity Services",
  "Aadhaar Services",
  "Voter Services",
  "Certificates",
  "Ration & Government Services",
  "Government Schemes",
  "Banking & AEPS",
  "Business & Registration",
  "License & Professional Services",
  "PF & Pension",
  "Insurance",
  "Food License",
  "Scholarships",
  "Xerox & Digital Services",
  "Document & Legal Assistance",
  "Other Digital Services"
];

export const categoriesCatalog: CategoryItem[] = [
  {
    id: "identity-documents",
    name: "Identity & Documents",
    description: "Official identity documents, PAN cards, demographic updates, and document verification.",
    iconName: "FileText"
  },
  {
    id: "passport-identity",
    name: "Passport & Identity Services",
    description: "Fresh passport applications, renewal, PSK appointment scheduling, and Gazette legal name changes.",
    iconName: "Globe"
  },
  {
    id: "aadhaar-services",
    name: "Aadhaar Services",
    description: "Resident portal assistance, e-Aadhaar download, PVC card orders, bank seeding checks, and security lock/unlock.",
    iconName: "Fingerprint"
  },
  {
    id: "voter-services",
    name: "Voter Services",
    description: "Voter ID card search, lost card replacement (Form 8), and electoral roll verification assistance.",
    iconName: "CheckSquare"
  },
  {
    id: "certificates",
    name: "Certificates",
    description: "Caste validity documentation, EWS certificates, character verifications, and income proofs.",
    iconName: "Award"
  },
  {
    id: "ration-government",
    name: "Ration & Government Services",
    description: "National Food Security Act ration card services, member additions, modifications, and citizen welfare schemes.",
    iconName: "ShieldCheck"
  },
  {
    id: "government-schemes",
    name: "Government Schemes",
    description: "PM Kisan Samman Nidhi registration, farmer e-KYC, DBT verification, and welfare program assistance.",
    iconName: "Landmark"
  },
  {
    id: "banking-aeps",
    name: "Banking & AEPS",
    description: "Aadhaar Enabled Payment System cash withdrawal, balance checks, bank account opening, and CSP services.",
    iconName: "CreditCard"
  },
  {
    id: "business-registration",
    name: "Business & Registration",
    description: "Shop Act / Gumasta licenses, Udyam MSME registrations, and PWD contractor registrations.",
    iconName: "Building2"
  },
  {
    id: "license-professional",
    name: "License & Professional Services",
    description: "Medical & retail drug licenses, professional clearances, trade permits, and commercial certifications.",
    iconName: "Briefcase"
  },
  {
    id: "pf-pension",
    name: "PF & Pension",
    description: "EPFO UAN activation, PF advance & withdrawal claims, passbook downloads, and Jeevan Pramaan digital life certificates.",
    iconName: "Users"
  },
  {
    id: "insurance",
    name: "Insurance",
    description: "Comprehensive motor vehicle policies, two-wheeler insurance, individual and family floater health plans.",
    iconName: "ShieldAlert"
  },
  {
    id: "food-license",
    name: "Food License",
    description: "FSSAI Basic registration, state licenses, cloud kitchen approvals, Swiggy/Zomato vendor clearances.",
    iconName: "UtensilsCrossed"
  },
  {
    id: "scholarships",
    name: "Scholarships",
    description: "College and Junior College scholarship applications, MahaDBT, NSP, 11th, 12th, and degree course renewals.",
    iconName: "GraduationCap"
  },
  {
    id: "xerox-digital",
    name: "Xerox & Digital Services",
    description: "High-speed photocopy, laser color prints, passport photos, thermal lamination, scanning, and PDF tools.",
    iconName: "Printer"
  },
  {
    id: "document-legal",
    name: "Document & Legal Assistance",
    description: "Registered rent agreements, Police Clearance Certificates (PCC), affidavits, and notary assistance.",
    iconName: "FileCheck2"
  },
  {
    id: "other-digital",
    name: "Other Digital Services",
    description: "Online form filling, examination hall tickets, bill payments, university admissions, and CSC digital portal tasks.",
    iconName: "MonitorSmartphone"
  }
];
