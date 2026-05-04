import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";
import { AppBar, Tabs, Tab, Box, Skeleton } from "@mui/material";
import { Award, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import CardProject from "../components/CardProject";
import Certifications from "../components/Certifications";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="group relative px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl transition-all duration-300 shadow-lg"
  >
    <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-emerald-400">
      {isShowingMore ? "Show Less Labs" : "Explore Full Lab Archive"}
      <Zap
        className={`w-4 h-4 transition-transform duration-500 ${
          isShowingMore ? "rotate-180" : "group-hover:scale-125"
        }`}
      />
    </div>
  </button>
);

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: { xs: 0, sm: 2 }, mt: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </Box>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data: proj, error } = await supabase
        .from("projects")
        .select("*");

      if (error) throw error;

      const priorityOrder = [
        "DDoS",
        "SOAR",
        "Sentinel",
        "High Availability",
        "Vulnerability",
        "Honeypot",
        "Firewall",
        "WAF",
      ];

      const sortedProjects = (proj || []).sort((a, b) => {
        const getRank = (title = "") => {
          const index = priorityOrder.findIndex((key) =>
            title.toLowerCase().includes(key.toLowerCase())
          );
          return index === -1 ? 100 : index;
        };

        return getRank(a.Title) - getRank(b.Title);
      });

      setProjects(sortedProjects);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Unable to load security labs right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (_, newValue) => setValue(newValue);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 6);

  return (
    <section
      id="Portofolio"
      className="md:px-[10%] px-[5%] w-full pt-20 pb-24 bg-[#030014] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_55%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-12">
          <p className="text-emerald-400 text-xs font-mono uppercase tracking-[0.35em] mb-3">
            Proof of Work
          </p>

          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tight">
            Security Portfolio.
          </h2>

          <p className="text-slate-400 text-sm mt-4 max-w-3xl mx-auto leading-relaxed">
            Real-world cloud security, SOC monitoring, SIEM/SOAR, and threat
            detection labs aligned with Cybersecurity Engineer roles.
          </p>
        </div>

        <Box sx={{ width: "100%" }}>
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "24px",
              mb: 1,
              overflow: "hidden",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              sx={{
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: "3px",
                  bgcolor: "#10b981",
                },
              }}
            >
              <Tab
                icon={
                  <ShieldCheck className="w-5 h-5 mb-1 text-emerald-500" />
                }
                label="Security Labs"
                sx={{
                  color: "#94a3b8",
                  fontWeight: "bold",
                  "&.Mui-selected": { color: "#fff" },
                }}
              />

              <Tab
                icon={<Award className="w-5 h-5 mb-1 text-emerald-500" />}
                label="Credentials"
                sx={{
                  color: "#94a3b8",
                  fontWeight: "bold",
                  "&.Mui-selected": { color: "#fff" },
                }}
              />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            {error && (
              <div className="text-center py-10 text-red-400 text-sm">
                {error}
              </div>
            )}

            {!error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {loading
                  ? [...Array(6)].map((_, i) => (
                      <Skeleton
                        key={i}
                        variant="rectangular"
                        height={420}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.05)",
                          borderRadius: "24px",
                        }}
                      />
                    ))
                  : visibleProjects.map((project, index) => (
                      <div
                        key={project.id || index}
                        data-aos="zoom-in-up"
                        data-aos-delay={index * 50}
                        className="h-full flex"
                      >
                        <CardProject {...project} />
                      </div>
                    ))}
              </div>
            )}

            {!loading && !error && projects.length === 0 && (
              <div className="text-center py-16 text-slate-400 text-sm">
                No projects available yet.
              </div>
            )}

            {!loading && !error && projects.length > 6 && (
              <div className="mt-16 flex justify-center">
                <ToggleButton
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Certifications />
          </TabPanel>
        </Box>
      </div>
    </section>
  );
}