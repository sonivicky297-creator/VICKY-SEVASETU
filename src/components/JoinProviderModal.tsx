import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  CheckCircle, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface JoinProviderModalProps {
  onClose: () => void;
}

export const JoinProviderModal: React.FC<JoinProviderModalProps> = ({ onClose }) => {
  const { t, categories, cities, addProvider, addToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [avatar, setAvatar] = useState('');
  const [barcodeNumber, setBarcodeNumber] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-electrician');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState(cities[0] || 'Bhurkunda');
  const [area, setArea] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [experienceYears, setExperienceYears] = useState(5);
  const [startingPrice, setStartingPrice] = useState(199);
  const [priceUnit, setPriceUnit] = useState('per visit');
  const [skillsString, setSkillsString] = useState('');
  const [bio, setBio] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [isClosedToday, setIsClosedToday] = useState(false);

  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !title.trim()) {
      addToast('Please fill all required fields.', 'error');
      return;
    }

    const skillsArray = skillsString
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    // Provide a clean default avatar from realistic worker portraits
    const defaultAvatars = [
      'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=80'
    ];
    const finalAvatar = avatar.trim() || defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
    const finalBarcode = barcodeNumber.trim() || `VSS-BHK-${Math.floor(100000 + Math.random() * 900000)}`;

    addProvider({
      name: name.trim(),
      avatar: finalAvatar,
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      barcodeNumber: finalBarcode,
      categoryId,
      title: title.trim(),
      titleEn: title.trim(),
      experienceYears: Number(experienceYears),
      location: {
        city,
        area: area.trim() || city,
        fullAddress: fullAddress.trim() || `${area}, ${city}`,
        lat: city === 'Ramgarh' ? 23.6332 : 23.6420,
        lng: city === 'Ramgarh' ? 85.5149 : 85.3520
      },
      serviceRadiusKm: 20,
      isVerified: true,
      verificationBadges: ['id_verified', 'skill_certified'],
      availability: isClosedToday ? 'flexible' : 'immediate',
      availableTimings: '8:00 AM - 8:00 PM (Daily)',
      isActive,
      isOpen,
      isClosedToday,
      startingPrice: Number(startingPrice),
      priceUnit: priceUnit.trim(),
      bio: bio.trim() || `${experienceYears} years of reliable trade experience with verified craftsmanship.`,
      bioEn: bio.trim() || `${experienceYears} years of reliable trade experience with verified craftsmanship.`,
      skills: skillsArray.length > 0 ? skillsArray : ['General Service', 'Repairs & Fitting', 'Maintenance'],
      servicesOffered: [
        {
          id: 'svc-' + Date.now(),
          name: `${title.trim()} Primary Service`,
          price: Number(startingPrice),
          unit: priceUnit.trim()
        }
      ],
      portfolio: [
        {
          id: 'port-' + Date.now(),
          title: 'Recent Work Sample',
          imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
          description: 'Completed with customer satisfaction'
        }
      ],
      isFeatured: true
    });

    setRegisteredSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 to-amber-950 p-6 text-white shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {t.joinHeading}
              </h3>
              <p className="text-xs text-amber-200">
                {t.joinSubheading}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {registeredSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {t.joinSuccessTitle}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {t.joinSuccessDesc}
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl shadow-xs"
                >
                  View on Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Trust Callout */}
              <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                <span>
                  100% Free listing in Bhurkunda & Ramgarh with 0% commission. You receive full payment directly from customers.
                </span>
              </div>

              {/* Name & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Suresh Kumar"
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.professionTitle} *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Master Electrician & AC Repair"
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Category & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.categoryFilter} *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.locationFilter} *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Phone, WhatsApp, Area */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Call Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="8092195302"
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="8092195302"
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Area / Locality *
                  </label>
                  <input
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Main Market, Bhurkunda"
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Photo & Barcode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Profile Photo URL
                  </label>
                  <input
                    type="url"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Barcode / Digital ID Code
                  </label>
                  <input
                    type="text"
                    value={barcodeNumber}
                    onChange={(e) => setBarcodeNumber(e.target.value)}
                    placeholder="e.g. VSS-BHK-98204"
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Account & Service Status Controls */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                <span className="text-xs font-bold text-slate-900 block">Initial Account & Availability Status</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <label className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 cursor-pointer">
                    <span className="text-xs font-bold text-slate-700">Account Active</span>
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 cursor-pointer">
                    <span className="text-xs font-bold text-slate-700">Shop Open</span>
                    <input
                      type="checkbox"
                      checked={isOpen}
                      onChange={(e) => setIsOpen(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500 accent-blue-600 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 cursor-pointer">
                    <span className="text-xs font-bold text-slate-700">Closed Today</span>
                    <input
                      type="checkbox"
                      checked={isClosedToday}
                      onChange={(e) => setIsClosedToday(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded-sm focus:ring-red-500 accent-red-600 cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Experience & Rates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.experienceLabel} ({t.years})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.dailyHourlyRate} *
                  </label>
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.rateUnit}
                  </label>
                  <input
                    type="text"
                    value={priceUnit}
                    onChange={(e) => setPriceUnit(e.target.value)}
                    placeholder="per visit / per day"
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Skills comma list */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.skillsList}
                </label>
                <input
                  type="text"
                  value={skillsString}
                  onChange={(e) => setSkillsString(e.target.value)}
                  placeholder="e.g. Fan Fitting, MCB Wiring, Inverter Setup"
                  className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Bio / Experience summary
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Describe your experience and work quality..."
                  className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                id="join-submit-btn"
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <span>{t.registerNowBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
