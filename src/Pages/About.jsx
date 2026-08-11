import React, { useEffect, useState, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  Award,
  Briefcase,
  Cloud,
  Activity,
  CheckCircle2,
  Server,
  Lock,
  GraduationCap,
  Terminal,
  Network,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* =========================================================
   TYPEWRITER
========================================================= */

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayText("");

    const interval = setInterval(() => {
      i += 1;
      setDisplayText(text.substring(0, i));

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight">
      {displayText}
      <span className="animate-pulse text-emerald-400">|</span>
    </h1>
  );
};

/* =========================================================
   COUNTER
========================================================= */

const Counter = ({ value, suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = Number.parseInt(value, 10);

    if (Number.isNaN(end)) return;

    let start = 0;
    const duration = 1400;
    const step = Math.max(1, end / (duration / 16));

    const timer = setInterval(() => {
      start += step;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

/* =========================================================
   SECURITY SNAPSHOT
========================================================= */

const SecuritySnapshot = memo(() => {
  const items = [
    {
      icon: Server,
      title: "Enterprise Microsoft 365",
      text: "Managing Microsoft 365 services, Teams infrastructure, identity controls, user lifecycle operations, and enterprise security practices.",
    },
    {
      icon: Lock,
      title: "Identity & Cloud Security",
      text: "Hands-on focus across Entra ID, MFA, Conditional Access, access governance, Azure security controls, and cloud identity protection.",
    },
    {
      icon: Activity,
      title: "Security Operations",
      text: "Building practical SIEM, SOAR, threat detection, incident response, KQL, Microsoft Sentinel, and Splunk security workflows.",
    },
    {
      icon: Terminal,
      title: "Security Engineering Labs",
      text: "40+ hands-on labs covering Azure security, Defender for Cloud, Kubernetes security, vulnerability management, honeypots, and automation.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.15 }}
      className="relative"
    >
      <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/10 via-blue-500/[0.08] to-cyan-500/10 blur-3xl opacity-40 pointer-events-none" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#080d16]/90 p-6 shadow-2xl backdrop-blur-2xl md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_38%)] pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[9px] font-mono font-bold uppercase tracking-[0.35em] text-emerald-400">
              Security Snapshot
            </p>

            <div className="flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.04] px-3 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="text-[7px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-400/80">
                Engineering Mode
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-black leading-tight text-white md:text-4xl">
            Enterprise IT foundation.
            <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Cloud security direction.
            </span>
          </h3>

          <p className="mt-4 text-sm leading-7 text-slate-500">
            Combining enterprise IT operations with practical cloud security
            engineering, security operations, identity protection, and
            hands-on security lab development.
          </p>

          <div className="mt-8 space-y-3">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group flex min-h-[86px] gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.025]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 transition-all group-hover:border-emerald-400/30 group-hover:bg-emerald-500/15">
                    <Icon className="text-emerald-400" size={20} />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.05] p-4">
              <CheckCircle2 className="mb-2 text-emerald-400" size={18} />
              <p className="text-sm font-black text-white">4,000+ Users</p>
              <p className="mt-1 text-[10px] leading-5 text-slate-500">
                Enterprise Microsoft 365 environment
              </p>
            </div>

            <div className="rounded-2xl border border-blue-500/15 bg-blue-500/[0.05] p-4">
              <BrainCircuit className="mb-2 text-blue-400" size={18} />
              <p className="text-sm font-black text-white">SC-500 Track</p>
              <p className="mt-1 text-[10px] leading-5 text-slate-500">
                Cloud & AI Security Engineer pathway
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Azure Security",
              "Microsoft Sentinel",
              "Defender for Cloud",
              "Entra ID",
              "KQL",
              "Splunk",
              "SIEM / SOAR",
              "Kubernetes Security",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[8px] font-mono font-bold uppercase tracking-wider text-slate-500 transition-all hover:border-emerald-400/20 hover:text-emerald-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

SecuritySnapshot.displayName = "SecuritySnapshot";

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = memo(({ icon: Icon, value, label, suffix = "+" }) => (
  <motion.div
    whileHover={{ y: -7, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 250, damping: 18 }}
    className="relative rounded-2xl bg-gradient-to-r from-emerald-500/30 via-cyan-500/20 to-blue-500/30 p-px"
  >
    <div className="group relative flex h-full min-h-[150px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080d16]/95 p-6 text-center shadow-xl backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.07),transparent_60%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
          <Icon className="text-emerald-400" size={24} />
        </div>

        <h3 className="text-3xl font-black text-white">
          <Counter value={value} suffix={suffix} />
        </h3>

        <p className="mt-1 text-xs text-slate-500">{label}</p>
      </div>
    </div>
  </motion.div>
));

StatCard.displayName = "StatCard";

/* =========================================================
   MAIN ABOUT PAGE
========================================================= */

const AboutPage = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
      offset: 70,
    });
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]);

  const stats = [
    {
      icon: Shield,
      value: "40",
      label: "Security Labs",
    },
    {
      icon: Award,
      value: "37",
      label: "Learning Achievements",
    },
    {
      icon: Briefcase,
      value: "5",
      label: "Years IT Experience",
    },
  ];

  const focusAreas = [
    {
      icon: Cloud,
      title: "Cloud Security",
      text: "Azure, Microsoft 365, Entra ID, Defender for Cloud, identity protection",
    },
    {
      icon: Activity,
      title: "Security Operations",
      text: "Sentinel, Splunk, SIEM, SOAR, KQL, threat detection and response",
    },
    {
      icon: Network,
      title: "Infrastructure Security",
      text: "Enterprise infrastructure, networking, Kubernetes and cloud workloads",
    },
  ];

  const developmentAreas = [
    {
      icon: BrainCircuit,
      title: "Cloud & AI Security",
      text: "SC-500 Cloud and AI Security Engineer pathway",
    },
    {
      icon: GraduationCap,
      title: "BSc (Hons) Cyber Security",
      text: "University of Wolverhampton - starting September 2026",
    },
    {
      icon: Terminal,
      title: "Hands-on Engineering",
      text: "40+ practical security labs and security-focused projects",
    },
  ];

  const scrollToProjects = () => {
    document.getElementById("Portofolio")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="About"
      className="relative w-full overflow-hidden bg-[#050505] px-[5%] py-20 md:px-[8%] md:py-24 lg:px-[10%]"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.14),transparent_70%)]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.025] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-[1700px]">
        {/* ===================================================
            HEADER
        =================================================== */}

        <header data-aos="fade-up" className="mb-12 text-center md:mb-14">
          <p className="mb-3 text-[9px] font-mono font-bold uppercase tracking-[0.35em] text-emerald-400 md:text-xs">
            Professional Profile
          </p>

          <h2 className="text-5xl font-black uppercase italic leading-none tracking-[-0.04em] text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text md:text-7xl">
            About Me
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm font-mono leading-6 text-slate-500 md:text-base">
            IT Operations • Cloud Security • Security Engineering • SOC Operations
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[9px] font-mono uppercase tracking-wider md:text-xs">
            <span className="text-emerald-400">5+ Years IT Experience</span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400">40+ Security Labs</span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400">4,000+ Users</span>
            <span className="text-slate-700">•</span>
            <span className="text-blue-400">BSc Cyber Security - Upcoming</span>
          </div>
        </header>

        {/* ===================================================
            MAIN GRID
        =================================================== */}

        <div className="grid items-start gap-10 lg:grid-cols-2 xl:gap-16">
          {/* =================================================
              LEFT — PROFESSIONAL STORY
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-7"
          >
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-500/50" />
                <span className="text-[8px] font-mono font-bold uppercase tracking-[0.3em] text-slate-600">
                  Engineering Profile
                </span>
              </div>

              <Typewriter text="Hello, I'm Amal Udayanga Basnayake" />
            </div>

            <div className="space-y-5 text-justify text-sm leading-7 text-slate-500 md:text-base">
              <p>
                I am an IT and security-focused technology professional with{" "}
                <strong className="text-white">5+ years of experience in IT operations</strong>,
                currently working as an{" "}
                <strong className="text-white">IT & Systems Specialist at Musaeus College</strong>.
              </p>

              <p>
                My current responsibilities include managing and securing a{" "}
                <strong className="text-emerald-400">
                  Microsoft 365 environment supporting 4,000+ users
                </strong>, including Microsoft Teams administration, identity and access
                management, user lifecycle operations, security controls, and enterprise IT support.
              </p>

              <p>
                My technical direction is focused on{" "}
                <strong className="text-white">
                  Azure Security, Microsoft 365 Security, SIEM/SOAR, threat detection,
                  identity security, and cloud security engineering
                </strong>. I have built{" "}
                <strong className="text-emerald-400">40+ hands-on security labs</strong>{" "}
                covering Microsoft Sentinel, Splunk, Defender for Cloud, Azure hardening,
                Kubernetes security, honeypots, vulnerability management, security automation,
                and incident response.
              </p>

              <p>
                I am currently progressing through the{" "}
                <strong className="text-blue-400">
                  SC-500 Cloud and AI Security Engineer pathway
                </strong>, expanding my knowledge across cloud and AI workload security,
                identity, data protection, security operations, and enterprise defense.
              </p>

              <p>
                Alongside my professional development, I am preparing to begin my{" "}
                <strong className="text-white">
                  BSc (Hons) Cyber Security at the University of Wolverhampton
                </strong>{" "}
                in September 2026, with a long-term goal of building deeper expertise as a{" "}
                <strong className="text-emerald-400">
                  Cybersecurity / Cloud Security Engineer
                </strong>.
              </p>
            </div>

            {/* =================================================
                CORE FOCUS AREAS
            ================================================= */}

            <div className="pt-2">
              <p className="mb-4 text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-slate-600">
                Core Engineering Focus
              </p>

              <div className="grid items-stretch gap-3 sm:grid-cols-3">
                {focusAreas.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 250, damping: 18 }}
                      className="group flex min-h-[170px] flex-col rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.025]"
                    >
                      <Icon
                        className="mb-3 text-emerald-400 transition-transform group-hover:scale-110"
                        size={22}
                      />

                      <h3 className="text-sm font-bold text-white">{item.title}</h3>

                      <p className="mt-2 text-[10px] leading-5 text-slate-600">
                        {item.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                CURRENT DEVELOPMENT
            ================================================= */}

            <div className="pt-1">
              <p className="mb-4 text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-slate-600">
                Current Development
              </p>

              <div className="grid items-stretch gap-3 sm:grid-cols-3">
                {developmentAreas.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex min-h-[150px] flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all hover:border-blue-400/20 hover:bg-blue-500/[0.02]"
                    >
                      <Icon size={19} className="mb-3 text-blue-400" />

                      <h4 className="text-xs font-bold text-white">{item.title}</h4>

                      <p className="mt-2 text-[10px] leading-5 text-slate-600">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                CTA
            ================================================= */}

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-blue-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_25px_rgba(16,185,129,0.25)] transition hover:scale-[1.03] active:scale-95"
              >
                View Security Projects
                <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>

              <a
                href="#Contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.09] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:border-emerald-500/30 hover:bg-white/[0.04]"
              >
                Contact Me
                <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>

          {/* =================================================
              RIGHT — SECURITY SNAPSHOT
          ================================================= */}

          <SecuritySnapshot />
        </div>

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="relative z-10 mt-16 grid gap-6 md:mt-20 md:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* ===================================================
            ENGINEERING FOOTER LINE
        =================================================== */}

        <div className="relative z-10 mt-16 flex items-center justify-center gap-4">
          <div className="h-px max-w-32 flex-1 bg-gradient-to-r from-transparent to-emerald-500/30" />

          <div className="flex items-center gap-2 text-[8px] font-mono font-bold uppercase tracking-[0.25em] text-slate-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/70" />
            Security Engineering Journey
          </div>

          <div className="h-px max-w-32 flex-1 bg-gradient-to-l from-transparent to-blue-500/30" />
        </div>
      </div>
    </section>
  );
};

export default memo(AboutPage);
