import React, { useState, useEffect } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Portofolio", label: "Portfolio" },
    { href: "#Services", label: "Services" },
    { href: "#Contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems
        .map((item) => {
          const section = document.querySelector(item.href);
          if (section) {
            return {
              id: item.href.replace("#", ""),
              offset: section.offsetTop - 180,
              height: section.offsetHeight,
            };
          }
          return null;
        })
        .filter(Boolean);

      const currentPosition = window.scrollY;

      const active = sections.find(
        (section) =>
          currentPosition >= section.offset &&
          currentPosition < section.offset + section.height
      );

      if (active) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);

    if (section) {
      const top = section.offsetTop - 80;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#030014]/70 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-[5%] lg:px-[10%]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#Home"
            onClick={(e) => scrollToSection(e, "#Home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/8 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-all">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>

            <div>
              <p className="text-white font-black text-sm uppercase tracking-[0.18em] leading-none">
                Amal Cyber Lab
              </p>
              <p className="text-slate-500 text-[9px] uppercase tracking-[0.28em] mt-1">
                Security Portfolio
              </p>
            </div>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="relative px-3 py-1.5 group"
                >
                  <span
                    className={`relative z-10 text-sm font-bold uppercase tracking-widest transition-all ${
                      isActive
                        ? "text-emerald-400"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>

                  <span
                    className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-emerald-500/8 border border-emerald-500/20"
                        : "bg-transparent group-hover:bg-white/5"
                    }`}
                  />

                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-emerald-400 transition-all duration-300 ${
                      isActive ? "w-5" : "w-0 group-hover:w-6"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-2xl bg-[#0a0f1a]/95 border border-white/10 backdrop-blur-xl p-4 space-y-3">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.substring(1);

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
                style={{
                  transitionDelay: `${index * 70}ms`,
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;