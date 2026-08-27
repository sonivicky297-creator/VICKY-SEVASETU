import React, { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProviderCard } from './ProviderCard';
import { BarcodeModal } from './BarcodeModal';
import { TaskImageEditorModal } from './TaskImageEditorModal';
import { EditProviderModal } from './EditProviderModal';
import { ServiceProvider } from '../types';

interface FeaturedProvidersProps {
  onViewAll: () => void;
}

export const FeaturedProviders: React.FC<FeaturedProvidersProps> = ({ onViewAll }) => {
  const { 
    t, 
    providers, 
    openProviderProfile, 
    openBookingModal 
  } = useApp();

  const [selectedBarcodeProvider, setSelectedBarcodeProvider] = useState<ServiceProvider | null>(null);
  const [selectedImageEditorProvider, setSelectedImageEditorProvider] = useState<ServiceProvider | null>(null);
  const [selectedEditProvider, setSelectedEditProvider] = useState<ServiceProvider | null>(null);

  const featured = providers.filter(p => p.isFeatured).slice(0, 6);

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold tracking-wide uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Top Verified Specialists in Bhurkunda & Ramgarh</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.featuredHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              {t.featuredSubheading}
            </p>
          </div>

          <button
            onClick={onViewAll}
            id="featured-view-all-btn"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold text-sm sm:text-base group shrink-0"
          >
            <span>{t.viewAllProviders}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((provider, idx) => (
            <ProviderCard
              key={provider.id}
              index={idx + 1}
              provider={provider}
              onViewProfile={openProviderProfile}
              onRequestService={openBookingModal}
              onOpenBarcode={setSelectedBarcodeProvider}
              onOpenImageEditor={setSelectedImageEditorProvider}
              onOpenEdit={setSelectedEditProvider}
            />
          ))}
        </div>

      </div>

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
    </section>
  );
};
