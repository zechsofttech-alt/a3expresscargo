import React from "react";
import { Facebook, Linkedin, MessageCircle, Mail, Phone, MapPin, ChevronRight, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/918825430312', '_blank');
  };

  return (
    <footer className="bg-slate-950 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 text-slate-400 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle bottom decorative light glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Brand Profile */}
          <div className="space-y-6">
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <h3 className="text-2xl font-black text-white tracking-tight">
                A3 <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">EXPRESS CARGO</span>
              </h3>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed text-justify">
              Founded in 2016, A3 Express Cargo is a certified exporter providing global services with a strong presence in Malaysia, Singapore, Sri Lanka, and South Africa. Sourcing quality, delivering excellence.
            </p>

            {/* Social Links Panel */}
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://www.facebook.com/profile.php?id=100069582494908&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Connect on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/a3-express-cargo-9a6199343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Connect on Linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <button
                onClick={handleWhatsApp}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all duration-300 hover:-translate-y-1"
                aria-label="Connect on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Column 2 - Operational Expertise */}
          <div className="space-y-6">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-l-2 border-l-blue-500 pl-3">
              Export Operations
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors duration-200 cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Fresh & Packaged Food Exports</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors duration-200 cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Industrial Chemicals & Textiles</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors duration-200 cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>High-Performance Lubricants</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors duration-200 cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Industrial & Commercial Minerals</span>
              </li>
            </ul>
          </div>

          {/* Column 3 - Quick Navigation */}
          <div className="space-y-6">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-l-2 border-l-blue-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/products" 
                  className="group flex items-center gap-1 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <span>Our Products</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="group flex items-center gap-1 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <span>Our Services</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="group flex items-center gap-1 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="group flex items-center gap-1 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-l-2 border-l-blue-500 pl-3">
              Contact Us
            </h4>
            <div className="space-y-4 text-sm leading-relaxed">
              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-[11px] uppercase tracking-wider">Email Support</h5>
                  <a 
                    href="mailto:a3expresscargo@gmail.com" 
                    className="hover:text-blue-400 transition-colors mt-0.5 block text-xs"
                  >
                    a3expresscargo@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-[11px] uppercase tracking-wider">Phone Support</h5>
                  <a 
                    href="tel:+918825430312" 
                    className="hover:text-blue-400 transition-colors mt-0.5 block text-xs"
                  >
                    +91 8825430312 , +91 4445564131
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-[11px] uppercase tracking-wider">Our Address</h5>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Old No.127, New No.20, New Street, Mannady, Chennai-600001, Tamil Nadu, India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fine-Border Copyright Bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span>© {new Date().getFullYear()} A3 Express Cargo. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 tracking-wide uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Connecting Local Excellence to Global Markets</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
