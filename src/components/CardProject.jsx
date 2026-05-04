import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Github,
  ShieldCheck,
  ExternalLink,
  Layers,
} from "lucide-react";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const cardRef = useRef(null);

  const isFeatured = [
    "ddos-protection",
    "soar-auto-ip-block",
    "sentinel-siem",
    "honeypot-map",
    "vuln-management",
  ].includes(id);

  const getTags = (title = "") => {
    const t = title.toLowerCase();

    if (t.includes("sentinel") || t.includes("siem"))
      return ["Azure", "Sentinel", "SIEM"];
    if (t.includes("soar")) return ["SOAR", "Logic Apps", "Automation"];
    if (t.includes("ddos")) return ["Azure", "DDoS", "Network"];
    if (t.includes("honeypot")) return ["Threat Intel", "SOC", "Attack Map"];
    if (t.includes("nessus") || t.includes("vulnerability"))
      return ["Nessus", "VM", "Risk"];
    if (t.includes("firewall"))
      return ["Azure Firewall", "Zero Trust", "Network"];
    if (t.includes("waf")) return ["WAF", "App Gateway", "Web Security"];

    return ["Cloud Security", "Hands-On", "Lab"];
  };

  const getDifficulty = (title = "") => {
    const t = title.toLowerCase();

    if (
      t.includes("sentinel") ||
      t.includes("soar") ||
      t.includes("honeypot") ||
      t.includes("firewall") ||
      t.includes("ddos")
    ) {
      return "Advanced";
    }

    if (t.includes("nessus") || t.includes("waf")) return "Intermediate";

    return "Lab";
  };

  const tags = getTags(Title);
  const difficulty = getDifficulty(Title);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    card.style.transform = `perspective(1000px) rotateX(${
      (0.5 - y) * 5
    }deg) rotateY(${(x - 0.5) * 5}deg) translateY(-3px)`;

    card.style.setProperty("--x", `${x * 100}%`);
    card.style.setProperty("--y", `${y * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div className="group w-full h-full flex items-stretch [perspective:1200px]">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex-1 h-full transition-all duration-300 ease-out will-change-transform"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="relative h-full min-h-[420px] flex flex-col justify-between rounded-3xl bg-[#08111d]/90 backdrop-blur-2xl border border-white/10 p-5 pb-6 overflow-hidden shadow-xl transition-all duration-500 group-hover:border-emerald-500/30">
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
            style={{
              background:
                "radial-gradient(450px at var(--x) var(--y), rgba(16,185,129,0.12), transparent 45%)",
            }}
          />

          <div className="relative rounded-2xl overflow-hidden bg-[#050812] h-[150px] flex items-center justify-center flex-shrink-0 border border-white/5">
            <img
              src={Img}
              alt={Title}
              loading="lazy"
              className="w-full h-full object-cover object-top rounded-xl transition duration-500 group-hover:scale-[1.03]"
              onError={(e) => {
                e.currentTarget.src =
                  "https://www.svgrepo.com/show/354313/security.svg";
              }}
            />

            {isFeatured && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 backdrop-blur-xl">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                  Featured
                </span>
              </div>
            )}

            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-xl">
              <Layers size={12} className="text-blue-400" />
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">
                {difficulty}
              </span>
            </div>
          </div>

          <div className="relative z-10 mt-5 flex flex-col flex-grow">
            <h3 className="text-xl font-black text-white mb-3 leading-tight min-h-[56px] group-hover:text-emerald-400 transition">
              {Title}
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 min-h-[66px]">
              {Description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4 min-h-[32px]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] px-2 py-1 rounded-full bg-white/[0.04] border border-white/5 text-slate-400 uppercase tracking-widest"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-white/5">
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    GitHub
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="h-10 flex items-center text-xs text-slate-500 uppercase font-bold">
                  Private Repo
                </span>
              )}

              {id && (
                <Link
                  to={`/project/${id}`}
                  className="h-10 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all hover:scale-105"
                >
                  <span className="text-[10px] font-black uppercase whitespace-nowrap tracking-widest">
                    View Details
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;