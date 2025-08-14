// pages/index.tsx
export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 42, margin: 0 }}>
          Nature’s Way Soil — LIVE TEST 928
        </h1>
        <p style={{ marginTop: 10, color: "#475569" }}>
          If you can read this, your new deploy is live.
        </p>
        <p style={{ marginTop: 8 }}>
          API health: <a href="/api/health">/api/health</a>
        </p>
      </div>
    </main>
  );
}

