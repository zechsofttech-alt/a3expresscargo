import React, { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Info,
  Truck,
  Package,
  PhoneCall,
  ChevronRight,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/services", label: "Services", icon: Truck },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: PhoneCall },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (diff < -4 || currentY < 60) {
        setIsVisible(true);
      } else if (diff > 4 && currentY > 80) {
        setIsVisible(false);
        setIsOpen(false);
      }

      setIsScrolled(currentY > 40);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav
        className={`w-full transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-slate-950/95 backdrop-blur-xl shadow-xl shadow-black/25 border-b border-white/[0.07]"
            : "bg-slate-950 border-b border-white/[0.05] md:border-b-0 md:bg-gradient-to-b md:from-black/55 md:via-black/20 md:to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[90px] md:h-[80px] flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 group">
            <img
              src="/logo.png"
              alt="A3 Cargo"
              className="h-24 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <link.icon className="w-3.5 h-3.5 shrink-0" />
                  {link.label}
                </Link>
              );
            })}

            {/* CTA */}
            <Link
              to="/contact"
              className="ml-4 px-5 py-2 bg-white text-slate-900 rounded-full text-sm font-bold hover:bg-blue-50 active:scale-95 transition-all duration-150 shadow-sm"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-white transition-colors hover:bg-white/10 active:bg-white/20"
            aria-label="Toggle menu"
          >
            <span
              className={`transition-all duration-200 ${
                isOpen ? "rotate-90 opacity-100" : "rotate-0 opacity-100"
              }`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </span>
          </button>
        </div>

        {/* Mobile drawer */}
        <Transition
          show={isOpen}
          enter="transition-all duration-300 ease-out"
          enterFrom="opacity-0 -translate-y-3 scale-95"
          enterTo="opacity-100 translate-y-0 scale-100"
          leave="transition-all duration-200 ease-in"
          leaveFrom="opacity-100 translate-y-0 scale-100"
          leaveTo="opacity-0 -translate-y-3 scale-95"
        >
          <div className="mx-3 mb-3 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/98 backdrop-blur-2xl shadow-2xl shadow-black/40">
            {/* Links */}
            <div className="p-2 space-y-0.5">
              {NAV_LINKS.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-150 ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-white/65 hover:bg-white/7 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon
                        className={`w-4 h-4 ${
                          active ? "text-white" : "text-white/35"
                        }`}
                      />
                      <span className="font-medium text-sm">{link.label}</span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 ${
                        active ? "text-white/70" : "text-white/15"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Divider + CTA */}
            <div className="mx-3 mb-3 pt-2 border-t border-white/[0.07]">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full py-3 mt-1 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-blue-900/30"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
};

export default Navbar;