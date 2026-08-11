import React, { useEffect, useState } from "react";
import { ShieldCheck, CheckCircle2, LockKeyhole } from "lucide-react";

const bootLines = [
  "Loading security telemetry...",
  "Validating identity protection...",
  "Initializing cloud security controls...",
  "Checking SOC monitoring pipeline...",
  "Preparing security operations dashboard...",
];

const LoadingScreen = () => {
  const [activeLine, setActiveLine] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLine((prev) => {
        if (prev >= bootLines.length - 1) {
          clearInterval(timer);
          setTimeout(() => setReady(true), 500);
          return prev;
        }

        return prev + 1;
      });
    }, 650);

    return () => clearInterval(timer);
  }, []);

  const progress = ready
    ? 100
    : Math.round(((activeLine + 1) / bootLines.length) * 100);

  return (
    <main
      className="min-h-screen bg-[#030014] flex items-center justify-center relative overflow-hidden"
      aria-label="Amal Cyber Lab security environment initialization"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_55%)]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />

      {/* Scan Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent animate-pulse" />

      {/* Main Panel */}
      <section className="relative z-10 w-[90%] max-w-lg rounded-3xl border border-white/10 bg-[#0a0f1a]/85 backdrop-blur-xl p-8 shadow-[0_0_70px_rgba(16,185,129,0.12)]">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">

          {/* Security Icon */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">

            <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping" />

            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-emerald-400 border-r-blue-500 animate-spin" />

            <div className="absolute inset-3 rounded-full bg-[#030014] flex items-center justify-center border border-white/10">

              {ready ? (
                <LockKeyhole
                  className="w-7 h-7 text-emerald-400"
                  aria-hidden="true"
                />
              ) : (
                <ShieldCheck
                  className="w-7 h-7 text-emerald-400 animate-pulse"
                  aria-hidden="true"
                />
              )}

            </div>
          </div>

          {/* Identity */}
          <div>
            <p className="text-emerald-400 text-[10px] font-mono uppercase tracking-[0.35em]">
              Cyber Security Environment
            </p>

            <h1 className="text-white text-lg font-black">
              {ready
                ? "Secure Environment Ready"
                : "Security Environment Launch"}
            </h1>

            <p className="text-slate-500 text-xs mt-1">
              Amal Cyber Lab™
            </p>
          </div>
        </div>

        {/* Boot Telemetry */}
        <div
          className="space-y-3 mb-8"
          aria-live="polite"
          aria-atomic="false"
        >
          {bootLines.map((line, index) => {
            const completed = index <= activeLine;

            return (
              <div
                key={line}
                className={`flex items-center gap-3 text-xs font-mono transition-all duration-500 ${
                  completed
                    ? "text-emerald-400"
                    : "text-slate-600"
                }`}
              >
                <CheckCircle2
                  size={14}
                  className={`transition-opacity duration-500 ${
                    completed ? "opacity-100" : "opacity-20"
                  }`}
                  aria-hidden="true"
                />

                <span>{line}</span>

                {index === activeLine && !ready && (
                  <span className="ml-auto text-[9px] text-blue-400 animate-pulse">
                    ACTIVE
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div
          className="h-2 bg-white/5 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
          aria-label="Security environment initialization"
        >
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status */}
        <div className="flex items-center justify-between mt-4">

          <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">
            {ready ? "System Secure" : "Initializing Controls"}
          </p>

          <p className="text-emerald-400 text-[10px] font-mono">
            {progress}%
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <p className="text-slate-600 text-[9px] font-mono text-center uppercase tracking-[0.25em]">
            Identity Security • Cloud Defense • Threat Detection • SOC Operations
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoadingScreen;