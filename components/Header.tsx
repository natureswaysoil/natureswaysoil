import Image from "next/image";

export default function HeroBanner() {
  return (
    <section style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#184932",
      color: "white",
      padding: "3rem 2rem",
      borderRadius: "0 0 24px 24px",
      minHeight: "320px",
      flexWrap: "wrap",
    }}>
      <div style={{ maxWidth: "540px", flex: "1 1 340px" }}>
        <h1 style={{ fontSize: "2.4rem", fontWeight: "700", marginBottom: "0.7rem" }}>
          Nature&apos;s Way Soil
        </h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
          From our farm to your garden — premium organic soil blends enriched with biochar, worm castings, & mycorrhizae.
        </p>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <button style={{
            background: "white",
            color: "#184932",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
            boxShadow: "0 1px 4px #0002"
          }}>
            View Featured
          </button>
          <button style={{
            background: "transparent",
            color: "white",
            border: "1px solid white",
            borderRadius: "8px",
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
          }}>
            View All Products
          </button>
        </div>
        <ul style={{ listStyle: "disc", paddingLeft: "1.3rem", marginBottom: 0 }}>
          <li>Biochar for aeration & nutrient retention</li>
          <li>Worm castings for living biology</li>
          <li>Mycorrhizae to supercharge roots</li>
        </ul>
      </div>
      <div style={{ flex: "1 1 220px", display: "flex", justifyContent: "flex-end", minWidth: "200px" }}>
        <Image
          src="/logo.png" // Place your logo image from ![image2](image2) at public/logo.png
          alt="Nature's Way Soil"
          width={220}
          height={220}
          style={{ objectFit: "contain", borderRadius: "50%" }}
        />
      </div>
    </section>
  );
}
