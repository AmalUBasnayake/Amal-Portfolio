import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ShieldCheck,
  Zap,
  Server,
  ShieldAlert,
  ExternalLink,
  Network,
  Activity,
  LockKeyhole,
  CheckCircle2,
  ArrowUpRight,
  Layers3,
  Radar,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const fallbackImage =
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070";

const FALLBACK_STACK = [
  "Azure",
  "Security",
  "SIEM",
  "Security Lab",
];

const normalizeText = (value) =>
  typeof value === "string" ? value.trim() : "";

const parseList = (value) => {
  if (Array.isArray(value)) {
    return value.map(normalizeText).filter(Boolean);
  }

  return normalizeText(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getProjectValue = (
  project,
  keys,
  fallback = ""
) => {
  for (const key of keys) {
    const value = project?.[key];

    if (
      value !== undefined &&
      value !== null &&
      normalizeText(String(value))
    ) {
      return value;
    }
  }

  return fallback;
};

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();

  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.35],
    [1, 1.025]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.35],
    [1, 0.86]
  );

  /* ============================================================
     INITIALIZATION
  ============================================================ */

  useEffect(() => {
    window.scrollTo(0, 0);

    AOS.init({
      duration: 850,
      once: true,
      offset: 60,
      easing: "ease-out-cubic",
    });
  }, [id]);

  /* ============================================================
     FETCH PROJECT
  ============================================================ */

  useEffect(() => {
    let active = true;

    const fetchProjectDetails = async () => {
      setLoading(true);

      try {
        const parsedId = Number.parseInt(id, 10);

        if (Number.isNaN(parsedId)) {
          throw new Error("Invalid project id");
        }

        const {
          data,
          error,
        } = await supabase
          .from("projects")
          .select("*")
          .eq("id", parsedId)
          .single();

        if (error) {
          throw error;
        }

        if (active) {
          setProject(data);
        }
      } catch (err) {
        console.error(
          "Error fetching project:",
          err
        );

        if (active) {
          setProject(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchProjectDetails();

    return () => {
      active = false;
    };
  }, [id]);

  /* ============================================================
     PROJECT DATA
  ============================================================ */

  const title =
    normalizeText(project?.Title) ||
    "Cybersecurity Project";

  const description =
    normalizeText(project?.Description) ||
    "Hands-on security engineering lab focused on practical implementation, validation, monitoring, and defensive controls.";

  const category =
    normalizeText(project?.category) ||
    "Cybersecurity Engineering";

  const projectImage =
    getProjectValue(
      project,
      ["Img", "image", "Image"],
      fallbackImage
    ) || fallbackImage;

  const projectLink = normalizeText(
    getProjectValue(
      project,
      ["Link", "link"],
      ""
    )
  );

  const hasProjectLink =
    Boolean(projectLink);

  /* ============================================================
     TECHNOLOGY STACK
  ============================================================ */

  const techStack = useMemo(() => {
    if (!project) {
      return FALLBACK_STACK;
    }

    const rawStack = getProjectValue(
      project,
      [
        "TechStack",
        "tech_stack",
        "Stack",
        "stack",
      ],
      ""
    );

    const parsed = parseList(rawStack);

    return parsed.length
      ? parsed
      : FALLBACK_STACK;
  }, [project]);

  /* ============================================================
     ENGINEERING DATA
  ============================================================ */

  const engineeringFocus = useMemo(
    () =>
      parseList(
        getProjectValue(
          project,
          [
            "EngineeringFocus",
            "engineering_focus",
            "Focus",
            "focus",
          ],
          ""
        )
      ),
    [project]
  );

  const securityControls = useMemo(
    () =>
      parseList(
        getProjectValue(
          project,
          [
            "SecurityControls",
            "security_controls",
            "Controls",
            "controls",
          ],
          ""
        )
      ),
    [project]
  );

  const outcomes = useMemo(
    () =>
      parseList(
        getProjectValue(
          project,
          [
            "SecurityOutcome",
            "security_outcome",
            "Outcome",
            "outcome",
          ],
          ""
        )
      ),
    [project]
  );

  const objective =
    normalizeText(
      getProjectValue(
        project,
        [
          "SecurityObjective",
          "security_objective",
          "Objective",
          "objective",
        ],
        ""
      )
    ) ||
    "Demonstrate a practical security engineering approach through secure design, implementation, monitoring, and validation.";

  const architectureText =
    normalizeText(
      getProjectValue(
        project,
        [
          "Architecture",
          "architecture",
          "ArchitectureDescription",
          "architecture_description",
        ],
        ""
      )
    ) ||
    "The lab is structured around practical security controls, clear trust boundaries, controlled access, monitoring visibility, and repeatable validation.";

  const labType =
    normalizeText(
      getProjectValue(
        project,
        [
          "ProjectType",
          "project_type",
          "Type",
          "type",
        ],
        ""
      )
    ) ||
    "Hands-on Cybersecurity Lab";

  const status =
    normalizeText(
      getProjectValue(
        project,
        ["Status", "status"],
        ""
      )
    ) || "Lab Verified";

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712]">
        <div className="flex flex-col items-center gap-5">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-emerald-500/20 border-t-emerald-400" />

          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-600">
            Loading Security Lab
          </span>
        </div>
      </div>
    );
  }

  /* ============================================================
     PROJECT NOT FOUND
  ============================================================ */

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#030712] p-6 text-center text-white">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5">
          <ShieldAlert className="h-7 w-7 text-red-400" />
        </div>

        <h1 className="mb-4 text-2xl font-black uppercase italic tracking-widest text-red-400">
          Access Denied: Lab Not Found
        </h1>

        <p className="mb-8 max-w-md text-sm leading-6 text-slate-600">
          The requested security lab could not be loaded from the project registry.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 transition hover:bg-emerald-500 hover:text-black"
        >
          <ArrowLeft size={14} />
          Return to Command Center
        </Link>
      </div>
    );
  }

  /* ============================================================
     MAIN
  ============================================================ */

  return (
    <div className="min-h-screen overflow-hidden bg-[#030712] font-sans text-white selection:bg-emerald-500/30">
      {/* ========================================================
          NAVBAR
      ======================================================== */}

      <nav className="fixed top-0 z-50 w-full border-b border-white/[0.05] bg-[#030712]/80 px-[5%] py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 text-slate-500 transition hover:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] transition group-hover:border-emerald-500/20 group-hover:bg-emerald-500/10">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </span>

            <span className="text-[9px] font-black uppercase tracking-[0.25em]">
              Back to Portfolio
            </span>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.25em] text-emerald-500/60">
              Secure Connection
            </span>
          </div>
        </div>
      </nav>

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="relative min-h-[82vh] overflow-hidden bg-[#030712] pb-16 pt-28">
        <motion.div
          style={{
            scale: heroScale,
            opacity: heroOpacity,
          }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#020617]">
            <img
              src={projectImage}
              alt={title}
              loading="eager"
              decoding="async"
              className="h-full w-full object-contain object-center transition-transform duration-700"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src =
                  fallbackImage;
              }}
            />
          </div>

          {/* Dark security layer */}
          <div className="absolute inset-0 bg-[#030712]/60" />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/55 via-[#030712]/70 to-[#030712]" />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />

          {/* Emerald security glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.12),transparent_36%)]" />

          {/* Technical grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </motion.div>

        {/* Hero content */}
        <div
          className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-6 text-center"
          data-aos="zoom-out"
        >
          <div className="w-full">
            {/* Category */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/[0.08] px-4 py-2 backdrop-blur-xl">
              <ShieldCheck
                size={13}
                className="text-emerald-400"
              />

              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-emerald-400">
                {category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-black uppercase italic leading-[0.95] tracking-[-0.04em] text-white drop-shadow-2xl sm:text-5xl md:text-7xl lg:text-8xl">
              {title}
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-slate-300/90 md:text-lg">
              {description}
            </p>

            {/* Tech stack */}
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {techStack
                .slice(0, 8)
                .map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-slate-300 backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
            </div>

            {/* Actions */}
            <div className="relative z-20 mt-10 flex flex-wrap justify-center gap-3">
              {hasProjectLink ? (
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-black shadow-2xl transition hover:scale-[1.03] hover:bg-emerald-400 active:scale-95"
                >
                  <Github className="h-4 w-4" />
                  View Repository

                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="inline-flex cursor-not-allowed items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                  <Github className="h-4 w-4" />
                  Repository Coming Soon
                </span>
              )}

              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.08] px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 transition hover:scale-[1.03] hover:bg-emerald-500 hover:text-black active:scale-95"
              >
                <Layers3 className="h-4 w-4" />
                Explore More Labs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <main className="mx-auto max-w-7xl px-[5%] pb-24 pt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          {/* ======================================================
              LEFT
          ======================================================= */}

          <div className="min-w-0 space-y-16">
            {/* Security Objective */}
            <section data-aos="fade-up">
              <SectionHeading
                icon={ShieldAlert}
                eyebrow="01 / Security Objective"
                title="Why This Lab Exists"
              />

              <div className="rounded-[2rem] border border-emerald-500/10 bg-emerald-500/[0.025] p-7 md:p-10">
                <div className="flex gap-5">
                  <div className="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] sm:flex">
                    <LockKeyhole className="h-5 w-5 text-emerald-400" />
                  </div>

                  <p className="text-base leading-8 text-slate-400 md:text-lg">
                    {objective}
                  </p>
                </div>
              </div>
            </section>

            {/* ====================================================
                LAB EVIDENCE
            ===================================================== */}

            <section data-aos="fade-up">
              <SectionHeading
                icon={Radar}
                eyebrow="02 / Lab Evidence"
                title="Architecture & Lab View"
              />

              <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-3 shadow-2xl shadow-emerald-500/[0.03]">
                <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-[#050b14]">
                  <img
                    src={projectImage}
                    alt={`${title} architecture`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.015]"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        fallbackImage;
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-md">
                    <span className="font-mono text-[7px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Lab Evidence / 16:9
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ====================================================
                ARCHITECTURE
            ===================================================== */}

            <section data-aos="fade-up">
              <SectionHeading
                icon={Server}
                eyebrow="03 / Engineering Design"
                title="Architecture & Implementation"
              />

              <div className="rounded-[2rem] border border-white/[0.07] bg-white/[0.015] p-7 md:p-10">
                <p className="text-base leading-8 text-slate-400 md:text-lg">
                  {architectureText}
                </p>

                <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InfoCard
                    icon={Network}
                    title="Engineering Focus"
                    items={
                      engineeringFocus.length
                        ? engineeringFocus
                        : [
                            "Secure architecture",
                            "Identity & access controls",
                            "Network segmentation",
                            "Security visibility",
                          ]
                    }
                  />

                  <InfoCard
                    icon={ShieldCheck}
                    title="Security Controls"
                    items={
                      securityControls.length
                        ? securityControls
                        : [
                            "Preventive controls",
                            "Least privilege",
                            "Monitoring",
                            "Validation",
                          ]
                    }
                  />
                </div>
              </div>
            </section>

            {/* ====================================================
                OUTCOME
            ===================================================== */}

            <section data-aos="fade-up">
              <SectionHeading
                icon={Activity}
                eyebrow="04 / Security Validation"
                title="Engineering Outcome"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <OutcomeCard
                  title="Security Outcome"
                  icon={CheckCircle2}
                  items={
                    outcomes.length
                      ? outcomes
                      : [
                          "Validated security controls",
                          "Improved security visibility",
                          "Reduced exposed attack surface",
                          "Practical implementation evidence",
                        ]
                  }
                />

                <OutcomeCard
                  title="Practical Value"
                  icon={Zap}
                  items={[
                    "Hands-on engineering experience",
                    "Repeatable security workflow",
                    "Cloud and enterprise alignment",
                    "Portfolio-ready technical evidence",
                  ]}
                />
              </div>
            </section>
          </div>

          {/* ======================================================
              RIGHT SIDEBAR
          ======================================================= */}

          <aside className="min-w-0">
            <div
              className="lg:sticky lg:top-28"
              data-aos="fade-left"
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl">
                <div className="border-b border-white/[0.05] p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06]">
                      <Zap className="h-4 w-4 text-yellow-400" />
                    </div>

                    <div>
                      <p className="text-[8px] font-black uppercase tracking-[0.25em] text-emerald-400">
                        Lab Metadata
                      </p>

                      <p className="mt-1 text-[10px] text-slate-600">
                        Security Engineering Record
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-7 p-7">
                  <MetaItem
                    label="Classification"
                    value={category}
                  />

                  <MetaItem
                    label="Status"
                    value={
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        {status}
                      </span>
                    }
                  />

                  <MetaItem
                    label="Project Type"
                    value={labType}
                  />

                  <div className="border-t border-white/[0.05] pt-7">
                    <p className="mb-4 text-[8px] font-black uppercase tracking-[0.22em] text-emerald-500">
                      Technology Stack
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/[0.05] pt-7">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />

                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.18em] text-slate-600">
                          Engineering Standard
                        </p>

                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-300">
                          Design • Implement • Validate
                        </p>
                      </div>
                    </div>
                  </div>

                  {hasProjectLink && (
                    <a
                      href={projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 text-[9px] font-black uppercase tracking-[0.18em] text-black transition hover:scale-[1.02] hover:bg-white"
                    >
                      <Github className="h-4 w-4" />

                      Open GitHub Repository

                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ========================================================
          FOOTER CTA
      ======================================================== */}

      <section className="border-t border-white/[0.05] bg-gradient-to-b from-transparent to-emerald-500/[0.015] px-6 py-24 text-center">
        <p className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-slate-700">
          Security Engineering Portfolio
        </p>

        <h2 className="mt-4 text-2xl font-black uppercase italic tracking-tight text-slate-300 md:text-3xl">
          Explore the Next Security Lab
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
          Continue through the lab archive to explore additional cloud,
          identity, SIEM, AI security, network security, and threat detection
          implementations.
        </p>

        <Link
          to="/"
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-emerald-500 px-9 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-black transition hover:scale-105 hover:bg-white"
        >
          Return to Lab Dashboard

          <Zap className="h-4 w-4 fill-current" />
        </Link>
      </section>
    </div>
  );
};

/* ================================================================
   SECTION HEADING
================================================================ */

const SectionHeading = ({
  icon: Icon,
  eyebrow,
  title,
}) => (
  <div className="mb-8">
    <div className="mb-3 flex items-center gap-3">
      <Icon className="h-4 w-4 text-emerald-400" />

      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-emerald-500/70">
        {eyebrow}
      </span>
    </div>

    <div className="flex items-center gap-5">
      <h2 className="shrink-0 text-2xl font-black uppercase italic tracking-[-0.03em] text-white md:text-3xl">
        {title}
      </h2>

      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  </div>
);

/* ================================================================
   INFO CARD
================================================================ */

const InfoCard = ({
  icon: Icon,
  title,
  items,
}) => (
  <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.025] p-6">
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/10 bg-emerald-500/[0.05]">
        <Icon className="h-4 w-4 text-emerald-400" />
      </div>

      <h3 className="text-[10px] font-black uppercase tracking-[0.16em] text-white">
        {title}
      </h3>
    </div>

    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="flex items-start gap-3 text-xs leading-5 text-slate-500"
        >
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500/70" />

          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ================================================================
   OUTCOME CARD
================================================================ */

const OutcomeCard = ({
  icon: Icon,
  title,
  items,
}) => (
  <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition hover:border-emerald-500/15">
    <div className="mb-5 flex items-center gap-3">
      <Icon className="h-5 w-5 text-emerald-400" />

      <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-white">
        {title}
      </h3>
    </div>

    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="flex items-start gap-3 text-sm leading-6 text-slate-500"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/70" />

          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ================================================================
   META ITEM
================================================================ */

const MetaItem = ({
  label,
  value,
}) => (
  <div>
    <p className="mb-2 text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500">
      {label}
    </p>

    <div className="text-sm font-medium leading-6 text-slate-300">
      {value}
    </div>
  </div>
);

export default ProjectDetails;