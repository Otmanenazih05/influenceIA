import { Link } from "react-router";
import {
  TrendingUp, TrendingDown, CreditCard, Clock, CheckCircle,
  ArrowRight, Sparkles, Instagram, Play, Calendar,
  Zap, AlertCircle, Check, ChevronRight, BarChart2, Star,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { useAuth } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { CampaignDrawer } from "../../components/dashboard/CampaignDrawer";
import type { Campaign } from "./CampaignsPage";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

/* ─── Data ─── */
const engagementData = [
  { week: "W1", rate: 4.2 }, { week: "W2", rate: 5.1 },
  { week: "W3", rate: 4.8 }, { week: "W4", rate: 6.2 },
  { week: "W5", rate: 5.9 }, { week: "W6", rate: 7.1 },
  { week: "W7", rate: 6.8 }, { week: "W8", rate: 8.3 },
];

const activityFeed = [
  { id: 1, icon: Zap,          color: "#7C3AED", bg: "#EDE9FE", title: "GlowLab Morocco sent you a campaign invitation", sub: "96% match · Beauty & Skincare", time: "2h ago",    dot: "#7C3AED" },
  { id: 2, icon: CheckCircle,  color: "#10B981", bg: "#D1FAE5", title: "Your application to AtlasBrand was accepted",    sub: "Fashion Campaign · 3 500 MAD",  time: "Yesterday", dot: "#10B981" },
  { id: 3, icon: Star,         color: "#F59E0B", bg: "#FEF3C7", title: "Content approved – Skincare Lancement",          sub: "Posted on Instagram",            time: "2 days ago",dot: "#F59E0B" },
  { id: 4, icon: CreditCard,   color: "#2563EB", bg: "#DBEAFE", title: "Payment received: 1 200 MAD",                    sub: "From NovaBio Wellness",          time: "3 days ago",dot: "#2563EB" },
  { id: 5, icon: Sparkles,     color: "#EC4899", bg: "#FCE7F3", title: "New campaign match: VertMaroc (91%)",            sub: "Wellness & Nutrition",           time: "4 days ago",dot: "#EC4899" },
];

const staticRecommendedCampaigns = [
  { id: 1, brand: "GlowLab Morocco", category: "Beauty & Skincare",  budget: "5 000 MAD", match: 96, platform: "IG",   deadline: "4 juin",  color: "#E1306C",  status: "new" },
  { id: 2, brand: "AtlasBrand",      category: "Fashion & Lifestyle", budget: "3 500 MAD", match: 88, platform: "TK",   deadline: "8 juin",  color: "#010101",  status: "open" },
  { id: 3, brand: "NovaBio",         category: "Wellness",            budget: "4 200 MAD", match: 82, platform: "IG",   deadline: "12 juin", color: "#2563EB",  status: "open" },
];

const profileSteps = [
  { label: "Basic info complete",        done: true },
  { label: "Instagram linked (98K)",     done: true },
  { label: "Profile photo added",        done: true },
  { label: "Bio written",                done: true },
  { label: "Link TikTok account",        done: false },
  { label: "Verify phone number",        done: false },
  { label: "Add 2 portfolio examples",   done: false },
];
const profileComplete = Math.round((profileSteps.filter((s) => s.done).length / profileSteps.length) * 100);

/* ─── Score ring (large) ─── */
function ScoreRing({ score }: { score: number }) {
  const r = 42, circ = 2 * Math.PI * r;
  return (
    <svg width={100} height={100} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={r} fill="none" stroke="rgba(124,58,237,0.1)" strokeWidth={6} />
      <circle cx={50} cy={50} r={r} fill="none" stroke="var(--ai)" strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * circ} ${circ - (score / 100) * circ}`}
        strokeDashoffset={circ / 4}
      />
      <text x={50} y={47} textAnchor="middle" style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.25rem", fill: "var(--foreground)" }}>{score}</text>
      <text x={50} y={62} textAnchor="middle" style={{ fontFamily: f.b, fontSize: "0.55rem", fill: "var(--muted-foreground)" }}>/100</text>
    </svg>
  );
}

/* ─── KPI Card ─── */
function KPICard({
  title, value, sub, subUp, icon, iconBg, iconColor, featured, extra, className,
}: {
  title: string; value: string; sub?: string; subUp?: boolean;
  icon?: React.ReactNode; iconBg?: string; iconColor?: string;
  featured?: boolean; extra?: React.ReactNode; className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: featured ? "linear-gradient(150deg, #4C1D95 0%, #7C3AED 100%)" : "var(--card)",
        border: featured ? "none" : "1px solid var(--border)",
        borderRadius: "0.875rem",
        padding: "1.125rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
        boxShadow: featured ? "var(--shadow-ai)" : "var(--shadow-xs)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {featured && (
        <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{
          fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500,
          color: featured ? "rgba(255,255,255,0.7)" : "var(--muted-foreground)",
        }}>
          {title}
        </p>
        {icon && iconBg && (
          <div style={{ width: 34, height: 34, borderRadius: "0.625rem", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: iconColor, flexShrink: 0 }}>
            {icon}
          </div>
        )}
      </div>

      {extra ?? (
        <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.75rem", color: featured ? "#fff" : "var(--foreground)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
          {value}
        </p>
      )}

      {sub && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {subUp !== undefined && (
            subUp
              ? <TrendingUp size={12} style={{ color: featured ? "rgba(255,255,255,0.7)" : "#10B981", flexShrink: 0 }} />
              : <TrendingDown size={12} style={{ color: "#EF4444", flexShrink: 0 }} />
          )}
          <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: featured ? "rgba(255,255,255,0.65)" : "var(--muted-foreground)" }}>
            {sub}
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Section header ─── */
function SectionHeader({ title, action, actionLabel }: { title: string; action?: string; actionLabel?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
      <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)", letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      {action && (
        <Link
          to={action}
          style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontFamily: f.b, fontSize: "0.8125rem", color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}
        >
          {actionLabel ?? "View all"} <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}

/* ─── Main page ─── */
export function OverviewPage() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation("influencerDashboard");
  const isFr = i18n.language === "fr";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t("overview.good_morning") : hour < 18 ? t("overview.good_afternoon") : t("overview.good_evening");

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === t("overview.kpi.none")) return dateStr;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString(isFr ? "fr-FR" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const profile = user?.influencer_profile;
  const aiScore = profile?.ai_score || 0;
  const profileComplete = profile?.profile_completeness || 0;

  const [applications, setApplications] = useState<any[]>([]);
  const [paymentsSummary, setPaymentsSummary] = useState<any>({ total_earned: 0, pending_payments: 0 });
  const [loading, setLoading] = useState(true);
  const [recommendedCampaigns, setRecommendedCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, paymentsRes, campaignsRes] = await Promise.all([
          api.get('/api/applications/mine'),
          api.get('/api/payments/influencer-summary'),
          api.get('/api/campaigns')
        ]);
        setApplications(appsRes.data.data || []);
        setPaymentsSummary(paymentsRes.data.data || { total_earned: 0, total_pending: 0 });

        // Map top campaigns
        const rawCampaigns = campaignsRes.data.data || [];
        const mapped = rawCampaigns.map((c: any) => {
          const brandProfile = c.brand_profile || {};
          return {
            id: c.id.toString(),
            brand: brandProfile.company_name || "Brand",
            brandIndustry: brandProfile.industry || "Lifestyle",
            brandColor: c.brand_color || "#2563EB",
            country: brandProfile.country || "Morocco",
            title: c.title,
            brief: c.brief,
            platforms: c.platforms || [],
            budget: c.budget || 0,
            matchScore: c.match_score || 85,
            deadline: c.submission_deadline || c.publication_date || "",
            spotsLeft: (c.spots_total || 10) - (c.spots_filled || 0),
            type: (c.campaign_type || "paid") as any,
            status: c.status === "active" ? "open" : "closing",
            saved: false,
            niche: c.niches?.[0] || "General"
          };
        });
        // Sort by matchScore descending and take first 3
        const sorted = [...mapped].sort((x: any, y: any) => y.matchScore - x.matchScore).slice(0, 3);
        setRecommendedCampaigns(sorted);
      } catch (error) {
        console.error("Failed to fetch overview data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeCollabsCount = applications.filter((a) => a.status === 'accepted').length;
  const pendingAppsCount = applications.filter((a) => a.status === 'pending').length;
  const nextDeadline = applications.find(a => a.status === 'accepted' && (a.campaign?.submission_deadline || a.campaign?.application_deadline))?.campaign?.submission_deadline || t("overview.kpi.none");

  const profileSteps = [
    { label: t("overview.profile_strength.step_basic"), done: true },
    { label: t("overview.profile_strength.step_ig"), done: true },
    { label: t("overview.profile_strength.step_photo"), done: true },
    { label: t("overview.profile_strength.step_bio"), done: true },
    { label: t("overview.profile_strength.step_tiktok"), done: false },
    { label: t("overview.profile_strength.step_phone"), done: false },
    { label: t("overview.profile_strength.step_portfolio"), done: false },
  ];

  return (
    <div style={{ padding: "1.75rem 1.5rem 3rem", maxWidth: 1100, margin: "0 auto" }}>

      {/* ─── Page header ─── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.75rem" }}>
        <div>
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.5rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
            {greeting}, {user?.name ? user.name.split(" ")[0] : "Influencer"} 👋
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "0.9rem", color: "var(--muted-foreground)" }}>
            {t("overview.subtitle")}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <Link
            to="/dashboard/campaigns"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              padding: "0.5rem 1rem", borderRadius: "0.5rem",
              background: "var(--primary)", color: "#fff",
              fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500,
              textDecoration: "none",
              boxShadow: "var(--shadow-primary)",
            }}
          >
            <Sparkles size={14} /> {t("overview.discover_btn")}
          </Link>
        </div>
      </div>

      {/* ─── KPI row ─── */}
      <div
        style={{ gap: "0.875rem", marginBottom: "1.75rem" }}
        className="grid grid-cols-2 sm:grid-cols-4"
      >
        {/* AI Score */}
        <KPICard
          title={t("overview.kpi.ai_score")}
          value={aiScore.toString()}
          sub={t("overview.kpi.pts_week")}
          subUp={true}
          featured
          className="col-span-2"
          extra={
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginTop: "0.25rem" }}>
              <ScoreRing score={aiScore} />
              <div>
                <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "2rem", color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{aiScore}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginTop: 1 }}>/100 · {aiScore >= 80 ? 'Excellent' : t("overview.kpi.good")}</p>
                <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", marginTop: 4, lineHeight: 1.4 }}>{t("overview.kpi.pts_week")}</p>
              </div>
            </div>
          }
        />

        {/* Active Collab */}
        <KPICard
          title={t("overview.kpi.active_collabs")}
          value={loading ? "..." : activeCollabsCount.toString()}
          sub={t("overview.kpi.accepted_apps")}
          icon={<CheckCircle size={16} />}
          iconBg="#D1FAE5"
          iconColor="#065F46"
        />

        {/* Pending applications */}
        <KPICard
          title={t("overview.kpi.applications")}
          value={loading ? "..." : applications.length.toString()}
          sub={`${pendingAppsCount} ${t("overview.kpi.pending")}`}
          icon={<Clock size={16} />}
          iconBg="#FEF3C7"
          iconColor="#92400E"
        />

        {/* Earnings */}
        <KPICard
          title={t("overview.kpi.total_earned")}
          value={loading ? "..." : (paymentsSummary.total_earned || 0).toString()}
          sub={t("overview.kpi.mad")}
          subUp={true}
          icon={<CreditCard size={16} />}
          iconBg="#DBEAFE"
          iconColor="#1D4ED8"
        />

        {/* Pending payment */}
        <KPICard
          title={t("overview.kpi.pending_pay")}
          value={loading ? "..." : (paymentsSummary.total_pending || 0).toString()}
          sub={t("overview.kpi.mad")}
          icon={<TrendingUp size={16} />}
          iconBg="#FEF3C7"
          iconColor="#92400E"
        />

        {/* Deadline */}
        <KPICard
          title={t("overview.kpi.next_deadline")}
          value={loading ? "..." : formatDate(nextDeadline)}
          sub={t("overview.kpi.campaign_deadline")}
          icon={<Calendar size={16} />}
          iconBg="#FCE7F3"
          iconColor="#BE185D"
          className="col-span-2"
        />
      </div>

      {/* ─── Main grid ─── */}
      <div style={{ gap: "1.25rem", marginBottom: "1.25rem" }} className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr]">

        {/* Recommended Campaigns */}
        <div
          style={{
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: "0.875rem", padding: "1.25rem",
          }}
        >
          <SectionHeader title={t("overview.recommended.title")} action="/dashboard/campaigns" actionLabel={t("overview.recommended.view_all")} />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {recommendedCampaigns.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCampaign(c)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.875rem",
                  padding: "0.875rem 1rem",
                  background: "var(--background)",
                  border: "1px solid var(--border)", borderRadius: "0.75rem",
                  transition: "border-color .15s",
                  cursor: "pointer",
                }}
              >
                {/* Brand avatar */}
                <div style={{ width: 38, height: 38, borderRadius: "0.625rem", background: `${c.brandColor}18`, display: "flex", alignItems: "center", justifyContent: "center", color: c.brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>
                  {c.brand[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{c.brand}</p>
                    {c.status === "new" && (
                      <span style={{ padding: "0.1rem 0.5rem", borderRadius: 999, background: "#FCE7F3", color: "#BE185D", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>NEW</span>
                    )}
                  </div>
                  <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                    {isFr ? (c.niche === "Beauty & Skincare" ? "Beauté & Soins" : c.niche === "Fashion & Lifestyle" ? "Mode & Style de vie" : "Bien-être") : c.niche} · {c.budget} · {isFr ? "Échéance" : "Due"} {formatDate(c.deadline)}
                  </p>
                </div>
                <div style={{ display: "flex", flex: "column", alignItems: "flex-end", gap: "0.375rem", flexShrink: 0 }}>
                  {/* Match */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <Zap size={11} style={{ color: c.matchScore >= 90 ? "#10B981" : "#2563EB" }} />
                    <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.8125rem", color: c.matchScore >= 90 ? "#10B981" : "var(--primary)" }}>
                      {c.matchScore}%
                    </span>
                  </div>
                  {/* Platform */}
                  <span style={{ padding: "0.125rem 0.375rem", borderRadius: "0.25rem", background: `${c.brandColor}15`, color: c.brandColor, fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>
                    {(c.platforms?.[0] || "IG").toUpperCase()}
                  </span>
                </div>
                <ChevronRight size={15} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
              </div>
            ))}
          </div>

          {/* Empty state variant — shown if no campaigns */}
          {false && (
            <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: "0.875rem", background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.875rem" }}>
                <Sparkles size={22} style={{ color: "var(--muted-foreground)" }} />
              </div>
              <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>{isFr ? "Aucune recommandation pour l'instant" : "No recommendations yet"}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>{isFr ? "Complétez votre profil pour obtenir des campagnes recommandées par l'IA." : "Complete your profile to get AI-matched campaigns."}</p>
              <Link to="/dashboard/profile" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", marginTop: "0.875rem", padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, textDecoration: "none" }}>
                {isFr ? "Compléter le profil" : "Complete profile"} <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Profile completeness */}
          <div
            style={{
              background: "var(--card)", border: "1px solid var(--border)",
              borderRadius: "0.875rem", padding: "1.25rem",
            }}
          >
            <SectionHeader title={isFr ? "Force du profil" : "Profile strength"} action="/dashboard/profile" actionLabel={isFr ? "Modifier" : "Edit"} />
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ position: "relative", width: 60, height: 60, flexShrink: 0 }}>
                <svg width={60} height={60} viewBox="0 0 60 60">
                  <circle cx={30} cy={30} r={24} fill="none" stroke="var(--muted)" strokeWidth={5} />
                  <circle cx={30} cy={30} r={24} fill="none"
                    stroke={profileComplete >= 80 ? "#10B981" : "#2563EB"}
                    strokeWidth={5} strokeLinecap="round"
                    strokeDasharray={`${(profileComplete / 100) * 2 * Math.PI * 24} ${2 * Math.PI * 24}`}
                    strokeDashoffset={2 * Math.PI * 24 / 4}
                  />
                  <text x={30} y={34} textAnchor="middle" style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.75rem", fill: "var(--foreground)" }}>
                    {profileComplete}%
                  </text>
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>
                  {profileComplete}% {t("overview.profile_strength.complete")}
                </p>
                <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", lineHeight: 1.5 }}>
                  {profileSteps.filter((s) => !s.done).length} {t("overview.profile_strength.steps_remaining")}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              {profileSteps.map((step) => (
                <div key={step.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: step.done ? "#10B981" : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {step.done
                      ? <Check size={10} color="#fff" strokeWidth={3} />
                      : <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--muted-foreground)", opacity: 0.4 }} />}
                  </div>
                  <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: step.done ? "var(--muted-foreground)" : "var(--foreground)", textDecoration: step.done ? "line-through" : "none", opacity: step.done ? 0.65 : 1 }}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* IA Coach nudge */}
          <div
            style={{
              background: "var(--ai-surface)",
              border: "1px solid rgba(124,58,237,0.15)",
              borderRadius: "0.75rem",
              padding: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <div style={{ width: 32, height: 32, borderRadius: "0.5rem", background: "var(--ai-surface)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Sparkles size={15} style={{ color: "var(--ai)" }} />
              </div>
              <div>
                <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>
                  {t("overview.ai_tip.title")}
                </p>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
                  {t("overview.ai_tip.desc")}
                </p>
                <Link to="/dashboard/coach" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", marginTop: "0.5rem", fontFamily: f.b, fontSize: "0.8rem", fontWeight: 500, color: "var(--ai)", textDecoration: "none" }}>
                  {t("overview.ai_tip.link")} <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom row ─── */}
      <div style={{ gap: "1.25rem" }} className="flex flex-col lg:grid lg:grid-cols-2">

        {/* Engagement performance chart */}
        <div
          style={{
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: "0.875rem", padding: "1.25rem",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <h2 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)", letterSpacing: "-0.01em" }}>
                  {isFr ? "Taux d'engagement" : "Engagement rate"}
                </h2>
                <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                  {isFr ? "8 dernières semaines · Instagram" : "Last 8 weeks · Instagram"}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <TrendingUp size={14} style={{ color: "#10B981" }} />
                <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", color: "#10B981" }}>8.3%</span>
                <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                  {isFr ? "cette semaine" : "this week"}
                </span>
              </div>
            </div>
          </div>
          <div style={{ height: 150 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontFamily: f.b, fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: f.b, fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.5rem", fontFamily: f.b, fontSize: "0.75rem" }}
                  formatter={(v: number) => [`${v}%`, isFr ? "Engagement" : "Engagement"]}
                />
                <Area type="monotone" dataKey="rate" stroke="#7C3AED" strokeWidth={2.5} fill="rgba(124,58,237,0.08)" dot={false} activeDot={{ r: 4, fill: "#7C3AED" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity feed */}
        <div
          style={{
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: "0.875rem", padding: "1.25rem",
          }}
        >
          <SectionHeader title={isFr ? "Activité récente" : "Recent activity"} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {activityFeed.map((item, i) => {
              const Icon = item.icon;
              let itemTitle = item.title;
              let itemSub = item.sub;
              let itemTime = item.time;
              if (isFr) {
                if (item.title.includes("sent you a campaign invitation")) {
                  itemTitle = `${item.title.split(" sent you ")[0]} vous a envoyé une invitation à une campagne`;
                } else if (item.title.includes("application to") && item.title.includes("was accepted")) {
                  const brand = item.title.split("application to ")[1]?.split(" was accepted")[0] || "AtlasBrand";
                  itemTitle = `Votre candidature à ${brand} a été acceptée`;
                } else if (item.title.includes("Content approved")) {
                  itemTitle = `Contenu approuvé – Lancement Soins`;
                } else if (item.title.includes("Payment received")) {
                  itemTitle = item.title.replace("Payment received:", "Paiement reçu :");
                } else if (item.title.includes("New campaign match")) {
                  itemTitle = item.title.replace("New campaign match:", "Nouvelle campagne correspondante :");
                }

                if (item.sub.includes("match")) {
                  itemSub = item.sub.replace("match", "correspondance").replace("Beauty & Skincare", "Beauté & Soins");
                } else if (item.sub.includes("Fashion Campaign")) {
                  itemSub = item.sub.replace("Fashion Campaign", "Campagne de Mode");
                } else if (item.sub.includes("Posted on Instagram")) {
                  itemSub = "Publié sur Instagram";
                } else if (item.sub.includes("From")) {
                  itemSub = item.sub.replace("From", "De");
                } else if (item.sub.includes("Wellness & Nutrition")) {
                  itemSub = "Bien-être & Nutrition";
                }

                if (item.time === "2h ago") itemTime = "Il y a 2h";
                else if (item.time === "Yesterday") itemTime = "Hier";
                else if (item.time.includes("days ago")) itemTime = `Il y a ${item.time.split(" ")[0]} jours`;
              }
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex", gap: "0.75rem",
                    paddingBottom: i < activityFeed.length - 1 ? "0.875rem" : 0,
                    marginBottom: i < activityFeed.length - 1 ? "0.875rem" : 0,
                    borderBottom: i < activityFeed.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", color: item.color, flexShrink: 0 }}>
                      <Icon size={14} />
                    </div>
                    {i < activityFeed.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: "var(--border)", marginTop: "0.375rem" }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
                    <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--foreground)", lineHeight: 1.45 }}>
                      {itemTitle}
                    </p>
                    <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", marginTop: "0.125rem" }}>
                      {itemSub}
                    </p>
                    <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: "0.25rem", opacity: 0.65 }}>
                      {itemTime}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <CampaignDrawer campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
    </div>
  );
}
