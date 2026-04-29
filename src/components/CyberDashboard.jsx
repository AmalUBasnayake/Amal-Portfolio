import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "10:00", threats: 2 }, { time: "10:20", threats: 5 },
  { time: "10:40", threats: 3 }, { time: "11:00", threats: 8 },
  { time: "11:20", threats: 4 }, { time: "11:40", threats: 6 },
];

const CyberDashboard = () => (
  <div className="fixed top-24 right-6 bg-black/60 backdrop-blur-xl p-5 rounded-3xl border border-white/5 text-white z-50 w-[280px]">
    <div className="text-[10px] font-black text-emerald-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Threat Activity (Live)
    </div>
    <div className="h-[150px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis hide domain={[0, 10]} />
          <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333', fontSize: '10px'}} />
          <Line type="monotone" dataKey="threats" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: '#10b981' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
export default CyberDashboard;