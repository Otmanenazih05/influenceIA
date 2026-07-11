import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  ArrowRight, Sparkles, TrendingUp, Users, Star, Zap, BarChart2,
  CreditCard, Shield, CheckCircle, Instagram, Youtube, Facebook,
  Check, ChevronRight, Play
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

/* ─── Shared helpers ─── */
const font = { heading: "'Poppins', sans-serif", body: "'Inter', sans-serif" };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.375rem",
        padding: "0.25rem 0.75rem", borderRadius: 999,
        background: "var(--muted)",
        fontFamily: font.body, fontSize: "0.75rem", fontWeight: 500,
        color: "var(--muted-foreground)", letterSpacing: "0.02em",
        marginBottom: "1rem",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Hero product composition ─── */
function HeroComposition() {
  const miniData = [
    { v: 12 }, { v: 19 }, { v: 15 }, { v: 28 }, { v: 22 }, { v: 36 }, { v: 44 }
  ];
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
      {/* Remove ambient glow — replaced with clean cards */}

      {/* Campaign performance card */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.125rem", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
              <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "#D1FAE5", color: "#065F46", fontFamily: font.body, fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Active</span>
            </div>
            <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>Skincare Lancement</p>
            <p style={{ fontFamily: font.body, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>GlowLab Morocco · Instagram, TikTok</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: font.heading, fontWeight: 800, fontSize: "1.5rem", color: "#10B981", letterSpacing: "-0.03em" }}>3.7×</p>
            <p style={{ fontFamily: font.body, fontSize: "0.68rem", color: "var(--muted-foreground)" }}>ROI</p>
          </div>
        </div>
        <div style={{ height: 52 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={miniData} margin={{ top: 2, right: 2, bottom: 0, left: 0 }}>
              <Tooltip contentStyle={{ display: "none" }} cursor={{ stroke: "var(--border)" }} />
              <Line type="monotone" dataKey="v" stroke="#2563EB" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
          {[{ l: "Creators", v: "145" }, { l: "Impressions", v: "1.4M" }, { l: "Applicants", v: "14" }].map((m) => (
            <div key={m.l} style={{ flex: 1, padding: "0.375rem", borderRadius: "0.5rem", background: "var(--background)", border: "1px solid var(--border)", textAlign: "center" }}>
              <p style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{m.v}</p>
              <p style={{ fontFamily: font.body, fontSize: "0.62rem", color: "var(--muted-foreground)" }}>{m.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Creator match card */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1rem", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "1.0625rem", color: "#fff" }}>S</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <p style={{ fontFamily: font.body, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>Sarah Benjelloun</p>
              <CheckCircle size={13} style={{ color: "#10B981" }} />
            </div>
            <p style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Lifestyle · 98K · Casablanca</p>
          </div>
          <div style={{ display: "flex", flex: "column", alignItems: "flex-end", gap: "0.375rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.25rem 0.625rem", borderRadius: 999, background: "#EDE9FE" }}>
              <Zap size={11} style={{ color: "#7C3AED" }} />
              <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.8rem", color: "#7C3AED" }}>87</span>
            </div>
            <span style={{ fontFamily: font.body, fontSize: "0.75rem", fontWeight: 600, color: "#10B981" }}>96% match</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {[{ v: "12K+", l: "Verified creators" }, { v: "3.7×", l: "Avg ROI" }, { v: "72h", l: "Time to match" }].map((s) => (
          <div key={s.l} style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "0.75rem", textAlign: "center", boxShadow: "var(--shadow-xs)" }}>
            <p style={{ fontFamily: font.heading, fontWeight: 800, fontSize: "1.25rem", color: "var(--foreground)", letterSpacing: "-0.03em" }}>{s.v}</p>
            <p style={{ fontFamily: font.body, fontSize: "0.68rem", color: "var(--muted-foreground)" }}>{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── How It Works step ─── */
function HowStep({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div
        style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "var(--primary)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: font.heading, fontWeight: 700, fontSize: "0.8125rem",
          flexShrink: 0, marginTop: 2,
        }}
      >
        {n}
      </div>
      <div>
        <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: 4 }}>
          {title}
        </p>
        <p style={{ fontFamily: font.body, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({
  icon, title, desc, badge, ai
}: { icon: React.ReactNode; title: string; desc: string; badge?: string; ai?: boolean }) {
  return (
    <div
      style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "0.875rem", padding: "1.5rem",
        boxShadow: "var(--shadow-xs)",
      }}
    >
      <div
        style={{
          width: 40, height: 40, borderRadius: "0.625rem",
          background: ai ? "var(--ai-surface)" : "var(--muted)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "1rem",
          color: ai ? "var(--ai)" : "var(--foreground)",
        }}
      >
        {icon}
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: "0.375rem" }}>
        <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>
          {title}
        </p>
        {badge && (
          <span
            style={{
              padding: "0.15rem 0.5rem", borderRadius: 999,
              background: ai ? "var(--ai-surface)" : "var(--muted)",
              color: ai ? "var(--ai)" : "var(--muted-foreground)",
              fontFamily: font.body, fontSize: "0.65rem", fontWeight: 600,
              flexShrink: 0, letterSpacing: "0.03em",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <p style={{ fontFamily: font.body, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
        {desc}
      </p>
    </div>
  );
}

/* ─── Stat block ─── */
function StatBlock({ value, label, sublabel }: { value: string; label: string; sublabel?: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontFamily: font.heading, fontWeight: 800, fontSize: "2.75rem",
          color: "var(--foreground)", lineHeight: 1, letterSpacing: "-0.04em",
          marginBottom: "0.375rem",
        }}
      >
        {value}
      </p>
      <p style={{ fontFamily: font.body, fontSize: "0.9375rem", color: "var(--foreground)", fontWeight: 500 }}>
        {label}
      </p>
      {sublabel && (
        <p style={{ fontFamily: font.body, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginTop: "0.25rem" }}>
          {sublabel}
        </p>
      )}
    </div>
  );
}

/* ─── Pricing card ─── */
function PricingCard({
  name, price, period, desc, features, cta, highlight
}: {
  name: string; price: string; period?: string; desc: string;
  features: string[]; cta: string; highlight?: boolean;
}) {
  const { t } = useTranslation("home");
  return (
    <div
      style={{
        background: highlight ? "var(--primary)" : "var(--card)",
        border: highlight ? "none" : "1px solid var(--border)",
        borderRadius: "1rem",
        padding: "1.75rem",
        position: "relative",
        boxShadow: highlight ? "0 8px 32px rgba(37,99,235,0.25)" : "0 1px 4px rgba(0,0,0,0.05)",
        display: "flex", flexDirection: "column",
      }}
    >
      {highlight && (
        <span
          style={{
            position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
            padding: "0.25rem 0.875rem", borderRadius: 999,
            background: "var(--brand-pink)", color: "#fff",
            fontFamily: font.body, fontSize: "0.7rem", fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {t("pricing.mostPopular")}
        </span>
      )}
      <p
        style={{
          fontFamily: font.body, fontSize: "0.8125rem", fontWeight: 600,
          color: highlight ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)",
          textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.75rem",
        }}
      >
        {name}
      </p>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "0.375rem" }}>
        <span
          style={{
            fontFamily: font.heading, fontWeight: 800, fontSize: "2.25rem",
            color: highlight ? "#fff" : "var(--foreground)", letterSpacing: "-0.04em",
          }}
        >
          {price}
        </span>
        {period && (
          <span style={{ fontFamily: font.body, fontSize: "0.875rem", color: highlight ? "rgba(255,255,255,0.6)" : "var(--muted-foreground)" }}>
            {period}
          </span>
        )}
      </div>
      <p style={{ fontFamily: font.body, fontSize: "0.875rem", color: highlight ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
        {desc}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem", flex: 1 }}>
        {features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
            <Check size={14} style={{ color: highlight ? "rgba(255,255,255,0.8)" : "var(--brand-success)", marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontFamily: font.body, fontSize: "0.875rem", color: highlight ? "rgba(255,255,255,0.85)" : "var(--foreground)" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        style={{
          display: "block", textAlign: "center",
          padding: "0.6875rem 1rem", borderRadius: "0.625rem",
          background: highlight ? "rgba(255,255,255,0.15)" : "var(--primary)",
          color: "#fff",
          fontFamily: font.body, fontSize: "0.9rem", fontWeight: 500,
          textDecoration: "none",
          border: highlight ? "1px solid rgba(255,255,255,0.25)" : "none",
        }}
      >
        {cta}
      </Link>
    </div>
  );
}

/* ─── Main page ─── */
export function HomePage() {
  const { t } = useTranslation("home");

  return (
    <div style={{ background: "var(--background)" }}>

      {/* ═══ HERO ═══ */}
      <section
        className="pub-hero-section"
        style={{
          background: "var(--card)",
          padding: "5rem 1.5rem 6rem",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1180, margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "4rem", flexWrap: "wrap",
          }}
        >
          {/* Left: text */}
          <div style={{ flex: "1 1 300px", maxWidth: 560 }}>
            <SectionLabel><Sparkles size={12} /> {t("hero.label")}</SectionLabel>

            <h1
              style={{
                fontFamily: font.heading, fontWeight: 800, fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
                color: "var(--foreground)", lineHeight: 1.1, letterSpacing: "-0.04em",
                marginBottom: "1.25rem",
              }}
            >
              {t("hero.title_part1")}{" "}
              <span style={{ color: "var(--brand-blue)" }}>{t("hero.title_part2")}</span>
            </h1>

            <p
              style={{
                fontFamily: font.body, fontSize: "1.0625rem", color: "var(--muted-foreground)",
                lineHeight: 1.7, marginBottom: "2rem", maxWidth: "44ch",
              }}
            >
              {t("hero.description")}
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <Link
                to="/brands"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.75rem 1.5rem", borderRadius: "0.625rem",
                  background: "var(--primary)", color: "#fff",
                  fontFamily: font.body, fontSize: "0.9375rem", fontWeight: 500,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
                }}
              >
                {t("hero.cta_brand")} <ArrowRight size={16} />
              </Link>
              <Link
                to="/influencers"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.75rem 1.5rem", borderRadius: "0.625rem",
                  border: "1px solid var(--border)", color: "var(--foreground)",
                  background: "transparent",
                  fontFamily: font.body, fontSize: "0.9375rem",
                  textDecoration: "none",
                }}
              >
                {t("hero.cta_influencer")} <ChevronRight size={16} />
              </Link>
            </div>

            {/* Social proof row */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex" }}>
                {["#2563EB","#7C3AED","#EC4899","#10B981","#F59E0B"].map((c, i) => (
                  <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: `${c}25`, border: "2px solid var(--card)", marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", color: c, fontFamily: font.heading, fontWeight: 700, fontSize: "0.65rem" }}>
                    {["S","Y","L","O","F"][i]}
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: font.body, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                <strong style={{ color: "var(--foreground)", fontWeight: 600 }}>{t("hero.social_proof_count")}</strong> {t("hero.social_proof_text")}
              </p>
            </div>
          </div>

          {/* Right: product composition */}
          <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center", maxWidth: "100%" }}>
            <HeroComposition />
          </div>

        </div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <section style={{ borderBottom: "1px solid var(--border)", padding: "1.25rem 1.5rem" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}>
          <p style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 500, letterSpacing: "0.02em", flexShrink: 0 }}>
            {t("trust.label")}
          </p>
          <div style={{ width: 1, height: 16, background: "var(--border)", flexShrink: 0 }} />
          {["GlowLab Morocco", "AtlasBrand", "MarocTech", "Zara.ma", "VertMaroc", "NovaBio"].map((brand) => (
            <span key={brand} style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.875rem", color: "var(--muted-foreground)", letterSpacing: "-0.01em", opacity: 0.45, whiteSpace: "nowrap" }}>
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel>{t("howItWorks.label")}</SectionLabel>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em", marginBottom: "0.75rem",
              }}
            >
              {t("howItWorks.title")}
            </h2>
            <p style={{ fontFamily: font.body, fontSize: "1rem", color: "var(--muted-foreground)", maxWidth: "44ch", margin: "0 auto" }}>
              {t("howItWorks.description")}
            </p>
          </div>

          <div className="pub-three-col-split" style={{ alignItems: "start" }}>
            {/* Brands path */}
            <div>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.375rem 0.875rem", borderRadius: 999,
                  background: "#DBEAFE", color: "#1D4ED8",
                  fontFamily: font.body, fontSize: "0.8125rem", fontWeight: 600,
                  marginBottom: "1.75rem",
                }}
              >
                <BarChart2 size={14} /> {t("howItWorks.brand.title")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <HowStep n={1} title={t("howItWorks.brand.steps.0.title")} desc={t("howItWorks.brand.steps.0.desc")} />
                <HowStep n={2} title={t("howItWorks.brand.steps.1.title")} desc={t("howItWorks.brand.steps.1.desc")} />
                <HowStep n={3} title={t("howItWorks.brand.steps.2.title")} desc={t("howItWorks.brand.steps.2.desc")} />
                <HowStep n={4} title={t("howItWorks.brand.steps.3.title")} desc={t("howItWorks.brand.steps.3.desc")} />
              </div>
              <Link
                to="/brands"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.375rem",
                  marginTop: "1.75rem", fontFamily: font.body, fontSize: "0.9rem",
                  color: "var(--primary)", textDecoration: "none", fontWeight: 500,
                }}
              >
                {t("howItWorks.brand.cta")} <ArrowRight size={15} />
              </Link>
            </div>

            {/* Divider */}
            <div style={{ background: "var(--border)", height: "100%" }} className="hidden md:block" />

            {/* Influencers path */}
            <div>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.375rem 0.875rem", borderRadius: 999,
                  background: "#EDE9FE", color: "#5B21B6",
                  fontFamily: font.body, fontSize: "0.8125rem", fontWeight: 600,
                  marginBottom: "1.75rem",
                }}
              >
                <Users size={14} /> {t("howItWorks.influencer.title")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <HowStep n={1} title={t("howItWorks.influencer.steps.0.title")} desc={t("howItWorks.influencer.steps.0.desc")} />
                <HowStep n={2} title={t("howItWorks.influencer.steps.1.title")} desc={t("howItWorks.influencer.steps.1.desc")} />
                <HowStep n={3} title={t("howItWorks.influencer.steps.2.title")} desc={t("howItWorks.influencer.steps.2.desc")} />
                <HowStep n={4} title={t("howItWorks.influencer.steps.3.title")} desc={t("howItWorks.influencer.steps.3.desc")} />
              </div>
              <Link
                to="/influencers"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.375rem",
                  marginTop: "1.75rem", fontFamily: font.body, fontSize: "0.9rem",
                  color: "var(--brand-purple)", textDecoration: "none", fontWeight: 500,
                }}
              >
                {t("howItWorks.influencer.cta")} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ padding: "5rem 1.5rem", background: "var(--background)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel><Zap size={12} /> {t("features.label")}</SectionLabel>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em", marginBottom: "0.75rem",
              }}
            >
              {t("features.title")}
            </h2>
            <p style={{ fontFamily: font.body, fontSize: "1rem", color: "var(--muted-foreground)", maxWidth: "46ch", margin: "0 auto" }}>
              {t("features.description")}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            <FeatureCard ai icon={<Sparkles size={19} />} title={t("features.f1.title")} badge="AI" desc={t("features.f1.desc")} />
            <FeatureCard ai icon={<Zap size={19} />} title={t("features.f2.title")} badge="AI" desc={t("features.f2.desc")} />
            <FeatureCard icon={<BarChart2 size={19} />} title={t("features.f3.title")} desc={t("features.f3.desc")} />
            <FeatureCard icon={<CreditCard size={19} />} title={t("features.f4.title")} desc={t("features.f4.desc")} />
            <FeatureCard icon={<TrendingUp size={19} />} title={t("features.f5.title")} desc={t("features.f5.desc")} />
            <FeatureCard icon={<Shield size={19} />} title={t("features.f6.title")} desc={t("features.f6.desc")} />
          </div>
        </div>
      </section>

      {/* ═══ NANO/MICRO CREATORS ═══ */}
      <section className="pub-section" style={{ padding: "5rem 1.5rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div
          className="pub-two-col-grid"
          style={{
            maxWidth: 1180, margin: "0 auto",
            alignItems: "center",
          }}
        >
          <div>
            <SectionLabel><Star size={12} /> {t("nanoMicro.label")}</SectionLabel>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1.25rem",
              }}
            >
              {t("nanoMicro.title")}
            </h2>
            <p style={{ fontFamily: font.body, fontSize: "1rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              {t("nanoMicro.description")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                  <CheckCircle size={16} style={{ color: "var(--brand-success)", flexShrink: 0, marginTop: 3 }} />
                  <p style={{ fontFamily: font.body, fontSize: "0.9375rem", color: "var(--foreground)" }}>{t(`nanoMicro.points.${idx}`)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="role-step-grid" style={{ gap: "1rem" }}>
            {[
              { tier: "Nano",  range: "1K – 10K",  eng: "5.8%", color: "#EC4899" },
              { tier: "Micro", range: "10K – 100K", eng: "3.2%", color: "#7C3AED" },
              { tier: "Macro", range: "100K – 1M",  eng: "1.7%", color: "#2563EB" },
              { tier: "Mega",  range: "1M+",        eng: "1.1%", color: "#6B7280" },
            ].map((row) => (
              <div
                key={row.tier}
                style={{
                  background: "var(--background)", border: "1px solid var(--border)",
                  borderRadius: "0.875rem", padding: "1.25rem",
                  borderTop: `3px solid ${row.color}`,
                }}
              >
                <p style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: 4 }}>
                  {row.tier}
                </p>
                <p style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)", marginBottom: "0.75rem" }}>
                  {row.range} followers
                </p>
                <p style={{ fontFamily: font.heading, fontWeight: 800, fontSize: "1.625rem", color: row.color, letterSpacing: "-0.03em" }}>
                  {row.eng}
                </p>
                <p style={{ fontFamily: font.body, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>{t("nanoMicro.avgEngagement")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ STATS ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--background)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center", marginBottom: "3.5rem" }}>
          <SectionLabel>{t("stats.label")}</SectionLabel>
          <h2
            style={{
              fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--foreground)", letterSpacing: "-0.03em",
            }}
          >
            {t("stats.title")}
          </h2>
        </div>
        <div
          style={{
            maxWidth: 900, margin: "0 auto",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0.5rem",
          }}
        >
          {[
            { value: "12,000+", label: t("stats.s1.label"), sublabel: t("stats.s1.sublabel") },
            { value: "3.7×",    label: t("stats.s2.label"), sublabel: t("stats.s2.sublabel") },
            { value: "98%",     label: t("stats.s3.label"), sublabel: t("stats.s3.sublabel") },
            { value: "72h",     label: t("stats.s4.label"), sublabel: t("stats.s4.sublabel") },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "var(--card)", border: "1px solid var(--border)",
                borderRadius: "0.875rem", padding: "2rem 1.5rem",
              }}
            >
              <StatBlock value={s.value} label={s.label} sublabel={s.sublabel} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" style={{ padding: "5rem 1.5rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel>{t("pricing.label")}</SectionLabel>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em", marginBottom: "0.75rem",
              }}
            >
              {t("pricing.title")}
            </h2>
            <p style={{ fontFamily: font.body, fontSize: "1rem", color: "var(--muted-foreground)", maxWidth: "40ch", margin: "0 auto" }}>
              {t("pricing.description")}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: 960, margin: "0 auto" }}>
            <PricingCard
              name="Starter"
              price="Free"
              desc={t("pricing.starter.desc")}
              features={[
                t("pricing.starter.f1"),
                t("pricing.starter.f2"),
                t("pricing.starter.f3"),
                t("pricing.starter.f4"),
              ]}
              cta={t("pricing.starter.cta")}
            />
            <PricingCard
              name="Growth"
              price="999 MAD"
              period={t("pricing.month")}
              desc={t("pricing.growth.desc")}
              features={[
                t("pricing.growth.f1"),
                t("pricing.growth.f2"),
                t("pricing.growth.f3"),
                t("pricing.growth.f4"),
                t("pricing.growth.f5"),
              ]}
              cta={t("pricing.growth.cta")}
              highlight
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              desc={t("pricing.enterprise.desc")}
              features={[
                t("pricing.enterprise.f1"),
                t("pricing.enterprise.f2"),
                t("pricing.enterprise.f3"),
                t("pricing.enterprise.f4"),
                t("pricing.enterprise.f5"),
              ]}
              cta={t("pricing.enterprise.cta")}
            />
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section
        style={{
          padding: "6rem 1.5rem",
          background: "#090D16",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: font.heading, fontWeight: 800, fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
              color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.15, marginBottom: "1.25rem",
            }}
          >
            {t("finalCta.title")}
          </h2>
          <p style={{ fontFamily: font.body, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "2rem" }}>
            {t("finalCta.description")}
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.8125rem 1.75rem", borderRadius: "0.625rem",
                background: "var(--primary)", color: "#fff",
                fontFamily: font.body, fontSize: "0.9375rem", fontWeight: 500,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(37,99,235,0.4)",
              }}
            >
              {t("finalCta.cta_start")} <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.8125rem 1.75rem", borderRadius: "0.625rem",
                border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)",
                background: "transparent",
                fontFamily: font.body, fontSize: "0.9375rem",
                textDecoration: "none",
              }}
            >
              {t("finalCta.cta_talk")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
