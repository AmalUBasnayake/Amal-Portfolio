import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";

const Insights = () => {
  // 🔗 ඔයාගේ නිවැරදි කළ ලිපි සහ ලින්ක්ස්
  const articles = [
    {
      title: "Automating Threat Response with Microsoft Sentinel & SOAR",
      desc: "How I built a real-time auto IP blocking system using Logic Apps and NSG to reduce MTTR from minutes to seconds.",
      link: "https://medium.com/@amaludayangabasnayake/automating-threat-response-in-azure-with-microsoft-sentinel-soar-0c31d752c422",
      tags: ["Sentinel", "SOAR", "Automation"]
    },
    {
      title: "Building an Enterprise-Style Azure Hub-and-Spoke Security Architecture",
      desc: "Implementing a resilient cloud topology using Azure Firewall to prevent direct internet exposure for critical workloads.",
      link: "https://medium.com/@amaludayangabasnayake/building-an-enterprise-style-azure-hub-and-spoke-security-architecture-az-500-lab-068393e8e2d4",
      tags: ["Azure Firewall", "Architecture", "AZ-500"]
    },
    {
      title: "Enforcing Zero Trust with Azure Conditional Access",
      desc: "Securing the primary attack surface by implementing granular MFA and identity-based access controls in Microsoft Entra ID.",
      link: "https://medium.com/@amaludayangabasnayake/enforcing-zero-trust-with-azure-conditional-access-mfa-lab-az-500-4b210d7a966a",
      tags: ["Zero Trust", "MFA", "Identity"]
    }
  ];

  return (
    <section id="insights" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
              Technical <br /> <span className="text-emerald-500 font-black">Writeups.</span>
            </h2>
            <p className="text-slate-500 mt-4 font-mono text-xs uppercase tracking-[0.4em]">
              8+ Hands-on Security Labs Published
            </p>
          </div>
          
          {/* 🔗 නිවැරදි කළ Medium Profile Link එක */}
          <a 
            href="https://medium.com/@amaludayangabasnayake" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-black text-xs uppercase tracking-[0.2em] text-white bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:bg-emerald-500 hover:text-black"
          >
            <span className="relative z-10">View All on Medium</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </a>
        </div>

        {/* ARTICLES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-[3rem] bg-[#0a0f1a]/80 border border-white/5 backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-500 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                   <BookOpen size={28} className="text-emerald-400" />
                </div>
                <a href={art.link} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-white hover:rotate-45 transition-all">
                   <ArrowUpRight size={24} />
                </a>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors leading-tight tracking-tight">
                {art.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-10 line-clamp-3 font-medium">
                {art.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {art.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black text-emerald-400 bg-emerald-400/5 px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-400/10 group-hover:border-emerald-400/30 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Decorative background glow for card */}
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;