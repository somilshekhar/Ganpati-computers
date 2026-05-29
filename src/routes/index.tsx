import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ganpati Computers — Technology that powers your world" },
      { name: "description", content: "Premium computers, laptops and accessories. Quality products and trusted service from Ganpati Computers." },
      { property: "og:title", content: "Ganpati Computers" },
      { property: "og:description", content: "Premium computers, laptops and accessories. Quality products, trusted service." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full p-0 md:pt-2 md:px-6 md:pb-6 lg:h-screen lg:overflow-hidden lg:pt-2 lg:px-6 lg:pb-6"
    >
      <Background />
      <div className="mx-auto flex min-h-screen md:min-h-[calc(100vh-1.5rem)] max-w-[1400px] flex-col lg:overflow-hidden rounded-none md:rounded-[32px] bg-white/70 backdrop-blur-xl shadow-glass ring-0 md:ring-1 ring-white/60 p-0 md:p-1 lg:p-2 relative overflow-hidden">
        {/* Animated ambient glow blobs on the white background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#B287FF]/15 blur-[80px]"
          />
          <motion.div
            animate={{
              x: [0, -30, 40, 0],
              y: [0, 40, -30, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-[#B7F33B]/10 blur-[80px]"
          />
          <motion.div
            animate={{
              x: [0, 20, -10, 0],
              y: [0, 20, -10, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[90px]"
          />
        </div>

        <div className="relative z-10 flex flex-col flex-grow w-full min-h-0 lg:overflow-hidden">
          <Navbar />
          <div className="flex-1 min-h-0">
            <Hero />
          </div>
          <div className="lg:hidden">
            <Footer />
          </div>
        </div>
      </div>
    </motion.main>
  );
}

