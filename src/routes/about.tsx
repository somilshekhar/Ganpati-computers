import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Cpu, ShieldCheck, HeartHandshake, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Ganpati Computers" }] }),
  component: AboutPage,
});

function AboutPage() {
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

        <div className="flex-1 px-4 py-8 md:px-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink transition-colors group mb-4"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back home
            </Link>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-ink">
              About Us
            </h1>
            <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed">
              We are Ganpati Computers — your premier partner for custom-built computers, high-quality components, and trusted repair services. Built on trust, reliability, and technical excellence since day one.
            </p>
          </div>

          {/* Interactive Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "15+", label: "Years of Trust" },
              { value: "500+", label: "Custom PCs Built" },
              { value: "10k+", label: "Happy Customers" },
              { value: "4.9★", label: "Google Rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/80 border border-black/5 rounded-2xl p-6 text-center shadow-sm"
              >
                <div className="text-3xl font-black text-black">{stat.value}</div>
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Story & Background Section */}
          <section className="bg-white/80 border border-black/5 rounded-[24px] p-6 sm:p-8 mb-12 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-ink mb-4">Our Journey</h2>
            <div className="text-zinc-600 text-sm md:text-base space-y-4 leading-relaxed">
              <p>
                Founded with a passion for computing and customization, Ganpati Computers has grown from a humble local workshop to a trusted regional technology hub. Our goal has always been simple: to provide high-performance hardware alongside transparent, reliable customer service.
              </p>
              <p>
                Whether you're a professional visual editor requiring a rendering workstation, a competitive gamer needing maximum FPS, or a family seeking a reliable daily computer, we design and source configurations that power your goals.
              </p>
            </div>
          </section>

          {/* Why Choose Us: Sticky Stacking Cards Section */}
          <div className="mb-16 mt-12">
            <h2 className="font-display text-3xl font-extrabold text-ink mb-8 text-center md:text-left">
              Why Choose Us?
            </h2>
            <div className="relative flex flex-col gap-10 pb-16">
              {[
                {
                  number: "01",
                  icon: Cpu,
                  title: "High-Tier Component Sourcing",
                  desc: "We work directly with authorized distributors to source the best graphics cards, processors, and modules with full brand warranties.",
                  bg: "bg-white border-black/5 text-ink shadow-[0_-8px_30px_rgba(0,0,0,0.03)]",
                  iconBg: "bg-zinc-100 text-zinc-900"
                },
                {
                  number: "02",
                  icon: ShieldCheck,
                  title: "Rigorous System Testing",
                  desc: "Every custom pre-built PC leaves our store only after passing a 24-hour stress test and benchmark evaluation to ensure total stability.",
                  bg: "bg-lilac-gradient text-white border-[#9D6DFF]/20 shadow-[0_-8px_30px_rgba(157,109,255,0.15)]",
                  iconBg: "bg-white/10 text-white border border-white/20"
                },
                {
                  number: "03",
                  icon: HeartHandshake,
                  title: "Transparent & Fair Repair Rates",
                  desc: "No hidden diagnosis fees or markups. We explain every hardware failure clearly and give cost-efficient upgrade recommendations.",
                  bg: "bg-lime-gradient text-ink border-[#B7F33B]/20 shadow-[0_-8px_30px_rgba(183,243,59,0.15)]",
                  iconBg: "bg-black/10 text-black border border-black/15"
                },
                {
                  number: "04",
                  icon: Award,
                  title: "Expert PC Hardware Engineers",
                  desc: "Our team lives and breathes hardware, stay updated on the latest hardware releases, cooling systems, and tuning methods.",
                  bg: "bg-hero-dark text-white border-white/5 shadow-[0_-8px_40px_rgba(0,0,0,0.35)]",
                  iconBg: "bg-white/10 text-white border border-white/15"
                },
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    style={{ top: `${120 + index * 40}px` }}
                    className={`sticky rounded-[24px] p-6 sm:p-8 border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 min-h-[200px] transition-all duration-300 ${value.bg}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl md:text-5xl font-black opacity-30 tracking-tight font-sans">
                          {value.number}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                          {value.title}
                        </h3>
                      </div>
                      <p className="mt-4 text-sm sm:text-base opacity-85 leading-relaxed max-w-xl">
                        {value.desc}
                      </p>
                    </div>

                    <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl shadow-sm ${value.iconBg}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </motion.main>
  );
}
