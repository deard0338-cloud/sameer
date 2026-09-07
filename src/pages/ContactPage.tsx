import React, { useState } from 'react';
import { PhoneCall, MessageSquare, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'PAN Card',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-gov-bg min-h-screen pb-20">
      {/* Top Banner */}
      <div className="bg-white border-b border-gov-borderCard py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gov-light text-gov-primary text-xs font-bold uppercase tracking-wider">
            Direct Helpline &amp; Center Desk
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gov-textPrimary tracking-tight">
            Contact Sameer Xerox
          </h1>
          <p className="text-sm sm:text-base text-gov-textSecondary max-w-xl mx-auto">
            Get instant guidance on document requirements, government schemes, and service applications.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone Support */}
            <div className="bg-white p-6 rounded-2xl border border-gov-borderCard shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gov-light text-gov-primary flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gov-textSecondary">
                    Phone Helplines
                  </h3>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    <a
                      href="tel:+918625820706"
                      className="text-lg sm:text-xl font-extrabold text-gov-dark hover:text-gov-primary transition-colors"
                    >
                      +91 86258 20706
                    </a>
                    <a
                      href="tel:+918668637878"
                      className="text-base font-bold text-gov-primary hover:text-gov-dark transition-colors"
                    >
                      +91 86686 37878
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gov-textSecondary">
                Call directly for instant consultation on document requirements, government fees, and processing times.
              </p>
            </div>

            {/* WhatsApp Contact */}
            <div className="bg-white p-6 rounded-2xl border border-gov-borderCard shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    WhatsApp Chat Support
                  </h3>
                  <a
                    href="https://wa.me/918625820706?text=Hello%20Sameer%20Xerox,%20I%20need%20assistance%20with%20a%20digital%20service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-gray-900 hover:text-emerald-600 transition-colors block mt-0.5"
                  >
                    Chat on +91 86258 20706
                  </a>
                </div>
              </div>
              <p className="text-xs text-gov-textSecondary">
                Send document photos or queries on WhatsApp for preliminary checks before visiting.
              </p>
            </div>

            {/* Center Timings */}
            <div className="bg-white p-6 rounded-2xl border border-gov-borderCard shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-gov-primary flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gov-textSecondary">
                    Operational Hours
                  </h3>
                  <div className="text-base font-bold text-gov-textPrimary mt-0.5">
                    10:00 AM – 6:00 PM
                  </div>
                </div>
              </div>
              <p className="text-xs text-gov-textSecondary">
                Available all 7 days of the week for citizen documentation and online work.
              </p>
            </div>

            {/* Physical Location */}
            <div className="bg-white p-6 rounded-2xl border border-gov-borderCard shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-gov-primary font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>समीर झेरॉक्स &amp; कॉम्प्युटर (Sameer Xerox)</span>
              </div>
              <p className="text-xs font-semibold text-gov-textPrimary leading-relaxed">
                ट्रेझरी ऑफिस समोर, छत्रपती शिवाजी महाराज चौक, आष्टी, तालुका आष्टी, जिल्हा बीड - 414203
              </p>
              <p className="text-[11px] text-gov-textSecondary leading-relaxed">
                Digital Services &amp; CSC Center • महा ई-सेवा केंद्र, सेतू सुविधा, SBI ग्राहक सेवा केंद्र.
              </p>
            </div>
          </div>

          {/* Right: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-gov-borderCard p-8 sm:p-10 shadow-gov-card space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gov-textPrimary">
                  Send a Service Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-gov-textSecondary mt-1">
                  Fill out this quick form and our operator will review your requirements and respond promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-bold text-emerald-900">Inquiry Received!</h3>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-sm mx-auto">
                    Thank you, {formData.name}. Our Sameer Xerox team will call you on {formData.phone} shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-bold text-emerald-700 underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-gov-textSecondary mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 rounded-xl border border-gov-border focus:border-gov-primary outline-none text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gov-textSecondary mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98234 56789"
                      className="w-full px-4 py-2.5 rounded-xl border border-gov-border focus:border-gov-primary outline-none text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gov-textSecondary mb-1">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gov-border focus:border-gov-primary outline-none text-sm bg-white"
                    >
                      <option value="PAN Card">PAN Card Application / Correction</option>
                      <option value="Caste Validity">Caste Validity Scrutiny</option>
                      <option value="Ration Card">Ration Card Addition / Modification</option>
                      <option value="AEPS Banking">AEPS Cash Withdrawal / Banking</option>
                      <option value="Bank Account Opening">Bank Account Opening</option>
                      <option value="Shop Act Gumasta">Shop Act (Gumasta) License</option>
                      <option value="Rent Agreement">Rent Agreement Drafting</option>
                      <option value="Police Clearance">Police Clearance Certificate (PCC)</option>
                      <option value="PF EPFO">PF / EPFO Online Claims</option>
                      <option value="Pension Jeevan Pramaan">Pension / Jeevan Pramaan DLC</option>
                      <option value="Health Insurance">Health Insurance Policy</option>
                      <option value="Motor Insurance">Motor Vehicle Insurance</option>
                      <option value="FSSAI Food License">Food License (FSSAI) Basic / State</option>
                      <option value="Udyam MSME">Udyam MSME Registration</option>
                      <option value="Other">Other Digital / Xerox Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gov-textSecondary mb-1">
                      Message / Specific Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention your requirements or questions..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gov-border focus:border-gov-primary outline-none text-sm resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gov-primary hover:bg-gov-dark text-white rounded-xl font-bold text-sm shadow transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Sameer Xerox</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
