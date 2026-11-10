/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Terminal, Download, Copy, Check, Radio, Cpu, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [copied, setCopied] = useState(false);
  
  const githubInstallCmd = 'wget -q "--no-check-certificate" https://raw.githubusercontent.com/TAOUFIK-SAT/download-plugins/main/ZERO-PANEL/installer.sh -O - | /bin/sh';

  const copyInstallCmd = () => {
    navigator.clipboard.writeText(githubInstallCmd);
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
              <div className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center ring-2 ring-cyan-400/30">
                <Terminal className="w-6 h-6 text-slate-950 font-black animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black font-sans tracking-tight text-white flex items-center gap-1.5">
                    <span className="text-white">متجر</span>
                    <span className="text-[#00e5ff] font-extrabold">توفيق</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 font-mono text-cyan-300">TAOUFIK STORE</span>
                  </h1>
                  <span className="hidden md:flex bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Enigma2 Python 3.12 Ready</span>
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5">
                  المتجر الرسمي المعتمد لأجهزة الإنيجما 2 • تشغيل محلي وسحابي
                </p>
              </div>
            </div>

            {/* Mobile quick badge */}
            <div className="sm:hidden flex items-center gap-1 text-[11px] text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-lg">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>TAOUFIK STORE</span>
            </div>
          </div>

          {/* Receiver Badges & Fast Actions */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-xl font-mono">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>TAOUFIK-SAT / Official Repo</span>
            </div>

            <button
              onClick={copyInstallCmd}
              title="نسخ أمر تثبيت GitHub المباشر عبر Telnet"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-200 transition-all cursor-pointer shadow-sm hover:border-cyan-500/50"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-sans font-bold">تم نسخ أمر GitHub!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-sans">أمر GitHub السريع</span>
                </>
              )}
            </button>

            <a
              href="/ZERO-PANEL-GitHub.zip"
              download="ZERO-PANEL-GitHub.zip"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-black transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              title="تحميل حزمة ملفات GitHub الكاملة لرفعها إلى مستودعك"
            >
              <Download className="w-3.5 h-3.5" />
              <span>حزمة GitHub (ZIP) 📦</span>
            </a>

            <a
              href="/ZeroSatPanel.ipk"
              download="enigma2-plugin-extensions-zerosatpanel_4.0_all.ipk"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>حزمة IPK</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
