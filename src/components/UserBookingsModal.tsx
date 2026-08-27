import React from 'react';
import { 
  X, 
  CalendarCheck, 
  Clock, 
  MapPin, 
  Phone,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RequestStatus } from '../types';

interface UserBookingsModalProps {
  onClose: () => void;
}

export const UserBookingsModal: React.FC<UserBookingsModalProps> = ({ onClose }) => {
  const { t, requests, updateRequestStatus } = useApp();

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            {t.statusPending}
          </span>
        );
      case 'accepted':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            {t.statusAccepted}
          </span>
        );
      case 'in_progress':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
            {t.statusInProgress}
          </span>
        );
      case 'completed':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {t.statusCompleted}
          </span>
        );
      case 'cancelled':
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-800 border border-red-200">
            {t.statusCancelled}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 sm:p-6 text-white shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onClose}
              id="back-user-bookings-btn"
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>पीछे (Back)</span>
            </button>
            
            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 items-center justify-center border border-amber-500/30">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-bold">
                {t.myBookings}
              </h3>
              <p className="text-[11px] text-slate-300">
                {requests.length} service requests
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-user-bookings-btn"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {requests.length > 0 ? (
            requests.map((req) => (
              <div
                key={req.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all space-y-3"
              >
                {/* Top Info Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.providerAvatar}
                      alt={req.providerName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{req.providerName}</h4>
                      <p className="text-xs text-amber-700 font-medium">{req.serviceName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400">#{req.id}</span>
                    {getStatusBadge(req.status)}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{req.preferredDate} ({req.preferredTimeSlot.split('(')[0]})</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{req.area}, {req.city}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-bold text-amber-800">
                    <span>₹{req.estimatedBudget}</span>
                    <span className="text-[10px] font-normal text-slate-500">
                      (est.)
                    </span>
                  </div>
                </div>

                {/* Problem Description */}
                {req.problemDescription && (
                  <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed">
                    <strong className="text-slate-900">Note: </strong>
                    {req.problemDescription}
                  </p>
                )}

                {/* Bottom Actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400">
                    Requested: {new Date(req.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${req.providerPhone}`}
                      className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{t.callNow}</span>
                    </a>

                    {req.status === 'pending' && (
                      <button
                        onClick={() => updateRequestStatus(req.id, 'cancelled')}
                        className="py-1.5 px-3 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-800">
                No service bookings yet
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Request service from any provider profile in Bhurkunda & Ramgarh.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
