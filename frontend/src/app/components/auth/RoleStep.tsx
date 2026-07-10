import { Users, BarChart2, Check, TrendingUp, Star, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TiktokIcon, InstagramIcon, YoutubeIcon } from "../ui/SocialIcons";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };
export type Role = "influencer" | "brand";

function CreatorVisual() {
  const { t } = useTranslation("auth");
  const r = 32, circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", padding: "0.875rem" }}>
      {/* Score ring row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.75rem 1rem", background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: "0.625rem" }}>
        <svg width={68} height={68} viewBox="0 0 68 68">
          <circle cx={34} cy={34} r={r} fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth={5} />
          <circle cx={34} cy={34} r={r} fill="none" stroke="#7C3AED" strokeWidth={5} strokeLinecap="round"
            strokeDasharray={`${(87 / 100) * circ} ${circ * 0.13}`} strokeDashoffset={circ / 4} />
          <text x={34} y={38} textAnchor="middle" style={{ fontFamily: f.h, fontWeight: 800, fontSize: "0.9rem", fill: "var(--foreground)" }}>87</text>
        </svg>
        <div>
          <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.8125rem", color: "var(--foreground)" }}>Sarah B.</p>
          <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>Lifestyle · 98K</p>
          <div style={{ display: "flex", gap: "0.25rem", marginTop: "0.25rem" }}>
            {[t("register.role_step.creator.visual.badge1"), t("register.role_step.creator.visual.badge2")].map(t => (
              <span key={t} style={{ padding: "0.1rem 0.375rem", borderRadius: 999, background: "rgba(124,58,237,0.12)", color: "#7C3AED", fontFamily: f.b, fontSize: "0.6rem", fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Platforms */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {[
          { label: "IG", icon: <InstagramIcon size={12} />, color: "#E1306C" },
          { label: "TK", icon: <TiktokIcon size={12} />, color: "#000" },
          { label: "YT", icon: <YoutubeIcon size={12} />, color: "#FF0000" },
        ].map(p => (
          <div key={p.label} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.2rem", flex: 1, padding: "0.375rem", borderRadius: "0.375rem", background: `${p.color}12`, border: `1px solid ${p.color}20`, textAlign: "center" }}>
            <span style={{ color: p.color }}>{p.icon}</span>
            <span style={{ fontFamily: f.b, fontWeight: 700, fontSize: "0.65rem", color: p.color }}>{p.label}</span>
          </div>
        ))}
        <div style={{ flex: 1, padding: "0.375rem", borderRadius: "0.375rem", background: "var(--muted)", textAlign: "center" }}>
          <span style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{t("register.role_step.creator.visual.more")}</span>
        </div>
      </div>
      {/* Pay chip */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.75rem", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "0.5rem" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
        <span style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 500, color: "#065F46" }}>{t("register.role_step.creator.visual.payment")}</span>
      </div>
    </div>
  );
}

function BrandVisual() {
  const { t } = useTranslation("auth");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", padding: "0.875rem" }}>
      {/* Campaign card */}
      <div style={{ padding: "0.75rem 1rem", background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.14)", borderRadius: "0.625rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "rgba(37,99,235,0.12)", color: "#1D4ED8", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>{t("register.role_step.brand.visual.campaign")}</span>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", display: "block", boxShadow: "0 0 0 2px #10B98120" }} />
        </div>
        <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.8rem", color: "var(--foreground)" }}>Skincare Lancement</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.375rem", marginTop: "0.5rem" }}>
          {[{ v: "145", l: "creators" }, { v: "1.4M", l: "reach" }, { v: "3.7×", l: "ROI" }].map(m => (
            <div key={m.l} style={{ textAlign: "center", padding: "0.25rem", background: "var(--muted)", borderRadius: "0.25rem" }}>
              <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", color: "var(--foreground)" }}>{m.v}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.6rem", color: "var(--muted-foreground)" }}>{m.l}</p>
            </div>
          ))}
        </div>
      </div>
      {/* AI match */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.5rem 0.75rem", background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.14)", borderRadius: "0.5rem" }}>
        <Zap size={14} style={{ color: "#2563EB", flexShrink: 0 }} />
        <div>
          <span style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.75rem", color: "var(--foreground)" }}>{t("register.role_step.brand.visual.match")}</span>
          <p style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{t("register.role_step.brand.visual.match_sub")}</p>
        </div>
      </div>
      {/* ROI trend */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 0.75rem", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "0.5rem" }}>
        <TrendingUp size={13} style={{ color: "#10B981" }} />
        <span style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 500, color: "#065F46" }}>{t("register.role_step.brand.visual.roi_trend")}</span>
      </div>
    </div>
  );
}

export function RoleStep({
  selected,
  onSelect,
}: {
  selected: Role | null;
  onSelect: (r: Role) => void;
}) {
  const { t } = useTranslation("auth");

  const cards: { role: Role; title: string; sub: string; icon: React.ReactNode; iconBg: string; iconColor: string; visual: React.ReactNode; points: string[] }[] = [
    {
      role: "influencer",
      title: t("register.role_step.creator.title"),
      sub: t("register.role_step.creator.sub"),
      icon: <Users size={22} />,
      iconBg: "#EDE9FE",
      iconColor: "#7C3AED",
      visual: <CreatorVisual />,
      points: [
        t("register.role_step.creator.points.0"),
        t("register.role_step.creator.points.1"),
        t("register.role_step.creator.points.2")
      ],
    },
    {
      role: "brand",
      title: t("register.role_step.brand.title"),
      sub: t("register.role_step.brand.sub"),
      icon: <BarChart2 size={22} />,
      iconBg: "#DBEAFE",
      iconColor: "#2563EB",
      visual: <BrandVisual />,
      points: [
        t("register.role_step.brand.points.0"),
        t("register.role_step.brand.points.1"),
        t("register.role_step.brand.points.2")
      ],
    },
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.625rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.5rem" }}>
          {t("register.role_step.title")}
        </h2>
        <p style={{ fontFamily: f.b, fontSize: "0.9rem", color: "var(--muted-foreground)" }}>
          {t("register.role_step.desc")}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="grid-cols-1 sm:grid-cols-2">
        {cards.map((c) => {
          const isSelected = selected === c.role;
          return (
            <button
              key={c.role}
              onClick={() => onSelect(c.role)}
              style={{
                background: "var(--card)",
                border: `2px solid ${isSelected ? (c.role === "influencer" ? "#7C3AED" : "#2563EB") : "var(--border)"}`,
                borderRadius: "1rem",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
                overflow: "hidden",
                position: "relative",
                transition: "border-color .15s, box-shadow .15s",
                boxShadow: isSelected ? `0 0 0 4px ${c.role === "influencer" ? "rgba(124,58,237,0.12)" : "rgba(37,99,235,0.12)"}` : "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              {/* Selected indicator */}
              {isSelected && (
                <div
                  style={{
                    position: "absolute", top: 12, right: 12,
                    width: 22, height: 22, borderRadius: "50%",
                    background: c.role === "influencer" ? "#7C3AED" : "#2563EB",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Check size={12} color="#fff" />
                </div>
              )}

              {/* Header */}
              <div style={{ padding: "1.25rem 1.125rem 0" }}>
                <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: c.iconColor, marginBottom: "0.75rem" }}>
                  {c.icon}
                </div>
                <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>
                  {c.title}
                </p>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: "0.875rem" }}>
                  {c.sub}
                </p>
              </div>

              {/* Visual */}
              <div style={{ borderTop: "1px solid var(--border)", background: "var(--background)" }}>
                {c.visual}
              </div>

              {/* Points */}
              <div style={{ padding: "0.875rem 1.125rem" }}>
                {c.points.map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: c.iconColor, flexShrink: 0 }} />
                    <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{p}</span>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
