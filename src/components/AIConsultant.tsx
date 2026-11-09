/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Match } from '../types';
import { Sparkles, Calendar, MessageSquare, Compass, Send, ShieldAlert, Cpu, Award } from 'lucide-react';

interface AIConsultantProps {
  matches: Match[];
  selectedMatchForAI: Match | null;
  setSelectedMatchForAI: (match: Match | null) => void;
}

export default function AIConsultant({
  matches,
  selectedMatchForAI,
  setSelectedMatchForAI
}: AIConsultantProps) {
  const [userQuery, setUserQuery] = useState('');
  const [resultText, setResultText] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Set initial selected match if none was set
  useEffect(() => {
    if (!selectedMatchForAI && matches.length > 0) {
      setSelectedMatchForAI(matches[0]);
    }
  }, [matches, selectedMatchForAI]);

  // Handle tactical request
  const handleRequestAnalysis = async (customPrompt?: string) => {
    if (!selectedMatchForAI) return;

    setLoading(true);
    setApiError(null);
    setResultText('');

    const queryToSend = customPrompt || userQuery || 'توقع نتيجة اللقاء وكيف ستسير المباراة تكتيكياً ودور النجوم المذكورين في التشكيلة.';

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          matchInfo: {
            league: selectedMatchForAI.league,
            home: selectedMatchForAI.teamHome,
            away: selectedMatchForAI.teamAway,
            scoreHome: selectedMatchForAI.scoreHome,
            scoreAway: selectedMatchForAI.scoreAway,
            time: selectedMatchForAI.time,
            status: selectedMatchForAI.status,
            lineups: selectedMatchForAI.lineups,
            events: selectedMatchForAI.events
          },
          userPrompt: queryToSend
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل في الاتصال بمحركات الذكاء الاصطناعي.');
      }

      setResultText(data.analysis);
      setUserQuery('');
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'حدث خطأ غير متوقع أثناء توليد التحليل الكروي.');
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    { title: '⚽ توقع النتيجة بدقة', query: 'توقع تفصيلي ومحدد لنتيجة اللقاء النهائية بالأرقام مع سرد سيناريو الأهداف المحتمل ومن سيسجلها.' },
    { title: '🧠 تحليل خطة وتكتيك اللعب', query: 'قم بتحليل تشكيلة ورسم التكتيك المتوقع للفريقين ونقاط القوة والضعف ومقترحات للمدراء الفنيين تفصيلياً.' },
    { title: '⭐ أبرز أسلحة اللقاء وحسم النجوم', query: 'من هم اللاعبون المفاتيح الأهم في حسم لقاء اليوم تكتيكياً وفردياً في التشكيل الحالي؟ وكيف يمكن إيقافهم؟' }
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Consultant Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/10">
            <Cpu className="w-5 h-5 text-slate-950 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-100">محلل توفيق الذكي (Taoufik AI Pundit)</h3>
            <p className="text-xs text-slate-400 mt-0.5">حلل المباريات، توقع النتائج تكتيكياً، واقرأ التشكيلات مع أدق محركات الذكاء الاصطناعي</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Match Selection & Prompt Shortcuts Column */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* Active Matches card */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              اختر اللقاء المرغوب تحليله
            </h4>
            
            <div className="space-y-2">
              {matches.map((match) => {
                const isSelected = selectedMatchForAI?.id === match.id;
                return (
                  <button
                    key={match.id}
                    onClick={() => setSelectedMatchForAI(match)}
                    className={`w-full text-right p-3 rounded-xl border transition-all text-xs flex justify-between items-center cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col gap-1 items-start">
                      <span className="font-extrabold text-slate-200 text-xs">
                        {match.teamHome} ضد {match.teamAway}
                      </span>
                      <span className="text-[10px] text-slate-500">{match.league}</span>
                    </div>

                    <span className="shrink-0 bg-slate-900 px-2 py-1 rounded text-[10px]">
                      {match.status === 'live' ? '🔴 مباشر' : '🗓️ مجدولة'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt Shortcuts */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-500" />
              أسئلة تكتيكية جاهزة ومقترحة
            </h4>

            <div className="space-y-2">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRequestAnalysis(q.query)}
                  disabled={loading}
                  className="w-full text-right p-2.5 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-700 hover:bg-slate-900/60 transition-colors text-xs text-slate-300 font-medium cursor-pointer disabled:opacity-50"
                >
                  {q.title}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Analyst Response Panel */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Output Board Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 min-h-[360px] flex flex-col justify-between relative overflow-hidden">
            
            <div className="space-y-4 flex-1">
              
              {/* Header inside report board */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-bold text-slate-200">لوحة التقرير والتحليل الفني للمدرب</span>
                </div>
                {selectedMatchForAI && (
                  <span className="bg-slate-950 px-3 py-1 text-slate-300 font-mono text-[10px] rounded-lg">
                    {selectedMatchForAI.teamHome} vs {selectedMatchForAI.teamAway}
                  </span>
                )}
              </div>

              {/* Loader overlay */}
              {loading && (
                <div className="py-16 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-amber-500 animate-spin"></div>
                  <span className="text-xs text-slate-400 animate-pulse">جاري صياغة التقرير الكروي الفني وحياكة الأرقام تكتيكياً...</span>
                </div>
              )}

              {/* Error Box (Missing key or fallback visual data) */}
              {apiError && (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 space-y-3">
                  <div className="flex gap-2.5 text-amber-500 items-start">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <div className="space-y-1">
                      <h5 className="font-extrabold text-xs">تحتاج إلى تكوين مفتاح Gemini API للمباشرة الفورية</h5>
                      <p className="text-[11px] text-slate-400 leading-relaxed text-right">
                        تم رصد أن مفتاح <code className="text-white bg-slate-950 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY</code> لم يتم تعيينه بعد في إعدادات التطبيق. يرجى التوجه لعلامة <strong>Secrets</strong> في لوحة <strong>Settings</strong> وإضافة مفتاحك للتمتع بتحكم كامل بالذكاء الاصطناعي على السيرفر الخفي.
                      </p>
                    </div>
                  </div>
                  
                  {/* Local Mock analysis presentation to show how it functions */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">معاينة تفاعلية مسجلة للمباراة المحددة:</span>
                    <p className="text-xs text-slate-300 leading-relaxed pr-2 border-r-2 border-indigo-500 bg-slate-950/40 p-3 rounded-r-none rounded-xl">
                      {selectedMatchForAI?.prediction || 'الكلاسيكو الكروي الساحر. في ريال مدريد، سيقود التكتيك السريع أنشيلوتي بالاعتماد على سرعات غزو فينيسيوس وفالفيردي، بينما يعمل برشلونة على سحب المنافس بتمريرات عرضية من بيدري واستهداف ليفاندوفسكي في المربع الذهبي الحصري.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Success output content representation */}
              {!loading && !apiError && resultText && (
                <div className="text-xs text-slate-200 leading-relaxed pr-2 text-right space-y-4 whitespace-pre-line font-sans p-2 overflow-y-auto max-h-[420px] scrollbar-thin">
                  {resultText}
                </div>
              )}

              {/* No analysis yet state */}
              {!loading && !apiError && !resultText && (
                <div className="py-20 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950/60 flex items-center justify-center text-amber-500 border border-slate-800 shadow">
                    <Sparkles className="w-8 h-8 animate-pulse text-amber-500" />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <h5 className="font-bold text-slate-200 text-sm">أهلاً بك في غرفة التحليل المطور بالذكاء الاصطناعي</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      اختر اللقاء المطلوب على يمينك، ثم أدخل سؤالك المفضل أو اختر من بين الأسئلة السريعة بالأعلى لتوليد التقرير التكتيكي فوراً.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Prompt Input Form Box */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex gap-2 items-center bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
                <input
                  type="text"
                  placeholder="اسأل المحلل الذكي: مثلاً (كيف سيسجل مبابي اليوم؟)..."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  disabled={loading}
                  className="flex-grow bg-transparent text-slate-300 placeholder-slate-500 py-2 px-3 focus:outline-none text-xs text-right font-sans disabled:opacity-50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRequestAnalysis();
                  }}
                />
                <button
                  onClick={() => handleRequestAnalysis()}
                  disabled={loading || !selectedMatchForAI}
                  className="bg-amber-500 text-slate-950 p-2.5 rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-40 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 transform -rotate-90 translate-x-0.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
