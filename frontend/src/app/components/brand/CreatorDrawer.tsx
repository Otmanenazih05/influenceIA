import { useState, useEffect } from "react";
import {
  X, Bookmark, BookmarkCheck, CheckCircle, Instagram, Play,
  Youtube, MapPin, Star, TrendingUp, Users, MessageSquare,
  Award, Clock, Package, ChevronDown, ArrowRight,
} from "lucide-react";
import type { Creator } from "../../data/creators";
import { brandCampaigns } from "../../data/brandCampaigns";

import { TiktokIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "../ui/SocialIcons";

const f = { h: "'Poppins', sans-serif", b: "'Inter', sans-serif" };

function PlatformIcon({ p, size = 14 }: { p: string; size?: number }) {
  const map: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    instagram: { icon: <InstagramIcon size={size} />, color: "#E1306C", label: "Instagram" },
    tiktok:    { icon: <TiktokIcon size={size} />,      color: "#010101", label: "TikTok" },
    youtube:   { icon: <YoutubeIcon size={size} />,   color: "#FF0000", label: "YouTube" },
    facebook:  { icon: <FacebookIcon size={size} />,  color: "#1877F2", label: "Facebook" },
  };
  return map[p] ? <span style={{ color: map[p].color, display: "flex" }}>{map[p].icon}</span> : null;
}

function ScoreRing({ score }: { score: number }) {
  const r = 11, circ = 2 * Math.PI * r;
  const color = score >= 80 ? "#7C3AED" : score >= 70 ? "#2563EB" : "#6B7280";
  const bg = score >= 80 ? "#EDE9FE" : score >= 70 ? "#EFF6FF" : "var(--muted)";
  return (
    <svg width={30} height={30} viewBox="0 0 30 30" style={{ display: "block", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>
      <circle cx={15} cy={15} r={r} fill={bg} stroke="rgba(124,58,237,0.1)" strokeWidth={2} />
      <circle cx={15} cy={15} r={r} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round"
        strokeDasharray={`${(score / 100) * circ} ${circ - (score / 100) * circ}`}
        strokeDashoffset={circ / 4}
      />
      <text x={15} y={18.5} textAnchor="middle" style={{ fontFamily: f.h, fontWeight: 800, fontSize: "0.6rem", fill: color }}>{score}</text>
    </svg>
  );
}

function StatCell({ label, value, icon, sub }: { label: string; value: string; icon?: React.ReactNode; sub?: string }) {
  return (
    <div style={{ padding: "0.875rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem", textAlign: "center" }}>
      {icon && <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.25rem", color: "var(--muted-foreground)" }}>{icon}</div>}
      <p style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.0625rem", color: "var(--foreground)", letterSpacing: "-0.02em" }}>{value}</p>
      <p style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: 1 }}>{label}</p>
      {sub && <p style={{ fontFamily: f.b, fontSize: "0.65rem", color: "var(--muted-foreground)", opacity: 0.7 }}>{sub}</p>}
    </div>
  );
}

function Bar({ pct, color = "var(--primary)" }: { pct: number; color?: string }) {
  return (
    <div style={{ flex: 1, height: 6, borderRadius: 999, background: "var(--muted)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, borderRadius: 999, background: color, transition: "width .6s ease" }} />
    </div>
  );
}

function InviteDropdown({ creator, onClose }: { creator: Creator; onClose: () => void }) {
  const [step, setStep] = useState<"select" | "done">("select");
  const [selected, setSelected] = useState("");
  const activeCampaigns = brandCampaigns.filter((c) => c.status === "active" || c.status === "reviewing");

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 440, background: "var(--card)", borderRadius: "1rem", padding: "1.75rem", boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 1 }}>
        {step === "done" ? (
          <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <CheckCircle size={24} style={{ color: "#10B981" }} />
            </div>
            <p style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.125rem", color: "var(--foreground)", marginBottom: "0.375rem" }}>Invitation sent!</p>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              {creator.name} will receive your invitation and can review your campaign brief.
            </p>
            <button onClick={onClose} style={{ padding: "0.5625rem 1.5rem", borderRadius: "0.5rem", background: "var(--primary)", color: "#fff", border: "none", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500 }}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div>
                <p style={{ fontFamily: f.h, fontWeight: 600, fontSize: "1.0625rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>
                  Invite {creator.name}
                </p>
                <p style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>Select which campaign to invite them to.</p>
              </div>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", display: "flex" }}><X size={18} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
              {activeCampaigns.map((c) => (
                <button key={c.id} onClick={() => setSelected(c.id)}
                  style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem 1rem", borderRadius: "0.625rem", border: `1.5px solid ${selected === c.id ? "var(--primary)" : "var(--border)"}`, background: selected === c.id ? "#EFF6FF" : "var(--card)", cursor: "pointer", textAlign: "left", transition: "all .15s" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${selected === c.id ? "var(--primary)" : "var(--border)"}`, background: selected === c.id ? "var(--primary)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {selected === c.id && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.875rem", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</p>
                    <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{c.category} · {c.budget.toLocaleString()} MAD</p>
                  </div>
                  <div style={{ padding: "0.15rem 0.5rem", borderRadius: 999, background: "#D1FAE5", color: "#065F46", fontFamily: f.b, fontSize: "0.65rem", fontWeight: 600, flexShrink: 0 }}>Active</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => selected && setStep("done")}
              disabled={!selected}
              style={{ width: "100%", padding: "0.6875rem", borderRadius: "0.5rem", border: "none", background: selected ? "var(--primary)" : "var(--muted)", color: selected ? "#fff" : "var(--muted-foreground)", cursor: selected ? "pointer" : "default", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem", boxShadow: selected ? "var(--shadow-primary)" : "none" }}
            >
              Send invitation <ArrowRight size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function CreatorDrawer({
  creator,
  onClose,
}: {
  creator: Creator | null;
  onClose: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const [inviting, setInviting] = useState(false);

  useEffect(() => { setSaved(creator?.saved ?? false); }, [creator]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!creator) return null;

  const scoreColor = creator.iaScore >= 80 ? "#7C3AED" : creator.iaScore >= 70 ? "#2563EB" : "#6B7280";
  const tierLabel: Record<string, { label: string; color: string; bg: string }> = {
    nano:  { label: "Nano creator",  color: "#BE185D", bg: "#FCE7F3" },
    micro: { label: "Micro creator", color: "#5B21B6", bg: "#EDE9FE" },
    macro: { label: "Macro creator", color: "#1D4ED8", bg: "#DBEAFE" },
  };
  const tier = tierLabel[creator.followerTier];

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 60, backdropFilter: "blur(2px)" }} />
      <div
        style={{
          position: "fixed", top: 0, right: 0,
          width: "min(540px, 100vw)", height: "100dvh",
          maxHeight: "100dvh",
          background: "var(--card)", zIndex: 70,
          display: "flex", flexDirection: "column",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
          borderLeft: "1px solid var(--border)",
          animation: "slideIn .22s ease",
        }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(40px); opacity:0 } to { transform: translateX(0); opacity:1 } }`}</style>


        {/* Header */}
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${creator.gradient[0]}, ${creator.gradient[1]})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "#fff", flexShrink: 0 }}>
              {creator.avatar}
            </div>
            <div>
              <p style={{ fontFamily: f.b, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>{creator.name}</p>
              <p style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{creator.handle}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.375rem" }}>
            <button
              onClick={() => setSaved((s) => !s)}
              style={{ width: 34, height: 34, borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: saved ? "#EDE9FE" : "var(--muted)", border: "none", cursor: "pointer", color: saved ? "#7C3AED" : "var(--muted-foreground)" }}
            >
              {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
            </button>
            <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", border: "none", cursor: "pointer", color: "var(--muted-foreground)" }}>
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 1.25rem" }}>

          {/* Creator hero */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", marginBottom: "1.5rem" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${creator.color}, ${creator.gradient[1]})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: f.h, fontWeight: 800, fontSize: "2rem", color: "#fff", border: "3px solid var(--card)", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}>
                {creator.avatar}
              </div>
              <div style={{ position: "absolute", bottom: -4, right: -4 }}>
                <ScoreRing score={creator.iaScore} />
              </div>
            </div>
            <div style={{ flex: 1, paddingTop: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
                <h2 style={{ fontFamily: f.h, fontWeight: 700, fontSize: "1.25rem", color: "var(--foreground)", letterSpacing: "-0.02em" }}>{creator.name}</h2>
                {creator.verified && <CheckCircle size={16} style={{ color: "#10B981", flexShrink: 0 }} />}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "0.625rem" }}>
                <span style={{ padding: "0.2rem 0.625rem", borderRadius: 999, background: tier.bg, color: tier.color, fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600 }}>{tier.label}</span>
                {creator.niches.map((n) => (
                  <span key={n} style={{ padding: "0.2rem 0.625rem", borderRadius: 999, background: "var(--secondary)", color: "var(--secondary-foreground)", fontFamily: f.b, fontSize: "0.72rem", fontWeight: 500 }}>{n}</span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <MapPin size={12} style={{ color: "var(--muted-foreground)" }} />
                <span style={{ fontFamily: f.b, fontSize: "0.8125rem", color: "var(--muted-foreground)" }}>{creator.location}</span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <StatCell label="Total followers" value={creator.totalFollowers} icon={<Users size={13} />} />
            <StatCell label="Top engagement" value={creator.topEngagement} icon={<TrendingUp size={13} />} sub="best platform" />
            <StatCell label="Campaigns done" value={String(creator.pastCollabs)} icon={<Award size={13} />} />
            <StatCell label="Response rate" value={`${creator.responseRate}%`} icon={<Clock size={13} />} />
          </div>

          {/* Platform breakdown */}
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Platform stats</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {Object.entries(creator.platforms).map(([platform, stats]) => {
                const map: Record<string, { color: string }> = {
                  instagram: { color: "#E1306C" },
                  tiktok:    { color: "#010101" },
                  youtube:   { color: "#FF0000" },
                };
                const pc = map[platform] ?? { color: "#6B7280" };
                return (
                  <div key={platform} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.75rem 1rem", background: "var(--background)", border: `1px solid var(--border)`, borderRadius: "0.625rem", borderLeft: `3px solid ${pc.color}` }}>
                    <PlatformIcon p={platform} size={16} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                        <span style={{ fontFamily: f.b, fontWeight: 500, fontSize: "0.8125rem", color: "var(--foreground)", textTransform: "capitalize" }}>{platform}</span>
                        <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{stats.handle}</span>
                      </div>
                      <div style={{ display: "flex", gap: "1rem" }}>
                        <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.875rem", color: "var(--foreground)" }}>{stats.followers} <span style={{ fontFamily: f.b, fontWeight: 400, fontSize: "0.7rem", color: "var(--muted-foreground)" }}>followers</span></span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontFamily: f.b, fontSize: "0.8125rem", color: "#10B981", fontWeight: 500 }}>
                          <TrendingUp size={11} />{stats.engagement} engagement
                        </span>
                        {stats.avgViews && <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{stats.avgViews} avg views</span>}
                      </div>
                    </div>
                    {stats.verified && <CheckCircle size={14} style={{ color: "#10B981", flexShrink: 0 }} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* IA Score breakdown */}
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
              <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)" }}>IA Score breakdown</h3>
              <span style={{ fontFamily: f.h, fontWeight: 800, fontSize: "1.25rem", color: scoreColor, letterSpacing: "-0.03em" }}>{creator.iaScore}<span style={{ fontFamily: f.b, fontWeight: 400, fontSize: "0.75rem", color: "var(--muted-foreground)" }}>/100</span></span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {creator.scoreBreakdown.map((sb) => (
                <div key={sb.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: "var(--muted-foreground)", width: 160, flexShrink: 0 }}>{sb.label}</span>
                  <Bar pct={sb.score * 10} color={sb.color} />
                  <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: "0.8rem", color: sb.color, width: 24, textAlign: "right", flexShrink: 0 }}>{sb.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audience demographics */}
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Audience demographics</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.875rem" }}>
              {/* Gender */}
              <div style={{ padding: "0.875rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem" }}>
                <p style={{ fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.625rem" }}>Gender</p>
                <div style={{ display: "flex", gap: "0.375rem" }}>
                  <div style={{ flex: creator.audienceDemographics.genderSplit.female, height: 10, background: "#EC4899", borderRadius: "999px 0 0 999px" }} />
                  <div style={{ flex: creator.audienceDemographics.genderSplit.male, height: 10, background: "#2563EB", borderRadius: "0 999px 999px 0" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#EC4899" }} />
                    <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--foreground)", fontWeight: 500 }}>{creator.audienceDemographics.genderSplit.female}% Women</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563EB" }} />
                    <span style={{ fontFamily: f.b, fontSize: "0.75rem", color: "var(--foreground)", fontWeight: 500 }}>{creator.audienceDemographics.genderSplit.male}% Men</span>
                  </div>
                </div>
              </div>
              {/* Age */}
              <div style={{ padding: "0.875rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem" }}>
                <p style={{ fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.625rem" }}>Age groups</p>
                {creator.audienceDemographics.ageGroups.map((ag) => (
                  <div key={ag.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                    <span style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)", width: 34, flexShrink: 0 }}>{ag.label}</span>
                    <Bar pct={ag.pct} color="#7C3AED" />
                    <span style={{ fontFamily: f.b, fontSize: "0.7rem", fontWeight: 600, color: "var(--foreground)", width: 28, textAlign: "right" }}>{ag.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Top locations */}
            <div style={{ padding: "0.875rem", background: "var(--background)", border: "1px solid var(--border)", borderRadius: "0.625rem" }}>
              <p style={{ fontFamily: f.b, fontSize: "0.72rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.625rem" }}>Top audience locations</p>
              {creator.audienceDemographics.topLocations.map((loc) => (
                <div key={loc.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.375rem" }}>
                  <span style={{ fontFamily: f.b, fontSize: "0.8rem", color: "var(--foreground)", width: 70, flexShrink: 0 }}>{loc.label}</span>
                  <Bar pct={loc.pct} color="#2563EB" />
                  <span style={{ fontFamily: f.b, fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)", width: 32, textAlign: "right" }}>{loc.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.625rem" }}>About</h3>
            <p style={{ fontFamily: f.b, fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.75 }}>{creator.bio}</p>
          </div>

          {/* Content samples */}
          <div>
            <h3 style={{ fontFamily: f.h, fontWeight: 600, fontSize: "0.875rem", color: "var(--foreground)", marginBottom: "0.875rem" }}>Content samples</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
              {creator.contentSamples.map((sample, i) => (
                <div key={i} style={{ aspectRatio: "4/5", borderRadius: "0.625rem", background: `linear-gradient(135deg, ${sample.bg[0]}, ${sample.bg[1]})`, display: "flex", alignItems: "flex-end", padding: "0.5rem", overflow: "hidden", border: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: f.b, fontSize: "0.7rem", color: "var(--muted-foreground)", background: "rgba(255,255,255,0.85)", padding: "0.2rem 0.4rem", borderRadius: "0.25rem" }}>{sample.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div style={{ padding: "1rem 1.25rem", paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))", borderTop: "1px solid var(--border)", background: "var(--card)", flexShrink: 0, display: "flex", gap: "0.625rem" }}>
          <button
            onClick={() => setSaved((s) => !s)}
            style={{ flex: "0 0 auto", padding: "0.6875rem 1rem", borderRadius: "0.5rem", border: "1px solid var(--border)", background: saved ? "#EDE9FE" : "var(--card)", color: saved ? "#7C3AED" : "var(--muted-foreground)", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.375rem" }}
          >
            {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
            {saved ? "Saved" : "Save"}
          </button>
          <button
            onClick={() => setInviting(true)}
            style={{ flex: 1, padding: "0.6875rem", borderRadius: "0.5rem", border: "none", background: "var(--primary)", color: "#fff", cursor: "pointer", fontFamily: f.b, fontSize: "0.875rem", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.375rem", boxShadow: "var(--shadow-primary)" }}
          >
            <Package size={14} /> Invite to campaign <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {inviting && <InviteDropdown creator={creator} onClose={() => setInviting(false)} />}
    </>
  );
}
