import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Globe, Warehouse, Ship, Building2, Package2, Box, ArrowRight } from 'lucide-react';

/* ── Custom IntersectionObserver hooks (no external AOS needed) ── */
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

const ShippingServices = () => {
  const services = [
    {
      title: "Logistics Management",
      description: "A3 Express Cargo offers efficient and highly reliable logistics management services. We seamlessly optimize routes, consolidate cargo, and handle transit operations to streamline your product flow.",
      imageSrc: "/services/Logistics.jpg",
      backgroundColor: "bg-blue-50/70 border border-blue-100",
      icon: Package2,
      highlights: ["Fast Delivery", "Real-time Tracking", "24/7 Priority Support"],
      iconColor: "text-blue-600 bg-blue-50 border border-blue-100"
    },
    {
      title: "International Shipping",
      description: "Ship across the border to 220+ countries and territories with end-to-end support. Our active trade channels securely bridge your goods between India, Southeast Asia, and Africa.",
      imageSrc: "/services/world_wide.png",
      backgroundColor: "bg-indigo-50/70 border border-indigo-100",
      icon: Globe,
      highlights: ["Malaysia & Singapore Hubs", "Express Air Delivery", "Customs clearance"],
      iconColor: "text-indigo-600 bg-indigo-50 border border-indigo-100"
    },
    {
      title: "Warehousing Solutions",
      description: "We offer state-of-the-art secure warehousing solutions designed to meet the dynamic needs of modern businesses. Features advanced inventory tracking and climate control systems.",
      imageSrc: "/services/warehouse.jpg",
      backgroundColor: "bg-orange-50/70 border border-orange-100",
      icon: Warehouse,
      highlights: ["Secured 24/7 Storage", "Inventory Management", "Climate-Controlled Units"],
      iconColor: "text-orange-600 bg-orange-50 border border-orange-100"
    },
    {
      title: "Freight Forwarding",
      description: "Global freight forwarding services at highly competitive rates. We handle complete documentation, consolidation, and booking for air, sea, and land cargo channels.",
      imageSrc: "/services/freight-forwarding.png",
      backgroundColor: "bg-emerald-50/70 border border-emerald-100",
      icon: Ship,
      highlights: ["Air & Ocean Freight", "Customs Brokerage", "Door-to-Door Delivery"],
      iconColor: "text-emerald-600 bg-emerald-50 border border-emerald-100"
    },
    {
      title: "Trade Consulting",
      description: "Our consulting services ensure that your business navigates the complexities of international trade with absolute ease. We analyze compliance, tariffs, duties, and risk factors.",
      imageSrc: "/services/consulting.jpg",
      backgroundColor: "bg-purple-50/70 border border-purple-100",
      icon: Building2,
      highlights: ["Export/Import Advice", "Trade Compliance Audits", "Custom Duty Optimization"],
      iconColor: "text-purple-600 bg-purple-50 border border-purple-100"
    },
    {
      title: "Superior Export Packing",
      description: "A3 Express Cargo offers superior cargo packing services to guarantee the safety of your items during transit. Custom packaging, crating, and padding optimized for ocean and air export.",
      imageSrc: "/services/packing.png",
      backgroundColor: "bg-amber-50/70 border border-amber-100",
      icon: Box,
      highlights: ["Heavy-Duty Crating", "Fragile & Hazardous Care", "Eco-friendly Materials"],
      iconColor: "text-amber-600 bg-amber-50 border border-amber-100"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      
      {/* ══ HERO SECTION ════════════════════════════════════ */}
      <section className="relative bg-slate-950 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 lg:pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 40px)" }} />
        {/* Pulsing glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-0 sm:px-2 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              <Reveal className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Trusted by 500+ Businesses
              </Reveal>
              
              <Reveal delay={100}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.08] tracking-tight">
                  Global Logistics
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                    Redefined.
                  </span>
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="text-slate-400 text-base sm:text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Delivering uncompromising excellence across international borders with compliant supply chains, custom sourcing, and door-to-door transit reliability.
                </p>
              </Reveal>
            </div>
            
            {/* Hero Right Column (5 cols) — hidden on very small screens */}
            <Reveal direction="right" delay={150} className="lg:col-span-5 hidden sm:flex justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/8 p-4 sm:p-6 shadow-2xl flex items-center justify-center group">
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/8 transition-colors duration-500" />
                <div className="w-full h-full relative z-10">
                  <DotLottieReact
                    src="https://lottie.host/8fac0def-193a-4fe9-95bf-eaece6b64f5c/X6QuY9OvJh.lottie"
                    autoplay
                    loop
                    style={{ height: '100%', width: '100%' }}
                  />
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══ SERVICES SECTION ════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Heading */}
        <Reveal className="text-center mb-10 sm:mb-14 lg:mb-16 space-y-3 sm:space-y-4">
          <p className="text-blue-600 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase">Our Capabilities</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            End-To-End Cargo Solutions
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive shipping, packing, warehousing, and custom brokerage solutions tailored for international trade.
          </p>
        </Reveal>

        {/* Services List with scroll revealing */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            return (
              <Reveal 
                key={service.title} 
                direction={isEven ? "left" : "right"} 
                delay={index * 80}
                className="group cursor-pointer"
              >
                <div
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-5 sm:gap-8 lg:gap-12 p-5 sm:p-7 lg:p-10 rounded-3xl lg:rounded-[32px] transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${service.backgroundColor}`}
                >
                  {/* Text Column */}
                  <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl shrink-0 shadow-sm flex items-center justify-center ${service.iconColor}`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 group-hover:text-blue-700 transition-colors leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* highlights */}
                    <div className="flex flex-wrap gap-2">
                      {service.highlights.map((highlight, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white rounded-full text-[11px] sm:text-xs font-semibold text-slate-700 shadow-sm border border-slate-100/50"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Image Column */}
                  <div className="w-full lg:w-1/2 overflow-hidden rounded-xl sm:rounded-2xl aspect-video sm:aspect-[1.7] shadow-md border border-slate-100 group-hover:shadow-lg transition-shadow">
                    <img
                      src={service.imageSrc}
                      alt={service.title}
                      className="w-full h-full object-cover transform duration-[700ms] group-hover:scale-105"
                    />
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ══ BOTTOM CTA BANNER ═══════════════════════════════ */}
      <section className="bg-blue-600 py-14 sm:py-20 px-5 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 24px)" }} />
        <Reveal className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4">
            Need Custom Shipping Frameworks?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
            From bulk industrial cargo to farm-fresh food packaging, we coordinate seamless, compliant trade pathways for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-blue-600 font-bold text-sm rounded-full hover:bg-blue-50 transition-colors shadow-lg">
              Talk to an Expert <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default ShippingServices;
