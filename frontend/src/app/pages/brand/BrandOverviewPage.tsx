import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  TrendingUp, Users, BarChart2, CreditCard, Clock, AlertCircle,
  ArrowRight, Plus, Sparkles, CheckCircle, ChevronRight, Zap,
  Target, Megaphone,
} from "lucide-react";
import { TiktokIcon, InstagramIcon, YoutubeIcon } from "../../components/ui/SocialIcons";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import {
  brandActivityFeed, overviewChartData,
} from "../../data/brandCampaigns";
import api from "../../../lib/api";
import { useAuth } from "../../../contexts/AuthContext";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

/* ─── KPI Card ─── */
function KPICard({ title, value, sub, subColor = "var(--muted-foreground)", icon, iconBg, iconColor, featured, alert }: {
  title: string; value: string; sub?: string; subColor?: string;
  icon: React.ReactNode; iconBg: string; iconColor: string;
  featured?: boolean; alert?: boolean;
}) {
  return (
    <div style={{
      background: featured ? "linear-gradient(150deg, #1E3A8A, #2563EB)" : "var(--card)",
      border: alert ? "1px solid #FECACA" : featured ? "none" : "1px solid var(--border)",
      borderRadius: "0.875rem", padding: "1.25rem",
      boxShadow: featured ? "var(--shadow-primary)" : "var(--shadow-xs)",
      position: "relative", overflow: "hidden",
    }}>
      {featured && <div style={{ position: "absolute", top: -24, right: -24, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: featured ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)" }}>{title}</p>
        <div style={{ width: 34, height: 34, borderRadius: "0.625rem", background: featured ? "rgba(255,255,255,0.15)" : iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: featured ? "#fff" : iconColor }}>
          {icon}
        </div>
      </div>
      <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.875rem", color: featured ? "#fff" : alert ? "#991B1B" : "var(--foreground)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{value}</p>
      {sub && <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: featured ? "rgba(255,255,255,0.6)" : subColor, marginTop: "0.375rem" }}>{sub}</p>}
    </div>
  );
}

/* ─── Campaign status row ─── */
const STATUS_CFG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  draft:     { label: "Draft",    color: "#6B7280", bg: "var(--muted)",  dot: "#9CA3AF" },
  active:    { label: "Active",   color: "#065F46", bg: "#D1FAE5",       dot: "#10B981" },
  reviewing: { label: "Reviewing",color: "#92400E", bg: "#FEF3C7",       dot: "#F59E0B" },
  paused:    { label: "Paused",   color: "#1D4ED8", bg: "#DBEAFE",       dot: "#2563EB" },
  completed: { label: "Completed",color: "#5B21B6", bg: "#EDE9FE",       dot: "#7C3AED" },
};

function CampaignRow({ c }: { c: any }) {
  const sc = STATUS_CFG[c.status] ?? STATUS_CFG.draft;
  return (
    <Link to={`/brand/campaigns/${c.id}`} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.75rem 1.125rem", borderBottom: "1px solid var(--border)", textDecoration: "none", transition: "background .12s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--background)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</p>
        <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{c.category || (c.niches && c.niches[0]) || 'Campaign'}</p>
      </div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.2rem 0.625rem", borderRadius: 999, background: sc.bg, color: sc.color, fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600, flexShrink: 0 }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot }} />{sc.label}
      </span>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{c.applicants_count || 0}</p>
        <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>applicants</p>
      </div>
      <ChevronRight size={14} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
    </Link>
  );
}

/* ─── Activity item ─── */
function ActivityItem({ item }: { item: typeof brandActivityFeed[0] }) {
  const iconMap: Record<string, React.ReactNode> = {
    user:    <Users size={13} />,
    check:   <CheckCircle size={13} />,
    alert:   <AlertCircle size={13} />,
    star:    <Sparkles size={13} />,
    trophy:  <TrendingUp size={13} />,
  };
  return (
    <div style={{ display: "flex", gap: "0.75rem", paddingBottom: "0.875rem", marginBottom: "0.875rem", borderBottom: "1px solid var(--border)" }}>
      <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${item.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color, flexShrink: 0 }}>
        {iconMap[item.icon] ?? <Users size={13} />}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--foreground)", lineHeight: 1.5 }}>
          <strong style={{ fontWeight: 600 }}>{item.brand}</strong>
          {item.campaign && <> — <span style={{ color: "var(--muted-foreground)" }}>{item.campaign}</span></>}
        </p>
        <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)", marginTop: 1 }}>{item.text} · {item.time}</p>
      </div>
    </div>
  );
}

/* ─── Custom tooltip ─── */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.625rem", padding: "0.75rem 1rem", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", fontFamily: f.b, fontSize: "0.78rem" }}>
      <p style={{ fontWeight: 600, color: "var(--foreground)", marginBottom: "0.375rem" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color, marginBottom: 2 }}>{p.name}: {p.name === "spend" ? `${(p.value / 1000).toFixed(1)}K MAD` : p.name === "impressions" ? `${(p.value / 1000).toFixed(0)}K` : p.value.toLocaleString()}</p>
      ))}
    </div>
  );
}

export function BrandOverviewPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [paymentSummary, setPaymentSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Dynamic greeting based on hour
  const hour = new Date().getHours();
  const greetingWord = hour < 12 ? (isFr ? "Bonjour" : "Good morning") : hour < 18 ? (isFr ? "Bonjour" : "Good afternoon") : (isFr ? "Bonsoir" : "Good evening");
  const brandName = user?.brand_profile?.company_name || user?.name || (isFr ? "Marque" : "Brand");

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const [campaignsRes, paymentsRes] = await Promise.all([
          api.get("/api/campaigns/mine"),
          api.get("/api/payments/brand-summary")
        ]);
        setCampaigns(campaignsRes.data.data);
        setPaymentSummary(paymentsRes.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load overview data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOverviewData();
  }, []);

  if (isLoading) {
    return <div style={{ padding: "3rem", color: "var(--muted-foreground)", fontFamily: f.b }}>Loading overview...</div>;
  }
  if (error) {
    return <div style={{ padding: "3rem", color: "#EF4444", fontFamily: f.b }}>{error}</div>;
  }

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const totalBudgetSpent = paymentSummary?.total_released || 0;
  const totalEngaged = campaigns.reduce((s, c) => s + (c.accepted_count || 0), 0);
  const pendingApprovals = campaigns.reduce((s, c) => s + (c.pending_approvals_count || 0), 0);
  const avgROI = 3.4;
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div style={{ padding: "1.75rem 1.5rem 4rem" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
            {greetingWord}, {brandName} 👋
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>{today} · {activeCampaigns} {isFr ? "campagnes actives" : "active campaigns"}</p>
        </div>
        <div style={{ display: "flex", gap: "0.625rem" }}>
          <Link to="/brand/creators" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 0.875rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", textDecoration: "none", fontFamily: f.b, fontSize: "0.875rem" }}>
            <Users size={14} /> {isFr ? "Parcourir les créateurs" : "Browse creators"}
          </Link>
          <Link to="/brand/campaigns/new" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", textDecoration: "none", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, boxShadow: "var(--shadow-primary)" }}>
            <Plus size={14} /> {isFr ? "Nouvelle campagne" : "New campaign"}
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ gap: "0.875rem", marginBottom: "1.5rem" }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <KPICard title="Active Campaigns" value={String(activeCampaigns)} sub="running now" icon={<Megaphone size={16} />} iconBg="#DBEAFE" iconColor="#1D4ED8" featured />
        <KPICard title="Creators Engaged" value={String(totalEngaged)} sub="across campaigns" icon={<Users size={16} />} iconBg="#EDE9FE" iconColor="#5B21B6" />
        <KPICard title="Avg. ROI" value={`${avgROI}×`} sub="avg return on spend" subColor="#10B981" icon={<TrendingUp size={16} />} iconBg="#D1FAE5" iconColor="#065F46" />
        <KPICard title="Budget Spent" value={`${(totalBudgetSpent / 1000).toFixed(1)}K MAD`} sub="this month" icon={<CreditCard size={16} />} iconBg="#FEF3C7" iconColor="#92400E" />
        <KPICard title="Pending Approvals" value={String(pendingApprovals)} sub="content items" subColor={pendingApprovals > 0 ? "#EF4444" : "var(--muted-foreground)"} icon={<AlertCircle size={16} />} iconBg="#FEE2E2" iconColor="#991B1B" alert={pendingApprovals > 0} />
      </div>

      {/* Main grid */}
      <div style={{ gap: "1.25rem", marginBottom: "1.25rem" }} className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr]">

        {/* Performance chart */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.375rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div>
              <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)", letterSpacing: "-0.01em" }}>Campaign Performance</h2>
              <p style={{ fontFamily: f.b, fontSize: "0.78rem", color: "var(--muted-foreground)" }}>Impressions, engagements & spend — May → June 2024</p>
            </div>
            <div style={{ display: "flex", gap: "0.875rem" }}>
              {[
                { label: "Impressions", color: "#2563EB" },
                { label: "Engagements", color: "#7C3AED" },
                { label: "Spend (MAD)", color: "#EC4899" },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, display: "inline-block" }} />
                  <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overviewChartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontFamily: f.b, fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: f.b, fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="impressions" name="impressions" stroke="#2563EB" strokeWidth={2} fill="rgba(37,99,235,0.07)" dot={false} />
                <Area type="monotone" dataKey="engagements" name="engagements" stroke="#7C3AED" strokeWidth={2} fill="rgba(124,58,237,0.06)" dot={false} />
                <Area type="monotone" dataKey="spend" name="spend" stroke="#EC4899" strokeWidth={2} fill="rgba(236,72,153,0.05)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity feed */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.375rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.125rem" }}>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>Activity</h2>
            <Link to="/brand/campaigns" style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--primary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              View all <ChevronRight size={13} />
            </Link>
          </div>
          <div>
            {brandActivityFeed.map((item, i) => (
              <div key={item.id} style={{ paddingBottom: i < brandActivityFeed.length - 1 ? "0.875rem" : 0, marginBottom: i < brandActivityFeed.length - 1 ? "0.875rem" : 0, borderBottom: i < brandActivityFeed.length - 1 ? "1px solid var(--border)" : "none" }}>
                <ActivityItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ gap: "1.25rem" }} className="flex flex-col lg:grid lg:grid-cols-2">

        {/* Campaigns overview */}
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden" }}>
          <div style={{ padding: "1.125rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>Campaigns</h2>
            <Link to="/brand/campaigns" style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--primary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.2rem" }}>
              All campaigns <ChevronRight size={13} />
            </Link>
          </div>
          {campaigns.slice(0, 4).map((c) => <CampaignRow key={c.id} c={c} />)}
        </div>

        {/* Quick actions + stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Quick actions */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.25rem" }}>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Quick actions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { to: "/brand/campaigns/new",    icon: <Plus size={15} />,    bg: "#DBEAFE", color: "#1D4ED8", label: "Create a new campaign",     sub: "Launch a paid or gifted campaign" },
                { to: "/brand/creators",          icon: <Users size={15} />,   bg: "#EDE9FE", color: "#5B21B6", label: "Browse creator profiles",   sub: "Search by niche, tier, location" },
                { to: "/brand/campaigns",         icon: <AlertCircle size={15}/>, bg: "#FEE2E2", color: "#991B1B", label: `Review ${pendingApprovals} pending submissions`, sub: "Approve or request revisions" },
              ].map((action, i) => (
                <Link key={i} to={action.to} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.75rem", borderRadius: "0.625rem", background: "var(--background)", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color .15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.3)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
                  <div style={{ width: 34, height: 34, borderRadius: "0.5rem", background: action.bg, display: "flex", alignItems: "center", justifyContent: "center", color: action.color, flexShrink: 0 }}>
                    {action.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{action.label}</p>
                    <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{action.sub}</p>
                  </div>
                  <ChevronRight size={14} style={{ marginLeft: "auto", color: "var(--muted-foreground)" }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Platform distribution */}
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.25rem" }}>
            <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Platform mix</h2>
            {[
              { platform: "Instagram", icon: <InstagramIcon size={14} />, color: "#E1306C", pct: 68, campaigns: 3 },
              { platform: "TikTok",    icon: <TiktokIcon size={14} />,      color: "#010101", pct: 24, campaigns: 2 },
              { platform: "YouTube",   icon: <YoutubeIcon size={14} />,   color: "#FF0000", pct: 8,  campaigns: 1 },
            ].map((p) => (
              <div key={p.platform} style={{ marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <span style={{ color: p.color }}>{p.icon}</span>
                    <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--foreground)" }}>{p.platform}</span>
                  </div>
                  <span style={{ fontFamily: f.b, fontSize: "0.78rem", fontWeight: 500, color: "var(--foreground)" }}>{p.pct}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 999, background: "var(--muted)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${p.pct}%`, borderRadius: 999, background: p.color, opacity: 0.8 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
