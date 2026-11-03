import React from 'react';
import { Download } from 'lucide-react';
import { CURRENT_RELEASE } from '../data/downloadData';

interface FooterProps {
  onOpenDownload: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload }) => {
  return (
    <footer className="border-t border-[#1d222e] bg-[#080a0e] pt-16 pb-12 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#181d28]">
          
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-500/20 ring-1 ring-blue-400/40">
                <div className="h-4 w-4 rounded-full border-2 border-white/90 relative overflow-hidden flex flex-col justify-between">
                  <div className="h-1.5 w-full bg-red-500" />
                  <div className="h-0.5 w-full bg-slate-900" />
                  <div className="h-1.5 w-full bg-white" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white">PokeSphere</span>
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-mono text-blue-400 border border-blue-500/20">
                {CURRENT_RELEASE.tag}
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              The high-performance native Android mod for Pokémon GO built with LSPosed, React Native, and Unity IL2CPP memory hooks.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LSPosed Engine Online
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#overview" className="hover:text-white transition">Overview</a></li>
              <li><a href="#features" className="hover:text-white transition">Features Breakdown</a></li>
              <li><a href="#simulator" className="hover:text-white transition">Live In-Game HUD</a></li>
              <li><a href="#download" className="hover:text-white transition">Download Center</a></li>
              <li><a href="#install" className="hover:text-white transition">Installation Guide</a></li>
            </ul>
          </div>

          {/* Mod Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Core Modules</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-zinc-400">Step 1: App Selector & Hooks</span></li>
              <li><span className="text-zinc-400">Step 2: Smart Auto-Spin</span></li>
              <li><span className="text-zinc-400">Step 3: Real-Time IV Scanner</span></li>
              <li><span className="text-zinc-400">Step 4: Fast Catch Assist</span></li>
              <li><span className="text-zinc-400">Step 5: Inventory Manager</span></li>
            </ul>
          </div>

          {/* Downloads & Source */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Get PokeSphere</h4>
            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={onOpenDownload}
                className="inline-flex items-center gap-1.5 font-bold text-blue-400 hover:text-blue-300 transition cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download APK ({CURRENT_RELEASE.fileSize})</span>
              </button>
              <div className="text-[11px] font-mono text-zinc-500">
                SHA-256: {CURRENT_RELEASE.sha256.substring(0, 16)}...
              </div>
              <div className="pt-2 text-[11px] text-zinc-400">
                Target: Android 10+ (ARM64)
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Educational Notice */}
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-[#1f2433] bg-[#0c0e14] p-4 text-[11px] text-zinc-400 leading-relaxed">
            <strong className="text-zinc-300 block mb-1">Educational & Research Disclaimer:</strong>
            PokeSphere is an open-source educational learning project created for researching Android runtime architecture, dynamic C++ function hooking, and memory analysis. It is strictly not intended for unfair commercial use. Pokémon GO, Pokémon, and associated character names are trademarks of Nintendo, Creatures Inc., GAME FREAK inc., and Niantic, Inc. PokeSphere is not affiliated with, endorsed, sponsored, or supported by any of these entities.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3 pt-2">
            <div>
              &copy; 2026 PokeSphere Project. Built for research & learning.
            </div>
            <div className="flex items-center gap-1 text-[11px] text-zinc-400">
              Responsive for Mobile, Tablet & Desktop
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
