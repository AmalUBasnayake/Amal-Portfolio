import React, { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase";
import { AppBar, Tabs, Tab, Box, Skeleton } from "@mui/material";
import {
  Award,
  ShieldCheck,
  Zap,
  RefreshCw,
  AlertTriangle,
  Database,
  Layers3,
} from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import CardProject from "../components/CardProject";
import Certifications from "../components/Certifications";

/* ============================================================
   ARCHIVE TOGGLE
============================================================ */

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    type="button"
    onClick={onClick}
    aria-expanded={isShowingMore}
    className="
      group
      relative
      inline-flex
      items-center
      justify-center
      rounded-xl
      border
      border-emerald-500/20
      bg-emerald-500/10
      px-6
      py-3
      shadow-lg
      transition-all
      duration-300
      hover:border-emerald-500/40
      hover:bg-emerald-500/20
      hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-emerald-400
      focus-visible:ring-offset-2
      focus-visible:ring-offset-[#030014]
    "
  >
    <span
      className="
        flex
        items-center
        gap-2
        text-sm
        font-black
        uppercase
        tracking-wider
        text-emerald-400
      "
    >
      {isShowingMore ? "Show Less Labs" : "Explore Full Lab Archive"}

      <Zap
        aria-hidden="true"
        className={`
          h-4
          w-4
          transition-transform
          duration-500
          ${
            isShowingMore
              ? "rotate-180"
              : "group-hover:scale-125"
          }
        `}
      />
    </span>
  </button>
);

/* ============================================================
   TAB PANEL
============================================================ */

function TabPanel({ children, value, index, id }) {
  const isActive = value === index;

  return (
    <div
      role="tabpanel"
      id={id}
      hidden={!isActive}
      aria-hidden={!isActive}
    >
      {isActive && (
        <Box sx={{ p: { xs: 0, sm: 2 }, mt: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            {children}
          </motion.div>
        </Box>
      )}
    </div>
  );
}

/* ============================================================
   TAB PROPS
============================================================ */

function getTabProps(index) {
  return {
    id: `portfolio-tab-${index}`,
    "aria-controls": `portfolio-tabpanel-${index}`,
  };
}

/* ============================================================
   PRIORITY ENGINE
============================================================ */

/*
  The order intentionally reflects the current portfolio
  positioning:

  AI Security
  → Cloud / Container Security
  → DevSecOps
  → Identity / Data Security
  → Network Security
  → SIEM / SOAR
  → Threat Detection
*/

const PRIORITY_ORDER = [
  // AI SECURITY
  "OpenAI",
  "Purview",
  "Content Safety",

  // CLOUD / CONTAINER SECURITY
  "AKS Key Vault",
  "AKS",
  "Kubernetes",
  "Container Security",

  // DEVSECOPS
  "DevOps",

  // IDENTITY / DATA SECURITY
  "Managed Identity",
  "Key Vault",
  "Blob Storage",
  "SQL Advanced",
  "SQL Private",

  // NETWORK SECURITY
  "Private Endpoint",
  "Zero Trust",
  "DDoS",
  "Firewall",
  "WAF",
  "High Availability",

  // SOC / SIEM / SOAR
  "SOAR",
  "Sentinel",
  "SIEM",

  // THREAT DETECTION
  "Honeypot",
  "Vulnerability",
];

/* ============================================================
   PROJECT RANKING
============================================================ */

const getProjectRank = (title = "") => {
  const normalizedTitle = title.toLowerCase();

  const index = PRIORITY_ORDER.findIndex((key) =>
    normalizedTitle.includes(key.toLowerCase())
  );

  return index === -1 ? 999 : index;
};

const sortProjects = (projects = []) => {
  return [...projects].sort((a, b) => {
    const rankDifference =
      getProjectRank(a?.Title) -
      getProjectRank(b?.Title);

    if (rankDifference !== 0) {
      return rankDifference;
    }

    /*
      Stable secondary ordering keeps the archive
      predictable when two projects have the same rank.
    */
    return (a?.Title || "").localeCompare(
      b?.Title || ""
    );
  });
};

/* ============================================================
   MAIN PORTFOLIO
============================================================ */

export default function Portfolio() {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllProjects, setShowAllProjects] =
    useState(false);
  const [error, setError] = useState("");

  /* ==========================================================
     AOS
  ========================================================== */

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });

    return () => {
      AOS.refreshHard();
    };
  }, []);

  /* ==========================================================
     FETCH PROJECTS
  ========================================================== */

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const {
        data,
        error: supabaseError,
      } = await supabase
        .from("projects")
        .select("*");

      if (supabaseError) {
        throw supabaseError;
      }

      const sortedProjects = sortProjects(data || []);

      setProjects(sortedProjects);
    } catch (err) {
      console.error(
        "Portfolio project fetch error:",
        err
      );

      setError(
        "Unable to load security labs right now."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ==========================================================
     TAB HANDLER
  ========================================================== */

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  /* ==========================================================
     VISIBLE PROJECTS
  ========================================================== */

  const visibleProjects = useMemo(() => {
    return showAllProjects
      ? projects
      : projects.slice(0, 6);
  }, [projects, showAllProjects]);

  /* ==========================================================
     VERIFIED PROJECT COUNT
  ========================================================== */

  const projectCount = projects.length;

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      id="Portofolio"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#030014]
        px-[5%]
        pt-24
        pb-28
        md:px-[8%]
        lg:px-[10%]
      "
    >
      {/* ======================================================
          BACKGROUND SYSTEM GLOW
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_55%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-15%]
          top-[25%]
          h-[350px]
          w-[350px]
          rounded-full
          bg-emerald-500/[0.025]
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-15%]
          bottom-[10%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-blue-500/[0.025]
          blur-[130px]
        "
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1800px]">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          data-aos="fade-up"
          className="mb-12 text-center"
        >
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-500/15
              bg-emerald-500/[0.04]
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <ShieldCheck
              aria-hidden="true"
              className="h-3.5 w-3.5 text-emerald-400"
            />

            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.28em]
                text-emerald-400
              "
            >
              Proof of Work
            </span>
          </div>

          <p
            className="
              mb-3
              text-[9px]
              font-mono
              uppercase
              tracking-[0.35em]
              text-slate-600
            "
          >
            Security Engineering / Lab Archive
          </p>

          <h2
            className="
              text-4xl
              font-black
              uppercase
              italic
              tracking-[-0.04em]
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Security{" "}
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
              Engineering Labs.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-sm
              leading-7
              text-slate-500
              md:text-base
            "
          >
            Hands-on cloud security, AI security,
            Kubernetes, DevSecOps, identity,
            SIEM/SOAR, network defense, and threat
            detection labs built to demonstrate
            practical security engineering capability.
          </p>

          {/* ==================================================
              LIVE PROJECT METRICS
          ================================================== */}

          {!loading && !error && (
            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  px-4
                  py-2.5
                  backdrop-blur-xl
                "
              >
                <Database
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-emerald-400"
                />

                <span
                  className="
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    text-slate-500
                  "
                >
                  {projectCount} Labs Loaded
                </span>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  px-4
                  py-2.5
                  backdrop-blur-xl
                "
              >
                <Layers3
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-blue-400"
                />

                <span
                  className="
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    text-slate-500
                  "
                >
                  Multi-Domain Security
                </span>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  px-4
                  py-2.5
                  backdrop-blur-xl
                "
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-cyan-400"
                />

                <span
                  className="
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    text-slate-500
                  "
                >
                  Hands-On Engineering
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ====================================================
            MAIN TABS
        ==================================================== */}

        <Box sx={{ width: "100%" }}>
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: "rgba(255,255,255,0.025)",
              backdropFilter: "blur(18px)",
              border:
                "1px solid rgba(255,255,255,0.06)",
              borderRadius: "24px",
              mb: 1,
              overflow: "hidden",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="Security portfolio sections"
              sx={{
                minHeight: {
                  xs: 76,
                  md: 86,
                },

                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: "999px",
                  bgcolor: "#10b981",
                  boxShadow:
                    "0 0 16px rgba(16,185,129,0.35)",
                },

                "& .MuiTabs-flexContainer": {
                  height: "100%",
                },
              }}
            >
              <Tab
                {...getTabProps(0)}
                icon={
                  <ShieldCheck
                    className="
                      mb-1
                      h-5
                      w-5
                      text-emerald-500
                    "
                  />
                }
                label="Security Labs"
                sx={{
                  minHeight: {
                    xs: 76,
                    md: 86,
                  },
                  color: "#64748b",
                  fontWeight: 800,
                  fontSize: {
                    xs: "0.65rem",
                    md: "0.75rem",
                  },
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition:
                    "all 250ms ease",

                  "&.Mui-selected": {
                    color: "#ffffff",
                  },

                  "&:focus-visible": {
                    outline:
                      "2px solid #34d399",
                    outlineOffset: "-3px",
                  },
                }}
              />

              <Tab
                {...getTabProps(1)}
                icon={
                  <Award
                    className="
                      mb-1
                      h-5
                      w-5
                      text-emerald-500
                    "
                  />
                }
                label="Credentials"
                sx={{
                  minHeight: {
                    xs: 76,
                    md: 86,
                  },
                  color: "#64748b",
                  fontWeight: 800,
                  fontSize: {
                    xs: "0.65rem",
                    md: "0.75rem",
                  },
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition:
                    "all 250ms ease",

                  "&.Mui-selected": {
                    color: "#ffffff",
                  },

                  "&:focus-visible": {
                    outline:
                      "2px solid #34d399",
                    outlineOffset: "-3px",
                  },
                }}
              />
            </Tabs>
          </AppBar>

          {/* ==================================================
              SECURITY LABS PANEL
          ================================================== */}

          <TabPanel
            value={value}
            index={0}
            id="portfolio-tabpanel-0"
          >
            {/* =================================================
                ERROR STATE
            ================================================= */}

            {error && (
              <div
                className="
                  mx-auto
                  max-w-xl
                  rounded-2xl
                  border
                  border-red-500/15
                  bg-red-500/[0.035]
                  p-8
                  text-center
                "
              >
                <div
                  className="
                    mx-auto
                    mb-4
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-red-500/20
                    bg-red-500/10
                  "
                >
                  <AlertTriangle
                    className="h-5 w-5 text-red-400"
                  />
                </div>

                <p
                  className="
                    text-sm
                    font-bold
                    text-red-300
                  "
                >
                  {error}
                </p>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-6
                    text-slate-600
                  "
                >
                  The security lab archive could not
                  be retrieved from the project data
                  source.
                </p>

                <button
                  type="button"
                  onClick={fetchData}
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-5
                    py-2.5
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-red-300
                    transition-all
                    duration-300
                    hover:border-red-500/35
                    hover:bg-red-500/15
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-red-400
                  "
                >
                  <RefreshCw
                    className="h-3.5 w-3.5"
                  />
                  Retry Archive
                </button>
              </div>
            )}

            {/* =================================================
                LOADING / PROJECT GRID
            ================================================= */}

            {!error && (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  md:grid-cols-2
                  xl:grid-cols-3
                  2xl:grid-cols-4
                  auto-rows-fr
                "
              >
                {loading
                  ? [...Array(8)].map((_, index) => (
                      <div
                        key={`skeleton-${index}`}
                        className="h-full"
                      >
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          height={450}
                          sx={{
                            width: "100%",
                            bgcolor:
                              "rgba(255,255,255,0.045)",
                            borderRadius: "28px",
                            transform: "none",
                          }}
                        />
                      </div>
                    ))
                  : visibleProjects.map(
                      (project, index) => (
                        <div
                          key={
                            project.id ||
                            `project-${index}`
                          }
                          data-aos="zoom-in-up"
                          data-aos-delay={
                            (index % 8) * 60
                          }
                          className="flex h-full"
                        >
                          <CardProject
                            {...project}
                          />
                        </div>
                      )
                    )}
              </div>
            )}

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!loading &&
              !error &&
              projects.length === 0 && (
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.02]
                    px-6
                    py-16
                    text-center
                  "
                >
                  <ShieldCheck
                    className="
                      mx-auto
                      mb-4
                      h-8
                      w-8
                      text-slate-700
                    "
                  />

                  <p
                    className="
                      text-sm
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-slate-500
                    "
                  >
                    No Security Labs Available
                  </p>

                  <p
                    className="
                      mx-auto
                      mt-2
                      max-w-md
                      text-xs
                      leading-6
                      text-slate-700
                    "
                  >
                    The project archive currently
                    contains no published security lab
                    records.
                  </p>
                </div>
              )}

            {/* =================================================
                ARCHIVE CONTROLS
            ================================================= */}

            {!loading &&
              !error &&
              projects.length > 6 && (
                <div className="mt-14 flex justify-center">
                  <ToggleButton
                    onClick={() =>
                      setShowAllProjects(
                        (previous) => !previous
                      )
                    }
                    isShowingMore={
                      showAllProjects
                    }
                  />
                </div>
              )}
          </TabPanel>

          {/* ==================================================
              CREDENTIALS PANEL
          ================================================== */}

          <TabPanel
            value={value}
            index={1}
            id="portfolio-tabpanel-1"
          >
            <div
              className="
                overflow-hidden
                rounded-[1.5rem]
                border
                border-white/[0.06]
                bg-white/[0.015]
                p-2
                md:p-4
              "
            >
              <Certifications />
            </div>
          </TabPanel>
        </Box>

        {/* ====================================================
            ENGINEERING FOOTER
        ==================================================== */}

        {!loading && !error && (
          <div
            className="
              mt-16
              flex
              items-center
              justify-center
              gap-3
              text-center
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-8
                bg-slate-800
                md:w-16
              "
            />

            <span
              className="
                text-[7px]
                font-mono
                font-bold
                uppercase
                tracking-[0.28em]
                text-slate-700
              "
            >
              Build • Secure • Detect • Automate
            </span>

            <span
              aria-hidden="true"
              className="
                h-px
                w-8
                bg-slate-800
                md:w-16
              "
            />
          </div>
        )}
      </div>
    </section>
  );
}