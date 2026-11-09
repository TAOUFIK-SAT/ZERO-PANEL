/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Channel, Match, NewsItem } from './types';

export const CHANNELS: Channel[] = [
  {
    id: 'alhurra-iraq',
    name: 'الحرة عراق HD',
    category: 'iraq',
    logo: 'bg-cyan-600',
    streamUrl: 'https://mbnvvideoingest-i.akamaihd.net/hls/live/1004674/MBNV_ALHURRA_IRAQ/playlist.m3u8',
    isSimulated: false,
    viewers: 28500,
    description: 'قناة الحرة عراق الإخبارية، تركز على الشأن العراقي والإقليمي وبث التقارير الحيوية المباشرة.'
  },
  {
    id: 'alhurra-main',
    name: 'قناة الحرة العامة',
    category: 'iraq',
    logo: 'bg-blue-600',
    streamUrl: 'https://mbnvvideoingest-i.akamaihd.net/hls/live/1004673/MBNV_ALHURRA_MAIN/playlist.m3u8',
    isSimulated: false,
    viewers: 21200,
    description: 'البث الحي لقناة الحرة الإخبارية لعرض الأخبار العالمية والعربية والبرامج الثقافية والسياسية.'
  },
  {
    id: 'al-iraqiya',
    name: 'العراقية الإخبارية HD',
    category: 'iraq',
    logo: 'bg-slate-700',
    streamUrl: 'https://cdn.catiacast.video/abr/8d2ffb0aba244e8d9101a9488a7daa05/playlist.m3u8',
    isSimulated: false,
    viewers: 45800,
    description: 'قناة البث الرسمي لشبكة الإعلام العراقي، تغطية حية للأخبار والبرامج الرسمية والوطنية.'
  },
  {
    id: 'al-rafidain',
    name: 'قناة الرافدين الفضائية',
    category: 'iraq',
    logo: 'bg-sky-800',
    streamUrl: 'https://cdg8.edge.technocdn.com/arrafidaintv/abr_live/playlist.m3u8',
    isSimulated: false,
    viewers: 14700,
    description: 'البث المباشر لقناة الرافدين الإخبارية، برامج سياسية واجتماعية وثقافية متنوعة.'
  },
  {
    id: 'al-rasheed',
    name: 'قناة الرشيد الفضائية',
    category: 'iraq',
    logo: 'bg-indigo-800',
    streamUrl: 'https://media1.livaat.com/AL-RASHEED-HD/tracks-v1a1/playlist.m3u8',
    isSimulated: false,
    viewers: 31900,
    description: 'قناة عراقية عامة تعرض الدراما والبرامج السياسية والترفيهية والمنوعة على مدار الساعة.'
  },
  {
    id: 'alsharqiya-news',
    name: 'الشرقية نيوز HD',
    category: 'iraq',
    logo: 'bg-slate-800',
    streamUrl: 'https://5d94523502c2d.streamlock.net/alsharqiyalive/mystream/playlist.m3u8',
    isSimulated: false,
    viewers: 58200,
    description: 'البث الرسمي الإخباري لقناة الشرقية، لمتابعة وتحليل الأحداث والتقارير بمصداقية وعمق.'
  },
  {
    id: 'alsharqiya-main',
    name: 'قناة الشرقية العامة',
    category: 'iraq',
    logo: 'bg-amber-700',
    streamUrl: 'https://5d94523502c2d.streamlock.net/home/mystream/playlist.m3u8',
    isSimulated: false,
    viewers: 72400,
    description: 'أول قناة عراقية فضائية مستقلة، تعرض المسلسلات الكوميدية والبرامج الإنسانية والدراما الرمضانية.'
  },
  {
    id: 'dijlah-tarab',
    name: 'دجلة طرب الفضائية',
    category: 'iraq',
    logo: 'bg-fuchsia-750',
    streamUrl: 'https://ghaasiflu.online/tarab/tracks-v1a1/playlist.m3u8',
    isSimulated: false,
    viewers: 22600,
    description: 'بث حي لأجمل الأغاني والمقامات التراثية والطربية العراقية مع قناة دجلة طرب.'
  },
  {
    id: 'dijlah-tv',
    name: 'قناة دجلة الفضائية',
    category: 'iraq',
    logo: 'bg-orange-600',
    streamUrl: 'https://ghaasiflu.online/Dijlah/tracks-v1a1/playlist.m3u8',
    isSimulated: false,
    viewers: 49100,
    description: 'قناة دجلة العامة، تغطية شاملة للأخبار المحلية، البرامج الترفيهية الحوارية والدراما الراقية.'
  },
  {
    id: 'inews-tv',
    name: 'قناة آي نيوز الفضائية',
    category: 'iraq',
    logo: 'bg-neutral-800',
    streamUrl: 'https://svs.itworkscdn.net/inewsiqlive/inewsiq.smil/playlist.m3u8',
    isSimulated: false,
    viewers: 19800,
    description: 'البث المباشر لقناة iNEWS العراقية الإخبارية، تغطية فورية ونشرات إقليمية شاملة.'
  },
  {
    id: 'iraq-future',
    name: 'قناة مستقبل العراق',
    category: 'iraq',
    logo: 'bg-teal-700',
    streamUrl: 'https://streaming.viewmedia.tv/viewsatstream40/viewsatstream40.smil/playlist.m3u8',
    isSimulated: false,
    viewers: 12500,
    description: 'قناة مستقبل العراق الفضائية العامة للبث الثقافي والاجتماعي المنوع.'
  },
  {
    id: 'turkmeneli-tv',
    name: 'تلفزيون تركمان إيلي',
    category: 'iraq',
    logo: 'bg-sky-600',
    streamUrl: 'https://137840.global.ssl.fastly.net/edge/live_6b7c6e205afb11ebb010f5a331abaf98/playlist.m3u8',
    isSimulated: false,
    viewers: 16400,
    description: 'البث الحي لتلفزيون تركمان إيلي، برامج منوعة باللغتين العربية والتركمانية.'
  },
  {
    id: 'zagros-tv',
    name: 'قناة زاكروس العربية',
    category: 'iraq',
    logo: 'bg-emerald-700',
    streamUrl: 'https://5a3ed7a72ed4b.streamlock.net/zagrostv/SMIL:myStream.smil/playlist.m3u8',
    isSimulated: false,
    viewers: 27900,
    description: 'البث المباشر لقناة زاكروس الفضائية، تقديم التقارير والبرامج الثقافية والسياسية والمنوعة.'
  },
  {
    id: 'bein-1',
    name: 'beIN Sports HD 1',
    category: 'sports',
    logo: 'bg-indigo-600',
    streamUrl: '',
    isSimulated: true,
    viewers: 145200,
    description: 'القناة الناقلة الكبرى للدوريات الأوروبية ودوري الأبطال.'
  },
  {
    id: 'bein-2',
    name: 'beIN Sports HD 2',
    category: 'sports',
    logo: 'bg-indigo-700',
    streamUrl: '',
    isSimulated: true,
    viewers: 98300,
    description: 'تحليل مباشر وأبرز مواجهات الدوري الإنجليزي الممتاز.'
  },
  {
    id: 'bein-3',
    name: 'beIN Sports HD 3',
    category: 'sports',
    logo: 'bg-purple-600',
    streamUrl: '',
    isSimulated: true,
    viewers: 72100,
    description: 'المباريات الكبرى ومباريات المنتخبات العربية والبطولات الأفريقية.'
  },
  {
    id: 'ssc-1',
    name: 'SSC Sport 1 HD',
    category: 'sports',
    logo: 'bg-emerald-600',
    streamUrl: '',
    isSimulated: true,
    viewers: 123500,
    description: 'القناة السعودية الرسمية للناقل الحصري لدوري روشن والمنافسات الآسيوية.'
  },
  {
    id: 'alkass-1',
    name: 'قناة الكأس الأولى HD',
    category: 'sports',
    logo: 'bg-red-800',
    streamUrl: '',
    isSimulated: true,
    viewers: 54100,
    description: 'القناة الرياضية القطرية لتغطية البطولات العربية والآسيوية والدوريات الإقليمية.'
  },
  {
    id: 'abudhabi-1',
    name: 'أبوظبي الرياضية 1',
    category: 'sports',
    logo: 'bg-cyan-700',
    streamUrl: '',
    isSimulated: true,
    viewers: 38200,
    description: 'تغطية حيّة وبث مباشر لكبريات الفعاليات والسباقات والملاكمة العالمية والمحلية.'
  },
  {
    id: 'aljazeera-arabic',
    name: 'الجزيرة الإخبارية (مباشر)',
    category: 'news',
    logo: 'bg-amber-600',
    streamUrl: 'https://live-fta-jazeera.akamaized.net/v1/master/3722c673daaa2dbeeec168696bfbe280002ab11b/live-aljazeera-arabic/master.m3u8',
    isSimulated: false,
    viewers: 215400,
    description: 'بث حي ومباشر لقناة الجزيرة الإخبارية على مدار الساعة لتغطية أهم الأحداث حول العالم.'
  },
  {
    id: 'france24-arabic',
    name: 'فرانس 24 (مباشر)',
    category: 'news',
    logo: 'bg-blue-800',
    streamUrl: 'https://static.france24.com/live/F24_AR_GP_LS/live_ar.m3u8',
    isSimulated: false,
    viewers: 65100,
    description: 'الخبر على مدار الساعة بتحليل موضوعي وبرامج حوارية سياسية واقتصادية مميزة.'
  },
  {
    id: 'makkah-live',
    name: 'بث مباشر من الحرم المكي الشريف',
    category: 'islamic',
    logo: 'bg-slate-800',
    streamUrl: 'https://win.holol.com/live/quran/playlist.m3u8',
    isSimulated: false,
    viewers: 320400,
    description: 'بث حي ومباشر على مدار الساعة من المسجد الحرام بمكة المكرمة للصلوات والتلاوة.'
  },
  {
    id: 'madinah-live',
    name: 'بث مباشر من المسجد النبوي',
    category: 'islamic',
    logo: 'bg-emerald-800',
    streamUrl: 'https://win.holol.com/live/sunnah/playlist.m3u8',
    isSimulated: false,
    viewers: 195000,
    description: 'بث حي ومباشر من المسجد النبوي الشريف بالمدينة المنورة لقراءة الحديث الشريف ومحيط المسجد.'
  },
  {
    id: 'mbc-1',
    name: 'MBC 1 HD',
    category: 'entertainment',
    logo: 'bg-rose-600',
    streamUrl: '',
    isSimulated: true,
    viewers: 142000,
    description: 'منصة البرامج الأسرية والمسلسلات العربية والبرامج الاجتماعية الرائدة.'
  },
  {
    id: 'mbc-action',
    name: 'MBC Action HD',
    category: 'entertainment',
    logo: 'bg-yellow-600',
    streamUrl: '',
    isSimulated: true,
    viewers: 87600,
    description: 'أقوى أفلام الحركة والمسلسلات الأجنبية المترجمة ومصارعة المحترفين WWE.'
  },
  {
    id: 'mbc-drama',
    name: 'MBC Drama HD',
    category: 'entertainment',
    logo: 'bg-pink-700',
    streamUrl: '',
    isSimulated: true,
    viewers: 74200,
    description: 'المسلسلات الحصرية الدرامية والمسلسلات الخليجية والتركية المدبلجة.'
  }
];

export const MATCHES: Match[] = [
  {
    id: 'match-1',
    league: 'الدوري الإسباني (LaLiga)',
    teamHome: 'ريال مدريد',
    teamHomeLogo: '🇪🇸',
    teamAway: 'برشلونة',
    teamAwayLogo: '🔵🔴',
    scoreHome: 2,
    scoreAway: 2,
    time: 'الدقيقة 72',
    status: 'live',
    channelId: 'bein-1',
    prediction: 'مباراة كلاسيكو استثنائية. ريال مدريد مسيطر على الهجمات المرتدة بينما يبدع فريق برشلونة بالاستحواذ المتقن في منتصف الملعب وتمريرات بيدري البينية.',
    lineups: {
      home: ['كورتوا (GK)', 'كارفاخال', 'ميليتاو', 'روديغر', 'ميندي', 'فالفيردي', 'تشواميني', 'بيلينغهام', 'رودريغو', 'مبابي', 'فينيسيوس جونيور'],
      away: ['تير شتيغن (GK)', 'كوندي', 'كوبارسي', 'إينيغو مارتينيز', 'بالدي', 'غافي', 'بيدري', 'رافينيا', 'لامين يامال', 'داني أولمو', 'ليفاندوفسكي']
    },
    events: [
      { minute: 14, player: 'روبرت ليفاندوفسكي', team: 'away', type: 'goal' },
      { minute: 31, player: 'كيليان مبابي', team: 'home', type: 'goal' },
      { minute: 45, player: 'جود بيلينغهام', team: 'home', type: 'card_yellow' },
      { minute: 55, player: 'فينيسيوس جونيور', team: 'home', type: 'goal' },
      { minute: 62, player: 'لامين يامال', team: 'away', type: 'goal' },
      { minute: 65, player: 'إينيغو مارتينيز', team: 'away', type: 'card_yellow' }
    ]
  },
  {
    id: 'match-2',
    league: 'الدوري الإنجليزي الممتاز (Premier League)',
    teamHome: 'ماركوس ليفربول',
    teamHomeLogo: '🔴',
    teamAway: 'مانشستر سيتي',
    teamAwayLogo: '🩵',
    scoreHome: 1,
    scoreAway: 0,
    time: 'الدقيقة 41',
    status: 'live',
    channelId: 'bein-2',
    prediction: 'مواجهة تكتيكية رفيعة المستوى بين غوارديولا وسلوت. تقدم ليفربول بفضل تحركات محمد صلاح السريعة وسرعة الانتقال الهجومي، بينما يبحث السيتي عن هالاند خلف الدفاع.',
    lineups: {
      home: ['أليسون (GK)', 'ألكسندر-أرنولد', 'كوناتي', 'فان دايك', 'روبيرتسون', 'ماك أليستر', 'غرافينبيرش', 'سوبوسلاي', 'صلاح', 'نونيز', 'دياز'],
      away: ['إيدرسون (GK)', 'ووكر', 'أكانجي', 'دياز', 'غفارديول', 'رودري', 'كوفاسيتش', 'دي بروين', 'سيلفا', 'فودين', 'هالاند']
    },
    events: [
      { minute: 23, player: 'لويس دياز', team: 'home', type: 'goal' },
      { minute: 35, player: 'أندرو روبيرتسون', team: 'home', type: 'card_yellow' }
    ]
  },
  {
    id: 'match-3',
    league: 'دوري روشن السعودي (Roshn Saudi League)',
    teamHome: 'الهلال',
    teamHomeLogo: '🔵',
    teamAway: 'النصر',
    teamAwayLogo: '🟡🔴',
    scoreHome: 0,
    scoreAway: 0,
    time: 'اليوم 21:00',
    status: 'upcoming',
    channelId: 'ssc-1',
    prediction: 'ديربي الرياض المشتعل. يعتمد الهلال على جماعية الفريق الفائقة وتألق مالكوم وميتروفيتش، بينما يدخل النصر بمعنويات مرتفعة بقيادة الأسطورة كريستيانو رونالدو.',
    lineups: {
      home: ['بونو (GK)', 'سعود', 'كوليبالي', 'البليهي', 'لودي', 'نيفيز', 'ساقيتش', 'مالكوم', 'سافيتش', 'سالم الدوسري', 'ميتروفيتش'],
      away: ['بينتو (GK)', 'الغانم', 'لاجامي', 'لابورت', 'تيلس', 'الخيبري', 'بروزوفيتش', 'أوتافيو', 'ماني', 'تاليسكا', 'كريستيانو رونالدو']
    },
    events: []
  },
  {
    id: 'match-4',
    league: 'كأس خادم الحرمين الشريفين',
    teamHome: 'الاتحاد',
    teamHomeLogo: '🟡⚫',
    teamAway: 'الشباب',
    teamAwayLogo: '⚪⚫',
    scoreHome: 0,
    scoreAway: 0,
    time: 'غداً 18:30',
    status: 'upcoming',
    channelId: 'ssc-1',
    prediction: 'توقع مباراة دفاعية حذرة مع أفضلية نسبية لنادي الاتحاد بمؤازرة جمهوره العريض وفي ظل عودة كريم بنزيما لقيادة الهجوم.',
    lineups: {
      home: ['رايكوفيتش (GK)', 'الشنقيطي', 'الموسى', 'لويز فيليبي', 'كادش', 'فابينيو', 'كانتي', 'ديابي', 'عوّار', 'برغوين', 'بنزيما'],
      away: ['كيم (GK)', 'الصبّياني', 'هودت', 'الشراري', 'الصقور', 'كويلار', 'حسين القحطاني', 'كاراسكو', 'خوانكا', 'بونبيندزا', 'حمد الله']
    },
    events: []
  },
  {
    id: 'match-5',
    league: 'نهائي كأس السوبر الأفريقي',
    teamHome: 'الأهلي المصري',
    teamHomeLogo: '🦅🔴',
    teamAway: 'الزمالك',
    teamAwayLogo: '🏹⚪',
    scoreHome: 2,
    scoreAway: 1,
    time: 'انتهت',
    status: 'finished',
    channelId: 'alkass-1',
    prediction: 'قمة كرة القدم المصرية والأفريقية الكلاسيكية. الأهلي تفوق تكتيكياً بفضل تألق خط وسطه بقيادة إمام عاشور وقدرة وسام أبو علي التهديفية الحاسمة.',
    lineups: {
      home: ['الشناوي (GK)', 'هاني', 'ربيعة', 'عبد المنعم', 'معلول', 'مروان عطية', 'ديانغ', 'إمام عاشور', 'بيرسي تاو', 'الشحات', 'وسام أبو علي'],
      away: ['عواد (GK)', 'المثلوثي', 'حسام عبد المجيد', 'فتوح', 'عمر جابر', 'دونجا', 'شحاتة', 'عبد الله السعيد', 'زيزو', 'مصطفى شلبي', 'سيف الجزيري']
    },
    events: [
      { minute: 18, player: 'إمام عاشور', team: 'home', type: 'goal' },
      { minute: 42, player: 'أحمد سيد زيزو', team: 'away', type: 'goal' },
      { minute: 77, player: 'وسام أبو علي', team: 'home', type: 'goal' },
      { minute: 85, player: 'نبيل عماد دونجا', team: 'away', type: 'card_red' }
    ]
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'تطورات كلاسيكو الليلة: تصريحات غوارديولا وسلوت ما قبل المواجهة النارية',
    summary: 'عبّر يورغن سلوت عن احترامه الكامل لـ مانشستر سيتي، مؤكداً أن الفائز بمباراة الليلة سيخطو خطوة عملاقة نحو اللقب، في المقابل شدد غوارديولا على رغبته في تغيير الاستراتيجية الدفاعية لإيقاف خطورة محمد صلاح وسرعته.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60',
    date: 'منذ ساعتين',
    category: 'الدوري الإنجليزي'
  },
  {
    id: 'news-2',
    title: 'كريستيانو رونالدو يدلي بتصريحات مثيرة قبل مواجهة الهلال في ديربي روشن',
    summary: 'أكد الدون رونالدو لوسائل الإعلام المحلية على مدى جاهزية نادي النصر لإنهاء سلسلة اللاخسارة لنادي الهلال، مشيراً إلى أن الجماهير السعودية ستشهد كرنفالاً تسابقياً رائعاً تليق بكرة القدم السعودية المتقدمة.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=60',
    date: 'منذ 4 ساعات',
    category: 'الدوري السعودي'
  },
  {
    id: 'news-3',
    title: 'مبابي يحرز رقم قياسي في تدريبات نادي ريال مدريد الأخيرة لمباراة الكلاسيكو',
    summary: 'كشفت التقارير البدنية لنادي ريال مدريد عن تسجيل النجم الفرنسي كيليان مبابي سرعة قصوى قياسية جديدة بلغت 36.8 كم/س في التدريبات التكتيكية المغلقة التي أجراها أنشيلوتي تمهيداً لكسر التكتل الدفاعي الكتالوني.',
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800&auto=format&fit=crop&q=60',
    date: 'منذ 5 ساعات',
    category: 'الدوري الإسباني'
  }
];

export const SIMULATED_CHAT_DICTS = [
  "يا كورة مش معقووووول!",
  "فينيسيوس عاااالمي اليوم 🔥🤍🤙",
  "الحكم متحيز جداً ضد برشلونة!!",
  "لامين يامال هو ميسي الجديد بدون شك 💙❤️",
  "صوت البث ممتاز جداً، شكراً توفيق تيفي الأصلي!",
  "أفضل تطبيق لمشاهدة المباريات بجودة خرافية وبدون أي تقطيع 👍",
  "الهلال راح يفوز اليوم 3-1 كالعادة 💙🇸🇦",
  "الدون رونالدو ناوي على هاتريك اليوم في الهلال يا جماعة 💛",
  "أحلى كلاسيكو شفته من سنين! حماااااس منقطع النظير 🔥⚽",
  "التعليق العربي ناررر مع هذا القناص يوزععععععع",
  "يا جماعة البث يقطع عندكم؟ لا عندي شغال طيارة وسلس جداً 😍",
  "مبابي سريع للغاية الدفاع مو قادر يلحقه!",
  "ليفاندوفسكي قناص كالعادة لا يرحم أمام الشباك 👍",
  "تتوقعون من يفوز بالدوري الإنجليزي هالسنة؟ ليفربول ولا السيتي؟",
  "البريميرليغ هو أقوى دوري في كرة العالم بلا منازع 🏴󠁧󠁢󠁥󠁮󠁧󠁿🔥",
  "الحارس بونو جدار برلين الحقيقي، يصعب التسجيل عليه",
  "مبروك للأهلي الفوز التاريخي في السوبر الأفريقي، نادي القرن بلا فخر ❤️🦅",
  "تصفيق حار لمصممي تطبيق توفيق تيفي الجديد! تصميم رائع وألوان مريحة جداً للجسم والعين 😍"
];
