export type Language = 'en' | 'hi' | 'mr';

export interface Translations {
  siteTitle: string;
  tagline: string;
  topBarGovText: string;
  callNow: string;
  whatsappUs: string;
  searchPlaceholder: string;
  exploreServices: string;
  departmentsEntities: string;
  services: string;
  registrations: string;
  transactions: string;
  central: string;
  state: string;
  total: string;
  whatsNew: string;
  whatsNewSub: string;
  popularServices: string;
  popularServicesSub: string;
  trending: string;
  trendingSub: string;
  servicesByStates: string;
  servicesByStatesSub: string;
  exploreStatesBtn: string;
  oneStopTitle: string;
  oneStopSub: string;
  allServicesSchemes: string;
  allDocuments: string;
  allEngagements: string;
  allTransactions: string;
  categoriesTitle: string;
  categoriesSub: string;
  exploreMoreCategories: string;
  needHelpTitle: string;
  needHelpSub: string;
  availableHours: string;
  supportTiming: string;
  scanQrTitle: string;
  footerGetToKnow: string;
  footerQuickLinks: string;
  footerUsefulLinks: string;
  visitors: string;
  servicesDirectoryTitle: string;
  servicesDirectorySub: string;
  availableServicesCount: string;
  noServicesFound: string;
  clearSearch: string;
  getAssistance: string;
  trackApplication: string;
  dashboard: string;
  home: string;
  aboutUs: string;
  contact: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    siteTitle: "Sameer Xerox",
    tagline: "Digital Services & CSC Center",
    topBarGovText: "SAMEER XEROX • DIGITAL SERVICES & CSC FACILITATION CENTER",
    callNow: "Call Now",
    whatsappUs: "WhatsApp Us",
    searchPlaceholder: "Search for services, documents, licenses...",
    exploreServices: "Explore Services",
    departmentsEntities: "Departments/Entities",
    services: "Services",
    registrations: "Registrations",
    transactions: "Transactions",
    central: "Central",
    state: "State",
    total: "Total",
    whatsNew: "What's New ?",
    whatsNewSub: "Citizens may explore the newly added digital services on the portal.",
    popularServices: "Popular Service",
    popularServicesSub: "Explore the popularly used digital and CSC services!",
    trending: "Trending",
    trendingSub: "Discover the most popular services the portal has to offer. These services are the most requested services at Sameer Xerox.",
    servicesByStates: "Services by States",
    servicesByStatesSub: "Explore services offered across different States and Union Territories of India!",
    exploreStatesBtn: "Explore 30+ States",
    oneStopTitle: "All Your Digital Services, In One Place",
    oneStopSub: "Sameer Xerox strives to be your trusted one-stop digital hub for online applications, government documentation, certificates, banking, and insurance services.",
    allServicesSchemes: "All Services and Schemes at one place",
    allDocuments: "All Documents at one place",
    allEngagements: "All Engagements at one place",
    allTransactions: "All Transactions at one place",
    categoriesTitle: "Categories",
    categoriesSub: "The portal organizes digital and citizen services into structured categories to make it effortless to find relevant documentation and application help.",
    exploreMoreCategories: "Explore 9 more categories",
    needHelpTitle: "Need Help With a Digital Service?",
    needHelpSub: "Visit Sameer Xerox for assistance with online applications, documents, digital services and CSC-related work.",
    availableHours: "We are available all days of the week",
    supportTiming: "from 10 am to 6 pm",
    scanQrTitle: "Scan QR Code for Instant Mobile Assistance / Contact",
    footerGetToKnow: "Get to Know",
    footerQuickLinks: "Quick Links",
    footerUsefulLinks: "Digital Network",
    visitors: "Visitors:",
    servicesDirectoryTitle: "Services at Sameer Xerox",
    servicesDirectorySub: "Explore digital, document, financial, insurance and CSC-related services available at Sameer Xerox.",
    availableServicesCount: "Services Available",
    noServicesFound: "No services found",
    clearSearch: "Clear Search",
    getAssistance: "Get Assistance",
    trackApplication: "Track Application",
    dashboard: "Citizen Dashboard",
    home: "Home",
    aboutUs: "About Us",
    contact: "Contact"
  },
  hi: {
    siteTitle: "समीर ज़ेरॉक्स",
    tagline: "डिजिटल सेवाएं एवं सीएससी केंद्र",
    topBarGovText: "समीर ज़ेरॉक्स • डिजिटल सेवाएं एवं सीएससी सुविधा केंद्र",
    callNow: "कॉल करें",
    whatsappUs: "व्हाट्सएप करें",
    searchPlaceholder: "सेवाएं, दस्तावेज, लाइसेंस खोजें...",
    exploreServices: "सेवाएं देखें",
    departmentsEntities: "विभाग / संस्थाएं",
    services: "सेवाएं",
    registrations: "पंजीकरण",
    transactions: "लेनदेन",
    central: "केंद्रीय",
    state: "राज्य",
    total: "कुल",
    whatsNew: "नया क्या है ?",
    whatsNewSub: "नागरिक पोर्टल पर नई जोड़ी गई डिजिटल सेवाओं का अन्वेषण कर सकते हैं।",
    popularServices: "लोकप्रिय सेवाएं",
    popularServicesSub: "नागरिकों द्वारा सर्वाधिक उपयोग की जाने वाली डिजिटल और सीएससी सेवाएं!",
    trending: "ट्रेंडिंग सेवाएं",
    trendingSub: "समीर ज़ेरॉक्स पर सबसे अधिक मांग वाली शीर्ष सेवाओं की खोज करें।",
    servicesByStates: "राज्यों के अनुसार सेवाएं",
    servicesByStatesSub: "भारत के विभिन्न राज्यों एवं केंद्र शासित प्रदेशों की सेवाओं का अन्वेषण करें!",
    exploreStatesBtn: "30+ राज्य देखें",
    oneStopTitle: "आपकी सभी डिजिटल सेवाएं, एक ही स्थान पर",
    oneStopSub: "समीर ज़ेरॉक्स ऑनलाइन आवेदन, सरकारी दस्तावेज, प्रमाण पत्र, बैंकिंग और बीमा सेवाओं के लिए आपका विश्वसनीय केंद्र है।",
    allServicesSchemes: "सभी सेवाएं और योजनाएं एक स्थान पर",
    allDocuments: "सभी दस्तावेज एक स्थान पर",
    allEngagements: "सभी सहायता सुविधाएं एक स्थान पर",
    allTransactions: "सभी लेनदेन एक स्थान पर",
    categoriesTitle: "श्रेणियां",
    categoriesSub: "पोर्टल डिजिटल सेवाओं को विभिन्न समूहों में वर्गीकृत करता है ताकि आवश्यक सेवा खोजना आसान हो सके।",
    exploreMoreCategories: "9 अन्य श्रेणियां देखें",
    needHelpTitle: "क्या आपको किसी डिजिटल सेवा में सहायता चाहिए?",
    needHelpSub: "ऑनलाइन आवेदन, दस्तावेज, डिजिटल सेवाओं एवं सीएससी कार्यों में सहायता के लिए समीर ज़ेरॉक्स पधारें।",
    availableHours: "हम सप्ताह के सभी दिनों में उपलब्ध हैं",
    supportTiming: "सुबह 10 बजे से शाम 6 बजे तक",
    scanQrTitle: "त्वरित सहायता/संपर्क के लिए क्यूआर कोड स्कैन करें",
    footerGetToKnow: "हमारे बारे में",
    footerQuickLinks: "महत्वपूर्ण लिंक",
    footerUsefulLinks: "डिजिटल नेटवर्क",
    visitors: "आगंतुक:",
    servicesDirectoryTitle: "समीर ज़ेरॉक्स पर उपलब्ध सेवाएं",
    servicesDirectorySub: "समीर ज़ेरॉक्स पर उपलब्ध डिजिटल, दस्तावेज़, वित्तीय, बीमा और सीएससी संबंधित सेवाओं का अन्वेषण करें।",
    availableServicesCount: "सेवाएं उपलब्ध",
    noServicesFound: "कोई सेवा नहीं मिली",
    clearSearch: "खोज साफ़ करें",
    getAssistance: "सहायता प्राप्त करें",
    trackApplication: "आवेदन ट्रैक करें",
    dashboard: "नागरिक डैशबोर्ड",
    home: "होम",
    aboutUs: "हमारे बारे में",
    contact: "संपर्क"
  },
  mr: {
    siteTitle: "समीर झेरॉक्स",
    tagline: "डिजिटल सेवा आणि सीएससी केंद्र",
    topBarGovText: "समीर झेरॉक्स • डिजिटल सेवा आणि सीएससी सुविधा केंद्र",
    callNow: "कॉल करा",
    whatsappUs: "व्हॉट्सॲप करा",
    searchPlaceholder: "सेवा, कागदपत्रे, परवाने शोधा...",
    exploreServices: "सेवा पहा",
    departmentsEntities: "विभाग / संस्था",
    services: "सेवा",
    registrations: "नोंदणी",
    transactions: "व्यवहार",
    central: "केंद्रीय",
    state: "राज्य",
    total: "एकूण",
    whatsNew: "नवीन काय आहे ?",
    whatsNewSub: "नागरिक पोर्टलवरील नव्याने जोडलेल्या डिजिटल सेवा पाहू शकतात.",
    popularServices: "लोकप्रिय सेवा",
    popularServicesSub: "सर्वाधिक वापरल्या जाणाऱ्या डिजिटल आणि सीएससी सेवा!",
    trending: "ट्रेंडिंग सेवा",
    trendingSub: "समीर झेरॉक्सवर नागरिकांकडून सर्वाधिक मागणी असलेल्या प्रमुख सेवा.",
    servicesByStates: "राज्यांनुसार सेवा",
    servicesByStatesSub: "भारतातील विविध राज्ये आणि केंद्रशासित प्रदेशांच्या सेवांचा शोध घ्या!",
    exploreStatesBtn: "३०+ राज्ये पहा",
    oneStopTitle: "तुमच्या सर्व डिजिटल सेवा, एकाच ठिकाणी",
    oneStopSub: "ऑनलाइन अर्ज, सरकारी कागदपत्रे, दाखले, बँकिंग आणि विमा सेवांसाठी समीर झेरॉक्स हे आपले विश्वसनीय केंद्र आहे.",
    allServicesSchemes: "सर्व सेवा आणि योजना एकाच ठिकाणी",
    allDocuments: "सर्व कागदपत्रे एकाच ठिकाणी",
    allEngagements: "सर्व ग्राहक सहाय्य एकाच ठिकाणी",
    allTransactions: "सर्व व्यवहार एकाच ठिकाणी",
    categoriesTitle: "वर्गवारी",
    categoriesSub: "विविध शासकीय आणि डिजिटल सेवांचे वर्गीकरण केले आहे जेणेकरून योग्य सेवा शोधणे सोपे होईल.",
    exploreMoreCategories: "आणखी ९ वर्गवाऱ्या पहा",
    needHelpTitle: "डिजिटल सेवेसाठी मदतीची गरज आहे का?",
    needHelpSub: "ऑनलाइन अर्ज, कागदपत्रे, डिजिटल सेवा आणि सीएससी संबंधित कामांसाठी समीर झेरॉक्सला भेट द्या.",
    availableHours: "आम्ही आठवड्याचे सर्व दिवस उपलब्ध आहोत",
    supportTiming: "सकाळी १० ते संध्याकाळी ६ पर्यंत",
    scanQrTitle: "त्वरित मोबाईल संपर्कासाठी क्यूआर कोड स्कॅन करा",
    footerGetToKnow: "माहिती मिळवा",
    footerQuickLinks: "जलद दुवे",
    footerUsefulLinks: "डिजिटल नेटवर्क",
    visitors: "एकूण भेट देणारे:",
    servicesDirectoryTitle: "समीर झेरॉक्स येथील सेवा",
    servicesDirectorySub: "समीर झेरॉक्स येथे उपलब्ध डिजिटल, कागदपत्र, आर्थिक, विमा आणि सीएससी संबंधित सेवा पहा.",
    availableServicesCount: "सेवा उपलब्ध",
    noServicesFound: "कोणतीही सेवा आढळली नाही",
    clearSearch: "शोध साफ करा",
    getAssistance: "मदत मिळवा",
    trackApplication: "अर्जाची स्थिती तपासा",
    dashboard: "नागरिक डॅशबोर्ड",
    home: "मुखपृष्ठ",
    aboutUs: "आमच्याबद्दल",
    contact: "संपर्क"
  }
};
