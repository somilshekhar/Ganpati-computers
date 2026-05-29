import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import NavHeader from "./ui/nav-header";
import logo from "@/assets/ChatGPT Image May 30, 2026, 01_13_25 AM.png";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-2 md:top-3 z-50 mx-3 md:mx-4 mt-2 md:mt-3 mb-3 md:mb-4 flex items-center justify-between gap-6 px-6 py-2 rounded-full border border-white/10 bg-[#121214]/60 backdrop-blur-xl shadow-sm ring-1 ring-white/5"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <img
          src={logo}
          alt="Ganpati Computers Logo"
          className="h-10 w-10 object-cover rounded-full shadow-md transition-transform group-hover:scale-105"
        />
        <span className="flex items-center gap-2">
          <span className="text-base font-extrabold tracking-tight text-white">Ganpati</span>
          <span className="h-3.5 w-[1px] bg-white/20" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Computers</span>
        </span>
      </Link>

      {/* Center nav (handles desktop sliding tabs & mobile hamburger menu) */}
      <NavHeader />

      {/* CTAs */}
      <div className="hidden md:flex items-center gap-3">
        <button
          type="button"
          className="hidden lg:inline-flex h-10 items-center rounded-full bg-white/10 text-white border border-white/10 px-5 text-xs font-semibold transition-all hover:bg-white/20"
        >
          Enquire Now
        </button>
        <a
          href="tel:+919876543210"
          className="hidden md:inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-xs font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-10px_rgba(255,255,255,0.15)]"
        >
          <Phone className="h-3.5 w-3.5" />
          Call Us
        </a>
      </div>
    </motion.nav>
  );
}
