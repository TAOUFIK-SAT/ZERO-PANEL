import React, { useState, useEffect, useRef } from 'react';
import { Channel } from '../types';
import { 
  Upload, 
  Link2, 
  Play, 
  Pause, 
  Plus, 
  ListChecks, 
  CheckCircle2, 
  RefreshCw, 
  FileText, 
  Tv, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Layers, 
  AlertCircle,
  TrendingUp,
  Radio,
  ExternalLink
} from 'lucide-react';
import Hls from 'hls.js';

interface M3UReaderProps {
  onImportChannels: (newChannels: Channel[]) => void;
  onPlayChannel: (channel: Channel) => void;
  existingChannelsCount: number;
}

const SAMPLE_M3U = `#EXTM3U x-tvg-url="https://epgshare01.online/epgshare01/epg_ripper_AL1.xml.gz"
#EXTINF:-1 tvg-name="Al-Hurra Iraq" tvg-logo="https://i.imgur.com/mXBZEQP.png" tvg-id="AlhurraTVIraq.iq" tvg-chno="1" tvg-country="IQ" group-title="Iraq",Al-Hurra Iraq
https://mbnvvideoingest-i.akamaihd.net/hls/live/1004674/MBNV_ALHURRA_IRAQ/playlist.m3u8
#EXTINF:-1 tvg-name="Al-Hurra" tvg-logo="https://i.imgur.com/0izeu5z.png" tvg-id="AlHurra.iq" tvg-chno="2" tvg-country="IQ" group-title="Iraq",Al-Hurra
https://mbnvvideoingest-i.akamaihd.net/hls/live/1004673/MBNV_ALHURRA_MAIN/playlist.m3u8
#EXTINF:-1 tvg-name="Al-Iraqiya" tvg-logo="https://i.imgur.com/imdV6kL.png" tvg-chno="3" tvg-country="IQ" group-title="Iraq",Al-Iraqiya
https://cdn.catiacast.video/abr/8d2ffb0aba244e8d9101a9488a7daa05/playlist.m3u8
#EXTINF:-1 tvg-name="Al-Rasheed" tvg-logo="https://i.imgur.com/SU9HbXY.png" tvg-id="AlRasheedTV.iq" tvg-chno="5" tvg-country="IQ" group-title="Iraq",Al-Rasheed
https://media1.livaat.com/AL-RASHEED-HD/tracks-v1a1/playlist.m3u8
#EXTINF:-1 tvg-name="Dijlah TV" tvg-logo="https://i.imgur.com/FJEeYiz.png" tvg-id="DijlahTV.iq" tvg-chno="9" tvg-country="IQ" group-title="Iraq",Dijlah TV
https://ghaasiflu.online/Dijlah/tracks-v1a1/playlist.m3u8`;

export default function M3UReader({ onImportChannels, onPlayChannel, existingChannelsCount }: M3UReaderProps) {
  const [rawM3U, setRawM3U] = useState('');
  const [singleName, setSingleName] = useState('');
  const [singleUrl, setSingleUrl] = useState('');
  const [singleCategory, setSingleCategory] = useState<'sports' | 'entertainment' | 'news' | 'islamic' | 'iraq'>('iraq');
  
  const [parsedList, setParsedList] = useState<Channel[]>([]);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Embedded Internal Preview Player States
  const [previewChannel, setPreviewChannel] = useState<Channel | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [streamQuality, setStreamQuality] = useState('التلقائية (Auto)');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Hook to handle stream source changes in internal preview player
  useEffect(() => {
    setPlaybackError(null);
    setIsBuffering(false);
    setIsPlaying(true);

    if (!previewChannel) {
      destroyHls();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    destroyHls();

    const streamUrl = previewChannel.streamUrl;

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferSize: 15 * 1000 * 1000, // 15MB for fast loading previews
        maxBufferLength: 15,
        enableWorker: true,
        lowLatencyMode: true
      });

      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsBuffering(false);
        video.play().catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(err => {
            console.error('Autoplay block:', err);
            setPlaybackError('تم حظر البث بسبب إعدادات المتصفح، يرجى تفعيل الصوت أولاً للتشغيل.');
          });
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.warn('HLS preview error:', data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              setPlaybackError('فشل تشغيل سطر البث هذا في المشغل الداخلي. تحقق من صلاحية الرابط.');
              destroyHls();
              break;
          }
        }
      });

      // Standard HTML5 video element buffering indicators
      video.addEventListener('waiting', () => setIsBuffering(true));
      video.addEventListener('playing', () => setIsBuffering(false));

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari support
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {
            setPlaybackError('يرجى النقر لتمكين الصوت والتشغيل.');
          });
        });
      });

      video.addEventListener('error', () => {
        setPlaybackError('فشلت محاولة الاتصال بملف الإندكس الأصلي.');
      });
    } else {
      setPlaybackError('المتصفح لا يدعم بث HLS بشكل طبيعي.');
    }

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    return () => {
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      destroyHls();
    };
  }, [previewChannel]);

  const destroyHls = () => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.src = '';
    }
  };

  const handlePlayToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen().catch(() => {});
      }
    }
  };

  // Parse raw text input
  const handleParseM3U = () => {
    if (!rawM3U.trim()) {
      setStatusMessage({ text: 'يرجى كتابة أو لصق أسطر M3U أو روابط البث أولاً!', type: 'error' });
      return;
    }

    try {
      const lines = rawM3U.split('\n');
      const items: Channel[] = [];
      let currentInfo: { name: string; logo: string; category: 'sports' | 'entertainment' | 'news' | 'islamic' | 'iraq' } | null = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        if (line.startsWith('#EXTINF:')) {
          // Extract Name
          let name = 'قناة مستوردة';
          const nameMatch = line.match(/,(.+)$/);
          if (nameMatch && nameMatch[1]) {
            name = nameMatch[1].trim();
          } else {
            const tvgNameMatch = line.match(/tvg-name="([^"]+)"/);
            if (tvgNameMatch && tvgNameMatch[1]) {
              name = tvgNameMatch[1].trim();
            }
          }

          // Extract Logo
          let logo = 'bg-slate-700';
          const logoMatch = line.match(/tvg-logo="([^"]+)"/);
          if (logoMatch && logoMatch[1]) {
            logo = logoMatch[1].trim();
          }

          // Extract Group Category
          let category: 'sports' | 'entertainment' | 'news' | 'islamic' | 'iraq' = 'iraq';
          const groupMatch = line.match(/group-title="([^"]+)"/i);
          if (groupMatch && groupMatch[1]) {
            const grp = groupMatch[1].toLowerCase();
            if (grp.includes('sport') || grp.includes('رياض')) {
              category = 'sports';
            } else if (grp.includes('news') || grp.includes('أخبار') || grp.includes('اخبار')) {
              category = 'news';
            } else if (grp.includes('islam') || grp.includes('دين') || grp.includes('قرآن')) {
              category = 'islamic';
            } else if (grp.includes('drama') || grp.includes('movie') || grp.includes('ترفيه') || grp.includes('مسلسل')) {
              category = 'entertainment';
            } else if (grp.includes('iraq') || grp.includes('عراق')) {
              category = 'iraq';
            }
          }

          currentInfo = { name, logo, category };
        } else if (line.startsWith('http://') || line.startsWith('https://')) {
          const id = `custom-f-${Math.floor(Math.random() * 1000000)}`;
          
          if (currentInfo) {
            items.push({
              id,
              name: currentInfo.name,
              category: currentInfo.category,
              logo: currentInfo.logo,
              streamUrl: line,
              isSimulated: false,
              viewers: Math.floor(Math.random() * 4500) + 750,
              description: 'قناة تم التحقق منها عن طريق قارئ الأسطر الذكي'
            });
            currentInfo = null;
          } else {
            // URL without preceding EXTINF info
            let fallbackName = 'رابط بث مباشر';
            try {
              const u = new URL(line);
              fallbackName = u.pathname.split('/').pop()?.replace('.playlist.m3u8', '').replace('.m3u8', '') || 'بث مخصص';
              fallbackName = decodeURIComponent(fallbackName);
            } catch (err) {}

            items.push({
              id,
              name: fallbackName,
              category: 'iraq',
              logo: 'bg-slate-700',
              streamUrl: line,
              isSimulated: false,
              viewers: Math.floor(Math.random() * 1200) + 120,
              description: 'رابط مباشر مضاف للمنظومة'
            });
          }
        }
      }

      if (items.length === 0) {
        setStatusMessage({ text: 'لم يتم العثور على أي روابط بث صالحة تبدأ بـ http أو https داخل النص!', type: 'error' });
      } else {
        setParsedList(items);
        setStatusMessage({ text: `تم التعرف بنجاح على ${items.length} قناة/سطر بث جاهزة للمعاينة والتشغيل الداخلي!`, type: 'success' });
        // Auto-load the first parsed channel into internal preview player to showcase playability!
        setPreviewChannel(items[0]);
      }
    } catch (e) {
      console.error(e);
      setStatusMessage({ text: 'حدث خطأ في قراءة الأسطر، تحقق من التنسيق والملف.', type: 'error' });
    }
  };

  // Import parsed items into global app state
  const handleImportToApp = () => {
    if (parsedList.length === 0) return;
    onImportChannels(parsedList);
    setStatusMessage({
      text: `مبروك! تم دمج ${parsedList.length} قناة/سطر جديد في القائمة الرئيسية للتطبيق بنجاح! يمكنك الآن تصفحها من تبويب "بث القنوات".`,
      type: 'success'
    });
    setParsedList([]);
    setRawM3U('');
  };

  // Add individual stream
  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleName.trim() || !singleUrl.trim()) {
      setStatusMessage({ text: 'يرجى ملء اسم القناة ورابط البث بشكل صحيح!', type: 'error' });
      return;
    }
    if (!singleUrl.startsWith('http://') && !singleUrl.startsWith('https://')) {
      setStatusMessage({ text: 'رابط البث يجب أن يبدأ بـ http:// أو https://', type: 'error' });
      return;
    }

    const newChan: Channel = {
      id: `custom-s-${Math.floor(Math.random() * 1000000)}`,
      name: singleName.trim(),
      category: singleCategory,
      logo: 'bg-gradient-to-tr from-amber-500 to-amber-600',
      streamUrl: singleUrl.trim(),
      isSimulated: false,
      viewers: 1200,
      description: 'سطر بث مباشر مضاف بشكل منفصل عن طريق القارئ السريع'
    };

    // Load instantly into internal preview player to let user enjoy it
    setPreviewChannel(newChan);
    onImportChannels([newChan]);
    
    setStatusMessage({
      text: `تم تحميل القناة "${newChan.name}" بنجاح في المشغل الداخلي أدناه وتم تسجيلها في قاعدة بيانات التطبيق!`,
      type: 'success'
    });
    setSingleName('');
    setSingleUrl('');
  };

  const loadSample = () => {
    setRawM3U(SAMPLE_M3U);
    setStatusMessage({ text: 'تم إدراج كود الميدالية النموذجي لباقة القنوات العراقية! اضغط الآن على زر "تحليل وقراءة الأسطر".', type: 'info' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-right" dir="rtl">
      
      {/* COLUMN 1: Inputs and Controls (Span 7) */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Bulk Parser Card */}
        <div id="m3u-bulk-parser" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-2xl">
                <FileText className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-black text-slate-100 text-base">منفذ أسطر وملفات M3U لـ IPTV</h3>
                <p className="text-xs text-slate-400">الصق محتويات أسطر البث لقرائتها وتشغيلها فوراً</p>
              </div>
            </div>
            
            <button
              id="btn-load-sample"
              type="button"
              onClick={loadSample}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-500 font-bold px-3 py-2 rounded-xl border border-slate-700 pointer-events-auto transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>تحميل باقة عراقية تجريبية 🇮🇶</span>
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs text-slate-400 font-semibold">محتويات ملف M3U أو روابط مجمعة:</label>
              <span className="text-[10px] text-slate-500 font-mono">يدعم صيغ #EXTM3U وروابط m3u8 الحية</span>
            </div>
            <textarea
              id="raw-m3u-textarea"
              className="w-full h-44 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-600 block leading-relaxed"
              placeholder={`#EXTM3U\n#EXTINF:-1 tvg-name="قناة الكأس" group-title="Sports"\nhttps://example.com/stream/playlist.m3u8`}
              value={rawM3U}
              onChange={(e) => setRawM3U(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              id="btn-parse-m3u"
              type="button"
              onClick={handleParseM3U}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-amber-500/15 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>تحليل وقراءة الأسطر المضافة</span>
            </button>
          </div>
        </div>

        {/* Single Line Quick Adder Form */}
        <div id="m3u-single-adder" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-2xl">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-100 text-base">إضافة سطر بث مباشر وحيد (سريع)</h3>
              <p className="text-xs text-slate-400">أضف أي رابط بث مباشر عالي الدقة مثل (m3u8, mp4) وتشغيله داخلياً</p>
            </div>
          </div>

          <form onSubmit={handleAddSingle} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="block text-xs text-slate-400 font-semibold">اسم القناة التلفزيونية:</label>
              <input
                id="input-single-name"
                type="text"
                placeholder="مثال: دبي الرياضية HD"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors text-right"
                value={singleName}
                onChange={(e) => setSingleName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="block text-xs text-slate-400 font-semibold">تصنيف القناة أو باقتها:</label>
              <select
                id="select-single-category"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors text-right"
                value={singleCategory}
                onChange={(e) => setSingleCategory(e.target.value as any)}
              >
                <option value="iraq">بث العراق 🇮🇶</option>
                <option value="sports">قنوات رياضية</option>
                <option value="entertainment">مسلسلات وترفيه</option>
                <option value="news">أخبار كبرى</option>
                <option value="islamic">قنوات دينية إسلامية</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs text-slate-400 font-semibold">رابط البث المباشر (HLS Playlist):</label>
              <input
                id="input-single-url"
                type="text"
                placeholder="https://domain.com/live/stream/playlist.m3u8"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors text-left font-mono"
                dir="ltr"
                value={singleUrl}
                onChange={(e) => setSingleUrl(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2 flex justify-end pt-2">
              <button
                id="btn-submit-single"
                type="submit"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-500 border border-slate-700 font-bold px-6 py-3 rounded-xl text-xs transition-all cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة وتشغيل فوري في المشغل الداخلي</span>
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* COLUMN 2: Embedded Internal Video Player & Live Results Preview (Span 5) */}
      <div className="lg:col-span-5 space-y-6">

        {/* Embedded Live Video Player Screen */}
        <div id="m3u-internal-player-container" className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col">
          
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-black text-slate-100 text-sm">شاشة العرض والمعاينة الفورية</span>
            </div>
            {previewChannel && (
              <span className="text-[10px] text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-bold">
                مشغل HLS ذكي
              </span>
            )}
          </div>

          <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
            {previewChannel ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain pointer-events-none"
                  playsInline
                  crossOrigin="anonymous"
                />

                {/* Loading status */}
                {isBuffering && !playbackError && (
                  <div className="absolute inset-0 bg-slate-950/70 flex flex-col justify-center items-center gap-2 z-10 select-none">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-amber-500 animate-spin"></div>
                    <span className="text-[10px] text-slate-400">جاري تحميل البث...</span>
                  </div>
                )}

                {/* Playback Error Overlay */}
                {playbackError && (
                  <div className="absolute inset-0 bg-slate-950/95 flex flex-col justify-center items-center p-4 text-center gap-2 z-20">
                    <AlertCircle className="w-10 h-10 text-amber-500" />
                    <span className="text-xs text-slate-200 font-bold leading-relaxed">{playbackError}</span>
                    <button
                      type="button"
                      onClick={() => setPreviewChannel({ ...previewChannel })}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-500 px-3 py-1.5 rounded-lg font-bold"
                    >
                      إعادة المحاولة
                    </button>
                  </div>
                )}

                {/* Video controls bottom bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 to-transparent p-3 pt-8 pb-3 text-white flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePlayToggle}
                      className="p-1 rounded hover:bg-slate-800 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleMuteToggle}
                      className="p-1 rounded hover:bg-slate-800 cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <span className="text-[9px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-full">
                    {streamQuality}
                  </span>

                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-1 rounded hover:bg-slate-800 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-slate-600 flex flex-col items-center justify-center gap-2.5">
                <div className="w-14 h-14 rounded-full bg-slate-800/80 flex items-center justify-center border border-slate-750 text-slate-500">
                  <Tv className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 block">المشغل الداخلي شاغر حالياً</span>
                  <p className="text-[10px] text-slate-500 leading-relaxed max-w-[240px]">
                    حدد أي سطر بث من القائمة المستخرجة أو قم بلصق رابط m3u8 لبدء المعاينة بدون مغادرة الصفحة.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Active preview channel info panel */}
          {previewChannel && (
            <div className="p-4 bg-slate-950 border-t border-slate-850 space-y-2 text-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-amber-500 text-sm truncate">{previewChannel.name}</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md shrink-0">
                  {previewChannel.category === 'iraq' ? 'باقة العراق 🇮🇶' : 'قناة مخصصة'}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 break-all font-mono leading-relaxed bg-slate-900 p-2 rounded-lg border border-slate-850 select-text">
                {previewChannel.streamUrl}
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-[10px] text-slate-500">رابط البث الحي النشط</span>
                <button
                  type="button"
                  onClick={() => onPlayChannel(previewChannel)}
                  className="text-[11px] font-black text-slate-950 bg-amber-500 hover:bg-amber-600 px-3 py-1.5 rounded-lg active:scale-95 transition-all inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>تثبيت وتشغيل في البوابة الكبرى</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Display Status Alerts */}
        {statusMessage && (
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 animate-fadeIn ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
              : statusMessage.type === 'info'
              ? 'bg-blue-500/15 border-blue-500/30 text-blue-400'
              : 'bg-red-500/15 border-red-500/30 text-red-400'
          }`}>
            <span className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-500" />
              <span>نظام القارئ التفاعلي:</span>
            </span>
            <p className="text-right leading-relaxed text-slate-300">{statusMessage.text}</p>
          </div>
        )}

        {/* Parsed Output list with single Click Preview Playability */}
        <div id="m3u-channels-list-preview" className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="font-black text-slate-100 text-sm block">القنوات المكتشفة القابلة للتثبيت ({parsedList.length})</span>
            <p className="text-[10px] text-slate-400">انقر على زر المعينة لتشغيلها فوراً في مشغل المعاينة الداخلي</p>
          </div>

          {parsedList.length > 0 ? (
            <div className="space-y-2">
              <div className="max-h-64 overflow-y-auto pr-1 space-y-2">
                {parsedList.map((ch) => {
                  const isActivePreview = previewChannel?.id === ch.id;
                  return (
                    <div
                      key={ch.id}
                      className={`border p-2.5 rounded-xl flex items-center justify-between gap-3 text-right transition-all group ${
                        isActivePreview
                          ? 'bg-amber-500/10 border-amber-500/30'
                          : 'bg-slate-950 border-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-slate-850 border border-slate-800 flex items-center justify-center text-[10px] font-bold text-amber-500 group-hover:bg-amber-500/20 transition-colors shrink-0">
                          <Radio className="w-4 h-4 text-amber-500 shrink-0" />
                        </div>
                        <div className="overflow-hidden">
                          <span className={`font-bold text-xs block truncate ${isActivePreview ? 'text-amber-400' : 'text-slate-200'}`}>
                            {ch.name}
                          </span>
                          <span className="text-[9px] text-slate-500 block truncate leading-tight mt-0.5">{ch.streamUrl}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Play instantly in internal reader player */}
                        <button
                          type="button"
                          onClick={() => setPreviewChannel(ch)}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isActivePreview
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          }`}
                          title="تشغيل في الشاشة الداخلية"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleImportToApp}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-black p-3 rounded-xl text-xs transition-transform transform active:scale-95 hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer"
                >
                  <ListChecks className="w-4 h-4" />
                  <span>تثبيت جميع أسطر البث في القائمة الرئيسية</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500 space-y-2 flex flex-col items-center justify-center">
              <Upload className="w-8 h-8 text-slate-600 animate-bounce" />
              <p className="text-[11px] max-w-[200px] leading-relaxed">
                لا يوجد أسطر تم تحليلها بعد، قم بلصق الكود واضغط "تحليل وقراءة الأسطر" لعرض باقتك هنا يدوياً.
              </p>
            </div>
          )}
        </div>

        {/* Counter Widget Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 text-center">
          <span className="text-xs text-slate-400 block font-semibold">إجمالي القنوات النشطة في البوابة التلفزيونية:</span>
          <span className="text-3xl font-black text-amber-500 block mt-1 tracking-wider">{existingChannelsCount}</span>
        </div>

      </div>

    </div>
  );
}
