import React, { useState } from 'react';
import { 
  Wrench, 
  MapPin, 
  CalendarCheck, 
  UserPlus, 
  ShieldCheck, 
  Menu, 
  X, 
  Search, 
  CheckCircle2, 
  PhoneCall,
  Instagram,
  Lock,
  Unlock,
  KeyRound,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenJoin: () => void;
  onOpenBookings: () => void;
  onOpenAdmin: () => void;
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenJoin,
  onOpenBookings,
  onOpenAdmin,
  onOpenAbout,
  onOpenContact
}) => {
  const { 
    t, 
    selectedCity, 
    setSelectedCity, 
    cities, 
    requests,
    currentTab,
    setCurrentTab,
    setFilters,
    isOwnerAuthenticated,
    isEditLockedToOwner,
    openOwnerUnlockModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingBookingsCount = requests.filter(r => r.status === 'pending' || r.status === 'in_progress').length;

  const handleNavClick = (tab: 'home' | 'directory') => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAllServicesClick = () => {
    setFilters(prev => ({ ...prev, categoryId: 'all', searchQuery: '' }));
    setCurrentTab('directory');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2.5">
          <div className="flex items-center flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Direct Pros in Bhurkunda, Ramgarh, Sayal, Saunda, Balkudra, Kurse, Cooperative, Saundaa Basti, Patratu
            </span>
            <span className="text-slate-500 hidden md:inline">•</span>
            <span className="text-amber-300 font-medium hidden md:inline">
              If call is busy, drop a WhatsApp message!
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-slate-300 ml-auto">
            {/* Direct Call Link */}
            <a 
              href="tel:8092195302" 
              className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-all text-xs shadow-xs"
              title="Call Directly"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call: 8092195302</span>
            </a>

            {/* Direct WhatsApp Link */}
            <a
              href="https://wa.me/918092195302?text=Hello%2C%20I%20need%20service%20in%20Bhurkunda%20%2F%20Ramgarh%20%2F%20Sayal%20%2F%20Saunda%20%2F%20Patratu%20area."
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-md bg-green-600 hover:bg-green-500 text-white font-bold flex items-center gap-1.5 transition-all text-xs shadow-xs"
              title="Chat on WhatsApp"
            >
              <span>WhatsApp</span>
            </a>

            {/* Instagram Join / Follow Link */}
            <a
              href="https://www.instagram.com/vickyvirat30?igsh=ZzAwZDFpcWRwaWVq"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-md bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold flex items-center gap-1.5 transition-all text-xs shadow-xs"
              title="Join / Follow Vicky on Instagram (@vickyvirat30)"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Instagram</span>
              <span className="sm:hidden">IG</span>
            </a>

            <span className="text-slate-600 hidden sm:inline">|</span>
            <button
              onClick={onOpenAdmin}
              id="nav-admin-quick-btn"
              className="text-xs text-slate-300 hover:text-amber-400 font-medium hidden sm:flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {t.adminDashboard}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Back & Forward History Controls */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-2xs shrink-0">
              <button
                type="button"
                onClick={() => window.history.back()}
                id="nav-back-button"
                className="p-1.5 sm:p-2 rounded-lg text-slate-700 hover:bg-white hover:text-amber-600 hover:shadow-xs transition-all active:scale-95"
                title="Go Back Page"
              >
                <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
              <span className="w-px h-4 bg-slate-200"></span>
              <button
                type="button"
                onClick={() => window.history.forward()}
                id="nav-forward-button"
                className="p-1.5 sm:p-2 rounded-lg text-slate-700 hover:bg-white hover:text-amber-600 hover:shadow-xs transition-all active:scale-95"
                title="Go Forward Page"
              >
                <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </div>

            <button 
              onClick={() => handleNavClick('home')}
              id="brand-logo-btn"
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900">
                    Vicky Seva<span className="text-amber-600">Setu</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    DIRECT
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block -mt-0.5">
                  Bhurkunda, Ramgarh, Sayal, Saunda, Patratu & All Areas
                </p>
              </div>
            </button>

            {/* City Dropdown */}
            <div className="relative hidden md:flex items-center">
              <div className="flex items-center gap-1.5 bg-slate-100/90 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium rounded-lg px-3 py-1.5 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  id="navbar-city-select"
                  className="bg-transparent border-none focus:outline-hidden cursor-pointer pr-1 text-slate-800 font-medium"
                >
                  <option value="all">All Covered Areas</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              id="nav-link-home"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'home' 
                  ? 'text-amber-600 bg-amber-50 font-semibold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.home}
            </button>

            <button
              onClick={handleAllServicesClick}
              id="nav-link-services"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'directory' 
                  ? 'text-amber-600 bg-amber-50 font-semibold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.allServices}
            </button>

            <button
              onClick={() => {
                handleNavClick('home');
                setTimeout(() => {
                  document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              id="nav-link-how-it-works"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {t.howItWorks}
            </button>

            {/* Direct Instagram Header Link */}
            <a
              href="https://www.instagram.com/vickyvirat30?igsh=ZzAwZDFpcWRwaWVq"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-sm font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>@vickyvirat30</span>
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bookings Tracker Pill */}
            <button
              onClick={onOpenBookings}
              id="my-bookings-btn"
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              title="View your service requests"
            >
              <CalendarCheck className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">{t.myBookings}</span>
              {pendingBookingsCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-amber-500 text-white text-[11px] font-bold">
                  {pendingBookingsCount}
                </span>
              )}
            </button>

            {/* Join as Provider Button */}
            <button
              onClick={onOpenJoin}
              id="join-provider-btn"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              <UserPlus className="w-4 h-4 text-amber-600" />
              <span>{t.joinAsProvider}</span>
            </button>

            {/* Master Owner Lock / Protection Badge */}
            <button
              onClick={() => openOwnerUnlockModal()}
              id="owner-lock-nav-btn"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-bold transition-all border shadow-2xs ${
                isOwnerAuthenticated
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
              title={isOwnerAuthenticated ? "Owner Authenticated - Click to manage lock" : "Protected Document - Click to unlock owner editing"}
            >
              {isOwnerAuthenticated ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Owner Unlocked</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden sm:inline">Owner Protected</span>
                </>
              )}
            </button>

            {/* Post Service Request CTA */}
            <button
              onClick={handleAllServicesClick}
              id="find-workers-cta-btn"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md shadow-amber-600/20 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>{t.findWorkers}</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          {/* Mobile City Selector */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-2.5">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-600 shrink-0">{t.selectCity}:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent border-none focus:outline-hidden text-sm font-medium text-slate-900 w-full"
            >
              <option value="all">{t.allCities}</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                currentTab === 'home' ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-800'
              }`}
            >
              {t.home}
            </button>

            <button
              onClick={handleAllServicesClick}
              className={`text-left px-3 py-2 rounded-md text-sm font-medium ${
                currentTab === 'directory' ? 'bg-amber-50 text-amber-700 font-semibold' : 'text-slate-800'
              }`}
            >
              {t.allServices}
            </button>

            <button
              onClick={() => {
                handleNavClick('home');
                setTimeout(() => {
                  document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left px-3 py-2 rounded-md text-sm font-medium text-slate-800"
            >
              {t.howItWorks}
            </button>

            {/* Mobile Instagram Button */}
            <a
              href="https://www.instagram.com/vickyvirat30?igsh=ZzAwZDFpcWRwaWVq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left px-3 py-2.5 rounded-md text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 flex items-center gap-2 shadow-xs"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>Join Instagram: @vickyvirat30</span>
            </a>

            <button
              onClick={() => {
                onOpenJoin();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md text-sm font-medium text-amber-700 bg-amber-50 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-amber-600" />
              {t.joinAsProvider}
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 bg-slate-100 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              {t.adminDashboard}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
