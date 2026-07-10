import { useState } from "react";
import {
  LayoutDashboard, Users, Megaphone, MessageSquare, BarChart2,
  CreditCard, Settings, Search, Bell, ChevronDown, ChevronRight,
  Home, Sparkles
} from "lucide-react";
import { SectionHeader, SubSection, DSCard } from "./DSLayout";

/* ─── Top Navbar ─── */
function TopNavbar() {
  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
    >
      <div
        style={{
          height: "3.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.25rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            <Sparkles size={13} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)" }}>
            Influenc<span style={{ color: "var(--brand-blue)" }}>IA</span>
          </span>
        </div>

        {/* Center nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {["Dashboard", "Campaigns", "Influencers", "Analytics"].map((item, i) => (
            <a
              key={item}
              href="#"
              style={{
                padding: "0.375rem 0.75rem",
                borderRadius: "0.375rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                fontWeight: i === 0 ? 500 : 400,
                color: i === 0 ? "var(--primary)" : "var(--muted-foreground)",
                background: i === 0 ? "var(--secondary)" : "transparent",
                textDecoration: "none",
              }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            style={{
              width: 34, height: 34, borderRadius: "0.5rem",
              background: "var(--muted)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--muted-foreground)",
            }}
          >
            <Search size={15} />
          </button>
          <button
            style={{
              width: 34, height: 34, borderRadius: "0.5rem",
              background: "var(--muted)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--muted-foreground)", position: "relative",
            }}
          >
            <Bell size={15} />
            <span
              style={{
                position: "absolute", top: 6, right: 6, width: 7, height: 7,
                borderRadius: "50%", background: "var(--brand-pink)",
                border: "2px solid var(--card)",
              }}
            />
          </button>
          <div
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer",
              padding: "0.25rem 0.5rem", borderRadius: "2rem",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.7rem" }}>Y</span>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "var(--foreground)", fontWeight: 500 }}>Yassine</span>
            <ChevronDown size={12} style={{ color: "var(--muted-foreground)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sidebar ─── */
function SidebarPreview() {
  const [active, setActive] = useState("Dashboard");
  const items = [
    { label: "Dashboard",    icon: <LayoutDashboard size={16} /> },
    { label: "Rechercher",   icon: <Search size={16} /> },
    { label: "Influenceurs", icon: <Users size={16} /> },
    { label: "Campagnes",    icon: <Megaphone size={16} /> },
    { label: "Messages",     icon: <MessageSquare size={16} /> },
    { label: "Analytics",    icon: <BarChart2 size={16} /> },
    { label: "Paiements",    icon: <CreditCard size={16} /> },
    { label: "Paramètres",   icon: <Settings size={16} /> },
  ];
  return (
    <div
      className="bg-sidebar border border-sidebar-border rounded-xl p-3"
      style={{ width: 184, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center gap-2 px-2 py-2 mb-2">
        <div
          style={{ width: 26, height: 26, borderRadius: "0.5rem", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Sparkles size={12} color="#fff" />
        </div>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.8125rem", color: "var(--sidebar-foreground)" }}>
          Influenc<span style={{ color: "var(--brand-blue)" }}>IA</span>
        </span>
      </div>
      <nav className="space-y-0.5">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.5rem 0.625rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              background: active === item.label ? "var(--sidebar-primary)" : "transparent",
              color: active === item.label ? "var(--sidebar-primary-foreground)" : "var(--sidebar-foreground)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8125rem",
              fontWeight: active === item.label ? 500 : 400,
              textAlign: "left",
            }}
          >
            <span style={{ opacity: active === item.label ? 1 : 0.6 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ─── Tab Switcher ─── */
function TabSwitcher() {
  const [tab, setTab] = useState(0);
  const tabs = ["Vue d'ensemble", "Performances", "Influenceurs", "Paramètres"];
  return (
    <div>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border)",
          gap: 0,
        }}
      >
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              padding: "0.625rem 1rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              fontWeight: tab === i ? 500 : 400,
              color: tab === i ? "var(--primary)" : "var(--muted-foreground)",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${tab === i ? "var(--primary)" : "transparent"}`,
              marginBottom: -1,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        style={{
          padding: "1rem",
          background: "var(--muted)",
          borderRadius: "0 0 0.5rem 0.5rem",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.8125rem",
          color: "var(--muted-foreground)",
        }}
      >
        Content for: <strong style={{ color: "var(--foreground)" }}>{tabs[tab]}</strong>
      </div>
    </div>
  );
}

/* ─── Breadcrumb ─── */
function Breadcrumb() {
  const crumbs = ["Dashboard", "Campaigns", "Lancement Produit"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
      {crumbs.map((c, i) => (
        <div key={c} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          {i > 0 && <ChevronRight size={13} style={{ color: "var(--muted-foreground)" }} />}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              color: i === crumbs.length - 1 ? "var(--foreground)" : "var(--muted-foreground)",
              fontWeight: i === crumbs.length - 1 ? 500 : 400,
              cursor: i < crumbs.length - 1 ? "pointer" : "default",
            }}
          >
            {i === 0 && <Home size={13} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />}
            {c}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Pagination ─── */
function Pagination() {
  const [page, setPage] = useState(3);
  const total = 8;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem" }}
      >
        ← Prev
      </button>
      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          style={{
            width: 32, height: 32, borderRadius: "0.375rem",
            border: `1px solid ${page === i + 1 ? "var(--primary)" : "var(--border)"}`,
            background: page === i + 1 ? "var(--primary)" : "var(--card)",
            color: page === i + 1 ? "#fff" : "var(--muted-foreground)",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", fontWeight: page === i + 1 ? 600 : 400,
          }}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(total, page + 1))}
        style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem" }}
      >
        Next →
      </button>
    </div>
  );
}

export function NavigationSection() {
  return (
    <div>
      <SectionHeader
        title="Navigation"
        description="Top navbar, collapsible sidebar, tab switcher, breadcrumb, and pagination patterns."
      />

      <SubSection title="Top Navbar">
        <TopNavbar />
      </SubSection>

      <SubSection title="Sidebar">
        <div className="flex gap-4 flex-wrap">
          <SidebarPreview />
          <div
            className="flex-1 bg-card border border-border rounded-xl p-4"
            style={{ minWidth: 200 }}
          >
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: 8 }}>
              Sidebar Rules
            </p>
            <ul style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.7, paddingLeft: "1rem" }}>
              <li>Active state: `var(--sidebar-primary)` background</li>
              <li>Icon opacity 60% for inactive items</li>
              <li>Width: 240px desktop, 100% mobile sheet</li>
              <li>Collapsed mode: 60px icon-only on tablet</li>
              <li>Bottom: avatar + username + settings</li>
            </ul>
          </div>
        </div>
      </SubSection>

      <SubSection title="Tab Switcher">
        <DSCard>
          <TabSwitcher />
        </DSCard>
      </SubSection>

      <SubSection title="Breadcrumb">
        <DSCard>
          <Breadcrumb />
        </DSCard>
      </SubSection>

      <SubSection title="Pagination">
        <DSCard>
          <Pagination />
        </DSCard>
      </SubSection>
    </div>
  );
}
