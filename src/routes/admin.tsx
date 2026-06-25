import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Background } from "@/components/Background";
import { 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Search, 
  SlidersHorizontal, 
  ArrowLeft, 
  Check, 
  X, 
  Image as ImageIcon,
  Cpu,
  Sparkle
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Product, PRODUCTS, SPEC_LABELS, GALLERY_IMAGES, formatPrice } from "./products";
import { getDbProducts, saveDbProducts } from "../lib/api/products.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Ganpati Computers" },
      { name: "description", content: "Management console for Ganpati Computers. Update inventory, product specifications, and pricing lists." }
    ]
  }),
  component: AdminPage,
});

function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "Laptops" as Product["category"],
    price: 0,
    description: "",
    spec1: "",
    spec2: "",
    spec3: "",
    spec4: "",
    image: "",
  });

  // Verify auth code
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123") {
      setIsAuthorized(true);
      toast.success("Welcome back, administrator!");
    } else {
      toast.error("Access Denied", {
        description: "Invalid passcode. Please try again.",
      });
      setPasscode("");
    }
  };

  // Load products list on auth success
  useEffect(() => {
    async function loadProducts() {
      if (!isAuthorized) return;
      try {
        const res = await getDbProducts();
        if (res.status === "success") {
          if (res.products && Array.isArray(res.products)) {
            setProductsList(res.products);
            localStorage.setItem("ganpati_products", JSON.stringify(res.products));
            return;
          } else {
            // Database is empty but KV is configured. Sync defaults to Vercel KV.
            setProductsList(PRODUCTS);
            localStorage.setItem("ganpati_products", JSON.stringify(PRODUCTS));
            await saveDbProducts({ data: PRODUCTS });
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
  }, [isAuthorized]);

  // Handle Form changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  // Image source tab selection (upload file vs URL text)
  const [imageSourceTab, setImageSourceTab] = useState<"upload" | "url">("upload");

  // Handle local image file upload & convert to base64 data url
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      toast.error("File is too large", {
        description: "Please upload an image smaller than 1MB to avoid browser storage capacity limits.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
        toast.success("Image processed and loaded!");
      }
    };
    reader.readAsDataURL(file);
  };

  // Open modal for adding
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setImageSourceTab("upload");
    setFormData({
      name: "",
      category: "Laptops",
      price: 79999,
      description: "",
      spec1: "",
      spec2: "",
      spec3: "",
      spec4: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setImageSourceTab(product.image.startsWith("data:") ? "upload" : "url");
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      spec1: product.specs[0] || "",
      spec2: product.specs[1] || "",
      spec3: product.specs[2] || "",
      spec4: product.specs[3] || "",
      image: product.image,
    });
    setIsModalOpen(true);
  };

  // Save / Update product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      toast.error("Required Fields Missing", { description: "Please enter product name and description." });
      return;
    }

    const updatedSpecs = [formData.spec1, formData.spec2, formData.spec3, formData.spec4].filter(Boolean);

    let nextList: Product[] = [];

    if (editingProduct) {
      // Edit existing product
      nextList = productsList.map((p) => 
        p.id === editingProduct.id 
          ? {
              ...p,
              name: formData.name,
              category: formData.category,
              price: formData.price,
              description: formData.description,
              specs: updatedSpecs,
              image: formData.image || "https://images.unsplash.com/photo-1496181130204-755241544e35?w=600&auto=format&fit=crop&q=80",
            }
          : p
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: `custom-${Date.now()}`,
        name: formData.name,
        category: formData.category,
        price: formData.price,
        description: formData.description,
        specs: updatedSpecs,
        image: formData.image || "https://images.unsplash.com/photo-1496181130204-755241544e35?w=600&auto=format&fit=crop&q=80",
      };
      nextList = [newProduct, ...productsList];
    }

    setProductsList(nextList);
    localStorage.setItem("ganpati_products", JSON.stringify(nextList));
    setIsModalOpen(false);

    // Call saveDbProducts(nextList) in the background with toast feedback
    const savePromise = saveDbProducts({ data: nextList });
    toast.promise(savePromise, {
      loading: "Saving database changes...",
      success: (res) => {
        if (res.status === "success") {
          return editingProduct ? "Product changes saved globally!" : "Product added globally!";
        } else if (res.status === "no-kv") {
          return "Saved locally (Vercel KV is not linked in Vercel project yet).";
        } else {
          return "Saved locally (Database sync failed).";
        }
      },
      error: "Error synchronizing database.",
    });
  };

  // Delete product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      const nextList = productsList.filter((p) => p.id !== id);
      setProductsList(nextList);
      localStorage.setItem("ganpati_products", JSON.stringify(nextList));
      
      const savePromise = saveDbProducts({ data: nextList });
      toast.promise(savePromise, {
        loading: `Deleting ${name}...`,
        success: (res) => {
          if (res.status === "success") {
            return `${name} deleted globally.`;
          } else if (res.status === "no-kv") {
            return `${name} deleted locally (Vercel KV not configured).`;
          } else {
            return `${name} deleted locally (Database sync failed).`;
          }
        },
        error: `Failed to sync deletion for ${name}.`,
      });
    }
  };

  // Reset inventory to default
  const handleResetToDefaults = async () => {
    if (confirm("Are you sure you want to reset all products to default? This will clear custom products.")) {
      setProductsList(PRODUCTS);
      localStorage.setItem("ganpati_products", JSON.stringify(PRODUCTS));
      
      const savePromise = saveDbProducts({ data: PRODUCTS });
      toast.promise(savePromise, {
        loading: "Restoring inventory to defaults...",
        success: (res) => {
          if (res.status === "success") {
            return "Inventory restored to defaults globally.";
          } else if (res.status === "no-kv") {
            return "Inventory restored to defaults locally.";
          } else {
            return "Inventory restored to defaults locally (Database sync failed).";
          }
        },
        error: "Failed to sync reset to remote database.",
      });
    }
  };

  // Filter products list
  const filteredProducts = useMemo(() => {
    let list = [...productsList];
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [productsList, searchQuery, selectedCategory]);

  // Categories metrics helper
  const metrics = useMemo(() => {
    const stats = { Total: productsList.length, Laptops: 0, Desktops: 0, Components: 0, Accessories: 0 };
    productsList.forEach((p) => {
      if (p.category === "Laptops") stats.Laptops++;
      else if (p.category === "Desktops") stats.Desktops++;
      else if (p.category === "Components") stats.Components++;
      else if (p.category === "Accessories") stats.Accessories++;
    });
    return stats;
  }, [productsList]);

  // Specs Labels mapping helpers
  const currentSpecLabels = SPEC_LABELS[formData.category] || ["Detail 1", "Detail 2", "Detail 3", "Detail 4"];

  // Standard preset Unsplash images for easy visual selection
  const imagePresets = GALLERY_IMAGES[formData.category] || [];

  return (
    <div className="relative min-h-screen bg-background text-foreground dark:bg-[#0a0a0a] dark:text-white flex flex-col font-sans antialiased overflow-x-hidden selection:bg-white/10 selection:text-white">
      <Background />
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col justify-between px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 md:py-10 max-w-[1400px] mx-auto w-full gap-8 relative z-10"
      >
        {!isAuthorized ? (
          /* Lock Screen Access Gate */
          <div className="flex-1 flex items-center justify-center py-16">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-[#121214]/60 backdrop-blur-xl p-8 shadow-xl text-center space-y-6"
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-foreground dark:text-white">
                <Lock className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold tracking-tight">Admin Authentication</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                  Please enter your passcode below to manage product catalogs and store pricing specifications.
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="space-y-1 text-left">
                  <label htmlFor="passcode" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block pl-1">
                    Authorization Code
                  </label>
                  <input
                    type="password"
                    id="passcode"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Code (Default: admin123)"
                    className="w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-foreground dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#3D3D3F] focus:border-[#3D3D3F] transition-all text-center tracking-widest font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-full bg-lilac-gradient hover:shadow-glow-lilac font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Verify Access
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          /* Authorized Dashboard Control Board */
          <div className="space-y-8 flex-grow">
            {/* Top Admin Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-white/5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-zinc-500">
                  <span className="text-[9px] font-bold tracking-widest uppercase">Ganpati Admin Portal</span>
                  <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[9px] font-bold tracking-widest text-[#25D366] uppercase">Active</span>
                </div>
                <h1 className="font-display text-[28px] sm:text-3xl md:text-4xl font-normal tracking-tight">
                  Inventory Controller
                </h1>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={handleResetToDefaults}
                  className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase border border-zinc-200 dark:border-white/10 text-foreground dark:text-zinc-300 bg-zinc-50 hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset to Defaults
                </button>

                <button
                  onClick={handleOpenAdd}
                  className="px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-lilac-gradient hover:shadow-glow-lilac transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Product
                </button>
              </div>
            </div>

            {/* Distributed Metrics Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
              {[
                { label: "Total items", val: metrics.Total, highlight: "bg-white/50 dark:bg-white/5" },
                { label: "Laptops", val: metrics.Laptops, highlight: "bg-white/50 dark:bg-white/5" },
                { label: "Desktops", val: metrics.Desktops, highlight: "bg-white/50 dark:bg-white/5" },
                { label: "Components", val: metrics.Components, highlight: "bg-white/50 dark:bg-white/5" },
                { label: "Accessories", val: metrics.Accessories, highlight: "bg-white/50 dark:bg-white/5" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border border-zinc-200 dark:border-white/5 p-4 flex flex-col justify-between shadow-sm min-h-[90px] ${item.highlight}`}
                >
                  <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{item.label}</span>
                  <span className="text-3xl font-black font-mono leading-none tracking-tight">{item.val}</span>
                </div>
              ))}
            </div>

            {/* Filter and Search Controls Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search products by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-full border border-zinc-200 dark:border-white/5 bg-white dark:bg-[#121214] text-xs focus:outline-none focus:ring-1 focus:ring-[#3D3D3F] focus:border-[#3D3D3F] transition-all"
                />
              </div>

              {/* Category selector chips */}
              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 select-none">
                {["All", "Laptops", "Desktops", "Components", "Accessories"].map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`h-9 px-4 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer whitespace-nowrap border shrink-0 ${
                        isActive
                          ? "bg-[#3D3D3F] text-white border-[#3D3D3F] dark:bg-white dark:text-black dark:border-white"
                          : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100 dark:bg-white/5 dark:text-zinc-400 dark:border-white/5 dark:hover:bg-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Control Table List */}
            <div className="rounded-2xl border border-zinc-200 dark:border-white/5 bg-white/30 dark:bg-white/5 backdrop-blur-md shadow-sm overflow-hidden overflow-x-auto">
              {filteredProducts.length > 0 ? (
                <table className="w-full border-collapse text-left text-xs sm:text-sm font-sans min-w-[700px]">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-white/5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 bg-zinc-50/50 dark:bg-white/5">
                      <th className="py-4 px-6 w-16">Preview</th>
                      <th className="py-4 px-6">Name</th>
                      <th className="py-4 px-6 w-32">Category</th>
                      <th className="py-4 px-6 w-48">Price (INR)</th>
                      <th className="py-4 px-6 w-24 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-white/5">
                    {filteredProducts.map((product) => (
                      <tr 
                        key={product.id} 
                        className="hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors font-medium text-foreground dark:text-zinc-200"
                      >
                        <td className="py-3 px-6">
                          <div className="h-10 w-10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 flex items-center justify-center p-1">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-bold text-foreground dark:text-white leading-tight">{product.name}</span>
                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 line-clamp-1 max-w-[280px] font-normal leading-normal">{product.description}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-3 px-6 font-mono font-bold text-foreground dark:text-white">{formatPrice(product.price)}</td>
                        <td className="py-3 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(product)}
                              className="h-8 w-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-all cursor-pointer"
                              title="Edit product"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id, product.name)}
                              className="h-8 w-8 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-zinc-50 dark:bg-white/5 mb-3 text-zinc-400">
                    <X className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold">No items found</h3>
                  <p className="mt-1 text-xs text-zinc-400 max-w-xs pl-4 pr-4">
                    Try adjusting your filters or search terms. If you don't have any items, reset to default listings.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.main>

      <Footer />

      {/* Add / Edit Form Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl border border-zinc-200 dark:border-white/10 bg-background dark:bg-[#121214] text-foreground dark:text-white shadow-2xl overflow-y-auto flex flex-col z-10 p-6 md:p-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/5 mb-6">
                <div className="flex items-center gap-2">
                  <Sparkle className="h-4.5 w-4.5 text-[#3D3D3F] dark:text-[#E4E4E7]" />
                  <h2 className="font-display text-lg sm:text-xl font-bold tracking-tight">
                    {editingProduct ? `Edit ${editingProduct.name}` : "Add New Product"}
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 flex items-center justify-center text-zinc-500 dark:text-zinc-400 transition-all cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSaveProduct} className="space-y-5 flex-grow font-sans">
                
                {/* Product Name & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                      Product Name <span className="text-[#3D3D3F]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g. AeroPro Ultrabook 14-inch"
                      className="w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-1 focus:ring-[#3D3D3F] focus:border-[#3D3D3F] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="category" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      className="w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#121214] text-sm focus:outline-none focus:ring-1 focus:ring-[#3D3D3F] transition-all cursor-pointer"
                    >
                      <option value="Laptops">Laptops</option>
                      <option value="Desktops">Desktops</option>
                      <option value="Components">Components</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>

                {/* Base Price (INR) & Description */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                  <div className="space-y-1.5">
                    <label htmlFor="price" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">
                      Price in INR <span className="text-[#3D3D3F]">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      required
                      min={0}
                      value={formData.price}
                      onChange={handleFormChange}
                      className="w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-1 focus:ring-[#3D3D3F] focus:border-[#3D3D3F] transition-all font-mono"
                    />
                    {/* Live Price Preview */}
                    <div className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono pl-1">
                      Preview: <span className="font-bold text-foreground dark:text-white">{formatPrice(formData.price)}</span>
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label htmlFor="description" className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                      Short Description <span className="text-[#3D3D3F]">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={2}
                      value={formData.description}
                      onChange={handleFormChange}
                      placeholder="e.g. Stunning magnesium alloy build featuring Ultra 7 processors..."
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-1 focus:ring-[#3D3D3F] focus:border-[#3D3D3F] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Specification Fields (Tailored dynamically to Category) */}
                <div className="space-y-3 pt-2">
                  <span className="text-[9px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase block">
                    Product Technical Specifications
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50/50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 p-4 rounded-2xl">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase block">
                        {currentSpecLabels[0] || "Detail 1"}
                      </label>
                      <input
                        type="text"
                        name="spec1"
                        value={formData.spec1}
                        onChange={handleFormChange}
                        placeholder={`e.g. ${formData.category === "Laptops" ? "Intel Core Ultra 7" : "32GB DDR5 RAM"}`}
                        className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3D3D3F] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase block">
                        {currentSpecLabels[1] || "Detail 2"}
                      </label>
                      <input
                        type="text"
                        name="spec2"
                        value={formData.spec2}
                        onChange={handleFormChange}
                        placeholder="Specification description..."
                        className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3D3D3F] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase block">
                        {currentSpecLabels[2] || "Detail 3"}
                      </label>
                      <input
                        type="text"
                        name="spec3"
                        value={formData.spec3}
                        onChange={handleFormChange}
                        placeholder="Specification description..."
                        className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3D3D3F] transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase block">
                        {currentSpecLabels[3] || "Detail 4"}
                      </label>
                      <input
                        type="text"
                        name="spec4"
                        value={formData.spec4}
                        onChange={handleFormChange}
                        placeholder="Specification description..."
                        className="w-full h-9 px-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3D3D3F] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Image upload / URL link options */}
                <div className="space-y-3">
                  <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">
                    Product Image
                  </label>
                  
                  {/* Tabs */}
                  <div className="flex gap-2 border-b border-zinc-200 dark:border-white/5 pb-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setImageSourceTab("upload")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                        imageSourceTab === "upload"
                          ? "bg-zinc-100 text-foreground dark:bg-white/10 dark:text-white border border-zinc-200 dark:border-white/10"
                          : "text-zinc-400 dark:text-zinc-500 hover:text-foreground dark:hover:text-white"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSourceTab("url")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                        imageSourceTab === "url"
                          ? "bg-zinc-100 text-foreground dark:bg-white/10 dark:text-white border border-zinc-200 dark:border-white/10"
                          : "text-zinc-400 dark:text-zinc-500 hover:text-foreground dark:hover:text-white"
                      }`}
                    >
                      External Link / Presets
                    </button>
                  </div>

                  {/* Tab content 1: Upload */}
                  {imageSourceTab === "upload" ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        {/* Preview */}
                        <div className="h-20 w-20 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 flex items-center justify-center p-2 relative overflow-hidden shrink-0">
                          {formData.image ? (
                            <img
                              src={formData.image}
                              alt="Upload preview"
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-zinc-400" />
                          )}
                        </div>

                        {/* File input */}
                        <div className="flex-grow space-y-2">
                          <input
                            type="file"
                            id="image-file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="image-file"
                            className="inline-flex h-9 px-4 items-center justify-center rounded-xl bg-white dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 text-foreground dark:text-white border border-zinc-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
                          >
                            Choose Image File
                          </label>
                          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-normal">
                            PNG, JPG, or WEBP supported. Max size: 1MB.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Tab content 2: URL & Presets */
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <input
                          type="url"
                          id="image"
                          name="image"
                          value={formData.image.startsWith("data:") ? "" : formData.image}
                          onChange={handleFormChange}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full h-11 px-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs focus:outline-none focus:ring-1 focus:ring-[#3D3D3F] focus:border-[#3D3D3F] transition-all font-mono"
                        />
                      </div>

                      {imagePresets.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                            Or select from presets:
                          </span>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {imagePresets.map((presetUrl, idx) => {
                              const isSelected = formData.image === presetUrl;
                              return (
                                <button
                                  type="button"
                                  key={idx}
                                  onClick={() => setFormData((prev) => ({ ...prev, image: presetUrl }))}
                                  className={`h-11 w-11 rounded-lg overflow-hidden border shrink-0 transition-all bg-zinc-100 dark:bg-zinc-900 p-0.5 cursor-pointer ${
                                    isSelected 
                                      ? "border-[#3D3D3F] dark:border-white ring-2 ring-[#3D3D3F]/25 dark:ring-white/20 scale-95" 
                                      : "border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/20"
                                  }`}
                                >
                                  <img
                                    src={presetUrl}
                                    alt={`Preset ${idx + 1}`}
                                    className="h-full w-full object-cover rounded"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Save actions */}
                <div className="pt-6 border-t border-zinc-200 dark:border-white/5 mt-6 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="h-11 px-6 rounded-full border border-zinc-200 dark:border-white/10 text-foreground dark:text-zinc-300 font-bold uppercase tracking-wider text-[10px] hover:bg-zinc-50 dark:hover:bg-white/5 transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-11 px-8 rounded-full bg-white hover:bg-zinc-200 dark:bg-white dark:text-black font-bold uppercase tracking-wider text-[10px] hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    {editingProduct ? "Save Changes" : "Create Product"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
