import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Clock, ShieldCheck, Edit3, KeyRound, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomLeftOwnerEditLock: React.FC = () => {
  const {
    isOwnerAuthenticated,
    lockOwnerAccess,
    openOwnerUnlockModal,
    addToast
  } = useApp();

  const [timeLeft, setTimeLeft] = useState<number>(0);

  // When owner becomes authenticated, start 2-minute (120s) countdown timer
  useEffect(() => {
    if (isOwnerAuthenticated) {
      setTimeLeft(120);
    } else {
      setTimeLeft(0);
    }
  }, [isOwnerAuthenticated]);

  // Handle 1-second interval timer
  useEffect(() => {
    if (!isOwnerAuthenticated || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          lockOwnerAccess();
          addToast('🔒 Auto-Locked: 2-Minute Edit Session Expired.', 'info');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOwnerAuthenticated, timeLeft, lockOwnerAccess, addToast]);

  const handleExtendTimer = () => {
    setTimeLeft(120);
    addToast('⏱️ Edit Access Extended by 2 Minutes!', 'success');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
    }
    return `${secs}s`;
  };

  return (
    <div className="fixed bottom-16 sm:bottom-5 left-3 sm:left-5 z-40 flex items-center gap-2">
      {!isOwnerAuthenticated ? (
        <button
          onClick={() => openOwnerUnlockModal()}
          id="bottom-left-lock-btn"
          className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-900/95 hover:bg-slate-900 text-white shadow-xl hover:shadow-amber-500/10 border border-slate-700/80 transition-all duration-300 hover:scale-105 active:scale-95"
          title="Owner Edit & Lock (Requires Password)"
        >
          <div className="w-7 h-7 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-black flex items-center gap-1 text-amber-300">
              <Edit3 className="w-3 h-3" />
              <span>Edit & Lock</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
              Owner Only (2m Auto-Lock)
            </p>
          </div>
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-slate-900/95 backdrop-blur-md text-white p-2 pl-3 rounded-2xl border border-emerald-500/40 shadow-2xl animate-fade-in">
          {/* Unlock Status & 2m Timer Countdown */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center min-w-10 h-7 px-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs">
              <span className="animate-pulse">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-left pr-1">
              <div className="text-xs font-black text-emerald-400 flex items-center gap-1">
                <Unlock className="w-3 h-3" />
                <span>Unlocked (Owner)</span>
              </div>
              <p className="text-[10px] text-slate-300 font-medium">
                Auto-locking in {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          {/* Extend 2m Button */}
          <button
            onClick={handleExtendTimer}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white transition-colors text-xs font-bold flex items-center gap-1 border border-slate-700"
            title="Extend Edit Access for 2 More Minutes"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden sm:inline">+2m</span>
          </button>

          {/* Lock Now Button */}
          <button
            onClick={() => {
              lockOwnerAccess();
              addToast('🔒 Manually Locked by Owner.', 'info');
            }}
            className="px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs transition-colors shadow-xs flex items-center gap-1"
            title="Lock Access Immediately"
          >
            <Lock className="w-3 h-3" />
            <span className="text-[11px]">Lock</span>
          </button>
        </div>
      )}
    </div>
  );
};
