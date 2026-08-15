import React, { useState } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles, 
  Upload, 
  Check, 
  Edit3, 
  RefreshCw, 
  Eye, 
  MoveUp, 
  MoveDown,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { PortfolioItem, ServiceProvider } from '../types';
import { useApp } from '../context/AppContext';

// Curated high-definition preset images for trades, tuition, and services
export const CURATED_TASK_IMAGE_PRESETS = [
  // Tuition & Tutors
  { title: 'Interactive Classroom & Whiteboard', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&auto=format&fit=crop&q=80', category: 'Tuition' },
  { title: '1-on-1 Personal Home Tutoring', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=700&auto=format&fit=crop&q=80', category: 'Tuition' },
  { title: 'Mathematics & Science Study Session', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&auto=format&fit=crop&q=80', category: 'Tuition' },
  { title: 'Physics & Chemistry Lab Problem Solving', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=700&auto=format&fit=crop&q=80', category: 'Tuition' },
  { title: 'CBSE & Board Exam Preparation Desk', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=700&auto=format&fit=crop&q=80', category: 'Tuition' },
  { title: 'Kids Vedic Maths & Handwriting', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&auto=format&fit=crop&q=80', category: 'Tuition' },
  
  // Electrician
  { title: 'Modular Switchboard & Inverter Wiring', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&auto=format&fit=crop&q=80', category: 'Electrician' },
  { title: 'Industrial MCB Panel Box Wiring', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=80', category: 'Electrician' },
  { title: 'Ceiling Fan & Decorative Chandelier Fitting', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&auto=format&fit=crop&q=80', category: 'Electrician' },
  { title: 'Solar Inverter & Battery Bank Installation', url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=700&auto=format&fit=crop&q=80', category: 'Electrician' },

  // Plumbing
  { title: 'Concealed CPVC Bathroom Diverter Fitting', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=700&auto=format&fit=crop&q=80', category: 'Plumber' },
  { title: 'Overhead Water Tank & Pressure Pump', url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&auto=format&fit=crop&q=80', category: 'Plumber' },
  { title: 'Kitchen Sink & Drain Unclogging', url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=700&auto=format&fit=crop&q=80', category: 'Plumber' },

  // Carpentry
  { title: 'Modular Kitchen & Soft-Close Drawers', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=700&auto=format&fit=crop&q=80', category: 'Carpenter' },
  { title: 'Custom Wooden Wardrobe Fabrication', url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&auto=format&fit=crop&q=80', category: 'Carpenter' },
  { title: 'Solid Wood Bed Frame & Polishing', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700&auto=format&fit=crop&q=80', category: 'Carpenter' },

  // Painting
  { title: 'Luxury Royal Texture Living Room Wall', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=700&auto=format&fit=crop&q=80', category: 'Painter' },
  { title: 'Exterior Weatherproof House Coating', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=700&auto=format&fit=crop&q=80', category: 'Painter' },
  { title: 'Damp Proof Wall Putty & Smooth Finish', url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700&auto=format&fit=crop&q=80', category: 'Painter' },

  // AC & Appliances
  { title: 'Split AC Foam Jet Deep Service', url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=700&auto=format&fit=crop&q=80', category: 'Appliance' },
  { title: 'Automatic Washing Machine Drum Servicing', url: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=700&auto=format&fit=crop&q=80', category: 'Appliance' },

  // Priest & Rituals
  { title: 'Grand Griha Pravesh & Vedic Havan', url: 'https://images.unsplash.com/photo-1609137144820-22d7cbe8078c?w=700&auto=format&fit=crop&q=80', category: 'Priest' },
  { title: 'Satyanarayan Vrat Puja Samagri Setup', url: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=700&auto=format&fit=crop&q=80', category: 'Priest' },

  // Materials
  { title: 'Bulk UltraTech Cement & River Sand Delivery', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop&q=80', category: 'Materials' },
  { title: 'TMT Steel Rebars & Brick Stacking at Site', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=700&auto=format&fit=crop&q=80', category: 'Materials' },

  // Cleaning
  { title: 'Mechanized Deep Cleaning & Sofa Shampoo', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&auto=format&fit=crop&q=80', category: 'Cleaning' },

  // Computer & CCTV
  { title: '4K CCTV Camera Network & Monitor Setup', url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=700&auto=format&fit=crop&q=80', category: 'Computer' },
  { title: 'Laptop Motherboard Chip-Level Repair', url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=700&auto=format&fit=crop&q=80', category: 'Computer' }
];

interface TaskImageEditorModalProps {
  provider: ServiceProvider;
  onClose: () => void;
  onSave?: (updatedPortfolio: PortfolioItem[]) => void;
}

export const TaskImageEditorModal: React.FC<TaskImageEditorModalProps> = ({
  provider,
  onClose,
  onSave
}) => {
  const { updateProvider, addToast } = useApp();

  // Ensure exactly 10 images are in state for editing
  const [images, setImages] = useState<PortfolioItem[]>(() => {
    const existing = [...(provider.portfolio || [])];
    // Fill up to 10 slots
    while (existing.length < 10) {
      const idx = existing.length;
      const fallbackPreset = CURATED_TASK_IMAGE_PRESETS[idx % CURATED_TASK_IMAGE_PRESETS.length];
      existing.push({
        id: `img-slot-${idx + 1}-${Date.now()}`,
        title: `${provider.title} - Sample Work ${idx + 1}`,
        description: `Verified task image from Bhurkunda, Ramgarh & surrounding areas.`,
        imageUrl: fallbackPreset.url
      });
    }
    return existing.slice(0, 10);
  });

  const [activeSlotIdx, setActiveSlotIdx] = useState<number>(0);
  const [presetCategory, setPresetCategory] = useState<string>('All');
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const currentImage = images[activeSlotIdx] || images[0];

  const handleUpdateCurrentSlot = (field: keyof PortfolioItem, value: string) => {
    const updated = [...images];
    updated[activeSlotIdx] = {
      ...updated[activeSlotIdx],
      [field]: value
    };
    setImages(updated);
  };

  const handleApplyPreset = (preset: { title: string; url: string }) => {
    const updated = [...images];
    updated[activeSlotIdx] = {
      ...updated[activeSlotIdx],
      title: preset.title,
      imageUrl: preset.url
    };
    setImages(updated);
    addToast(`Applied preset to Image ${activeSlotIdx + 1}!`, 'info');
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === images.length - 1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setImages(updated);
    setActiveSlotIdx(targetIndex);
  };

  const handleSaveAll = () => {
    updateProvider(provider.id, { portfolio: images });
    if (onSave) onSave(images);
    addToast(`Successfully updated all 10 task images for ${provider.name}!`, 'success');
    onClose();
  };

  const handleResetTo10Presets = () => {
    const fresh10 = Array.from({ length: 10 }).map((_, idx) => {
      const preset = CURATED_TASK_IMAGE_PRESETS[idx % CURATED_TASK_IMAGE_PRESETS.length];
      return {
        id: `img-slot-${idx + 1}-${Date.now()}`,
        title: `${provider.name} - Project ${idx + 1}`,
        description: `Verified high quality work showcase in Bhurkunda & Ramgarh.`,
        imageUrl: preset.url
      };
    });
    setImages(fresh10);
    addToast('Loaded 10 curated HD task images!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-950 p-5 text-white shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">10 Task Images Editor</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-extrabold text-[10px] uppercase tracking-wider">
                  10 Images Active
                </span>
              </div>
              <p className="text-xs text-amber-200">
                {provider.name} • {provider.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetTo10Presets}
              className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors hidden sm:flex"
              title="Reset with 10 HD photos"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load 10 Presets</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Grid: Left Thumbnails (10 Images) & Right Slot Editor */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left: 10 Image Slots Navigation */}
          <div className="md:col-span-5 bg-slate-50 border-r border-slate-200 p-4 overflow-y-auto space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Task Images (10 Slots)</span>
              </span>
              <span className="text-[11px] text-slate-500 font-semibold">
                Click to edit
              </span>
            </div>

            <div className="space-y-2">
              {images.map((img, idx) => {
                const isActive = activeSlotIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveSlotIdx(idx)}
                    className={`group p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isActive
                        ? 'bg-amber-50/90 border-amber-500 shadow-sm ring-1 ring-amber-500/30'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    {/* Number Badge & Thumbnail */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                      <img
                        src={img.imageUrl}
                        alt={img.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80';
                        }}
                      />
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-slate-900/80 text-white font-mono text-[9px] font-bold">
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-bold truncate ${isActive ? 'text-amber-900' : 'text-slate-800'}`}>
                          {img.title || `Task Image #${idx + 1}`}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {img.description || 'Verified task proof'}
                      </p>
                    </div>

                    {/* Reorder up/down */}
                    <div className="flex flex-col gap-1 shrink-0 opacity-60 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMove(idx, 'up');
                        }}
                        disabled={idx === 0}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30"
                      >
                        <MoveUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMove(idx, 'down');
                        }}
                        disabled={idx === images.length - 1}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30"
                      >
                        <MoveDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Active Slot Editor Form & Presets */}
          <div className="md:col-span-7 p-5 overflow-y-auto space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs">
                  Editing Image #{activeSlotIdx + 1} of 10
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxUrl(currentImage.imageUrl)}
                className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full View Preview</span>
              </button>
            </div>

            {/* Current Image Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-44 sm:h-52">
              <img
                src={currentImage.imageUrl}
                alt={currentImage.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 text-white">
                <p className="font-bold text-sm">{currentImage.title}</p>
                <p className="text-xs text-slate-300 line-clamp-1">{currentImage.description}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Image Title / Caption:
                </label>
                <input
                  type="text"
                  value={currentImage.title}
                  onChange={(e) => handleUpdateCurrentSlot('title', e.target.value)}
                  placeholder="e.g., Mathematics & Board Exam Preparation"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Image Web URL (Direct Image Link):
                </label>
                <input
                  type="text"
                  value={currentImage.imageUrl}
                  onChange={(e) => handleUpdateCurrentSlot('imageUrl', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description / Service Note:
                </label>
                <input
                  type="text"
                  value={currentImage.description || ''}
                  onChange={(e) => handleUpdateCurrentSlot('description', e.target.value)}
                  placeholder="e.g., Conducted in Bhurkunda & Ramgarh with high student feedback."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            {/* Quick Pick Presets */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Choose from Curated HD Presets:</span>
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
                {CURATED_TASK_IMAGE_PRESETS.map((preset, pIdx) => (
                  <div
                    key={pIdx}
                    onClick={() => handleApplyPreset(preset)}
                    className="group relative rounded-lg overflow-hidden border border-slate-200 hover:border-amber-500 cursor-pointer h-16 bg-slate-200"
                    title={preset.title}
                  >
                    <img
                      src={preset.url}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 flex items-end p-1">
                      <span className="text-[9px] font-bold text-white truncate drop-shadow-xs">
                        {preset.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>10 distinct images active for this task & provider.</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAll}
              className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save 10 Images</span>
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      {lightboxUrl && (
        <div 
          onClick={() => setLightboxUrl(null)}
          className="fixed inset-0 z-60 bg-slate-950/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={lightboxUrl}
            alt="Full Task Preview"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />
          <button
            onClick={() => setLightboxUrl(null)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

// Reusable 10-Image Task Gallery Component for display in cards & profile modals
export const TaskGallery: React.FC<{
  provider: ServiceProvider;
  onOpenEditor?: () => void;
}> = ({ provider, onOpenEditor }) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Guarantee 10 images
  const images = provider.portfolio && provider.portfolio.length >= 10
    ? provider.portfolio.slice(0, 10)
    : Array.from({ length: 10 }).map((_, idx) => {
        const existing = provider.portfolio?.[idx];
        if (existing) return existing;
        const preset = CURATED_TASK_IMAGE_PRESETS[idx % CURATED_TASK_IMAGE_PRESETS.length];
        return {
          id: `img-${idx + 1}`,
          title: `${provider.title} - Showcase ${idx + 1}`,
          imageUrl: preset.url,
          description: 'Verified work photo in Bhurkunda, Ramgarh & surrounding areas.'
        };
      });

  const activeImg = images[selectedImageIdx] || images[0];

  return (
    <div className="space-y-3 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
      
      {/* Header with Title and Edit Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-xs">
            10
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Task Portfolio (10 Images)</h4>
            <p className="text-[11px] text-slate-500">Verified work proof & study sessions</p>
          </div>
        </div>

        {onOpenEditor && (
          <button
            onClick={onOpenEditor}
            className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs hover:bg-amber-100 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-700" />
            <span>Edit 10 Images</span>
          </button>
        )}
      </div>

      {/* Main Active Image Display */}
      <div 
        onClick={() => setLightboxOpen(true)}
        className="relative rounded-2xl overflow-hidden bg-slate-900 h-60 sm:h-72 cursor-pointer group border border-slate-200 shadow-xs"
      >
        <img
          src={activeImg.imageUrl}
          alt={activeImg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80';
          }}
        />
        
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-xs text-white font-bold text-xs flex items-center gap-1.5">
          <span>Image {selectedImageIdx + 1} of 10</span>
        </div>

        <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/70 text-white group-hover:bg-amber-600 transition-colors">
          <Eye className="w-4 h-4" />
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4 text-white">
          <h5 className="text-sm sm:text-base font-bold">{activeImg.title}</h5>
          {activeImg.description && (
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">{activeImg.description}</p>
          )}
        </div>
      </div>

      {/* 10 Thumbnails Strip */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
        {images.map((img, idx) => {
          const isSelected = selectedImageIdx === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImageIdx(idx)}
              className={`relative rounded-xl overflow-hidden h-14 bg-slate-100 border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-amber-500 ring-2 ring-amber-500/40 scale-105'
                  : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80';
                }}
              />
              <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[9px] font-mono font-bold text-white text-center py-0.5">
                #{idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-60 bg-slate-950/95 flex items-center justify-center p-4 cursor-pointer animate-fadeIn"
        >
          <div className="max-w-4xl w-full text-center space-y-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeImg.imageUrl}
              alt={activeImg.title}
              className="max-w-full max-h-[75vh] mx-auto rounded-2xl object-contain shadow-2xl border border-white/10"
            />
            <div className="text-white text-center">
              <h4 className="text-base font-bold">{activeImg.title} (Image {selectedImageIdx + 1} of 10)</h4>
              <p className="text-xs text-slate-300 mt-1">{activeImg.description}</p>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="px-6 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
