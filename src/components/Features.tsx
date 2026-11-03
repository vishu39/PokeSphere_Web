import React from 'react';
import { Cpu, RotateCw, Scan, Target, PackageCheck, ShieldCheck } from 'lucide-react';
import { FEATURES_LIST } from '../data/downloadData';

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="h-6 w-6 text-blue-400" />,
  RotateCw: <RotateCw className="h-6 w-6 text-sky-400" />,
  Scan: <Scan className="h-6 w-6 text-emerald-400" />,
  Target: <Target className="h-6 w-6 text-purple-400" />,
  PackageCheck: <PackageCheck className="h-6 w-6 text-amber-400" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-indigo-400" />,
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-[#0b0d12] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-3">
            Engine Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for Precision & Fluid Performance
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            PokeSphere pairs React Native TypeScript UI with Kotlin system bridges and C++ IL2CPP memory hooks.
          </p>
        </div>

        {/* Features Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_LIST.map((feature) => (
            <div
              key={feature.id}
              className="group rounded-3xl border border-[#202534] bg-[#11141c] p-6 hover:border-blue-500/40 hover:bg-[#141822] transition-all duration-300 shadow-lg relative flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#181d28] border border-[#272d3e] group-hover:scale-105 group-hover:border-blue-500/50 transition">
                    {iconMap[feature.icon]}
                  </div>
                  <span className="rounded-full bg-[#1b202c] border border-[#2b3345] px-2.5 py-0.5 text-[11px] font-mono text-zinc-300">
                    {feature.badge}
                  </span>
                </div>

                {/* Title & Category */}
                <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-1">
                  {feature.category}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Status bar */}
              <div className="mt-6 pt-4 border-t border-[#1d222e] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span>Hook Latency: &lt;1ms</span>
                <span className="text-emerald-400">Ready</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

