import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Download, 
  Monitor, 
  Chrome, 
  HelpCircle, 
  CheckCircle2, 
  Share2, 
  ArrowUp, 
  Sparkles, 
  ShieldCheck, 
  AppWindow,
  Info
} from 'lucide-react';

export default function AppInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const [installStatus, setInstallStatus] = useState<'idle' | 'prompted' | 'success' | 'failed'>('idle');

  // Detect iframe environment
  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
    }
  }, []);

  // Track the native beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Track if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleNativeInstall = async () => {
    if (isInIframe) {
      alert('⚠️ المتصفح يمنع التثبيت التلقائي داخل المعاينة المدمجة. يرجى الضغط على أيقونة "الفتح في نافذة مستقلة" أو "Open in new tab" في الزاوية العلوية اليمنى من المنصة لفتح رابط التطبيق المباشر ومن ثم تثبيته كـ تطبيق هاتف بكل سهولة!');
      return;
    }

    if (!deferredPrompt) {
      alert('نظام التثبيت التلقائي يعتمد على توافق المتصفح (مثل Google Chrome أو Edge أو Samsung Internet) واستيفاء شروط PWA. يمكنك تثبيته يدوياً وبسرعة الآن باتباع الإرشادات المفصلة بالأسفل على جميع الأنظمة!');
      return;
    }

    try {
      setInstallStatus('prompted');
      deferredPrompt.prompt();
      
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setInstallStatus('success');
      } else {
        setInstallStatus('failed');
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.warn('Install prompt error:', err);
      setInstallStatus('failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-right" dir="rtl">
      
      {/* Dynamic Iframe Notice warning */}
      {isInIframe && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-right space-y-3 shadow-lg">
          <div className="flex items-center gap-2.5 text-amber-500 font-bold text-sm">
            <Info className="w-5 h-5 animate-pulse shrink-0" />
            <span>⚠️ تنبيه: ميزة التثبيت التلقائي مقيدة داخل نافذة المعاينة المدمجة</span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            تقوم متصفحات الويب (مثل Chrome و Safari) بحظر إطلاق نافذة التثبيت التلقائي (PWA Install Prompt) عندما يتم تصفح الموقع من داخل إطار محمي (Iframe). لكي تتمكن من تنزيل التطبيق على هاتفك أو حاسوبك يرجى فتح الرابط المباشر للموقع في علامة تبويب مستقلة تماماً.
          </p>
          <div className="pt-1">
            <a 
              href={window.location.href} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all active:scale-95 shadow-md shadow-amber-500/10"
            >
              <AppWindow className="w-4 h-4" />
              <span>افتح التطبيق في نافذة مستقلة لتنشيط التثبيت 🌐</span>
            </a>
          </div>
        </div>
      )}

      {/* Premium Banner Hero */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs text-amber-500 font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>تطبيق الويب التقدمي المعتمد PWA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              احمل <span className="text-amber-500">TAOUFIK TV</span> معك في جيبك أينما ذهبت!
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              قم بتحميل وتثبيت التطبيق على شاشة هاتفك مباشرة دون الحاجة لمتجر متعب. استمتع ببث فائق الدقة، وتلقي إشعارات الأهداف والمباريات بصفة فورية ومساحة تخزين خفيفة للغاية!
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 shrink-0 bg-slate-950/40 p-5 rounded-2xl border border-slate-850 w-full sm:w-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/15">
              <Smartphone className="w-9 h-9 text-slate-950" />
            </div>
            
            {isInstalled ? (
              <div className="text-center space-y-1">
                <span className="text-emerald-400 font-black text-xs flex items-center gap-1.5 justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>مُنصّب بنجاح كـ تطبيق هاتف!</span>
                </span>
                <p className="text-[10px] text-slate-500">أنت تتابع الآن التطبيق الرسمي لـ TAOUFIK TV</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleNativeInstall}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition-all hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تثبيت تلقائي سريع</span>
              </button>
            )}
            <p className="text-[10px] text-slate-500">خالٍ من الإعلانات • خفيف الحجم • يدعم التشغيل الفوري</p>
          </div>
        </div>
      </div>

      {/* Guide Cards by Platform */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* IOS / Android Guides Column 1 */}
        <div className="bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="bg-amber-500/10 text-amber-500 p-2 rounded-xl">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">تنزيل لهواتف الآيفون (iOS)</h3>
              <p className="text-[10px] text-slate-500">متصفح Safari الأصلي</p>
            </div>
          </div>

          <ol className="space-y-3.5 text-xs text-slate-300 pr-1 list-decimal list-inside">
            <li className="leading-relaxed">
              أولاً، افتح هذا الموقع من متصفح <strong className="text-amber-500">Safari</strong> على الآيفون.
            </li>
            <li className="leading-relaxed">
              اضغط على زر <strong className="text-amber-500">مشاركة (Share)</strong> الموجود أسفل المتصفح <Share2 className="w-3.5 h-3.5 inline text-slate-400" />.
            </li>
            <li className="leading-relaxed">
              قم بالتمرير لأسفل واضغط على خيار <strong className="text-amber-500">إضافة إلى الشاشة الرئيسية (Add to Home)</strong> <ArrowUp className="w-3.5 h-3.5 inline text-slate-400" />.
            </li>
            <li className="leading-relaxed">
              اضغط على <strong className="text-amber-500">إضافة (Add)</strong> في الزاوية العلوية لتجده مع تطبيقاتك فوراً!
            </li>
          </ol>
        </div>

        {/* Android Guides Column 2 */}
        <div className="bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="bg-amber-500/10 text-amber-500 p-2 rounded-xl">
              <Chrome className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">تنزيل لهواتف الأندرويد</h3>
              <p className="text-[10px] text-slate-500">Google Chrome / Samsung</p>
            </div>
          </div>

          <ol className="space-y-3.5 text-xs text-slate-300 pr-1 list-decimal list-inside">
            <li className="leading-relaxed">
              بعد فتح الموقع من متصفح <strong className="text-amber-500">Chrome</strong>، ستظهر لك لافتة بالأسفل.
            </li>
            <li className="leading-relaxed">
              أو اضغط على <strong className="text-amber-500">النقاط الثلاث (Menu)</strong> في الزاوية العلوية للمتصفح.
            </li>
            <li className="leading-relaxed">
              اختر خيار <strong className="text-amber-500">تثبيت التطبيق (Install App)</strong> من القائمة.
            </li>
            <li className="leading-relaxed">
              وافق على التثبيت وسيظهر أيقونة التطبيق على شاشتك بأداء مثالي وسريع.
            </li>
          </ol>
        </div>

        {/* PC Guide Column 3 */}
        <div className="bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="bg-amber-500/10 text-amber-500 p-2 rounded-xl">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">تنزيل للحواسيب (PC)</h3>
              <p className="text-[10px] text-slate-500">Windows / macOS / Linux</p>
            </div>
          </div>

          <ol className="space-y-3.5 text-xs text-slate-300 pr-1 list-decimal list-inside">
            <li className="leading-relaxed">
              من شريط العناوين العلوي لمتصفح كروم أو ايدج، ستلاحظ أيقونة <strong className="text-amber-500">شاشة مع سهم لأسفل</strong>.
            </li>
            <li className="leading-relaxed">
              انقر فوقها واضغط على زر <strong className="text-amber-500">تثبيت</strong> لفتح نافذة مستقلة ومكبرة.
            </li>
            <li className="leading-relaxed">
              ستحصل على اختصار لـ <strong className="text-amber-500">TAOUFIK TV</strong> على سطح المكتب لفتحه بضغطة واحدة وبسرعة فائقة.
            </li>
          </ol>
        </div>

      </div>

      {/* Safety and parameters widget */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-xs">تنزيل آمن بنسبة 100%</h4>
            <p className="text-[10px] text-slate-400 leading-tight">التطبيق لا يحتاج إلى صلاحيات خطيرة أو مساحة تخزين تزيد عن 2 ميجابايت.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
            <AppWindow className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-xs">تحديث فوري وتلقائي</h4>
            <p className="text-[10px] text-slate-400 leading-tight">القنوات والملفات المستوردة والجدول يتم تحديثها فورياً وتلقائياً دون الحاجة لإعادة التثبيت.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
