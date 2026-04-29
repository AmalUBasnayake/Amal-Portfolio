import React, { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

const AttackTimeline = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
      const types = ["SQL Injection Attempt", "Brute Force Detected", "Port Scan Blocked", "DDoS Mitigation Active"];
      const event = types[Math.floor(Math.random() * types.length)];
      setEvents(prev => [`[${time}] ALERT: ${event}`, ...prev.slice(0, 4)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-10 left-6 bg-black/60 backdrop-blur-xl p-5 rounded-3xl border border-white/5 text-emerald-500 font-mono w-[300px] z-50">
      <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
        <Terminal size={14} />
        <span className="text-[10px] font-black uppercase tracking-widest text-white">Attack Timeline</span>
      </div>
      <div className="space-y-2">
        {events.map((e, i) => (
          <div key={i} className="text-[9px] opacity-80 animate-in slide-in-from-left-2 duration-500">{e}</div>
        ))}
      </div>
    </div>
  );
};
export default AttackTimeline;