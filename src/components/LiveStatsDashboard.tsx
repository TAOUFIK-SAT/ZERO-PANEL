import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  HardDrive, 
  PackageCheck, 
  Zap, 
  RotateCw, 
  Layers, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpCircle, 
  Thermometer, 
  Gauge, 
  Radio, 
  Trash2,
  RefreshCw,
  Folder,
  Server,
  Sparkles
} from 'lucide-react';

interface LiveStatsDashboardProps {
  receiverIP: string;
  receiverModel: string;
  receiverImage: string;
  onLaunchTerminal?: (name: string, command: string) => void;
  onNotification?: (msg: string) => void;
  onGoToInstalled?: () => void;
}

export default function LiveStatsDashboard({
  receiverIP,
  receiverModel,
  receiverImage,
  onLaunchTerminal,
  onNotification,
  onGoToInstalled
}: LiveStatsDashboardProps) {
  // Live dynamic CPU oscillations to simulate real receiver activity
  const [cpuLoad, setCpuLoad] = useState<number>(14);
  const [coreLoads, setCoreLoads] = useState<number[]>([14, 11, 16, 9]);
  const [cpuTemp, setCpuTemp] = useState<number>(46);
  const [isCleaningCache, setIsCleaningCache] = useState<boolean>(false);
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(true);

  // Storage Stats (in MB & GB)
  const [flashTotalMb] = useState<number>(4096);
  const [flashUsedMb, setFlashUsedMb] = useState<number>(1420);
  const flashAvailableMb = flashTotalMb - flashUsedMb;
  const flashUsedPercent = Math.round((flashUsedMb / flashTotalMb) * 100);

  const [ramTotalMb] = useState<number>(2048);
  const [ramUsedMb, setRamUsedMb] = useState<number>(768);
  const ramAvailableMb = ramTotalMb - ramUsedMb;
  const ramUsedPercent = Math.round((ramUsedMb / ramTotalMb) * 100);

  const [hddTotalGb] = useState<number>(64.0);
  const [hddUsedGb] = useState<number>(22.4);
  const hddAvailableGb = (hddTotalGb - hddUsedGb).toFixed(1);
  const hddUsedPercent = Math.round((hddUsedGb / hddTotalGb) * 100);

  // Installed Plugins Count (read from local storage if available)
  const [installedCount, setInstalledCount] = useState<number>(18);
  const [pendingUpdates, setPendingUpdates] = useState<number>(3);

  useEffect(() => {
    const saved = localStorage.getItem('taoufik_installed_plugins');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setInstalledCount(parsed.length);
          setPendingUpdates(parsed.filter((p: any) => p.hasUpdate).length);
        }
      } catch (e) {
        // fallback
      }
    }
  }, []);

  // Periodic simulated live telemetry oscillation
  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      // Fluctuate CPU between 11% and 23%
      const jitter = (Math.random() * 8 - 4);
      setCpuLoad(prev => {
        const next = Math.max(8, Math.min(38, Math.round(14 + jitter)));
        return next;
      });

      // Fluctuate 4 individual cores
      setCoreLoads([
        Math.max(6, Math.min(45, Math.round(14 + (Math.random() * 10 - 5)))),
        Math.max(5, Math.min(35, Math.round(11 + (Math.random() * 8 - 4)))),
        Math.max(8, Math.min(48, Math.round(16 + (Math.random() * 12 - 6)))),
        Math.max(4, Math.min(30, Math.round(9 + (Math.random() * 6 - 3))))
      ]);

      // Minor temperature fluctuation (45-48 C)
      setCpuTemp(Math.round(45 + Math.random() * 3));
    }, 2800);

    return () => clearInterval(interval);
  }, [isAutoRefresh]);

  const handleCleanCache = () => {
    setIsCleaningCache(true);
    if (onLaunchTerminal) {
      onLaunchTerminal(
        'تنظيف الذاكرة المؤقتة ومسار /tmp', 
        'echo 3 > /proc/sys/vm/drop_caches && rm -rf /tmp/*.ipk /tmp/*.tar.gz /tmp/*.log 2>/dev/null && free -m'
      );
    }
    setTimeout(() => {
      setRamUsedMb(612); // freed RAM
      setFlashUsedMb(1380); // freed flash
      setIsCleaningCache(false);
      if (onNotification) {
        onNotification('تم تفريغ الكاش وتحرير 156MB من الذاكرة بنجاح!');
      }
    }, 1200);
  };

  return (
    <div className="bg-[#131929] border border-cyan-500/30 rounded-2xl p-5 md:p-6 space-y-5 shadow-2xl select-none" dir="rtl">
      
      {/* 1. Header Bar: Title, Live indicator & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>لوحة تحكم إحصائية حية (Enigma2 Live System Monitor)</span>
          </div>
          <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
            <span>مؤشرات الأداء ومساحة التخزين والحزم المثبتة</span>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-600/40 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
              LIVE 🟢
            </span>
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition cursor-pointer ${
              isAutoRefresh 
                ? 'bg-cyan-500/20 text-[#00e5ff] border-cyan-500/40' 
                : 'bg-[#0b0f19] text-gray-400 border-gray-800'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAutoRefresh ? 'animate-spin' : ''}`} />
            <span>{isAutoRefresh ? 'تحديث حي مفعل' : 'تحديث متوقف'}</span>
          </button>

          <button
            onClick={handleCleanCache}
            disabled={isCleaningCache}
            className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer transition shadow-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isCleaningCache ? 'جاري التنظيف...' : 'تفريغ الكاش وتسريع الرام'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top 3 Main Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* CARD 1: عدد الإضافات المثبتة */}
        <div className="bg-[#0b0f19] border border-[#1a2235] hover:border-cyan-500/40 rounded-xl p-4 transition flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-cyan-400" />
                <span>الإضافات المثبتة على الرسيفر</span>
              </span>
              <span className="bg-cyan-950/80 text-cyan-300 border border-cyan-700/50 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                /Extensions
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black text-white font-mono tracking-tight">
                {installedCount}
              </span>
              <span className="text-xs text-gray-400">إضافة مثبتة ونشطة</span>
            </div>

            {/* Sub-breakdown */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-gray-800/80 font-mono">
              <div className="flex justify-between items-center bg-[#131929] px-2 py-1 rounded border border-gray-800">
                <span className="text-gray-400">المحاكيات:</span>
                <span className="text-amber-400 font-bold">3</span>
              </div>
              <div className="flex justify-between items-center bg-[#131929] px-2 py-1 rounded border border-gray-800">
                <span className="text-gray-400">السكينات:</span>
                <span className="text-purple-400 font-bold">3</span>
              </div>
              <div className="flex justify-between items-center bg-[#131929] px-2 py-1 rounded border border-gray-800">
                <span className="text-gray-400">الـ IPTV:</span>
                <span className="text-cyan-400 font-bold">4</span>
              </div>
              <div className="flex justify-between items-center bg-[#131929] px-2 py-1 rounded border border-gray-800">
                <span className="text-gray-400">البانلات:</span>
                <span className="text-emerald-400 font-bold">2</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2.5 border-t border-gray-800 flex justify-between items-center text-xs">
            <span className="text-amber-400 font-bold flex items-center gap-1 text-[11px]">
              <ArrowUpCircle className="w-3.5 h-3.5" />
              <span>{pendingUpdates} تحديثات جاهزة</span>
            </span>
            {onGoToInstalled && (
              <button
                onClick={onGoToInstalled}
                className="text-[#00e5ff] hover:underline font-bold text-[11px] cursor-pointer"
              >
                إدارة الحزم &gt;
              </button>
            )}
          </div>
        </div>

        {/* CARD 2: مساحة التخزين المتاحة على الجهاز */}
        <div className="bg-[#0b0f19] border border-[#1a2235] hover:border-emerald-500/40 rounded-xl p-4 transition flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-emerald-400" />
                <span>مساحة الفلاش الداخلي المتاحة</span>
              </span>
              <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                {100 - flashUsedPercent}% حر
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black text-emerald-400 font-mono tracking-tight">
                {flashAvailableMb}
              </span>
              <span className="text-xs text-gray-400 font-mono">MB متاحة من أصل {flashTotalMb} MB</span>
            </div>

            {/* Flash Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${flashUsedPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>المستخدم: {flashUsedMb} MB ({flashUsedPercent}%)</span>
                <span>المتبقي: {flashAvailableMb} MB</span>
              </div>
            </div>

            {/* External Storage Status */}
            <div className="bg-[#131929] border border-gray-800 rounded-lg p-2 text-[11px] flex items-center justify-between font-mono">
              <span className="text-gray-400 flex items-center gap-1">
                <Folder className="w-3.5 h-3.5 text-cyan-400" />
                <span>الهارد الخارجي (/media/hdd):</span>
              </span>
              <span className="text-cyan-300 font-bold">
                {hddAvailableGb} GB متاح ({100 - hddUsedPercent}%)
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-gray-800 flex justify-between items-center text-[11px]">
            <span className="text-emerald-400 font-mono font-bold">حالة التخزين: ممتازة 🟢</span>
            <span className="text-gray-500 font-mono">ext4 / emmc</span>
          </div>
        </div>

        {/* CARD 3: حالة المعالج والأداء الحي */}
        <div className="bg-[#0b0f19] border border-[#1a2235] hover:border-cyan-500/40 rounded-xl p-4 transition flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#00e5ff]" />
                <span>حالة المعالج (CPU Quad-Core)</span>
              </span>
              <span className="bg-cyan-950/80 text-[#00e5ff] border border-cyan-700/50 text-[10px] px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-cyan-400" />
                <span>{cpuTemp}°C بارد</span>
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl font-black text-[#00e5ff] font-mono tracking-tight">
                {cpuLoad}%
              </span>
              <span className="text-xs text-gray-400 font-mono">BCM7278 @ 2.1GHz</span>
            </div>

            {/* Individual Core Load Gauges */}
            <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[10px]">
              {coreLoads.map((load, idx) => (
                <div key={idx} className="bg-[#131929] border border-gray-800 p-1.5 rounded space-y-1">
                  <div className="text-gray-400">Core {idx}</div>
                  <div className="text-cyan-300 font-bold">{load}%</div>
                  <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#00e5ff] h-full rounded-full transition-all duration-300" 
                      style={{ width: `${load}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Process distribution */}
            <div className="bg-[#131929] border border-gray-800 rounded-lg p-2 text-[10px] flex justify-between items-center font-mono text-gray-400">
              <span>enigma2 (2.4%)</span>
              <span>oscam-emu (1.8%)</span>
              <span className="text-emerald-400 font-bold">Idle ({100 - cpuLoad}%)</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-gray-800 flex justify-between items-center text-[11px]">
            <span className="text-cyan-400 font-mono font-bold">الحمل: خفيف ومستقر 🟢</span>
            <span className="text-gray-500 font-mono">Load: 0.14, 0.18, 0.12</span>
          </div>
        </div>

      </div>

      {/* 3. Detailed Memory & Network Footprint Strip */}
      <div className="bg-[#0b0f19] border border-[#1a2235] p-3.5 rounded-xl flex flex-wrap justify-between items-center gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>ذاكرة RAM:</span>
          </span>
          <span className="text-white font-bold">{ramUsedMb} MB / {ramTotalMb} MB</span>
          <span className="text-emerald-400 font-bold">({ramAvailableMb} MB متاح - {100 - ramUsedPercent}%)</span>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <div>IP: <span className="text-cyan-300 font-bold">{receiverIP}</span> (Ping: 8ms)</div>
          <div>Uptime: <span className="text-amber-300 font-bold">4d 18h 32m</span></div>
          <div>Image: <span className="text-gray-300 font-bold">{receiverImage}</span></div>
        </div>
      </div>

    </div>
  );
}
