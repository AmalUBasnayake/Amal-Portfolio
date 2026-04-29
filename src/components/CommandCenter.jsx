import React from "react";
import { Cpu, Zap, Radio } from "lucide-react";

const CommandCenter = () => (
  <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-2xl border border-emerald-500/20 rounded-full px-8 py-4 text-white z-50 shadow-2xl flex items-center gap-8">
    <div className="flex items-center gap-3">
      <Cpu className="text-emerald-500" size={18} />
      <div className="flex flex-col">
        <span className="text-[8px] text-slate-500 font-bold uppercase">System CPU</span>
        <span className="text-[10px] font-mono">14.2%</span>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Zap className="text-amber-500" size={18} />
      <div className="flex flex-col">
        <span className="text-[8px] text-slate-500 font-bold uppercase">Latency</span>
        <span className="text-[10px] font-mono">24ms</span>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Radio className="text-blue-500 animate-pulse" size={18} />
      <div className="flex flex-col">
        <span className="text-[8px] text-slate-500 font-bold uppercase">Uplink</span>
        <span className="text-[10px] font-mono">SECURE</span>
      </div>
    </div>
  </div>
);
export default CommandCenter;