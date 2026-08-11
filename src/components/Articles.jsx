import React, { memo } from "react";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

const articles = [
  {
    title:
      "🔐 Securing Azure OpenAI with Private Endpoints: Building a Zero Trust AI Architecture",
    category: "AI & Cloud Security",
    description:
      "A hands-on Azure security engineering implementation using Private Endpoint, Private DNS, Managed Identity, Azure Key Vault, RBAC, and disabled public network access to establish a Zero Trust foundation for Azure OpenAI workloads.",
    date: "Aug 10, 2026",
    readTime: "13 min read",
    tags: [
      "Azure OpenAI",
      "Zero Trust",
      "Private Endpoint",
      "Key Vault",
      "Managed Identity",
    ],
    url: "https://medium.com/@amalubasnayake/securing-azure-openai-with-private-endpoints-building-a-zero-trust-ai-architecture-34021cd6d331",
    featured: true,
  },

  {
    title:
      "Azure Kubernetes Security Monitoring with Microsoft Defender for Containers",
    category: "Cloud & Container Security",
    description:
      "A practical security engineering write-up focused on Kubernetes security monitoring with Microsoft Defender for Containers.",
    date: "Jun 26, 2026",
    readTime: "5 min read",
    tags: [
      "Azure",
      "AKS",
      "Defender for Containers",
    ],
    url: "https://medium.com/@amalubasnayake/%EF%B8%8F-azure-kubernetes-security-monitoring-with-microsoft-defender-for-containers-a634df045933",
  },

  {
    title:
      "Securing GitHub Repositories with Microsoft Defender for Cloud DevOps Security: A Practical Implementation Guide",
    category: "DevSecOps",
    description:
      "A practical implementation covering GitHub integration with Microsoft Defender for Cloud, DevOps security capabilities, infrastructure-as-code assessment, repository security posture, and security findings.",
    date: "Jun 23, 2026",
    readTime: "5 min read",
    tags: [
      "GitHub",
      "Defender for Cloud",
      "DevSecOps",
      "IaC Security",
    ],
    url: "https://medium.com/@amalubasnayake/securing-github-repositories-with-microsoft-defender-for-cloud-devops-security-a-practical-69c3158cfb91",
  },

  {
    title:
      "How I Protected Microsoft 365 Copilot from Accessing Confidential Data Using Microsoft Purview",
    category: "AI & Data Security",
    description:
      "A hands-on Microsoft Purview security lab demonstrating how Sensitivity Labels and Data Loss Prevention controls can help protect confidential information in Microsoft 365 Copilot scenarios.",
    date: "Jun 2, 2026",
    readTime: "5 min read",
    tags: [
      "Microsoft Purview",
      "Copilot Security",
      "DLP",
      "AI Security",
    ],
    url: "https://medium.com/@amalubasnayake/how-i-protected-microsoft-365-copilot-from-accessing-confidential-data-using-microsoft-purview-d53f5409238a",
  },

  {
    title:
      "🛡️ Building an AI Security Gateway: Blocking Prompt Injection Attacks with Azure AI Content Safety",
    category: "AI Security",
    description:
      "A practical AI security implementation focused on detecting and blocking prompt injection threats using Azure AI Content Safety.",
    date: "May 28, 2026",
    readTime: "7 min read",
    tags: [
      "Azure AI",
      "Content Safety",
      "Prompt Injection",
      "AI Security",
    ],
    url: "https://medium.com/@amalubasnayake/%EF%B8%8F-building-an-ai-security-gateway-blocking-prompt-injection-attacks-with-azure-ai-content-safety-8113a2689808",
  },

  {
    title:
      "🛡️ Building a SIEM Threat Detection Lab Using Microsoft Sentinel in Azure",
    category: "SIEM & Threat Detection",
    description:
      "A hands-on Microsoft Sentinel security lab focused on building cloud-based SIEM capabilities and practical threat detection workflows in Azure.",
    date: "Mar 16, 2026",
    readTime: "5 min read",
    tags: [
      "Microsoft Sentinel",
      "SIEM",
      "Threat Detection",
      "Azure",
    ],
    url: "https://medium.com/@amalubasnayake/%EF%B8%8F-building-a-siem-threat-detection-lab-using-microsoft-sentinel-in-azure-2303339c6353",
  },

  {
    title:
      "🔐 Secure Secret Access in Azure Using Managed Identity & Key Vault (No More Hardcoded Credentials)",
    category: "Identity & Cloud Security",
    description:
      "A practical Azure security implementation showing how Managed Identity, Azure Key Vault, and Azure RBAC can eliminate hardcoded credentials and enable identity-based secret access.",
    date: "Mar 19, 2026",
    readTime: "3 min read",
    tags: [
      "Azure Key Vault",
      "Managed Identity",
      "Azure RBAC",
      "Secret Management",
    ],
    url: "https://medium.com/@amalubasnayake/secure-secret-access-in-azure-using-managed-identity-key-vault-no-more-hardcoded-credentials-e0cb31c075a5",
  },
];

const Articles = () => {
  const featuredArticle = articles.find(
    (article) => article.featured
  );

  const remainingArticles = articles.filter(
    (article) => !article.featured
  );

  return (
    <section
      id="Insights"
      className="
        relative
        overflow-hidden
        bg-[#030712]
        py-24
        md:py-32
      "
    >
      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          bg-[size:70px_70px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-[-12%]
          top-[15%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-emerald-500/[0.035]
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[-10%]
          bottom-[10%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-blue-500/[0.035]
          blur-[120px]
        "
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-10">

        {/* ===================================================
            SECTION HEADER
        =================================================== */}

        <div
          data-aos="fade-up"
          className="mb-14 md:mb-16"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>
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
                  px-3
                  py-1.5
                  backdrop-blur-xl
                "
              >
                <BookOpen
                  size={12}
                  className="text-emerald-400"
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
                  Technical Knowledge Base
                </span>
              </div>

              <p
                className="
                  mb-2
                  text-[9px]
                  font-mono
                  uppercase
                  tracking-[0.35em]
                  text-slate-600
                "
              >
                Security Engineering / 02
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
                  Insights.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-sm
                  leading-7
                  text-slate-500
                  md:text-base
                "
              >
                Technical write-ups, hands-on security labs,
                cloud defense research, and practical
                engineering insights across Microsoft,
                Azure, AI security, SIEM, and Zero Trust.
              </p>
            </div>

            {/* Medium Profile CTA */}

            <a
              href="https://medium.com/@amalubasnayake"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-3
                rounded-xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                px-5
                py-3
                text-[9px]
                font-black
                uppercase
                tracking-[0.18em]
                text-slate-300
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-emerald-500/30
                hover:bg-emerald-500/[0.05]
                hover:text-emerald-400
              "
            >
              View All Articles

              <ExternalLink
                size={13}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>
          </div>
        </div>

        {/* ===================================================
            FEATURED ARTICLE
        =================================================== */}

        {featuredArticle && (
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="mb-8"
          >
            <a
              href={featuredArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                relative
                block
                overflow-hidden
                rounded-[2rem]
                border
                border-emerald-500/15
                bg-[#07101b]/80
                backdrop-blur-2xl
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-emerald-500/30
                hover:shadow-[0_25px_80px_rgba(16,185,129,0.08)]
              "
            >
              {/* Featured Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  right-[-10%]
                  top-[-40%]
                  h-[500px]
                  w-[500px]
                  rounded-full
                  bg-emerald-500/[0.07]
                  blur-[100px]
                  transition-all
                  duration-500
                  group-hover:bg-emerald-500/[0.11]
                "
              />

              {/* Top accent */}

              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-emerald-400/70
                  to-transparent
                "
              />

              <div
                className="
                  relative
                  grid
                  gap-8
                  p-7
                  md:grid-cols-[1fr_auto]
                  md:p-10
                "
              >
                <div>

                  {/* Featured badge */}

                  <div className="mb-5 flex flex-wrap items-center gap-3">

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-emerald-500/20
                        bg-emerald-500/[0.06]
                        px-3
                        py-1.5
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-emerald-400
                      "
                    >
                      <ShieldCheck size={11} />
                      Featured Insight
                    </span>

                    <span
                      className="
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-slate-600
                      "
                    >
                      {featuredArticle.category}
                    </span>
                  </div>

                  {/* Title */}

                  <h3
                    className="
                      max-w-5xl
                      text-2xl
                      font-black
                      leading-tight
                      tracking-tight
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-emerald-300
                      md:text-4xl
                      lg:text-5xl
                    "
                  >
                    {featuredArticle.title}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      mt-5
                      max-w-4xl
                      text-sm
                      leading-7
                      text-slate-500
                      md:text-base
                    "
                  >
                    {featuredArticle.description}
                  </p>

                  {/* Tags */}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-lg
                          border
                          border-white/[0.06]
                          bg-white/[0.025]
                          px-2.5
                          py-1.5
                          text-[8px]
                          font-mono
                          uppercase
                          tracking-wider
                          text-slate-500
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metadata */}

                  <div
                    className="
                      mt-7
                      flex
                      flex-wrap
                      items-center
                      gap-5
                      text-[8px]
                      font-mono
                      uppercase
                      tracking-[0.16em]
                      text-slate-600
                    "
                  >
                    <span className="flex items-center gap-2">
                      <CalendarDays size={12} />
                      {featuredArticle.date}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock3 size={12} />
                      {featuredArticle.readTime}
                    </span>

                    <span className="flex items-center gap-2 text-emerald-500/70">
                      <BookOpen size={12} />
                      Medium
                    </span>
                  </div>
                </div>

                {/* Featured Arrow */}

                <div className="flex items-end md:items-center">
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      text-slate-500
                      transition-all
                      duration-300
                      group-hover:border-emerald-500/30
                      group-hover:bg-emerald-500/[0.08]
                      group-hover:text-emerald-400
                    "
                  >
                    <ArrowUpRight
                      size={22}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </div>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* ===================================================
            ARTICLE GRID
        =================================================== */}

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
          "
        >
          {remainingArticles.map((article, index) => (
            <a
              key={article.title}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay={150 + index * 70}
              className="
                group
                relative
                overflow-hidden
                rounded-[1.5rem]
                border
                border-white/[0.07]
                bg-[#07101b]/70
                p-6
                backdrop-blur-2xl
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-emerald-500/20
                hover:bg-[#08131f]
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              "
            >
              {/* Hover Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-40
                  w-40
                  rounded-full
                  bg-emerald-500/[0.04]
                  blur-3xl
                  transition-all
                  duration-500
                  group-hover:bg-emerald-500/[0.09]
                "
              />

              {/* Card Header */}

              <div className="relative flex items-start justify-between gap-4">

                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    px-3
                    py-1.5
                    text-[7px]
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-emerald-400
                  "
                >
                  {article.category}
                </span>

                <ArrowUpRight
                  size={17}
                  className="
                    shrink-0
                    text-slate-700
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-emerald-400
                  "
                />
              </div>

              {/* Article Title */}

              <h3
                className="
                  relative
                  mt-5
                  text-lg
                  font-black
                  leading-snug
                  tracking-tight
                  text-white
                  transition-colors
                  duration-300
                  group-hover:text-emerald-300
                  md:text-xl
                "
              >
                {article.title}
              </h3>

              {/* Description */}

              <p
                className="
                  relative
                  mt-4
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                {article.description}
              </p>

              {/* Technology Tags */}

              <div className="relative mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      rounded-md
                      border
                      border-white/[0.05]
                      bg-black/20
                      px-2
                      py-1
                      text-[7px]
                      font-mono
                      uppercase
                      tracking-wider
                      text-slate-600
                      transition-colors
                      duration-300
                      group-hover:text-slate-500
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}

              <div
                className="
                  relative
                  mt-6
                  flex
                  items-center
                  justify-between
                  gap-3
                  border-t
                  border-white/[0.05]
                  pt-4
                "
              >
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-4
                    text-[7px]
                    font-mono
                    uppercase
                    tracking-[0.14em]
                    text-slate-700
                  "
                >
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={10} />
                    {article.date}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={10} />
                    {article.readTime}
                  </span>
                </div>

                <span
                  className="
                    whitespace-nowrap
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.14em]
                    text-slate-600
                    transition-colors
                    duration-300
                    group-hover:text-emerald-400
                  "
                >
                  Read →
                </span>
              </div>

              {/* Bottom Hover Line */}

              <div
                className="
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
                  duration-500
                  group-hover:w-[65%]
                "
              />
            </a>
          ))}
        </div>

        {/* ===================================================
            MEDIUM CTA
        =================================================== */}

        <div
          data-aos="fade-up"
          className="mt-10 flex justify-center"
        >
          <a
            href="https://medium.com/@amalubasnayake"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-xl
              border
              border-emerald-500/15
              bg-emerald-500/[0.04]
              px-6
              py-3.5
              text-[9px]
              font-black
              uppercase
              tracking-[0.2em]
              text-emerald-400
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-emerald-500/35
              hover:bg-emerald-500/[0.08]
              hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]
            "
          >
            <BookOpen
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            Explore All Security Insights

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </a>
        </div>

        {/* ===================================================
            FOOTER LABEL
        =================================================== */}

        <div
          className="
            mt-12
            flex
            items-center
            justify-center
            gap-3
            text-[7px]
            font-mono
            uppercase
            tracking-[0.28em]
            text-slate-700
          "
        >
          <span className="h-px w-8 bg-slate-800" />

          Build • Document • Secure

          <span className="h-px w-8 bg-slate-800" />
        </div>
      </div>
    </section>
  );
};

export default memo(Articles);