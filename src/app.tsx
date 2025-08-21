import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart, Sparkles, Mail, Phone, MapPin, Instagram, Facebook, Globe, ArrowRight, X, PlayCircle, Star, Camera, Calendar, Users, CheckCircle2 } from "lucide-react";

// ————————————————————————————————————————————————
// AVAVOGUE 互動式品牌形象網站（單檔 React Component）
// - Tailwind CSS + Framer Motion 動畫
// - shadcn/ui 風格卡片（以簡化版樣式實作）
// - 模組化區塊：Hero / 關於 / 服務 / 作品 / 見證 / 流程 / FAQ / 聯絡
// - 互動：濾鏡分類、作品燈箱、FAQ 展開、主題切換、滾動導覽
// - 語系：繁體中文（可延伸 i18n）
// 使用說明：
// 1) 在 Next.js 或 Vite + React 專案中建立此檔，預設匯出 <AvavogueShowcase /> 即可渲染。
// 2) 頁面已使用 Tailwind 類名，確保已設定 Tailwind。
// 3) 圖片目前為佔位，可替換為實際品牌素材。
// ————————————————————————————————————————————————

// 假資料（可替換為 CMS / 後端資料）
const SERVICES = [
  {
    icon: <Heart className="w-6 h-6" />, 
    title: "整體婚禮企劃",
    desc: "從主題發想、動線規劃、流程控管到細節執行，打造獨一無二的儀式感。",
    bullets: ["主題視覺設定", "婚禮 SOP 與腳本", "現場控場與統籌"],
  },
  {
    icon: <Sparkles className="w-6 h-6" />, 
    title: "品牌視覺與物料",
    desc: "客製化婚卡、席位卡、背板、指示系統與小物，一致呈現 AV 美學。",
    bullets: ["婚卡與禮盒設計", "背板與拍照牆", "席位/桌卡/指示系統"],
  },
  {
    icon: <Camera className="w-6 h-6" />, 
    title: "影像與現場氛圍",
    desc: "婚禮攝影錄影、燈光音樂與香氛情境，讓每一刻都被優雅收藏。",
    bullets: ["婚禮攝/錄影", "燈光音樂設計", "香氛/花藝氛圍"],
  },
  {
    icon: <Calendar className="w-6 h-6" />, 
    title: "流程主持與管家",
    desc: "專業主持、分秒控管與親友協調，讓新人輕鬆享受每一段時光。",
    bullets: ["儀式/宴客主持", "分工表與任務編組", "親友動線引導"],
  },
];

const WORKS = [
  {
    id: 1,
    title: "海島玻璃屋證婚",
    tag: "海島",
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522673607201-5ee11bd9f2be?q=80&w=1600&auto=format&fit=crop",
    ],
    palette: ["#f5f5f4", "#e7e5e4", "#1f2937"],
  },
  {
    id: 2,
    title: "松林戶外晚宴",
    tag: "戶外",
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521336522164-3f8f5f8e1b5b?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483653085484-eb63c9f405a2?q=80&w=1600&auto=format&fit=crop",
    ],
    palette: ["#fefce8", "#e7e5e4", "#0f172a"],
  },
  {
    id: 3,
    title: "法式古堡午宴",
    tag: "室內",
    cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1504198070170-4ca53fd8b0b7?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600&auto=format&fit=crop",
    ],
    palette: ["#fafaf9", "#e5e7eb", "#111827"],
  },
  {
    id: 4,
    title: "都會美術館證婚",
    tag: "室內",
    cover: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529638393826-0206a72f08a3?q=80&w=1600&auto=format&fit=crop",
    ],
    palette: ["#f4f4f5", "#e4e4e7", "#09090b"],
  },
];

const TESTIMONIALS = [
  {
    name: "宥辰 & 馨怡",
    text: "AVAVOGUE 幫我們把『松林小夜曲』的想像變成現場的驚喜，儀式與晚宴節奏掌握得剛剛好！",
    rating: 5,
  },
  {
    name: "Bryan & Anne",
    text: "從婚卡、背板到花藝香氛，每個細節都讓賓客感受到我們的故事與風格。",
    rating: 5,
  },
  {
    name: "哲銘 & 思穎",
    text: "主持與流程控場超穩，攝影團隊也很會捕捉眼神與光線，讓我們很放鬆地享受每一刻。",
    rating: 4.5,
  },
];

const FAQS = [
  {
    q: "我需要從哪一步開始？",
    a: "建議從『初談諮詢』開始，了解你們的故事、預算、喜好與檔期，接著我們會提出主題提案與時程。",
  },
  {
    q: "有提供局部服務嗎？",
    a: "有的！若已有部分廠商合作，也可只委託視覺物料、主持或現場統籌等單一模組。",
  },
  {
    q: "預算如何估算？",
    a: "依照場地型態與規模，常見專案區間約 NT$200K–800K；我們將在初談後提供透明報價單。",
  },
];

const PROCESS = [
  { step: 1, title: "初談諮詢", desc: "理解你們的故事、風格與預算，確認檔期。" },
  { step: 2, title: "主題提案", desc: "Moodboard / 色盤 / 物料清單 / 動線草圖。" },
  { step: 3, title: "視覺製作", desc: "婚卡、背板、花藝、香氛與音樂設計。" },
  { step: 4, title: "流程排演", desc: "主持腳本、分工表與彩排執行。" },
  { step: 5, title: "現場統籌", desc: "分秒控場、情境切換與突發應變。" },
  { step: 6, title: "回饋與交付", desc: "影像交付、花絮回顧與謝卡設計。" },
];

const TAGS = ["全部", "海島", "戶外", "室內"] as const;

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', next === 'dark');
    }
  };
  return { theme, toggle };
}

function Nav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const items = [
    { href: '#about', label: '關於' },
    { href: '#services', label: '服務' },
    { href: '#works', label: '作品' },
    { href: '#process', label: '流程' },
    { href: '#testimonials', label: '見證' },
    { href: '#contact', label: '聯絡' },
  ];
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="font-semibold tracking-widest text-zinc-900 dark:text-zinc-100">AVAVOGUE</a>
        <div className="hidden md:flex items-center gap-6">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition">{it.label}</a>
          ))}
          <button onClick={toggle} className="rounded-xl border px-3 py-1.5 text-sm border-zinc-300 dark:border-zinc-700 hover:shadow">
            {theme === 'light' ? '深色' : '淺色'}
          </button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg border border-zinc-300 dark:border-zinc-700">
          <ChevronDown className={`w-5 h-5 transition ${open ? 'rotate-180' : ''}`} />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden overflow-hidden border-t border-zinc-200 dark:border-zinc-800">
            <div className="px-4 py-2 flex flex-col gap-2">
              <a href="#about" className="py-2">關於</a>
              <a href="#services" className="py-2">服務</a>
              <a href="#works" className="py-2">作品</a>
              <a href="#process" className="py-2">流程</a>
              <a href="#testimonials" className="py-2">見證</a>
              <a href="#contact" className="py-2">聯絡</a>
              <button onClick={() => { const e = document.documentElement.classList.toggle('dark'); setOpen(false); }} className="mt-2 rounded-xl border px-3 py-2 text-sm">主題切換</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-24 md:pt-28 pb-16 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            為愛設計的美學儀式
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.05 }} className="mt-4 text-zinc-600 dark:text-zinc-300">
            AVAVOGUE 是專注於「時尚婚禮設計」的團隊。我們以品牌級視覺能力與現場統籌力，將你的故事轉化為一場有溫度的藝術展演。
          </motion.p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#works" className="rounded-2xl px-5 py-3 text-sm font-medium bg-zinc-900 text-white hover:shadow-lg active:scale-[.99]">瀏覽作品</a>
            <a href="#contact" className="rounded-2xl px-5 py-3 text-sm font-medium border border-zinc-300 dark:border-zinc-700 hover:shadow-lg active:scale-[.99]">預約諮詢</a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/>一站式規劃</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/>品牌級視覺</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/>現場分秒控管</div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop" alt="AVAVOGUE Hero" className="w-full h-full object-cover" />
          </div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="absolute -bottom-6 left-6 right-6">
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3].map((i) => (
                <div key={i} className="h-24 rounded-2xl overflow-hidden shadow ring-1 ring-black/5 dark:ring-white/10">
                  <img src={`https://images.unsplash.com/photo-1541944743827-e04aa6427c33?q=80&w=800&auto=format&fit=crop`} alt="thumb" className="w-full h-full object-cover"/>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, desc }: { kicker?: string; title: string; desc?: string }) {
  return (
    <div className="max-w-3xl">
      {kicker && <p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{kicker}</p>}
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white">{title}</h2>
      {desc && <p className="mt-3 text-zinc-600 dark:text-zinc-300">{desc}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
        <SectionTitle kicker="ABOUT" title="AVAVOGUE 是誰？" desc="我們是以品牌視覺實力為核心、以現場統籌為本的時尚婚禮設計公司。相信每場婚禮都是一個品牌展演，從視覺系統到動線敘事，為愛打造高級而不失溫度的美學儀式。" />
        <div className="grid sm:grid-cols-2 gap-4">
          {[ 
            {icon: <Users className="w-5 h-5"/>, title: "跨域團隊", text: "視覺設計 × 影像 × 花藝 × 香氛 × 主持"},
            {icon: <Globe className="w-5 h-5"/>, title: "多場域執行", text: "戶外草地、海島證婚、古堡/美術館"},
            {icon: <Star className="w-5 h-5"/>, title: "美學一致", text: "從婚卡到背板，色盤/字體/物料一致"},
            {icon: <PlayCircle className="w-5 h-5"/>, title: "分秒控場", text: "完整主持/腳本/分工/彩排制度"},
          ].map((f, i) => (
            <div key={i} className="rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-900/40">
              <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-100">
                {f.icon}
                <h3 className="font-medium">{f.title}</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-20 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <SectionTitle kicker="SERVICES" title="我們提供什麼？" desc="可依需求選擇整體方案或單一模組服務，彈性搭配，精準預算。" />
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-white">
            取得報價 <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-100">
                {s.icon}
                <h3 className="font-medium">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{s.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Works() {
  const [activeTag, setActiveTag] = useState<typeof TAGS[number]>("全部");
  const [lightbox, setLightbox] = useState<{ open: boolean; images: string[]; index: number; title?: string }>(() => ({ open: false, images: [], index: 0 }));
  const filtered = useMemo(() => activeTag === "全部" ? WORKS : WORKS.filter(w => w.tag === activeTag), [activeTag]);

  return (
    <section id="works" className="py-20 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <SectionTitle kicker="PORTFOLIO" title="精選作品" desc="以故事為導向的完整場景設計，從色盤、字體到動線，皆有一致的美學脈絡。" />
          <div className="hidden md:flex gap-2">
            {TAGS.map((t) => (
              <button key={t} onClick={() => setActiveTag(t)} className={`px-3 py-1.5 rounded-xl text-sm border ${activeTag === t ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-300 dark:border-zinc-700'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="mt-6 md:hidden flex gap-2 overflow-auto pb-2">
          {TAGS.map((t) => (
            <button key={t} onClick={() => setActiveTag(t)} className={`px-3 py-1.5 rounded-xl text-sm border whitespace-nowrap ${activeTag === t ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-300 dark:border-zinc-700'}`}>{t}</button>
          ))}
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((w, i) => (
            <motion.div key={w.id} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group cursor-pointer rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-900/40">
              <div className="relative">
                <img src={w.cover} alt={w.title} className="w-full h-64 object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition"/>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <h3 className="font-medium drop-shadow">{w.title}</h3>
                    <p className="text-xs opacity-80">{w.tag}</p>
                  </div>
                  <button onClick={() => setLightbox({ open: true, images: w.images, index: 0, title: w.title })} className="px-3 py-1.5 rounded-xl text-xs bg-white/90 text-zinc-900">檢視</button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-1">
                  {w.palette.map((c) => (
                    <span key={c} title={c} className="h-6 w-6 rounded-full border border-zinc-200 dark:border-zinc-800" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {lightbox.open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/70 p-6 flex items-center justify-center">
              <div className="relative max-w-5xl w-full">
                <button onClick={() => setLightbox({ open: false, images: [], index: 0 })} className="absolute -top-4 -right-4 p-2 bg-white rounded-full shadow">
                  <X className="w-5 h-5" />
                </button>
                <div className="rounded-2xl overflow-hidden bg-black">
                  <img src={lightbox.images[lightbox.index]} alt={lightbox.title} className="w-full h-[60vh] object-cover" />
                </div>
                <div className="mt-3 flex items-center justify-between text-white text-sm">
                  <span>{lightbox.title}</span>
                  <div className="flex gap-2">
                    <button disabled={lightbox.index === 0} onClick={() => setLightbox((s) => ({ ...s, index: Math.max(0, s.index - 1) }))} className="px-3 py-1 rounded-xl bg-white/80 text-zinc-900 disabled:opacity-50">上一張</button>
                    <button disabled={lightbox.index === lightbox.images.length - 1} onClick={() => setLightbox((s) => ({ ...s, index: Math.min(s.images.length - 1, s.index + 1) }))} className="px-3 py-1 rounded-xl bg-white/80 text-zinc-900 disabled:opacity-50">下一張</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-20 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle kicker="PROCESS" title="我們怎麼做？" desc="以品牌專案思維規劃婚禮，確保每一步都有節點與交付。" />
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {PROCESS.map((p, i) => (
            <motion.div key={p.step} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="text-3xl font-semibold text-zinc-900 dark:text-white">{String(p.step).padStart(2, '0')}</div>
              <h3 className="mt-2 font-medium text-zinc-800 dark:text-zinc-100">{p.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle kicker="REVIEWS" title="真實見證" desc="來自新人的感謝回饋，讓我們持續把愛的細節做到最好。" />
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-900/40">
              <div className="flex items-center gap-2 text-amber-500">
                {Array.from({ length: Math.floor(t.rating) }).map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                {t.rating % 1 !== 0 && <Star className="w-5 h-5" />}
              </div>
              <p className="mt-3 text-zinc-700 dark:text-zinc-200">{t.text}</p>
              <p className="mt-4 text-sm text-zinc-500">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle kicker="FAQ" title="常見問題" />
        <div className="mt-8 divide-y divide-zinc-200 dark:divide-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          {FAQS.map((f, i) => (
            <details key={i} open={open === i} onClick={() => setOpen(open === i ? null : i)} className="group">
              <summary className="list-none cursor-pointer select-none bg-white dark:bg-zinc-900 px-6 py-5 flex items-center justify-between">
                <span className="font-medium text-zinc-800 dark:text-zinc-100">{f.q}</span>
                <ChevronDown className={`w-5 h-5 transition ${open === i ? 'rotate-180' : ''}`} />
              </summary>
              <div className="bg-white dark:bg-zinc-900 px-6 pb-6 text-zinc-600 dark:text-zinc-300">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
        <div>
          <SectionTitle kicker="CONTACT" title="預約初談" desc="留下聯絡資訊與預計檔期，我們將在 1–2 個工作日內回覆。「我們先了解你們的故事，然後設計婚禮。」" />
          <div className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4"/>hello@avavogue.com</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4"/>+886 4 2251 8440</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/>台中市西屯區黎明路二段 958 號</div>
            <div className="flex items-center gap-3 pt-2">
              <a className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5" href="#"><Instagram className="w-4 h-4"/>Instagram</a>
              <a className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5" href="#"><Facebook className="w-4 h-4"/>Facebook</a>
            </div>
          </div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); alert('已送出！我們將盡快與您聯繫。'); }} className="rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="text-sm">姓名<input required className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/80 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"/></label>
            <label className="text-sm">Email<input required type="email" className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/80 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"/></label>
            <label className="text-sm sm:col-span-2">預計日期<input type="date" className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/80 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"/></label>
            <label className="text-sm sm:col-span-2">預算區間<select className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/80 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"><option>未定</option><option>200K–400K</option><option>400K–600K</option><option>600K+</option></select></label>
            <label className="text-sm sm:col-span-2">想說的話<textarea rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 bg-white/80 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700" placeholder="描述你們的故事、喜好或靈感參考…"/></label>
          </div>
          <button className="mt-4 w-full rounded-2xl px-5 py-3 text-sm font-medium bg-zinc-900 text-white hover:shadow-lg active:scale-[.99]">送出表單</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <div>© {new Date().getFullYear()} AVAVOGUE Wedding Design. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#about">關於</a>
          <a href="#services">服務</a>
          <a href="#works">作品</a>
          <a href="#contact">聯絡</a>
        </div>
      </div>
    </footer>
  );
}

export default function AvavogueShowcase() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Works />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
