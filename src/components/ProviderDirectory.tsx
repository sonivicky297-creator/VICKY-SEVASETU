import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  MapPin, 
  RotateCcw, 
  ShieldCheck, 
  SlidersHorizontal,
  X, 
  ArrowUpDown, 
  LayoutGrid, 
  Map as MapIcon, 
  Columns2, 
  Navigation, 
  Crosshair, 
  ChevronRight,
  Home,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProviderCard } from './ProviderCard';
import { BarcodeModal } from './BarcodeModal';
import { TaskImageEditorModal } from './TaskImageEditorModal';
import { EditProviderModal } from './EditProviderModal';
import { ServiceProvider } from '../types';
import { 
  calculateDistanceKm, 
  POPULAR_USER_LOCATIONS 
} from '../utils/geoUtils';

export const ProviderDirectory: React.FC = () => {
  const { 
    t, 
    categories, 
    providers, 
    cities, 
    filters, 
    setFilters, 
    resetFilters,
    openProviderProfile,
    openBookingModal,
    userLocation,
    setUserLocation,
    viewMode,
    setViewMode,
    addToast,
    canEditDocument,
    openOwnerUnlockModal,
    setCurrentTab
  } = useApp();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedBarcodeProvider, setSelectedBarcodeProvider] = useState<ServiceProvider | null>(null);
  const [selectedImageEditorProvider, setSelectedImageEditorProvider] = useState<ServiceProvider | null>(null);
  const [selectedEditProvider, setSelectedEditProvider] = useState<ServiceProvider | null>(null);

  const handleProtectedEditProvider = (provider: ServiceProvider) => {
    if (!canEditDocument) {
      openOwnerUnlockModal(() => setSelectedEditProvider(provider));
    } else {
      setSelectedEditProvider(provider);
    }
  };

  // Compute distance for each provider and filter/sort
  const filteredProviders = useMemo(() => {
    const withDistance = providers.map(provider => {
      let calculatedDistance: number | undefined;
      if (userLocation && provider.location?.lat && provider.location?.lng) {
        calculatedDistance = calculateDistanceKm(
          userLocation.lat,
          userLocation.lng,
          provider.location.lat,
          provider.location.lng
        );
      }
      return {
        ...provider,
        calculatedDistance
      };
    });

    return withDistance.filter(provider => {
      // 1. Search Query (name, skills, title, bio, location)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = provider.name.toLowerCase().includes(query);
        const matchesTitle = ((provider.title || '') + ' ' + (provider.titleEn || '')).toLowerCase().includes(query);
        const matchesSkills = provider.skills.some(s => s.toLowerCase().includes(query));
        const matchesArea = (provider.location.area + ' ' + provider.location.city).toLowerCase().includes(query);
        const matchesBio = ((provider.bio || '') + ' ' + (provider.bioEn || '')).toLowerCase().includes(query);
        if (!matchesName && !matchesTitle && !matchesSkills && !matchesArea && !matchesBio) {
          return false;
        }
      }

      // 2. Category
      if (filters.categoryId !== 'all' && provider.categoryId !== filters.categoryId) {
        return false;
      }

      // 3. City (if specified and not 'all')
      if (filters.city !== 'all' && provider.location.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // 4. Rating
      if (filters.minRating > 0 && provider.rating < filters.minRating) {
        return false;
      }

      // 5. Price
      if (filters.maxPrice < 20000 && provider.startingPrice > filters.maxPrice) {
        return false;
      }

      // 6. Experience
      if (filters.minExperience > 0 && provider.experienceYears < filters.minExperience) {
        return false;
      }

      // 7. Availability
      if (filters.availability !== 'all' && provider.availability !== filters.availability) {
        return false;
      }

      // 8. Verified Only
      if (filters.verifiedOnly && !provider.isVerified) {
        return false;
      }

      // 9. Status Filter (All, Open, Closed Today, Closed, Active, Inactive)
      if (filters.statusFilter && filters.statusFilter !== 'all') {
        if (filters.statusFilter === 'open' && (provider.isOpen === false || provider.isClosedToday || provider.isActive === false)) return false;
        if (filters.statusFilter === 'closed_today' && !provider.isClosedToday) return false;
        if (filters.statusFilter === 'closed' && (provider.isOpen !== false && !provider.isClosedToday)) return false;
        if (filters.statusFilter === 'active' && provider.isActive === false) return false;
        if (filters.statusFilter === 'inactive' && provider.isActive !== false) return false;
      }

      // 10. Distance Radius Filter (if active and location known)
      if (filters.maxDistanceKm && filters.maxDistanceKm < 100 && userLocation) {
        if (provider.calculatedDistance !== undefined && provider.calculatedDistance > filters.maxDistanceKm) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'distance':
          if (a.calculatedDistance !== undefined && b.calculatedDistance !== undefined) {
            return a.calculatedDistance - b.calculatedDistance;
          }
          if (a.calculatedDistance !== undefined) return -1;
          if (b.calculatedDistance !== undefined) return 1;
          return b.rating - a.rating;
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experienceYears - a.experienceYears;
        case 'price_low':
          return a.startingPrice - b.startingPrice;
        case 'price_high':
          return b.startingPrice - a.startingPrice;
        case 'jobs':
          return b.completedJobs - a.completedJobs;
        case 'featured':
        default:
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
      }
    });
  }, [providers, filters, userLocation]);

  const selectedCategoryObj = categories.find(c => c.id === filters.categoryId);

  const handleUseCurrentGps = () => {
    if (!navigator.geolocation) {
      addToast('GPS not supported in this browser', 'warning');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          name: 'Current Location (GPS)'
        });
        addToast('Location updated!', 'success');
      },
      () => {
        setShowLocationModal(true);
      }
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar / Back to Home Banner */}
        <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 text-white p-3 sm:p-4 rounded-2xl shadow-md mb-4 sm:mb-6">
          <button
            type="button"
            onClick={() => {
              resetFilters();
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            id="directory-back-to-home-btn"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            <span>होम पेज पर जाएं (Back to Home)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                resetFilters();
                setCurrentTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">होम (Home)</span>
            </button>
          </div>
        </div>

        {/* Top Header Banner */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Title & Active Scope Badges */}
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {selectedCategoryObj ? selectedCategoryObj.name : t.allServices}
                </span>

                {filters.city !== 'all' && (
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                    📍 {filters.city}
                  </span>
                )}

                {userLocation && (
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-blue-600" />
                    {userLocation.name.split(',')[0]}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Local Service Providers in Bhurkunda & Ramgarh
              </h1>
              
              <p className="text-sm text-slate-500 mt-1">
                {filteredProviders.length} {t.providersFound}
                {userLocation && filters.maxDistanceKm && filters.maxDistanceKm < 100 && (
                  <span className="text-emerald-700 font-medium ml-1">
                    (within {filters.maxDistanceKm} km radius)
                  </span>
                )}
              </p>
            </div>

            {/* Quick Search & View Mode Switcher */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              
              {/* Search input */}
              <div className="relative flex-1 sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="Search pro name, skill or service..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
                />
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold shrink-0 shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{t.filterHeading}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs sticky top-24 space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-sm">{t.filterHeading}</h3>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t.clearAll}</span>
                </button>
              </div>

              {/* User Location & Distance Control Card */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-900 uppercase flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-blue-600" />
                    Your Proximity
                  </span>
                  <button
                    onClick={() => setShowLocationModal(true)}
                    className="text-[11px] font-bold text-blue-700 hover:underline"
                  >
                    Change
                  </button>
                </div>

                <div className="text-xs font-semibold text-slate-800 truncate">
                  {userLocation ? userLocation.name : 'Location not set'}
                </div>

                {/* Quick GPS & Landmark Buttons */}
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={handleUseCurrentGps}
                    className="py-1 px-2 rounded-lg bg-white hover:bg-blue-100 border border-blue-200 text-blue-800 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                  >
                    <Crosshair className="w-3 h-3" />
                    <span>GPS</span>
                  </button>
                  <button
                    onClick={() => setShowLocationModal(true)}
                    className="py-1 px-2 rounded-lg bg-white hover:bg-blue-100 border border-blue-200 text-blue-800 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                  >
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>Landmarks</span>
                  </button>
                </div>
              </div>

              {/* Distance Radius Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Distance Radius
                  </label>
                  <span className="text-xs font-bold text-blue-700">
                    {filters.maxDistanceKm && filters.maxDistanceKm < 100 
                      ? `≤ ${filters.maxDistanceKm} km` 
                      : 'All Regions'}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={filters.maxDistanceKm || 50}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFilters(prev => ({ 
                      ...prev, 
                      maxDistanceKm: val,
                      sortBy: val < 50 ? 'distance' : prev.sortBy 
                    }));
                  }}
                  aria-label="Distance Radius in Kilometers"
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                  <span>5 km</span>
                  <span>25 km</span>
                  <span>50 km</span>
                  <span>100+ km</span>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  {t.categoryFilter}
                </label>
                <select
                  value={filters.categoryId}
                  onChange={(e) => setFilters(prev => ({ ...prev, categoryId: e.target.value }))}
                  aria-label="Filter by Service Category"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-amber-500"
                >
                  <option value="all">{t.allCategories}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location / City Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  {t.locationFilter}
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                  aria-label="Filter by Location City"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-amber-500"
                >
                  <option value="all">{t.allCities}</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Verified Only Toggle */}
              <div>
                <label className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-900">
                      {t.verifiedOnlyFilter}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={filters.verifiedOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, verifiedOnly: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                  />
                </label>
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  {t.ratingFilter}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 4.0, 4.5, 4.8].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, minRating: rate }))}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                        filters.minRating === rate
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{rate === 0 ? 'All' : `${rate}★`}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service & Account Status Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Service / Account Status
                </label>
                <select
                  value={filters.statusFilter || 'all'}
                  onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value as any }))}
                  aria-label="Filter by Service Status"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:outline-hidden"
                >
                  <option value="all">All Profiles (Active & Closed)</option>
                  <option value="open">🟢 Open & Active Only</option>
                  <option value="closed_today">🔴 Closed Today</option>
                  <option value="closed">⚪ Closed (General)</option>
                  <option value="active">Active Accounts</option>
                  <option value="inactive">Inactive Accounts</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  {t.availabilityFilter}
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                  aria-label="Filter by Availability"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:outline-hidden"
                >
                  <option value="all">Any Availability</option>
                  <option value="immediate">{t.immediateAvailable}</option>
                  <option value="today">{t.todayAvailable}</option>
                  <option value="flexible">{t.flexibleAvailable}</option>
                </select>
              </div>

              {/* Min Experience Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    {t.experienceFilter}
                  </label>
                  <span className="text-xs font-bold text-amber-700">
                    {filters.minExperience}+ {t.years}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="2"
                  value={filters.minExperience}
                  onChange={(e) => setFilters(prev => ({ ...prev, minExperience: Number(e.target.value) }))}
                  aria-label="Minimum Experience in Years"
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              {/* Max Starting Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    {t.priceFilter}
                  </label>
                  <span className="text-xs font-bold text-amber-700">
                    {filters.maxPrice >= 20000 ? 'All / ₹20,000+' : `≤ ₹${filters.maxPrice}`}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="20000"
                  step="200"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  aria-label="Maximum Budget or Starting Rate in Rupees"
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

            </div>
          </div>

          {/* Providers Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Sorting & Result Count Bar */}
            <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
              <div className="text-xs text-slate-600 font-medium">
                Showing: <strong className="text-slate-900 font-bold">{filteredProviders.length}</strong> Verified Professionals
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">{t.sortByLabel}:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  aria-label="Sort Results By"
                  className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-lg py-1.5 px-2.5 focus:outline-hidden"
                >
                  <option value="featured">{t.sortFeatured}</option>
                  <option value="distance">{t.sortDistance}</option>
                  <option value="rating">{t.sortRating}</option>
                  <option value="experience">{t.sortExperience}</option>
                  <option value="jobs">{t.sortJobs}</option>
                  <option value="price_low">{t.sortPriceLow}</option>
                  <option value="price_high">{t.sortPriceHigh}</option>
                </select>
              </div>
            </div>

            {/* Direct Service Provider Grid View */}
            {filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProviders.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    onViewProfile={openProviderProfile}
                    onRequestService={openBookingModal}
                    onOpenBarcode={setSelectedBarcodeProvider}
                    onOpenImageEditor={setSelectedImageEditorProvider}
                    onOpenEdit={setSelectedEditProvider}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  No Service Providers Found
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  {t.noProvidersFound}
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-amber-700 transition-colors shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.clearAll}</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Preset Landmark Picker Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Choose Nearby Landmark
              </h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Select your nearest locality in Bhurkunda & Ramgarh to find closest professionals and real road distances:
            </p>

            <div className="mt-4 space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {POPULAR_USER_LOCATIONS.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUserLocation({
                      lat: loc.lat,
                      lng: loc.lng,
                      name: loc.nameEn || loc.name
                    });
                    setShowLocationModal(false);
                    addToast(`Location set: ${loc.nameEn || loc.name}`, 'success');
                  }}
                  className="w-full text-left p-2.5 rounded-xl text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-950 transition-colors flex items-center justify-between group border border-transparent hover:border-blue-200"
                >
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-blue-900">
                      {loc.nameEn || loc.name}
                    </div>
                    <div className="text-[10px] text-slate-500">{loc.city}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-base">{t.filterHeading}</h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* View Mode in Mobile Drawer */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  View Mode
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => { setViewMode('grid'); setMobileFilterOpen(false); }}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${
                      viewMode === 'grid' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>{t.gridView}</span>
                  </button>
                  <button
                    onClick={() => { setViewMode('split'); setMobileFilterOpen(false); }}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${
                      viewMode === 'split' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Columns2 className="w-3.5 h-3.5" />
                    <span>Split</span>
                  </button>
                  <button
                    onClick={() => { setViewMode('map'); setMobileFilterOpen(false); }}
                    className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${
                      viewMode === 'map' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <MapIcon className="w-3.5 h-3.5" />
                    <span>{t.mapView}</span>
                  </button>
                </div>
              </div>

              {/* Distance Radius */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Distance Radius
                  </label>
                  <span className="text-xs font-bold text-blue-700">
                    {filters.maxDistanceKm ? `≤ ${filters.maxDistanceKm} km` : 'All'}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={filters.maxDistanceKm || 50}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxDistanceKm: Number(e.target.value) }))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  {t.categoryFilter}
                </label>
                <select
                  value={filters.categoryId}
                  onChange={(e) => setFilters(prev => ({ ...prev, categoryId: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium"
                >
                  <option value="all">{t.allCategories}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  {t.locationFilter}
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium"
                >
                  <option value="all">{t.allCities}</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Service & Account Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Service / Account Status
                </label>
                <select
                  value={filters.statusFilter || 'all'}
                  onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value as any }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium"
                >
                  <option value="all">All Profiles (Active & Closed)</option>
                  <option value="open">🟢 Open & Active Only</option>
                  <option value="closed_today">🔴 Closed Today</option>
                  <option value="closed">⚪ Closed (General)</option>
                  <option value="active">Active Accounts</option>
                  <option value="inactive">Inactive Accounts</option>
                </select>
              </div>

              {/* Verified Only */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 cursor-pointer">
                <span className="text-xs font-bold text-emerald-900">{t.verifiedOnlyFilter}</span>
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) => setFilters(prev => ({ ...prev, verifiedOnly: e.target.checked }))}
                  className="w-4 h-4 text-emerald-600 accent-emerald-600"
                />
              </label>

              {/* Min Rating */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  {t.ratingFilter}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 4.0, 4.5, 4.8].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, minRating: rate }))}
                      className={`py-2 rounded-lg text-xs font-bold ${
                        filters.minRating === rate ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {rate === 0 ? 'All' : `${rate}★`}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-3">
              <button
                onClick={resetFilters}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold"
              >
                {t.clearAll}
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="py-2.5 px-4 rounded-xl bg-amber-600 text-white text-xs font-bold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barcode Modal */}
      {selectedBarcodeProvider && (
        <BarcodeModal
          provider={selectedBarcodeProvider}
          onClose={() => setSelectedBarcodeProvider(null)}
        />
      )}

      {/* 10 Task Portfolio Images Editor Modal */}
      {selectedImageEditorProvider && (
        <TaskImageEditorModal
          provider={selectedImageEditorProvider}
          onClose={() => setSelectedImageEditorProvider(null)}
        />
      )}

      {/* Edit Provider Modal (9 Fields) */}
      {selectedEditProvider && (
        <EditProviderModal
          provider={selectedEditProvider}
          onClose={() => setSelectedEditProvider(null)}
        />
      )}

    </div>
  );
};
