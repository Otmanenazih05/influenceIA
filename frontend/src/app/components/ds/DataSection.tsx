import { TrendingUp, ArrowUpRight, Users, Eye, BarChart2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { SectionHeader, SubSection, DSCard, Label } from "./DSLayout";

const chartData = [
  { date: "01 Mai", impressions: 12000, engagements: 4200 },
  { date: "05 Mai", impressions: 19000, engagements: 6800 },
  { date: "10 Mai", impressions: 16000, engagements: 5200 },
  { date: "15 Mai", impressions: 28000, engagements: 9400 },
  { date: "20 Mai", impressions: 24000, engagements: 7900 },
  { date: "25 Mai", impressions: 38000, engagements: 13200 },
  { date: "31 Mai", impressions: 45000, engagements: 16500 },
];

const influencers = [
  { name: "Sarah Benjelloun",  category: "Lifestyle",    followers: "98K",   score: 87, platform: "IG" },
  { name: "Youssef El Amrani", category: "Tech",         followers: "142K",  score: 82, platform: "YT" },
  { name: "Lina Zahra",        category: "Beauty",       followers: "67K",   score: 79, platform: "TK" },
  { name: "Omar Boutaleb",     category: "Fitness",      followers: "51K",   score: 76, platform: "IG" },
  { name: "Fatima Moussaoui",  category: "Food",         followers: "38K",   score: 71, platform: "IG" },
];

const activityItems = [
  { avatar: "S", name: "Sarah Benjelloun", action: "a postulé à votre campagne", time: "il y a 2h", color: "#2563EB" },
  { avatar: "Y", name: "Youssef El Amrani", action: "a accepté la collaboration", time: "il y a 4h", color: "#7C3AED" },
  { avatar: "L", name: "Lina Zahra", action: "a soumis son contenu", time: "il y a 6h", color: "#EC4899" },
  { avatar: "O", name: "Omar Boutaleb", action: "a été approuvé", time: "il y a 1j", color: "#10B981" },
];

function KPIWidget({ title, value, sub, icon, iconBg }: {
  title: string; value: string; sub: string; icon: React.ReactNode; iconBg: string;
}) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
    >
      <div
        style={{ width: 40, height: 40, borderRadius: "0.625rem", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)", fontWeight: 500 }}>{title}</p>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", lineHeight: 1.2 }}>{value}</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "var(--brand-success)", fontWeight: 500, display: "flex", alignItems: "center", gap: 2 }}>
          <TrendingUp size={11} /> {sub}
        </p>
      </div>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "var(--brand-blue)" : score >= 70 ? "var(--brand-success)" : "var(--brand-warning)";
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 38, height: 22, borderRadius: "999px",
        background: `${color}15`, color,
        fontFamily: "'Poppins', sans-serif", fontSize: "0.75rem", fontWeight: 700,
        border: `1px solid ${color}40`,
      }}
    >
      {score}
    </span>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  const map: Record<string, string> = { IG: "#E1306C", YT: "#FF0000", TK: "#000000" };
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 28, height: 20, borderRadius: "0.25rem",
        background: `${map[platform] ?? "#6B7280"}18`,
        color: map[platform] ?? "#6B7280",
        fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700,
      }}
    >
      {platform}
    </span>
  );
}

export function DataSection() {
  return (
    <div>
      <SectionHeader
        title="Data Display"
        description="KPI widgets, line chart containers, influencer tables, and activity list patterns."
      />

      <SubSection title="KPI Widgets">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <KPIWidget title="Active Campaigns" value="12" sub="+20% ce mois" icon={<BarChart2 size={18} color="var(--brand-blue)" />} iconBg="#2563EB18" />
          <KPIWidget title="Influencers Engaged" value="145" sub="+15% ce mois" icon={<Users size={18} color="var(--brand-purple)" />} iconBg="#7C3AED18" />
          <KPIWidget title="Total Impressions" value="1.2M" sub="+32% ce mois" icon={<Eye size={18} color="var(--brand-pink)" />} iconBg="#EC489918" />
          <KPIWidget title="Avg. ROI" value="3.7×" sub="+18% ce mois" icon={<TrendingUp size={18} color="var(--brand-success)" />} iconBg="#10B98118" />
        </div>
      </SubSection>

      <SubSection title="Chart Container">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>
                Performances des campagnes
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                01 Mai – 31 Mai 2024
              </p>
            </div>
            <div className="flex items-center gap-3">
              {[
                { label: "Impressions", color: "var(--chart-1)" },
                { label: "Engagements", color: "var(--chart-2)" },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 10, height: 3, borderRadius: 999, background: l.color, display: "inline-block" }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fill: "var(--muted-foreground)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.5rem",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    color: "var(--foreground)",
                  }}
                />
                <Line type="monotone" dataKey="impressions" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="engagements" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} strokeDasharray="5 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </SubSection>

      <SubSection title="Data Table">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                {["Créateur", "Catégorie", "Followers", "Plateforme", "Score IA", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.625rem 1rem",
                      textAlign: "left",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--muted-foreground)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {influencers.map((row, i) => (
                <tr
                  key={row.name}
                  style={{
                    borderBottom: i < influencers.length - 1 ? "1px solid var(--border)" : "none",
                    background: i % 2 === 0 ? "transparent" : "var(--muted)/20",
                  }}
                >
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <div
                        style={{
                          width: 30, height: 30, borderRadius: "50%",
                          background: `linear-gradient(135deg, ${["#2563EB","#7C3AED","#EC4899","#10B981","#F59E0B"][i]}, ${["#7C3AED","#EC4899","#10B981","#F59E0B","#2563EB"][i]})`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#fff" }}>
                          {row.name[0]}
                        </span>
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", fontWeight: 500, color: "var(--foreground)" }}>
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
                      {row.category}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: "var(--foreground)" }}>
                      {row.followers}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <PlatformBadge platform={row.platform} />
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <ScoreBadge score={row.score} />
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <button
                      style={{
                        display: "flex", alignItems: "center", gap: 3,
                        padding: "0.25rem 0.625rem", borderRadius: "0.375rem",
                        border: "1px solid var(--border)", background: "var(--card)",
                        color: "var(--primary)", cursor: "pointer",
                        fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 500,
                      }}
                    >
                      View <ArrowUpRight size={11} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SubSection>

      <SubSection title="Activity List">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {activityItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "center", gap: "0.875rem",
                padding: "0.875rem 1.125rem",
                borderBottom: i < activityItems.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div
                style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: `${item.color}22`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: item.color,
                  fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.875rem",
                }}
              >
                {item.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", color: "var(--foreground)" }}>
                  <strong style={{ fontWeight: 600 }}>{item.name}</strong>{" "}
                  <span style={{ color: "var(--muted-foreground)" }}>{item.action}</span>
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: 1 }}>
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SubSection>
    </div>
  );
}
