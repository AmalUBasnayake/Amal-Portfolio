import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "../supabase";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Skeleton,
} from "@mui/material";
import {
  Award,
  ShieldCheck,
  Zap,
  RefreshCw,
  AlertTriangle,
  Database,
  Layers3,
  Terminal,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import CardProject from "../components/CardProject";
import Certifications from "../components/Certifications";

/* ============================================================
   ARCHIVE TOGGLE
============================================================ */

const ToggleButton = ({
  onClick,
  isShowingMore,
}) => (
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
      gap-3
      overflow-hidden
      rounded-xl
      border
      border-emerald-500/20
      bg-emerald-500/[0.07]
      px-7
      py-3.5
      shadow-[0_0_30px_rgba(16,185,129,0.04)]
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:border-emerald-500/40
      hover:bg-emerald-500/[0.12]
      hover:shadow-[0_0_35px_rgba(16,185,129,0.10)]
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-emerald-400
      focus-visible:ring-offset-2
      focus-visible:ring-offset-[#030014]
    "
  >
    <span
      className="
        absolute
        inset-0
        -translate-x-full
        bg-gradient-to-r
        from-transparent
        via-white/[0.06]
        to-transparent
        transition-transform
        duration-700
        group-hover:translate-x-full
      "
    />

    <span
      className="
        relative
        flex
        items-center
        gap-2.5
        text-[10px]
        font-black
        uppercase
        tracking-[0.16em]
        text-emerald-400
      "
    >
      {isShowingMore
        ? "Show Less Labs"
        : "Explore Full Lab Archive"}

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

function TabPanel({
  children,
  value,
  index,
  id,
}) {
  const isActive = value === index;

  return (
    <div
      role="tabpanel"
      id={id}
      hidden={!isActive}
      aria-hidden={!isActive}
    >
      {isActive && (
        <Box
          sx={{
            p: {
              xs: 0,
              sm: 1,
              md: 1.5,
            },
            mt: {
              xs: 1.5,
              md: 2,
            },
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
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
  Portfolio positioning:

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
  const normalizedTitle =
    title.toLowerCase();

  const index = PRIORITY_ORDER.findIndex(
    (key) =>
      normalizedTitle.includes(
        key.toLowerCase()
      )
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
      duration: 850,
      once: true,
      offset: 70,
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

      const sortedProjects =
        sortProjects(data || []);

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
      id="Portfolio"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#030014]
        px-[5%]
        pb-28
        pt-24
        md:px-[7%]
        lg:px-[8%]
        lg:pt-28
      "
    >
      {/* ======================================================
          BACKGROUND SYSTEM
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.075),transparent_52%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-15%]
          top-[22%]
          h-[360px]
          w-[360px]
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
          bottom-[8%]
          right-[-15%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-500/[0.025]
          blur-[130px]
        "
      />

      {/* Technical grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.018]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1700px]">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div
          data-aos="fade-up"
          className="mx-auto mb-12 max-w-5xl text-center"
        >
          {/* Status badge */}

          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2.5
              rounded-full
              border
              border-emerald-500/15
              bg-emerald-500/[0.035]
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>

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

          {/* Eyebrow */}

          <p
            className="
              mb-3
              font-mono
              text-[8px]
              uppercase
              tracking-[0.38em]
              text-slate-600
            "
          >
            Security Engineering / Lab Archive
          </p>

          {/* Main heading */}

          <h2
            className="
              text-4xl
              font-black
              uppercase
              italic
              leading-[0.95]
              tracking-[-0.045em]
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Security{" "}
            <span
              className="
                bg-gradient-to-r
                from-emerald-400
                via-cyan-400
                to-blue-500
                bg-clip-text
                text-transparent
              "
            >
              Engineering Labs.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
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
              LIVE METRICS
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
              {/* Lab count */}

              <MetricChip
                icon={Database}
                color="emerald"
                value={`${projectCount} Labs Loaded`}
              />

              {/* Domain */}

              <MetricChip
                icon={Layers3}
                color="blue"
                value="Multi-Domain Security"
              />

              {/* Engineering */}

              <MetricChip
                icon={Activity}
                color="cyan"
                value="Hands-On Engineering"
              />
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
              bgcolor:
                "rgba(255,255,255,0.018)",
              backdropFilter:
                "blur(20px)",
              border:
                "1px solid rgba(255,255,255,0.06)",
              borderRadius: "22px",
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
                  xs: 72,
                  md: 78,
                },

                "& .MuiTabs-indicator": {
                  height: 2,
                  borderRadius: "999px",
                  bgcolor: "#10b981",
                  boxShadow:
                    "0 0 18px rgba(16,185,129,0.4)",
                },

                "& .MuiTabs-flexContainer": {
                  height: "100%",
                },
              }}
            >
              <PortfolioTab
                index={0}
                icon={ShieldCheck}
                label="Security Labs"
              />

              <PortfolioTab
                index={1}
                icon={Award}
                label="Credentials"
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
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>

                <p className="text-sm font-bold text-red-300">
                  {error}
                </p>

                <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-slate-600">
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
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retry Archive
                </button>
              </div>
            )}

            {/* =================================================
                PROJECT GRID
            ================================================= */}

            {!error && (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:gap-6
                  md:grid-cols-2
                  xl:grid-cols-3
                  auto-rows-fr
                "
              >
                {loading
                  ? [...Array(6)].map(
                      (_, index) => (
                        <ProjectSkeleton
                          key={`skeleton-${index}`}
                        />
                      )
                    )
                  : visibleProjects.map(
                      (project, index) => (
                        <motion.div
                          key={
                            project.id ||
                            `project-${index}`
                          }
                          initial={{
                            opacity: 0,
                            y: 18,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.45,
                            delay:
                              (index % 6) * 0.055,
                            ease: "easeOut",
                          }}
                          className="flex h-full min-w-0"
                        >
                          <CardProject
                            {...project}
                          />
                        </motion.div>
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
                <div className="mt-14 flex flex-col items-center">
                  <div className="mb-4 flex items-center gap-3">
                    <Terminal
                      size={11}
                      className="text-emerald-500/60"
                    />

                    <span
                      className="
                        font-mono
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-slate-700
                      "
                    >
                      Archive Control
                    </span>
                  </div>

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
          <div className="mt-16">
            <div className="mx-auto mb-6 h-px max-w-3xl bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            <div
              className="
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
                  flex
                  items-center
                  gap-2
                  font-mono
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-slate-700
                "
              >
                <span className="h-1 w-1 rounded-full bg-emerald-500/50" />

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
          </div>
        )}
      </div>
    </section>
  );
}

/* ================================================================
   PORTFOLIO TAB
================================================================ */

const PortfolioTab = ({
  icon: Icon,
  label,
  index,
}) => (
  <Tab
    {...getTabProps(index)}
    icon={
      <Icon
        aria-hidden="true"
        className="mb-1 h-4 w-4 text-emerald-500"
      />
    }
    label={label}
    sx={{
      minHeight: {
        xs: 72,
        md: 78,
      },

      color: "#64748b",

      fontWeight: 800,

      fontSize: {
        xs: "0.6rem",
        sm: "0.65rem",
        md: "0.72rem",
      },

      letterSpacing: "0.12em",

      textTransform: "uppercase",

      transition:
        "all 250ms ease",

      "&.Mui-selected": {
        color: "#ffffff",
      },

      "&:hover": {
        color: "#cbd5e1",
        background:
          "rgba(255,255,255,0.02)",
      },

      "&:focus-visible": {
        outline:
          "2px solid #34d399",
        outlineOffset: "-3px",
      },
    }}
  />
);

/* ================================================================
   METRIC CHIP
================================================================ */

const MetricChip = ({
  icon: Icon,
  color,
  value,
}) => {
  const colorMap = {
    emerald: "text-emerald-400",
    blue: "text-blue-400",
    cyan: "text-cyan-400",
  };

  return (
    <div
      className="
        inline-flex
        items-center
        gap-2.5
        rounded-xl
        border
        border-white/[0.06]
        bg-white/[0.02]
        px-4
        py-2.5
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-white/[0.10]
        hover:bg-white/[0.035]
      "
    >
      <Icon
        aria-hidden="true"
        className={`h-3.5 w-3.5 ${
          colorMap[color] ||
          "text-emerald-400"
        }`}
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
        {value}
      </span>
    </div>
  );
};

/* ================================================================
   PROJECT SKELETON
================================================================ */

const ProjectSkeleton = () => (
  <div className="h-full min-h-[520px] overflow-hidden rounded-[1.7rem] border border-white/[0.06] bg-white/[0.02] p-5">
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{
        width: "100%",
        aspectRatio: "16 / 9",
        height: "auto",
        bgcolor:
          "rgba(255,255,255,0.045)",
        borderRadius: "16px",
        transform: "none",
      }}
    />

    <div className="mt-5">
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: "32%",
          bgcolor:
            "rgba(255,255,255,0.04)",
          transform: "none",
        }}
      />

      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: "86%",
          height: 32,
          bgcolor:
            "rgba(255,255,255,0.06)",
          transform: "none",
        }}
      />

      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: "72%",
          height: 32,
          bgcolor:
            "rgba(255,255,255,0.05)",
          transform: "none",
        }}
      />

      <div className="mt-4 space-y-2">
        <Skeleton
          variant="text"
          animation="wave"
          sx={{
            width: "100%",
            bgcolor:
              "rgba(255,255,255,0.035)",
            transform: "none",
          }}
        />

        <Skeleton
          variant="text"
          animation="wave"
          sx={{
            width: "88%",
            bgcolor:
              "rgba(255,255,255,0.035)",
            transform: "none",
          }}
        />
      </div>

      <div className="mt-5 flex gap-2">
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: 72,
            height: 24,
            bgcolor:
              "rgba(255,255,255,0.04)",
          }}
        />

        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: 82,
            height: 24,
            bgcolor:
              "rgba(255,255,255,0.04)",
          }}
        />
      </div>

      <div className="mt-5 border-t border-white/[0.05] pt-4">
        <div className="flex justify-between">
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              width: 90,
              height: 34,
              bgcolor:
                "rgba(255,255,255,0.04)",
            }}
          />

          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              width: 125,
              height: 34,
              bgcolor:
                "rgba(255,255,255,0.04)",
            }}
          />
        </div>
      </div>
    </div>
  </div>
);