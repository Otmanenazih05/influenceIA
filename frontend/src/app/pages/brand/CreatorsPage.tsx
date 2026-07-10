import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Search, Bookmark, BookmarkCheck, CheckCircle,
  TrendingUp, Users, Zap, X, ChevronDown, SlidersHorizontal, Filter, Loader2
} from "lucide-react";
import { type Creator, type FollowerTier } from "../../data/creators";
import { CreatorDrawer } from "../../components/brand/CreatorDrawer";
import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../../components/ui/SocialIcons";
import api from "../../../lib/api";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

const NICHES = ["Beauty & Skincare", "Lifestyle", "Fashion & Style", "Fitness & Health", "Food & Cooking", "Tech & Productivity", "Sustainability", "Wellness & Nutrition", "Home & Interior", "Education"];
const COUNTRIES = ["Morocco", "France", "Algeria", "Tunisia", "Belgium", "UAE"];

/* ─── Platform pip ─── */
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

/* ─── Score badge ─── */
function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? "#7C3AED" : score >= 70 ? "#2563EB" : "#6B7280";
  const bg    = score >= 80 ? "#EDE9FE" : score >= 70 ? "#EFF6FF" : "var(--muted)";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", padding: "0.2rem 0.5rem", borderRadius: 999, background: bg, border: `1px solid ${color}25` }}>
      <Zap size={11} style={{ color }} />
      <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.78rem", color }}>{score}</span>
    </div>
  );
}

/* ─── Filter pill ─── */
function FilterPill({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = value !== "";
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen((o) => !o)} style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "2rem", border: `1.5px solid ${isActive ? "var(--primary)" : "var(--border)"}`, background: isActive ? "#EFF6FF" : "var(--card)", color: isActive ? "var(--primary)" : "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: isActive ? 500 : 400, whiteSpace: "nowrap" }}>
        {isActive ? value : label}
        {isActive
          ? <button onClick={(e) => { e.stopPropagation(); onChange(""); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "var(--primary)" }}><X size={12} /></button>
          : <ChevronDown size={13} style={{ opacity: 0.5 }} />
        }
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 20 }} />
          <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 30, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.625rem", padding: "0.375rem", minWidth: 200, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", maxHeight: 240, overflowY: "auto" }}>
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

/* ─── Creator card ─── */
function CreatorCard({
  creator,
  onOpen,
  onSave,
}: {
  creator: Creator;
  onOpen: (c: Creator) => void;
  onSave: (id: string) => void;
}) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [hovered, setHovered] = useState(false);
  const tierConfig: Record<FollowerTier, { label: string; color: string; bg: string }> = {
    nano:  { label: "Nano",  color: "#BE185D", bg: "#FCE7F3" },
    micro: { label: "Micro", color: "#5B21B6", bg: "#EDE9FE" },
    macro: { label: "Macro", color: "#1D4ED8", bg: "#DBEAFE" },
  };
  const tier = tierConfig[creator.followerTier];
  const matchColor = creator.matchScore >= 90 ? "#10B981" : creator.matchScore >= 80 ? "#2563EB" : creator.matchScore >= 70 ? "#7C3AED" : "#6B7280";

  return (
    <div
      onClick={() => onOpen(creator)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${hovered ? "rgba(37,99,235,0.2)" : "var(--border)"}`,
        borderRadius: "0.875rem", cursor: "pointer",
        transition: "all .15s",
        boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.08)" : "var(--shadow-xs)",
        transform: hovered ? "translateY(-1px)" : "none",
        overflow: "hidden",
      }}
    >
      {/* Card header gradient strip */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${creator.color}, ${creator.gradient[1]})` }} />

      <div style={{ padding: "1.125rem 1.25rem" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.875rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Avatar */}
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg, ${creator.gradient[0]}, ${creator.gradient[1]})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: f.h, fontWeight: 700, fontSize: "1.0625rem", flexShrink: 0, border: "2px solid var(--border)" }}>
              {creator.avatar}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.125rem" }}>
                <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.9375rem", color: "var(--foreground)" }}>{creator.name}</p>
                {creator.verified && <CheckCircle size={13} style={{ color: "#10B981", flexShrink: 0 }} />}
              </div>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{creator.handle} · {creator.location}</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", flexShrink: 0 }}>
            <span style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: tier.bg, color: tier.color, fontFamily: f.b, fontSize: "0.65rem", fontWeight: 700 }}>{tier.label}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onSave(creator.id); }}
              style={{ width: 28, height: 28, borderRadius: "0.375rem", display: "flex", alignItems: "center", justifyContent: "center", background: creator.saved ? "#EDE9FE" : "var(--muted)", border: "none", cursor: "pointer", color: creator.saved ? "#7C3AED" : "var(--muted-foreground)" }}
            >
              {creator.saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
            </button>
          </div>
        </div>

        {/* Niche tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "0.875rem" }}>
          {creator.niches.map((n) => (
            <span key={n} style={{ padding: "0.2rem 0.5rem", borderRadius: 999, background: "var(--secondary)", color: "var(--secondary-foreground)", fontFamily: f.b, fontSize: "0.72rem", fontWeight: 500 }}>{n}</span>
          ))}
        </div>

        {/* Platforms */}
        <div style={{ display: "flex", gap: "0.375rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
          {Object.keys(creator.platforms).map((p) => <PlatformPip key={p} p={p} />)}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginBottom: "0.875rem" }}>
          <div style={{ padding: "0.5rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9rem", color: "var(--foreground)" }}>{creator.totalFollowers}</p>
            <p style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{isFr ? "abonnés" : "followers"}</p>
          </div>
          <div style={{ padding: "0.5rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9rem", color: "#10B981" }}>{creator.topEngagement}</p>
            <p style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{isFr ? "engagement" : "engagement"}</p>
          </div>
          <div style={{ padding: "0.5rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.9rem", color: "var(--foreground)" }}>{creator.pastCollabs}</p>
            <p style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{isFr ? "campagnes" : "campaigns"}</p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <ScoreBadge score={creator.iaScore} />
            {creator.matchScore > 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", fontFamily: f.b, fontSize: "0.78rem", fontWeight: 500, color: matchColor }}>
                <Zap size={11} style={{ color: matchColor }} />{creator.matchScore}% match
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(creator); }}
            style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.78rem", fontWeight: 500 }}
          >
            {isFr ? "Voir le profil" : "View profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Score range pill ─── */
function ScoreRangePill({ min, max, onChange }: {
  min: number; max: number;
  onChange: (min: number, max: number) => void;
}) {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [open, setOpen] = useState(false);
  const isActive = min > 50 || max < 100;
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen((o) => !o)} style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.4375rem 0.875rem", borderRadius: "2rem", border: `1.5px solid ${isActive ? "var(--primary)" : "var(--border)"}`, background: isActive ? "#EFF6FF" : "var(--card)", color: isActive ? "var(--primary)" : "var(--foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem", fontWeight: isActive ? 500 : 400, whiteSpace: "nowrap" }}>
        {isActive ? `Score ${min}–${max}` : (isFr ? "Score IA" : "IA Score")} <ChevronDown size={13} style={{ opacity: 0.5 }} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 20 }} />
          <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 30, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.625rem", padding: "1rem", minWidth: 220, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
            <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.8125rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>{isFr ? "Plage de score IA" : "IA Score range"}</p>
            {[
              { label: isFr ? "Tout score" : "Any score",  min: 50,  max: 100 },
              { label: "50 – 70",   min: 50,  max: 70  },
              { label: "70 – 80",   min: 70,  max: 80  },
              { label: "80 – 90",   min: 80,  max: 90  },
              { label: "90 – 100",  min: 90,  max: 100 },
            ].map((range) => (
              <button key={range.label} onClick={() => { onChange(range.min, range.max); setOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "0.4375rem 0.5rem", borderRadius: "0.375rem", background: min === range.min && max === range.max ? "var(--secondary)" : "none", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: 2 }}>
                {range.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Main page ─── */
export function CreatorsPage() {
  const { i18n } = useTranslation();
  const isFr = i18n.language === "fr";
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("");
  const [niche, setNiche] = useState("");
  const [country, setCountry] = useState("");
  const [tier, setTier] = useState("");
  const [scoreMin, setScoreMin] = useState(50);
  const [scoreMax, setScoreMax] = useState(100);
  const [sortBy, setSortBy] = useState("match");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [creatorList, setCreatorList] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await api.get("/api/creators");
        const mapped: Creator[] = (res.data.data || []).map((p: any) => {
          const socials = p.social_accounts || [];
          const primarySocial = socials[0] || {};
          const followers = primarySocial.followers_count || 0;
          
          let t = "nano";
          if (followers >= 10000 && followers < 100000) t = "micro";
          if (followers >= 100000) t = "macro";
          
          const formatNum = (num: number) => num >= 1000000 ? (num/1000000).toFixed(1) + 'M' : num >= 1000 ? (num/1000).toFixed(1) + 'K' : String(num);

          const platformsObj: any = {};
          socials.forEach((s: any) => {
            platformsObj[s.platform] = { followers: formatNum(s.followers_count || 0), link: s.profile_url || "#" };
          });
          if (Object.keys(platformsObj).length === 0) {
            platformsObj["instagram"] = { followers: "0", link: "#" };
          }

          return {
            id: p.id,
            name: p.full_name || p.user?.name || "Creator",
            handle: primarySocial.handle || "@unknown",
            avatar: (p.full_name || p.user?.name || "C")[0].toUpperCase(),
            color: "#2563EB",
            gradient: ["#3B82F6", "#1D4ED8"] as [string, string],
            location: p.country || "Unknown",
            country: p.country || "Unknown",
            followerTier: t as any,
            totalFollowers: formatNum(followers),
            totalFollowersRaw: followers,
            topEngagement: (primarySocial.engagement_rate || 0) + "%",
            pastCollabs: 0,
            verified: false,
            saved: false,
            iaScore: p.ai_score || 0,
            matchScore: 0,
            niches: p.niches || [],
            platforms: platformsObj,
            primaryPlatform: primarySocial.platform || "instagram",
            bio: p.bio || "",
            audienceDemographics: {
              genderSplit: { female: 60, male: 40 },
              ageGroups: [
                { label: "18-24", pct: 30 },
                { label: "25-34", pct: 45 },
                { label: "35-44", pct: 25 },
              ],
              topLocations: [
                { label: p.country || "Local", pct: 80 },
              ],
              languages: ["English", "French"],
            },
            scoreBreakdown: [
              { label: "Engagement Quality", score: 8.5, color: "#2563EB" },
              { label: "Audience Authenticity", score: 9.0, color: "#10B981" },
              { label: "Brand Safety", score: 9.5, color: "#7C3AED" },
            ],
            responseRate: 90,
            completionRate: 95,
            brandRating: 4.8,
            contentSamples: [],

          };
        });
        setCreatorList(mapped);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load creators");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreators();
  }, []);

  const handleSave = (id: string) => {
    setCreatorList((prev) => prev.map((c) => c.id === id ? { ...c, saved: !c.saved } : c));
    if (selectedCreator?.id === id) setSelectedCreator((c) => c ? { ...c, saved: !c.saved } : null);
  };

  const filtered = useMemo(() => {
    let list = [...creatorList];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q) || c.niches.some((n) => n.toLowerCase().includes(q)));
    }
    if (platform) list = list.filter((c) => Object.keys(c.platforms).includes(platform.toLowerCase()));
    if (niche) list = list.filter((c) => c.niches.some((n) => n.toLowerCase().includes(niche.toLowerCase())));
    if (country) list = list.filter((c) => c.country === country);
    if (tier) list = list.filter((c) => c.followerTier === tier.toLowerCase());
    list = list.filter((c) => c.iaScore >= scoreMin && c.iaScore <= scoreMax);
    if (sortBy === "match")      list.sort((a, b) => b.matchScore - a.matchScore);
    if (sortBy === "score")      list.sort((a, b) => b.iaScore - a.iaScore);
    if (sortBy === "engagement") list.sort((a, b) => parseFloat(b.topEngagement) - parseFloat(a.topEngagement));
    if (sortBy === "followers")  list.sort((a, b) => b.totalFollowersRaw - a.totalFollowersRaw);
    return list;
  }, [creatorList, search, platform, niche, country, tier, scoreMin, scoreMax, sortBy]);

  const activeFilters = [platform, niche, country, tier].filter(Boolean).length + (scoreMin > 50 || scoreMax < 100 ? 1 : 0);
  const savedCount = creatorList.filter((c) => c.saved).length;

  if (isLoading) return <div style={{ padding: "3rem", color: "var(--muted-foreground)" }}>{isFr ? "Chargement..." : "Loading..."}</div>;
  if (error) return <div style={{ padding: "3rem", color: "#EF4444" }}>{isFr ? "Une erreur est survenue lors du chargement des créateurs." : error}</div>;

  return (
    <div style={{ padding: "1.75rem 1.5rem 4rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.375rem", color: "var(--foreground)", letterSpacing: "-0.025em", marginBottom: "0.25rem" }}>
            {isFr ? "Découverte de Créateurs" : "Creator Discovery"}
          </h1>
          <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            {isFr ? `${creatorList.length} créateurs vérifiés · ${savedCount} enregistrés` : `${creatorList.length} verified creators · ${savedCount} saved`}
          </p>
        </div>
        {savedCount > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.375rem 0.875rem", borderRadius: "2rem", background: "#EDE9FE", border: "1px solid #DDD6FE" }}>
            <BookmarkCheck size={14} style={{ color: "#7C3AED" }} />
            <span style={{ fontFamily: f.b, fontSize: "0.8125rem", fontWeight: 500, color: "#5B21B6" }}>
              {isFr ? `${savedCount} créateur${savedCount !== 1 ? "s" : ""} enregistré${savedCount !== 1 ? "s" : ""}` : `${savedCount} creator${savedCount !== 1 ? "s" : ""} saved`}
            </span>
          </div>
        )}
      </div>

      {/* Search + filters */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem", padding: "1.125rem 1.25rem", marginBottom: "1.25rem" }}>
        {/* Search row */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.875rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 280px", maxWidth: 440 }}>
            <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
            <input
              type="search" placeholder={isFr ? "Rechercher par nom, identifiant ou niche..." : "Search by name, handle, or niche…"} value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", height: "2.375rem", paddingLeft: "2.25rem", paddingRight: "0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
              onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginLeft: "auto" }}>
            {activeFilters > 0 && (
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.5rem", borderRadius: 999, background: "#EFF6FF", color: "var(--primary)", fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600 }}>
                <Filter size={11} />{activeFilters} {isFr ? "actifs" : "active"}
              </span>
            )}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              style={{ height: "2.375rem", padding: "0 2rem 0 0.75rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontFamily: f.b, fontSize: "0.8125rem", outline: "none", cursor: "pointer", appearance: "none" }}>
              <option value="match">{isFr ? "Meilleure correspondance" : "Best match"}</option>
              <option value="score">{isFr ? "Meilleur score IA" : "Highest IA Score"}</option>
              <option value="engagement">{isFr ? "Le plus engagé" : "Most engaged"}</option>
              <option value="followers">{isFr ? "Plus d'abonnés" : "Most followers"}</option>
            </select>
          </div>
        </div>

        {/* Filter pills row */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <FilterPill label={isFr ? "Plateforme" : "Platform"}      options={["Instagram", "TikTok", "YouTube"]}                   value={platform}  onChange={setPlatform} />
          <FilterPill label="Niche"         options={NICHES}                                               value={niche}     onChange={setNiche} />
          <FilterPill label={isFr ? "Pays" : "Country"}       options={COUNTRIES}                                            value={country}   onChange={setCountry} />
          <FilterPill label={isFr ? "Niveau de créateur" : "Creator tier"}  options={["Nano", "Micro", "Macro"]}                          value={tier}      onChange={setTier} />
          <ScoreRangePill min={scoreMin} max={scoreMax} onChange={(mn, mx) => { setScoreMin(mn); setScoreMax(mx); }} />
          {activeFilters > 0 && (
            <button
              onClick={() => { setPlatform(""); setNiche(""); setCountry(""); setTier(""); setScoreMin(50); setScoreMax(100); setSearch(""); }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.4375rem 0.75rem", borderRadius: "2rem", border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.8125rem" }}
            >
              <X size={12} /> {isFr ? "Effacer tout" : "Clear all"}
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)", marginBottom: "1rem" }}>
        {isFr ? `${filtered.length} créateur${filtered.length !== 1 ? "s" : ""} trouvé${filtered.length !== 1 ? "s" : ""}` : `${filtered.length} creator${filtered.length !== 1 ? "s" : ""} found`}
        {activeFilters > 0 && (isFr ? " (filtré)" : " (filtered)")}
      </p>

      {/* Creator grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
        {filtered.length > 0 ? (
          filtered.map((c) => (
            <CreatorCard key={c.id} creator={c} onOpen={setSelectedCreator} onSave={handleSave} />
          ))
        ) : (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem 2rem", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "0.875rem" }}>
            <Search size={28} style={{ color: "var(--muted-foreground)", display: "block", margin: "0 auto 0.75rem" }} />
            <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>
              {isFr ? "Aucun créateur ne correspond" : "No creators match"}
            </p>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
              {isFr ? "Essayez d'ajuster vos filtres ou votre terme de recherche." : "Try adjusting your filters or search term."}
            </p>
          </div>
        )}
      </div>

      <CreatorDrawer creator={selectedCreator} onClose={() => setSelectedCreator(null)} />
    </div>
  );
}
