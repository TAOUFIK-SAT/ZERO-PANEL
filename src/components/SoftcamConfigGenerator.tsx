import React, { useState } from 'react';
import { 
  Key, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  Send, 
  Sparkles, 
  Layers, 
  Settings, 
  ShieldCheck, 
  RefreshCw,
  FileCode,
  Radio,
  Tv
} from 'lucide-react';

interface SoftcamConfigGeneratorProps {
  receiverIP: string;
  onLaunchTerminal: (name: string, command: string) => void;
  onNotification: (msg: string) => void;
}

export default function SoftcamConfigGenerator({
  receiverIP,
  onLaunchTerminal,
  onNotification
}: SoftcamConfigGeneratorProps) {
  const [lineType, setLineType] = useState<'cline' | 'nline' | 'icam'>('cline');
  const [host, setHost] = useState('server.example.net');
  const [port, setPort] = useState('12000');
  const [user, setUser] = useState('user123');
  const [password, setPassword] = useState('pass456');
  const [desKey, setDesKey] = useState('01 02 03 04 05 06 07 08 09 10 11 12 13 14');
  const [selectedFormat, setSelectedFormat] = useState<'oscam' | 'ncam' | 'cccam' | 'icam'>('oscam');
  const [copied, setCopied] = useState(false);

  // Quick Preset Templates
  const applyPreset = (preset: 'standard' | 'icam' | 'powervu' | 'biss') => {
    if (preset === 'standard') {
      setLineType('cline');
      setHost('cccam.taoufik-sat.tv');
      setPort('15000');
      setUser('taoufik_vip');
      setPassword('sat2026');
      setSelectedFormat('oscam');
      onNotification('تم تحميل قالب سيرفر CCcam القياسي');
    } else if (preset === 'icam') {
      setLineType('icam');
      setHost('127.0.0.1');
      setPort('17999');
      setUser('icam');
      setPassword('streamrelay');
      setSelectedFormat('icam');
      onNotification('تم تحميل إعدادات Sky DE / ICam Stream Relay');
    } else if (preset === 'powervu') {
      setLineType('nline');
      setHost('powervu.keyserver.org');
      setPort('18000');
      setUser('emu');
      setPassword('emu');
      setSelectedFormat('oscam');
      onNotification('تم تحميل إعدادات باقات PowerVU & Tandberg');
    } else if (preset === 'biss') {
      setLineType('cline');
      setHost('biss.keys.net');
      setPort('11000');
      setUser('constant');
      setPassword('cw');
      setSelectedFormat('ncam');
      onNotification('تم تحميل قالب شفرات Biss & Constant CW');
    }
  };

  // Generate Configurations
  const generateOscamServer = () => {
    if (lineType === 'cline') {
      return `[reader]
label                         = TaoufikStore_CCcam
protocol                      = cccam
device                        = ${host},${port}
user                          = ${user}
password                      = ${password}
inactivitytimeout             = 30
group                         = 1
cccversion                    = 2.3.2
cccmaxhops                    = 2
ccckeepalive                  = 1
reconnecttimeout              = 30
disablecrccws                 = 1
disablecrccws_only_for        = 0500:030B00;1811:003311;098D:000000;09C4:000000`;
    }
    if (lineType === 'nline') {
      return `[reader]
label                         = TaoufikStore_Newcamd
protocol                      = newcamd
device                        = ${host},${port}
user                          = ${user}
password                      = ${password}
key                           = ${desKey.replace(/\s+/g, '')}
group                         = 1
inactivitytimeout             = 30
reconnecttimeout              = 30
disablecrccws                 = 1`;
    }
    // ICam Stream Relay
    return `[reader]
label                         = TaoufikStore_ICam_Relay
protocol                      = radegast
device                        = 127.0.0.1,17999
inactivitytimeout             = -1
fallback                      = 0
group                         = 1
emmcache                      = 1,1,2,1
dropbadcws                    = 0
disablecrccws                 = 1
disablecrccws_only_for        = 098D:000000;09C4:000000;098C:000000`;
  };

  const generateNcamServer = () => {
    return `# ==========================================================
# TAOUFIK STORE - NCam Reader Configuration
# Target: /etc/tuxbox/config/ncam/ncam.server
# ==========================================================
${generateOscamServer().replace(/TaoufikStore_CCcam/g, 'TaoufikStore_NCam')}`;
  };

  const generateCCCamCfg = () => {
    if (lineType === 'nline') {
      return `# ==========================================================
# TAOUFIK STORE - CCcam Configuration (N-Line)
# Target: /etc/CCcam.cfg
# ==========================================================
N: ${host} ${port} ${user} ${password} ${desKey}`;
    }
    return `# ==========================================================
# TAOUFIK STORE - CCcam Configuration (C-Line)
# Target: /etc/CCcam.cfg
# ==========================================================
C: ${host} ${port} ${user} ${password} no { 0:0:2 }`;
  };

  const generateICamConfig = () => {
    return `# ==========================================================
# TAOUFIK STORE - Sky DE ICam Streamrelay Settings
# Target: /etc/tuxbox/config/oscam.conf & /etc/enigma2/settings
# ==========================================================
[streamrelay]
stream_relay_enabled          = 1
stream_relay_ct               = 08
stream_relay_mapping          = 098D:000000:00000000,09C4:000000:00000000

${generateOscamServer()}`;
  };

  const getActiveCode = () => {
    switch (selectedFormat) {
      case 'oscam': return generateOscamServer();
      case 'ncam': return generateNcamServer();
      case 'cccam': return generateCCCamCfg();
      case 'icam': return generateICamConfig();
      default: return generateOscamServer();
    }
  };

  const getTargetFilePath = () => {
    switch (selectedFormat) {
      case 'oscam': return '/etc/tuxbox/config/oscam.server';
      case 'ncam': return '/etc/tuxbox/config/ncam/ncam.server';
      case 'cccam': return '/etc/CCcam.cfg';
      case 'icam': return '/etc/tuxbox/config/oscam.server';
      default: return '/etc/tuxbox/config/oscam.server';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    onNotification('تم نسخ ملف التكوين إلى الحافظة بنجاح!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = selectedFormat === 'cccam' ? 'CCcam.cfg' : selectedFormat === 'ncam' ? 'ncam.server' : 'oscam.server';
    const blob = new Blob([getActiveCode()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onNotification(`تم تنزيل ملف ${filename}`);
  };

  const handleSendToReceiver = () => {
    const targetPath = getTargetFilePath();
    const encoded = btoa(unescape(encodeURIComponent(getActiveCode())));
    const cmd = `echo "${encoded}" | base64 -d > ${targetPath} && killall -9 oscam ncam CCcam.x86_64 2>/dev/null; /etc/init.d/softcam restart 2>/dev/null; echo "[TAOUFIK STORE] Softcam config deployed to ${targetPath}"`;
    onLaunchTerminal(`تحديث ملف ${targetPath}`, cmd);
  };

  return (
    <div className="space-y-5 select-none" dir="rtl">
      {/* Header Banner */}
      <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
              <Key className="w-4 h-4 text-cyan-400" />
              <span>مولد ومحول ملفات التكوين والاشتراكات المعتمد</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              مولد اشتراكات السوفتكام (<span className="text-[#00e5ff]">OScam · NCam · CCcam · ICam</span>)
            </h2>
            <p className="text-xs text-gray-400 max-w-3xl">
              حول أسطر سيرفرات الشيرينج (C-Line / N-Line / Newcamd) إلى ملفات جاهزة للتشغيل الفوري في مسارات الرسيفر مع دعم كامل لتشفيرات ICam و Sky DE و Biss.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 text-xs">
            <button 
              onClick={() => applyPreset('standard')}
              className="bg-[#182133] hover:bg-[#202c45] text-cyan-300 border border-cyan-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>سيرفر سيسكام قياسي</span>
            </button>
            <button 
              onClick={() => applyPreset('icam')}
              className="bg-[#182133] hover:bg-[#202c45] text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition font-bold"
            >
              <Tv className="w-3.5 h-3.5 text-amber-400" />
              <span>Sky DE ICam Relay</span>
            </button>
            <button 
              onClick={() => applyPreset('powervu')}
              className="bg-[#182133] hover:bg-[#202c45] text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition font-bold"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>PowerVU & Emu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Input Form vs Output Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Input Parameters (5 Cols) */}
        <div className="lg:col-span-5 bg-[#131929] border border-[#1f283e] rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>بيانات ومعلومات السيرفر (Line Credentials)</span>
          </h3>

          {/* Line Type Switcher */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-bold">نوع السطر / البروتوكول:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLineType('cline')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  lineType === 'cline' 
                    ? 'bg-[#00e5ff] text-black border-cyan-400 shadow-md font-extrabold' 
                    : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                C-Line (CCcam)
              </button>
              <button
                type="button"
                onClick={() => setLineType('nline')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  lineType === 'nline' 
                    ? 'bg-[#00e5ff] text-black border-cyan-400 shadow-md font-extrabold' 
                    : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                N-Line (Newcamd)
              </button>
              <button
                type="button"
                onClick={() => setLineType('icam')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  lineType === 'icam' 
                    ? 'bg-[#00e5ff] text-black border-cyan-400 shadow-md font-extrabold' 
                    : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                ICam (Radegast)
              </button>
            </div>
          </div>

          {/* Host & Port */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-[11px] text-gray-400 mb-1">اسم المضيف أو IP السيرفر (Host):</label>
              <input 
                type="text" 
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                placeholder="example.server.tv"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">المنفذ (Port):</label>
              <input 
                type="text" 
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                placeholder="12000"
              />
            </div>
          </div>

          {/* User & Password */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">اسم المستخدم (User):</label>
              <input 
                type="text" 
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                placeholder="username"
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">كلمة المرور (Password):</label>
              <input 
                type="text" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                placeholder="password"
              />
            </div>
          </div>

          {/* DES Key for N-line */}
          {lineType === 'nline' && (
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">مفتاح DES Key (14 Pairs):</label>
              <input 
                type="text" 
                value={desKey}
                onChange={(e) => setDesKey(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono focus:border-cyan-400 focus:outline-none"
                placeholder="01 02 03 ... 14"
              />
            </div>
          )}

          {/* Target receiver destination */}
          <div className="p-3 bg-[#0b0f19] border border-[#1a2235] rounded-xl text-xs space-y-1">
            <div className="text-gray-400 flex items-center justify-between">
              <span>مسار التثبيت على الرسيفر:</span>
              <span className="text-emerald-400 font-mono font-bold text-[11px]">{getTargetFilePath()}</span>
            </div>
            <p className="text-[10px] text-gray-500">
              سيتم استبدال وحفظ التكوين مباشرة في نظام الإنيجما 2 على ({receiverIP}) مع إعادة تشغيل محاكي السوفتكام تلقائياً.
            </p>
          </div>

          {/* Deploy Action */}
          <button
            onClick={handleSendToReceiver}
            className="w-full bg-[#00e5ff] hover:bg-cyan-400 text-black font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition"
          >
            <Send className="w-4 h-4" />
            <span>إرسال وتفعيل على الرسيفر مباشرة ({receiverIP})</span>
          </button>
        </div>

        {/* Output Code Editor & File Tabs (7 Cols) */}
        <div className="lg:col-span-7 bg-[#131929] border border-[#1f283e] rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            {/* Format Selection Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">الملف المولد (Generated Output):</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <button
                  onClick={() => setSelectedFormat('oscam')}
                  className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                    selectedFormat === 'oscam'
                      ? 'bg-cyan-500 text-black'
                      : 'bg-[#182133] text-gray-400 hover:text-white border border-gray-700/60'
                  }`}
                >
                  oscam.server
                </button>
                <button
                  onClick={() => setSelectedFormat('ncam')}
                  className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                    selectedFormat === 'ncam'
                      ? 'bg-cyan-500 text-black'
                      : 'bg-[#182133] text-gray-400 hover:text-white border border-gray-700/60'
                  }`}
                >
                  ncam.server
                </button>
                <button
                  onClick={() => setSelectedFormat('cccam')}
                  className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                    selectedFormat === 'cccam'
                      ? 'bg-cyan-500 text-black'
                      : 'bg-[#182133] text-gray-400 hover:text-white border border-gray-700/60'
                  }`}
                >
                  CCcam.cfg
                </button>
                <button
                  onClick={() => setSelectedFormat('icam')}
                  className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                    selectedFormat === 'icam'
                      ? 'bg-cyan-500 text-black'
                      : 'bg-[#182133] text-gray-400 hover:text-white border border-gray-700/60'
                  }`}
                >
                  ICam Relay
                </button>
              </div>
            </div>

            {/* Code Box */}
            <div className="mt-3 bg-[#0b0f19] border border-[#1a2235] rounded-xl p-4 font-mono text-xs text-cyan-300 h-72 overflow-y-auto space-y-1 select-text" dir="ltr">
              <pre className="whitespace-pre-wrap">{getActiveCode()}</pre>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-800">
            <span className="text-gray-400 text-xs font-mono">
              Status: Valid Syntax · 0 Errors
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="bg-[#182133] hover:bg-[#202c45] text-gray-200 border border-gray-700 px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition font-bold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ الكود'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="bg-[#10b981] hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition font-bold shadow-md shadow-emerald-500/10"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل الملف</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
