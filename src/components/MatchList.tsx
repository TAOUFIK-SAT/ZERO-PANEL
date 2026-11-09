/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Match, Channel } from '../types';
import { Play, Clock, Sparkles, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface MatchListProps {
  matches: Match[];
  channels: Channel[];
  onSelectChannelById: (channelId: string) => void;
  onRequestAIAnalysis: (match: Match) => void;
}

export default function MatchList({
  matches,
  channels,
  onSelectChannelById,
  onRequestAIAnalysis
}: MatchListProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'upcoming' | 'finished'>('all');
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  const filteredMatches = matches.filter((match) => {
    if (activeFilter === 'all') return true;
    return match.status === activeFilter;
  });

  const getStatusBadge = (status: 'upcoming' | 'live' | 'finished') => {
    switch (status) {
      case 'live':
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold rounded-full bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            مباشر الآن
          </span>
        );
      case 'upcoming':
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
            <Clock className="w-3.5 h-3.5" />
            بانتظار البداية
          </span>
        );
      case 'finished':
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold rounded-full bg-slate-900 border border-slate-800 text-slate-400">
            انتهت المباراة
          </span>
        );
    }
  };

  const toggleLineups = (matchId: string) => {
    if (expandedMatchId === matchId) {
      setExpandedMatchId(null);
    } else {
      setExpandedMatchId(matchId);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Matches Header Block */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-2 border-b border-slate-800 gap-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          جدول مباريات اليوم
        </h3>

        {/* Filters */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl gap-1 shrink-0 self-start md:self-auto select-none">
          {(['all', 'live', 'upcoming', 'finished'] as const).map((filter) => {
            const labels = {
              all: 'جميع المباريات',
              live: 'مباشر 🔴',
              upcoming: 'القادمة',
              finished: 'المنتهية'
            };

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {labels[filter]}
              </button>
            );
          })}
        </div>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 flex flex-col items-center justify-center gap-3">
          <AlertCircle className="w-10 h-10 text-slate-600" />
          <p className="text-slate-400 text-sm">لا تتوفر مباريات مجدولة تحت هذا الفهرس حالياً.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMatches.map((match) => {
            const channel = channels.find((c) => c.id === match.channelId);
            const isExpanded = expandedMatchId === match.id;

            return (
              <div
                key={match.id}
                id={`match-card-${match.id}`}
                className={`bg-slate-900 border rounded-2xl transition-all duration-300 overflow-hidden ${
                  match.status === 'live'
                    ? 'border-red-500/30 shadow-lg shadow-red-500/5'
                    : 'border-slate-800'
                }`}
              >
                {/* Scoreboard Body */}
                <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  
                  {/* League & Time Indicator Info */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-right w-full md:w-1/4">
                    <span className="text-xs font-bold text-amber-500 bg-amber-500/5 px-2 py-1 rounded-md border border-amber-500/10 mb-2">
                      {match.league}
                    </span>
                    <span className="text-xs text-slate-400 font-mono mt-1">
                      القناة: <span className="text-indigo-400 font-bold">{channel?.name || 'قناة مشفرة مالكة'}</span>
                    </span>
                    <div className="mt-3">
                      {getStatusBadge(match.status)}
                    </div>
                  </div>

                  {/* High Fidelity Scoreboard */}
                  <div className="flex items-center justify-center gap-4 sm:gap-8 w-full md:w-2/4">
                    
                    {/* Home Team */}
                    <div className="flex flex-col items-center text-center w-24 sm:w-28 shrink-0">
                      <span className="text-4xl filter drop-shadow">
                        {match.teamHomeLogo}
                      </span>
                      <span className="text-sm font-bold text-slate-100 mt-2 truncate max-w-full">
                        {match.teamHome}
                      </span>
                    </div>

                    {/* Score / Center Stats Info */}
                    <div className="flex flex-col items-center justify-center shrink-0">
                      {match.status === 'upcoming' ? (
                        <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-center">
                          <span className="text-[13px] text-slate-300 font-mono block tracking-wider" dir="ltr">
                            {match.time}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center bg-slate-950 border border-slate-800/80 px-5 py-2.5 rounded-2xl relative shadow-inner">
                            <span className="text-2xl sm:text-3xl font-black font-mono text-slate-100 pr-1 select-all">{match.scoreHome}</span>
                            <span className="text-xl font-bold text-slate-500 px-3 select-all">:</span>
                            <span className="text-2xl sm:text-3xl font-black font-mono text-slate-100 pl-1 select-all">{match.scoreAway}</span>
                          </div>
                          
                          {/* Minute Indicator / Live Ticker */}
                          <span className="text-xs text-red-400 font-black animate-pulse bg-red-500/10 px-2 py-0.5 rounded-full mt-2">
                            {match.time}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center text-center w-24 sm:w-28 shrink-0">
                      <span className="text-4xl filter drop-shadow">
                        {match.teamAwayLogo}
                      </span>
                      <span className="text-sm font-bold text-slate-100 mt-2 truncate max-w-full">
                        {match.teamAway}
                      </span>
                    </div>

                  </div>

                  {/* Actions (Watch + Request AI Analysis) */}
                  <div className="flex flex-row md:flex-col gap-2 w-full md:w-1/4 justify-center md:items-end">
                    
                    {match.status === 'live' && channel && (
                      <button
                        id={`btn-watch-match-${match.id}`}
                        onClick={() => onSelectChannelById(channel.id)}
                        className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-black bg-red-600 text-white rounded-xl hover:bg-red-500 shadow-md shadow-red-500/10 cursor-pointer transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>شاهد البث</span>
                      </button>
                    )}

                    {match.status !== 'live' && channel && (
                      <button
                        id={`btn-channel-match-${match.id}`}
                        onClick={() => onSelectChannelById(channel.id)}
                        className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700/60 rounded-xl hover:bg-slate-750 cursor-pointer transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>احجز القناة</span>
                      </button>
                    )}

                    <button
                      id={`btn-ai-predict-${match.id}`}
                      onClick={() => onRequestAIAnalysis(match)}
                      className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-xl hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>تحليل الذكاء</span>
                    </button>
                  </div>

                </div>

                {/* Event Highlights / Lineup Toggles */}
                <div className="bg-slate-950/60 px-4 py-2.5 border-t border-slate-850 flex justify-between items-center text-xs">
                  <button
                    onClick={() => toggleLineups(match.id)}
                    className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors font-semibold"
                  >
                    <span>التشكيلة والأحداث</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {match.status === 'live' && (
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
                      <span className="text-red-400 font-bold">بث مباشر بدون تقطيع متوفر الآن</span>
                    </div>
                  )}

                  {match.status === 'upcoming' && (
                    <span className="text-slate-500">ستبدأ اللمحات والتعليقات بحلول صافرة البداية</span>
                  )}
                </div>

                {/* Expanded Section (Team Lineups and Event Logs) */}
                {isExpanded && (
                  <div className="p-4 bg-slate-950/90 border-t border-slate-850/80 animate-fadeIn space-y-4">
                    
                    {/* Event Listing */}
                    {match.events && match.events.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="text-xs font-bold text-slate-400 border-b border-slate-800 pb-1.5">
                          أحداث ومجريات اللقاء الكروي
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {match.events.map((event, i) => {
                            const eventTypeArabicMap = {
                              goal: '⚽ هدف!',
                              card_red: '🟥 بطاقة حمراء',
                              card_yellow: '🟨 بطاقة صفراء',
                              substitution: '🔄 تبديل'
                            };

                            const eventColors = {
                              goal: 'text-emerald-400 font-extrabold',
                              card_red: 'text-red-500',
                              card_yellow: 'text-yellow-400',
                              substitution: 'text-sky-400'
                            };

                            return (
                              <div key={i} className="flex items-center justify-between text-xs py-1 bg-slate-900/60 px-3 rounded-lg">
                                <span className="text-slate-300 font-black font-mono">د {event.minute}</span>
                                <span className={`font-semibold ${eventColors[event.type]}`}>{eventTypeArabicMap[event.type]}</span>
                                <span className="text-slate-100 font-sans">{event.player}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Squad Lineups */}
                    {match.lineups ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Home Lineup */}
                        <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                          <h6 className="text-xs font-black text-amber-500 mb-2 border-b border-slate-800 pb-1">
                            تشكيلة {match.teamHome} (الرسمية)
                          </h6>
                          <div className="flex flex-wrap gap-1.5">
                            {match.lineups.home.map((player, idx) => (
                              <span key={idx} className="bg-slate-900 text-slate-300 px-2 py-0.5 rounded-md text-[11px] border border-slate-800/80">
                                {player}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Away Lineup */}
                        <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                          <h6 className="text-xs font-black text-amber-500 mb-2 border-b border-slate-800 pb-1">
                            تشكيلة {match.teamAway} (الرسمية)
                          </h6>
                          <div className="flex flex-wrap gap-1.5">
                            {match.lineups.away.map((player, idx) => (
                              <span key={idx} className="bg-slate-900 text-slate-300 px-2 py-0.5 rounded-md text-[11px] border border-slate-800/80">
                                {player}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-xs text-slate-500 py-2">لا تتوفر تشكيلة معلنة حتى الآن.</p>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
