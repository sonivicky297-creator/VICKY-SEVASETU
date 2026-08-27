import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedProviders } from './components/FeaturedProviders';
import { HowItWorks } from './components/HowItWorks';
import { TrustAndSafety } from './components/TrustAndSafety';
import { ProviderDirectory } from './components/ProviderDirectory';
import { ProviderProfileModal } from './components/ProviderProfileModal';
import { BookingModal } from './components/BookingModal';
import { JoinProviderModal } from './components/JoinProviderModal';
import { UserBookingsModal } from './components/UserBookingsModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutModal, ContactModal } from './components/AboutModal';
import { TaskTeamModal } from './components/TaskTeamModal';
import { BarcodeModal } from './components/BarcodeModal';
import { TaskImageEditorModal } from './components/TaskImageEditorModal';
import { EditProviderModal } from './components/EditProviderModal';
import { OwnerLockModal } from './components/OwnerLockModal';
import { BottomLeftOwnerEditLock } from './components/BottomLeftOwnerEditLock';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { Category, ServiceProvider } from './types';

const MainAppContent: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    selectedProviderForProfile,
    openProviderProfile,
    closeProviderProfile,
    selectedProviderForBooking,
    openBookingModal,
    closeBookingModal,
    setFilters,
    resetFilters,
    canEditDocument,
    showOwnerUnlockModal,
    openOwnerUnlockModal,
    closeOwnerUnlockModal
  } = useApp();

  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [bookingsModalOpen, setBookingsModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  // Dedicated Modals
  const [teamModalCategory, setTeamModalCategory] = useState<Category | null>(null);
  const [barcodeProvider, setBarcodeProvider] = useState<ServiceProvider | null>(null);
  const [imageEditorProvider, setImageEditorProvider] = useState<ServiceProvider | null>(null);
  const [editModalProvider, setEditModalProvider] = useState<ServiceProvider | null>(null);

  // Direct Go to Home action
  const handleGoHome = () => {
    closeProviderProfile();
    closeBookingModal();
    setJoinModalOpen(false);
    setBookingsModalOpen(false);
    setAdminModalOpen(false);
    setAboutModalOpen(false);
    setContactModalOpen(false);
    setTeamModalCategory(null);
    setBarcodeProvider(null);
    setImageEditorProvider(null);
    setEditModalProvider(null);
    resetFilters();
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Browser History & Mobile Back Navigation handling
  useEffect(() => {
    try {
      if (!window.history.state) {
        window.history.replaceState({ app: 'sevasetu', tab: 'home' }, '');
      }
    } catch {}

    const handlePopState = () => {
      // 1. Close tertiary modals first
      if (editModalProvider) {
        setEditModalProvider(null);
        return;
      }
      if (imageEditorProvider) {
        setImageEditorProvider(null);
        return;
      }
      if (barcodeProvider) {
        setBarcodeProvider(null);
        return;
      }

      // 2. Close booking or profile modals
      if (selectedProviderForBooking) {
        closeBookingModal();
        return;
      }
      if (selectedProviderForProfile) {
        closeProviderProfile();
        return;
      }

      // 3. Close team modal
      if (teamModalCategory) {
        setTeamModalCategory(null);
        return;
      }

      // 4. Close top nav modals
      if (joinModalOpen) { setJoinModalOpen(false); return; }
      if (bookingsModalOpen) { setBookingsModalOpen(false); return; }
      if (adminModalOpen) { setAdminModalOpen(false); return; }
      if (aboutModalOpen) { setAboutModalOpen(false); return; }
      if (contactModalOpen) { setContactModalOpen(false); return; }

      // 5. If on directory tab, return back to home
      if (currentTab === 'directory') {
        setCurrentTab('home');
        return;
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [
    currentTab,
    selectedProviderForProfile,
    selectedProviderForBooking,
    teamModalCategory,
    barcodeProvider,
    imageEditorProvider,
    editModalProvider,
    joinModalOpen,
    bookingsModalOpen,
    adminModalOpen,
    aboutModalOpen,
    contactModalOpen,
    closeBookingModal,
    closeProviderProfile,
    setCurrentTab
  ]);

  const handleProtectedEdit = (action: () => void) => {
    if (!canEditDocument) {
      openOwnerUnlockModal(action);
    } else {
      action();
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    try {
      window.history.pushState({ app: 'sevasetu', tab: 'directory', categoryId }, '');
    } catch {}
    setFilters(prev => ({ ...prev, categoryId }));
    setCurrentTab('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTeam = (cat: Category) => {
    try {
      window.history.pushState({ app: 'sevasetu', modal: 'team', categoryId: cat.id }, '');
    } catch {}
    setTeamModalCategory(cat);
  };

  const handleOpenProfile = (prov: ServiceProvider) => {
    try {
      window.history.pushState({ app: 'sevasetu', modal: 'profile', providerId: prov.id }, '');
    } catch {}
    openProviderProfile(prov);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-amber-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        onOpenJoin={() => {
          try { window.history.pushState({ modal: 'join' }, ''); } catch {}
          setJoinModalOpen(true);
        }}
        onOpenBookings={() => {
          try { window.history.pushState({ modal: 'bookings' }, ''); } catch {}
          setBookingsModalOpen(true);
        }}
        onOpenAdmin={() => {
          try { window.history.pushState({ modal: 'admin' }, ''); } catch {}
          setAdminModalOpen(true);
        }}
        onOpenAbout={() => {
          try { window.history.pushState({ modal: 'about' }, ''); } catch {}
          setAboutModalOpen(true);
        }}
        onOpenContact={() => {
          try { window.history.pushState({ modal: 'contact' }, ''); } catch {}
          setContactModalOpen(true);
        }}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentTab === 'home' ? (
          <>
            {/* 1. Hero with Live Search and Quick stats */}
            <HeroSection
              onSearchSubmit={() => {
                try { window.history.pushState({ tab: 'directory' }, ''); } catch {}
                setCurrentTab('directory');
              }}
              onCategorySelect={handleCategorySelect}
            />

            {/* 2. Popular Categories Grid with 10-person task team modal */}
            <CategoryGrid
              onCategorySelect={handleCategorySelect}
              onOpenTeamModal={handleOpenTeam}
            />

            {/* 3. Featured Verified Specialists */}
            <FeaturedProviders
              onViewAll={() => {
                try { window.history.pushState({ tab: 'directory' }, ''); } catch {}
                setCurrentTab('directory');
              }}
            />

            {/* 4. How It Works (Transparent 3-step guide) */}
            <HowItWorks />

            {/* 5. Trust, Safety & Verified Customer Reviews */}
            <TrustAndSafety />
          </>
        ) : (
          /* Search & Filter Directory Page with Direct Back Button */
          <div className="relative">
            {/* Direct Home Navigation Bar on Directory Page */}
            <div className="bg-amber-500 text-slate-950 px-4 py-2 flex items-center justify-between shadow-xs">
              <button
                onClick={handleGoHome}
                id="directory-back-home-banner-btn"
                className="flex items-center gap-1.5 font-black text-xs sm:text-sm bg-slate-950 text-amber-400 hover:bg-slate-900 px-3 py-1.5 rounded-xl shadow-xs transition-transform active:scale-95"
              >
                <span>🏠 मुख्य होम पेज पर वापस जाएं (Back to Home)</span>
              </button>
              <span className="text-xs font-bold hidden sm:inline text-slate-950">
                0% कमीशन • डायरेक्ट सेवा बुकिंग
              </span>
            </div>

            <ProviderDirectory />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenJoin={() => {
          try { window.history.pushState({ modal: 'join' }, ''); } catch {}
          setJoinModalOpen(true);
        }}
        onOpenAdmin={() => {
          try { window.history.pushState({ modal: 'admin' }, ''); } catch {}
          setAdminModalOpen(true);
        }}
        onOpenAbout={() => {
          try { window.history.pushState({ modal: 'about' }, ''); } catch {}
          setAboutModalOpen(true);
        }}
        onOpenContact={() => {
          try { window.history.pushState({ modal: 'contact' }, ''); } catch {}
          setContactModalOpen(true);
        }}
      />

      {/* MODALS */}
      {/* 1. Provider Profile Modal */}
      {selectedProviderForProfile && (
        <ProviderProfileModal
          provider={selectedProviderForProfile}
          onClose={closeProviderProfile}
          onGoHome={handleGoHome}
          onBookNow={(provider) => {
            closeProviderProfile();
            try { window.history.pushState({ modal: 'booking' }, ''); } catch {}
            openBookingModal(provider);
          }}
        />
      )}

      {/* 2. Service Booking / Request Modal */}
      {selectedProviderForBooking && (
        <BookingModal
          provider={selectedProviderForBooking}
          onClose={closeBookingModal}
        />
      )}

      {/* 3. Join as Provider Onboarding Modal */}
      {joinModalOpen && (
        <JoinProviderModal
          onClose={() => setJoinModalOpen(false)}
        />
      )}

      {/* 4. User Bookings & Leads Tracker */}
      {bookingsModalOpen && (
        <UserBookingsModal
          onClose={() => setBookingsModalOpen(false)}
        />
      )}

      {/* 5. Admin Dashboard CRUD Modal */}
      {adminModalOpen && (
        <AdminDashboard
          onClose={() => setAdminModalOpen(false)}
        />
      )}

      {/* 6. About Modal */}
      {aboutModalOpen && (
        <AboutModal
          onClose={() => setAboutModalOpen(false)}
        />
      )}

      {/* 7. Contact Modal */}
      {contactModalOpen && (
        <ContactModal
          onClose={() => setContactModalOpen(false)}
        />
      )}

      {/* 8. 10-Specialists Task Team Modal */}
      {teamModalCategory && (
        <TaskTeamModal
          category={teamModalCategory}
          onClose={() => setTeamModalCategory(null)}
          onGoHome={handleGoHome}
          onSelectProviderForProfile={(prov) => {
            setTeamModalCategory(null);
            handleOpenProfile(prov);
          }}
          onSelectProviderForBooking={(prov) => {
            setTeamModalCategory(null);
            try { window.history.pushState({ modal: 'booking' }, ''); } catch {}
            openBookingModal(prov);
          }}
          onOpenBarcode={(prov) => {
            handleProtectedEdit(() => {
              try { window.history.pushState({ modal: 'barcode' }, ''); } catch {}
              setBarcodeProvider(prov);
            });
          }}
          onOpenImageEditor={(prov) => {
            handleProtectedEdit(() => {
              try { window.history.pushState({ modal: 'imageEditor' }, ''); } catch {}
              setImageEditorProvider(prov);
            });
          }}
          onOpenEdit={(prov) => {
            handleProtectedEdit(() => {
              try { window.history.pushState({ modal: 'edit' }, ''); } catch {}
              setEditModalProvider(prov);
            });
          }}
        />
      )}

      {/* 9. Barcode & Digital ID Pass Modal */}
      {barcodeProvider && (
        <BarcodeModal
          provider={barcodeProvider}
          onClose={() => setBarcodeProvider(null)}
        />
      )}

      {/* 10. 10 Task Portfolio Images Editor Modal */}
      {imageEditorProvider && (
        <TaskImageEditorModal
          provider={imageEditorProvider}
          onClose={() => setImageEditorProvider(null)}
        />
      )}

      {/* 11. Edit Provider Modal (9 Fields) */}
      {editModalProvider && (
        <EditProviderModal
          provider={editModalProvider}
          onClose={() => setEditModalProvider(null)}
        />
      )}

      {/* 12. Master Owner Lock & Access Control Modal */}
      {showOwnerUnlockModal && (
        <OwnerLockModal
          onClose={closeOwnerUnlockModal}
        />
      )}

      {/* Bottom Left Floating Owner Lock / 30-Second Timer Widget */}
      <BottomLeftOwnerEditLock />

      {/* Sticky Mobile Bottom Navigation Bar */}
      <MobileBottomNav 
        onOpenBookings={() => {
          try { window.history.pushState({ modal: 'bookings' }, ''); } catch {}
          setBookingsModalOpen(true);
        }} 
      />

      {/* Global Toast System */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
