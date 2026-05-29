"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ShutterLoader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Lock page scroll while shutter is down
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      // Restore scroll when shutter begins to open
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // Prevent SSR hydration mismatch in TanStack Start
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="shutter-loader"
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{
            type: "spring",
            stiffness: 45,
            damping: 13,
            mass: 0.9,
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden select-none bg-[#7fa075]"
        >
          {/* Top Shop Casing & Sage Green Wall */}
          <div className="flex flex-col items-center justify-center pt-10 pb-8 px-6 bg-[#7fa075]">
            {/* The Green Shop Signboard */}
            <div 
              className="w-full max-w-sm bg-[#183321] rounded border-4 border-[#d5bd88] py-4 px-6 text-center shadow-lg relative"
              style={{
                boxShadow: "0 8px 16px rgba(0,0,0,0.25), inset 0 0 10px rgba(0,0,0,0.3)"
              }}
            >
              {/* Inner gold frame line */}
              <div className="absolute inset-1 border border-[#d5bd88]/30 pointer-events-none" />
              
              <h1 
                className="text-white text-3xl sm:text-4xl font-extrabold uppercase tracking-widest"
                style={{ fontFamily: "Georgia, serif", textShadow: "1px 1px 2px rgba(0,0,0,0.6)" }}
              >
                Ganpati
              </h1>
              <h2 
                className="text-[#d5bd88] text-xs sm:text-sm font-bold uppercase tracking-[0.35em] mt-1"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Computers
              </h2>
            </div>
          </div>

          {/* Awning: Blue and White Stripes */}
          <div 
            className="h-10 w-full relative z-10 border-b border-[#183321]/20 shadow-md"
            style={{
              background: "repeating-linear-gradient(90deg, #2b509d 0px, #2b509d 32px, #ffffff 32px, #ffffff 64px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.18)"
            }}
          />

          {/* Corrugated Shutter Door */}
          <div 
            className="flex-grow w-full relative flex flex-col justify-between"
            style={{
              backgroundImage: "repeating-linear-gradient(to bottom, #ffffff 0px, #ffffff 20px, #f4f4f5 20px, #f4f4f5 22px, #e4e4e7 22px, #e4e4e7 24px)",
              boxShadow: "inset 0 10px 30px rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Center Status Plate */}
            <div className="flex-grow flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm border border-zinc-200/50 rounded-lg px-8 py-3 shadow-sm">
                <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.25em]">
                  Opening Store...
                </span>
              </div>
            </div>

            {/* Bottom pull bar/handle casing */}
            <div className="relative h-8 w-full bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 border-t border-zinc-300 flex items-center justify-center shadow-inner">
              {/* Grab handles */}
              <div className="flex gap-6">
                <div className="h-2 w-20 rounded-full bg-zinc-300 border border-zinc-200 shadow-inner" />
                <div className="h-2 w-20 rounded-full bg-zinc-300 border border-zinc-200 shadow-inner" />
              </div>
              {/* Lock slot in the center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-zinc-300 border border-zinc-200 flex items-center justify-center">
                <div className="h-2 w-0.5 bg-zinc-500 rounded-sm" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
