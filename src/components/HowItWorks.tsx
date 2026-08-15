import React from 'react';
import { Search, UserCheck, PhoneCall, ArrowRight, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { t } = useApp();

  const steps = [
    {
      number: '01',
      icon: Search,
      title: t.step1Title,
      desc: t.step1Desc,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      number: '02',
      icon: UserCheck,
      title: t.step2Title,
      desc: t.step2Desc,
      color: 'from-amber-600 to-orange-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      number: '03',
      icon: PhoneCall,
      title: t.step3Title,
      desc: t.step3Desc,
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ];

  return (
    <section id="how-it-works-section" className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Simple & Transparent Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {t.howItWorksHeading}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            {t.howItWorksSubheading}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-6 sm:p-8 relative flex flex-col justify-between hover:border-slate-600 transition-all group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-700 group-hover:text-slate-600 transition-colors font-mono">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center gap-1 text-xs font-semibold text-amber-400">
                  <span>Quick & Direct in Bhurkunda & Ramgarh</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
