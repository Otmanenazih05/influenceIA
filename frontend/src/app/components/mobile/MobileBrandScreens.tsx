import {
  LayoutDashboard, Megaphone, Plus, Users, Building2, Bell,
  Sparkles, TrendingUp, CheckCircle, AlertCircle, CreditCard,
  ChevronRight, Search, Filter, Zap, Bookmark, Instagram, Play,
  ArrowRight,
} from "lucide-react";
import { StatusBar, MobileBottomNav, MobileHeader, KpiChip, MobileScroll, f } from "./PhoneFrame";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const brandNav = [
  { id: "home",     label: "Home",     icon: <LayoutDashboard size={20} /> },
  { id: "campaigns",label: "Campaigns", icon: <Megaphone size={20} /> },
  { id: "add",      label: "",          icon: <Plus size={22} />, primary: true },
  { id: "creators", label: "Creators",  icon: <Users size={20} /> },
  { id: "account",  label: "Account",   icon: <Building2 size={20} /> },
];

const miniChart = [{ v: 12000 },{ v: 19000 },{ v: 16000 },{ v: 28000 },{ v: 24000 },{ v: 38000 },{ v: 45000 }];

/* ═══ BRAND DASHBOARD ═══ */
export function MobileBrandDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--background)", overflow: "hidden" }}>
      <StatusBar />
      {/* Header */}
      <MobileHeader
        left={
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
            <div style={{ width: 32, height: 32, borderRadius: "0.375rem", background: "#1E40AF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", color: "#fff" }}>G</span>
            </div>
          </div>
        }
      />

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {/* Greeting */}
        <div style={{ padding: "1rem 1.125rem 0.75rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", letterSpacing: "-0.02em" }}>Good morning, GlowLab 👋</p>
          <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginTop: 2 }}>4 active campaigns · 7 pending approvals</p>
        </div>

        <div style={{ padding: "0.875rem 1.125rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {/* KPI chips 2x2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <KpiChip label="Active Campaigns"  value="4"       color="#2563EB" />
            <KpiChip label="Creators Engaged"  value="23"      color="#7C3AED" />
            <KpiChip label="Avg ROI"            value="3.4×"   color="#10B981" />
            <KpiChip label="Pending Approvals"  value="7"      color="#EF4444" />
          </div>

          {/* Performance chart */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <div>
                <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>Performance</p>
                <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>Impressions — May → Jun</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <TrendingUp size={13} style={{ color: "#10B981" }} />
                <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "#10B981" }}>+32%</span>
              </div>
            </div>
            <div style={{ height: 80 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={miniChart} margin={{ top: 2, right: 2, bottom: 0, left: 0 }}>
                  <Area type="monotone" dataKey="v" stroke="#2563EB" strokeWidth={2.5} fill="rgba(37,99,235,0.08)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Campaign status scroll */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.625rem" }}>
              <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>Campaigns</p>
              <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: "#2563EB", fontWeight: 500 }}>See all</span>
            </div>
          </div>
        </div>

        <MobileScroll>
          {[
            { title: "Skincare Lancement", status: "active",    col: "#10B981", applicants: 14, roi: "3.8×" },
            { title: "Summer Collection",  status: "active",    col: "#2563EB", applicants: 28, roi: "—" },
            { title: "App Launch",         status: "completed", col: "#7C3AED", applicants: 31, roi: "4.1×" },
          ].map((c) => (
            <div key={c.title} style={{ flexShrink: 0, width: 175, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "0.875rem", borderTop: `3px solid ${c.col}` }}>
              <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.8125rem", color: "var(--foreground)", marginBottom: "0.25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</p>
              <div style={{ display: "flex", gap: "0.625rem", marginBottom: "0.5rem" }}>
                <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: c.status === "active" ? "#D1FAE5" : "#EDE9FE", color: c.status === "active" ? "#065F46" : "#5B21B6", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>{c.status === "active" ? "Active" : "Done"}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.375rem" }}>
                <div style={{ textAlign: "center", padding: "0.375rem", background: "var(--background)", borderRadius: "0.375rem", border: "1px solid var(--border)" }}>
                  <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{c.applicants}</p>
                  <p style={{ fontFamily: f.b, fontSize: "0.6rem", color: "var(--muted-foreground)" }}>applied</p>
                </div>
                <div style={{ textAlign: "center", padding: "0.375rem", background: "var(--background)", borderRadius: "0.375rem", border: "1px solid var(--border)" }}>
                  <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: c.roi !== "—" ? "#10B981" : "var(--muted-foreground)" }}>{c.roi}</p>
                  <p style={{ fontFamily: f.b, fontSize: "0.6rem", color: "var(--muted-foreground)" }}>ROI</p>
                </div>
              </div>
            </div>
          ))}
        </MobileScroll>

        {/* Activity */}
        <div style={{ padding: "0.875rem 1.125rem 1.5rem" }}>
          <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.625rem" }}>Activity</p>
          {[
            { text: "Sarah B. applied — 96% match", time: "2h ago", color: "#EC4899", icon: <Users size={12} /> },
            { text: "Fatima O. submitted Reel #2", time: "3h ago", color: "#10B981", icon: <CheckCircle size={12} /> },
            { text: "Revision needed on Reel #1", time: "4h ago", color: "#F97316", icon: <AlertCircle size={12} /> },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", gap: "0.625rem", padding: "0.625rem 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: a.color, flexShrink: 0 }}>
                {a.icon}
              </div>
              <div>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--foreground)" }}>{a.text}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MobileBottomNav items={brandNav} active="home" />
    </div>
  );
}

/* ═══ BRAND MY CAMPAIGNS ═══ */
export function MobileBrandCampaigns() {
  const campaigns = [
    { title: "Summer Skincare Lancement", cat: "Beauty & Skincare", platforms: ["IG","TK"], budget: 25000, spent: 50, status: "active",    applicants: 14, accepted: 5, review: 3, color: "#EC4899" },
    { title: "Summer Collection SS24",    cat: "Fashion",           platforms: ["IG"],     budget: 17500, spent: 40, status: "active",    applicants: 28, accepted: 5, review: 2, color: "#2563EB" },
    { title: "Wellness Reset",            cat: "Health",            platforms: ["IG","YT"],budget: 21000, spent: 0,  status: "reviewing", applicants: 19, accepted: 0, review: 0, color: "#10B981" },
    { title: "App Launch — #TechMa",     cat: "Tech",              platforms: ["TK","IG"],budget: 14000, spent: 100,status: "completed", applicants: 31, accepted: 5, review: 0, color: "#7C3AED" },
  ];
  const statusCfg: Record<string,{label:string;color:string;bg:string}> = {
    active:    { label: "Active",    color: "#065F46", bg: "#D1FAE5" },
    reviewing: { label: "Reviewing", color: "#92400E", bg: "#FEF3C7" },
    completed: { label: "Completed", color: "#5B21B6", bg: "#EDE9FE" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--background)", overflow: "hidden" }}>
      <StatusBar />
      <MobileHeader
        title={<span style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>My Campaigns</span>}
        right={
          <button style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.375rem 0.75rem", borderRadius: "0.5rem", background: "#2563EB", color: "#fff", border: "none", fontFamily: f.b, fontSize: "0.75rem", fontWeight: 500 }}>
            <Plus size={13} /> New
          </button>
        }
      />

      {/* Status filter */}
      <div style={{ borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <MobileScroll>
          <div style={{ display: "flex", padding: "0" }}>
            {["All (5)", "Active (2)", "Reviewing (1)", "Completed (1)", "Draft (1)"].map((t, i) => (
              <button key={t} style={{ padding: "0.625rem 0.875rem", fontFamily: f.b, fontSize: "0.8rem", color: i === 0 ? "#2563EB" : "var(--muted-foreground)", background: "none", border: "none", borderBottom: `2px solid ${i === 0 ? "#2563EB" : "transparent"}`, cursor: "pointer", fontWeight: i === 0 ? 500 : 400, whiteSpace: "nowrap" }}>
                {t}
              </button>
            ))}
          </div>
        </MobileScroll>
      </div>

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "0.875rem 1.125rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {campaigns.map((c) => {
          const sc = statusCfg[c.status] ?? statusCfg.active;
          const reviewUrgent = c.review > 0;
          return (
            <div key={c.title} style={{ background: "var(--card)", border: `1px solid ${reviewUrgent ? "rgba(249,115,22,0.3)" : "var(--border)"}`, borderRadius: "0.875rem", padding: "1rem", position: "relative", overflow: "hidden" }}>
              {reviewUrgent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#F97316,#F59E0B)" }} />}
              {/* Row 1 */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</p>
                  <div style={{ display: "flex", gap: "0.375rem", marginTop: 3 }}>
                    {c.platforms.map((p) => <span key={p} style={{ padding: "0.1rem 0.375rem", borderRadius: 999, background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>{p}</span>)}
                    <span style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)" }}>{c.cat}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0, marginLeft: 8 }}>
                  {reviewUrgent && <span style={{ padding: "0.15rem 0.4rem", borderRadius: 999, background: "#FFEDD5", color: "#C2410C", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>{c.review} review</span>}
                  <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: sc.bg, color: sc.color, fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>{sc.label}</span>
                </div>
              </div>
              {/* Stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.375rem", marginBottom: "0.625rem" }}>
                {[
                  { l: "Applied", v: String(c.applicants) },
                  { l: "Accepted", v: `${c.accepted}/8` },
                  { l: "Budget", v: `${(c.budget/1000).toFixed(0)}K MAD` },
                ].map((m) => (
                  <div key={m.l} style={{ textAlign: "center", padding: "0.375rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.375rem" }}>
                    <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.8125rem", color: "var(--foreground)" }}>{m.v}</p>
                    <p style={{ fontFamily: f.b, fontSize: "0.6rem", color: "var(--muted-foreground)" }}>{m.l}</p>
                  </div>
                ))}
              </div>
              {/* Budget progress */}
              <div style={{ height: 4, borderRadius: 999, background: "var(--muted)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${c.spent}%`, borderRadius: 999, background: c.spent === 100 ? "#10B981" : c.spent > 75 ? "#F59E0B" : "#2563EB" }} />
              </div>
            </div>
          );
        })}
      </div>
      <MobileBottomNav items={brandNav} active="campaigns" />
    </div>
  );
}

/* ═══ DISCOVER CREATORS ═══ */
export function MobileDiscoverCreators() {
  const creators = [
    { name: "Sarah Benjelloun", handle: "@sarah_bj",   niche: "Lifestyle · Beauty", followers: "98.4K", eng: "8.3%", score: 87, match: 96, color: "#EC4899", tier: "Micro" },
    { name: "Lina Zahra",       handle: "@linaz.beauty",niche: "Beauty · Wellness",  followers: "67.2K", eng: "6.1%", score: 79, match: 91, color: "#7C3AED", tier: "Micro" },
    { name: "Amina Rifi",       handle: "@amina.rifi",  niche: "Fitness · Lifestyle",followers: "35.9K", eng: "9.4%", score: 74, match: 84, color: "#2563EB", tier: "Nano" },
    { name: "Fatima Ouali",     handle: "@fatima.w",    niche: "Wellness · Nutrition",followers: "23.3K", eng: "8.9%", score: 77, match: 88, color: "#059669", tier: "Nano" },
    { name: "Karim El Amrani",  handle: "@karim.tech",  niche: "Tech · Education",   followers: "189K",  eng: "4.8%", score: 81, match: 71, color: "#0EA5E9", tier: "Macro" },
  ];
  const tierCfg: Record<string,{color:string;bg:string}> = {
    Nano:  { color: "#BE185D", bg: "#FCE7F3" },
    Micro: { color: "#5B21B6", bg: "#EDE9FE" },
    Macro: { color: "#1D4ED8", bg: "#DBEAFE" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--background)", overflow: "hidden" }}>
      <StatusBar />
      <MobileHeader
        title={<span style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>Discover Creators</span>}
        right={<button style={{ width: 32, height: 32, borderRadius: "0.5rem", background: "var(--muted)", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}><Filter size={15} style={{ color: "var(--muted-foreground)" }} /></button>}
      />

      {/* Search */}
      <div style={{ padding: "0.75rem 1.125rem", background: "var(--card)", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ height: "2.5rem", borderRadius: "0.625rem", border: "1px solid var(--border)", background: "var(--background)", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0 0.75rem" }}>
          <Search size={15} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
          <span style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Search creators…</span>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <MobileScroll>
          <div style={{ padding: "0.625rem 0" }}>
            {["All", "Morocco", "Beauty", "Nano", "Score 80+"].map((chip, i) => (
              <button key={chip} style={{ display: "inline-flex", padding: "0.375rem 0.875rem", borderRadius: "2rem", border: `1.5px solid ${i === 0 ? "#2563EB" : "var(--border)"}`, background: i === 0 ? "#EFF6FF" : "var(--card)", color: i === 0 ? "#2563EB" : "var(--foreground)", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: i === 0 ? 500 : 400, cursor: "pointer", flexShrink: 0, marginLeft: i === 0 ? 0 : "0.375rem" }}>
                {chip}
              </button>
            ))}
            <div style={{ width: 12, flexShrink: 0 }} />
          </div>
        </MobileScroll>
      </div>

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "0.75rem 1.125rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>8 creators found</p>
        {creators.map((c) => {
          const tc = tierCfg[c.tier] ?? tierCfg.Micro;
          const matchColor = c.match >= 90 ? "#10B981" : c.match >= 80 ? "#2563EB" : "#7C3AED";
          return (
            <div key={c.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "0.875rem", display: "flex", alignItems: "center", gap: "0.875rem" }}>
              {/* Avatar */}
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${c.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: c.color, fontFamily: f.h, fontWeight: 700, fontSize: "1rem", flexShrink: 0, border: "2px solid var(--border)" }}>
                {c.name[0]}
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.2rem" }}>
                  <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>{c.name}</p>
                  <span style={{ padding: "0.1rem 0.375rem", borderRadius: 999, background: tc.bg, color: tc.color, fontFamily: f.b, fontSize: "0.62rem", fontWeight: 700, flexShrink: 0 }}>{c.tier}</span>
                </div>
                <p style={{ fontFamily: f.b, fontSize: "0.72rem", color: "var(--muted-foreground)", marginBottom: "0.375rem" }}>{c.niche}</p>
                <div style={{ display: "flex", gap: "0.625rem" }}>
                  <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--foreground)", fontWeight: 500 }}>{c.followers}</span>
                  <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "#10B981", fontWeight: 500 }}>{c.eng}</span>
                </div>
              </div>
              {/* Score + actions */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.5rem", borderRadius: 999, background: "#EDE9FE" }}>
                  <Zap size={11} style={{ color: "#7C3AED" }} />
                  <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.78rem", color: "#7C3AED" }}>{c.score}</span>
                </div>
                <div style={{ display: "flex", gap: "0.375rem" }}>
                  <button style={{ width: 28, height: 28, borderRadius: "0.375rem", background: "var(--muted)", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Bookmark size={13} style={{ color: "var(--muted-foreground)" }} />
                  </button>
                  <button style={{ padding: "0.25rem 0.5rem", borderRadius: "0.375rem", background: "#2563EB", color: "#fff", border: "none", fontFamily: f.b, fontSize: "0.72rem", fontWeight: 500, cursor: "pointer" }}>
                    Invite
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <MobileBottomNav items={brandNav} active="creators" />
    </div>
  );
}
