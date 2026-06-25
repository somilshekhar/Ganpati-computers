import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowUpRight, Sparkle, Laptop, Monitor, Cpu, Server } from "lucide-react";

interface CategoryData {
  id: string;
  name: string;
  count: number;
  description: string;
  icon: typeof Laptop;
  video?: string;
  bgColor?: string;
  spanClass: string;
  label: string;
  image: string;
}

const CATEGORIES: CategoryData[] = [
  {
    id: "cat-laptops",
    name: "Laptops",
    count: 3,
    description: "Ultra-portable notebooks, workplace machines, and high-performance gaming rigs designed to take power on the go.",
    icon: Laptop,
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4",
    spanClass: "lg:col-span-2",
    label: "01 / PORTABLE SYSTEMS",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-desktops",
    name: "Desktops",
    count: 2,
    description: "Custom-configured gaming rigs, workstation setups, and heavy-duty computing towers built for extreme tasks.",
    icon: Server,
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4",
    spanClass: "lg:col-span-1",
    label: "02 / DESKTOP RIGS",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-components",
    name: "Components",
    count: 5,
    description: "High-speed RAM modules, M.2 NVMe SSDs, triple-fan cooling kits, and multi-core processors for customization.",
    icon: Cpu,
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4",
    spanClass: "lg:col-span-1",
    label: "03 / SILICON WORK",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    count: 4,
    description: "High-refresh QHD displays, mechanical keyboards, precision optical mice, and multi-channel sound headsets.",
    icon: Monitor,
    bgColor: "bg-[#324444] noise-overlay",
    spanClass: "lg:col-span-2",
    label: "04 / GEAR & PERIPHERALS",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
  },
];

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Browse Categories — Ganpati Computers" },
      { name: "description", content: "Explore custom gaming desktops, premium laptops, hardware components, and top-tier peripherals at Ganpati Computers." }
    ]
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground dark:bg-[#0a0a0a] dark:text-white flex flex-col font-sans antialiased overflow-x-hidden selection:bg-white/10 selection:text-white">
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
              Explore Our Product Classes
            </h1>
            <p className="text-sm md:text-[15px] leading-[1.6] text-foreground/60 max-w-2xl font-normal">
              Select a category to browse our inventory. Every component and machine configuration is fully customizable to meet your specific gaming, editing, or business needs.
            </p>
          </div>

          <Link
            to="/products"
            className="self-start md:self-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-white hover:text-black hover:bg-white transition-all duration-300 liquid-glass active:scale-95 cursor-pointer text-center flex items-center justify-center"
          >
            View All Products
          </Link>
        </div>

        {/* Bento Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 flex-grow">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to="/products"
                search={{ category: cat.name }}
                className={`group relative rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-between p-6 min-h-[300px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer ${cat.spanClass} ${cat.bgColor || "bg-black"}`}
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0 bg-black">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10 pointer-events-none" />
                  {cat.bgColor?.includes("noise-overlay") && (
                    <div className="absolute inset-0 bg-[#324444]/65 mix-blend-multiply noise-overlay pointer-events-none" />
                  )}
                </div>

                {/* Top Row: Label and spin-hover Arrow button */}
                <div className="relative z-10 flex justify-between items-start w-full">
                  <div className="flex items-center gap-2">
                    <Sparkle className="h-3 w-3 text-white/50 group-hover:text-[#3D3D3F] transition-colors" strokeWidth={1.5} />
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                      {cat.label}
                    </span>
                  </div>

                  <div className="h-9 w-9 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black border border-white/15 flex items-center justify-center text-white transition-all duration-300 active:scale-95">
                    <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Bottom Row: Text content */}
                <div className="relative z-10 space-y-2 mt-20 md:mt-24">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[#3D3D3F]" strokeWidth={2} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      {cat.count} Options Available
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white group-hover:text-[#3D3D3F] transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed max-w-md group-hover:text-zinc-300 transition-colors">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.main>

      {/* Website Footer */}
      <Footer />
    </div>
  );
}
