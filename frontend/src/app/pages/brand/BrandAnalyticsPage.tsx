import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TrendingUp, Users, Eye, Heart, DollarSign,
  ArrowUp, Zap, ChevronRight,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import { TiktokIcon, InstagramIcon, YoutubeIcon } from "../../components/ui/SocialIcons";
import { Link } from "react-router";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

const performanceData = [
  { month: "Jan", impressions: 42000, engagements: 3100, spend: 8200 },
  { month: "Feb", impressions: 58000, engagements: 4400, spend: 11500 },
  { month: "Mar", impressions: 71000, engagements: 5800, spend: 14300 },
  { month: "Apr", impressions: 65000, engagements: 5200, spend: 12800 },
  { month: "May", impressions: 89000, engagements: 7100, spend: 17600 },
  { month: "Jun", impressions: 112000, engagements: 9400, spend: 22100 },
];

const creatorROIData = [
  { name: "GlowLab Morocco", roi: 4.2, spend: 5000, color: "#E1306C" },
  { name: "AtlasBrand",      roi: 3.8, spend: 3500, color: "#010101" },
  { name: "NovaBio",         roi: 3.1, spend: 4200, color: "#2563EB" },
  { name: "VertMaroc",       roi: 2.9, spend: 6000, color: "#10B981" },
];

const platformData = [
  { platform: "Instagram", impressions: 68000, engagements: 5800, cpe: 1.2, color: "#E1306C" },
  { platform: "TikTok",    impressions: 32000, engagements: 2900, cpe: 0.9, color: "#010101" },
  { platform: "YouTube",   impressions: 12000, engagements: 700,  cpe: 2.1, color: "#FF0000" },
];

function KPICard({ title, value, sub, trend, icon, iconBg, iconColor, featured }: {
  title: string; value: string; sub?: string; trend?: string;
  icon: React.ReactNode; iconBg: string; iconColor: string; featured?: boolean;
}) {
  return (
    <div style={{
      background: featured ? "linear-gradient(135deg, #1E3A8A, #2563EB)" : "var(--card)",
      border: featured ? "none" : "1px solid var(--border)",
      borderRadius: "0.875rem", padding: "1.25rem",
      boxShadow: featured ? "0 6px 24px rgba(37,99,235,0.25)" : "var(--shadow-xs)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: featured ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)" }}>{title}</p>
        <div style={{ width: 34, height: 34, borderRadius: "0.625rem", background: featured ? "rgba(255,255,255,0.18)" : iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: featured ? "#fff" : iconColor }}>
          {icon}
        </div>
      </div>
      <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.875rem", color: featured ? "#fff" : "var(--foreground)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{value}</p>
      {sub && <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: featured ? "rgba(255,255,255,0.6)" : "var(--muted-foreground)", marginTop: "0.375rem" }}>{sub}</p>}
      {trend && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.5rem" }}>
          <ArrowUp size={12} style={{ color: "#10B981" }} />
          <span style={{ fontFamily: f.b, fontSize: "0.72rem", color: "#10B981", fontWeight: 600 }}>{trend}</span>
        </div>
      )}
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.625rem", padding: "0.75rem 1rem", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", fontFamily: f.b, fontSize: "0.78rem" }}>
      <p style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: "0.375rem" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: {p.name === "spend" ? `${(p.value / 1000).toFixed(1)}K MAD` : p.name === "impressions" ? `${(p.value / 1000).toFixed(0)}K` : p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export function BrandAnalyticsPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const totalImpressions = performanceData.reduce((s, d) => s + d.impressions, 0);
  const totalEngagements = performanceData.reduce((s, d) => s + d.engagements, 0);
  const totalSpend = performanceData.reduce((s, d) => s + d.spend, 0);
  const avgEngRate = ((totalEngagements / totalImpressions) * 100).toFixed(1);

  return (
    <div style={{ padding: "1.75rem 1.5rem 4rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
            {isFr ? "Analyses & Performance" : "Analytics & Performance"}
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            {isFr ? "Performances de vos campagnes, ROI des createurs et insights plateformes" : "Campaign performance, creator ROI, and platform insights"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.25rem", background: "var(--muted)", borderRadius: "0.5rem", padding: "0.25rem" }}>
          {(["7d", "30d", "90d"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              style={{ padding: "0.3125rem 0.875rem", borderRadius: "0.375rem", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", background: period === p ? "var(--card)" : "transparent", color: period === p ? "var(--foreground)" : "var(--muted-foreground)", fontWeight: period === p ? 500 : 400, transition: "all .15s", boxShadow: period === p ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.875rem", marginBottom: "1.5rem" }}>
        <KPICard title={isFr ? "Total Impressions" : "Total Impressions"} value={`${(totalImpressions / 1000).toFixed(0)}K`} sub={isFr ? "portee cumulee" : "cumulative reach"} trend="+18% vs last period" icon={<Eye size={16} />} iconBg="#DBEAFE" iconColor="#1D4ED8" featured />
        <KPICard title={isFr ? "Engagements" : "Engagements"} value={`${(totalEngagements / 1000).toFixed(1)}K`} sub={isFr ? "likes, commentaires, partages" : "likes, comments, shares"} trend="+22% vs last period" icon={<Heart size={16} />} iconBg="#EDE9FE" iconColor="#5B21B6" />
        <KPICard title={isFr ? "Taux d'engagement moy." : "Avg. Engagement Rate"} value={`${avgEngRate}%`} sub={isFr ? "sur toutes les plateformes" : "across all platforms"} trend="+0.3% vs last period" icon={<TrendingUp size={16} />} iconBg="#D1FAE5" iconColor="#065F46" />
        <KPICard title={isFr ? "Budget total depense" : "Total Budget Spent"} value={`${(totalSpend / 1000).toFixed(1)}K MAD`} sub={isFr ? "sur toutes les campagnes" : "across all campaigns"} icon={<DollarSign size={16} />} iconBg="#FEF3C7" iconColor="#92400E" />
      </div>

      {/* Main chart */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.375rem", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>
              {isFr ? "Evolution des performances" : "Performance Over Time"}
            </h2>
            <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>
              {isFr ? "Impressions, engagements & depenses - 6 derniers mois" : "Impressions, engagements & spend - last 6 months"}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            {[
              { label: "Impressions", color: "#2563EB" },
              { label: "Engagements", color: "#7C3AED" },
              { label: isFr ? "Depenses" : "Spend", color: "#EC4899" },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, display: "inline-block" }} />
                <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontFamily: f.b, fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: f.b, fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="impressions" name="impressions" stroke="#2563EB" strokeWidth={2} fill="rgba(37,99,235,0.07)" dot={false} />
              <Area type="monotone" dataKey="engagements" name="engagements" stroke="#7C3AED" strokeWidth={2} fill="rgba(124,58,237,0.06)" dot={false} />
              <Area type="monotone" dataKey="spend" name="spend" stroke="#EC4899" strokeWidth={2} fill="rgba(236,72,153,0.05)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom grid */}
      <div style={{ gap: "1.25rem" }} className="grid grid-cols-1 md:grid-cols-2">

        {/* Creator ROI */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden" }}>
          <div style={{ padding: "1.125rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>
                {isFr ? "ROI par createur" : "Creator ROI"}
              </h2>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                {isFr ? "Retour sur investissement par profil" : "Return on investment per creator"}
              </p>
            </div>
            <Link to="/brand/creators" style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--primary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              {isFr ? "Explorer" : "Explore"} <ChevronRight size={13} />
            </Link>
          </div>
          <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {creatorROIData.map((c) => (
              <div key={c.name}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${c.color}18`, border: `1.5px solid ${c.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.65rem", color: c.color }}>{c.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.8125rem", color: "var(--foreground)" }}>{c.name}</p>
                      <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>{c.spend.toLocaleString()} MAD {isFr ? "depenses" : "spent"}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Zap size={12} style={{ color: "#10B981" }} />
                    <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "#10B981" }}>{c.roi}x</span>
                  </div>
                </div>
                <div style={{ height: 4, borderRadius: 999, background: "var(--muted)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(c.roi / 5) * 100}%`, borderRadius: 999, background: c.color, opacity: 0.7 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform breakdown */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden" }}>
          <div style={{ padding: "1.125rem 1.25rem", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>
              {isFr ? "Performance par plateforme" : "Platform Performance"}
            </h2>
            <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
              {isFr ? "Impressions, engagements et cout par engagement" : "Impressions, engagement & cost per engagement"}
            </p>
          </div>
          <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {platformData.map((p) => {
              const iconEl = p.platform === "Instagram" ? <InstagramIcon size={16} /> : p.platform === "TikTok" ? <TiktokIcon size={16} /> : <YoutubeIcon size={16} />;
              const total = platformData.reduce((s, x) => s + x.impressions, 0);
              const pct = Math.round((p.impressions / total) * 100);
              return (
                <div key={p.platform}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ color: p.color }}>{iconEl}</span>
                      <span style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{p.platform}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{pct}%</p>
                      <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>{(p.impressions / 1000).toFixed(0)}K imp.</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: 8 }}>
                    <div style={{ flex: 1, padding: "0.375rem 0.625rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.375rem", textAlign: "center" }}>
                      <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.78rem", color: "#10B981" }}>{p.engagements.toLocaleString()}</p>
                      <p style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{isFr ? "engagements" : "engagements"}</p>
                    </div>
                    <div style={{ flex: 1, padding: "0.375rem 0.625rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.375rem", textAlign: "center" }}>
                      <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.78rem", color: "#F59E0B" }}>{p.cpe} MAD</p>
                      <p style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>CPE</p>
                    </div>
                  </div>
                  <div style={{ height: 4, borderRadius: 999, background: "var(--muted)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, borderRadius: 999, background: p.color, opacity: 0.75 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
