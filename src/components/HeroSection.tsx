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
  Instagram,
  Briefcase,
  UserCheck,
  Send,
  ChevronDown,
  ChevronUp
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
    setFilters,
    addServiceRequest,
    addToast
  } = useApp();

  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  const [selectedCategoryInput, setSelectedCategoryInput] = useState(filters.categoryId);

  // Work & Skill Contact Form State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regWork, setRegWork] = useState('');
  const [regNeedType, setRegNeedType] = useState<'need_work' | 'need_worker' | 'other'>('need_work');
  const [regNotes, setRegNotes] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim() || !regWork.trim()) {
      addToast('कृपया अपना नाम, मोबाइल नंबर और काम की जानकारी भरें।', 'error');
      return;
    }

    const needTypeLabel = regNeedType === 'need_work' 
      ? '💼 काम चाहिए (Looking for Work)' 
      : regNeedType === 'need_worker' 
        ? '🛠️ काम करने वाला बंदा चाहिए (Need Worker)' 
        : 'ℹ️ अन्य जानकारी (General Inquiry)';

    addServiceRequest({
      providerId: 'vicky-admin',
      providerName: 'विक्की सोनी (एडमिन)',
      providerPhone: '8092195302',
      providerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      categoryId: 'all',
      serviceName: `[विशेष सूचना फॉर्म] ${regWork.trim()}`,
      customerName: regName.trim(),
      customerPhone: regPhone.trim(),
      address: regNotes.trim() || 'स्थानीय क्षेत्र (Bhurkunda & Ramgarh)',
      city: selectedCity === 'all' ? 'Bhurkunda' : selectedCity,
      area: 'Bhurkunda / Sayal / Ramgarh',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTimeSlot: 'तत्काल / Anytime',
      urgency: 'today',
      problemDescription: `नाम: ${regName.trim()}\nनंबर: ${regPhone.trim()}\nकाम/हुनर: ${regWork.trim()}\nजरूरत: ${needTypeLabel}\nअतिरिक्त विवरण: ${regNotes.trim() || 'कोई नहीं'}`,
    });

    addToast('✅ आपकी जानकारी विक्की जी (8092195302) के पास दर्ज हो गई है!', 'success');
    setRegSuccess(true);
  };

  const handleWhatsAppSend = () => {
    const needTypeLabel = regNeedType === 'need_work' 
      ? '💼 मुझे काम चाहिए' 
      : regNeedType === 'need_worker' 
        ? '🛠️ मुझे काम करने वाला मिस्त्री/बंदा चाहिए' 
        : 'ℹ️ अन्य सहायता/पूछताछ';

    const message = `नमस्ते विक्की जी,%0A%0Aविशेष सूचना से संपर्क:%0A👤 *नाम:* ${encodeURIComponent(regName || 'नॉन-स्पेसिफाइड')}%0A📞 *नंबर:* ${encodeURIComponent(regPhone || '')}%0A🛠️ *काम / हुनर:* ${encodeURIComponent(regWork || '')}%0A📌 *जरूरत:* ${encodeURIComponent(needTypeLabel)}%0A📝 *विवरण:* ${encodeURIComponent(regNotes || 'कोई नहीं')}`;
    
    window.open(`https://wa.me/918092195302?text=${message}`, '_blank');
  };

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

          {/* Hindi Work & Skill Contact Notice Box */}
          <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-400/40 text-amber-200 max-w-2xl mx-auto shadow-lg backdrop-blur-xs text-center sm:text-left flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
              <Briefcase className="w-5 h-5 text-amber-300 animate-bounce" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-sm sm:text-base font-extrabold text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
                📢 विशेष सूचना (Work & Skill Contact Notice)
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed mt-1">
                अगर किसी को काम की जरूरत हो या कोई काम का हुनर आता हो, तो वह सीधे मेरे से संपर्क कर सकता है।
              </p>
              <p className="text-xs sm:text-sm font-medium text-amber-200/90 leading-relaxed mt-1">
                अगर कोई मुझे बोलता है या किसी को काम की जरूरत होती है तो मैं फिर आपको कांटेक्ट कर दूंगा। आप अपना कांटेक्ट नंबर मेरे पास लिखवा सकते हैं।
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-bold text-amber-300">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  कॉल/WhatsApp: <a href="tel:8092195302" className="underline font-black text-white hover:text-amber-300">8092195302</a>
                </span>
                <span>•</span>
                <span className="text-pink-300">Instagram: @vickyvirat30</span>
              </div>
            </div>
          </div>

          {/* Form Option Directly Under Special Notice */}
          <div className="mt-3.5 max-w-2xl mx-auto rounded-2xl bg-slate-900/95 border-2 border-amber-400/50 shadow-2xl overflow-hidden backdrop-blur-md transition-all text-left">
            <div 
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="p-3 sm:p-4 bg-gradient-to-r from-amber-500/25 via-slate-900 to-amber-500/15 border-b border-amber-400/30 flex items-center justify-between cursor-pointer select-none hover:bg-slate-800/80 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5 flex-wrap">
                    📝 अपना नाम, नंबर, काम और जरूरत यहां भेजें
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase border border-emerald-400/30">
                      Direct Submit
                    </span>
                  </h4>
                  <p className="text-[11px] sm:text-xs text-amber-200/90 font-medium mt-0.5">
                    विक्की (8092195302) के पास अपनी डिटेल दर्ज कराने के लिए नीचे फॉर्म भरें
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-300 transition-colors shrink-0 ml-2"
              >
                {isFormOpen ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5 text-amber-400" />}
              </button>
            </div>

            {isFormOpen && (
              <div className="p-4 sm:p-5">
                {regSuccess ? (
                  <div className="p-4 sm:p-5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-center space-y-3">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                    <h5 className="text-sm sm:text-base font-black text-white">
                      🎉 धन्यवाद! आपकी जानकारी सफलतापूर्वक दर्ज हो गई है।
                    </h5>
                    <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                      विक्की सोनी (8092195302) आपकी डिटेल सुरक्षित रख रहे हैं और आवश्यकता पड़ने पर सीधे आपसे संपर्क करेंगे।
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        WhatsApp पर भी डायरेक्ट भेजें
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setRegSuccess(false);
                          setRegName('');
                          setRegPhone('');
                          setRegWork('');
                          setRegNotes('');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-all cursor-pointer border border-slate-700"
                      >
                        नया फॉर्म भरें
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleRegSubmit} className="space-y-3.5">
                    {/* Name & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-amber-200 mb-1">
                          👤 आपका नाम (Full Name) <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="जैसे: राहुल शर्मा / विक्की कुमार"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder:text-slate-500 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-amber-200 mb-1">
                          📞 मोबाईल / व्हाट्सएप नंबर <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="10 अंकों का नंबर (जैसे: 8092195302)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder:text-slate-500 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Work / Skill Input */}
                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1">
                        🛠️ आपका काम या हुनर (Your Work / Trade / Skill) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={regWork}
                        onChange={(e) => setRegWork(e.target.value)}
                        placeholder="जैसे: इलेक्ट्रीशियन, प्लंबर, ड्राइवर, पेंटर, मिस्त्री, ट्यूटर, ब्यूटीशियन आदि"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder:text-slate-500 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    {/* Requirement Type Selector */}
                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1.5">
                        📌 आपको क्या जरूरत है? (Select Requirement Type) <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setRegNeedType('need_work')}
                          className={`px-3 py-2.5 rounded-xl text-xs font-extrabold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            regNeedType === 'need_work'
                              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-[1.02]'
                              : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          💼 मुझे काम चाहिए
                        </button>
                        <button
                          type="button"
                          onClick={() => setRegNeedType('need_worker')}
                          className={`px-3 py-2.5 rounded-xl text-xs font-extrabold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            regNeedType === 'need_worker'
                              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-[1.02]'
                              : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          🛠️ काम के लिए बंदा चाहिए
                        </button>
                        <button
                          type="button"
                          onClick={() => setRegNeedType('other')}
                          className={`px-3 py-2.5 rounded-xl text-xs font-extrabold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            regNeedType === 'other'
                              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md scale-[1.02]'
                              : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          ℹ️ अन्य जानकारी / हेल्प
                        </button>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div>
                      <label className="block text-xs font-bold text-amber-200 mb-1">
                        📝 क्या जरूरत है या अतिरिक्त विवरण लिखें (Details / Location / Note)
                      </label>
                      <textarea
                        rows={2}
                        value={regNotes}
                        onChange={(e) => setRegNotes(e.target.value)}
                        placeholder="अपनी आवश्यकता या अपने इलाके (जैसे: भुरकुंडा, बासल, सयाल, रामगढ़) के बारे में बताएं..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder:text-slate-500 text-xs sm:text-sm font-medium focus:outline-none focus:border-amber-400 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        जानकारी सबमिट करें (Submit)
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        WhatsApp पर भेजें
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
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

