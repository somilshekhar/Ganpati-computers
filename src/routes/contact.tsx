import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowUpRight, Sparkle, Phone, Mail, MapPin, Clock, Send, ShieldAlert, Cpu } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Ganpati Computers" },
      { name: "description", content: "Get in touch with Ganpati Computers for custom PC configuration pricing, repair support, or hardware diagnostics." }
    ]
  }),
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "PC Customization",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in Name, Email, and Message.");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description: "A representative from Ganpati Computers will contact you shortly.",
        duration: 5000,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "PC Customization",
        message: "",
      });
      setSubmitting(false);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans antialiased overflow-x-hidden selection:bg-white/10 selection:text-white">
      {/* Website Navbar */}
      <Navbar />

      {/* Main Section */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col justify-between px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 md:py-10 max-w-[1400px] mx-auto w-full gap-8"
      >
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.15] font-normal tracking-tight">
              Get in Touch
            </h1>
            <p className="text-sm md:text-[15px] leading-[1.6] text-white/60 max-w-2xl font-normal">
              Have questions about component inventory, budget allocations, custom builds, or repair estimates? Drop us a line below or contact us directly.
            </p>
          </div>

          <a
            href="tel:+919876543210"
            className="self-start md:self-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white hover:text-black hover:bg-white transition-all duration-300 liquid-glass active:scale-95 cursor-pointer text-center"
          >
            Call Support Helpline
          </a>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 flex-grow items-stretch">
          
          {/* Card 1: Direct Channels (Col 1, Row 1) */}
          <div className="relative rounded-2xl bg-black overflow-hidden border border-white/5 flex flex-col justify-between p-6 min-h-[300px]">
            {/* Background Video */}
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/35 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-2">
              <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
              <span className="uppercase tracking-[0.22em] text-[11px] font-bold text-white/70">
                Direct Channels
              </span>
            </div>

            <div className="relative z-10 space-y-4 pt-12">
              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group"
              >
                <div className="h-8 w-8 rounded-lg bg-[#B287FF]/10 text-[#B287FF] flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Helpline</div>
                  <div className="text-xs font-bold text-white group-hover:underline">+91 98765 43210</div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:support@ganpaticomputers.com"
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group"
              >
                <div className="h-8 w-8 rounded-lg bg-[#B287FF]/10 text-[#B287FF] flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Email Address</div>
                  <div className="text-xs font-bold text-white group-hover:underline">support@ganpaticomputers.com</div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-2 rounded-xl">
                <div className="h-8 w-8 rounded-lg bg-[#B287FF]/10 text-[#B287FF] flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Main Store</div>
                  <div className="text-xs font-bold text-white leading-tight">New Delhi, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Send Message Form (Col 2-3, Row 1) */}
          <div className="lg:col-span-2 relative rounded-2xl bg-zinc-950 border border-white/5 p-6 md:p-8 flex flex-col justify-between overflow-hidden noise-overlay min-h-[380px]">
            <div className="relative z-10 flex items-center gap-2 mb-6">
              <Sparkle className="h-3 w-3 text-[#B287FF]" strokeWidth={1.5} />
              <span className="uppercase tracking-[0.22em] text-[11px] font-bold text-white/70">
                Send a Message
              </span>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-4 flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Your Name <span className="text-[#B287FF]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Somil Shekhar"
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#B287FF] focus:border-[#B287FF] transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Your Email <span className="text-[#B287FF]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="somil@example.com"
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#B287FF] focus:border-[#B287FF] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 99999 99999"
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#B287FF] focus:border-[#B287FF] transition-all"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-[#121214] text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#B287FF] transition-all cursor-pointer"
                  >
                    <option value="PC Customization">Custom PC Config</option>
                    <option value="Product Sourcing">Component Availability</option>
                    <option value="Repair Support">Hardware Repair Diagnostics</option>
                    <option value="Other">General Question</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                  Message <span className="text-[#B287FF]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you're looking for..."
                  className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#B287FF] focus:border-[#B287FF] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto h-11 px-6 rounded-full bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-wider text-xs transition-all duration-300 active:scale-95 disabled:bg-zinc-600 disabled:text-zinc-400 cursor-pointer mt-2"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Card 3: Store Hours (Col 1, Row 2) */}
          <div className="relative rounded-2xl bg-[#324444] border border-white/5 p-6 flex flex-col justify-between gap-6 overflow-hidden noise-overlay min-h-[190px]">
            <div className="flex items-center gap-2">
              <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
              <span className="uppercase tracking-[0.22em] text-[11px] font-bold text-white/70">
                Store Hours
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-white/90">
              <div className="flex justify-between items-center py-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#B287FF]" /> Mon - Sat:
                </span>
                <span className="font-bold">10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/5 pt-2.5">
                <span className="flex items-center gap-1.5 opacity-60">
                  <Clock className="h-3.5 w-3.5" /> Sunday:
                </span>
                <span className="font-bold opacity-60">Closed</span>
              </div>
            </div>

            <div className="text-[10px] text-zinc-400 font-medium">
              * Helpline calls are answered 24h.
            </div>
          </div>

          {/* Card 4: 24h Emergency Diagnostics (Col 2-3, Row 2) */}
          <div className="lg:col-span-2 relative rounded-2xl bg-black overflow-hidden border border-white/5 flex flex-col justify-between items-center p-6 min-h-[190px]">
            {/* Background Video */}
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45 pointer-events-none" />

            <div className="h-2" />
            
            <div className="relative z-10 text-center flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B287FF] bg-[#B287FF]/10 px-3 py-1 rounded-full flex items-center gap-1 mb-2">
                <Cpu className="h-3.5 w-3.5 text-[#B287FF] animate-spin" /> Priority Line
              </span>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-none select-none">
                24h Support
              </h3>
            </div>

            <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/85 mt-2">
              For emergency corporate hardware failure & diagnostics
            </span>
          </div>

        </div>
      </motion.main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
