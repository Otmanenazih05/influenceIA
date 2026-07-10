import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  ArrowRight, Sparkles, TrendingUp, Users, BarChart2,
  CheckCircle, Zap, CreditCard, Shield, Search,
  Target, Filter, ChevronRight, Star
} from "lucide-react";

const font = { heading: "'Poppins', sans-serif", body: "'Inter', sans-serif" };

function SectionLabel({ children, color = "var(--secondary)", textColor = "var(--secondary-foreground)" }: {
  children: React.ReactNode; color?: string; textColor?: string;
}) {
  return (
    <div
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.375rem",
        padding: "0.3125rem 0.875rem", borderRadius: 999,
        background: color,
        fontFamily: font.body, fontSize: "0.75rem", fontWeight: 600,
        color: textColor, letterSpacing: "0.01em",
        marginBottom: "1.25rem",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Creator match card ─── */
function CreatorMatchCard({ name, niche, followers, score, match, color }: {
  name: string; niche: string; followers: string; score: number; match: number; color: string;
}) {
  const { t } = useTranslation("brands");
  return (
    <div
      style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "0.875rem", padding: "1.125rem",
        display: "flex", alignItems: "center", gap: "0.875rem",
      }}
    >
      <div
        style={{
          width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
          background: `${color}22`, color,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: font.heading, fontWeight: 700, fontSize: "1rem",
        }}
      >
        {name[0]}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: font.body, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{name}</p>
        <p style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{niche} · {followers}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
        <span
          style={{
            fontFamily: font.heading, fontWeight: 700, fontSize: "0.875rem",
            color: match >= 90 ? "var(--brand-success)" : "var(--primary)",
          }}
        >
          {match}% {t("matching.match_text")}
        </span>
        <span
          style={{
            padding: "0.15rem 0.5rem", borderRadius: 999,
            background: `${color}18`, color,
            fontFamily: font.body, fontSize: "0.7rem", fontWeight: 700,
          }}
        >
          {t("matching.score_text")} {score}
        </span>
      </div>
    </div>
  );
}

/* ─── Campaign result card ─── */
function CampaignResultCard() {
  const { t } = useTranslation("brands");
  return (
    <div
      style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "0.875rem", padding: "1.25rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div>
          <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>
            {t("resultCard.title")}
          </p>
          <p style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
            {t("resultCard.subtitle")}
          </p>
        </div>
        <span
          style={{
            padding: "0.25rem 0.625rem", borderRadius: 999,
            background: "#D1FAE5", color: "#065F46",
            fontFamily: font.body, fontSize: "0.75rem", fontWeight: 600,
          }}
        >
          {t("resultCard.status")}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
        {[0, 1, 2].map((idx) => (
          <div key={idx} style={{ background: "var(--muted)", borderRadius: "0.5rem", padding: "0.625rem", textAlign: "center" }}>
            <p style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "1rem", color: "var(--foreground)" }}>{t(`resultCard.metrics.${idx}.value`)}</p>
            <p style={{ fontFamily: font.body, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{t(`resultCard.metrics.${idx}.label`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Campaign workflow step ─── */
function WorkflowStep({ n, title, desc, icon }: { n: number; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div style={{ position: "relative", display: "flex", gap: "1.25rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div
          style={{
            width: 40, height: 40, borderRadius: "50%",
            border: "2px solid var(--primary)",
            background: "var(--card)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--primary)", flexShrink: 0,
          }}
        >
          {icon}
        </div>
        {n < 5 && <div style={{ width: 2, flex: 1, background: "var(--border)", minHeight: 32, marginTop: 4 }} />}
      </div>
      <div style={{ paddingBottom: n < 5 ? "1.5rem" : 0, paddingTop: 6 }}>
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

export function ForBrandsPage() {
  const { t } = useTranslation("brands");

  return (
    <div style={{ background: "var(--background)" }}>

      {/* ═══ HERO ═══ */}
      <section className="pub-hero-section" style={{ background: "var(--card)", padding: "5rem 1.5rem 6rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ maxWidth: 700, marginBottom: "3.5rem" }}>
            <SectionLabel><BarChart2 size={12} /> {t("hero.label")}</SectionLabel>
            <h1
              style={{
                fontFamily: font.heading, fontWeight: 800,
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                color: "var(--foreground)", lineHeight: 1.1, letterSpacing: "-0.04em",
                marginBottom: "1.25rem",
              }}
            >
              {t("hero.title1")}<br />
              <span style={{ color: "var(--brand-blue)" }}>{t("hero.title2")}</span>
            </h1>
            <p style={{ fontFamily: font.body, fontSize: "1.0625rem", color: "var(--muted-foreground)", lineHeight: 1.7, maxWidth: "46ch", marginBottom: "2rem" }}>
              {t("hero.desc")}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link
                to="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.75rem 1.5rem", borderRadius: "0.625rem",
                  background: "var(--primary)", color: "#fff",
                  fontFamily: font.body, fontSize: "0.9375rem", fontWeight: 500,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
                }}
              >
                {t("hero.cta_launch")} <ArrowRight size={16} />
              </Link>
              <a
                href="#workflow"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.75rem 1.5rem", borderRadius: "0.625rem",
                  border: "1px solid var(--border)", color: "var(--foreground)",
                  fontFamily: font.body, fontSize: "0.9375rem",
                  textDecoration: "none",
                }}
              >
                {t("hero.cta_how")} <ChevronRight size={16} />
              </a>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[0, 1, 2].map((idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 3, height: 32, borderRadius: 999, background: "var(--primary)" }} />
                <div>
                  <p style={{ fontFamily: font.heading, fontWeight: 800, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.03em", lineHeight: 1 }}>{t(`hero.metrics.${idx}.value`)}</p>
                  <p style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{t(`hero.metrics.${idx}.label`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AI MATCHING ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--background)", borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: 1180, margin: "0 auto",
            gap: "5rem", alignItems: "center",
          }}
          className="pub-two-col-grid"
        >
          <div>
            <SectionLabel><Sparkles size={12} /> {t("matching.label")}</SectionLabel>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1.25rem",
              }}
            >
              {t("matching.title")}
            </h2>
            <p style={{ fontFamily: font.body, fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {t("matching.desc")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[0, 1, 2, 3, 4].map((idx) => (
                <div key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <CheckCircle size={15} style={{ color: "var(--brand-success)", flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontFamily: font.body, fontSize: "0.9rem", color: "var(--foreground)" }}>{t(`matching.points.${idx}`)}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <p style={{ fontFamily: font.body, fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>
              {t("matching.top_matches")}
            </p>
            {[
              { name: "Sarah Benjelloun", niche: "Lifestyle / Beauty", followers: "98K · IG", score: 87, match: 96, color: "#2563EB" },
              { name: "Lina Zahra", niche: "Beauty / Wellness", followers: "67K · IG", score: 79, match: 91, color: "#7C3AED" },
              { name: "Amina Rifi", niche: "Skincare / Fitness", followers: "24K · TK", score: 74, match: 84, color: "#EC4899" },
              { name: "Hana Benali", niche: "Lifestyle / Home", followers: "18K · IG", score: 71, match: 79, color: "#10B981" },
            ].map((c) => (
              <CreatorMatchCard key={c.name} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CAMPAIGN WORKFLOW ═══ */}
      <section id="workflow" style={{ padding: "5rem 1.5rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: 1180, margin: "0 auto",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start",
          }}
          className="block md:grid"
        >
          <div>
            <SectionLabel><Zap size={12} /> {t("workflow.label")}</SectionLabel>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1.75rem",
              }}
            >
              {t("workflow.title")}
            </h2>
            <div>
              <WorkflowStep
                n={1}
                title={t("workflow.steps.0.title")}
                desc={t("workflow.steps.0.desc")}
                icon={<BarChart2 size={18} />}
              />
              <WorkflowStep
                n={2}
                title={t("workflow.steps.1.title")}
                desc={t("workflow.steps.1.desc")}
                icon={<Search size={18} />}
              />
              <WorkflowStep
                n={3}
                title={t("workflow.steps.2.title")}
                desc={t("workflow.steps.2.desc")}
                icon={<Users size={18} />}
              />
              <WorkflowStep
                n={4}
                title={t("workflow.steps.3.title")}
                desc={t("workflow.steps.3.desc")}
                icon={<TrendingUp size={18} />}
              />
              <WorkflowStep
                n={5}
                title={t("workflow.steps.4.title")}
                desc={t("workflow.steps.4.desc")}
                icon={<CreditCard size={18} />}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "3rem" }}>
            <CampaignResultCard />
            <div
              style={{
                background: "var(--background)", border: "1px solid var(--border)",
                borderRadius: "0.875rem", padding: "1.25rem",
              }}
            >
              <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>
                {t("workflow.approval_title")}
              </p>
              {[
                { step: t("workflow.approval_steps.0"), status: "done" },
                { step: t("workflow.approval_steps.1"), status: "done" },
                { step: t("workflow.approval_steps.2"), status: "current" },
                { step: t("workflow.approval_steps.3"), status: "pending" },
              ].map((item) => (
                <div key={item.step} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.625rem" }}>
                  <div
                    style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                      background: item.status === "done" ? "var(--brand-success)" : item.status === "current" ? "var(--primary)" : "var(--muted)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {item.status === "done" && <CheckCircle size={12} color="#fff" />}
                    {item.status === "current" && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                  <span style={{ fontFamily: font.body, fontSize: "0.875rem", color: item.status === "pending" ? "var(--muted-foreground)" : "var(--foreground)", fontWeight: item.status === "current" ? 500 : 400 }}>
                    {item.step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NANO CREATORS FOR BRANDS ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--background)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel><Star size={12} /> {t("nano.label")}</SectionLabel>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em", marginBottom: "0.75rem",
              }}
            >
              {t("nano.title")}
            </h2>
            <p style={{ fontFamily: font.body, fontSize: "1rem", color: "var(--muted-foreground)", maxWidth: "50ch", margin: "0 auto" }}>
              {t("nano.desc")}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {[
              {
                icon: <TrendingUp size={22} />,
                title: t("nano.items.0.title"),
                desc: t("nano.items.0.desc"),
              },
              {
                icon: <Target size={22} />,
                title: t("nano.items.1.title"),
                desc: t("nano.items.1.desc"),
              },
              {
                icon: <Shield size={22} />,
                title: t("nano.items.2.title"),
                desc: t("nano.items.2.desc"),
              },
              {
                icon: <Filter size={22} />,
                title: t("nano.items.3.title"),
                desc: t("nano.items.3.desc"),
              },
            ].map((card) => (
              <div key={card.title} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.5rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: "var(--secondary)", color: "var(--secondary-foreground)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  {card.icon}
                </div>
                <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>{card.title}</p>
                <p style={{ fontFamily: font.body, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ANALYTICS ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: 1180, margin: "0 auto",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center",
          }}
          className="block md:grid"
        >
          <div>
            <SectionLabel><BarChart2 size={12} /> {t("analytics.label")}</SectionLabel>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1.25rem",
              }}
            >
              {t("analytics.title")}
            </h2>
            <p style={{ fontFamily: font.body, fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {t("analytics.desc")}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.75rem", padding: "1rem" }}>
                  <p style={{ fontFamily: font.heading, fontWeight: 800, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.03em" }}>{t(`analytics.metrics.${idx}.metric`)}</p>
                  <p style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{t(`analytics.metrics.${idx}.label`)}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} style={{ display: "flex", gap: "0.75rem", alignItems: "center", padding: "0.75rem 1rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem" }}>
                <CheckCircle size={16} style={{ color: "var(--brand-success)", flexShrink: 0 }} />
                <p style={{ fontFamily: font.body, fontSize: "0.9rem", color: "var(--foreground)" }}>{t(`analytics.points.${idx}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "#090D16", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: font.heading, fontWeight: 800, fontSize: "clamp(1.875rem, 4vw, 2.5rem)", color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.15, marginBottom: "1rem" }}>
            {t("cta.title")}
          </h2>
          <p style={{ fontFamily: font.body, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "2rem" }}>
            {t("cta.desc")}
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
              {t("cta.btn1")} <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.8125rem 1.75rem", borderRadius: "0.625rem",
                border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)",
                fontFamily: font.body, fontSize: "0.9375rem",
                textDecoration: "none",
              }}
            >
              {t("cta.btn2")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
