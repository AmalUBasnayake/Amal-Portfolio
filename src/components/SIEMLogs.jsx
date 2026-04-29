import React, { useEffect, useState } from "react";
import { Activity } from "lucide-react";

const logsData = [
  { msg: "SQL Injection detected", origin: "Germany", type: "error" },
  { msg: "Brute Force detected", origin: "Russia", type: "error" },
  { msg: "Malware Entry detected", origin: "UK", type: "error" },
  { msg: "DDoS Mitigation Active", origin: "USA", type: "warn" },
];

const SIEMLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const log = logsData[Math.floor(Math.random() * logsData.length)];
      const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
      setLogs((prev) => [{ ...log, time: timestamp }, ...prev.slice(0, 4)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    // 📍 මම මේක දකුණු පැත්තේ පල්ලෙහාට (right-8 bottom-10) මාරු කළා
    <div className="fixed bottom-10 right-8 z-[100] w-[280px] pointer-events-none">
      <div className="bg-black/80 backdrop-blur-xl border border-red-500/20 rounded-2xl p-4 shadow-[0_0_30px_rgba(239,68,68,0.15)] pointer-events-auto">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 border-b border-red-500/10 pb-2">
          <Activity className="w-3 h-3 text-red-500 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500/80">
            Live Threat Feed (SIM)
          </span>
        </div>

        {/* Logs */}
        <div className="space-y-3 font-mono">
          {logs.map((log, i) => (
            <div key={i} className="flex flex-col gap-0.5 animate-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-center text-[8px] text-slate-500">
                <span>[{log.time}]</span>
                <span className="text-red-400">Origin: {log.origin}</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-bold leading-tight">
                {log.msg}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SIEMLogs;