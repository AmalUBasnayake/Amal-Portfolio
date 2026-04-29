import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Github, Terminal } from "lucide-react";

/* ---------------- TYPEWRITER ---------------- */
const Typewriter = ({ words }) => {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i];

    const timer = setTimeout(() => {
      setText((prev) =>
        del ? word.substring(0, prev.length - 1) : word.substring(0, prev.length + 1)
      );

      if (!del && text === word) setTimeout(() => setDel(true), 1200);
      else if (del && text === "") {
        setDel(false);
        setI((prev) => (prev + 1) % words.length);
      }
    }, del ? 40 : 70);

    return () => clearTimeout(timer);
  }, [text, del, i, words]);

  return (
    <span>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

/* ---------------- MATRIX RAIN ---------------- */
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#22c55e";
      ctx.font = fontSize + "px monospace";

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      });
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />;
};

/* ---------------- MAIN ---------------- */
const WelcomeScreen = ({ onLoadingComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // 🔊 Startup Sound
    const audio = new Audio("/startup.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});

    // 🧠 Voice Intro (optional)
    const speak = () => {
      const msg = new SpeechSynthesisUtterance("Welcome to Amal Cyber Lab");
      msg.rate = 0.9;
      msg.pitch = 1;
      window.speechSynthesis.speak(msg);
    };

    setTimeout(speak, 500);

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onLoadingComplete?.(), 800);
    }, 4500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(12px)",
            transition: { duration: 0.8 }
          }}
        >
          {/* 🌧 MATRIX */}
          <MatrixRain />

          {/* 🌌 GLOW */}
          <div className="absolute inset-0">
            <div className="absolute w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full top-[-20%] left-[-10%]" />
            <div className="absolute w-[600px] h-[600px] bg-blue-500/10 blur-[140px] rounded-full bottom-[-20%] right-[-10%]" />
          </div>

          {/* CONTENT */}
          <div className="relative text-center px-6">

            {/* ICONS */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-6 mb-10"
            >
              {[Shield, Terminal, Github].map((Icon, i) => (
                <div
                  key={i}
                  className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-110 transition"
                >
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
              ))}
            </motion.div>

            {/* BRAND */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-5xl sm:text-7xl font-black uppercase text-white"
            >
              Amal
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600">
                Cyber Lab
              </span>
            </motion.h1>

            {/* SUB */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-slate-400"
            >
              Amal Udayanga • Cybersecurity Engineer
            </motion.p>

            {/* TYPE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-6 text-emerald-400 font-mono text-xl"
            >
              <Typewriter
                words={[
                  "Cloud Security Specialist",
                  "Azure Security Engineer",
                  "IT and Systems Specialist",
                  "SOC Automation Builder",
                  "Threat Detection Engineer"
                ]}
              />
            </motion.div>

            {/* LOADING */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.8 }}
              className="h-[2px] bg-gradient-to-r from-emerald-400 to-blue-500 mt-10 mx-auto max-w-[220px]"
            />

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;