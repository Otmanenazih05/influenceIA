import { useLocation, Link } from "react-router";
import { ArrowRight, Construction } from "lucide-react";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

const pageInfo: Record<string, { emoji: string; title: string; description: string }> = {
  "/dashboard/campaigns":    { emoji: "🔍", title: "Discover Campaigns",  description: "Browse and apply to campaigns matched to your IA Score and content niche." },
  "/dashboard/applications": { emoji: "📋", title: "My Applications",     description: "Track all your active, pending, and completed campaign applications." },
  "/dashboard/marketplace":  { emoji: "🛍️", title: "Marketplace",         description: "Browse brand products and sponsored content opportunities." },
  "/dashboard/earnings":     { emoji: "💳", title: "Earnings & Payments", description: "View your payment history, pending payouts, and financial reports." },
  "/dashboard/calendar":     { emoji: "📅", title: "Calendar",            description: "Manage deadlines, content schedules, and collaboration timelines." },
  "/dashboard/coach":        { emoji: "✨", title: "AI Coach",            description: "Get personalized guidance to grow your IA Score and win better campaigns." },
  "/dashboard/profile":      { emoji: "👤", title: "My Profile",          description: "Manage your creator profile, linked accounts, niche, and portfolio." },
  "/dashboard/messaging":    { emoji: "💬", title: "Messaging",           description: "Communicate directly with brands you're collaborating with." },
  "/dashboard/settings":     { emoji: "⚙️", title: "Settings",            description: "Manage your account, notifications, privacy, and preferences." },
};

export function DashboardStubPage() {
  const { pathname } = useLocation();
  const info = pageInfo[pathname] ?? { emoji: "🚧", title: "Coming soon", description: "This section is under active development." };

  return (
    <div style={{ padding: "1.75rem 1.5rem", maxWidth: 560, margin: "0 auto", textAlign: "center", paddingTop: "5rem" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem", lineHeight: 1 }}>{info.emoji}</div>
      <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.625rem" }}>
        {info.title}
      </h1>
      <p style={{ fontFamily: f.b, fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "2rem" }}>
        {info.description}
      </p>
      <Link
        to="/dashboard"
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.625rem 1.25rem", borderRadius: "0.5rem",
          background: "var(--primary)", color: "#fff",
          fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500,
          textDecoration: "none",
        }}
      >
        Back to Overview <ArrowRight size={14} />
      </Link>
    </div>
  );
}
