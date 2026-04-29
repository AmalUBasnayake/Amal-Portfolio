import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { supabase } from "../supabase";

const HireMe = () => {
  const handleDownloadCV = async () => {
    try {
      await supabase.from("cv_downloads").insert([
        {
          source: "hire_me_section",
        },
      ]);
    } catch (error) {
      console.error("CV download tracking failed:", error);
    }

    const link = document.createElement("a");
    link.href = "/amal-cv.pdf";
    link.download = "Amal_Udayanga_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-24 px-6 text-center bg-[#030712] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[360px] h-[360px] bg-emerald-500/5 blur-[90px] rounded-full"></div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-black text-white mb-6 italic uppercase tracking-tighter relative z-10"
      >
        Let’s Build Secure Systems.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 max-w-2xl mx-auto mb-4 relative z-10"
      >
        Available for Cybersecurity Engineering, SOC Operations, and Cloud Security roles.
        Ready to bring real-world lab experience to enterprise infrastructure.
      </motion.p>

      <p className="text-emerald-400 text-sm font-mono mb-10 relative z-10">
        Open for enterprise security opportunities • Immediate collaboration available
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
        <a
          href="#Contact"
          className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2 hover:scale-105"
        >
          Hire Me
          <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
        </a>

        <button
          type="button"
          onClick={handleDownloadCV}
          className="group px-8 py-4 bg-emerald-500 text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center gap-2"
        >
          Download CV
          <Download size={16} className="group-hover:-translate-y-1 transition" />
        </button>
      </div>
    </section>
  );
};

export default HireMe;