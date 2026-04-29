import React, { useRef } from "react";

const TechStackIcon = ({ TechStackIcon: iconSrc, Language }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 12;
    const rotateY = (x / rect.width - 0.5) * 12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div className="group [perspective:1200px] w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl transition-all duration-300 will-change-transform"
      >
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 opacity-70">
          <div className="w-full h-full bg-[#030712] rounded-2xl" />
        </div>

        <div className="relative bg-[#0a0f1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 min-h-[150px] overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
            style={{
              background:
                "radial-gradient(600px at var(--x) var(--y), rgba(16,185,129,0.15), transparent 40%)",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

          <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <img
              src={iconSrc}
              alt={Language}
              loading="lazy"
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-500 group-hover:scale-125 group-hover:rotate-3"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://www.svgrepo.com/show/354313/security.svg";
              }}
            />
          </div>

          <span className="text-slate-300 font-bold text-[10px] md:text-xs tracking-widest uppercase group-hover:text-emerald-400 transition-all duration-300">
            {Language}
          </span>

          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-blue-500 group-hover:w-full transition-all duration-700" />
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default TechStackIcon;