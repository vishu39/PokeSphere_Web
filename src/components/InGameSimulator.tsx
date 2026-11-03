import React, { useState } from 'react';
import { Eye, RotateCw, Sparkles, ChevronDown } from 'lucide-react';

export const InGameSimulator: React.FC = () => {
  const [hudExpanded, setHudExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'encounter' | 'map'>('encounter');
  const [autoSpinLog, setAutoSpinLog] = useState<string[]>(['[03:10:02] Hooked Unity IL2CPP framework']);
  const [spinnedCount, setSpinnedCount] = useState(14);
  const [bagSlots, setBagSlots] = useState({ current: 620, max: 700 });

  const triggerSpinSimulation = () => {
    const stops = ['Fountain PokéStop', 'Historic Monument Gym', 'Downtown Clocktower Stop'];
    const randomStop = stops[Math.floor(Math.random() * stops.length)];
    const time = new Date().toLocaleTimeString();
    setAutoSpinLog((prev) => [`[${time}] Spun ${randomStop}: +3 Pokéballs, +1 Revive`, ...prev.slice(0, 4)]);
    setSpinnedCount((c) => c + 1);
    setBagSlots((b) => ({ ...b, current: Math.min(b.max, b.current + 4) }));
  };

  return (
    <section id="simulator" className="py-20 bg-[#090b10] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-3">
            <Eye className="h-3.5 w-3.5" />
            Interactive Gameplay Preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See How PokeSphere Runs In-Game
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            PokeSphere injects a zero-overhead, non-intrusive floating HUD directly into Pokémon GO. 
            Test the live overlay simulation below:
          </p>
        </div>

        {/* Interactive Simulator Container */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-[#232938] bg-[#0f121a] p-4 sm:p-8 shadow-2xl">
          
          {/* Top Controls / View switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#1f2432]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-400">SCENE PREVIEW:</span>
              <button
                onClick={() => setActiveTab('encounter')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  activeTab === 'encounter'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#181d28] text-zinc-400 hover:text-white'
                }`}
              >
                Wild Encounter (IV Scan)
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  activeTab === 'map'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#181d28] text-zinc-400 hover:text-white'
                }`}
              >
                World Map & Auto-Spin
              </button>
            </div>

            <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Target: com.nianticlabs.pokemongo</span>
            </div>
          </div>

          {/* Simulated Game Canvas */}
          <div className="relative mt-6 rounded-2xl overflow-hidden border border-[#2b3244] bg-gradient-to-b from-[#141d2e] via-[#0d1624] to-[#070b13] min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6">
            
            {/* Background gaming scene visual */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />

            {/* In-Game Floating PokeSphere Overlay HUD (The mod widget) */}
            <div className="relative z-10 max-w-sm">
              <div className="rounded-2xl border border-blue-500/40 bg-[#0F1115]/95 shadow-2xl backdrop-blur-md p-4 text-white ring-1 ring-white/10 transition-all">
                
                {/* HUD Header */}
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setHudExpanded(!hudExpanded)}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Glowing sphere logo */}
                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center p-0.5 shadow-md shadow-blue-500/30">
                      <div className="h-full w-full rounded-full border border-white/80 bg-[#0f1115] flex items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>PokeSphere HUD</span>
                        <span className="rounded bg-emerald-500/20 text-emerald-400 text-[9px] px-1.5 font-mono">LIVE</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${hudExpanded ? 'rotate-180' : ''}`} />
                </div>

                {/* Collapsible HUD Body */}
                {hudExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#1e2330] space-y-3">
                    {activeTab === 'encounter' ? (
                      /* Encounter IV HUD */
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-zinc-400">Target Encounter</span>
                          <span className="text-xs font-bold text-sky-400">Charizard (Shiny)</span>
                        </div>

                        {/* IV Gauge */}
                        <div className="rounded-xl bg-[#161a23] p-2.5 border border-[#232938]">
                          <div className="flex items-center justify-between text-xs font-mono font-bold">
                            <span className="text-zinc-300">IV STATS</span>
                            <span className="text-emerald-400 text-sm">15 / 15 / 14 (98%)</span>
                          </div>
                          
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-[10px] text-zinc-400 gap-2">
                              <span className="w-8">ATK 15</span>
                              <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                                <div className="h-full bg-rose-500 w-full" />
                              </div>
                            </div>
                            <div className="flex items-center text-[10px] text-zinc-400 gap-2">
                              <span className="w-8">DEF 15</span>
                              <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                                <div className="h-full bg-blue-500 w-full" />
                              </div>
                            </div>
                            <div className="flex items-center text-[10px] text-zinc-400 gap-2">
                              <span className="w-8">STA 14</span>
                              <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[93%]" />
                              </div>
                            </div>
                          </div>

                          <div className="mt-2 pt-2 border-t border-[#202534] flex items-center justify-between text-[10px] text-zinc-400">
                            <span>Great League Rank: <strong className="text-amber-400">#12</strong></span>
                            <span>Level: <strong className="text-white">32.0</strong></span>
                          </div>
                        </div>

                        <div className="text-[10px] text-zinc-500 text-center font-mono">
                          Auto-Catch Ready • Ultra Ball Selected
                        </div>
                      </div>
                    ) : (
                      /* Map & Auto-Spin HUD */
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">Total Spun</span>
                          <span className="font-mono font-bold text-white">{spinnedCount} Stops</span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">Bag Capacity</span>
                          <span className="font-mono text-zinc-200">{bagSlots.current} / {bagSlots.max}</span>
                        </div>

                        <button
                          onClick={triggerSpinSimulation}
                          className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-2 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition active:scale-95"
                        >
                          <RotateCw className="h-3.5 w-3.5" />
                          <span>Simulate Auto Spin Action</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Center Graphic representation */}
            <div className="my-auto text-center py-6">
              {activeTab === 'encounter' ? (
                <div className="space-y-3">
                  <div className="inline-block relative">
                    {/* Glowing Pokémon icon badge */}
                    <div className="h-28 w-28 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-2xl shadow-amber-500/30 ring-4 ring-white/10 animate-pulse">
                      <Sparkles className="h-14 w-14 text-white" />
                    </div>
                    <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-md">
                      SHINY
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white">Charizard</h4>
                    <p className="text-xs text-zinc-400 font-mono">CP 2,684 • Fire / Flying</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="h-24 w-24 mx-auto rounded-full border-4 border-sky-400/50 bg-sky-500/10 flex items-center justify-center shadow-2xl shadow-sky-500/30 animate-spin" style={{ animationDuration: '10s' }}>
                    <RotateCw className="h-10 w-10 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white">PokéStop Radius Active</h4>
                    <p className="text-xs text-zinc-400 font-mono">Auto-spinning within 40m range</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom In-Game Event Toast Logs */}
            <div className="relative z-10 rounded-xl bg-[#0a0c12]/90 border border-[#1e2330] p-3 text-left">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Mod Event Terminal</span>
                <span className="text-[9px] text-zinc-500 font-mono">LSPosed Bridge</span>
              </div>
              <div className="font-mono text-[11px] text-zinc-300 space-y-1">
                {autoSpinLog.map((log, index) => (
                  <div key={index} className="text-emerald-400/90 truncate">
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
