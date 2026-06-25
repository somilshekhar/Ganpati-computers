import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, LayoutGrid, Headphones, ShoppingCart } from "lucide-react";
import { useRef } from "react";
import heroPc from "@/assets/hero-pc.png";
import storeModel from "@/assets/store-model.png";

const ease = [0.22, 1, 0.36, 1] as const;

function useTilt(strength = 14) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), { stiffness: 120, damping: 14 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return { rx, ry, onMove, onLeave };
}

export function Hero() {
  const pc = useTilt(8);
  const store = useTilt(12);

  return (
    <div className="grid gap-4 px-4 pb-4 md:px-6 md:pb-6 lg:h-full lg:grid-cols-10 lg:gap-5">
      {/* LEFT — Big dark card */}
      <motion.section
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
        onMouseMove={pc.onMove}
        onMouseLeave={pc.onLeave}
        className="relative overflow-hidden rounded-[28px] bg-hero-dark p-7 md:rounded-[32px] md:p-10 lg:col-span-6 lg:h-full min-h-[560px] shadow-card"
        style={{ perspective: 1200 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Welcome to Ganpati Computers
        </p>

        <h1 className="mt-5 max-w-[14ch] font-display text-[40px] sm:text-5xl lg:text-[64px] font-bold leading-[0.95] tracking-[-0.02em] text-white">
          Technology<br />that powers<br />your world.
        </h1>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
          Your trusted technology partner in Barmer, Rajasthan for over 16 years.
          We provide computer sales, service, accessories, CCTV, and power backup solutions.
        </p>

        {/* Product showcase */}
        <motion.img
          src={heroPc}
          alt="Premium desktop computer setup with monitor, tower, keyboard and mouse"
          width={1024}
          height={896}
          style={{ rotateX: pc.rx, rotateY: pc.ry, transformStyle: "preserve-3d" }}
          className="pointer-events-none absolute -bottom-4 right-[-40px] w-[78%] max-w-[640px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)] md:right-[-20px]"
        />

        {/* CTA */}
        <Link
          to="/products"
          className="absolute left-8 bottom-8 md:left-12 md:bottom-12 inline-flex items-center gap-4 rounded-full bg-white pl-6 pr-2 py-2 text-ink shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] transition-transform hover:scale-[1.03]"
        >
          <span className="text-sm font-semibold">Browse All Products</span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-lightgray">
            <ShoppingCart className="h-4 w-4" />
          </span>
        </Link>
      </motion.section>

      {/* RIGHT column */}
      <div className="grid gap-4 lg:col-span-4 lg:h-full lg:gap-5 lg:grid-rows-[1fr_1fr]">
        {/* Top: Trusted partner card */}
        <Link to="/about" className="block lg:h-full h-full cursor-pointer group">
          <motion.section
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            onMouseMove={store.onMove}
            onMouseLeave={store.onLeave}
            className="relative overflow-hidden rounded-[28px] bg-lightgray p-6 md:p-7 min-h-[280px] lg:h-full h-full shadow-card transition-all duration-300 hover:shadow-lg"
            style={{ perspective: 1000 }}
          >
            <ArrowUpRight className="arrow-icon absolute right-6 top-6 h-6 w-6 text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
              Performance. Reliability. Trust
            </p>

            <h2 className="mt-5 max-w-[10ch] font-display text-3xl md:text-[40px] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
              Your trusted computer partner
            </h2>

            <motion.img
              src={storeModel}
              alt="Miniature 3D model of Ganpati Computers storefront"
              width={896}
              height={768}
              loading="lazy"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ rotateX: store.rx, rotateY: store.ry, transformStyle: "preserve-3d" }}
              className="pointer-events-none absolute right-2 bottom-0 w-[58%] max-w-[280px] drop-shadow-[0_25px_30px_rgba(0,0,0,0.18)]"
            />
          </motion.section>
        </Link>

        {/* Bottom: 2 small cards */}
        <div className="grid grid-cols-2 gap-4 lg:h-full lg:gap-5">
          <SmallCard
            to="/categories"
            label="Discover our categories"
            title={<>Shop by<br/>Category</>}
            Icon={LayoutGrid}
            gradient="bg-lilac-gradient"
            glow="hover:shadow-glow-lilac"
            iconTint="text-white"
            delay={0.35}
          />
          <SmallCard
            to="/contact"
            label="Have questions? We're here to help"
            title={<>Contact<br/>Us</>}
            Icon={Headphones}
            gradient="bg-lime-gradient"
            glow="hover:shadow-glow-lime"
            iconTint="text-white"
            delay={0.45}
          />
        </div>
      </div>
    </div>
  );
}

function SmallCard({
  to, label, title, Icon, gradient, glow, iconTint, textDark, delay,
}: {
  to: "/categories" | "/contact";
  label: string;
  title: React.ReactNode;
  Icon: typeof LayoutGrid;
  gradient: string;
  glow: string;
  iconTint: string;
  textDark?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease, delay }}
      className="h-full"
    >
      <Link
        to={to}
        className={`group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-[28px] p-5 sm:p-6 transition-all duration-500 hover:-translate-y-1.5 ${gradient} ${glow} ${
          textDark ? "text-ink" : "text-white"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <p className={`max-w-[18ch] text-[11px] font-semibold uppercase tracking-[0.14em] ${textDark ? "text-ink/80" : "text-white/85"}`}>
            {label}
          </p>
          <ArrowUpRight className={`arrow-icon h-6 w-6 ${iconTint}`} />
        </div>
        <div>
          <Icon className={`mb-4 h-8 w-8 ${iconTint}`} strokeWidth={1.6} />
          <h3 className="font-display text-[34px] font-semibold leading-[1.02] tracking-[-0.02em]">
            {title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
