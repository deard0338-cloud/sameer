export interface StateItem {
  name: string;
  code: string;
  capital: string;
  servicesCount: number;
  featured?: boolean;
  monumentSvg?: string;
}

export const featuredStates: StateItem[] = [
  {
    name: "Delhi",
    code: "DL",
    capital: "New Delhi",
    servicesCount: 142,
    featured: true,
    monumentSvg: "/assets/delhi.svg"
  },
  {
    name: "Gujarat",
    code: "GJ",
    capital: "Gandhinagar",
    servicesCount: 184,
    featured: true,
    monumentSvg: "/assets/gujarat.svg"
  },
  {
    name: "Haryana",
    code: "HR",
    capital: "Chandigarh",
    servicesCount: 119,
    featured: true,
    monumentSvg: "/assets/haryana.svg"
  },
  {
    name: "Maharashtra",
    code: "MH",
    capital: "Mumbai",
    servicesCount: 226,
    featured: true,
    monumentSvg: "/assets/maharashtra.svg"
  }
];

export const allStatesAndUTs: StateItem[] = [
  ...featuredStates,
  { name: "Andhra Pradesh", code: "AP", capital: "Amaravati", servicesCount: 96 },
  { name: "Arunachal Pradesh", code: "AR", capital: "Itanagar", servicesCount: 48 },
  { name: "Assam", code: "AS", capital: "Dispur", servicesCount: 88 },
  { name: "Bihar", code: "BR", capital: "Patna", servicesCount: 134 },
  { name: "Chhattisgarh", code: "CG", capital: "Raipur", servicesCount: 78 },
  { name: "Goa", code: "GA", capital: "Panaji", servicesCount: 52 },
  { name: "Himachal Pradesh", code: "HP", capital: "Shimla", servicesCount: 74 },
  { name: "Jharkhand", code: "JH", capital: "Ranchi", servicesCount: 86 },
  { name: "Karnataka", code: "KA", capital: "Bengaluru", servicesCount: 165 },
  { name: "Kerala", code: "KL", capital: "Thiruvananthapuram", servicesCount: 154 },
  { name: "Madhya Pradesh", code: "MP", capital: "Bhopal", servicesCount: 148 },
  { name: "Manipur", code: "MN", capital: "Imphal", servicesCount: 42 },
  { name: "Meghalaya", code: "ML", capital: "Shillong", servicesCount: 46 },
  { name: "Mizoram", code: "MZ", capital: "Aizawl", servicesCount: 38 },
  { name: "Nagaland", code: "NL", capital: "Kohima", servicesCount: 36 },
  { name: "Odisha", code: "OR", capital: "Bhubaneswar", servicesCount: 112 },
  { name: "Punjab", code: "PB", capital: "Chandigarh", servicesCount: 98 },
  { name: "Rajasthan", code: "RJ", capital: "Jaipur", servicesCount: 162 },
  { name: "Sikkim", code: "SK", capital: "Gangtok", servicesCount: 34 },
  { name: "Tamil Nadu", code: "TN", capital: "Chennai", servicesCount: 178 },
  { name: "Telangana", code: "TG", capital: "Hyderabad", servicesCount: 130 },
  { name: "Tripura", code: "TR", capital: "Agartala", servicesCount: 44 },
  { name: "Uttar Pradesh", code: "UP", capital: "Lucknow", servicesCount: 245 },
  { name: "Uttarakhand", code: "UK", capital: "Dehradun", servicesCount: 72 },
  { name: "West Bengal", code: "WB", capital: "Kolkata", servicesCount: 152 },
  { name: "Andaman & Nicobar Islands", code: "AN", capital: "Port Blair", servicesCount: 32 },
  { name: "Chandigarh", code: "CH", capital: "Chandigarh", servicesCount: 45 },
  { name: "Dadra & Nagar Haveli and Daman & Diu", code: "DN", capital: "Daman", servicesCount: 36 },
  { name: "Jammu & Kashmir", code: "JK", capital: "Srinagar/Jammu", servicesCount: 82 },
  { name: "Ladakh", code: "LA", capital: "Leh", servicesCount: 28 },
  { name: "Lakshadweep", code: "LD", capital: "Kavaratti", servicesCount: 22 },
  { name: "Puducherry", code: "PY", capital: "Puducherry", servicesCount: 40 }
];
