/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NEWS } from '../data';
import { NewsItem } from '../types';
import { Newspaper, Bell, Heart, Share2, Award, Clock } from 'lucide-react';

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>(NEWS);
  const [likes, setLikes] = useState<string[]>([]);

  const handleLike = (id: string) => {
    if (likes.includes(id)) {
      setLikes(prev => prev.filter(item => item !== id));
    } else {
      setLikes(prev => [...prev, id]);
    }
  };

  const shareNews = (title: string) => {
    // Simulated native share or copy callback
    console.log(`Sharing news dispatch: ${title}`);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Editorial Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-amber-500 animate-pulse" />
          <h3 className="text-lg font-bold text-slate-100">آخر أخبار وبطولات كرة القدم</h3>
        </div>
        
        <span className="flex items-center gap-1 text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 px-2 py-0.5 rounded-md font-bold">
          <Bell className="w-3 h-3 text-indigo-400 shrink-0" />
          عاجل وموثوق
        </span>
      </div>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item) => {
          const isLiked = likes.includes(item.id);

          return (
            <div
              key={item.id}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-slate-700 duration-300 shadow-md hover:shadow-lg hover:shadow-slate-950/40"
            >
              {/* Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950 shrink-0 select-none">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Fade overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/0"></div>

                {/* Badge Category */}
                <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {item.category}
                </span>

                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] text-slate-300 font-mono bg-slate-950/70 py-1 px-2.5 rounded-md">
                  <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-100 text-sm sm:text-base leading-snug group-hover:text-amber-400 transition-colors text-right">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed text-right font-medium">
                    {item.summary}
                  </p>
                </div>

                {/* Micro Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-850">
                  <span className="text-[10px] text-slate-500 font-mono">
                    المصدر: شبكة كورة توفيق سبورت
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-red-500/10 border-red-500/20 text-red-400'
                          : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button
                      onClick={() => shareNews(item.title)}
                      className="p-1.5 rounded-lg border bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 cursor-pointer transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
