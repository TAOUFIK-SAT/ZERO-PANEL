import React, { useState, useEffect } from 'react';
import { 
  PackageCheck, 
  RotateCw, 
  Trash2, 
  ArrowUpCircle, 
  Terminal, 
  Plus, 
  Radio, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Tv, 
  Sliders, 
  Layers, 
  Play, 
  Copy, 
  Check, 
  X,
  ExternalLink,
  ShieldCheck,
  Send,
  Zap
} from 'lucide-react';
import { EnigmaPluginItem } from '../enigmaPluginsData';

interface InstalledPlugin {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  installedVersion: string;
  latestVersion: string;
  hasUpdate: boolean;
  installDate: string;
  sizeMb: number;
  command: string;
}

interface SatelliteTransponder {
  satName: string;
  frequency: string;
  polarity: 'H' | 'V';
  symbolRate: string;
  fec: string;
  snrPercent: number;
  agcPercent: number;
  ber: number;
  isLocked: boolean;
}

const DEFAULT_INSTALLED_PLUGINS: InstalledPlugin[] = [
  {
    id: 'ajpanel-pro',
    name: 'AjPanel Pro (Official)',
    category: 'panels',
    categoryName: 'البانلات (Panels)',
    installedVersion: 'v9.4.0',
    latestVersion: 'v9.6.0',
    hasUpdate: true,
    installDate: '2026-11-01',
    sizeMb: 4.8,
    command: 'wget -q "--no-check-certificate" http://dreambox4u.com/emilnabil237/plugins/ajpanel/installer.sh -O - | /bin/sh'
  },
  {
    id: 'multistalkerpro-inst',
    name: 'MultiStalkerPro',
    category: 'iptv',
    categoryName: 'الميديا والـ IPTV',
    installedVersion: 'v1.4',
    latestVersion: 'v1.5',
    hasUpdate: true,
    installDate: '2026-10-25',
    sizeMb: 12.2,
    command: 'wget -q "--no-check-certificate" https://raw.githubusercontent.com/emilnabil/multi-stalkerpro/main/installer.sh -O - | /bin/sh'
  },
  {
    id: 'oscam-emu-inst',
    name: 'OScam-Emu + ICam v11793',
    category: 'softcams',
    categoryName: 'الشفرات (Softcams)',
    installedVersion: 'v11793-r801',
    latestVersion: 'v11793-r801',
    hasUpdate: false,
    installDate: '2026-11-08',
    sizeMb: 2.1,
    command: 'wget https://raw.githubusercontent.com/emil237/oscam/main/installer.sh -O - | /bin/sh'
  },
  {
    id: 'subsupport-inst',
    name: 'SubSupport & Dsayed Subtitles',
    category: 'plugins',
    categoryName: 'البلجنات العامة (Plugins)',
    installedVersion: 'v1.5.8',
    latestVersion: 'v1.5.8',
    hasUpdate: false,
    installDate: '2026-11-02',
    sizeMb: 5.6,
    command: 'wget -q "--no-check-certificate" https://raw.githubusercontent.com/belfagor2005/subsupport/main/installer.sh -O - | /bin/sh'
  },
  {
    id: 'neoboot-inst',
    name: 'Neoboot 9.65 Mod ElSafty',
    category: 'multiboot',
    categoryName: 'المولتي بوت (Multiboot)',
    installedVersion: 'v9.65',
    latestVersion: 'v9.65',
    hasUpdate: false,
    installDate: '2026-10-18',
    sizeMb: 18.4,
    command: 'wget https://raw.githubusercontent.com/emil237/neoboot_v9.65/main/iNB_9.65_mod-elsafty.sh -O - | /bin/sh'
  },
  {
    id: 'elsafty-channels-inst',
    name: 'قنوات Elsafty Steaming Motor',
    category: 'channels',
    categoryName: 'ملفات القنوات (Channels)',
    installedVersion: '2026.10',
    latestVersion: '2026.11-Nov',
    hasUpdate: true,
    installDate: '2026-10-15',
    sizeMb: 3.2,
    command: 'wget -q "--no-check-certificate" https://dreambox4u.com/emilnabil237/settings/elsafty/installer.sh -O - | /bin/sh'
  }
];

const TRANSPONDERS: SatelliteTransponder[] = [
  { satName: 'Nilesat 7.0°W (نايل سات)', frequency: '11747', polarity: 'V', symbolRate: '27500', fec: '5/6', snrPercent: 94, agcPercent: 88, ber: 0, isLocked: true },
  { satName: 'Hotbird 13.0°E (هوتبيرد)', frequency: '11034', polarity: 'V', symbolRate: '27500', fec: '3/4', snrPercent: 89, agcPercent: 84, ber: 0, isLocked: true },
  { satName: 'Astra 19.2°E (أسترا)', frequency: '11954', polarity: 'H', symbolRate: '27500', fec: '9/10', snrPercent: 92, agcPercent: 86, ber: 0, isLocked: true },
  { satName: 'Badr 26.0°E (عرب سات / بدر)', frequency: '11270', polarity: 'V', symbolRate: '27500', fec: '5/6', snrPercent: 86, agcPercent: 82, ber: 0, isLocked: true },
  { satName: 'Eutelsat 16.0°E (يوتلسات 16)', frequency: '11221', polarity: 'H', symbolRate: '30000', fec: '3/5', snrPercent: 84, agcPercent: 80, ber: 0, isLocked: true }
];

interface InstalledManagerProps {
  receiverIP: string;
  onLaunchTerminal: (name: string, command: string) => void;
  onNotification: (msg: string) => void;
  onAddCustomPlugin?: (pkg: EnigmaPluginItem) => void;
}

export default function InstalledManager({
  receiverIP,
  onLaunchTerminal,
  onNotification,
  onAddCustomPlugin
}: InstalledManagerProps) {
  const [activeSubTab, setActiveSubTab] = useState<'packages' | 'signal' | 'console'>('packages');
  const [plugins, setPlugins] = useState<InstalledPlugin[]>(() => {
    const saved = localStorage.getItem('taoufik_installed_plugins');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return DEFAULT_INSTALLED_PLUGINS; }
    }
    return DEFAULT_INSTALLED_PLUGINS;
  });

  const [filterType, setFilterType] = useState<'all' | 'updates' | 'uptodate'>('all');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Custom Plugin Form
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState('plugins');
  const [customCommand, setCustomCommand] = useState('');
  const [customDesc, setCustomDesc] = useState('');

  // Signal state
  const [selectedSat, setSelectedSat] = useState<number>(0);

  // Live Console state
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleHistory, setConsoleHistory] = useState<string[]>([
    `[TAOUFIK STORE] Connected to ${receiverIP} via Telnet daemon (port 23)`,
    `[ENIGMA2] OpenATV 7.4 (Python 3.12.2) · Broadcom BCM7278`,
    `Type any linux command or select from quick actions below:`
  ]);

  useEffect(() => {
    localStorage.setItem('taoufik_installed_plugins', JSON.stringify(plugins));
  }, [plugins]);

  const updateSingle = (pkg: InstalledPlugin) => {
    onLaunchTerminal(`تحديث ${pkg.name} إلى ${pkg.latestVersion}`, pkg.command);
    setTimeout(() => {
      setPlugins(prev => prev.map(p => p.id === pkg.id ? { ...p, installedVersion: p.latestVersion, hasUpdate: false } : p));
      onNotification(`تم تحديث ${pkg.name} بنجاح!`);
    }, 1500);
  };

  const updateAll = () => {
    const needUpdate = plugins.filter(p => p.hasUpdate);
    if (needUpdate.length === 0) {
      onNotification('جميع الحزم المثبتة محدثة إلى آخر إصدار!');
      return;
    }
    const combinedCmd = needUpdate.map(p => p.command).join(' && ');
    onLaunchTerminal(`تحديث شامل لكافة إضافات المتجر (${needUpdate.length} حزمة)`, combinedCmd);
    setTimeout(() => {
      setPlugins(prev => prev.map(p => ({ ...p, installedVersion: p.latestVersion, hasUpdate: false })));
      onNotification(`تم تحديث جميع الإضافات (${needUpdate.length}) بنجاح!`);
    }, 2500);
  };

  const uninstallPkg = (pkg: InstalledPlugin) => {
    if (confirm(`هل أنت متأكد من رغبتك في حذف وإلغاء تثبيت [${pkg.name}] من الرسيفر؟`)) {
      const cleanName = pkg.id.replace(/[^a-zA-Z0-9]/g, '');
      const cmd = `rm -rf /usr/lib/enigma2/python/Plugins/Extensions/${cleanName}* 2>/dev/null; opkg remove --autoremove *${cleanName}* 2>/dev/null; echo "[TAOUFIK STORE] Plugin ${pkg.name} uninstalled successfully"`;
      onLaunchTerminal(`إلغاء تثبيت ${pkg.name}`, cmd);
      setPlugins(prev => prev.filter(p => p.id !== pkg.id));
      onNotification(`تمت إزالة ${pkg.name} من قائمة الحزم المثبتة`);
    }
  };

  const handleAddCustomPlugin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customCommand.trim()) {
      alert('يرجى كتابة اسم الإضافة وأمر التثبيت');
      return;
    }

    const newPkg: InstalledPlugin = {
      id: 'custom-' + Date.now(),
      name: customName.trim(),
      category: customCategory,
      categoryName: 'إضافة مخصصة',
      installedVersion: 'v1.0-custom',
      latestVersion: 'v1.0-custom',
      hasUpdate: false,
      installDate: new Date().toISOString().split('T')[0],
      sizeMb: 1.5,
      command: customCommand.trim()
    };

    setPlugins(prev => [newPkg, ...prev]);

    if (onAddCustomPlugin) {
      onAddCustomPlugin({
        id: newPkg.id,
        name: newPkg.name,
        category: newPkg.category,
        categoryName: 'إضافات المستخدم المخصصة',
        command: newPkg.command,
        description: customDesc || 'إضافة خاصة تمت إضافتها من قبل المستخدم'
      });
    }

    setIsAddModalOpen(false);
    setCustomName('');
    setCustomCommand('');
    setCustomDesc('');
    onNotification(`تمت إضافة [${newPkg.name}] إلى متجر توفيق بنجاح!`);
  };

  // Run Telnet Console Command
  const runConsoleCommand = (cmdText?: string) => {
    const cmd = cmdText || consoleInput;
    if (!cmd.trim()) return;

    setConsoleHistory(prev => [...prev, `root@enigma2:~# ${cmd}`]);
    setConsoleInput('');

    setTimeout(() => {
      let output = `[OK] Command executed successfully with exit code 0`;
      if (cmd.includes('opkg update')) {
        output = `Downloading http://openatv/feed/Packages.gz\nUpdated source 'openatv-feed'.\nPackages index refreshed.`;
      } else if (cmd.includes('free -m')) {
        output = `              total        used        free      shared  buff/cache   available\nMem:           2048         768        1180          12          90        1250\nSwap:             0           0           0`;
      } else if (cmd.includes('df -h')) {
        output = `Filesystem                Size      Used Available Use% Mounted on\n/dev/root                 3.8G      1.4G      2.2G  37% /\n/dev/sda1                58.4G     22.1G     36.3G  38% /media/hdd`;
      } else if (cmd.includes('init 4')) {
        output = `Stopping enigma2 daemon...\nRestarting GUI components... OK!`;
      } else if (cmd.includes('reboot')) {
        output = `Broadcast message from root@enigma2: Receiver is rebooting NOW!`;
      }
      setConsoleHistory(prev => [...prev, output]);
    }, 400);
  };

  const filteredPlugins = plugins.filter(p => {
    const matchesFilter = 
      filterType === 'all' ? true :
      filterType === 'updates' ? p.hasUpdate :
      !p.hasUpdate;
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateCount = plugins.filter(p => p.hasUpdate).length;

  return (
    <div className="space-y-5 select-none" dir="rtl">
      
      {/* Top Pro Bar */}
      <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
              <PackageCheck className="w-4 h-4 text-cyan-400" />
              <span>مركز التحكم المتقدم لأجهزة الإنيجما 2</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              إدارة الحزم المثبتة · فاحص الإشارة · الترمينال المباشر
            </h2>
          </div>

          {/* Sub Navigation Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveSubTab('packages')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activeSubTab === 'packages'
                  ? 'bg-[#00e5ff] text-black font-extrabold shadow-md'
                  : 'bg-[#182133] hover:bg-[#202c45] text-gray-300 border border-gray-700/60'
              }`}
            >
              <PackageCheck className="w-4 h-4" />
              <span>الحزم والتحديثات</span>
              {updateCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {updateCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveSubTab('signal')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activeSubTab === 'signal'
                  ? 'bg-[#00e5ff] text-black font-extrabold shadow-md'
                  : 'bg-[#182133] hover:bg-[#202c45] text-gray-300 border border-gray-700/60'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>فاحص إشارة الأقمار (Signal Meter)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('console')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                activeSubTab === 'console'
                  ? 'bg-[#00e5ff] text-black font-extrabold shadow-md'
                  : 'bg-[#182133] hover:bg-[#202c45] text-gray-300 border border-gray-700/60'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>الترمينال المباشر (CLI Console)</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: PACKAGES & UPDATES */}
      {activeSubTab === 'packages' && (
        <div className="space-y-4">
          {/* Action Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-cyan-500 text-black'
                    : 'bg-[#131929] text-gray-300 border border-gray-700'
                }`}
              >
                الكل ({plugins.length})
              </button>
              <button
                onClick={() => setFilterType('updates')}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  filterType === 'updates'
                    ? 'bg-amber-500 text-black font-extrabold'
                    : 'bg-[#131929] text-amber-400 border border-amber-600/40'
                }`}
              >
                <ArrowUpCircle className="w-3.5 h-3.5" />
                <span>تحديثات متوفرة ({updateCount})</span>
              </button>
              <button
                onClick={() => setFilterType('uptodate')}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                  filterType === 'uptodate'
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#131929] text-gray-300 border border-gray-700'
                }`}
              >
                محدثة بالكامل
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="بحث في الحزم المثبتة..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 w-full sm:w-60"
              />

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#182133] hover:bg-[#202c45] text-cyan-300 border border-cyan-500/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>إضافة بلوغين مخصص</span>
              </button>

              {updateCount > 0 && (
                <button
                  onClick={updateAll}
                  className="bg-[#00e5ff] hover:bg-cyan-400 text-black px-4 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition shadow-lg shadow-cyan-500/20"
                >
                  <ArrowUpCircle className="w-4 h-4 fill-current" />
                  <span>تحديث الكل ({updateCount})</span>
                </button>
              )}
            </div>
          </div>

          {/* Plugins Table / Grid */}
          <div className="bg-[#131929] border border-[#1f283e] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#0b0f19] border-b border-gray-800 text-gray-400 font-mono">
                  <tr>
                    <th className="py-3 px-4">اسم الإضافة والملف</th>
                    <th className="py-3 px-3">القسم</th>
                    <th className="py-3 px-3">الإصدار المثبت</th>
                    <th className="py-3 px-3">أحدث إصدار بالمستودع</th>
                    <th className="py-3 px-3">الحجم</th>
                    <th className="py-3 px-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {filteredPlugins.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-gray-500 text-xs">
                        لا توجد حزم تطابق التصفية المحددة.
                      </td>
                    </tr>
                  ) : (
                    filteredPlugins.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-slate-900/60 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-sm">{pkg.name}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5 truncate max-w-xs">{pkg.command}</div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="bg-gray-800 text-cyan-300 border border-gray-700 px-2 py-0.5 rounded font-mono text-[10px]">
                            {pkg.categoryName}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-gray-300">
                          {pkg.installedVersion}
                        </td>
                        <td className="py-3.5 px-3 font-mono">
                          {pkg.hasUpdate ? (
                            <span className="text-amber-400 font-bold flex items-center gap-1">
                              <ArrowUpCircle className="w-3.5 h-3.5" />
                              <span>{pkg.latestVersion} (تحديث متوفر)</span>
                            </span>
                          ) : (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{pkg.latestVersion} (أحدث إصدار)</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 font-mono text-gray-400">
                          {pkg.sizeMb} MB
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {pkg.hasUpdate && (
                              <button
                                onClick={() => updateSingle(pkg)}
                                className="bg-[#00e5ff] hover:bg-cyan-400 text-black px-3 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition shadow-sm text-[11px]"
                              >
                                <ArrowUpCircle className="w-3 h-3 fill-current" />
                                <span>ترقية</span>
                              </button>
                            )}
                            <button
                              onClick={() => onLaunchTerminal(`إعادة تثبيت ${pkg.name}`, pkg.command)}
                              className="bg-[#182133] hover:bg-[#202c45] text-gray-300 border border-gray-700 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer transition text-[11px]"
                              title="إعادة التثبيت"
                            >
                              <RotateCw className="w-3 h-3 text-cyan-400" />
                              <span>إعادة تثبيت</span>
                            </button>
                            <button
                              onClick={() => uninstallPkg(pkg)}
                              className="bg-red-950/60 hover:bg-red-900 text-red-400 border border-red-800/40 p-1.5 rounded-lg cursor-pointer transition"
                              title="إلغاء التثبيت وحذف الإضافة"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SATELLITE SIGNAL METER */}
      {activeSubTab === 'signal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Satellites Selection List (4 Cols) */}
          <div className="lg:col-span-4 bg-[#131929] border border-[#1f283e] rounded-2xl p-5 space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>قائمة الأقمار وترددات القياس المعتمدة:</span>
            </h3>

            <div className="space-y-2 text-xs">
              {TRANSPONDERS.map((sat, idx) => {
                const isSel = idx === selectedSat;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedSat(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      isSel 
                        ? 'bg-cyan-500/20 border-cyan-400 text-white' 
                        : 'bg-[#0b0f19] border-gray-800 text-gray-300 hover:bg-gray-800/60'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{sat.satName}</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                        {sat.frequency} {sat.polarity} {sat.symbolRate} ({sat.fec})
                      </div>
                    </div>
                    <div className="text-left font-mono">
                      <div className="text-cyan-400 font-bold">{sat.snrPercent}%</div>
                      <div className="text-[10px] text-emerald-400">LOCKED 🟢</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Sat Signal Visual Gauges (8 Cols) */}
          <div className="lg:col-span-8 bg-[#131929] border border-[#1f283e] rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-wrap justify-between items-center border-b border-gray-800 pb-3 gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Tv className="w-5 h-5 text-cyan-400" />
                  <span>{TRANSPONDERS[selectedSat].satName}</span>
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  Tuner A (DVB-S2X) · TP: {TRANSPONDERS[selectedSat].frequency} {TRANSPONDERS[selectedSat].polarity} {TRANSPONDERS[selectedSat].symbolRate}
                </p>
              </div>

              <span className="bg-emerald-950 text-emerald-400 border border-emerald-700/60 px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SIGNAL LOCKED (DVB-S2)</span>
              </span>
            </div>

            {/* Signal Gauges */}
            <div className="space-y-4">
              {/* SNR Gauge */}
              <div className="bg-[#0b0f19] border border-[#1a2235] p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>جودة الإشارة (SNR - Signal Quality):</span>
                  </span>
                  <span className="text-cyan-400 font-bold font-mono text-sm">{TRANSPONDERS[selectedSat].snrPercent}% (15.2 dB)</span>
                </div>
                <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-[#00e5ff] h-full rounded-full transition-all duration-500 shadow-md shadow-cyan-500/20" 
                    style={{ width: `${TRANSPONDERS[selectedSat].snrPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* AGC Gauge */}
              <div className="bg-[#0b0f19] border border-[#1a2235] p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-300 font-bold flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-emerald-400" />
                    <span>قوة الإشارة (AGC - Signal Strength):</span>
                  </span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">{TRANSPONDERS[selectedSat].agcPercent}%</span>
                </div>
                <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#10b981] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${TRANSPONDERS[selectedSat].agcPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* BER info */}
              <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                <div className="bg-[#0b0f19] border border-[#1a2235] p-3 rounded-xl text-center">
                  <div className="text-gray-400 text-[11px]">معدل الخطأ (BER)</div>
                  <div className="text-emerald-400 font-bold text-sm mt-1">0 (Zero Errors)</div>
                </div>
                <div className="bg-[#0b0f19] border border-[#1a2235] p-3 rounded-xl text-center">
                  <div className="text-gray-400 text-[11px]">التيونر المستعمل</div>
                  <div className="text-cyan-400 font-bold text-sm mt-1">Tuner A (DVB-S2X)</div>
                </div>
                <div className="bg-[#0b0f19] border border-[#1a2235] p-3 rounded-xl text-center">
                  <div className="text-gray-400 text-[11px]">حالة القفل</div>
                  <div className="text-amber-400 font-bold text-sm mt-1">LOCK 100%</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNotification(`تم إرسال إشارة ضبط التيونر للتردد ${TRANSPONDERS[selectedSat].frequency} إلى الرسيفر`)}
                className="bg-[#182133] hover:bg-[#202c45] text-cyan-300 border border-cyan-500/30 text-xs px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer transition font-bold"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>إعادة قفل التردد على الرسيفر ({receiverIP})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: INTERACTIVE TELNET CONSOLE */}
      {activeSubTab === 'console' && (
        <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-wrap justify-between items-center border-b border-gray-800 pb-3 gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>الترمينال المباشر للرسيفر (Enigma2 Telnet/SSH Shell)</span>
              </h3>
              <p className="text-xs text-gray-400">
                نفذ أوامر لينكس مباشرة على الرسيفر أو اختر من قائمة الأوامر الشائعة أدناه.
              </p>
            </div>

            {/* Quick Command Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                onClick={() => runConsoleCommand('opkg update')}
                className="bg-[#182133] hover:bg-[#202c45] text-cyan-300 border border-gray-700 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                opkg update
              </button>
              <button
                onClick={() => runConsoleCommand('free -m')}
                className="bg-[#182133] hover:bg-[#202c45] text-emerald-300 border border-gray-700 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                free -m
              </button>
              <button
                onClick={() => runConsoleCommand('df -h')}
                className="bg-[#182133] hover:bg-[#202c45] text-amber-300 border border-gray-700 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                df -h
              </button>
              <button
                onClick={() => runConsoleCommand('init 4 && init 3')}
                className="bg-[#182133] hover:bg-[#202c45] text-red-300 border border-gray-700 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                Restart GUI
              </button>
            </div>
          </div>

          {/* Console Output Screen */}
          <div className="bg-[#0b0f19] border border-gray-800 rounded-xl p-4 font-mono text-xs text-emerald-400 h-80 overflow-y-auto space-y-1.5 select-text" dir="ltr">
            {consoleHistory.map((line, idx) => (
              <div 
                key={idx} 
                className={
                  line.startsWith('root@enigma2') 
                    ? 'text-cyan-300 font-bold' 
                    : line.startsWith('[OK]') 
                    ? 'text-emerald-300' 
                    : 'text-gray-300'
                }
              >
                {line}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form 
            onSubmit={(e) => { e.preventDefault(); runConsoleCommand(); }}
            className="flex gap-2"
            dir="ltr"
          >
            <span className="bg-[#0b0f19] border border-gray-800 text-cyan-400 font-mono text-xs px-3 py-2 rounded-xl flex items-center">
              root@enigma2:~#
            </span>
            <input
              type="text"
              value={consoleInput}
              onChange={(e) => setConsoleInput(e.target.value)}
              placeholder="اكتب أي أمر شيل (مثلاً: opkg list-installed | grep oscam)..."
              className="flex-grow bg-[#0b0f19] border border-gray-700 rounded-xl px-4 py-2 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#00e5ff] hover:bg-cyan-400 text-black px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow-md shadow-cyan-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال</span>
            </button>
          </form>
        </div>
      )}

      {/* MODAL: ADD CUSTOM PLUGIN */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#131929] border border-cyan-500/40 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>إضافة إضافة مخصصة لمتجر توفيق (Custom Plugin)</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomPlugin} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1 font-bold">اسم الإضافة:</label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="مثال: My Custom EPG Plugin"
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-bold">القسم:</label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="iptv">الميديا والـ IPTV</option>
                  <option value="panels">البانلات (Panels)</option>
                  <option value="softcams">الشفرات (Softcams)</option>
                  <option value="channels">ملفات القنوات (Channels)</option>
                  <option value="plugins">البلجنات العامة (Plugins)</option>
                  <option value="skins">السكينات (Skins FHD)</option>
                  <option value="tools">الأدوات والصور (Tools)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-bold">أمر التثبيت عبر الشيل أو رابط السكريبت:</label>
                <textarea
                  required
                  rows={3}
                  value={customCommand}
                  onChange={(e) => setCustomCommand(e.target.value)}
                  placeholder="wget https://myrepo.com/plugin/installer.sh -O - | /bin/sh"
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-cyan-300 font-mono focus:border-cyan-400 focus:outline-none"
                  dir="ltr"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-bold">وصف موجز للإضافة (اختياري):</label>
                <input
                  type="text"
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="وصف عمل الإضافة والأجهزة المتوافقة..."
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-[#00e5ff] text-black font-extrabold text-xs px-5 py-2 rounded-xl shadow-md shadow-cyan-500/20"
                >
                  حفظ وإضافة للمتجر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
