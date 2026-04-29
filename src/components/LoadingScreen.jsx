import React, { useEffect, useState } from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const bootLines = [
  "Loading security telemetry...",
  "Validating identity protection...",
  "Initializing Microsoft Defender modules...",
  "Checking SOC monitoring pipeline...",
  "Preparing cloud security dashboard...",
];

const LoadingScreen = () => {
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % bootLines.length);
    }, 700);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />

      {/* Main Panel */}
      <div className="relative z-10 w-[90%] max-w-lg rounded-3xl border border-white/10 bg-[#0a0f1a]/80 backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(16,185,129,0.15)]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping" />
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-emerald-400 border-r-blue-500 animate-spin" />
            <div className="absolute inset-3 rounded-full bg-[#030014] flex items-center justify-center border border-white/10">
              <ShieldCheck className="w-7 h-7 text-emerald-400 animate-pulse" />
            </div>
          </div>

          <div>
            <p className="text-emerald-400 text-[10px] font-mono uppercase tracking-[0.35em]">
              Windows Security
            </p>
            <h2 className="text-white text-lg font-black">
              Secure Environment Launch
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Amal Cyber Lab™ initializing
            </p>
          </div>
        </div>

        {/* Boot Lines */}
        <div className="space-y-3 mb-8">
          {bootLines.map((line, index) => (
            <div
              key={line}
              className={`flex items-center gap-3 text-xs font-mono transition-all duration-500 ${
                index <= activeLine ? "text-emerald-400" : "text-slate-600"
              }`}
            >
              <CheckCircle2
                size={14}
                className={
                  index <= activeLine ? "opacity-100" : "opacity-25"
                }
              />
              <span>{line}</span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-emerald-400 to-blue-500 animate-pulse" />
        </div>

        <p className="text-slate-500 text-[10px] font-mono mt-4 text-center uppercase tracking-widest">
          Threat protection • Identity security • Cloud defense
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;