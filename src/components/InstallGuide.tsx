import React, { useState } from 'react';
import { BookOpen, Copy, Check, Terminal, ShieldAlert, ArrowRight } from 'lucide-react';
import { INSTALL_STEPS } from '../data/downloadData';

export const InstallGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedPkg, setCopiedPkg] = useState(false);

  const copyPackageName = () => {
    navigator.clipboard.writeText("com.nianticlabs.pokemongo");
    setCopiedPkg(true);
    setTimeout(() => setCopiedPkg(false), 2000);
  };

  return (
    <section id="install" className="py-20 bg-[#0d0f15] border-t border-[#1e2330]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            Quick Setup Walkthrough
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Step-by-Step Installation Guide
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Follow these 4 simple steps to get PokeSphere injected and working on your rooted Android phone.
          </p>
        </div>

        {/* Steps Grid: Mobile cards / Desktop tab interaction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Steps List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {INSTALL_STEPS.map((step, idx) => (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl border p-4.5 transition-all text-left flex items-start gap-4 ${
                  activeStep === idx
                    ? 'border-blue-500/50 bg-[#161a24] shadow-lg shadow-blue-500/10'
                    : 'border-[#202534] bg-[#11141c] hover:bg-[#141822]'
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold ${
                  activeStep === idx
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#1c212d] text-zinc-400'
                }`}>
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{step.title}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#1e2330] text-zinc-400">
                      {step.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                    {step.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Step Detail Interactive Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-[#272d3e] bg-[#12151f] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Step header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1e2432]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-blue-400">
                  STEP {INSTALL_STEPS[activeStep].step} OF 04
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs font-semibold text-zinc-400">
                  {INSTALL_STEPS[activeStep].badge}
                </span>
              </div>

              {activeStep < 3 ? (
                <button
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <span className="text-xs text-emerald-400 font-bold">Complete!</span>
              )}
            </div>

            {/* Title */}
            <h3 className="mt-4 text-2xl font-bold text-white">
              {INSTALL_STEPS[activeStep].title}
            </h3>

            <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
              {INSTALL_STEPS[activeStep].details}
            </p>

            {/* Contextual guidance per step */}
            <div className="mt-6">
              {activeStep === 0 && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-[#0c0e14] border border-[#202534] p-4 text-xs space-y-2">
                    <div className="font-bold text-white flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-blue-400" />
                      Verify LSPosed Zygisk Status
                    </div>
                    <p className="text-zinc-400">
                      Open Magisk app &gt; Settings &gt; Ensure <strong>Zygisk</strong> is enabled. Reboot your phone if you just turned it on.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Compatible with Magisk v26+, KernelSU v0.7+, and APatch v10.7+</span>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-[#0c0e14] border border-[#202534] p-4 text-xs space-y-2">
                    <div className="font-bold text-white">Allow Unknown Sources</div>
                    <p className="text-zinc-400">
                      When opening <code className="text-blue-400">PokeSphere-v1.0.0-arm64.apk</code>, Android will prompt you to grant installation permission to your file manager or browser.
                    </p>
                  </div>
                  <a
                    href="#download"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:underline"
                  >
                    Go to APK Download Section &rarr;
                  </a>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-[#0c0e14] border border-[#202534] p-4 text-xs space-y-3">
                    <div className="font-bold text-white">Select Pokémon GO Target Package</div>
                    <div className="flex items-center justify-between bg-[#151923] p-2.5 rounded-lg border border-[#242b3b]">
                      <span className="font-mono text-zinc-300">com.nianticlabs.pokemongo</span>
                      <button
                        onClick={copyPackageName}
                        className="text-blue-400 hover:text-blue-300 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        {copiedPkg ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedPkg ? "Copied" : "Copy Name"}</span>
                      </button>
                    </div>
                    <p className="text-zinc-400 leading-relaxed text-[11px]">
                      In LSPosed Manager &gt; Modules &gt; PokeSphere: Toggle ON, check the box next to Pokémon GO in the application list.
                    </p>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-[#0c0e14] border border-[#202534] p-4 text-xs space-y-2">
                    <div className="font-bold text-emerald-400">Ready to Launch!</div>
                    <p className="text-zinc-400 leading-relaxed">
                      Start PokeSphere from your app drawer. Leave all mod features OFF initially. Open Pokémon GO, ensure the game loads to the map, then enable features one by one from the floating PokeSphere overlay or companion app.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Safety Warning */}
            <div className="mt-8 pt-4 border-t border-[#1e2330] flex items-start gap-3 text-xs text-amber-200/90">
              <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Safety Rule: Always test mod features on a spare/burner Pokémon GO account first. Never risk your main account.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
