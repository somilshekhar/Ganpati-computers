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
      <div className="mx-auto flex min-h-screen md:min-h-[calc(100vh-1.5rem)] max-w-[1400px] flex-col lg:overflow-hidden rounded-none md:rounded-[32px] bg-white/70 backdrop-blur-xl shadow-glass ring-0 md:ring-1 ring-white/60 p-0 md:p-1 lg:p-2">
        <Navbar />
        <div className="flex-1 min-h-0">
          <Hero />
        </div>
        <div className="lg:hidden">
          <Footer />
        </div>
      </div>
    </motion.main>
  );
}

