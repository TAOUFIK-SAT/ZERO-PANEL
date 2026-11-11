/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Download, 
  Copy, 
  Check, 
  Radio, 
  Cpu, 
  Search, 
  X, 
  Sparkles, 
  Palette, 
  Key, 
  Tv, 
  Layers, 
  Wrench, 
  ArrowLeft,
  Play,
  Flame
} from 'lucide-react';
import { ENIGMA_PLUGINS, EnigmaPluginItem } from '../enigmaPluginsData';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSelectPlugin?: (item: EnigmaPluginItem) => void;
  onSelectCategory?: (catId: string) => void;
}

export default function Header({
  searchQuery = '',
  onSearchChange,
  onSelectPlugin,
  onSelectCategory
}: HeaderProps) {
  const [copied, setCopied] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const githubInstallCmd = 'wget -q "--no-check-certificate" https://raw.githubusercontent.com/TAOUFIK-SAT/download-plugins/main/ZERO-PANEL/installer.sh -O - | /bin/sh';

  const copyInstallCmd = () => {
    navigator.clipboard.writeText(githubInstallCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Global Keyboard shortcut (/ or Ctrl+K) to focus top search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setIsFocused(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter top live suggestions
  const liveResults = searchQuery.trim().length > 0 
    ? ENIGMA_PLUGINS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  const handleQuickTagClick = (tag: string, catId?: string) => {
    if (onSearchChange) {
      onSearchChange(tag);
    }
    if (catId && onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  return (
    <header className="bg-[#0c101c]/95 backdrop-blur-md border-b border-[#1f283e] text-white sticky top-0 z-50 select-none shadow-2xl" dir="rtl">
      <div className="max-w-[1450px] mx-auto px-3 sm:px-5 lg:px-6">
        
        {/* Main Header Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-2.5 gap-3">
          
          {/* Right Section (in RTL): Brand Logo & Version */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#131929] border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff] shadow-md shadow-cyan-500/20">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-1.5">
                    <span>متجر</span>
                    <span className="text-[#00e5ff] font-extrabold drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">توفيق</span>
                    <span className="text-gray-400 font-mono text-xs">(TAOUFIK STORE)</span>
                  </h1>
                  <span className="bg-[#182133] border border-cyan-500/30 text-cyan-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                    Py 3.12
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 font-mono">
                  المتجر الرسمي المعتمد لإضافات وسكينات ومحاكيات Enigma2
                </p>
              </div>
            </div>

            {/* Mobile Telnet Button */}
            <div className="lg:hidden flex items-center gap-1.5">
              <button
                onClick={copyInstallCmd}
                className="bg-[#00e5ff] text-black text-[11px] font-extrabold px-2.5 py-1 rounded-lg"
              >
                {copied ? 'تم النسخ!' : 'أمر Telnet'}
              </button>
            </div>
          </div>

          {/* Center Section: Instant Global Search Bar */}
          <div className="relative w-full lg:max-w-xl mx-auto">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setIsFocused(true)}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                placeholder="ابحث فوراً عن إضافة، سكين، أو محاكي (مثال: Oscam, Novaler, MultiStalker)..."
                className="w-full bg-[#0b0f19] border border-[#1f283e] focus:border-[#00e5ff] rounded-xl pl-20 pr-10 py-2 text-xs text-white placeholder-gray-500 transition-all shadow-inner focus:outline-none focus:ring-1 focus:ring-[#00e5ff]/50 font-sans"
              />
              <Search className="w-4 h-4 absolute right-3.5 top-2.5 text-cyan-400 pointer-events-none" />

              {/* Right/Left Indicators */}
              <div className="absolute left-3 top-2 flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                {searchQuery ? (
                  <button
                    onClick={() => onSearchChange && onSearchChange('')}
                    className="text-gray-400 hover:text-white p-0.5 rounded-full hover:bg-gray-800 cursor-pointer"
                    title="مسح البحث"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="hidden sm:inline-block bg-[#182133] border border-gray-700/60 px-1.5 py-0.5 rounded text-gray-400">
                    / أو Ctrl+K
                  </span>
                )}
              </div>
            </div>

            {/* Live Autocomplete Dropdown Popup */}
            {isFocused && searchQuery.trim().length > 0 && (
              <div 
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-1.5 bg-[#131929] border border-cyan-500/40 rounded-xl shadow-2xl p-3 z-50 max-h-96 overflow-y-auto space-y-2 text-xs backdrop-blur-xl animate-fadeIn"
              >
                <div className="flex justify-between items-center text-[11px] text-gray-400 pb-2 border-b border-gray-800">
                  <span className="flex items-center gap-1 text-cyan-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>نتائج البحث الفوري ({liveResults.length})</span>
                  </span>
                  <span className="text-gray-500 font-mono">اضغط على أي إضافة للتثبيت المباشر</span>
                </div>

                {liveResults.length === 0 ? (
                  <div className="py-6 text-center text-gray-400 text-xs">
                    لم يتم العثور على إضافات تطابق &quot;{searchQuery}&quot;... جرب البحث بكلمة أخرى مثل (Oscam, Nitro, AJPanel).
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {liveResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (onSelectPlugin) {
                            onSelectPlugin(item);
                            setIsFocused(false);
                          }
                        }}
                        className="bg-[#0b0f19] hover:bg-[#182133] border border-gray-800 hover:border-cyan-500/40 p-2.5 rounded-xl cursor-pointer transition flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-[#182133] group-hover:bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-gray-700/60">
                            <Terminal className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-white group-hover:text-cyan-300 transition truncate">
                              {item.name}
                            </div>
                            <div className="text-[10px] text-gray-500 font-mono truncate max-w-xs">
                              {item.command}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="bg-gray-800 text-cyan-300 border border-gray-700 text-[10px] px-2 py-0.5 rounded font-mono">
                            {item.categoryName}
                          </span>
                          <button
                            type="button"
                            className="bg-[#00e5ff] hover:bg-cyan-400 text-black px-2.5 py-1 rounded-lg font-bold text-[10px] flex items-center gap-1 transition"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>تثبيت</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Shortcuts in dropdown */}
                <div className="pt-2 border-t border-gray-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-gray-400">تصنيفات سريعة:</span>
                  <div className="flex flex-wrap gap-1">
                    <button 
                      onClick={() => handleQuickTagClick('Oscam', 'softcams')}
                      className="bg-[#0b0f19] hover:bg-gray-800 text-amber-300 px-2 py-0.5 rounded border border-gray-800 text-[10px]"
                    >
                      #المحاكيات
                    </button>
                    <button 
                      onClick={() => handleQuickTagClick('FHD', 'skins')}
                      className="bg-[#0b0f19] hover:bg-gray-800 text-purple-300 px-2 py-0.5 rounded border border-gray-800 text-[10px]"
                    >
                      #السكينات
                    </button>
                    <button 
                      onClick={() => handleQuickTagClick('Stalker', 'iptv')}
                      className="bg-[#0b0f19] hover:bg-gray-800 text-cyan-300 px-2 py-0.5 rounded border border-gray-800 text-[10px]"
                    >
                      #IPTV
                    </button>
                    <button 
                      onClick={() => handleQuickTagClick('Panel', 'panels')}
                      className="bg-[#0b0f19] hover:bg-gray-800 text-emerald-300 px-2 py-0.5 rounded border border-gray-800 text-[10px]"
                    >
                      #البانلات
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Left Section (in RTL): Action Downloads */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={copyInstallCmd}
              title="نسخ أمر تثبيت Telnet المباشر"
              className="bg-[#00e5ff] hover:bg-cyan-400 text-black font-extrabold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  <span>تم نسخ أمر التلنت!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>أمر التثبيت (Telnet)</span>
                </>
              )}
            </button>

            <a
              href="/ZERO-PANEL-GitHub.zip"
              download="TAOUFIK-STORE.zip"
              className="bg-[#10b981] hover:bg-emerald-500 text-white font-extrabold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
              title="تحميل حزمة TAOUFIK-STORE.zip"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل (.zip)</span>
            </a>

            <a
              href="/ZeroSatPanel.ipk"
              download="taoufik-store_4.0_all.ipk"
              className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
              title="تحميل حزمة IPK المباشرة"
            >
              <Download className="w-3.5 h-3.5" />
              <span>حزمة IPK</span>
            </a>
          </div>

        </div>

        {/* Quick Filter Search Pills Row */}
        <div className="flex flex-wrap items-center gap-2 pb-2 text-[11px] text-gray-400 overflow-x-auto">
          <span className="font-bold text-gray-500 shrink-0 flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" />
            <span>بحث سريع:</span>
          </span>
          <button
            onClick={() => handleQuickTagClick('', 'all')}
            className={`px-2.5 py-0.5 rounded-md border transition cursor-pointer font-bold ${
              !searchQuery ? 'bg-cyan-500/20 text-[#00e5ff] border-cyan-500/40' : 'bg-[#0b0f19] text-gray-300 border-gray-800 hover:bg-gray-800'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => handleQuickTagClick('سكين', 'skins')}
            className="bg-[#0b0f19] hover:bg-purple-950/40 text-purple-300 border border-gray-800 hover:border-purple-500/40 px-2.5 py-0.5 rounded-md cursor-pointer transition flex items-center gap-1"
          >
            <Palette className="w-3 h-3 text-purple-400" />
            <span>السكينات (Skins FHD)</span>
          </button>
          <button
            onClick={() => handleQuickTagClick('محاكي', 'softcams')}
            className="bg-[#0b0f19] hover:bg-amber-950/40 text-amber-300 border border-gray-800 hover:border-amber-500/40 px-2.5 py-0.5 rounded-md cursor-pointer transition flex items-center gap-1"
          >
            <Key className="w-3 h-3 text-amber-400" />
            <span>المحاكيات (Softcams)</span>
          </button>
          <button
            onClick={() => handleQuickTagClick('IPTV', 'iptv')}
            className="bg-[#0b0f19] hover:bg-cyan-950/40 text-cyan-300 border border-gray-800 hover:border-cyan-500/40 px-2.5 py-0.5 rounded-md cursor-pointer transition flex items-center gap-1"
          >
            <Tv className="w-3 h-3 text-cyan-400" />
            <span>الميديا والـ IPTV</span>
          </button>
          <button
            onClick={() => handleQuickTagClick('Panel', 'panels')}
            className="bg-[#0b0f19] hover:bg-emerald-950/40 text-emerald-300 border border-gray-800 hover:border-emerald-500/40 px-2.5 py-0.5 rounded-md cursor-pointer transition flex items-center gap-1"
          >
            <Layers className="w-3 h-3 text-emerald-400" />
            <span>البانلات (Panels)</span>
          </button>
          <button
            onClick={() => handleQuickTagClick('بلجن', 'plugins')}
            className="bg-[#0b0f19] hover:bg-blue-950/40 text-blue-300 border border-gray-800 hover:border-blue-500/40 px-2.5 py-0.5 rounded-md cursor-pointer transition flex items-center gap-1"
          >
            <Wrench className="w-3 h-3 text-blue-400" />
            <span>البلجنات العامة (Plugins)</span>
          </button>
        </div>

      </div>
    </header>
  );
}
