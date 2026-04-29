import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import ParticlesBg from "./ParticlesBg";
import { Cloud, ShieldCheck, Activity, Network } from "lucide-react";

const skills = [
  { name: "Azure", icon: "/icons/azure.svg", category: "Cloud" },
  { name: "Microsoft Sentinel", icon: "/icons/sentinel.svg", category: "SOC" },
  { name: "Splunk", icon: "/icons/splunk.svg", category: "SOC" },
  { name: "Kali Linux", icon: "/icons/kali.svg", category: "Offensive" },
  { name: "Python", icon: "/icons/python.svg", category: "Automation" },
  { name: "Linux", icon: "/icons/linux.svg", category: "Systems" },
  { name: "Active Directory", icon: "/icons/ad.svg", category: "Identity" },
  { name: "Wireshark", icon: "/icons/wireshark.svg", category: "Network" },
  { name: "Nessus", icon: "/icons/nessus.svg", category: "Vulnerability" },
  { name: "PowerShell", icon: "/icons/powershell.svg", category: "Automation" },
  { name: "Networking", icon: "/icons/network.svg", category: "Infrastructure" },
  { name: "Cloud Security", icon: "/icons/security.svg", category: "Security" },
];

const focusCards = [
  {
    icon: Cloud,
    title: "Cloud Security",
    text: "Azure, Microsoft 365, identity and access protection",
  },
  {
    icon: Activity,
    title: "SOC Operations",
    text: "SIEM, alert triage, log analysis and detection engineering",
  },
  {
    icon: ShieldCheck,
    title: "Security Engineering",
    text: "Hardening, monitoring, automation and response workflows",
  },
  {
    icon: Network,
    title: "Infrastructure Defense",
    text: "Networking, firewalls, endpoint visibility and vulnerability management",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.45,
      ease: "easeOut",
    },
  }),
};

const Skills = () => {
  return (
    <section
      id="Skills"
      className="relative py-28 px-[5%] md:px-[10%] bg-[#050505] overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <ParticlesBg />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 text-xs font-mono uppercase tracking-[0.35em] mb-3">
            Technical Capability
          </p>

          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 italic uppercase leading-none">
            Security Skill Stack.
          </h2>

          <p className="text-slate-400 mt-5 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            Practical tools and platforms used across cloud security, SOC
            operations, SIEM/SOAR labs, identity security and infrastructure
            defense.
          </p>
        </motion.div>

        {/* FOCUS CARDS */}
        <div className="grid md:grid-cols-4 gap-4 mb-14">
          {focusCards.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 hover:border-emerald-500/30 transition"
            >
              <item.icon className="text-emerald-400 mb-4" size={24} />
              <h3 className="text-white font-black text-sm">{item.title}</h3>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* SKILL GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <Tilt
              key={skill.name}
              glareEnable
              glareMaxOpacity={0.12}
              scale={1.03}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              transitionSpeed={900}
            >
              <motion.div
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group relative h-full p-[1px] rounded-2xl bg-gradient-to-br from-emerald-500/12 via-blue-500/[0.08] to-purple-500/10"
              >
                <div className="relative h-full min-h-[165px] rounded-2xl bg-[#0a0f1a]/95 backdrop-blur-xl p-5 flex flex-col items-center justify-center gap-4 border border-white/5 overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.8),transparent_65%)]" />

                  <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                    <motion.img
                      src={skill.icon}
                      alt={skill.name}
                      loading="lazy"
                      className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                      whileHover={{ scale: 1.16, rotate: 4 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14 }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://www.svgrepo.com/show/354313/security.svg";
                      }}
                    />
                  </div>

                  <div className="relative z-10 text-center">
                    <span className="block text-slate-200 font-black text-[11px] tracking-widest uppercase group-hover:text-emerald-400 transition">
                      {skill.name}
                    </span>

                    <span className="inline-block mt-2 text-[8px] px-2 py-1 rounded-full bg-white/[0.04] border border-white/5 text-slate-500 uppercase tracking-widest">
                      {skill.category}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-blue-500 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;