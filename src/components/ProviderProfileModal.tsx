import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  Clock, 
  Phone, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Share2, 
  Image as ImageIcon,
  Info,
  Barcode as BarcodeIcon,
  Edit3,
  ArrowLeft,
  Award,
  Layers,
  Home,
  Check
} from 'lucide-react';
import { ServiceProvider } from '../types';
import { useApp } from '../context/AppContext';
import { BarcodeModal } from './BarcodeModal';
import { TaskImageEditorModal } from './TaskImageEditorModal';
import { EditProviderModal } from './EditProviderModal';

interface ProviderProfileModalProps {
  provider: ServiceProvider;
  onClose: () => void;
  onGoHome?: () => void;
  onBookNow: (provider: ServiceProvider) => void;
}

export const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({
  provider,
  onClose,
  onGoHome,
  onBookNow,
}) => {
  const { 
    t, 
    categories, 
    addProviderReview, 
    addToast,
    toggleProviderAvailableNow,
    canEditDocument,
    openOwnerUnlockModal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews' | 'idcard'>('overview');
  const [selectedPortfolioImg, setSelectedPortfolioImg] = useState<string | null>(null);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [showImageEditorModal, setShowImageEditorModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const isAvailable = (provider.isActive !== false) && (provider.isOpen !== false) && (!provider.isClosedToday);

  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewService, setNewReviewService] = useState('');

  const category = categories.find(c => c.id === provider.categoryId);

  const cleanPhone = provider.whatsapp?.replace(/[^0-9]/g, '') || '918092195302';
  const whatsappMsg = encodeURIComponent(
    `Hello ${provider.name}, I viewed your detailed profile on Vicky Seva Setu and want to inquire about booking your services in Bhurkunda / Ramgarh & nearby areas.`
  );

  const handleEditClick = () => {
    if (!canEditDocument) {
      openOwnerUnlockModal(() => setShowEditModal(true));
    } else {
      setShowEditModal(true);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      addToast('कृपया अपना नाम और समीक्षा (कमेंट) भरें।', 'error');
      return;
    }

    addProviderReview(provider.id, {
      userName: newReviewName.trim(),
      userCity: newReviewCity.trim() || provider.location.city,
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      serviceDone: newReviewService.trim() || 'Service Work'
    });

    setShowReviewForm(false);
    setNewReviewName('');
    setNewReviewCity('');
    setNewReviewComment('');
    setNewReviewService('');
    addToast('समीक्षा सफलतापूर्वक दर्ज कर दी गई है!', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${provider.name} - ${provider.title}`,
        text: `Check out ${provider.name} on Vicky Seva Setu Local Services in Bhurkunda & Ramgarh!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Profile link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-none sm:rounded-3xl shadow-2xl overflow-hidden h-[100dvh] sm:h-[92vh] flex flex-col border border-slate-200">
        
        {/* Modal Top Header with Navigation & Profile Identity */}
        <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 p-3.5 sm:p-6 text-white shrink-0 shadow-md">
          
          {/* Top Control Bar: Direct Home & Back */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {onGoHome && (
                <button
                  type="button"
                  onClick={onGoHome}
                  id="profile-direct-home-btn"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-black text-xs transition-all active:scale-95 border border-white/25 shadow-sm"
                  title="Direct Home / मुख्य होम पेज पर जाएं"
                >
                  <Home className="w-3.5 h-3.5 text-amber-400" />
                  <span>होम पेज</span>
                </button>
              )}

              <button
                onClick={onClose}
                id="back-provider-profile-btn"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all active:scale-95 shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>पीछे जाएं</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors flex items-center gap-1 text-xs font-bold"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                onClick={onClose}
                id="close-provider-profile-btn"
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Profile Card Header with Avatar & Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-5">
            {/* Large Avatar with Verified Shield */}
            <div className="relative shrink-0">
              <img
                src={provider.avatar}
                alt={provider.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-3 border-amber-400 shadow-xl"
              />
              {provider.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1.5 shadow-md ring-2 ring-slate-900">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Header info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400/25 text-amber-300 border border-amber-400/40">
                  {category ? category.name : 'Local Pro'}
                </span>
                
                {/* Availability status badge */}
                <button
                  type="button"
                  onClick={() => {
                    if (!canEditDocument) {
                      openOwnerUnlockModal(() => toggleProviderAvailableNow(provider.id));
                    } else {
                      toggleProviderAvailableNow(provider.id);
                    }
                  }}
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border transition-all cursor-pointer ${
                    isAvailable
                      ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400/50 hover:bg-emerald-500/40'
                      : 'bg-rose-500/30 text-rose-300 border-rose-400/50 hover:bg-rose-500/40'
                  }`}
                  title="उपलब्धता बदलें"
                >
                  <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                  <span>{isAvailable ? '🟢 Available Now' : '🔴 Not Available'}</span>
                </button>

                {provider.isVerified && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>सत्यापित</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight break-words">
                {provider.name}
              </h2>
              
              <p className="text-xs sm:text-sm text-amber-300 font-bold mt-0.5 leading-snug break-words">
                {provider.title}
              </p>

              {/* Meta stats row */}
              <div className="mt-2 flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs sm:text-sm text-slate-200">
                <span className="flex items-center gap-1 text-amber-300 font-extrabold bg-slate-800/90 px-2 py-0.5 rounded-md border border-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{provider.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({provider.reviewCount} रिव्यू)</span>
                </span>

                <span className="flex items-center gap-1 font-semibold">
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  <span>{provider.experienceYears} वर्ष अनुभव</span>
                </span>

                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{provider.location.area || provider.location.city}</span>
                </span>
              </div>
            </div>

            {/* Quick Actions (Edit, Barcode) in Header */}
            <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <button
                onClick={handleEditClick}
                className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                title="प्रोफाइल एडिट करें"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>एडिट प्रोफाइल</span>
              </button>

              <button
                onClick={() => setShowBarcodeModal(true)}
                className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors border border-white/20"
                title="डिजिटल बारकोड आईडी"
              >
                <BarcodeIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>आईडी बारकोड</span>
              </button>
            </div>

          </div>
        </div>

        {/* Tab Navigation - Horizontal Scrollable on Mobile */}
        <div className="bg-slate-100 border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between overflow-x-auto shrink-0 scrollbar-none">
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-black border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'overview'
                  ? 'border-amber-600 text-amber-800 bg-white shadow-2xs rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Info className="w-4 h-4 text-amber-600" />
              <span>📋 विवरण & रेट्स</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-black border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'portfolio'
                  ? 'border-amber-600 text-amber-800 bg-white shadow-2xs rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>📸 10 काम के फोटो</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 font-black">
                {provider.portfolio?.length || 10}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-black border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'reviews'
                  ? 'border-amber-600 text-amber-800 bg-white shadow-2xs rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500" />
              <span>⭐ ग्राहक रिव्यू</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-800 font-bold">
                {provider.reviews?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('idcard')}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-black border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'idcard'
                  ? 'border-amber-600 text-amber-800 bg-white shadow-2xs rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarcodeIcon className="w-4 h-4 text-slate-700" />
              <span>🪪 डिजिटल आईडी</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto flex-1 bg-slate-50 space-y-5">
          
          {/* TAB 1: OVERVIEW & RATES */}
          {activeTab === 'overview' && (
            <div className="space-y-4 sm:space-y-5">
              
              {/* Bio & Intro - Full Text, No Cutoff */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>विशेषज्ञ परिचय एवं योग्यता (About & Qualifications)</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 break-words">
                  {provider.bio}
                </p>
              </div>

              {/* Service Areas & Timings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase mb-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>कार्य समय व उपलब्धता (Working Hours)</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {provider.availableTimings || 'सुबह 7:00 AM से रात 8:30 PM (रोजाना)'}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-bold mt-1">
                    ✓ ऑन-डिमांड तुरंत विजिट या होम ट्यूशन / रिपेयर उपलब्ध
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase mb-1.5">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>कवर एरिया व दूरी (Service Radius)</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {provider.location.area}, {provider.location.city} ({provider.serviceRadiusKm || 25} किमी दायरा)
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">{provider.location.fullAddress}</p>
                </div>
              </div>

              {/* Skills & Key Specializations */}
              {provider.skills && provider.skills.length > 0 && (
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>प्रमुख विषय व कार्य कौशल (Key Subjects & Skills)</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-bold px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specialist Services & Rates */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-3.5 sm:p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-amber-600" />
                    <span>सेवाएं व परामर्श शुल्क (Services Offered & Rates)</span>
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    0% कमीशन
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3 sm:p-4">सेवा का नाम (Service Offered)</th>
                        <th className="p-3 sm:p-4 text-right">परामर्श / अनुमानित रेट</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {provider.servicesOffered.map((svc) => (
                        <tr key={svc.id} className="hover:bg-slate-50">
                          <td className="p-3 sm:p-4 font-bold text-slate-800">
                            {svc.name}
                          </td>
                          <td className="p-3 sm:p-4 text-right font-extrabold text-emerald-700">
                            डायरेक्ट ऑन-साइट एस्टीमेट <span className="text-[11px] font-normal text-slate-500 block sm:inline">(उचित व पारदर्शी मूल्य)</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Verification Badges */}
              {provider.verificationBadges && provider.verificationBadges.length > 0 && (
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>सत्यापित सुरक्षा व प्रमाणन (Verified Badges)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {provider.verificationBadges.map((badgeKey) => (
                      <div
                        key={badgeKey}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold text-xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          {t.badges[badgeKey] || badgeKey}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: 10 PORTFOLIO GALLERY IMAGES */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase">
                    📸 10 काम के फोटो व कार्य नमूने (Task Portfolio Photos)
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    भुरकुंडा, रामगढ़ व आसपास के क्षेत्रों में किए गए प्रमाणित कार्यों की तस्वीरें
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowImageEditorModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>10 फोटो बदलें</span>
                  </button>

                  <button
                    onClick={() => setShowBarcodeModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <BarcodeIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>बारकोड</span>
                  </button>
                </div>
              </div>

              {provider.portfolio && provider.portfolio.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                  {provider.portfolio.map((item, pIdx) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPortfolioImg(item.imageUrl)}
                      className="group relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100 cursor-pointer aspect-4/3 shadow-xs hover:border-amber-500 hover:shadow-md transition-all"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-slate-950/80 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-md">
                        फोटो #{pIdx + 1}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-95 p-3 flex flex-col justify-end text-white">
                        <p className="text-xs font-bold leading-tight">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                        )}
                        <span className="text-[10px] text-amber-300 font-bold mt-1">
                          🔍 बड़ा देखने के लिए टैप करें
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic py-6 text-center bg-white rounded-2xl border border-slate-200">
                  कोई फोटो उपलब्ध नहीं है।
                </p>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOMER REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4 sm:space-y-5">
              
              {/* Summary and Add Review Trigger */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-black text-amber-900">
                      {provider.rating.toFixed(1)}
                    </p>
                    <div className="flex items-center text-amber-500 justify-center mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < Math.round(provider.rating) ? 'fill-amber-500' : 'text-slate-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <div className="border-l border-amber-200 pl-4">
                    <h4 className="text-sm font-black text-amber-950">
                      100% सत्यापित ग्राहक समीक्षाएं
                    </h4>
                    <p className="text-xs text-amber-800">
                      {provider.reviewCount} ग्राहकों ने फीडबैक दिया है
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs shrink-0"
                >
                  {showReviewForm ? 'रद्द करें' : '✍️ अपना रिव्यू दें (Write Review)'}
                </button>
              </div>

              {/* Write Review Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="bg-white border-2 border-amber-400 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-md"
                >
                  <h4 className="text-sm font-black text-slate-900">
                    ✍️ {provider.name} के लिए अपना अनुभव साझा करें
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      आपकी रेटिंग (Rating):
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star className={`w-6 h-6 ${star <= newReviewRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-2">({newReviewRating} स्टार)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">आपका नाम *</label>
                      <input
                        type="text"
                        required
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        placeholder="उदा. रमेश कुमार"
                        className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">शहर / इलाका</label>
                      <input
                        type="text"
                        value={newReviewCity}
                        onChange={(e) => setNewReviewCity(e.target.value)}
                        placeholder="उदा. भुरकुंडा"
                        className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      कौन सा काम कराया?
                    </label>
                    <input
                      type="text"
                      value={newReviewService}
                      onChange={(e) => setNewReviewService(e.target.value)}
                      placeholder="उदा. होम ट्यूशन / रिपेयरिंग / वायरिंग"
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">आपकी राय *</label>
                    <textarea
                      required
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="समय की पाबंदी, काम की गुणवत्ता और व्यवहार..."
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    रिव्यू सबमिट करें (Submit Review)
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-3">
                {provider.reviews && provider.reviews.length > 0 ? (
                  provider.reviews.map((rev) => (
                    <div key={rev.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{rev.userName}</span>
                          <span className="text-slate-400 text-xs ml-2">• {rev.userCity}</span>
                        </div>
                        <div className="flex items-center text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed mb-2 break-words">
                        "{rev.comment}"
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{rev.serviceDone}</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic text-center py-6 bg-white rounded-2xl border border-slate-200">
                    अभी तक कोई समीक्षा नहीं है। पहले समीक्षक बनें!
                  </p>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: DIGITAL ID & BARCODE PASS */}
          {activeTab === 'idcard' && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 max-w-lg mx-auto text-center">
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-amber-400 tracking-wider">VICKY SEVA SETU</span>
                    <h5 className="text-sm font-black">डिजिटल आईडी व सुरक्षा पास</h5>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>

                <div className="flex items-center gap-3 text-left">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-16 h-16 rounded-xl object-cover border border-amber-400"
                  />
                  <div>
                    <h6 className="font-extrabold text-sm text-white">{provider.name}</h6>
                    <p className="text-xs text-amber-300">{provider.title}</p>
                    <p className="text-[11px] text-slate-300">📍 {provider.location.city}, {provider.location.area}</p>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl">
                  {/* Visual Barcode bars */}
                  <div className="flex items-center justify-center gap-1 h-12">
                    {[12, 28, 16, 32, 20, 14, 30, 24, 18, 28, 14, 22, 32, 16, 26, 12, 30, 20].map((h, i) => (
                      <div
                        key={i}
                        className="bg-slate-900 w-1.5 rounded-xs"
                        style={{ height: `${h + 10}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-800 block mt-1">
                    VSS-{provider.location.city.substring(0, 3).toUpperCase()}-{provider.id.replace(/[^0-9]/g, '') || '8092'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setShowBarcodeModal(true)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  पूरा आईडी कार्ड बड़ा देखें (Open Full ID)
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Footer Actions - Mobile First */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-lg">
          
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            {onGoHome && (
              <button
                type="button"
                onClick={onGoHome}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-amber-400 text-xs font-black hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1"
                title="सीधे होम पेज पर जाएं"
              >
                <Home className="w-3.5 h-3.5" />
                <span>होम पेज</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (!canEditDocument) {
                  openOwnerUnlockModal(() => toggleProviderAvailableNow(provider.id));
                } else {
                  toggleProviderAvailableNow(provider.id);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                isAvailable 
                  ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300' 
                  : 'bg-rose-100 hover:bg-rose-200 text-rose-950 border border-rose-300'
              }`}
              title="उपलब्धता बदलें"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600'}`} />
              <span>{isAvailable ? '🟢 Available Now' : '🔴 Not Available'}</span>
            </button>
          </div>

          <div className="grid grid-cols-3 sm:flex items-center justify-end gap-2 w-full sm:w-auto">
            <a
              href={`tel:${provider.phone || '8092195302'}`}
              className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-1 shadow-xs transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>कॉल (Call)</span>
            </a>

            <a
              href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-1 shadow-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookNow(provider);
              }}
              id="profile-modal-book-btn"
              className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs sm:text-sm font-black flex items-center justify-center gap-1 shadow-md hover:shadow-lg transition-colors"
            >
              <Calendar className="w-4 h-4 text-slate-950 shrink-0" />
              <span>बुक करें</span>
            </button>
          </div>

        </div>

      </div>

      {/* Lightbox for Portfolio Zoom */}
      {selectedPortfolioImg && (
        <div
          onClick={() => setSelectedPortfolioImg(null)}
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer animate-fadeIn"
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedPortfolioImg(null)}
              className="absolute -top-10 right-0 text-white hover:text-amber-400 p-2 font-bold flex items-center gap-1 text-sm"
            >
              <X className="w-6 h-6" />
              <span>Close</span>
            </button>
            <img
              src={selectedPortfolioImg}
              alt="Work sample high-resolution"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain mx-auto shadow-2xl border border-white/20"
            />
          </div>
        </div>
      )}

      {/* Barcode Modal */}
      {showBarcodeModal && (
        <BarcodeModal
          provider={provider}
          onClose={() => setShowBarcodeModal(false)}
        />
      )}

      {/* 10 Task Portfolio Images Editor Modal */}
      {showImageEditorModal && (
        <TaskImageEditorModal
          provider={provider}
          onClose={() => setShowImageEditorModal(false)}
        />
      )}

      {/* Edit Provider Modal (9 Fields) */}
      {showEditModal && (
        <EditProviderModal
          provider={provider}
          onClose={() => setShowEditModal(false)}
        />
      )}

    </div>
  );
};
