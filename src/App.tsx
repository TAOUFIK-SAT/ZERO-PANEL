/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Header from './components/Header';
import DreamSatPanelViewer from './components/DreamSatPanelViewer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-all duration-300 antialiased selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top ZERO-SAT PRO Header */}
      <Header />

      {/* Main ZERO-SAT PRO Panel */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DreamSatPanelViewer />
      </main>

      {/* Footer System Info */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 py-4 select-none shrink-0" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs space-y-1.5">
          <p>© {new Date().getFullYear()} متجر توفيق بايتون 3 (TAOUFIK STORE) - المتجر الرسمي المعتمد لأجهزة الإنيجما 2 (Python 3 & Python 2).</p>
          <p className="text-[10px] text-slate-600 font-mono">VU+ • Dreambox • Octagon • Zgemma • GigaBlue • Novaler • OpenATV • OpenPLi • Egami • BlackHole</p>
        </div>
      </footer>

    </div>
  );
}

