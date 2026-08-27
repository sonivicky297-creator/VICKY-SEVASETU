import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle, 
  ArrowRight,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ServiceProvider, UrgencyLevel } from '../types';
import { useApp } from '../context/AppContext';

interface BookingModalProps {
  provider: ServiceProvider;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ provider, onClose }) => {
  const { t, addServiceRequest, addToast } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState(provider.location.area || '');
  const [selectedServiceId, setSelectedServiceId] = useState(provider.servicesOffered[0]?.id || '');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredTimeSlot, setPreferredTimeSlot] = useState(t.morningSlot);
  const [urgency, setUrgency] = useState<UrgencyLevel>('today');
  const [problemDescription, setProblemDescription] = useState('');

  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);

  const currentSelectedOffer = provider.servicesOffered.find(s => s.id === selectedServiceId) || provider.servicesOffered[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !address.trim()) {
      addToast('Please fill all required fields.', 'error');
      return;
    }

    if (customerPhone.replace(/[^0-9]/g, '').length < 10) {
      addToast('Please enter a valid 10-digit phone number.', 'error');
      return;
    }

    const newRequestId = addServiceRequest({
      providerId: provider.id,
      providerName: provider.name,
      providerPhone: provider.phone,
      providerAvatar: provider.avatar,
      categoryId: provider.categoryId,
      serviceName: currentSelectedOffer 
        ? currentSelectedOffer.name
        : provider.title,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || undefined,
      address: address.trim(),
      city: provider.location.city,
      area: area.trim() || provider.location.area,
      preferredDate,
      preferredTimeSlot,
      urgency,
      problemDescription: problemDescription.trim()
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setBookingSuccessId(newRequestId);
    addToast('Service Request placed successfully!', 'success');
  };

  const cleanPhone = provider.whatsapp?.replace(/[^0-9]/g, '') || '919876543210';
  const whatsappMsg = encodeURIComponent(
    `Hello ${provider.name}, I submitted request #${bookingSuccessId || ''} on SevaSetu for ${currentSelectedOffer?.name || 'service'} in Bhurkunda / Ramgarh.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-5 sm:p-6 text-white shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={provider.avatar}
              alt={provider.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover border-2 border-white/40 shadow-xs"
            />
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                {t.bookServiceTitle}
              </h3>
              <p className="text-xs text-amber-100 font-medium">
                {provider.name} • {provider.title}
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
          {bookingSuccessId ? (
            /* Success State */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {t.bookingSuccessTitle}
              </h3>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Request ID:</span>
                  <span className="font-bold text-slate-900 font-mono">#{bookingSuccessId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Provider:</span>
                  <span className="font-bold text-slate-800">{provider.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Service:</span>
                  <span className="font-bold text-emerald-700">{currentSelectedOffer?.name || provider.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pricing Model:</span>
                  <span className="font-bold text-slate-800">Direct On-Site Estimate (0% Advance)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled:</span>
                  <span className="font-bold text-slate-800">{preferredDate} • {preferredTimeSlot}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {t.bookingSuccessDesc}
              </p>

              {/* Direct Connect Buttons */}
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <a
                  href={`tel:${provider.phone}`}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.callNow} ({provider.phone})</span>
                </a>

                <a
                  href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service Select & Direct Consultation */}
              <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-amber-900 uppercase mb-1">
                    {t.selectService} *
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-lg p-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden"
                  >
                    {provider.servicesOffered.map((svc) => (
                      <option key={svc.id} value={svc.id}>
                        {svc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-right sm:pl-4 sm:border-l border-amber-200">
                  <span className="text-[11px] text-amber-800 block">Consultation</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-800">Direct Consultation</span>
                </div>
              </div>

              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.fullName} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.phoneNumber} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Address & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.fullAddress} *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House no, Street, Society, Landmark..."
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Area / Locality
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Main Market, Bhurkunda"
                    className="w-full p-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Urgency Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.urgencyLevel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'urgent', label: t.urgentLabel, border: 'border-red-300', active: 'bg-red-50 border-red-500 text-red-900 font-bold' },
                    { key: 'today', label: t.todayLabel, border: 'border-amber-300', active: 'bg-amber-50 border-amber-500 text-amber-900 font-bold' },
                    { key: 'flexible', label: t.flexibleLabel, border: 'border-slate-200', active: 'bg-slate-100 border-slate-500 text-slate-900 font-bold' },
                  ].map((lvl) => (
                    <button
                      key={lvl.key}
                      type="button"
                      onClick={() => setUrgency(lvl.key as UrgencyLevel)}
                      className={`p-2 rounded-xl border text-xs text-center transition-all ${
                        urgency === lvl.key ? lvl.active : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.preferredDate}
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full p-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.preferredTime}
                  </label>
                  <select
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full p-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500"
                  >
                    <option value={t.morningSlot}>{t.morningSlot}</option>
                    <option value={t.afternoonSlot}>{t.afternoonSlot}</option>
                    <option value={t.eveningSlot}>{t.eveningSlot}</option>
                  </select>
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.describeProblem}
                </label>
                <textarea
                  rows={2}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder={t.describePlaceholder}
                  className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white"
                />
              </div>

              {/* Trust disclaimer */}
              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/80 text-[11px] text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Zero advance fee. Direct contact & pay directly to the specialist upon satisfactory work completion in Bhurkunda & Ramgarh.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-booking-request-btn"
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>{t.confirmBookingBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
