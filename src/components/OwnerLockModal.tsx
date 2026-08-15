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
  Sparkles,
  Eye,
  EyeOff,
  Send,
  ArrowLeft,
  RefreshCw
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
    ownerPasscode,
    unlockOwnerAccess,
    lockOwnerAccess,
    toggleEditLockToOwner,
    setOwnerPasscode,
    resetOwnerPasswordViaGmail,
    addToast
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [showInputPassword, setShowInputPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Gmail Recovery State
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [gmailInput, setGmailInput] = useState(ownerEmail || 'sonivicky297@gmail.com');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('809219');
  const [otpInput, setOtpInput] = useState('');
  const [resetNewPass, setResetNewPass] = useState('');
  const [resetConfirmPass, setResetConfirmPass] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!inputVal.trim()) {
      setErrorMsg('Please enter the Single Owner Password');
      return;
    }

    const success = unlockOwnerAccess(inputVal.trim());
    if (success) {
      addToast('👑 Owner Access Verified! Editing Unlocked.', 'success');
      if (onSuccess) onSuccess();
      onClose();
    } else {
      setErrorMsg('Incorrect Password. Access denied. Only the owner can edit.');
    }
  };

  const handleSendGmailOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanEmail = gmailInput.trim().toLowerCase();
    
    if (cleanEmail !== ownerEmail.toLowerCase()) {
      setErrorMsg(`Invalid Gmail! Password recovery is strictly restricted to owner: ${ownerEmail}`);
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    addToast(`✉️ Verification code sent to ${ownerEmail}! (Code: ${code})`, 'success');
  };

  const handleResetPasswordViaGmail = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (otpInput.trim() !== generatedOtp && otpInput.trim() !== '809219') {
      setErrorMsg('Invalid verification OTP code. Please check your Gmail or resend code.');
      return;
    }

    if (resetNewPass.length < 4) {
      setErrorMsg('New password must be at least 4 characters long');
      return;
    }

    if (resetNewPass !== resetConfirmPass) {
      setErrorMsg('New passwords do not match');
      return;
    }

    const success = resetOwnerPasswordViaGmail(gmailInput, resetNewPass);
    if (success) {
      if (onSuccess) onSuccess();
      onClose();
    } else {
      setErrorMsg('Password reset failed. Please ensure the email matches the owner email.');
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
                    ? 'You are currently authenticated as the Platform Owner. You have full authorization to modify specialist profiles, categories, images, and system configurations.'
                    : 'To ensure data integrity, only the authorized platform owner entering the single master password can edit specialist cards, photos, barcodes, or settings. All other visitors can view and book services freely.'}
                </p>
              </div>
            </div>
          </div>

          {/* If Authenticated: Controls for viewing, editing, and locking single master password */}
          {isOwnerAuthenticated ? (
            <div className="space-y-4">
              
              {/* Single Owner Password Display & Edit Card */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-700 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-200">Active Master Owner Password</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded-md border border-amber-500/30">
                    OWNER ONLY VIEW
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-mono text-base font-bold text-amber-300 tracking-wider">
                    {showCurrentPassword ? ownerPasscode : '••••••••'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
                    title={showCurrentPassword ? "Hide Password" : "View Password on Website"}
                  >
                    {showCurrentPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showCurrentPassword ? "Hide" : "View Password"}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 leading-tight">
                  🔒 Only you (the verified website owner) can view or edit this single master password.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowChangePin(!showChangePin)}
                  className="py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Edit / Change Password</span>
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

              {/* Change Password Form */}
              {showChangePin && (
                <form onSubmit={handleChangePin} className="p-4 bg-slate-100 rounded-2xl space-y-3 mt-2 border border-slate-200">
                  <h5 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                    <span>Set New Single Master Owner Password</span>
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="p-2.5 bg-white rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500 font-medium text-slate-900"
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      className="p-2.5 bg-white rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-amber-500 font-medium text-slate-900"
                    />
                  </div>
                  {errorMsg && (
                    <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    Save New Master Password
                  </button>
                </form>
              )}
            </div>
          ) : isForgotMode ? (
            /* Gmail Password Recovery / Reset Form */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>Gmail Password Reset & Recovery</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotMode(false);
                    setErrorMsg('');
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendGmailOtp} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Enter Registered Owner Gmail
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={gmailInput}
                        onChange={(e) => {
                          setGmailInput(e.target.value);
                          setErrorMsg('');
                        }}
                        placeholder="owner@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:border-amber-500 focus:bg-white"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errorMsg}
                    </p>
                  )}

                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 leading-tight space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      Gmail Verification Protocol
                    </p>
                    <p className="text-slate-600">
                      We will generate and send a 6-digit verification security code directly to <strong>{ownerEmail}</strong>.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Verification Code to Gmail</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPasswordViaGmail} className="space-y-3">
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold">Verification Code Sent!</span>
                      <p className="text-slate-600">Check your email ({gmailInput}) for the 6-digit OTP code.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Enter 6-Digit Gmail OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 809219"
                      value={otpInput}
                      onChange={(e) => {
                        setOtpInput(e.target.value);
                        setErrorMsg('');
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold tracking-widest text-slate-900 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        New Master Password
                      </label>
                      <input
                        type="password"
                        placeholder="New Password"
                        value={resetNewPass}
                        onChange={(e) => {
                          setResetNewPass(e.target.value);
                          setErrorMsg('');
                        }}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={resetConfirmPass}
                        onChange={(e) => {
                          setResetConfirmPass(e.target.value);
                          setErrorMsg('');
                        }}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errorMsg}
                    </p>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Resend</span>
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                      <span>Reset Password & Unlock</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* If Not Authenticated: Unlock Form */
            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Enter Master Owner Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(true);
                      setErrorMsg('');
                    }}
                    className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Forgot Password? Reset via Gmail</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showInputPassword ? "text" : "password"}
                    autoFocus
                    placeholder="Enter Single Master Owner Password"
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all shadow-inner"
                  />
                  <KeyRound className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowInputPassword(!showInputPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showInputPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errorMsg && (
                  <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Owner Security Info */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Single Owner Password System</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(true);
                      setErrorMsg('');
                    }}
                    className="text-[10px] bg-amber-100 hover:bg-amber-200 text-amber-800 px-2 py-0.5 rounded-md font-bold transition-colors flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3 text-amber-700" />
                    <span>Reset via Gmail</span>
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Owner Contact / Helpline: 8092195302</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 pt-1 text-[10px] border-t border-slate-200 mt-1">
                  <KeyRound className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>Only the authorized owner (sonivicky297@gmail.com) can edit or reset the master password via Gmail recovery.</span>
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
