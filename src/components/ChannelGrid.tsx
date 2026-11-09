/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Channel } from '../types';
import { Play, Star, Sparkles, Heart } from 'lucide-react';

interface ChannelGridProps {
  channels: Channel[];
  selectedChannel: Channel | null;
  onSelectChannel: (channel: Channel) => void;
  favorites: string[];
  toggleFavorite: (channelId: string) => void;
  searchQuery: string;
}

export default function ChannelGrid({
  channels,
  selectedChannel,
  onSelectChannel,
  favorites,
  toggleFavorite,
  searchQuery
}: ChannelGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter channels based on search and selected category
  const filteredChannels = channels.filter((channel) => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (channel.description && channel.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeCategory === 'all') return matchesSearch;
    if (activeCategory === 'favorites') return matchesSearch && favorites.includes(channel.id);
    return matchesSearch && channel.category === activeCategory;
  });

  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'favorites', name: 'المفضلة ⭐️' },
    { id: 'iraq', name: 'باقة العراق 🇮🇶' },
    { id: 'sports', name: 'قنوات رياضية' },
    { id: 'entertainment', name: 'مسلسلات وترفيه' },
    { id: 'news', name: 'الأخبار مباشر' },
    { id: 'islamic', name: 'قنوات إسلامية' },
  ];

  const categoryColors: Record<string, string> = {
    iraq: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    sports: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    entertainment: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    news: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    islamic: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  const categoryLabels: Record<string, string> = {
    iraq: 'بث العراق 🇮🇶',
    sports: 'رياضة HD',
    entertainment: 'ترفيه وعائلة',
    news: 'أخبار كبرى',
    islamic: 'بث إسلامي',
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Category Tabs */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
          باقة القنوات المتاحة
        </h3>
        <span className="text-xs text-slate-400 font-mono">
          تم العثور على {filteredChannels.length} قناة
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin select-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 text-xs md:text-sm font-medium rounded-xl border shrink-0 transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/10'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-100 hover:bg-slate-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filteredChannels.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
          <p className="text-slate-500 text-sm">لا توجد قنوات مطابقة لبحثك أو في هذه الفئة حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChannels.map((channel) => {
            const isFav = favorites.includes(channel.id);
            const isSelected = selectedChannel?.id === channel.id;

            return (
              <div
                key={channel.id}
                id={`channel-card-${channel.id}`}
                className={`group rounded-2xl border bg-slate-900 p-4 transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 shadow-lg shadow-amber-500/5 bg-gradient-to-br from-slate-900 to-amber-950/20'
                    : 'border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                {/* Channel Header (Logo & Favorite & Category) */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md shadow-black/40 relative overflow-hidden shrink-0 ${channel.logo}`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/30"></div>
                      <span className="text-xs tracking-wider font-sans text-center px-1">
                        {channel.name.split(' ').slice(0, 2).join(' ')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 group-hover:text-amber-400 transition-colors text-right text-sm sm:text-base">
                        {channel.name}
                      </h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[channel.category] || 'bg-slate-800 text-slate-400'}`}>
                        {categoryLabels[channel.category]}
                      </span>
                    </div>
                  </div>

                  {/* Favorite Toggle */}
                  <button
                    id={`fav-toggle-${channel.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(channel.id);
                    }}
                    className={`p-2 rounded-xl border transition-all shrink-0 cursor-pointer ${
                      isFav
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-3 line-clamp-2 min-h-[32px] text-right leading-relaxed">
                  {channel.description || 'بث حي بجودة كاملة بدون تقطيع.'}
                </p>

                {/* Viewer Stats & Play Button */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-850">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono" dir="ltr">
                      {channel.viewers.toLocaleString('ar-EG')} مشاهد
                    </span>
                  </div>

                  <button
                    id={`btn-play-${channel.id}`}
                    onClick={() => onSelectChannel(channel)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-200 group-hover:bg-amber-500 group-hover:text-slate-950'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isSelected ? 'بث نشط' : 'شغل البث'}</span>
                  </button>
                </div>

                {/* Simulated Label for Non-Real streams */}
                {channel.isSimulated && (
                  <div className="absolute top-1 left-2">
                    <span className="text-[9px] bg-slate-950/60 border border-slate-800/60 text-indigo-400 px-1.5 rounded-md transform -skew-x-12 inline-block">
                      محاكاة ذكية
                    </span>
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
