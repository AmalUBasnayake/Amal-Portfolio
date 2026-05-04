import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ShieldCheck,
  Loader2,
  X,
  Clock,
  FileCheck,
  Download,
} from "lucide-react";

const Certifications = () => {
  const [filter, setFilter] = useState("All");
  const [selectedCert, setSelectedCert] = useState(null);

  const certificationsList = [
    {
      title: "Pearson BTEC HND in Cybersecurity",
      org: "Pearson BTEC Level 5 • Achievers International Campus",
      description:
        "Completed April 2026 • 240 Credits • Distinction in Digital Forensics & Information Security Management",
      category: "Academic",
      status: "Completed",
      statusType: "verified",
      pdfUrl: "/certificates/Amal_Basnayake_HND_Completion_Letter.pdf",
      image: "/certificates/btec-hnd.png",
    },
    {
      title: "Azure Security Engineer Path (AZ-500)",
      org: "Microsoft",
      description: "Cloud identity, threat protection & SOC engineering",
      category: "Cloud",
      status: "In Progress",
      statusType: "progress",
      pdfUrl: null,
      image: "/certificates/az500.png",
    },
    {
      title: "ISO 27001 Lead Auditor",
      org: "Mastermind",
      description: "ISMS auditing & enterprise compliance",
      category: "Compliance",
      status: "Verified",
      statusType: "verified",
      pdfUrl: "/certificates/iso-27001.pdf",
      image: "/certificates/iso-27001.png",
    },
    {
      title: "Blue Team Junior Analyst",
      org: "Security Blue Team",
      description: "SOC operations & threat detection",
      category: "Defensive",
      status: "Verified",
      statusType: "verified",
      pdfUrl: "/certificates/btja.pdf",
      image: "/certificates/btja.png",
    },
    {
      title: "CCNA (Cisco Certified Network Associate)",
      org: "Cisco",
      description: "Network fundamentals & security",
      category: "Networking",
      status: "Verified",
      statusType: "verified",
      pdfUrl: "/certificates/ccna.pdf",
      image: "/certificates/ccna.png",
    },
    {
      title: "Red Team Operations",
      org: "Red Team Leaders",
      description: "Adversary simulation & exploitation",
      category: "Offensive",
      status: "Verified",
      statusType: "verified",
      pdfUrl: "/certificates/red-team.pdf",
      image: "/certificates/red-team.png",
    },
  ];

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

  const categories = [
    "All",
    "Cloud",
    "Networking",
    "Defensive",
    "Offensive",
    "Compliance",
    "Academic",
  ];

  const filteredCerts =
    filter === "All"
      ? certificationsList
      : certificationsList.filter((cert) => cert.category === filter);

  const statusStyle = {
    verified: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    progress: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    pending: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  const statusIcon = {
    verified: <ShieldCheck size={13} />,
    progress: <Loader2 size={13} className="animate-spin" />,
    pending: <Clock size={13} />,
  };

  return (
    <section className="relative py-28 px-[5%] md:px-[10%] bg-[#030712] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.07),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-emerald-400 text-xs font-mono uppercase tracking-[0.35em] mb-3">
            Verification Dashboard
          </p>

          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tight leading-none">
            Credential Intelligence Center.
          </h2>

          <p className="text-slate-400 text-sm mt-4 max-w-3xl leading-relaxed">
            6 Featured Credentials • 35+ Learning Achievements •
            Cross-Platform Verification across Microsoft Learn, Credly, Cisco
            NetAcad, Hack The Box, and TryHackMe.
          </p>
        </div>

        {/* METRICS */}
        <div className="grid md:grid-cols-3 gap-4 mb-14">
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              Featured Credentials
            </p>
            <h3 className="text-3xl font-black text-white mt-2">6</h3>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              Verified Records
            </p>
            <h3 className="text-3xl font-black text-emerald-400 mt-2">5</h3>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              Active Certification
            </p>
            <h3 className="text-2xl font-black text-amber-400 mt-2">
              AZ-500
            </h3>
          </div>
        </div>

        {/* HND COMPLETION HIGHLIGHT - ENGINEER LEVEL UI */}
        <div className="mb-10 relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.10] via-[#07111f] to-cyan-500/[0.06] p-6 md:p-8 shadow-[0_0_50px_rgba(16,185,129,0.10)]">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex gap-5">
              <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-400/30">
                <ShieldCheck className="text-emerald-400" size={32} />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  <ShieldCheck size={13} />
                  Verified Academic Credential
                </div>

                <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight">
                  Pearson BTEC HND in Cybersecurity
                </h3>

                <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
                  Official completion confirmation from Achievers International
                  Campus. Completed with 240 credits, including Distinction
                  grades in Digital Forensics and Information Security
                  Management.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  <div className="rounded-2xl bg-black/25 border border-white/10 p-4">
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">
                      Status
                    </p>
                    <p className="text-emerald-400 font-black text-sm mt-1">
                      Completed
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/25 border border-white/10 p-4">
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">
                      Credits
                    </p>
                    <p className="text-white font-black text-sm mt-1">240</p>
                  </div>

                  <div className="rounded-2xl bg-black/25 border border-white/10 p-4">
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">
                      Grade
                    </p>
                    <p className="text-yellow-400 font-black text-sm mt-1">
                      2 Distinctions
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/25 border border-white/10 p-4">
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest">
                      Certificate
                    </p>
                    <p className="text-blue-400 font-black text-sm mt-1">
                      Pending
                    </p>
                  </div>
                </div>

                <p className="text-slate-500 text-xs mt-4">
                  Official certificate pending — completion letter available for
                  verification.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[190px]">
              <button
                type="button"
                onClick={() => setSelectedCert(certificationsList[0])}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition shadow-[0_0_25px_rgba(16,185,129,0.25)]"
              >
                <ExternalLink size={15} />
                View Letter
              </button>

              <a
                href="/certificates/Amal_Basnayake_HND_Completion_Letter.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 text-xs font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition"
              >
                <Download size={15} />
                Download
              </a>
            </div>
          </div>
        </div>

        {/* AZ-500 TRACK */}
        <div className="mb-14 rounded-3xl bg-amber-500/[0.04] border border-amber-500/20 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="text-amber-400 text-xs uppercase tracking-widest font-bold">
                Active Certification Track
              </p>
              <h3 className="text-white text-xl font-bold mt-2">
                Microsoft Azure Security Engineer Path (AZ-500)
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Focused on Azure identity protection, threat defense, Microsoft
                Sentinel, and secure cloud architecture.
              </p>
            </div>

            <div className="min-w-[220px]">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Preparation Progress</span>
                <span className="text-amber-400 font-bold">Active</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[70%] bg-gradient-to-r from-amber-400 to-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                filter === cat
                  ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                  : "bg-white/[0.04] text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CERTIFICATION CARDS */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.25 }}
                className="group h-full rounded-3xl border border-white/10 bg-[#08111d]/80 hover:border-emerald-500/30 transition overflow-hidden"
              >
                <div className="p-5 h-full min-h-[430px] flex flex-col">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="relative h-36 rounded-2xl bg-white overflow-hidden border border-white/10 flex items-center justify-center"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-contain p-2 transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <span className="text-white text-[10px] font-black uppercase tracking-widest bg-emerald-500/25 border border-emerald-400/30 px-4 py-2 rounded-xl">
                        Preview
                      </span>
                    </div>
                  </button>

                  <div className="mt-5">
                    <div
                      className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full border uppercase tracking-widest ${
                        statusStyle[cert.statusType]
                      }`}
                    >
                      {statusIcon[cert.statusType]}
                      {cert.status}
                    </div>

                    <h3 className="text-white text-lg font-bold mt-4 leading-snug min-h-[52px] group-hover:text-emerald-400 transition">
                      {cert.title}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">{cert.org}</p>

                    <p className="text-slate-500 text-xs mt-3 min-h-[36px]">
                      {cert.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/20 transition"
                    >
                      {cert.pdfUrl ? "Preview" : "Status"}
                    </button>

                    <a
                      href={cert.pdfUrl || socialLinks[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest hover:text-white hover:bg-white/10 transition flex items-center justify-center gap-1"
                    >
                      {cert.pdfUrl ? "Open" : "Path"}{" "}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* VERIFIED LINKS */}
        <div className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm">
                Verified Profiles
              </h4>
              <p className="text-slate-500 text-xs mt-1">
                Cross-platform certification and lab verification sources.
              </p>
            </div>
            <FileCheck className="text-emerald-400" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#0a0f1a] border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 text-xs font-bold uppercase tracking-widest transition"
              >
                {link.name} <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xl p-2 md:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-[98vw] h-[96vh] bg-[#050812] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.16)]"
              >
                <div className="absolute top-0 left-0 right-0 z-20 px-5 py-4 bg-black/70 backdrop-blur-xl border-b border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-lg">
                      {selectedCert.title}
                    </h3>
                    <p className="text-slate-400 text-xs">
                      {selectedCert.org}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedCert(null)}
                    className="text-white hover:text-emerald-400 bg-white/5 border border-white/10 rounded-full p-2"
                  >
                    <X size={20} />
                  </button>
                </div>

                {selectedCert.pdfUrl ? (
                  <>
                    <div className="w-full h-full pt-[76px] bg-black">
                      <iframe
                        src={`${selectedCert.pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH&zoom=130`}
                        className="w-full h-full border-0"
                        title={selectedCert.title}
                      />
                    </div>

                    <a
                      href={selectedCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-5 right-5 z-20 bg-emerald-500 px-4 py-2 text-xs font-bold rounded-xl text-black hover:scale-105 transition shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                    >
                      Open Full Screen
                    </a>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white text-center px-6">
                    <div
                      className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border uppercase tracking-widest ${
                        statusStyle[selectedCert.statusType]
                      }`}
                    >
                      {statusIcon[selectedCert.statusType]}
                      {selectedCert.status}
                    </div>

                    <h3 className="text-xl font-bold mt-5 mb-3">
                      {selectedCert.title}
                    </h3>
                    <p className="text-slate-400 max-w-md">
                      {selectedCert.description}
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Certifications;