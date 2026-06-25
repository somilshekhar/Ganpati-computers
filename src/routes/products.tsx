import { createFileRoute, Link } from "@tanstack/react-router";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight, Search, SlidersHorizontal, ShoppingCart, Info, X, ChevronLeft, ChevronRight, ChevronUp, Share2, Home, Heart, User, Sparkle } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

function TiltCard({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
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
      onClick={onClick}
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

import { getDbProducts } from "../lib/api/products.functions";

// Define search query schema for TanStack Router
const productSearchSchema = z.object({
  category: z.string().catch("").optional(),
  search: z.string().catch("").optional(),
});

export interface Product {
  id: string;
  name: string;
  category: "Laptops" | "Desktops" | "Accessories" | "Components";
  price: number;
  description: string;
  specs: string[];
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "lap-1",
    name: "AeroPro Ultrabook 14\"",
    category: "Laptops",
    price: 95920,
    description: "Premium magnesium alloy chassis with a stunning OLED display. Designed for professionals and students on the go.",
    specs: ["Intel Core Ultra 7", "16GB LPDDR5X RAM", "512GB NVMe SSD", "14\" 2.8K 120Hz OLED"],
    image: "https://images.unsplash.com/photo-1496181130204-755241544e35?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "pc-1",
    name: "Vanguard Gaming PC",
    category: "Desktops",
    price: 151920,
    description: "Custom pre-built gaming powerhouse equipped with top-tier cooling and components to dominate any AAA game.",
    specs: ["AMD Ryzen 7 7800X3D", "RTX 4070 Ti Super 16GB", "32GB DDR5 RAM", "2TB NVMe Gen4 SSD"],
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "mon-1",
    name: "Apex 27\" QHD Gaming Monitor",
    category: "Accessories",
    price: 27920,
    description: "Ultra-fast IPS panel with accurate colors and extreme refresh rate for butter-smooth visual gameplay.",
    specs: ["27\" QHD (2560x1440)", "180Hz Refresh Rate", "1ms Response Time", "HDR400 & G-Sync Comp."],
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "gpu-1",
    name: "NVIDIA RTX 4080 Super GPU",
    category: "Components",
    price: 87920,
    description: "Unleash ray-traced, AI-accelerated gaming and rendering capabilities. Massive cooling fins with triple silent fans.",
    specs: ["16GB GDDR6X VRAM", "Ada Lovelace Architecture", "DLSS 3.0 Support", "PCIe 4.0 Interface"],
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "key-1",
    name: "G-Pro Mechanical Keyboard",
    category: "Accessories",
    price: 10320,
    description: "Hot-swappable linear mechanical switches with double-shot PBT keycaps and full custom RGB backlighting.",
    specs: ["Linear Yellow Switches", "Hot-Swappable PCB", "Premium Coiled Cable", "Aluminum Top Plate"],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "mouse-1",
    name: "ErgoWave Wireless Mouse",
    category: "Accessories",
    price: 7920,
    description: "Ergonomically contoured wireless precision mouse featuring silent click mechanisms and high-precision tracking.",
    specs: ["8,000 DPI Sensor", "Ergonomic Contour", "Dual Bluetooth & 2.4G", "70-Day Rechargeable Bat."],
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cpu-1",
    name: "AMD Ryzen 9 7900X CPU",
    category: "Components",
    price: 31120,
    description: "Next-gen desktop computing processor designed for heavy editing, game hosting, and software compilation.",
    specs: ["12 Cores / 24 Threads", "4.7GHz Base / 5.6GHz Boost", "AM5 Socket Design", "170W TDP Output"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "ssd-1",
    name: "Crucial T500 2TB NVMe SSD",
    category: "Components",
    price: 12720,
    description: "Extremely fast PCIe Gen4 SSD. Load games in milliseconds and transfer huge 4K render videos in seconds.",
    specs: ["2TB Storage Capacity", "Up to 7400MB/s Reads", "Up to 7000MB/s Writes", "Includes Premium Heatsink"],
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
  },
];

export const SPEC_LABELS: Record<string, string[]> = {
  Laptops: ["Processor", "Memory & Speed", "Storage Capacity", "Display Tech"],
  Desktops: ["Processor CPU", "Graphics GPU", "Memory RAM", "Storage NVMe"],
  Components: ["VRAM / Memory", "Architecture", "Technology", "Interface Type"],
  Accessories: ["Display Panel / Switches", "Refresh Rate / Design", "Response / Connectivity", "Features / Ergonomics"],
};

export const GALLERY_IMAGES: Record<string, string[]> = {
  Laptops: [
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496181130204-755241544e35?w=400&auto=format&fit=crop&q=80",
  ],
  Desktops: [
    "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400&auto=format&fit=crop&q=80",
  ],
  Components: [
    "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80",
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1625842268584-8f3290447001?w=400&auto=format&fit=crop&q=80",
  ],
};

const SWATCHES = [
  { name: "SG", color: "#4A5568", label: "Space Gray" },
  { name: "LP", color: "#3D3D3F", label: "Lilac Purple" },
  { name: "LG", color: "#2C2C2E", label: "Lime Green" },
  { name: "PS", color: "#E2E8F0", label: "Platinum Silver" },
  { name: "OB", color: "#1A202C", label: "Obsidian Black" },
];

const gridVariants: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const CATEGORIES = ["All", "Laptops", "Desktops", "Components", "Accessories"] as const;

export const formatPrice = (inrPrice: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inrPrice);
};

export const Route = createFileRoute("/products")({
  validateSearch: productSearchSchema,
  head: () => ({
    meta: [
      { title: "Products — Ganpati Computers" },
      { name: "description", content: "Browse our premium selection of high-performance custom laptops, custom gaming desktops, hardware components, and accessories." }
    ]
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();
  
  // State initialization based on URL search query parameters
  const [searchQuery, setSearchQuery] = useState(searchParams.search || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.category || "All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("Space Gray");

  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await getDbProducts();
        if (res.status === "success") {
          if (res.products && Array.isArray(res.products)) {
            setProductsList(res.products);
            localStorage.setItem("ganpati_products", JSON.stringify(res.products));
            return;
          } else {
            // KV is active but empty, initialize with defaults
            setProductsList(PRODUCTS);
            localStorage.setItem("ganpati_products", JSON.stringify(PRODUCTS));
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load products from Vercel KV database, falling back to local storage:", err);
      }

      // Fallback path:
      const stored = localStorage.getItem("ganpati_products");
      if (stored) {
        try {
          setProductsList(JSON.parse(stored));
        } catch (e) {
          setProductsList(PRODUCTS);
        }
      } else {
        localStorage.setItem("ganpati_products", JSON.stringify(PRODUCTS));
        setProductsList(PRODUCTS);
      }
    }

    loadProducts();
  }, []);

  // Reset modal helpers on product selection
  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(selectedProduct.image);
      setSelectedColor("Space Gray");
    }
  }, [selectedProduct]);

  // Keep React states in sync if URL query parameters change (e.g. back/forward navigation)
  useEffect(() => {
    setSearchQuery(searchParams.search || "");
  }, [searchParams.search]);

  useEffect(() => {
    setSelectedCategory(searchParams.category || "All");
  }, [searchParams.category]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    navigate({
      search: (old) => ({ ...old, search: val || undefined }),
      replace: true,
    });
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    navigate({
      search: (old) => ({ ...old, category: cat === "All" ? undefined : cat }),
      replace: true,
    });
  };

  // Handle Enquiry click
  const handleEnquire = (productName: string) => {
    const message = `Hello Ganpati Computers, I want to enquire about: ${productName}.`;
    const whatsappUrl = `https://wa.me/919571449865?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...productsList];

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
  }, [productsList, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="relative min-h-screen bg-background text-foreground dark:bg-[#0a0a0a] dark:text-white flex flex-col font-sans antialiased overflow-x-hidden selection:bg-white/10 selection:text-white">
      {/* Website Navbar */}
      <Navbar />

      {/* Main Section */}
      <motion.main
        initial="hidden"
        animate="show"
        variants={gridVariants}
        className="flex-grow px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 md:py-10 max-w-[1400px] mx-auto w-full flex flex-col gap-6"
      >
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Back
            </Link>
          </div>

          {/* Promotional Curved Banner */}
          <div className="relative overflow-hidden rounded-[24px] bg-[#1c1c1f] p-6 md:p-8 mb-8 border border-white/5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 min-h-[180px] noise-overlay">
            {/* Background Video */}
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none" />

            <div className="relative z-10 flex-grow space-y-3 text-left">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#3D3D3F] bg-[#3D3D3F]/10 px-2.5 py-1 rounded-full border border-[#3D3D3F]/20">
                <Sparkle className="h-2.5 w-2.5 animate-pulse" />
                Summer Offer
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none">
                35% OFF <br className="hidden md:inline" />on custom rigs today
              </h2>
              <p className="text-[10px] text-zinc-400 max-w-sm">
                Get high-performance custom setups built by core engineers, including complete peripheral compatibility and standard warranty packages.
              </p>
              <button
                onClick={() => handleEnquire("Custom Rig Upgrade Package")}
                className="inline-flex h-8.5 items-center justify-center rounded-full bg-white px-5 text-[10px] font-bold uppercase tracking-wider text-black transition-all hover:bg-zinc-200 active:scale-95 cursor-pointer mt-1"
              >
                Enquire Now
              </button>
            </div>
            
            {/* 3D Floating Rig Mockup Image */}
            <motion.div
              initial={{ y: 8 }}
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-48 h-36 flex items-center justify-center pointer-events-none z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400&auto=format&fit=crop&q=80"
                alt="Floating premium desktop rig representation"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(178,135,255,0.35)] rounded-xl"
              />
            </motion.div>
          </div>

          {/* Filters and Search Bar Row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search products, GPUs, custom builds..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-full border border-zinc-200 dark:border-white/5 bg-white/5 text-sm placeholder:text-zinc-500 text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all"
              />
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <SlidersHorizontal className="h-4 w-4 text-zinc-400" strokeWidth={2} />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3 pr-8 rounded-full border border-zinc-200 dark:border-white/5 bg-background dark:bg-[#121214] text-xs font-bold uppercase tracking-wider text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-white/10 transition-all cursor-pointer"
              >
                <option value="default" className="bg-background dark:bg-[#0a0a0a] text-foreground dark:text-white">Popularity</option>
                <option value="price-asc" className="bg-background dark:bg-[#0a0a0a] text-foreground dark:text-white">Price: Low-High</option>
                <option value="price-desc" className="bg-background dark:bg-[#0a0a0a] text-foreground dark:text-white">Price: High-Low</option>
              </select>
            </div>
          </div>

          {/* Category horizontal scrollable chips */}
          <div className="flex overflow-x-auto gap-2 pb-6 no-scrollbar -mx-4 px-4 scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`h-9 px-5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border shrink-0 ${
                    isActive
                      ? "bg-[#3D3D3F] text-black border-[#3D3D3F] shadow-md"
                      : "bg-white/5 text-zinc-400 border-white/5 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold tracking-tight text-foreground uppercase flex items-center gap-2">
              <Sparkle className="h-4 w-4 text-[#3D3D3F]" />
              {selectedCategory === "All" ? "New Arrivals" : selectedCategory}
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              {filteredProducts.length} Items
            </span>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div 
              variants={gridVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={cardVariants}>
                  <TiltCard
                    className="group flex flex-col overflow-hidden rounded-[24px] bg-zinc-900/40 border border-white/5 shadow-sm transition-all duration-300 hover:border-white/10 hover:shadow-lg cursor-pointer relative"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Image wrapper */}
                    <div className="relative aspect-square w-full overflow-hidden bg-zinc-950/60 p-4 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Floating circular shop/enquire CTA */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnquire(product.name);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer z-10"
                        title="Enquire on WhatsApp"
                      >
                        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.389 9.805-9.788.002-2.615-1.01-5.074-2.853-6.918C16.381 2.054 13.918.992 11.31.991 5.9.991 1.5 5.382 1.496 10.78c-.001 1.534.398 3.033 1.155 4.35l-.26 1.56-.251 1.503 1.54-.404 1.488-.391c1.295.772 2.766 1.176 4.139 1.176z" />
                        </svg>
                      </button>
                      
                      {/* Glassmorphic sweep reflection */}
                      <motion.div
                        variants={{
                          initial: { x: "-100%" },
                          hover: { x: "100%" }
                        }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none z-10"
                      />
                    </div>

                    {/* Body Content */}
                    <div className="flex flex-col p-3.5 pt-3">
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">
                        {product.category}
                      </span>
                      <h3 className="font-sans text-xs font-semibold text-white/90 leading-tight line-clamp-1 group-hover:text-white transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-sm font-bold text-foreground/90 font-mono mt-1">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* No Results State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white/5 mb-4 text-zinc-400">
                <Info className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">No products found</h3>
              <p className="mt-1 text-sm text-zinc-400 max-w-xs">
                We couldn't find any products matching your search terms. Try selecting a different category or clearing filters.
              </p>
              <button
                onClick={() => {
                  handleSearchChange("");
                  handleCategoryChange("All");
                }}
                className="mt-4 text-xs font-semibold underline text-zinc-300 hover:text-white cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </motion.main>

      <Footer />

      {/* Product Details Modal / Drawer Layout */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 select-none">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Body: Responsive grid card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] rounded-none md:rounded-3xl border border-zinc-200 dark:border-white/10 bg-background dark:bg-[#121214] text-foreground dark:text-white shadow-[0_24px_100px_rgba(0,0,0,0.8)] overflow-y-auto md:overflow-hidden z-10 flex flex-col md:grid md:grid-cols-12"
            >
              {/* Left Column: Visuals (Col span 5) */}
              <div className="md:col-span-5 flex flex-col bg-zinc-50 dark:bg-zinc-950 p-6 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/10 relative justify-between">
                
                {/* Header Actions for Mobile: back button, share button */}
                <div className="absolute top-4 left-4 right-4 z-10 flex md:hidden items-center justify-between">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-foreground dark:text-white backdrop-blur-md"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      toast.success("Details link copied!");
                      navigator.clipboard.writeText(`${window.location.origin}/products?search=${encodeURIComponent(selectedProduct.name)}`);
                    }}
                    className="w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-foreground dark:text-white backdrop-blur-md"
                  >
                    <Share2 className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Main Image View */}
                <div className="flex-grow min-h-[180px] md:min-h-[280px] max-h-[240px] md:max-h-[380px] flex items-center justify-center relative py-6">
                  <img
                    src={activeImage || selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md transition-all duration-300"
                  />
                </div>

                {/* Gallery Grid */}
                <div className="mt-4 space-y-2">
                  <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                    Product Gallery
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {(GALLERY_IMAGES[selectedProduct.category] || []).map((imgUrl, i) => {
                      const isSelected = activeImage === imgUrl;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveImage(imgUrl)}
                          className={`aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border transition-all cursor-pointer ${isSelected ? "border-[#3D3D3F] dark:border-white ring-2 ring-[#3D3D3F]/20 dark:ring-white/20" : "border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20"}`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Gallery thumbnail ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Details & Specs (Col span 7) */}
              <div className="md:col-span-7 flex flex-col p-6 md:p-8 justify-between md:overflow-y-auto md:max-h-[90vh]">
                
                {/* Header Actions for Desktop */}
                <div className="hidden md:flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/5 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Product Specification
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        toast.success("Details link copied!");
                        navigator.clipboard.writeText(`${window.location.origin}/products?search=${encodeURIComponent(selectedProduct.name)}`);
                      }}
                      className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-foreground dark:text-white transition-all active:scale-95 cursor-pointer"
                      title="Share link"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-foreground dark:text-white transition-all active:scale-95 cursor-pointer"
                      title="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Details Body */}
                <div className="space-y-6 flex-grow pr-1">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3D3D3F] dark:text-[#E4E4E7] block bg-zinc-100 dark:bg-white/5 px-2.5 py-1 rounded w-fit border border-zinc-200 dark:border-white/5">
                      {selectedProduct.category}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground dark:text-white tracking-tight leading-tight">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans font-normal pt-1">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Tech Specs */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase block">
                      Technical Specs
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 dark:bg-[#1a1a1c]/60 p-4 rounded-2xl border border-zinc-200 dark:border-white/5 font-sans">
                      {selectedProduct.specs.map((spec, index) => {
                        const labels = SPEC_LABELS[selectedProduct.category] || ["Detail", "Specification", "System", "Performance"];
                        const label = labels[index] || `Spec ${index + 1}`;
                        return (
                          <div key={index} className="space-y-1">
                            <span className="text-[9px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block">
                              {label}
                            </span>
                            <p className="text-xs font-semibold text-foreground dark:text-white">
                              {spec}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Colors swatches */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase block">
                        COLORS
                      </span>
                      <span className="text-[10px] font-bold text-foreground/75 dark:text-zinc-300 font-mono">
                        — {selectedColor}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      {SWATCHES.map((swatch) => {
                        const isSelected = selectedColor === swatch.label;
                        return (
                          <div key={swatch.name} className="flex flex-col items-center gap-1 group/swatch">
                            <button
                              onClick={() => setSelectedColor(swatch.label)}
                              className={`w-8 h-8 rounded-full border flex items-center justify-center shadow-md relative transition-transform hover:scale-105 active:scale-95 cursor-pointer ${isSelected ? "border-[#3D3D3F] dark:border-white ring-2 ring-[#3D3D3F]/20 dark:ring-white/20" : "border-zinc-300 dark:border-white/15"}`}
                              style={{ backgroundColor: swatch.color }}
                              title={swatch.label}
                            >
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white mix-blend-difference" />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer Drawer pricing & actions */}
                <div className="pt-6 border-t border-zinc-200 dark:border-white/5 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Estimated Price</span>
                    <span className="text-2xl sm:text-3xl font-black text-foreground dark:text-white font-mono">
                      {formatPrice(selectedProduct.price)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleEnquire(selectedProduct.name);
                        setSelectedProduct(null);
                      }}
                      className="h-12 px-8 rounded-full bg-lilac-gradient hover:shadow-glow-lilac font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer"
                    >
                      Enquire Now
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="md:hidden h-12 px-6 rounded-full bg-zinc-100 dark:bg-white/5 text-foreground dark:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 flex items-center justify-center border border-zinc-200 dark:border-white/10"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
