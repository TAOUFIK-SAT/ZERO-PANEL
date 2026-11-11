/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import DreamSatPanelViewer from './components/DreamSatPanelViewer';
import { EnigmaPluginItem } from './enigmaPluginsData';

export default function App() {
  const [globalSearch, setGlobalSearch] = useState('');
  const [headerCategory, setHeaderCategory] = useState<string | undefined>(undefined);
  const [selectedPluginToInstall, setSelectedPluginToInstall] = useState<EnigmaPluginItem | null>(null);

  const handleSelectCategory = (catId: string) => {
    setHeaderCategory(catId);
    // Smooth scroll down to main content
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSelectPlugin = (item: EnigmaPluginItem) => {
    setSelectedPluginToInstall(item);
  };

  return (
    <div className="min-h-screen bg-[#0c101c] text-gray-200 flex flex-col font-sans transition-all duration-300 antialiased selection:bg-[#00e5ff] selection:text-black">
      
      {/* Top TAOUFIK STORE Header with Instant Search */}
      <Header 
        searchQuery={globalSearch}
        onSearchChange={setGlobalSearch}
        onSelectPlugin={handleSelectPlugin}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main TAOUFIK STORE Panel */}
      <main className="flex-grow max-w-[1450px] w-full mx-auto px-3 sm:px-5 lg:px-6 py-5">
        <DreamSatPanelViewer 
          externalSearch={globalSearch}
          onSearchChange={setGlobalSearch}
          selectedCategoryFromHeader={headerCategory}
          selectedPluginToInstall={selectedPluginToInstall}
          onClearSelectedPlugin={() => setSelectedPluginToInstall(null)}
        />
      </main>

      {/* Footer System Info */}
      <footer className="bg-[#0b0f19] border-t border-[#1a2235] text-gray-500 py-4 select-none shrink-0" dir="rtl">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs space-y-1.5">
          <p>© {new Date().getFullYear()} متجر توفيق بايتون 3 (TAOUFIK STORE) - المتجر الرسمي المعتمد لأجهزة الإنيجما 2 (Python 3 & Python 2).</p>
          <p className="text-[10px] text-gray-600 font-mono">VU+ • Dreambox • Octagon • Zgemma • GigaBlue • Novaler • OpenATV • OpenPLi • Egami • BlackHole</p>
        </div>
      </footer>

    </div>
  );
}

