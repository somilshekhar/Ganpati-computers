import { Link } from "@tanstack/react-router";
import { Moon } from "lucide-react";
import logo from "@/assets/ChatGPT Image May 30, 2026, 01_13_25 AM.png";

export function Footer() {
  return (
    <footer className="w-full bg-[#0E0E0E] text-white pt-16 pb-6 px-6 md:px-12 mt-16 rounded-t-[28px] rounded-b-none md:rounded-t-[32px] md:rounded-b-[28px] overflow-hidden relative border border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
        {/* Left Column: Brand description */}
        <div className="md:col-span-5 flex flex-col gap-4">
          {/* Logo icon */}
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
          <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mt-2">
            Ganpati Computers is the technology you've been searching for. Premium laptops, pre-built custom gaming rigs, components, and reliable repair services.
          </p>
        </div>

        {/* Right Columns: Links */}
        <div className="md:col-span-7 grid grid-cols-3 gap-6">
          {/* Column 1: Useful */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Useful
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <Link to="/products" className="hover:text-white transition-colors cursor-pointer">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors cursor-pointer">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors cursor-pointer">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Legal
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <a href="#" className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors cursor-pointer">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors cursor-pointer">
                  Warranty Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Updates */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Updates
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Part: Giant Text with Copyright & Moon Icon */}
      <div className="relative w-full overflow-hidden mt-10 select-none">
        <div className="flex items-end justify-between w-full">
          {/* Moon Icon / Theme Toggle Indicator on bottom left */}
          <div className="mb-2 md:mb-6 z-20">
            <button className="grid h-10 w-10 place-items-center rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer">
              <Moon className="h-4 w-4" />
            </button>
          </div>

          {/* Giant text wrapper */}
          <div className="flex items-baseline gap-2 md:gap-4 -mb-4 sm:-mb-8 md:-mb-12">
            <h1 
              className="text-[10vw] font-black uppercase tracking-tighter leading-none text-[#ececec]/10"
              style={{ letterSpacing: "-0.04em" }}
            >
              Ganpati
            </h1>
            <span className="text-[#ececec]/15 text-[5vw] font-light leading-none">
              ©
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
