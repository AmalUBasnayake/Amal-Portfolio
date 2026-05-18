import React, { useEffect, useState, memo } from "react";
import {
  Terminal,
  Zap,
  Linkedin,
  Github,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const WORDS = [
  "Cybersecurity Engineer",
  "Cloud Security Engineer",
  "Azure Security Engineer Path",
  "SIEM & Threat Detection Engineer",
  "Zero Trust Security Practitioner",
];

const Home = ({ labMode, setLabMode }) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, offset: 0 });
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];

    const timeout = setTimeout(() => {
      if (isTyping) {
        if (charIndex < currentWord.length) {
          setText(currentWord.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          setIsTyping(false);
        }
      } else {
        if (charIndex > 0) {
          setText(currentWord.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          setWordIndex((prev) => (prev + 1) % WORDS.length);
          setIsTyping(true);
        }
      }
    }, isTyping ? 80 : 40);

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, wordIndex]);

  return (
    <section
      id="Home"
      className="relative min-h-screen bg-[#030014] overflow-hidden flex flex-col justify-center pt-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(59,130,246,0.07),transparent_30%)] pointer-events-none" />

      <div
        className={`container mx-auto px-6 relative z-10 py-10 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          {/* LEFT */}
          <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
            <div
              data-aos="fade-right"
              data-aos-delay="300"
              className="flex flex-col items-center lg:items-start gap-4"
            >
              <div className="relative inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  Cloud Security • SIEM • Threat Detection
                </span>
              </div>

              <button
                onClick={() => setLabMode(!labMode)}
                className={`flex items-center gap-4 px-6 h-14 rounded-2xl border transition-all duration-500 group ${
                  labMode
                    ? "bg-emerald-500 text-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-white/5 text-emerald-500 border-emerald-500/20 backdrop-blur-md hover:border-emerald-500/50 hover:bg-white/10"
                }`}
              >
                <ShieldAlert
                  className={labMode ? "animate-spin" : "animate-pulse"}
                  size={20}
                />
                <span className="text-[11px] font-black uppercase tracking-[0.25em]">
                  {labMode ? "Deactivate SOC Lab" : "Initialize SOC Lab"}
                </span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform ${
                    labMode ? "rotate-90" : "group-hover:translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div data-aos="fade-right" data-aos-delay="500">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase italic leading-[0.9] tracking-tighter text-white">
                Amal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600">
                  Udayanga.
                </span>
              </h1>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 font-mono text-emerald-400/90">
              <Terminal className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-lg md:text-2xl font-bold tracking-tight">
                {text}
                <span className="animate-pulse">_</span>
              </span>
            </div>

            <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Cybersecurity and cloud security professional with{" "}
              <span className="text-white font-bold">
                5+ years of enterprise IT experience
              </span>
              , currently securing a{" "}
              <span className="text-emerald-400 font-bold">
                Microsoft 365 environment for 4,000+ users
              </span>{" "}
              at Musaeus College.
              <br />
              <br />
              Building{" "}
              <span className="text-emerald-400 font-black uppercase">
                32+ real-world cybersecurity labs
              </span>{" "}
              across Azure Security, Microsoft Sentinel, Splunk, SOAR
              automation, Zero Trust identity, WAF, Key Vault, and threat
              detection.
            </p>

            <p className="text-emerald-400 text-xs font-mono tracking-widest">
              ✔ 5+ Years IT Experience • ✔ 4,000+ Users Secured • ✔ AZ-500
              Active Track
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-3 justify-center lg:justify-start">
              <a
                href="#Portofolio"
                className="bg-emerald-500 text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                View Security Projects <Zap className="w-4 h-4 fill-current" />
              </a>

              <a
                href="https://github.com/AmalUBasnayake"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white/10 hover:border-emerald-500/30 transition-all"
              >
                GitHub <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/amal-udayanga-basnayake"
                target="_blank"
                rel="noreferrer"
                className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white/10 hover:border-emerald-500/30 transition-all"
              >
                LinkedIn <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 blur-3xl opacity-15 group-hover:opacity-25 transition duration-700" />

              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/10 bg-[#0a0f1a] shadow-2xl">
                <img
                  src="/amal-profile.jpg"
                  alt="Amal Udayanga Basnayake"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-[#0a0f1a]/90 border border-emerald-500/20 backdrop-blur-xl">
                <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                  Azure Security • SIEM • Cloud Defense
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Home);