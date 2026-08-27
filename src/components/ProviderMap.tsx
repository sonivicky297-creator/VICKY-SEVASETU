import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Navigation, 
  Crosshair, 
  Layers, 
  Phone, 
  Star, 
  ShieldCheck, 
  Calendar, 
  ChevronRight,
  SlidersHorizontal,
  Compass,
  X
} from 'lucide-react';
import { ServiceProvider } from '../types';
import { useApp } from '../context/AppContext';
import { 
  calculateDistanceKm, 
  formatDistance, 
  CITY_COORDINATES, 
  POPULAR_USER_LOCATIONS 
} from '../utils/geoUtils';

// Ensure Leaflet styles and default icon assets
import 'leaflet/dist/leaflet.css';

interface ProviderMapProps {
  providers: (ServiceProvider & { calculatedDistance?: number })[];
  selectedCity: string;
  className?: string;
  isSplitView?: boolean;
  onProviderSelect?: (provider: ServiceProvider) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; hex: string }> = {
  'cat-electrician': { bg: 'bg-amber-500', border: 'border-amber-600', text: 'text-amber-600', hex: '#f59e0b' },
  'cat-plumber': { bg: 'bg-cyan-600', border: 'border-cyan-700', text: 'text-cyan-600', hex: '#0891b2' },
  'cat-priest': { bg: 'bg-orange-600', border: 'border-orange-700', text: 'text-orange-600', hex: '#ea580c' },
  'cat-materials': { bg: 'bg-stone-700', border: 'border-stone-800', text: 'text-stone-700', hex: '#44403c' },
  'cat-carpenter': { bg: 'bg-emerald-700', border: 'border-emerald-800', text: 'text-emerald-700', hex: '#047857' },
  'cat-mason': { bg: 'bg-zinc-700', border: 'border-zinc-800', text: 'text-zinc-700', hex: '#3f3f46' },
  'cat-beauty': { bg: 'bg-rose-500', border: 'border-rose-600', text: 'text-rose-600', hex: '#f43f5e' },
  'cat-painter': { bg: 'bg-purple-600', border: 'border-purple-700', text: 'text-purple-600', hex: '#9333ea' },
  'cat-appliance': { bg: 'bg-blue-600', border: 'border-blue-700', text: 'text-blue-600', hex: '#2563eb' },
  'cat-cleaning': { bg: 'bg-teal-600', border: 'border-teal-700', text: 'text-teal-600', hex: '#0d9488' },
  'cat-computer': { bg: 'bg-indigo-600', border: 'border-indigo-700', text: 'text-indigo-600', hex: '#4f46e5' },
  'cat-photography': { bg: 'bg-pink-600', border: 'border-pink-700', text: 'text-pink-600', hex: '#db2777' },
  'default': { bg: 'bg-emerald-600', border: 'border-emerald-700', text: 'text-emerald-600', hex: '#059669' }
};

export const ProviderMap: React.FC<ProviderMapProps> = ({
  providers,
  selectedCity,
  className = '',
  onProviderSelect
}) => {
  const { 
    userLocation, 
    setUserLocation, 
    filters, 
    setFilters, 
    openProviderProfile, 
    openBookingModal, 
    addToast,
    mapHoveredProviderId,
    setMapHoveredProviderId
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);

  const [activePinProvider, setActivePinProvider] = useState<ServiceProvider | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showRadiusMenu, setShowRadiusMenu] = useState(false);
  const [mapTileTheme, setMapTileTheme] = useState<'streets' | 'satellite' | 'terrain'>('streets');
  const [tileLayerInstance, setTileLayerInstance] = useState<L.TileLayer | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const defaultCityInfo = CITY_COORDINATES[selectedCity] || CITY_COORDINATES['Bhurkunda'] || { lat: 23.6420, lng: 85.3520, zoom: 13 };
    const initialCenter: [number, number] = userLocation 
      ? [userLocation.lat, userLocation.lng] 
      : [defaultCityInfo.lat, defaultCityInfo.lng];

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: userLocation ? 12 : defaultCityInfo.zoom,
      zoomControl: false,
      attributionControl: false
    });

    // Street Tiles (CartoDB Voyager - high quality, crisp English roads)
    const streetsLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    });

    streetsLayer.addTo(map);
    setTileLayerInstance(streetsLayer);

    // Zoom controls at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    // Resize observer to handle flex/grid changes seamlessly
    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });

    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer Theme
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerInstance) return;

    tileLayerInstance.remove();

    let newLayer: L.TileLayer;
    if (mapTileTheme === 'satellite') {
      newLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
      });
    } else if (mapTileTheme === 'terrain') {
      newLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
      });
    } else {
      newLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      });
    }

    newLayer.addTo(mapInstanceRef.current);
    setTileLayerInstance(newLayer);
  }, [mapTileTheme]);

  // Handle City Change: center map to chosen city if user hasn't specified exact custom coords
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (selectedCity && selectedCity !== 'all' && CITY_COORDINATES[selectedCity]) {
      const cityInfo = CITY_COORDINATES[selectedCity];
      mapInstanceRef.current.flyTo([cityInfo.lat, cityInfo.lng], cityInfo.zoom, {
        duration: 1.2
      });
    }
  }, [selectedCity]);

  // Render User Location Pin & Radius Circle
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    if (radiusCircleRef.current) {
      radiusCircleRef.current.remove();
      radiusCircleRef.current = null;
    }

    if (userLocation) {
      // Create pulsating animated HTML user marker
      const userHtml = `
        <div class="relative flex items-center justify-center">
          <span class="absolute w-8 h-8 rounded-full bg-blue-500/40 animate-ping"></span>
          <span class="absolute w-6 h-6 rounded-full bg-blue-500/30"></span>
          <div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
      `;

      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: userHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 1000 })
        .addTo(mapInstanceRef.current)
        .bindTooltip(
          `📍 Your Location: ${userLocation.name}`,
          { direction: 'top', offset: [0, -10] }
        );

      userMarkerRef.current = userMarker;

      // Draw Radius Circle if filter is active
      if (filters.maxDistanceKm && filters.maxDistanceKm < 100) {
        const circle = L.circle([userLocation.lat, userLocation.lng], {
          radius: filters.maxDistanceKm * 1000,
          color: '#3b82f6',
          fillColor: '#60a5fa',
          fillOpacity: 0.08,
          weight: 1.5,
          dashArray: '4, 6'
        }).addTo(mapInstanceRef.current);

        radiusCircleRef.current = circle;
      }
    }
  }, [userLocation, filters.maxDistanceKm]);

  // Render Provider Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const bounds: [number, number][] = [];

    providers.forEach(provider => {
      const lat = provider.location?.lat;
      const lng = provider.location?.lng;

      if (!lat || !lng) return;

      bounds.push([lat, lng]);

      const catStyle = CATEGORY_COLORS[provider.categoryId] || CATEGORY_COLORS['default'];
      const isHovered = mapHoveredProviderId === provider.id;
      const isSelected = activePinProvider?.id === provider.id;

      const markerHtml = `
        <div class="group relative cursor-pointer transform transition-all duration-200 ${isSelected || isHovered ? 'scale-125 z-50' : 'hover:scale-115'}">
          <div class="flex items-center gap-1 px-2 py-1 rounded-full text-white font-semibold text-xs shadow-md border-2 border-white transition-colors duration-200 ${catStyle.bg}">
            <span class="truncate max-w-[85px] leading-tight text-[11px]">${provider.name.split(' ')[0]}</span>
            <span class="flex items-center text-[10px] bg-black/30 px-1 py-0.2 rounded">★${provider.rating}</span>
          </div>
          <!-- Pointer arrow -->
          <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] ${catStyle.border.replace('border-', 'border-t-')} mx-auto -mt-[1px]"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-provider-marker',
        html: markerHtml,
        iconSize: [110, 36],
        iconAnchor: [55, 36]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      marker.on('click', () => {
        setActivePinProvider(provider);
        if (onProviderSelect) onProviderSelect(provider);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([lat, lng], { animate: true, duration: 0.8 });
        }
      });

      marker.on('mouseover', () => {
        setMapHoveredProviderId(provider.id);
      });

      marker.on('mouseout', () => {
        setMapHoveredProviderId(null);
      });

      markersLayerRef.current?.addLayer(marker);
    });

    // If bounds exist and no provider selected, smoothly fit view
    if (bounds.length > 0 && !activePinProvider) {
      if (userLocation) {
        bounds.push([userLocation.lat, userLocation.lng]);
      }
      try {
        const leafletBounds = L.latLngBounds(bounds);
        mapInstanceRef.current.fitBounds(leafletBounds, { padding: [40, 40], maxZoom: 14 });
      } catch (e) {
        console.error('Fit bounds error', e);
      }
    }
  }, [providers, activePinProvider, mapHoveredProviderId, userLocation]);

  // Request real Browser Geolocation
  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      addToast('Geolocation not supported by browser.', 'warning');
      setIsLocating(false);
      setShowLocationPicker(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLoc = {
          lat: latitude,
          lng: longitude,
          name: 'Current GPS Location'
        };
        setUserLocation(newLoc);
        setIsLocating(false);
        addToast('Current location retrieved successfully!', 'success');
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 13, { duration: 1.2 });
        }
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsLocating(false);
        setShowLocationPicker(true);
        addToast('GPS permission denied. Please pick a nearby landmark from the list.', 'info');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleSelectPresetLocation = (loc: typeof POPULAR_USER_LOCATIONS[0]) => {
    setUserLocation({
      lat: loc.lat,
      lng: loc.lng,
      name: loc.nameEn || loc.name
    });
    setShowLocationPicker(false);
    addToast(`Location set to ${loc.nameEn || loc.name}`, 'success');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([loc.lat, loc.lng], 13, { duration: 1.2 });
    }
  };

  const handleFitAllProviders = () => {
    if (!mapInstanceRef.current) return;
    const bounds: [number, number][] = providers
      .filter(p => p.location?.lat && p.location?.lng)
      .map(p => [p.location.lat!, p.location.lng!]);

    if (userLocation) {
      bounds.push([userLocation.lat, userLocation.lng]);
    }

    if (bounds.length > 0) {
      mapInstanceRef.current.fitBounds(L.latLngBounds(bounds), { padding: [50, 50], maxZoom: 14 });
    }
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden shadow-sm border border-stone-200 bg-stone-100 flex flex-col ${className}`}>
      
      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-400 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Left: User Location Badge & Switcher */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-stone-200">
          <div className="flex items-center gap-1.5 text-xs text-stone-700">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="font-semibold text-stone-900 truncate max-w-[150px] sm:max-w-[220px]">
              {userLocation ? userLocation.name : 'Set My Location'}
            </span>
          </div>

          <div className="flex items-center gap-1 ml-1 border-l border-stone-200 pl-1.5">
            <button
              onClick={handleGetCurrentLocation}
              disabled={isLocating}
              title="Get Current GPS"
              className="p-1.5 text-stone-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-blue-600' : ''}`} />
            </button>

            <button
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              title="Choose Landmark"
              className="px-2 py-1 text-xs font-medium text-stone-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span className="hidden sm:inline">Change</span>
            </button>
          </div>
        </div>

        {/* Right: Map Actions (Fit Bounds, Distance Filter, Map Layers) */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-md border border-stone-200">
          {/* Fit all */}
          <button
            onClick={handleFitAllProviders}
            title="Fit All Providers"
            className="px-2 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden md:inline">Fit All</span>
          </button>

          {/* Radius Filter Quick Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowRadiusMenu(!showRadiusMenu)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 ${
                filters.maxDistanceKm && filters.maxDistanceKm < 50
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{filters.maxDistanceKm ? `${filters.maxDistanceKm} km` : 'Radius'}</span>
            </button>

            {/* Radius Dropdown Menu */}
            {showRadiusMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50">
                <div className="text-[11px] font-semibold text-stone-500 uppercase px-2 py-1">
                  Maximum Distance
                </div>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {[5, 10, 20, 35, 50, 100].map(dist => (
                    <button
                      key={dist}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, maxDistanceKm: dist, sortBy: 'distance' }));
                        setShowRadiusMenu(false);
                      }}
                      className={`px-2 py-1.5 text-xs rounded-lg text-left transition-colors ${
                        filters.maxDistanceKm === dist
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {dist === 100 ? 'All areas' : `≤ ${dist} km`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Map Layer Switcher */}
          <button
            onClick={() => {
              setMapTileTheme(prev => prev === 'streets' ? 'satellite' : prev === 'satellite' ? 'terrain' : 'streets');
            }}
            title="Change Map Layer"
            className="p-1.5 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Landmark Picker Modal / Dropdown */}
      {showLocationPicker && (
        <div className="absolute top-14 left-3 z-400 w-80 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200 p-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-blue-600" />
              Choose Nearby Landmark
            </h4>
            <button 
              onClick={() => setShowLocationPicker(false)}
              className="text-stone-400 hover:text-stone-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-2 space-y-1 max-h-56 overflow-y-auto pr-1">
            {POPULAR_USER_LOCATIONS.map((loc, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPresetLocation(loc)}
                className="w-full text-left px-2.5 py-2 rounded-xl text-xs text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="font-semibold text-stone-900 group-hover:text-emerald-800">
                    {loc.nameEn || loc.name}
                  </div>
                  <div className="text-[10px] text-stone-500">{loc.city}</div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actual Leaflet Map Canvas Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full min-h-[420px] sm:min-h-[500px] z-10"
      />

      {/* Bottom Floating Provider Card / Preview Drawer */}
      {activePinProvider && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-400 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200 p-3.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={activePinProvider.avatar} 
                  alt={activePinProvider.name} 
                  className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                />
                {activePinProvider.isVerified && (
                  <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow-xs">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-bold text-sm text-stone-900 leading-tight">
                  {activePinProvider.name}
                </h4>
                <div className="text-xs text-stone-600 mt-0.5">
                  {activePinProvider.title}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center text-xs font-bold text-amber-600">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500 mr-0.5" />
                    {activePinProvider.rating}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-[11px] text-stone-500 font-medium">
                    {activePinProvider.location.area}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setActivePinProvider(null)}
              className="text-stone-400 hover:text-stone-600 p-1 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Distance & Pricing Info */}
          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {userLocation && (
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded-md flex items-center gap-1">
                  ⚡ {formatDistance(
                    calculateDistanceKm(
                      userLocation.lat,
                      userLocation.lng,
                      activePinProvider.location.lat || 28.6924,
                      activePinProvider.location.lng || 76.9249
                    )
                  )}
                </span>
              )}
              <span className="text-stone-500 font-medium">
                {activePinProvider.serviceRadiusKm} km coverage
              </span>
            </div>

            <div className="font-bold text-stone-900">
              ₹{activePinProvider.startingPrice}
              <span className="text-[10px] font-normal text-stone-500 ml-1">
                {activePinProvider.priceUnit.split('/')[0]}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <a
              href={`tel:${activePinProvider.phone}`}
              className="flex items-center justify-center gap-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call</span>
            </a>

            <button
              onClick={() => openBookingModal(activePinProvider)}
              className="flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              onClick={() => openProviderProfile(activePinProvider)}
              className="flex items-center justify-center gap-1 py-1.5 px-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <span>Profile</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Provider Count Pill at bottom left */}
      <div className="absolute bottom-3 left-3 z-400 bg-stone-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>
          {providers.length} Professionals on Map
        </span>
      </div>

    </div>
  );
};
