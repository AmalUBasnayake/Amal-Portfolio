import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Github,
  ShieldCheck,
  ExternalLink,
  Layers,
  Sparkles,
  Terminal,
} from "lucide-react";

const CardProject = ({
  Img,
  Title,
  Description,
  Link: ProjectLink,
  id,
}) => {
  const cardRef = useRef(null);

  /* =========================================================
     FEATURED SECURITY LABS
  ========================================================= */

  const isFeatured = [
    // AI Security
    "openai-private-endpoint",
    "purview-ai-shield",
    "content-safety",

    // Data Security
    "blob-zero-trust",
    "sql-advanced-security",
    "sql-private-endpoint",

    // Cloud Security
    "ddos-protection",
    "aks-keyvault-csi-driver",
    "aks-container-security",
    "defender-devsecops",

    // SOC
    "sentinel-keyvault-soar",
    "sentinel-siem",
    "soar-auto-ip-block",
    "honeypot-map",
    "live-network-siem",

    // Security
    "vuln-management",
  ].includes(id);

  /* =========================================================
     SECURITY TAG ENGINE
  ========================================================= */

  const getTags = (title = "") => {
    const t = title.toLowerCase();

    // AI SECURITY
    if (t.includes("openai")) {
      return [
        "Azure OpenAI",
        "Zero Trust",
        "Private Endpoint",
      ];
    }

    if (t.includes("purview")) {
      return [
        "Microsoft Purview",
        "AI Shield",
        "DLP",
      ];
    }

    if (t.includes("content safety")) {
      return [
        "Content Safety",
        "AI Security",
        "Prompt Protection",
      ];
    }

    // KUBERNETES
    if (t.includes("aks") && t.includes("key vault")) {
      return [
        "AKS",
        "Key Vault",
        "CSI Driver",
      ];
    }

    if (t.includes("aks")) {
      return [
        "AKS",
        "Kubernetes",
        "Container Security",
      ];
    }

    if (t.includes("kubernetes")) {
      return [
        "Kubernetes",
        "Cloud Security",
        "Container Security",
      ];
    }

    // DEVSECOPS
    if (t.includes("devops")) {
      return [
        "DevSecOps",
        "Defender",
        "GitHub",
      ];
    }

    // MICROSOFT SENTINEL
    if (t.includes("key vault") && t.includes("sentinel")) {
      return [
        "Microsoft Sentinel",
        "Key Vault",
        "SOAR",
      ];
    }

    if (t.includes("soar")) {
      return [
        "SOAR",
        "Logic Apps",
        "Automation",
      ];
    }

    if (t.includes("sentinel") || t.includes("siem")) {
      return [
        "Azure",
        "Sentinel",
        "SIEM",
      ];
    }

    if (t.includes("live network")) {
      return [
        "Splunk",
        "Network Security",
        "SIEM",
      ];
    }

    // AZURE STORAGE / DATA
    if (t.includes("blob")) {
      return [
        "Azure Storage",
        "Zero Trust",
        "Private Endpoint",
      ];
    }

    if (t.includes("sql advanced")) {
      return [
        "Azure SQL",
        "Data Security",
        "Zero Trust",
      ];
    }

    if (t.includes("sql private")) {
      return [
        "Private Endpoint",
        "Azure SQL",
        "VNet",
      ];
    }

    // NETWORK SECURITY
    if (t.includes("ddos")) {
      return [
        "Azure",
        "DDoS",
        "Network",
      ];
    }

    if (t.includes("firewall")) {
      return [
        "Azure Firewall",
        "Zero Trust",
        "Network",
      ];
    }

    if (t.includes("waf")) {
      return [
        "WAF",
        "App Gateway",
        "Web Security",
      ];
    }

    if (t.includes("private endpoint")) {
      return [
        "Private Endpoint",
        "Private DNS",
        "Zero Trust",
      ];
    }

    if (t.includes("zero trust")) {
      return [
        "Zero Trust",
        "Identity Security",
        "Cloud Security",
      ];
    }

    // THREAT DETECTION
    if (t.includes("honeypot")) {
      return [
        "Threat Intel",
        "SOC",
        "Attack Map",
      ];
    }

    if (
      t.includes("nessus") ||
      t.includes("vulnerability")
    ) {
      return [
        "Nessus",
        "Vulnerability Management",
        "Risk",
      ];
    }

    // IDENTITY
    if (t.includes("conditional access")) {
      return [
        "Entra ID",
        "Conditional Access",
        "Zero Trust",
      ];
    }

    if (t.includes("pim")) {
      return [
        "Entra ID",
        "PIM",
        "Privileged Access",
      ];
    }

    if (t.includes("managed identity")) {
      return [
        "Managed Identity",
        "Key Vault",
        "Azure RBAC",
      ];
    }

    // DEFAULT
    return [
      "Cloud Security",
      "Hands-On",
      "Lab",
    ];
  };

  /* =========================================================
     SECURITY DOMAIN
  ========================================================= */

  const getDomain = (title = "") => {
    const t = title.toLowerCase();

    if (
      t.includes("openai") ||
      t.includes("purview") ||
      t.includes("content safety") ||
      t.includes("ai")
    ) {
      return "AI Security";
    }

    if (
      t.includes("aks") ||
      t.includes("kubernetes") ||
      t.includes("container")
    ) {
      return "Cloud & Container Security";
    }

    if (
      t.includes("sentinel") ||
      t.includes("siem") ||
      t.includes("soar") ||
      t.includes("honeypot") ||
      t.includes("splunk")
    ) {
      return "SOC & Threat Detection";
    }

    if (
      t.includes("devops") ||
      t.includes("github")
    ) {
      return "DevSecOps";
    }

    if (
      t.includes("identity") ||
      t.includes("pim") ||
      t.includes("conditional access") ||
      t.includes("managed identity")
    ) {
      return "Identity Security";
    }

    if (
      t.includes("firewall") ||
      t.includes("waf") ||
      t.includes("ddos") ||
      t.includes("network")
    ) {
      return "Network Security";
    }

    return "Cloud Security";
  };

  /* =========================================================
     DIFFICULTY ENGINE
  ========================================================= */

  const getDifficulty = (title = "") => {
    const t = title.toLowerCase();

    // EXPERT
    if (
      t.includes("openai") ||
      t.includes("purview") ||
      t.includes("content safety") ||
      (t.includes("aks") && t.includes("key vault")) ||
      t.includes("container security") ||
      t.includes("devops") ||
      (t.includes("sentinel") && t.includes("key vault")) ||
      t.includes("live network") ||
      t.includes("blob") ||
      t.includes("sql advanced") ||
      t.includes("sql private") ||
      t.includes("private endpoint") ||
      t.includes("zero trust")
    ) {
      return "Expert";
    }

    // ADVANCED
    if (
      t.includes("sentinel") ||
      t.includes("soar") ||
      t.includes("honeypot") ||
      t.includes("firewall") ||
      t.includes("ddos") ||
      t.includes("aks") ||
      t.includes("waf")
    ) {
      return "Advanced";
    }

    // INTERMEDIATE
    if (
      t.includes("nessus") ||
      t.includes("vulnerability") ||
      t.includes("sysmon") ||
      t.includes("active directory") ||
      t.includes("ad")
    ) {
      return "Intermediate";
    }

    return "Lab";
  };

  const tags = getTags(Title);
  const difficulty = getDifficulty(Title);
  const domain = getDomain(Title);

  /* =========================================================
     3D CARD INTERACTION
  ========================================================= */

  const handleMouseMove = (e) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 5;
    const rotateY = (x - 0.5) * 5;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-5px)
    `;

    card.style.setProperty(
      "--x",
      `${x * 100}%`
    );

    card.style.setProperty(
      "--y",
      `${y * 100}%`
    );
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;

    if (!card) return;

    card.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
    `;
  };

  return (
    <div
      className="
        group
        relative
        w-full
        h-full
        flex
        items-stretch
        [perspective:1200px]
      "
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          relative
          flex-1
          h-full
          transition-transform
          duration-300
          ease-out
          will-change-transform
        "
      >
        {/* =================================================
            OUTER SECURITY GLOW
        ================================================= */}

        <div
          className="
            absolute
            -inset-[1px]
            rounded-[1.7rem]
            bg-gradient-to-r
            from-emerald-500/20
            via-cyan-500/10
            to-blue-500/20
            opacity-0
            blur-xl
            transition-all
            duration-700
            group-hover:opacity-100
          "
        />

        {/* =================================================
            MAIN CARD
        ================================================= */}

        <div
          className="
            relative
            h-full
            min-h-[520px]
            flex
            flex-col
            justify-between
            overflow-hidden
            rounded-[1.7rem]
            border
            border-white/[0.08]
            bg-[#07101b]/95
            p-5
            pb-6
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            backdrop-blur-2xl
            transition-all
            duration-500
            group-hover:border-emerald-500/35
            group-hover:shadow-[0_25px_70px_rgba(16,185,129,0.08)]
          "
        >
          {/* =================================================
              MOUSE FOLLOW GLOW
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
            style={{
              background:
                "radial-gradient(500px at var(--x) var(--y), rgba(16,185,129,0.12), transparent 45%)",
            }}
          />

          {/* =================================================
              TOP ACCENT
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-emerald-400/40
              to-transparent
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />

          {/* =================================================
              IMAGE
          ================================================= */}

          <div
            className="
              relative
              aspect-[16/10]
              flex-shrink-0
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#040811]
            "
          >
            <img
              src={Img}
              alt={Title}
              loading="lazy"
              className="
                h-full
                w-full
                rounded-xl
                object-contain
                object-center
                transition-transform
                duration-700
                group-hover:scale-[1.035]
              "
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://www.svgrepo.com/show/354313/security.svg";
              }}
            />

            {/* Image overlay */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/35
                via-transparent
                to-transparent
              "
            />

            {/* =================================================
                FEATURED BADGE
            ================================================= */}

            {isFeatured && (
              <div
                className="
                  absolute
                  left-3
                  top-3
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-500/30
                  bg-emerald-500/15
                  px-3
                  py-1.5
                  backdrop-blur-xl
                "
              >
                <ShieldCheck
                  size={12}
                  className="text-emerald-400"
                />

                <span
                  className="
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-emerald-400
                  "
                >
                  Featured
                </span>
              </div>
            )}

            {/* =================================================
                DIFFICULTY
            ================================================= */}

            <div
              className="
                absolute
                right-3
                top-3
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-blue-500/25
                bg-blue-500/10
                px-3
                py-1.5
                backdrop-blur-xl
              "
            >
              <Layers
                size={12}
                className="text-blue-400"
              />

              <span
                className="
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-blue-400
                "
              >
                {difficulty}
              </span>
            </div>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              mt-5
              flex
              flex-grow
              flex-col
            "
          >
            {/* Domain */}

            <div className="mb-3 flex items-center gap-2">
              <Terminal
                size={11}
                className="text-emerald-500/70"
              />

              <span
                className="
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-slate-600
                "
              >
                {domain}
              </span>
            </div>

            {/* Title */}

            <h3
              className="
                mb-3
                min-h-[56px]
                text-xl
                font-black
                leading-tight
                tracking-tight
                text-white
                transition-colors
                duration-300
                group-hover:text-emerald-400
              "
            >
              {Title}
            </h3>

            {/* Description */}

            <p
              className="
                mb-4
                min-h-[88px]
                text-sm
                break-words
                leading-relaxed
                text-slate-400
              "
            >
              {Description}
            </p>

            {/* =================================================
                TECHNOLOGY TAGS
            ================================================= */}

            <div
              className="
                mb-4
                flex
                min-h-[32px]
                flex-wrap
                gap-2
              "
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    border
                    border-white/[0.06]
                    bg-white/[0.035]
                    px-2.5
                    py-1
                    text-[8px]
                    font-mono
                    font-semibold
                    uppercase
                    tracking-[0.08em]
                    text-slate-500
                    transition-all
                    duration-300
                    group-hover:border-emerald-500/10
                    group-hover:text-slate-400
                  "
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* =================================================
                ACTION BAR
            ================================================= */}

            <div
              className="
                mt-auto
                flex
                items-center
                justify-between
                gap-3
                border-t
                border-white/[0.06]
                pt-4
              "
            >
              {/* GitHub */}

              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open GitHub repository for ${Title}`}
                  className="
                    group/github
                    inline-flex
                    h-10
                    items-center
                    gap-2
                    rounded-xl
                    px-2
                    text-emerald-400
                    transition-all
                    duration-300
                    hover:bg-emerald-500/[0.06]
                    hover:text-emerald-300
                  "
                >
                  <Github
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover/github:scale-110
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.16em]
                    "
                  >
                    GitHub
                  </span>

                  <ExternalLink
                    className="
                      h-3
                      w-3
                      opacity-50
                      transition-all
                      duration-300
                      group-hover/github:translate-x-0.5
                      group-hover/github:-translate-y-0.5
                    "
                  />
                </a>
              ) : (
                <span
                  className="
                    flex
                    h-10
                    items-center
                    gap-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-slate-600
                  "
                >
                  <ShieldCheck size={13} />
                  Private Repository
                </span>
              )}

              {/* Project Details */}

              {id && (
                <Link
                  to={`/project/${id}`}
                  aria-label={`View details for ${Title}`}
                  className="
                    group/details
                    inline-flex
                    h-10
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-emerald-500/20
                    bg-emerald-500/[0.07]
                    px-4
                    py-2
                    text-emerald-400
                    transition-all
                    duration-300
                    hover:border-emerald-500/35
                    hover:bg-emerald-500/[0.14]
                    hover:shadow-[0_0_25px_rgba(16,185,129,0.08)]
                  "
                >
                  <Sparkles
                    className="
                      h-3
                      w-3
                      transition-transform
                      duration-300
                      group-hover/details:rotate-12
                    "
                  />

                  <span
                    className="
                      whitespace-nowrap
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                    "
                  >
                    View Details
                  </span>

                  <ArrowRight
                    className="
                      h-3
                      w-3
                      transition-transform
                      duration-300
                      group-hover/details:translate-x-1
                    "
                  />
                </Link>
              )}
            </div>
          </div>

          {/* =================================================
              BOTTOM ENGINEERING ACCENT
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-1/2
              h-px
              w-0
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-emerald-400
              to-transparent
              transition-all
              duration-700
              group-hover:w-[70%]
            "
          />
        </div>
      </div>
    </div>
  );
};

export default CardProject;