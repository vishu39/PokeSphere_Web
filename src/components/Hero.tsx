import React, { useState } from 'react';
import { Download, CheckCircle2, ChevronRight, Shield, Zap, Layers } from 'lucide-react';
import { CURRENT_RELEASE } from '../data/downloadData';

interface HeroProps {
  onOpenDownload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload }) => {
  // Mock interactive state for the live phone preview on the hero
  const [autoSpin, setAutoSpin] = useState(true);
  const [ivOverlay, setIvOverlay] = useState(true);
  const [fastCatch, setFastCatch] = useState(false);

  return (
    <section id="overview" className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Action CTA */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Tag pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
              <span>Next-Gen LSPosed Engine</span>
              <span className="text-zinc-500">•</span>
              <span className="text-blue-200">v1.0.0 Ready</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Elevate Your Pokémon GO Experience with{' '}
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                PokeSphere
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A high-performance native Android mod built with React Native, Kotlin, and Unity IL2CPP C++ hooks. 
              Get instant in-game IV calculation, smart PokéStop auto-spin, and precision catching with zero UI latency.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={onOpenDownload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/30 ring-1 ring-blue-400/40 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <Download className="h-5 w-5" />
                <div className="text-left">
                  <div className="leading-none">Download PokeSphere</div>
                  <div className="text-[11px] opacity-75 font-mono mt-1 font-normal">
                    {CURRENT_RELEASE.fileName} • {CURRENT_RELEASE.fileSize}
                  </div>
                </div>
              </button>

              <a
                href="#install"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-[#2b3140] bg-[#141720]/80 px-6 py-4 text-sm font-semibold text-zinc-200 hover:bg-[#1c212d] hover:border-zinc-500 hover:text-white transition"
              >
                <span>Setup Guide</span>
                <ChevronRight className="h-4 w-4 text-zinc-400" />
              </a>
            </div>

            {/* Key feature highlights */}
            <div className="mt-10 pt-8 border-t border-[#1e2330] grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-2.5">
                <div className="rounded-lg bg-blue-500/10 p-1.5 text-blue-400">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Native IL2CPP</div>
                  <div className="text-[11px] text-zinc-400">Direct memory injection</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-400">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">LSPosed Sandboxed</div>
                  <div className="text-[11px] text-zinc-400">Original APK unmodified</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="rounded-lg bg-purple-500/10 p-1.5 text-purple-400">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Reactive HUD</div>
                  <div className="text-[11px] text-zinc-400">Smooth 60 FPS overlay</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Interactive Device Frame Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              
              {/* Decorative phone outer frame */}
              <div className="rounded-[40px] border-4 border-[#2c3345] bg-[#0c0e14] p-3 shadow-2xl shadow-blue-900/30 ring-1 ring-white/10">
                {/* Speaker ear piece notch */}
                <div className="mx-auto h-4 w-28 rounded-full bg-[#1b202c] mb-3 flex items-center justify-center">
                  <div className="h-1.5 w-10 rounded-full bg-zinc-700/80" />
                  <div className="ml-2 h-2 w-2 rounded-full bg-blue-500/60" />
                </div>

                {/* Simulated Screen Content - matching PgSphere's dark design tokens */}
                <div className="rounded-[28px] bg-[#0F1115] border border-[#1e2330] p-4 text-white overflow-hidden shadow-inner">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e2330]">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="font-bold text-sm tracking-wide">PgSphere</span>
                    </div>
                    <span className="text-[10px] font-mono bg-blue-500/10 border border-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">
                      v1.0.0
                    </span>
                  </div>

                  {/* Status Card */}
                  <div className="mt-3 rounded-xl bg-[#1A1D23] p-3 border border-[#272c38]">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-zinc-400">LSPosed Core</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        Active & Injected
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-zinc-400 font-mono">
                      Target: com.nianticlabs.pokemongo
                    </div>
                  </div>

                  {/* Live Interactive Toggles Showcase */}
                  <div className="mt-3 space-y-2">
                    <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-1">
                      Quick Mod Controls
                    </div>

                    {/* Auto Spin Toggle */}
                    <div 
                      onClick={() => setAutoSpin(!autoSpin)}
                      className="cursor-pointer flex items-center justify-between rounded-xl bg-[#1A1D23] p-2.5 border border-[#272c38] hover:border-blue-500/50 transition"
                    >
                      <div>
                        <div className="text-xs font-semibold text-zinc-200">Auto Spin Disks</div>
                        <div className="text-[10px] text-zinc-400">Bag limit & speed-cap aware</div>
                      </div>
                      <div className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ${autoSpin ? 'bg-blue-600' : 'bg-zinc-700'}`}>
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${autoSpin ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    </div>

                    {/* IV Overlay Toggle */}
                    <div 
                      onClick={() => setIvOverlay(!ivOverlay)}
                      className="cursor-pointer flex items-center justify-between rounded-xl bg-[#1A1D23] p-2.5 border border-[#272c38] hover:border-blue-500/50 transition"
                    >
                      <div>
                        <div className="text-xs font-semibold text-zinc-200">Live IV HUD Display</div>
                        <div className="text-[10px] text-zinc-400">Pre-catch 100% IV scanner</div>
                      </div>
                      <div className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ${ivOverlay ? 'bg-blue-600' : 'bg-zinc-700'}`}>
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${ivOverlay ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    </div>

                    {/* Fast Catch Toggle */}
                    <div 
                      onClick={() => setFastCatch(!fastCatch)}
                      className="cursor-pointer flex items-center justify-between rounded-xl bg-[#1A1D23] p-2.5 border border-[#272c38] hover:border-blue-500/50 transition"
                    >
                      <div>
                        <div className="text-xs font-semibold text-zinc-200">Fast Catch Assist</div>
                        <div className="text-[10px] text-zinc-400">Skip catch animations</div>
                      </div>
                      <div className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 ${fastCatch ? 'bg-blue-600' : 'bg-zinc-700'}`}>
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${fastCatch ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  </div>

                  {/* Simulated HUD preview chip */}
                  <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 p-2.5 text-center">
                    <div className="text-[10px] text-blue-300 font-medium">In-Game Floating Pill (Preview)</div>
                    <div className="mt-1 flex items-center justify-center gap-2 font-mono text-xs font-bold text-white">
                      <span>IV: 15/15/15</span>
                      <span className="text-emerald-400 font-extrabold">(100%)</span>
                      <span className="text-amber-300">★ ★ ★</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Home indicator */}
                <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-zinc-700" />
              </div>

              {/* Decorative floating badge */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 rounded-xl border border-emerald-500/30 bg-[#12161f]/95 p-3 shadow-xl backdrop-blur-md flex items-center gap-2.5 text-xs text-zinc-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">Tested & Active</div>
                  <div className="text-[11px] text-zinc-400">Pokémon GO 0.355.0 Support</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
