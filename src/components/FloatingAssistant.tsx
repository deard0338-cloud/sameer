import React, { useState } from 'react';
import { X, Send, PhoneCall, MessageSquare } from 'lucide-react';

interface FloatingAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const FloatingAssistant: React.FC<FloatingAssistantProps> = ({ isOpen, onToggle, onClose }) => {
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string; time: string }[]>([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to Sameer Xerox Digital Services & CSC Center. How may I assist you with documents, banking, or forms today?',
      time: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickPrompts = [
    "How to apply for PAN Card?",
    "Need Bank Account Opening help",
    "FSSAI food license procedure",
    "Where is Sameer Xerox located?"
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text, time }]);
    if (!textToSend) setInputMessage('');

    // Simulate smart bot response
    setTimeout(() => {
      let reply = "Thank you for reaching out! You can visit Sameer Xerox or call us directly at +91 86258 20706 for instant doorstep/counter assistance.";
      const lower = text.toLowerCase();
      if (lower.includes('pan')) {
        reply = "For PAN Card, please bring your Aadhaar Card and 2 passport photos. We do both instant e-PAN (48 hrs) and physical PVC cards.";
      } else if (lower.includes('bank') || lower.includes('account')) {
        reply = "We assist with zero-balance savings and current account openings. Bring your Aadhaar and PAN card.";
      } else if (lower.includes('food') || lower.includes('fssai')) {
        reply = "We handle Basic FSSAI registration as well as Zomato/Swiggy compliance and State Food licenses.";
      } else if (lower.includes('located') || lower.includes('where') || lower.includes('time')) {
        reply = "Sameer Xerox is open 7 days a week from 10:00 AM to 6:00 PM. Call +91 86258 20706 for exact location directions.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Avatar Button (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={onToggle}
          className="group relative w-14 h-14 rounded-full bg-gov-primary hover:bg-gov-dark text-white p-0.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center overflow-hidden"
          title="Digital Assistant &amp; Support"
          aria-label="Open Digital Assistant"
        >
          <img
            src="/assets/assistant-avatar.svg"
            alt="Sameer Xerox Assistant"
            className="w-full h-full object-cover"
          />
          {/* Active online dot */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </button>
      </div>

      {/* Interactive Chat Panel Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gov-border z-50 overflow-hidden flex flex-col max-h-[550px] animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gov-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 p-0.5 overflow-hidden">
                <img src="/assets/assistant-avatar.svg" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Sameer Xerox Help Desk</h4>
                <div className="text-[11px] text-blue-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Online • 10 AM - 6 PM
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Contact Bar */}
          <div className="bg-gov-light/80 px-4 py-2 border-b border-blue-100 flex items-center justify-between text-xs">
            <a
              href="tel:+918625820706"
              className="flex items-center gap-1.5 font-bold text-gov-dark hover:text-gov-primary"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gov-primary" />
              +91 86258 20706
            </a>
            <a
              href="https://wa.me/918625820706"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-700 font-bold hover:underline"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px] bg-[#F9FBFC]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gov-primary text-white rounded-br-none'
                      : 'bg-white text-gov-textPrimary border border-gray-200 shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap text-[11px] bg-white hover:bg-gov-light text-gov-primary border border-gray-200 px-2.5 py-1 rounded-full font-medium transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <div className="p-3 border-t border-gov-border bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your question..."
              className="flex-1 text-xs outline-none bg-gray-100 px-3 py-2 rounded-lg text-gov-textPrimary focus:bg-white focus:ring-1 focus:ring-gov-primary"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2 rounded-lg bg-gov-primary hover:bg-gov-dark text-white transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
