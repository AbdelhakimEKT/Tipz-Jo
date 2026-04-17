import { useRef, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars -- used as JSX member tag (<motion.div /> etc.)
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Juicy Pop physics
───────────────────────────────────────────── */
const spring     = { type: "spring", stiffness: 260, damping: 20 };
const springSoft = { type: "spring", stiffness: 180, damping: 22 };

/* ─────────────────────────────────────────────
   Menu data
───────────────────────────────────────────── */
const MENU = [
  { name: "Tenders & Cheddar Drop", price: "9,90",  img: "/assets/tenders.png", tag: "Signature",        desc: "Tenders marinés 24h, cheddar fondu qui coule." },
  { name: "Wings Signature",        price: "10,90", img: "/assets/wings.png",   tag: "Spicy",            desc: "Ailes croustillantes, sauce maison braisée." },
  { name: "The Fresh Crunch",       price: "8,90",  img: "/assets/wrap.png",    tag: "Fresh",            desc: "Wrap généreux, crunch et sauce onctueuse." },
  { name: "Le Tacos Signature",     price: "9,50",  img: "/assets/tacos.png",   tag: "Sans frites ded.", desc: "Galette grillée, poulet croustillant, sauce fromagère." },
  { name: "The Banger Burger",      price: "12,90", img: "/assets/burger.png",  tag: "Bestseller",       desc: "Bun brioché, double crunch, oignons frits, BBQ maison." },
  { name: "Nos Sides",              price: "4,50",  img: "/assets/fries.png",   tag: "Frites ondulées",  desc: "Ondulées dorées, sel fumé, sauce au choix." },
];

/* ─────────────────────────────────────────────
   Branded social SVGs (fully inline — no external files)
───────────────────────────────────────────── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
    <defs>
      <radialGradient id="ig-rg" cx="30%" cy="107%" r="150%">
        <stop offset="0%"  stopColor="#fdf497" />
        <stop offset="5%"  stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig-rg)" />
    <circle cx="12" cy="12" r="4.6" stroke="white" strokeWidth="1.6" fill="none" />
    <circle cx="17.6" cy="6.4" r="1.4" fill="white" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full">
    <rect width="24" height="24" rx="6" fill="#010101" />
    <path
      d="M15.5 4h-2.3v10.3a2.2 2.2 0 01-2.2 2.2 2.2 2.2 0 01-2.2-2.2 2.2 2.2 0 012.2-2.2c.2 0 .4 0 .6.1V9.8a5.5 5.5 0 00-.6-.04 5.5 5.5 0 00-5.5 5.5 5.5 5.5 0 005.5 5.5 5.5 5.5 0 005.5-5.5V8.7a7.7 7.7 0 004.5 1.5V7.9A5.1 5.1 0 0115.5 4z"
      fill="#69C9D0"
    />
    <path
      d="M15.5 4h-2.3v10.3a2.2 2.2 0 01-2.2 2.2 2.2 2.2 0 01-2.2-2.2 2.2 2.2 0 012.2-2.2c.2 0 .4 0 .6.1V9.8a5.5 5.5 0 00-.6-.04 5.5 5.5 0 00-5.5 5.5 5.5 5.5 0 005.5 5.5 5.5 5.5 0 005.5-5.5V8.7a7.7 7.7 0 004.5 1.5V7.9A5.1 5.1 0 0115.5 4z"
      fill="#EE1D52"
      opacity="0.7"
      transform="translate(1, 0)"
    />
    <path
      d="M15.5 4h-2.3v10.3a2.2 2.2 0 01-2.2 2.2 2.2 2.2 0 01-2.2-2.2 2.2 2.2 0 012.2-2.2c.2 0 .4 0 .6.1V9.8a5.5 5.5 0 00-.6-.04 5.5 5.5 0 00-5.5 5.5 5.5 5.5 0 005.5 5.5 5.5 5.5 0 005.5-5.5V8.7a7.7 7.7 0 004.5 1.5V7.9A5.1 5.1 0 0115.5 4z"
      fill="white"
      transform="translate(-0.5, 0)"
    />
  </svg>
);

const SnapchatIcon = () => (
  <div className="grid h-full w-full place-items-center rounded-xl bg-[#FFFC00]">
    <img
      src="/assets/snapchat-ghost-logo.svg"
      alt=""
      aria-hidden="true"
      className="h-[72%] w-[72%] object-contain"
    />
  </div>
);

const SOCIAL_LINKS = [
  { name: "Instagram", handle: "@tipzandjo", Icon: InstagramIcon },
  { name: "TikTok",    handle: "@tipzandjo", Icon: TikTokIcon    },
  { name: "Snapchat",  handle: "tipzandjo",  Icon: SnapchatIcon  },
];

const DELIVERY_PARTNERS = [
  {
    name: "Uber Eats",
    tag: "Livraison rapide",
    grad: "from-[#06C167] to-[#0A8E4A]",
    logo: "/assets/uber-eats-logo.svg",
    logoAlt: "Logo officiel Uber Eats",
  },
  {
    name: "Deliveroo",
    tag: "Livraison premium",
    grad: "from-[#00CCBC] to-[#008F85]",
    logo: "/assets/deliveroo-logo.svg",
    logoAlt: "Logo officiel Deliveroo",
  },
];

/* ─────────────────────────────────────────────
   Shared atoms
───────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, y = 24 }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...springSoft, delay }}
    >
      {children}
    </motion.div>
  );
};

const MaisonBadge = ({ className = "", small = false }) => (
  <motion.span
    initial={{ rotate: -6, scale: 0 }}
    whileInView={{ rotate: -6, scale: 1 }}
    viewport={{ once: true }}
    transition={spring}
    className={
      `inline-flex items-center gap-1 rounded-full bg-[#D9534F] text-[#FDFBF7] font-bold uppercase tracking-[0.1em] shadow-[0_6px_20px_-4px_rgba(217,83,79,0.55)] ring-1 ring-black/5 ` +
      (small ? "px-2 py-1 text-[9px] " : "px-3 py-1.5 text-[11px] ") +
      className
    }
  >
    <span aria-hidden className={small ? "text-[10px]" : "text-[13px] leading-none"}>★</span>
    100% MAISON
  </motion.span>
);

/* ─────────────────────────────────────────────
   MOBILE BOTTOM BAR — only visible < md
───────────────────────────────────────────── */
function MobileBottomBar() {
  const [active, setActive] = useState("home");

  // Update active tab based on scroll
  useEffect(() => {
    const sections = ["menu", "livraison", "contact"];
    const handler = () => {
      const scrollY = window.scrollY;
      if (scrollY < 200) { setActive("home"); return; }
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          setActive(id);
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const tabs = [
    { id: "home",      href: "#top",       icon: "🏠", label: "Accueil"  },
    { id: "menu",      href: "#menu",      icon: "🍗", label: "Menu"     },
    { id: "livraison", href: "#livraison", icon: "📦", label: "Livraison" },
    { id: "contact",   href: "#contact",   icon: "📍", label: "Contact"  },
  ];

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...spring, delay: 1 }}
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
    >
      {/* Glass bar */}
      <div className="border-t border-black/8 bg-[#FDFBF7]/92 backdrop-blur-xl pb-safe">
        <div className="flex items-end justify-around px-2 pt-2 pb-1">
          {/* Left 2 tabs */}
          {tabs.slice(0, 2).map((t) => (
            <a
              key={t.id}
              href={t.href}
              onClick={() => setActive(t.id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1"
            >
              <motion.span
                animate={{ scale: active === t.id ? 1.2 : 1 }}
                transition={spring}
                className="text-xl leading-none"
              >
                {t.icon}
              </motion.span>
              <span
                className="text-[10px] font-semibold transition-colors"
                style={{ color: active === t.id ? "#D9534F" : "rgba(26,20,18,0.45)" }}
              >
                {t.label}
              </span>
            </a>
          ))}

          {/* Centre CTA — lifted */}
          <a
            href="#menu"
            onClick={() => setActive("menu")}
            className="relative -mt-5 flex flex-col items-center"
          >
            <motion.div
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.06 }}
              transition={spring}
              className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-[22px] bg-[#D9534F] shadow-[0_12px_30px_-8px_rgba(217,83,79,0.7)] ring-4 ring-[#FDFBF7]"
            >
              <span className="text-xl leading-none">🍔</span>
              <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#FDFBF7]">
                Commander
              </span>
            </motion.div>
          </a>

          {/* Right 2 tabs */}
          {tabs.slice(2).map((t) => (
            <a
              key={t.id}
              href={t.href}
              onClick={() => setActive(t.id)}
              className="flex flex-col items-center gap-0.5 px-3 py-1"
            >
              <motion.span
                animate={{ scale: active === t.id ? 1.2 : 1 }}
                transition={spring}
                className="text-xl leading-none"
              >
                {t.icon}
              </motion.span>
              <span
                className="text-[10px] font-semibold transition-colors"
                style={{ color: active === t.id ? "#D9534F" : "rgba(26,20,18,0.45)" }}
              >
                {t.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   NAV — logo + desktop links + mobile CTA chip
───────────────────────────────────────────── */
function Nav() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={spring}
      className="fixed inset-x-0 top-3 z-40 mx-auto flex w-[min(96%,1180px)] items-center justify-between rounded-2xl border border-black/5 bg-[#FDFBF7]/80 px-4 py-3 shadow-[0_10px_40px_-20px_rgba(26,20,18,0.25)] backdrop-blur-xl sm:px-6"
    >
      {/* Logo */}
      <a href="#top" className="flex items-center gap-2 font-[Fredoka] font-bold">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#D9534F] text-[#FDFBF7] shadow-[0_6px_14px_-4px_rgba(217,83,79,0.6)]">
          T
        </span>
        <span className="text-lg tracking-tight">
          Tipz<span className="text-[#D9534F]">&</span>Jo
        </span>
      </a>

      {/* Desktop links */}
      <ul className="hidden items-center gap-7 text-sm font-medium text-[#1A1412]/80 md:flex">
        <li><a href="#concept"   className="transition hover:text-[#D9534F]">Le Concept</a></li>
        <li><a href="#menu"      className="transition hover:text-[#D9534F]">Le Menu</a></li>
        <li><a href="#livraison" className="transition hover:text-[#D9534F]">Livraison</a></li>
        <li><a href="#contact"   className="transition hover:text-[#D9534F]">Contact</a></li>
      </ul>

      {/* Desktop CTA */}
      <motion.a
        href="#menu"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={spring}
        className="hidden rounded-xl bg-[#1A1412] px-4 py-2 text-sm font-semibold text-[#FDFBF7] shadow-[0_8px_20px_-8px_rgba(26,20,18,0.7)] md:block"
      >
        Commander
      </motion.a>

      {/* Mobile-only: location pill + open hours */}
      <div className="flex items-center gap-2 md:hidden">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1A1412]/10 bg-white/60 px-3 py-1.5 text-xs font-semibold backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22c55e]" />
          Ouvert
        </span>
      </div>
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────
   HERO — mobile-first compact layout
───────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg   = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rotImg = useTransform(scrollYProgress, [0, 1], [0, -6]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-12 md:pt-40 md:pb-20"
    >
      {/* Ambient blobs — clipped by overflow-hidden */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-[#F97316]/30 blur-[80px] sm:h-[420px] sm:w-[420px] sm:-top-24 sm:-left-24 sm:blur-[90px]" />
        <div className="absolute top-0 -right-16 h-64 w-64 rounded-full bg-[#EAB308]/25 blur-[80px] sm:h-[520px] sm:w-[520px] sm:top-10 sm:-right-32 sm:blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-[#D9534F]/20 blur-[70px] sm:h-[300px] sm:w-[300px] sm:blur-[90px]" />
      </div>

      <div className="relative mx-auto w-[min(94%,1180px)]">

        {/* ── MOBILE LAYOUT: hero card ─────────────────── */}
        <div className="md:hidden">
          {/* Top row: text left, image right */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 pt-1">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.05 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#1A1412]/10 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1412]/70 backdrop-blur"
              >
                <span className="h-1 w-1 rounded-full bg-[#D9534F]" />
                Orléans · Streetfood
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...spring, delay: 0.08 }}
                className="mt-3 font-[Fredoka] text-[2.4rem] font-bold leading-[0.92] tracking-[-0.03em]"
              >
                On débarque<br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#D9534F]">à Orléans.</span>
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ ...springSoft, delay: 0.5 }}
                    className="absolute inset-x-0 bottom-0.5 -z-0 block h-2.5 origin-left rounded-full bg-[#EAB308]/55"
                  />
                </span>
              </motion.h1>
            </div>

            {/* Compact floating image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ ...spring, delay: 0.15 }}
              className="shrink-0"
            >
              <div className="relative h-[140px] w-[140px]">
                <div className="floating absolute inset-0">
                  <div className="absolute inset-0 rounded-[40%] bg-gradient-to-br from-[#F97316] to-[#D9534F] shadow-[0_20px_50px_-20px_rgba(217,83,79,0.7)]" />
                  <img
                    src="/assets/hero-tender.png"
                    alt="Tender Tipz & Jo"
                    loading="eager"
                    className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_20px_20px_rgba(26,20,18,0.3)]"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.18 }}
            className="mt-4 text-base leading-relaxed text-[#1A1412]/70"
          >
            Tenders marinés 24h, wings, sauces maison.
            <span className="font-semibold text-[#1A1412]"> 100% fait sur place.</span>
          </motion.p>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {["🔥 Marinades 24h", "🍟 Frites ondulées", "🐔 Poulet fermier"].map((t) => (
              <span key={t} className="rounded-full border border-[#1A1412]/10 bg-white/70 px-3 py-1 text-xs font-medium text-[#1A1412]/70 backdrop-blur">
                {t}
              </span>
            ))}
          </motion.div>

          {/* CTA button — full width on mobile */}
          <motion.a
            href="#menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.35 }}
            whileTap={{ scale: 0.97 }}
            className="magnetic-btn mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D9534F] py-4 text-base font-bold text-[#FDFBF7] shadow-[0_16px_36px_-12px_rgba(217,83,79,0.65)]"
          >
            Voir le menu complet <span aria-hidden>→</span>
          </motion.a>

          {/* Maison badge row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-4 flex justify-center"
          >
            <MaisonBadge />
          </motion.div>
        </div>

        {/* ── DESKTOP LAYOUT ────────────────────────── */}
        <div className="hidden md:grid md:grid-cols-[1.05fr_1fr] md:items-center md:gap-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#1A1412]/10 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#1A1412]/70 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9534F]" />
              Orléans · Streetfood Premium
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...spring, delay: 0.1 }}
              className="mt-5 font-[Fredoka] text-[clamp(3rem,6vw,5.75rem)] font-bold leading-[0.93] tracking-[-0.03em]"
            >
              On débarque à{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#D9534F]">Orléans.</span>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ ...springSoft, delay: 0.55 }}
                  className="absolute inset-x-0 bottom-1 -z-0 block h-4 origin-left rounded-full bg-[#EAB308]/60"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.18 }}
              className="mt-5 max-w-xl text-lg leading-relaxed text-[#1A1412]/70 md:text-xl"
            >
              Tenders croustillants, wings marinées 24h et sauces maison.
              Une streetfood<span className="font-semibold text-[#1A1412]"> 100% faite sur place</span>, généreuse et honnête.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.26 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <motion.a
                href="#menu"
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={spring}
                className="magnetic-btn inline-flex items-center gap-2 rounded-2xl bg-[#D9534F] px-6 py-3.5 text-base font-bold text-[#FDFBF7] shadow-[0_18px_40px_-14px_rgba(217,83,79,0.6)]"
              >
                Voir le menu <span aria-hidden>→</span>
              </motion.a>
              <motion.a
                href="#concept"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={spring}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#1A1412]/15 bg-white/70 px-6 py-3.5 text-base font-semibold text-[#1A1412] backdrop-blur"
              >
                Le concept
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#1A1412]/70"
            >
              <span className="inline-flex items-center gap-2"><span className="text-[#F97316]">●</span> Marinades 24h</span>
              <span className="inline-flex items-center gap-2"><span className="text-[#EAB308]">●</span> Frites maison ondulées</span>
              <span className="inline-flex items-center gap-2"><span className="text-[#D9534F]">●</span> Poulet fermier</span>
            </motion.div>
          </div>

          <div>
            <div className="relative mx-auto aspect-square w-[min(90%,520px)]">
              <motion.div style={{ y: yImg, rotate: rotImg }} className="absolute inset-0">
                <div className="floating absolute inset-0">
                  <div className="relative h-full w-full">
                    <div className="absolute inset-[6%] rounded-[42%] bg-gradient-to-br from-[#F97316] to-[#D9534F] opacity-95 shadow-[0_40px_80px_-30px_rgba(217,83,79,0.7)]" />
                    <div className="absolute inset-[14%] rounded-[48%] bg-[#EAB308]/40 mix-blend-multiply blur-sm" />
                    <img
                      src="/assets/hero-tender.png"
                      alt="Tender croustillant Tipz & Jo"
                      loading="eager"
                      className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_40px_40px_rgba(26,20,18,0.35)]"
                    />
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ ...spring, delay: 0.6 }}
                className="absolute -left-6 top-8 rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold shadow-juicy backdrop-blur"
              >🔥 Crispy</motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 20 }}
                animate={{ opacity: 1, scale: 1, rotate: 6 }}
                transition={{ ...spring, delay: 0.75 }}
                className="absolute -right-4 bottom-10 rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold shadow-juicy backdrop-blur"
              >🍗 Juicy</motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...spring, delay: 0.9 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2"
              >
                <MaisonBadge />
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────── */
function Marquee() {
  const items = ["CRISPY", "🔥", "JUICY", "🍔", "ADDICTIF", "🍗", "LA STREETFOOD D'ORLÉANS", "✦"];
  const loop  = [...items, ...items, ...items];
  return (
    <section aria-label="slogan" className="relative border-y border-[#1A1412]/10 bg-[#1A1412] py-4 text-[#FDFBF7] overflow-hidden md:py-5">
      <div className="flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 font-[Fredoka] text-2xl font-bold tracking-tight sm:gap-10 sm:text-3xl md:text-5xl">
          {loop.map((it, i) => (
            <span key={i} className={i % 2 === 1 ? "text-[#EAB308]" : ""}>{it}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONCEPT
───────────────────────────────────────────── */
function Concept() {
  return (
    <section id="concept" className="relative overflow-hidden py-14 md:py-28">
      <div className="mx-auto grid w-[min(94%,1180px)] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-[#F97316]/15 via-[#EAB308]/10 to-transparent blur-xl" />
            <motion.div
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              transition={spring}
              className="grain relative overflow-hidden rounded-3xl bg-[#F4EEE1] p-3 shadow-juicy ring-1 ring-black/5 md:p-4"
            >
              <img src="/assets/tenders.png" alt="Tenders maison" loading="lazy" className="aspect-[5/4] w-full rounded-2xl object-cover" />
              <div className="absolute left-5 top-5">
                <MaisonBadge />
              </div>
            </motion.div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="inline-block rounded-full bg-[#EAB308]/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#1A1412]/70">
              Le Concept
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-[Fredoka] text-3xl font-bold leading-[1.05] tracking-tight md:mt-4 md:text-5xl">
              Tout est <span className="text-[#D9534F]">fait maison</span>.<br />
              Marinades <span className="text-[#F97316]">24 heures</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#1A1412]/70 md:text-lg">
              Pas de poudre magique, pas de raccourcis. On marine, on panne, on frit à la minute.
              Nos sauces sont toutes élaborées ici, en cuisine. Streetfood honnête, goût de ouf.
            </p>
          </Reveal>

          <div className="mt-6 grid grid-cols-2 gap-2.5 md:mt-8 md:gap-3">
            {[
              { k: "24h",     v: "de marinade"  },
              { k: "100%",    v: "maison"       },
              { k: "7j/7",    v: "croustillant" },
              { k: "Orléans", v: "depuis 2024"  },
            ].map((s, i) => (
              <Reveal key={s.k} delay={0.12 + i * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.04, rotate: 1 }}
                  transition={spring}
                  className="rounded-2xl border border-[#1A1412]/10 bg-white/70 p-3 backdrop-blur md:p-4"
                >
                  <div className="font-[Fredoka] text-xl font-bold text-[#D9534F] md:text-2xl">{s.k}</div>
                  <div className="text-xs text-[#1A1412]/70 md:text-sm">{s.v}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MENU CARD
───────────────────────────────────────────── */
function MenuCard({ item, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ ...spring, delay: (i % 3) * 0.06 }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.04, rotate: 0.8, y: -3 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-[#1A1412]/8 bg-white/85 p-3 shadow-juicy ring-1 ring-black/5 backdrop-blur md:p-4"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-2 ring-[#F97316]/50 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Photo */}
      <div className="relative overflow-hidden rounded-2xl bg-[#F4EEE1]">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
        <span className="absolute left-2 top-2 inline-flex items-center rounded-full bg-[#1A1412]/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#FDFBF7] backdrop-blur md:left-3 md:top-3 md:px-2.5 md:text-[10px]">
          {item.tag}
        </span>
        <div className="absolute right-2 top-2 md:right-3 md:top-3">
          <MaisonBadge small />
        </div>
      </div>

      {/* Text */}
      <div className="mt-3 flex flex-col gap-1">
        <h3 className="font-[Fredoka] text-base font-bold leading-tight tracking-tight md:text-xl">
          {item.name}
        </h3>
        <p className="text-xs leading-snug text-[#1A1412]/60 md:text-sm">{item.desc}</p>
      </div>

      {/* Price */}
      <div className="mt-3 flex items-center justify-between border-t border-[#1A1412]/8 pt-3 md:mt-4 md:pt-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1A1412]/40">Prix</span>
        <div className="flex items-baseline gap-0.5 font-[Fredoka]">
          <span className="text-2xl font-bold text-[#1A1412] md:text-3xl">{item.price}</span>
          <span className="text-base font-semibold text-[#D9534F] md:text-lg">€</span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   MENU — snap carousel on mobile, grid on desktop
───────────────────────────────────────────── */
function Menu() {
  return (
    <section id="menu" className="relative py-14 md:py-28">
      <div className="mx-auto w-[min(94%,1180px)]">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <div>
            <Reveal>
              <span className="inline-block rounded-full bg-[#D9534F]/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#D9534F]">
                Le Menu
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-[Fredoka] text-3xl font-bold leading-[1.05] tracking-tight md:mt-4 md:text-6xl">
                Que du <span className="text-[#F97316]">crunch</span>.<br />
                Que du <span className="text-[#D9534F]">goût</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-[#1A1412]/65 md:text-base">
              Six signatures, tout fait maison à Orléans.
            </p>
          </Reveal>
        </div>

        {/* Mobile: horizontal snap carousel */}
        <div className="md:hidden">
          <Reveal>
            <div className="hide-scrollbar -mx-[3%] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[3%] pb-4">
              {MENU.map((item, i) => (
                <div key={item.name} className="w-[72vw] max-w-[280px] shrink-0 snap-center">
                  <MenuCard item={item} i={i} />
                </div>
              ))}
              {/* End spacer */}
              <div className="w-1 shrink-0" aria-hidden />
            </div>
          </Reveal>
          {/* Swipe hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-2 text-center text-xs text-[#1A1412]/40"
          >
            ← Glisse pour voir la suite →
          </motion.p>
        </div>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-5">
          {MENU.map((item, i) => (
            <MenuCard key={item.name} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   LIVRAISON
───────────────────────────────────────────── */
function Livraison() {
  return (
    <section id="livraison" className="relative overflow-hidden py-14 md:py-28">
      <div className="mx-auto w-[min(94%,1180px)]">
        <div className="mb-8 text-center md:mb-12">
          <Reveal>
            <span className="inline-block rounded-full bg-[#F97316]/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#F97316]">
              Livraison
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-3 max-w-3xl font-[Fredoka] text-3xl font-bold leading-[1.05] tracking-tight md:mt-4 md:text-5xl">
              On vient jusqu'à <span className="text-[#D9534F]">toi</span>, bien chaud.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {DELIVERY_PARTNERS.map((p, i) => (
            <motion.a
              key={p.name}
              href="#"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, rotate: i % 2 ? 0.5 : -0.5, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${p.grad} p-6 text-white shadow-juicy md:p-8`}
            >
              <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">{p.tag}</div>
                  <div className="mt-1.5 font-[Fredoka] text-3xl font-bold md:text-5xl">{p.name}</div>
                  <p className="mt-2 max-w-xs text-sm text-white/85 md:mt-3 md:text-base">
                    Commande en 2 clics, on te livre bien croustillant.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors group-hover:bg-black/40 md:mt-6">
                    Commander <span aria-hidden>→</span>
                  </div>
                </div>
                <div className="hidden h-20 w-24 place-items-center rounded-2xl border border-white/40 bg-white/88 p-3 shadow-[0_18px_35px_-18px_rgba(0,0,0,0.35)] backdrop-blur sm:grid md:h-28 md:w-36 md:rounded-3xl md:p-4">
                  <img
                    src={p.logo}
                    alt={p.logoAlt}
                    className="max-h-8 max-w-[72px] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:max-h-10 md:max-w-[112px]"
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#1A1412]" style={{ color: "#FDFBF7" }}>
      <div aria-hidden className="absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-[#D9534F]/30 blur-[120px]" />
      <div aria-hidden className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#F97316]/20 blur-[120px]" />

      <div className="relative mx-auto grid w-[min(94%,1180px)] grid-cols-1 gap-10 py-12 md:grid-cols-4 md:gap-12 md:py-20">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 font-[Fredoka]">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#D9534F]" style={{ color: "#FDFBF7" }}>T</span>
            <span className="text-2xl font-bold" style={{ color: "#FDFBF7" }}>
              Tipz<span className="text-[#EAB308]">&</span>Jo
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: "rgba(253,251,247,0.70)" }}>
            La streetfood d'Orléans. 100% maison, marinades 24h, croustillant garanti.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <MaisonBadge />
            <span className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(253,251,247,0.70)" }}>
              Orléans · France
            </span>
          </div>
        </div>

        {/* Address + Hours */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#EAB308" }}>Adresse</h3>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(253,251,247,0.85)" }}>
            12 rue Jeanne d'Arc<br />45000 Orléans
          </p>
          <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#EAB308" }}>Horaires</h3>
          <ul className="mt-3 space-y-1.5 text-sm" style={{ color: "rgba(253,251,247,0.85)" }}>
            <li>Lun – Jeu · 11h30 – 22h30</li>
            <li>Ven – Sam · 11h30 – 00h00</li>
            <li>Dimanche · 18h – 22h30</li>
          </ul>
        </div>

        {/* Social links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#EAB308" }}>Réseaux</h3>
          <ul className="mt-3 space-y-2.5">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.name}>
                <motion.a
                  href="#"
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/10"
                >
                  <span className="h-8 w-8 shrink-0 overflow-hidden rounded-xl">
                    <s.Icon />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold" style={{ color: "#FDFBF7" }}>{s.name}</span>
                    <span className="block text-xs" style={{ color: "rgba(253,251,247,0.55)" }}>{s.handle}</span>
                  </span>
                  <span aria-hidden style={{ color: "rgba(253,251,247,0.35)" }}>↗</span>
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div
          className="mx-auto flex w-[min(94%,1180px)] flex-col items-center justify-between gap-1.5 py-4 text-xs md:flex-row"
          style={{ color: "rgba(253,251,247,0.40)" }}
        >
          <span>© {new Date().getFullYear()} Tipz & Jo · Tous droits réservés.</span>
          <span>Fait avec amour à Orléans 🍗</span>
        </div>
      </div>

      {/* Extra padding on mobile so bottom bar doesn't cover footer content */}
      <div className="h-20 md:hidden" />
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function App() {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] pb-20 text-[#1A1412] md:pb-0">
      <Nav />
      <Hero />
      <Marquee />
      <Concept />
      <Menu />
      <Livraison />
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
