import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center py-16 px-4 bg-gov-bg">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gov-borderCard shadow-gov-card p-8 sm:p-10 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-gov-light text-gov-primary flex items-center justify-center mx-auto shadow-inner">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gov-textPrimary tracking-tight">
            Citizen Portal Login
          </h1>
          <p className="text-xs sm:text-sm text-gov-textSecondary mt-1">
            Access your applications, stored certificates &amp; service updates at Sameer Xerox.
          </p>
        </div>

        {/* Method Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => { setLoginMethod('mobile'); setOtpSent(false); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              loginMethod === 'mobile' ? 'bg-white text-gov-primary shadow-sm' : 'text-gray-600'
            }`}
          >
            Mobile OTP
          </button>
          <button
            type="button"
            onClick={() => { setLoginMethod('email'); setOtpSent(false); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              loginMethod === 'email' ? 'bg-white text-gov-primary shadow-sm' : 'text-gray-600'
            }`}
          >
            Email ID
          </button>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4 text-left">
            {loginMethod === 'mobile' ? (
              <div>
                <label className="block text-xs font-semibold text-gov-textSecondary mb-1">
                  10-Digit Mobile Number
                </label>
                <div className="flex items-center rounded-xl border border-gov-border focus-within:border-gov-primary px-3 py-2.5">
                  <span className="text-xs font-bold text-gray-500 mr-2">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full text-sm outline-none text-gov-textPrimary"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-gov-textSecondary mb-1">
                  Registered Email Address
                </label>
                <div className="flex items-center rounded-xl border border-gov-border focus-within:border-gov-primary px-3 py-2.5">
                  <Mail className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-sm outline-none text-gov-textPrimary"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gov-primary hover:bg-gov-dark text-white rounded-xl font-bold text-sm shadow transition-all"
            >
              Get One Time Password (OTP)
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-gov-textSecondary mb-1">
                Enter 6-Digit OTP (Mock OTP: 123456)
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full text-center tracking-widest text-lg font-mono font-bold py-2.5 rounded-xl border border-gov-border focus:border-gov-primary outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gov-primary hover:bg-gov-dark text-white rounded-xl font-bold text-sm shadow transition-all"
            >
              Verify &amp; Enter Dashboard
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-xs text-gov-primary font-semibold hover:underline"
              >
                Change Number / Resend
              </button>
            </div>
          </form>
        )}

        <div className="pt-2 text-xs text-gray-400 border-t border-gray-100">
          Operator assistance available at <a href="tel:+918625820706" className="text-gov-primary font-bold hover:underline">+91 86258 20706</a>
        </div>
      </div>
    </div>
  );
};
