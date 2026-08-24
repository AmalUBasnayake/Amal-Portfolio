import React, { useEffect, useState } from "react";
import { Menu, X, ShieldCheck, ChevronRight } from "lucide-react";

const navItems = [
  { href: "#Home", label: "Home" },
  { href: "#About", label: "About" },
  { href: "#Portfolio", label: "Portfolio" },
  { href: "#Insights", label: "Insights" },
  { href: "#Services", label: "Services" },
  { href: "#Contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  /* ============================================================
     SCROLL STATE + ACTIVE SECTION
  ============================================================ */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        setScrolled(scrollY > 20);

        const sections = navItems
          .map((item) => {
            const section = document.querySelector(item.href);

            if (!section) return null;

            return {
              id: item.href.substring(1),
              offset: section.offsetTop - 160,
              height: section.offsetHeight,
            };
          })
          .filter(Boolean);

        const currentSection = sections.find(
          (section) =>
            scrollY >= section.offset &&
            scrollY < section.offset + section.height
        );

        if (currentSection) {
          setActiveSection(currentSection.id);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ============================================================
     MOBILE BODY LOCK
  ============================================================ */

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ============================================================
     SECTION NAVIGATION
  ============================================================ */

  const scrollToSection = (event, href) => {
    event.preventDefault();

    const section = document.querySelector(href);

    if (section) {
      const navbarOffset = 76;
      const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        navbarOffset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });

      setActiveSection(href.substring(1));
    }

    setIsOpen(false);
  };

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.07] bg-[#030014]/85 shadow-[0_12px_45px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      {/* ========================================================
          AMBIENT NAVBAR LINE
      ========================================================= */}

      <div
        className={`pointer-events-none absolute bottom-0 left-1/2 h-px -translate-x-1/2 transition-all duration-700 ${
          scrolled
            ? "w-full bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
            : "w-0"
        }`}
      />

      {/* ========================================================
          NAV CONTAINER
      ========================================================= */}

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[5%] xl:px-[7%]">
        <div className="flex h-[68px] items-center justify-between gap-4">
          {/* ====================================================
              BRAND
          ==================================================== */}

          <a
            href="#Home"
            onClick={(event) => scrollToSection(event, "#Home")}
            aria-label="Amal Cyber Lab — Home"
            className="group flex shrink-0 items-center gap-2.5 outline-none"
          >
            {/* Shield */}
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-400/40 group-hover:bg-emerald-400/[0.10] group-focus-visible:ring-2 group-focus-visible:ring-emerald-400">
              <div className="absolute inset-0 rounded-xl bg-emerald-400/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

              <ShieldCheck
                size={17}
                strokeWidth={1.8}
                className="relative text-emerald-400"
              />
            </div>

            {/* Brand text */}
            <div className="min-w-0 whitespace-nowrap">
              <p className="text-[13px] font-black uppercase leading-none tracking-[0.16em] text-white sm:text-sm">
                Amal Cyber Lab
              </p>

              <p className="mt-1.5 text-[8px] font-medium uppercase leading-none tracking-[0.27em] text-slate-500">
                Security Portfolio
              </p>
            </div>
          </a>

          {/* ====================================================
              DESKTOP NAVIGATION
          ==================================================== */}

          <div className="hidden items-center gap-1 md:flex lg:gap-2">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) =>
                    scrollToSection(event, item.href)
                  }
                  aria-current={isActive ? "page" : undefined}
                  className="group relative rounded-xl px-2.5 py-2 outline-none xl:px-3"
                >
                  {/* Hover / active surface */}
                  <span
                    className={`absolute inset-0 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "border-emerald-400/20 bg-emerald-400/[0.06]"
                        : "border-transparent bg-transparent group-hover:border-white/[0.06] group-hover:bg-white/[0.035]"
                    }`}
                  />

                  {/* Label */}
                  <span
                    className={`relative z-10 text-[11px] font-black uppercase tracking-[0.16em] transition-all duration-300 lg:text-xs ${
                      isActive
                        ? "text-emerald-400"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  <span
                    className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-emerald-400 transition-all duration-300 ${
                      isActive
                        ? "w-5 opacity-100 shadow-[0_0_10px_rgba(52,211,153,0.7)]"
                        : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-60"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* ====================================================
              MOBILE MENU BUTTON
          ==================================================== */}

          <button
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/[0.06] focus:outline-none focus:ring-2 focus:ring-emerald-400 md:hidden"
          >
            <span className="transition-transform duration-300">
              {isOpen ? <X size={19} /> : <Menu size={19} />}
            </span>
          </button>
        </div>
      </div>

      {/* ==========================================================
          MOBILE NAVIGATION
      =========================================================== */}

      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          isOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-3 mb-3 rounded-2xl border border-white/[0.08] bg-[#070b14]/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          {/* Mobile header */}
          <div className="mb-2 flex items-center justify-between border-b border-white/[0.06] px-2 pb-3">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                Navigation
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-widest text-slate-600">
                Security Portfolio
              </p>
            </div>

            <span className="font-mono text-[8px] uppercase tracking-widest text-slate-700">
              SYS.NAV
            </span>
          </div>

          {/* Mobile links */}
          <div className="space-y-1">
            {navItems.map((item, index) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) =>
                    scrollToSection(event, item.href)
                  }
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-center justify-between rounded-xl border px-4 py-3.5 transition-all duration-300 ${
                    isActive
                      ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-400"
                      : "border-transparent text-slate-300 hover:border-white/[0.06] hover:bg-white/[0.04] hover:text-white"
                  }`}
                  style={{
                    transitionDelay: `${index * 35}ms`,
                  }}
                >
                  <span className="text-xs font-black uppercase tracking-[0.16em]">
                    {item.label}
                  </span>

                  <ChevronRight
                    size={15}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "translate-x-0 text-emerald-400 opacity-100"
                        : "-translate-x-1 text-slate-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile status */}
          <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] px-2 pt-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">
              Secure navigation channel active
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;