import React, { useEffect, useState } from "react";
import { Globe } from "lucide-react";

const AttackMap = () => {
  // වම් පැත්තේ පරණ රතු කොටුව (Feed එක) මම මෙතනින් සම්පූර්ණයෙන්ම අයින් කළා.
  // ඒ වෙනුවට ඔයාගේ සයිට් එකේ Background එකේ පේන ලස්සන "Visual Element" එකක් විතරක් ඉතුරු කරමු.

  return (
    <div className="fixed bottom-6 left-6 pointer-events-none z-[40] hidden md:block">
      <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-500/10">
        <Globe size={14} className="text-emerald-500 animate-spin-slow" />
        <span className="text-[10px] font-mono text-emerald-500/70 uppercase tracking-widest">
          Global Threat Node: <span className="text-white">Active</span>
        </span>
      </div>
      
      {/* ඔයාට පස්සේ කාලෙක මෙතන ලස්සන Map එකක් හෝ SVG එකක් ඇඳගන්න පුළුවන් */}
    </div>
  );
};

export default AttackMap;