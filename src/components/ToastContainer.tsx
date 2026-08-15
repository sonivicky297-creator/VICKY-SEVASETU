import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-70 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let bgColor = 'bg-slate-900 text-white border-slate-700';
        let IconComp = CheckCircle2;
        let iconColor = 'text-emerald-400';

        if (toast.type === 'error') {
          bgColor = 'bg-red-900 text-white border-red-700';
          IconComp = XCircle;
          iconColor = 'text-red-400';
        } else if (toast.type === 'warning') {
          bgColor = 'bg-amber-900 text-white border-amber-700';
          IconComp = AlertCircle;
          iconColor = 'text-amber-400';
        } else if (toast.type === 'info') {
          bgColor = 'bg-blue-900 text-white border-blue-700';
          IconComp = Info;
          iconColor = 'text-blue-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl border shadow-xl flex items-center justify-between gap-3 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-200 ${bgColor}`}
          >
            <div className="flex items-center gap-2.5">
              <IconComp className={`w-4 h-4 shrink-0 ${iconColor}`} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
