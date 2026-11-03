import React, { useState } from 'react';
import { Download, Copy, Check, ShieldCheck, Cpu, RefreshCw, Terminal, FileCheck, CheckCircle } from 'lucide-react';
import { CURRENT_RELEASE } from '../data/downloadData';

interface DownloadSectionProps {
  onOpenDownload: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ onOpenDownload }) => {
  const [copied, setCopied] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<'stable' | 'nightly'>('stable');

  const copyHash = () => {
    navigator.clipboard.writeText(CURRENT_RELEASE.sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="download" className="relative py-20 bg-[#0d0f15] border-y border-[#1e2330]">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-3">
            <Download className="h-3.5 w-3.5" />
            Official Release Center
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Download PokeSphere APK
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Get the standalone ARM64 APK installer. Seamlessly loads with Zygisk LSPosed for zero-detection injection.
          </p>

          {/* Release Channel Selector */}
          <div className="mt-6 inline-flex rounded-xl bg-[#141822] p-1 border border-[#242a38]">
            <button
              onClick={() => setSelectedChannel('stable')}
              className={`rounded-lg px-5 py-2 text-xs font-bold transition ${
                selectedChannel === 'stable'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Stable Release (Recommended)
            </button>
            <button
              onClick={() => setSelectedChannel('nightly')}
              className={`rounded-lg px-5 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                selectedChannel === 'nightly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Canary / Nightly</span>
              <span className="rounded bg-amber-500/20 text-amber-400 text-[10px] px-1 py-0.2">Dev</span>
            </button>
          </div>
        </div>

        {/* Main Download Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Primary Download Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-[#293040] bg-[#12151e] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#202634]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-white">{CURRENT_RELEASE.fileName}</span>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 text-xs font-semibold">
                    Verified Clean
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Build date: {CURRENT_RELEASE.date} • LSPosed Module SDK v1
                </p>
              </div>

              <div className="text-right">
                <span className="text-xl font-bold text-blue-400 font-mono">{CURRENT_RELEASE.fileSize}</span>
                <span className="block text-[11px] text-zinc-500">Android APK</span>
              </div>
            </div>

            {/* Release Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
              <div className="rounded-xl bg-[#0c0e14] border border-[#1f2432] p-3 text-center">
                <span className="block text-[10px] uppercase font-bold text-zinc-400">Architecture</span>
                <span className="mt-1 text-xs font-bold text-white font-mono">{CURRENT_RELEASE.targetArchitecture}</span>
              </div>
              <div className="rounded-xl bg-[#0c0e14] border border-[#1f2432] p-3 text-center">
                <span className="block text-[10px] uppercase font-bold text-zinc-400">Min Android</span>
                <span className="mt-1 text-xs font-bold text-white">Android 10+</span>
              </div>
              <div className="rounded-xl bg-[#0c0e14] border border-[#1f2432] p-3 text-center">
                <span className="block text-[10px] uppercase font-bold text-zinc-400">Tested Target</span>
                <span className="mt-1 text-xs font-bold text-white">v0.355.x</span>
              </div>
              <div className="rounded-xl bg-[#0c0e14] border border-[#1f2432] p-3 text-center">
                <span className="block text-[10px] uppercase font-bold text-zinc-400">Framework</span>
                <span className="mt-1 text-xs font-bold text-white">LSPosed Zygisk</span>
              </div>
            </div>

            {/* SHA-256 Checksum Card */}
            <div className="rounded-xl bg-[#0a0c12] border border-[#1d222e] p-3.5 mb-6">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <FileCheck className="h-3.5 w-3.5 text-blue-400" />
                  SHA-256 Checksum Signature
                </span>
                <button
                  onClick={copyHash}
                  className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied to Clipboard" : "Copy Hash"}</span>
                </button>
              </div>
              <div className="font-mono text-[11px] text-zinc-400 break-all select-all leading-relaxed bg-[#11141c] p-2 rounded-lg border border-[#1f2433]">
                {CURRENT_RELEASE.sha256}
              </div>
            </div>

            {/* Big Download Action Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onOpenDownload}
                className="flex-1 inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/30 hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.01] active:scale-95 transition cursor-pointer"
              >
                <Download className="h-5 w-5" />
                <span>Download Official APK</span>
                <span className="text-xs opacity-75 font-mono">({CURRENT_RELEASE.fileSize})</span>
              </button>

              <a
                href={CURRENT_RELEASE.downloadUrl}
                download={CURRENT_RELEASE.fileName}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#2b3242] bg-[#171b26] px-5 py-4 text-xs font-bold text-zinc-300 hover:bg-[#202534] hover:text-white transition cursor-pointer"
              >
                <RefreshCw className="h-4 w-4 text-zinc-400" />
                <span>Direct File Link</span>
              </a>
            </div>

            {/* Security Guarantee */}
            <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-3 pt-4 border-t border-[#1d222e]">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="h-4 w-4" /> 100% VirusTotal & Play Protect Clean
              </span>
              <span className="text-zinc-400 font-mono">No telemetry / Local memory only</span>
            </div>
          </div>

          {/* Right Column: Changelog & Architecture Notes (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Changelog Card */}
            <div className="rounded-3xl border border-[#293040] bg-[#12151e] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-blue-400" />
                  What's New in {CURRENT_RELEASE.tag}
                </h3>
                <span className="text-xs text-zinc-400 font-mono">{CURRENT_RELEASE.date}</span>
              </div>

              <ul className="space-y-3">
                {CURRENT_RELEASE.changelog.map((log, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                    <CheckCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{log}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Prerequisites Card */}
            <div className="rounded-3xl border border-[#293040] bg-[#12151e] p-6 shadow-xl">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-indigo-400" />
                Installation Requirements
              </h3>

              <div className="space-y-2.5 text-xs text-zinc-300">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0c0e14] border border-[#1f2432]">
                  <span className="text-zinc-400">Device Architecture</span>
                  <span className="font-mono font-bold text-white">ARM64 (aarch64)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0c0e14] border border-[#1f2432]">
                  <span className="text-zinc-400">Root Solution</span>
                  <span className="font-semibold text-emerald-400">Magisk / KernelSU / APatch</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0c0e14] border border-[#1f2432]">
                  <span className="text-zinc-400">Xposed Engine</span>
                  <span className="font-semibold text-blue-400">LSPosed v1.9.2+ (Zygisk)</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed">
                Notice: 32-bit devices (ARMv7) and x86 emulators without ARM translation are not supported.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
