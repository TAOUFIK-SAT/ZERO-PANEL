import React, { useState } from 'react';
import { 
  Key, 
  Palette, 
  Tv, 
  Layers, 
  Wrench, 
  Sliders, 
  HardDrive, 
  Image as ImageIcon, 
  Cpu, 
  Sparkles, 
  FolderGit2, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  Flame, 
  Tag, 
  ChevronLeft,
  Filter,
  Grid
} from 'lucide-react';
import { ENIGMA_PLUGINS } from '../enigmaPluginsData';

export interface CategoryCardData {
  id: string;
  name: string;
  english: string;
  description: string;
  badge: string;
  icon: any;
  accentColor: 'amber' | 'purple' | 'cyan' | 'emerald' | 'blue' | 'teal' | 'orange' | 'rose' | 'yellow' | 'indigo' | 'sky' | 'pink';
  samplePlugins: string[];
  isPopular?: boolean;
}

export const CATEGORY_CARDS_DATA: CategoryCardData[] = [
  {
    id: 'softcams',
    name: 'المحاكيات والشفرات',
    english: 'Softcams & Emulators',
    description: 'محاكيات تشغيل السيرفرات والاشتراكات (OScam, NCam, CCcam, SupCam) وكسر تشفير الباقات وشفرات PowerVU و Biss.',
    badge: 'محاكيات التشفير',
    icon: Key,
    accentColor: 'amber',
    samplePlugins: ['OScam-Emu + ICam', 'NCam Pro', 'SupCam', 'PowerVU KeyFinder'],
    isPopular: true
  },
  {
    id: 'skins',
    name: 'السكينات وثيمات العرض',
    english: 'FHD & 4K Skins',
    description: 'أحدث سكينات الإنيجما 2 فائقة الوضوح لشاشات التلفزيون و OLED مع بوسترات الأفلام ومعلومات الإنفوبار المتطورة.',
    badge: 'مظهر وواجهات',
    icon: Palette,
    accentColor: 'purple',
    samplePlugins: ['Novaler Dream FHD', 'Nitro FHD', 'Desert FHD', 'Black-Harmony'],
    isPopular: true
  },
  {
    id: 'iptv',
    name: 'الميديا والبث المباشر',
    english: 'IPTV & Stalker Portals',
    description: 'مشغلات الميديا، بوابات Stalker / MAG، قارئ ملفات M3U ومولدات البوكيهات التلقائية لتشغيل القنوات عبر الإنترنت.',
    badge: 'بث وقنوات',
    icon: Tv,
    accentColor: 'cyan',
    samplePlugins: ['MultiStalkerPro', 'BouquetMakerXtream', 'XStreamity', 'EStalker'],
    isPopular: true
  },
  {
    id: 'panels',
    name: 'لوحات التحكم والبانلات',
    english: 'Control Panels & Stores',
    description: 'بانلات شاملة تجمع آلاف السكربتات والملفات وإدارة النظام وسيرفرات التحديث المباشر بنقرة واحدة.',
    badge: 'لوحات شاملة',
    icon: Layers,
    accentColor: 'emerald',
    samplePlugins: ['AjPanel Pro', 'EliesatPanel', 'Ciefp-Panel', 'LinuxSat Panel'],
    isPopular: true
  },
  {
    id: 'plugins',
    name: 'البلجنات العامة والمساعدات',
    english: 'General Plugins & Tools',
    description: 'إضافات جلب الترجمة الفورية للأفلام، الدليل الإلكتروني EPG، القرآن الكريم، مواقيت الصلاة، وجداول المباريات.',
    badge: 'أدوات خدمية',
    icon: Wrench,
    accentColor: 'blue',
    samplePlugins: ['SubSupport', 'EPG Grabber', 'Quran Kareem', 'FootOnSat'],
    isPopular: true
  },
  {
    id: 'channels',
    name: 'ملفات ومفضلات القنوات',
    english: 'Channels & Satellites',
    description: 'ملفات قنوات الأقمار المتحركة والثابتة لمفضلات نايل سات، هوتبيرد، أسترا، وبدر مرتبة بعناية فائقة مع الترددات الحديثة.',
    badge: 'ترتيب الأقمار',
    icon: Sliders,
    accentColor: 'teal',
    samplePlugins: ['Elsafty Settings', 'Ciefp Motor', 'Vhannibal Auto', 'Nilesat Sport'],
    isPopular: true
  },
  {
    id: 'multiboot',
    name: 'أنظمة الإقلاع المتعدد',
    english: 'Multiboot Systems',
    description: 'برامج تثبيت صور متعددة على الفلاشة الخارجية USB وهارد الرسيفر والتنقل بين صور OpenATV و OpenPLi و Egami.',
    badge: 'تعدد الصور',
    icon: HardDrive,
    accentColor: 'orange',
    samplePlugins: ['Neoboot 9.65', 'EgamiBoot 10.6', 'OpenMultiboot', 'FlashOnline']
  },
  {
    id: 'picons',
    name: 'شعارات القنوات (البيكونات)',
    english: 'Picons All Sats',
    description: 'شعارات القنوات الفضائية عالية الدقة (Transparent 220x132) لكافة الأقمار العربية والأوروبية لتزيين شاشة الإنفوبار.',
    badge: 'شعارات الإنفوبار',
    icon: ImageIcon,
    accentColor: 'rose',
    samplePlugins: ['Picons Transparent 3D', 'Nitro Picons', 'Elsafty Picons', 'Nilesat Logo']
  },
  {
    id: 'tools',
    name: 'أدوات النظام وصيانة بايتون',
    english: 'Python & System Fixes',
    description: 'حزم إصلاح مكتبات بايثون 3.12 المفقودة، تفريغ الذاكرة، صيانة مسارات /tmp، وأدوات الشبكة والـ Telnet.',
    badge: 'صيانة النظام',
    icon: Cpu,
    accentColor: 'yellow',
    samplePlugins: ['Python3-Crypto Fix', 'System Doctor', 'Feed Fixer', 'Memory Cleaner']
  },
  {
    id: 'bootlogos',
    name: 'شاشات الإقلاع والافتتاح',
    english: 'Bootlogos & Splash',
    description: 'خلفيات وشاشات إقلاع احترافية بجودة FHD / 4K لماركات Vu+ و Dreambox و Octagon مع تصميمات إسلامية ورياضية.',
    badge: 'شاشات الترحيب',
    icon: Sparkles,
    accentColor: 'indigo',
    samplePlugins: ['Vu+ 4K Bootlogo', 'Dreambox Splash', 'Ramadan Bootlogo', 'OpenATV Custom']
  },
  {
    id: 'images',
    name: 'صور الرسيفر الخام',
    english: 'Firmware & Flash Images',
    description: 'روابط ومصادر تحميل أحدث صور الإنقاذ والفلاش الخام المعتمدة من فرق التطوير العالمية للأجهزة الحديثة.',
    badge: 'صور الفلاش',
    icon: FolderGit2,
    accentColor: 'sky',
    samplePlugins: ['OpenATV 7.4', 'OpenPLi 9.0', 'Egami 10.5', 'BlackHole 3.1']
  },
  {
    id: 'localtools',
    name: 'أدوات التثبيت اليدوي ومسار /tmp',
    english: 'Offline /tmp Installer',
    description: 'تثبيت الحزم اليدوية والملفات المرفوعة إلى مجلد /tmp دون الحاجة للاتصال بالإنترنت مع معالجة التبعات.',
    badge: 'تثبيت يدوي',
    icon: Wrench,
    accentColor: 'pink',
    samplePlugins: ['Install /tmp All IPK', 'Tar.gz Extractor', 'Force Overwrite Tool', 'Deb to IPK']
  }
];

interface CategoryCardsGridProps {
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  totalPluginsCount: number;
}

export default function CategoryCardsGrid({
  activeCategory,
  onSelectCategory,
  totalPluginsCount
}: CategoryCardsGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'popular'>('all');

  // Filter cards
  const filteredCards = CATEGORY_CARDS_DATA.filter(card => {
    const matchesSearch = 
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.samplePlugins.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = selectedFilter === 'all' || (selectedFilter === 'popular' && card.isPopular);

    return matchesSearch && matchesFilter;
  });

  const getColorStyles = (color: CategoryCardData['accentColor']) => {
    switch (color) {
      case 'amber':
        return {
          border: 'hover:border-amber-400/60',
          activeBorder: 'border-amber-400 shadow-amber-500/10',
          badge: 'bg-amber-950/60 text-amber-300 border-amber-600/40',
          iconBox: 'bg-amber-950/40 text-amber-400 border-amber-800/40',
          pill: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
          button: 'bg-amber-400 hover:bg-amber-300 text-black',
          glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]'
        };
      case 'purple':
        return {
          border: 'hover:border-purple-400/60',
          activeBorder: 'border-purple-400 shadow-purple-500/10',
          badge: 'bg-purple-950/60 text-purple-300 border-purple-600/40',
          iconBox: 'bg-purple-950/40 text-purple-400 border-purple-800/40',
          pill: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
          button: 'bg-purple-400 hover:bg-purple-300 text-black',
          glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]'
        };
      case 'cyan':
        return {
          border: 'hover:border-cyan-400/60',
          activeBorder: 'border-cyan-400 shadow-cyan-500/10',
          badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-600/40',
          iconBox: 'bg-cyan-950/40 text-[#00e5ff] border-cyan-800/40',
          pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
          button: 'bg-[#00e5ff] hover:bg-cyan-300 text-black',
          glow: 'group-hover:shadow-[0_0_20px_rgba(0,229,255,0.25)]'
        };
      case 'emerald':
        return {
          border: 'hover:border-emerald-400/60',
          activeBorder: 'border-emerald-400 shadow-emerald-500/10',
          badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-600/40',
          iconBox: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40',
          pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          button: 'bg-emerald-400 hover:bg-emerald-300 text-black',
          glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]'
        };
      case 'blue':
        return {
          border: 'hover:border-blue-400/60',
          activeBorder: 'border-blue-400 shadow-blue-500/10',
          badge: 'bg-blue-950/60 text-blue-300 border-blue-600/40',
          iconBox: 'bg-blue-950/40 text-blue-400 border-blue-800/40',
          pill: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
          button: 'bg-blue-400 hover:bg-blue-300 text-black',
          glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]'
        };
      case 'teal':
        return {
          border: 'hover:border-teal-400/60',
          activeBorder: 'border-teal-400 shadow-teal-500/10',
          badge: 'bg-teal-950/60 text-teal-300 border-teal-600/40',
          iconBox: 'bg-teal-950/40 text-teal-400 border-teal-800/40',
          pill: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
          button: 'bg-teal-400 hover:bg-teal-300 text-black',
          glow: 'group-hover:shadow-[0_0_20px_rgba(20,184,166,0.2)]'
        };
      case 'orange':
        return {
          border: 'hover:border-orange-400/60',
          activeBorder: 'border-orange-400 shadow-orange-500/10',
          badge: 'bg-orange-950/60 text-orange-300 border-orange-600/40',
          iconBox: 'bg-orange-950/40 text-orange-400 border-orange-800/40',
          pill: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
          button: 'bg-orange-400 hover:bg-orange-300 text-black',
          glow: 'group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]'
        };
      case 'rose':
        return {
          border: 'hover:border-rose-400/60',
          activeBorder: 'border-rose-400 shadow-rose-500/10',
          badge: 'bg-rose-950/60 text-rose-300 border-rose-600/40',
          iconBox: 'bg-rose-950/40 text-rose-400 border-rose-800/40',
          pill: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
          button: 'bg-rose-400 hover:bg-rose-300 text-black',
          glow: 'group-hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]'
        };
      default:
        return {
          border: 'hover:border-cyan-400/60',
          activeBorder: 'border-cyan-400 shadow-cyan-500/10',
          badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-600/40',
          iconBox: 'bg-cyan-950/40 text-cyan-400 border-cyan-800/40',
          pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
          button: 'bg-[#00e5ff] hover:bg-cyan-300 text-black',
          glow: 'group-hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]'
        };
    }
  };

  return (
    <div className="space-y-5 select-none" dir="rtl">
      
      {/* Top Banner / Navigation for Category Cards */}
      <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
              <Grid className="w-4 h-4 text-cyan-400" />
              <span>دليل وتصنيفات متجر توفيق التفاعلية لأجهزة الإنيجما 2</span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-white">
              تصفح إضافات الرسيفر حسب <span className="text-[#00e5ff] drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]">التصنيف</span>
            </h2>
            <p className="text-xs text-gray-400 max-w-3xl leading-relaxed">
              اختر أي تصنيف للدخول المباشر إلى إضافاته، من المحاكيات والشفرات وسيرفرات الـ IPTV، إلى السكينات فائقة الدقة وملفات القنوات الحديثة.
            </p>
          </div>

          {/* Quick Count & View All Button */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-4 py-2 rounded-xl font-extrabold flex items-center gap-2 transition cursor-pointer shadow-md ${
                activeCategory === 'all'
                  ? 'bg-[#00e5ff] text-black shadow-cyan-500/20'
                  : 'bg-[#182133] hover:bg-[#202c45] text-gray-200 border border-gray-700/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>عرض كافة الإضافات ({totalPluginsCount})</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-3 border-t border-gray-800/80">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-cyan-500 text-black'
                  : 'bg-[#0b0f19] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              كافة التصنيفات ({CATEGORY_CARDS_DATA.length})
            </button>
            <button
              onClick={() => setSelectedFilter('popular')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === 'popular'
                  ? 'bg-amber-400 text-black'
                  : 'bg-[#0b0f19] text-amber-300 hover:text-white border border-gray-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>التصنيفات الأكثر طلباً</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن تصنيف أو بلوغين..."
              className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 font-sans"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid of Interactive Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCards.map((card) => {
          const IconComp = card.icon;
          const styles = getColorStyles(card.accentColor);
          const pkgCount = ENIGMA_PLUGINS.filter(p => p.category === card.id).length;
          const isActive = activeCategory === card.id;

          return (
            <div
              key={card.id}
              onClick={() => onSelectCategory(card.id)}
              className={`group bg-[#131929] border rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-lg hover:-translate-y-1 ${
                isActive 
                  ? `${styles.activeBorder} ring-2 ring-cyan-400/40` 
                  : `border-[#1f283e] ${styles.border}`
              } ${styles.glow}`}
            >
              {/* Top Row: Icon + Badge */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${styles.iconBox}`}>
                    <IconComp className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-bold ${styles.badge}`}>
                      {card.badge}
                    </span>
                    {card.isPopular && (
                      <span className="text-[9px] text-amber-400 flex items-center gap-0.5 font-bold">
                        <Flame className="w-3 h-3 fill-amber-400" />
                        <span>شائع</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & English Subtitle */}
                <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors duration-200">
                  {card.name}
                </h3>
                <div className="text-[11px] text-gray-400 font-mono tracking-wide mt-0.5">
                  {card.english}
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 mt-2.5 line-clamp-3 leading-relaxed">
                  {card.description}
                </p>

                {/* Top Sample Plugin Chips */}
                <div className="mt-3 pt-3 border-t border-gray-800/80">
                  <div className="text-[10px] text-gray-500 mb-1.5 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>أبرز الإضافات المتاحة:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {card.samplePlugins.map((sample, idx) => (
                      <span 
                        key={idx}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border transition ${styles.pill}`}
                      >
                        {sample}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Footer Action */}
              <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-gray-400 font-bold flex items-center gap-1">
                  <b className="text-white text-sm">{pkgCount}</b>
                  <span>إضافة</span>
                </span>

                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition text-[11px] shadow-sm ${styles.button}`}
                >
                  <span>استعراض القسم</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCards.length === 0 && (
        <div className="bg-[#131929] border border-[#1f283e] rounded-2xl p-12 text-center text-gray-400 space-y-2">
          <p className="text-sm">لا توجد تصنيفات تطابق بحثك: &quot;{searchTerm}&quot;</p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-cyan-400 text-xs font-bold underline cursor-pointer"
          >
            مسح كلمة البحث
          </button>
        </div>
      )}

    </div>
  );
}
