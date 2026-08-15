import React, { useState, useRef } from 'react';
import { 
  X, 
  Save, 
  User, 
  Briefcase, 
  MapPin, 
  Clock, 
  Image as ImageIcon, 
  IndianRupee, 
  Barcode as BarcodeIcon, 
  Phone, 
  MessageSquare, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  FileText,
  ShieldCheck,
  Eye,
  ExternalLink
} from 'lucide-react';
import { ServiceProvider, Category } from '../types';
import { useApp } from '../context/AppContext';
import { SvgBarcode, SvgQrCode } from './BarcodeModal';

interface EditProviderModalProps {
  provider: ServiceProvider;
  onClose: () => void;
  onSaved?: (updatedProvider: ServiceProvider) => void;
}

const AVATAR_PRESETS = [
  { label: 'Technician 1', url: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=500&auto=format&fit=crop&q=80' },
  { label: 'Technician 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80' },
  { label: 'Tutor / Educator', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80' },
  { label: 'Specialist Pro', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80' },
  { label: 'Master Craftsman', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80' },
  { label: 'Female Professional', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80' },
  { label: 'Senior Electrician', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80' },
  { label: 'Consultant / Lead', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80' }
];

const PRICE_UNIT_PRESETS = [
  'per visit',
  'per hour',
  'per month',
  'per day',
  'per point',
  'per fan',
  'per room',
  'per sq.ft'
];

export const EditProviderModal: React.FC<EditProviderModalProps> = ({
  provider,
  onClose,
  onSaved
}) => {
  const { updateProvider, categories, cities, addToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. His Name
  const [name, setName] = useState(provider.name);

  // 2. His Job Title
  const [title, setTitle] = useState(provider.title);

  // 3. His Location (Area, City, Full Address, Radius)
  const [city, setCity] = useState(provider.location?.city || 'Bhurkunda');
  const [area, setArea] = useState(provider.location?.area || 'Main Market');
  const [fullAddress, setFullAddress] = useState(provider.location?.fullAddress || '');
  const [serviceRadiusKm, setServiceRadiusKm] = useState(provider.serviceRadiusKm || 25);

  // 4. Experience (Years)
  const [experienceYears, setExperienceYears] = useState(provider.experienceYears || 5);

  // 5. Image (Avatar)
  const [avatar, setAvatar] = useState(provider.avatar || AVATAR_PRESETS[0].url);

  // 6. Salary / Starting Price & Unit
  const [startingPrice, setStartingPrice] = useState(provider.startingPrice || 250);
  const [priceUnit, setPriceUnit] = useState(provider.priceUnit || 'per visit');

  // 7. Barcode / Digital ID
  const defaultBarcode = provider.barcode || `VSS-2026-${provider.location?.city?.substring(0, 3).toUpperCase() || 'BHU'}-${provider.phone.replace(/[^0-9]/g, '').slice(-4) || '5302'}`;
  const [barcode, setBarcode] = useState(defaultBarcode);

  // 8. Call (Phone)
  const [phone, setPhone] = useState(provider.phone || '+91 80921 95302');

  // 9. WhatsApp
  const [whatsapp, setWhatsapp] = useState(provider.whatsapp || '+91809219303');

  // Additional Meta
  const [categoryId, setCategoryId] = useState(provider.categoryId || categories[0]?.id || '');
  const [bio, setBio] = useState(provider.bio || '');
  const [skillsStr, setSkillsStr] = useState(provider.skills?.join(', ') || '');
  const [isVerified, setIsVerified] = useState(provider.isVerified ?? true);

  // Local File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('File size must be under 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatar(reader.result);
          addToast('Photo uploaded successfully!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate Unique Barcode
  const handleGenerateNewBarcode = () => {
    const cityCode = city.substring(0, 3).toUpperCase() || 'BHU';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newCode = `VSS-2026-${cityCode}-${randNum}`;
    setBarcode(newCode);
    addToast(`Generated Barcode ID: ${newCode}`, 'info');
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast('Name is required', 'error');
      return;
    }

    if (!title.trim()) {
      addToast('Job title is required', 'error');
      return;
    }

    if (!phone.trim()) {
      addToast('Phone number is required for calling', 'error');
      return;
    }

    const skillsArray = skillsStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const updatedData: Partial<ServiceProvider> = {
      name: name.trim(),
      title: title.trim(),
      titleEn: title.trim(),
      experienceYears: Number(experienceYears),
      avatar: avatar.trim(),
      startingPrice: Number(startingPrice),
      priceUnit: priceUnit.trim(),
      barcode: barcode.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim(),
      categoryId,
      serviceRadiusKm: Number(serviceRadiusKm),
      isVerified,
      bio: bio.trim(),
      bioEn: bio.trim(),
      skills: skillsArray,
      location: {
        city: city.trim(),
        area: area.trim(),
        fullAddress: fullAddress.trim() || `${area}, ${city}, Jharkhand`,
        lat: provider.location?.lat || (city === 'Ramgarh' ? 23.6332 : 23.6420),
        lng: provider.location?.lng || (city === 'Ramgarh' ? 85.5149 : 85.3520)
      }
    };

    updateProvider(provider.id, updatedData);

    const completeUpdatedProvider: ServiceProvider = {
      ...provider,
      ...updatedData,
      location: {
        ...provider.location,
        ...(updatedData.location as any)
      }
    };

    if (onSaved) {
      onSaved(completeUpdatedProvider);
    }

    addToast(`Profile for ${name} updated successfully!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-5 sm:p-6 text-white shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-widest uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Full Specialist Editor
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {provider.id}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white truncate mt-0.5">
                Edit Profile: {provider.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* Quick Notice Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">Edit all 9 core worker credentials below:</span> Name, Job Title, Location (City, Area, Address), Experience Years, Profile Image/Avatar, Starting Salary/Price & Unit, Digital Barcode ID, Direct Call Phone Number, and WhatsApp Number.
            </div>
          </div>

          {/* SECTION 1: HIS NAME & JOB TITLE */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <span>1. Name & 2. Job Title</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  His Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vicky Kumar (Master Electrician)"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  His Job Title / Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Electrical Wireman & Substation Tech"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-amber-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500"
                  />
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">Verified Specialist Badge</span>
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 2: HIS IMAGE (AVATAR & PHOTO UPLOAD) */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>5. Profile Image / Avatar</span>
            </h4>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 border-2 border-amber-500 shadow-md shrink-0">
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = AVATAR_PRESETS[0].url;
                  }}
                />
              </div>

              <div className="flex-1 w-full space-y-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Image URL or Upload from Device
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-hidden focus:border-amber-500"
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                    </button>
                  </div>
                </div>

                {/* Quick Avatar Presets */}
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block mb-1.5">
                    Or select a verified high-resolution avatar preset:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatar(preset.url)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                          avatar === preset.url
                            ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: HIS LOCATION */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>3. Location (City, Area, Address & Radius)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City / Town <span className="text-red-500">*</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-amber-500"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Local Area / Colony <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Saunda 'D' Colony, Station Road, Bhurkunda Market"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Radius (km)
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={serviceRadiusKm}
                  onChange={(e) => setServiceRadiusKm(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Physical Address / Landmark
              </label>
              <input
                type="text"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="e.g. Near Shiv Mandir, Main Market Road, Bhurkunda, Ramgarh - 829135"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-amber-500"
              />
            </div>
          </div>

          {/* SECTION 4 & 5: EXPERIENCE & SALARY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Experience */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>4. Experience (Years)</span>
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Years of Practical Experience
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                  />
                  <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Years</span>
                </div>
              </div>

              {/* Quick Experience Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[2, 4, 6, 8, 10, 15, 20].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setExperienceYears(yr)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      experienceYears === yr
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {yr} yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Salary / Starting Price */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-600" />
                <span>6. Salary / Starting Price</span>
              </h4>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Starting Rate (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={10}
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price Unit
                  </label>
                  <input
                    type="text"
                    value={priceUnit}
                    onChange={(e) => setPriceUnit(e.target.value)}
                    placeholder="per visit"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Price Unit Presets */}
              <div className="flex flex-wrap gap-1 pt-1">
                {PRICE_UNIT_PRESETS.slice(0, 4).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setPriceUnit(unit)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                      priceUnit === unit
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* SECTION 6: BARCODE / DIGITAL ID WITH LIVE RENDER */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BarcodeIcon className="w-4 h-4 text-slate-800" />
                <span>7. Barcode & Digital ID Code</span>
              </h4>

              <button
                type="button"
                onClick={handleGenerateNewBarcode}
                className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Generate New Code</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Custom Barcode String / ID Number
                </label>
                <input
                  type="text"
                  required
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value.toUpperCase())}
                  placeholder="e.g. VSS-2026-BHU-042"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  This custom alphanumeric string produces the scannable 1D Barcode and digital verification pass for this worker.
                </p>
              </div>

              {/* Live Barcode Rendering */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col items-center justify-center shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                  Live Barcode Preview
                </span>
                <SvgBarcode code={barcode || 'VSS-SAMPLE'} width={220} height={50} />
              </div>
            </div>
          </div>

          {/* SECTION 7: CALL & WHATSAPP */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>8. Call Phone & 9. WhatsApp Number</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>8. Direct Call Number <span className="text-red-500">*</span></span>
                  <a
                    href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                    className="text-[11px] text-emerald-600 font-bold hover:underline flex items-center gap-0.5"
                  >
                    <Phone className="w-2.5 h-2.5" /> Test Call
                  </a>
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 80921 95302"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>9. Direct WhatsApp Number</span>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Test%20Message`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-green-600 font-bold hover:underline flex items-center gap-0.5"
                  >
                    <ExternalLink className="w-2.5 h-2.5" /> Test WhatsApp
                  </a>
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+91809219303"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* BIO & SKILLS */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Skills & Specialties (Comma-separated)
              </label>
              <input
                type="text"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                placeholder="e.g. Inverter Wiring, MCB Repair, Earthing, Solar Panel Setup"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Professional Bio & Description
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Provide a detailed description of expertise, local service guarantee, and working hours in Bhurkunda & Ramgarh..."
                className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:border-amber-500 leading-relaxed"
              />
            </div>
          </div>

        </form>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-7 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save All 9 Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
};
