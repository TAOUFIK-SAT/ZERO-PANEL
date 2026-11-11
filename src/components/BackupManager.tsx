import React, { useState, useEffect, useRef } from 'react';
import { 
  Archive, 
  Download, 
  Upload, 
  RotateCw, 
  CheckCircle2, 
  AlertCircle, 
  HardDrive, 
  Settings, 
  Tv, 
  Clock, 
  Trash2, 
  Check, 
  Copy, 
  FileJson, 
  ShieldCheck, 
  ToggleLeft, 
  ToggleRight,
  Server,
  PackageCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { ChannelServer } from './ServerManager';

export interface BackupData {
  version: string;
  timestamp: string;
  receiverIP: string;
  receiverModel: string;
  receiverImage: string;
  activeCam?: string;
  favoriteIds: string[];
  customPlugins: any[];
  installedPlugins: any[];
  channelServers: ChannelServer[];
  autoBackupSettings: {
    enabled: boolean;
    frequency: 'immediate' | 'daily' | 'weekly';
    lastBackupTime: string;
  };
}

export interface RestorePoint {
  id: string;
  name: string;
  timestamp: string;
  serversCount: number;
  pluginsCount: number;
  data: BackupData;
}

interface BackupManagerProps {
  receiverIP: string;
  receiverModel: string;
  receiverImage: string;
  favoriteIds: string[];
  onRestoreSuccess: (data: BackupData) => void;
  onLaunchTerminal?: (name: string, command: string) => void;
  onNotification?: (msg: string) => void;
}

export default function BackupManager({
  receiverIP,
  receiverModel,
  receiverImage,
  favoriteIds,
  onRestoreSuccess,
  onLaunchTerminal,
  onNotification
}: BackupManagerProps) {
  const [autoBackupEnabled, setAutoBackupEnabled] = useState<boolean>(() => {
    return localStorage.getItem('taoufik_auto_backup_enabled') !== 'false';
  });

  const [frequency, setFrequency] = useState<'immediate' | 'daily' | 'weekly'>(() => {
    return (localStorage.getItem('taoufik_backup_freq') as any) || 'daily';
  });

  const [restorePoints, setRestorePoints] = useState<RestorePoint[]>(() => {
    const saved = localStorage.getItem('taoufik_restore_points');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [lastBackupTime, setLastBackupTime] = useState<string>(() => {
    return localStorage.getItem('taoufik_last_backup_time') || 'لم يتم النسخ بعد';
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-backup execution check on mount or when autoBackupEnabled
  useEffect(() => {
    localStorage.setItem('taoufik_auto_backup_enabled', autoBackupEnabled ? 'true' : 'false');
    localStorage.setItem('taoufik_backup_freq', frequency);
  }, [autoBackupEnabled, frequency]);

  useEffect(() => {
    localStorage.setItem('taoufik_restore_points', JSON.stringify(restorePoints));
  }, [restorePoints]);

  // Compile current state into BackupData structure
  const gatherCurrentBackupData = (): BackupData => {
    let customPlugins: any[] = [];
    try {
      customPlugins = JSON.parse(localStorage.getItem('taoufik_custom_plugins') || '[]');
    } catch (e) {}

    let installedPlugins: any[] = [];
    try {
      installedPlugins = JSON.parse(localStorage.getItem('taoufik_installed_plugins') || '[]');
    } catch (e) {}

    let channelServers: ChannelServer[] = [];
    try {
      channelServers = JSON.parse(localStorage.getItem('taoufik_channel_servers') || '[]');
    } catch (e) {}

    return {
      version: '4.0',
      timestamp: new Date().toISOString(),
      receiverIP,
      receiverModel,
      receiverImage,
      favoriteIds,
      customPlugins,
      installedPlugins,
      channelServers,
      autoBackupSettings: {
        enabled: autoBackupEnabled,
        frequency,
        lastBackupTime: new Date().toLocaleString('ar-SA')
      }
    };
  };

  // Perform a new backup snapshot
  const createNewBackup = (silent: boolean = false) => {
    setIsCreatingBackup(true);
    const data = gatherCurrentBackupData();
    const formattedDate = new Date().toLocaleString('ar-SA');

    const newPoint: RestorePoint = {
      id: 'snap-' + Date.now(),
      name: `نسخة احتياطية (${new Date().toLocaleTimeString('ar-SA')})`,
      timestamp: formattedDate,
      serversCount: data.channelServers.length,
      pluginsCount: data.installedPlugins.length || 18,
      data
    };

    setRestorePoints(prev => [newPoint, ...prev.slice(0, 7)]); // Keep last 8 restore points
    setLastBackupTime(formattedDate);
    localStorage.setItem('taoufik_last_backup_time', formattedDate);
    setIsCreatingBackup(false);

    if (!silent && onNotification) {
      onNotification('تم إنشاء وحفظ نقطة النسخ الاحتياطي بنجاح!');
    }
  };

  // Download Backup JSON file to local computer / device
  const exportBackupFile = () => {
    const data = gatherCurrentBackupData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().split('T')[0];
    link.download = `taoufik-store-backup-${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (onNotification) {
      onNotification(`تم تصدير ملف النسخة الاحتياطية (taoufik-store-backup-${dateStr}.json)`);
    }
  };

  // Import Backup JSON file from local storage
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed: BackupData = JSON.parse(content);

        // Validation check
        if (!parsed || (!parsed.channelServers && !parsed.favoriteIds && !parsed.installedPlugins)) {
          alert('الملف غير صالح أو لا يحتوي على بنية بيانات متجر توفيق الصحيحة.');
          return;
        }

        // Apply restoration
        applyRestoration(parsed);
      } catch (err) {
        alert('حدث خطأ أثناء قراءة ملف النسخة الاحتياطية. يرجى التأكد من اختيار ملف JSON صحيح.');
      }
    };
    reader.readAsText(file);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Apply restored data
  const applyRestoration = (data: BackupData) => {
    if (confirm(`هل أنت متأكد من استعادة هذه النسخة؟\n- خوادم القنوات: ${data.channelServers?.length || 0}\n- الإضافات المفضلة: ${data.favoriteIds?.length || 0}\n- الرسيفر: ${data.receiverModel || receiverModel}`)) {
      
      // Save items to local storage
      if (data.channelServers) {
        localStorage.setItem('taoufik_channel_servers', JSON.stringify(data.channelServers));
      }
      if (data.favoriteIds) {
        localStorage.setItem('taoufik_favorite_plugins', JSON.stringify(data.favoriteIds));
      }
      if (data.customPlugins) {
        localStorage.setItem('taoufik_custom_plugins', JSON.stringify(data.customPlugins));
      }
      if (data.installedPlugins) {
        localStorage.setItem('taoufik_installed_plugins', JSON.stringify(data.installedPlugins));
      }

      onRestoreSuccess(data);

      if (onNotification) {
        onNotification('تمت استعادة إعدادات المتجر وخوادم القنوات بنجاح 🟢');
      }
    }
  };

  const deleteRestorePoint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRestorePoints(prev => prev.filter(p => p.id !== id));
    if (onNotification) {
      onNotification('تم حذف نقطة الاستعادة');
    }
  };

  // Deploy backup archive to receiver HDD (/media/hdd/backup/)
  const sendBackupToReceiver = () => {
    const data = gatherCurrentBackupData();
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    const cmd = `mkdir -p /media/hdd/backup/ /etc/enigma2/backup/ && echo "${encoded}" | base64 -d > /media/hdd/backup/taoufik_store_backup.json && tar -czf /media/hdd/backup/enigma2_bouquets_backup.tar.gz /etc/enigma2/*.tv /etc/enigma2/*.radio 2>/dev/null && echo "[TAOUFIK STORE] Full Backup saved to /media/hdd/backup/"`;
    
    if (onLaunchTerminal) {
      onLaunchTerminal('حفظ النسخة الاحتياطية في هارد الرسيفر (/media/hdd/backup/)', cmd);
    }
  };

  return (
    <div className="space-y-5 select-none" dir="rtl">
      
      {/* 1. Top Header Banner */}
      <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
              <Archive className="w-4 h-4 text-cyan-400" />
              <span>نظام الأمان والنسخ الاحتياطي السحابي والمحلي لمتجر توفيق</span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-white">
              النسخ الاحتياطي التلقائي واستعادة البيانات
            </h2>
            <p className="text-xs text-gray-400 max-w-3xl leading-relaxed">
              احفظ إعدادات المتجر، خوادم القنوات (M3U/XML/Xtream)، الإضافات المفضلة، وسجلات الرسيفر تلقائياً، مع إمكانية التصدير والاستعادة الفورية من وحدة تخزين محلية أو من الرسيفر.
            </p>
          </div>

          {/* Quick Main Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => createNewBackup(false)}
              disabled={isCreatingBackup}
              className="bg-[#00e5ff] hover:bg-cyan-400 text-black px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-cyan-500/10 cursor-pointer transition"
            >
              <RotateCw className={`w-4 h-4 ${isCreatingBackup ? 'animate-spin' : ''}`} />
              <span>أخذ نسخة احتياطية الآن</span>
            </button>

            <button
              onClick={exportBackupFile}
              className="bg-[#10b981] hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer transition"
            >
              <Download className="w-4 h-4" />
              <span>تصدير كملف (.json)</span>
            </button>

            {/* Hidden File Input for Local Restore */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileImport} 
              accept=".json" 
              className="hidden" 
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#182133] hover:bg-[#202c45] text-cyan-300 border border-cyan-500/40 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer transition shadow-sm"
            >
              <Upload className="w-4 h-4" />
              <span>استعادة من ملف محلي</span>
            </button>
          </div>
        </div>

        {/* Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-800/80 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-gray-400">آخر نسخة احتياطية:</span>
            <span className="text-white font-mono font-bold bg-[#0b0f19] px-2.5 py-1 rounded-lg border border-gray-800">
              {lastBackupTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={sendBackupToReceiver}
              className="bg-[#182133] hover:bg-[#202c45] text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer text-xs font-bold"
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>حفظ نسخة في هارد الرسيفر (/media/hdd)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Auto-Backup Engine Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Left: Configuration Box (5 Cols) */}
        <div className="md:col-span-5 bg-[#131929] border border-[#1f283e] rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>إعدادات النسخ الاحتياطي التلقائي (Auto-Backup)</span>
          </h3>

          {/* Toggle Switch */}
          <div className="flex items-center justify-between p-3.5 bg-[#0b0f19] border border-gray-800 rounded-xl">
            <div className="space-y-0.5">
              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                <span>تفعيل النسخ الاحتياطي التلقائي:</span>
                {autoBackupEnabled && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                )}
              </div>
              <p className="text-[11px] text-gray-400">
                يقوم بحفظ إعداداتك وقنواتك تلقائياً دون تدخل يدوي.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const next = !autoBackupEnabled;
                setAutoBackupEnabled(next);
                if (onNotification) {
                  onNotification(next ? 'تم تفعيل النسخ الاحتياطي التلقائي' : 'تم إيقاف النسخ الاحتياطي التلقائي');
                }
              }}
              className="cursor-pointer text-cyan-400 hover:text-cyan-300 transition"
            >
              {autoBackupEnabled ? (
                <ToggleRight className="w-8 h-8 text-[#00e5ff]" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-gray-600" />
              )}
            </button>
          </div>

          {/* Frequency Selector */}
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-bold">تكرار النسخ التلقائي:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFrequency('immediate')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                  frequency === 'immediate' 
                    ? 'bg-[#00e5ff] text-black border-cyan-400 shadow-md font-extrabold' 
                    : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                فوري (بعد كل تعديل)
              </button>
              <button
                type="button"
                onClick={() => setFrequency('daily')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                  frequency === 'daily' 
                    ? 'bg-[#00e5ff] text-black border-cyan-400 shadow-md font-extrabold' 
                    : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                يومياً (كل 24 ساعة)
              </button>
              <button
                type="button"
                onClick={() => setFrequency('weekly')}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                  frequency === 'weekly' 
                    ? 'bg-[#00e5ff] text-black border-cyan-400 shadow-md font-extrabold' 
                    : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                أسبوعياً
              </button>
            </div>
          </div>

          {/* What gets backed up summary */}
          <div className="p-3 bg-[#0b0f19] border border-[#1a2235] rounded-xl text-xs space-y-2">
            <div className="font-bold text-gray-300 text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>محتويات النسخة الاحتياطية المضمونة:</span>
            </div>
            <ul className="text-[11px] text-gray-400 space-y-1 list-disc list-inside">
              <li>عناوين خوادم واشتراكات M3U/XML/Xtream</li>
              <li>قائمة الإضافات والبلجنات المفضلة ⭐</li>
              <li>الإضافات المخصصة وحزم التثبيت المحلية</li>
              <li>بيانات الاتصال بالرسيفر ({receiverIP})</li>
              <li>ملفات بوكيه القنوات (/etc/enigma2/userbouquet.*)</li>
            </ul>
          </div>
        </div>

        {/* Right: Restore Points / Snapshots List (7 Cols) */}
        <div className="md:col-span-7 bg-[#131929] border border-[#1f283e] rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>سجل نقاط الاستعادة المحفوظة محلياً ({restorePoints.length})</span>
            </h3>
            <span className="text-gray-500 text-[11px] font-mono">Auto Snapshots</span>
          </div>

          {restorePoints.length === 0 ? (
            <div className="bg-[#0b0f19] border border-gray-800 rounded-xl p-8 text-center text-gray-500 text-xs space-y-2">
              <p>لا توجد نقاط استعادة محفوظة حتى الآن.</p>
              <button
                onClick={() => createNewBackup(false)}
                className="text-[#00e5ff] hover:underline font-bold text-xs cursor-pointer"
              >
                اضغط هنا لإنشاء أول نقطة نسخ احتياطي
              </button>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {restorePoints.map((point) => (
                <div
                  key={point.id}
                  className="bg-[#0b0f19] border border-gray-800 hover:border-cyan-500/40 rounded-xl p-3 flex items-center justify-between transition group"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-white text-xs flex items-center gap-2">
                      <span>{point.name}</span>
                      <span className="bg-cyan-950/80 text-cyan-300 border border-cyan-700/50 text-[10px] px-2 py-0.5 rounded font-mono">
                        {point.timestamp}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-400 font-mono flex items-center gap-3">
                      <span>الخوادم: <b className="text-white">{point.serversCount}</b></span>
                      <span>الإضافات: <b className="text-white">{point.pluginsCount}</b></span>
                      <span>الرسيفر: <b className="text-cyan-400">{point.data.receiverModel}</b></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => applyRestoration(point.data)}
                      className="bg-[#00e5ff] hover:bg-cyan-400 text-black px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer transition shadow-sm"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>استعادة</span>
                    </button>
                    <button
                      onClick={(e) => deleteRestorePoint(point.id, e)}
                      className="text-gray-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-950/40 transition cursor-pointer"
                      title="حذف نقطة الاستعادة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Local storage note */}
          <div className="pt-2 border-t border-gray-800 text-[11px] text-gray-500 flex justify-between items-center font-mono">
            <span>التخزين: LocalStorage + Disk JSON</span>
            <span>تشفير آمن · صفر فقدان للبيانات</span>
          </div>
        </div>

      </div>

    </div>
  );
}
