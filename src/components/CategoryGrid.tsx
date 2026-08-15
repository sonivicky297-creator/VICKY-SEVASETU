import React from 'react';
import { ArrowRight, Sparkles, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { renderCategoryIcon } from '../utils/iconHelper';
import { Category } from '../types';

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
  onOpenTeamModal?: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  onCategorySelect,
  onOpenTeamModal
}) => {
  const { t, categories, providers } = useApp();

  const getProviderCountForCat = (catId: string) => {
    return providers.filter(p => p.categoryId === catId).length;
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold tracking-wide uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Primary Services (20 Verified Specialists Each)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.categoriesHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              {t.categoriesSubheading}
            </p>
          </div>

          <button
            onClick={() => onCategorySelect('all')}
            id="view-all-categories-btn"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm group shrink-0"
          >
            <span>{t.viewAllCategories}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat) => {
            const count = getProviderCountForCat(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (onOpenTeamModal) {
                    onOpenTeamModal(cat);
                  } else {
                    onCategorySelect(cat.id);
                  }
                }}
                id={`category-card-${cat.id}`}
                className="group relative bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-500 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Count Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform relative`}>
                      {renderCategoryIcon(cat.iconName, { className: "w-6 h-6" })}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {cat.isClosedToday && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-200">
                          Closed Today
                        </span>
                      )}
                      {cat.isClosed && !cat.isClosedToday && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 border border-slate-300">
                          Closed
                        </span>
                      )}
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 flex items-center gap-1">
                        <Users className="w-3 h-3 text-amber-600" />
                        {count} Assigned
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Sub-services tags preview */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {cat.subServices.slice(0, 3).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {cat.subServices.length > 3 && (
                      <span className="text-[10px] font-semibold text-amber-700 px-1 py-0.5">
                        +{cat.subServices.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>View {count} Assigned Specialists</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-amber-600" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
