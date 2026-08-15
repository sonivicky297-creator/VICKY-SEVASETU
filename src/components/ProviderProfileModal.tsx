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
  Sparkles,
  Edit3
} from 'lucide-react';
import { ServiceProvider } from '../types';
import { useApp } from '../context/AppContext';
import { BarcodeModal } from './BarcodeModal';
import { TaskImageEditorModal } from './TaskImageEditorModal';
import { EditProviderModal } from './EditProviderModal';

interface ProviderProfileModalProps {
  provider: ServiceProvider;
  onClose: () => void;
  onBookNow: (provider: ServiceProvider) => void;
}

export const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({
  provider,
  onClose,
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

  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews'>('overview');
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
    `Hello ${provider.name}, I viewed your profile on Vicky Seva Setu and want to inquire about booking your services in Bhurkunda / Ramgarh & nearby areas.`
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
      addToast('Please enter your name and comment.', 'error');
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
    addToast('Review added successfully!', 'success');
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
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header with Cover Banner & Close Button */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-6 sm:p-8 text-white shrink-0">
          <button
            onClick={onClose}
            id="close-provider-profile-btn"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Large Avatar */}
            <div className="relative shrink-0">
              <img
                src={provider.avatar}
                alt={provider.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-3 border-amber-400/80 shadow-lg"
              />
              {provider.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Header info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
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
                      ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/35'
                      : 'bg-rose-500/25 text-rose-300 border-rose-500/40 hover:bg-rose-500/35'
                  }`}
                  title="Click to toggle availability status"
                >
                  <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                  <span>{isAvailable ? 'Available Now' : 'Not Available'}</span>
                </button>

                {provider.isVerified && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {t.verifiedBadge}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                {provider.name}
              </h2>
              
              <p className="text-sm sm:text-base text-amber-300 font-medium mt-0.5">
                {provider.title}
              </p>

              {/* Meta stats row */}
              <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1 text-amber-400 font-bold bg-slate-800/80 px-2 py-0.5 rounded-md">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{provider.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({provider.reviewCount} reviews)</span>
                </span>

                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>{provider.experienceYears} {t.years} exp</span>
                </span>

                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{provider.location.area}, {provider.location.city}</span>
                </span>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div className="hidden md:flex flex-col gap-2 shrink-0">
              <button
                onClick={handleEditClick}
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                title="Edit Specialist Profile (Protected by Owner Lock)"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => setShowBarcodeModal(true)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors border border-white/20"
                title="View Verified Barcode / ID Pass"
              >
                <BarcodeIcon className="w-4 h-4 text-amber-400" />
                <span>Barcode Pass</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100/80 border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-amber-600 text-amber-700 bg-white shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.overviewTab}
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'portfolio'
                  ? 'border-amber-600 text-amber-700 bg-white shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>{t.portfolioTab}</span>
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                {provider.portfolio.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-amber-600 text-amber-700 bg-white shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>{t.reviewsTab}</span>
              <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                {provider.reviews.length}
              </span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: OVERVIEW & RATES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Bio */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>{t.aboutProvider}</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {provider.bio}
                </p>
              </div>

              {/* Service Areas & Timings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase mb-1">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>{t.workingHours}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    {provider.availableTimings}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase mb-1">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>{t.serviceRadius}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">
                    {provider.location.area} ({provider.serviceRadiusKm} km radius)
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{provider.location.fullAddress}</p>
                </div>
              </div>

              {/* Verification Badges Earned */}
              {provider.verificationBadges && provider.verificationBadges.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                    {t.badgesEarned}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {provider.verificationBadges.map((badgeKey) => (
                      <div
                        key={badgeKey}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-semibold">
                          {t.badges[badgeKey] || badgeKey}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specialist Services & Consultation */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Specialist Services & Coverage
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3 sm:p-4">Service Offered</th>
                        <th className="p-3 sm:p-4 text-right">Consultation & Quote</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {provider.servicesOffered.map((svc) => (
                        <tr key={svc.id} className="hover:bg-slate-50">
                          <td className="p-3 sm:p-4 font-semibold text-slate-800">
                            {svc.name}
                          </td>
                          <td className="p-3 sm:p-4 text-right font-bold text-emerald-700">
                            Direct On-Site Estimate <span className="text-[11px] font-normal text-slate-500 block sm:inline">(0% Advance)</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PORTFOLIO GALLERY */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase">
                    10 Task Portfolio Images & Past Work Samples
                  </h4>
                  <p className="text-xs text-slate-500">
                    High-resolution verified project images from Bhurkunda, Ramgarh & surrounding areas
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowImageEditorModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit 10 Images</span>
                  </button>

                  <button
                    onClick={() => setShowBarcodeModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <BarcodeIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>Barcode</span>
                  </button>
                </div>
              </div>

              {provider.portfolio.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {provider.portfolio.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPortfolioImg(item.imageUrl)}
                      className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer aspect-4/3"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 p-3 flex flex-col justify-end text-white">
                        <p className="text-xs font-bold leading-tight">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic py-6 text-center">
                  No portfolio images available.
                </p>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOMER REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              
              {/* Summary and Add Review Trigger */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-black text-amber-800">
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
                    <h4 className="text-sm font-bold text-amber-950">
                      100% Verified Customer Feedback
                    </h4>
                    <p className="text-xs text-amber-800">
                      {provider.reviewCount} customer reviews
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs shrink-0"
                >
                  {showReviewForm ? 'Cancel' : t.writeReview}
                </button>
              </div>

              {/* Write Review Form Drawer */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="bg-white border-2 border-amber-400 rounded-2xl p-5 space-y-4 shadow-md"
                >
                  <h4 className="text-sm font-bold text-slate-900">
                    {t.writeReview}
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.yourRating}
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
                      <span className="text-xs font-bold text-slate-700 ml-2">({newReviewRating} / 5)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">{t.yourName} *</label>
                      <input
                        type="text"
                        required
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">{t.yourCity}</label>
                      <input
                        type="text"
                        value={newReviewCity}
                        onChange={(e) => setNewReviewCity(e.target.value)}
                        placeholder="e.g. Bahadurgarh Sector 6"
                        className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Service Done (e.g. Fan Fitting / Wiring)
                    </label>
                    <input
                      type="text"
                      value={newReviewService}
                      onChange={(e) => setNewReviewService(e.target.value)}
                      placeholder="e.g. Electrical Wiring"
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">{t.yourReview} *</label>
                    <textarea
                      required
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Describe how the job was done, punctuality, and behavior..."
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    {t.submitReview}
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-3">
                {provider.reviews.map((rev) => (
                  <div key={rev.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{rev.userName}</span>
                        <span className="text-slate-400 text-xs ml-2">• {rev.userCity}</span>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed mb-2">
                      "{rev.comment}"
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{rev.serviceDone}</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (!canEditDocument) {
                  openOwnerUnlockModal(() => toggleProviderAvailableNow(provider.id));
                } else {
                  toggleProviderAvailableNow(provider.id);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                isAvailable 
                  ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300' 
                  : 'bg-rose-100 hover:bg-rose-200 text-rose-950 border border-rose-300'
              }`}
              title="Click to toggle availability status"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600'}`} />
              <span>{isAvailable ? 'Available Now' : 'Not Available'}</span>
            </button>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold text-slate-800 block">Direct Local Settlement</span>
              <span className="text-[11px] text-slate-500">Zero Brokerage • Pay on Completion</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
            <a
              href={`tel:${provider.phone}`}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>{t.callNow}</span>
            </a>

            <a
              href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookNow(provider);
              }}
              id="profile-modal-book-btn"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.requestService}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Lightbox for Portfolio Zoom */}
      {selectedPortfolioImg && (
        <div
          onClick={() => setSelectedPortfolioImg(null)}
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={selectedPortfolioImg}
            alt="Work sample"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
          />
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
