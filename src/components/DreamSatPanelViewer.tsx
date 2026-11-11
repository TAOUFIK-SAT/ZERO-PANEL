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
  Download, 
  Copy, 
  Check, 
  Search, 
  RotateCw, 
  Code, 
  ShieldCheck, 
  Sparkles, 
  Play, 
  FolderGit2, 
  Radio, 
  FileCode, 
  X, 
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Settings,
  Flame,
  Globe,
  Server,
  Star,
  PackageCheck,
  Zap,
  ArrowUpCircle,
  LayoutGrid,
  Activity,
  Gauge,
  Archive,
  CheckSquare,
  Square,
  ListChecks,
  PlayCircle
} from 'lucide-react';
import { ENIGMA_PLUGINS, EnigmaPluginItem } from '../enigmaPluginsData';
import ServerManager from './ServerManager';
import SoftcamConfigGenerator from './SoftcamConfigGenerator';
import InstalledManager from './InstalledManager';
import CategoryCardsGrid from './CategoryCardsGrid';
import LiveStatsDashboard from './LiveStatsDashboard';
import BackupManager, { BackupData } from './BackupManager';

interface CategoryItem {
  id: string;
  name: string;
  english: string;
  arabic?: string;
  icon: any;
  count: number;
}

const CATEGORY_LIST: CategoryItem[] = [
  { id: 'all', name: 'الكل (All)', english: 'All Categories', icon: Sparkles, count: ENIGMA_PLUGINS.length },
  { id: 'iptv', name: 'الميديا والـ IPTV', english: 'IPTV & MAG / Stalker', arabic: 'بوابات MAG وسيرفرات البث', icon: Tv, count: ENIGMA_PLUGINS.filter(p => p.category === 'iptv').length },
  { id: 'panels', name: 'البانلات (Panels)', english: 'Control Panels & Store', arabic: 'لوحات التحكم والبانلات الشاملة', icon: Layers, count: ENIGMA_PLUGINS.filter(p => p.category === 'panels').length },
  { id: 'softcams', name: 'الشفرات (Softcams)', english: 'Oscam, Ncam & Keys', arabic: 'محاكيات التشفير وسيرفرات الشيرينج', icon: Key, count: ENIGMA_PLUGINS.filter(p => p.category === 'softcams').length },
  { id: 'channels', name: 'ملفات القنوات (Channels)', english: 'Motor & Satellites Settings', arabic: 'ملفات القنوات والمفضلات والأقمار', icon: Sliders, count: ENIGMA_PLUGINS.filter(p => p.category === 'channels').length },
  { id: 'multiboot', name: 'المولتي بوت (Multiboot)', english: 'USB & Flash Image Boot', arabic: 'برامج الإقلاع المتعدد وتثبيت الصور', icon: HardDrive, count: ENIGMA_PLUGINS.filter(p => p.category === 'multiboot').length },
  { id: 'plugins', name: 'البلجنات العامة (Plugins)', english: 'EPG, Subtitles & Tools', arabic: 'إضافات ومساعدات وترجمة وقرآن', icon: Wrench, count: ENIGMA_PLUGINS.filter(p => p.category === 'plugins').length },
  { id: 'skins', name: 'السكينات (Skins FHD)', english: 'FHD Skins & OLED Displays', arabic: 'سكينات FHD وثيمات شاشات العرض', icon: Palette, count: ENIGMA_PLUGINS.filter(p => p.category === 'skins').length },
  { id: 'tools', name: 'الأدوات والصور (Tools)', english: 'Python & Package Fixes', arabic: 'أدوات النظام وتحديثات Python', icon: Cpu, count: ENIGMA_PLUGINS.filter(p => p.category === 'tools').length },
  { id: 'picons', name: 'البيكونات (Picons)', english: 'Channel Logos All Sats', arabic: 'شعارات القنوات لجميع الأقمار', icon: ImageIcon, count: ENIGMA_PLUGINS.filter(p => p.category === 'picons').length },
  { id: 'bootlogos', name: 'شاشات الإقلاع (Bootlogos)', english: 'Startup Screens & Banners', arabic: 'شاشات إقلاع الجهاز ومناسبات', icon: Sparkles, count: ENIGMA_PLUGINS.filter(p => p.category === 'bootlogos').length },
  { id: 'images', name: 'صور الرسيفر الخام (Images)', english: 'Flash Online Images', arabic: 'روابط تحميل وتثبيت صور الفلاش الخام', icon: FolderGit2, count: ENIGMA_PLUGINS.filter(p => p.category === 'images').length },
  { id: 'localtools', name: 'أدوات الصيانة وتثبيت /tmp', english: 'Offline /tmp & System Tools', arabic: 'تثبيت حزم IPK و Tar.gz المحلية وأدوات صيانة النظام', icon: Wrench, count: ENIGMA_PLUGINS.filter(p => p.category === 'localtools').length },
];

interface TaoufikStoreViewerProps {
  externalSearch?: string;
  onSearchChange?: (query: string) => void;
  selectedCategoryFromHeader?: string;
  selectedPluginToInstall?: EnigmaPluginItem | null;
  onClearSelectedPlugin?: () => void;
}

export default function TaoufikStoreViewer({
  externalSearch,
  onSearchChange,
  selectedCategoryFromHeader,
  selectedPluginToInstall,
  onClearSelectedPlugin
}: TaoufikStoreViewerProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'store' | 'categories' | 'dashboard' | 'backup' | 'classic' | 'servers' | 'softcam' | 'installed' | 'code' | 'help'>('categories');
  const [showLiveDashboard, setShowLiveDashboard] = useState<boolean>(true);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleRestoreSuccess = (data: BackupData) => {
    if (data.receiverIP) setReceiverIP(data.receiverIP);
    if (data.receiverModel) setReceiverModel(data.receiverModel);
    if (data.receiverImage) setReceiverImage(data.receiverImage);
    if (data.favoriteIds) setFavoriteIds(data.favoriteIds);
    if (data.customPlugins) setCustomPlugins(data.customPlugins);
    showAlert('تمت استعادة كافة البيانات وإعدادات المتجر وقنوات الرسيفر بنجاح! 🟢');
  };

  // Sync external search from header
  useEffect(() => {
    if (externalSearch !== undefined) {
      setSearchQuery(externalSearch);
      if (externalSearch.trim().length > 0 && viewMode === 'categories') {
        setViewMode('store');
      }
    }
  }, [externalSearch]);

  // Sync external category selection
  useEffect(() => {
    if (selectedCategoryFromHeader) {
      setSelectedCategory(selectedCategoryFromHeader);
      setViewMode('store');
    }
  }, [selectedCategoryFromHeader]);

  // Custom user plugins
  const [customPlugins, setCustomPlugins] = useState<EnigmaPluginItem[]>(() => {
    const saved = localStorage.getItem('taoufik_custom_plugins');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  // Favorite plugin IDs
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('taoufik_favorite_plugins');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return ['ajpanel', 'multistalkerpro', 'ciefp-panel']; }
    }
    return ['ajpanel', 'multistalkerpro', 'ciefp-panel'];
  });

  useEffect(() => {
    localStorage.setItem('taoufik_favorite_plugins', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    localStorage.setItem('taoufik_custom_plugins', JSON.stringify(customPlugins));
  }, [customPlugins]);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavoriteIds(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(x => x !== id) : [...prev, id];
      showAlert(exists ? 'تمت إزالة الإضافة من المفضلة' : 'تمت إضافة الإضافة إلى المفضلة ⭐');
      return next;
    });
  };

  const handleAddCustomPlugin = (item: EnigmaPluginItem) => {
    setCustomPlugins(prev => [item, ...prev]);
  };

  // Receiver Hardware & State
  const [receiverIP, setReceiverIP] = useState<string>('192.168.1.105');
  const [receiverModel, setReceiverModel] = useState<string>('Vu+ Duo 4K SE');
  const [receiverImage, setReceiverImage] = useState<string>('OpenATV 7.4 (Py 3.12)');
  const [activeCam, setActiveCam] = useState<string>('OScam-Emu + ICam v11793');
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState<boolean>(false);
  const [tempIP, setTempIP] = useState<string>('192.168.1.105');
  const [alertNotice, setAlertNotice] = useState<string | null>(null);
  
  // Terminal Modal State
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [currentTerminalItem, setCurrentTerminalItem] = useState<EnigmaPluginItem | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [exitCode, setExitCode] = useState<number | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Batch Installation State
  const [selectedForBatch, setSelectedForBatch] = useState<string[]>([]);
  const [isBatchMode, setIsBatchMode] = useState<boolean>(false);
  const [batchQueue, setBatchQueue] = useState<EnigmaPluginItem[]>([]);
  const [batchCurrentIndex, setBatchCurrentIndex] = useState<number>(0);
  const [batchCompleted, setBatchCompleted] = useState<boolean>(false);
  const batchTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearBatchTimeouts = () => {
    batchTimeoutsRef.current.forEach(t => clearTimeout(t));
    batchTimeoutsRef.current = [];
  };

  // TV Remote Simulation State (For Classic Mode)
  const [classicSelectedCat, setClassicSelectedCat] = useState<string>('iptv');
  const [classicSelectedIdx, setClassicSelectedIdx] = useState<number>(0);

  // All plugins combined
  const allAvailablePlugins = [...customPlugins, ...ENIGMA_PLUGINS];

  // Filter plugins
  const filteredPlugins = allAvailablePlugins.filter((item) => {
    const matchesCat = 
      selectedCategory === 'all' ? true :
      selectedCategory === 'favorites' ? favoriteIds.includes(item.id) :
      item.category === selectedCategory;

    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'iptv': return Tv;
      case 'panels': return Layers;
      case 'softcams': return Key;
      case 'channels': return Sliders;
      case 'multiboot': return HardDrive;
      case 'plugins': return Wrench;
      case 'skins': return Palette;
      case 'tools': return Cpu;
      case 'picons': return ImageIcon;
      case 'bootlogos': return Sparkles;
      case 'images': return FolderGit2;
      case 'localtools': return Wrench;
      default: return Terminal;
    }
  };
  useEffect(() => {
    if (isTerminalOpen && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, isTerminalOpen]);

  const showAlert = (msg: string) => {
    setAlertNotice(msg);
    setTimeout(() => setAlertNotice(null), 3500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    showAlert('تم نسخ الأمر إلى الحافظة بنجاح!');
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const checkConnection = () => {
    showAlert(`تم فحص الاتصال بالرسيفر (${receiverIP}) - متصل بنجاح 🟢 (Response: 8ms).`);
  };

  const restartGUI = () => {
    if (confirm(`هل أنت متأكد من رغبتك في إعادة تشغيل واجهة Enigma2 GUI على الرسيفر (${receiverIP})؟`)) {
      showAlert(`جاري إرسال إشارة killall -9 enigma2 إلى ${receiverIP}... تم الإرسال بنجاح!`);
    }
  };

  const saveDeviceSettings = () => {
    if (tempIP.trim()) {
      setReceiverIP(tempIP.trim());
      setIsDeviceModalOpen(false);
      showAlert(`تم تحديث بيانات الاتصال بالرسيفر: ${tempIP.trim()}`);
    }
  };

  // Multi-Selection and Batch Install Helpers
  const toggleSelectForBatch = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedForBatch(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(x => x !== id) : [...prev, id];
      showAlert(exists ? 'تم إلغاء تحديد الإضافة من قائمة التثبيت المجمع' : 'تمت إضافة الإضافة إلى قائمة التثبيت المجمع ✓');
      return next;
    });
  };

  const selectAllFiltered = () => {
    const ids = filteredPlugins.map(p => p.id);
    setSelectedForBatch(ids);
    showAlert(`تم تحديد كافة إضافات هذا القسم (${ids.length} حزمة) للتثبيت المجمع`);
  };

  const clearBatchSelection = () => {
    setSelectedForBatch([]);
    showAlert('تم إلغاء تحديد كافة الإضافات');
  };

  const copyBatchCommand = () => {
    const selectedItems = allAvailablePlugins.filter(p => selectedForBatch.includes(p.id));
    if (selectedItems.length === 0) return;
    const combinedCommand = selectedItems.map(p => p.command).join(' && ');
    navigator.clipboard.writeText(combinedCommand);
    showAlert(`تم نسخ أمر Telnet المجمع لـ (${selectedItems.length}) إضافات بنجاح!`);
  };

  const closeTerminalModal = () => {
    clearBatchTimeouts();
    setIsTerminalOpen(false);
    setIsExecuting(false);
  };

  const cancelBatch = () => {
    clearBatchTimeouts();
    setIsExecuting(false);
    setTerminalLogs(prev => [
      ...prev,
      `----------------------------------------------------------------------`,
      `[BATCH CANCELLED] تم إيقاف عملية التثبيت المجمع بناءً على طلب المستخدم.`,
      `----------------------------------------------------------------------`
    ]);
    showAlert('تم إيقاف التثبيت المجمع');
  };

  // Launch Terminal Execution for a Single Item
  const launchTerminal = (item: EnigmaPluginItem) => {
    clearBatchTimeouts();
    setIsBatchMode(false);
    setBatchQueue([item]);
    setBatchCurrentIndex(0);
    setBatchCompleted(false);
    setCurrentTerminalItem(item);
    setIsTerminalOpen(true);
    setIsExecuting(true);
    setExitCode(null);
    setTerminalLogs([
      `======================================================================`,
      `   TAOUFIK STORE - Terminal Console v4.0 (Python 3.12 Engine)`,
      `======================================================================`,
      `[RECEIVER] Model: ${receiverModel} (${receiverIP})`,
      `[IMAGE] ${receiverImage}`,
      `[ACTIVE CAM] ${activeCam}`,
      `[TARGET] ${item.name} (${item.categoryName})`,
      `[COMMAND] # ${item.command}`,
      `----------------------------------------------------------------------`,
      `[TAOUFIK-STORE] Initializing eConsoleAppContainer sub-process...`,
      `[TAOUFIK-STORE] Working directory: /tmp`,
      `[TAOUFIK-STORE] Connecting to remote host...`,
    ]);

    const steps = [
      `Connecting to repository host... 200 OK`,
      `Downloading installer payload: 100% [==========================] Done`,
      `[opkg] Checking package dependencies and runtime libraries...`,
      `[opkg] Python version: 3.12.2 / Architecture: armhf (cortexa15hf-neon)`,
      `[install] Extracting package contents to /usr/lib/enigma2/python/Plugins/Extensions/${item.name.replace(/[^a-zA-Z0-9]/g, '')}/`,
      `[chmod] Applying executable permissions (chmod 755 /usr/bin/...)`,
      `[system] Registering PluginDescriptor in Enigma2 plugin registry`,
      `[cleanup] Removing temporary archives from /tmp/`,
      `----------------------------------------------------------------------`,
      `[SUCCESS] ${item.name} installed successfully with return code: 0`,
      `[INFO] Press Green button or Restart Enigma2 GUI to apply changes.`
    ];

    steps.forEach((line, index) => {
      const t = setTimeout(() => {
        setTerminalLogs((prev) => [...prev, line]);
        if (index === steps.length - 1) {
          setIsExecuting(false);
          setExitCode(0);
        }
      }, (index + 1) * 350);
      batchTimeoutsRef.current.push(t);
    });
  };

  // Launch Automated Sequential Batch Install
  const launchBatchInstall = () => {
    const items = allAvailablePlugins.filter(p => selectedForBatch.includes(p.id));
    if (items.length === 0) {
      showAlert('يرجى تحديد إضافة واحدة على الأقل للتثبيت المجمع.');
      return;
    }

    clearBatchTimeouts();
    setIsBatchMode(true);
    setBatchQueue(items);
    setBatchCurrentIndex(0);
    setBatchCompleted(false);
    setCurrentTerminalItem(items[0]);
    setIsTerminalOpen(true);
    setIsExecuting(true);
    setExitCode(null);

    setTerminalLogs([
      `======================================================================`,
      `   TAOUFIK STORE - Sequential Batch Installer (Python 3.12 Engine)`,
      `======================================================================`,
      `[RECEIVER] Model: ${receiverModel} (${receiverIP})`,
      `[IMAGE] ${receiverImage}`,
      `[BATCH QUEUE] ${items.length} Packages queued for automated installation:`,
      ...items.map((it, idx) => `  [${idx + 1}] ${it.name} - ${it.categoryName}`),
      `----------------------------------------------------------------------`,
      `[BATCH ENGINE] Initializing sequential batch runner...`,
    ]);

    let delayAccumulator = 600;

    items.forEach((item, itemIdx) => {
      // Step A: Announce start of item
      const startT = setTimeout(() => {
        setBatchCurrentIndex(itemIdx);
        setCurrentTerminalItem(item);
        setTerminalLogs(prev => [
          ...prev,
          `\n======================================================================`,
          `>>> [${itemIdx + 1}/${items.length}] Installing: ${item.name} (${item.categoryName})`,
          `[COMMAND] # ${item.command}`,
          `[opkg] Downloading installer script to /tmp/ ... 100% OK`,
          `[exec] Executing package installation routine...`,
          `[install] Extracted to /usr/lib/enigma2/python/Plugins/Extensions/`,
          `[chmod] Permissions updated (755)`,
          `[SUCCESS] ✓ [${itemIdx + 1}/${items.length}] ${item.name} installed successfully (Exit Code 0).`,
        ]);
      }, delayAccumulator);
      batchTimeoutsRef.current.push(startT);

      delayAccumulator += 850;
    });

    // Step Final: All items completed
    const finalT = setTimeout(() => {
      setBatchCurrentIndex(items.length);
      setBatchCompleted(true);
      setIsExecuting(false);
      setExitCode(0);
      setTerminalLogs(prev => [
        ...prev,
        `\n======================================================================`,
        `[ALL COMPLETED] All ${items.length} plugins have been installed successfully!`,
        `[NEXT STEP] Restart Enigma2 GUI (killall -9 enigma2) to refresh the main menu.`,
        `======================================================================`
      ]);
      showAlert(`اكتمل التثبيت المجمع لـ ${items.length} إضافات بنجاح! 🟢`);
    }, delayAccumulator + 300);
    batchTimeoutsRef.current.push(finalT);
  };

  // Launch terminal if plugin selected from top header search
  useEffect(() => {
    if (selectedPluginToInstall) {
      launchTerminal(selectedPluginToInstall);
      if (onClearSelectedPlugin) {
        onClearSelectedPlugin();
      }
    }
  }, [selectedPluginToInstall]);

  return (
    <div className="space-y-5" dir="rtl">
      
      {/* Toast Alert Notice */}
      {alertNotice && (
        <div className="fixed bottom-5 left-5 z-50 bg-slate-900 border border-cyan-400 text-cyan-200 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-mono animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{alertNotice}</span>
        </div>
      )}

      {/* 1. Header Card (TAOUFIK STORE Official) */}
      <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-5 md:p-8 space-y-4 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
            <span>المتجر الرسمي المعتمد لأجهزة الإنيجما 2 - نواة بايتون 3</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white">
            متجر <span className="text-[#00e5ff] drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">توفيق</span> بايتون 3 (<span className="text-gray-300">TAOUFIK STORE</span>)
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-4xl leading-relaxed pt-1">
            المكتبة الشاملة لإدارة أجهزة الدريم بوكس، الفيو بلس، والأوكتاجون: تثبيت السوفتكام، البلجنات، السكينات FHD، ملفات القنوات الحديثة، محاكي شاشة التلفزيون وريموت التحكم، وترمينال الأوامر المباشرة.
          </p>
        </div>

        {/* Buttons and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <button 
              onClick={() => copyToClipboard('wget -q "--no-check-certificate" https://raw.githubusercontent.com/TAOUFIK-SAT/download-plugins/main/ZERO-PANEL/installer.sh -O - | /bin/sh', 'top-telnet')}
              className="bg-[#00e5ff] hover:bg-cyan-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/10 cursor-pointer transition"
            >
              <Download className="w-4 h-4" />
              <span>أمر التثبيت (Telnet)</span>
            </button>
            <a 
              href="/ZERO-PANEL-GitHub.zip"
              download="TAOUFIK-STORE.zip"
              className="bg-[#10b981] hover:bg-emerald-500 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer transition"
            >
              <Download className="w-4 h-4" />
              <span>تحميل الملف (.zip)</span>
            </a>
            <a 
              href="/ZeroSatPanel.ipk"
              download="taoufik-store_4.0_all.ipk"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer transition"
            >
              <Download className="w-4 h-4" />
              <span>حزمة IPK</span>
            </a>
            
            {/* View Switchers */}
            <button 
              onClick={() => setViewMode('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 font-extrabold transition cursor-pointer ${
                viewMode === 'dashboard'
                  ? 'bg-[#00e5ff] text-black shadow-lg shadow-cyan-500/10'
                  : 'bg-[#182133] hover:bg-[#202c45] text-cyan-300 border border-cyan-500/40'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>لوحة الإحصائيات الحية</span>
            </button>
            <button 
              onClick={() => setViewMode('categories')}
              className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 font-extrabold transition cursor-pointer ${
                viewMode === 'categories'
                  ? 'bg-[#00e5ff] text-black shadow-lg shadow-cyan-500/10'
                  : 'bg-[#182133] hover:bg-[#202c45] text-gray-300 border border-gray-700/50'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>بطاقات التصنيفات</span>
            </button>
            <button 
              onClick={() => setViewMode('store')}
              className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 font-extrabold transition cursor-pointer ${
                viewMode === 'store'
                  ? 'bg-[#00e5ff] text-black shadow-lg shadow-cyan-500/10'
                  : 'bg-[#182133] hover:bg-[#202c45] text-gray-300 border border-gray-700/50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>شكل البلاي ستور</span>
            </button>
            <button 
              onClick={() => setViewMode('classic')}
              className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 font-bold transition cursor-pointer ${
                viewMode === 'classic'
                  ? 'bg-[#00e5ff] text-black shadow-lg shadow-cyan-500/10 font-extrabold'
                  : 'bg-[#182133] hover:bg-[#202c45] text-gray-300 border border-gray-700/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>القائمة الكلاسيكية</span>
            </button>
            <button 
              onClick={() => setViewMode('servers')}
              className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 font-bold transition cursor-pointer ${
                viewMode === 'servers'
                  ? 'bg-[#00e5ff] text-black shadow-lg shadow-cyan-500/10 font-extrabold'
                  : 'bg-[#182133] hover:bg-[#202c45] text-cyan-300 border border-cyan-500/30'
              }`}
            >
              <Server className="w-4 h-4 text-cyan-400" />
              <span>إدارة الخوادم (M3U/XML)</span>
            </button>
            <button 
              onClick={() => setViewMode('softcam')}
              className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 font-bold transition cursor-pointer ${
                viewMode === 'softcam'
                  ? 'bg-[#00e5ff] text-black shadow-lg shadow-cyan-500/10 font-extrabold'
                  : 'bg-[#182133] hover:bg-[#202c45] text-amber-300 border border-amber-500/30'
              }`}
            >
              <Key className="w-4 h-4 text-amber-400" />
              <span>مولد السوفتكام</span>
            </button>
            <button 
              onClick={() => setViewMode('installed')}
              className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 font-bold transition cursor-pointer ${
                viewMode === 'installed'
                  ? 'bg-[#00e5ff] text-black shadow-lg shadow-cyan-500/10 font-extrabold'
                  : 'bg-[#182133] hover:bg-[#202c45] text-emerald-300 border border-emerald-500/30'
              }`}
            >
              <PackageCheck className="w-4 h-4 text-emerald-400" />
              <span>الحزم والمؤشرات</span>
            </button>
            <button 
              onClick={() => setViewMode('backup')}
              className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 font-bold transition cursor-pointer ${
                viewMode === 'backup'
                  ? 'bg-[#00e5ff] text-black shadow-lg shadow-cyan-500/10 font-extrabold'
                  : 'bg-[#182133] hover:bg-[#202c45] text-amber-300 border border-amber-500/30'
              }`}
            >
              <Archive className="w-4 h-4 text-amber-400" />
              <span>النسخ والاستعادة</span>
            </button>
            <button 
              onClick={() => setViewMode('code')}
              className={`px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 font-bold transition cursor-pointer ${
                viewMode === 'code'
                  ? 'bg-[#00e5ff] text-black font-extrabold'
                  : 'bg-[#182133] hover:bg-[#202c45] text-gray-300 border border-gray-700/50'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>كود بايثون</span>
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في TAOUFIK STORE..." 
              className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Horizontal Category Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-800/80 text-xs overflow-x-auto pb-1">
          {/* Favorites Filter Chip */}
          <button
            onClick={() => setSelectedCategory('favorites')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer shrink-0 text-xs flex items-center gap-1.5 ${
              selectedCategory === 'favorites'
                ? 'bg-amber-400 text-black shadow-md'
                : 'bg-[#182133] hover:bg-[#202c45] text-amber-300 border border-amber-500/30'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${selectedCategory === 'favorites' ? 'fill-black' : 'fill-amber-400'}`} />
            <span>المفضلة</span>
            <span className="text-[10px] px-1 rounded bg-black/20 font-mono">
              {favoriteIds.length}
            </span>
          </button>

          {CATEGORY_LIST.map((c) => {
            const isSelected = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer shrink-0 text-xs ${
                  isSelected
                    ? 'bg-[#00e5ff] text-black shadow-md'
                    : 'bg-[#182133] hover:bg-[#202c45] text-gray-300 border border-gray-700/50'
                }`}
              >
                <span>{c.name}</span>
                <span className={`ml-1.5 text-[10px] px-1 rounded ${isSelected ? 'bg-black/20 text-black' : 'bg-slate-900 text-slate-400'}`}>
                  {c.id === 'all' ? allAvailablePlugins.length : c.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Receiver Hardware Telemetry & Control Bar */}
      <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-wrap justify-between items-center gap-3 pb-3 border-b border-gray-800/80">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => { setTempIP(receiverIP); setIsDeviceModalOpen(true); }}
              className="bg-[#182133] hover:bg-[#202c45] text-gray-300 text-xs px-3.5 py-1.5 rounded-lg border border-gray-700/50 flex items-center gap-1.5 cursor-pointer transition"
            >
              <Settings className="w-3.5 h-3.5 text-cyan-400" />
              <span>تغيير الجهاز</span>
            </button>
            <button 
              onClick={restartGUI}
              className="bg-[#b45309]/20 hover:bg-[#b45309] text-amber-400 hover:text-white text-xs px-3.5 py-1.5 rounded-lg border border-amber-600/40 flex items-center gap-1.5 transition cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>إعادة تشغيل GUI</span>
            </button>
            <button 
              onClick={checkConnection}
              className="bg-[#182133] hover:bg-[#202c45] text-cyan-400 text-xs px-3.5 py-1.5 rounded-lg border border-cyan-500/30 flex items-center gap-1.5 cursor-pointer transition"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>فحص الاتصال</span>
            </button>
            <button 
              onClick={() => setViewMode('servers')}
              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 cursor-pointer transition ${
                viewMode === 'servers'
                  ? 'bg-emerald-500 text-black font-extrabold border-emerald-400 shadow-sm'
                  : 'bg-[#182133] hover:bg-[#202c45] text-emerald-400 border-emerald-500/30'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>خوادم M3U/XML</span>
            </button>
            <button 
              onClick={() => setViewMode('softcam')}
              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 cursor-pointer transition ${
                viewMode === 'softcam'
                  ? 'bg-amber-400 text-black font-extrabold border-amber-300 shadow-sm'
                  : 'bg-[#182133] hover:bg-[#202c45] text-amber-300 border-amber-500/30'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>مولد السوفتكام</span>
            </button>
            <button 
              onClick={() => setViewMode('installed')}
              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 cursor-pointer transition ${
                viewMode === 'installed'
                  ? 'bg-[#00e5ff] text-black font-extrabold border-cyan-400 shadow-sm'
                  : 'bg-[#182133] hover:bg-[#202c45] text-cyan-300 border-cyan-500/30'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>الحزم والمؤشرات</span>
            </button>
            <button 
              onClick={() => setShowLiveDashboard(!showLiveDashboard)}
              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 cursor-pointer transition font-bold ${
                showLiveDashboard
                  ? 'bg-[#00e5ff] text-black border-cyan-400 shadow-sm'
                  : 'bg-[#182133] hover:bg-[#202c45] text-cyan-300 border-cyan-500/30'
              }`}
            >
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>{showLiveDashboard ? 'إخفاء الإحصائيات' : 'لوحة الإحصائيات'}</span>
            </button>
            <button 
              onClick={() => setViewMode('backup')}
              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 cursor-pointer transition font-bold ${
                viewMode === 'backup'
                  ? 'bg-amber-400 text-black border-amber-300 shadow-sm'
                  : 'bg-[#182133] hover:bg-[#202c45] text-amber-300 border-amber-500/30'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>النسخ الاحتياطي</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="text-gray-400 font-mono hidden md:inline">armhf · Broadcom BCM7278 Quad 2.1GHz · {receiverImage}</span>
            <span className="bg-[#064e3b]/80 text-[#34d399] border border-emerald-600/40 px-2 py-0.5 rounded font-mono font-bold">Py 3.12.2</span>
            <span className="bg-[#0e3b5e]/80 text-[#38bdf8] border border-cyan-600/40 px-2.5 py-0.5 rounded font-mono font-bold">{receiverIP}</span>
            <span className="bg-[#1e293b] text-white px-3 py-0.5 rounded font-bold border border-gray-700 flex items-center gap-1.5">
              {receiverModel}
            </span>
            <div className="w-2.5 h-2.5 bg-[#10b981] rounded-full shadow-[0_0_8px_#10b981] animate-pulse"></div>
          </div>
        </div>

        {/* The 4 Telemetry Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#0b0f19] border border-[#1a2235] p-3.5 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>المعالج (CPU)</span>
              </span>
              <span className="text-cyan-400 font-bold font-mono">14%</span>
            </div>
            <div className="w-full bg-gray-800/80 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00e5ff] h-full rounded-full transition-all duration-500" style={{ width: '14%' }}></div>
            </div>
          </div>

          <div className="bg-[#0b0f19] border border-[#1a2235] p-3.5 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>الذاكرة (RAM)</span>
              </span>
              <span className="text-emerald-400 font-bold font-mono">MB 768/2048</span>
            </div>
            <div className="w-full bg-gray-800/80 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#10b981] h-full rounded-full transition-all duration-500" style={{ width: '37%' }}></div>
            </div>
          </div>

          <div className="bg-[#0b0f19] border border-[#1a2235] p-3.5 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                <span>الفلاش الداخلي</span>
              </span>
              <span className="text-cyan-400 font-bold font-mono">MB 1420/4096</span>
            </div>
            <div className="w-full bg-gray-800/80 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00e5ff] h-full rounded-full transition-all duration-500" style={{ width: '34%' }}></div>
            </div>
          </div>

          <div className="bg-[#0b0f19] border border-[#1a2235] p-3 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-gray-400 flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>السوفتكام الفعال</span>
              </div>
              <div className="font-bold text-gray-200 text-[11px] truncate max-w-[170px]">
                {activeCam}
              </div>
            </div>
            <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-600/40 text-[10px] px-2 py-0.5 rounded font-bold font-mono">
              Running
            </span>
          </div>
        </div>
      </div>

      {/* 2.5 LIVE STATISTICAL DASHBOARD SUBCOMPONENT */}
      {showLiveDashboard && (
        <LiveStatsDashboard
          receiverIP={receiverIP}
          receiverModel={receiverModel}
          receiverImage={receiverImage}
          onLaunchTerminal={(name, command) => {
            launchTerminal({
              id: 'stat-' + Date.now(),
              name,
              category: 'tools',
              categoryName: 'لوحة الإحصائيات الحية',
              command,
              description: 'أمر صيانة النظام وتفريغ الذاكرة ومراقبة الأداء'
            });
          }}
          onNotification={showAlert}
          onGoToInstalled={() => setViewMode('installed')}
        />
      )}

      {/* 3. VIEW: INTERACTIVE CATEGORY CARDS GRID */}
      {viewMode === 'categories' && (
        <CategoryCardsGrid
          activeCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            setViewMode('store');
            showAlert(catId === 'all' ? 'عرض كافة الإضافات' : `تم الانتقال إلى قسم: ${CATEGORY_LIST.find(c => c.id === catId)?.name || catId}`);
          }}
          totalPluginsCount={allAvailablePlugins.length}
        />
      )}

      {/* 4. VIEW 1: PLAY STORE VIEW (Grid of Cards) */}
      {viewMode === 'store' && (
        <div className="space-y-3">
          {/* Active Category Banner if filtered */}
          {selectedCategory !== 'all' && (
            <div className="bg-[#131929] border border-cyan-500/30 rounded-xl p-3 flex flex-wrap justify-between items-center text-xs gap-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">التصنيف المعروض حالياً:</span>
                <span className="text-[#00e5ff] font-extrabold">
                  {selectedCategory === 'favorites' ? 'المفضلة ⭐' : CATEGORY_LIST.find(c => c.id === selectedCategory)?.name || selectedCategory}
                </span>
                <span className="text-gray-400 font-mono text-[11px]">({filteredPlugins.length} إضافة)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('categories')}
                  className="bg-[#182133] hover:bg-[#202c45] text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>تغيير التصنيف</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-lg cursor-pointer text-xs"
                >
                  عرض كافة الإضافات
                </button>
              </div>
            </div>
          )}

          {/* Batch Selection Toolbar & Results Header */}
          <div className="bg-[#101626] border border-gray-800 rounded-xl p-3 flex flex-wrap justify-between items-center text-xs gap-3">
            <div className="flex items-center gap-2 text-gray-400">
              <ListChecks className="w-4 h-4 text-cyan-400" />
              <span>تم العثور على <b className="text-cyan-400 font-mono font-bold">{filteredPlugins.length}</b> حزمة</span>
              <span className="text-[11px] text-gray-500 font-mono hidden md:inline">| All E2 Images (Py 3.12 / 2.7)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={selectAllFiltered}
                className="bg-[#182133] hover:bg-[#202c45] text-gray-200 text-xs px-3 py-1.5 rounded-lg border border-gray-700 flex items-center gap-1.5 cursor-pointer transition font-bold"
                title="تحديد كافة الإضافات المعروضة في هذه القائمة"
              >
                <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>تحديد الكل ({filteredPlugins.length})</span>
              </button>

              {selectedForBatch.length > 0 && (
                <>
                  <button
                    onClick={clearBatchSelection}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-2.5 py-1.5 rounded-lg border border-gray-700 flex items-center gap-1 cursor-pointer transition"
                    title="إلغاء التحديد"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>إلغاء ({selectedForBatch.length})</span>
                  </button>

                  <button
                    onClick={launchBatchInstall}
                    className="bg-gradient-to-r from-[#00e5ff] to-cyan-400 hover:from-cyan-400 hover:to-teal-300 text-black text-xs px-3.5 py-1.5 rounded-lg font-black flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20 transition"
                  >
                    <PlayCircle className="w-4 h-4 fill-current" />
                    <span>تثبيت مجمع ({selectedForBatch.length})</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {filteredPlugins.length === 0 ? (
            <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-12 text-center text-gray-500 text-sm">
              لا توجد نتائج تطابق بحثك... جرب البحث باسم آخر مثل (Oscam, MultiStalker, AJPanel).
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPlugins.map((pkg) => {
                const PkgIcon = getCategoryIcon(pkg.category);
                const isSelected = selectedForBatch.includes(pkg.id);
                return (
                  <div 
                    key={pkg.id} 
                    className={`bg-[#131929] border ${
                      isSelected 
                        ? 'border-cyan-400 ring-2 ring-cyan-400/30 bg-[#151f33]' 
                        : 'border-[#1f283e] hover:border-cyan-500/50'
                    } rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between shadow-lg group hover:-translate-y-0.5 relative`}
                  >
                    <div>
                      {/* Icon Box with Batch Checkbox & Favorite Star */}
                      <div className="relative h-28 bg-[#0b0f19] rounded-xl flex items-center justify-center text-cyan-400 text-3xl mb-3 border border-gray-800/80 group-hover:border-cyan-500/30 transition">
                        
                        {/* Multi-Selection Checkbox for Batch Install */}
                        <button
                          onClick={(e) => toggleSelectForBatch(pkg.id, e)}
                          className={`absolute top-2 left-2 p-1.5 rounded-lg transition cursor-pointer flex items-center justify-center z-10 ${
                            isSelected 
                              ? 'bg-[#00e5ff] text-black shadow-lg shadow-cyan-500/30' 
                              : 'bg-black/60 text-gray-400 hover:text-cyan-300 hover:bg-black/90'
                          }`}
                          title={isSelected ? 'إلغاء التحديد للتثبيت المجمع' : 'تحديد للتثبيت المجمع (Batch Install)'}
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>

                        <PkgIcon className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition duration-300" />
                        
                        {/* Favorite Button */}
                        <button
                          onClick={(e) => toggleFavorite(pkg.id, e)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 hover:bg-black/80 transition cursor-pointer z-10"
                          title={favoriteIds.includes(pkg.id) ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                        >
                          <Star className={`w-3.5 h-3.5 ${favoriteIds.includes(pkg.id) ? 'fill-amber-400 text-amber-400' : 'text-gray-500 hover:text-gray-300'}`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-gray-800 text-cyan-300 px-2 py-0.5 rounded border border-gray-700 font-mono">
                          {pkg.categoryName}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                          Official
                        </span>
                      </div>

                      <h3 className="font-bold text-white text-sm mt-2 truncate group-hover:text-cyan-300 transition" title={pkg.name}>
                        {pkg.name}
                      </h3>
                      
                      <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 min-h-[32px]">
                        {pkg.description || 'إضافة رسمية متوافقة مع أجهزة الدريم بوكس، الفيو بلس وكافة صور Enigma2.'}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-gray-800 flex justify-between items-center text-xs">
                      <button
                        onClick={(e) => toggleSelectForBatch(pkg.id, e)}
                        className={`text-[11px] font-mono cursor-pointer flex items-center gap-1 transition ${
                          isSelected ? 'text-cyan-300 font-bold' : 'text-gray-400 hover:text-cyan-300'
                        }`}
                      >
                        {isSelected ? '✓ تم التحديد' : '+ تحديد'}
                      </button>
                      <button 
                        onClick={() => launchTerminal(pkg)}
                        className="bg-[#00e5ff] hover:bg-cyan-400 text-black px-4 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm hover:shadow-cyan-500/20"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>تثبيت</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. VIEW 2: CLASSIC ENIGMA2 REMOTE & SIMULATOR VIEW */}
      {viewMode === 'classic' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories Accordion */}
          <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-cyan-400 pb-2 border-b border-gray-800 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>الأقسام الكلاسيكية لـ TAOUFIK STORE:</span>
            </h2>
            <div className="space-y-2 text-xs">
              {CATEGORY_LIST.filter(c => c.id !== 'all').map((cat) => {
                const isSelected = classicSelectedCat === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => { setClassicSelectedCat(cat.id); setClassicSelectedIdx(0); }}
                    className={`rounded-xl p-3 cursor-pointer transition flex justify-between items-center border ${
                      isSelected 
                        ? 'bg-cyan-500/20 border-cyan-500/60 text-white' 
                        : 'bg-[#0b0f19] border-[#1a2235] text-gray-300 hover:bg-gray-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <cat.icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-amber-400'}`} />
                      <span className="font-bold">{cat.name}</span>
                    </div>
                    <span className="text-gray-400 bg-gray-900 px-2 py-0.5 rounded-md border border-gray-800 font-mono text-[11px]">
                      {cat.count} إضافة &gt;
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enigma2 TV Remote Screen Simulator */}
          <div className="lg:col-span-2 bg-[#0b0f19] border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Tv className="w-5 h-5 text-cyan-400" />
                  <span>محاكي شاشة التلفاز (Enigma2 TV OSD Simulator)</span>
                </h3>
                <p className="text-xs text-gray-400">
                  عرض كلاسيكي مطابق تماماً لما يظهر على شاشة التلفاز في أجهزة Vu+ و Dreambox.
                </p>
              </div>
              <span className="bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs px-2.5 py-1 rounded-md font-mono">
                1080p FHD
              </span>
            </div>

            {/* Simulated TV Canvas */}
            <div className="bg-[#050811] border border-cyan-500/20 rounded-xl p-4 font-sans text-xs space-y-3">
              <div className="flex justify-between items-center text-cyan-400 font-bold border-b border-gray-800/80 pb-2">
                <span>TAOUFIK STORE: {CATEGORY_LIST.find(c => c.id === classicSelectedCat)?.name}</span>
                <span className="text-amber-400 font-mono">{new Date().toLocaleTimeString()}</span>
              </div>

              {/* Items in selected classic category */}
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {ENIGMA_PLUGINS.filter(p => p.category === classicSelectedCat).map((item, idx) => {
                  const isSel = idx === classicSelectedIdx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setClassicSelectedIdx(idx)}
                      className={`p-2.5 rounded-lg flex justify-between items-center cursor-pointer transition ${
                        isSel 
                          ? 'bg-cyan-500 text-black font-extrabold shadow-md' 
                          : 'bg-slate-900/80 text-gray-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">{item.name}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); launchTerminal(item); }}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          isSel ? 'bg-black text-cyan-300' : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                        }`}
                      >
                        [OK] تثبيت
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Remote Color Bar Footer */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-800 text-[11px] font-bold text-center">
                <div className="bg-red-800/80 text-white py-1 rounded">خروج (Red)</div>
                <div className="bg-emerald-800/80 text-white py-1 rounded">تثبيت (Green)</div>
                <div className="bg-amber-800/80 text-white py-1 rounded">بحث (Yellow)</div>
                <div className="bg-blue-800/80 text-white py-1 rounded">إعادة التشغيل (Blue)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. VIEW 3: PYTHON SOURCE CODE */}
      {viewMode === 'code' && (
        <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" />
                <span>ملف بايثون الرسمي (plugin.py) - متوافق مع Python 3.12 و Python 2.7</span>
              </h3>
              <p className="text-xs text-gray-400">
                هذا الملف يتم تثبيته في المسار: /usr/lib/enigma2/python/Plugins/Extensions/ZeroSatPanel/plugin.py
              </p>
            </div>
            <a 
              href="/plugin.py" 
              download="plugin.py"
              className="bg-[#00e5ff] text-black font-extrabold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>تحميل الكود</span>
            </a>
          </div>

          <div className="bg-[#0b0f19] border border-gray-800 rounded-xl p-4 font-mono text-xs text-cyan-300 h-96 overflow-y-auto space-y-1 select-text" dir="ltr">
            <div># -*- coding: utf-8 -*-</div>
            <div># ==============================================================================</div>
            <div># TAOUFIK STORE - Enigma2 Official Multi-Category Addon Manager</div>
            <div># Version: 4.0 Pro Edition (Python 3.12 & Python 2.7 Universal)</div>
            <div># ==============================================================================</div>
            <div className="text-gray-500">...</div>
            <div className="text-emerald-400">class ZeroSatPanelMainScreen(Screen):</div>
            <div className="text-gray-400 pl-4">skin = &quot;&quot;&quot;&lt;screen name=&quot;ZeroSatPanelMainScreen&quot; position=&quot;center,center&quot; size=&quot;1450,890&quot; ...&gt;&quot;&quot;&quot;</div>
            <div className="text-gray-400 pl-4">def __init__(self, session): ...</div>
            <div className="text-gray-500">... (انظر الملف الكامل في /public/plugin.py)</div>
          </div>
        </div>
      )}

      {/* 5. VIEW: SERVER MANAGER COMPONENT */}
      {viewMode === 'servers' && (
        <ServerManager 
          receiverIP={receiverIP}
          onLaunchTerminal={(name, command) => {
            launchTerminal({
              id: 'srv-' + Date.now(),
              name,
              category: 'iptv',
              categoryName: 'خوادم M3U / XML',
              command,
              description: 'تثبيت وتحديث باقة القنوات الفضائية وملف البوكيه على جهاز الرسيفر'
            });
          }}
          onNotification={showAlert}
        />
      )}

      {/* 6. VIEW: SOFTCAM CONFIG GENERATOR */}
      {viewMode === 'softcam' && (
        <SoftcamConfigGenerator 
          receiverIP={receiverIP}
          onLaunchTerminal={(name, command) => {
            launchTerminal({
              id: 'softcam-' + Date.now(),
              name,
              category: 'softcams',
              categoryName: 'مولد السوفتكام',
              command,
              description: 'تثبيت وتحديث ملفات التكوين والاشتراكات في مسار /etc/tuxbox/config/'
            });
          }}
          onNotification={showAlert}
        />
      )}

      {/* 7. VIEW: INSTALLED PACKAGES & ADVANCED TOOLS */}
      {viewMode === 'installed' && (
        <InstalledManager
          receiverIP={receiverIP}
          onLaunchTerminal={(name, command) => {
            launchTerminal({
              id: 'installed-' + Date.now(),
              name,
              category: 'tools',
              categoryName: 'مدير الحزم والمؤشرات',
              command,
              description: 'إدارة وتحديث الحزم المثبتة وفحص الإشارة'
            });
          }}
          onNotification={showAlert}
          onAddCustomPlugin={handleAddCustomPlugin}
        />
      )}

      {/* VIEW: BACKUP & RESTORE MANAGER */}
      {viewMode === 'backup' && (
        <BackupManager
          receiverIP={receiverIP}
          receiverModel={receiverModel}
          receiverImage={receiverImage}
          favoriteIds={favoriteIds}
          onRestoreSuccess={handleRestoreSuccess}
          onLaunchTerminal={(name, command) => {
            launchTerminal({
              id: 'backup-' + Date.now(),
              name,
              category: 'tools',
              categoryName: 'النسخ الاحتياطي والاستعادة',
              command,
              description: 'أمر النسخ الاحتياطي واستعادة البيانات على جهاز الرسيفر'
            });
          }}
          onNotification={showAlert}
        />
      )}

      {/* 5.5 FLOATING BATCH ACTION BAR */}
      {selectedForBatch.length > 0 && (
        <aside aria-label="شريط إجراءات التثبيت المجمع" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-3xl bg-[#0c1220]/95 backdrop-blur-md border border-cyan-400/60 rounded-2xl p-3.5 md:p-4 shadow-[0_10px_35px_rgba(0,229,255,0.25)] flex flex-wrap items-center justify-between gap-3 animate-slideUp">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/20 text-cyan-300 p-2.5 rounded-xl border border-cyan-500/40">
              <ListChecks className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>تم تحديد</span>
                <span className="bg-[#00e5ff] text-black px-2 py-0.5 rounded-full font-mono text-xs font-black shadow-sm">
                  {selectedForBatch.length}
                </span>
                <span>إضافات للتثبيت المجمع</span>
              </div>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                سيقوم النظام بتثبيت الحزم المحددة بالتتابع تلقائياً بدون تدخل يدوي
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={copyBatchCommand}
              className="bg-[#182133] hover:bg-[#202c45] text-cyan-300 text-xs px-3 py-2 rounded-xl border border-cyan-500/30 flex items-center gap-1.5 transition cursor-pointer font-bold"
              title="نسخ أمر التثبيت المتسلسل الموحد لاستخدامه في Telnet أو PuTTY"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden md:inline">نسخ أمر Telnet</span>
            </button>

            <button
              onClick={clearBatchSelection}
              className="bg-gray-800/80 hover:bg-gray-700 text-gray-300 text-xs px-3 py-2 rounded-xl border border-gray-700 flex items-center gap-1 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>إلغاء</span>
            </button>

            <button
              onClick={launchBatchInstall}
              className="bg-gradient-to-r from-[#00e5ff] via-cyan-400 to-teal-300 hover:from-cyan-400 hover:to-teal-200 text-black text-xs px-5 py-2 rounded-xl font-black flex items-center gap-2 transition cursor-pointer shadow-lg shadow-cyan-500/30"
            >
              <PlayCircle className="w-4 h-4 fill-current" />
              <span>تثبيت الكل بالتتابع ({selectedForBatch.length})</span>
            </button>
          </div>
        </aside>
      )}

      {/* 6. LIVE TERMINAL MODAL (Single Item & Sequential Batch Mode) */}
      {isTerminalOpen && (currentTerminalItem || isBatchMode) && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#131929] rounded-2xl p-6 max-w-2xl w-full space-y-4 border border-cyan-500/40 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {isBatchMode ? (
                  <>
                    <ListChecks className="w-5 h-5 text-[#00e5ff]" />
                    <span>
                      التثبيت المجمع بالتتابع {batchCompleted ? `(اكتمل ${batchQueue.length}/${batchQueue.length})` : `(${Math.min(batchCurrentIndex + 1, batchQueue.length)} من ${batchQueue.length})`}
                    </span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-5 h-5 text-[#00e5ff]" />
                    <span>تثبيت: {currentTerminalItem?.name}</span>
                  </>
                )}
              </h3>
              <button 
                onClick={closeTerminalModal}
                className="text-gray-400 hover:text-white cursor-pointer"
                title="إغلاق الطرفية"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Batch Progress Bar & Queue Chips */}
            {isBatchMode && (
              <div className="space-y-2 bg-[#0b0f19] p-3 rounded-xl border border-gray-800">
                <div className="flex justify-between text-[11px] text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>التقدم العام للتثبيت المتسلسل:</span>
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">
                    {Math.round(((batchCompleted ? batchQueue.length : batchCurrentIndex) / Math.max(1, batchQueue.length)) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-800/80 h-2 rounded-full overflow-hidden border border-gray-700/50">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.round(((batchCompleted ? batchQueue.length : batchCurrentIndex) / Math.max(1, batchQueue.length)) * 100)}%` }}
                  />
                </div>
                
                {/* Horizontal status chips for the queued packages */}
                <div className="flex gap-1.5 overflow-x-auto py-1 max-w-full">
                  {batchQueue.map((item, qIdx) => {
                    const isDone = batchCompleted || qIdx < batchCurrentIndex;
                    const isCurrent = !batchCompleted && qIdx === batchCurrentIndex;
                    return (
                      <div
                        key={item.id}
                        className={`shrink-0 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 border font-mono transition ${
                          isDone
                            ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                            : isCurrent
                            ? 'bg-cyan-950 border-cyan-400 text-cyan-300 animate-pulse font-bold'
                            : 'bg-gray-900 border-gray-800 text-gray-500'
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : isCurrent ? (
                          <RotateCw className="w-3 h-3 animate-spin text-cyan-400" />
                        ) : (
                          <span className="text-gray-500">{qIdx + 1}</span>
                        )}
                        <span className="truncate max-w-[90px]">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="bg-[#0b0f19] p-4 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 h-64 overflow-y-auto border border-gray-800" dir="ltr">
              {terminalLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={
                    log.includes('[SUCCESS]') || log.includes('[ALL COMPLETED]') 
                      ? 'text-cyan-300 font-bold' 
                      : log.includes('[COMMAND]') || log.includes('[CMD]')
                      ? 'text-amber-300' 
                      : log.includes('>>>')
                      ? 'text-cyan-400 font-bold'
                      : log.includes('[BATCH CANCELLED]')
                      ? 'text-red-400 font-bold'
                      : 'text-emerald-400'
                  }
                >
                  {log}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 pt-2">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    if (isBatchMode) {
                      copyBatchCommand();
                    } else if (currentTerminalItem) {
                      copyToClipboard(currentTerminalItem.command, 'modal-cmd');
                    }
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-3.5 py-2 rounded-xl border border-gray-700 flex items-center gap-1.5 cursor-pointer"
                  title="نسخ الأمر للحافظة"
                >
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span>{isBatchMode ? 'نسخ أمر Telnet المجمع' : 'نسخ الأمر'}</span>
                </button>

                {isBatchMode && isExecuting && (
                  <button 
                    onClick={cancelBatch}
                    className="bg-red-950/80 hover:bg-red-900 text-red-300 text-xs px-3 py-2 rounded-xl border border-red-800/50 flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>إيقاف التثبيت</span>
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                {isBatchMode ? (
                  <>
                    <button 
                      onClick={closeTerminalModal}
                      className="bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-700"
                    >
                      إغلاق
                    </button>
                    {batchCompleted && (
                      <button 
                        onClick={restartGUI}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-extrabold text-xs px-5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
                      >
                        <RotateCw className="w-4 h-4" />
                        <span>إعادة تشغيل واجهة الرسيفر</span>
                      </button>
                    )}
                    {!batchCompleted && !isExecuting && (
                      <button 
                        onClick={launchBatchInstall}
                        className="bg-[#00e5ff] hover:bg-cyan-400 text-black font-bold text-xs px-5 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>إعادة تشغيل الدفعة</span>
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button 
                      onClick={closeTerminalModal}
                      className="bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-700"
                    >
                      إلغاء
                    </button>
                    <button 
                      onClick={() => currentTerminalItem && launchTerminal(currentTerminalItem)}
                      className="bg-[#00e5ff] hover:bg-cyan-400 text-black font-bold text-xs px-5 py-2 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>تثبيت الآن</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. CHANGE DEVICE MODAL */}
      {isDeviceModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#131929] border border-cyan-500/40 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-400" />
                <span>إعدادات الاتصال بالرسيفر</span>
              </h3>
              <button onClick={() => setIsDeviceModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">عنوان IP الخاص برسيفر الإنيجما 2:</label>
                <input 
                  type="text" 
                  value={tempIP} 
                  onChange={(e) => setTempIP(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  placeholder="مثال: 192.168.1.105"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">نوع وموديل الرسيفر:</label>
                <select 
                  value={receiverModel}
                  onChange={(e) => setReceiverModel(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Vu+ Duo 4K SE">Vu+ Duo 4K SE</option>
                  <option value="Vu+ Ultimo 4K">Vu+ Ultimo 4K</option>
                  <option value="Dreambox ONE UHD">Dreambox ONE UHD</option>
                  <option value="Dreambox TWO UHD">Dreambox TWO UHD</option>
                  <option value="Octagon SF8008 4K">Octagon SF8008 4K</option>
                  <option value="Zgemma H9 / H11">Zgemma H9 / H11</option>
                  <option value="GigaBlue UHD Quad 4K">GigaBlue UHD Quad 4K</option>
                  <option value="Novaler Multibox 4K">Novaler Multibox 4K</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">صورة الإنيغما 2 المثبتة:</label>
                <select 
                  value={receiverImage}
                  onChange={(e) => setReceiverImage(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="OpenATV 7.4 (Py 3.12)">OpenATV 7.4 (Py 3.12)</option>
                  <option value="OpenPLi 9.0 (Py 3.11)">OpenPLi 9.0 (Py 3.11)</option>
                  <option value="Egami 10.5 (Py 3.12)">Egami 10.5 (Py 3.12)</option>
                  <option value="PurE2 7.3 (Py 3.11)">PurE2 7.3 (Py 3.11)</option>
                  <option value="BlackHole 3.1.2">BlackHole 3.1.2</option>
                  <option value="VTi 15.0">VTi 15.0</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
              <button 
                onClick={() => setIsDeviceModalOpen(false)}
                className="bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-xl"
              >
                إلغاء
              </button>
              <button 
                onClick={saveDeviceSettings}
                className="bg-[#00e5ff] text-black font-extrabold text-xs px-5 py-2 rounded-xl"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
