import { useState } from "react";
import { PhoneFrame } from "../components/mobile/PhoneFrame";
import { MobileHomeScreen, MobileLoginScreen, MobileRegisterScreen } from "../components/mobile/MobileMarketingScreens";
import { MobileInfluencerDashboard, MobileDiscoverCampaigns, MobileMarketplace, MobileApplications, MobileAICoach } from "../components/mobile/MobileInfluencerScreens";
import { MobileBrandDashboard, MobileBrandCampaigns, MobileDiscoverCreators } from "../components/mobile/MobileBrandScreens";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

type Category = "marketing" | "influencer" | "brand";

const categories: { id: Category; label: string; desc: string }[] = [
  { id: "marketing",  label: "Marketing & Auth",  desc: "Public landing page, login, and onboarding" },
  { id: "influencer", label: "Influencer App",    desc: "Creator dashboard and core workflows" },
  { id: "brand",      label: "Brand App",         desc: "Brand control center and campaign management" },
];

const screens: Record<Category, { label: string; desc: string; component: React.ReactNode }[]> = {
  marketing: [
    { label: "Home",       desc: "Hero + product preview",        component: <MobileHomeScreen /> },
    { label: "Login",      desc: "Split brand + form layout",     component: <MobileLoginScreen /> },
    { label: "Register",   desc: "Role selection step",           component: <MobileRegisterScreen /> },
  ],
  influencer: [
    { label: "Dashboard",  desc: "Score, KPIs, recommendations",  component: <MobileInfluencerDashboard /> },
    { label: "Campaigns",  desc: "Discovery with filters",        component: <MobileDiscoverCampaigns /> },
    { label: "Marketplace",desc: "2-col product grid",            component: <MobileMarketplace /> },
    { label: "Applications",desc: "Status-tabbed list",           component: <MobileApplications /> },
    { label: "AI Coach",   desc: "Score + insights + chat",       component: <MobileAICoach /> },
  ],
  brand: [
    { label: "Dashboard",  desc: "KPIs, chart, activity",         component: <MobileBrandDashboard /> },
    { label: "Campaigns",  desc: "Campaign list with progress",   component: <MobileBrandCampaigns /> },
    { label: "Creators",   desc: "Creator discovery + invite",    component: <MobileDiscoverCreators /> },
  ],
};

const SCALE = 0.72;

export function MobileShowcasePage() {
  const [active, setActive] = useState<Category>("marketing");
  const [focused, setFocused] = useState<number | null>(null);

  const currentScreens = screens[active];

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* Page header */}
      <div style={{ background: "var(--card)", borderBottom: "1px solid var(--border)", padding: "2.5rem 2rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.25rem 0.75rem", borderRadius: 999, background: "var(--secondary)", marginBottom: "0.875rem" }}>
            <span style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600, color: "var(--secondary-foreground)" }}>Mobile Design System</span>
          </div>
          <h1 style={{ fontFamily: f.h, fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--foreground)", letterSpacing: "-0.035em", marginBottom: "0.625rem" }}>
            InfluencIA — Mobile Screens
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "1rem", color: "var(--muted-foreground)", lineHeight: 1.65, maxWidth: "52ch" }}>
            Companion mobile UI designed for thumb-first interaction. Same design system, rebuilt for compact screens — not a compressed desktop.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "2rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {[
              { v: "10",     l: "screens" },
              { v: "390px",  l: "design width" },
              { v: "2",      l: "user roles" },
              { v: "Light/Dark", l: "mode ready" },
            ].map((s) => (
              <div key={s.l}>
                <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: "var(--foreground)", letterSpacing: "-0.02em" }}>{s.v}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem" }}>
        {/* Category tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: "2.5rem" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActive(cat.id); setFocused(null); }}
              style={{
                padding: "0.75rem 1.25rem",
                background: "transparent", border: "none",
                borderBottom: `2px solid ${active === cat.id ? "var(--primary)" : "transparent"}`,
                marginBottom: -1, cursor: "pointer",
                fontFamily: f.b, fontSize: "0.9375rem",
                fontWeight: active === cat.id ? 500 : 400,
                color: active === cat.id ? "var(--primary)" : "var(--muted-foreground)",
                whiteSpace: "nowrap",
              }}
            >
              {cat.label}
              <span style={{ marginLeft: "0.375rem", padding: "0.1rem 0.4rem", borderRadius: 999, background: active === cat.id ? "#DBEAFE" : "var(--muted)", color: active === cat.id ? "var(--primary)" : "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.7rem", fontWeight: 600 }}>
                {screens[cat.id].length}
              </span>
            </button>
          ))}
        </div>

        {/* Category description */}
        <p style={{ fontFamily: f.b, fontSize: "0.9375rem", color: "var(--muted-foreground)", marginBottom: "2rem" }}>
          {categories.find((c) => c.id === active)?.desc}
        </p>

        {/* Phone grid — responsive wrap */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
          {currentScreens.map((screen, i) => (
            <div
              key={screen.label}
              onClick={() => setFocused(focused === i ? null : i)}
              style={{ cursor: "pointer", transition: "transform .15s", transform: focused === i ? "scale(1.02)" : "scale(1)" }}
            >
              <PhoneFrame label={screen.label} scale={SCALE}>
                {screen.component}
              </PhoneFrame>
              <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)", textAlign: "center", marginTop: "0.375rem" }}>
                {screen.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Design principles */}
        <div style={{ marginTop: "4rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "2rem" }}>
          <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Mobile design principles
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {[
              { title: "Bottom navigation",    desc: "5-item tab bar with a raised primary action in the center. Always consistent across all views." },
              { title: "Thumb-first targets",  desc: "All interactive elements are at minimum 44×44px. Primary actions are at the bottom half of the screen." },
              { title: "Horizontal scroll",    desc: "Filter chips, campaign cards, and category tabs use horizontal scrolling — no wrapping on small viewports." },
              { title: "Card hierarchy",       desc: "Dense, structured cards replace tables. Status and urgency are communicated through color-coded top borders." },
              { title: "Sticky headers",       desc: "Section headers remain visible while content scrolls. Page titles use Poppins 600 at consistent 1rem size." },
              { title: "Score as identity",    desc: "The IA Score ring is prominent on both dashboards — it's the primary value signal the product delivers." },
            ].map((p) => (
              <div key={p.title} style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1rem" }}>
                <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>{p.title}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Token reference */}
        <div style={{ marginTop: "1.5rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.5rem" }}>
          <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.0625rem", color: "var(--foreground)", marginBottom: "1rem" }}>Mobile token reference</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
            {[
              { token: "Screen width",       value: "390px (iPhone 14)" },
              { token: "Screen height",       value: "844px" },
              { token: "Status bar",          value: "44px (with Dynamic Island)" },
              { token: "Mobile header",       value: "52px" },
              { token: "Bottom nav",          value: "82px (+ home indicator)" },
              { token: "Touch target min",    value: "44×44px" },
              { token: "Page padding",        value: "0 1.125rem" },
              { token: "Card border radius",  value: "0.875rem" },
              { token: "Heading font",        value: "Poppins 600–800" },
              { token: "Body font",           value: "Inter 400–500" },
              { token: "Small label",         value: "Inter 0.6875rem 600" },
              { token: "Bottom nav font",     value: "Inter 0.625rem 400/600" },
            ].map((r) => (
              <div key={r.token} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0.75rem", background: "var(--background)", borderRadius: "0.5rem", border: "1px solid var(--border)" }}>
                <span style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>{r.token}</span>
                <span style={{ fontFamily: f.b, fontSize: "0.78rem", fontWeight: 600, color: "var(--foreground)" }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
