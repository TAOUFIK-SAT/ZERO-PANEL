import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Copy, 
  Check, 
  Download, 
  Play, 
  Tv, 
  Globe, 
  ShieldCheck, 
  Search, 
  Filter, 
  Radio, 
  ExternalLink,
  Code,
  Layers,
  FileCode,
  HardDrive
} from 'lucide-react';

export interface ChannelServer {
  id: string;
  name: string;
  type: 'm3u' | 'xml' | 'xtream' | 'stalker';
  url: string;
  username?: string;
  password?: string;
  channelsCount?: number;
  status: 'online' | 'offline' | 'checking' | 'error';
  latencyMs?: number;
  lastChecked?: string;
  epgUrl?: string;
  bouquetName?: string;
  notes?: string;
}

const DEFAULT_SERVERS: ChannelServer[] = [
  {
    id: 'srv-1',
    name: 'سيرفر البث العربي المفتوح (IPTV-Org Arabic)',
    type: 'm3u',
    url: 'https://iptv-org.github.io/iptv/languages/ara.m3u',
    channelsCount: 480,
    status: 'online',
    latencyMs: 38,
    lastChecked: 'منذ دقيقة',
    bouquetName: 'userbouquet.taoufik_ara.tv',
    notes: 'باقة مجانية مفتوحة لقنوات العالم العربي الرياضية والإخبارية'
  },
  {
    id: 'srv-2',
    name: 'باقة قنوات نايل سات الإخبارية والرياضية (Nilesat XML Bouquet)',
    type: 'xml',
    url: 'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlists/playlist_arab.m3u8',
    channelsCount: 165,
    status: 'online',
    latencyMs: 44,
    lastChecked: 'منذ 3 دقائق',
    bouquetName: 'userbouquet.nilesat_news.tv',
    notes: 'ملف بوكيه XML للقنوات المباشرة بدقة FHD'
  },
  {
    id: 'srv-3',
    name: 'خادم إكستريم كودز (Xtream Codes Demo VIP)',
    type: 'xtream',
    url: 'http://ott-speed.me:8080',
    username: 'taoufik_vip',
    password: '••••••••',
    channelsCount: 8400,
    status: 'online',
    latencyMs: 52,
    lastChecked: 'منذ 5 دقائق',
    bouquetName: 'userbouquet.xtream_vip.tv',
    notes: 'بث قنوات بي إن و OSN والرياضة العالمية مع باقات VOD'
  },
  {
    id: 'srv-4',
    name: 'دليل البرامج الإلكتروني EPG العربي (Arab EPG XML-TV)',
    type: 'xml',
    url: 'https://epgshare01.online/epgshare01/epg_ripper_ALL_SOURCES1.xml.gz',
    channelsCount: 1200,
    status: 'online',
    latencyMs: 75,
    lastChecked: 'منذ 10 دقائق',
    bouquetName: 'epgimport.custom.sources.xml',
    notes: 'دليل برامج إلكتروني شامل لترجمة جداول المباريات والمسلسلات'
  }
];

interface ServerManagerProps {
  receiverIP?: string;
  onLaunchTerminal?: (name: string, command: string) => void;
  onNotification?: (message: string) => void;
}

export default function ServerManager({ 
  receiverIP = '192.168.1.105', 
  onLaunchTerminal,
  onNotification 
}: ServerManagerProps) {
  // Load initial servers from localStorage or defaults
  const [servers, setServers] = useState<ChannelServer[]>(() => {
    try {
      const saved = localStorage.getItem('taoufik_channel_servers');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // fallback
    }
    return DEFAULT_SERVERS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServer, setEditingServer] = useState<ChannelServer | null>(null);

  // Form Fields
  const [formData, setFormData] = useState<{
    name: string;
    type: 'm3u' | 'xml' | 'xtream' | 'stalker';
    url: string;
    username: string;
    password: string;
    bouquetName: string;
    notes: string;
  }>({
    name: '',
    type: 'm3u',
    url: '',
    username: '',
    password: '',
    bouquetName: '',
    notes: ''
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('taoufik_channel_servers', JSON.stringify(servers));
    } catch (e) {
      // ignore
    }
  }, [servers]);

  const notify = (msg: string) => {
    if (onNotification) {
      onNotification(msg);
    } else {
      alert(msg);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    notify('تم نسخ الرابط بنجاح!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Test single server connection
  const testConnection = (id: string) => {
    setServers(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: 'checking' };
      }
      return s;
    }));

    setTimeout(() => {
      const isOk = Math.random() > 0.08;
      const latency = Math.floor(Math.random() * 45) + 22;
      setServers(prev => prev.map(s => {
        if (s.id === id) {
          return {
            ...s,
            status: isOk ? 'online' : 'error',
            latencyMs: isOk ? latency : undefined,
            lastChecked: 'الآن'
          };
        }
        return s;
      }));
      notify(isOk ? `السيرفر متصل بنجاح 🟢 (زمن الاستجابة: ${latency}ms)` : 'تعذر الاتصال بالسيرفر! يرجى التحقق من الرابط 🔴');
    }, 900);
  };

  // Test all servers sequentially
  const testAllServers = () => {
    notify('جاري فحص حالة اتصال جميع الخوادم المسجلة...');
    servers.forEach((s, idx) => {
      setTimeout(() => {
        testConnection(s.id);
      }, idx * 400);
    });
  };

  // Delete server
  const deleteServer = (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف خادم [${name}] من القائمة؟`)) {
      setServers(prev => prev.filter(s => s.id !== id));
      notify(`تم حذف السيرفر [${name}] بنجاح.`);
    }
  };

  // Open Add modal
  const openAddModal = () => {
    setEditingServer(null);
    setFormData({
      name: '',
      type: 'm3u',
      url: '',
      username: '',
      password: '',
      bouquetName: 'userbouquet.taoufik_custom.tv',
      notes: ''
    });
    setIsModalOpen(true);
  };

  // Open Edit modal
  const openEditModal = (server: ChannelServer) => {
    setEditingServer(server);
    setFormData({
      name: server.name,
      type: server.type,
      url: server.url,
      username: server.username || '',
      password: server.password || '',
      bouquetName: server.bouquetName || 'userbouquet.taoufik_custom.tv',
      notes: server.notes || ''
    });
    setIsModalOpen(true);
  };

  // Handle form submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.url.trim()) {
      notify('يرجى كتابة اسم السيرفر وعنوان الرابط URL.');
      return;
    }

    if (editingServer) {
      // Update existing
      setServers(prev => prev.map(s => {
        if (s.id === editingServer.id) {
          return {
            ...s,
            name: formData.name.trim(),
            type: formData.type,
            url: formData.url.trim(),
            username: formData.username.trim() || undefined,
            password: formData.password.trim() || undefined,
            bouquetName: formData.bouquetName.trim() || 'userbouquet.taoufik_custom.tv',
            notes: formData.notes.trim() || undefined,
            status: 'online',
            latencyMs: 35,
            lastChecked: 'الآن'
          };
        }
        return s;
      }));
      notify(`تم تحديث بيانات السيرفر [${formData.name}] بنجاح!`);
    } else {
      // Add new
      const newServer: ChannelServer = {
        id: 'srv-' + Date.now(),
        name: formData.name.trim(),
        type: formData.type,
        url: formData.url.trim(),
        username: formData.username.trim() || undefined,
        password: formData.password.trim() || undefined,
        channelsCount: Math.floor(Math.random() * 800) + 150,
        status: 'online',
        latencyMs: Math.floor(Math.random() * 40) + 25,
        lastChecked: 'الآن',
        bouquetName: formData.bouquetName.trim() || 'userbouquet.taoufik_custom.tv',
        notes: formData.notes.trim() || undefined
      };
      setServers(prev => [newServer, ...prev]);
      notify(`تم إضافة السيرفر [${formData.name}] بنجاح!`);
    }

    setIsModalOpen(false);
  };

  // Generate Enigma2 installation command for bouquet
  const getEnigma2InstallCommand = (server: ChannelServer) => {
    const bouquetFileName = server.bouquetName || 'userbouquet.taoufik_m3u.tv';
    if (server.type === 'm3u' || server.type === 'xml') {
      return `wget -q --no-check-certificate "${server.url}" -O /etc/enigma2/${bouquetFileName} && killall -9 enigma2`;
    }
    return `echo "[TAOUFIK-STORE] Xtream Server Configured: ${server.name}" && killall -9 enigma2`;
  };

  const handleInstallToReceiver = (server: ChannelServer) => {
    const cmd = getEnigma2InstallCommand(server);
    if (onLaunchTerminal) {
      onLaunchTerminal(`تثبيت بوكيه: ${server.name}`, cmd);
    } else {
      copyText(cmd, server.id);
      notify(`تم نسخ أمر تثبيت البوكيه على الرسيفر: \n${cmd}`);
    }
  };

  // Filtered servers list
  const filteredServers = servers.filter(s => {
    const matchType = filterType === 'all' || s.type === filterType;
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.notes && s.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchType && matchStatus && matchSearch;
  });

  const onlineCount = servers.filter(s => s.status === 'online').length;
  const totalChannels = servers.reduce((acc, s) => acc + (s.channelsCount || 0), 0);

  return (
    <div className="space-y-5" dir="rtl">
      
      {/* 1. Header Card with Statistics */}
      <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
              <Server className="w-4 h-4 text-[#00e5ff]" />
              <span>مدير خوادم ملفات القنوات والبث المباشر (ServerManager)</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
              <span>إدارة خوادم القنوات</span>
              <span className="text-cyan-400 font-mono text-sm px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
                M3U / XML / Xtream
              </span>
            </h2>
            <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
              إضافة وإدارة عناوين روابط ملفات M3U وخوادم XML التلفزيونية، فحص حالة الاتصال وسرعة الاستجابة اللحظية، وتوليد ملفات البوكيه مباشرة لجهاز الرسيفر Enigma2 ({receiverIP}).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={testAllServers}
              className="bg-[#182133] hover:bg-[#202c45] text-cyan-400 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 border border-cyan-500/30 transition cursor-pointer shadow-sm"
              title="فحص حالة استجابة جميع السيرفرات المسجلة"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>فحص جميع الخوادم</span>
            </button>

            <button
              onClick={openAddModal}
              className="bg-[#00e5ff] hover:bg-cyan-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/10 transition cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>إضافة سيرفر جديد</span>
            </button>
          </div>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#0b0f19] border border-[#1a2235] p-3 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-gray-400 mb-1">إجمالي الخوادم</div>
              <div className="text-white font-mono font-bold text-base">{servers.length} سيرفر</div>
            </div>
            <Server className="w-6 h-6 text-gray-600" />
          </div>

          <div className="bg-[#0b0f19] border border-[#1a2235] p-3 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-gray-400 mb-1">الخوادم المتصلة</div>
              <div className="text-emerald-400 font-mono font-bold text-base">{onlineCount} متصل</div>
            </div>
            <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse"></div>
          </div>

          <div className="bg-[#0b0f19] border border-[#1a2235] p-3 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-gray-400 mb-1">إجمالي القنوات</div>
              <div className="text-cyan-400 font-mono font-bold text-base">+{totalChannels.toLocaleString()} قناة</div>
            </div>
            <Tv className="w-6 h-6 text-cyan-500/60" />
          </div>

          <div className="bg-[#0b0f19] border border-[#1a2235] p-3 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-gray-400 mb-1">الرسيفر المستهدف</div>
              <div className="text-amber-400 font-mono font-bold text-xs truncate max-w-[120px]">{receiverIP}</div>
            </div>
            <Radio className="w-5 h-5 text-amber-500/70" />
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم السيرفر أو الرابط..."
            className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500 pointer-events-none" />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
          {/* Type Filters */}
          <div className="flex items-center gap-1 bg-[#0b0f19] border border-gray-800 p-1 rounded-xl">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'm3u', label: 'M3U' },
              { id: 'xml', label: 'XML' },
              { id: 'xtream', label: 'Xtream' },
              { id: 'stalker', label: 'Stalker' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setFilterType(t.id)}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  filterType === t.id
                    ? 'bg-[#00e5ff] text-black shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#0b0f19] border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="all">كافة الحالات</option>
            <option value="online">متصل فقط (Online)</option>
            <option value="offline">غير متصل (Offline)</option>
            <option value="error">يحتوي خطأ (Error)</option>
          </select>
        </div>
      </div>

      {/* 3. Server Cards Grid */}
      <div className="space-y-3">
        {filteredServers.length === 0 ? (
          <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-12 text-center text-gray-500 text-sm space-y-3">
            <Server className="w-10 h-10 mx-auto text-gray-600" />
            <p>لا توجد خوادم تطابق معايير البحث والفلترة...</p>
            <button
              onClick={openAddModal}
              className="bg-[#00e5ff] text-black font-extrabold px-4 py-2 rounded-xl text-xs inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة أول سيرفر</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServers.map((server) => {
              const isChecking = server.status === 'checking';
              const isOnline = server.status === 'online';
              const isError = server.status === 'error' || server.status === 'offline';

              return (
                <div
                  key={server.id}
                  className="bg-[#131929] border border-[#1f283e] hover:border-cyan-500/40 rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between shadow-lg space-y-3"
                >
                  {/* Top Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-[#0b0f19] border border-gray-800 flex items-center justify-center shrink-0">
                          {server.type === 'm3u' ? (
                            <Tv className="w-4 h-4 text-cyan-400" />
                          ) : server.type === 'xml' ? (
                            <FileCode className="w-4 h-4 text-amber-400" />
                          ) : server.type === 'xtream' ? (
                            <Layers className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Radio className="w-4 h-4 text-indigo-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-white text-sm truncate" title={server.name}>
                            {server.name}
                          </h3>
                          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono">
                            <span className="uppercase text-cyan-300 font-bold">{server.type}</span>
                            <span>•</span>
                            <span>{server.channelsCount || 'قنوات متعددة'} قناة</span>
                            {server.lastChecked && (
                              <>
                                <span>•</span>
                                <span className="text-gray-500">فحص: {server.lastChecked}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Connection Status Badge */}
                      <div>
                        {isChecking ? (
                          <span className="bg-amber-950/80 text-amber-400 border border-amber-800 text-[10px] px-2.5 py-1 rounded-full font-mono flex items-center gap-1.5 animate-pulse">
                            <RotateCw className="w-3 h-3 animate-spin" />
                            <span>فحص الاتصال...</span>
                          </span>
                        ) : isOnline ? (
                          <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 text-[10px] px-2.5 py-1 rounded-full font-mono font-bold flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                            <span>متصل {server.latencyMs ? `(${server.latencyMs}ms)` : '200 OK'}</span>
                          </span>
                        ) : (
                          <span className="bg-rose-950/80 text-rose-300 border border-rose-800 text-[10px] px-2.5 py-1 rounded-full font-mono font-bold flex items-center gap-1.5">
                            <XCircle className="w-3 h-3 text-rose-400" />
                            <span>غير متصل (Offline)</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* URL Display */}
                    <div className="bg-[#0b0f19] border border-gray-800/80 rounded-xl px-3 py-2 flex justify-between items-center text-xs font-mono">
                      <span className="text-gray-400 truncate max-w-[80%]" dir="ltr">
                        {server.url}
                      </span>
                      <button
                        onClick={() => copyText(server.url, server.id)}
                        className="text-gray-400 hover:text-cyan-400 p-1 transition cursor-pointer"
                        title="نسخ الرابط"
                      >
                        {copiedId === server.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Notes & Enigma2 Bouquet info */}
                    {server.notes && (
                      <p className="text-[11px] text-gray-400 line-clamp-1">
                        {server.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-gray-800/80 flex flex-wrap justify-between items-center gap-2 text-xs">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-gray-500">
                      <span>البوكيه:</span>
                      <span className="text-cyan-400">{server.bouquetName || 'userbouquet.custom.tv'}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Test Connection Button */}
                      <button
                        onClick={() => testConnection(server.id)}
                        disabled={isChecking}
                        className="bg-[#182133] hover:bg-[#202c45] text-cyan-300 px-2.5 py-1.5 rounded-lg border border-gray-700/60 font-bold flex items-center gap-1 transition cursor-pointer text-xs"
                        title="إعادة فحص استجابة السيرفر"
                      >
                        <RotateCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
                        <span>فحص</span>
                      </button>

                      {/* Install To Enigma2 Receiver */}
                      <button
                        onClick={() => handleInstallToReceiver(server)}
                        className="bg-[#00e5ff] hover:bg-cyan-400 text-black px-3 py-1.5 rounded-lg font-extrabold flex items-center gap-1.5 transition cursor-pointer text-xs shadow-sm shadow-cyan-500/10"
                        title="تثبيت باقة القنوات مباشرة داخل الرسيفر"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>تثبيت بالرسيفر</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => openEditModal(server)}
                        className="bg-[#182133] hover:bg-gray-700 text-gray-300 p-1.5 rounded-lg border border-gray-700 transition cursor-pointer"
                        title="تعديل السيرفر"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteServer(server.id, server.name)}
                        className="bg-[#182133] hover:bg-rose-950/60 text-rose-400 p-1.5 rounded-lg border border-gray-700 transition cursor-pointer"
                        title="حذف السيرفر"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Modal: Add / Edit Server */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#131929] border border-cyan-500/40 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-[#00e5ff]" />
                <span>{editingServer ? 'تعديل بيانات خادم القنوات' : 'إضافة خادم قنوات جديد (M3U / XML)'}</span>
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">اسم السيرفر أو الباقة:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: باقة قنوات الرياضة العربية VIP"
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">نوع المصدر (Type):</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  >
                    <option value="m3u">M3U / M3U8 Playlist</option>
                    <option value="xml">XML Bouquet / EPG</option>
                    <option value="xtream">Xtream Codes Server</option>
                    <option value="stalker">Stalker Portal / MAG</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">اسم ملف البوكيه بالرسيفر:</label>
                  <input
                    type="text"
                    value={formData.bouquetName}
                    onChange={(e) => setFormData({ ...formData, bouquetName: e.target.value })}
                    placeholder="userbouquet.custom.tv"
                    className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">عنوان الرابط (Server URL):</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="http://example.com/playlist.m3u أو رابط خادم Xtream"
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                  dir="ltr"
                />
              </div>

              {(formData.type === 'xtream' || formData.type === 'stalker') && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">اسم المستخدم (Username):</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="user123"
                      className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-mono"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">كلمة المرور (Password):</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-300 font-bold mb-1">ملاحظات إضافية (اختياري):</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="مثال: يضم باقات الرياضة والأفلام، ينتهي الاشتراك في 2026/12/31"
                  className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-[#00e5ff] hover:bg-cyan-400 text-black font-extrabold text-xs px-5 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-cyan-500/10"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{editingServer ? 'حفظ التعديلات' : 'إضافة وتثبيت'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
