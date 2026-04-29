import React, { useState } from "react";
import { Send, MessageSquare, X, Bot } from "lucide-react";

const CyberAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "👋 Welcome to Amal Cyber Lab AI. How can I assist your security inquiry today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;
    const userMsg = { role: "user", text: input };
    
    let response = "🔍 Analyzing request... I am trained to discuss Amal's Azure labs and Cyber projects.";
    const query = input.toLowerCase();

    if (query.includes("azure") || query.includes("az-500")) {
      response = "Amal is highly focused on AZ-500. His labs include Sentinel SIEM, Azure WAF, and PIM implementation.";
    } else if (query.includes("medium") || query.includes("article")) {
      response = "Amal has published 8+ technical writeups on Medium covering SOC automation and Threat Hunting.";
    } else if (query.includes("contact") || query.includes("hire")) {
      response = "You can contact Amal via the contact form below or through his LinkedIn profile.";
    }

    setMessages([...messages, userMsg, { role: "ai", text: response }]);
    setInput("");
  };

  return (
    // 📍 SIEMLogs එකට උඩින් පේන්න මම මේක bottom-28 ට මාරු කළා (දකුණු පැත්තේ)
    <div className="fixed bottom-28 right-8 z-[9999]">
      {isOpen ? (
        <div className="w-[320px] bg-slate-950/95 backdrop-blur-2xl border border-emerald-500/30 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.2)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-emerald-500/10 border-b border-white/5 flex justify-between items-center text-emerald-400 font-bold text-[10px] uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <Bot size={14} className="animate-pulse" />
              <span>Cyber AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[300px] font-mono text-[11px] scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`p-2.5 rounded-xl max-w-[85%] ${
                msg.role === "ai" 
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/10 self-start" 
                : "bg-white/5 text-slate-300 ml-auto border border-white/5"
              }`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t border-white/5 p-3 bg-black/20">
            <input 
              className="flex-1 bg-transparent px-2 py-1 text-xs outline-none text-white placeholder:text-slate-600" 
              placeholder="Ask about labs (Azure, SOC, AI)..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
            />
            <button onClick={handleSend} className="p-2 text-emerald-400 hover:scale-110 active:scale-90 transition-all">
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="group relative p-4 bg-emerald-500 text-black rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 transition-all duration-300 active:scale-95"
        >
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-slate-900 rounded-full animate-bounce" />
          <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default CyberAI;