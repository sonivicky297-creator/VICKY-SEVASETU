import React, { useState } from 'react';
import { 
  X, 
  Save, 
  FolderEdit, 
  Trash2, 
  Plus, 
  Layers, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Category } from '../types';
import { useApp } from '../context/AppContext';
import { renderCategoryIcon } from '../utils/iconHelper';

interface EditCategoryModalProps {
  category: Category;
  onClose: () => void;
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
  onClose
}) => {
  const { updateCategory, deleteCategory, addToast } = useApp();

  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [isClosedToday, setIsClosedToday] = useState(category.isClosedToday || false);
  const [isClosed, setIsClosed] = useState(category.isClosed || false);
  const [iconName, setIconName] = useState(category.iconName || 'Wrench');
  const [color, setColor] = useState(category.color || 'from-amber-600 to-amber-800');

  // Subservices editing
  const [subServices, setSubServices] = useState(category.subServices || []);
  const [newSubName, setNewSubName] = useState('');

  const handleAddSubService = () => {
    if (!newSubName.trim()) return;
    const newSub = {
      id: `sub-${Date.now()}`,
      name: newSubName.trim()
    };
    setSubServices(prev => [...prev, newSub]);
    setNewSubName('');
  };

  const handleRemoveSubService = (subId: string) => {
    setSubServices(prev => prev.filter(s => s.id !== subId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast('कृपया कैटेगरी का नाम लिखें (Please enter category name)', 'warning');
      return;
    }

    updateCategory(category.id, {
      name,
      description,
      isClosedToday,
      isClosed,
      iconName,
      color,
      subServices
    });

    addToast(`✅ कैटेगरी '${name}' सफलतापूर्वक अपडेट हो गई! (Category updated)`, 'success');
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`क्या आप सचमुच कैटेगरी '${category.name}' को हटाना चाहते हैं? (Delete category?)`)) {
      deleteCategory(category.id);
      addToast(`🗑️ कैटेगरी '${category.name}' हटा दी गई (Category deleted)`, 'info');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${color} p-5 text-white shrink-0 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
              {renderCategoryIcon(iconName, { className: "w-5 h-5" })}
            </div>
            <div>
              <h3 className="text-lg font-black flex items-center gap-2">
                <span>कैटेगरी संपादन (Edit Category)</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-white/80">
                नाम, विवरण, स्थिति और उप-सेवाएं एडिट करें
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 space-y-5">
          
          {/* Category Name */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
              कैटेगरी का नाम (Category Name) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Electrician & Wiring"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
              विवरण (Description)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief summary of services provided under this category..."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Service Status Switches */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <FolderEdit className="w-4 h-4 text-amber-600" />
              <span>कैटेगरी सेवा स्थिति (Service Availability Status)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-amber-200/80 cursor-pointer hover:border-amber-400 transition-colors">
                <input
                  type="checkbox"
                  checked={isClosedToday}
                  onChange={(e) => setIsClosedToday(e.target.checked)}
                  className="w-4 h-4 accent-amber-600 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">आज बंद है (Closed Today)</span>
                  <span className="text-[10px] text-slate-500">Temporarily closed for today only</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-amber-200/80 cursor-pointer hover:border-amber-400 transition-colors">
                <input
                  type="checkbox"
                  checked={isClosed}
                  onChange={(e) => setIsClosed(e.target.checked)}
                  className="w-4 h-4 accent-amber-600 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">पूर्ण रूप से बंद (Closed)</span>
                  <span className="text-[10px] text-slate-500">General service closure</span>
                </div>
              </label>
            </div>
          </div>

          {/* Sub Services List & Addition */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase mb-2 flex items-center justify-between">
              <span>उप-सेवाएं / काम के प्रकार (Sub-services List)</span>
              <span className="text-slate-500 font-normal">{subServices.length} Items</span>
            </label>

            {/* List existing sub-services */}
            <div className="flex flex-wrap gap-2 mb-3">
              {subServices.map((sub) => (
                <div 
                  key={sub.id} 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800"
                >
                  <span>{sub.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubService(sub.id)}
                    className="p-0.5 rounded-full hover:bg-rose-200 text-slate-500 hover:text-rose-700 transition-colors"
                    title="Remove sub-service"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new subservice */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                placeholder="नई उप-सेवा का नाम (Add new sub-service e.g. Meter Fitting)"
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-amber-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubService();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddSubService}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>जोड़ें</span>
              </button>
            </div>
          </div>

        </form>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-700 hover:text-rose-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>कैटेगरी हटाएं (Delete)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
            >
              रद्द करें
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>सेव करें (Save Changes)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
