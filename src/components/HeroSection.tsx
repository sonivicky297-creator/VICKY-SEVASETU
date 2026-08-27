import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Star, 
  CheckCircle,
  Zap,
  Flame,
  Boxes,
  Wrench,
  Sparkles,
  ArrowRight,
  Phone,
  MessageSquare,
  PhoneCall,
  Instagram
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeroSectionProps {
  onSearchSubmit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchSubmit }) => {
  const { 
    t, 
    categories, 
    selectedCity, 
    setSelectedCity, 
    cities, 
    filters, 
    setFilters 
  } = useApp();

  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  const [selectedCategoryInput, setSelectedCategoryInput] = useState(filters.categoryId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      searchQuery: searchInput.trim(),
      categoryId: selectedCategoryInput,
      city: selectedCity === 'all' ? 'all' : selectedCity
    }));
    onSearchSubmit();
  };

  const handleQuickChipClick = (catId: string, queryText: string = '') => {
    setSearchInput(queryText);
    setSelectedCategoryInput(catId);
    setFilters(prev => ({
      ...prev,
      categoryId: catId,
      searchQuery: queryText,
      city: selectedCity === 'all' ? 'all' : selectedCity
    }));
    onSearchSubmit();
  };

  const handleLocationChipClick = (locName: string) => {
    setSelectedCity(locName);
    setFilters(prev => ({
      ...prev,
      city: locName
    }));
    onSearchSubmit();
  };

  const quickBadges = [
    { catId: 'cat-electrician', icon: Zap, label: 'Electrician' },
    { catId: 'cat-plumber', icon: Wrench, label: 'Plumber' },
    { catId: 'cat-priest', icon: Flame, label: 'Priest / Puja' },
    { catId: 'cat-materials', icon: Boxes, label: 'Sand, Cement, Bricks' },
    { catId: 'cat-cleaning', icon: Sparkles, label: 'Deep Cleaning' }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-4 sm:pt-10 pb-12 sm:pb-16">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Direct Helpline & Social Banner (Highlighted Top Banner) */}
        <div className="max-w-5xl mx-auto mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-pink-950/90 border border-emerald-500/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-3 text-center lg:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-emerald-400">Vicky Seva Setu Direct Support</span>
                <span className="text-[9px] sm:text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded-full">ACTIVE</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                Call / WhatsApp: <span className="text-amber-300 font-extrabold tracking-wide text-sm sm:text-base">8092195302</span> • <span className="text-pink-300 font-medium text-xs sm:text-sm">Insta: @vickyvirat30</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 shrink-0 w-full sm:w-auto">
            <a
              href="tel:8092195302"
              className="flex-1 sm:flex-initial px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Call 8092195302</span>
            </a>
            <a
              href="https://wa.me/918092195302?text=Hello%2C%20I%20need%20service%20in%20Bhurkunda%20%2F%20Ramgarh%20%2F%20Sayal%20%2F%20Saunda%20%2F%20Patratu%20area."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-3 py-1.5 sm:py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://www.instagram.com/vickyvirat30?igsh=ZzAwZDFpcWRwaWVq"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md transition-all active:scale-95"
            >
              <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Instagram: @vickyvirat30</span>
            </a>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] sm:text-sm font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Local Service Providers in Bhurkunda, Ramgarh & Surrounding Coal Belt Areas</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroTitlePart1} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
              {t.heroTitlePart2}
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Big Search Bar Container */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto">
          <form 
            onSubmit={handleSearch}
            className="bg-white p-2 sm:p-3 rounded-2xl shadow-2xl shadow-black/40 border border-slate-200/20 flex flex-col md:flex-row items-stretch gap-2"
          >
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-amber-500 focus-within:bg-white transition-all">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.searchServicesPlaceholder}
                id="hero-main-search-input"
                className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-hidden"
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 md:w-52">
              <select
                value={selectedCategoryInput}
                onChange={(e) => setSelectedCategoryInput(e.target.value)}
                id="hero-category-select"
                aria-label="Select Service Category"
                className="w-full bg-transparent text-slate-800 text-xs sm:text-sm font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="all">{t.allCategories}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown in Search */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 md:w-56">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                id="hero-city-select"
                aria-label="Select Location City"
                className="w-full bg-transparent text-slate-800 text-xs sm:text-sm font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="all">{t.allCities}</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex gap-2">
              <button
                type="submit"
                id="hero-search-submit-btn"
                className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.findServices}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setFilters(prev => ({ ...prev, sortBy: 'distance' }));
                  onSearchSubmit();
                }}
                title="View Nearby Pros on Map"
                className="px-3.5 py-3 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 border border-slate-200 transition-colors flex items-center justify-center gap-1.5 text-xs font-bold shrink-0"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Map View</span>
              </button>
            </div>
          </form>

          {/* Quick Location Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-300">
            <span className="text-slate-400 font-semibold flex items-center gap-1 mr-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Quick Area:
            </span>
            {cities.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocationChipClick(loc)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedCity === loc
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Quick Service Category Chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-slate-300">
            <span className="text-slate-400 font-medium">{t.popularSearches}</span>
            {quickBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <button
                  key={badge.catId}
                  onClick={() => handleQuickChipClick(badge.catId)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors text-xs font-medium cursor-pointer"
                >
                  <IconComponent className="w-3.5 h-3.5 text-amber-400" />
                  <span>{badge.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Trust Metrics */}
        <div className="mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3.5 sm:p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-base sm:text-lg font-bold text-white">100% Direct</p>
            <p className="text-xs text-slate-400 mt-0.5">Zero Brokerage</p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3.5 sm:p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-base sm:text-lg font-bold text-white">Fast Response</p>
            <p className="text-xs text-slate-400 mt-0.5">Call or WhatsApp</p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3.5 sm:p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-base sm:text-lg font-bold text-white">4.92 / 5.0</p>
            <p className="text-xs text-slate-400 mt-0.5">Verified Quality</p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3.5 sm:p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <p className="text-base sm:text-lg font-bold text-white">All Coal Belt Areas</p>
            <p className="text-xs text-slate-400 mt-0.5">Sayal to Ramgarh</p>
          </div>
        </div>

      </div>
    </section>
  );
};

