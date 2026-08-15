import React, { useState } from 'react';
import { X, ShieldCheck, Users, Sparkles, Send, CheckCircle2, Phone, MessageSquare, Instagram, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<ModalProps> = ({ onClose }) => {
  const { t } = useApp();

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 p-6 text-white shrink-0 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{t.aboutUs} - Vicky Seva Setu</h3>
            <p className="text-xs text-amber-200">Connecting Bhurkunda, Ramgarh & Surrounding Areas Directly</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <h4 className="font-bold text-amber-950 text-base mb-2">
              About Vicky Seva Setu
            </h4>
            <p>
              Vicky Seva Setu was established to connect local homeowners and businesses in Bhurkunda, Ramgarh, Sayal, Saunda, Balkudra, Kurse, Cooperative, Saundaa Basti, Patratu, and all surrounding areas directly with skilled, verified tradespeople—such as electricians, plumbers, carpenters, painters, and technicians—with zero brokerage and 100% direct connection.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="https://www.instagram.com/vickyvirat30?igsh=ZzAwZDFpcWRwaWVq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-xs hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Join Vicky on Instagram: @vickyvirat30</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="tel:8092195302"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call: 8092195302</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm">100% Verified</h5>
              <p className="text-xs text-slate-500 mt-1">ID & Background checks</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <Sparkles className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm">0% Commission</h5>
              <p className="text-xs text-slate-500 mt-1">Direct customer pay</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm">Local Specialists</h5>
              <p className="text-xs text-slate-500 mt-1">Bhurkunda & Ramgarh</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const ContactModal: React.FC<ModalProps> = ({ onClose }) => {
  const { t, addToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      addToast('Please fill all details', 'error');
      return;
    }
    setSent(true);
    addToast('Message sent successfully! We will connect shortly.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white shrink-0 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{t.contactUs} - Vicky Seva Setu</h3>
            <p className="text-xs text-slate-300">
              Direct Helpline & WhatsApp: 8092195302 • Instagram: @vickyvirat30
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {sent ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900">
                Thank you! We will reach out to you shortly.
              </h4>
              <p className="text-xs text-slate-600">
                For instant assistance, you can also call 8092195302 directly or WhatsApp anytime.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.fullName} *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.phoneNumber}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message / Service Requirement *</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or questions..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 space-y-2 border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      Helpline: +91 8092195302 (Direct Call / WhatsApp)
                    </p>
                    <p className="text-[11px] text-amber-700 font-medium">
                      If call is busy, please drop a WhatsApp message!
                    </p>
                  </div>
                  <a
                    href="https://www.instagram.com/vickyvirat30?igsh=ZzAwZDFpcWRwaWVq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1 shrink-0"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram: @vickyvirat30</span>
                  </a>
                </div>
                <p className="text-[11px] text-slate-500">
                  Coverage: Bhurkunda, Ramgarh, Sayal, Saunda, Balkudra, Kurse, Cooperative, Saundaa Basti, Patratu & surrounding areas
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
