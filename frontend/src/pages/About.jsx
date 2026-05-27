import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Globe, 
  Users, 
  Award, 
  Target, 
  Compass, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Package,
  Layers
} from "lucide-react";

/* ── Custom Milestones matching actual timeline (Established in 2016) ── */
const timelineEvents = [
  {
    year: "2025",
    title: "Global Export Leader",
    description:
      "Established as a premier merchant exporter, regularly delivering Grade-A products to 500+ global clients and businesses.",
    icon: "🏆",
    color: "#3B82F6",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    year: "2021",
    title: "Expanding African Network",
    description:
      "Successfully launched logistics corridors into South Africa, exporting high-demand textiles and minerals alongside food products.",
    icon: "🌍",
    color: "#8B5CF6",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    year: "2018",
    title: "Southeast Asian Presence",
    description:
      "Solidified our trade presence in Singapore and Malaysia, establishing robust supply chains for high-quality food cargo.",
    icon: "🇸🇬",
    color: "#10B981",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    year: "2016",
    title: "Company Foundation",
    description:
      "A3 Express Cargo was founded in Mannady, Chennai, India, with a core mission to connect local quality producers with international buyers.",
    icon: "🚛",
    color: "#EC4899",
    bg: "bg-pink-50",
    border: "border-pink-200",
  },
];

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Quality",
    desc: "We ensure every shipment passes rigorous Grade-A quality control standards. From farm-fresh produce to industrial goods, excellence is guaranteed.",
    color: "text-blue-600 bg-blue-50 border-blue-100"
  },
  {
    icon: Globe,
    title: "Compliant Trade",
    desc: "A fully licensed, certified exporter. We adhere to local and international customs, tax regulations, and trade compliance standards in every corridor.",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100"
  },
  {
    icon: TrendingUp,
    title: "Logistical Efficiency",
    desc: "Sustaining trust in every shipment. We optimize trade routes to deliver custom cargo on schedule across Asia, Africa, and beyond.",
    color: "text-violet-600 bg-violet-50 border-violet-100"
  },
  {
    icon: Users,
    title: "Customer Partnership",
    desc: "We assign dedicated account specialists to every customer. We offer 24/7 transparent tracking and reliable full-service trade support.",
    color: "text-amber-600 bg-amber-50 border-amber-100"
  }
];

/* ── Reusable scroll reveal hooks & components (no external AOS needed) ── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
};

const Reveal = ({ children, direction = "up", delay = 0, className = "" }) => {
  const { ref, inView } = useInView();
  const hidden = { 
    up: "opacity-0 translate-y-8", 
    left: "opacity-0 -translate-x-8", 
    right: "opacity-0 translate-x-8", 
    none: "opacity-0" 
  }[direction];
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0 translate-x-0" : hidden} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}>
      {children}
    </div>
  );
};

const TimelineItem = ({ event, index }) => {
  const { ref, inView } = useInView(0.15);
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center w-full mb-12 transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Left side */}
      <div className={`w-5/12 ${isLeft ? "pr-8 text-right" : ""}`}>
        {isLeft ? (
          <Card event={event} />
        ) : (
          <span className="text-2xl font-bold text-slate-300">{event.year}</span>
        )}
      </div>

      {/* Center dot */}
      <div className="w-2/12 flex justify-center">
        <div
          className={`relative z-10 flex items-center justify-center w-14 h-14 rounded-full shadow-lg text-2xl border-4 border-white`}
          style={{ background: event.color }}
        >
          {event.icon}
        </div>
      </div>

      {/* Right side */}
      <div className={`w-5/12 ${!isLeft ? "pl-8" : "text-left"}`}>
        {!isLeft ? (
          <Card event={event} />
        ) : (
          <span className="text-2xl font-bold text-slate-300">{event.year}</span>
        )}
      </div>
    </div>
  );
};

const Card = ({ event }) => (
  <div
    className={`group rounded-2xl p-5 border ${event.border} ${event.bg} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
  >
    <div className="flex items-center gap-2 mb-1">
      <span
        className="text-xs font-semibold px-2.5 py-0.5 rounded-full text-white"
        style={{ background: event.color }}
      >
        {event.year}
      </span>
    </div>
    <h3 className="text-lg font-bold text-slate-900 mt-2">{event.title}</h3>
    <p className="text-slate-600 mt-2 text-sm leading-relaxed">
      {event.description}
    </p>
  </div>
);

/* Mobile single-column timeline */
const MobileTimelineItem = ({ event, index }) => {
  const { ref, inView } = useInView(0.15);

  return (
    <div
      ref={ref}
      className={`relative pl-10 pb-8 transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Vertical line */}
      {index < timelineEvents.length - 1 && (
        <div className="absolute left-[18px] top-12 bottom-0 w-0.5 bg-slate-200" />
      )}

      {/* Dot */}
      <div
        className="absolute left-0 top-0 w-9 h-9 rounded-full flex items-center justify-center text-lg border-4 border-white shadow-md"
        style={{ background: event.color }}
      >
        {event.icon}
      </div>

      <Card event={event} />
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      
      {/* ══ HERO SECTION ════════════════════════════════════ */}
      <section className="relative bg-slate-950 pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 40px)" }} />
        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <Reveal className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Discover Our Story
          </Reveal>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Connecting Markets,
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">Sustaining Trust</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded in 2016 in Chennai, India, A3 Express Cargo is a licensed merchant exporter providing global trade operations with uncompromising quality and robust logistics frameworks.
          </p>
        </div>
      </section>

      {/* ══ NARRATIVE + VISION/MISSION ══════════════════════ */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative Story (7 cols) */}
          <Reveal direction="left" className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Who We Are</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                Empowering Global Commerce From Chennai to the World
              </h2>
            </div>
            
            <div className="w-12 h-1 bg-blue-600 rounded-full" />

            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                From our strategic head office in Mannady, Chennai, A3 Express Cargo has established a vital trade link connecting high-grade local agricultural and industrial producers with dynamic markets across **Malaysia, Singapore, Sri Lanka, and South Africa**.
              </p>
              <p>
                As a fully certified and licensed merchant exporter, we manage a diverse trade portfolio spanning quality **Food Products, Chemicals, Textiles, Lubricants, and Minerals**. Every single category is handled with deep industrial compliance, ensuring complete export transparency and Grade-A standards.
              </p>
              <p>
                Our core strength lies in custom sourcing and end-to-end logistics solutions. Rather than offering basic transport, we establish durable trade partnerships based on competitive pricing, prompt timelines, and strict adherence to international shipping laws.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-5 text-slate-800 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                Government Certified Exporter
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                Strict Quality Inspections
              </div>
            </div>
          </Reveal>

          {/* Vision & Mission Cards (5 cols) */}
          <Reveal direction="right" delay={100} className="lg:col-span-5 space-y-5">
            {/* Vision Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-600/5 rounded-full blur-xl group-hover:scale-125 transition-transform" />
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-blue-600 text-white rounded-2xl shrink-0 shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Our Vision</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To be the most reliable and innovative global trade partner out of India, fostering sustainable and mutually beneficial merchant export operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-600/5 rounded-full blur-xl group-hover:scale-125 transition-transform" />
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-violet-600 text-white rounded-2xl shrink-0 shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Our Mission</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To deliver uncompromised Grade-A quality in food, textiles, chemicals, and industrial goods on time, while offering complete logistics transparency and top-tier support.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══ CORE VALUES SECTION ═════════════════════════════ */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10 md:mb-14">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Core Pillars</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">What Drives A3 Cargo</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <Reveal key={i} direction="up" delay={i * 80}>
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 ${val.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mb-3">{val.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ MILESTONES (TIMELINE) SECTION ═══════════════════ */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          
          <Reveal className="text-center mb-10 md:mb-16">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Company Progress</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Our Milestones</h2>
          </Reveal>

          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-200" />
            {timelineEvents.map((event, index) => (
              <TimelineItem key={index} event={event} index={index} />
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden">
            {timelineEvents.map((event, index) => (
              <MobileTimelineItem key={index} event={event} index={index} />
            ))}
          </div>

        </div>
      </section>

      {/* ══ BOTTOM CUSTOM CTA ═══════════════════════════════ */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-slate-950 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[250px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 py-2">
          <Reveal direction="left" className="text-center lg:text-left space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Ready to Partner With Us?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Whether you need to secure food products, chemical shipments, or bespoke textiles — our trade experts are standing by to engineer a shipping plan for you.
            </p>
          </Reveal>
          
          <Reveal direction="right" delay={100} className="w-full lg:w-auto shrink-0">
            <div className="flex flex-col sm:flex-row gap-3.5 w-full justify-center">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-lg shadow-blue-600/25 w-full lg:w-auto text-center">
                Get a Free Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white text-sm font-semibold rounded-full border border-white/20 transition-all duration-200 w-full lg:w-auto text-center">
                Browse Products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default About;