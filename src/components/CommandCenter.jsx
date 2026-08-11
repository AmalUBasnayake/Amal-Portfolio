import React, { memo } from "react";
import {
  Cpu,
  Zap,
  Radio,
  ShieldCheck,
  Activity,
  LockKeyhole,
} from "lucide-react";

const CommandCenter = () => {
  const metrics = [
    {
      icon: Cpu,
      label: "System CPU",
      value: "14.2%",
      iconClass: "text-emerald-400",
      valueClass: "text-emerald-300",
    },
    {
      icon: Zap,
      label: "Latency",
      value: "24ms",
      iconClass: "text-amber-400",
      valueClass: "text-amber-300",
    },
    {
      icon: Radio,
      label: "Uplink",
      value: "SECURE",
      iconClass: "text-blue-400",
      valueClass: "text-blue-300",
    },
  ];

  return (
    <div
      className="
        fixed
        bottom-6
        left-1/2
        -translate-x-1/2
        z-50
        w-[calc(100%-2rem)]
        max-w-[720px]
        md:w-auto
      "
    >
      {/* =====================================================
          OUTER SECURITY GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -inset-2
          rounded-[2rem]
          bg-gradient-to-r
          from-emerald-500/10
          via-cyan-500/10
          to-blue-500/10
          blur-xl
        "
      />

      {/* =====================================================
          COMMAND CENTER
      ===================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[1.6rem]
          border
          border-white/[0.10]
          bg-[#050a12]/90
          backdrop-blur-2xl
          shadow-[0_20px_70px_rgba(0,0,0,0.55)]
        "
      >
        {/* ===================================================
            TOP SECURITY SCAN LINE
        =================================================== */}

        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-[1px]
            bg-gradient-to-r
            from-transparent
            via-emerald-400/60
            to-transparent
          "
        />

        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            px-5
            py-3
            border-b
            border-white/[0.06]
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                relative
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-emerald-400/20
                bg-emerald-400/[0.06]
              "
            >
              <ShieldCheck
                size={16}
                className="text-emerald-400"
              />

              <span
                className="
                  absolute
                  -right-0.5
                  -top-0.5
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_8px_rgba(52,211,153,0.9)]
                  animate-pulse
                "
              />
            </div>

            <div>
              <p
                className="
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.3em]
                  text-emerald-400
                "
              >
                Security Command Center
              </p>

              <p
                className="
                  mt-0.5
                  text-[8px]
                  font-mono
                  uppercase
                  tracking-[0.18em]
                  text-slate-600
                "
              >
                Cloud Security Operations
              </p>
            </div>
          </div>

          {/* Operational status */}
          <div
            className="
              hidden
              sm:flex
              items-center
              gap-2
              rounded-full
              border
              border-emerald-500/15
              bg-emerald-500/[0.05]
              px-3
              py-1.5
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

            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.2em]
                text-emerald-400
              "
            >
              Operational
            </span>
          </div>
        </div>

        {/* ===================================================
            METRICS
        =================================================== */}

        <div
          className="
            grid
            grid-cols-3
            divide-x
            divide-white/[0.06]
          "
        >
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="
                  group
                  relative
                  px-4
                  py-4
                  md:px-6
                  transition-all
                  duration-300
                  hover:bg-white/[0.025]
                "
              >
                {/* Hover glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                    bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06),transparent_65%)]
                  "
                />

                <div className="relative flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/[0.07]
                      bg-white/[0.025]
                      transition-all
                      duration-300
                      group-hover:border-emerald-400/20
                      group-hover:bg-emerald-400/[0.05]
                    "
                  >
                    <Icon
                      size={15}
                      className={`${metric.iconClass} transition-transform duration-300 group-hover:scale-110`}
                    />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        truncate
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-slate-600
                        md:text-[8px]
                      "
                    >
                      {metric.label}
                    </p>

                    <p
                      className={`
                        mt-1
                        text-[10px]
                        font-black
                        font-mono
                        tracking-wider
                        ${metric.valueClass}
                      `}
                    >
                      {metric.value}
                    </p>
                  </div>
                </div>

                {/* Metric indicator */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-[1px]
                    w-0
                    -translate-x-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-emerald-400
                    to-transparent
                    transition-all
                    duration-500
                    group-hover:w-[65%]
                  "
                />
              </div>
            );
          })}
        </div>

        {/* ===================================================
            FOOTER / SECURITY STATE
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            border-t
            border-white/[0.06]
            px-5
            py-2.5
          "
        >
          <div className="flex items-center gap-2">
            <Activity
              size={11}
              className="text-emerald-400"
            />

            <span
              className="
                text-[7px]
                font-mono
                uppercase
                tracking-[0.22em]
                text-slate-600
                md:text-[8px]
              "
            >
              Telemetry Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <LockKeyhole
              size={10}
              className="text-blue-400"
            />

            <span
              className="
                text-[7px]
                font-mono
                uppercase
                tracking-[0.22em]
                text-slate-600
                md:text-[8px]
              "
            >
              Encrypted Uplink
            </span>
          </div>

          <span
            className="
              hidden
              sm:block
              text-[7px]
              font-mono
              uppercase
              tracking-[0.18em]
              text-slate-700
            "
          >
            SEC://CMD-01
          </span>
        </div>

        {/* ===================================================
            INNER VIGNETTE
        =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[1.6rem]
            shadow-[inset_0_0_45px_rgba(0,0,0,0.45)]
          "
        />
      </div>
    </div>
  );
};

export default memo(CommandCenter);