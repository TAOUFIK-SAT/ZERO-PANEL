/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Channel, Match } from './types';
import { CHANNELS, MATCHES } from './data';
import Header from './components/Header';
import PlayerContainer from './components/PlayerContainer';
import ChannelGrid from './components/ChannelGrid';
import MatchList from './components/MatchList';
import AIConsultant from './components/AIConsultant';
import NewsSection from './components/NewsSection';
import M3UReader from './components/M3UReader';
import AppInstaller from './components/AppInstaller';
import DreamSatPanelViewer from './components/DreamSatPanelViewer';
import { Tv, Flame, Sparkles, AlertTriangle, ShieldCheck, Mail, Info, Heart } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dreamsat');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Channels and matches state - dynamic to support M3U imports
  const [channels, setChannels] = useState<Channel[]>(CHANNELS);
  const [matches] = useState<Match[]>(MATCHES);
  
  // Selected video states
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [selectedMatchForAI, setSelectedMatchForAI] = useState<Match | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Function to import multiple parsed M3U channels
  const handleImportChannels = (newChannels: Channel[]) => {
    // Prevent duplicating identical stream links
    const filtered = newChannels.filter(
      (newCh) => !channels.some((ch) => ch.streamUrl.trim() === newCh.streamUrl.trim())
    );
    if (filtered.length > 0) {
      setChannels((prev) => [...prev, ...filtered]);
    }
  };

  // Function to instantly play any specific M3U channel
  const handlePlayImportedChannel = (channel: Channel) => {
    // Add to channel list if it doesn't exist
    if (!channels.some(ch => ch.id === channel.id || ch.streamUrl.trim() === channel.streamUrl.trim())) {
      setChannels((prev) => [...prev, channel]);
    }
    
    // Select channel and switch view
    setSelectedChannel(channel);
    setCurrentTab('channels');
    
    // Scroll smoothly to top of the page/player
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 120);
  };

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('taoufik_favs_v2') || localStorage.getItem('yacine_favs_v2');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed reading storage:', e);
      }
    }
    // Set default channel to play
    if (CHANNELS.length > 0) {
      setSelectedChannel(CHANNELS[0]);
    }
  }, []);

  // Sync favorites
  const toggleFavorite = (channelId: string) => {
    let updated: string[];
    if (favorites.includes(channelId)) {
      updated = favorites.filter((id) => id !== channelId);
    } else {
      updated = [...favorites, channelId];
    }
    setFavorites(updated);
    localStorage.setItem('taoufik_favs_v2', JSON.stringify(updated));
  };

  // Switch to correct stream when clicking match watch button
  const handleSelectChannelById = (channelId: string) => {
    const chan = channels.find((c) => c.id === channelId);
    if (chan) {
      setSelectedChannel(chan);
      setCurrentTab('channels');
      // Scroll/Ascend smoothly to top of the page/player
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  // Direct shortcut from match layout to AI consultant 
  const handleRequestAIAnalysis = (match: Match) => {
    setSelectedMatchForAI(match);
    setCurrentTab('ai');
    // Scroll to analyst section
    setTimeout(() => {
      const tabEl = document.getElementById('tab-ai-analyst');
      tabEl?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Find match associated with current active channel to display live metrics
  const getAssociatedMatchForChannel = (chanId: string): Match | null => {
    return matches.find((m) => m.channelId === chanId && m.status === 'live') || null;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-all duration-300 antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header Selector & Searches */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Dynamic tabs controller */}
        {currentTab === 'channels' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Embedded Active Player at top */}
            {selectedChannel && (
              <PlayerContainer
                channel={selectedChannel}
                associatedMatch={getAssociatedMatchForChannel(selectedChannel.id)}
              />
            )}

            {/* Channels Grid Selection is loaded directly underneath */}
            <ChannelGrid
              channels={channels}
              selectedChannel={selectedChannel}
              onSelectChannel={setSelectedChannel}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              searchQuery={searchQuery}
            />

          </div>
        )}

        {currentTab === 'matches' && (
          <div className="animate-fadeIn">
            <MatchList
              matches={matches}
              channels={channels}
              onSelectChannelById={handleSelectChannelById}
              onRequestAIAnalysis={handleRequestAIAnalysis}
            />
          </div>
        )}

        {currentTab === 'ai' && (
          <div className="animate-fadeIn">
            <AIConsultant
              matches={matches}
              selectedMatchForAI={selectedMatchForAI}
              setSelectedMatchForAI={setSelectedMatchForAI}
            />
          </div>
        )}

        {currentTab === 'news' && (
          <div className="animate-fadeIn">
            <NewsSection />
          </div>
        )}

        {currentTab === 'm3u-reader' && (
          <div className="animate-fadeIn">
            <M3UReader
              onImportChannels={handleImportChannels}
              onPlayChannel={handlePlayImportedChannel}
              existingChannelsCount={channels.length}
            />
          </div>
        )}

        {currentTab === 'dreamsat' && (
          <div className="animate-fadeIn">
            <DreamSatPanelViewer />
          </div>
        )}

        {currentTab === 'install' && (
          <div className="animate-fadeIn">
            <AppInstaller />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-right space-y-6 shadow-2xl animate-fadeIn" dir="rtl">
            <div className="text-center space-y-3">
              <div className="inline-flex w-16 h-16 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-2xl items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
                <Tv className="w-8 h-8 text-slate-950" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-100">بوابة توفيق تيفي للبث المباشر (الذهبية)</h3>
              <p className="text-xs text-slate-400 font-mono">الإصدار 2.5 • قنوات HD و SD مع المحلل الذكي التوليدي</p>
            </div>

            <div className="border-t border-slate-800 pt-6 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300">
              <p>
                أهلاً بكم في <strong>توفيق تيفي (Taoufik TV Live) المطور</strong>، التطبيق المتكامل لمشاهدة القنوات الرياضية والترفيهية، وجدول مباريات كرة القدم اليومية، والدردشة التفاعلية الحية للمشجعين من جميع أنحاء الوطن العربي.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-1.5">
                  <span className="text-amber-500 font-bold block text-xs">⚡ تشغيل في بروتوكول HLS</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    يدعم المشغّل التقدمي تشغيل قنوات البث الحرة بمعدل ترميز ذكي ومستقر يلائم سرعات الإنترنت الضعيفة والمتنقلة 4G/5G.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-1.5">
                  <span className="text-amber-500 font-bold block text-xs">🧠 محرك التحليل بالذكاء الاصطناعي</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    استخدم ميزة محلل توفيق الذكي على السيرفر (Gemini) للحصول فوراً على تحليلات المدربين وتوقعات تكتيكية مبهرة للمواجهات الكلاسيكية.
                  </p>
                </div>

              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex items-start gap-3 mt-4">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-200 text-xs block">تطبيق آمن وقانوني بالكامل</span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    هذا التطبيق مجاني، ويعتمد على بث القنوات الإخبارية والإسلامية المتاحة قانوناً للجمهور، بالإضافة إلى محاكاة تفاعلية مبتكرة عالية الجودة للبث الرياضي من أجل توفير أفضل مساحة متابعة ونقاش للمباريات بدون تقطيع أو انتهاكات.
                  </p>
                </div>
              </div>

            </div>

            <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 gap-4">
              <div className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                <span>صُنع مع بكل الشغف لعشاق الرياضة والمستديرة</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>بريد الدعم والاتصال: <a href="mailto:support@taoufiktv.com" className="hover:underline text-amber-500">support@taoufiktv.com</a></span>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer System info */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 py-4 select-none shrink-0" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs space-y-1.5">
          <p>© {new Date().getFullYear()} توفيق تيفي المطور الأصلي (Taoufik TV Live) - كافة الحقوق محفوظة.</p>
          <p className="text-[10px] text-slate-600 font-mono">سيرفر التشغيل النشط • منفذ العبور الآمن 3000</p>
        </div>
      </footer>

    </div>
  );
}
