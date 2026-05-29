import bg from "@/assets/bg-spheres.jpg";

export function Background() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 bg-[#070708]"
    >
      {/* Background spheres with low opacity to blend into the black canvas */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(1) brightness(0.35) contrast(1.2)",
        }}
      />
      {/* Deep ambient dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070708]/30 via-transparent to-[#070708]/60" />
    </div>
  );
}

