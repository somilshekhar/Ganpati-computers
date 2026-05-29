"use client"; 

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/ChatGPT Image May 30, 2026, 01_13_25 AM.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="relative ml-auto lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:ml-0 w-fit z-20">
      {/* Desktop view: Div-based layout with state-based text color tracking */}
      <div
        className="hidden lg:flex relative mx-auto w-fit rounded-full border border-black/10 bg-white/60 backdrop-blur-md p-1 shadow-sm ring-1 ring-white/40 items-center"
        onMouseLeave={() => {
          setPosition((pv) => ({ ...pv, opacity: 0 }));
          setHoveredTab(null);
        }}
      >
        {NAV.map((n) => (
          <Tab
            key={n.to}
            setPosition={setPosition}
            to={n.to}
            isHovered={hoveredTab === n.to}
            onMouseEnter={() => setHoveredTab(n.to)}
          >
            {n.label}
          </Tab>
        ))}
        <Cursor position={position} />
      </div>

      {/* Mobile view */}
      <div className="flex lg:hidden flex-col items-end">
        {/* Trigger button in the navbar (hidden when menu is open to prevent double layering) */}
        <div style={{ opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? "none" : "auto" }} className="transition-opacity duration-200">
          <HamburgerButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
        </div>
        
        {mounted && createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
                className="fixed inset-0 w-screen h-screen bg-white/95 backdrop-blur-3xl z-[100] flex flex-col justify-between p-6 sm:p-12 text-ink overflow-y-auto will-change-transform"
              >
                {/* Top Row: Logo branding & Close Button */}
                <div className="flex items-center justify-between w-full z-10">
                  <div className="flex items-center gap-3">
                    <img
                      src={logo}
                      alt="Ganpati Computers Logo"
                      className="h-10 w-10 object-cover rounded-full shadow-sm"
                    />
                    <div className="flex flex-col leading-none">
                      <span className="font-display font-extrabold text-sm tracking-tight text-ink uppercase">
                        Ganpati
                      </span>
                      <span className="font-display font-bold text-[10px] text-ink-soft uppercase tracking-widest mt-0.5">
                        Computers
                      </span>
                    </div>
                  </div>
                  {/* Close button at the same position in the portal */}
                  <HamburgerButton isOpen={true} toggle={() => setIsOpen(false)} />
                </div>

                {/* Main Nav Links */}
                <div className="flex-1 flex flex-col justify-center my-8 z-10">
                  <nav className="flex flex-col gap-6 sm:gap-8">
                    {NAV.map((n, index) => (
                      <motion.div
                        key={n.to}
                        variants={mobileItemVariants}
                        className="group flex items-baseline gap-4"
                      >
                        <span className="font-sans text-xs sm:text-sm font-bold opacity-30 select-none tracking-widest text-[#B287FF]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Link
                          to={n.to}
                          onClick={() => setIsOpen(false)}
                          className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-ink hover:text-[#9D6DFF] transition-colors duration-300 flex items-center gap-2"
                        >
                          {n.label}
                          <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#9D6DFF]" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Bottom Row: Contact & Address */}
                <motion.div
                  variants={bottomInfoVariants}
                  className="border-t border-black/10 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-ink-soft z-10"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Contact Details</span>
                    <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-ink transition-colors text-xs sm:text-sm font-semibold">
                      <Phone className="h-3.5 w-3.5 text-[#9D6DFF]" />
                      +91 98765 43210
                    </a>
                    <a href="mailto:info@ganpaticomputers.com" className="flex items-center gap-2 hover:text-ink transition-colors text-xs sm:text-sm font-semibold">
                      <Mail className="h-3.5 w-3.5 text-[#9D6DFF]" />
                      info@ganpaticomputers.com
                    </a>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Store Location</span>
                    <p className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                      <MapPin className="h-3.5 w-3.5 text-[#9D6DFF] shrink-0 mt-0.5" />
                      Ganpati Computers, Main Market Road,<br />Opposite Central Bank, City Center
                  </p>
                  </div>
                </motion.div>

                {/* Giant background watermark */}
                <div className="absolute right-0 bottom-0 pointer-events-none select-none text-[25vw] font-black uppercase tracking-tighter leading-none text-black/[0.015] -mb-8 -mr-8 z-0">
                  Ganpati
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </div>
  );
}

const Tab = ({
  children,
  setPosition,
  to,
  isHovered,
  onMouseEnter,
}: {
  children: React.ReactNode;
  setPosition: any;
  to: string;
  isHovered: boolean;
  onMouseEnter: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
        onMouseEnter();
      }}
      className={`relative z-10 block cursor-pointer text-xs uppercase transition-colors duration-200 ${
        isHovered ? "text-white" : "text-[#0E0E0E]"
      }`}
    >
      <Link
        to={to}
        className="block px-3 py-1 lg:px-3.5 lg:py-1.5 lg:text-xs font-semibold"
      >
        {children}
      </Link>
    </div>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.div
      animate={position}
      className="absolute z-0 h-5 lg:h-[28px] rounded-full bg-black top-[4px] lg:top-[2px]"
    />
  );
};

const HamburgerButton = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  return (
    <button
      onClick={toggle}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 active:scale-95 cursor-pointer z-[100] shadow-sm ${
        isOpen 
          ? "border-black/10 bg-black/5 text-ink hover:bg-black/10" 
          : "border-black/5 bg-white/70 text-ink backdrop-blur-md hover:bg-zinc-100"
      }`}
      aria-label="Toggle Menu"
    >
      <div className="relative flex h-3 w-4 flex-col justify-between items-center">
        <span
          className={`h-[1px] w-4 rounded bg-ink transition-transform duration-300 ${
            isOpen ? "translate-y-[5.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-[1px] w-4 rounded bg-ink transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`h-[1px] w-4 rounded bg-ink transition-transform duration-300 ${
            isOpen ? "-translate-y-[5.5px] -rotate-45" : ""
          }`}
        />
      </div>
    </button>
  );
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delayChildren: 0.15,
      staggerChildren: 0.08,
    },
  },
};

const mobileItemVariants = {
  closed: { opacity: 0, y: -20 },
  open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const bottomInfoVariants = {
  closed: { opacity: 0, y: 20 },
  open: { opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.4 } },
};

export default NavHeader;
