/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Tv, Sparkles, Newspaper, Info, Search, ListPlus, Download, Terminal } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ currentTab, setCurrentTab, searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="bg-slate-900 border-b border-amber-500/20 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-amber-500 to-amber-600 p-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center animate-pulse">
              <Tv className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black font-sans tracking-tight text-white animate-pulse">
                  TAOUFIK <span className="text-amber-500">TV</span>
                </h1>
                <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                  مباشر
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">النسخة الذهبية بث فائق الدقة الحصري</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="ابحث عن مباراة أو قناة مفضلة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl py-2 px-10 border border-slate-700 focus:outline-none focus:border-amber-500 transition-all text-right duration-200"
              dir="rtl"
            />
          </div>
        </div>

        {/* Global Tab Navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto select-none no-scrollbar pb-2" dir="rtl">
          <button
            id="tab-channels"
            onClick={() => setCurrentTab('channels')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              currentTab === 'channels'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>بث القنوات</span>
          </button>

          <button
            id="tab-matches"
            onClick={() => setCurrentTab('matches')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              currentTab === 'matches'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>مباريات اليوم</span>
          </button>

          <button
            id="tab-ai-analyst"
            onClick={() => setCurrentTab('ai')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              currentTab === 'ai'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse group-hover:text-slate-950" />
            <span>محلل الذكاء الاصطناعي</span>
          </button>

          <button
            id="tab-news"
            onClick={() => setCurrentTab('news')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              currentTab === 'news'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>أخبار الرياضة</span>
          </button>

          <button
            id="tab-dreamsat"
            onClick={() => setCurrentTab('dreamsat')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg font-black transition-all shrink-0 cursor-pointer ${
              currentTab === 'dreamsat'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/50'
                : 'text-cyan-400 hover:text-white hover:bg-cyan-500/10 border border-cyan-500/30'
            }`}
          >
            <Terminal className="w-4 h-4 animate-pulse" />
            <span>بانل إنيغما 2 (DreamSat Pro) 🛰️</span>
          </button>

          <button
            id="tab-m3u-reader"
            onClick={() => setCurrentTab('m3u-reader')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              currentTab === 'm3u-reader'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ListPlus className="w-4 h-4" />
            <span>قارئ أسطر M3U</span>
          </button>

          <button
            id="tab-install"
            onClick={() => setCurrentTab('install')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              currentTab === 'install'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'text-amber-500 border border-amber-500/20 hover:text-white hover:bg-amber-500/10'
            }`}
          >
            <Download id="icon-tab-install" className={`w-4 h-4 animate-bounce ${currentTab === 'install' ? 'text-slate-950' : 'text-emerald-400'}`} />
            <span>تحميل التطبيق 📱</span>
          </button>

          <button
            id="tab-about"
            onClick={() => setCurrentTab('about')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              currentTab === 'about'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>حول التطبيق</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
