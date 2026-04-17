import { useRef } from "react";
// eslint-disable-next-line no-unused-vars -- used as JSX member tag (<motion.div /> etc.)
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

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
  { name: "Wings Signature",         price: "10,90", img: "/assets/wings.png",   tag: "Spicy",            desc: "Ailes croustillantes, sauce maison braisée." },
  { name: "The Fresh Crunch",        price: "8,90",  img: "/assets/wrap.png",    tag: "Fresh",            desc: "Wrap généreux, crunch et sauce onctueuse." },
  { name: "Le Tacos Signature",      price: "9,50",  img: "/assets/tacos.png",   tag: "Sans frites ded.", desc: "Galette grillée, poulet croustillant, sauce fromagère." },
  { name: "The Banger Burger",       price: "12,90", img: "/assets/burger.png",  tag: "Bestseller",       desc: "Bun brioché, double crunch, oignons frits, BBQ maison." },
  { name: "Nos Sides",               price: "4,50",  img: "/assets/fries.png",   tag: "Frites ondulées",  desc: "Ondulées dorées, sel fumé, sauce au choix." },
];

/* ─────────────────────────────────────────────
   Branded social SVGs
───────────────────────────────────────────── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
    <defs>
      <radialGradient id="ig-rg" cx="30%" cy="107%" r="150%">
        <stop offset="0%"   stopColor="#fdf497" />
        <stop offset="5%"   stopColor="#fdf497" />
        <stop offset="45%"  stopColor="#fd5949" />
        <stop offset="60%"  stopColor="#d6249f" />
        <stop offset="90%"  stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#ig-rg)" />
    <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5" fill="none" stroke="white" strokeWidth="1.5" opacity="0.15" />
    <circle cx="12" cy="12" r="4.6" stroke="white" strokeWidth="1.6" fill="none" />
    <circle cx="17.6" cy="6.4" r="1.4" fill="white" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full">
    <rect width="24" height="24" rx="6" fill="#010101" />
    <path
      d="M17 3.5h-2.8v11.25a2.75 2.75 0 01-2.75 2.75 2.75 2.75 0 01-2.75-2.75 2.75 2.75 0 012.75-2.75c.26 0 .51.04.75.1V9.24a6.05 6.05 0 00-.75-.05 6.05 6.05 0 00-6.05 6.06 6.05 6.05 0 006.05 6.05 6.05 6.05 0 006.05-6.05V9.2a8.43 8.43 0 004.98 1.62V8a5.6 5.6 0 01-5.48-4.5z"
      fill="white"
    />
    <path
      d="M17 3.5h-2.8v11.25a2.75 2.75 0 01-2.75 2.75 2.75 2.75 0 01-2.75-2.75 2.75 2.75 0 012.75-2.75c.26 0 .51.04.75.1V9.24a6.05 6.05 0 00-.75-.05 6.05 6.05 0 00-6.05 6.06 6.05 6.05 0 006.05 6.05 6.05 6.05 0 006.05-6.05V9.2a8.43 8.43 0 004.98 1.62V8a5.6 5.6 0 01-5.48-4.5z"
      fill="#69C9D0"
      opacity="0.6"
      transform="translate(-1.5, 0)"
    />
    <path
      d="M17 3.5h-2.8v11.25a2.75 2.75 0 01-2.75 2.75 2.75 2.75 0 01-2.75-2.75 2.75 2.75 0 012.75-2.75c.26 0 .51.04.75.1V9.24a6.05 6.05 0 00-.75-.05 6.05 6.05 0 00-6.05 6.06 6.05 6.05 0 006.05 6.05 6.05 6.05 0 006.05-6.05V9.2a8.43 8.43 0 004.98 1.62V8a5.6 5.6 0 01-5.48-4.5z"
      fill="#EE1D52"
      opacity="0.5"
      transform="translate(1.5, 0)"
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

const SOCIALS = [
  { name: "Instagram", handle: "@tipzandjo", Icon: InstagramIcon, bg: "bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]" },
  { name: "TikTok",    handle: "@tipzandjo", Icon: TikTokIcon,    bg: "bg-[#010101]" },
  { name: "Snapchat",  handle: "tipzandjo",  Icon: SnapchatIcon,  bg: "bg-[#FFFC00]" },
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
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...springSoft, delay }}
    >
      {children}
    </motion.div>
  );
};

const MaisonBadge = ({ className = "" }) => (
  <motion.span
    initial={{ rotate: -6, scale: 0 }}
    whileInView={{ rotate: -6, scale: 1 }}
    viewport={{ once: true }}
    transition={spring}
    className={
      "inline-flex items-center gap-1.5 rounded-full bg-[#D9534F] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#FDFBF7] shadow-[0_6px_20px_-4px_rgba(217,83,79,0.55)] ring-1 ring-black/5 " +
      className
    }
  >
    <span aria-hidden className="text-[13px] leading-none">★</span>
    100% MAISON
  </motion.span>
);

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={spring}
      className="fixed inset-x-0 top-3 z-50 mx-auto flex w-[min(96%,1180px)] items-center justify-between rounded-2xl border border-black/5 bg-[#FDFBF7]/80 px-4 py-3 shadow-[0_10px_40px_-20px_rgba(26,20,18,0.25)] backdrop-blur-xl sm:px-6"
    >
      <a href="#top" className="flex items-center gap-2 font-[Fredoka] font-bold">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#D9534F] text-[#FDFBF7] shadow-[0_6px_14px_-4px_rgba(217,83,79,0.6)]">T</span>
        <span className="text-lg tracking-tight">Tipz<span className="text-[#D9534F]">&</span>Jo</span>
      </a>
      <ul className="hidden items-center gap-7 text-sm font-medium text-[#1A1412]/80 md:flex">
        <li><a href="#concept"   className="transition hover:text-[#D9534F]">Le Concept</a></li>
        <li><a href="#menu"      className="transition hover:text-[#D9534F]">Le Menu</a></li>
        <li><a href="#livraison" className="transition hover:text-[#D9534F]">Livraison</a></li>
      </ul>
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg   = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rotImg = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 pb-12 sm:pt-32 md:pt-40 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[#F97316]/25 blur-[90px]" />
        <div className="absolute top-10 -right-32 h-[520px] w-[520px] rounded-full bg-[#EAB308]/25 blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-[#D9534F]/20 blur-[90px]" />
      </div>

      <div className="relative mx-auto grid w-[min(94%,1180px)] grid-cols-1 items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
        <div className="order-2 md:order-1">
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
            className="mt-5 font-[Fredoka] text-[clamp(2.75rem,7vw,5.75rem)] font-bold leading-[0.95] tracking-[-0.03em]"
          >
            On débarque à{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#D9534F]">Orléans.</span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ ...springSoft, delay: 0.55 }}
                className="absolute inset-x-0 bottom-1 -z-0 block h-3 origin-left rounded-full bg-[#EAB308]/60 md:h-4"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.18 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-[#1A1412]/70 md:text-xl"
          >
            Tenders croustillants, wings marinées 24h et sauces maison. Une streetfood
            <span className="font-semibold text-[#1A1412]"> 100% faite sur place</span>, généreuse et honnête.
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

        <div className="order-1 md:order-2">
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
              className="absolute -left-2 top-8 rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold shadow-juicy backdrop-blur md:-left-6"
            >🔥 Crispy</motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ ...spring, delay: 0.75 }}
              className="absolute -right-2 bottom-10 rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold shadow-juicy backdrop-blur md:-right-4"
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
    <section aria-label="slogan" className="relative border-y border-[#1A1412]/10 bg-[#1A1412] py-5 text-[#FDFBF7]">
      <div className="flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap pr-10 font-[Fredoka] text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
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
    <section id="concept" className="relative py-20 md:py-28">
      <div className="mx-auto grid w-[min(94%,1180px)] grid-cols-1 items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-[#F97316]/15 via-[#EAB308]/10 to-transparent blur-xl" />
            <motion.div
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={spring}
              className="grain relative overflow-hidden rounded-3xl bg-[#F4EEE1] p-4 shadow-juicy ring-1 ring-black/5"
            >
              <img src="/assets/tenders.png" alt="Tenders maison" loading="lazy" className="aspect-[5/4] w-full rounded-2xl object-cover" />
              <div className="absolute left-6 top-6"><MaisonBadge /></div>
            </motion.div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="inline-block rounded-full bg-[#EAB308]/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#1A1412]/70">Le Concept</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-[Fredoka] text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              Tout est <span className="text-[#D9534F]">fait maison</span>.<br />
              Les marinades prennent <span className="text-[#F97316]">24 heures</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#1A1412]/70">
              Pas de poudre magique, pas de raccourcis. On marine, on panne, on frit à la minute.
              Nos sauces sont toutes élaborées ici, en cuisine. Streetfood honnête, goût de ouf.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { k: "24h",     v: "de marinade"  },
              { k: "100%",    v: "maison"       },
              { k: "7j/7",    v: "croustillant" },
              { k: "Orléans", v: "depuis 2024"  },
            ].map((s, i) => (
              <Reveal key={s.k} delay={0.15 + i * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.04, rotate: 1 }}
                  transition={spring}
                  className="rounded-2xl border border-[#1A1412]/10 bg-white/70 p-4 backdrop-blur"
                >
                  <div className="font-[Fredoka] text-2xl font-bold text-[#D9534F]">{s.k}</div>
                  <div className="text-sm text-[#1A1412]/70">{s.v}</div>
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
   MENU CARD — purely informational, no button
───────────────────────────────────────────── */
function MenuCard({ item, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...spring, delay: (i % 3) * 0.08 }}
      whileHover={{ scale: 1.05, rotate: 1, y: -4 }}
      className="group relative overflow-hidden rounded-3xl border border-[#1A1412]/8 bg-white/80 p-4 shadow-juicy ring-1 ring-black/5 backdrop-blur"
    >
      {/* Hover glow ring */}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-2 ring-[#F97316]/50 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Photo */}
      <div className="relative overflow-hidden rounded-2xl bg-[#F4EEE1]">
        <motion.img
          src={item.img}
          alt={item.name}
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={spring}
          className="aspect-[4/3] w-full object-cover"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#1A1412]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FDFBF7] backdrop-blur">
          {item.tag}
        </span>
        <div className="absolute right-3 top-3"><MaisonBadge /></div>
      </div>

      {/* Info block — balanced without button */}
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="font-[Fredoka] text-xl font-bold leading-tight tracking-tight">
          {item.name}
        </h3>
        <p className="text-sm leading-snug text-[#1A1412]/60">{item.desc}</p>
      </div>

      {/* Price row — prominent, decorative separator above */}
      <div className="mt-4 flex items-center justify-between border-t border-[#1A1412]/8 pt-4">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1412]/45">
          Prix
        </span>
        <div className="flex items-baseline gap-0.5 font-[Fredoka]">
          <span className="text-3xl font-bold text-[#1A1412]">{item.price}</span>
          <span className="text-lg font-semibold text-[#D9534F]">€</span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   MENU GRID
───────────────────────────────────────────── */
function Menu() {
  return (
    <section id="menu" className="relative py-20 md:py-28">
      <div className="mx-auto w-[min(94%,1180px)]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <Reveal>
              <span className="inline-block rounded-full bg-[#D9534F]/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#D9534F]">
                Le Menu
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-[Fredoka] text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                Que du <span className="text-[#F97316]">crunch</span>.<br />
                Que du <span className="text-[#D9534F]">goût</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[#1A1412]/65">
              Six signatures pour une envie simple : manger bien, manger généreux.
              Tout est préparé chez nous, à Orléans.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  const partners = [
    { name: "Uber Eats", tag: "Livraison rapide",  grad: "from-[#06C167] to-[#0A8E4A]", logo: "/assets/uber-eats-logo.svg", logoAlt: "Logo officiel Uber Eats" },
    { name: "Deliveroo", tag: "Livraison premium", grad: "from-[#00CCBC] to-[#008F85]", logo: "/assets/deliveroo-logo.svg", logoAlt: "Logo officiel Deliveroo" },
  ];
  return (
    <section id="livraison" className="relative py-20 md:py-28">
      <div className="mx-auto w-[min(94%,1180px)]">
        <div className="mb-12 text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-[#F97316]/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#F97316]">
              Livraison
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mx-auto mt-4 max-w-3xl font-[Fredoka] text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              On vient jusqu'à <span className="text-[#D9534F]">toi</span>, bien chaud.
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {partners.map((p, i) => (
            <motion.a
              key={p.name}
              href="#"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.08 }}
              whileHover={{ scale: 1.03, rotate: i % 2 ? 0.6 : -0.6, y: -3 }}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${p.grad} p-8 text-white shadow-juicy`}
            >
              <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125" />
              <div className="relative flex items-center justify-between gap-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">{p.tag}</div>
                  <div className="mt-2 font-[Fredoka] text-4xl font-bold md:text-5xl">{p.name}</div>
                  <p className="mt-3 max-w-xs text-white/85">Commande en 2 clics, on te livre bien croustillant.</p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors group-hover:bg-black/40">
                    Commander <span aria-hidden>→</span>
                  </div>
                </div>
                <div className="hidden h-28 w-36 place-items-center rounded-3xl border border-white/40 bg-white/88 p-4 shadow-[0_18px_35px_-18px_rgba(0,0,0,0.35)] backdrop-blur md:grid">
                  <img
                    src={p.logo}
                    alt={p.logoAlt}
                    className="max-h-10 max-w-[112px] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
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
   FOOTER — with branded social SVGs + fixed contrast
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="contact" className="relative mt-12 overflow-hidden bg-[#1A1412]" style={{ color: "#FDFBF7" }}>
      <div aria-hidden className="absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-[#D9534F]/30 blur-[120px]" />
      <div aria-hidden className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#F97316]/20 blur-[120px]" />

      <div className="relative mx-auto grid w-[min(94%,1180px)] grid-cols-1 gap-12 py-16 md:grid-cols-4 md:py-20">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 font-[Fredoka]">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#D9534F]" style={{ color: "#FDFBF7" }}>T</span>
            <span className="text-2xl font-bold" style={{ color: "#FDFBF7" }}>
              Tipz<span className="text-[#EAB308]">&</span>Jo
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: "rgba(253,251,247,0.70)" }}>
            La streetfood d'Orléans. 100% maison, marinades 24h, croustillant garanti.
          </p>
          <div className="mt-8 inline-flex items-center gap-3">
            <MaisonBadge />
            <span className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "rgba(253,251,247,0.70)" }}>
              Orléans · France
            </span>
          </div>
        </div>

        {/* Address + Hours */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: "#EAB308" }}>
            Adresse
          </h3>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(253,251,247,0.85)" }}>
            12 rue Jeanne d'Arc<br />45000 Orléans
          </p>
          <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.18em]" style={{ color: "#EAB308" }}>
            Horaires
          </h3>
          <ul className="mt-4 space-y-1.5 text-sm" style={{ color: "rgba(253,251,247,0.85)" }}>
            <li>Lun – Jeu · 11h30 – 22h30</li>
            <li>Ven – Sam · 11h30 – 00h00</li>
            <li>Dimanche · 18h – 22h30</li>
          </ul>
        </div>

        {/* Branded social links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: "#EAB308" }}>
            Réseaux
          </h3>
          <ul className="mt-4 space-y-2.5">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <motion.a
                  href="#"
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur transition-colors hover:border-white/25 hover:bg-white/10"
                >
                  {/* Branded icon */}
                  <span className="h-8 w-8 shrink-0 overflow-hidden rounded-xl">
                    <s.Icon />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold" style={{ color: "#FDFBF7" }}>
                      {s.name}
                    </span>
                    <span className="block text-xs" style={{ color: "rgba(253,251,247,0.55)" }}>
                      {s.handle}
                    </span>
                  </span>
                  <span aria-hidden className="text-sm transition-colors" style={{ color: "rgba(253,251,247,0.35)" }}>
                    ↗
                  </span>
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-[min(94%,1180px)] flex-col items-center justify-between gap-2 py-5 text-xs md:flex-row" style={{ color: "rgba(253,251,247,0.45)" }}>
          <span>© {new Date().getFullYear()} Tipz & Jo · Tous droits réservés.</span>
          <span>Fait avec amour à Orléans 🍗</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export default function App() {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#1A1412]">
      <Nav />
      <Hero />
      <Marquee />
      <Concept />
      <Menu />
      <Livraison />
      <Footer />
    </div>
  );
}
