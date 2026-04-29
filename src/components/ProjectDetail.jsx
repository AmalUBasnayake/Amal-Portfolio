import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ShieldCheck,
  Zap,
  Server,
  ShieldAlert,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.82]);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true });
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", parseInt(id))
        .single();

      if (error) throw error;
      setProject(data);
    } catch (err) {
      console.error("Error fetching project:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black italic tracking-widest text-red-500 uppercase mb-4">
          Access Denied: Lab Not Found
        </h1>
        <Link
          to="/"
          className="text-emerald-400 hover:text-white transition-all underline underline-offset-8"
        >
          Return to Command Center
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#030712] text-white min-h-screen font-sans selection:bg-emerald-500/30">
      <nav className="fixed top-0 w-full z-50 px-[5%] py-6 backdrop-blur-md bg-[#030712]/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Back to Terminal
            </span>
          </Link>

          <div className="hidden md:block text-emerald-500/40 text-[9px] font-mono tracking-widest uppercase">
            System_Status: Secure_Connection_Established
          </div>
        </div>
      </nav>

      {/* HERO FIXED */}
      <section className="relative min-h-screen flex items-center justify-center overflow-visible pt-28 pb-24">
        <motion.div style={{ scale, opacity }} className="absolute inset-0">
          <img
            src={project.Img}
            alt={project.Title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-[#030712]/88 to-[#030712]" />
        </motion.div>

        <div
          className="relative text-center z-10 px-6 max-w-5xl py-10"
          data-aos="zoom-out"
        >
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-8 inline-block shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            {project.category || "Cybersecurity Engineering"}
          </span>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent italic uppercase leading-[1.05]">
            {project.Title}
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base md:text-xl leading-relaxed font-light">
            {project.Description}
          </p>

          <div className="relative z-20 flex flex-wrap justify-center gap-6 mt-10 pb-8">
            <a
              href={project.Link || "#"}
              target="_blank"
              rel="noreferrer"
              className="relative z-20 inline-flex items-center gap-3 px-10 md:px-12 py-4 rounded-2xl bg-white text-black font-black hover:bg-emerald-400 hover:scale-105 transition-all active:scale-95 shadow-2xl uppercase tracking-[0.2em] text-[11px]"
            >
              <Github className="w-5 h-5" /> View Repository
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-[5%] pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-24">
            <section data-aos="fade-up">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[1px] flex-grow bg-white/10" />
                <h2 className="text-2xl font-bold italic uppercase tracking-tighter flex items-center gap-3">
                  <ShieldAlert className="text-emerald-400 w-6 h-6" /> Lab
                  Documentation
                </h2>
                <div className="h-[1px] flex-grow bg-white/10" />
              </div>

              <div className="group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-emerald-500/20 shadow-2xl shadow-emerald-500/5">
                <img
                  src={project.Img}
                  alt="Lab Preview"
                  className="w-full h-auto rounded-[1.8rem] transition-transform duration-700 group-hover:scale-[1.01]"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070";
                  }}
                />
              </div>
            </section>

            <section
              data-aos="fade-up"
              className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-10 md:p-16"
            >
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-8 flex items-center gap-4">
                <Server className="text-blue-500" /> Infrastructure Setup
              </h3>

              <p className="text-gray-400 leading-relaxed text-lg font-light mb-10">
                Detailed analysis of the lab deployment, including cloud
                networking, security protocols, and automation scripts used to
                build this environment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <h4 className="text-emerald-500 font-bold uppercase text-[10px] tracking-widest mb-2">
                    Core Tools
                  </h4>
                  <p className="text-xs text-gray-400 tracking-tight">
                    Sentinel, KQL, Azure LogicApps, Sysmon
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                  <h4 className="text-emerald-500 font-bold uppercase text-[10px] tracking-widest mb-2">
                    Deployment
                  </h4>
                  <p className="text-xs text-gray-400 tracking-tight">
                    Automated ARM & Bicep Templates
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div
              className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm sticky top-32"
              data-aos="fade-left"
            >
              <h3 className="text-lg font-bold mb-10 flex items-center gap-3 italic uppercase tracking-[0.2em]">
                <Zap className="text-yellow-400 w-5 h-5 fill-yellow-400/20" />{" "}
                Lab Metadata
              </h3>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-black mb-2">
                    Classification
                  </p>
                  <p className="text-gray-300 font-medium text-lg leading-tight">
                    {project.category || "General Security"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-black mb-2">
                    Status
                  </p>
                  <div className="flex items-center gap-2 text-gray-300 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />{" "}
                    Production Verified
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-black mb-4">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["SIEM", "SOAR", "AZURE", "KQL"].map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-mono text-gray-400 uppercase tracking-tighter"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section className="py-24 text-center border-t border-white/5 bg-gradient-to-b from-transparent to-emerald-500/[0.01]">
        <h2 className="text-2xl font-black italic uppercase tracking-tighter opacity-20 mb-10">
          End of Laboratory Transmission
        </h2>

        <Link
          to="/"
          className="inline-flex items-center gap-4 px-12 py-5 bg-emerald-500 text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-white hover:scale-105 transition-all duration-500 shadow-2xl shadow-emerald-500/20"
        >
          Return to Lab Dashboard <Zap className="fill-black w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default ProjectDetails;