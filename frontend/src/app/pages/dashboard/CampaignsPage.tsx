import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Search, SlidersHorizontal, Bookmark, BookmarkCheck,
  ArrowRight, Zap,
  Calendar, DollarSign, X, ChevronDown, Users,
} from "lucide-react";
import { CampaignDrawer } from "../../components/dashboard/CampaignDrawer";
import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../../components/ui/SocialIcons";
import api from "../../../lib/api";
import { useEffect } from "react";

// Mock Campaign type if needed or keep existing definition
export interface Campaign {
  id: string;
  brand: string;
  brandIndustry: string;
  brandColor: string;
  country: string;
  title: string;
  brief: string;
  platforms: ("instagram" | "tiktok" | "youtube" | "facebook")[];
  budget: number;
  matchScore: number;
  deadline: string;
  spotsLeft: number;
  type: "paid" | "gifted" | "affiliate" | "ambassador";
  status: "new" | "open" | "closing";
  saved: boolean;
  niche: string;
}

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

/* ─── Platform icons ─── */
function PlatformPip({ p }: { p: string }) {
  const map: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
    instagram: { color: "#E1306C", label: "IG", icon: <InstagramIcon size={12} /> },
    tiktok:    { color: "#010101", label: "TK", icon: <TiktokIcon size={12} /> },
    youtube:   { color: "#FF0000", label: "YT", icon: <YoutubeIcon size={12} /> },
    facebook:  { color: "#1877F2", label: "FB", icon: <FacebookIcon size={12} /> },
  };
  const m = map[p];
  if (!m) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", padding: "0.175rem 0.5rem", borderRadius: 999, background: `${m.color}14`, color: m.color, fontFamily: f.b, fontSize: "0.68rem", fontWeight: 700 }}>
      {m.icon} {m.label}
    </span>
  );
}

/* ─── Match chip ─── */
function MatchChip({ score }: { score: number }) {
  const color = score >= 90 ? "#10B981" : score >= 80 ? "#2563EB" : score >= 70 ? "#7C3AED" : "#6B7280";
  const bg    = score >= 90 ? "#ECFDF5" : score >= 80 ? "#EFF6FF" : score >= 70 ? "#EDE9FE" : "var(--muted)";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.25rem 0.625rem", borderRadius: 999, background: bg, border: `1px solid ${color}30` }}>
      <Zap size={12} style={{ color }} />
      <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.8125rem", color }}>{score}%</span>
    </div>
  );
}

/* ─── Campaign card ─── */
function CampaignCard({
  campaign,
  onOpen,
  onSave,
}: {
  campaign: Campaign;
  onOpen: (c: Campaign) => void;
  onSave: (id: string) => void;
}) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const typeLabel: Record<string, string> = isFr
    ? { paid: "Payée", gifted: "Produit offert", affiliate: "Affiliation", ambassador: "Ambassadeur" }
    : { paid: "Paid", gifted: "Gifted", affiliate: "Affiliate", ambassador: "Ambassador" };
  const typeBg: Record<string, string> = { paid: "#EFF6FF", gifted: "#FCE7F3", affiliate: "#ECFDF5", ambassador: "#EDE9FE" };
  const typeColor: Record<string, string> = { paid: "#1D4ED8", gifted: "#BE185D", affiliate: "#065F46", ambassador: "#5B21B6" };
  const urgency = campaign.spotsLeft <= 1;

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "0.875rem",
        padding: "1.125rem 1.25rem",
        transition: "box-shadow .15s, border-color .15s",
        cursor: "pointer",
        position: "relative",
      }}
      onClick={() => onOpen(campaign)}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(37,99,235,0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
      }}
    >
      {/* Row 1: Brand + badges + save */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <div style={{ width: 36, height: 36, borderRadius: "0.625rem", background: `${campaign.brandColor}18`, display: "flex", alignItems: "center", justifyContent: "center", color: campaign.brandColor, fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>
            {campaign.brand[0]}
          </div>
          <div>
            <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)" }}>{campaign.brand}</p>
            <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
              {isFr ? (campaign.brandIndustry === "Beauty" ? "Beauté" : campaign.brandIndustry === "Fashion" ? "Mode" : campaign.brandIndustry) : campaign.brandIndustry} · {campaign.country}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
          {campaign.status === "new" && (
            <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "#FCE7F3", color: "#BE185D", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.04em" }}>{isFr ? "NOUVEAU" : "NEW"}</span>
          )}
          {campaign.status === "closing" && (
            <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "#FEF3C7", color: "#92400E", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>{isFr ? "BENTÔT CLOS" : "CLOSING"}</span>
          )}
          <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: typeBg[campaign.type] || "#EFF6FF", color: typeColor[campaign.type] || "#1D4ED8", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600 }}>
            {typeLabel[campaign.type] || campaign.type}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onSave(campaign.id); }}
            style={{ width: 28, height: 28, borderRadius: "0.375rem", display: "flex", alignItems: "center", justifyContent: "center", background: campaign.saved ? "#EDE9FE" : "var(--muted)", border: "none", cursor: "pointer", color: campaign.saved ? "#7C3AED" : "var(--muted-foreground)" }}
          >
            {campaign.saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          </button>
        </div>
      </div>

      {/* Row 2: Title + brief */}
      <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)", letterSpacing: "-0.01em", marginBottom: "0.375rem" }}>
        {campaign.title}
      </h3>
      <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", lineHeight: 1.6, marginBottom: "0.875rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {campaign.brief}
      </p>

      {/* Row 3: Meta + match + CTA */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {campaign.platforms.map((p) => <PlatformPip key={p} p={p} />)}
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 600, color: "var(--foreground)" }}>
            <DollarSign size={12} style={{ color: "var(--muted-foreground)" }} />
            {campaign.budget.toLocaleString()} MAD
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
            <Calendar size={11} /> {campaign.deadline}
          </span>
          {urgency && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: f.b, fontSize: "0.75rem", color: "#EF4444", fontWeight: 500 }}>
              <Users size={11} /> {campaign.spotsLeft === 0 ? (isFr ? "Complet" : "Full") : isFr ? `${campaign.spotsLeft} restant(s)` : `${campaign.spotsLeft} left`}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <MatchChip score={campaign.matchScore} />
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(campaign); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              padding: "0.4375rem 0.875rem", borderRadius: "0.5rem",
              background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer",
              fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500,
            }}
          >
            {isFr ? "Postuler" : "Apply"} <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Filter dropdown ─── */
function FilterPill({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = value !== "";
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.375rem",
          padding: "0.4375rem 0.875rem", borderRadius: "2rem",
          border: `1.5px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
          background: isActive ? "#EFF6FF" : "var(--card)",
          color: isActive ? "var(--primary)" : "var(--foreground)",
          cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: isActive ? 500 : 400,
          whiteSpace: "nowrap",
          transition: "all .15s",
        }}
      >
        {isActive ? value : label}
        {isActive
          ? <button onClick={(e) => { e.stopPropagation(); onChange(""); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "var(--primary)" }}><X size={12} /></button>
          : <ChevronDown size={13} style={{ opacity: 0.5 }} />
        }
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 20 }} />
          <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 30, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.625rem", padding: "0.375rem", minWidth: 180, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt === value ? "" : opt); setOpen(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "0.5rem 0.75rem", borderRadius: "0.375rem",
                  background: opt === value ? "var(--secondary)" : "none", border: "none", cursor: "pointer",
                  fontFamily: f.b, fontSize: "0.875rem", color: opt === value ? "var(--secondary-foreground)" : "var(--foreground)",
                  fontWeight: opt === value ? 500 : 400,
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Sort dropdown ─── */
function SortControl({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [open, setOpen] = useState(false);
  const opts = ["Best match", "Highest budget", "Deadline (soonest)", "Newest first"];
  const sortLabels: Record<string, string> = isFr ? {
    "Best match": "Meilleure correspondance",
    "Highest budget": "Budget le plus élevé",
    "Deadline (soonest)": "Échéance la plus proche",
    "Newest first": "Plus récent en premier"
  } : {
    "Best match": "Best match",
    "Highest budget": "Highest budget",
    "Deadline (soonest)": "Deadline (soonest)",
    "Newest first": "Newest first"
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", color: "var(--foreground)", whiteSpace: "nowrap" }}
      >
        {isFr ? "Trier par :" : "Sort:"} {sortLabels[value] || value} <ChevronDown size={13} style={{ opacity: 0.5 }} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 20 }} />
          <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 30, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.625rem", padding: "0.375rem", minWidth: 200, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
            {opts.map((opt) => (
              <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "0.5rem 0.75rem", borderRadius: "0.375rem", background: opt === value ? "var(--secondary)" : "none", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", color: opt === value ? "var(--secondary-foreground)" : "var(--foreground)", fontWeight: opt === value ? 500 : 400 }}
              >
                {sortLabels[opt] || opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Empty state ─── */
function EmptyState({ onReset }: { onReset: () => void }) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  return (
    <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem" }}>
      <div style={{ width: 56, height: 56, borderRadius: "1rem", background: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
        <Search size={24} style={{ color: "var(--muted-foreground)" }} />
      </div>
      <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.0625rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>
        {isFr ? "Aucune campagne ne correspond à vos filtres" : "No campaigns match your filters"}
      </p>
      <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65, maxWidth: "32ch", margin: "0 auto 1.25rem" }}>
        {isFr ? "Essayez d'ajuster vos filtres ou vos mots-clés pour trouver plus de campagnes." : "Try adjusting your filters or search terms to find more campaigns."}
      </p>
      <button
        onClick={onReset}
        style={{ padding: "0.5625rem 1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem" }}
      >
        {isFr ? "Effacer tous les filtres" : "Clear all filters"}
      </button>
    </div>
  );
}

/* ─── Main page ─── */
export function CampaignsPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [tab, setTab] = useState<"all" | "recommended" | "saved">("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Best match");
  const [platformFilter, setPlatformFilter] = useState("");
  const [nicheFilter, setNicheFilter] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await api.get('/api/campaigns');
        const data = res.data.data || res.data;
        // Transform backend fields to match Campaign interface if necessary
        const mapped = data.map((c: any) => ({
          id: c.id.toString(),
          brand: c.brand_profile?.company_name || 'Brand',
          brandIndustry: c.brand_profile?.industry || 'Various',
          brandColor: '#E1306C',
          country: c.target_countries?.[0] || 'Worldwide',
          title: c.title,
          brief: c.brief,
          platforms: c.platforms || [],
          budget: c.budget,
          matchScore: c.match_score || Math.floor(Math.random() * 20) + 70, // mock score if missing
          deadline: new Date(c.application_deadline).toLocaleDateString(),
          spotsLeft: (c.spots_total || 10) - (c.spots_filled || 0),
          type: c.payment_model === 'fixed' ? 'paid' : (c.payment_model || 'paid'),
          status: c.status === 'active' ? 'open' : c.status,
          saved: false,
          niche: c.niches?.[0] || 'Lifestyle',
        }));
        setCampaigns(mapped);
      } catch (error) {
        console.error("Failed to fetch campaigns", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleSave = (id: string) => {
    setCampaigns((prev) => prev.map((c) => c.id === id ? { ...c, saved: !c.saved } : c));
    if (selectedCampaign?.id === id) setSelectedCampaign((c) => c ? { ...c, saved: !c.saved } : null);
  };

  const filtered = useMemo(() => {
    let list = [...campaigns];

    // Tab filter
    if (tab === "recommended") list = list.filter((c) => c.matchScore >= 85);
    if (tab === "saved") list = list.filter((c) => c.saved);

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q) ||
        c.brandIndustry.toLowerCase().includes(q) ||
        c.niche.toLowerCase().includes(q) ||
        c.brief.toLowerCase().includes(q)
      );
    }

    // Filters
    if (platformFilter) list = list.filter((c) => c.platforms.includes(platformFilter.toLowerCase() as any));
    if (nicheFilter)    list = list.filter((c) => c.niche.toLowerCase().includes(nicheFilter.toLowerCase()));
    if (typeFilter)     list = list.filter((c) => c.type === typeFilter.toLowerCase());
    if (budgetFilter) {
      if (budgetFilter === "Under 3 000 MAD")   list = list.filter((c) => c.budget < 3000);
      if (budgetFilter === "3 000–6 000 MAD")    list = list.filter((c) => c.budget >= 3000 && c.budget <= 6000);
      if (budgetFilter === "6 000–10 000 MAD")   list = list.filter((c) => c.budget > 6000 && c.budget <= 10000);
      if (budgetFilter === "10 000+ MAD")        list = list.filter((c) => c.budget > 10000);
    }

    // Sort
    if (sort === "Best match")         list.sort((a, b) => b.matchScore - a.matchScore);
    if (sort === "Highest budget")     list.sort((a, b) => b.budget - a.budget);
    if (sort === "Deadline (soonest)") list = list; // keep order (already date-ish)
    if (sort === "Newest first")       list = [...list].reverse();

    return list;
  }, [campaigns, tab, search, sort, platformFilter, nicheFilter, budgetFilter, typeFilter]);

  const resetFilters = () => {
    setSearch("");
    setPlatformFilter("");
    setNicheFilter("");
    setBudgetFilter("");
    setTypeFilter("");
  };

  const recommendedCount = campaigns.filter((c) => c.matchScore >= 85).length;
  const savedCount = campaigns.filter((c) => c.saved).length;

  const activeFilterCount = [platformFilter, nicheFilter, budgetFilter, typeFilter].filter(Boolean).length;

  return (
    <div style={{ padding: "1.75rem 1.5rem 3rem" }}>

      {/* Page header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
          {isFr ? "Découvrir des campagnes" : "Discover Campaigns"}
        </h1>
        <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
          {isFr ? "Campagnes classées selon la correspondance de votre Score IA" : "Campaigns ranked by your IA Score match"}
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: "1.25rem" }}>
        {([
          { key: "all",         label: isFr ? "Toutes" : "All",          count: campaigns.length },
          { key: "recommended", label: isFr ? "Recommandées" : "Recommended",  count: recommendedCount },
          { key: "saved",       label: isFr ? "Enregistrées" : "Saved",        count: savedCount },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              padding: "0.625rem 1.125rem",
              background: "transparent", border: "none",
              borderBottom: `2px solid ${tab === t.key ? "var(--primary)" : "transparent"}`,
              marginBottom: -1,
              color: tab === t.key ? "var(--primary)" : "var(--muted-foreground)",
              cursor: "pointer",
              fontFamily: f.b, fontSize: "0.9rem", fontWeight: tab === t.key ? 500 : 400,
              transition: "all .15s",
            }}
          >
            {t.label}
            <span style={{ padding: "0.1rem 0.4rem", borderRadius: 999, background: tab === t.key ? "#DBEAFE" : "var(--muted)", color: tab === t.key ? "var(--primary)" : "var(--muted-foreground)", fontFamily: f.b, fontSize: "0.7rem", fontWeight: 600 }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search + filters row */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.875rem", flexWrap: "wrap", alignItems: "center" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 400 }}>
          <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
          <input
            type="search"
            placeholder={isFr ? "Rechercher une marque, une niche ou un mot-clé..." : "Search brand, niche, or keyword…"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", height: "2.375rem", paddingLeft: "2.25rem", paddingRight: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
            onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", flex: 1 }}>
          <FilterPill label={isFr ? "Plateforme" : "Platform"} options={["Instagram", "TikTok", "YouTube", "Facebook"]} value={platformFilter} onChange={setPlatformFilter} />
          <FilterPill label="Niche" options={["Beauty & Skincare", "Fashion & Lifestyle", "Wellness", "Tech", "Sustainability"]} value={nicheFilter} onChange={setNicheFilter} />
          <FilterPill label="Budget" options={
            isFr 
              ? ["Moins de 3 000 MAD", "3 000–6 000 MAD", "6 000–10 000 MAD", "10 000+ MAD"]
              : ["Under 3 000 MAD", "3 000–6 000 MAD", "6 000–10 000 MAD", "10 000+ MAD"]
          } value={budgetFilter} onChange={setBudgetFilter} />
          <FilterPill label="Type" options={
            isFr
              ? ["Rémunérée", "Produit offert", "Affiliation", "Ambassadeur"]
              : ["Paid", "Gifted", "Affiliate", "Ambassador"]
          } value={typeFilter} onChange={setTypeFilter} />
          {activeFilterCount > 0 && (
            <button onClick={resetFilters} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.4375rem 0.75rem", borderRadius: "2rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}>
              <X size={13} /> {isFr ? "Effacer" : "Clear"} {activeFilterCount}
            </button>
          )}
        </div>

        {/* Sort */}
        <SortControl value={sort} onChange={setSort} />
      </div>

      {/* Results count */}
      <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginBottom: "1rem" }}>
        {isFr 
          ? `${filtered.length} campagne${filtered.length !== 1 ? "s" : ""} trouvée${filtered.length !== 1 ? "s" : ""}`
          : `${filtered.length} campaign${filtered.length !== 1 ? "s" : ""} found`
        }
        {activeFilterCount > 0 && (isFr ? " (filtré)" : " (filtered)")}
      </p>

      {/* Campaign list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "var(--muted-foreground)" }}>
            {isFr ? "Chargement des campagnes..." : "Loading campaigns..."}
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((c) => (
            <CampaignCard
              key={c.id}
              campaign={c}
              onOpen={setSelectedCampaign}
              onSave={handleSave}
            />
          ))
        ) : (
          <EmptyState onReset={resetFilters} />
        )}
      </div>

      {/* Campaign drawer */}
      <CampaignDrawer
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />
    </div>
  );
}
