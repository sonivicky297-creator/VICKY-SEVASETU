import React from 'react';
import { Home, ChevronLeft, ChevronRight, Wrench, CalendarCheck, Lock, Unlock } from 'lucide-react';
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

  const handleGoForward = () => {
    window.history.forward();
  };

  const handleGoServices = () => {
    setCurrentTab('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 text-white shadow-2xl px-1 py-1.5 flex items-center justify-between safe-area-pb">
      
      {/* 1. Home (होम) */}
      <button
        onClick={handleGoHome}
        id="mobile-bottom-home-btn"
        className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
          currentTab === 'home'
            ? 'text-amber-400 font-extrabold bg-slate-800/80'
            : 'text-slate-400 hover:text-white font-medium'
        }`}
      >
        <Home className="w-4.5 h-4.5 mb-0.5 text-amber-400" />
        <span className="text-[9.5px] tracking-tight font-bold">होम</span>
      </button>

      {/* 2. Back (पीछे) */}
      <button
        onClick={handleGoBack}
        id="mobile-bottom-back-btn"
        className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-slate-300 hover:text-white font-medium transition-all active:scale-95"
      >
        <ChevronLeft className="w-4.5 h-4.5 mb-0.5 text-amber-400" />
        <span className="text-[9.5px] tracking-tight text-amber-300 font-bold">पीछे</span>
      </button>

      {/* 3. Forward (आगे) */}
      <button
        onClick={handleGoForward}
        id="mobile-bottom-forward-btn"
        className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-slate-300 hover:text-white font-medium transition-all active:scale-95"
      >
        <ChevronRight className="w-4.5 h-4.5 mb-0.5 text-amber-400" />
        <span className="text-[9.5px] tracking-tight text-amber-300 font-bold">आगे</span>
      </button>

      {/* 4. All Services (सेवाएं) */}
      <button
        onClick={handleGoServices}
        id="mobile-bottom-services-btn"
        className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
          currentTab === 'directory'
            ? 'text-amber-400 font-extrabold bg-slate-800/80'
            : 'text-slate-400 hover:text-white font-medium'
        }`}
      >
        <Wrench className="w-4.5 h-4.5 mb-0.5" />
        <span className="text-[9.5px] tracking-tight font-bold">सेवाएं</span>
      </button>

      {/* 5. Bookings (बुकिंग) */}
      <button
        onClick={onOpenBookings}
        id="mobile-bottom-bookings-btn"
        className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-slate-400 hover:text-white font-medium transition-all"
      >
        <CalendarCheck className="w-4.5 h-4.5 mb-0.5 text-emerald-400" />
        <span className="text-[9.5px] tracking-tight font-bold">बुकिंग</span>
      </button>

      {/* 6. Owner Lock (सुरक्षा) */}
      <button
        onClick={() => openOwnerUnlockModal()}
        id="mobile-bottom-lock-btn"
        className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl font-medium transition-all ${
          isOwnerAuthenticated ? 'text-emerald-400' : 'text-amber-400'
        }`}
      >
        {isOwnerAuthenticated ? (
          <Unlock className="w-4.5 h-4.5 mb-0.5 text-emerald-400 animate-pulse" />
        ) : (
          <Lock className="w-4.5 h-4.5 mb-0.5 text-amber-400" />
        )}
        <span className="text-[9.5px] tracking-tight font-bold">
          {isOwnerAuthenticated ? 'Unlocked' : 'सुरक्षा'}
        </span>
      </button>
    </div>
  );
};
