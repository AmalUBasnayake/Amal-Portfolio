import React, { useEffect, useState, useCallback, memo } from "react";
import { supabase } from "../supabase";
import {
  Shield,
  Cloud,
  Terminal,
  Users,
  LifeBuoy,
  Settings,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

/* ---------------- ICON MAPPING ---------------- */
const SERVICE_ICONS = {
  "Cloud Security": Cloud,
  "Identity Management": Users,
  "Infrastructure Hardening": Shield,
  "Enterprise IT Support": LifeBuoy,
  "SOC Automation": Terminal,
  "Systems Administration": Settings,
  default: Shield,
};

/* ---------------- SERVICE CARD ---------------- */
const ServiceCard = memo(({ title, description, features, index }) => {
  const Icon = SERVICE_ICONS[title] || SERVICE_ICONS.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      {/* Glow */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-700"></div>

      {/* Card */}
      <div className="relative h-full rounded-3xl bg-[#0a0f1a]/90 backdrop-blur-2xl border border-white/10 p-7 overflow-hidden transition-all duration-500 hover:-translate-y-2">

        {/* Background Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_45%)] pointer-events-none"></div>

        {/* Top */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <Icon className="w-7 h-7 text-emerald-400" strokeWidth={1.6} />
          </div>

          <ArrowUpRight className="text-slate-600 group-hover:text-emerald-400 transition" size={18} />
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition">
          {title}
        </h3>

        {/* Description */}
        <p className="relative z-10 text-slate-400 text-sm leading-relaxed mb-6 min-h-[72px]">
          {description}
        </p>

        {/* Features */}
        {features?.length > 0 && (
          <div className="relative z-10 space-y-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm text-slate-400"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                {feature}
              </div>
            ))}
          </div>
        )}

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-400 to-blue-500 group-hover:w-full transition-all duration-700"></div>
      </div>
    </motion.div>
  );
});

/* ---------------- MAIN COMPONENT ---------------- */
const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ once: true, duration: 900 });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;

      setServices(data || []);
    } catch {
      setServices([
        {
          id: 1,
          title: "Cloud Security",
          description: "Secure Azure & Microsoft 365 environments with enterprise-grade protection.",
          features: ["Defender for Cloud", "Policy Compliance", "NSG Hardening"],
        },
        {
          id: 2,
          title: "Identity Management",
          description: "Protect identities and enforce Zero Trust access policies.",
          features: ["Azure AD", "MFA", "Conditional Access"],
        },
        {
          id: 3,
          title: "SOC Automation",
          description: "Automate detection and response using SIEM & SOAR solutions.",
          features: ["Microsoft Sentinel", "Playbooks", "Threat Response"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section
      id="Services"
      className="relative w-full px-[5%] md:px-[10%] py-24 bg-[#050505] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/10 blur-[140px] rounded-full"></div>

      {/* Header */}
      <div className="text-center mb-20">
        <p className="text-emerald-400 text-xs font-mono tracking-[0.3em] uppercase mb-4">
          Enterprise Capability Matrix
        </p>

        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
          Security <span className="text-emerald-400">Services</span>
        </h2>

        <p className="text-slate-400 max-w-2xl mx-auto mt-5 text-sm md:text-base leading-relaxed">
          Enterprise-grade cybersecurity capabilities combining cloud defense,
          identity security, automation, and infrastructure resilience.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default memo(Services);