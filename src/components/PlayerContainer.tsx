/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Channel, Match } from '../types';
import { Volume2, VolumeX, Maximize2, Play, Pause, Users, Zap, AlertCircle, Info, RefreshCw, Layers } from 'lucide-react';
import Hls from 'hls.js';

interface PlayerContainerProps {
  channel: Channel;
  associatedMatch: Match | null;
}

export default function PlayerContainer({ channel, associatedMatch }: PlayerContainerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [streamQuality, setStreamQuality] = useState('1085p (Full HD)');
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [buffering, setBuffering] = useState(false);

  // Interactive Live Simulated Match Metrics
  const [possession, setPossession] = useState({ home: 50, away: 50 });
  const [shots, setShots] = useState({ home: 8, away: 9 });
  const [liveTicker, setLiveTicker] = useState('أهلاً بكم في البث المباشر للقناة. المباراة جارية الآن تكتيكياً وحماسياً.');

  // Initialize and load HLS link programmatically
  useEffect(() => {
    // Reset state on channel change
    setPlaybackError(null);
    setBuffering(false);
    setIsPlaying(true);

    if (channel.isSimulated || !channel.streamUrl) {
      // Cleanup previous HLS instances
      destroyHls();
      // Start soccer simulation loop
      const interval = setInterval(() => {
        runSimLoop();
      }, 5000);
      return () => clearInterval(interval);
    }

    const video = videoRef.current;
    if (!video) return;

    destroyHls();

    const hlsUrl = channel.streamUrl;

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferSize: 30 * 1000 * 1000, // 30MB
        maxBufferLength: 30, // 30 seconds
        enableWorker: true,
        lowLatencyMode: true
      });

      hlsRef.current = hls;
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Auto-play was blocked, mute and retry
          video.muted = true;
          setIsMuted(true);
          video.play().catch(err => {
            console.error('Play failure:', err);
            setPlaybackError('تم حظر التشغيل التلقائي من قبل المتصفح. اضغط على زر البدء لتشغيل الصوت والبث.');
          });
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.warn('HLS error:', data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('Fatal network error, attempting to recover...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('Fatal media error, attempting recovery...');
              hls.recoverMediaError();
              break;
            default:
              setPlaybackError('عذراً، لم نتمكن من الاتصال بمصدر البث لهذه القناة حالياً.');
              destroyHls();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari support
      video.src = hlsUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {
            setPlaybackError('تم حظر التشغيل التلقائي. اضغط زر التشغيل للمشاهدة.');
          });
        });
      });

      video.addEventListener('error', () => {
        setPlaybackError('فشل تشغيل ملقم البث الأصلي في متصفحك.');
      });
    } else {
      setPlaybackError('متصفحك الحالي لا يدعم تشغيل هذا النوع من البث الحي (HLS) بشكل مباشر.');
    }

    return () => {
      destroyHls();
    };
  }, [channel]);

  const destroyHls = () => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.src = '';
    }
  };

  // Run Match Events Simulation 
  const runSimLoop = () => {
    const tickers = [
      "تمريرة من وسط الملعب لصالح الهجوم وتغطية رائعة للمدافعين.",
      "تسديدة صاااروخية تلامس الشباك الجانبية! يا له من خطر كبير!",
      "خطأ تكتيكي في دائرة المنتصف واللاعب يطلب الهدوء من الحكم.",
      "هجمة مرتدة سريعة للغاية كادت أن تسفر عن هدف ولكن الحارس يقع في الموعد.",
      "ضغط جماهيري رهيب يهز المدرجات في هذه اللحظات الحماسية!",
      "توزيعة دقيقة داخل مربع العمليات يبعدها الدفاع بقبضة قوية.",
      "تمريرة بينية خارقة من صانع الألعاب تشتبك مع خط التسلل المرفوع."
    ];
    const randomIndex = Math.floor(Math.random() * tickers.length);
    setLiveTicker(tickers[randomIndex]);

    // Alter possession slightly
    const homePoss = Math.floor(Math.random() * 20) + 40; // 40 to 60
    setPossession({ home: homePoss, away: 100 - homePoss });

    // Shot odds
    if (Math.random() > 0.6) {
      setShots(prev => ({
        home: prev.home + (Math.random() > 0.5 ? 1 : 0),
        away: prev.away + (Math.random() > 0.5 ? 1 : 0),
      }));
    }
  };

  const handlePlayToggle = () => {
    if (channel.isSimulated || !channel.streamUrl) {
      setIsPlaying(!isPlaying);
      return;
    }

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
    if (channel.isSimulated || !channel.streamUrl) {
      setIsMuted(!isMuted);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video && video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    } else {
      // Fallback message or simple alert
      console.log('Fullscreen request dispatched, limited platform support');
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6" dir="rtl">
      
      {/* Visual Streaming Player Card */}
      <div className="w-full flex flex-col gap-4">
        
        {/* Core Screen */}
        <div id="video-stage" className="relative aspect-video rounded-3xl bg-slate-950 overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-center items-center group">
          
          {/* Simulated Broadcast Cover */}
          {channel.isSimulated || !channel.streamUrl ? (
            <div className="absolute inset-0 z-10 bg-slate-950 flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none">
              
              {/* Field Grid Graphics */}
              <div className="absolute inset-0 border-[6px] border-emerald-500/10 rounded-2xl flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-1/2 h-full border-l border-emerald-500/10 flex items-center justify-center">
                  <div className="w-24 h-24 border border-emerald-500/10 rounded-full"></div>
                </div>
              </div>

              {/* Top Banner Indicator */}
              <div className="flex items-center justify-between z-10 w-full">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono">بث حي فائق الدقة</span>
                </div>
                
                {associatedMatch && (
                  <div className="bg-slate-900/90 border border-slate-800/80 px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs">
                    <span className="font-extrabold text-white text-xs">{associatedMatch.teamHome}</span>
                    <span className="bg-slate-950 px-2 py-0.5 rounded-md text-amber-500 text-[11px] font-mono">
                      {associatedMatch.scoreHome} - {associatedMatch.scoreAway}
                    </span>
                    <span className="font-extrabold text-white text-xs">{associatedMatch.teamAway}</span>
                  </div>
                )}
              </div>

              {/* Central Animated Player HUD */}
              <div className="flex flex-col items-center justify-center text-center z-10 gap-3 my-auto">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
                  <Play className="w-10 h-10 fill-current translate-x-0.5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-white text-lg sm:text-xl">
                    بث تجاوبي نشط: {channel.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {associatedMatch ? `${associatedMatch.league} • جاري البث حالياً بنجاح` : 'بث محاكاة ترفيهية تفاعلية مع الجماهير'}
                  </p>
                </div>
              </div>

              {/* Bottom Scrolling Match Ticker */}
              <div className="bg-slate-900/90 border border-slate-800/80 px-4 py-2 rounded-xl flex items-center gap-3 z-10 w-full min-h-[44px]">
                <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-md shrink-0">
                  أحداث اللقاء
                </span>
                <p className="text-xs text-slate-200 truncate pr-1 font-sans font-medium text-right flex-1">
                  {liveTicker}
                </p>
              </div>

            </div>
          ) : (
            <>
              {/* Real HTML5 & Hls.js Media Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-contain z-10 pointer-events-none"
                playsInline
                crossOrigin="anonymous"
              />

              {/* Playback Error Ticker */}
              {playbackError && (
                <div className="absolute inset-0 z-20 bg-slate-950/95 flex flex-col justify-center items-center p-6 text-center gap-4">
                  <AlertCircle className="w-12 h-12 text-amber-500 animate-bounce" />
                  <div className="space-y-1 max-w-md">
                    <h4 className="font-bold text-slate-100 text-sm">{playbackError}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      بعض قنوات البث الحي قد تواجه انقطاعات مؤقتة أو قيود جغرافية. تم تعشيق معطيات البث الاحتياطية تلقائياً.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setPlaybackError(null);
                      // Toggle simulated fall-back instantly or reset HLS source
                      channel.isSimulated = true;
                      window.location.reload();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>تشغيل البث الاحتياطي التفاعلي</span>
                  </button>
                </div>
              )}
            </>
          )}

          {/* Buffering HUD overlay */}
          {buffering && !playbackError && (
            <div className="absolute inset-0 z-15 bg-slate-950/80 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border-4 border-slate-700 border-t-amber-500 animate-spin"></div>
                <span className="text-xs text-slate-400">جاري تعبئة الذاكرة المؤقتة لمشاهدة بدون تقطيع...</span>
              </div>
            </div>
          )}

          {/* Media Interactive Bottom HUD Controls */}
          <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-slate-950/100 to-slate-950/0 p-4 pt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-white">
            
            {/* Play/Pause & Audio Mute Toggles */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayToggle}
                className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <button
                onClick={handleMuteToggle}
                className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <div className="h-4 w-[1px] bg-slate-800"></div>

              {/* Viewers Counter */}
              <div className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-full text-[10px] font-mono select-none">
                <Users className="w-3 h-3 text-emerald-400 shrink-0" />
                <span dir="ltr">{(channel.viewers + 130).toLocaleString()}</span>
              </div>
            </div>

            {/* Quality Swappers & Fullscreen */}
            <div className="flex items-center gap-3">
              
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-300">
                <Zap className="w-3 h-3 text-amber-500 shrink-0 select-none" />
                <span>بروتوكول البث ذو الكمون المنخفض</span>
              </div>

              {/* Quality Picker */}
              <div className="relative">
                <button className="flex items-center gap-1 text-[11px] bg-slate-900/80 px-3 py-1 rounded-full hover:bg-slate-800 cursor-pointer text-slate-300">
                  <Layers className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{streamQuality}</span>
                </button>
              </div>

              <button
                onClick={handleFullscreen}
                className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Stream Details & Interactive Meta Tabs */}
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800/80 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">{channel.name}</h2>
              <p className="text-xs text-slate-400 mt-1">{channel.description || 'تغطية متواصلة بجودة فائقة.'}</p>
            </div>
            
            <span className="shrink-0 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md mt-1">
              {channel.isSimulated ? 'محاكاة ذكية متصلة' : 'بث مباشر'}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
