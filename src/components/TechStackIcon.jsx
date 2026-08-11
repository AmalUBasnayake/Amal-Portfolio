import React, { useRef } from "react";

const TechStackIcon = ({ TechStackIcon: iconSrc, Language }) => {
  const cardRef = useRef(null);
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = x / rect.width;
      const percentY = y / rect.height;

      const rotateX = -(percentY - 0.5) * 10;
      const rotateY = (percentX - 0.5) * 10;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      card.style.setProperty("--rotate-x", `${rotateX}deg`);
      card.style.setProperty("--rotate-y", `${rotateY}deg`);
      card.style.setProperty("--spotlight-opacity", "1");
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--spotlight-opacity", "0");
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--spotlight-opacity", "1");
  };

  return (
    <div className="group relative w-full [perspective:1000px]">
      {/* Animated outer glow */}
      <div
        className="
          pointer-events-none
          absolute
          -inset-[1px]
          rounded-2xl
          opacity-0
          blur-md
          transition-all
          duration-500
          group-hover:opacity-70
          bg-gradient-to-r
          from-emerald-400/40
          via-cyan-400/30
          to-blue-500/40
        "
      />

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--rotate-x": "0deg",
          "--rotate-y": "0deg",
          "--spotlight-opacity": "0",
          transform:
            "rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) translateZ(0)",
        }}
        className="
          relative
          min-h-[170px]
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#080d17]/95
          backdrop-blur-2xl
          p-6
          flex
          flex-col
          items-center
          justify-center
          gap-4
          transform-gpu
          transition-[transform,border-color,box-shadow]
          duration-300
          ease-out
          group-hover:border-emerald-400/30
          group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)]
        "
      >
        {/* Cursor spotlight */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[var(--spotlight-opacity)]
            transition-opacity
            duration-300
          "
          style={{
            background:
              "radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(16,185,129,0.14), transparent 45%)",
          }}
        />

        {/* Secondary blue glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-32
            w-32
            rounded-full
            bg-blue-500/10
            blur-3xl
            transition-all
            duration-500
            group-hover:bg-blue-500/20
            group-hover:scale-150
          "
        />

        {/* Bottom emerald glow */}
        <div
          className="
            pointer-events-none
            absolute
            -bottom-16
            -left-16
            h-32
            w-32
            rounded-full
            bg-emerald-500/10
            blur-3xl
            transition-all
            duration-500
            group-hover:bg-emerald-500/20
            group-hover:scale-150
          "
        />

        {/* Top status indicator */}
        <div
          className="
            absolute
            right-4
            top-4
            flex
            items-center
            gap-1.5
            opacity-40
            transition-all
            duration-300
            group-hover:opacity-100
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-emerald-400
              shadow-[0_0_8px_rgba(52,211,153,0.8)]
              animate-pulse
            "
          />
          <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Active
          </span>
        </div>

        {/* Technology icon */}
        <div
          className="
            relative
            z-10
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-2xl
            border
            border-white/[0.06]
            bg-white/[0.025]
            shadow-[inset_0_0_25px_rgba(255,255,255,0.025)]
            transition-all
            duration-500
            ease-out
            group-hover:border-emerald-400/20
            group-hover:bg-emerald-400/[0.04]
            group-hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]
            group-hover:scale-110
          "
        >
          {/* Icon halo */}
          <div
            className="
              pointer-events-none
              absolute
              inset-2
              rounded-xl
              bg-emerald-400/5
              blur-xl
              opacity-0
              transition-all
              duration-500
              group-hover:opacity-100
            "
          />

          <img
            src={iconSrc}
            alt={`${Language} technology icon`}
            loading="lazy"
            draggable="false"
            className="
              relative
              z-10
              h-12
              w-12
              object-contain
              drop-shadow-[0_0_12px_rgba(16,185,129,0.15)]
              transition-all
              duration-500
              ease-out
              group-hover:drop-shadow-[0_0_20px_rgba(16,185,129,0.45)]
              group-hover:scale-110
            "
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://www.svgrepo.com/show/354313/security.svg";
            }}
          />
        </div>

        {/* Technology name */}
        <div className="relative z-10 text-center">
          <span
            className="
              block
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-slate-400
              transition-all
              duration-300
              md:text-xs
              group-hover:text-emerald-400
            "
          >
            {Language}
          </span>

          {/* Micro label */}
          <span
            className="
              mt-1
              block
              text-[8px]
              uppercase
              tracking-[0.15em]
              text-slate-600
              opacity-0
              transition-all
              duration-300
              group-hover:opacity-100
            "
          >
            Technology Stack
          </span>
        </div>

        {/* Bottom progress line */}
        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-[2px]
            w-0
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-emerald-400
            to-transparent
            transition-all
            duration-700
            ease-out
            group-hover:w-[75%]
          "
        />

        {/* Inner border */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-2xl
            border
            border-white/[0.02]
          "
        />

        {/* Technical corner accents */}
        <div
          className="
            pointer-events-none
            absolute
            left-3
            top-3
            h-3
            w-3
            border-l
            border-t
            border-emerald-400/0
            transition-all
            duration-300
            group-hover:border-emerald-400/50
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-3
            right-3
            h-3
            w-3
            border-b
            border-r
            border-blue-400/0
            transition-all
            duration-300
            group-hover:border-blue-400/50
          "
        />

        {/* Vignette */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-2xl
            shadow-[inset_0_0_45px_rgba(0,0,0,0.55)]
          "
        />
      </div>
    </div>
  );
};

export default TechStackIcon;