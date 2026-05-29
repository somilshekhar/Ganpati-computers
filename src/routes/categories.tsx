import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowUpRight, Laptop, Monitor, Cpu, Server } from "lucide-react";

interface CategoryData {
  id: string;
  name: string;
  count: number;
  description: string;
  icon: typeof Laptop;
  image: string;
}

const CATEGORIES: CategoryData[] = [
  {
    id: "cat-laptops",
    name: "Laptops",
    count: 3,
    description: "Ultra-portable notebooks, office laptops, and high-performance gaming rigs designed to take power on the go.",
    icon: Laptop,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-desktops",
    name: "Desktops",
    count: 2,
    description: "Custom-configured gaming PCs, robust workplace workstations, and heavy-duty computing towers.",
    icon: Server,
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-components",
    name: "Components",
    count: 5,
    description: "GPUs, high-speed RAM modules, M.2 SSDs, cooling kits, and multi-core processors for upgrade enthusiasts.",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    count: 4,
    description: "High-refresh monitors, sound-canceling headsets, mechanical keyboards, and precision optical mice.",
    icon: Monitor,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
  },
];

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Categories — Ganpati Computers" }] }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen p-0 md:pt-2 md:px-6 md:pb-6 lg:min-h-screen lg:pt-2 lg:px-6 lg:pb-6"
    >
      <Background />
      <div className="mx-auto flex min-h-screen md:min-h-[calc(100vh-1.5rem)] max-w-[1400px] flex-col rounded-none md:rounded-[32px] bg-white/70 backdrop-blur-xl shadow-glass ring-0 md:ring-1 ring-white/60 p-0 md:p-1 lg:p-2">
        <Navbar />

        <div className="flex-1 px-4 py-8 md:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink transition-colors group mb-4"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back home
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
              Shop by Category
            </h1>
            <p className="mt-2 text-sm md:text-base text-ink-soft max-w-2xl">
              Choose a product class to browse. All components and machines are fully customizable. Contact us if you need help designing your configuration.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to="/products"
                  search={{ category: cat.name }}
                  className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[24px] border border-black/5 p-6 sm:p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark gradient overlay for typography readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity group-hover:opacity-90" />
                  </div>

                  {/* Icon badge */}
                  <div className="absolute right-6 top-6 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 transition-all group-hover:bg-white group-hover:text-black">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Contents */}
                  <div className="relative z-10 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B287FF]">
                      {cat.count} Items Available
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mt-1 flex items-center gap-2">
                      {cat.name}
                      <ArrowUpRight className="h-5 w-5 opacity-0 transition-all -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md opacity-90 group-hover:text-white transition-colors">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </motion.main>
  );
}
