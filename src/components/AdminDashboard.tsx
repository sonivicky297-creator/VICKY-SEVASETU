import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  CalendarCheck, 
  Layers, 
  Star, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Search, 
  Phone,
  Image as ImageIcon,
  Barcode as BarcodeIcon,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceProvider, Category, RequestStatus } from '../types';
import { TaskImageEditorModal } from './TaskImageEditorModal';
import { BarcodeModal } from './BarcodeModal';
import { EditProviderModal } from './EditProviderModal';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { 
    t, 
    providers, 
    addProvider, 
    updateProvider, 
    deleteProvider, 
    toggleProviderVerification,
    toggleProviderActive,
    toggleProviderOpenToday,
    toggleProviderOpen,
    categories, 
    addCategory, 
    deleteCategory, 
    toggleCategoryClosed,
    toggleCategoryClosedToday,
    requests, 
    updateRequestStatus, 
    deleteServiceRequest,
    resetDataToDefault,
    cities,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'providers' | 'bookings' | 'categories' | 'reviews'>('providers');
  const [searchFilter, setSearchFilter] = useState('');

  // 10-Task Images Editor & Barcode Modal States
  const [imageEditorProvider, setImageEditorProvider] = useState<ServiceProvider | null>(null);
  const [barcodeProvider, setBarcodeProvider] = useState<ServiceProvider | null>(null);

  // Add Provider Form Modal
  const [showAddProviderModal, setShowAddProviderModal] = useState(false);
  const [editingProvider, setEditingProvider] = useState<ServiceProvider | null>(null);
  const [editingProviderForModal, setEditingProviderForModal] = useState<ServiceProvider | null>(null);

  // New/Edit Provider Form State
  const [provName, setProvName] = useState('');
  const [provAvatar, setProvAvatar] = useState('');
  const [provPhone, setProvPhone] = useState('');
  const [provWhatsapp, setProvWhatsapp] = useState('');
  const [provCategory, setProvCategory] = useState(categories[0]?.id || '');
  const [provTitle, setProvTitle] = useState('');
  const [provCity, setProvCity] = useState(cities[0] || 'Bhurkunda');
  const [provArea, setProvArea] = useState('');
  const [provAddress, setProvAddress] = useState('');
  const [provExp, setProvExp] = useState(8);
  const [provPrice, setProvPrice] = useState(250);
  const [provPriceUnit, setProvPriceUnit] = useState('per visit');
  const [provSkills, setProvSkills] = useState('');
  const [provBio, setProvBio] = useState('');

  // Add Category Modal
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catIcon, setCatIcon] = useState('Wrench');
  const [catDesc, setCatDesc] = useState('');

  const openAddProvider = () => {
    setEditingProvider(null);
    setProvName('');
    setProvAvatar('https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=500&auto=format&fit=crop&q=80');
    setProvPhone('+91 80921 95302');
    setProvWhatsapp('+91809219303');
    setProvCategory(categories[0]?.id || '');
    setProvTitle('Senior Specialist');
    setProvCity(cities[0] || 'Bhurkunda');
    setProvArea('Main Market');
    setProvAddress('Near Station Road, Bhurkunda');
    setProvExp(6);
    setProvPrice(299);
    setProvPriceUnit('per visit');
    setProvSkills('Fitting, Repair, Installation, Maintenance');
    setProvBio('Experienced and skilled trade service in Bhurkunda and Ramgarh. Fair rates and timely work.');
    setShowAddProviderModal(true);
  };

  const openEditProvider = (p: ServiceProvider) => {
    setEditingProviderForModal(p);
  };

  const handleSaveProvider = (e: React.FormEvent) => {
    e.preventDefault();

    const skillsArr = provSkills.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProvider) {
      updateProvider(editingProvider.id, {
        name: provName.trim(),
        avatar: provAvatar.trim(),
        phone: provPhone.trim(),
        whatsapp: provWhatsapp.trim(),
        categoryId: provCategory,
        title: provTitle.trim(),
        titleEn: provTitle.trim(),
        experienceYears: Number(provExp),
        startingPrice: Number(provPrice),
        priceUnit: provPriceUnit.trim(),
        location: {
          city: provCity,
          area: provArea.trim(),
          fullAddress: provAddress.trim() || `${provArea}, ${provCity}`,
          lat: provCity === 'Ramgarh' ? 23.6332 : 23.6420,
          lng: provCity === 'Ramgarh' ? 85.5149 : 85.3520
        },
        skills: skillsArr,
        bio: provBio.trim(),
        bioEn: provBio.trim()
      });
    } else {
      addProvider({
        name: provName.trim(),
        avatar: provAvatar.trim(),
        phone: provPhone.trim(),
        whatsapp: provWhatsapp.trim(),
        email: `${provName.toLowerCase().replace(/\s+/g, '')}@vickysevasetu.local`,
        categoryId: provCategory,
        title: provTitle.trim(),
        titleEn: provTitle.trim(),
        experienceYears: Number(provExp),
        location: {
          city: provCity,
          area: provArea.trim(),
          fullAddress: provAddress.trim() || `${provArea}, ${provCity}`,
          lat: provCity === 'Ramgarh' ? 23.6332 : 23.6420,
          lng: provCity === 'Ramgarh' ? 85.5149 : 85.3520
        },
        serviceRadiusKm: 25,
        isVerified: true,
        verificationBadges: ['id_verified', 'skill_certified'],
        availability: 'immediate',
        availableTimings: '8:00 AM - 8:00 PM',
        startingPrice: Number(provPrice),
        priceUnit: provPriceUnit.trim(),
        bio: provBio.trim(),
        bioEn: provBio.trim(),
        skills: skillsArr,
        servicesOffered: [
          {
            id: 'svc-' + Date.now(),
            name: `${provTitle.trim()} Service`,
            price: Number(provPrice),
            unit: provPriceUnit.trim()
          }
        ],
        portfolio: [
          {
            id: 'port-' + Date.now(),
            title: 'Job Photo',
            imageUrl: provAvatar.trim(),
            description: 'Successful work'
          }
        ],
        isFeatured: true
      });
    }

    setShowAddProviderModal(false);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) {
      addToast('Please enter category name.', 'error');
      return;
    }

    addCategory({
      slug: catSlug.trim() || catName.toLowerCase().replace(/\s+/g, '-'),
      name: catName.trim(),
      nameEn: catName.trim(),
      iconName: catIcon,
      description: catDesc.trim() || 'Quality verified local services in Bhurkunda & Ramgarh',
      descriptionEn: catDesc.trim() || 'Quality verified local services',
      color: 'from-amber-600 to-orange-600',
      popular: true,
      subServices: [
        {
          id: 'sub-' + Date.now(),
          name: `${catName.trim()} Primary Service`,
          avgPrice: 299,
          unit: 'per service'
        }
      ]
    });

    setShowAddCategoryModal(false);
    setCatName('');
    setCatSlug('');
    setCatDesc('');
  };

  const filteredProvidersList = providers.filter(p => 
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.location.city.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Admin Header Bar */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 shrink-0 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold">{t.adminTitle}</h2>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                  LIVE ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{t.adminSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetDataToDefault}
              id="admin-reset-demo-btn"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Reset all providers & categories to default seed state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetDemoData}</span>
            </button>

            <button
              onClick={onClose}
              id="admin-close-btn"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Tab Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex gap-2">
            {[
              { key: 'providers', label: t.tabProviders, count: providers.length, icon: Users },
              { key: 'bookings', label: t.tabBookings, count: requests.length, icon: CalendarCheck },
              { key: 'categories', label: t.tabCategories, count: categories.length, icon: Layers },
              { key: 'reviews', label: t.tabReviews, count: providers.reduce((acc, p) => acc + p.reviews.length, 0), icon: Star },
            ].map(tab => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeTab === tab.key
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeTab === tab.key ? 'bg-amber-800 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50">
          
          {/* TAB 1: PROVIDERS MANAGEMENT */}
          {activeTab === 'providers' && (
            <div className="space-y-4">
              
              {/* Actions Header */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search provider by name/city..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <button
                  onClick={openAddProvider}
                  id="admin-add-provider-btn"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addNewProvider}</span>
                </button>
              </div>

              {/* Providers Table */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">Provider</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Location</th>
                        <th className="p-3.5">Rate</th>
                        <th className="p-3.5">Account & Availability Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProvidersList.map(prov => {
                        const cat = categories.find(c => c.id === prov.categoryId);
                        return (
                          <tr key={prov.id} className="hover:bg-slate-50">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={prov.avatar}
                                  alt={prov.name}
                                  referrerPolicy="no-referrer"
                                  className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                                />
                                <div>
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    <span>{prov.name}</span>
                                    {prov.isVerified && (
                                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" title="Verified Pro" />
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-500">{prov.phone}</div>
                                </div>
                              </div>
                            </td>

                            <td className="p-3.5">
                              <span className="text-xs font-semibold text-slate-800">
                                {cat ? cat.name : prov.categoryId}
                              </span>
                            </td>

                            <td className="p-3.5 text-slate-600 text-xs">
                              {prov.location.area}, {prov.location.city}
                            </td>

                            <td className="p-3.5 font-bold text-amber-700">
                              ₹{prov.startingPrice}
                            </td>

                            <td className="p-3.5">
                              <div className="flex flex-wrap items-center gap-1.5 max-w-xs">
                                {/* Active / Inactive Account Toggle */}
                                <button
                                  type="button"
                                  onClick={() => toggleProviderActive(prov.id)}
                                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                                    prov.isActive !== false
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                                      : 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300'
                                  }`}
                                  title="Click to toggle Account Active / Inactive"
                                >
                                  {prov.isActive !== false ? '● Active' : '○ Inactive'}
                                </button>

                                {/* Open / Closed Toggle */}
                                <button
                                  type="button"
                                  onClick={() => toggleProviderOpen(prov.id)}
                                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                                    prov.isOpen !== false
                                      ? 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100'
                                      : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                                  }`}
                                  title="Click to toggle Open / Closed"
                                >
                                  {prov.isOpen !== false ? 'Open' : 'Closed'}
                                </button>

                                {/* Closed Today Toggle */}
                                <button
                                  type="button"
                                  onClick={() => toggleProviderOpenToday(prov.id)}
                                  className={`text-[10px] font-black px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                                    prov.isClosedToday
                                      ? 'bg-red-500 text-white border-red-600 hover:bg-red-600 shadow-2xs'
                                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                  }`}
                                  title="Click to toggle Closed Today"
                                >
                                  {prov.isClosedToday ? 'Closed Today (Active)' : '+ Close Today'}
                                </button>

                                {/* Verification Toggle */}
                                <button
                                  type="button"
                                  onClick={() => toggleProviderVerification(prov.id)}
                                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border transition-all ${
                                    prov.isVerified
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : 'bg-slate-50 text-slate-400 border-slate-200'
                                  }`}
                                  title="Toggle verification badge"
                                >
                                  {prov.isVerified ? '✓ Verified' : 'Unverified'}
                                </button>
                              </div>
                            </td>

                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setImageEditorProvider(prov)}
                                  className="px-2 py-1 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 text-xs font-bold flex items-center gap-1 transition-colors"
                                  title="Edit 20 Task Portfolio Images"
                                >
                                  <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                                  <span>20 Images</span>
                                </button>

                                <button
                                  onClick={() => setBarcodeProvider(prov)}
                                  className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 text-xs font-mono font-bold flex items-center gap-1 transition-colors"
                                  title="View Barcode & QR Digital ID"
                                >
                                  <BarcodeIcon className="w-3.5 h-3.5 text-slate-700" />
                                  <span>Barcode</span>
                                </button>

                                <button
                                  onClick={() => openEditProvider(prov)}
                                  className="p-1.5 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center gap-1 text-xs font-bold"
                                  title="Edit All 9 Provider Profile Fields"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => deleteProvider(prov.id)}
                                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: BOOKINGS / LEADS MANAGEMENT */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">ID / Customer</th>
                        <th className="p-3.5">Assigned Pro</th>
                        <th className="p-3.5">Location & Slot</th>
                        <th className="p-3.5">Est. Rate</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {requests.map(req => (
                        <tr key={req.id} className="hover:bg-slate-50">
                          <td className="p-3.5">
                            <span className="font-mono text-slate-400 text-[11px] block">#{req.id}</span>
                            <div className="font-bold text-slate-900">{req.customerName}</div>
                            <div className="text-[11px] text-slate-500">{req.customerPhone}</div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-semibold text-slate-800">{req.providerName}</div>
                            <div className="text-[11px] text-amber-700">{req.serviceName}</div>
                          </td>

                          <td className="p-3.5 text-xs text-slate-600">
                            <div>{req.preferredDate}</div>
                            <div className="text-slate-400">{req.area}, {req.city}</div>
                          </td>

                          <td className="p-3.5 font-bold text-amber-800">
                            ₹{req.estimatedBudget}
                          </td>

                          <td className="p-3.5">
                            <select
                              value={req.status}
                              onChange={(e) => updateRequestStatus(req.id, e.target.value as RequestStatus)}
                              className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg p-1.5 text-slate-800 focus:outline-hidden"
                            >
                              <option value="pending">Pending</option>
                              <option value="accepted">Accepted</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`tel:${req.customerPhone}`}
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                title="Call Customer"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => deleteServiceRequest(req.id)}
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                                title="Delete Request"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES MANAGEMENT */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-sm">
                  {categories.length} Service Categories
                </h3>
                <button
                  onClick={() => setShowAddCategoryModal(true)}
                  id="admin-add-category-btn"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addNewCategory}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(cat => {
                  const assignedCount = providers.filter(p => p.categoryId === cat.id).length;
                  return (
                    <div key={cat.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
                            {cat.isClosedToday && (
                              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                                Closed Today
                              </span>
                            )}
                            {cat.isClosed && !cat.isClosedToday && (
                              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 border border-slate-300">
                                Closed
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {cat.subServices.length} sub-services • {assignedCount} specialists
                          </p>
                        </div>

                        <button
                          onClick={() => deleteCategory(cat.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                          title="Delete category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Category Status Switches */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => toggleCategoryClosed(cat.id)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                            cat.isClosed
                              ? 'bg-slate-200 text-slate-800 border-slate-400'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                          }`}
                        >
                          {cat.isClosed ? 'Service: Closed' : 'Service: Active/Open'}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleCategoryClosedToday(cat.id)}
                          className={`text-xs font-black px-2.5 py-1 rounded-lg border transition-colors ${
                            cat.isClosedToday
                              ? 'bg-red-500 text-white border-red-600 shadow-2xs'
                              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {cat.isClosedToday ? 'Closed Today (Active)' : 'Mark Closed Today'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS & MODERATION */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.flatMap(p => p.reviews.map(r => ({ ...r, provId: p.id, provName: p.name }))).map(rev => (
                  <div key={rev.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{rev.userName}</span>
                        <span className="text-slate-400 text-xs ml-2">→ for {rev.provName}</span>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 italic">"{rev.comment}"</p>
                    <div className="text-[11px] text-slate-400 flex justify-between">
                      <span>{rev.serviceDone}</span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Add / Edit Provider Modal */}
      {showAddProviderModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingProvider ? 'Edit Service Provider' : 'Add New Service Provider'}
              </h3>
              <button onClick={() => setShowAddProviderModal(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveProvider} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={provName}
                  onChange={(e) => setProvName(e.target.value)}
                  className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={provAvatar}
                  onChange={(e) => setProvAvatar(e.target.value)}
                  className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone *</label>
                  <input
                    type="text"
                    required
                    value={provPhone}
                    onChange={(e) => setProvPhone(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp</label>
                  <input
                    type="text"
                    value={provWhatsapp}
                    onChange={(e) => setProvWhatsapp(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={provCategory}
                    onChange={(e) => setProvCategory(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                  <select
                    value={provCity}
                    onChange={(e) => setProvCity(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                  >
                    {cities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Experience (Yrs)</label>
                  <input
                    type="number"
                    value={provExp}
                    onChange={(e) => setProvExp(Number(e.target.value))}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Starting Price (₹)</label>
                  <input
                    type="number"
                    value={provPrice}
                    onChange={(e) => setProvPrice(Number(e.target.value))}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={provPriceUnit}
                    onChange={(e) => setProvPriceUnit(e.target.value)}
                    className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={provSkills}
                  onChange={(e) => setProvSkills(e.target.value)}
                  className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProviderModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Save Provider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900">Add New Category</h3>
              <button onClick={() => setShowAddCategoryModal(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleAddCategorySubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Gardener & Landscaping"
                  className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Icon Name</label>
                <select
                  value={catIcon}
                  onChange={(e) => setCatIcon(e.target.value)}
                  className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                >
                  <option value="Wrench">Wrench</option>
                  <option value="Zap">Zap (Electric)</option>
                  <option value="Hammer">Hammer</option>
                  <option value="Flame">Flame</option>
                  <option value="Boxes">Boxes</option>
                  <option value="Sparkles">Sparkles</option>
                  <option value="Camera">Camera</option>
                  <option value="Car">Car</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 10 Task Portfolio Images Editor Modal */}
      {imageEditorProvider && (
        <TaskImageEditorModal
          provider={imageEditorProvider}
          onClose={() => setImageEditorProvider(null)}
        />
      )}

      {/* Barcode & UPI QR Modal */}
      {barcodeProvider && (
        <BarcodeModal
          provider={barcodeProvider}
          onClose={() => setBarcodeProvider(null)}
        />
      )}

      {/* Comprehensive Provider Edit Modal (9 Fields) */}
      {editingProviderForModal && (
        <EditProviderModal
          provider={editingProviderForModal}
          onClose={() => setEditingProviderForModal(null)}
        />
      )}

    </div>
  );
};
