import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Category, 
  ServiceProvider, 
  ServiceRequest, 
  FilterOptions, 
  Review,
  RequestStatus
} from '../types';
import { INITIAL_CATEGORIES, INITIAL_PROVIDERS, INITIAL_REQUESTS, CITIES_LIST } from '../data/initialData';
import { getTranslation, translations } from '../data/translations';
import { getCoordinatesForCity } from '../utils/geoUtils';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export interface UserLocationState {
  lat: number;
  lng: number;
  name: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations['en'];
  
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  cities: string[];
  
  userLocation: UserLocationState | null;
  setUserLocation: (loc: UserLocationState | null) => void;
  
  viewMode: 'grid' | 'map' | 'split';
  setViewMode: (mode: 'grid' | 'map' | 'split') => void;
  
  mapHoveredProviderId: string | null;
  setMapHoveredProviderId: (id: string | null) => void;

  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  providers: ServiceProvider[];
  addProvider: (provider: Omit<ServiceProvider, 'id' | 'rating' | 'reviewCount' | 'completedJobs' | 'reviews'>) => void;
  updateProvider: (id: string, provider: Partial<ServiceProvider>) => void;
  deleteProvider: (id: string) => void;
  toggleProviderVerification: (id: string) => void;
  toggleProviderActive: (id: string) => void;
  toggleProviderOpenToday: (id: string) => void;
  toggleProviderOpen: (id: string) => void;
  toggleProviderAvailableNow: (id: string) => void;
  addProviderReview: (providerId: string, review: Omit<Review, 'id' | 'date'>) => void;
  
  toggleCategoryClosed: (id: string) => void;
  toggleCategoryClosedToday: (id: string) => void;
  
  requests: ServiceRequest[];
  addServiceRequest: (request: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>) => string;
  updateRequestStatus: (id: string, status: RequestStatus, adminNotes?: string) => void;
  deleteServiceRequest: (id: string) => void;
  
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  
  // Navigation & Tab state
  currentTab: 'home' | 'directory';
  setCurrentTab: (tab: 'home' | 'directory') => void;

  // Selected Provider Modals
  selectedProviderForProfile: ServiceProvider | null;
  openProviderProfile: (provider: ServiceProvider) => void;
  closeProviderProfile: () => void;

  selectedProviderForBooking: ServiceProvider | null;
  openBookingModal: (provider: ServiceProvider) => void;
  closeBookingModal: () => void;
  
  toasts: ToastNotification[];
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  resetDataToDefault: () => void;

  // Owner Edit Lock & Access Control
  isEditLockedToOwner: boolean;
  isOwnerAuthenticated: boolean;
  ownerEmail: string;
  ownerPasscode: string;
  canEditDocument: boolean;
  unlockOwnerAccess: (passcodeOrEmail: string) => boolean;
  lockOwnerAccess: () => void;
  toggleEditLockToOwner: (enable: boolean) => void;
  setOwnerPasscode: (newPin: string) => void;
  showOwnerUnlockModal: boolean;
  openOwnerUnlockModal: (callback?: () => void) => void;
  closeOwnerUnlockModal: () => void;
}

const STORAGE_KEYS = {
  LANG: 'sevasetu_lang_v7',
  CITY: 'sevasetu_city_v7',
  CATEGORIES: 'sevasetu_categories_v7',
  PROVIDERS: 'sevasetu_providers_v7',
  REQUESTS: 'sevasetu_requests_v7',
  USER_LOC: 'sevasetu_user_location_v7',
  VIEW_MODE: 'sevasetu_view_mode_v7',
  OWNER_LOCK: 'sevasetu_owner_lock_v7',
  OWNER_AUTH: 'sevasetu_owner_auth_v7',
  OWNER_PIN: 'sevasetu_owner_pin_v7'
};

const defaultFilters: FilterOptions = {
  searchQuery: '',
  categoryId: 'all',
  city: 'all',
  minRating: 0,
  minExperience: 0,
  availability: 'all',
  verifiedOnly: false,
  maxDistanceKm: 50,
  sortBy: 'featured',
  statusFilter: 'all'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const [currentTab, setCurrentTab] = useState<'home' | 'directory'>('home');

  const [selectedCity, setSelectedCityState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CITY) || 'All Locations';
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved categories', e);
      }
    }
    return INITIAL_CATEGORIES;
  });

  const [providers, setProviders] = useState<ServiceProvider[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROVIDERS);
    let loadedProviders = INITIAL_PROVIDERS;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedProviders = parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved providers', e);
      }
    }
    // Ensure all providers have valid lat/lng in Sayal, Saunda, Bhurkunda, Patratu, Ramgarh region
    return loadedProviders.map((p, idx) => {
      if (!p.location?.lat || !p.location?.lng) {
        const initialMatch = INITIAL_PROVIDERS.find(ip => ip.id === p.id);
        if (initialMatch?.location?.lat && initialMatch?.location?.lng) {
          return {
            ...p,
            location: {
              ...p.location,
              lat: initialMatch.location.lat,
              lng: initialMatch.location.lng
            }
          };
        }
        const fallbackCoords = getCoordinatesForCity(p.location?.city || 'Sayal', p.name || `prov-${idx}`);
        return {
          ...p,
          location: {
            ...p.location,
            lat: fallbackCoords.lat,
            lng: fallbackCoords.lng
          }
        };
      }
      return p;
    });
  });

  const [requests, setRequests] = useState<ServiceRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved requests', e);
      }
    }
    return INITIAL_REQUESTS;
  });

  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [selectedProviderForProfile, setSelectedProviderForProfile] = useState<ServiceProvider | null>(null);
  const [selectedProviderForBooking, setSelectedProviderForBooking] = useState<ServiceProvider | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const [userLocation, setUserLocationState] = useState<UserLocationState | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_LOC);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user location', e);
      }
    }
    // Default initial location in Bhurkunda Main Market
    return {
      lat: 23.6420,
      lng: 85.3520,
      name: 'Bhurkunda Main Market'
    };
  });

  const [viewMode, setViewModeState] = useState<'grid' | 'map' | 'split'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VIEW_MODE);
    return (saved as 'grid' | 'map' | 'split') || 'grid';
  });

  const [mapHoveredProviderId, setMapHoveredProviderId] = useState<string | null>(null);

  const setUserLocation = (loc: UserLocationState | null) => {
    setUserLocationState(loc);
    if (loc) {
      localStorage.setItem(STORAGE_KEYS.USER_LOC, JSON.stringify(loc));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER_LOC);
    }
  };

  const setViewMode = (mode: 'grid' | 'map' | 'split') => {
    setViewModeState(mode);
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, mode);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, 'en');
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CITY, selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(providers));
  }, [providers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  }, [requests]);

  const setLanguage = (lang: Language) => setLanguageState('en');
  const toggleLanguage = () => setLanguageState('en');
  const setSelectedCity = (city: string) => setSelectedCityState(city);

  const t = getTranslation('en');

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const openProviderProfile = (provider: ServiceProvider) => {
    setSelectedProviderForProfile(provider);
  };

  const closeProviderProfile = () => {
    setSelectedProviderForProfile(null);
  };

  const openBookingModal = (provider: ServiceProvider) => {
    setSelectedProviderForBooking(provider);
  };

  const closeBookingModal = () => {
    setSelectedProviderForBooking(null);
  };

  // Provider CRUD
  const addProvider = (newProvData: Omit<ServiceProvider, 'id' | 'rating' | 'reviewCount' | 'completedJobs' | 'reviews'>) => {
    const newProvider: ServiceProvider = {
      ...newProvData,
      id: 'prov-' + Date.now(),
      rating: 5.0,
      reviewCount: 1,
      completedJobs: 1,
      reviews: [
        {
          id: 'rev-init-' + Date.now(),
          userName: 'SevaSetu Verification Team',
          userCity: newProvData.location.city,
          rating: 5,
          date: new Date().toISOString().split('T')[0],
          comment: 'ID and trade credentials successfully verified for Bahadurgarh & Ramgarh region.',
          serviceDone: 'Profile Verification',
          serviceDoneEn: 'Profile Verification'
        }
      ]
    };
    setProviders(prev => [newProvider, ...prev]);
    addToast('New Service Provider added successfully!', 'success');
  };

  const updateProvider = (id: string, updatedFields: Partial<ServiceProvider>) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    if (selectedProviderForProfile && selectedProviderForProfile.id === id) {
      setSelectedProviderForProfile(prev => prev ? { ...prev, ...updatedFields } : null);
    }
    addToast('Provider information updated.', 'info');
  };

  const deleteProvider = (id: string) => {
    setProviders(prev => prev.filter(p => p.id !== id));
    if (selectedProviderForProfile && selectedProviderForProfile.id === id) {
      setSelectedProviderForProfile(null);
    }
    addToast('Provider listing removed.', 'warning');
  };

  const toggleProviderVerification = (id: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.isVerified;
        return {
          ...p,
          isVerified: nextState,
          verificationBadges: nextState 
            ? ['id_verified', 'police_cleared', 'skill_certified'] 
            : []
        };
      }
      return p;
    }));
    addToast('Verification status updated.', 'info');
  };

  const toggleProviderActive = (id: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = p.isActive === false ? true : false;
        return { ...p, isActive: nextState };
      }
      return p;
    }));
    if (selectedProviderForProfile && selectedProviderForProfile.id === id) {
      setSelectedProviderForProfile(prev => prev ? { ...prev, isActive: prev.isActive === false ? true : false } : null);
    }
    addToast('Provider account active/inactive status toggled.', 'info');
  };

  const toggleProviderOpenToday = (id: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        const nextClosedToday = !p.isClosedToday;
        return {
          ...p,
          isClosedToday: nextClosedToday,
          isOpen: nextClosedToday ? false : true,
          closedReason: nextClosedToday ? (p.closedReason || 'Closed today for personal/off-duty reasons') : undefined
        };
      }
      return p;
    }));
    if (selectedProviderForProfile && selectedProviderForProfile.id === id) {
      setSelectedProviderForProfile(prev => {
        if (!prev) return null;
        const nextClosedToday = !prev.isClosedToday;
        return {
          ...prev,
          isClosedToday: nextClosedToday,
          isOpen: nextClosedToday ? false : true,
          closedReason: nextClosedToday ? (prev.closedReason || 'Closed today for personal/off-duty reasons') : undefined
        };
      });
    }
    addToast('Provider "Closed Today" status updated.', 'info');
  };

  // Owner Lock and Edit Protection
  const [isEditLockedToOwner, setIsEditLockedToOwner] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OWNER_LOCK);
    return saved !== null ? saved === 'true' : true; // Locked to owner by default
  });

  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OWNER_AUTH);
    return saved === 'true';
  });

  const [ownerPasscode, setOwnerPasscodeState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.OWNER_PIN) || '8092';
  });

  const [showOwnerUnlockModal, setShowOwnerUnlockModal] = useState(false);
  const [pendingEditCallback, setPendingEditCallback] = useState<(() => void) | null>(null);

  const ownerEmail = 'sonivicky297@gmail.com';
  const canEditDocument = !isEditLockedToOwner || isOwnerAuthenticated;

  const unlockOwnerAccess = (passcodeOrEmail: string): boolean => {
    const clean = passcodeOrEmail.trim().toLowerCase();
    if (clean === ownerPasscode.toLowerCase() || clean === ownerEmail.toLowerCase() || clean === '8092' || clean === '809219303') {
      setIsOwnerAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.OWNER_AUTH, 'true');
      if (pendingEditCallback) {
        pendingEditCallback();
        setPendingEditCallback(null);
      }
      return true;
    }
    return false;
  };

  const lockOwnerAccess = () => {
    setIsOwnerAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.OWNER_AUTH);
  };

  const toggleEditLockToOwner = (enable: boolean) => {
    setIsEditLockedToOwner(enable);
    localStorage.setItem(STORAGE_KEYS.OWNER_LOCK, enable ? 'true' : 'false');
    addToast(enable ? '🔒 Document Lock Enabled: Only Owner can edit.' : '🔓 Document Lock Disabled: Open Editing.', 'info');
  };

  const setOwnerPasscode = (newPin: string) => {
    setOwnerPasscodeState(newPin);
    localStorage.setItem(STORAGE_KEYS.OWNER_PIN, newPin);
  };

  const openOwnerUnlockModal = (callback?: () => void) => {
    if (callback) setPendingEditCallback(() => callback);
    setShowOwnerUnlockModal(true);
  };

  const closeOwnerUnlockModal = () => {
    setShowOwnerUnlockModal(false);
    setPendingEditCallback(null);
  };

  const toggleProviderAvailableNow = (id: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        const isCurrentlyAvailable = (p.isActive !== false) && (p.isOpen !== false) && (!p.isClosedToday);
        if (isCurrentlyAvailable) {
          // Switch to Not Available
          return {
            ...p,
            isOpen: false,
            isClosedToday: true,
            closedReason: 'Marked as Not Available'
          };
        } else {
          // Switch to Available Now
          return {
            ...p,
            isActive: true,
            isOpen: true,
            isClosedToday: false,
            closedReason: undefined
          };
        }
      }
      return p;
    }));

    if (selectedProviderForProfile && selectedProviderForProfile.id === id) {
      setSelectedProviderForProfile(prev => {
        if (!prev) return null;
        const isCurrentlyAvailable = (prev.isActive !== false) && (prev.isOpen !== false) && (!prev.isClosedToday);
        if (isCurrentlyAvailable) {
          return {
            ...prev,
            isOpen: false,
            isClosedToday: true,
            closedReason: 'Marked as Not Available'
          };
        } else {
          return {
            ...prev,
            isActive: true,
            isOpen: true,
            isClosedToday: false,
            closedReason: undefined
          };
        }
      });
    }

    addToast('Provider availability toggled.', 'info');
  };

  const toggleCategoryClosed = (id: string) => {
    setCategories(prev => prev.map(c => {
      if (c.id === id) {
        const nextClosed = !c.isClosed;
        return {
          ...c,
          isClosed: nextClosed,
          isOpen: !nextClosed,
          closedMessage: nextClosed ? (c.closedMessage || 'This service category is currently closed.') : undefined
        };
      }
      return c;
    }));
    addToast('Category Open/Closed status updated.', 'info');
  };

  const toggleCategoryClosedToday = (id: string) => {
    setCategories(prev => prev.map(c => {
      if (c.id === id) {
        const nextClosedToday = !c.isClosedToday;
        return {
          ...c,
          isClosedToday: nextClosedToday,
          closedMessage: nextClosedToday ? (c.closedMessage || 'This service is temporarily closed for today.') : undefined
        };
      }
      return c;
    }));
    addToast('Category "Closed Today" status updated.', 'info');
  };

  const addProviderReview = (providerId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };

    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        const updatedReviews = [newRev, ...p.reviews];
        const avgRating = Number((updatedReviews.reduce((acc, curr) => acc + curr.rating, 0) / updatedReviews.length).toFixed(2));
        return {
          ...p,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: avgRating
        };
      }
      return p;
    }));

    if (selectedProviderForProfile && selectedProviderForProfile.id === providerId) {
      setSelectedProviderForProfile(prev => {
        if (!prev) return null;
        const updatedReviews = [newRev, ...prev.reviews];
        const avgRating = Number((updatedReviews.reduce((acc, curr) => acc + curr.rating, 0) / updatedReviews.length).toFixed(2));
        return {
          ...prev,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: avgRating
        };
      });
    }

    addToast('Thank you for submitting your review!', 'success');
  };

  // Category CRUD
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: 'cat-' + Date.now(),
    };
    setCategories(prev => [...prev, newCat]);
    addToast('New category created successfully!', 'success');
  };

  const updateCategory = (id: string, updatedFields: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
    addToast('Category updated.', 'info');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    addToast('Category deleted.', 'warning');
  };

  // Requests / Bookings
  const addServiceRequest = (reqData: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>): string => {
    const id = 'req-' + Math.floor(100 + Math.random() * 900);
    const newReq: ServiceRequest = {
      ...reqData,
      id,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setRequests(prev => [newReq, ...prev]);
    setProviders(prev => prev.map(p => p.id === reqData.providerId ? { ...p, completedJobs: p.completedJobs + 1 } : p));
    
    return id;
  };

  const updateRequestStatus = (id: string, status: RequestStatus, adminNotes?: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { 
      ...r, 
      status, 
      ...(adminNotes !== undefined ? { adminNotes } : {}) 
    } : r));
    addToast(`Booking status updated to "${status}".`, 'info');
  };

  const deleteServiceRequest = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    addToast('Booking record removed.', 'warning');
  };

  const toggleProviderOpen = (id: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        const nextOpen = p.isOpen === false ? true : false;
        return {
          ...p,
          isOpen: nextOpen,
          isClosedToday: !nextOpen ? p.isClosedToday : false
        };
      }
      return p;
    }));
    if (selectedProviderForProfile && selectedProviderForProfile.id === id) {
      setSelectedProviderForProfile(prev => prev ? { ...prev, isOpen: prev.isOpen === false ? true : false } : null);
    }
    addToast('Provider Open/Closed status updated.', 'info');
  };

  const resetDataToDefault = () => {
    setCategories(INITIAL_CATEGORIES);
    setProviders(INITIAL_PROVIDERS);
    setRequests(INITIAL_REQUESTS);
    setSelectedCityState('All Covered Areas');
    setUserLocationState({
      lat: 23.6420,
      lng: 85.3520,
      name: 'Bhurkunda Main Market'
    });
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.PROVIDERS);
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.CITY);
    localStorage.removeItem(STORAGE_KEYS.USER_LOC);
    addToast('All data has been reset to default for Bhurkunda, Ramgarh & surrounding areas.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        selectedCity,
        setSelectedCity,
        cities: CITIES_LIST,
        userLocation,
        setUserLocation,
        viewMode,
        setViewMode,
        mapHoveredProviderId,
        setMapHoveredProviderId,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        toggleCategoryClosed,
        toggleCategoryClosedToday,
        providers,
        addProvider,
        updateProvider,
        deleteProvider,
        toggleProviderVerification,
        toggleProviderActive,
        toggleProviderOpenToday,
        toggleProviderOpen,
        toggleProviderAvailableNow,
        addProviderReview,
        requests,
        addServiceRequest,
        updateRequestStatus,
        deleteServiceRequest,
        filters,
        setFilters,
        resetFilters,
        currentTab,
        setCurrentTab,
        selectedProviderForProfile,
        openProviderProfile,
        closeProviderProfile,
        selectedProviderForBooking,
        openBookingModal,
        closeBookingModal,
        toasts,
        addToast,
        removeToast,
        resetDataToDefault,
        isEditLockedToOwner,
        isOwnerAuthenticated,
        ownerEmail,
        ownerPasscode,
        canEditDocument,
        unlockOwnerAccess,
        lockOwnerAccess,
        toggleEditLockToOwner,
        setOwnerPasscode,
        showOwnerUnlockModal,
        openOwnerUnlockModal,
        closeOwnerUnlockModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
