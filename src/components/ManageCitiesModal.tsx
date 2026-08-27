import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  Sparkles,
  Building2,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ManageCitiesModalProps {
  onClose: () => void;
}

export const ManageCitiesModal: React.FC<ManageCitiesModalProps> = ({ onClose }) => {
  const { 
    cities, 
    addCity, 
    updateCity, 
    deleteCity, 
    canEditDocument, 
    openOwnerUnlockModal,
    addToast
  } = useApp();

  const [newCityName, setNewCityName] = useState('');
  const [editingCityName, setEditingCityName] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;

    if (!canEditDocument) {
      openOwnerUnlockModal(() => {
        addCity(newCityName.trim());
        setNewCityName('');
      });
    } else {
      addCity(newCityName.trim());
      setNewCityName('');
    }
  };

  const handleStartEdit = (city: string) => {
    if (!canEditDocument) {
      openOwnerUnlockModal(() => {
        setEditingCityName(city);
        setEditingValue(city);
      });
    } else {
      setEditingCityName(city);
      setEditingValue(city);
    }
  };

  const handleSaveEdit = (oldCity: string) => {
    if (!editingValue.trim()) return;
    updateCity(oldCity, editingValue.trim());
    setEditingCityName(null);
    setEditingValue('');
  };

  const handleDelete = (city: string) => {
    if (!canEditDocument) {
      openOwnerUnlockModal(() => {
        if (window.confirm(`क्या आप सचमुच एरिया '${city}' को हटाना चाहते हैं?`)) {
          deleteCity(city);
        }
      });
    } else {
      if (window.confirm(`क्या आप सचमुच एरिया '${city}' को हटाना चाहते हैं?`)) {
        deleteCity(city);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-5 text-white shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black flex items-center gap-2">
                <span>ऑल कवर एरिया एडिटर</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-white/80">
                नया सर्विस एरिया / गांव / शहर जोड़ें या एडिट करें
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

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          
          {/* Add New City Form */}
          <form onSubmit={handleAdd} className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
            <label className="block text-xs font-black text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-amber-700" />
              <span>➕ नया कवर एरिया जोड़ें (Add New Covered Area)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                placeholder="e.g. Lapanga Basti, Ranchi Road, Gidi, Sirka..."
                className="flex-1 px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:border-amber-600 shadow-2xs"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-md transition-all active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>जोड़ें (Add)</span>
              </button>
            </div>
          </form>

          {/* List of Existing Cities */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>वर्तमान में शामिल कवर एरिया ({cities.length})</span>
              </h4>
              {!canEditDocument && (
                <span className="text-[11px] text-amber-700 bg-amber-100 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Owner Protected
                </span>
              )}
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {cities.map((city, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-300 transition-all group"
                >
                  {editingCityName === city ? (
                    <div className="flex items-center gap-2 flex-1 mr-2">
                      <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-white border border-amber-500 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(city)}
                        className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                        title="Save Area Name"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCityName(null)}
                        className="p-2 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-extrabold text-slate-900">{city}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(city)}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1 transition-colors"
                          title="Edit Area Name"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>एडिट</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(city)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 hover:text-rose-700 transition-colors"
                          title="Delete Area"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between">
          <p className="text-[11px] font-medium text-slate-500">
            नए एरिया जोड़ने पर सभी लिस्टिंग और फिल्टर्स में नया एरिया तुरंत अपडेट होगा।
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            पूर्ण (Done)
          </button>
        </div>

      </div>
    </div>
  );
};
