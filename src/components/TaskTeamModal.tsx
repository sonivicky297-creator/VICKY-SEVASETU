import React, { useState } from 'react';
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
  ArrowRight,
  Barcode as BarcodeIcon,
  Image as ImageIcon,
  Sparkles,
  Edit3
} from 'lucide-react';
import { Category, ServiceProvider } from '../types';
import { useApp } from '../context/AppContext';
import { renderCategoryIcon } from '../utils/iconHelper';

interface TaskTeamModalProps {
  category: Category;
  onClose: () => void;
  onSelectProviderForProfile: (provider: ServiceProvider) => void;
  onSelectProviderForBooking: (provider: ServiceProvider) => void;
  onOpenBarcode: (provider: ServiceProvider) => void;
  onOpenImageEditor: (provider: ServiceProvider) => void;
  onOpenEdit?: (provider: ServiceProvider) => void;
}

export const TaskTeamModal: React.FC<TaskTeamModalProps> = ({
  category,
  onClose,
  onSelectProviderForProfile,
  onSelectProviderForBooking,
  onOpenBarcode,
  onOpenImageEditor,
  onOpenEdit
}) => {
  const { 
    providers, 
    selectedCity, 
    toggleProviderAvailableNow,
    canEditDocument,
    openOwnerUnlockModal 
  } = useApp();
  const [areaFilter, setAreaFilter] = useState<string>('all');

  // Filter providers assigned to this specific category / task
  const assignedProviders = providers.filter(p => p.categoryId === category.id);
  
  const filteredTeam = areaFilter === 'all'
    ? assignedProviders
    : assignedProviders.filter(p => p.location.city.toLowerCase() === areaFilter.toLowerCase() || p.location.area.toLowerCase().includes(areaFilter.toLowerCase()));

  const distinctAreas = Array.from(new Set(assignedProviders.map(p => p.location.city)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${category.color || 'from-slate-900 to-slate-800'} p-6 text-white shrink-0 flex items-center justify-between`}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-xs">
              {renderCategoryIcon(category.iconName, { className: "w-6 h-6" })}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black">{category.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/25 text-white font-extrabold text-xs uppercase tracking-wider">
                  {assignedProviders.length} Assigned Specialists
                </span>
              </div>
              <p className="text-xs text-white/85 mt-0.5">
                Verified trade team across Bhurkunda, Ramgarh, Sayal, Saunda, Patratu & surrounding areas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Local Area Filter Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Users className="w-4 h-4 text-amber-600" />
            <span>Assigned Team Roster ({assignedProviders.length} People):</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setAreaFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                areaFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Areas ({assignedProviders.length})
            </button>
            {distinctAreas.map(area => (
              <button
                key={area}
                onClick={() => setAreaFilter(area)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  areaFilter === area
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Assigned Team Cards Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTeam.map((pro, idx) => {
              const imageCount = pro.portfolio?.length || 10;
              return (
                <div
                  key={pro.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Avatar, Name, Rating */}
                    <div className="flex items-start gap-3.5">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img
                          src={pro.avatar}
                          alt={pro.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[9px] font-bold text-white text-center py-0.5">
                          #{idx + 1}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {pro.name}
                          </h4>
                          {pro.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Specialist" />
                          )}
                          {pro.isClosedToday && (
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-red-100 text-red-700 border border-red-200 shrink-0">
                              Closed Today
                            </span>
                          )}
                          {pro.isOpen === false && !pro.isClosedToday && (
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 border border-slate-300 shrink-0">
                              Closed
                            </span>
                          )}
                          {pro.isActive === false && (
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-amber-700 truncate mt-0.5">
                          {pro.title}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                          <span className="flex items-center gap-1 font-bold text-slate-700">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {pro.rating} ({pro.reviewCount})
                          </span>
                          <span>•</span>
                          <span>{pro.experienceYears} yrs exp</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-600 font-medium truncate">
                            <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                            {pro.location.city}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bio snippet */}
                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {pro.bio}
                    </p>

                    {/* 10 Images Quick Status & Barcode Quick Info */}
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-1.5 text-xs pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onOpenImageEditor(pro)}
                          className="text-slate-600 hover:text-amber-700 font-semibold flex items-center gap-1.5 text-[11px] bg-slate-100 hover:bg-amber-50 px-2 py-1 rounded-lg transition-colors"
                          title="Edit 10 Task Photos"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                          <span>10 Images</span>
                        </button>

                        <button
                          onClick={() => onOpenBarcode(pro)}
                          className="text-slate-600 hover:text-slate-900 font-mono font-bold flex items-center gap-1 text-[11px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition-colors"
                          title="View Verified Barcode / ID Pass"
                        >
                          <BarcodeIcon className="w-3.5 h-3.5 text-slate-700" />
                          <span>Barcode</span>
                        </button>

                        {onOpenEdit && (
                          <button
                            onClick={() => {
                              if (!canEditDocument) {
                                openOwnerUnlockModal(() => onOpenEdit(pro));
                              } else {
                                onOpenEdit(pro);
                              }
                            }}
                            className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 text-[11px] bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-lg transition-colors"
                            title="Edit Specialist Profile (Protected by Owner Lock)"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Edit</span>
                          </button>
                        )}
                      </div>

                      {/* Availability status for client */}
                      <button
                        type="button"
                        onClick={() => {
                          if (!canEditDocument) {
                            openOwnerUnlockModal(() => toggleProviderAvailableNow(pro.id));
                          } else {
                            toggleProviderAvailableNow(pro.id);
                          }
                        }}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border transition-all ${
                          (pro.isActive !== false && pro.isOpen !== false && !pro.isClosedToday)
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                        }`}
                      >
                        {(pro.isActive !== false && pro.isOpen !== false && !pro.isClosedToday) ? '🟢 Available Now' : '🔴 Not Available'}
                      </button>
                    </div>
                  </div>

                  {/* Actions: Call, WhatsApp, Book */}
                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
                    <a
                      href={`tel:${pro.phone.replace(/[^0-9+]/g, '') || '809219303'}`}
                      className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>

                    <a
                      href={`https://wa.me/${(pro.whatsapp || pro.phone).replace(/[^0-9]/g, '') || '91809219303'}?text=${encodeURIComponent(`Hello ${pro.name}, I want to book your ${category.name} service via Vicky Seva Setu.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-2xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onSelectProviderForBooking(pro)}
                      className="py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-2xs"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTeam.length === 0 && (
            <div className="text-center py-12 space-y-2">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <h5 className="text-sm font-bold text-slate-800">No specialists found for {areaFilter}</h5>
              <p className="text-xs text-slate-500">Try selecting "All Areas" to see all {assignedProviders.length} assigned specialists.</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-600">
            Helpline: <strong>809219303</strong> • Direct 0% commission
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
