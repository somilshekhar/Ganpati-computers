import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowUpRight,
  Sparkle,
  Cpu,
  HardDrive,
  Monitor,
  Keyboard,
  Mouse,
  Gamepad2,
  Wrench,
  ShieldCheck,
  Zap,
  Settings,
  Database,
  Network
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Ganpati Computers" },
      { name: "description", content: "Learn about Ganpati Computers: our custom building timeline, diagnostic support, and expert hardware engineering services." }
    ]
  }),
  component: AboutPage,
});

const ROW1_ICONS = [Cpu, HardDrive, Monitor, ShieldCheck, Zap, Settings, Database, Network];
const ROW2_ICONS = [Gamepad2, Wrench, Keyboard, Mouse, Cpu, HardDrive, Zap, Settings];

function AboutPage() {
  const handleTeamUp = () => {
    toast.success("Enquiry request sent!", {
      description: "Our custom PC building team will get back to you shortly."
    });
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
              We build hardware that powers your world.
            </h1>
            <p className="text-sm md:text-[15px] leading-[1.6] text-white/60 max-w-2xl font-normal">
              Ganpati Computers is your trusted technology partner, crafting high-performance custom gaming PCs, visual editing workstations, and offering transparent hardware diagnostics since 2008.
            </p>
          </div>

          <button
            onClick={handleTeamUp}
            className="self-start md:self-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white hover:text-black hover:bg-white transition-all duration-300 liquid-glass active:scale-95 cursor-pointer"
          >
            Let's Build Today
          </button>
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 flex-grow">
          
          {/* Column 1 - Timeline Card */}
          <div className="relative rounded-2xl bg-black overflow-hidden border border-white/5 flex flex-col justify-between p-6 min-h-[360px] md:min-h-[440px]">
            {/* Background Video */}
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/35 pointer-events-none" />

            {/* Label */}
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Sparkle className="h-3 w-3 text-white/70 animate-pulse" strokeWidth={1.5} />
              <span className="uppercase tracking-[0.22em] text-[11px] font-bold text-white/70">
                Milestones
              </span>
              <Sparkle className="h-3 w-3 text-white/70 animate-pulse" strokeWidth={1.5} />
            </div>

            {/* Timeline */}
            <div className="relative z-10 space-y-4 pt-16">
              {[
                { year: "2020-Now", role: "Expanded Custom PC Builds", tag: "Main Showroom" },
                { year: "2012-2020", role: "High-Tier Sourcing", tag: "Core Partners" },
                { year: "2008-2012", role: "Founded Local Workshop", tag: "Service Hub" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-[11px] font-bold text-white/80 font-mono tracking-tighter">
                    {item.year}
                  </span>
                  <Sparkle className="h-2.5 w-2.5 text-white/40" strokeWidth={1.5} />
                  <span className="text-xs font-semibold text-white/90">
                    {item.role}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 - Testimonials & Metrics */}
          <div className="grid grid-rows-[auto_1fr] gap-4 md:gap-5">
            {/* Top - Client Voice Card */}
            <div className="relative rounded-2xl bg-[#324444] border border-white/5 p-6 flex flex-col justify-between gap-6 overflow-hidden noise-overlay min-h-[190px]">
              <div className="flex items-center gap-2">
                <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
                <span className="uppercase tracking-[0.22em] text-[11px] font-bold text-white/70">
                  Client Voice
                </span>
                <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
              </div>
              <p className="text-[13px] sm:text-[13.5px] leading-[1.6] text-white/85 font-normal italic">
                "Ganpati Computers built my custom editing workstation. The system runs flawlessly under heavy 4K rendering loads, and their technical hardware support is prompt and extremely knowledgeable."
              </p>
              <div className="text-xs text-white/95 tracking-wide">
                <strong>Rajesh Sharma</strong>, <span className="opacity-75">Lead Architect — PixelStream Studio</span>
              </div>
            </div>

            {/* Bottom - Metrics Card */}
            <div className="relative rounded-2xl bg-black overflow-hidden border border-white/5 flex flex-col justify-between items-center p-6 min-h-[190px]">
              {/* Background Video */}
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45 pointer-events-none" />

              <div className="h-4" /> {/* Spacer */}
              
              <div className="relative z-10 text-center">
                <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-light tracking-tight text-white drop-shadow-[0_4px_12px_rgba(255,255,255,0.15)] leading-none select-none">
                  10K+
                </h3>
              </div>

              <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/85 mt-2">
                Happy Customers Served
              </span>
            </div>
          </div>

          {/* Column 3 - Software & Reach */}
          <div className="grid grid-rows-[1fr_auto] gap-4 md:gap-5">
            {/* Top - Daily Software / Tech stack Card */}
            <div className="relative rounded-2xl bg-black overflow-hidden border border-white/5 p-6 flex flex-col justify-between min-h-[220px]">
              {/* Background Video */}
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />

              {/* Label */}
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
                <span className="uppercase tracking-[0.22em] text-[11px] font-bold text-white/70">
                  Hardware & Brands
                </span>
                <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
              </div>

              {/* Scrolling Marquees container */}
              <div className="relative z-10 space-y-4 w-full overflow-hidden py-4 select-none">
                {/* Row 1: Left scrolling */}
                <div className="flex overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                  <div className="flex gap-4 animate-marquee-left shrink-0">
                    {[...ROW1_ICONS, ...ROW1_ICONS].map((Icon, idx) => (
                      <div
                        key={idx}
                        className="h-14 w-14 md:h-16 md:w-16 rounded-xl liquid-glass flex items-center justify-center shrink-0 border border-white/5"
                      >
                        <Icon className="h-6 w-6 text-white/80" strokeWidth={1.5} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2: Right scrolling */}
                <div className="flex overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                  <div className="flex gap-4 animate-marquee-right shrink-0">
                    {[...ROW2_ICONS, ...ROW2_ICONS].map((Icon, idx) => (
                      <div
                        key={idx}
                        className="h-14 w-14 md:h-16 md:w-16 rounded-xl liquid-glass flex items-center justify-center shrink-0 border border-white/5"
                      >
                        <Icon className="h-6 w-6 text-white/80" strokeWidth={1.5} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="h-2" /> {/* Spacer */}
            </div>

            {/* Bottom - Reach Us Card */}
            <div className="relative rounded-2xl bg-[#324444] border border-white/5 p-6 flex flex-col justify-between gap-5 overflow-hidden noise-overlay min-h-[170px]">
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-2">
                  <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
                  <span className="uppercase tracking-[0.22em] text-[11px] font-bold text-white/70">
                    Reach Us
                  </span>
                </div>

                <a
                  href="mailto:info@ganpaticomputers.com"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/15 flex items-center justify-center text-white transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <ArrowUpRight className="h-4.5 w-4.5" strokeWidth={1.5} />
                </a>
              </div>

              <div className="space-y-1 pt-4">
                <div className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Email Address</div>
                <a
                  href="mailto:info@ganpaticomputers.com"
                  className="text-lg font-semibold text-white hover:underline block"
                >
                  info@ganpaticomputers.com
                </a>
              </div>

              <div className="space-y-1">
                <div className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Phone Helpline</div>
                <a
                  href="tel:+919876543210"
                  className="text-sm font-semibold text-white/90 hover:underline block"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

        </div>
      </motion.main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
