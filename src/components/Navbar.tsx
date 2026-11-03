import React, { useState } from 'react';
import { Download, Menu, X, Shield, Smartphone, Terminal } from 'lucide-react';
import { CURRENT_RELEASE } from '../data/downloadData';

interface NavbarProps {
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Features', href: '#features' },
    { label: 'In-Game HUD', href: '#simulator' },
    { label: 'Download', href: '#download' },
    { label: 'Install Guide', href: '#install' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#232733]/80 bg-[#0b0d11]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a href="#overview" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md shadow-blue-500/20 ring-1 ring-blue-400/40 transition group-hover:scale-105 group-hover:shadow-blue-500/40">
            {/* Pokéball custom SVG inner */}
            <div className="h-5 w-5 rounded-full border-2 border-white/90 relative overflow-hidden flex flex-col justify-between">
              <div className="h-2 w-full bg-red-500/90" />
              <div className="h-0.5 w-full bg-slate-900" />
              <div className="h-2 w-full bg-white" />
              <div className="absolute inset-0 m-auto h-2 w-2 rounded-full border border-slate-900 bg-white" />
            </div>
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0b0d11] animate-ping" />
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0b0d11]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg text-white">PokeSphere</span>
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                {CURRENT_RELEASE.tag}
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline-block">LSPosed Game Engine</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-300 transition hover:bg-[#1a1d24] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-[#232733] bg-[#14171f] px-3 py-2 text-xs font-semibold text-zinc-300 hover:border-zinc-600 hover:text-white transition"
          >
            <Terminal className="h-3.5 w-3.5 text-blue-400" />
            Docs & Source
          </a>

          <button
            type="button"
            onClick={onOpenDownload}
            className="relative group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400/40 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/50 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="h-4 w-4 transition group-hover:-translate-y-0.5" />
            <span>Download APK</span>
            <span className="hidden xl:inline text-xs opacity-75 font-mono">({CURRENT_RELEASE.fileSize})</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onOpenDownload}
            className="sm:hidden inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-bold text-white cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>APK</span>
          </button>
          
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-[#1a1d24] hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#232733] bg-[#0f1218] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="block rounded-lg px-3 py-2 text-base font-medium text-zinc-200 hover:bg-[#1a1d24] hover:text-blue-400 transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#232733] flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/30 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Download PokeSphere APK ({CURRENT_RELEASE.fileSize})
            </button>
            
            <div className="flex items-center justify-between text-xs text-zinc-400 px-1 pt-1 font-mono">
              <span className="flex items-center gap-1"><Smartphone className="h-3 w-3 text-blue-400" /> ARM64 Only</span>
              <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-emerald-400" /> Root + LSPosed</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

