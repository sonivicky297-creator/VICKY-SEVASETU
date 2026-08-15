import React from 'react';
import { 
  Star, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  Phone, 
  MessageSquare, 
  Eye, 
  Calendar, 
  Clock, 
  Compass, 
  Zap,
  Barcode as BarcodeIcon,
  Image as ImageIcon,
  Edit3
} from 'lucide-react';
import { ServiceProvider } from '../types';
import { useApp } from '../context/AppContext';
import { calculateDistanceKm, formatDistance } from '../utils/geoUtils';

interface ProviderCardProps {
  provider: ServiceProvider;
  onViewProfile: (provider: ServiceProvider) => void;
  onRequestService: (provider: ServiceProvider) => void;
  onShowOnMap?: (provider: ServiceProvider) => void;
  onOpenBarcode?: (provider: ServiceProvider) => void;
  onOpenImageEditor?: (provider: ServiceProvider) => void;
  onOpenEdit?: (provider: ServiceProvider) => void;
  compact?: boolean;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ 
  provider, 
  onViewProfile, 
  onRequestService,
  onShowOnMap,
  onOpenBarcode,
  onOpenImageEditor,
  onOpenEdit,
  compact = false
}) => {
  const { 
    t, 
    userLocation, 
    mapHoveredProviderId, 
    setMapHoveredProviderId,
    toggleProviderAvailableNow,
    canEditDocument,
    openOwnerUnlockModal
  } = useApp();

  const isHoveredOnMap = mapHoveredProviderId === provider.id;

  const distanceKm = userLocation && provider.location?.lat && provider.location?.lng
    ? calculateDistanceKm(userLocation.lat, userLocation.lng, provider.location.lat, provider.location.lng)
    : null;

  const isAvailable = (provider.isActive !== false) && (provider.isOpen !== false) && (!provider.isClosedToday);

  const getAvailabilityBadge = () => {
    if (provider.isActive === false) {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-full shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          Inactive Account
        </span>
      );
    }

    if (provider.isClosedToday) {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          Closed Today
        </span>
      );
    }

    if (provider.isOpen === false) {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          Not Available
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shadow-2xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Available Now
      </span>
    );
  };

  const cleanPhone = provider.whatsapp?.replace(/[^0-9]/g, '') || '918092195302';
  const whatsappMsg = encodeURIComponent(
    `Hello ${provider.name}, I found your profile on Vicky Seva Setu and would like to inquire about your services in Bhurkunda / Ramgarh & nearby areas.`
  );

  return (
    <div 
      id={`provider-card-${provider.id}`}
      onMouseEnter={() => setMapHoveredProviderId(provider.id)}
      onMouseLeave={() => setMapHoveredProviderId(null)}
      className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group ${
        isHoveredOnMap 
          ? 'border-emerald-500 ring-2 ring-emerald-400/30 shadow-lg -translate-y-1' 
          : 'border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Header section with photo, name, category, rating */}
      <div className={compact ? 'p-3.5' : 'p-5'}>
        <div className="flex items-start gap-3.5">
          
          {/* Avatar with Verified Ring */}
          <div className="relative shrink-0">
            <img 
              src={provider.avatar} 
              alt={provider.name}
              referrerPolicy="no-referrer"
              className={`${compact ? 'w-14 h-14' : 'w-16 h-16 sm:w-20 sm:h-20'} rounded-xl object-cover border-2 border-slate-100 shadow-2xs group-hover:scale-105 transition-transform`}
            />
            {provider.isVerified && (
              <div 
                className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1 shadow-xs"
                title={t.verifiedBadge}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1.5 flex-wrap">
              {getAvailabilityBadge()}
              
              {/* Distance Badge if available */}
              {distanceKm !== null && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                  <Zap className="w-3 h-3 text-blue-600 fill-blue-500" />
                  {formatDistance(distanceKm)}
                </span>
              )}

              {/* Rating */}
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md text-xs font-bold text-amber-900 ml-auto">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{provider.rating.toFixed(1)}</span>
                <span className="text-[11px] text-amber-700 font-medium">({provider.reviewCount})</span>
              </div>
            </div>

            {/* Name */}
            <h3 
              onClick={() => onViewProfile(provider)}
              className="text-base sm:text-lg font-bold text-slate-900 hover:text-amber-600 transition-colors mt-1.5 truncate cursor-pointer"
            >
              {provider.name}
            </h3>

            {/* Title / Trade */}
            <p className="text-xs sm:text-sm font-medium text-amber-700 truncate">
              {provider.title}
            </p>

            {/* Location & Experience */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1 truncate max-w-[160px]">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {provider.location.area || provider.location.city}
              </span>
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {provider.experienceYears} {t.years} exp
              </span>
            </div>
          </div>
        </div>

        {/* Skills & Services Preview Pills */}
        {!compact && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Key Specializations:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {provider.skills.slice(0, 3).map((skill, idx) => (
                <span 
                  key={idx} 
                  className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium border border-slate-200/60"
                >
                  {skill}
                </span>
              ))}
              {provider.skills.length > 3 && (
                <span className="text-xs text-amber-700 font-semibold px-1 py-0.5">
                  +{provider.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Availability Toggle & Actions Bar */}
        <div className="mt-3.5 bg-slate-50 rounded-xl p-2.5 border border-slate-200 flex items-center justify-between flex-wrap gap-2">
          {/* Availability Switch Indicator for Client */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!canEditDocument) {
                  openOwnerUnlockModal(() => toggleProviderAvailableNow(provider.id));
                } else {
                  toggleProviderAvailableNow(provider.id);
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                isAvailable 
                  ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300' 
                  : 'bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300'
              }`}
              title="Click to toggle availability status"
            >
              <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-600' : 'bg-rose-600'}`} />
              <span>{isAvailable ? 'Available Now' : 'Not Available'}</span>
            </button>
            <span className="text-[10px] text-slate-500 hidden sm:inline">
              • Direct 0% Commission
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            {onOpenImageEditor && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenImageEditor(provider);
                }}
                className="p-1.5 rounded-lg bg-white hover:bg-amber-100 border border-amber-200 text-amber-800 text-[11px] font-bold flex items-center gap-1 transition-colors shadow-2xs"
                title="View & Edit 10 Task Images"
              >
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">10 Images</span>
              </button>
            )}

            {onOpenBarcode && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenBarcode(provider);
                }}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-200 border border-slate-200 text-slate-800 text-[11px] font-mono font-bold flex items-center gap-1 transition-colors shadow-2xs"
                title="View Barcode & Digital ID"
              >
                <BarcodeIcon className="w-3.5 h-3.5 text-slate-700" />
                <span>Barcode</span>
              </button>
            )}

            {onOpenEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!canEditDocument) {
                    openOwnerUnlockModal(() => onOpenEdit(provider));
                  } else {
                    onOpenEdit(provider);
                  }
                }}
                className="p-1.5 rounded-lg bg-white hover:bg-blue-100 border border-blue-200 text-blue-800 text-[11px] font-bold flex items-center gap-1 transition-colors shadow-2xs"
                title="Edit Specialist Profile (Protected by Owner Lock)"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className={`${compact ? 'p-3' : 'p-4'} bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2`}>
        {/* Main CTA buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewProfile(provider)}
            id={`view-profile-btn-${provider.id}`}
            className="w-full py-2 px-3 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-800 hover:text-slate-900 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span>{t.viewProfile}</span>
          </button>

          <button
            onClick={() => onRequestService(provider)}
            id={`request-service-btn-${provider.id}`}
            className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.requestService}</span>
          </button>
        </div>

        {/* Instant Contact quick triggers */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`tel:${provider.phone}`}
            className="py-1.5 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-600" />
            <span>{t.callNow}</span>
          </a>

          <a
            href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 px-2 rounded-lg bg-green-50 hover:bg-green-100 border border-green-200 text-green-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3 h-3 text-green-600" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
