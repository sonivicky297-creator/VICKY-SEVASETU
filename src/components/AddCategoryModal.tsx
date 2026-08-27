import React, { useState } from 'react';
import { 
  X, 
  Save, 
  FolderPlus, 
  Plus, 
  Sparkles,
  Trash2,
  CheckCircle2,
  Palette,
  LayoutGrid
} from 'lucide-react';
import { Category } from '../types';
import { useApp } from '../context/AppContext';
import { renderCategoryIcon } from '../utils/iconHelper';

interface AddCategoryModalProps {
  onClose: () => void;
}

const AVAILABLE_ICONS = [
  'Wrench', 'Zap', 'Hammer', 'GraduationCap', 'Refrigerator', 'Sparkles', 
  'Laptop', 'Paintbrush', 'Scissors', 'Truck', 'Heart', 'Camera', 
  'Briefcase', 'Layers', 'Building2', 'Phone', 'ShieldCheck'
];

const AVAILABLE_COLORS = [
  { name: 'Amber Gold', value: 'from-amber-600 to-amber-800' },
  { name: 'Royal Blue', value: 'from-blue-600 to-indigo-700' },
  { name: 'Emerald Green', value: 'from-emerald-600 to-teal-800' },
  { name: 'Purple Sunset', value: 'from-purple-600 to-pink-700' },
  { name: 'Deep Slate', value: 'from-slate-700 to-slate-900' },
  { name: 'Orange Flame', value: 'from-orange-500 to-red-600' }
];

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onClose }) => {
  const { addCategory, addToast } = useApp();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Briefcase');
  const [color, setColor] = useState('from-amber-600 to-amber-800');
  
  // Initial subservices
  const [subServices, setSubServices] = useState<{ id: string; name: string }[]>([
    { id: 'sub-1', name: 'General Work / सर्विस परामर्श' }
  ]);
  const [newSubName, setNewSubName] = useState('');

  const handleAddSubService = () => {
    if (!newSubName.trim()) return;
    setSubServices(prev => [...prev, { id: `sub-${Date.now()}`, name: newSubName.trim() }]);
    setNewSubName('');
  };

  const handleRemoveSubService = (id: string) => {
    setSubServices(prev => prev.filter(s => s.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast('कृपया नई कैटेगरी का नाम दर्ज करें (Please enter category name)', 'warning');
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    addCategory({
      slug,
      name: name.trim(),
      nameEn: name.trim(),
      description: description.trim() || `All types of ${name} services in Bhurkunda & surrounding areas`,
      descriptionEn: description.trim() || `All types of ${name} services in Bhurkunda & surrounding areas`,
      iconName,
      color,
      popular: true,
      isOpen: true,
      isClosedToday: false,
      subServices
    });

    addToast(`🎉 नई कैटेगरी '${name}' सफलतापूर्वक जोड़ दी गई! (New Category Added)`, 'success');
    onClose();
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
                <span>➕ नई कैटेगरी जोड़ें (Add New Work Category)</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-white/80">
                ऐप में नई सर्विस या कार्य श्रेणी जोड़ें
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
              कैटेगरी या काम का नाम (Category / Work Name) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. RO Water Purifier Repair, Security Guard, Welder..."
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
              placeholder="इस कैटेगरी के अंतर्गत दी जाने वाली सेवाओं का संक्षिप्त विवरण..."
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-amber-600" />
              <span>आइकॉन चुनें (Select Category Icon)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_ICONS.map(iName => (
                <button
                  type="button"
                  key={iName}
                  onClick={() => setIconName(iName)}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                    iconName === iName 
                      ? 'bg-amber-600 text-white border-amber-600 scale-105 shadow-md' 
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={iName}
                >
                  {renderCategoryIcon(iName, { className: "w-5 h-5" })}
                </button>
              ))}
            </div>
          </div>

          {/* Color Gradient Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-amber-600" />
              <span>कार्ड कलर थीम (Card Theme Color)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AVAILABLE_COLORS.map(c => (
                <button
                  type="button"
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-white flex items-center justify-between bg-gradient-to-r ${c.value} transition-all ${
                    color === c.value ? 'ring-2 ring-amber-500 ring-offset-2 scale-102' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <span>{c.name}</span>
                  {color === c.value && <CheckCircle2 className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sub Services */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase mb-1.5">
              उप-सेवाएं / काम के प्रकार (Sub-services List)
            </label>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                placeholder="e.g. Filter replacement, Pump repair..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddSubService}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>जोड़ें</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {subServices.map(sub => (
                <span 
                  key={sub.id} 
                  className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <span>{sub.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubService(sub.id)}
                    className="text-amber-700 hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

        </form>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
          >
            रद्द करें (Cancel)
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-7 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>कैटेगरी सहेजें (Save Category)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
