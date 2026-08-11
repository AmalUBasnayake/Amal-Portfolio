import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "../supabase";
import {
  Shield,
  Cloud,
  Terminal,
  Users,
  LifeBuoy,
  Settings,
  ArrowUpRight,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Activity,
  LockKeyhole,
  Network,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

/* ============================================================
   SERVICE ICON MAPPING
============================================================ */

const SERVICE_ICONS = {
  "Cloud Security": Cloud,
  "Identity Management": Users,
  "Infrastructure Hardening": Shield,
  "Enterprise IT Support": LifeBuoy,
  "SOC Automation": Terminal,
  "Systems Administration": Settings,
  default: Shield,
};

/* ============================================================
   FALLBACK SERVICES
============================================================ */

const FALLBACK_SERVICES = [
  {
    id: 1,
    title: "Cloud Security",
    description:
      "Secure Azure and Microsoft 365 cloud environments against advanced threats with enterprise-grade security controls and workload protection.",
    features: [
      "Defender for Cloud",
      "Compliance Audit",
      "NSG Security",
    ],
  },
  {
    id: 2,
    title: "Identity Management",
    description:
      "Secure enterprise identities and govern access using Zero Trust principles, strong authentication, and identity-based security controls.",
    features: [
      "Azure AD / Entra ID",
      "MFA Implementation",
      "Conditional Access",
    ],
  },
  {
    id: 3,
    title: "Infrastructure Hardening",
    description:
      "Harden on-premise and hybrid infrastructure to reduce attack surfaces and improve enterprise security resilience.",
    features: [
      "Windows Server Security",
      "GPO Hardening",
      "Network Isolation",
    ],
  },
  {
    id: 4,
    title: "Enterprise IT Support",
    description:
      "Security-focused enterprise IT operations supporting Microsoft 365, users, collaboration platforms, infrastructure, and daily operations.",
    features: [
      "Microsoft 365 Administration",
      "Microsoft Teams",
      "User & Access Management",
    ],
  },
  {
    id: 5,
    title: "SOC Automation",
    description:
      "Build security monitoring and automated response workflows using SIEM, SOAR, detection engineering, and security analytics.",
    features: [
      "Microsoft Sentinel",
      "KQL Detection",
      "SOAR Playbooks",
    ],
  },
  {
    id: 6,
    title: "Systems Administration",
    description:
      "Operate and secure enterprise systems through reliable administration, monitoring, access control, and security hardening.",
    features: [
      "Systems Operations",
      "Monitoring",
      "Security Hardening",
    ],
  },
];

/* ============================================================
   SERVICE CARD
============================================================ */

const ServiceCard = memo(
  ({ title, description, features, index }) => {
    const Icon =
      SERVICE_ICONS[title] ||
      SERVICE_ICONS.default;

    return (
      <motion.article
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.55,
          delay: index * 0.07,
          ease: "easeOut",
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        whileHover={{
          y: -6,
        }}
        className="group relative h-full"
      >
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -inset-1
            rounded-[2rem]
            bg-gradient-to-br
            from-emerald-500/0
            via-blue-500/0
            to-purple-500/0
            opacity-0
            blur-2xl
            transition-all
            duration-700
            group-hover:from-emerald-500/10
            group-hover:via-blue-500/5
            group-hover:to-purple-500/10
            group-hover:opacity-100
          "
        />

        {/* CARD */}
        <div
          className="
            relative
            flex
            h-full
            min-h-[420px]
            flex-col
            overflow-hidden
            rounded-[1.75rem]
            border
            border-white/[0.07]
            bg-[#08111d]/90
            p-6
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            backdrop-blur-2xl
            transition-all
            duration-500
            group-hover:border-emerald-500/20
            group-hover:shadow-[0_25px_80px_rgba(16,185,129,0.07)]
            md:p-7
          "
        >
          {/* Radial Background */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.075),transparent_45%)]
              opacity-80
            "
          />

          {/* Grid Texture */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.025]
              [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)]
              [background-size:32px_32px]
            "
          />

          <div className="relative z-10 flex h-full flex-col">
            {/* =================================================
                TOP
            ================================================= */}

            <div className="mb-7 flex items-start justify-between">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  transition-all
                  duration-500
                  group-hover:border-emerald-400/30
                  group-hover:bg-emerald-500/15
                  group-hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]
                "
              >
                <Icon
                  aria-hidden="true"
                  className="
                    h-7
                    w-7
                    text-emerald-400
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                  strokeWidth={1.6}
                />
              </div>

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  transition-all
                  duration-300
                  group-hover:border-emerald-500/20
                  group-hover:bg-emerald-500/10
                "
              >
                <ArrowUpRight
                  aria-hidden="true"
                  size={17}
                  className="
                    text-slate-700
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-emerald-400
                  "
                />
              </div>
            </div>

            {/* =================================================
                CATEGORY
            ================================================= */}

            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span
                className="
                  text-[8px]
                  font-mono
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-slate-600
                "
              >
                Security Capability
              </span>
            </div>

            {/* =================================================
                TITLE
            ================================================= */}

            <div className="flex min-h-[58px] items-start">
              <h3
                className="
                  text-xl
                  font-black
                  leading-tight
                  tracking-tight
                  text-white
                  transition-colors
                  duration-300
                  group-hover:text-emerald-400
                  md:text-2xl
                "
              >
                {title}
              </h3>
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="mt-4 min-h-[84px]">
              <p
                className="
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                {description}
              </p>
            </div>

            {/* Divider */}
            <div
              aria-hidden="true"
              className="
                my-6
                h-px
                bg-gradient-to-r
                from-white/[0.08]
                via-white/[0.04]
                to-transparent
              "
            />

            {/* =================================================
                FEATURES
            ================================================= */}

            <div className="min-h-[132px]">
              <p
                className="
                  mb-4
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-slate-700
                "
              >
                Core Capabilities
              </p>

              <div className="space-y-3">
                {features?.slice(0, 4).map(
                  (feature, featureIndex) => (
                    <div
                      key={`${feature}-${featureIndex}`}
                      className="
                        flex
                        items-start
                        gap-3
                        text-xs
                        leading-5
                        text-slate-400
                      "
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        size={14}
                        className="
                          mt-0.5
                          shrink-0
                          text-emerald-500/80
                        "
                      />

                      <span
                        className="
                          transition-colors
                          duration-300
                          group-hover:text-slate-300
                        "
                      >
                        {feature}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* =================================================
                BOTTOM STATUS
            ================================================= */}

            <div className="mt-auto pt-6">
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/[0.04]
                  pt-5
                "
              >
                <span
                  className="
                    text-[7px]
                    font-mono
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-slate-700
                  "
                >
                  Enterprise Security
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-[7px]
                    font-mono
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-emerald-500/60
                  "
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-0
              h-[2px]
              w-0
              bg-gradient-to-r
              from-emerald-400
              via-cyan-400
              to-blue-500
              transition-all
              duration-700
              group-hover:w-full
            "
          />
        </div>
      </motion.article>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

/* ============================================================
   METRIC CARD
============================================================ */

const CapabilityMetric = memo(
  ({ icon: Icon, value, label }) => (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-white/[0.06]
        bg-white/[0.025]
        px-4
        py-3
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          border
          border-emerald-500/15
          bg-emerald-500/[0.06]
        "
      >
        <Icon
          size={16}
          className="text-emerald-400"
        />
      </div>

      <div>
        <p className="text-base font-black text-white">
          {value}
        </p>

        <p
          className="
            text-[7px]
            font-black
            uppercase
            tracking-[0.15em]
            text-slate-600
          "
        >
          {label}
        </p>
      </div>
    </div>
  )
);

CapabilityMetric.displayName =
  "CapabilityMetric";

/* ============================================================
   MAIN SERVICES COMPONENT
============================================================ */

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ==========================================================
     AOS INITIALIZATION
  ========================================================== */

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 900,
      offset: 70,
      easing: "ease-out-cubic",
    });
  }, []);

  /* ==========================================================
     FETCH SERVICES
  ========================================================== */

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const {
        data,
        error: supabaseError,
      } = await supabase
        .from("services")
        .select("*")
        .order("id", {
          ascending: true,
        });

      if (supabaseError) {
        throw supabaseError;
      }

      setServices(
        data?.length
          ? data
          : FALLBACK_SERVICES
      );
    } catch (err) {
      console.error(
        "Services fetch error:",
        err
      );

      setServices(FALLBACK_SERVICES);

      setError(
        "Live service data unavailable. Showing configured capability profile."
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
     METRICS
  ========================================================== */

  const featureCount = useMemo(() => {
    return services.reduce(
      (total, service) =>
        total +
        (Array.isArray(service.features)
          ? service.features.length
          : 0),
      0
    );
  }, [services]);

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      id="Services"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#030712]
        px-[5%]
        py-24
        md:px-[8%]
        lg:px-[10%]
        lg:py-28
      "
    >
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06),transparent_55%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-150px]
          top-[20%]
          h-[420px]
          w-[420px]
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
          bottom-[10%]
          right-[-150px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-500/[0.025]
          blur-[120px]
        "
      />

      <div className="relative z-10 mx-auto max-w-[1700px]">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <header
          data-aos="fade-up"
          className="mb-12"
        >
          <div className="mb-5 flex items-center gap-3">
            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-emerald-400
                shadow-[0_0_14px_rgba(52,211,153,0.8)]
              "
            />

            <p
              className="
                text-[9px]
                font-mono
                font-bold
                uppercase
                tracking-[0.35em]
                text-emerald-400
              "
            >
              Enterprise Capability Matrix
            </p>
          </div>

          <h2
            className="
              text-4xl
              font-black
              uppercase
              italic
              leading-none
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
              Capabilities.
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-3xl
              text-sm
              leading-7
              text-slate-500
              md:text-base
            "
          >
            Enterprise-focused cybersecurity
            capabilities spanning cloud defense,
            identity security, infrastructure
            hardening, SOC automation, systems
            operations, and security-first IT support.
          </p>

          {/* Metrics */}

          {!loading && (
            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-3
              "
            >
              <CapabilityMetric
                icon={Shield}
                value={services.length}
                label="Capability Domains"
              />

              <CapabilityMetric
                icon={CheckCircle2}
                value={featureCount}
                label="Core Capabilities"
              />

              <CapabilityMetric
                icon={Activity}
                value="24/7"
                label="Security Mindset"
              />

              <CapabilityMetric
                icon={Network}
                value="Hybrid"
                label="Cloud + Enterprise"
              />
            </div>
          )}
        </header>

        {/* ====================================================
            DATA NOTICE
        ==================================================== */}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              className="
                mb-8
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-amber-500/15
                bg-amber-500/[0.035]
                p-4
                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <div className="flex items-start gap-3">
                <AlertTriangle
                  size={17}
                  className="
                    mt-0.5
                    shrink-0
                    text-amber-400
                  "
                />

                <p className="text-xs leading-6 text-slate-500">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchData}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-amber-500/20
                  bg-amber-500/10
                  px-4
                  py-2.5
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.15em]
                  text-amber-400
                  transition
                  hover:bg-amber-500/15
                "
              >
                <RefreshCw size={12} />
                Retry
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading ? (
          <div
            className="
              grid
              items-stretch
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[...Array(6)].map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    min-h-[420px]
                    animate-pulse
                    rounded-[1.75rem]
                    border
                    border-white/[0.05]
                    bg-white/[0.025]
                  "
                >
                  <div className="p-7">
                    <div className="h-14 w-14 rounded-2xl bg-white/[0.05]" />

                    <div className="mt-7 h-3 w-28 rounded bg-white/[0.05]" />

                    <div className="mt-3 h-7 w-48 rounded bg-white/[0.05]" />

                    <div className="mt-5 space-y-2">
                      <div className="h-2 w-full rounded bg-white/[0.035]" />
                      <div className="h-2 w-4/5 rounded bg-white/[0.035]" />
                      <div className="h-2 w-3/5 rounded bg-white/[0.035]" />
                    </div>

                    <div className="mt-10 space-y-3">
                      <div className="h-2 w-32 rounded bg-white/[0.035]" />
                      <div className="h-2 w-40 rounded bg-white/[0.035]" />
                      <div className="h-2 w-36 rounded bg-white/[0.035]" />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          /* ==================================================
             SERVICES GRID
          ================================================== */

          <div
            className="
              grid
              items-stretch
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {services.map(
              (service, index) => (
                <ServiceCard
                  key={
                    service.id ||
                    `${service.title}-${index}`
                  }
                  {...service}
                  index={index}
                />
              )
            )}
          </div>
        )}

        {/* ====================================================
            SECURITY PHILOSOPHY
        ==================================================== */}

        {!loading && (
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="
              relative
              mt-16
              overflow-hidden
              rounded-3xl
              border
              border-emerald-500/10
              bg-gradient-to-r
              from-emerald-500/[0.045]
              via-white/[0.015]
              to-blue-500/[0.035]
              p-6
              md:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                right-[-60px]
                top-[-80px]
                h-64
                w-64
                rounded-full
                bg-emerald-500/[0.05]
                blur-3xl
              "
            />

            <div
              className="
                relative
                z-10
                flex
                flex-col
                gap-6
                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <LockKeyhole
                    size={20}
                    className="text-emerald-400"
                  />

                  <p
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.25em]
                      text-emerald-400
                    "
                  >
                    Engineering Approach
                  </p>
                </div>

                <h3
                  className="
                    mt-3
                    text-xl
                    font-black
                    text-white
                    md:text-2xl
                  "
                >
                  Security by Design.
                  <span className="text-slate-600">
                    {" "}
                    Automation by Default.
                  </span>
                </h3>

                <p
                  className="
                    mt-3
                    text-xs
                    leading-6
                    text-slate-600
                    md:text-sm
                  "
                >
                  The capability model combines
                  preventive controls, identity
                  protection, infrastructure
                  hardening, continuous monitoring,
                  automated response, and operational
                  resilience.
                </p>
              </div>

              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-emerald-500/15
                  bg-black/20
                  px-5
                  py-4
                "
              >
                <Shield
                  size={20}
                  className="text-emerald-400"
                />

                <div>
                  <p
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.16em]
                      text-slate-700
                    "
                  >
                    Operating Principle
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.12em]
                      text-white
                    "
                  >
                    Prevent • Detect • Respond
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            FOOTER SIGNAL
        ==================================================== */}

        {!loading && (
          <div className="mt-14 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-slate-800 md:w-20" />

            <span
              className="
                text-[7px]
                font-mono
                font-bold
                uppercase
                tracking-[0.3em]
                text-slate-700
              "
            >
              Secure • Automate • Operate
            </span>

            <span className="h-px w-10 bg-slate-800 md:w-20" />
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Services);