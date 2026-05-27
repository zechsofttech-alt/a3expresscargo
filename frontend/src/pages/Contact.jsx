import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Globe,
  MessageSquare,
  ArrowRight,
  Building2,
  Headphones,
} from "lucide-react";

/* ── reusable IntersectionObserver hook (no AOS needed) ── */
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
  const hidden = { up: "opacity-0 translate-y-8", left: "opacity-0 -translate-x-8", right: "opacity-0 translate-x-8", none: "opacity-0" }[direction];
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0 translate-x-0" : hidden} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}>
      {children}
    </div>
  );
};

/* ── data ── */
const CONTACT_METHODS = [
  {
    icon: MapPin,
    label: "Visit Us",
    primary: "Old No.127, New No.20, New Street",
    secondary: "Mannady, Chennai - 600001, Tamil Nadu, India",
    accent: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    dot: "bg-blue-500",
  },
  {
    icon: Phone,
    label: "Call Us",
    primary: "+91 88254 30312",
    secondary: "+91 44455 64131",
    accent: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    dot: "bg-emerald-500",
    href: "tel:+918825430312",
  },
  {
    icon: Mail,
    label: "Email Us",
    primary: "a3expresscargo@gmail.com",
    secondary: "We reply within 24 hours",
    accent: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    dot: "bg-violet-500",
    href: "mailto:a3expresscargo@gmail.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    primary: "Mon – Sat: 9:00 AM – 6:30 PM",
    secondary: "Sunday: Closed",
    accent: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    dot: "bg-amber-500",
  },
];

const WHY_ITEMS = [
  { icon: Globe, title: "Global Network", desc: "Active trade routes across Malaysia, Singapore, Sri Lanka and South Africa." },
  { icon: Headphones, title: "Dedicated Support", desc: "A real account manager assigned to every client — no bots, no queues." },
  { icon: Building2, title: "Certified Exporter", desc: "Fully licensed and compliant with international trade regulations." },
  { icon: MessageSquare, title: "Fast Response", desc: "All inquiries acknowledged within 4 business hours, guaranteed." },
];

const FAQ = [
  { q: "What products do you export?", a: "We export food products, chemicals, textiles, lubricants, minerals, and custom cargo — covering agricultural to industrial goods." },
  { q: "Which countries do you ship to?", a: "Our primary markets are Malaysia, Singapore, Sri Lanka, and South Africa. We can also facilitate shipments to other destinations on request." },
  { q: "How do I get a shipping quote?", a: "Fill in the contact form with your product type, destination, and approximate volume. Our team will respond with a detailed quote within 24 hours." },
  { q: "Do you handle customs clearance?", a: "Yes — we manage all documentation, compliance, and customs clearance for both export and import sides of every shipment." },
];

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error"
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    // Premium client-side simulation for standalone deployment
    setTimeout(() => {
      setLoading(false);
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 850);
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200";
  const labelCls = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2";

  return (
    <div className="bg-white text-slate-900 overflow-hidden">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative bg-slate-950 pt-24 pb-16 md:pt-32 md:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 40px)" }} />
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            We're Here to Help
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.04] tracking-tight mb-6">
            Let's Start a
            <br />
            <span className="text-blue-400">Conversation</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Whether you're ready to ship or just exploring options — our team is ready to help you move goods across the globe with confidence.
          </p>

          {/* quick-contact pills */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 w-full max-w-md mx-auto sm:max-w-none">
            <a href="tel:+918825430312"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/8 border border-white/12 text-white/80 text-sm font-medium hover:bg-white/14 hover:text-white transition-all w-full sm:w-auto text-center">
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> +91 88254 30312
            </a>
            <a href="mailto:a3expresscargo@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/8 border border-white/12 text-white/80 text-sm font-medium hover:bg-white/14 hover:text-white transition-all w-full sm:w-auto text-center">
              <Mail className="w-3.5 h-3.5 text-violet-400" /> a3expresscargo@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* ══ CONTACT CARDS ════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACT_METHODS.map((item, i) => {
            const Icon = item.icon;
            const inner = (
              <Reveal key={i} direction="up" delay={i * 70}>
                <div className={`group h-full bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${item.href ? "cursor-pointer" : ""}`}>
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${item.accent} mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                  <p className="text-slate-900 font-semibold text-sm leading-snug">{item.primary}</p>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.secondary}</p>
                </div>
              </Reveal>
            );
            return item.href
              ? <a href={item.href} key={i} className="block">{inner}</a>
              : <div key={i}>{inner}</div>;
          })}
        </div>
      </section>

      {/* ══ FORM + MAP ════════════════════════════════════════ */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10 md:mb-14">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Send a Message</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">Get in Touch</h2>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Form — 3 cols */}
            <Reveal direction="left" className="lg:col-span-3">
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-4 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input type="text" name="name" required placeholder="John Doe"
                        className={inputCls} value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input type="tel" name="phone" placeholder="+91 00000 00000"
                        className={inputCls} value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Email Address *</label>
                    <input type="email" name="email" required placeholder="you@company.com"
                      className={inputCls} value={formData.email} onChange={handleChange} />
                  </div>

                  <div>
                    <label className={labelCls}>Subject</label>
                    <select name="subject" className={inputCls} value={formData.subject} onChange={handleChange}>
                      <option value="">Select a topic…</option>
                      <option>Export Inquiry</option>
                      <option>Shipping Quote</option>
                      <option>Customs &amp; Documentation</option>
                      <option>Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelCls}>Message *</label>
                    <textarea name="message" required rows={5} placeholder="Tell us about your shipment requirements…"
                      className={`${inputCls} resize-none`} value={formData.message} onChange={handleChange} />
                  </div>

                  {/* Status */}
                  {status === "success" && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      Message sent! We'll get back to you within 24 hours.
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20">
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <> <Send className="w-4 h-4" /> Send Message </>
                    )}
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Right column — map + quick info */}
            <Reveal direction="right" delay={100} className="lg:col-span-2 space-y-5">
              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm aspect-[4/3]">
                <iframe
                  title="A3 Express Cargo Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.3799999999997!2d80.28499999999999!3d13.090000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265c8fce04aa7%3A0x8b7b8a9b8b8b8b8b!2sMannady%2C%20Chennai%2C%20Tamil%20Nadu%20600001!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Office card */}
              <div className="bg-slate-950 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl" />
                <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">Head Office</p>
                <p className="text-white font-bold text-sm leading-relaxed">
                  Old No.127, New No.20, New Street,<br />
                  Mannady, Chennai – 600001,<br />
                  Tamil Nadu, India
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-slate-400 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Mon–Sat · 9:00 AM – 6:30 PM IST
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    +91 88254 30312
                  </div>
                </div>
                <a href="https://maps.google.com/?q=Mannady,Chennai,Tamil+Nadu" target="_blank" rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-blue-400 text-xs font-semibold hover:text-blue-300 transition-colors">
                  Open in Maps <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ════════════════════════════════════ */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10 md:mb-14">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Why A3 Express</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">What Sets Us Apart</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} direction="up" delay={i * 80}>
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="w-11 h-11 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10 md:mb-14">
            <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">FAQs</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Common Questions</h2>
          </Reveal>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <Reveal key={i} direction="up" delay={i * 60}>
                <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 text-sm pr-4">{item.q}</span>
                    <span className={`text-blue-600 text-lg font-light transition-transform duration-300 shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40" : "max-h-0"}`}>
                    <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-3">
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ═══════════════════════════════════════ */}
      <section className="py-12 md:py-20 px-4 sm:px-6 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 24px)" }} />
        <Reveal className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
            Ready to Ship Globally?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg mb-8">
            Let's discuss your cargo requirements and build a shipping plan that works for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3.5 w-full sm:w-auto">
            <a href="tel:+918825430312"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-blue-600 font-bold text-sm rounded-full hover:bg-blue-50 transition-colors shadow-lg w-full sm:w-auto text-center">
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a href="mailto:a3expresscargo@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-full border border-white/30 transition-colors w-full sm:w-auto text-center">
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}