import React, { useEffect, useRef, useState, useCallback } from "react";
import CountUpModule from "react-countup";
const CountUp = CountUpModule.default || CountUpModule;
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Globe,
  ShieldCheck,
  Users,
  Award,
  Clock,
  MapPin,
  Package,
  Zap,
} from "lucide-react";

/* ─── useInView hook (replaces AOS + react-intersection-observer) ─── */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.triggerOnce !== false) observer.disconnect();
        }
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
};

/* ─── Animated wrapper (replaces data-aos) ─── */
const Reveal = ({
  children,
  className = "",
  direction = "up", // up | left | right | none
  delay = 0,
  threshold = 0.15,
}) => {
  const { ref, inView } = useInView({ threshold });

  const base = "transition-all duration-700 ease-out";
  const hidden = {
    up: "opacity-0 translate-y-8",
    left: "opacity-0 -translate-x-8",
    right: "opacity-0 translate-x-8",
    none: "opacity-0",
  }[direction];
  const visible = "opacity-100 translate-y-0 translate-x-0";

  return (
    <div
      ref={ref}
      className={`${base} ${inView ? visible : hidden} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

/* ─── data ──────────────────────────────────────────────── */
const PRODUCTS = [
  {
    title: "Food Products",
    tag: "Agricultural",
    desc: "Fresh produce, packaged goods and specialty items exported to global markets with highest quality and safety standards.",
    img: "/categories/FoodProducts.jpg",
    color: "from-emerald-600 to-teal-700",
    icon: "🌾",
  },
  {
    title: "Chemicals",
    tag: "Industrial",
    desc: "High-quality chemicals for industrial, commercial and residential use with timely delivery and full compliance.",
    img: "/categories/Chemicals.jpg",
    color: "from-blue-600 to-cyan-700",
    icon: "🧪",
  },
  {
    title: "Textiles",
    tag: "Premium Fabric",
    desc: "Premium fabrics to finished garments meeting international standards — quality woven into every export.",
    img: "/categories/Garment_Image.jpg",
    color: "from-violet-600 to-purple-700",
    icon: "🧵",
  },
  {
    title: "Lubricants",
    tag: "High Performance",
    desc: "Industrial lubricants engineered for peak performance across diverse applications and heavy industries.",
    img: "/categories/Lubricant_Image.jpg",
    color: "from-orange-600 to-amber-700",
    icon: "⚙️",
  },
  {
    title: "Minerals",
    tag: "Natural Resource",
    desc: "Essential minerals sourced from trusted suppliers, quality-assured for industrial and commercial use globally.",
    img: "/categories/Minerals_Image.jpg",
    color: "from-stone-600 to-slate-700",
    icon: "⛏️",
  },
  {
    title: "Custom Exports",
    tag: "Tailored",
    desc: "Bespoke export solutions for unique product requirements, backed by our reliable logistics network.",
    img: "/services/freight-forwarding.png",
    color: "from-indigo-600 to-blue-700",
    icon: "📦",
  },
];

const STATS = [
  { end: 500, suffix: "+", label: "Happy Clients", icon: Users },
  { end: 1200, suffix: "+", label: "Shipments Delivered", icon: Package },
  { end: 100, suffix: "%", label: "Satisfaction Rate", icon: Award },
  { end: 8, suffix: "+", label: "Years of Excellence", icon: Clock },
];

const CUSTOMERS = [
  "T.K.S TRADE LINKS",
  "NN BROTHER PRIVATE LTD",
  "UNITED GRANITE PVT LTD",
  "REMOSARY SOLUTIONS PVT LTD",
  "DUMOUKENS TRADING LTD",
  "GOLD STAR TRADING COMPANY",
  "CITY POINT",
  "JOYTHI STORES PTE LTD",
  "MADRAS BAZAAR",
  "MALAYSIA BUYERS",
  "G GALXY TRADERS",
  "SAMIUT TRADING COMPANY",
  "BATH MURUGAN TEMPLE",
  "SRI MARIAMMAN TEMPLE LTD",
];

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "Director, United Granite Pvt Ltd",
    country: "🇮🇳 India",
    text: "A3 Express Cargo has been our trusted export partner for over 4 years. Their attention to quality control and on-time delivery is exceptional — our granite shipments always arrive in perfect condition.",
    rating: 5,
  },
  {
    name: "Ahmad Farid",
    role: "Procurement Manager, Gold Star Trading",
    country: "🇲🇾 Malaysia",
    text: "Sourcing food products through A3 has been seamless. Their knowledge of import regulations and documentation is top-notch. Couldn't ask for a more reliable freight partner.",
    rating: 5,
  },
  {
    name: "Priya Nanthakumar",
    role: "Owner, Madras Bazaar",
    country: "🇸🇬 Singapore",
    text: "We switched to A3 Express Cargo two years ago and haven't looked back. The team is responsive, proactive, and genuinely cares about getting shipments right the first time.",
    rating: 5,
  },
  {
    name: "Thabo Dlamini",
    role: "Operations Lead, City Point",
    country: "🇿🇦 South Africa",
    text: "Receiving textile shipments from India used to be a headache. A3 simplified our entire supply chain — customs clearance, documentation, tracking. Everything is handled professionally.",
    rating: 5,
  },
  {
    name: "Mei Ling Chan",
    role: "CEO, Joythi Stores Pte Ltd",
    country: "🇸🇬 Singapore",
    text: "The consistency and transparency A3 brings to every shipment is remarkable. Real-time updates, zero surprises. They're not just a logistics company — they're a strategic partner.",
    rating: 5,
  },
];

const SLIDES = [
  {
    img: "/banner/Rice1.jpg",
    imgMobile: "/banner/Rice1_mobile.png",
    eyebrow: "Premium Global Cargo Exports",
    heading: ["Sourcing Quality,", "Delivering Worldwide."],
    sub: "Connecting global markets with premium food products, chemicals, textiles and minerals through reliable, sustainable logistics.",
  },
  {
    img: "/banner/chilli.jpg",
    imgMobile: "/banner/chilli_mobile.png",
    eyebrow: "Seamless Trade Connectivity",
    heading: ["Connecting Asia,", "Africa & Beyond."],
    sub: "Active networks across Malaysia, Singapore, Sri Lanka and South Africa — bridging local manufacturers to global buyers.",
  },
  {
    img: "/banner/onion.jpg",
    imgMobile: "/banner/onion_mobile.png",
    eyebrow: "Trust & Reliability First",
    heading: ["Sustaining Trust", "In Every Shipment."],
    sub: "Exceeding customer expectations with high-performance logistics and stringent quality control across every lane.",
  },
];

/* ════════════════════════════════════════════════════════════
   Component
════════════════════════════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const productsRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [doubled, setDoubled] = useState([]);

  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true });

  useEffect(() => {
    setDoubled([...CUSTOMERS, ...CUSTOMERS]);
  }, []);

  const scrollTo = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-white text-slate-900 overflow-hidden">

      {/* ══════════════════════════════════════════
          HERO — Full-viewport carousel
      ══════════════════════════════════════════ */}
      <section className="relative w-full h-screen h-[100svh] overflow-hidden">
        <Carousel
          showIndicators
          showStatus={false}
          showThumbs={false}
          showArrows={false}
          autoPlay
          infiniteLoop
          interval={5000}
          emulateTouch
          swipeable
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={50}
          onChange={setActiveSlide}
          className="h-full"
        >
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="relative h-screen h-[100svh] w-full"
              onClick={() => navigate("/products")}
            >
              {/* Desktop Background Image */}
              <img
                src={slide.img}
                alt={slide.heading[0]}
                className="hidden md:block absolute inset-0 w-full h-full object-cover scale-[1.03] transition-transform duration-[8000ms] hover:scale-100"
              />
              {/* Mobile Background Image */}
              <img
                src={slide.imgMobile}
                alt={slide.heading[0]}
                className="block md:hidden absolute inset-0 w-full h-full object-cover scale-[1.03] transition-transform duration-[8000ms] hover:scale-100"
              />

              {/* Overlay — stronger on mobile for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/55 to-slate-950/70 md:bg-none" />
              <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-slate-950/85 via-slate-950/60 to-slate-950/20" />

              <div className="absolute inset-0 flex items-start md:items-center pt-28 md:pt-0">
                <div className="max-w-7xl mx-auto w-full px-6 lg:px-12">
                  <div
                    className={`max-w-2xl transition-all duration-700 ${
                      activeSlide === i
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                  >
                    {/* Eyebrow */}
                    <p className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4 md:mb-5">
                      — {slide.eyebrow}
                    </p>

                    {/* Heading — bigger & bolder on mobile, center-aligned */}
                    <h1 className="text-[2.6rem] leading-[1.1] md:text-7xl font-black text-white tracking-tight mb-5 md:mb-6 text-center md:text-left">
                      {slide.heading[0]}
                      <br />
                      <span className="text-blue-400">{slide.heading[1]}</span>
                    </h1>

                    {/* Subtitle — centered on mobile */}
                    <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl text-center md:text-left">
                      {slide.sub}
                    </p>

                    {/* Buttons — auto-width, stacked on mobile */}
                    <div className="flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollTo(productsRef);
                        }}
                        className="inline-flex items-center gap-2 px-7 py-4 md:py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30"
                      >
                        Explore Products <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/contact");
                        }}
                        className="inline-flex items-center gap-2 px-7 py-4 md:py-3.5 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm text-white text-sm font-bold rounded-full border border-white/15 transition-all duration-200"
                      >
                        Get In Touch <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                <div
                  className="h-full bg-blue-500 transition-none"
                  style={{
                    width: activeSlide === i ? "100%" : "0%",
                    transition: activeSlide === i ? "width 5000ms linear" : "none",
                  }}
                />
              </div>
            </div>
          ))}
        </Carousel>

        {/* Scroll indicator — hidden on mobile (carousel dots serve that purpose) */}
        <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1 opacity-60">
          <div className="w-px h-10 bg-white/40 animate-pulse" />
          <span className="text-white/50 text-[10px] tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS — Redesigned metric cards
      ══════════════════════════════════════════ */}
      <div ref={statsRef} className="relative bg-slate-950 py-16 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{backgroundImage:"repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",backgroundSize:"20px 20px"}}
        />
        {/* Glow orbs */}
        <div className="absolute -top-20 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              const accents = [
                { border: "border-blue-500/30", glow: "bg-blue-500/10", iconBg: "bg-blue-500/20 text-blue-400", bar: "bg-blue-500" },
                { border: "border-cyan-500/30",  glow: "bg-cyan-500/10",  iconBg: "bg-cyan-500/20 text-cyan-400",  bar: "bg-cyan-500"  },
                { border: "border-indigo-500/30",glow: "bg-indigo-500/10",iconBg: "bg-indigo-500/20 text-indigo-400",bar: "bg-indigo-500"},
                { border: "border-violet-500/30",glow: "bg-violet-500/10",iconBg: "bg-violet-500/20 text-violet-400",bar: "bg-violet-500"},
              ][i];
              return (
                <div
                  key={i}
                  className={`relative group rounded-2xl border ${accents.border} bg-white/[0.03] backdrop-blur-sm p-6 overflow-hidden hover:bg-white/[0.06] transition-all duration-300`}
                >
                  {/* Corner glow */}
                  <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${accents.glow} blur-2xl group-hover:scale-150 transition-transform duration-500`} />
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-6 right-6 h-0.5 ${accents.bar} rounded-full opacity-60`} />

                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${accents.iconBg} mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none mb-2">
                    {statsInView ? (
                      <CountUp start={0} end={stat.end} duration={2.2} suffix={stat.suffix} />
                    ) : (
                      <span>0{stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs font-semibold tracking-[0.12em] uppercase">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ABOUT — Two-column
      ══════════════════════════════════════════ */}
      <section id="home-about" ref={aboutRef} className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <Reveal direction="right" className="space-y-7">
            <div>
              <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Who We Are
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Built on Trust,{" "}
                <span className="text-blue-600">Driven by Excellence</span>
              </h2>
            </div>

            <div className="w-12 h-0.5 bg-blue-600" />

            <div className="space-y-4 text-slate-600 text-[17px] leading-relaxed">
              <p>
                A3 Express Cargo is a certified exporter providing global services
                with a strong presence in Malaysia, Singapore, Sri Lanka, and South
                Africa. Founded in 2016, our mission is to exceed customer
                expectations through sustainable practices.
              </p>
              <p>
                We are committed to offering top-notch services and ensuring
                complete customer satisfaction with a focus on quality and
                affordability.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              {[
                { icon: ShieldCheck, label: "Certified Exporter" },
                { icon: Globe, label: "4+ Countries" },
                { icon: Zap, label: "Est. 2016" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700 text-xs font-semibold">{label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/about")}
              className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors group"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>

          {/* Image */}
          <Reveal direction="left" delay={100} className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-blue-600/8 border border-blue-200/40" />
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-slate-200">
              <img
                src="/about.avif"
                alt="A3 Express Cargo operations"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src = "/categories/FoodProducts.jpg";
                }}
              />
              <div className="absolute bottom-5 left-5 flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                    Certified Exporter
                  </p>
                  <p className="text-slate-900 text-sm font-bold">Globally Trusted</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCTS — Clean card grid
      ══════════════════════════════════════════ */}
      <section ref={productsRef} className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <Reveal direction="right">
              <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Our Portfolio
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                What We Export
              </h2>
            </Reveal>
            <Reveal direction="left">
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group shrink-0"
              >
                View All Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.title} direction="up" delay={i * 80}>
                <div
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredProduct(i)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() => navigate("/products")}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-black/40 backdrop-blur-sm border border-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {product.tag}
                    </span>
                    <div className="absolute bottom-3 left-4 text-2xl">{product.icon}</div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                      {product.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-blue-600 text-sm font-semibold">
                      View Details
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CLIENTS MARQUEE
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-white border-t border-slate-100">
        <Reveal className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Trusted By
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900">
            Our Valued Clients
          </h2>
        </Reveal>

        <div className="marquee-container">
          <div className="marquee-content gap-3">
            {doubled.map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold whitespace-nowrap hover:border-blue-300 hover:text-blue-600 transition-colors duration-200 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GLOBAL REACH — Dark section
      ══════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left — text */}
          <Reveal direction="right" className="space-y-7">
            <div>
              <p className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Global Reach
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Our Global{" "}
                <span className="text-blue-400">Trade Network</span>
              </h2>
            </div>

            <div className="w-12 h-0.5 bg-blue-500" />

            <p className="text-slate-400 text-lg leading-relaxed">
              Our trade network spans continents, connecting businesses and
              creating opportunities. We facilitate seamless global commerce
              through strategic partnerships and proven logistics expertise.
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  icon: Globe,
                  title: "Southeast Asian Hub",
                  desc: "Active operations across Malaysia & Singapore.",
                  accent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                },
                {
                  icon: MapPin,
                  title: "Indian Ocean & Africa",
                  desc: "Trusted shipping in Sri Lanka & South Africa.",
                  accent: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                },
              ].map(({ icon: Icon, title, desc, accent }) => (
                <div
                  key={title}
                  className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-white/15 transition-all duration-200"
                >
                  <div className={`p-2.5 rounded-lg border ${accent} flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{title}</h4>
                    <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Start Trading With Us <ArrowRight className="w-4 h-4" />
            </button>
          </Reveal>

          {/* Right — map image */}
          <Reveal direction="left" delay={100}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 group">
              <img
                src="/global_trade_map.png"
                alt="Global Trade Map"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-slate-950/80 backdrop-blur-sm border border-emerald-500/20 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Live Operations
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Decorative large quote */}
        <div className="absolute top-8 right-8 text-[200px] font-black text-slate-100 leading-none select-none pointer-events-none" aria-hidden>
          "
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Reveal className="mb-14">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Client Stories
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                What Our Clients Say
              </h2>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Trusted by businesses across Asia and Africa for reliable, quality-first logistics.
              </p>
            </div>
          </Reveal>

          {/* Cards grid — primary featured + side cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured large card */}
            <Reveal direction="left" className="lg:col-span-1 lg:row-span-2">
              <div className="h-full bg-slate-950 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[340px]">
                {/* Glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-indigo-600/15 rounded-full blur-3xl" />

                {/* Stars */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: TESTIMONIALS[0].rating }).map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>

                <blockquote className="text-white/90 text-lg leading-relaxed font-medium relative z-10 flex-grow">
                  "{TESTIMONIALS[0].text}"
                </blockquote>

                <div className="mt-8 flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {TESTIMONIALS[0].name[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{TESTIMONIALS[0].name}</p>
                    <p className="text-slate-400 text-xs">{TESTIMONIALS[0].role}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{TESTIMONIALS[0].country}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Regular cards */}
            {TESTIMONIALS.slice(1).map((t, i) => (
              <Reveal key={i} direction="up" delay={i * 80}>
                <div className="group bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:-translate-y-1 rounded-2xl p-6 transition-all duration-300 h-full flex flex-col justify-between">
                  {/* Stars */}
                  <div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <svg key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      ))}
                    </div>
                    <blockquote className="text-slate-600 text-sm leading-relaxed">
                      "{t.text}"
                    </blockquote>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-sm">{t.name}</p>
                      <p className="text-slate-400 text-xs">{t.role} · {t.country}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Trust bar */}
          <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {[
              { label: "Average Rating", value: "5.0 ★" },
              { label: "Repeat Clients", value: "94%" },
              { label: "On-Time Delivery", value: "98%" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-slate-900">{value}</p>
                <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase mt-0.5">{label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="bg-blue-600 py-20 px-6">
        <Reveal className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Ready to Ship Globally?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Partner with A3 Express Cargo for reliable, quality-assured exports
            to markets across Asia and Africa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3.5 bg-white text-blue-600 font-bold text-sm rounded-full hover:bg-blue-50 transition-colors shadow-lg"
            >
              Get a Free Quote
            </button>
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-bold text-sm rounded-full hover:bg-white/10 transition-colors"
            >
              Browse Products
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;