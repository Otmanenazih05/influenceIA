import {
  LayoutDashboard, Compass, Plus, MessageSquare, User, Sparkles,
  Bell, TrendingUp, Calendar, CreditCard, CheckCircle, Zap, Bookmark,
  Search, Filter, Instagram, Play, Star, Package, Check, AlertCircle,
  ArrowRight, ChevronRight,
} from "lucide-react";
import { StatusBar, MobileBottomNav, MobileHeader, KpiChip, MobileScroll, f } from "./PhoneFrame";

const influencerNav = [
  { id: "home",    label: "Home",     icon: <LayoutDashboard size={20} /> },
  { id: "explore", label: "Explore",  icon: <Compass size={20} /> },
  { id: "add",     label: "",         icon: <Plus size={22} />, primary: true },
  { id: "messages",label: "Messages", icon: <MessageSquare size={20} /> },
  { id: "profile", label: "Profile",  icon: <User size={20} /> },
];

/* ═══ INFLUENCER DASHBOARD ═══ */
export function MobileInfluencerDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--background)", overflow: "hidden" }}>
      <StatusBar />
      {/* Header */}
      <MobileHeader
        left={
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <div style={{ width: 24, height: 24, borderRadius: "0.375rem", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={11} color="#fff" />
            </div>
            <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>Influenc<span style={{ color: "#2563EB" }}>IA</span></span>
          </div>
        }
        right={
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button style={{ width: 32, height: 32, borderRadius: "0.5rem", background: "var(--muted)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <Bell size={15} style={{ color: "var(--muted-foreground)" }} />
              <span style={{ position: "absolute", top: 5, right: 5, width: 7, height: 7, borderRadius: "50%", background: "#EC4899", border: "2px solid var(--card)" }} />
            </button>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", color: "#fff" }}>S</span>
            </div>
          </div>
        }
      />

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {/* Greeting */}
        <div style={{ padding: "1.125rem 1.125rem 0.75rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", letterSpacing: "-0.02em" }}>Good morning, Sarah 👋</p>
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginTop: 2 }}>3 new campaign matches</p>
        </div>

        <div style={{ padding: "0.875rem 1.125rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {/* IA Score card */}
          <div style={{ background: "linear-gradient(135deg,#5B21B6,#7C3AED)", borderRadius: "1rem", padding: "1.125rem", boxShadow: "0 6px 20px rgba(124,58,237,0.25)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "rgba(255,255,255,0.65)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>IA Score</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginTop: 2 }}>
                  <span style={{ fontFamily: f.h, fontWeight: 800, fontSize: "2.5rem", color: "#fff", letterSpacing: "-0.04em" }}>87</span>
                  <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>/100</span>
                </div>
                <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "rgba(255,255,255,0.65)", marginTop: 2 }}>Excellent · Top 18%</p>
              </div>
              <svg width={80} height={80} viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
                <circle cx={40} cy={40} r={32} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={6} />
                <circle cx={40} cy={40} r={32} fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round"
                  strokeDasharray={`${(87/100)*2*Math.PI*32} ${2*Math.PI*32*(1-87/100)}`} strokeDashoffset={2*Math.PI*32/4}
                />
                <text x={40} y={45} textAnchor="middle" style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1rem", fill: "#fff" }}>87</text>
              </svg>
            </div>
          </div>

          {/* KPI chips 2x2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <KpiChip label="Active Collabs"    value="3"          color="#10B981" />
            <KpiChip label="Applications"      value="5"          color="#F59E0B" />
            <KpiChip label="Total Earned"       value="12.4K"      color="#2563EB" />
            <KpiChip label="Next Deadline"      value="3 days"     color="#EC4899" />
          </div>

          {/* Recommended campaigns */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.625rem" }}>
              <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>For you</p>
              <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: "#2563EB", fontWeight: 500 }}>See all</span>
            </div>
          </div>
        </div>

        {/* Horizontal scroll campaigns */}
        <MobileScroll>
          {[
            { brand: "GlowLab", budget: "5K MAD", match: 96, color: "#EC4899" },
            { brand: "AtlasBrand", budget: "3.5K", match: 88, color: "#2563EB" },
            { brand: "NovaBio", budget: "4.2K", match: 82, color: "#10B981" },
          ].map((c) => (
            <div key={c.brand} style={{ flexShrink: 0, width: 200, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "0.875rem", borderTop: `3px solid ${c.color}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.625rem" }}>
                <div style={{ width: 28, height: 28, borderRadius: "0.375rem", background: `${c.color}18`, color: c.color, fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{c.brand[0]}</div>
                <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "#ECFDF5", color: "#065F46", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>NEW</span>
              </div>
              <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>{c.brand}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: "0.625rem" }}>Budget: {c.budget}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: c.match >= 90 ? "#10B981" : "#2563EB" }}>
                  <Zap size={12} />{c.match}%
                </span>
                <button style={{ padding: "0.3rem 0.625rem", borderRadius: "0.375rem", background: "#2563EB", color: "#fff", border: "none", fontFamily: f.b, fontSize: "0.72rem", fontWeight: 500 }}>Apply</button>
              </div>
            </div>
          ))}
        </MobileScroll>

        {/* Activity */}
        <div style={{ padding: "0.875rem 1.125rem 1.5rem" }}>
          <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.625rem" }}>Recent activity</p>
          {[
            { text: "GlowLab sent a campaign invite", time: "2h ago", color: "#EC4899" },
            { text: "Reel #2 approved by GlowLab", time: "4h ago", color: "#10B981" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: "0.625rem", padding: "0.625rem 0", borderBottom: i === 0 ? "1px solid var(--border)" : "none" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color }} />
              </div>
              <div>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--foreground)" }}>{a.text}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MobileBottomNav items={influencerNav} active="home" />
    </div>
  );
}

/* ═══ DISCOVER CAMPAIGNS ═══ */
export function MobileDiscoverCampaigns() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--background)", overflow: "hidden" }}>
      <StatusBar />
      <MobileHeader
        title={<span style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>Discover</span>}
        right={<button style={{ width: 32, height: 32, borderRadius: "0.5rem", background: "var(--muted)", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}><Filter size={15} style={{ color: "var(--muted-foreground)" }} /></button>}
      />

      {/* Search */}
      <div style={{ padding: "0.75rem 1.125rem", background: "var(--card)", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} />
          <div style={{ height: "2.5rem", borderRadius: "0.625rem", border: "1px solid var(--border)", background: "var(--background)", paddingLeft: "2.5rem", display: "flex", alignItems: "center" }}>
            <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Search campaigns…</span>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <MobileScroll>
          <div style={{ padding: "0.625rem 0" }}>
            {["All ✓", "Instagram", "Beauty", "5K+ MAD", "Nano"].map((chip, i) => (
              <button key={chip} style={{ display: "inline-flex", padding: "0.375rem 0.875rem", borderRadius: "2rem", border: `1.5px solid ${i === 0 ? "#2563EB" : "var(--border)"}`, background: i === 0 ? "#EFF6FF" : "var(--card)", color: i === 0 ? "#2563EB" : "var(--foreground)", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: i === 0 ? 500 : 400, cursor: "pointer", flexShrink: 0, marginLeft: i === 0 ? 0 : "0.375rem" }}>
                {chip}
              </button>
            ))}
            <div style={{ width: 12, flexShrink: 0 }} />
          </div>
        </MobileScroll>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", background: "var(--card)", flexShrink: 0 }}>
        {["All (24)", "Recommended (8)", "Saved (3)"].map((t, i) => (
          <button key={t} style={{ flex: 1, padding: "0.625rem 0", fontFamily: f.b, fontSize: "0.8rem", color: i === 0 ? "#2563EB" : "var(--muted-foreground)", background: "none", border: "none", borderBottom: `2px solid ${i === 0 ? "#2563EB" : "transparent"}`, cursor: "pointer", fontWeight: i === 0 ? 500 : 400 }}>{t}</button>
        ))}
      </div>

      {/* Campaign list */}
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "0.875rem 1.125rem" }}>
        {[
          { brand: "GlowLab Morocco", cat: "Beauty & Skincare", budget: "5 000 MAD", match: 96, status: "NEW", color: "#EC4899", platforms: ["IG","TK"] },
          { brand: "AtlasBrand",      cat: "Fashion",           budget: "3 500 MAD", match: 88, status: "",    color: "#2563EB", platforms: ["IG"] },
          { brand: "NovaBio",         cat: "Wellness",          budget: "4 200 MAD", match: 82, status: "",    color: "#10B981", platforms: ["IG","YT"] },
        ].map((c, i) => (
          <div key={c.brand} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1rem", marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.625rem" }}>
              <div style={{ display: "flex", gap: "0.625rem" }}>
                <div style={{ width: 34, height: 34, borderRadius: "0.5rem", background: `${c.color}18`, color: c.color, fontFamily: f.h, fontWeight: 700, fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.brand[0]}</div>
                <div>
                  <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{c.brand}</p>
                  <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>{c.cat}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.375rem" }}>
                {c.status && <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "#FCE7F3", color: "#BE185D", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>{c.status}</span>}
                <button style={{ width: 26, height: 26, borderRadius: "0.375rem", background: "var(--muted)", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bookmark size={12} style={{ color: "var(--muted-foreground)" }} />
                </button>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                {c.platforms.map((p) => <span key={p} style={{ padding: "0.175rem 0.5rem", borderRadius: 999, background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.68rem", fontWeight: 700 }}>{p}</span>)}
                <span style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600, color: "var(--foreground)" }}>{c.budget}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: c.match >= 90 ? "#10B981" : "#2563EB", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                  <Zap size={11} />{c.match}%
                </span>
                <button style={{ padding: "0.375rem 0.625rem", borderRadius: "0.375rem", background: "#2563EB", color: "#fff", border: "none", fontFamily: f.b, fontSize: "0.75rem", fontWeight: 500 }}>Apply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MobileBottomNav items={influencerNav} active="explore" />
    </div>
  );
}

/* ═══ MARKETPLACE ═══ */
export function MobileMarketplace() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--background)", overflow: "hidden" }}>
      <StatusBar />
      <MobileHeader
        title={<span style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>Marketplace</span>}
        right={<button style={{ width: 32, height: 32, borderRadius: "0.5rem", background: "var(--muted)", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}><Filter size={15} style={{ color: "var(--muted-foreground)" }} /></button>}
      />

      {/* Info strip */}
      <div style={{ padding: "0.625rem 1.125rem", background: "#EDE9FE", borderBottom: "1px solid #DDD6FE", flexShrink: 0 }}>
        <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "#5B21B6" }}>💡 Receive products in exchange for authentic content — no cash required.</p>
      </div>

      {/* Category chips */}
      <div style={{ borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <MobileScroll>
          <div style={{ padding: "0.625rem 0" }}>
            {["All", "Beauty", "Fashion", "Wellness", "Tech", "Food"].map((cat, i) => (
              <button key={cat} style={{ display: "inline-flex", padding: "0.375rem 0.875rem", borderRadius: "2rem", border: `1.5px solid ${i === 0 ? "#EC4899" : "var(--border)"}`, background: i === 0 ? "#FCE7F3" : "var(--card)", color: i === 0 ? "#BE185D" : "var(--foreground)", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: i === 0 ? 500 : 400, cursor: "pointer", flexShrink: 0, marginLeft: i === 0 ? 0 : "0.375rem" }}>
                {cat}
              </button>
            ))}
            <div style={{ width: 12, flexShrink: 0 }} />
          </div>
        </MobileScroll>
      </div>

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        <div style={{ padding: "0.875rem 1.125rem" }}>
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginBottom: "0.875rem" }}>7 products available</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[
              { brand: "GlowLab Morocco", name: "Sérum Éclat", value: 350, bg: ["#FCE7F3","#EDE9FE"], color: "#EC4899", avail: "available" },
              { brand: "AtlasBrand",      name: "SS24 Capsule", value: 890, bg: ["#DBEAFE","#EDE9FE"], color: "#2563EB", avail: "limited" },
              { brand: "NovaBio",         name: "Protein Kit",  value: 620, bg: ["#D1FAE5","#DBEAFE"], color: "#10B981", avail: "available" },
              { brand: "Argan Origins",   name: "Argan Oil Set", value: 280, bg: ["#FEF3C7","#FCE7F3"], color: "#D97706", avail: "limited" },
            ].map((p) => (
              <div key={p.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.75rem", overflow: "hidden" }}>
                <div style={{ height: 100, background: `linear-gradient(135deg,${p.bg[0]},${p.bg[1]})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Package size={26} style={{ color: p.color, opacity: 0.7 }} />
                </div>
                <div style={{ padding: "0.625rem" }}>
                  <p style={{ fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600, color: p.color, marginBottom: 2 }}>{p.brand}</p>
                  <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.8125rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>{p.name}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{p.value} <span style={{ fontFamily: f.b, fontWeight: 400, fontSize: "0.6rem", color: "var(--muted-foreground)" }}>MAD</span></span>
                    <span style={{ padding: "0.1rem 0.375rem", borderRadius: 999, background: p.avail === "available" ? "#D1FAE5" : "#FEF3C7", color: p.avail === "available" ? "#065F46" : "#92400E", fontFamily: f.b, fontSize: "0.6rem", fontWeight: 600 }}>
                      {p.avail === "available" ? "Free" : "Limited"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MobileBottomNav items={influencerNav} active="explore" />
    </div>
  );
}

/* ═══ MY APPLICATIONS ═══ */
export function MobileApplications() {
  const statuses = [
    { key: "all",      label: "All (5)",      active: true },
    { key: "revision", label: "Revision (1)", active: false },
    { key: "accepted", label: "Accepted (2)", active: false },
    { key: "pending",  label: "Pending (2)",  active: false },
  ];
  const apps = [
    { brand: "GlowLab Morocco", title: "Summer Skincare Lancement", status: "revision", pay: "5 000 MAD", color: "#EC4899", date: "4 juin" },
    { brand: "AtlasBrand",      title: "Summer Collection SS24",    status: "accepted", pay: "3 500 MAD", color: "#2563EB", date: "8 juin" },
    { brand: "NovaBio",         title: "Wellness Reset Programme",  status: "pending",  pay: "4 200 MAD", color: "#10B981", date: "12 juin" },
    { brand: "MarocTech",       title: "App Launch — #TechMa",     status: "completed",pay: "2 800 MAD", color: "#7C3AED", date: "Done" },
  ];
  const statusCfg: Record<string,{label:string;color:string;bg:string}> = {
    revision:  { label: "Revision",   color: "#C2410C", bg: "#FFEDD5" },
    accepted:  { label: "Accepted",   color: "#1D4ED8", bg: "#DBEAFE" },
    pending:   { label: "Pending",    color: "#92400E", bg: "#FEF3C7" },
    completed: { label: "Completed",  color: "#065F46", bg: "#D1FAE5" },
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--background)", overflow: "hidden" }}>
      <StatusBar />
      <MobileHeader
        title={<span style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>Applications</span>}
        right={<span style={{ padding: "0.2rem 0.5rem", borderRadius: 999, background: "#FFEDD5", color: "#C2410C", fontFamily: f.b, fontSize: "0.72rem", fontWeight: 700 }}>1 needs action</span>}
      />
      {/* Status tabs */}
      <div style={{ borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <MobileScroll>
          <div style={{ display: "flex", gap: 0, padding: "0" }}>
            {statuses.map((s) => (
              <button key={s.key} style={{ padding: "0.625rem 1rem", fontFamily: f.b, fontSize: "0.8125rem", color: s.active ? "#2563EB" : "var(--muted-foreground)", background: "none", border: "none", borderBottom: `2px solid ${s.active ? "#2563EB" : "transparent"}`, cursor: "pointer", fontWeight: s.active ? 500 : 400, whiteSpace: "nowrap" }}>
                {s.label}
              </button>
            ))}
          </div>
        </MobileScroll>
      </div>
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "0.875rem 1.125rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {apps.map((app) => {
          const sc = statusCfg[app.status] ?? statusCfg.pending;
          const needsAction = app.status === "revision";
          return (
            <div key={app.brand} style={{ background: "var(--card)", border: `1px solid ${needsAction ? "rgba(249,115,22,0.3)" : "var(--border)"}`, borderRadius: "0.875rem", padding: "0.875rem", position: "relative" }}>
              {needsAction && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#F97316,#F59E0B)", borderRadius: "0.875rem 0.875rem 0 0" }} />}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <div style={{ display: "flex", gap: "0.625rem" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "0.5rem", background: `${app.color}18`, color: app.color, fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{app.brand[0]}</div>
                  <div>
                    <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{app.brand}</p>
                    <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>{app.title}</p>
                  </div>
                </div>
                <span style={{ padding: "0.2rem 0.5rem", borderRadius: 999, background: sc.bg, color: sc.color, fontFamily: f.b, fontSize: "0.68rem", fontWeight: 600, flexShrink: 0 }}>{sc.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{app.pay}</span>
                  <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: "0.2rem" }}><Calendar size={11} />{app.date}</span>
                </div>
                <button style={{ padding: "0.3125rem 0.625rem", borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--primary)", fontFamily: f.b, fontSize: "0.75rem", fontWeight: 500, cursor: "pointer" }}>
                  View <ChevronRight size={11} style={{ display: "inline" }} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <MobileBottomNav items={influencerNav} active="profile" />
    </div>
  );
}

/* ═══ AI COACH ═══ */
export function MobileAICoach() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--background)", overflow: "hidden" }}>
      <StatusBar />
      <MobileHeader
        left={
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <Sparkles size={17} style={{ color: "#7C3AED" }} />
            <span style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>AI Coach</span>
          </div>
        }
        right={<span style={{ padding: "0.2rem 0.5rem", borderRadius: 999, background: "#EDE9FE", color: "#7C3AED", fontFamily: f.b, fontSize: "0.72rem", fontWeight: 700 }}>7 insights</span>}
      />
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {/* Score card */}
        <div style={{ margin: "0.875rem 1.125rem", background: "linear-gradient(135deg,#5B21B6,#7C3AED)", borderRadius: "1rem", padding: "1.125rem", boxShadow: "0 6px 20px rgba(124,58,237,0.25)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <svg width={72} height={72} viewBox="0 0 72 72" style={{ flexShrink: 0 }}>
              <circle cx={36} cy={36} r={28} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={6} />
              <circle cx={36} cy={36} r={28} fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round"
                strokeDasharray={`${(87/100)*2*Math.PI*28} ${2*Math.PI*28*(1-87/100)}`} strokeDashoffset={2*Math.PI*28/4}
              />
              <text x={36} y={41} textAnchor="middle" style={{ fontFamily: f.h, fontWeight: 800, fontSize: "0.9rem", fill: "#fff" }}>87</text>
            </svg>
            <div>
              <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>IA Score</p>
              <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: "#fff" }}>Excellent</p>
              <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "rgba(255,255,255,0.65)" }}>Top 18% · +4 pts this week</p>
              <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Link TikTok → +8 more pts</p>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div style={{ padding: "0 1.125rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {[
            { priority: "critical", title: "Link TikTok account",          desc: "+8 pts · Unlocks 40% more campaigns",    color: "#991B1B", bg: "#FEE2E2", accent: "#EF4444" },
            { priority: "high",     title: "2 invitations waiting",        desc: "Expire in 2 days — don't miss them",     color: "#C2410C", bg: "#FFEDD5", accent: "#F97316" },
            { priority: "medium",   title: "Add portfolio examples",       desc: "+5 pts · 3× more brand invitations",     color: "#5B21B6", bg: "#EDE9FE", accent: "#7C3AED" },
            { priority: "good",     title: "Engagement rate 8.3%",         desc: "Top 12% — you qualify for premium tiers",color: "#065F46", bg: "#D1FAE5", accent: "#10B981" },
          ].map((ins) => (
            <div key={ins.title} style={{ background: "var(--card)", border: `1px solid var(--border)`, borderRadius: "0.75rem", padding: "0.875rem", borderLeft: `3px solid ${ins.accent}` }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>{ins.title}</p>
                <span style={{ padding: "0.1rem 0.375rem", borderRadius: 999, background: ins.bg, color: ins.color, fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{ins.priority === "good" ? "Good" : ins.priority === "critical" ? "Action" : ins.priority === "high" ? "Soon" : "Tip"}</span>
              </div>
              <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{ins.desc}</p>
            </div>
          ))}
        </div>

        {/* Ask AI Coach */}
        <div style={{ margin: "0.875rem 1.125rem 0.5rem" }}>
          <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.625rem" }}>Ask AI Coach</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            {["How can I improve my score?", "Which campaign to apply to first?"].map((q) => (
              <button key={q} style={{ padding: "0.5rem 0.875rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.8rem", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {q} <ChevronRight size={13} style={{ flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>

        {/* Chat input preview */}
        <div style={{ margin: "0 1.125rem 1.5rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div style={{ flex: 1, height: "2.5rem", borderRadius: "1.25rem", border: "1px solid var(--border)", background: "var(--input-background)", display: "flex", alignItems: "center", padding: "0 0.875rem" }}>
            <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Ask anything…</span>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ArrowRight size={16} color="#fff" />
          </div>
        </div>
      </div>
      <MobileBottomNav items={influencerNav} active="profile" />
    </div>
  );
}
