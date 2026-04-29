import React, { useState } from "react";
import { ShieldCheck, ShieldAlert } from "lucide-react";

const ZeroTrustToggle = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full text-[10px] text-white border border-white/10 z-[60] flex items-center gap-3">
      <span className="font-black tracking-widest uppercase">Zero Trust Protocol:</span>
      <button 
        onClick={() => setEnabled(!enabled)}
        className={`flex items-center gap-2 px-4 py-1 rounded-full font-black transition-all ${enabled ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "bg-red-500 text-white animate-pulse"}`}
      >
        {enabled ? <ShieldCheck size={12}/> : <ShieldAlert size={12}/>}
        {enabled ? "ACTIVE" : "DISABLED"}
      </button>
    </div>
  );
};
export default ZeroTrustToggle;