import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  ArrowRight, Sparkles, Star, TrendingUp, CreditCard, Zap,
  CheckCircle, Users, CheckCheck,
  MessageSquare, ChevronRight, BarChart2, Shield
} from "lucide-react";
import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../components/ui/SocialIcons";

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

/* ─── Score ring preview ─── */
function ScoreCard({ score, label }: { score: number; label: string }) {
  const { t } = useTranslation("influencers");
  const r = 38;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  return (
    <div
      style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "0.875rem", padding: "1.25rem 1.5rem",
        display: "flex", alignItems: "center", gap: "1.25rem",
      }}
    >
      <svg width={90} height={90} viewBox="0 0 90 90">
        <circle cx={45} cy={45} r={r} fill="none" stroke="var(--muted)" strokeWidth={7} />
        <circle
          cx={45} cy={45} r={r} fill="none"
          stroke="var(--primary)" strokeWidth={7} strokeLinecap="round"
          strokeDasharray={`${fill} ${circ - fill}`}
          strokeDashoffset={circ / 4}
        />
        <text x={45} y={50} textAnchor="middle"
          style={{ fontFamily: font.heading, fontWeight: 800, fontSize: "1.25rem", fill: "var(--foreground)" }}>
          {score}
        </text>
        <text x={45} y={64} textAnchor="middle"
          style={{ fontFamily: font.body, fontSize: "0.55rem", fill: "var(--muted-foreground)" }}>
          /100
        </text>
      </svg>
      <div>
        <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: 4 }}>
          {label}
        </p>
        <p style={{ fontFamily: font.body, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
          {t("scoreCard.desc")}
        </p>
        <div style={{ display: "flex", gap: 6, marginTop: "0.75rem", flexWrap: "wrap" }}>
          {[
            `${t("scoreCard.tags.engagement")} 9.2`,
            `${t("scoreCard.tags.authenticity")} 8.7`,
            `${t("scoreCard.tags.consistency")} 8.0`
          ].map((tag) => (
            <span key={tag}
              style={{
                padding: "0.2rem 0.625rem", borderRadius: 999,
                background: "var(--muted)", color: "var(--muted-foreground)",
                fontFamily: font.body, fontSize: "0.7rem", fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Campaign feed preview ─── */
function CampaignFeedPreview() {
  const { t } = useTranslation("influencers");
  const campaigns = [
    { brand: "GlowLab Morocco", category: "Beauty & Skincare", budget: "5 000 MAD", match: 96, status: "New" },
    { brand: "AtlasBrand", category: "Fashion & Lifestyle", budget: "3 500 MAD", match: 88, status: "Open" },
    { brand: "NovaBio", category: "Wellness & Nutrition", budget: "4 200 MAD", match: 82, status: "Open" },
  ];
  return (
    <div
      style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "0.875rem", overflow: "hidden",
      }}
    >
      <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>
          {t("campaignFeedPreview.title")}
        </p>
        <span style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{t("campaignFeedPreview.updated_live")}</span>
      </div>
      {campaigns.map((c, i) => (
        <div
          key={i}
          style={{
            padding: "1rem 1.25rem", borderBottom: i < campaigns.length - 1 ? "1px solid var(--border)" : "none",
            display: "flex", alignItems: "center", gap: "0.875rem",
          }}
        >
          <div
            style={{
              width: 38, height: 38, borderRadius: "0.625rem", flexShrink: 0,
              background: `${["#2563EB", "#7C3AED", "#EC4899"][i]}18`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: ["var(--brand-blue)", "var(--brand-purple)", "var(--brand-pink)"][i],
              fontFamily: font.heading, fontWeight: 700, fontSize: "0.875rem",
            }}
          >
            {c.brand[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: font.body, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{c.brand}</p>
            <p style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{c.category} · {c.budget}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexShrink: 0 }}>
            <span
              style={{
                padding: "0.2rem 0.5rem", borderRadius: 999,
                background: c.status === "New" ? "var(--accent)" : "var(--secondary)",
                color: c.status === "New" ? "var(--accent-foreground)" : "var(--secondary-foreground)",
                fontFamily: font.body, fontSize: "0.65rem", fontWeight: 600,
              }}
            >
              {c.status}
            </span>
            <span
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "0.875rem",
                color: c.match >= 90 ? "var(--brand-success)" : "var(--primary)",
              }}
            >
              {c.match}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Platform badge ─── */
function PlatformBadge({ name, icon, color, followers }: {
  name: string; icon: React.ReactNode; color: string; followers: string;
}) {
  return (
    <div
      style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "0.875rem", padding: "1.25rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.625rem", textAlign: "center",
      }}
    >
      <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
        {icon}
      </div>
      <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>{name}</p>
      <p style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{followers}</p>
    </div>
  );
}

/* ─── Testimonial ─── */
function Testimonial({ quote, name, handle, score, color }: {
  quote: string; name: string; handle: string; score: number; color: string;
}) {
  const { t } = useTranslation("influencers");
  return (
    <div
      style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "0.875rem", padding: "1.5rem",
      }}
    >
      <div style={{ display: "flex", gap: 2, marginBottom: "0.875rem" }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
        ))}
      </div>
      <p style={{ fontFamily: font.body, fontSize: "0.9375rem", color: "var(--foreground)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
        "{quote}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: 38, height: 38, borderRadius: "50%",
            background: `${color}22`, color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: font.heading, fontWeight: 700, fontSize: "0.875rem", flexShrink: 0,
          }}
        >
          {name[0]}
        </div>
        <div>
          <p style={{ fontFamily: font.body, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>{name}</p>
          <p style={{ fontFamily: font.body, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{handle}</p>
        </div>
        <span
          style={{
            marginLeft: "auto",
            padding: "0.2rem 0.625rem", borderRadius: 999,
            background: `${color}18`, color,
            fontFamily: font.body, fontSize: "0.7rem", fontWeight: 700,
          }}
        >
          {t("testimonials.score")} {score}
        </span>
      </div>
    </div>
  );
}

export function ForInfluencersPage() {
  const { t } = useTranslation("influencers");

  return (
    <div style={{ background: "var(--background)" }}>

      {/* ═══ HERO ═══ */}
      <section className="pub-hero-section" style={{ background: "var(--card)", padding: "5rem 1.5rem 6rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ maxWidth: 700, marginBottom: "3.5rem" }}>
            <SectionLabel color="#EDE9FE" textColor="#5B21B6">
              <Users size={12} /> {t("hero.label")}
            </SectionLabel>
            <h1
              style={{
                fontFamily: font.heading, fontWeight: 800,
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                color: "var(--foreground)", lineHeight: 1.1, letterSpacing: "-0.04em",
                marginBottom: "1.25rem",
              }}
            >
              {t("hero.title1")}<br />
              <span style={{ color: "var(--brand-purple)" }}>{t("hero.title2")}</span> {t("hero.title3")}
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
                  background: "var(--brand-purple)", color: "#fff",
                  fontFamily: font.body, fontSize: "0.9375rem", fontWeight: 500,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
                }}
              >
                {t("hero.cta_join")} <ArrowRight size={16} />
              </Link>
              <a
                href="#how"
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

          {/* No minimum callout */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: "0.875rem",
              padding: "0.875rem 1.25rem", borderRadius: "0.875rem",
              background: "#EDE9FE", border: "1px solid #DDD6FE",
              maxWidth: "100%", boxSizing: "border-box",
            }}
          >

            <div
              style={{
                width: 36, height: 36, borderRadius: "0.625rem",
                background: "var(--brand-purple)", display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <CheckCheck size={18} color="#fff" />
            </div>
            <div>
              <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.9375rem", color: "#3B1FA6" }}>
                {t("hero.no_min_title")}
              </p>
              <p style={{ fontFamily: font.body, fontSize: "0.8125rem", color: "#5B21B6" }}>
                {t("hero.no_min_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" style={{ padding: "5rem 1.5rem", background: "var(--background)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <SectionLabel color="#EDE9FE" textColor="#5B21B6"><Zap size={12} /> {t("how.label")}</SectionLabel>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em",
              }}
            >
              {t("how.title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {[
              {
                n: "01", title: t("how.steps.0.title"),
                desc: t("how.steps.0.desc"),
                icon: <Users size={22} />,
              },
              {
                n: "02", title: t("how.steps.1.title"),
                desc: t("how.steps.1.desc"),
                icon: <Sparkles size={22} />,
              },
              {
                n: "03", title: t("how.steps.2.title"),
                desc: t("how.steps.2.desc"),
                icon: <MessageSquare size={22} />,
              },
              {
                n: "04", title: t("how.steps.3.title"),
                desc: t("how.steps.3.desc"),
                icon: <CreditCard size={22} />,
              },
            ].map((step) => (
              <div
                key={step.n}
                style={{
                  background: "var(--card)", border: "1px solid var(--border)",
                  borderRadius: "0.875rem", padding: "1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: "0.75rem",
                      background: "#EDE9FE", color: "var(--brand-purple)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: font.heading, fontWeight: 800, fontSize: "1.75rem",
                      color: "var(--muted)", letterSpacing: "-0.04em",
                    }}
                  >
                    {step.n}
                  </span>
                </div>
                <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>
                  {step.title}
                </p>
                <p style={{ fontFamily: font.body, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IA SCORE ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: 1180, margin: "0 auto",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center",
          }}
          className="block md:grid"
        >
          <div>
            <SectionLabel color="#EDE9FE" textColor="#5B21B6"><Star size={12} /> {t("iaScore.label")}</SectionLabel>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1.25rem",
              }}
            >
              {t("iaScore.title")}
            </h2>
            <p style={{ fontFamily: font.body, fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              {t("iaScore.desc")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[0, 1, 2, 3, 4].map((idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <CheckCircle size={15} style={{ color: "var(--brand-purple)", flexShrink: 0 }} />
                  <p style={{ fontFamily: font.body, fontSize: "0.9rem", color: "var(--foreground)", flex: 1 }}>{t(`iaScore.items.${idx}.label`)}</p>
                  <span
                    style={{
                      padding: "0.15rem 0.5rem", borderRadius: 999,
                      background: "#EDE9FE", color: "#5B21B6",
                      fontFamily: font.body, fontSize: "0.7rem", fontWeight: 600, flexShrink: 0,
                    }}
                  >
                    {t(`iaScore.items.${idx}.weight`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <ScoreCard score={87} label="Sarah Benjelloun · Lifestyle" />
            <ScoreCard score={74} label="Omar Boutaleb · Fitness" />
          </div>
        </div>
      </section>

      {/* ═══ CAMPAIGN FEED PREVIEW ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--background)", borderBottom: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: 1180, margin: "0 auto",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center",
          }}
          className="block md:grid"
        >
          <div>
            <CampaignFeedPreview />
          </div>
          <div>
            <SectionLabel color="#EDE9FE" textColor="#5B21B6"><BarChart2 size={12} /> {t("feed.label")}</SectionLabel>
            <h2
              style={{
                fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                color: "var(--foreground)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1.25rem",
              }}
            >
              {t("feed.title")}
            </h2>
            <p style={{ fontFamily: font.body, fontSize: "0.9375rem", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {t("feed.desc")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <CheckCircle size={15} style={{ color: "var(--brand-success)", flexShrink: 0 }} />
                  <p style={{ fontFamily: font.body, fontSize: "0.9rem", color: "var(--foreground)" }}>{t(`feed.points.${idx}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SUPPORTED PLATFORMS ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionLabel color="#EDE9FE" textColor="#5B21B6">{t("platforms.label")}</SectionLabel>
            <h2 style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", color: "var(--foreground)", letterSpacing: "-0.03em" }}>
              {t("platforms.title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }} className="grid-cols-2 md:grid-cols-4">
            <PlatformBadge name="Instagram" icon={<InstagramIcon size={22} />} color="#E1306C" followers={t("platforms.p1_follow")} />
            <PlatformBadge name="TikTok" icon={<TiktokIcon size={22} />} color="#000000" followers={t("platforms.p2_follow")} />
            <PlatformBadge name="YouTube" icon={<YoutubeIcon size={22} />} color="#FF0000" followers={t("platforms.p3_follow")} />
            <PlatformBadge name="Facebook" icon={<FacebookIcon size={22} />} color="#1877F2" followers={t("platforms.p4_follow")} />
          </div>
          <p style={{ textAlign: "center", fontFamily: font.body, fontSize: "0.875rem", color: "var(--muted-foreground)", marginTop: "1.5rem" }}>
            {t("platforms.more")}
          </p>
        </div>
      </section>

      {/* ═══ PAYMENTS ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--background)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center", marginBottom: "3rem" }}>
          <SectionLabel color="#EDE9FE" textColor="#5B21B6"><CreditCard size={12} /> {t("payments.label")}</SectionLabel>
          <h2 style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", color: "var(--foreground)", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
            {t("payments.title")}
          </h2>
          <p style={{ fontFamily: font.body, fontSize: "1rem", color: "var(--muted-foreground)", maxWidth: "44ch", margin: "0 auto" }}>
            {t("payments.desc")}
          </p>
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {[
            { icon: <Shield size={20} />, title: t("payments.items.0.title"), desc: t("payments.items.0.desc") },
            { icon: <CheckCheck size={20} />, title: t("payments.items.1.title"), desc: t("payments.items.1.desc") },
            { icon: <CreditCard size={20} />, title: t("payments.items.2.title"), desc: t("payments.items.2.desc") },
          ].map((item) => (
            <div key={item.title} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.5rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: "#EDE9FE", color: "var(--brand-purple)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                {item.icon}
              </div>
              <p style={{ fontFamily: font.heading, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>{item.title}</p>
              <p style={{ fontFamily: font.body, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionLabel color="#EDE9FE" textColor="#5B21B6"><Star size={12} /> {t("testimonials.label")}</SectionLabel>
            <h2 style={{ fontFamily: font.heading, fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", color: "var(--foreground)", letterSpacing: "-0.03em" }}>
              {t("testimonials.title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <Testimonial
              quote="I had 4,200 followers when I joined. Within 3 weeks, I'd landed two paid campaigns with brands I actually love. The matching is genuinely impressive."
              name="Nadia Benali"
              handle="@nadiab.lifestyle · 8.4K IG"
              score={81}
              color="#EC4899"
            />
            <Testimonial
              quote="The AI Score gave me confidence to pitch larger brands. I showed them my score instead of follower count and that changed the conversation entirely."
              name="Karim Eddine"
              handle="@karimedtech · 22K TikTok"
              score={89}
              color="#7C3AED"
            />
            <Testimonial
              quote="I've used other platforms. InfluencIA is the only one where payment actually came on time, every time. The escrow system is a game-changer."
              name="Fatima Ouali"
              handle="@fatima.wellness · 14K IG"
              score={77}
              color="#2563EB"
            />
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: "5rem 1.5rem", background: "#090D16", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: font.heading, fontWeight: 800, fontSize: "clamp(1.875rem, 4vw, 2.5rem)", color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.15, marginBottom: "1rem" }}>
            {t("cta.title_part1")}<br />{t("cta.title_part2")}
          </h2>
          <p style={{ fontFamily: font.body, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "2rem" }}>
            {t("cta.desc")}
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.8125rem 1.75rem", borderRadius: "0.625rem",
              background: "var(--brand-purple)", color: "#fff",
              fontFamily: font.body, fontSize: "0.9375rem", fontWeight: 500,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
            }}
          >
            {t("cta.btn")} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
