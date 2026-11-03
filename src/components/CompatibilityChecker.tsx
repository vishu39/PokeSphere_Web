import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, Sparkles } from 'lucide-react';

export const CompatibilityChecker: React.FC = () => {
  const [androidVer, setAndroidVer] = useState<'supported' | 'unsupported'>('supported');
  const [rootType, setRootType] = useState<'magisk' | 'kernelsu' | 'apatch' | 'none'>('magisk');
  const [lsposed, setLsposed] = useState<'yes' | 'no'>('yes');
  const [arch, setArch] = useState<'arm64' | 'arm32'>('arm64');

  const getStatus = () => {
    if (rootType === 'none') {
      return {
        title: "Root Required",
        message: "PokeSphere requires root privileges (Magisk, KernelSU, or APatch) to inject hooks.",
        status: "error"
      };
    }
    if (lsposed === 'no') {
      return {
        title: "LSPosed Required",
        message: "Install LSPosed framework (Zygisk release) in Magisk/KernelSU modules before installing PokeSphere.",
        status: "warning"
      };
    }
    if (arch === 'arm32') {
      return {
        title: "64-Bit Device Required",
        message: "PokeSphere compiles exclusively for ARM64-v8a. 32-bit phones cannot run the native IL2CPP binary.",
        status: "error"
      };
    }
    if (androidVer === 'unsupported') {
      return {
        title: "Android 10+ Required",
        message: "Android 9 (Pie) or below lacks modern Zygisk memory mapping support.",
        status: "warning"
      };
    }
    return {
      title: "Device Fully Compatible!",
      message: "Your setup is ready for PokeSphere APK installation and seamless LSPosed hooking.",
      status: "success"
    };
  };

  const status = getStatus();

  return (
    <section className="py-16 bg-[#0b0d13]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#232938] bg-[#11141c] p-6 sm:p-10 shadow-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e2330]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                Pre-Flight Check
              </div>
              <h3 className="text-2xl font-bold text-white">Device Compatibility Tester</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Verify whether your Android phone and root configuration can run PokeSphere.
              </p>
            </div>
            
            {/* Status indicator */}
            <div className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold border ${
              status.status === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : status.status === 'warning'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              {status.status === 'success' && <CheckCircle className="h-4 w-4" />}
              {status.status === 'warning' && <AlertTriangle className="h-4 w-4" />}
              {status.status === 'error' && <XCircle className="h-4 w-4" />}
              <span>{status.title}</span>
            </div>
          </div>

          {/* Interactive Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            {/* Android version */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Android Version</label>
              <select
                value={androidVer}
                onChange={(e) => setAndroidVer(e.target.value as any)}
                className="w-full rounded-xl border border-[#272d3d] bg-[#0c0e14] px-3 py-2.5 text-xs font-medium text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="supported">Android 10 - 15 (Supported)</option>
                <option value="unsupported">Android 9 or older</option>
              </select>
            </div>

            {/* Root Solution */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Root Method</label>
              <select
                value={rootType}
                onChange={(e) => setRootType(e.target.value as any)}
                className="w-full rounded-xl border border-[#272d3d] bg-[#0c0e14] px-3 py-2.5 text-xs font-medium text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="magisk">Magisk + Zygisk (Recommended)</option>
                <option value="kernelsu">KernelSU + Zygisk Next</option>
                <option value="apatch">APatch + Zygisk</option>
                <option value="none">Not Rooted (Stock Phone)</option>
              </select>
            </div>

            {/* LSPosed */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">LSPosed Framework</label>
              <select
                value={lsposed}
                onChange={(e) => setLsposed(e.target.value as any)}
                className="w-full rounded-xl border border-[#272d3d] bg-[#0c0e14] px-3 py-2.5 text-xs font-medium text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="yes">Installed & Active (v1.9.2+)</option>
                <option value="no">Not Installed yet</option>
              </select>
            </div>

            {/* Architecture */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Processor Arch</label>
              <select
                value={arch}
                onChange={(e) => setArch(e.target.value as any)}
                className="w-full rounded-xl border border-[#272d3d] bg-[#0c0e14] px-3 py-2.5 text-xs font-medium text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="arm64">ARM64-v8a (64-Bit)</option>
                <option value="arm32">ARMv7 (32-Bit)</option>
              </select>
            </div>
          </div>

          {/* Feedback advice banner */}
          <div className="rounded-2xl bg-[#0c0e14] border border-[#1e2330] p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-300 leading-relaxed">
              <span className="font-bold text-white block mb-0.5">{status.title}</span>
              {status.message}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
