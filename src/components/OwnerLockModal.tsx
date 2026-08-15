import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  KeyRound, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Mail,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface OwnerLockModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const OwnerLockModal: React.FC<OwnerLockModalProps> = ({ onClose, onSuccess }) => {
  const {
    isEditLockedToOwner,
    isOwnerAuthenticated,
    ownerEmail,
    unlockOwnerAccess,
    lockOwnerAccess,
    toggleEditLockToOwner,
    setOwnerPasscode,
    addToast
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [showChangePin, setShowChangePin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!inputVal.trim()) {
      setErrorMsg('Please enter the Owner PIN or Email');
      return;
    }

    const success = unlockOwnerAccess(inputVal.trim());
    if (success) {
      addToast('👑 Owner Access Verified! Editing Unlocked.', 'success');
      if (onSuccess) onSuccess();
      onClose();
    } else {
      setErrorMsg('Incorrect PIN or Email. Hint: Default Master PIN is 8092 or use sonivicky297@gmail.com');
    }
  };

  const handleLockDocument = () => {
    lockOwnerAccess();
    addToast('🔒 Document Locked! Edit access restricted.', 'info');
    onClose();
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      setErrorMsg('New PIN must be at least 4 digits');
      return;
    }
    if (newPin !== confirmPin) {
      setErrorMsg('PINs do not match');
      return;
    }
    setOwnerPasscode(newPin);
    setShowChangePin(false);
    setNewPin('');
    setConfirmPin('');
    addToast('Master PIN updated successfully!', 'success');
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isOwnerAuthenticated ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {isOwnerAuthenticated ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-black flex items-center gap-2">
                Document Edit Protection
                {isOwnerAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-extrabold text-white">
                    UNLOCKED
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-300">
                Owner Access Control (sonivicky297@gmail.com)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Status Explanation Banner */}
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
            isOwnerAuthenticated 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className={`w-5 h-5 shrink-0 ${isOwnerAuthenticated ? 'text-emerald-600' : 'text-amber-600'}`} />
              <div>
                <p className="font-bold text-sm">
                  {isOwnerAuthenticated 
                    ? '👑 Owner Verification Active' 
                    : '🔒 Protected Document: Edit Restriction Enabled'}
                </p>
                <p className="mt-1 text-slate-600">
                  {isOwnerAuthenticated
                    ? 'You are currently authenticated as the Platform Owner (Vicky). You have full authorization to modify specialist profiles, categories, images, and system configurations.'
                    : 'To ensure data integrity, only the authorized platform owner (sonivicky297@gmail.com) can edit specialist cards, photos, barcodes, or settings. All other visitors can view and book services freely.'}
                </p>
              </div>
            </div>
          </div>

          {/* If Authenticated: Controls for locking or toggling protection */}
          {isOwnerAuthenticated ? (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Owner Edit Lock Mode</h4>
                    <p className="text-xs text-slate-500">
                      When enabled, strangers cannot edit profiles without entering your Owner PIN.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleEditLockToOwner(!isEditLockedToOwner)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      isEditLockedToOwner ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        isEditLockedToOwner ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePin(!showChangePin)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-4 h-4 text-amber-600" />
                  <span>Change Master PIN</span>
                </button>

                <button
                  type="button"
                  onClick={handleLockDocument}
                  className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lock Editing Now</span>
                </button>
              </div>

              {/* Change PIN Accordion Form */}
              {showChangePin && (
                <form onSubmit={handleChangePin} className="p-4 bg-slate-100 rounded-2xl space-y-3 mt-2 border border-slate-200">
                  <h5 className="text-xs font-bold text-slate-800">Set New Master Owner PIN</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="password"
                      placeholder="New PIN (min 4 digits)"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="p-2 bg-white rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm PIN"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      className="p-2 bg-white rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Save New PIN
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* If Not Authenticated: Unlock Form */
            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Enter Master Owner PIN or Owner Email
                </label>
                <div className="relative">
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter Master PIN (e.g. 8092) or sonivicky297@gmail.com"
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                  />
                  <KeyRound className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                </div>
                {errorMsg && (
                  <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Quick Hints */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                  <Mail className="w-3.5 h-3.5 text-amber-600" />
                  <span>Authorized Owner: sonivicky297@gmail.com</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Helpline / Phone: 8092195302 (Default PIN: 8092)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Cancel / View Only
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Edit Access</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
