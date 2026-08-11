import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLink,
  Loader2,
  X,
  Clock,
  FileCheck,
  GraduationCap,
  BookOpen,
  Trophy,
  Network,
  Target,
  Cloud,
  Shield,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

/* ============================================================
   CREDENTIAL DATA
   ============================================================ */

const certificationsList = [
  {
    title: "BSc (Hons) Cyber Security",
    org: "University of Wolverhampton • United Kingdom",
    description:
      "Cybersecurity top-up degree commencing September 2026, covering digital forensics, cyber risk, threat intelligence, advanced networks, and professional cybersecurity practice.",
    category: "Academic",
    status: "Starting Sep 2026",
    statusType: "pending",
    pdfUrl: null,
    image: "/certificates/wolverhampton-bsc.png",
    featured: true,
    icon: GraduationCap,
    priority: 1,
  },

  {
    title: "Pearson BTEC HND in Cybersecurity",
    org: "Pearson BTEC Level 5 • Achievers International Campus",
    description:
      "Completed April 2026 • 240 Credits • Distinction in Digital Forensics & Information Security Management.",
    category: "Academic",
    status: "Completed",
    statusType: "verified",
    pdfUrl:
      "/certificates/Amal_Basnayake_HND_Completion_Letter.pdf",
    image: "/certificates/btec-hnd.png",
    featured: true,
    icon: GraduationCap,
    priority: 2,
  },

  {
    title: "Cloud and AI Security Engineer Associate (SC-500)",
    org: "Microsoft",
    description:
      "Current Cloud & AI Security Engineer pathway focused on end-to-end protection for cloud and AI workloads, identity, data, AI security, threat defense, and enterprise security operations.",
    category: "Cloud",
    status: "Retake Preparation",
    statusType: "progress",
    pdfUrl: null,
    image: "/certificates/sc500.png",
    featured: true,
    icon: Cloud,
    priority: 3,
  },

  {
    title: "ISO/IEC 27001 Lead Auditor",
    org: "Mastermind",
    description:
      "Information Security Management System auditing, risk-based controls, compliance, and enterprise information security governance.",
    category: "Compliance",
    status: "Verified",
    statusType: "verified",
    pdfUrl: "/certificates/iso-27001.pdf",
    image: "/certificates/iso-27001.png",
    featured: true,
    icon: ShieldCheck,
    priority: 4,
  },

  {
    title: "ISO/IEC 27701:2025 Lead Auditor",
    org: "Mastermind",
    description:
      "Privacy Information Management System auditing, privacy controls, data protection, and information privacy compliance.",
    category: "Compliance",
    status: "Verified",
    statusType: "verified",
    pdfUrl: "/certificates/iso-27701.pdf",
    image: "/certificates/iso-27701.png",
    featured: true,
    icon: Shield,
    priority: 5,
  },

  {
    title:
      "Microsoft Applied Skills: Create Agents in Copilot Studio",
    org: "Microsoft",
    description:
      "Hands-on Applied Skills credential covering the creation and configuration of AI agents using Microsoft Copilot Studio.",
    category: "Cloud",
    status: "Verified",
    statusType: "verified",
    pdfUrl: null,
    image:
      "/certificates/ms-applied-skills-copilot-studio.png",
    featured: true,
    icon: Cloud,
    priority: 6,
  },

  {
    title: "Blue Team Junior Analyst",
    org: "Security Blue Team",
    description:
      "Foundational defensive security capabilities covering SOC operations, security monitoring, investigation, and threat detection.",
    category: "Defensive",
    status: "Verified",
    statusType: "verified",
    pdfUrl: "/certificates/btja.pdf",
    image: "/certificates/btja.png",
    featured: true,
    icon: ShieldCheck,
    priority: 7,
  },

  {
    title: "CCNA (Cisco Certified Network Associate)",
    org: "Cisco",
    description:
      "Networking fundamentals covering network infrastructure, connectivity, protocols, troubleshooting, and security fundamentals.",
    category: "Networking",
    status: "Verified",
    statusType: "verified",
    pdfUrl: "/certificates/ccna.pdf",
    image: "/certificates/ccna.png",
    featured: true,
    icon: Network,
    priority: 8,
  },

  {
    title: "Red Team Operations",
    org: "Red Team Leaders",
    description:
      "Adversary simulation, offensive security methodology, exploitation concepts, and practical penetration testing foundations.",
    category: "Offensive",
    status: "Verified",
    statusType: "verified",
    pdfUrl: "/certificates/red-team.pdf",
    image: "/certificates/red-team.png",
    featured: false,
    icon: Target,
    priority: 9,
  },
];

/* ============================================================
   VERIFIED PROFILES
   ============================================================ */

const socialLinks = [
  {
    name: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/users/amaludayangabasnayake/",
  },
  {
    name: "Credly",
    url: "https://www.credly.com/users/amal-udayanga-basnayake",
  },
  {
    name: "Cisco NetAcad",
    url: "https://www.netacad.com/profile?tab=badges",
  },
  {
    name: "Hack The Box",
    url: "https://academy.hackthebox.com/dashboard",
  },
  {
    name: "TryHackMe",
    url: "https://tryhackme.com/p/amalubasnayake",
  },
];

/* ============================================================
   FILTERS
   ============================================================ */

const categories = [
  "All",
  "Academic",
  "Cloud",
  "Compliance",
  "Defensive",
  "Networking",
  "Offensive",
];

/* ============================================================
   STATUS CONFIG
   ============================================================ */

const statusConfig = {
  verified: {
    label: "Verified",
    className:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: ShieldCheck,
  },

  progress: {
    label: "Active Track",
    className:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: Loader2,
  },

  pending: {
    label: "Upcoming",
    className:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: Clock,
  },
};

/* ============================================================
   STATUS BADGE
   ============================================================ */

const StatusBadge = ({ type, status }) => {
  const config =
    statusConfig[type] || statusConfig.verified;

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-2.5
        py-1
        text-[9px]
        font-black
        uppercase
        tracking-[0.14em]
        ${config.className}
      `}
    >
      <Icon
        size={12}
        className={
          type === "progress"
            ? "animate-spin"
            : ""
        }
      />

      {status || config.label}
    </span>
  );
};

/* ============================================================
   METRIC CARD
   ============================================================ */

const MetricCard = ({
  label,
  value,
  icon: Icon,
  accent = "emerald",
}) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
    className={`
      group
      rounded-2xl
      border
      border-white/[0.07]
      bg-white/[0.025]
      p-5
      backdrop-blur-xl
      transition-all
      duration-300
      hover:border-${accent}-500/20
    `}
  >
    <div className="flex items-center justify-between">
      <span className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-600">
        {label}
      </span>

      <Icon
        size={18}
        className={`text-${accent}-400`}
      />
    </div>

    <p className="mt-3 text-2xl font-black text-white md:text-3xl">
      {value}
    </p>
  </motion.div>
);

/* ============================================================
   CREDENTIAL CARD
   ============================================================ */

const CredentialCard = ({
  cert,
  index,
  onSelect,
}) => {
  const Icon = cert.icon || Award;

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 18,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.025,
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-white/[0.07]
        bg-[#08111d]/80
        shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-emerald-500/25
        hover:shadow-[0_25px_80px_rgba(16,185,129,0.08)]
      "
    >
      {/* Preview */}
      <button
        type="button"
        onClick={() => onSelect(cert)}
        aria-label={`Preview ${cert.title}`}
        className="
          relative
          mx-4
          mt-4
          h-40
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.96]
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-emerald-400
        "
      >
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.title}
            loading="lazy"
            className="
              h-full
              w-full
              object-contain
              p-3
              transition-transform
              duration-500
              group-hover:scale-105
            "
            onError={(event) => {
              event.currentTarget.style.display =
                "none";

              const fallback =
                event.currentTarget.parentElement?.querySelector(
                  ".credential-fallback"
                );

              if (fallback) {
                fallback.classList.remove(
                  "hidden"
                );
              }
            }}
          />
        ) : null}

        <div
          className={`
            credential-fallback
            absolute
            inset-0
            ${
              cert.image
                ? "hidden"
                : "flex"
            }
            items-center
            justify-center
            bg-[#07111f]
          `}
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/10
            "
          >
            <Icon
              size={30}
              className="text-emerald-400"
            />
          </div>
        </div>

        {/* Hover layer */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/55
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        >
          <span
            className="
              rounded-xl
              border
              border-emerald-400/30
              bg-emerald-500/20
              px-4
              py-2
              text-[9px]
              font-black
              uppercase
              tracking-[0.16em]
              text-white
            "
          >
            Preview Credential
          </span>
        </div>
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <StatusBadge
            type={cert.statusType}
            status={cert.status}
          />

          {cert.featured && (
            <span
              className="
                inline-flex
                items-center
                gap-1
                text-[8px]
                font-black
                uppercase
                tracking-[0.14em]
                text-slate-600
              "
            >
              <Trophy
                size={11}
                className="text-amber-400"
              />
              Featured
            </span>
          )}
        </div>

        <h3
          className="
            mt-4
            min-h-[56px]
            text-lg
            font-black
            leading-snug
            text-white
            transition-colors
            duration-300
            group-hover:text-emerald-400
          "
        >
          {cert.title}
        </h3>

        <p className="mt-1 text-sm font-semibold text-slate-400">
          {cert.org}
        </p>

        <p className="mt-3 min-h-[72px] text-xs leading-6 text-slate-600">
          {cert.description}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <button
            type="button"
            onClick={() => onSelect(cert)}
            className="
              rounded-xl
              border
              border-emerald-500/20
              bg-emerald-500/10
              py-3
              text-[9px]
              font-black
              uppercase
              tracking-[0.14em]
              text-emerald-400
              transition-all
              duration-300
              hover:bg-emerald-500/20
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-400
            "
          >
            {cert.pdfUrl
              ? "Preview"
              : "Details"}
          </button>

          <a
            href={
              cert.pdfUrl ||
              socialLinks[0].url
            }
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              justify-center
              gap-1
              rounded-xl
              border
              border-white/10
              bg-white/[0.035]
              py-3
              text-[9px]
              font-black
              uppercase
              tracking-[0.14em]
              text-slate-400
              transition-all
              duration-300
              hover:bg-white/[0.08]
              hover:text-white
            "
          >
            {cert.pdfUrl
              ? "Open"
              : "Verify"}

            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

/* ============================================================
   ACADEMIC PROGRESSION
   ============================================================ */

const AcademicProgression = ({
  onSelect,
}) => {
  const bsc = certificationsList[0];
  const hnd = certificationsList[1];

  return (
    <section
      className="
        relative
        mb-10
        overflow-hidden
        rounded-3xl
        border
        border-blue-500/15
        bg-gradient-to-br
        from-blue-500/[0.07]
        via-[#07111f]
        to-emerald-500/[0.045]
        p-6
        md:p-8
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-80px]
          top-[-80px]
          h-72
          w-72
          rounded-full
          bg-blue-500/[0.08]
          blur-3xl
        "
      />

      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
              border-blue-400/20
              bg-blue-500/10
            "
          >
            <GraduationCap
              size={24}
              className="text-blue-400"
            />
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-blue-400">
              Academic Progression
            </p>

            <h3 className="mt-1 text-xl font-black text-white md:text-2xl">
              Cybersecurity Education Path
            </h3>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* BSc */}
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-blue-500/20
              bg-blue-500/[0.04]
              p-5
            "
          >
            <div
              className="
                absolute
                right-0
                top-0
                rounded-bl-xl
                border-b
                border-l
                border-blue-500/20
                bg-blue-500/10
                px-3
                py-1.5
              "
            >
              <span className="text-[8px] font-black uppercase tracking-widest text-blue-400">
                Upcoming
              </span>
            </div>

            <GraduationCap
              size={24}
              className="mb-4 text-blue-400"
            />

            <h4 className="text-lg font-black text-white">
              {bsc.title}
            </h4>

            <p className="mt-1 text-sm font-semibold text-blue-400">
              {bsc.org}
            </p>

            <p className="mt-3 text-xs leading-6 text-slate-500">
              {bsc.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Digital Forensics",
                "Cyber Threat Intelligence",
                "Advanced Networks",
                "Cyber Risk",
                "Professional Practice",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    rounded-lg
                    border
                    border-white/[0.07]
                    bg-white/[0.035]
                    px-2.5
                    py-1
                    text-[8px]
                    font-mono
                    text-slate-500
                  "
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-bold text-blue-400">
              <Clock size={14} />
              Starting September 2026
            </div>
          </div>

          {/* HND */}
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/[0.04]
              p-5
            "
          >
            <div
              className="
                absolute
                right-0
                top-0
                rounded-bl-xl
                border-b
                border-l
                border-emerald-500/20
                bg-emerald-500/10
                px-3
                py-1.5
              "
            >
              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">
                Completed
              </span>
            </div>

            <BookOpen
              size={24}
              className="mb-4 text-emerald-400"
            />

            <h4 className="text-lg font-black text-white">
              {hnd.title}
            </h4>

            <p className="mt-1 text-sm font-semibold text-emerald-400">
              {hnd.org}
            </p>

            <p className="mt-3 text-xs leading-6 text-slate-500">
              {hnd.description}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
                <p className="text-[8px] uppercase tracking-widest text-slate-700">
                  Credits
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  240
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-black/20 p-3">
                <p className="text-[8px] uppercase tracking-widest text-slate-700">
                  Achievement
                </p>

                <p className="mt-1 text-sm font-black text-emerald-400">
                  2 Distinctions
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelect(hnd)}
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                text-[9px]
                font-black
                uppercase
                tracking-widest
                text-emerald-400
                transition-colors
                hover:text-white
              "
            >
              <FileCheck size={13} />
              View Completion Letter
              <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   SC-500 ACTIVE TRACK
   ============================================================ */

const ActiveSecurityTrack = () => (
  <section
    className="
      relative
      mb-12
      overflow-hidden
      rounded-3xl
      border
      border-amber-500/15
      bg-amber-500/[0.025]
      p-6
      md:p-7
    "
  >
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        right-[-50px]
        top-[-60px]
        h-48
        w-48
        rounded-full
        bg-amber-500/[0.05]
        blur-3xl
      "
    />

    <div className="relative z-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
      <div className="flex gap-4">
        <div
          className="
            hidden
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-amber-400/20
            bg-amber-500/10
            sm:flex
          "
        >
          <Cloud
            size={23}
            className="text-amber-400"
          />
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-400">
            Active Professional Development
          </p>

          <h3 className="mt-2 text-xl font-black text-white">
            Microsoft Cloud & AI Security
          </h3>

          <p className="mt-2 max-w-3xl text-xs leading-6 text-slate-500 md:text-sm">
            SC-500 preparation and retake pathway
            focused on securing cloud and AI
            workloads, identity, data, AI services,
            security operations, and enterprise
            defense.
          </p>
        </div>
      </div>

      <StatusBadge
        type="progress"
        status="Retake Track"
      />
    </div>
  </section>
);

/* ============================================================
   VERIFIED PROFILES
   ============================================================ */

const VerifiedProfiles = () => (
  <section
    className="
      mt-20
      rounded-3xl
      border
      border-white/[0.07]
      bg-white/[0.025]
      p-6
      md:p-7
    "
  >
    <div className="mb-6 flex items-start gap-3">
      <FileCheck
        size={20}
        className="mt-0.5 shrink-0 text-emerald-400"
      />

      <div>
        <h4 className="text-sm font-black uppercase tracking-[0.16em] text-white">
          Verified Profiles
        </h4>

        <p className="mt-2 text-xs leading-6 text-slate-600">
          Cross-platform certification,
          achievement, and hands-on security
          learning verification sources.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-white/[0.06]
            bg-[#0a0f1a]
            p-4
            text-center
            text-[9px]
            font-black
            uppercase
            tracking-[0.12em]
            text-slate-500
            transition-all
            duration-300
            hover:border-emerald-500/25
            hover:bg-emerald-500/[0.07]
            hover:text-emerald-400
          "
        >
          {link.name}

          <ExternalLink
            size={11}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      ))}
    </div>
  </section>
);

/* ============================================================
   CREDENTIAL MODAL
   ============================================================ */

const CredentialModal = ({
  cert,
  onClose,
}) => {
  if (!cert) return null;

  const Icon = cert.icon || Award;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="
          fixed
          inset-0
          z-[100]
          flex
          items-center
          justify-center
          bg-black/80
          p-2
          backdrop-blur-xl
          md:p-5
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.94,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.94,
            y: 20,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 22,
          }}
          onClick={(event) =>
            event.stopPropagation()
          }
          className="
            relative
            h-[92vh]
            w-[96vw]
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#050812]
            shadow-[0_0_100px_rgba(16,185,129,0.12)]
            md:w-[92vw]
            lg:w-[1100px]
          "
        >
          {/* Header */}
          <div
            className="
              absolute
              left-0
              right-0
              top-0
              z-20
              flex
              items-center
              justify-between
              gap-4
              border-b
              border-white/10
              bg-black/70
              px-5
              py-4
              backdrop-blur-xl
            "
          >
            <div className="min-w-0">
              <h3 className="truncate text-sm font-black text-white md:text-lg">
                {cert.title}
              </h3>

              <p className="mt-1 truncate text-xs text-slate-500">
                {cert.org}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close credential preview"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.05]
                text-white
                transition
                hover:border-emerald-500/30
                hover:text-emerald-400
              "
            >
              <X size={18} />
            </button>
          </div>

          {/* PDF */}
          {cert.pdfUrl ? (
            <>
              <div className="h-full w-full bg-[#202020] pt-[72px]">
                <iframe
                  src={`${cert.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                  title={cert.title}
                  className="h-full w-full border-0"
                />
              </div>

              <a
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  absolute
                  bottom-5
                  right-5
                  z-30
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-emerald-500
                  px-4
                  py-2.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-widest
                  text-black
                  shadow-[0_0_25px_rgba(16,185,129,0.25)]
                  transition
                  hover:scale-105
                "
              >
                Open Full Screen
                <ExternalLink size={12} />
              </a>
            </>
          ) : (
            /* Detail state */
            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                px-6
                pt-20
                text-center
              "
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                "
              >
                <Icon
                  size={34}
                  className="text-emerald-400"
                />
              </div>

              <div className="mt-6">
                <StatusBadge
                  type={cert.statusType}
                  status={cert.status}
                />
              </div>

              <h3 className="mt-5 max-w-2xl text-xl font-black text-white md:text-2xl">
                {cert.title}
              </h3>

              <p className="mt-2 text-sm font-semibold text-emerald-400">
                {cert.org}
              </p>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">
                {cert.description}
              </p>

              {cert.title.includes("BSc") && (
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-400">
                  <GraduationCap size={16} />
                  University of Wolverhampton
                </div>
              )}

              {cert.title.includes("SC-500") && (
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-amber-500/15 bg-amber-500/[0.04] px-4 py-3 text-xs font-bold text-amber-400">
                  <Cloud size={16} />
                  Active Cloud & AI Security Track
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

const Certifications = () => {
  const [filter, setFilter] = useState("All");
  const [selectedCert, setSelectedCert] =
    useState(null);

  /* ==========================================================
     FILTERED DATA
  ========================================================== */

  const filteredCerts = useMemo(() => {
    const list =
      filter === "All"
        ? certificationsList
        : certificationsList.filter(
            (cert) =>
              cert.category === filter
          );

    return [...list].sort(
      (a, b) => a.priority - b.priority
    );
  }, [filter]);

  /* ==========================================================
     METRICS
  ========================================================== */

  const featuredCount =
    certificationsList.filter(
      (cert) => cert.featured
    ).length;

  const verifiedCount =
    certificationsList.filter(
      (cert) =>
        cert.statusType === "verified"
    ).length;

  const activeCount =
    certificationsList.filter(
      (cert) =>
        cert.statusType === "progress"
    ).length;

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      className="
        relative
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
          bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.07),transparent_60%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-150px]
          top-[-150px]
          h-[450px]
          w-[450px]
          rounded-full
          bg-blue-500/[0.025]
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-150px]
          left-[-150px]
          h-[450px]
          w-[450px]
          rounded-full
          bg-emerald-500/[0.025]
          blur-[120px]
        "
      />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-emerald-400
                shadow-[0_0_12px_rgba(52,211,153,0.8)]
              "
            />

            <p className="text-[9px] font-mono font-bold uppercase tracking-[0.35em] text-emerald-400">
              Professional Credential Intelligence
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
              md:text-7xl
            "
          >
            Certifications
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
              .
            </span>
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500 md:text-base">
            A structured view of academic progression,
            cloud and AI security development,
            governance credentials, defensive
            security training, networking foundation,
            and offensive security development.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              ["Cybersecurity", "emerald"],
              ["Cloud Security", "blue"],
              ["Security Engineering", "cyan"],
              ["Continuous Learning", "purple"],
            ].map(([label]) => (
              <span
                key={label}
                className="
                  rounded-full
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-3
                  py-1.5
                  text-[8px]
                  font-mono
                  uppercase
                  tracking-[0.15em]
                  text-slate-500
                "
              >
                {label}
              </span>
            ))}
          </div>
        </header>

        {/* ====================================================
            METRICS
        ==================================================== */}

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          <MetricCard
            label="Featured Credentials"
            value={featuredCount}
            icon={Award}
          />

          <MetricCard
            label="Verified Records"
            value={verifiedCount}
            icon={ShieldCheck}
            accent="blue"
          />

          <MetricCard
            label="Active Development"
            value={activeCount}
            icon={Cloud}
            accent="amber"
          />
        </div>

        {/* ====================================================
            ACADEMIC PATH
        ==================================================== */}

        <AcademicProgression
          onSelect={setSelectedCert}
        />

        {/* ====================================================
            ACTIVE SECURITY PATH
        ==================================================== */}

        <ActiveSecurityTrack />

        {/* ====================================================
            FILTER BAR
        ==================================================== */}

        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[8px] font-mono font-bold uppercase tracking-[0.25em] text-slate-700">
              Credential Domains
            </span>

            <span className="h-px flex-1 bg-white/[0.05]" />
          </div>

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            {categories.map((category) => {
              const active =
                filter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setFilter(category)
                  }
                  aria-pressed={active}
                  className={`
                    rounded-xl
                    border
                    px-4
                    py-2.5
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.14em]
                    transition-all
                    duration-300
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-emerald-400
                    ${
                      active
                        ? "border-emerald-400/40 bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.18)]"
                        : "border-white/[0.07] bg-white/[0.025] text-slate-500 hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================
            CREDENTIAL GRID
        ==================================================== */}

        <motion.div
          layout
          className="
            grid
            auto-rows-fr
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map(
              (cert, index) => (
                <CredentialCard
                  key={cert.title}
                  cert={cert}
                  index={index}
                  onSelect={setSelectedCert}
                />
              )
            )}
          </AnimatePresence>
        </motion.div>

        {/* ====================================================
            EMPTY FILTER STATE
        ==================================================== */}

        {filteredCerts.length === 0 && (
          <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] px-6 py-16 text-center">
            <Shield
              size={32}
              className="mx-auto text-slate-700"
            />

            <p className="mt-4 text-sm font-black uppercase tracking-widest text-slate-500">
              No credentials in this domain
            </p>
          </div>
        )}

        {/* ====================================================
            VERIFIED PROFILES
        ==================================================== */}

        <VerifiedProfiles />

        {/* ====================================================
            FOOTER SIGNAL
        ==================================================== */}

        <div className="mt-14 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-slate-800 md:w-20" />

          <span className="text-[7px] font-mono font-bold uppercase tracking-[0.3em] text-slate-700">
            Learn • Build • Validate • Engineer
          </span>

          <span className="h-px w-10 bg-slate-800 md:w-20" />
        </div>
      </div>

      {/* ======================================================
          MODAL
      ====================================================== */}

      {selectedCert && (
        <CredentialModal
          cert={selectedCert}
          onClose={() =>
            setSelectedCert(null)
          }
        />
      )}
    </section>
  );
};

export default Certifications;