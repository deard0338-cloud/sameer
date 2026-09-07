/**
 * Service Data Directory - Sameer Xerox
 * 
 * Official Government Logos Source Traceability:
 * Official government and scheme logos are sourced from the UX4G Government Logos library:
 * Source: UX4G Government Logos (https://www.ux4g.gov.in/resources/logos)
 * Stored locally in: public/assets/services/logos/
 * 
 * Commercial / Digital / Private services utilize dedicated, clean local vector SVG assets in:
 * Stored locally in: public/assets/services/icons/
 * 
 * Generic fallback asset: public/assets/service-placeholder.svg
 */

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  keywords: string[];
  featured: boolean;
  popular: boolean;
  department: string;
  level: 'Central' | 'State' | 'Commercial / Digital';
  about: string;
  whoCanApply: string[];
  requiredDocuments: string[];
  processSteps: { title: string; desc: string }[];
  importantInfo: string;
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "pan-card",
    name: "PAN Card",
    slug: "pan-card",
    category: "Identity & Documents",
    image: "/services/pan-card.jpg",
    description: "PAN card related application and assistance services.",
    keywords: ["PAN", "PAN Card", "Permanent Account Number", "Tax ID", "UTIITSL", "NSDL"],
    featured: false,
    popular: true,
    department: "Income Tax Department / NSDL & UTIITSL",
    level: "Central",
    about: "Permanent Account Number (PAN) is a ten-digit alphanumeric identifier issued by the Income Tax Department. Sameer Xerox assists citizens with new PAN applications, instant e-PAN, physical PVC card dispatch, corrections (name, date of birth, photo/signature), and Aadhaar-PAN linking.",
    whoCanApply: [
      "Any Indian citizen, minor (through guardian), or NRI requiring a tax identification number",
      "Individuals opening a bank account, starting investments, or conducting property transactions",
      "Business owners and self-employed individuals"
    ],
    requiredDocuments: [
      "Proof of Identity (Aadhaar Card, Voter ID, Passport, or Driving License)",
      "Proof of Date of Birth (Aadhaar, Birth Certificate, 10th Marksheet, or School Leaving Certificate)",
      "Proof of Address (Aadhaar Card, Electricity Bill, Bank Passbook, or Rent Agreement)",
      "2 Passport-size color photographs (if manual signature/photo update required)"
    ],
    processSteps: [
      { title: "Document Verification", desc: "Bring your original Aadhaar and supporting proofs to Sameer Xerox for verification." },
      { title: "Online Application Entry", desc: "Our operator enters your demographic details into the authorized portal." },
      { title: "Biometric / OTP Authentication", desc: "Fast OTP authentication via Aadhaar or biometric scan for instant processing." },
      { title: "Acknowledgment Slip", desc: "Receive your printed acknowledgment slip with a 15-digit tracking number." },
      { title: "e-PAN & Physical Card", desc: "e-PAN received on email within 24-48 hours; laminated PVC card delivered via speed post." }
    ],
    importantInfo: "Please ensure your mobile number is linked to Aadhaar for instant e-KYC paperless processing. Contact Sameer Xerox for current government processing fees.",
    faqs: [
      { question: "How many days does it take to receive a physical PAN Card?", answer: "e-PAN is typically generated within 24 to 72 hours, while the physical laminated card arrives by post within 10 to 15 business days." },
      { question: "Can I update my photo and signature on an old PAN card?", answer: "Yes, Sameer Xerox handles corrections and updates for name, father's name, photo, signature, and date of birth." }
    ],
    relatedSlugs: ["bank-account-opening", "caste-validity", "shop-act-gumasta"]
  },
  {
    id: "caste-validity",
    name: "Caste Validity",
    slug: "caste-validity",
    category: "Certificates",
    image: "/services/caste-validity.jpg",
    description: "Assistance for caste validity related application and documentation.",
    keywords: ["Caste Validity", "Caste Certificate", "Validity", "Scrutiny Committee", "BARTI", "TRTI"],
    featured: false,
    popular: false,
    department: "Divisional Caste Certificate Scrutiny Committee",
    level: "State",
    about: "Caste Validity Certificate verifies the authenticity of a caste certificate for academic admissions, government jobs, and election nominations. Sameer Xerox provides complete documentation guidance, online proposal submission on the CCVIS/BARTI portal, and affidavit support.",
    whoCanApply: [
      "Students applying for reserved category quota in higher education (Engineering, Medical, Pharmacy, etc.)",
      "Candidates selected for government/semi-government recruitment",
      "Candidates contesting local body elections under reserved categories"
    ],
    requiredDocuments: [
      "Original Caste Certificate issued by Sub-Divisional Magistrate / Competent Authority",
      "School Leaving Certificate (LC / TC) of applicant clearly mentioning caste",
      "School Leaving Certificate / Primary School Record of Father / Grandfather (pre-mandated cutoff date)",
      "Form 16 or Service Certificate (for employed candidates)",
      "Family tree affidavit (Vamshavali / Genealogical Tree on stamp paper)",
      "Proof of residence in the state prior to the cutoff year"
    ],
    processSteps: [
      { title: "Genealogical Tree Preparation", desc: "Structuring the family tree (Vamshavali) and identifying crucial pre-cutoff documents." },
      { title: "Online CCVIS Portal Filing", desc: "Accurate online data entry and upload of scanned documents at Sameer Xerox." },
      { title: "Affidavit & Attestation", desc: "Preparation of applicant and parent affidavits as prescribed by the Scrutiny Committee." },
      { title: "Proposal File Submission", desc: "Generating Form 15A/15B proposals for submission to the respective district Scrutiny Committee." }
    ],
    importantInfo: "Pre-cutoff revenue or school records (such as 1950 for SC, 1961 for VJ/NT, 1967 for OBC) are vital. Please contact Sameer Xerox for current document verification guidance.",
    faqs: [
      { question: "Who needs a Caste Validity Certificate?", answer: "Any reserved category student seeking admission through CAP rounds or an employee seeking benefits of reservations in public services." }
    ],
    relatedSlugs: ["caste-validity-information", "police-clearance-certificate", "ration-card"]
  },
  {
    id: "caste-validity-information",
    name: "Caste Validity – Information",
    slug: "caste-validity-information",
    category: "Certificates",
    image: "/services/caste-validity-information.jpg",
    description: "Information and guidance related to caste validity applications.",
    keywords: ["Caste Validity Information", "Documents", "Guidance", "Checklist", "Rules"],
    featured: false,
    popular: false,
    department: "Social Welfare & Tribal Development",
    level: "State",
    about: "Informational consultation and document evaluation service. Many caste validity proposals get rejected or delayed due to missing pre-cutoff proofs or improper family tree affidavits. We inspect your historical family records and provide an actionable roadmap before filing.",
    whoCanApply: [
      "Parents and students preparing for 10th/12th/diploma admissions needing advance clarity",
      "Applicants with past queries or hearing notices from Scrutiny Committees"
    ],
    requiredDocuments: [
      "Copies of available educational records of father, grandfather, and blood relatives",
      "Copies of any existing caste validity certificates within the paternal family"
    ],
    processSteps: [
      { title: "Document Audit", desc: "Reviewing available proofs against mandated cutoff dates for your caste category." },
      { title: "Missing Proof Identification", desc: "Guidance on how to retrieve ancestral school register extracts (Nakal) or revenue records." },
      { title: "Submission Roadmap", desc: "Clear timeline and steps for seamless final filing." }
    ],
    importantInfo: "Consult early before college admission rounds begin to prevent last-minute disqualification. Contact Sameer Xerox for assistance.",
    faqs: [
      { question: "Can a maternal relative's validity certificate be used?", answer: "No, under caste scrutiny committee guidelines, only paternal (father's side) blood relative records and validities are admissible." }
    ],
    relatedSlugs: ["caste-validity", "police-clearance-certificate"]
  },
  {
    id: "ration-card",
    name: "Ration Card",
    slug: "ration-card",
    category: "Ration & Government Services",
    image: "/services/ration-card.jpg",
    description: "Ration card related online service assistance.",
    keywords: ["Ration Card", "Food Card", "Ration", "PDS", "EPDS", "NFSA", "Member Addition"],
    featured: false,
    popular: false,
    department: "Food, Civil Supplies & Consumer Protection Department",
    level: "State",
    about: "Ration Cards serve as proof of identity, family composition, and subsidised food grain eligibility under the National Food Security Act (NFSA). Sameer Xerox assists with online member additions, name deletions, transfers, surrender certificates, and RC booklet renewal applications.",
    whoCanApply: [
      "Families wishing to add a newborn child or newlywed daughter-in-law to an existing card",
      "Citizens transferring residential addresses between talukas/districts",
      "Separated family units applying for a bifurcated card"
    ],
    requiredDocuments: [
      "Existing Ration Card copy or Ration Card number",
      "Aadhaar Cards of all existing and new family members",
      "Birth Certificate (for adding minor children)",
      "Marriage Certificate / Deletion Certificate from previous place (for adding spouse)",
      "Recent electricity bill or address proof",
      "Head of family passport-size photograph"
    ],
    processSteps: [
      { title: "Verification of Existing RC", desc: "Checking current digital status and FPS allocation on the ePDS portal." },
      { title: "Application Preparation", desc: "Completing Form 8 (name addition), Form 6 (transfer), or Form 9 (surrender)." },
      { title: "Document Upload & Submission", desc: "Uploading required proofs and generating the official acknowledgment slip." },
      { title: "Tehsildar / Supply Officer Inspection", desc: "Assistance with follow-up tracking until approval." }
    ],
    importantInfo: "All family members must have their Aadhaar numbers linked to the ration card for biometric ration distribution. Please contact Sameer Xerox for requirements.",
    faqs: [
      { question: "How to add a new wife's name after marriage?", answer: "First obtain a deletion certificate (Nomi Kami) from her maternal village/city ration card, then apply for name addition with marriage certificate and Aadhaar at Sameer Xerox." }
    ],
    relatedSlugs: ["pan-card", "bank-account-opening", "rent-agreement"]
  },
  {
    id: "aeps-aadhaar-withdrawal",
    name: "AEPS / Aadhaar Money Withdrawal",
    slug: "aeps-aadhaar-withdrawal",
    category: "Banking & AEPS",
    image: "/services/aeps-aadhaar-withdrawal.jpg",
    description: "Aadhaar Enabled Payment System related money withdrawal assistance.",
    keywords: ["AEPS", "Aadhaar Money Withdrawal", "Aadhaar Banking", "Cash Out", "Balance Check", "Mini Statement"],
    featured: false,
    popular: true,
    department: "National Payments Corporation of India (NPCI) / Partner Bank CSP",
    level: "Commercial / Digital",
    about: "Aadhaar Enabled Payment System (AEPS) enables citizens to withdraw cash, check bank account balances, and print mini-statements securely using just their Aadhaar number and fingerprint biometric authentication. Sameer Xerox operates a secure DigiSeva / CSP terminal for hassle-free banking access.",
    whoCanApply: [
      "Any citizen having a bank account linked with their Aadhaar number",
      "Senior citizens, pensioners, and DBT scheme beneficiaries needing immediate cash without visiting distant bank branches"
    ],
    requiredDocuments: [
      "12-digit Aadhaar Number or Virtual ID",
      "Name of the Bank where the account is held",
      "Physical presence of account holder for biometric fingerprint verification"
    ],
    processSteps: [
      { title: "Bank Selection", desc: "Provide your bank name and 12-digit Aadhaar number to our operator." },
      { title: "Biometric Scan", desc: "Place your finger on the RD-service certified biometric fingerprint scanner." },
      { title: "Instant Transaction", desc: "Amount is debited from your bank account via NPCI secure network." },
      { title: "Cash Handover & Receipt", desc: "Receive immediate printed receipt with remaining balance and transaction RRN." }
    ],
    importantInfo: "AEPS transactions require your Aadhaar to be mapped to your bank account (NPCI DBT mapping). Daily withdrawal limits depend on your specific bank's policies.",
    faqs: [
      { question: "Is any ATM card or PIN required for AEPS?", answer: "No, AEPS only requires your Aadhaar number and fingerprint scan." },
      { question: "Can I check my bank balance at Sameer Xerox?", answer: "Yes, free balance inquiry and mini-statements are supported for all major Indian banks." }
    ],
    relatedSlugs: ["bank-account-opening", "pension-jeevan-pramaan"]
  },
  {
    id: "bank-account-opening",
    name: "Bank Account Opening",
    slug: "bank-account-opening",
    category: "Banking & AEPS",
    image: "/services/bank-account-opening.jpg",
    description: "Assistance with bank account opening and related documentation.",
    keywords: ["Bank Account", "Account Opening", "Banking", "Savings Account", "Current Account", "Zero Balance", "Jan Dhan"],
    featured: true,
    popular: true,
    department: "Commercial & Regional Rural Banks / Partner BC",
    level: "Commercial / Digital",
    about: "Assistance with opening savings accounts, zero-balance student accounts, Jan Dhan Yojana accounts, and current accounts for small businesses. Sameer Xerox assists with form filling, e-KYC verification, document collation, and online video-KYC guidance.",
    whoCanApply: [
      "Individuals seeking new savings or salary accounts",
      "Students requiring accounts for scholarships and examinations",
      "Shop owners, traders, and firms opening current accounts"
    ],
    requiredDocuments: [
      "Aadhaar Card (linked with active mobile number)",
      "PAN Card (or Form 60 if PAN is unavailable)",
      "2 Passport-size photographs",
      "Proof of Business / Shop Act / Udyam (for Current Accounts)",
      "Initial minimum deposit (if applicable for non-zero balance accounts)"
    ],
    processSteps: [
      { title: "Scheme & Bank Selection", desc: "Choose the appropriate bank based on your zero-balance, debit card, or merchant QR requirements." },
      { title: "Digital Form & e-KYC Entry", desc: "Filling official bank application and uploading scanned documents." },
      { title: "Biometric / e-Sign Authorization", desc: "Signing the application digitally via Aadhaar OTP." },
      { title: "Account Number & Kit Dispatch", desc: "Instant account number allocation with passbook/debit card tracking." }
    ],
    importantInfo: "We assist with application preparation and documentation. Final account approval and terms are subject to the respective bank's KYC verification guidelines.",
    faqs: [
      { question: "Can I open an account if I don't have a PAN card?", answer: "Yes, for savings accounts, Form 60 declaration can be filed along with Aadhaar, though we recommend applying for a PAN card simultaneously at our center." }
    ],
    relatedSlugs: ["aeps-aadhaar-withdrawal", "pan-card", "udyam-msme"]
  },
  {
    id: "shop-act-gumasta",
    name: "Shop Act (Gumasta) License",
    slug: "shop-act-gumasta",
    category: "Business & Registration",
    image: "/services/shop-act-gumasta.jpg",
    description: "Assistance for Shop Act / Gumasta license related applications.",
    keywords: ["Shop Act", "Gumasta", "Shop License", "Business License", "Labor Department", "Aaple Sarkar"],
    featured: false,
    popular: true,
    department: "Labour Department / Municipal Corporation",
    level: "State",
    about: "Shop and Establishment Act Registration (popularly known as Gumasta License) is a mandatory legal certificate for all retail shops, commercial offices, restaurants, and service providers. It serves as legal proof of commercial operations required for opening business bank accounts and GST registration.",
    whoCanApply: [
      "Any proprietor, partnership, or enterprise starting commercial activities or a shop",
      "Businesses with 0 to 9 employees (Intimation Receipt) or 10+ employees (Form C Registration)",
      "Existing business owners needing renewal or address modification"
    ],
    requiredDocuments: [
      "Aadhaar Card and PAN Card of Proprietor / Partners",
      "Passport-size photo of the business owner",
      "Photo of Shop/Office with signboard in local language and English",
      "Electricity Bill of the commercial premises",
      "Rent Agreement and NOC from landlord (if premises rented), or Property Tax Receipt (if owned)"
    ],
    processSteps: [
      { title: "Document Review", desc: "Verifying shop address proofs and signboard photographs at Sameer Xerox." },
      { title: "Online Application Entry", desc: "Drafting the labor department application with exact business activity codes." },
      { title: "Fee Payment & Upload", desc: "Submitting official government statutory fees through authorized payment gateways." },
      { title: "Instant Certificate Download", desc: "Digital download of the official Shop Act Registration certificate with QR verification." }
    ],
    importantInfo: "Signboard photo showing the shop name clearly in local language is mandatory as per state municipal regulations. Contact Sameer Xerox for guidance.",
    faqs: [
      { question: "Is Shop Act required for opening a current account?", answer: "Yes, almost all banks require Shop Act / Gumasta registration or Udyam Aadhaar as valid business proof." }
    ],
    relatedSlugs: ["rent-agreement", "udyam-msme", "fssai-basic"]
  },
  {
    id: "rent-agreement",
    name: "Rent Agreement",
    slug: "rent-agreement",
    category: "Document & Legal Assistance",
    image: "/services/rent-agreement.jpg",
    description: "Assistance with rent agreement preparation and related documentation.",
    keywords: ["Rent Agreement", "Rental Agreement", "Agreement", "Lease", "Stamp Paper", "e-Registration", "Notary"],
    featured: true,
    popular: true,
    department: "Department of Registration & Stamps",
    level: "State",
    about: "A legal rent agreement protects the rights of both landlord and tenant and serves as valid residential address proof for passport, bank accounts, driving license, and gas connections. Sameer Xerox assists with 11-month notary agreements and registered rent agreements.",
    whoCanApply: [
      "Property owners (landlords) renting residential or commercial premises",
      "Tenants relocating for work, education, or business",
      "Companies leasing accommodation for employees"
    ],
    requiredDocuments: [
      "Aadhaar Card and PAN Card of Owner (Landlord)",
      "Aadhaar Card and PAN Card of Tenant",
      "Aadhaar Cards of 2 neutral witnesses",
      "Index-2 or Property Tax Receipt or Electricity Bill of the rented property",
      "Terms of agreement: Monthly rent, security deposit amount, maintenance, and notice period"
    ],
    processSteps: [
      { title: "Terms Consultation", desc: "Discuss deposit, monthly rent, lock-in period, and escalation clauses." },
      { title: "Legal Drafting", desc: "Preparing the agreement draft incorporating standard legal protection clauses." },
      { title: "e-Stamp Purchase", desc: "Procuring authorized government stamp paper based on agreement duration." },
      { title: "Execution & Witness Signatures", desc: "Signing and thumb impression recording in presence of witnesses." },
      { title: "Notary / Registration Completion", desc: "Receiving stamped, notarized, and laminated original document." }
    ],
    importantInfo: "Ensure both parties agree on deposit return conditions and notice period clauses before finalizing. Contact Sameer Xerox for drafting support.",
    faqs: [
      { question: "Can I use a registered rent agreement for passport or bank proof?", answer: "Yes, a properly executed rent agreement is widely accepted as valid address proof." }
    ],
    relatedSlugs: ["police-clearance-certificate", "shop-act-gumasta", "bank-account-opening"]
  },
  {
    id: "police-clearance-certificate",
    name: "Police Clearance Certificate (PCC)",
    slug: "police-clearance-certificate",
    category: "Document & Legal Assistance",
    image: "/services/police-clearance-certificate.jpg",
    description: "Assistance for Police Clearance Certificate related application process.",
    keywords: ["PCC", "Police Clearance", "Clearance Certificate", "Passport Office", "Police Verification", "Job Verification"],
    featured: false,
    popular: false,
    department: "Police Commissionerate / Passport Seva Kendra (MEA)",
    level: "Central",
    about: "Police Clearance Certificate (PCC) is an official document certifying that an individual has no criminal record. It is frequently needed for overseas employment, student visas, PR applications, tenant police verification, and sensitive domestic employment.",
    whoCanApply: [
      "Indian nationals going abroad for employment, long-term stay, or immigration",
      "Job seekers applying for security, defense, transport, or institutional positions",
      "Tenants requiring local police verification certificate"
    ],
    requiredDocuments: [
      "Valid Indian Passport (Original + self-attested copies) for overseas PCC",
      "Aadhaar Card and Voter ID / Driving License for local employment PCC",
      "Proof of Current Address (Electricity bill, Rent agreement, or Passbook)",
      "Letter of offer/employment from prospective employer or visa sponsor (if required)"
    ],
    processSteps: [
      { title: "Portal Selection", desc: "Determine whether MEA Passport Portal or State Police Online Verification is required." },
      { title: "Form Submission", desc: "Entering applicant bio-data, current and past addresses (last 5 years) at Sameer Xerox." },
      { title: "Fee Payment & Appointment", desc: "Paying statutory fee and scheduling PSK visit or local police station slot." },
      { title: "Physical Police Inquiry", desc: "Attending verification at local jurisdiction police station with originals." },
      { title: "PCC Issuance", desc: "Collection of issued digitally signed certificate." }
    ],
    importantInfo: "Be transparent with all past addresses lived in the last 5 years to avoid query delays during police station background verification.",
    faqs: [
      { question: "How long is a PCC valid?", answer: "Generally, a Police Clearance Certificate is considered valid for 6 months from the date of issue by most embassies and employers." }
    ],
    relatedSlugs: ["caste-validity", "rent-agreement", "pan-card"]
  },
  {
    id: "pf-epfo-services",
    name: "PF / EPFO Services",
    slug: "pf-epfo",
    category: "PF & Pension",
    image: "/services/pf-epfo-services.jpg",
    description: "Assistance with PF and EPFO related online services.",
    keywords: ["PF", "EPFO", "Provident Fund", "UAN", "PF Withdrawal", "Form 19", "Form 10C", "Passbook"],
    featured: false,
    popular: false,
    department: "Employees' Provident Fund Organisation (EPFO)",
    level: "Central",
    about: "EPFO services allow salaried employees to manage their retirement savings. Sameer Xerox assists with Universal Account Number (UAN) activation, Member Portal login, Aadhaar-UAN seeding, KYC updating, online PF withdrawal (Form 19, 10C, 31 advance), transfer claims, and electronic passbook downloads.",
    whoCanApply: [
      "Salaried private sector employees with active or inactive PF accounts",
      "Individuals needing medical, marriage, education, or house purchase advance (Form 31)",
      "Resigned or retired personnel withdrawing accumulated PF and pension balance"
    ],
    requiredDocuments: [
      "12-digit UAN (Universal Account Number) and password",
      "Aadhaar Card (with active registered mobile number for OTP)",
      "Bank Passbook or Cancelled Cheque with applicant's name printed",
      "PAN Card (mandatory if total PF balance exceeds ₹50,000 and service is less than 5 years)"
    ],
    processSteps: [
      { title: "UAN & KYC Verification", desc: "Checking whether Aadhaar, PAN, and Bank details are approved by employer." },
      { title: "Claim Form Selection", desc: "Selecting appropriate claim type: Form 19 (Full PF), 10C (Pension), or 31 (Advance)." },
      { title: "Online Submission & Upload", desc: "Uploading clear image of cancelled cheque and submitting online claim." },
      { title: "Aadhaar OTP Signature", desc: "Authenticating claim through instant UIDAI OTP." },
      { title: "Tracking & Credit", desc: "Tracking field office status; funds credited directly to your bank in 7-15 days." }
    ],
    importantInfo: "Ensure your name, date of birth, and father's name on your Aadhaar match your EPF record exactly to avoid claim rejection. Contact Sameer Xerox for assistance.",
    faqs: [
      { question: "Can I withdraw PF while still working?", answer: "You can apply for a partial advance (Form 31) for medical emergencies, illness, house construction, or marriage without leaving your current job." }
    ],
    relatedSlugs: ["pension-jeevan-pramaan", "bank-account-opening", "pan-card"]
  },
  {
    id: "pension-jeevan-pramaan",
    name: "Pension / Jeevan Pramaan",
    slug: "pension-jeevan-pramaan",
    category: "PF & Pension",
    image: "/services/pension-jeevan-pramaan.jpg",
    description: "Assistance with pension and Jeevan Pramaan related services.",
    keywords: ["Pension", "Jeevan Pramaan", "Life Certificate", "Digital Life Certificate", "DLC", "Senior Citizen"],
    featured: false,
    popular: false,
    department: "Department of Pension & Pensioners' Welfare / UIDAI",
    level: "Central",
    about: "Jeevan Pramaan is a biometric-enabled Digital Life Certificate (DLC) for pensioners. Rather than standing in long queues at bank branches or treasury offices every year, senior citizens can complete their biometric verification at Sameer Xerox in just 2 minutes.",
    whoCanApply: [
      "Central Government, State Government, Defense, Railway, and Postal pensioners",
      "EPFO EPS-95 pension beneficiaries",
      "Family pensioners receiving monthly pension disbursements"
    ],
    requiredDocuments: [
      "Pension Payment Order (PPO) Number",
      "Pension Bank Account Number and Bank/Branch Name",
      "Aadhaar Card",
      "Active Mobile Phone for receiving confirmation SMS",
      "Physical presence of pensioner for biometric iris/fingerprint scan"
    ],
    processSteps: [
      { title: "PPO Verification", desc: "Entering PPO number, pension type, and disbursing agency into the Jeevan Pramaan client." },
      { title: "Biometric Authentication", desc: "Pensioner scans fingerprint or facial capture on our certified device." },
      { title: "DLC Generation", desc: "Immediate generation of Pramaan ID with real-time transfer to the pension disbursing agency." },
      { title: "Receipt Printout", desc: "Pensioner receives printed Life Certificate acknowledgment slip for peace of mind." }
    ],
    importantInfo: "Life certificates are generally due in the months of October/November each year. Early submission at our center ensures uninterrupted pension payout.",
    faqs: [
      { question: "Do I need to visit my bank after submitting Jeevan Pramaan?", answer: "No, the Digital Life Certificate is electronically dispatched to your pension disbursing agency/bank automatically." }
    ],
    relatedSlugs: ["pf-epfo", "aeps-aadhaar-withdrawal", "bank-account-opening"]
  },
  {
    id: "health-insurance-family",
    name: "Health Insurance – Family",
    slug: "health-insurance-family",
    category: "Insurance",
    image: "/services/health-insurance-family.jpg",
    description: "Family health insurance related assistance.",
    keywords: ["Family Health Insurance", "Health Policy", "Insurance", "Mediclaim", "Family Floater", "Cashless Hospitalization"],
    featured: false,
    popular: false,
    department: "IRDAI Registered Insurance Partners",
    level: "Commercial / Digital",
    about: "Comprehensive family floater health insurance policies protect your spouse, children, and parents under a single umbrella sum insured. Sameer Xerox assists families with policy comparison, cashless hospital network checks, proposal filling, and renewal assistance.",
    whoCanApply: [
      "Families seeking financial protection against sudden hospitalization and medical bills",
      "Individuals wanting tax savings under Section 80D of the Income Tax Act"
    ],
    requiredDocuments: [
      "Aadhaar Cards and PAN of proposer (primary applicant)",
      "Names, dates of birth, and relationship details of all family members to be covered",
      "Medical history / existing conditions disclosures (if any)"
    ],
    processSteps: [
      { title: "Coverage Assessment", desc: "Evaluating required sum insured (e.g. ₹5 Lakh, ₹10 Lakh, or ₹25 Lakh) based on family needs." },
      { title: "Network Check", desc: "Reviewing cashless network hospitals in your local city and surrounding areas." },
      { title: "Proposal Entry", desc: "Accurate health declaration and document submission at Sameer Xerox." },
      { title: "Instant Policy Dispatch", desc: "Payment via secure gateway and instant digital health card generation." }
    ],
    importantInfo: "Do not make claims about policy approval, coverage, or premium without authorized underwriter evaluation. Please contact Sameer Xerox for current policy options.",
    faqs: [
      { question: "What does family floater mean?", answer: "In a family floater, the entire sum insured (e.g. ₹10 Lakhs) is shared and accessible by any insured family member during the policy year." }
    ],
    relatedSlugs: ["health-insurance", "motor-insurance"]
  },
  {
    id: "health-insurance",
    name: "Health Insurance",
    slug: "health-insurance",
    category: "Insurance",
    image: "/services/health-insurance.jpg",
    description: "Health insurance related assistance and policy services.",
    keywords: ["Health Insurance", "Medical Insurance", "Individual Health", "Critical Illness", "Mediclaim"],
    featured: true,
    popular: true,
    department: "IRDAI Registered Insurance Partners",
    level: "Commercial / Digital",
    about: "Individual health insurance plans offer dedicated coverage for emergencies, surgery, day-care treatments, and post-hospitalization recovery. Sameer Xerox guides you through policy options from leading IRDAI-approved insurance providers.",
    whoCanApply: [
      "Working professionals, self-employed individuals, and students needing personal medical coverage",
      "Individuals seeking independent insurance over and above their employer's group cover"
    ],
    requiredDocuments: [
      "Aadhaar Card and PAN Card",
      "Passport-size photograph",
      "Previous policy copy (for seamless portability / continuous coverage credit)"
    ],
    processSteps: [
      { title: "Plan Comparison", desc: "Selecting individual sum insured, room rent caps, and restore benefit features." },
      { title: "Digital Proposal", desc: "Filing customer bio-data and medical declarations." },
      { title: "Premium Payment", desc: "Direct payment through secure payment link." },
      { title: "Policy Delivery", desc: "Receipt of soft copy policy document and laminated health e-card." }
    ],
    importantInfo: "Disclose pre-existing medical conditions truthfully during application to ensure smooth cashless claim settlement. Contact Sameer Xerox for assistance.",
    faqs: [
      { question: "Is there any waiting period for pre-existing illnesses?", answer: "Most health policies carry standard waiting periods for pre-existing conditions as per IRDAI guidelines." }
    ],
    relatedSlugs: ["health-insurance-family", "motor-insurance"]
  },
  {
    id: "motor-insurance",
    name: "Motor Insurance",
    slug: "motor-insurance",
    category: "Insurance",
    image: "/services/motor-insurance.jpg",
    description: "Motor vehicle insurance related assistance.",
    keywords: ["Motor Insurance", "Vehicle Insurance", "Car Insurance", "Bike Insurance", "Two Wheeler", "Third Party", "Comprehensive"],
    featured: true,
    popular: true,
    department: "IRDAI Registered General Insurance Providers",
    level: "Commercial / Digital",
    about: "Motor insurance is legally mandatory under the Motor Vehicles Act for all two-wheelers, private cars, and commercial vehicles on Indian roads. Sameer Xerox offers instant renewal and new policy issuance for Third-Party Liability as well as Comprehensive Bumper-to-Bumper covers.",
    whoCanApply: [
      "Vehicle owners with expiring or already expired bike, scooter, or car insurance",
      "Commercial vehicle operators (auto-rickshaw, tempo, truck, taxi)"
    ],
    requiredDocuments: [
      "Vehicle Registration Certificate (RC Book / Smart Card)",
      "Previous Year Insurance Policy Copy (if renewing)",
      "Owner Aadhaar Card and PAN Card"
    ],
    processSteps: [
      { title: "Vehicle RC Lookup", desc: "Entering vehicle registration number to retrieve make, model, and RTO specs." },
      { title: "Premium Calculation", desc: "Comparing Third-Party vs Comprehensive plans with optional zero-depreciation add-ons." },
      { title: "Instant Payment", desc: "Immediate online premium payment." },
      { title: "Laminated Policy Handover", desc: "Instant digital policy issuance and high-resolution color printout at our center." }
    ],
    importantInfo: "Avoid hefty traffic fines by renewing expired vehicle insurance promptly. Sameer Xerox provides instant 5-minute policy issuance. Contact us for quotes.",
    faqs: [
      { question: "Can I renew a policy that expired several months ago?", answer: "Yes, break-in inspection or instant online renewal is available depending on the vehicle category." }
    ],
    relatedSlugs: ["health-insurance", "shop-act-gumasta", "rent-agreement"]
  },
  {
    id: "fssai-basic",
    name: "Food License (FSSAI) – Basic",
    slug: "fssai-basic",
    category: "Food License",
    image: "/services/fssai-basic.jpg",
    description: "Assistance with Basic FSSAI food license related applications.",
    keywords: ["FSSAI", "Food License", "Basic FSSAI", "FoSCoS", "Food Registration", "Small Eatery"],
    featured: true,
    popular: true,
    department: "Food Safety and Standards Authority of India (FSSAI)",
    level: "Central",
    about: "Every food business operator with an annual turnover of up to ₹12 Lakhs is required by law to register under the Basic FSSAI category on the FoSCoS portal. Sameer Xerox assists home kitchens, small canteens, tea stalls, bakeries, and snack centers with seamless 1 to 5 year registrations.",
    whoCanApply: [
      "Petty food manufacturers, hawkers, tea vendors, home bakeries",
      "Small grocery (kirana) stores selling packaged food items",
      "Catering providers with annual turnover under ₹12 Lakhs"
    ],
    requiredDocuments: [
      "Aadhaar Card and PAN Card of Food Business Operator (FBO)",
      "Passport-size photograph of applicant",
      "Electricity Bill of business premises",
      "Rent Agreement / NOC from owner (if premises rented)",
      "List of food category items to be manufactured or sold"
    ],
    processSteps: [
      { title: "Food Category Selection", desc: "Classifying your food products under the official FoSCoS food category catalog." },
      { title: "Form A Filing", desc: "Filling online application details and uploading premises proofs at Sameer Xerox." },
      { title: "Government Fee Payment", desc: "Paying statutory ₹100/year government fees for 1 to 5 years." },
      { title: "Certificate Download", desc: "Receiving the 14-digit FSSAI Registration Certificate with QR verification." }
    ],
    importantInfo: "Operating a food business without FSSAI registration attracts penalties under Section 63 of the Food Safety Act. Contact Sameer Xerox for hassle-free registration.",
    faqs: [
      { question: "How long is a Basic FSSAI Registration valid?", answer: "You can choose validity from 1 year up to 5 years at the time of application." }
    ],
    relatedSlugs: ["fssai-food-business", "fssai-food-seller", "fssai-zomato-swiggy", "shop-act-gumasta"]
  },
  {
    id: "fssai-food-business",
    name: "Food License (FSSAI) – Food Business",
    slug: "fssai-food-business",
    category: "Food License",
    image: "/services/fssai-food-business.jpg",
    description: "FSSAI related assistance for food business registration/licensing.",
    keywords: ["FSSAI", "Food Business", "Food License", "State License", "Restaurant", "Manufacturer"],
    featured: false,
    popular: false,
    department: "Food Safety and Standards Authority of India (FSSAI)",
    level: "Central",
    about: "Medium-sized food enterprises, restaurants, dairy units, and packaging businesses with turnover exceeding ₹12 Lakhs require an FSSAI State License. Sameer Xerox helps with FoSCoS Form B filing, blueprint upload, water test reports, and compliance guidance.",
    whoCanApply: [
      "Restaurants, hotels, cloud kitchens, and banquet halls",
      "Food manufacturing and processing units, grain millers, repackers",
      "Food distributors and cold storage operators"
    ],
    requiredDocuments: [
      "Aadhaar & PAN of authorized signatory / partners / directors",
      "Layout plan of processing unit / kitchen premises",
      "List of directors / partners with full address & contact details",
      "Name and list of machinery / equipment with installed capacity",
      "Water testing chemical analysis report (from accredited lab)",
      "Shop Act / Municipal Trade License / NOC"
    ],
    processSteps: [
      { title: "Capacity & Turnover Assessment", desc: "Confirming state licensing criteria and product categories." },
      { title: "Technical Document Drafting", desc: "Form B compilation, equipment list formatting, and layout schematic." },
      { title: "FoSCoS Portal Submission", desc: "Uploading verified documentation and paying designated state licensing fees." },
      { title: "Scrutiny & Query Handling", desc: "Assisting with response to Food Safety Officer inspection queries." }
    ],
    importantInfo: "State licensing involves inspection by Food Safety Officers. Contact Sameer Xerox for end-to-end guidance.",
    faqs: [
      { question: "What is the threshold between Basic Registration and State License?", answer: "Basic Registration applies to businesses with annual turnover under ₹12 Lakhs, while State License applies from ₹12 Lakhs to ₹20 Crores." }
    ],
    relatedSlugs: ["fssai-basic", "fssai-zomato-swiggy", "shop-act-gumasta", "udyam-msme"]
  },
  {
    id: "fssai-food-seller",
    name: "Food License (FSSAI) – Food Seller",
    slug: "fssai-food-seller",
    category: "Food License",
    image: "/services/fssai-food-seller.jpg",
    description: "FSSAI related assistance for food sellers.",
    keywords: ["FSSAI", "Food Seller", "Food License", "Kirana", "Dairy", "Vegetable Seller", "Retailer"],
    featured: false,
    popular: false,
    department: "Food Safety and Standards Authority of India (FSSAI)",
    level: "Central",
    about: "Dedicated FSSAI licensing and registration assistance tailored specifically for food retailers, kirana shop owners, sweet marts, meat/poultry stalls, vegetable vendors, and local provision stores.",
    whoCanApply: [
      "Retail food shopkeepers selling packaged or loose provisions",
      "Sweet shops, juice bars, ice cream parlors, dairy product shops",
      "Mobile food cart vendors"
    ],
    requiredDocuments: [
      "Aadhaar Card of proprietor",
      "Shop photo with name board",
      "Shop electricity bill / rent agreement",
      "Declaration form"
    ],
    processSteps: [
      { title: "Shop Registration Setup", desc: "Identifying relevant trade categories under FoSCoS." },
      { title: "Quick Form Entry", desc: "Fast online entry and document attachment at Sameer Xerox." },
      { title: "Certificate Delivery", desc: "Printed and laminated FSSAI display certificate with registration number." }
    ],
    importantInfo: "Display of the 14-digit FSSAI number and Food Safety Display Board (FSDB) at your counter is mandatory. Contact Sameer Xerox for assistance.",
    faqs: [
      { question: "Do small provision stores need an FSSAI certificate?", answer: "Yes, any retailer stocking or selling food items must hold at least a Basic FSSAI registration." }
    ],
    relatedSlugs: ["fssai-basic", "shop-act-gumasta", "fssai-zomato-swiggy"]
  },
  {
    id: "fssai-zomato-swiggy",
    name: "FSSAI – Zomato / Swiggy",
    slug: "fssai-zomato-swiggy",
    category: "Food License",
    image: "/services/fssai-zomato-swiggy.jpg",
    description: "Assistance for FSSAI related requirements for food sellers operating through online food platforms.",
    keywords: ["FSSAI", "Zomato", "Swiggy", "Food Seller", "Cloud Kitchen", "Food Delivery", "eCommerce FBO"],
    featured: false,
    popular: true,
    department: "Food Safety and Standards Authority of India (FSSAI)",
    level: "Central",
    about: "Listing your restaurant, cafe, or cloud kitchen on food aggregator platforms like Zomato and Swiggy mandates having an active, valid FSSAI license with the specific eCommerce/Food Services category enabled. Sameer Xerox assists aspiring food entrepreneurs in obtaining compliant documentation.",
    whoCanApply: [
      "Cloud kitchen owners starting home-based delivery models",
      "Existing dine-in restaurants expanding into online delivery on Zomato / Swiggy",
      "Dessert and bakery startups"
    ],
    requiredDocuments: [
      "Aadhaar Card and PAN Card of proprietor/firm",
      "Premises proof (Commercial electricity bill, rent agreement, or property receipt)",
      "Kitchen photographs showing hygiene setup and food preparation area",
      "Proposed restaurant/brand name for delivery listing",
      "Cancelled bank cheque for merchant payouts"
    ],
    processSteps: [
      { title: "e-Commerce Classification", desc: "Filing application with designated Food Services & e-Commerce trade codes." },
      { title: "Compliance Review", desc: "Ensuring menu categories align with FSSAI regulations." },
      { title: "FSSAI Issuance", desc: "Expedited processing on FoSCoS portal." },
      { title: "Onboarding Ready Pack", desc: "Packaging certificate and supporting documents for direct upload to partner onboarding desks." }
    ],
    importantInfo: "Sameer Xerox provides independent documentation assistance. We have no direct partnership or affiliation with Zomato or Swiggy. Contact us for current requirements.",
    faqs: [
      { question: "Can I run a cloud kitchen from my residential home?", answer: "Yes, home cloud kitchens are permitted under Basic FSSAI registration with appropriate premises documentation." }
    ],
    relatedSlugs: ["fssai-basic", "fssai-food-business", "shop-act-gumasta", "bank-account-opening"]
  },
  {
    id: "udyam-msme",
    name: "Udyam Aadhaar / MSME Registration",
    slug: "udyam-msme",
    category: "Business & Registration",
    image: "/services/udyam-msme.jpg",
    description: "Assistance with Udyam / MSME registration related services.",
    keywords: ["Udyam", "MSME", "Business Registration", "Micro Enterprise", "Small Business", "Udyam Certificate"],
    featured: false,
    popular: true,
    department: "Ministry of Micro, Small & Medium Enterprises",
    level: "Central",
    about: "Udyam Registration is the official Indian Government registration certificate for Micro, Small, and Medium Enterprises. It confers multiple benefits including priority sector bank lending at subsidized interest rates, collateral-free credit, government tender exemptions, and electricity bill concessions.",
    whoCanApply: [
      "Any individual entrepreneur, sole proprietorship, partnership firm, LLP, or private company",
      "Manufacturing and service business units seeking formal recognition",
      "Traders and retailers eligible under MSME priority sector lending"
    ],
    requiredDocuments: [
      "Aadhaar Card of Entrepreneur / Managing Partner",
      "PAN Card (mandatory for Udyam registration)",
      "Bank Account Number and IFSC Code of the business",
      "National Industrial Classification (NIC) details of business activities",
      "Date of commencement of business and number of employees"
    ],
    processSteps: [
      { title: "Aadhaar & PAN Verification", desc: "Validating business ownership and tax identification on the Udyam portal." },
      { title: "NIC Code Mapping", desc: "Selecting the precise 4-digit and 5-digit manufacturing/service activity classification." },
      { title: "Investment & Turnover Entry", desc: "Categorizing unit as Micro (up to ₹1 Cr investment), Small, or Medium." },
      { title: "OTP Authentication & Issuance", desc: "Instant generation of the permanent Udyam Registration Certificate with dynamic QR code." }
    ],
    importantInfo: "Udyam registration is lifetime valid and requires no renewal fee. Contact Sameer Xerox for accurate activity mapping.",
    faqs: [
      { question: "What are the benefits of Udyam registration?", answer: "Benefits include easier bank loan access without collateral, lower interest rates, protection against delayed payments from buyers, and 50% discount on trademark fees." }
    ],
    relatedSlugs: ["udyam-business-registration", "shop-act-gumasta", "bank-account-opening"]
  },
  {
    id: "udyam-business-registration",
    name: "Udyam Aadhaar – Business Registration",
    slug: "udyam-business-registration",
    category: "Business & Registration",
    image: "/services/udyam-business-registration.jpg",
    description: "Business registration assistance through Udyam-related services.",
    keywords: ["Udyam Registration", "MSME Registration", "Business", "Startup Registration", "Firm Setup"],
    featured: false,
    popular: false,
    department: "Ministry of Micro, Small & Medium Enterprises",
    level: "Central",
    about: "Comprehensive commercial onboarding service combining Udyam Aadhaar setup, NIC code optimization, business bank account resolution, and initial compliance structure for newly established proprietorships and business ventures.",
    whoCanApply: [
      "New startups and business founders setting up operations",
      "Existing informal businesses transitioning into the formal economy"
    ],
    requiredDocuments: [
      "Aadhaar & PAN Card",
      "Business establishment address proof",
      "Bank statement / passbook copy"
    ],
    processSteps: [
      { title: "Business Structure Consultation", desc: "Determining optimal enterprise category and operational scope." },
      { title: "Udyam Portal Processing", desc: "Filing and instant certification at Sameer Xerox." },
      { title: "Laminated Certificate Pack", desc: "Delivering government verified certificate pack ready for current account opening." }
    ],
    importantInfo: "Having your Udyam certificate is the cornerstone for availing collateral-free loans under PMEGP and Mudra schemes. Please contact Sameer Xerox for requirements.",
    faqs: [
      { question: "Can a single person have more than one Udyam registration?", answer: "No, one Aadhaar can be linked to only one Udyam enterprise registration, but multiple business activities and plants can be added under that single registration." }
    ],
    relatedSlugs: ["udyam-msme", "shop-act-gumasta", "bank-account-opening"]
  }
,
  {
    id: "passport-seva",
    name: "Passport Seva",
    slug: "passport-seva",
    category: "Passport & Identity Services",
    image: "/services/passport-seva.jpg",
    description: "Get assistance with various passport-related services including locating passport centres, fee information, document requirements, application status tracking and appointment availability.",
    keywords: ["passport", "passport application", "passport seva", "passport renewal", "PCC", "passport appointment", "passport status", "tatkaal passport", "passport office", "psk"],
    featured: false,
    popular: true,
    department: "Passport Seva / Ministry of External Affairs (Online Facilitation)",
    level: "Central",
    about: "Comprehensive online application assistance for fresh Indian passport, passport re-issue/renewal, tatkaal applications, Police Clearance Certificate (PCC), appointment slot booking at Passport Seva Kendras (PSK/POPSK), document requirement guidance, fee information, and application status tracking.",
    whoCanApply: [
      "Indian citizens applying for a fresh normal or tatkaal passport",
      "Citizens seeking passport renewal or re-issue due to expiry, validity exhaustion, or damage",
      "Minors and senior citizens requiring document collation and appointment booking",
      "Applicants requiring Police Clearance Certificate (PCC) for overseas employment or visa"
],
    requiredDocuments: [
      "Proof of Date of Birth (Birth Certificate, School Leaving Certificate, or Aadhaar Card)",
      "Proof of Present Residential Address (Aadhaar Card, Electricity Bill, Bank Passbook, or Registered Rent Agreement)",
      "Proof of Identity (Aadhaar, Voter ID, or PAN Card)",
      "Standard 10th or higher education passing certificate (for Non-ECR status qualification)",
      "Old original passport with self-attested copies of first and last 2 pages (for renewal/re-issue)"
],
    processSteps: [
      {
            "title": "Service & Category Selection",
            "desc": "Selecting fresh passport, renewal, tatkaal, or PCC category based on travel requirements."
      },
      {
            "title": "Online Application Entry",
            "desc": "Accurate filing of applicant bio-data, family particulars, and address history."
      },
      {
            "title": "Fee Payment & Slot Booking",
            "desc": "Submitting statutory government fee and reserving an appointment slot at nearest PSK/POPSK."
      },
      {
            "title": "Document Collation & Printout",
            "desc": "Generating Application Receipt (ARN) with complete self-attested checklist pack."
      },
      {
            "title": "PSK Visit Guidance & Tracking",
            "desc": "Guidance on attending the verification center and tracking dispatch via Speed Post."
      }
],
    importantInfo: "Sameer Xerox is an independent digital facilitation center providing online application and appointment assistance. We are NOT an official Passport Seva Kendra or government office. Final passport issuance and police verification are governed solely by the Ministry of External Affairs. Applicable government fees and slot availability are determined by the concerned authority.",
    faqs: [
      {
            "question": "Can Sameer Xerox book my PSK appointment slot?",
            "answer": "Yes, we handle complete online registration, fee payment, and appointment slot booking at your preferred Passport Seva Kendra or Post Office PSK."
      },
      {
            "question": "What is Non-ECR status in an Indian passport?",
            "answer": "Applicants who have passed standard 10th (matriculation) or higher qualify for Non-ECR (Emigration Check Not Required), eliminating emigration clearance when traveling abroad for work."
      }
],
    relatedSlugs: ["police-clearance-certificate", "pan-card", "rent-agreement"]
  },
  {
    id: "gazette-name-change",
    name: "Gazette \u2013 Name Change",
    slug: "gazette-name-change",
    category: "Passport & Identity Services",
    image: "/assets/services/icons/gazette.svg",
    description: "Assistance with the name change process including affidavit preparation guidance, newspaper publication, online Gazette application, document upload and obtaining the published Gazette notification copy.",
    keywords: ["gazette", "name change", "change of name", "rajpatra", "gazette notification", "affidavit", "newspaper ad", "spelling correction", "post marriage name change"],
    featured: false,
    popular: false,
    department: "Directorate of Government Printing, Stationery and Publications",
    level: "State",
    about: "End-to-end facilitation for legal change of name for adults and minors, change of name post-marriage, spelling rectifications, and religion change. We assist with affidavit drafting, newspaper advertisement guidance, Directorate of Government Printing portal filing, and downloading the legally recognized Gazette notification.",
    whoCanApply: [
      "Women changing their surname or full name after marriage or divorce",
      "Individuals correcting clerical spelling discrepancies between school records and Aadhaar/PAN",
      "Citizens adopting a new personal name or religious name for official records",
      "Minors whose parents are updating child's legal identity documents"
],
    requiredDocuments: [
      "Aadhaar Card with current details",
      "Affidavit / Change of Name Deed executed on non-judicial stamp paper",
      "Newspaper Advertisement Copies (1 local language and 1 English daily)",
      "Passport Size Photograph of applicant",
      "Supporting Documents Showing Old Name (Birth Certificate, School Leaving Certificate, or PAN)",
      "Marriage Certificate or Joint Affidavit (for post-marriage surname changes)"
],
    processSteps: [
      {
            "title": "Affidavit Preparation",
            "desc": "Drafting the change of name affidavit or deed with clear legal declaration."
      },
      {
            "title": "Newspaper Advertisement",
            "desc": "Publishing the name change declaration in mandated circulating newspapers."
      },
      {
            "title": "Online Gazette Application",
            "desc": "Entering applicant details and uploading affidavits and newspaper clippings."
      },
      {
            "title": "Fee Payment & Department Verification",
            "desc": "Paying official government statutory fees via online treasury gateway."
      },
      {
            "title": "Notification Download",
            "desc": "Receiving the digitally signed official Gazette notification copy."
      }
],
    importantInfo: "Applicable requirements, statutory fees, and approval timelines are decided by the concerned government printing and stationery authority. A published Gazette notification is legally conclusive proof of name change accepted by banks, passport authorities, and universities.",
    faqs: [
      {
            "question": "Is publishing in newspapers mandatory before applying for Gazette?",
            "answer": "Yes, official Gazette publication mandates submitting clippings of name change notifications published in recognized regional and national newspapers."
      }
],
    relatedSlugs: ["affidavit", "pan-card", "passport-seva"]
  },
  {
    id: "aadhaar-services",
    name: "Aadhaar Services",
    slug: "aadhaar-services",
    category: "Aadhaar Services",
    image: "/services/aadhaar-services.jpg",
    description: "Assistance with selected Aadhaar online services such as downloading Aadhaar, verification, PVC card status, bank seeding status and Aadhaar-related online services.",
    keywords: ["Aadhaar", "UIDAI", "Aadhaar download", "PVC Aadhaar", "Aadhaar verification", "bank seeding", "Aadhaar status", "Aadhaar lock unlock", "e-Aadhaar"],
    featured: false,
    popular: true,
    department: "UIDAI / Unique Identification Authority of India (Online Facilitation)",
    level: "Central",
    about: "Assistance with selected UIDAI resident portal services including e-Aadhaar download, Aadhaar PVC smart card order & status tracking, bank account seeding status (NPCI mapping), registered email/mobile verification, biometric lock/unlock for fraud prevention, and locating authorized Aadhaar Enrolment / Update Centers.",
    whoCanApply: [
      "Any Aadhaar holder with an active mobile number registered with UIDAI",
      "Citizens needing physical, durable PVC smart cards with secure hologram and QR code",
      "Beneficiaries verifying if their Aadhaar is mapped to their bank account for government DBT subsidies",
      "Citizens securing their biometrics against unauthorized AEPS transactions"
],
    requiredDocuments: [
      "12-digit Aadhaar Number or 28-digit Enrolment ID (EID) / Virtual ID (VID)",
      "Active registered mobile phone to receive UIDAI one-time verification OTP",
      "Bank account details (for checking bank seeding verification status)"
],
    processSteps: [
      {
            "title": "Service Identification",
            "desc": "Selecting required service: Download, PVC Order, Bank Seeding, or Lock/Unlock."
      },
      {
            "title": "OTP Authentication",
            "desc": "Entering Aadhaar number and authenticating with the instant OTP sent to your registered phone."
      },
      {
            "title": "Status / Download Processing",
            "desc": "Retrieving verified status report or downloading password-protected digital e-Aadhaar PDF."
      },
      {
            "title": "High-Resolution Color Print / Lamination",
            "desc": "Printing clear document copy and providing protective lamination at our center."
      }
],
    importantInfo: "Sameer Xerox is an independent digital facilitation center. We do NOT represent UIDAI and do NOT alter biometric records. All services operate through official UIDAI resident portals. Biometric updates (fingerprints, iris, photo) and new enrolments require visiting an authorized government UIDAI Seva Kendra. Contact Sameer Xerox for current online service guidance.",
    faqs: [
      {
            "question": "Can Sameer Xerox update my mobile number on Aadhaar?",
            "answer": "Mobile number and biometric updates require physical biometric presence at an official UIDAI Enrolment Centre. We help you locate the nearest operational Aadhaar centre and book your appointment."
      },
      {
            "question": "What is Aadhaar Bank Seeding (DBT)?",
            "answer": "Bank seeding links your Aadhaar to your bank via NPCI mapper, enabling direct receipt of government benefits, scholarships, and PM-Kisan installments."
      }
],
    relatedSlugs: ["aeps-aadhaar-withdrawal", "pan-card", "bank-account-opening"]
  },
  {
    id: "lost-voter-id",
    name: "Lost Voter ID Card",
    slug: "lost-voter-id",
    category: "Voter Services",
    image: "/assets/services/logos/election-commission.png",
    description: "Assistance for applying for a replacement voter ID card when the original EPIC/Voter ID card is lost.",
    keywords: ["voter", "voter id", "lost voter id", "replacement voter card", "duplicate voter id", "epic card", "nvsp", "election card", "form 8"],
    featured: false,
    popular: false,
    department: "Election Commission of India (ECI) / State Election Department",
    level: "Central",
    about: "Guidance and online application assistance for issuing a replacement Electors Photo Identity Card (EPIC) due to loss, theft, mutilation, or wear and tear. We assist with voter roll search, Form 8 replacement filing on the Election Commission Voters Service Portal, and application reference number tracking.",
    whoCanApply: [
      "Registered voters whose original Voter ID card has been lost, misplaced, or damaged",
      "Voters seeking a newly designed color PVC EPIC card with secure hologram",
      "Citizens having an existing valid voter registration in the electoral roll"
],
    requiredDocuments: [
      "EPIC (Voter ID) Number, if available",
      "Address Proof (Aadhaar Card, Electricity Bill, Water Bill, or Bank Passbook)",
      "Identity Proof (Aadhaar Card, PAN Card, or Driving License)",
      "Passport Size Color Photograph",
      "FIR Copy / Declaration / NCR of Loss, where applicable"
],
    processSteps: [
      {
            "title": "Electoral Record Search",
            "desc": "Locating and verifying your existing record in the electoral roll via name or EPIC number."
      },
      {
            "title": "Replacement Form 8 Entry",
            "desc": "Filing online Form 8 specifying 'Issue of Replacement EPIC without correction'."
      },
      {
            "title": "Document & Photo Upload",
            "desc": "Uploading clear address proof, photograph, and loss declaration."
      },
      {
            "title": "Submission & Reference Generation",
            "desc": "Submitting application and generating the unique ECI tracking reference number."
      },
      {
            "title": "BLA / ERO Verification & Card Dispatch",
            "desc": "Tracking application until the new physical card is printed and delivered by the election office."
      }
],
    importantInfo: "Final approval, physical card printing, and delivery are handled exclusively by the concerned Electoral Registration Officer (ERO) and Election Commission of India. Sameer Xerox provides independent facilitation and form submission assistance.",
    faqs: [
      {
            "question": "Can I apply for replacement if I don't remember my EPIC number?",
            "answer": "Yes, we can search the electoral roll using your name, father's name, age, and constituency to retrieve your voter details."
      }
],
    relatedSlugs: ["pan-card", "aadhaar-services", "ration-card"]
  },
  {
    id: "medical-license-online-application",
    name: "Medical License Online Application",
    slug: "medical-license-online-application",
    category: "License & Professional Services",
    image: "/assets/services/icons/medical-license.svg",
    description: "Medical and drug-related licences are applied for online through the concerned state authority portal. Sameer Xerox provides assistance with form filling, document preparation and online submission.",
    keywords: ["medical license", "drug license", "pharmacy license", "chemist license", "retail drug license", "wholesale drug", "fda", "pharmacist registration"],
    featured: false,
    popular: false,
    department: "Food & Drug Administration (FDA) / State Licensing Authority",
    level: "State",
    about: "Professional documentation and application filing assistance for Retail and Wholesale Drug Licences (Form 20/21) required for medical stores, chemist shops, pharmaceutical distributors, and clinics. We assist with document formatting, pharmacist credentials compilation, shop layout verification, and state FDA online portal submission.",
    whoCanApply: [
      "Qualified D.Pharm / B.Pharm registered pharmacists opening a retail medical store",
      "Commercial entrepreneurs starting wholesale pharmaceutical distribution businesses",
      "Hospital and clinic managers establishing in-house pharmacy counters"
],
    requiredDocuments: [
      "Aadhaar Card and PAN Card of applicant/partners",
      "Qualification Certificates and State Pharmacy Council Registration of Registered Pharmacist",
      "Premises Ownership Proof or Registered Rent Agreement with NOC",
      "Site Plan and Layout Plan of the pharmacy premises showing minimum carpet area and refrigerator setup",
      "Refrigerator purchase invoice and inspection compliance declaration",
      "Passport Size Photographs of proprietor and registered pharmacist"
],
    processSteps: [
      {
            "title": "Licence Category Classification",
            "desc": "Confirming retail (Form 20/21) or wholesale (Form 20B/21B) licence prerequisites."
      },
      {
            "title": "Pharmacist & Premises Dossier",
            "desc": "Compiling pharmacist appointment affidavit, council registration, and blueprint layout."
      },
      {
            "title": "State FDA Portal Submission",
            "desc": "Accurate online data entry, document scanning, and statutory government fee payment."
      },
      {
            "title": "Drug Inspector Inspection Assistance",
            "desc": "Guidance for on-site physical inspection by the Drug Inspector."
      },
      {
            "title": "Licence Grant Download",
            "desc": "Downloading digitally signed valid drug licence upon competent authority approval."
      }
],
    importantInfo: "Requirements vary according to licence category and are decided solely by the concerned licensing authority. Sameer Xerox provides document preparation and online submission assistance. We do NOT guarantee or promise licence approval, which is subject to official inspection.",
    faqs: [
      {
            "question": "What is the minimum carpet area required for a retail medical store?",
            "answer": "Generally, state FDA regulations mandate a minimum of 10 square meters for retail drug licence and 15 square meters for combined retail and wholesale, along with mandatory cold-chain refrigeration."
      }
],
    relatedSlugs: ["shop-act-gumasta", "rent-agreement", "fssai-basic"]
  },
  {
    id: "pwd-contractor-license",
    name: "PWD Contractor License",
    slug: "pwd-contractor-license",
    category: "Business & Registration",
    image: "/assets/services/icons/pwd-contractor.svg",
    description: "Assistance with Public Works Department contractor registration, online application and document compilation for eligible contractors.",
    keywords: ["pwd contractor", "contractor license", "pwd registration", "civil contractor", "government tender", "solvency certificate", "pwd class registration"],
    featured: false,
    popular: false,
    department: "Public Works Department (PWD) / State Government Authority",
    level: "State",
    about: "End-to-end documentation, financial compilation, and portal submission assistance for civil contractors, electrical contractors, and engineering firms seeking official PWD Contractor Registration across various categories (Class I to Class IX). Valid registration qualifies contractors to participate in government infrastructure tenders.",
    whoCanApply: [
      "Civil engineers, diploma holders, and experienced construction contractors",
      "Electrical contractors with supervisor permits seeking public works contracts",
      "Proprietorships, partnerships, and private limited infrastructure firms"
],
    requiredDocuments: [
      "Aadhaar Card and PAN Card of Contractor / Partners / Directors",
      "GST Registration Certificate",
      "Bank Solvency Certificate from a Nationalized or Scheduled Bank",
      "Experience / Work Completion Certificates and past project performance reports (where applicable)",
      "List of tools, machinery, and technical staff / registered engineers",
      "Income Tax Returns (ITR) for the past 3 consecutive years with computation sheets",
      "Passport Size Photographs"
],
    processSteps: [
      {
            "title": "Class & Category Confirmation",
            "desc": "Confirming applicable contractor class based on net worth, solvency, and experience criteria."
      },
      {
            "title": "Financial & Technical File Compilation",
            "desc": "Structuring solvency certificates, machinery affidavits, and ITR schedules at Sameer Xerox."
      },
      {
            "title": "PWD Online Portal Filing",
            "desc": "Uploading certified documentation and paying mandated government registration fees."
      },
      {
            "title": "Original Verification Attendance",
            "desc": "Guiding applicant for verification of original credentials at the Executive Engineer's office."
      },
      {
            "title": "Certificate Issuance",
            "desc": "Receiving the official PWD Contractor Registration booklet or certificate."
      }
],
    importantInfo: "Eligibility, contractor class, statutory fees, and final approval are determined exclusively by the concerned PWD authority. Sameer Xerox assists with online filing and file compilation. We do NOT guarantee registration approval or tender eligibility.",
    faqs: [
      {
            "question": "Can unemployed diploma or graduate engineers get concessions in PWD registration?",
            "answer": "Yes, many state PWD guidelines provide direct registration concessions and solvency fee waivers for qualified unemployed engineers."
      }
],
    relatedSlugs: ["udyam-msme", "shop-act-gumasta", "rent-agreement"]
  },
  {
    id: "pm-kisan-samman-nidhi",
    name: "PM Kisan Samman Nidhi",
    slug: "pm-kisan-samman-nidhi",
    category: "Government Schemes",
    image: "/assets/services/icons/pm-kisan.svg",
    description: "Assistance with PM Kisan-related online services including new registration, Aadhaar-based e-KYC, corrections, beneficiary status and installment status checking.",
    keywords: ["PM Kisan", "pmkisan", "farmer", "kisan samman nidhi", "ekyc", "7/12 extract", "farmer scheme", "installment status", "dbt farmer"],
    featured: false,
    popular: true,
    department: "Ministry of Agriculture & Farmers Welfare / PM-Kisan Portal",
    level: "Central",
    about: "Comprehensive digital facilitation for Pradhan Mantri Kisan Samman Nidhi (PM-KISAN), which provides \u20b96,000 annually in three equal installments to eligible farmer families. We assist with new farmer registration, mandatory biometric/OTP e-KYC, bank account Aadhaar seeding status, land details updating, correction of misspelled names, and installment status tracking.",
    whoCanApply: [
      "Eligible landholding farmer families with cultivable land parcels according to scheme guidelines",
      "Farmers with Aadhaar-linked and DBT-enabled bank accounts",
      "Applicants satisfying the official exclusion criteria (non-institutional landholders)"
],
    requiredDocuments: [
      "Aadhaar Card of the farmer applicant",
      "Land Ownership Records such as 7/12 (Satbara) Extract, 8-A Extract, or Khatauni Record",
      "Aadhaar-linked Bank Passbook / Account statement",
      "Active Mobile Number linked with Aadhaar for OTP verification"
],
    processSteps: [
      {
            "title": "Eligibility & Status Check",
            "desc": "Checking existing beneficiary status and Aadhaar-bank mapping on the official portal."
      },
      {
            "title": "New Registration / Details Update",
            "desc": "Entering applicant demographic data, village code, and land survey numbers."
      },
      {
            "title": "Mandatory Aadhaar e-KYC",
            "desc": "Completing biometric fingerprint scan or OTP e-KYC at Sameer Xerox."
      },
      {
            "title": "Land Record Verification Submission",
            "desc": "Submitting 7/12 extracts for Patwari / Agriculture Officer digital verification."
      },
      {
            "title": "Installment Status Tracking",
            "desc": "Monitoring DBT disbursement and resolving FTO or bank account rejection queries."
      }
],
    importantInfo: "Final approval, land verification, and installment releases are determined solely by the concerned revenue and agriculture departments. Sameer Xerox provides independent digital facilitation and application assistance.",
    faqs: [
      {
            "question": "Why is PM-Kisan installment stopped for some farmers?",
            "answer": "Installments are commonly delayed due to incomplete Aadhaar e-KYC, land record non-seeding, or unmapped bank DBT. We can diagnose and resolve these queries at Sameer Xerox."
      }
],
    relatedSlugs: ["ration-card", "aeps-aadhaar-withdrawal", "bank-account-opening"]
  },
  {
    id: "ews-certificate",
    name: "EWS Certificate",
    slug: "ews-certificate",
    category: "Certificates",
    image: "/assets/services/icons/ews-certificate.svg",
    description: "Assistance with applying for an Economically Weaker Section certificate used for eligible reservation benefits in education and employment.",
    keywords: ["ews", "ews certificate", "economically weaker section", "income certificate", "reservation", "10 percent quota", "revenue department", "tahsildar"],
    featured: false,
    popular: true,
    department: "Revenue Department / Sub-Divisional Magistrate (SDM) / Tehsildar",
    level: "State",
    about: "Application filing and document preparation assistance for Economically Weaker Section (EWS) Certificate, which entitles eligible general category citizens to 10% reservation benefits in higher education admissions and central/state government recruitment. We assist with income affidavits, asset compilation, and state citizen services portal filing.",
    whoCanApply: [
      "General category citizens not covered under SC, ST, or OBC reservation schemes",
      "Applicants satisfying the designated annual family income criteria (typically below \u20b98 Lakhs)",
      "Applicants fulfilling mandated residential property and agricultural land asset limits"
],
    requiredDocuments: [
      "Aadhaar Card of applicant and parents",
      "Valid Income Certificate issued by the competent authority or Form 16 / ITR",
      "Ration Card copy or family extract",
      "Land holding records (7/12 extract) or residential property documents (where applicable)",
      "Self-Declaration Affidavit executed on stamp paper",
      "Passport Size Photograph"
],
    processSteps: [
      {
            "title": "Eligibility Assessment",
            "desc": "Verifying annual gross family income and land/property ceiling criteria."
      },
      {
            "title": "Affidavit & File Collation",
            "desc": "Drafting the standard self-declaration affidavit and organizing family proof documents."
      },
      {
            "title": "Portal Application Entry",
            "desc": "Uploading certified proofs and submitting application via the state citizen services portal."
      },
      {
            "title": "Fee Payment & Acknowledgment",
            "desc": "Paying government application fees and securing application tracking token."
      },
      {
            "title": "Certificate Download",
            "desc": "Downloading the digitally signed valid EWS Certificate upon Tahsildar approval."
      }
],
    importantInfo: "Eligibility thresholds and certificate issuance are determined strictly by the competent government authority. Contact Sameer Xerox for current documentation guidance and timely filing before academic admissions.",
    faqs: [
      {
            "question": "How long is an EWS Certificate valid?",
            "answer": "An EWS Certificate is generally valid for one financial year from the date of issuance."
      }
],
    relatedSlugs: ["caste-validity", "first-year-scholarship", "second-year-scholarship"]
  },
  {
    id: "first-year-scholarship",
    name: "First Year Scholarship",
    slug: "first-year-scholarship",
    category: "Scholarships",
    image: "/assets/services/icons/scholarship.svg",
    description: "Scholarship application assistance for first-year college students.",
    keywords: ["scholarship", "first year scholarship", "degree scholarship", "college scholarship", "mahadbt", "nsp", "post matric scholarship", "fresh scholarship", "fee reimbursement"],
    featured: false,
    popular: true,
    department: "Social Justice / Tribal / Higher Education Department & National Scholarship Portal (NSP)",
    level: "State",
    about: "Dedicated assistance for newly admitted first-year diploma, undergraduate, and professional college students applying for fresh state and central scholarships (including MahaDBT, NSP, and fee reimbursement schemes). We assist with profile creation, document scanning, fee receipt verification, and error-free portal submission.",
    whoCanApply: [
      "Students enrolled in 1st year of college (BA, B.Com, B.Sc, Engineering, Medical, Pharmacy, Polytechnic, etc.)",
      "Students belonging to SC, ST, OBC, VJNT, SBC, EWS, or Minority categories",
      "Students with family income satisfying scheme limits (Income Certificate holder)"
],
    requiredDocuments: [
      "10th and 12th Marksheets / Passing Certificates",
      "College Admission Allotment Letter (CAP Allotment) and Current Year College Fee Receipt",
      "Caste Certificate and Caste Validity Certificate (for reserved category students)",
      "Income Certificate (issued by Tahsildar for the current financial year)",
      "Duly sealed Bonafide Certificate from the college",
      "Aadhaar Card linked with active mobile number",
      "Aadhaar-seeded Bank Passbook in student's own name",
      "Ration Card copy and Domicile Certificate"
],
    processSteps: [
      {
            "title": "Profile Creation",
            "desc": "Setting up verified student account on the state/central scholarship portal with Aadhaar OTP."
      },
      {
            "title": "Scheme & Course Selection",
            "desc": "Carefully mapping university, college code, department, and eligible scheme."
      },
      {
            "title": "Document Upload",
            "desc": "Scanning marksheets, fee receipts, and caste/income documents in mandated size and format."
      },
      {
            "title": "Scrutiny & Application Submit",
            "desc": "Pre-submission audit to eliminate mistakes that trigger college desk rejection."
      },
      {
            "title": "Acknowledgment Printout",
            "desc": "Handover of printed application pack to submit to the college scholarship clerk."
      }
],
    importantInfo: "Aadhaar-Bank account linking (NPCI DBT seeding) is strictly mandatory for receiving direct scholarship credit. Apply well before the government deadlines. Contact Sameer Xerox for application assistance.",
    faqs: [
      {
            "question": "Can I apply for scholarship if my bank account is in my parents' name?",
            "answer": "No, scholarship funds are disbursed via DBT directly into the student's own Aadhaar-linked bank account."
      }
],
    relatedSlugs: ["second-year-scholarship", "third-year-scholarship", "ews-certificate"]
  },
  {
    id: "second-year-scholarship",
    name: "Second Year Scholarship",
    slug: "second-year-scholarship",
    category: "Scholarships",
    image: "/assets/services/icons/scholarship.svg",
    description: "Scholarship renewal and application assistance for second-year students.",
    keywords: ["second year scholarship", "scholarship renewal", "sy scholarship", "college scholarship", "mahadbt renewal", "nsp renewal", "fee reimbursement"],
    featured: false,
    popular: false,
    department: "Higher & Technical Education Department / Welfare Directorates",
    level: "State",
    about: "Renewal and fresh application facilitation for students progressing to their second year of college or polytechnic. We assist with academic progression verification, first-year marksheet collation, fee receipt updating, and scholarship renewal filing.",
    whoCanApply: [
      "Students promoted to 2nd year (3rd & 4th semester) of undergraduate, diploma, or post-graduate degree courses",
      "Existing scholarship recipients seeking continuous renewal benefits",
      "Direct Second Year (DSE) lateral entry admission students"
],
    requiredDocuments: [
      "1st Year College Marksheets (Both Semester 1 and Semester 2 / Annual Marksheet)",
      "2nd Year College Fee Receipt and Bonafide Certificate",
      "Current Financial Year Income Certificate",
      "Aadhaar Card and Bank Passbook copy",
      "Existing Portal Login Credentials (Application ID & Password)"
],
    processSteps: [
      {
            "title": "Credentials Verification",
            "desc": "Retrieving previous year login and reviewing previous year disbursement status."
      },
      {
            "title": "Academic Record Update",
            "desc": "Entering second year admission details, fee breakdown, and 1st year percentage."
      },
      {
            "title": "Income & Fee Proof Upload",
            "desc": "Attaching current year Tahsildar income certificate and genuine fee receipts."
      },
      {
            "title": "Renewal Submission",
            "desc": "Submitting application and generating the printed renewal submission form."
      }
],
    importantInfo: "Ensure all backlogs / ATKT rules comply with your specific scheme requirements. Contact Sameer Xerox for renewal assistance.",
    faqs: [
      {
            "question": "What if I forgot my scholarship portal password from last year?",
            "answer": "Sameer Xerox can assist you in resetting your user credentials via registered mobile OTP or security questions."
      }
],
    relatedSlugs: ["first-year-scholarship", "third-year-scholarship", "bank-account-opening"]
  },
  {
    id: "third-year-scholarship",
    name: "Third Year Scholarship",
    slug: "third-year-scholarship",
    category: "Scholarships",
    image: "/assets/services/icons/scholarship.svg",
    description: "Scholarship renewal and application assistance for third-year students.",
    keywords: ["third year scholarship", "scholarship renewal", "ty scholarship", "final year scholarship", "mahadbt", "nsp", "degree scholarship"],
    featured: false,
    popular: false,
    department: "Higher & Technical Education Department / Directorate of Social Welfare",
    level: "State",
    about: "Seamless renewal filing for third-year degree, engineering, and polytechnic students. We ensure academic marks history, fee receipts, and renewed income documentation are accurately updated to ensure timely government subsidy release.",
    whoCanApply: [
      "Students studying in their 3rd year (5th & 6th semester) of degree or diploma programs",
      "Eligible students continuing government scholarship and freeship schemes"
],
    requiredDocuments: [
      "Previous Year Marksheets (Semester 1, 2, 3, and 4)",
      "3rd Year College Fee Receipt and Bonafide Certificate",
      "Current Income Certificate from Revenue Office",
      "Aadhaar-linked Bank Account details"
],
    processSteps: [
      {
            "title": "Profile Progression",
            "desc": "Updating student profile to Year 3 / Semester 5."
      },
      {
            "title": "Marks & Receipt Upload",
            "desc": "Attaching semester exam marksheets and authentic third-year fee receipts."
      },
      {
            "title": "Renewal Finalization",
            "desc": "Online submission and generating verified acknowledgment receipt."
      }
],
    importantInfo: "Timely renewal prevents disruption of scholarship credit into your bank account. Contact Sameer Xerox for filing support.",
    faqs: [
      {
            "question": "Can engineering students in 4th year also get assistance?",
            "answer": "Yes, we assist students across all academic years including 3rd year, 4th year (final year), and postgraduate courses."
      }
],
    relatedSlugs: ["first-year-scholarship", "second-year-scholarship"]
  },
  {
    id: "11th-scholarship",
    name: "11th Scholarship",
    slug: "11th-scholarship",
    category: "Scholarships",
    image: "/assets/services/icons/scholarship.svg",
    description: "Scholarship application assistance for Class 11 students.",
    keywords: ["11th scholarship", "junior college scholarship", "class 11", "fyjc scholarship", "post matric", "suvarna mahotsav", "mahadbt", "nsp 11th"],
    featured: false,
    popular: false,
    department: "School Education & Sports Department / Social Justice Department",
    level: "State",
    about: "Application assistance for students entering Junior College (Class 11 / FYJC) in Arts, Science, Commerce, and vocational streams. We assist with fresh registration, 10th marksheet verification, income/caste certificate uploads, and bank seeding checks.",
    whoCanApply: [
      "Students admitted to Class 11 (FYJC) in recognized junior colleges or higher secondary schools",
      "Students belonging to reserved or economically backward categories (EBC/SC/ST/OBC/VJNT)"
],
    requiredDocuments: [
      "10th Standard SSC Passing Marksheet and School Leaving Certificate",
      "11th Class Junior College Admission Fee Receipt and Bonafide",
      "Current Year Family Income Certificate",
      "Caste Certificate and Domicile Certificate (where applicable)",
      "Student's Aadhaar Card and Aadhaar-seeded Bank Passbook"
],
    processSteps: [
      {
            "title": "Junior College Registration",
            "desc": "Creating portal student account using student's Aadhaar and 10th seat number."
      },
      {
            "title": "College & Stream Mapping",
            "desc": "Selecting college index number and stream (Science/Commerce/Arts)."
      },
      {
            "title": "Document Scanning & Upload",
            "desc": "Attaching clear scanned copies of original proofs."
      },
      {
            "title": "Application Handover",
            "desc": "Delivering printed application pack for college counter verification."
      }
],
    importantInfo: "Students must have an independent bank account in their own name. Contact Sameer Xerox for complete application guidance.",
    faqs: [
      {
            "question": "Can open-category students get financial assistance in 11th?",
            "answer": "Yes, Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC) provides 50% tuition fee support for eligible open category students with family income under \u20b98 Lakhs."
      }
],
    relatedSlugs: ["12th-scholarship", "first-year-scholarship", "ews-certificate"]
  },
  {
    id: "12th-scholarship",
    name: "12th Scholarship",
    slug: "12th-scholarship",
    category: "Scholarships",
    image: "/assets/services/icons/scholarship.svg",
    description: "Scholarship application and renewal assistance for Class 12 students.",
    keywords: ["12th scholarship", "class 12 scholarship", "hsc scholarship", "syjc scholarship", "scholarship renewal 12th", "junior college", "mahadbt 12th"],
    featured: false,
    popular: false,
    department: "School Education & Sports Department / Social Welfare Directorate",
    level: "State",
    about: "Renewal and fresh application assistance for Class 12 (HSC / SYJC) junior college students across Science, Commerce, and Arts streams. We help ensure uninterrupted scholarship disbursement during the critical board exam academic year.",
    whoCanApply: [
      "Students currently studying in Class 12 (HSC / SYJC)",
      "Students renewing their 11th grade scholarship or filing fresh applications"
],
    requiredDocuments: [
      "11th Class Passing Marksheet / Result",
      "12th Class Admission Fee Receipt and Junior College Bonafide",
      "Current Valid Family Income Certificate",
      "Student Aadhaar Card and Bank Account details"
],
    processSteps: [
      {
            "title": "Login & Academic Update",
            "desc": "Logging into existing scholarship profile and entering 11th marks."
      },
      {
            "title": "Fee Receipt & Certificate Upload",
            "desc": "Uploading updated fee proof and current income certificate."
      },
      {
            "title": "Verification & Submit",
            "desc": "Final review and submission with printed application receipt."
      }
],
    importantInfo: "Submit before junior college board exam forms close. Contact Sameer Xerox for immediate assistance.",
    faqs: [
      {
            "question": "What should I do if my bank account changed in 12th?",
            "answer": "We can update your new bank details on the scholarship portal and verify NPCI DBT mapping."
      }
],
    relatedSlugs: ["11th-scholarship", "first-year-scholarship"]
  },
  {
    id: "xerox-photocopy",
    name: "Xerox / Photocopy",
    slug: "xerox-photocopy",
    category: "Xerox & Digital Services",
    image: "/assets/services/icons/xerox.svg",
    description: "High-quality photocopy and document duplication service.",
    keywords: ["xerox", "photocopy", "xerox shop", "document copy", "duplication", "black and white xerox", "jumbo xerox", "sameer xerox"],
    featured: false,
    popular: true,
    department: "Sameer Xerox On-Premises Service",
    level: "Commercial / Digital",
    about: "Crisp, high-speed, and crystal-clear black-and-white and grayscale photocopying service for documents, ID cards, legal agreements, educational books, exam papers, and office records. We utilize professional commercial digital copiers ensuring superior contrast and smudge-free paper finishes.",
    whoCanApply: [
      "Students, professionals, advocates, business owners, and general public requiring document copies",
      "Citizens needing bulk duplication of notes, forms, or legal files"
],
    requiredDocuments: [
      "Original physical document, book, marksheet, or ID card to be photocopied",
      "Or digital file via WhatsApp / Bluetooth / Pen Drive for immediate print duplication"
],
    processSteps: [
      {
            "title": "Document Inspection",
            "desc": "Reviewing page count, double-sided (duplex) requirements, and paper weight."
      },
      {
            "title": "Digital Machine Scanning",
            "desc": "High-resolution digital optical scanning at up to 1200 DPI."
      },
      {
            "title": "Precision Printing",
            "desc": "Clean duplication on 75 GSM to 100 GSM premium brightness paper."
      },
      {
            "title": "Collating & Finishing",
            "desc": "Neat collation, stapling, or hole-punching for ready file storage."
      }
],
    importantInfo: "Volume discounts available for bulk college study material and legal documentation files. Visit Sameer Xerox for fast turnaround.",
    faqs: [
      {
            "question": "Do you offer both single-sided and back-to-back (duplex) xerox?",
            "answer": "Yes, automated duplex copying is supported at high speed."
      }
],
    relatedSlugs: ["color-print", "bw-print", "lamination", "scanning"]
  },
  {
    id: "color-print",
    name: "Color Print",
    slug: "color-print",
    category: "Xerox & Digital Services",
    image: "/assets/services/icons/color-print.svg",
    description: "Color printing for documents, forms, certificates, photos and business materials.",
    keywords: ["color print", "colour print", "laser color print", "certificate printing", "presentation print", "color document", "project report"],
    featured: false,
    popular: true,
    department: "Sameer Xerox On-Premises Service",
    level: "Commercial / Digital",
    about: "Vibrant, high-resolution laser and inkjet color printing for certificates, college project reports, brochures, identity proofs, charts, and official presentations on plain, glossy, and cardstock paper.",
    whoCanApply: [
      "Students submitting academic project reports and presentations",
      "Citizens printing digital government certificates with official color seals",
      "Businesses creating flyers, product sheets, and proposals"
],
    requiredDocuments: [
      "Digital file in PDF, JPG, PNG, DOCX, or PPT format",
      "Sent via WhatsApp, Email, or brought on a USB Flash Drive"
],
    processSteps: [
      {
            "title": "File Receiving & Preview",
            "desc": "Checking margins, page orientation, and color profile compatibility."
      },
      {
            "title": "Paper Selection",
            "desc": "Choosing appropriate paper weight: Standard 80 GSM, Heavyweight 120 GSM, or Glossy photo card."
      },
      {
            "title": "High-Res Color Printing",
            "desc": "Precision commercial multi-color laser printing."
      },
      {
            "title": "Inspection & Delivery",
            "desc": "Quality inspection for sharp text and rich, accurate color reproduction."
      }
],
    importantInfo: "PDF format is recommended for preserving exact margins and fonts across all operating systems.",
    faqs: [
      {
            "question": "Can I print directly from my phone via WhatsApp?",
            "answer": "Yes! Simply send your file to our WhatsApp number (+91 86258 20706) and collect your printout immediately."
      }
],
    relatedSlugs: ["bw-print", "photo-printing", "document-printing"]
  },
  {
    id: "bw-print",
    name: "B/W Print",
    slug: "bw-print",
    category: "Xerox & Digital Services",
    image: "/assets/services/icons/bw-print.svg",
    description: "Black and white printing for forms, documents, applications and study material.",
    keywords: ["bw print", "black and white print", "printout", "exam admit card", "application form print", "online receipt print"],
    featured: false,
    popular: false,
    department: "Sameer Xerox On-Premises Service",
    level: "Commercial / Digital",
    about: "High-speed black-and-white laser printing for examination hall tickets, online application forms, flight/railway tickets, bank receipts, resume CVs, and extensive study materials.",
    whoCanApply: [
      "Anyone needing quick, economical printouts of digital documents and receipts"
],
    requiredDocuments: [
      "File in PDF, Word, Image format via WhatsApp, Email, or USB drive"
],
    processSteps: [
      {
            "title": "File Submission",
            "desc": "Send file via WhatsApp (+91 86258 20706) or connect via USB."
      },
      {
            "title": "Instant Laser Printing",
            "desc": "Crisp black text laser printing at 45 pages per minute."
      },
      {
            "title": "Handover",
            "desc": "Immediate collection with optional stapling."
      }
],
    importantInfo: "Super-fast counter service with no minimum page limit.",
    faqs: [
      {
            "question": "Can I print my admit card / hall ticket here?",
            "answer": "Yes, we can download and print your hall tickets directly from government and examination portals."
      }
],
    relatedSlugs: ["xerox-photocopy", "color-print", "document-printing"]
  },
  {
    id: "photo-printing",
    name: "Photo Printing",
    slug: "photo-printing",
    category: "Xerox & Digital Services",
    image: "/assets/services/icons/photo-printing.svg",
    description: "Photo printing assistance for personal, official and document requirements.",
    keywords: ["photo printing", "glossy photo", "photo print", "family photo", "id photo", "picture print", "matte finish photo"],
    featured: false,
    popular: false,
    department: "Sameer Xerox On-Premises Service",
    level: "Commercial / Digital",
    about: "High-grade photographic printing on premium glossy and matte photo paper. Ideal for framing, family keepsakes, portfolio submissions, and official ID requirements with rich color depth and fade resistance.",
    whoCanApply: [
      "Individuals preserving memories and family photographs",
      "Students and job seekers needing official photo prints"
],
    requiredDocuments: [
      "High-resolution digital image file (JPG, PNG, TIFF)"
],
    processSteps: [
      {
            "title": "Photo Enhancement",
            "desc": "Basic contrast, lighting, and border framing adjustment."
      },
      {
            "title": "Photo Paper Printing",
            "desc": "Printed on 240+ GSM premium photo paper with specialized archival dye inks."
      },
      {
            "title": "Trimming",
            "desc": "Precision guillotine border cutting to desired dimension (4x6, 5x7, A4)."
      }
],
    importantInfo: "For the best print clarity, provide original high-resolution camera images rather than compressed social media screenshots.",
    faqs: [
      {
            "question": "What sizes of photo prints are available?",
            "answer": "We print standard 4x6 inch (post card), 5x7, 6x8, 8x10, and full A4 size photo sheets."
      }
],
    relatedSlugs: ["passport-size-photos", "color-print"]
  },
  {
    id: "passport-size-photos",
    name: "Passport Size Photos",
    slug: "passport-size-photos",
    category: "Xerox & Digital Services",
    image: "/assets/services/icons/passport-photos.svg",
    description: "Passport-size photo preparation and printing for applications and official documents.",
    keywords: ["passport size photo", "passport photo", "id photo", "stamp size photo", "urgent photo", "visa photo", "admit card photo"],
    featured: false,
    popular: true,
    department: "Sameer Xerox On-Premises Service",
    level: "Commercial / Digital",
    about: "Instant urgent passport-size and stamp-size photo creation, background replacement (white/blue/light grey as mandated by authorities), border cutting, and high-definition photo printing in just 5 minutes. Formats comply with Indian Passport, PAN card, Driving License, Police Verification, Visa, and Competitive Exam norms.",
    whoCanApply: [
      "Government job applicants, students filling university forms, and exam candidates",
      "Citizens applying for Passport, Visa, PAN Card, Driving License, or Bank Accounts"
],
    requiredDocuments: [
      "Digital photo on phone or instant digital capture at our center"
],
    processSteps: [
      {
            "title": "Image Sizing & Background Setup",
            "desc": "Cropping to exact 35mm x 45mm dimensions and setting official white or neutral background."
      },
      {
            "title": "Sheet Layout Generation",
            "desc": "Arranging sheets of 8, 16, or 32 photos on high-gloss photographic paper."
      },
      {
            "title": "Thermal Printing & Cutting",
            "desc": "Printing on smudge-proof photo paper and precision cutting."
      }
],
    importantInfo: "Ready in 5 minutes! Soft copies can also be formatted and emailed or sent to your WhatsApp for online exam portal uploads.",
    faqs: [
      {
            "question": "Can you change the background color of my existing photo to white for passport use?",
            "answer": "Yes, we professionally remove distracting backgrounds and replace them with standard plain white or blue backgrounds required for government forms."
      }
],
    relatedSlugs: ["passport-seva", "pan-card", "photo-printing"]
  },
  {
    id: "document-lamination",
    name: "Lamination",
    slug: "lamination",
    category: "Xerox & Digital Services",
    image: "/assets/services/icons/lamination.svg",
    description: "Document lamination for improved protection and durability.",
    keywords: ["lamination", "document lamination", "pouch lamination", "certificate lamination", "id card lamination", "waterproof document", "marksheet lamination"],
    featured: false,
    popular: false,
    department: "Sameer Xerox On-Premises Service",
    level: "Commercial / Digital",
    about: "Thermal pouch lamination for marksheets, birth certificates, degree certificates, PAN cards, property papers, and legal agreements. Protects invaluable records against moisture, tearing, insect damage, spills, and atmospheric degradation.",
    whoCanApply: [
      "Anyone holding essential paper documents needing long-term protection"
],
    requiredDocuments: [
      "Original paper document, card, or certificate to be laminated"
],
    processSteps: [
      {
            "title": "Dust & Alignment Check",
            "desc": "Cleaning document surface and centering in heavy-gauge 125 to 250 micron thermal pouch."
      },
      {
            "title": "Thermal Roller Sealing",
            "desc": "Passing through calibrated temperature-controlled silicone heating rollers."
      },
      {
            "title": "Cooling & Edge Trimming",
            "desc": "Flat cooling and rounded safety edge trimming for permanent waterproof seal."
      }
],
    importantInfo: "We utilize premium high-clarity pouches that do not cloud or bubble over time.",
    faqs: [
      {
            "question": "Which sizes can you laminate?",
            "answer": "We support all sizes from small ID card / PAN size, Aadhaar card size, up to A4, Legal, and A3 document sheets."
      }
],
    relatedSlugs: ["xerox-photocopy", "document-printing", "rent-agreement"]
  },
  {
    id: "document-scanning",
    name: "Scanning",
    slug: "scanning",
    category: "Xerox & Digital Services",
    image: "/assets/services/icons/scanning.svg",
    description: "High-quality document scanning and digital file conversion.",
    keywords: ["scanning", "document scanning", "scan to pdf", "photo scan", "scanner", "digital conversion", "ocr scan", "high resolution scan"],
    featured: false,
    popular: false,
    department: "Sameer Xerox On-Premises Service",
    level: "Commercial / Digital",
    about: "High-resolution flatbed and sheetfed scanning converting physical paper documents, photographs, land records, and books into pristine digital PDF, JPG, and PNG files. Ideal for digital archiving, email submissions, and portal uploads.",
    whoCanApply: [
      "Citizens submitting online government application forms",
      "Professionals and students archiving certificates and project documents"
],
    requiredDocuments: [
      "Physical documents, receipts, marksheets, or certificates to be scanned"
],
    processSteps: [
      {
            "title": "Optical Scanning",
            "desc": "High-resolution optical scan at 300 to 600 DPI."
      },
      {
            "title": "De-Skew & Optimization",
            "desc": "Auto-straightening, margin crop, and contrast optimization for readability."
      },
      {
            "title": "Digital File Delivery",
            "desc": "Direct transfer of organized PDF or JPG files to your WhatsApp, Email, or Pen Drive."
      }
],
    importantInfo: "Multi-page documents can be compiled into a single organized PDF file with optimized size for portal upload.",
    faqs: [
      {
            "question": "Can you scan multiple pages into one single PDF file?",
            "answer": "Yes, we can combine any number of pages into a single sequential PDF document."
      }
],
    relatedSlugs: ["pdf-creation", "pdf-editing-compression", "document-upload-assistance"]
  },
  {
    id: "pdf-creation",
    name: "PDF Creation",
    slug: "pdf-creation",
    category: "Xerox & Digital Services",
    image: "/assets/services/icons/pdf-creation.svg",
    description: "Convert scanned documents and images into organized PDF files.",
    keywords: ["pdf creation", "make pdf", "images to pdf", "convert to pdf", "doc to pdf", "combine pdf", "scan to pdf", "single pdf"],
    featured: false,
    popular: false,
    department: "Sameer Xerox On-Premises Service",
    level: "Commercial / Digital",
    about: "Convert multi-page paper documents, photos, certificates, and digital images into organized, standardized PDF documents ready for official submissions, bank emails, and portal uploads.",
    whoCanApply: [
      "Citizens and students needing combined PDF files for online form attachments"
],
    requiredDocuments: [
      "Physical documents to scan or digital image files on phone/USB"
],
    processSteps: [
      {
            "title": "Asset Organization",
            "desc": "Arranging pages and documents in required chronological order."
      },
      {
            "title": "PDF Conversion",
            "desc": "Converting into high-compatibility searchable PDF format."
      },
      {
            "title": "Delivery",
            "desc": "Instant transfer to WhatsApp or Email."
      }
],
    importantInfo: "Complies with standard ISO PDF specifications accepted across all Indian government and university web portals.",
    faqs: [
      {
            "question": "Can you merge my Aadhaar front and back onto one page in a PDF?",
            "answer": "Yes, we frequently arrange dual-sided ID cards onto a single clear page as requested by application portals."
      }
],
    relatedSlugs: ["scanning", "pdf-editing-compression", "document-upload-assistance"]
  },
  {
    id: "pdf-editing-compression",
    name: "PDF Editing / Compression",
    slug: "pdf-editing-compression",
    category: "Xerox & Digital Services",
    image: "/assets/services/icons/pdf-edit.svg",
    description: "Basic PDF editing, merging, splitting and file-size compression assistance.",
    keywords: ["pdf editing", "pdf compression", "reduce pdf size", "compress pdf", "merge pdf", "split pdf", "under 100kb", "under 200kb", "pdf size reducer"],
    featured: false,
    popular: false,
    department: "Sameer Xerox On-Premises Service",
    level: "Commercial / Digital",
    about: "Assistance with basic PDF document operations commonly mandated by government and exam portals, including file size compression (e.g. reducing files below 100KB, 200KB, or 500KB without compromising readability), merging multiple files, splitting specific pages, and reorienting rotated sheets.",
    whoCanApply: [
      "Applicants whose document uploads fail due to file size limits on government portals",
      "Students and job seekers needing to combine marksheets into a single file under a strict KB limit"
],
    requiredDocuments: [
      "Digital PDF file needing reduction, page extraction, or merging"
],
    processSteps: [
      {
            "title": "Limit Review",
            "desc": "Checking portal file size criteria (e.g. 'Must be between 50KB and 200KB')."
      },
      {
            "title": "Smart Compression / Edit",
            "desc": "Applying calibrated DPI downsampling and artifact reduction."
      },
      {
            "title": "Quality Check & Transfer",
            "desc": "Verifying that text and signatures remain sharp before delivery."
      }
],
    importantInfo: "We provide practical file preparation assistance to ensure smooth portal acceptance. We do NOT alter certified document text or contents.",
    faqs: [
      {
            "question": "Why does the government website say 'File size must be under 100 KB'?",
            "answer": "Portals have strict server upload limits. We compress your PDF to meet the exact KB limit while keeping your text and photo clearly legible."
      }
],
    relatedSlugs: ["pdf-creation", "scanning", "document-upload-assistance"]
  },
  {
    id: "document-upload-assistance",
    name: "Document Upload Assistance",
    slug: "document-upload-assistance",
    category: "Xerox & Digital Services",
    image: "/assets/services/icons/document-upload.svg",
    description: "Assistance with uploading documents to online government, education, banking and other portals.",
    keywords: ["document upload", "upload help", "portal upload", "exam form upload", "photo signature upload", "form filling upload"],
    featured: false,
    popular: false,
    department: "Sameer Xerox Facilitation Desk",
    level: "Commercial / Digital",
    about: "Hands-on technical assistance for citizens who face upload errors, format mismatches, dimension issues, or session timeouts while attempting to upload documents, photos, and signatures on state, national, university, banking, or employment portals.",
    whoCanApply: [
      "Citizens finding it difficult to upload documents on mobile phones or home computers",
      "Candidates facing portal errors during competitive exam or admission submissions"
],
    requiredDocuments: [
      "Portal login credentials (URL, application ID, password)",
      "Original physical documents or digital files to be uploaded"
],
    processSteps: [
      {
            "title": "Portal Requirement Audit",
            "desc": "Checking required file format (PDF, JPG), dimension (px), and file size (KB)."
      },
      {
            "title": "Pre-Upload File Preparation",
            "desc": "Resizing photo, signature, and documents to meet portal specifications."
      },
      {
            "title": "Secure Portal Upload",
            "desc": "Uploading files via high-speed internet terminal and verifying preview."
      },
      {
            "title": "Confirmation Handover",
            "desc": "Submitting and printing confirmation receipt."
      }
],
    importantInfo: "Our operators provide technical facilitation with full citizen privacy and data security. Contact Sameer Xerox for assistance.",
    faqs: [
      {
            "question": "Can you help resize my photo and signature for online exam applications?",
            "answer": "Yes, we crop and resize photos and signatures to exact pixel and KB dimensions mandated by UPSC, MPSC, SSC, IBPS, and state portals."
      }
],
    relatedSlugs: ["pdf-editing-compression", "scanning", "xerox-photocopy"]
  },
  {
    id: "affidavit",
    name: "Affidavit",
    slug: "affidavit",
    category: "Document & Legal Assistance",
    image: "/assets/services/icons/affidavit.svg",
    description: "Assistance with document preparation and online/offline process guidance as applicable.",
    keywords: ["affidavit", "stamp paper affidavit", "legal affidavit", "name change affidavit", "income affidavit", "gap certificate affidavit", "notary affidavit"],
    featured: false,
    popular: false,
    department: "Legal Drafting / Department of Registration & Stamps",
    level: "State",
    about: "Assistance with drafting, formatting, e-stamp procurement, and notary execution of various legal affidavits including Name Change Affidavits, Educational Gap Affidavits, Income & Asset Declarations, Lost Document Affidavits, Address Affidavits, and Family Genealogical Tree Affidavits.",
    whoCanApply: [
      "Students needing Gap Affidavits for college and university admissions",
      "Citizens swearing legal declarations for government authorities, banks, or courts",
      "Individuals executing change of name declarations"
],
    requiredDocuments: [
      "Aadhaar Card and PAN Card of deponent (person swearing affidavit)",
      "Passport size photo of deponent",
      "Specific details and supporting evidence relevant to the affidavit statement"
],
    processSteps: [
      {
            "title": "Drafting Consultation",
            "desc": "Selecting the standard legal affidavit format based on your intended authority."
      },
      {
            "title": "Legal Content Formatting",
            "desc": "Drafting accurate clauses with deponent details and verification statements."
      },
      {
            "title": "e-Stamp Procurement",
            "desc": "Printing on authorized non-judicial government stamp paper."
      },
      {
            "title": "Execution & Notary Attestation",
            "desc": "Signing before an authorized notary public with official stamp and seal."
      }
],
    importantInfo: "Applicable stamp duty values and notary requirements vary by state regulations and purpose. Contact Sameer Xerox for drafting support.",
    faqs: [
      {
            "question": "What is an Educational Gap Certificate / Affidavit?",
            "answer": "If you had a break of one or more years between your studies, colleges require an affidavit on stamp paper explaining the reason for the academic gap."
      }
],
    relatedSlugs: ["notary-assistance", "rent-agreement", "gazette-name-change"]
  },
  {
    id: "notary-assistance",
    name: "Notary Assistance",
    slug: "notary-assistance",
    category: "Document & Legal Assistance",
    image: "/assets/services/icons/notary.svg",
    description: "Assistance with document preparation and notary-related requirements.",
    keywords: ["notary", "notary assistance", "notarized document", "attestation", "notary public", "stamp paper notary", "legal attestation"],
    featured: false,
    popular: false,
    department: "Notary Facilitation Desk",
    level: "Commercial / Digital",
    about: "Document collation, verification, drafting, and notary facilitation for agreements, affidavits, declarations, powers of attorney, and self-attested copies required for official, judicial, banking, and academic proceedings.",
    whoCanApply: [
      "Citizens requiring notarized affidavits, rent agreements, or document copies",
      "Business owners submitting attested partnership deeds or resolutions",
      "Property buyers executing notarized indemnity bonds"
],
    requiredDocuments: [
      "Original draft document / agreement to be notarized",
      "Original identity proof (Aadhaar Card, Passport, or Voter ID) of signing parties",
      "Original supporting documents for verification"
],
    processSteps: [
      {
            "title": "Document Review",
            "desc": "Inspecting document completeness, correct stamp duty value, and signing spaces."
      },
      {
            "title": "Identity Verification",
            "desc": "Verifying signatory identities against government photo ID proofs."
      },
      {
            "title": "Signature & Thumb Impression",
            "desc": "Recording signatures and thumb impressions in presence of Notary Public."
      },
      {
            "title": "Notary Seal & Register Entry",
            "desc": "Affixing notary stamp, official seal, and noting entry in the Notary Register."
      }
],
    importantInfo: "Physical presence of signatories with valid government identity proofs is mandatory for notarization. Contact Sameer Xerox for scheduling.",
    faqs: [
      {
            "question": "What does a Notary Public verify?",
            "answer": "A Notary verifies the identity of the person signing the document and ensures that the execution was done voluntarily under oath."
      }
],
    relatedSlugs: ["affidavit", "rent-agreement", "document-printing"]
  },
  {
    id: "document-printing",
    name: "Document Printing",
    slug: "document-printing",
    category: "Document & Legal Assistance",
    image: "/assets/services/icons/document-print.svg",
    description: "Printing assistance for official documents, forms, applications and other files.",
    keywords: ["document printing", "official print", "legal paper print", "green paper print", "stamp paper printing", "contract printing", "agreement print"],
    featured: false,
    popular: false,
    department: "Sameer Xerox On-Premises Service",
    level: "Commercial / Digital",
    about: "Specialized printing for official documents, legal drafts, contracts, deeds, court submissions, e-stamp papers, green ledger papers, and government application dossiers. Ensuring crisp typography, exact margin alignment, and legal document durability.",
    whoCanApply: [
      "Advocates, legal advisors, business owners, and citizens filing official paperwork"
],
    requiredDocuments: [
      "Document file in PDF or Word format via WhatsApp, Email, or USB"
],
    processSteps: [
      {
            "title": "Media & Alignment Setup",
            "desc": "Configuring page margins to match legal, stamp paper, or ledger specifications."
      },
      {
            "title": "Laser Output",
            "desc": "High-resolution 1200 DPI archival laser printing."
      },
      {
            "title": "Finishing Pack",
            "desc": "Neat collation, protective covers, or binding ready for official submission."
      }
],
    importantInfo: "We stock authentic legal size paper, green ledger paper, and heavyweight bond sheets for contract printing.",
    faqs: [
      {
            "question": "Can you print directly onto government e-Stamp paper?",
            "answer": "Yes, we precisely align agreement text onto the designated area below the e-Stamp certificate header."
      }
],
    relatedSlugs: ["rent-agreement", "affidavit", "xerox-photocopy"]
  },
  {
    id: "bank-loan-services",
    name: "Bank Loan Facilitation",
    slug: "bank-loan-services",
    category: "Banking & AEPS",
    image: "/services/bank-loan-services.jpg",
    description: "Assistance with Home Loans, Business Loans, Personal Loans, and Vehicle Loans.",
    keywords: ["Loan", "Home Loan", "Business Loan", "Personal Loan", "Car Loan", "Bank Loan", "कर्ज सुविधा"],
    featured: true,
    popular: true,
    department: "Nationalized & Private Banks / Financial Institutions",
    level: "Commercial / Digital",
    about: "Sameer Xerox provides complete documentation and liaison assistance for all types of bank loans including Home Loans (गृहकर्ज), Business Loans (व्यवसाय कर्ज), Personal Loans (वैयक्तिक कर्ज), and Vehicle Loans (वाहन कर्ज). We help customers prepare income papers, project reports, and file processing for swift bank approvals.",
    whoCanApply: [
      "Salaried individuals and government employees needing personal or home loans",
      "Business owners, shopkeepers, and MSME proprietors requiring business expansion capital",
      "Individuals purchasing two-wheelers, cars, tractors, or commercial transport vehicles"
    ],
    requiredDocuments: [
      "Aadhaar Card and PAN Card of borrower and co-applicant",
      "Last 6 months bank statement showing regular transactions",
      "Income proof (ITR returns for 2-3 years, salary slips, or Form 16)",
      "Property / collateral papers, shop act license, or vehicle quotation"
    ],
    processSteps: [
      { title: "Loan Eligibility Assessment", desc: "Bring your income and business details to determine maximum eligible loan amount and best interest rates." },
      { title: "Documentation File Assembly", desc: "We assemble, scan, and organize the mandatory KYC, banking, and tax documents." },
      { title: "Bank Application Submission", desc: "File login with partner nationalized or cooperative banks." },
      { title: "Verification & Sanction", desc: "Coordinating field verification and sanction letter issuance." }
    ],
    importantInfo: "Interest rates and processing charges depend on individual bank policies and applicant CIBIL score. Contact Sameer Xerox for file check.",
    faqs: [
      { question: "What is the minimum CIBIL score required for a bank loan?", answer: "Most nationalized and private banks require a CIBIL score of 700 or above for unsecured and personal loans." },
      { question: "Can business owners without formal balance sheets apply for a loan?", answer: "Yes, MSME Udyam registration and regular bank turnover can qualify businesses for government-backed schemes like Mudra loans." }
    ],
    relatedSlugs: ["bank-account-opening", "udyam-msme", "pan-card"]
  },
  {
    id: "driving-licence",
    name: "Driving Licence (New & Learning)",
    slug: "driving-licence",
    category: "License & Professional Services",
    image: "/services/driving-licence.jpg",
    description: "Complete online application and slot booking for Learning Licence and Permanent Driving Licence.",
    keywords: ["Driving Licence", "Learner Licence", "RTO", "Sarathi Parivahan", "ड्रायव्हिंग लायसन्स"],
    featured: true,
    popular: true,
    department: "Ministry of Road Transport and Highways (MoRTH) / Maharashtra Motor Vehicles Dept",
    level: "State",
    about: "Facilitating end-to-end Sarathi Parivahan applications for Learning Licence (LL), Permanent Driving Licence (DL), test slot booking, and smart card tracking across all vehicle categories (MCWG, LMV, Transport).",
    whoCanApply: [
      "Citizens aged 16+ for gearless 50cc two-wheelers with guardian consent",
      "Citizens aged 18+ for light motor vehicles (cars, motorcycles with gear)",
      "Citizens aged 20+ for transport/commercial vehicle licensing"
    ],
    requiredDocuments: [
      "Aadhaar Card (with linked mobile number for Aadhaar OTP e-KYC)",
      "Date of Birth proof (10th marksheet, Birth Certificate, or School Leaving Certificate)",
      "Address proof (Aadhaar Card, Electricity Bill, or Rent Agreement)",
      "Passport size color photographs and signature scan"
    ],
    processSteps: [
      { title: "Online Application Entry", desc: "Demographic and vehicle category entry on Sarathi portal." },
      { title: "Document Upload & Fee Payment", desc: "Uploading clear scanned proofs and generating treasury payment receipt." },
      { title: "Online LL Test / Slot Booking", desc: "Taking computer-based LL test or booking RTO trial appointment." },
      { title: "Smart Card Delivery", desc: "Track smart card dispatch to home address via Speed Post." }
    ],
    importantInfo: "Aadhaar authentication allows contactless online Learning Licence testing from home or our center.",
    faqs: [
      { question: "How long is a Learning Licence valid?", answer: "A Learning Licence is valid for 6 months across India. You can apply for a permanent licence after 30 days." },
      { question: "What is the fee for a new driving licence?", answer: "Government RTO fees vary by class of vehicle. Visit Sameer Xerox for exact fee breakdown." }
    ],
    relatedSlugs: ["driving-licence-renewal", "driving-licence-duplicate", "motor-insurance"]
  },
  {
    id: "driving-licence-renewal",
    name: "Driving Licence Renewal",
    slug: "driving-licence-renewal",
    category: "License & Professional Services",
    image: "/services/driving-licence-renewal.jpg",
    description: "Online renewal assistance for expired or expiring Driving Licences.",
    keywords: ["Driving Licence Renewal", "Expired DL", "RTO Renewal", "लायसन्स रिन्युअल"],
    featured: false,
    popular: true,
    department: "Maharashtra Motor Vehicles Dept / MoRTH",
    level: "State",
    about: "Driving with an expired licence attracts heavy traffic penalties under the Motor Vehicles Act. Sameer Xerox assists drivers with rapid online renewal of expired non-transport and transport driving licences, Medical Form 1A guidance, and biometric updates.",
    whoCanApply: [
      "Holders of valid or expired Indian driving licences",
      "Drivers approaching expiry (application eligible up to 1 year before expiry)",
      "Senior drivers aged 40+ requiring medical fitness certification"
    ],
    requiredDocuments: [
      "Original expired / expiring Driving Licence card",
      "Aadhaar Card for address verification",
      "Medical Certificate Form 1A (for applicants above 40 years or commercial drivers)",
      "Passport-size photographs"
    ],
    processSteps: [
      { title: "Status & Expiry Verification", desc: "Verifying DL status and penalty calculation on the national Sarathi database." },
      { title: "Online Renewal Form & Upload", desc: "Submitting renewal request and uploading medical fitness certificates." },
      { title: "RTO Fee Payment", desc: "Online payment of renewal fees and late penalty if applicable." },
      { title: "Acknowledgment & Tracking", desc: "Generating provisional authorization slip while new smart card is dispatched." }
    ],
    importantInfo: "If a driving licence is expired for more than 1 year, re-testing regulations may apply. Renew promptly to avoid hassle.",
    faqs: [
      { question: "What is the grace period for renewing an expired driving licence?", answer: "You can renew within 1 year before or 1 year after expiry without re-taking the driving test." },
      { question: "Is a medical certificate mandatory for all renewals?", answer: "Medical Form 1A signed by a registered medical practitioner is mandatory for transport licences and all drivers aged 40 and above." }
    ],
    relatedSlugs: ["driving-licence", "driving-licence-duplicate", "motor-insurance"]
  },
  {
    id: "driving-licence-duplicate",
    name: "Duplicate Driving Licence (Lost / Damaged)",
    slug: "driving-licence-duplicate",
    category: "License & Professional Services",
    image: "/services/driving-licence-duplicate.jpg",
    description: "Assistance in obtaining a duplicate smart card Driving Licence for lost, broken, or damaged cards.",
    keywords: ["Duplicate Driving Licence", "Lost DL", "Damaged License", "दुय्यम लायसन्स"],
    featured: false,
    popular: true,
    department: "Maharashtra Motor Vehicles Dept / MoRTH",
    level: "State",
    about: "If your physical driving licence is broken, cracked, illegible, or lost, Sameer Xerox assists in submitting online Form LLD for an official duplicate smart card from your issuing RTO, complete with police missing report assistance and record retrieval.",
    whoCanApply: [
      "Licence holders whose smart card is broken, fractured, or unreadable",
      "Citizens whose driving licence has been misplaced, lost, or stolen",
      "Individuals needing an updated PVC chip smart card"
    ],
    requiredDocuments: [
      "Original damaged / cracked card (if physical card is damaged)",
      "Police Missing Complaint / LDR copy (if card is lost)",
      "Aadhaar Card for identity verification",
      "Licence number or DL details (we can help look up your record)"
    ],
    processSteps: [
      { title: "Licence Record Retrieval", desc: "Looking up your DL details on Sarathi portal using name, DOB, or Aadhaar." },
      { title: "Duplicate Application Submission", desc: "Filing Form LLD for duplicate licence issue." },
      { title: "Fee Payment & Slip Generation", desc: "Paying government fee and generating official temporary driving receipt." },
      { title: "Smart Card Postal Dispatch", desc: "Fresh duplicate smart card delivered via registered speed post." }
    ],
    importantInfo: "Always keep a photocopy or Digilocker softcopy of your driving licence for easy record lookup in case of loss.",
    faqs: [
      { question: "Can I drive legally while waiting for the duplicate card?", answer: "Yes, the official online acknowledgment slip along with your DigiLocker / mParivahan digital licence is legally valid." },
      { question: "What if I do not remember my driving licence number?", answer: "Sameer Xerox can help trace your licence record on the Sarathi portal using your registered mobile number, Aadhaar, and date of birth." }
    ],
    relatedSlugs: ["driving-licence", "driving-licence-renewal", "motor-insurance"]
  },
  {
    id: "lost-aadhaar-card",
    name: "Lost Aadhaar Card Recovery & Update",
    slug: "lost-aadhaar-card",
    category: "Aadhaar Services",
    image: "/services/lost-aadhaar-card.jpg",
    description: "Retrieve lost Aadhaar numbers, reprint original Aadhaar letters, and update biometric or demographic details.",
    keywords: ["Lost Aadhaar", "Aadhaar Reprint", "Aadhaar Recovery", "हरवलेले आधार कार्ड"],
    featured: false,
    popular: true,
    department: "Unique Identification Authority of India (UIDAI)",
    level: "Central",
    about: "Lost your Aadhaar card? Don't worry! Sameer Xerox assists citizens with Aadhaar retrieval via biometric search, mobile OTP reprint, official UIDAI PVC card ordering, and updating mobile numbers, emails, addresses, and photos.",
    whoCanApply: [
      "Any citizen whose physical Aadhaar card is lost, torn, or stolen",
      "Individuals needing original official PVC cards delivered to their doorstep",
      "Citizens needing demographic corrections or phone number linkage"
    ],
    requiredDocuments: [
      "Any secondary identity proof (PAN card, Voter ID, Ration card, or School ID)",
      "Aadhaar registered mobile number (if available) or biometric verification"
    ],
    processSteps: [
      { title: "Identity Record Search", desc: "Locating Aadhaar enrolment/UID record using demographic details or biometric scan." },
      { title: "e-Aadhaar Download & Verification", desc: "Downloading authentic cryptographically verified e-Aadhaar PDF." },
      { title: "High-Definition Laminated Print", desc: "Instant color printout with heavy-duty lamination or ordering UIDAI official PVC card." }
    ],
    importantInfo: "Never share OTP with unknown callers. Always perform official Aadhaar downloads at trusted CSC centers like Sameer Xerox.",
    faqs: [
      { question: "Can I get my Aadhaar card if I forgot my 12-digit number?", answer: "Yes, we can retrieve your UID using registered mobile OTP or UIDAI search tools." },
      { question: "Is a downloaded e-Aadhaar as valid as the original card?", answer: "Yes, as per UIDAI guidelines and the Aadhaar Act, a downloaded e-Aadhaar is 100% legally equivalent to the original printed card." }
    ],
    relatedSlugs: ["aadhaar-services", "pan-card", "ration-card"]
  },
  {
    id: "shg-pan-card",
    name: "Self-Help Group (SHG / Bachat Gat) PAN Card",
    slug: "shg-pan-card",
    category: "Identity & Documents",
    image: "/services/shg-pan-card.jpg",
    description: "Dedicated PAN Card application service for Women's Self-Help Groups (Mahila Bachat Gat) and SHG federations.",
    keywords: ["SHG PAN Card", "Bachat Gat PAN", "Mahila Bachat Gat", "बचत गट पॅन कार्ड"],
    featured: false,
    popular: true,
    department: "Income Tax Department / NSDL & UTIITSL",
    level: "Central",
    about: "A dedicated PAN card in the name of the Self-Help Group (महिला बचत गट) is essential for opening group bank accounts, receiving government revolving funds, subsidy grants, and zero-interest loans. Sameer Xerox assists women's groups with swift, error-free PAN card processing.",
    whoCanApply: [
      "Women Self-Help Groups (Mahila Bachat Gat)",
      "Village Organizations and SHG Federations",
      "Village development and joint-liability groups"
    ],
    requiredDocuments: [
      "Bachat Gat resolution (ठराव) passed by members authorizing President and Secretary",
      "Aadhaar Cards and PAN cards of President (अध्यक्षा) and Secretary (सचिवा)",
      "Bachat Gat registration proof or Gram Panchayat recommendation letter",
      "Group photograph of members"
    ],
    processSteps: [
      { title: "Resolution Review", desc: "Verifying the Bachat Gat name and authorized office bearers' signatures." },
      { title: "Online Form 49A Filing", desc: "Filing dedicated association-of-persons (AOP) PAN application." },
      { title: "Verification & Tracking", desc: "Generating acknowledgment slip with 15-digit tracking code." },
      { title: "Card Dispatch", desc: "Delivery of laminated physical PAN card in the name of the Bachat Gat." }
    ],
    importantInfo: "Having a dedicated SHG PAN card ensures seamless loan disbursements under NRLM / MAVIM government schemes.",
    faqs: [
      { question: "Why does a Bachat Gat need a separate PAN card?", answer: "Banks require a separate PAN card for opening savings accounts in the group's name and disbursing government subsidies." },
      { question: "Can a Bachat Gat apply if it is recently formed?", answer: "Yes, with a valid Gram Panchayat resolution and member KYC, new groups can obtain their PAN card." }
    ],
    relatedSlugs: ["pan-card", "bank-account-opening", "bank-loan-services"]
  },
  {
    id: "pan-card-documents",
    name: "PAN Card Documents & New Rules Guidance",
    slug: "pan-card-documents",
    category: "Identity & Documents",
    image: "/services/pan-card-documents.jpg",
    description: "Complete guidance on mandatory date of birth and identity proofs under latest Income Tax guidelines.",
    keywords: ["PAN Documents", "PAN Card Rules", "DOB Proof for PAN", "पॅनकार्ड कागदपत्रे"],
    featured: false,
    popular: false,
    department: "Income Tax Department",
    level: "Central",
    about: "Under updated Income Tax rules, accurate proof of date of birth is strictly mandatory alongside Aadhaar for new PAN generation and correction. Sameer Xerox assists citizens with document verification to prevent application rejections.",
    whoCanApply: [
      "Anyone applying for new PAN card or updating date of birth/name on old PAN",
      "Minors, students, and seniors requiring compliant documentation"
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Any one of: Birth Certificate, 10th Marksheet, School Leaving Certificate, Passport, Driving Licence, Pension Order, Domicile, or Government Photo ID"
    ],
    processSteps: [
      { title: "Document Scrutiny", desc: "Matching spelling of name, father's name, and date of birth across all proofs." },
      { title: "Discrepancy Resolution", desc: "Guiding necessary minor corrections before submission." },
      { title: "Fast-Track Entry", desc: "Filing application with 100% acceptance guarantee." }
    ],
    importantInfo: "Ensuring exact name and DOB match between Aadhaar and secondary proof avoids rejection holds.",
    faqs: [
      { question: "What if my birth date on Aadhaar has only the year?", answer: "You must provide a secondary proof like 10th marksheet, school leaving certificate, or birth certificate showing full DD/MM/YYYY." }
    ],
    relatedSlugs: ["pan-card", "shg-pan-card", "aadhaar-services"]
  },
  {
    id: "udyam-msme-schemes",
    name: "MSME Udyam Scheme & Subsidy Benefits",
    slug: "udyam-msme-schemes",
    category: "Business & Registration",
    image: "/services/udyam-msme-schemes.jpg",
    description: "Assistance in availing government subsidies, collateral-free loans, and government tenders through Udyam registration.",
    keywords: ["MSME Schemes", "Udyam Subsidy", "Government Tenders", "सरकारी लाभ"],
    featured: false,
    popular: true,
    department: "Ministry of Micro, Small & Medium Enterprises (MSME)",
    level: "Central",
    about: "Udyam Aadhaar unlocks vital central and state government benefits for small businesses, including priority bank lending, interest subsidies, 50% patent/trademark discount, exemption on security deposits for tenders, and protection against delayed payments. Sameer Xerox helps local businesses register and tap into these schemes.",
    whoCanApply: [
      "Any micro, small, or medium enterprise, manufacturer, or service provider",
      "Women entrepreneurs, self-employed professionals, and retail shopkeepers"
    ],
    requiredDocuments: [
      "Aadhaar Card of proprietor/partners/directors",
      "PAN Card of business / proprietor",
      "Bank account details (IFSC and Account number)",
      "Basic business investment and turnover figures"
    ],
    processSteps: [
      { title: "Classification Review", desc: "Classifying business under Micro, Small, or Medium based on investment and turnover." },
      { title: "Online Udyam Portal Entry", desc: "Filing official zero-fee central registration with NIC codes." },
      { title: "Instant Certificate Issuance", desc: "Downloading verified registration certificate with QR code." },
      { title: "Scheme Advisory", desc: "Guiding proprietor on available Mudra loans, PMEGP, and interest subsidies." }
    ],
    importantInfo: "Udyam registration is 100% digital and lifetime valid. No periodic renewals are required.",
    faqs: [
      { question: "What subsidies are available after Udyam registration?", answer: "Registered MSMEs can access collateral-free loans under CGTMSE, lower interest rates, ISO certification reimbursement, and priority in government procurement." }
    ],
    relatedSlugs: ["udyam-msme", "udyam-business-registration", "shop-act-gumasta"]
  },
];

export const priorityServiceSlugs = [
  "bank-account-opening",
  "rent-agreement",
  "motor-insurance",
  "health-insurance",
  "fssai-basic"
];

export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  return servicesData.find(s => s.slug === slug || s.id === slug);
};
