import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search, ChevronRight, Calendar, DollarSign, X } from "lucide-react";
import { ApplicationDrawer } from "../../components/dashboard/ApplicationDrawer";
import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../../components/ui/SocialIcons";
import api from "../../../lib/api";
import { useEffect } from "react";

export type AppStatus = "pending" | "shortlisted" | "accepted" | "submitted" | "revision" | "approved" | "completed" | "rejected";
export interface Application {
  id: string;
  brand: string;
  brandColor: string;
  campaignTitle: string;
  platforms: string[];
  payment: number;
  deadline: string;
  status: AppStatus;
  campaignId: string;
  brandIndustry?: string;
  milestones?: any[];
}

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

const STATUS_CONFIG = {
  pending:     { label: "Pending",   color: "#92400E", bg: "#FEF3C7", dot: "#F59E0B" },
  shortlisted: { label: "Shortlisted", color: "#1D4ED8", bg: "#DBEAFE", dot: "#2563EB" },
  accepted:    { label: "Accepted",  color: "#1D4ED8", bg: "#DBEAFE", dot: "#2563EB" },
  submitted:   { label: "Submitted", color: "#5B21B6", bg: "#EDE9FE", dot: "#7C3AED" },
  revision:    { label: "Revision needed", color: "#C2410C", bg: "#FFEDD5", dot: "#F97316" },
  approved:    { label: "Approved",  color: "#065F46", bg: "#D1FAE5", dot: "#10B981" },
  completed:   { label: "Completed", color: "#065F46", bg: "#D1FAE5", dot: "#10B981" },
  rejected:    { label: "Rejected",  color: "#991B1B", bg: "#FEE2E2", dot: "#EF4444" },
} as const;

function StatusPill({ status }: { status: AppStatus }) {
  const s = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || { label: status, color: "#6B7280", bg: "var(--muted)", dot: "#9CA3AF" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.2rem 0.625rem", borderRadius: 999, background: s.bg, color: s.color, fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {s.label}
    </span>
  );
}

function PlatformPip({ p }: { p: string }) {
  const map: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
    instagram: { color: "#E1306C", label: "IG", icon: <InstagramIcon size={11} /> },
    tiktok:    { color: "#010101", label: "TK", icon: <TiktokIcon size={11} /> },
    youtube:   { color: "#FF0000", label: "YT", icon: <YoutubeIcon size={11} /> },
    facebook:  { color: "#1877F2", label: "FB", icon: <FacebookIcon size={11} /> },
  };
  const m = map[p];
  if (!m) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", padding: "0.175rem 0.5rem", borderRadius: 999, background: `${m.color}14`, color: m.color, fontFamily: f.b, fontSize: "0.68rem", fontWeight: 700 }}>
      {m.icon}{m.label}
    </span>
  );
}

function ApplicationRow({ app, onClick }: { app: Application; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  const needsAction = app.status === "accepted" || app.status === "revision";
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(200px,2fr) minmax(100px,1fr) minmax(80px,auto) minmax(100px,1fr) 110px auto",
        alignItems: "center",
        gap: "1rem",
        padding: "0.875rem 1.125rem",
        background: hovered ? "var(--background)" : "var(--card)",
        borderBottom: "1px solid var(--border)",
        cursor: "pointer",
        transition: "background .12s",
        position: "relative",
      }}
    >
      {needsAction && (
        <span style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 3, borderRadius: "0 2px 2px 0", background: app.status === "revision" ? "#F97316" : "var(--primary)" }} />
      )}
      {/* Campaign */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", minWidth: 0 }}>
        <div style={{ width: 34, height: 34, borderRadius: "0.5rem", background: `${app.brandColor}18`, display: "flex", alignItems: "center", justifyContent: "center", color: app.brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>
          {app.brand[0]}
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{app.campaignTitle}</p>
          <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{app.brand}</p>
        </div>
      </div>
      {/* Platform */}
      <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
        {app.platforms.slice(0, 2).map((p) => <PlatformPip key={p} p={p} />)}
      </div>
      {/* Payment */}
      <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)", whiteSpace: "nowrap" }}>
        {app.payment.toLocaleString()} MAD
      </span>
      {/* Deadline */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <Calendar size={12} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
        <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--foreground)" }}>{app.deadline}</span>
      </div>
      {/* Status */}
      <StatusPill status={app.status} />
      {/* Arrow */}
      <ChevronRight size={16} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
    </div>
  );
}

/* ─── Mobile card ─── */
function ApplicationCard({ app, onClick }: { app: Application; onClick: () => void }) {
  const needsAction = app.status === "accepted" || app.status === "revision";
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: "0.875rem", padding: "1rem",
        cursor: "pointer",
        borderLeft: needsAction ? `3px solid ${app.status === "revision" ? "#F97316" : "var(--primary)"}` : "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.625rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 32, height: 32, borderRadius: "0.5rem", background: `${app.brandColor}18`, display: "flex", alignItems: "center", justifyContent: "center", color: app.brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>
            {app.brand[0]}
          </div>
          <div>
            <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{app.campaignTitle}</p>
            <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{app.brand}</p>
          </div>
        </div>
        <StatusPill status={app.status} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        {app.platforms.map((p) => <PlatformPip key={p} p={p} />)}
        <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: 4 }}>
          <Calendar size={11} />{app.deadline}
        </span>
        <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)", marginLeft: "auto" }}>
          {app.payment.toLocaleString()} MAD
        </span>
      </div>
    </div>
  );
}

const TABS: { key: AppStatus | "all"; label: string }[] = [
  { key: "all",       label: "All" },
  { key: "pending",   label: "Pending" },
  { key: "accepted",  label: "Accepted" },
  { key: "submitted", label: "Submitted" },
  { key: "revision",  label: "Revision" },
  { key: "completed", label: "Completed" },
  { key: "rejected",  label: "Rejected" },
];

export function ApplicationsPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [activeTab, setActiveTab] = useState<AppStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/api/applications/mine');
        const data = res.data.data || res.data;
        const mapped = data.map((a: any) => ({
          id: a.id.toString(),
          brand: a.campaign?.brand_profile?.company_name || 'Brand',
          brandColor: '#2563EB',
          campaignTitle: a.campaign?.title || 'Campaign',
          platforms: a.campaign?.platforms || [],
          payment: a.campaign?.budget || 0,
          deadline: new Date(a.campaign?.submission_deadline || a.campaign?.application_deadline || new Date()).toLocaleDateString(),
          status: a.status as AppStatus,
          campaignId: a.campaign_id?.toString()
        }));
        setApplications(mapped);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const filtered = useMemo(() => {
    let list = [...applications];
    if (activeTab !== "all") list = list.filter((a) => a.status === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((a) => a.campaignTitle.toLowerCase().includes(q) || a.brand.toLowerCase().includes(q));
    }
    return list;
  }, [activeTab, search, applications]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: applications.length };
    applications.forEach((a) => { c[a.status] = (c[a.status] ?? 0) + 1; });
    return c;
  }, [applications]);

  const needsActionCount = applications.filter((a) => a.status === "accepted" || a.status === "revision").length;

  return (
    <div style={{ padding: "1.75rem 1.5rem 3rem" }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
            {isFr ? "Mes candidatures" : "My Applications"}
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            {isFr ? "Suivez et gerez toutes vos candidatures" : "Track and manage all your campaign applications"}
          </p>
        </div>
        {needsActionCount > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.875rem", borderRadius: "0.5rem", background: "#FFEDD5", border: "1px solid #FED7AA" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F97316", boxShadow: "0 0 0 2px #F9731620", flexShrink: 0 }} />
            <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "#C2410C" }}>
              {isFr 
                ? `${needsActionCount} candidature${needsActionCount !== 1 ? "s" : ""} necessite${needsActionCount !== 1 ? "nt" : ""} votre attention`
                : `${needsActionCount} application${needsActionCount !== 1 ? "s" : ""} need your attention`}
            </span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: "1.25rem", overflowX: "auto" }}>
        {TABS.map((t) => {
          const count = counts[t.key] ?? 0;
          if (count === 0 && t.key !== "all") return null;
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.375rem",
                padding: "0.625rem 1rem",
                background: "transparent", border: "none",
                borderBottom: `2px solid ${isActive ? "var(--primary)" : "transparent"}`,
                marginBottom: -1, cursor: "pointer",
                color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                fontFamily: f.b, fontSize: "0.875rem", fontWeight: isActive ? 500 : 400,
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
              {count > 0 && (
                <span style={{ padding: "0.1rem 0.4rem", borderRadius: 999, background: isActive ? "#DBEAFE" : "var(--muted)", color: isActive ? "var(--primary)" : "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.7rem", fontWeight: 600 }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 380 }}>
          <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          <input
            type="search"
            placeholder={isFr ? "Rechercher une campagne ou une marque..." : "Search campaign or brand\u2026"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", height: "2.375rem", paddingLeft: "2.25rem", paddingRight: search ? "2rem" : "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
            onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ position: "absolute", right: "0.5rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}>
              <X size={13} />
            </button>
          )}
        </div>
        <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>
          {isFr ? `${filtered.length} resultat${filtered.length !== 1 ? "s" : ""}` : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", overflow: "hidden" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(200px,2fr) minmax(100px,1fr) minmax(80px,auto) minmax(100px,1fr) 110px auto", gap: "1rem", padding: "0.625rem 1.125rem", borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
            {["Campaign", "Platform", "Payment", "Deadline", "Status", ""].map((h) => (
              <span key={h} style={{ fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</span>
            ))}
          </div>
          {loading ? (
            <div style={{ padding: "3rem 2rem", textAlign: "center" }}>
              <p style={{ fontFamily: f.b, fontSize: "0.9rem", color: "var(--muted-foreground)" }}>
                {isFr ? "Chargement des candidatures..." : "Loading applications..."}
              </p>
            </div>
          ) : filtered.length > 0
            ? filtered.map((a) => <ApplicationRow key={a.id} app={a} onClick={() => setSelected(a)} />)
            : (
              <div style={{ padding: "3rem 2rem", textAlign: "center" }}>
                <p style={{ fontFamily: f.b, fontSize: "0.9rem", color: "var(--muted-foreground)" }}>
                  {isFr ? "Aucune candidature ne correspond a votre filtre." : "No applications match your filter."}
                </p>
              </div>
            )
          }
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-[0.75rem] md:hidden">
        {filtered.map((a) => <ApplicationCard key={a.id} app={a} onClick={() => setSelected(a)} />)}
      </div>

      <ApplicationDrawer application={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
