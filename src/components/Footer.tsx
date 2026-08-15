import React from 'react';
import { 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUp,
  Sparkles,
  MessageSquare,
  Instagram,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FooterProps {
  onOpenJoin: () => void;
  onOpenAdmin: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenJoin,
  onOpenAdmin,
  onOpenAbout,
  onOpenContact,
}) => {
  const { t, categories, setFilters, setCurrentTab } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId: string) => {
    setFilters(prev => ({ ...prev, categoryId: catId, searchQuery: '' }));
    setCurrentTab('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      
      {/* Top Banner: Worker Empowerment & Instagram Join Callout */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-amber-950/40 via-slate-900 to-pink-950/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Are you a skilled technician or service provider in Bhurkunda, Ramgarh, Sayal, Saunda or Patratu?
            </h3>
            <p className="text-sm text-amber-200/80 mt-1 max-w-xl">
              Join {t.brandName} at 0% commission and connect directly with local households across Bhurkunda, Ramgarh, Sayal, Saunda, Balkudra, Kurse, Cooperative, Saundaa Basti, and Patratu. Direct helpline: 809219303 • Instagram: @vickyvirat30.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://www.instagram.com/vickyvirat30?igsh=ZzAwZDFpcWRwaWVq"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-extrabold text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              <Instagram className="w-4 h-4" />
              <span>Join Instagram (@vickyvirat30)</span>
            </a>

            <button
              onClick={onOpenJoin}
              id="footer-join-pro-btn"
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg hover:shadow-amber-500/20 transition-all"
            >
              {t.joinAsProvider}
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1: Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-md">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block leading-none">
                  {t.brandName}
                </span>
                <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block mt-1">
                  {t.brandTagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {t.brandName} connects local residents in Bhurkunda, Ramgarh, Sayal, Saunda, Balkudra, Kurse, Cooperative, Saundaa Basti, and Patratu directly with skilled, verified tradespeople. Call or WhatsApp directly at 809219303 or connect on Instagram @vickyvirat30.
            </p>

            {/* Social and Trust badging */}
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="https://www.instagram.com/vickyvirat30?igsh=ZzAwZDFpcWRwaWVq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-pink-400 hover:text-pink-300 text-xs font-semibold w-fit transition-all"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Follow Vicky on Instagram: @vickyvirat30</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <div className="flex items-center gap-4 text-xs pt-1">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Verified Profiles</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>0% Commission</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => {
                    setCurrentTab('home');
                    scrollToTop();
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentTab('directory');
                    scrollToTop();
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.allServices}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.aboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-amber-400 transition-colors"
                >
                  {t.contactUs}
                </button>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/vickyvirat30?igsh=ZzAwZDFpcWRwaWVq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram Profile</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenJoin}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  {t.joinAsProvider}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.popularCategories}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-amber-400 text-left transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Direct Contact & Helpline
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <a 
                  href="tel:809219303"
                  className="flex items-center gap-2 text-amber-300 hover:text-amber-200 font-bold transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Call: +91 809219303</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/91809219303?text=Hello%2C%20I%20need%20service%20in%20Bhurkunda%20%2F%20Ramgarh%20%2F%20Sayal%20%2F%20Saunda%20%2F%20Patratu%20area."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">WhatsApp: 809219303</span>
                    <span className="text-[11px] text-slate-400 font-normal">If call is busy, send a message</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/vickyvirat30?igsh=ZzAwZDFpcWRwaWVq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-pink-400 hover:text-pink-300 font-semibold transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Instagram: @vickyvirat30</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Bhurkunda, Ramgarh, Sayal, Saunda, Balkudra, Kurse, Cooperative, Saundaa Basti, Patratu & All surrounding areas</span>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <button
                onClick={onOpenAdmin}
                id="footer-admin-portal-btn"
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
              >
                <span>⚙️ {t.adminDashboard}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 bg-black/40 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} {t.brandName} • All rights reserved. Direct Helpline: +91 809219303 • Instagram: @vickyvirat30
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              Serving Bhurkunda, Ramgarh, Sayal, Saunda, Balkudra, Kurse, Cooperative, Saundaa Basti, Patratu & surrounding areas
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};

