import React, { useEffect, useState, memo } from "react";
import {
  Terminal,
  Zap,
  Linkedin,
  Github,
  ShieldAlert,
  ArrowRight,
  Cloud,
  Activity,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const WORDS = [
  "Cybersecurity Engineer",
  "Cloud Security Engineer",
  "Microsoft Security Engineer",
  "SIEM & Threat Detection Engineer",
  "Zero Trust Security Practitioner",
  "Cloud & AI Security Engineer",
];

const Home = ({ labMode, setLabMode }) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  /* =========================================================
     AOS INITIALIZATION
  ========================================================= */

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 0,
      duration: 750,
      easing: "ease-out-cubic",
    });

    setIsLoaded(true);
  }, []);

  /* =========================================================
     TYPEWRITER ENGINE
  ========================================================= */

  useEffect(() => {
    const currentWord = WORDS[wordIndex];

    const timeout = setTimeout(
      () => {
        if (isTyping) {
          if (charIndex < currentWord.length) {
            setText(
              currentWord.substring(0, charIndex + 1)
            );

            setCharIndex((prev) => prev + 1);
          } else {
            setIsTyping(false);
          }
        } else {
          if (charIndex > 0) {
            setText(
              currentWord.substring(0, charIndex - 1)
            );

            setCharIndex((prev) => prev - 1);
          } else {
            setWordIndex(
              (prev) => (prev + 1) % WORDS.length
            );

            setIsTyping(true);
          }
        }
      },
      isTyping ? 75 : 38
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, wordIndex]);

  /* =========================================================
     HERO
  ========================================================= */

  return (
    <section
      id="Home"
      className="
        relative
        min-h-screen
        flex
        items-center
        overflow-hidden
        bg-[#030712]
      "
    >
      {/* =====================================================
          BACKGROUND SYSTEM
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.10),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(37,99,235,0.10),transparent_35%)]
        "
      />

      <div
        className="
          absolute
          inset-0
          pointer-events-none
          bg-gradient-to-br
          from-emerald-500/[0.025]
          via-transparent
          to-blue-500/[0.025]
        "
      />

      {/* Technical grid */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.025]
          bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          bg-[size:70px_70px]
        "
      />

      {/* Ambient particles / lights */}
      <div className="absolute top-24 left-[12%] w-2 h-2 rounded-full bg-emerald-400/30 blur-[1px] animate-pulse" />
      <div className="absolute top-[35%] right-[14%] w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-pulse" />
      <div className="absolute bottom-[20%] left-[45%] w-1.5 h-1.5 rounded-full bg-cyan-400/20 animate-pulse" />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className={`
          container
          mx-auto
          px-6
          lg:px-10
          xl:px-14
          relative
          z-10
          py-24
          lg:py-28
          transition-opacity
          duration-1000
          ${
            isLoaded
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      >
        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-16
            lg:gap-20
          "
        >
          {/* =================================================
              LEFT — HERO CONTENT
          ================================================= */}

          <div
            className="
              w-full
              lg:w-[62%]
              space-y-7
              text-center
              lg:text-left
            "
          >
            {/* -------------------------------------------------
                ENGINEERING STATUS
            ------------------------------------------------- */}

            <div
              data-aos="fade-right"
              data-aos-delay="150"
              className="
                flex
                flex-col
                items-center
                lg:items-start
                gap-4
              "
            >
              <div
                className="
                  relative
                  inline-flex
                  items-center
                  gap-3
                  px-4
                  py-2.5
                  rounded-xl
                  bg-emerald-500/[0.05]
                  border
                  border-emerald-500/15
                  backdrop-blur-xl
                  shadow-[0_0_25px_rgba(16,185,129,0.04)]
                "
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      animate-ping
                      absolute
                      inline-flex
                      h-full
                      w-full
                      rounded-full
                      bg-emerald-400
                      opacity-70
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      rounded-full
                      h-2
                      w-2
                      bg-emerald-400
                      shadow-[0_0_10px_rgba(52,211,153,0.9)]
                    "
                  />
                </span>

                <span
                  className="
                    text-emerald-400
                    text-[9px]
                    md:text-[10px]
                    font-black
                    uppercase
                    tracking-[0.22em]
                  "
                >
                  Cloud Security • SIEM • Threat Detection
                </span>
              </div>

              {/* -------------------------------------------------
                  SOC LAB TOGGLE
              ------------------------------------------------- */}

              <button
                type="button"
                onClick={() =>
                  setLabMode(!labMode)
                }
                aria-pressed={labMode}
                className={`
                  relative
                  overflow-hidden
                  flex
                  items-center
                  gap-4
                  px-6
                  h-14
                  rounded-2xl
                  border
                  transition-all
                  duration-500
                  group
                  ${
                    labMode
                      ? `
                        bg-emerald-500
                        text-black
                        border-emerald-400
                        shadow-[0_0_30px_rgba(16,185,129,0.35)]
                      `
                      : `
                        bg-white/[0.035]
                        text-emerald-400
                        border-emerald-500/20
                        backdrop-blur-xl
                        hover:border-emerald-500/45
                        hover:bg-emerald-500/[0.05]
                      `
                  }
                `}
              >
                <span
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-transparent
                    via-white/10
                    to-transparent
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform
                    duration-1000
                  "
                />

                <ShieldAlert
                  className={
                    labMode
                      ? "animate-spin"
                      : "animate-pulse"
                  }
                  size={19}
                />

                <span className="relative text-[10px] md:text-[11px] font-black uppercase tracking-[0.22em]">
                  {labMode
                    ? "Deactivate SOC Lab"
                    : "Initialize SOC Lab"}
                </span>

                <ArrowRight
                  className={`
                    relative
                    w-4
                    h-4
                    transition-transform
                    duration-300
                    ${
                      labMode
                        ? "rotate-90"
                        : "group-hover:translate-x-1"
                    }
                  `}
                />
              </button>
            </div>

            {/* -------------------------------------------------
                NAME
            ------------------------------------------------- */}

            <div
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <p
                className="
                  text-slate-600
                  text-[9px]
                  font-mono
                  uppercase
                  tracking-[0.35em]
                  mb-3
                "
              >
                Security Engineering Portfolio
              </p>

              <h1
                className="
                  text-5xl
                  sm:text-6xl
                  md:text-7xl
                  xl:text-8xl
                  font-black
                  uppercase
                  italic
                  leading-[0.86]
                  tracking-[-0.06em]
                  text-white
                "
              >
                Amal
                <br />

                <span
                  className="
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-emerald-400
                    via-cyan-400
                    to-blue-500
                  "
                >
                  Udayanga.
                </span>
              </h1>
            </div>

            {/* -------------------------------------------------
                ENGINEER ROLE
            ------------------------------------------------- */}

            <div
              data-aos="fade-right"
              data-aos-delay="400"
              className="
                flex
                items-center
                justify-center
                lg:justify-start
                gap-3
                font-mono
                text-emerald-400
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-9
                  h-9
                  rounded-xl
                  bg-emerald-500/[0.06]
                  border
                  border-emerald-500/15
                "
              >
                <Terminal className="w-4 h-4 md:w-5 md:h-5" />
              </div>

              <span
                className="
                  text-base
                  md:text-xl
                  lg:text-2xl
                  font-bold
                  tracking-tight
                "
              >
                {text}
                <span className="animate-pulse text-white">
                  _
                </span>
              </span>
            </div>

            {/* -------------------------------------------------
                PROFESSIONAL SUMMARY
            ------------------------------------------------- */}

            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className="
                max-w-3xl
                mx-auto
                lg:mx-0
              "
            >
              <p
                className="
                  text-slate-400
                  text-base
                  md:text-lg
                  leading-[1.8]
                "
              >
                Cybersecurity and cloud security professional
                with{" "}
                <span className="text-white font-bold">
                  5+ years of enterprise IT experience
                </span>
                , currently working as an{" "}
                <span className="text-white font-bold">
                  IT & Systems Specialist at Musaeus College
                </span>
                , supporting and securing a{" "}
                <span className="text-emerald-400 font-bold">
                  Microsoft 365 environment for 4,000+ users
                </span>
                .
              </p>

              <p
                className="
                  text-slate-500
                  text-sm
                  md:text-base
                  leading-[1.8]
                  mt-4
                "
              >
                Building{" "}
                <span
                  className="
                    text-emerald-400
                    font-black
                    uppercase
                    tracking-wide
                  "
                >
                  40+ hands-on cybersecurity labs
                </span>{" "}
                across Azure Security, Microsoft Sentinel,
                Splunk, SIEM/SOAR, Zero Trust identity, WAF,
                Key Vault, Kubernetes security, vulnerability
                management, and threat detection.
              </p>
            </div>

            {/* -------------------------------------------------
                ENGINEERING SIGNALS
            ------------------------------------------------- */}

            <div
              data-aos="fade-up"
              data-aos-delay="600"
              className="
                flex
                flex-wrap
                items-center
                justify-center
                lg:justify-start
                gap-x-5
                gap-y-3
                text-[9px]
                md:text-[10px]
                font-mono
                uppercase
                tracking-[0.12em]
              "
            >
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck size={13} />
                5+ Years IT
              </span>

              <span className="hidden sm:block text-slate-700">
                •
              </span>

              <span className="flex items-center gap-1.5 text-emerald-400">
                <Activity size={13} />
                4,000+ Users
              </span>

              <span className="hidden sm:block text-slate-700">
                •
              </span>

              <span className="flex items-center gap-1.5 text-cyan-400">
                <Cloud size={13} />
                SC-500 Retake Track
              </span>

              <span className="hidden sm:block text-slate-700">
                •
              </span>

              <span className="flex items-center gap-1.5 text-blue-400">
                <GraduationCap size={13} />
                BSc Cyber Security
              </span>
            </div>

            {/* -------------------------------------------------
                ACTIONS
            ------------------------------------------------- */}

            <div
              data-aos="fade-up"
              data-aos-delay="700"
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                pt-2
                justify-center
                lg:justify-start
              "
            >
              <a
                href="#Portofolio"
                className="
                  group
                  relative
                  overflow-hidden
                  bg-emerald-500
                  text-black
                  px-7
                  py-4
                  rounded-xl
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-[10px]
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-white
                  transition-all
                  duration-300
                  shadow-[0_0_25px_rgba(16,185,129,0.25)]
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    bg-white/20
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform
                    duration-700
                  "
                />

                <span className="relative">
                  View Security Projects
                </span>

                <Zap
                  className="
                    relative
                    w-4
                    h-4
                    fill-current
                    group-hover:rotate-12
                    transition-transform
                  "
                />
              </a>

              <a
                href="https://github.com/AmalUBasnayake"
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  bg-white/[0.035]
                  text-white
                  border
                  border-white/10
                  px-7
                  py-4
                  rounded-xl
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-[10px]
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-white/[0.07]
                  hover:border-emerald-500/30
                  transition-all
                  duration-300
                "
              >
                GitHub
                <Github
                  className="
                    w-4
                    h-4
                    group-hover:text-emerald-400
                    transition
                  "
                />
              </a>

              <a
                href="https://www.linkedin.com/in/amal-udayanga-basnayake"
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  bg-white/[0.035]
                  text-white
                  border
                  border-white/10
                  px-7
                  py-4
                  rounded-xl
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-[10px]
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-white/[0.07]
                  hover:border-blue-500/30
                  transition-all
                  duration-300
                "
              >
                LinkedIn
                <Linkedin
                  className="
                    w-4
                    h-4
                    group-hover:text-blue-400
                    transition
                  "
                />
              </a>
            </div>

            {/* -------------------------------------------------
                CURRENT DEVELOPMENT BAR
            ------------------------------------------------- */}

            <div
              data-aos="fade-up"
              data-aos-delay="800"
              className="
                max-w-3xl
                mx-auto
                lg:mx-0
                mt-3
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.02]
                backdrop-blur-xl
                px-4
                py-3
              "
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span
                  className="
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.25em]
                    text-slate-600
                  "
                >
                  Current Development
                </span>

                <span className="hidden sm:block text-slate-800">
                  |
                </span>

                <span
                  className="
                    text-[9px]
                    font-mono
                    text-slate-400
                    leading-relaxed
                  "
                >
                  SC-500 Cloud & AI Security
                  <span className="text-slate-700 mx-2">
                    •
                  </span>
                  BSc (Hons) Cyber Security
                  <span className="text-slate-700 mx-2">
                    •
                  </span>
                  Security Engineering Labs
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT — PROFILE / ENGINEER NODE
          ================================================= */}

          <div
            data-aos="fade-left"
            data-aos-delay="350"
            className="
              w-full
              lg:w-[38%]
              flex
              justify-center
              lg:justify-end
            "
          >
            <div className="relative group">

              {/* ------------------------------------------------
                  OUTER SECURITY RINGS
              ------------------------------------------------ */}

              <div
                className="
                  absolute
                  -inset-8
                  rounded-full
                  border
                  border-emerald-500/10
                  animate-[spin_24s_linear_infinite]
                "
              />

              <div
                className="
                  absolute
                  -inset-14
                  rounded-full
                  border
                  border-blue-500/[0.06]
                  border-dashed
                  animate-[spin_35s_linear_infinite_reverse]
                "
              />

              {/* Ambient glow */}
              <div
                className="
                  absolute
                  -inset-12
                  bg-gradient-to-r
                  from-emerald-500
                  via-cyan-500
                  to-blue-500
                  blur-3xl
                  opacity-10
                  group-hover:opacity-20
                  transition
                  duration-700
                "
              />

              {/* ------------------------------------------------
                  PROFILE IMAGE
              ------------------------------------------------ */}

              <div
                className="
                  relative
                  w-64
                  h-64
                  sm:w-72
                  sm:h-72
                  md:w-80
                  md:h-80
                  rounded-full
                  overflow-hidden
                  border
                  border-white/10
                  bg-[#07101b]
                  shadow-[0_0_70px_rgba(16,185,129,0.10)]
                "
              >
                <img
                  src="/amal-profile.jpg"
                  alt="Amal Udayanga Basnayake - Cybersecurity and Cloud Security Professional"
                  loading="eager"
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-700
                  "
                />

                {/* Image overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#030712]/40
                    via-transparent
                    to-emerald-400/5
                    pointer-events-none
                  "
                />

                {/* Vignette */}
                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    shadow-[inset_0_0_50px_rgba(0,0,0,0.45)]
                    pointer-events-none
                  "
                />
              </div>

              {/* Clean profile presentation — image remains the primary visual. */}
</div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM ENGINEERING INDICATORS
        ===================================================== */}

        <div
          data-aos="fade-up"
          data-aos-delay="900"
          className="
            mt-24
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-5
            gap-y-3
            text-[8px]
            font-mono
            uppercase
            tracking-[0.2em]
            text-slate-600
          "
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
            Enterprise IT
          </span>

          <span className="text-slate-800">
            //
          </span>

          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70" />
            Cloud Security
          </span>

          <span className="text-slate-800">
            //
          </span>

          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70" />
            SIEM / SOAR
          </span>

          <span className="text-slate-800">
            //
          </span>

          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400/70" />
            Threat Detection
          </span>
        </div>
      </div>
    </section>
  );
};

export default memo(Home);