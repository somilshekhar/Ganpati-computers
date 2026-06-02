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
        className="hidden lg:flex relative mx-auto w-fit rounded-full border border-white/10 bg-black/30 backdrop-blur-md p-1 shadow-sm ring-1 ring-white/10 items-center"
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
              <>
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                />

                {/* Sliding Drawer Panel */}
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={mobileMenuVariants}
                  className="fixed inset-y-0 right-0 w-full sm:w-[420px] h-screen bg-[#121214]/95 backdrop-blur-3xl border-l border-white/10 shadow-2xl z-[100] flex flex-col justify-between p-6 sm:p-8 text-white overflow-y-auto will-change-transform"
                >
                  {/* Header Row: Logo & Close Button */}
                  <div className="flex items-center justify-between w-full border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={logo}
                        alt="Ganpati Computers Logo"
                        className="h-10 w-10 object-cover rounded-full shadow-sm"
                      />
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold tracking-tight text-white uppercase">Ganpati</span>
                      <span className="h-3.5 w-[1px] bg-white/20" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Computers</span>
                    </div>
                    </div>
                    {/* Close button */}
                    <HamburgerButton isOpen={true} toggle={() => setIsOpen(false)} />
                  </div>

                  {/* Nav Links with Descriptions */}
                  <div className="flex-1 flex flex-col justify-center py-8">
                    <nav className="flex flex-col gap-6">
                      {NAV.map((n, index) => {
                        const descriptions = {
                          "/": "Return to the main page and highlights",
                          "/products": "Browse laptops, desktop rigs, & components",
                          "/categories": "Shop by category and view inventory count",
                          "/about": "Learn about our warranty & core engineers",
                          "/contact": "Inquire about custom PCs or diagnostics",
                        };
                        const desc = descriptions[n.to] || "";

                        return (
                          <motion.div
                            key={n.to}
                            variants={mobileItemVariants}
                            className="group"
                          >
                            <Link
                              to={n.to}
                              onClick={() => setIsOpen(false)}
                              className="flex items-start gap-4 hover:translate-x-1 transition-transform duration-300"
                            >
                              <span className="font-sans text-xs font-bold tracking-widest text-[#3D3D3F] mt-1.5">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <div className="flex flex-col">
                                <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#3D3D3F] transition-colors duration-300">
                                  {n.label}
                                </span>
                                <span className="text-[11px] text-zinc-400 group-hover:text-zinc-300 transition-colors mt-0.5">
                                  {desc}
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Drawer Footer Actions and Contact Info */}
                  <motion.div
                    variants={bottomInfoVariants}
                    className="border-t border-white/5 pt-6 flex flex-col gap-6"
                  >
                    {/* Quick CTA */}
                    <a
                      href="tel:+919876543210"
                      className="w-full flex h-11 items-center justify-center gap-2 rounded-full bg-white text-ink text-xs font-bold uppercase transition-all hover:bg-zinc-200"
                    >
                      <Phone className="h-4 w-4 text-ink" />
                      Call Support
                    </a>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 gap-4 text-xs text-zinc-400">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Store Hours</span>
                        <p className="text-[11px] text-zinc-300">Mon - Sat: 10:00 AM - 8:00 PM | Sun: Closed</p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Contact Details</span>
                        <a href="mailto:info@ganpaticomputers.com" className="hover:text-white transition-colors text-[11px] text-zinc-300">
                          info@ganpaticomputers.com
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </>
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
        isHovered ? "text-black" : "text-zinc-400 hover:text-white"
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
      className="absolute z-0 h-5 lg:h-[28px] rounded-full bg-white top-[4px] lg:top-[2px]"
    />
  );
};

const HamburgerButton = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
  return (
    <button
      onClick={toggle}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 active:scale-95 cursor-pointer z-[100] shadow-sm ${
        isOpen 
          ? "border-white/10 bg-white/10 text-white hover:bg-white/20" 
          : "border-white/10 bg-black/40 text-white backdrop-blur-md hover:bg-white/10"
      }`}
      aria-label="Toggle Menu"
    >
      <div className="relative flex h-3 w-4 flex-col justify-between items-center">
        <span
          className={`h-[1px] w-4 rounded transition-transform duration-300 ${
            isOpen ? "translate-y-[5.5px] rotate-45 bg-white" : "bg-white"
          }`}
        />
        <span
          className={`h-[1px] w-4 rounded transition-opacity duration-300 ${
            isOpen ? "opacity-0 bg-white" : "opacity-100 bg-white"
          }`}
        />
        <span
          className={`h-[1px] w-4 rounded transition-transform duration-300 ${
            isOpen ? "-translate-y-[5.5px] -rotate-45 bg-white" : "bg-white"
          }`}
        />
      </div>
    </button>
  );
};

const mobileMenuVariants: any = {
  closed: {
    x: "100%",
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
      when: "afterChildren",
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  open: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delayChildren: 0.12,
      staggerChildren: 0.06,
    },
  },
};

const mobileItemVariants: any = {
  closed: { opacity: 0, x: 20, transition: { duration: 0.25, ease: "easeOut" } },
  open: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const bottomInfoVariants: any = {
  closed: { opacity: 0, y: 15 },
  open: { opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.4 } },
};

export default NavHeader;
