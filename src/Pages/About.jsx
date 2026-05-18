import React, { useEffect, useState, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  Award,
  Globe,
  Briefcase,
  Cloud,
  Activity,
  CheckCircle2,
  Server,
  Lock,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ------------------ TYPEWRITER ------------------ */
const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.substring(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
      {displayText}
      <span className="animate-pulse text-emerald-400">|</span>
    </h1>
  );
};

/* ------------------ COUNTER ------------------ */
const Counter = ({ value, suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 1400;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

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

/* ------------------ SECURITY SNAPSHOT ------------------ */
const SecuritySnapshot = memo(() => {
  const items = [
    {
      icon: Server,
      title: "Microsoft 365 Operations",
      text: "Managing enterprise collaboration and user lifecycle controls.",
    },
    {
      icon: Lock,
      title: "Identity & Access Security",
      text: "Focused on MFA, access governance, and cloud identity protection.",
    },
    {
      icon: Activity,
      title: "SOC Engineering Path",
      text: "Building practical SIEM, SOAR, detection, and response labs.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/10 via-blue-500/[0.08] to-purple-500/10 blur-2xl opacity-35"/>

      <div className="relative rounded-3xl bg-[#0a0f1a]/80 backdrop-blur-2xl border border-white/10 p-6 md:p-8 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_40%)] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-emerald-400 text-xs font-mono uppercase tracking-[0.35em] mb-3">
            Security Snapshot
          </p>

          <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Enterprise IT foundation with cloud security direction.
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mt-4">
            Practical experience in Microsoft 365 administration, Teams support,
            user management, security policy enforcement, and hands-on cloud
            security lab engineering.
          </p>

          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl bg-white/[0.03] border border-white/10 p-4 hover:border-emerald-500/30 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <item.icon className="text-emerald-400" size={20} />
                </div>

                <div>
                  <h4 className="text-white font-bold text-sm">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
              <CheckCircle2 className="text-emerald-400 mb-2" size={18} />
              <p className="text-white text-sm font-black">4,000+ Users</p>
              <p className="text-slate-500 text-[11px] mt-1">
                Enterprise environment exposure
              </p>
            </div>

            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4">
              <CheckCircle2 className="text-amber-400 mb-2" size={18} />
              <p className="text-white text-sm font-black">AZ-500 Track</p>
              <p className="text-slate-500 text-[11px] mt-1">
                Azure Security Engineer path
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* ------------------ STAT CARD ------------------ */
const StatCard = memo(({ icon: Icon, value, label, suffix = "+" }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 250, damping: 18 }}
    className="relative p-[1px] rounded-2xl bg-gradient-to-r from-emerald-500/30 to-blue-500/30"
  >
    <div className="bg-[#0a0f1a]/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl text-center h-full">
      <Icon className="text-emerald-400 mb-3 mx-auto" size={28} />

      <h3 className="text-3xl font-black text-white">
        <Counter value={value} suffix={suffix} />
      </h3>

      <p className="text-slate-400 text-sm mt-1">{label}</p>
    </div>
  </motion.div>
));

/* ------------------ MAIN ------------------ */
const AboutPage = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]);

  const stats = [
    { icon: Shield, value: "32", label: "Security Labs" },
    { icon: Award, value: "35", label: "Learning Achievements" },
    { icon: Globe, value: "5", label: "Years IT Experience" },
  ];

  const focusAreas = [
    {
      icon: Cloud,
      title: "Cloud Security",
      text: "Azure, Microsoft 365, identity protection",
    },
    {
      icon: Activity,
      title: "SOC Operations",
      text: "SIEM, Sentinel, Splunk, threat detection",
    },
    {
      icon: Briefcase,
      title: "Enterprise IT",
      text: "4,000+ users, Teams, access governance",
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
      className="relative py-32 px-[5%] md:px-[10%] bg-[#050505] overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.14),transparent_70%)] pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      {/* HEADER */}
      <div className="text-center mb-20 relative z-10">
        <p className="text-emerald-400 text-xs font-mono uppercase tracking-[0.35em] mb-3">
          Professional Profile
        </p>

        <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent uppercase italic leading-none">
          About Me
        </h2>

        <p className="text-slate-400 mt-4 font-mono">
          Cybersecurity Engineer Path • Azure Security • SOC Operations
        </p>

        <p className="text-emerald-400 text-sm mt-2 font-mono">
          ✔ 5+ Years Experience • ✔ 32+ Labs • ✔ 4,000+ Users Managed
        </p>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center relative z-10">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-7"
        >
          <Typewriter text="Hello, I'm Amal Udayanga Basnayake" />

          <div className="space-y-5 text-slate-400 leading-relaxed text-justify">
            <p>
              I am a cybersecurity and cloud-focused IT professional with{" "}
              <strong className="text-white">
                5+ years of experience in IT operations
              </strong>
              , currently working as an{" "}
              <strong className="text-white">
                IT & Systems Specialist at Musaeus College
              </strong>
              .
            </p>

            <p>
              My current role includes managing and securing a{" "}
              <strong className="text-emerald-400">
                Microsoft 365 environment for 4,000+ users
              </strong>
              , including Microsoft Teams administration, identity and access
              management, and enterprise security best practices.
            </p>

            <p>
              I focus on{" "}
              <strong className="text-white">
                Azure Security, SOC monitoring, SIEM/SOAR, threat detection, and
                cloud security engineering
              </strong>
              . I have built 32+ real-world security labs covering Microsoft
              Sentinel, Splunk, Azure hardening, honeypots, SOAR automation,
              vulnerability management, and incident response.
            </p>

            <p>
              I am currently advancing through the{" "}
              <strong className="text-amber-400">
                AZ-500 Azure Security Engineer path
              </strong>
              , with the goal of contributing as a Cybersecurity Engineer
              focused on cloud security, security operations, and enterprise
              defense.
            </p>
          </div>

          {/* FOCUS AREAS */}
          <div className="grid sm:grid-cols-3 gap-3 pt-2">
            {focusAreas.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 hover:border-emerald-500/30 transition"
              >
                <item.icon className="text-emerald-400 mb-3" size={22} />
                <h3 className="text-white text-sm font-bold">{item.title}</h3>
                <p className="text-slate-500 text-xs mt-1">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={scrollToProjects}
              className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-blue-500 text-black font-black rounded-xl hover:scale-105 transition shadow-[0_0_20px_rgba(16,185,129,0.35)]"
            >
              View Security Projects
            </button>

            <a
              href="#Contact"
              className="px-6 py-3 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 hover:border-emerald-500/30 transition"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* RIGHT - NO PROFILE IMAGE */}
        <SecuritySnapshot />
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-24 relative z-10">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
};

export default memo(AboutPage);