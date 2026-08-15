import React from 'react';
import { ShieldCheck, CircleDollarSign, Users, Headphones, Star, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrustAndSafety: React.FC = () => {
  const { t, providers } = useApp();

  // Extract top customer reviews across providers
  const allReviews = providers.flatMap(p => 
    p.reviews.map(r => ({ ...r, providerName: p.name, providerCategory: p.title }))
  ).slice(0, 3);

  const trustFeatures = [
    {
      icon: ShieldCheck,
      title: t.trust1Title,
      desc: t.trust1Desc,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: CircleDollarSign,
      title: t.trust2Title,
      desc: t.trust2Desc,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: Users,
      title: t.trust3Title,
      desc: t.trust3Desc,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Headphones,
      title: t.trust4Title,
      desc: t.trust4Desc,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-white">
      {/* Trust Badges 4 Grid */}
      <section className="py-14 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.trustHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {t.trustSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all text-center flex flex-col items-center"
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.bgColor} flex items-center justify-center ${item.color} mb-4 shadow-2xs`}>
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Verified Customer Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What Our Customers in Bhurkunda & Ramgarh Say
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Honest reviews and verified feedback from homeowners and local businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allReviews.map((rev, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-slate-200" />
                  </div>

                  <p className="text-sm text-slate-700 italic leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{rev.userName}</h4>
                    <p className="text-[11px] text-slate-500">{rev.userCity}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    {rev.serviceDone}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
