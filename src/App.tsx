import React, { useState } from 'react';
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
  
  // New Dedicated Modals
  const [teamModalCategory, setTeamModalCategory] = useState<Category | null>(null);
  const [barcodeProvider, setBarcodeProvider] = useState<ServiceProvider | null>(null);
  const [imageEditorProvider, setImageEditorProvider] = useState<ServiceProvider | null>(null);
  const [editModalProvider, setEditModalProvider] = useState<ServiceProvider | null>(null);

  const handleProtectedEdit = (action: () => void) => {
    if (!canEditDocument) {
      openOwnerUnlockModal(action);
    } else {
      action();
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setFilters(prev => ({ ...prev, categoryId }));
    setCurrentTab('directory');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-amber-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        onOpenJoin={() => setJoinModalOpen(true)}
        onOpenBookings={() => setBookingsModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentTab === 'home' ? (
          <>
            {/* 1. Hero with Live Search and Quick stats */}
            <HeroSection
              onSearchSubmit={() => setCurrentTab('directory')}
              onCategorySelect={handleCategorySelect}
            />

            {/* 2. Popular Categories Grid with 10-person task team modal */}
            <CategoryGrid
              onCategorySelect={handleCategorySelect}
              onOpenTeamModal={(cat) => setTeamModalCategory(cat)}
            />

            {/* 3. Featured Verified Specialists */}
            <FeaturedProviders
              onViewAll={() => setCurrentTab('directory')}
            />

            {/* 4. How It Works (Transparent 3-step guide) */}
            <HowItWorks />

            {/* 5. Trust, Safety & Verified Customer Reviews */}
            <TrustAndSafety />
          </>
        ) : (
          /* Search & Filter Directory Page */
          <ProviderDirectory />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenJoin={() => setJoinModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* MODALS */}
      {/* 1. Provider Profile Modal */}
      {selectedProviderForProfile && (
        <ProviderProfileModal
          provider={selectedProviderForProfile}
          onClose={closeProviderProfile}
          onBookNow={(provider) => {
            closeProviderProfile();
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
          onSelectProviderForProfile={(prov) => {
            setTeamModalCategory(null);
            openProviderProfile(prov);
          }}
          onSelectProviderForBooking={(prov) => {
            setTeamModalCategory(null);
            openBookingModal(prov);
          }}
          onOpenBarcode={(prov) => {
            handleProtectedEdit(() => setBarcodeProvider(prov));
          }}
          onOpenImageEditor={(prov) => {
            handleProtectedEdit(() => setImageEditorProvider(prov));
          }}
          onOpenEdit={(prov) => {
            handleProtectedEdit(() => setEditModalProvider(prov));
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

      {/* Sticky Mobile Bottom Navigation Bar (Home, Back, Services, Bookings, Lock) */}
      <MobileBottomNav onOpenBookings={() => setBookingsModalOpen(true)} />

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
