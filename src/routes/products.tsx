import { createFileRoute, Link } from "@tanstack/react-router";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Search, SlidersHorizontal, ShoppingCart, Info } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 100, damping: 14 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 100, damping: 14 });

  const sheenX = useMotionValue(0);
  const sheenY = useMotionValue(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
    sheenX.set(e.clientX - r.left);
    sheenY.set(e.clientY - r.top);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const spotlight = useTransform(
    [sheenX, sheenY],
    ([sx, sy]) => `radial-gradient(250px circle at ${sx}px ${sy}px, rgba(0,0,0,0.025), transparent 75%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover="hover"
      initial="initial"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(6px)" }} className="h-full w-full flex flex-col">
        {children}
      </div>

      {/* Mouse tracking spotlight highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlight }}
      />
    </motion.div>
  );
}
import { z } from "zod";
import { toast } from "sonner";

// Define search query schema for TanStack Router
const productSearchSchema = z.object({
  category: z.string().catch("").optional(),
  search: z.string().catch("").optional(),
});

interface Product {
  id: string;
  name: string;
  category: "Laptops" | "Desktops" | "Accessories" | "Components";
  price: number;
  description: string;
  specs: string[];
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "lap-1",
    name: "AeroPro Ultrabook 14\"",
    category: "Laptops",
    price: 1199,
    description: "Premium magnesium alloy chassis with a stunning OLED display. Designed for professionals and students on the go.",
    specs: ["Intel Core Ultra 7", "16GB LPDDR5X RAM", "512GB NVMe SSD", "14\" 2.8K 120Hz OLED"],
    image: "https://images.unsplash.com/photo-1496181130204-755241544e35?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "pc-1",
    name: "Vanguard Gaming PC",
    category: "Desktops",
    price: 1899,
    description: "Custom pre-built gaming powerhouse equipped with top-tier cooling and components to dominate any AAA game.",
    specs: ["AMD Ryzen 7 7800X3D", "RTX 4070 Ti Super 16GB", "32GB DDR5 RAM", "2TB NVMe Gen4 SSD"],
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "mon-1",
    name: "Apex 27\" QHD Gaming Monitor",
    category: "Accessories",
    price: 349,
    description: "Ultra-fast IPS panel with accurate colors and extreme refresh rate for butter-smooth visual gameplay.",
    specs: ["27\" QHD (2560x1440)", "180Hz Refresh Rate", "1ms Response Time", "HDR400 & G-Sync Comp."],
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "gpu-1",
    name: "NVIDIA RTX 4080 Super GPU",
    category: "Components",
    price: 1099,
    description: "Unleash ray-traced, AI-accelerated gaming and rendering capabilities. Massive cooling fins with triple silent fans.",
    specs: ["16GB GDDR6X VRAM", "Ada Lovelace Architecture", "DLSS 3.0 Support", "PCIe 4.0 Interface"],
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "key-1",
    name: "G-Pro Mechanical Keyboard",
    category: "Accessories",
    price: 129,
    description: "Hot-swappable linear mechanical switches with double-shot PBT keycaps and full custom RGB backlighting.",
    specs: ["Linear Yellow Switches", "Hot-Swappable PCB", "Premium Coiled Cable", "Aluminum Top Plate"],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "mouse-1",
    name: "ErgoWave Wireless Mouse",
    category: "Accessories",
    price: 99,
    description: "Ergonomically contoured wireless precision mouse featuring silent click mechanisms and high-precision tracking.",
    specs: ["8,000 DPI Sensor", "Ergonomic Contour", "Dual Bluetooth & 2.4G", "70-Day Rechargeable Bat."],
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cpu-1",
    name: "AMD Ryzen 9 7900X CPU",
    category: "Components",
    price: 389,
    description: "Next-gen desktop computing processor designed for heavy editing, game hosting, and software compilation.",
    specs: ["12 Cores / 24 Threads", "4.7GHz Base / 5.6GHz Boost", "AM5 Socket Design", "170W TDP Output"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "ssd-1",
    name: "Crucial T500 2TB NVMe SSD",
    category: "Components",
    price: 159,
    description: "Extremely fast PCIe Gen4 SSD. Load games in milliseconds and transfer huge 4K render videos in seconds.",
    specs: ["2TB Storage Capacity", "Up to 7400MB/s Reads", "Up to 7000MB/s Writes", "Includes Premium Heatsink"],
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
  },
];

const CATEGORIES = ["All", "Laptops", "Desktops", "Components", "Accessories"] as const;

export const Route = createFileRoute("/products")({
  validateSearch: productSearchSchema,
  head: () => ({ meta: [{ title: "Products — Ganpati Computers" }] }),
  component: ProductsPage,
});

function ProductsPage() {
  const searchParams = Route.useSearch();
  
  // State initialization based on URL search query parameters
  const [searchQuery, setSearchQuery] = useState(searchParams.search || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.category || "All");
  const [sortBy, setSortBy] = useState<string>("default");

  // Handle Enquiry click
  const handleEnquire = (productName: string) => {
    toast.success(`Enquiry request sent for ${productName}! Our team will contact you soon.`, {
      description: "Feel free to also call us directly for faster service.",
      duration: 5000,
    });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.specs.some((spec) => spec.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen pt-1.5 px-3 pb-3 md:pt-2 md:px-6 md:pb-6 lg:min-h-screen lg:pt-2 lg:px-6 lg:pb-6"
    >
      <Background />
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1400px] flex-col rounded-[28px] bg-white/70 backdrop-blur-xl shadow-glass ring-1 ring-white/60 md:rounded-[32px] p-1 md:p-2">
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
              Our Products
            </h1>
            <p className="mt-2 text-sm md:text-base text-ink-soft max-w-2xl">
              Explore high-performance machines, top-tier components, and premium peripherals. Select any item to enquire about availability and custom builds.
            </p>
          </div>

          {/* Filters and Search Bar Row */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8 pb-6 border-b border-black/5">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search laptop, GPU, DDR5..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-full border border-black/10 bg-white/50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/30 transition-all"
              />
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-3 self-start lg:self-auto">
              <SlidersHorizontal className="h-4 w-4 text-ink-soft" />
              <span className="text-sm font-medium text-ink-soft">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3 pr-8 rounded-full border border-black/10 bg-white/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black/5 transition-all cursor-pointer"
              >
                <option value="default">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`h-9 px-5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "bg-white/50 text-ink-soft border border-black/5 hover:border-black/20 hover:bg-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <TiltCard
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-black/5 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  {/* Image wrapper */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Glassmorphic diagonal lens flare sweep */}
                    <motion.div
                      variants={{
                        initial: { x: "-100%" },
                        hover: { x: "100%" }
                      }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none z-10"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black border border-black/5">
                      {product.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-grow flex-col p-5">
                    <h3 className="font-display text-lg font-bold text-ink tracking-tight group-hover:text-black">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-xs text-ink-soft line-clamp-2 leading-relaxed flex-grow">
                      {product.description}
                    </p>

                    {/* Specs Tags */}
                    <div className="mt-4 flex flex-wrap gap-1">
                      {product.specs.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="rounded-md bg-lightgray px-2 py-0.5 text-[10px] font-medium text-ink-soft"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-black/5">
                      <span className="text-xl font-extrabold text-ink">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleEnquire(product.name)}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full bg-black px-4 text-xs font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95 cursor-pointer"
                      >
                        <ShoppingCart className="h-3 w-3" />
                        Enquire
                      </button>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          ) : (
            /* No Results State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-lightgray mb-4 text-ink-soft">
                <Info className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-ink">No products found</h3>
              <p className="mt-1 text-sm text-ink-soft max-w-xs">
                We couldn't find any products matching your search terms. Try selecting a different category or clearing filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-xs font-semibold underline text-ink hover:text-black cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </motion.main>
  );
}
