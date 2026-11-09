/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Terminal, Download, Copy, Check, Radio, Cpu, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [copied, setCopied] = useState(false);
  
  const getInstallCmd = () => {
    const origin = typeof window !== 'undefined' && window.location.origin 
      ? window.location.origin 
      : 'https://ais-dev-3tamtjyvumhchbwppdh6ny-403742694107.europe-west3.run.app';
    return `wget -q "--no-check-certificate" ${origin}/installer.sh -O - | /bin/sh`;
  };

  const copyInstallCmd = () => {
    navigator.clipboard.writeText(getInstallCmd());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-cyan-500/20 text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3.5 gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center ring-2 ring-cyan-400/30">
                <Terminal className="w-6 h-6 text-slate-950 font-black animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black font-sans tracking-tight text-white flex items-center gap-1.5">
                    <span>ZERO-SAT</span>
                    <span className="text-cyan-400 font-extrabold px-1.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-sm">PRO</span>
                  </h1>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Python 3.12 Ready</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  لوحة تحكم وإضافات أجهزة الإنيغما 2 • متوافقة مع بايثون 3.12 و 3.11 و 2.7
                </p>
              </div>
            </div>

            {/* Mobile quick badge */}
            <div className="sm:hidden flex items-center gap-1 text-[11px] text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-lg">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>259+ إضافة</span>
            </div>
          </div>

          {/* Receiver Badges & Fast Actions */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-xl">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono text-slate-300">OpenATV 7.4/7.5 • Egami • OpenPLi</span>
            </div>

            <button
              onClick={copyInstallCmd}
              title="نسخ أمر تثبيت Telnet المباشر لـ Python 3.12"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 transition-all cursor-pointer shadow-sm hover:border-cyan-500/50"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-sans font-bold">تم نسخ أمر Telnet!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-sans">أمر Telnet السريع</span>
                </>
              )}
            </button>

            <a
              href="/ZeroSatPanel.ipk"
              download="enigma2-plugin-extensions-zerosatpanel_4.0_all.ipk"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              title="تحميل حزمة IPK المباشرة لتثبيتها عبر opkg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>حزمة IPK 📦</span>
            </a>

            <a
              href="/plugin.py"
              download="plugin.py"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>plugin.py</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
