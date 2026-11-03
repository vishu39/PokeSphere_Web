import React, { useState, useEffect, useRef } from 'react';
import { X, Download, CheckCircle2, Copy, Check, AlertTriangle, ShieldCheck, FileCode } from 'lucide-react';
import { CURRENT_RELEASE } from '../data/downloadData';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      setDownloadStarted(false);
      hasTriggeredRef.current = false;

      // Automatically trigger ONE single download after 600ms
      const timer = setTimeout(() => {
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          triggerSingleDownload();
        }
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerSingleDownload = () => {
    setDownloadStarted(true);
    const link = document.createElement('a');
    link.href = CURRENT_RELEASE.downloadUrl;
    link.download = CURRENT_RELEASE.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyHash = () => {
    navigator.clipboard.writeText(CURRENT_RELEASE.sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-2xl border border-[#2d3342] bg-[#12151d] p-6 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-xl p-1.5 text-zinc-400 hover:bg-[#1f2430] hover:text-white transition cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Download className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Downloading PokeSphere</h3>
            <p className="text-xs text-zinc-400 font-mono">{CURRENT_RELEASE.fileName} • {CURRENT_RELEASE.fileSize}</p>
          </div>
        </div>

        {/* Download Status Card */}
        <div className="mb-6 rounded-xl border border-[#232836] bg-[#0c0e14] p-4">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-zinc-300">
              {downloadStarted ? "Download Started in Your Browser" : "Preparing Official Release Package..."}
            </span>
            <span className="text-blue-400 font-mono">
              {downloadStarted ? "Ready" : "Starting..."}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="h-4 w-4" />
              <span>{downloadStarted ? "APK transfer initiated" : "Ready to install on Android"}</span>
            </div>
            <button
              type="button"
              onClick={triggerSingleDownload}
              className="text-xs text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
            >
              Click here if download didn't start
            </button>
          </div>
        </div>

        {/* SHA-256 Checksum */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5 text-zinc-400" />
              Verified SHA-256 Hash
            </span>
            <button
              onClick={copyHash}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs transition cursor-pointer"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied!" : "Copy Hash"}
            </button>
          </div>
          <div className="rounded-lg bg-[#0a0c12] border border-[#222735] p-2.5 font-mono text-[11px] text-zinc-300 break-all select-all">
            {CURRENT_RELEASE.sha256}
          </div>
        </div>

        {/* Safety Note */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 mb-6 text-xs text-amber-200/90 flex gap-3 items-start">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-300">Target Spare Accounts Only</p>
            <p className="text-[11px] leading-relaxed opacity-90">
              PokeSphere is an educational research tool for Android hooking. Never use your primary account. Keep Zygisk / Magisk Hide configured.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={triggerSingleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition active:scale-95 cursor-pointer"
          >
            <Download className="h-4 w-4" /> Download APK ({CURRENT_RELEASE.fileSize})
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#2a303f] bg-[#161a23] hover:bg-[#1d222e] px-4 py-2.5 text-sm font-semibold text-zinc-300 transition cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="mt-4 text-center text-[11px] text-zinc-500 flex items-center justify-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Package: {CURRENT_RELEASE.applicationId} • ARM64 Signed Release</span>
        </div>
      </div>
    </div>
  );
};
