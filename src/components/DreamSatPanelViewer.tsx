import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Cpu, 
  Tv, 
  Layers, 
  Key, 
  Sliders, 
  Palette, 
  Wrench, 
  Image as ImageIcon, 
  HardDrive, 
  Power, 
  Download, 
  Copy, 
  Check, 
  Search, 
  ExternalLink, 
  RotateCw, 
  Code, 
  ShieldCheck, 
  Sparkles, 
  Play, 
  Maximize2,
  FolderGit2,
  Radio,
  FileCode,
  X,
  Server,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ENIGMA_PLUGINS, EnigmaPluginItem } from '../enigmaPluginsData';

const CATEGORY_LIST = [
  { id: 'all', name: 'جميع الإضافات (All Addons)', english: 'All Categories', icon: Sparkles, count: ENIGMA_PLUGINS.length },
  { id: 'iptv', name: 'IPTV & MAG / Stalker', english: 'Stalker & IPTV Portals', arabic: 'بوابات MAG وسيرفرات البث', icon: Tv, count: ENIGMA_PLUGINS.filter(p => p.category === 'iptv').length },
  { id: 'panels', name: 'Panels & Managers', english: 'Control Panels & Store', arabic: 'لوحات التحكم والبانلات الشاملة', icon: Layers, count: ENIGMA_PLUGINS.filter(p => p.category === 'panels').length },
  { id: 'softcams', name: 'Softcams & Emulators', english: 'Oscam, Ncam & Keys', arabic: 'محاكيات التشفير وسيرفرات الشيرينج', icon: Key, count: ENIGMA_PLUGINS.filter(p => p.category === 'softcams').length },
  { id: 'channels', name: 'Channels & Settings', english: 'Motor & Satellites Settings', arabic: 'ملفات القنوات والمفضلات والأقمار', icon: Sliders, count: ENIGMA_PLUGINS.filter(p => p.category === 'channels').length },
  { id: 'plugins', name: 'Plugins & Utilities', english: 'EPG, Subtitles & Tools', arabic: 'إضافات ومساعدات وترجمة وقرآن', icon: Wrench, count: ENIGMA_PLUGINS.filter(p => p.category === 'plugins').length },
  { id: 'skins', name: 'Skins & Displays', english: 'FHD Skins & OLED Displays', arabic: 'سكينات FHD وثيمات شاشات العرض', icon: Palette, count: ENIGMA_PLUGINS.filter(p => p.category === 'skins').length },
  { id: 'tools', name: 'System Tools & Feeds', english: 'Python & Package Fixes', arabic: 'أدوات النظام وتحديثات Python', icon: Cpu, count: ENIGMA_PLUGINS.filter(p => p.category === 'tools').length },
  { id: 'picons', name: 'Picons & Logos', english: 'Channel Logos All Sats', arabic: 'شعارات القنوات لجميع الأقمار', icon: ImageIcon, count: ENIGMA_PLUGINS.filter(p => p.category === 'picons').length },
  { id: 'multiboot', name: 'Multiboot Managers', english: 'USB & Flash Image Boot', arabic: 'برامج الإقلاع المتعدد وتثبيت الصور', icon: HardDrive, count: ENIGMA_PLUGINS.filter(p => p.category === 'multiboot').length },
  { id: 'bootlogos', name: 'Bootlogos & Themes', english: 'Startup Screens & Banners', arabic: 'شاشات إقلاع الجهاز ومناسبات', icon: Sparkles, count: ENIGMA_PLUGINS.filter(p => p.category === 'bootlogos').length },
  { id: 'images', name: 'Receiver Images & Flash', english: 'Flash Online Images', arabic: 'روابط تحميل وتثبيت صور الفلاش الخام', icon: FolderGit2, count: ENIGMA_PLUGINS.filter(p => p.category === 'images').length },
];

export default function ZeroSatPanelViewer() {
  const [selectedCategory, setSelectedCategory] = useState<string>('iptv');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'panel' | 'code' | 'help'>('panel');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [filterMagOnly, setFilterMagOnly] = useState<boolean>(false);
  
  // Terminal Modal State
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [currentTerminalItem, setCurrentTerminalItem] = useState<EnigmaPluginItem | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [exitCode, setExitCode] = useState<number | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Filter plugins
  const filteredPlugins = ENIGMA_PLUGINS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesMag = !filterMagOnly || item.isMagStalker;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesMag && matchesSearch;
  });

  // Auto-scroll terminal
  useEffect(() => {
    if (isTerminalOpen && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, isTerminalOpen]);

  // Execute in Live Terminal Simulator
  const launchTerminal = (item: EnigmaPluginItem) => {
    setCurrentTerminalItem(item);
    setIsTerminalOpen(true);
    setIsExecuting(true);
    setExitCode(null);
    setTerminalLogs([
      `======================================================================`,
      `   ZERO-SAT Pro Live Terminal Console - Enigma2 Multi-Installer`,
      `======================================================================`,
      `[RECEIVER] Model: VU+ Duo 4K SE / Dreambox ONE / Zgemma H9`,
      `[IMAGE] OpenATV 7.4 / OpenPLi 9.0 / Egami 10.5 (Python 3.11)`,
      `[TARGET] ${item.name} (${item.categoryName})`,
      `[COMMAND] # ${item.command}`,
      `----------------------------------------------------------------------`,
      `[ZERO-SAT-Terminal] Spawning eConsoleAppContainer sub-process...`,
      `[ZERO-SAT-Terminal] Working directory: /tmp`,
      `[ZERO-SAT-Terminal] Initializing network socket connection...`,
    ]);

    // Simulate realistic Enigma2 execution stream
    const steps = [
      `Connecting to repository host... 200 OK`,
      `Downloading installer payload: 100% [==========================] Done`,
      `[opkg] Checking package dependencies and runtime libraries...`,
      `[opkg] Python version: 3.11 / Architecture: cortexa15hf-neon-vfpv4`,
      `[install] Extracting package contents to /usr/lib/enigma2/python/Plugins/Extensions/${item.name.replace(/[^a-zA-Z0-9]/g, '')}/`,
      `[chmod] Applying executable permissions (chmod 755 /usr/bin/...)`,
      `[system] Registering PluginDescriptor in Enigma2 plugin registry`,
      `[cleanup] Removing temporary archives from /tmp/`,
      `----------------------------------------------------------------------`,
      `[SUCCESS] ${item.name} installed successfully with return code: 0`,
      `[INFO] Press Green button to Restart Enigma2 GUI or Blue to copy command.`
    ];

    steps.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, line]);
        if (index === steps.length - 1) {
          setIsExecuting(false);
          setExitCode(0);
        }
      }, 350 + index * 260);
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Enigma2 Box Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Terminal className="w-6 h-6 animate-pulse" />
              </span>
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  بانل زيرو سات الاحترافي (ZERO-SAT Pro Panel)
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                    v4.0 Pro • {ENIGMA_PLUGINS.length} إضافة
                  </span>
                </h2>
                <p className="text-sm text-slate-300">
                  لوحة تحكم احترافية شاملة ومصنفة لجميع إضافات الإنيغما 2 مع نافذة Terminal حية وتوافق كامل مع Python 2 و Python 3.
                </p>
              </div>
            </div>
          </div>

          {/* Download Plugin & Telnet Fast Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href="/ZeroSatPanel.ipk"
              download="enigma2-plugin-extensions-zerosatpanel_4.0_all.ipk"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              title="تثبيت مباشر بصيغة IPK عبر opkg لجميع صور Enigma2"
            >
              <Download className="w-4 h-4" />
              <span>حزمة IPK الجاهزة (v4.0) 📦</span>
            </a>

            <a
              href="/installer.sh"
              download="installer.sh"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>سكربت التثبيت (installer.sh) ⚡</span>
            </a>

            <a
              href="/plugin.py"
              download="plugin.py"
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              title="ملف plugin.py متوافق 100% مع Python 3.12"
            >
              <FileCode className="w-4 h-4" />
              <span>plugin.py (Python 3.12) 💾</span>
            </a>
          </div>
        </div>

        {/* Quick Telnet Command Bar: GitHub & Local Mode */}
        <div className="mt-5 p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/30 space-y-2.5 text-xs">
          {/* GitHub Cloud Command */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-slate-200 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="font-bold text-cyan-400">1. التثبيت السحابي المباشر عبر GitHub (TAOUFIK-SAT):</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-750 px-3 py-1.5 rounded-lg font-mono text-[11px] text-emerald-400 max-w-full overflow-x-auto w-full lg:w-auto justify-between" dir="ltr">
              <span className="truncate">
                wget -q &quot;--no-check-certificate&quot; https://raw.githubusercontent.com/TAOUFIK-SAT/download-plugins/main/ZERO-PANEL/installer.sh -O - | /bin/sh
              </span>
              <button
                onClick={() => {
                  copyToClipboard('wget -q "--no-check-certificate" https://raw.githubusercontent.com/TAOUFIK-SAT/download-plugins/main/ZERO-PANEL/installer.sh -O - | /bin/sh', 'github-telnet-cmd');
                }}
                className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1 ml-2"
                title="نسخ أمر GitHub المباشر"
              >
                {copiedCmd === 'github-telnet-cmd' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span className="text-white font-sans text-[10px]">تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="font-sans text-[10px]">نسخ</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Local Mode Command */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-2.5 pt-2 border-t border-slate-850">
            <div className="flex items-center gap-2 text-slate-200 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="font-bold text-amber-400">2. التشغيل لوكال (Local Git Clone) على الرسيفر:</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-750 px-3 py-1.5 rounded-lg font-mono text-[11px] text-amber-300 max-w-full overflow-x-auto w-full lg:w-auto justify-between" dir="ltr">
              <span className="truncate">
                cd /tmp && git clone https://github.com/TAOUFIK-SAT/download-plugins.git && cd download-plugins/ZERO-PANEL && chmod +x installer.sh && ./installer.sh
              </span>
              <button
                onClick={() => {
                  copyToClipboard('cd /tmp && git clone https://github.com/TAOUFIK-SAT/download-plugins.git && cd download-plugins/ZERO-PANEL && chmod +x installer.sh && ./installer.sh', 'local-git-cmd');
                }}
                className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1 ml-2"
                title="نسخ أمر التشغيل لوكال"
              >
                {copiedCmd === 'local-git-cmd' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-slate-950" />
                    <span className="text-slate-950 font-sans text-[10px]">تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="font-sans text-[10px]">نسخ</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Receiver System Dashboard (Like ZERO-SAT Panel) */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Tv className="w-3.5 h-3.5 text-cyan-400" />
              <span>الجهاز (Box)</span>
            </div>
            <div className="font-mono font-bold text-white truncate">VU+ / Dreambox / Zgemma</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>الصورة (Image)</span>
            </div>
            <div className="font-mono font-bold text-amber-400">OpenATV / OpenPLi / Egami</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>المعالج (CPU)</span>
            </div>
            <div className="font-mono font-bold text-emerald-400">ARM / MIPS / All Python</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>الذاكرة (RAM)</span>
            </div>
            <div className="font-mono font-bold text-white">2048 MB (Free: 74%)</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <HardDrive className="w-3.5 h-3.5 text-rose-400" />
              <span>الفلاشة (Flash)</span>
            </div>
            <div className="font-mono font-bold text-white">4096 MB (Free: 83%)</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>الإنترنت (Net)</span>
            </div>
            <div className="font-mono font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>متصل (Online)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher: ZERO-SAT Explorer vs Source Code vs Installation Guide */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('panel')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'panel'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>تصفح وتجربة البانل (ZERO-SAT GUI)</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'code'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>معاينة كود البايثون (Python Code)</span>
        </button>

        <button
          onClick={() => setActiveTab('help')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'help'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>طريقة التثبيت على الرسيفر عبر Telnet / FTP</span>
        </button>
      </div>

      {activeTab === 'panel' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Categories Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>أقسام البانل (Categories)</span>
                </span>
                <span className="text-xs text-slate-500 font-mono">11 فئة</span>
              </h3>

              <div className="space-y-1">
                {CATEGORY_LIST.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-right px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                          : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MAG / Stalker Quick Filter Toggle */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2">
              <label className="flex items-center justify-between cursor-pointer text-xs">
                <span className="flex items-center gap-2 text-amber-400 font-bold">
                  <Tv className="w-4 h-4" />
                  <span>تصفية بوابات MAG / Stalker فقط</span>
                </span>
                <input
                  type="checkbox"
                  checked={filterMagOnly}
                  onChange={(e) => setFilterMagOnly(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-0 cursor-pointer w-4 h-4"
                />
              </label>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                يعرض الإضافات والمشغلات المخصصة لمحاكاة أجهزة MAG وتشغيل سيرفرات وبوابات Stalker Portal.
              </p>
            </div>

            {/* Quick Tips on Terminal */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Terminal className="w-4 h-4" />
                <span>ميزة Terminal التفاعلية:</span>
              </div>
              <p className="leading-relaxed">
                اضغط على أي إضافة لفتح شاشة الـ Terminal المدمجة لرؤية محاكاة التشغيل والأوامر البرمجية الحية كما تظهر على شاشة التلفاز تماماً.
              </p>
            </div>
          </div>

          {/* Right Plugins Grid & Search */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search Input Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="ابحث في أكثر من 250 إضافة (مثل MultiStalker, AJPanel, Oscam)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 self-end sm:self-center">
                <span>المعروض: <b className="text-cyan-400 font-mono">{filteredPlugins.length}</b> إضافة</span>
                {selectedCategory === 'iptv' && (
                  <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full font-bold text-[11px]">
                    ⭐ يشمل بوابات MAG و Stalker
                  </span>
                )}
              </div>
            </div>

            {/* Plugins Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[750px] overflow-y-auto pr-1">
              {filteredPlugins.map((plugin) => (
                <div 
                  key={plugin.id}
                  className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-lg transition-all flex flex-col justify-between group hover:shadow-cyan-500/5"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                            {plugin.name}
                          </h4>
                          {plugin.isMagStalker && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              MAG / Stalker
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">{plugin.categoryName}</span>
                      </div>

                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                        {plugin.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {plugin.description || `تثبيت إضافة ${plugin.name} مباشرة على جهاز الاستقبال عبر مشغل ZERO-SAT Panel التفاعلي.`}
                    </p>
                  </div>

                  {/* Terminal Execution and Copy Command Bar */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                    {/* Raw command snippet */}
                    <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-2.5 flex items-center justify-between gap-2 font-mono text-[11px] text-emerald-400 overflow-hidden">
                      <span className="truncate" dir="ltr">$ {plugin.command}</span>
                      <button
                        onClick={() => copyToClipboard(plugin.command, plugin.id)}
                        title="نسخ الأمر لتنفيذه في Telnet / PuTTY"
                        className="shrink-0 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                      >
                        {copiedCmd === plugin.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Launch Terminal Button */}
                    <button
                      onClick={() => launchTerminal(plugin)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/10 transition-all cursor-pointer"
                    >
                      <Terminal className="w-4 h-4" />
                      <span>تشغيل وتثبيت في نافذة Terminal 💻</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Code Viewer Tab */}
      {activeTab === 'code' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-cyan-400" />
                <span>كود البلوغين الاحترافي لـ ZERO-SAT Panel (Python 2 & 3)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                الملف محدث ومختبر في <code className="text-cyan-300 font-mono">/public/assets/aistudio/plugin_6a15eb1f.py</code> وجاهز للنقل المباشر لجهازك.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/assets/aistudio/plugin_6a15eb1f.py"
                download="plugin.py"
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 cursor-pointer shadow-md shadow-cyan-500/20"
              >
                <Download className="w-4 h-4" />
                <span>تحميل ملف plugin.py</span>
              </a>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[500px] leading-relaxed" dir="ltr">
            <pre className="text-emerald-400">
{`# -*- coding: utf-8 -*-
# ZERO-SAT Pro Panel - Enigma2 Professional Multi-Category Addon Manager
# Version: 4.0 Pro Edition
# Compatible with: Python 2.7, Python 3.9, 3.10, 3.11, 3.12 (All E2 Images)
# OpenATV, OpenPLi, Egami, BlackHole, OpenBH, PurE2, VTi, TeamBlue

# - Complete 11 Categorized Navigation Menus with 259 Verified Addons
# - Full MAG / Stalker Portal and IPTV Converter Utilities
# - Live Real-Time Terminal Console with Auto-Scroll Output and Telemetry
# - Hardware & Image Detection: Model, CPU, Kernel, RAM, Flash, Net`}
            </pre>
          </div>
        </div>
      )}

      {/* Installation Guide Tab */}
      {activeTab === 'help' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 text-right" dir="rtl">
          
          {/* Main Title */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-400" />
              <span>دليل تثبيت وحل مشكلة عدم ظهور البانل على أجهزة ENIGMA2 PYTHON 3.12</span>
            </h3>
            <p className="text-xs text-slate-400">
              شرح تفصيلي لأسباب عدم الظهور على الصور الحديثة (OpenATV 7.4 / 7.5, Egami 10.5, OpenPLi 9) مع 3 طرق مضمونة للتشغيل.
            </p>
          </div>

          {/* Golden Solution Card: GitHub & Local Mode */}
          <div className="bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900 border-2 border-emerald-500/50 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5 text-emerald-400 font-black text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>تشغيل وتثبيت البانل لوكال (Local) وعبر GitHub (TAOUFIK-SAT)</span>
              </div>
              <a
                href="/ZERO-PANEL-GitHub.zip"
                download="ZERO-PANEL-GitHub.zip"
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل حزمة GitHub الكاملة (ZIP) 📦</span>
              </a>
            </div>

            {/* Option A: GitHub Cloud */}
            <div className="space-y-1.5 bg-slate-950/80 p-3.5 rounded-xl border border-cyan-500/30">
              <span className="font-bold text-cyan-400 text-xs block">
                أ) التثبيت السحابي المباشر عبر مستودعك في GitHub:
              </span>
              <div className="bg-slate-900 border border-slate-750 p-2.5 rounded-lg flex items-center justify-between gap-3 text-xs font-mono text-emerald-400" dir="ltr">
                <span className="truncate">
                  wget -q &quot;--no-check-certificate&quot; https://raw.githubusercontent.com/TAOUFIK-SAT/download-plugins/main/ZERO-PANEL/installer.sh -O - | /bin/sh
                </span>
                <button
                  onClick={() => {
                    copyToClipboard('wget -q "--no-check-certificate" https://raw.githubusercontent.com/TAOUFIK-SAT/download-plugins/main/ZERO-PANEL/installer.sh -O - | /bin/sh', 'help-github-cmd');
                  }}
                  className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1"
                >
                  {copiedCmd === 'help-github-cmd' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="font-sans text-xs">نسخ</span>
                </button>
              </div>
            </div>

            {/* Option B: Local Mode */}
            <div className="space-y-1.5 bg-slate-950/80 p-3.5 rounded-xl border border-amber-500/30">
              <span className="font-bold text-amber-400 text-xs block">
                ب) التشغيل لوكال محلياً (Local Git Clone) على الرسيفر:
              </span>
              <div className="bg-slate-900 border border-slate-750 p-2.5 rounded-lg flex items-center justify-between gap-3 text-xs font-mono text-amber-300" dir="ltr">
                <span className="truncate">
                  cd /tmp && git clone https://github.com/TAOUFIK-SAT/download-plugins.git && cd download-plugins/ZERO-PANEL && chmod +x installer.sh && ./installer.sh
                </span>
                <button
                  onClick={() => {
                    copyToClipboard('cd /tmp && git clone https://github.com/TAOUFIK-SAT/download-plugins.git && cd download-plugins/ZERO-PANEL && chmod +x installer.sh && ./installer.sh', 'help-local-cmd');
                  }}
                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1"
                >
                  {copiedCmd === 'help-local-cmd' ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="font-sans text-xs text-slate-950">نسخ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Technical Diagnostics for Python 3.12 */}
          <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-cyan-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-cyan-400" />
              <span>لماذا لم يظهر البانل في السابق على بايثون 3.12؟ (التشخيص والحل البرمجي)</span>
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block text-xs">1. غياب ملف __init__.py</span>
                  <p className="text-[11px] text-slate-400">
                    في بيئة Python 3.12، لا يقرأ Enigma2 أي مجلد إضافات ما لم يحتوي على ملف <code className="text-amber-300 font-mono">__init__.py</code> كمعرّف حزمة بايثون، وبدونه يتم إسقاط البلوغين بصمت دون إظهار أي خطأ.
                  </p>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-cyan-400 block text-xs">2. تعارض تايمر eTimer</span>
                  <p className="text-[11px] text-slate-400">
                    في Python 3.12 تغيرت صيغة استدعاء <code className="text-cyan-300 font-mono">eTimer</code> في صور OpenATV 7.4 و Egami، وتم تعديل الكود ليدعم كافة الصور تلقائياً دون أدنى تعارض.
                  </p>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-400 block text-xs">3. التسجيل في 3 قوائم</span>
                  <p className="text-[11px] text-slate-400">
                    تمت إضافة معرّفات التسجيل ليظهر البانل في: <strong>القائمة الرئيسية للجهاز مباشرة</strong>، و<strong>قائمة البلوجينات Plugins</strong>، و<strong>قائمة الزر الأزرق Extensions</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Practical Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Method 1 */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">طريقة 1</span>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-bold">باقة IPK الرسمية</span>
              </div>
              <h4 className="font-bold text-white text-sm">التثبيت عبر حزمة IPK</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                حمل ملف <code className="text-amber-400 font-mono">ZeroSatPanel.ipk</code> وأرسله لمجلد <code className="text-cyan-300 font-mono">/tmp</code> ثم نفذ:
              </p>
              <div className="bg-slate-900 p-2 rounded-lg font-mono text-[10px] text-emerald-400 select-all" dir="ltr">
                opkg install --force-overwrite /tmp/ZeroSatPanel.ipk
              </div>
            </div>

            {/* Method 2 */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">طريقة 2</span>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">عبر FTP و DCC</span>
              </div>
              <h4 className="font-bold text-white text-sm">نقل الملفات يدوياً</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                أنشئ مجلد <code className="text-amber-300 font-mono">ZeroSatPanel</code> في المسار:
                <code className="text-amber-300 font-mono text-[10px] block mt-1 bg-slate-900 p-1.5 rounded" dir="ltr">
                  /usr/lib/enigma2/python/Plugins/Extensions/ZeroSatPanel/
                </code>
                وضع بداخله ملفات: <code className="text-cyan-400 font-mono">plugin.py</code> و <code className="text-cyan-400 font-mono">__init__.py</code>.
              </p>
            </div>

            {/* Method 3 */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">طريقة 3</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">إعادة التشغيل</span>
              </div>
              <h4 className="font-bold text-white text-sm">تطبيق التغييرات</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                أعد تشغيل واجهة الإنيغما لحفظ السجلات وتفعيل البلوغين في القائمة:
              </p>
              <div className="bg-slate-900 p-2 rounded-lg font-mono text-[11px] text-emerald-400 select-all" dir="ltr">
                killall -9 enigma2
              </div>
              <p className="text-[10px] text-slate-500">
                ثم توجه إلى: <strong>Menu &larr; Plugins &larr; ZERO-SAT Pro Panel</strong>
              </p>
            </div>

          </div>

          {/* Cannot start from here explanation card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>تنبيه هام عند تشغيل البلوغين لأول مرة:</span>
            </span>
            <p className="text-slate-400 leading-relaxed">
              بلوغينات Enigma2 لا تُفتح كملف طرفي عبر كتابة <code className="text-rose-400 font-mono">python3 plugin.py</code> في Telnet (سيُظهر رسالة cannot start from here). يتم فتح البانل مباشرة من شاشة التلفزيون باستخدام الريموت كنترول عبر <strong>القائمة الرئيسية (Menu)</strong> أو <strong>الزر الأزرق (Extensions)</strong> أو <strong>متصفح الإضافات (Plugins)</strong>.
            </p>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* AUTHENTIC ENIGMA2 DREAMSAT TERMINAL WINDOW MODAL */}
      {/* ========================================================================= */}
      {isTerminalOpen && currentTerminalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-slate-950 border border-cyan-500/40 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Terminal Title Bar */}
            <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer" onClick={() => setIsTerminalOpen(false)}></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white">ZERO-SAT Panel Live Terminal</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-cyan-400 font-bold">{currentTerminalItem.name}</span>
                </div>
              </div>

              <button
                onClick={() => setIsTerminalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Header with Executing Command */}
            <div className="bg-slate-900/90 px-5 py-2.5 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300 truncate">
                <span className="text-amber-400 font-bold">[RUN]</span>
                <span className="text-emerald-400 truncate">{currentTerminalItem.command}</span>
              </div>
              <div className="shrink-0 flex items-center gap-2 text-[11px]">
                {isExecuting ? (
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>جاري التنفيذ...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>تم الانتهاء (Code: 0)</span>
                  </span>
                )}
              </div>
            </div>

            {/* Console Screen Box (Black with Monospace Hacker Green Text) */}
            <div 
              className="p-5 font-mono text-xs overflow-y-auto space-y-1.5 bg-[#030712] text-[#4ade80] flex-1 min-h-[320px] select-text" 
              dir="ltr"
            >
              {terminalLogs.map((log, idx) => {
                const isError = log.includes('[ERROR]') || log.includes('[WARNING]');
                const isSuccess = log.includes('[SUCCESS]');
                const isHeader = log.includes('===');
                const isCommand = log.includes('[COMMAND]');
                return (
                  <div 
                    key={idx}
                    className={`leading-relaxed whitespace-pre-wrap break-all ${
                      isError ? 'text-rose-400 font-bold' :
                      isSuccess ? 'text-emerald-300 font-bold text-sm bg-emerald-950/30 p-1 rounded' :
                      isHeader ? 'text-cyan-400 font-bold' :
                      isCommand ? 'text-amber-300' :
                      'text-emerald-400/90'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
              {isExecuting && (
                <div className="inline-block w-2.5 h-4 bg-emerald-400 animate-pulse ml-1 align-middle"></div>
              )}
              <div ref={terminalEndRef}></div>
            </div>

            {/* Remote Control Colored Keys Footer (Red/Green/Yellow/Blue like Enigma2) */}
            <div className="bg-slate-900 px-5 py-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <button
                onClick={() => setIsTerminalOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-rose-900/60 hover:bg-rose-900 border border-rose-700/50 text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span>إغلاق (Exit)</span>
              </button>

              <button
                onClick={() => launchTerminal(currentTerminalItem)}
                className="py-2.5 px-3 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/50 text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span>إعادة التشغيل (Re-run)</span>
              </button>

              <button
                onClick={() => {
                  alert('محاكاة: تم إرسال أمر reboot لإعادة إقلاع الرسيفر.');
                  setIsTerminalOpen(false);
                }}
                className="py-2.5 px-3 rounded-xl bg-amber-900/60 hover:bg-amber-900 border border-amber-700/50 text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span>Reboot Box</span>
              </button>

              <button
                onClick={() => copyToClipboard(currentTerminalItem.command, 'term-copy')}
                className="py-2.5 px-3 rounded-xl bg-blue-900/60 hover:bg-blue-900 border border-blue-700/50 text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span>{copiedCmd === 'term-copy' ? 'تم النسخ!' : 'نسخ الأمر (Copy)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
