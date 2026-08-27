import React, { useState, useMemo } from 'react';
import { 
  X, 
  Users, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Star, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Barcode as BarcodeIcon,
  Image as ImageIcon,
  Edit3,
  ArrowLeft,
  Search,
  Eye,
  Briefcase,
  Clock,
  Filter,
  Home,
  Check,
  ChevronRight
} from 'lucide-react';
import { Category, ServiceProvider } from '../types';
import { useApp } from '../context/AppContext';
import { renderCategoryIcon } from '../utils/iconHelper';

interface TaskTeamModalProps {
  category: Category;
  onClose: () => void;
  onGoHome?: () => void;
  onSelectProviderForProfile: (provider: ServiceProvider) => void;
  onSelectProviderForBooking: (provider: ServiceProvider) => void;
  onOpenBarcode: (provider: ServiceProvider) => void;
  onOpenImageEditor: (provider: ServiceProvider) => void;
  onOpenEdit?: (provider: ServiceProvider) => void;
}

export const TaskTeamModal: React.FC<TaskTeamModalProps> = ({
  category,
  onClose,
  onGoHome,
  onSelectProviderForProfile,
  onSelectProviderForBooking,
  onOpenBarcode,
  onOpenImageEditor,
  onOpenEdit
}) => {
  const { 
    providers, 
    toggleProviderAvailableNow,
    canEditDocument,
    openOwnerUnlockModal 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'closed'>('all');

  // Filter providers assigned to this specific category / task
  const assignedProviders = useMemo(() => {
    return providers.filter(p => p.categoryId === category.id);
  }, [providers, category.id]);

  const distinctAreas = useMemo(() => {
    return Array.from(new Set(assignedProviders.map(p => p.location.city)));
  }, [assignedProviders]);

  const filteredTeam = useMemo(() => {
    return assignedProviders.filter(p => {
      // Area filter
      if (areaFilter !== 'all') {
        const cityMatch = p.location.city.toLowerCase() === areaFilter.toLowerCase();
        const areaMatch = p.location.area.toLowerCase().includes(areaFilter.toLowerCase());
        if (!cityMatch && !areaMatch) return false;
      }

      // Availability filter
      const isAvailable = (p.isActive !== false) && (p.isOpen !== false) && (!p.isClosedToday);
      if (availabilityFilter === 'available' && !isAvailable) return false;
      if (availabilityFilter === 'closed' && isAvailable) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesTitle = ((p.title || '') + ' ' + (p.titleEn || '')).toLowerCase().includes(q);
        const matchesSkills = p.skills.some(s => s.toLowerCase().includes(q));
        const matchesArea = (p.location.area + ' ' + p.location.city).toLowerCase().includes(q);
        const matchesBio = (p.bio || '').toLowerCase().includes(q);
        if (!matchesName && !matchesTitle && !matchesSkills && !matchesArea && !matchesBio) {
          return false;
        }
      }

      return true;
    });
  }, [assignedProviders, areaFilter, availabilityFilter, searchQuery]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-sm animate-fadeIn overflow-hidden">
      <div className="bg-white rounded-none sm:rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col h-[100dvh] sm:h-[92vh]">
        
        {/* Top Header - Optimized for Mobile with Direct Home & Back Buttons */}
        <div className={`bg-gradient-to-r ${category.color || 'from-slate-900 to-slate-800'} p-3 sm:p-5 text-white shrink-0 shadow-md`}>
          
          {/* Nav Action Buttons Bar */}
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              {/* Direct Home Button */}
              {onGoHome && (
                <button
                  type="button"
                  onClick={onGoHome}
                  id="team-modal-home-btn"
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 border border-white/25 shadow-xs shrink-0"
                  title="Direct Home / मुख्य होम पेज पर जाएं"
                >
                  <Home className="w-3.5 h-3.5 text-amber-400" />
                  <span>होम पेज</span>
                </button>
              )}

              {/* Direct Back Button */}
              <button
                type="button"
                onClick={onClose}
                id="team-modal-back-btn"
                className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 shrink-0"
                title="Back / वापस जाएं"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>पीछे जाएं</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide shrink-0 shadow-xs">
                कुल {assignedProviders.length} सदस्य
              </span>

              <button
                onClick={onClose}
                id="team-modal-close-btn"
                className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Info Heading */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-xs shrink-0">
              {renderCategoryIcon(category.iconName, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-xl font-extrabold text-white leading-tight">
                {category.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-white/90 leading-tight mt-0.5">
                भुरकुंडा, रामगढ़, सयाल, सौंदा, बासल व आसपास के सभी सत्यापित विशेषज्ञ
              </p>
            </div>
          </div>

          {/* Quick Search inside Task Team */}
          <div className="mt-2.5 sm:mt-3 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="नाम, विषय, अनुभव या इलाका खोजें (Search member, skill, area)..."
              className="w-full bg-white text-slate-900 placeholder:text-slate-500 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-800"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Local Area Filter & Availability Badges Strip */}
        <div className="bg-slate-100 border-b border-slate-200 px-3 sm:px-6 py-2 flex items-center justify-between gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-extrabold text-slate-700 uppercase flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-600" />
              <span>इलाका:</span>
            </span>

            <button
              onClick={() => setAreaFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                areaFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              सभी ({assignedProviders.length})
            </button>

            {distinctAreas.map(area => (
              <button
                key={area}
                onClick={() => setAreaFilter(area)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  areaFilter === area
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setAvailabilityFilter(prev => prev === 'available' ? 'all' : 'available')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border shrink-0 ${
                availabilityFilter === 'available'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                  : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              🟢 केवल उपलब्ध
            </button>
          </div>
        </div>

        {/* Assigned Team Cards List - Fully Responsive without text clipping on mobile */}
        <div className="p-3 sm:p-5 md:p-6 overflow-y-auto flex-1 bg-slate-50 space-y-4">
          
          {/* Summary Strip */}
          <div className="flex items-center justify-between text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Users className="w-4 h-4 text-amber-600" />
              <span>टीम सूची: {filteredTeam.length} मेंबर्स</span>
            </div>
            <span className="text-[11px] text-amber-700 font-bold hidden sm:inline">
              किसी भी प्रोफाइल पर क्लिक करके पूरा विवरण व 10 फोटो देखें
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTeam.map((pro, idx) => {
              const isAvailable = (pro.isActive !== false) && (pro.isOpen !== false) && (!pro.isClosedToday);
              const cleanPhone = (pro.whatsapp || pro.phone || '918092195302').replace(/[^0-9]/g, '');
              const whatsappMsg = encodeURIComponent(
                `Hello ${pro.name}, I found your profile in ${category.name} (#${idx + 1}) on Vicky Seva Setu. I want to inquire about booking your services in Bhurkunda / Ramgarh.`
              );

              return (
                <div
                  key={pro.id}
                  id={`team-member-card-${pro.id}`}
                  className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-slate-200 hover:border-amber-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group shadow-xs"
                >
                  <div className="space-y-3">
                    
                    {/* Top Sequential Number Banner & Availability */}
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 shadow-2xs">
                          <span>क्रमांक #{idx + 1}</span>
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          {category.name}
                        </span>
                      </div>

                      {/* Status indicator */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!canEditDocument) {
                            openOwnerUnlockModal(() => toggleProviderAvailableNow(pro.id));
                          } else {
                            toggleProviderAvailableNow(pro.id);
                          }
                        }}
                        className={`text-[11px] font-black px-2.5 py-1 rounded-lg border transition-all ${
                          isAvailable
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                        }`}
                        title="उपलब्धता बदलें"
                      >
                        {isAvailable ? '🟢 Available' : '🔴 Not Available'}
                      </button>
                    </div>

                    {/* Specialist Profile Main Block */}
                    <div 
                      onClick={() => onSelectProviderForProfile(pro)}
                      className="flex items-start gap-3.5 cursor-pointer"
                    >
                      {/* Avatar with Verified Shield */}
                      <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-amber-300 shadow-md group-hover:scale-105 transition-transform">
                        <img
                          src={pro.avatar}
                          alt={pro.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {pro.isVerified && (
                          <div className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-md">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className="absolute bottom-0 inset-x-0 bg-slate-900/90 text-[10px] font-black text-amber-300 text-center py-0.5">
                          10 Photos
                        </span>
                      </div>

                      {/* Name, Full Title, and Key Badges */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug break-words">
                            {pro.name}
                          </h4>
                          {pro.isVerified && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                              सत्यापित
                            </span>
                          )}
                        </div>

                        {/* Full Title (No cut-off) */}
                        <p className="text-xs sm:text-sm font-bold text-amber-800 leading-snug mt-0.5 break-words">
                          {pro.title}
                        </p>

                        {/* Rating, Exp, City */}
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-slate-600 mt-2">
                          <span className="flex items-center gap-1 font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>{pro.rating.toFixed(1)}</span>
                            <span className="text-[10px] text-slate-500 font-normal">({pro.reviewCount})</span>
                          </span>

                          <span className="flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                            <Briefcase className="w-3 h-3 text-slate-500" />
                            <span>{pro.experienceYears} वर्ष अनुभव</span>
                          </span>

                          <span className="flex items-center gap-1 text-slate-800 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{pro.location.area || pro.location.city}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Full Readable Bio / Qualifications */}
                    <div 
                      onClick={() => onSelectProviderForProfile(pro)}
                      className="bg-slate-50 hover:bg-amber-50/50 p-3 rounded-xl border border-slate-200 cursor-pointer transition-colors"
                    >
                      <p className="text-xs text-slate-700 leading-relaxed break-words">
                        {pro.bio}
                      </p>
                    </div>

                    {/* Key Skills & Subjects Pills */}
                    {pro.skills && pro.skills.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase block">
                          प्रमुख विषय / कार्य:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {pro.skills.map((sk, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200"
                            >
                              ✓ {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Tools Strip (10 Photos, Barcode ID, Edit) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenImageEditor(pro);
                          }}
                          className="text-slate-800 hover:text-amber-900 font-bold flex items-center gap-1 text-xs bg-slate-100 hover:bg-amber-100 px-2.5 py-1 rounded-lg transition-colors border border-slate-200 shadow-2xs"
                          title="10 फोटो देखें व बदलें"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                          <span>10 फोटो</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBarcode(pro);
                          }}
                          className="text-slate-800 hover:text-slate-950 font-mono font-bold flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors border border-slate-200 shadow-2xs"
                          title="डिजिटल बारकोड व आईडी कार्ड"
                        >
                          <BarcodeIcon className="w-3.5 h-3.5 text-slate-700" />
                          <span>बारकोड ID</span>
                        </button>

                        {onOpenEdit && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!canEditDocument) {
                                openOwnerUnlockModal(() => onOpenEdit(pro));
                              } else {
                                onOpenEdit(pro);
                              }
                            }}
                            className="text-blue-800 hover:text-blue-950 font-bold flex items-center gap-1 text-xs bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors border border-blue-200 shadow-2xs"
                            title="एडिट करें"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                            <span>एडिट</span>
                          </button>
                        )}
                      </div>

                      <span className="text-[11px] text-slate-600 font-bold">
                        📍 {pro.location.city}
                      </span>
                    </div>
                  </div>

                  {/* Actions Section: Primary Full Profile + Direct Contact Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    
                    {/* PRIMARY PROMINENT ACTION: VIEW FULL DETAILS */}
                    <button
                      type="button"
                      onClick={() => onSelectProviderForProfile(pro)}
                      id={`view-member-profile-btn-${pro.id}`}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                    >
                      <Eye className="w-4 h-4 text-slate-950" />
                      <span>👤 पूरा प्रोफाइल व 10 फोटो देखें (View Full Details)</span>
                    </button>

                    {/* SECONDARY ROW: CALL, WHATSAPP, BOOK */}
                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href={`tel:${(pro.phone || '8092195302').replace(/[^0-9+]/g, '')}`}
                        className="py-2.5 px-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1 transition-colors shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <span>कॉल करें</span>
                      </a>

                      <a
                        href={`https://wa.me/${cleanPhone || '918092195302'}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-1 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-xs flex items-center justify-center gap-1 transition-colors shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => onSelectProviderForBooking(pro)}
                        className="py-2.5 px-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-1 transition-colors shadow-xs"
                      >
                        <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>बुक करें</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {filteredTeam.length === 0 && (
            <div className="text-center py-12 space-y-3 bg-white rounded-2xl border border-slate-200 p-6">
              <Users className="w-12 h-12 text-slate-300 mx-auto" />
              <h5 className="text-base font-bold text-slate-800">
                कोई विशेषज्ञ नहीं मिला (No specialists found)
              </h5>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                फ़िल्टर साफ़ करें या 'सभी' चुनकर सभी {assignedProviders.length} सदस्यों को देखें।
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setAreaFilter('all');
                  setAvailabilityFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-xs"
              >
                फ़िल्टर रीसेट करें (Reset Filters)
              </button>
            </div>
          )}

        </div>

        {/* Modal Sticky Bottom Footer */}
        <div className="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {onGoHome && (
              <button
                type="button"
                onClick={onGoHome}
                className="px-3 py-1.5 rounded-xl bg-slate-900 text-amber-400 text-xs font-black hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1"
              >
                <Home className="w-3.5 h-3.5" />
                <span>होम पेज</span>
              </button>
            )}
            <span className="text-xs text-slate-700 font-semibold hidden sm:inline">
              📞 हेल्पलाइन: <strong className="text-slate-950">8092195302</strong> (0% कमीशन)
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-black hover:bg-amber-400 transition-colors shadow-md flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>पीछे जाएं (Close)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
