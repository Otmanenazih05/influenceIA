import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  Plus, Search, ChevronDown, X,
  Calendar, Users, TrendingUp, BarChart2, ChevronRight, ArrowUpDown,
} from "lucide-react";
import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../../components/ui/SocialIcons";
import api from "../../../lib/api";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

const STATUS_CFG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  draft:     { label: "Draft",     color: "#6B7280", bg: "var(--muted)",  dot: "#9CA3AF" },
  active:    { label: "Active",    color: "#065F46", bg: "#D1FAE5",       dot: "#10B981" },
  reviewing: { label: "Reviewing", color: "#92400E", bg: "#FEF3C7",       dot: "#F59E0B" },
  paused:    { label: "Paused",    color: "#1D4ED8", bg: "#DBEAFE",       dot: "#2563EB" },
  completed: { label: "Completed", color: "#5B21B6", bg: "#EDE9FE",       dot: "#7C3AED" },
};

function PlatformPip({ p }: { p: string }) {
  const map: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    instagram: { color: "#E1306C", icon: <InstagramIcon size={11} />, label: "IG" },
    tiktok:    { color: "#010101", icon: <TiktokIcon size={11} />,      label: "TK" },
    youtube:   { color: "#FF0000", icon: <YoutubeIcon size={11} />,   label: "YT" },
    facebook:  { color: "#1877F2", icon: <FacebookIcon size={11} />,  label: "FB" },
  };
  const m = map[p];
  if (!m) return null;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", padding: "0.175rem 0.5rem", borderRadius: 999, background: `${m.color}14`, color: m.color, fontFamily: f.b, fontSize: "0.68rem", fontWeight: 700 }}>{m.icon}{m.label}</span>;
}

function BudgetBar({ spent, total }: { spent: number; total: number }) {
  const pct = total > 0 ? Math.min(100, Math.round((spent / total) * 100)) : 0;
  const color = pct > 85 ? "#EF4444" : pct > 60 ? "#F59E0B" : "#10B981";
  return (
    <div>
      <div style={{ height: 4, borderRadius: 999, background: "var(--muted)", overflow: "hidden", marginBottom: 2 }}>
        <div style={{ height: "100%", width: `${pct}%`, borderRadius: 999, background: color }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: f.b, fontSize: "0.68rem", color: "var(--muted-foreground)" }}>{(spent / 1000).toFixed(1)}K / {(total / 1000).toFixed(0)}K MAD</span>
        <span style={{ fontFamily: f.b, fontSize: "0.68rem", fontWeight: 600, color }}>{pct}%</span>
      </div>
    </div>
  );
}

function CampaignCard({ c }: { c: any }) {
  const sc = STATUS_CFG[c.status] ?? STATUS_CFG.draft;
  const pendingCount = c.pending_approvals_count || 0;
  const urgency = pendingCount > 0;
  const createdAt = c.created_at ? new Date(c.created_at).toLocaleDateString() : 'Recently';
  const deadlineVal = c.submission_deadline || c.application_deadline;
  const deadline = deadlineVal ? new Date(deadlineVal).toLocaleDateString() : 'No deadline';
  const platforms = c.platforms || [];
  const niches = c.niches || [];
  
  return (
    <Link
      to={`/brand/campaigns/${c.id}`}
      style={{ display: "block", background: "var(--card)", border: `1px solid ${urgency ? "rgba(249,115,22,0.3)" : "var(--border)"}`, borderRadius: "0.875rem", padding: "1.125rem 1.25rem", textDecoration: "none", transition: "all .15s", position: "relative" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.25)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = urgency ? "rgba(249,115,22,0.3)" : "var(--border)"; }}
    >
      {urgency && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #F97316, #F59E0B)", borderRadius: "0.875rem 0.875rem 0 0" }} />}
      {/* Row 1: title + status */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.625rem" }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "0.125rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</p>
          <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{c.category || niches[0] || 'Campaign'} · Created {createdAt}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
          {urgency && <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "#FFEDD5", color: "#C2410C", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>{pendingCount} to review</span>}
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.2rem 0.625rem", borderRadius: 999, background: sc.bg, color: sc.color, fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot }} />{sc.label}
          </span>
        </div>
      </div>
      {/* Row 2: platforms + deadline */}
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.875rem", flexWrap: "wrap" }}>
        {platforms.map((p: string) => <PlatformPip key={p} p={p} />)}
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
          <Calendar size={11} /> {deadline}
        </span>
        {niches.length > 0 && (
          <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.7rem" }}>
            {niches[0]}
          </span>
        )}
      </div>
      {/* Row 3: stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.625rem", marginBottom: "0.875rem" }}>
        {[
          { label: "Applicants",  value: String(c.applicants_count || 0), icon: <Users size={12} /> },
          { label: "Spots Filled", value: `${c.accepted_count || 0}/${c.spots_total || 0}`, icon: <TrendingUp size={12} /> },
          { label: "Submitted",   value: String(pendingCount),            icon: <BarChart2 size={12} /> },
          { label: "ROI",         value: c.roi ? `${c.roi}×` : "—",       icon: <TrendingUp size={12} /> },
        ].map((m) => (
          <div key={m.label} style={{ padding: "0.5rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.5rem", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 2, color: "var(--muted-foreground)" }}>{m.icon}</div>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)" }}>{m.value}</p>
            <p style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{m.label}</p>
          </div>
        ))}
      </div>
      {/* Budget bar */}
      <BudgetBar spent={c.spent || 0} total={c.budget || 0} />
      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.75rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: f.b, fontSize: "0.8125rem", color: "var(--primary)", fontWeight: 500 }}>
          {c.status === "draft" ? "Edit draft" : "View campaign"} <ChevronRight size={13} />
        </div>
      </div>
    </Link>
  );
}

function FilterPill({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const isActive = value !== "";
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen((o) => !o)} style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "2rem", border: `1.5px solid ${isActive ? "var(--primary)" : "var(--border)"}`, background: isActive ? "#EFF6FF" : "var(--card)", color: isActive ? "var(--primary)" : "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: isActive ? 500 : 400, whiteSpace: "nowrap" }}>
        {isActive ? value : label}
        {isActive
          ? <button onClick={(e) => { e.stopPropagation(); onChange(""); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "var(--primary)" }}><X size={12} /></button>
          : <ChevronDown size={13} style={{ opacity: 0.5 }} />}
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 20 }} />
          <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 30, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.625rem", padding: "0.375rem", minWidth: 180, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
            {options.map((opt) => (
              <button key={opt} onClick={() => { onChange(opt === value ? "" : opt); setOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", background: opt === value ? "var(--secondary)" : "none", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", color: opt === value ? "var(--secondary-foreground)" : "var(--foreground)", fontWeight: opt === value ? 500 : 400 }}>
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function CampaignsListPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await api.get("/api/campaigns/mine");
        setCampaigns(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load campaigns.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const filtered = useMemo(() => {
    let list = [...campaigns];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => (c.title || "").toLowerCase().includes(q) || (c.category || "").toLowerCase().includes(q));
    }
    if (statusFilter) list = list.filter((c) => c.status === statusFilter.toLowerCase().replace(" ", "_"));
    if (platformFilter) list = list.filter((c) => (c.platforms || []).includes(platformFilter.toLowerCase()));
    if (sortBy === "newest")   list.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
    if (sortBy === "budget")   list.sort((a, b) => (b.budget || 0) - (a.budget || 0));
    if (sortBy === "applicants") list.sort((a, b) => (b.applicants_count || 0) - (a.applicants_count || 0));
    return list;
  }, [search, statusFilter, platformFilter, sortBy, campaigns]);

  if (isLoading) return <div style={{ padding: "3rem", color: "var(--muted-foreground)" }}>Loading...</div>;
  if (error) return <div style={{ padding: "3rem", color: "#EF4444" }}>{error}</div>;

  const activeCampaigns = campaigns.filter((c) => c.status === "active" || c.status === "reviewing").length;

  return (
    <div style={{ padding: "1.75rem 1.5rem 4rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
            {isFr ? "Mes campagnes" : "My Campaigns"}
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            {activeCampaigns} {isFr ? "en cours" : "running"} · {campaigns.length} {isFr ? "total" : "total"}
          </p>
        </div>
        <Link to="/brand/campaigns/new" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.5625rem 1.125rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", textDecoration: "none", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, boxShadow: "var(--shadow-primary)" }}>
          <Plus size={15} /> {isFr ? "Nouvelle campagne" : "Create campaign"}
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 240px", maxWidth: 380 }}>
          <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          <input type="search" placeholder="Search campaigns…" value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", height: "2.375rem", paddingLeft: "2.25rem", paddingRight: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
            onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
          />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <FilterPill label="Status" options={["Active", "Reviewing", "Draft", "Paused", "Completed"]} value={statusFilter} onChange={setStatusFilter} />
          <FilterPill label="Platform" options={["Instagram", "TikTok", "YouTube"]} value={platformFilter} onChange={setPlatformFilter} />
        </div>
        <div style={{ marginLeft: "auto" }}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            style={{ height: "2.375rem", padding: "0 2rem 0 0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.8125rem", outline: "none", cursor: "pointer", appearance: "none" }}>
            <option value="newest">Newest first</option>
            <option value="budget">Highest budget</option>
            <option value="applicants">Most applicants</option>
          </select>
        </div>
      </div>

      <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginBottom: "1rem" }}>
        {filtered.length} {isFr ? `campagne${filtered.length !== 1 ? "s" : ""}` : `campaign${filtered.length !== 1 ? "s" : ""}`}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
        {filtered.map((c) => <CampaignCard key={c.id} c={c} />)}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem 2rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem" }}>
            <BarChart2 size={28} style={{ color: "var(--muted-foreground)", display: "block", margin: "0 auto 0.75rem" }} />
            <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>
              {isFr ? "Aucune campagne ne correspond" : "No campaigns match"}
            </p>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
              {isFr ? "Essayez de modifier vos filtres." : "Try adjusting your filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
