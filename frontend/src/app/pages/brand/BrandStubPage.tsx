import { useLocation, Link } from "react-router";
import { ArrowRight } from "lucide-react";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };
const pageInfo: Record<string, { emoji: string; title: string; description: string }> = {
  "/brand/creators":  { emoji: "🔍", title: "Creator Discovery",  description: "Search and filter from 12,000+ verified creators by niche, tier, engagement rate, and location." },
  "/brand/analytics": { emoji: "📊", title: "Analytics",          description: "Deep-dive performance reporting across all your campaigns — ROI, reach, engagement, and content metrics." },
  "/brand/payments":  { emoji: "💳", title: "Payments",           description: "Manage escrow funding, release payments, and view full transaction history across all campaigns." },
  "/brand/settings":  { emoji: "⚙️", title: "Settings",           description: "Manage your brand profile, team members, billing, and notification preferences." },
};

export function BrandStubPage() {
  const { pathname } = useLocation();
  const info = pageInfo[pathname] ?? { emoji: "🚧", title: "Coming soon", description: "This section is under active development." };
  return (
    <div style={{ padding: "1.75rem 1.5rem", maxWidth: 520, margin: "0 auto", textAlign: "center", paddingTop: "5rem" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem", lineHeight: 1 }}>{info.emoji}</div>
      <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.625rem" }}>{info.title}</h1>
      <p style={{ fontFamily: f.b, fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "2rem" }}>{info.description}</p>
      <Link to="/brand" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1.25rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}>
        Back to Overview <ArrowRight size={14} />
      </Link>
    </div>
  );
}
