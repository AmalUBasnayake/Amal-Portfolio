import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const ThankYouPage = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-6 bg-[#030014] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_55%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-xl w-full"
      >
        <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 blur-3xl opacity-60" />

        <div className="relative rounded-3xl bg-[#0a0f1a]/90 backdrop-blur-2xl border border-white/10 shadow-2xl px-8 py-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_45%)] pointer-events-none" />

          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <ShieldCheck className="text-emerald-400" size={16} />
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.25em]">
              Secure Message Delivered
            </span>
          </div>

          <div className="relative z-10 flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
          </div>

          <h1 className="relative z-10 text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 uppercase italic">
            Thank You
          </h1>

          <p className="relative z-10 text-slate-400 text-base md:text-lg mt-5 leading-relaxed">
            Your message has been successfully received. I’ll review it carefully
            and respond as soon as possible.
          </p>

          <p className="relative z-10 text-emerald-400 text-xs font-mono tracking-widest mt-4">
            ✔ Portfolio Contact Channel Active
          </p>

          <div className="relative z-10 mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-blue-500 text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition shadow-[0_0_20px_rgba(16,185,129,0.35)]"
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ThankYouPage;