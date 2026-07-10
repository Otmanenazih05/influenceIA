import {
  LayoutDashboard, Users, Megaphone, MessageSquare, BarChart2,
  CreditCard, Settings, Search, Bell, TrendingUp, Eye, Sparkles,
  Star, ArrowRight, Check, Play, ChevronDown
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from "recharts";
import { SectionHeader, SubSection } from "./DSLayout";

const miniChartData = [
  { v: 12000 }, { v: 19000 }, { v: 16000 }, { v: 28000 }, { v: 24000 }, { v: 38000 }, { v: 45000 }
];

/* ─────────────── DASHBOARD MOCKUP ─────────────── */
function DashboardMockup() {
  const sideItems = [
    { icon: <LayoutDashboard size={14} />, label: "Dashboard", active: true },
    { icon: <Search size={14} />, label: "Rechercher", active: false },
    { icon: <Users size={14} />, label: "Influenceurs", active: false },
    { icon: <Megaphone size={14} />, label: "Campagnes", active: false },
    { icon: <MessageSquare size={14} />, label: "Messages", active: false },
    { icon: <BarChart2 size={14} />, label: "Analytics", active: false },
    { icon: <CreditCard size={14} />, label: "Paiements", active: false },
    { icon: <Settings size={14} />, label: "Paramètres", active: false },
  ];

  const kpis = [
    { label: "Campagnes actives", value: "12", delta: "+20%", color: "#2563EB" },
    { label: "Influenceurs engagés", value: "145", delta: "+15%", color: "#7C3AED" },
    { label: "ROI moyen", value: "3.7×", delta: "+18%", color: "#10B981" },
    { label: "Budget dépensé", value: "24 500 MAD", delta: "+8%", color: "#F59E0B" },
  ];

  const topInfluencers = [
    { name: "Sarah Benjelloun", score: 87, color: "#2563EB" },
    { name: "Youssef El Amrani", score: 82, color: "#7C3AED" },
    { name: "Lina Zahra", score: 79, color: "#EC4899" },
    { name: "Omar Boutaleb", score: 76, color: "#10B981" },
  ];

  return (
    <div
      style={{
        background: "var(--background)",
        borderRadius: "0.75rem",
        border: "1px solid var(--border)",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        transform: "scale(1)",
      }}
    >
      {/* Window chrome */}
      <div style={{ background: "var(--muted)", padding: "0.5rem 0.875rem", display: "flex", alignItems: "center", gap: 5 }}>
        {["#EF4444", "#F59E0B", "#10B981"].map((c) => (
          <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
        ))}
        <div
          style={{
            marginLeft: 8, flex: 1, height: 18, borderRadius: 999,
            background: "var(--card)", border: "1px solid var(--border)",
            display: "flex", alignItems: "center", padding: "0 8px",
          }}
        >
          <span style={{ fontSize: "0.6rem", color: "var(--muted-foreground)" }}>app.influencia.ai/dashboard</span>
        </div>
      </div>

      <div style={{ display: "flex", height: 440 }}>
        {/* Sidebar */}
        <div
          style={{
            width: 150, background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)",
            padding: "0.75rem 0.5rem", display: "flex", flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.25rem 0.5rem", marginBottom: 12 }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={10} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "var(--sidebar-foreground)" }}>
              Influenc<span style={{ color: "#2563EB" }}>IA</span>
            </span>
          </div>
          {sideItems.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "0.375rem 0.5rem", borderRadius: 4,
                background: item.active ? "var(--sidebar-primary)" : "transparent",
                color: item.active ? "#fff" : "var(--muted-foreground)",
                marginBottom: 1, cursor: "pointer",
              }}
            >
              <span style={{ opacity: item.active ? 1 : 0.6 }}>{item.icon}</span>
              <span style={{ fontSize: "0.7rem", fontWeight: item.active ? 500 : 400 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, overflow: "auto", padding: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "var(--foreground)" }}>
              Tableau de bord
            </p>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ padding: "0.25rem 0.625rem", border: "1px solid var(--border)", borderRadius: 4, background: "var(--card)", color: "var(--muted-foreground)", fontSize: "0.65rem", cursor: "pointer" }}>
                01 Mai – 31 Mai 2024
              </button>
              <div style={{ width: 26, height: 26, borderRadius: 4, background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: "#fff" }}>Y</span>
              </div>
            </div>
          </div>

          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 12 }}>
            {kpis.map((kpi) => (
              <div key={kpi.label} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, padding: "0.5rem 0.625rem" }}>
                <p style={{ fontSize: "0.6rem", color: "var(--muted-foreground)", marginBottom: 2 }}>{kpi.label}</p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{kpi.value}</p>
                <p style={{ fontSize: "0.6rem", color: "var(--brand-success)", fontWeight: 500 }}>{kpi.delta} ce mois</p>
              </div>
            ))}
          </div>

          {/* Chart + Top influencers */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8 }}>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, padding: "0.75rem" }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.75rem", color: "var(--foreground)", marginBottom: 4 }}>
                Performances des campagnes
              </p>
              <div style={{ height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={miniChartData} margin={{ top: 2, right: 4, bottom: 0, left: -30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <YAxis tick={{ fontSize: 8, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: "0.65rem", fontFamily: "'Inter', sans-serif", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 4 }} />
                    <Line type="monotone" dataKey="v" stroke="#2563EB" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, padding: "0.625rem" }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.7rem", color: "var(--foreground)", marginBottom: 6 }}>
                Top influenceurs
              </p>
              {topInfluencers.map((inf) => (
                <div key={inf.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: `${inf.color}22`, display: "flex", alignItems: "center", justifyContent: "center", color: inf.color, fontSize: "0.55rem", fontWeight: 700 }}>
                      {inf.name[0]}
                    </div>
                    <span style={{ fontSize: "0.65rem", color: "var(--foreground)", fontWeight: 400 }}>{inf.name.split(" ")[0]}</span>
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: inf.color }}>{inf.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── LANDING HERO MOCKUP ─────────────── */
function LandingHeroMockup() {
  return (
    <div
      style={{
        background: "var(--background)",
        borderRadius: "0.75rem",
        border: "1px solid var(--border)",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
      }}
    >
      {/* Nav */}
      <div
        style={{
          background: "var(--card)",
          borderBottom: "1px solid var(--border)",
          padding: "0.75rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={11} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>
            Influenc<span style={{ color: "#2563EB" }}>IA</span>
          </span>
        </div>
        <nav style={{ display: "flex", gap: 16 }}>
          {["Produit", "Tarifs", "Blog", "À propos"].map((item) => (
            <span key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "var(--muted-foreground)", cursor: "pointer" }}>
              {item}
            </span>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ padding: "0.375rem 0.75rem", borderRadius: 6, border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontSize: "0.8rem", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            Connexion
          </button>
          <button style={{ padding: "0.375rem 0.875rem", borderRadius: 6, border: "none", background: "var(--primary)", color: "#fff", fontSize: "0.8rem", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
            Essai gratuit
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: "3.5rem 2rem", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "0.3rem 0.875rem", borderRadius: 999,
            background: "var(--secondary)", marginBottom: 20,
          }}
        >
          <Sparkles size={12} style={{ color: "var(--brand-purple)" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "var(--secondary-foreground)" }}>
            Propulsé par l'IA · Score InfluencIA™
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "2.5rem",
            color: "var(--foreground)", lineHeight: 1.1, letterSpacing: "-0.04em",
            maxWidth: 580, margin: "0 auto 1rem",
          }}
        >
          Connectez les marques avec les vrais créateurs
        </h1>

        <p
          style={{
            fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "var(--muted-foreground)",
            lineHeight: 1.65, maxWidth: 440, margin: "0 auto 2rem",
          }}
        >
          La plateforme IA qui connecte les marques aux nano et micro-influenceurs et mesure l'impact réel.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "0.75rem 1.625rem", borderRadius: "0.625rem",
              border: "none", background: "var(--primary)", color: "#fff",
              fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", fontWeight: 600, cursor: "pointer",
              boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
            }}
          >
            Commencer gratuitement <ArrowRight size={16} />
          </button>
          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "0.75rem 1.375rem", borderRadius: "0.625rem",
              border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)",
              fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", cursor: "pointer",
            }}
          >
            <Play size={14} style={{ color: "var(--primary)" }} /> Voir la démo
          </button>
        </div>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ display: "flex" }}>
            {["#2563EB", "#7C3AED", "#EC4899", "#10B981"].map((c, i) => (
              <div key={c} style={{ width: 28, height: 28, borderRadius: "50%", background: `${c}22`, border: "2px solid var(--card)", marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", color: c, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.6rem" }}>
                {["S","Y","L","O"][i]}
              </div>
            ))}
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
            Rejoignez +2 500 marques qui font confiance à InfluencIA
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          padding: "1.25rem 2rem",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16, textAlign: "center",
        }}
      >
        {[
          { value: "12 000+", label: "Créateurs vérifiés" },
          { value: "3.7×", label: "ROI moyen" },
          { value: "98%", label: "Satisfaction marques" },
        ].map((stat) => (
          <div key={stat.label}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)" }}>{stat.value}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "var(--muted-foreground)", marginTop: 2 }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── MOBILE MOCKUP ─────────────── */
function MobileMockup() {
  const score = 82;
  const r = 42;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;

  return (
    <div
      style={{
        width: 240,
        background: "var(--background)",
        borderRadius: "2rem",
        border: "6px solid var(--foreground)",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      {/* Status bar */}
      <div
        style={{
          background: "var(--card)",
          padding: "0.5rem 1rem 0.25rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700, color: "var(--foreground)" }}>9:41</span>
        <div style={{ display: "flex", gap: 4 }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ width: 3, height: 6 + i * 2, background: i < 3 ? "var(--foreground)" : "var(--border)", borderRadius: 1 }} />
          ))}
          <div style={{ width: 14, height: 8, border: "1px solid var(--foreground)", borderRadius: 2, display: "flex", alignItems: "center", padding: "0 1px" }}>
            <div style={{ width: "75%", height: "100%", background: "var(--brand-success)", borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* App content */}
      <div style={{ padding: "0.75rem 0.875rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>
              Bonjour, Yassine 👋
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "var(--muted-foreground)" }}>Tableau de bord</p>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#fff" }}>Y</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "0.75rem 0.875rem" }}>
        {/* Score card */}
        <div style={{ background: "var(--card)", borderRadius: "0.75rem", padding: "0.75rem", marginBottom: "0.75rem", border: "1px solid var(--border)", textAlign: "center" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "var(--muted-foreground)", marginBottom: 6 }}>Score IA moyen</p>
          <svg width={100} height={100} viewBox="0 0 100 100" style={{ display: "block", margin: "0 auto" }}>
            <circle cx={50} cy={50} r={r} fill="none" stroke="var(--muted)" strokeWidth={7} />
            <circle
              cx={50} cy={50} r={r} fill="none"
              stroke="#2563EB" strokeWidth={7} strokeLinecap="round"
              strokeDasharray={`${fill} ${circ - fill}`}
              strokeDashoffset={circ / 4}
            />
            <text x={50} y={54} textAnchor="middle" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "1.375rem", fill: "var(--foreground)" }}>
              {score}
            </text>
            <text x={50} y={67} textAnchor="middle" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", fill: "var(--muted-foreground)" }}>
              /100
            </text>
          </svg>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: "0.75rem" }}>
          {[
            { label: "Campagnes actives", value: "8", color: "#2563EB" },
            { label: "Influenceurs", value: "120", color: "#7C3AED" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "var(--card)", borderRadius: "0.625rem", padding: "0.625rem", border: "1px solid var(--border)", textAlign: "center" }}>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.125rem", color: stat.color }}>{stat.value}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "var(--muted-foreground)", lineHeight: 1.3 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div style={{ background: "var(--card)", borderRadius: "0.625rem", padding: "0.625rem", border: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.7rem", color: "var(--foreground)", marginBottom: 6 }}>Activité récente</p>
          {[
            { name: "Sarah Benjelloun", action: "a postulé", time: "il y a 2h", color: "#2563EB" },
            { name: "Lina Zahra", action: "contenu soumis", time: "il y a 4h", color: "#EC4899" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: i === 0 ? 6 : 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${item.color}22`, color: item.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.55rem", flexShrink: 0 }}>
                {item.name[0]}
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "var(--foreground)", fontWeight: 500 }}>{item.name}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: "var(--muted-foreground)" }}>{item.action} · {item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        style={{
          background: "var(--card)", borderTop: "1px solid var(--border)",
          padding: "0.5rem 0", display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
          textAlign: "center",
        }}
      >
        {[
          { icon: <LayoutDashboard size={16} />, label: "Accueil", active: true },
          { icon: <Search size={16} />, label: "Recherche", active: false },
          { icon: <Megaphone size={16} />, label: "+", active: false, fab: true },
          { icon: <MessageSquare size={16} />, label: "Messages", active: false },
          { icon: <Users size={16} />, label: "Profil", active: false },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            {item.fab ? (
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: -8, boxShadow: "0 2px 8px rgba(37,99,235,0.4)", color: "#fff" }}>
                <Megaphone size={14} />
              </div>
            ) : (
              <span style={{ color: item.active ? "var(--primary)" : "var(--muted-foreground)" }}>{item.icon}</span>
            )}
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", color: item.active ? "var(--primary)" : "var(--muted-foreground)" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockupsSection() {
  return (
    <div>
      <SectionHeader
        title="Mockups"
        description="Mini assembled mockups showing components in context: dashboard, landing hero, and mobile app."
      />

      <SubSection title="Dashboard — Brand View">
        <DashboardMockup />
      </SubSection>

      <SubSection title="Public Landing Page — Hero Section">
        <LandingHeroMockup />
      </SubSection>

      <SubSection title="Mobile App Screen">
        <div className="flex justify-center">
          <MobileMockup />
        </div>
      </SubSection>
    </div>
  );
}
