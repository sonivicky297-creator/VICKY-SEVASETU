import React from 'react';
import { Home, ChevronLeft, Wrench, CalendarCheck, Lock, Unlock } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MobileBottomNavProps {
  onOpenBookings: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenBookings }) => {
  const {
    currentTab,
    setCurrentTab,
    isOwnerAuthenticated,
    openOwnerUnlockModal,
    resetFilters
  } = useApp();

  const handleGoHome = () => {
    resetFilters();
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (currentTab === 'directory') {
      handleGoHome();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      handleGoHome();
    }
  };

  const handleGoServices = () => {
    setCurrentTab('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 text-white shadow-2xl px-2 py-1.5 flex items-center justify-around safe-area-pb">
      
      {/* 1. Home (होम) */}
      <button
        onClick={handleGoHome}
        id="mobile-bottom-home-btn"
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
          currentTab === 'home'
            ? 'text-amber-400 font-extrabold bg-slate-800/80'
            : 'text-slate-400 hover:text-white font-medium'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">होम (Home)</span>
      </button>

      {/* 2. Back (पीछे जाएं) */}
      <button
        onClick={handleGoBack}
        id="mobile-bottom-back-btn"
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-400 hover:text-white font-medium transition-all active:scale-95"
      >
        <ChevronLeft className="w-5 h-5 mb-0.5 text-amber-500" />
        <span className="text-[10px] tracking-tight text-amber-300">पीछे (Back)</span>
      </button>

      {/* 3. All Services (सेवाएं) */}
      <button
        onClick={handleGoServices}
        id="mobile-bottom-services-btn"
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
          currentTab === 'directory'
            ? 'text-amber-400 font-extrabold bg-slate-800/80'
            : 'text-slate-400 hover:text-white font-medium'
        }`}
      >
        <Wrench className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">सेवाएं (Services)</span>
      </button>

      {/* 4. Bookings (बुकिंग) */}
      <button
        onClick={onOpenBookings}
        id="mobile-bottom-bookings-btn"
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-400 hover:text-white font-medium transition-all"
      >
        <CalendarCheck className="w-5 h-5 mb-0.5 text-emerald-400" />
        <span className="text-[10px] tracking-tight">बुकिंग (Bookings)</span>
      </button>

      {/* 5. Owner Lock (सुरक्षा) */}
      <button
        onClick={() => openOwnerUnlockModal()}
        id="mobile-bottom-lock-btn"
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl font-medium transition-all ${
          isOwnerAuthenticated ? 'text-emerald-400' : 'text-amber-400'
        }`}
      >
        {isOwnerAuthenticated ? (
          <Unlock className="w-5 h-5 mb-0.5 text-emerald-400 animate-pulse" />
        ) : (
          <Lock className="w-5 h-5 mb-0.5 text-amber-400" />
        )}
        <span className="text-[10px] tracking-tight">
          {isOwnerAuthenticated ? 'Unlocked' : 'सुरक्षा Lock'}
        </span>
      </button>
    </div>
  );
};
