import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DownloadSection } from './components/DownloadSection';
import { CompatibilityChecker } from './components/CompatibilityChecker';
import { InGameSimulator } from './components/InGameSimulator';
import { Features } from './components/Features';
import { InstallGuide } from './components/InstallGuide';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';

export const App: React.FC = () => {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0d11] text-[#f2f3f5] flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Navigation bar with mobile drawer */}
      <Navbar onOpenDownload={() => setDownloadModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenDownload={() => setDownloadModalOpen(true)} />

        {/* Dedicated App Download Section */}
        <DownloadSection onOpenDownload={() => setDownloadModalOpen(true)} />

        {/* Interactive Device Compatibility Checker */}
        <CompatibilityChecker />

        {/* Live In-Game Overlay Simulator */}
        <InGameSimulator />

        {/* Mod Features Grid */}
        <Features />

        {/* Step-by-Step Installation Guide */}
        <InstallGuide />

        {/* FAQ Accordion */}
        <Faq />
      </main>

      {/* Footer */}
      <Footer onOpenDownload={() => setDownloadModalOpen(true)} />

      {/* Interactive Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
};

export default App;
