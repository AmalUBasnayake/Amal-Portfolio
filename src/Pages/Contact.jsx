import React, { useState, useEffect } from "react";
import {
  Share2,
  User,
  Mail,
  MessageSquare,
  Send,
  Github,
  Linkedin,
} from "lucide-react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const ContactPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while we secure your connection",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const formSubmitUrl = "https://formsubmit.co/amal.udayanga@gmail.com";

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("message", formData.message);
      submitData.append("_subject", "New Message from Amal Cyber Lab");
      submitData.append("_captcha", "false");
      submitData.append("_template", "table");

      // ✅ Save message to Supabase
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            source: "portfolio",
            status: "new",
          },
        ]);

      if (dbError) throw dbError;

      // ✅ Send message to email
      await axios.post(formSubmitUrl, submitData);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      Swal.close();
      navigate("/thank-you");
    } catch (error) {
      console.error("Contact form error:", error);

      Swal.fire({
        title: "Error!",
        text: "Connection failed. Please try again later.",
        icon: "error",
        confirmButtonColor: "#10b981",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="Contact"
      className="px-[5%] lg:px-[10%] py-16 bg-[#050505] text-white min-h-screen relative"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />

      {/* Header */}
      <div className="text-center mb-16" data-aos="fade-down">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Contact <span className="text-emerald-400">Me</span>
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Let’s build something secure, scalable, and powerful together. Reach
          out for collaborations or enterprise solutions.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Form */}
        <div
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl transition-all hover:border-emerald-500/30"
          data-aos="fade-right"
        >
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-400 font-medium">
              Send a Direct Message 🚀
            </p>
            <Share2 className="text-emerald-400 opacity-50" size={20} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <User
                className="absolute left-4 top-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors"
                size={20}
              />

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full pl-12 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition disabled:opacity-50"
              />
            </div>

            <div className="relative group">
              <Mail
                className="absolute left-4 top-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors"
                size={20}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full pl-12 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition disabled:opacity-50"
              />
            </div>

            <div className="relative group">
              <MessageSquare
                className="absolute left-4 top-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors"
                size={20}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                rows={5}
                className="w-full pl-12 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition resize-none disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Links */}
        <div
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl transition-all hover:border-blue-500/30"
          data-aos="fade-left"
        >
          <div className="mb-8 flex justify-between items-center">
            <p className="text-gray-400 font-medium">
              Connect on Professional Platforms 🌐
            </p>
            <Share2 className="text-blue-400 opacity-50" size={20} />
          </div>

          <div className="space-y-5">
            <a
              href="https://www.linkedin.com/in/amal-udayanga-basnayake/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500 transition-all group"
            >
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                <Linkedin size={24} />
              </div>

              <div>
                <p className="font-bold text-lg">LinkedIn</p>
                <p className="text-sm text-gray-400">
                  amal-udayanga-basnayake
                </p>
              </div>
            </a>

            <a
              href="https://github.com/AmalUBasnayake"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500 transition-all group"
            >
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <Github size={24} />
              </div>

              <div>
                <p className="font-bold text-lg">GitHub</p>
                <p className="text-sm text-gray-400">AmalUBasnayake</p>
              </div>
            </a>

            <a
              href="mailto:amal.udayanga@gmail.com"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-purple-500/10 hover:border-purple-500 transition-all group"
            >
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>

              <div>
                <p className="font-bold text-lg">Direct Email</p>
                <p className="text-sm text-gray-400">
                  amal.udayanga@gmail.com
                </p>
              </div>
            </a>
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-blue-500/5 border border-white/5">
            <p className="text-gray-400 text-sm leading-relaxed italic">
              Securing the digital frontier through innovative cloud solutions
              and automated threat response.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;