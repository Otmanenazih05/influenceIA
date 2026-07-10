import { TrendingUp, TrendingDown, Users, Star, MapPin, BarChart2, Calendar, DollarSign, ShoppingBag, Package, Inbox } from "lucide-react";
import { SectionHeader, SubSection, DSCard } from "./DSLayout";
import { InstagramIcon } from "../ui/SocialIcons";

/* ─── Stats Card ─── */
function StatsCard({ title, value, delta, deltaDir, icon, iconColor }: {
  title: string; value: string; delta: string; deltaDir: "up" | "down";
  icon: React.ReactNode; iconColor: string;
}) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-5"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "var(--muted-foreground)", fontWeight: 500 }}>
          {title}
        </p>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: `${iconColor}18`, color: iconColor }}
        >
          {icon}
        </div>
      </div>
      <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.625rem", color: "var(--foreground)", lineHeight: 1.2 }}>
        {value}
      </p>
      <div className="flex items-center gap-1 mt-1">
        {deltaDir === "up"
          ? <TrendingUp size={13} style={{ color: "var(--brand-success)" }} />
          : <TrendingDown size={13} style={{ color: "var(--brand-error)" }} />}
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: deltaDir === "up" ? "var(--brand-success)" : "var(--brand-error)", fontWeight: 500 }}>
          {delta}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>vs last month</span>
      </div>
    </div>
  );
}

/* ─── Score Ring ─── */
function ScoreRing({ score }: { score: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  return (
    <svg width={70} height={70} viewBox="0 0 70 70">
      <circle cx={35} cy={35} r={r} fill="none" stroke="var(--muted)" strokeWidth={5} />
      <circle
        cx={35} cy={35} r={r} fill="none"
        stroke="var(--brand-blue)" strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={`${fill} ${circ - fill}`}
        strokeDashoffset={circ / 4}
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <text x={35} y={38} textAnchor="middle"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.875rem", fill: "var(--foreground)" }}>
        {score}
      </text>
    </svg>
  );
}

/* ─── Profile Card ─── */
function ProfileCard() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden" style={{ width: 240, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
      {/* Cover */}
      <div className="h-16 w-full" style={{ background: "linear-gradient(135deg, #2563EB22, #7C3AED22)" }} />
      <div className="px-4 pb-4 -mt-7">
        <div className="flex items-end justify-between mb-2">
          <div
            className="w-14 h-14 rounded-full border-4 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", borderColor: "var(--card)" }}
          >
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#fff", fontSize: "1.125rem" }}>S</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "var(--secondary)", marginBottom: 4 }}>
            <Star size={10} style={{ color: "var(--brand-purple)" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "var(--secondary-foreground)" }}>Vérifié</span>
          </div>
        </div>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--foreground)" }}>
          Sarah Benjelloun
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: 1 }}>
          Lifestyle · Casablanca
        </p>
        <div className="flex items-center gap-1 mt-1">
          <MapPin size={11} style={{ color: "var(--muted-foreground)" }} />
          <InstagramIcon size={11} style={{ color: "var(--muted-foreground)" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "var(--muted-foreground)" }}>
            98K · 4.8% eng.
          </span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <ScoreRing score={87} />
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "var(--muted-foreground)" }}>Score IA</p>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", lineHeight: 1 }}>87<span style={{ fontSize: "0.75rem", fontWeight: 400 }}>/100</span></p>
            </div>
          </div>
          <button
            style={{
              padding: "0.375rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.75rem",
              fontFamily: "'Inter', sans-serif", fontWeight: 500,
              background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer",
            }}
          >
            Voir profil
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Campaign Card ─── */
function CampaignCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-4" style={{ width: 220, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
      <div className="flex items-center justify-between mb-2">
        <span
          className="px-2 py-0.5 rounded"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, background: "var(--secondary)", color: "var(--secondary-foreground)", textTransform: "uppercase", letterSpacing: "0.04em" }}
        >
          Campagne
        </span>
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "var(--brand-success)", flexShrink: 0, boxShadow: "0 0 0 3px #10B98120" }}
        />
      </div>
      <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--foreground)", marginBottom: 2 }}>
        Lancement produit
      </p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
        Beauté & Soins
      </p>
      <div className="mt-3 space-y-1.5">
        {[
          { icon: <InstagramIcon size={12} />, text: "Instagram, TikTok" },
          { icon: <DollarSign size={12} />, text: "Budget : 5 000 MAD" },
          { icon: <Calendar size={12} />, text: "Clôture : 20 Mai 2024" },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span style={{ color: "var(--muted-foreground)" }}>{row.icon}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{row.text}</span>
          </div>
        ))}
      </div>
      <button
        style={{
          marginTop: 12, width: "100%", padding: "0.4375rem 0", borderRadius: "0.5rem",
          fontSize: "0.8rem", fontFamily: "'Inter', sans-serif", fontWeight: 500,
          background: "var(--secondary)", color: "var(--secondary-foreground)",
          border: "1px solid var(--secondary-foreground)", cursor: "pointer",
        }}
      >
        Voir détails
      </button>
    </div>
  );
}

/* ─── Marketplace Product Card ─── */
function ProductCard() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden" style={{ width: 200, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
      <div className="h-24 w-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FCE7F3, #EDE9FE)" }}>
        <ShoppingBag size={32} style={{ color: "var(--brand-pink)", opacity: 0.7 }} />
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} style={{ color: i < 4 ? "#F59E0B" : "var(--muted)", fill: i < 4 ? "#F59E0B" : "none" }} />
          ))}
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "var(--muted-foreground)", marginLeft: 2 }}>4.6</span>
        </div>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.8125rem", color: "var(--foreground)" }}>
          Sérum Éclat Naturel
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "var(--muted-foreground)" }}>by GlowLab Morocco</p>
        <div className="flex items-center justify-between mt-2">
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--primary)" }}>350 MAD</span>
          <button style={{ padding: "0.25rem 0.625rem", borderRadius: "0.375rem", fontSize: "0.7rem", fontFamily: "'Inter', sans-serif", fontWeight: 500, background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer" }}>
            Choisir
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Empty State Card ─── */
function EmptyStateCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center" style={{ maxWidth: 360 }}>
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "var(--secondary)" }}
      >
        <Inbox size={24} style={{ color: "var(--brand-purple)" }} />
      </div>
      <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>
        No campaigns yet
      </p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "var(--muted-foreground)", marginTop: "0.375rem", lineHeight: 1.6, maxWidth: "26ch" }}>
        Create your first campaign to start connecting with influencers.
      </p>
      <button
        style={{
          marginTop: 16, padding: "0.5rem 1.25rem", borderRadius: "0.5rem",
          fontSize: "0.875rem", fontFamily: "'Inter', sans-serif", fontWeight: 500,
          background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer",
        }}
      >
        + New Campaign
      </button>
    </div>
  );
}

export function CardsSection() {
  return (
    <div>
      <SectionHeader
        title="Cards"
        description="Reusable card patterns for stats, profiles, campaigns, marketplace listings, and empty states."
      />

      <SubSection title="Stats Cards">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatsCard title="Active Campaigns" value="12" delta="+20% " deltaDir="up" icon={<BarChart2 size={18} />} iconColor="var(--brand-blue)" />
          <StatsCard title="Influencers Engaged" value="145" delta="+15%" deltaDir="up" icon={<Users size={18} />} iconColor="var(--brand-purple)" />
          <StatsCard title="Avg. ROI" value="3.7×" delta="+18%" deltaDir="up" icon={<TrendingUp size={18} />} iconColor="var(--brand-success)" />
          <StatsCard title="Budget Spent" value="24 500" delta="+8%" deltaDir="down" icon={<DollarSign size={18} />} iconColor="var(--brand-warning)" />
        </div>
      </SubSection>

      <SubSection title="Profile Card">
        <div className="flex flex-wrap gap-4">
          <ProfileCard />
        </div>
      </SubSection>

      <SubSection title="Campaign Card">
        <div className="flex flex-wrap gap-4">
          <CampaignCard />
        </div>
      </SubSection>

      <SubSection title="Marketplace Product Card">
        <div className="flex flex-wrap gap-4">
          <ProductCard />
          <ProductCard />
        </div>
      </SubSection>

      <SubSection title="Empty State Card">
        <div className="flex flex-wrap gap-4">
          <EmptyStateCard />
          <DSCard className="flex flex-col items-center justify-center text-center max-w-sm">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
              style={{ background: "var(--accent)" }}
            >
              <Package size={22} style={{ color: "var(--brand-pink)" }} />
            </div>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>
              No messages
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "var(--muted-foreground)", marginTop: 4, lineHeight: 1.6 }}>
              Start a conversation with an influencer to collaborate.
            </p>
          </DSCard>
        </div>
      </SubSection>
    </div>
  );
}
